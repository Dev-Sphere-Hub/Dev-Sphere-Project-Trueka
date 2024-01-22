import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './entities/category.entity';
import { Model } from 'mongoose';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const { ...categoryData } = createCategoryDto;

      const newCategory = this.categoryModel.create({
        ...categoryData,
      });

      (await newCategory).save();

      return {
        id: (await newCategory)._id,
      };
    } catch (error) {
      this.handleCategoryError(error);
    }
  }

  async findAll() {
    try {
      const newCategoryList = this.categoryModel.find();
      return await newCategoryList;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  async findOne(id: string) {
    try {
      const category = await this.categoryModel
        .findById(id)
        .populate({
          path: 'subcategories',
          select: 'name _id'
        })
        .exec();
      if (!category) {
        throw new Error(`category ${id} not found`);
      }
      return category;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    try {
      const categoryUpdate = await this.categoryModel.findByIdAndUpdate(
        id,
        updateCategoryDto,
        { new: true },
      );
      if (!categoryUpdate) {
        throw new Error(`Category ${id} not found`);
      }
      return categoryUpdate;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  remove(id: number) {
    throw new HttpException(
      `#${id}: You can't delete any category`,
      HttpStatus.FORBIDDEN,
    );
  }

  private handleCategoryError(error: any): never {
    if (error.code === 11000) {
      console.log(error);
      throw new BadRequestException(`${error.keyValue['email']} exists`);
    }
    throw new HttpException(error.response, error.status);
  }
}
