import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name)
    private readonly commentModel: Model<Comment>,
  ) {}
  async create(createCommentDto: CreateCommentDto) {
    const { ...commenData } = createCommentDto;

    const mewMessage = await this.commentModel.create({ ...commenData });

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
      const comment = await this.commentModel
        .findById(id)
        .populate({ path: 'senderId' })
        //.populate({ path: 'offerTargetItem', select: '_id name images' })
        //.populate({ path: 'offeredItems', select: '_id name images location' })
        .exec();
      return comment;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  update(id: string, updateCommentDto: UpdateCommentDto) {
    throw new HttpException(
      `Only admin can edit comments/chats`,
      HttpStatus.FORBIDDEN,
    );
  }

  remove(id: string) {
    throw new HttpException(
      `Only admin can remove comments/chats`,
      HttpStatus.FORBIDDEN,
    );
  }
}
