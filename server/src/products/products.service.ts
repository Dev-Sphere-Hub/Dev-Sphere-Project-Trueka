import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './entities/product.entity';
import mongoose, { Model } from 'mongoose';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<Product>,
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const { lat, lon, ...productData } = createProductDto;

      const newProduct = this.productModel.create({
        ...productData,
        geolocation: { lat, lon },
      });

      (await newProduct).category = new mongoose.Types.ObjectId(
        productData.category.toString(),
      );

      (await newProduct).subcategory = new mongoose.Types.ObjectId(
        productData.subcategory.toString(),
      );

      (await newProduct).owner = new mongoose.Types.ObjectId(
        productData.owner.toString(),
      );

      const owner = await this.userModel
        .findById((await newProduct).owner)
        .exec();

      owner.products.push((await newProduct)._id);

      (await owner).save();

      (await newProduct).save();

      return {
        newItem: await newProduct,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    try {
      const newProductList = this.productModel.find();
      return await newProductList;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  async findOne(id: string) {
    try {
      const product = await this.productModel.findById(id);
      if (!product) {
        throw new Error(`Product ${id} not found`);
      }
      return product;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findByCategory(id: string) {
    try {
      const productList = await this.productModel
        .find()
        .where('category')
        .equals(new mongoose.Types.ObjectId(id.toString()))
      if (!productList) {
        throw new Error(`Product ${id} not found`);
      }
      return productList;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findBySubCategory(id: string) {
    try {
      const productList = await this.productModel
        .find()
        .where('subcategory')
        .equals(new mongoose.Types.ObjectId(id.toString()))
      if (!productList) {
        throw new Error(`Product ${id} not found`);
      }
      return productList;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const productUpdate = await this.productModel.findByIdAndUpdate(
      id,
      updateProductDto,
      { new: true },
    );
    if (!productUpdate) {
      throw new HttpException(
        `Product ${id} not found`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return productUpdate;
  }

  async remove(id: string) {
    try {
      const removed = await this.productModel.findByIdAndDelete(id);
      if (!removed) {
        throw new Error();
      }
      return {
        message: `Product item #${id} was successfully removed.`,
        status: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(
        `Can't delete ${id} or product not found`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
