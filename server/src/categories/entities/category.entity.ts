import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Types } from 'mongoose';

@Schema()
export class Category extends Document {
  @ApiProperty()
  @Prop()
  name: string;

  @ApiProperty()
  @Prop({ default: 'Category description' })
  description: string;

  @ApiProperty()
  @Prop({ array: true, ref: 'Subcategory' })
  subcategories: Types.ObjectId[];
}

export const CategorySchema = SchemaFactory.createForClass(Category);
