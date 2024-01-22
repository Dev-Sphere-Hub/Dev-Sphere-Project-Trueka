import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Types } from 'mongoose';

interface iGeo {
  lat: string;
  lon: string;
}

@Schema({ timestamps: true })
export class Product extends Document {
  @ApiProperty()
  @Prop()
  name: string;

  @ApiProperty()
  @Prop()
  description: string;

  @ApiProperty()
  @Prop({ array: true })
  images: string[];

  @ApiProperty()
  @Prop({ ref: 'User' })
  owner: Types.ObjectId;

  @ApiProperty()
  @Prop({ ref: 'Category' })
  category: Types.ObjectId;

  @ApiProperty()
  @Prop({ ref: 'Subcategory' })
  subcategory: Types.ObjectId;

  @ApiProperty()
  @Prop({ type: Object })
  geolocation: iGeo;

  @ApiProperty()
  @Prop()
  location: string;

}

export const ProductSchema = SchemaFactory.createForClass(Product);
