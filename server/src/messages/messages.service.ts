import { CreateMessageDto } from './dto/create-message.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Message } from './entities/message.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message.name)
    private readonly messageModel: Model<Message>,
  ) {}
  async create(createMessageDto: CreateMessageDto) {
    const msjData = { ...createMessageDto };
    const mewMessage = await this.messageModel.create({ ...msjData });

    (await mewMessage).senderId = new mongoose.Types.ObjectId(
      mewMessage.senderId.toString(),
    );
    (await mewMessage).recipientId = new mongoose.Types.ObjectId(
      mewMessage.recipientId.toString(),
    );

    (await mewMessage).targetItemid = new mongoose.Types.ObjectId(
      mewMessage.targetItemid.toString(),
    );

    (await mewMessage).save();

    return {
      mewMessage: await mewMessage,
    };
  }
  catch(error) {
    throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
  }

  findAll() {
    throw new HttpException(
      `Only admin can get all comments/chats`,
      HttpStatus.FORBIDDEN,
    );
  }

  async findOne(id: string) {
    try {
      const comment = await this.messageModel
        .findById(id)
        .populate({ path: 'senderId' })
        .exec();
      return comment;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findOneByItemId(id: string) {
    try {
      const comment = await this.messageModel
        .find()
        .where('targetItemid')
        .equals(new mongoose.Types.ObjectId(id.toString()))
        .populate({ path: 'targetItemid', select: '_id name images' })
        .populate({
          path: 'senderId',
          select: '_id firstName lastName picture address',
        })
        .exec();
      return comment;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
