import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Types } from 'mongoose';

@Schema()
export class Subcategory extends Document {
  @ApiProperty()
  @Prop()
  name: string;

  @ApiProperty()
  @Prop({ default: 'Subcategory description' })
  description: string;

  @ApiProperty()
  @Prop({ ref: 'Category' })
  category: Types.ObjectId;
}

export const SubcategorySchema = SchemaFactory.createForClass(Subcategory);
