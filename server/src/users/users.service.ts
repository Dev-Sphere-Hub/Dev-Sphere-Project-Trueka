import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto;

      const user = this.userModel.create({
        ...userData,
        //password: bcrypt.hashSync(password, 10), (¿?)
      });

      (await user).save();

      return {
        user: await this.findOne((await user)._id),
        //token: this.getJwtToken({ id: (await user)._id }),  (¿?)
      };
    } catch (error) {
      this.handleUserError(error);
    }
  }

  findAll() {
    throw new HttpException(
      `Only admin can request all users`,
      HttpStatus.FORBIDDEN,
    );
  }

  async findOne(id: string) {
    try {
      const user = await this.userModel
        .findById(id)
        .select('-password')
        .populate({ path: 'products' });
      if (!user) {
        throw new Error(`User ${id} not found`);
      }
      return user;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    throw new HttpException(
      `Only admin can remove users`,
      HttpStatus.FORBIDDEN,
    );
  }

  private handleUserError(error: any): never {
    if (error.code === 11000) {
      throw new BadRequestException(`${error.keyValue['email']} exists`);
    }
    throw new HttpException(error.response, error.status);
  }
}
