import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @ApiProperty()
  @Prop({ unique: true })
  email: string;

  @ApiProperty()
  @Prop()
  password: string;

  @ApiProperty()
  @Prop()
  firstName!: string;

  @ApiProperty()
  @Prop()
  lastName: string;

  @ApiProperty()
  @Prop()
  contact: string;

  @ApiProperty()
  @Prop()
  address: string;

  @ApiProperty()
  @Prop()
  picture: string;

  @ApiProperty()
  @Prop({ default: true })
  isActive: boolean;

  @ApiProperty()
  @Prop({ array: true, default: ['user'] })
  roles: string[];

  @ApiProperty()
  @Prop({ array: true, ref: 'Product' })
  products: Types.ObjectId[];

  @ApiProperty()
  @Prop({ array: true, ref: 'Offer' })
  incomingOffers: Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);
