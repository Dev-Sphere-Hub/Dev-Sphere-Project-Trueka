import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  generateJwt(payload) {
    return this.jwtService.sign(payload);
  }

  async signIn(user) {
    if (!user) {
      throw new BadRequestException('Unauthenticated');
    }

    const userExists = await this.findUserByEmail(user.email);

    if (!userExists) {
      return this.registerUser(user);
    }

    const token = this.generateJwt({
      id: userExists.id,
      email: userExists.email,
    });
    return {
      token,
      user: userExists,
    };
  }

  async registerUser(user: CreateUserDto) {
    try {
      const { password, ...userData } = user;

      const newUser = this.userModel.create({
        ...userData,
        //password: bcrypt.hashSync(password, 10), (¿?)
      });

      (await newUser).save();

      const token = this.generateJwt({
        id: (await newUser)._id,
        email: (await newUser).email,
      });
      return {
        token,
        user: await newUser,
      };
    } catch {
      throw new InternalServerErrorException();
    }
  }

  async findUserByEmail(email) {
    const user = await this.userModel.findOne({ email });

    if (!user) {
      return null;
    }

    return user;
  }
}
