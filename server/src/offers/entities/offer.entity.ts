import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { Document, Types } from 'mongoose';

export enum OfferStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

@Schema({ timestamps: true })
export class Offer extends Document {
  @ApiProperty()
  @Transform(({ value }) => OfferStatus[value])
  @Prop({ default: OfferStatus.PENDING })
  status: string;

  @ApiProperty()
  @Prop({ ref: 'User' })
  offerOwnerId: Types.ObjectId;

  @ApiProperty()
  @Prop({ ref: 'Product' })
  offerTargetItem: Types.ObjectId;

  @ApiProperty()
  @Prop({ array: true, ref: 'Product' })
  offeredItems: Types.ObjectId[];
}

export const OfferSchema = SchemaFactory.createForClass(Offer);
