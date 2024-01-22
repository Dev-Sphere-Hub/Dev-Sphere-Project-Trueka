import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Message extends Document {
  @ApiProperty()
  @Prop()
  message: string;

  @ApiProperty()
  @Prop({ ref: 'User' })
  senderId: Types.ObjectId;

  @ApiProperty()
  @Prop({ ref: 'User' })
  recipientId: Types.ObjectId;

  @ApiProperty()
  @Prop({ ref: 'Product' })
  targetItemid: Types.ObjectId;
}

export const MessageSchema = SchemaFactory.createForClass(Message);