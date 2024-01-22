import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';
import { Subcategory } from './entities/subcategory.entity';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class SubcategoriesService {
  constructor(
    @InjectModel(Subcategory.name)
    private readonly subCategoryModel: Model<Subcategory>,
  ) {}

  async create(createSubcategoryDto: CreateSubcategoryDto) {
    try {
      const { ...subCategoryData } = createSubcategoryDto;

      const newSubCategory = this.subCategoryModel.create({
        ...subCategoryData,
      });

      (await newSubCategory).category = new mongoose.Types.ObjectId(
        subCategoryData.category.toString(),
      );

      (await newSubCategory).save();

      return {
        id: (await newSubCategory)._id,
      };
    } catch (error) {
      this.handleSubCategoryError(error);
    }
  }

  async findAll() {
    try {
      const newSubCategoryList = this.subCategoryModel.find();
      return await newSubCategoryList;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  async findOne(id: string) {
    try {
      const subCategory = await this.subCategoryModel.findById(id);
      if (!subCategory) {
        throw new Error(`SubCategory ${id} not found`);
      }
      return subCategory;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: number, updateSubcategoryDto: UpdateSubcategoryDto) {
    try {
      const subCategoryUpdate = await this.subCategoryModel.findByIdAndUpdate(
        id,
        updateSubcategoryDto,
        { new: true },
      );
      if (!subCategoryUpdate) {
        throw new Error(`Subcategory ${id} not found`);
      }
      return subCategoryUpdate;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  remove(id: number) {
    throw new HttpException(
      `#${id}: You can't delete any sub category`,
      HttpStatus.FORBIDDEN,
    );
  }

  private handleSubCategoryError(error: any): never {
    if (error.code === 11000) {
      console.log(error);
      throw new BadRequestException(`${error.keyValue['email']} exists`);
    }
    throw new HttpException(error.response, error.status);
  }
}
