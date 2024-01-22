import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, isStrongPassword } from 'class-validator';
import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'User email (unique)',
    nullable: false,
    minLength: 1,
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'User password',
    nullable: false,
    minLength: 8,
  })
  @MinLength(8)
  @MaxLength(40)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
    message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
  })
  password: string;

  @ApiProperty({
    description: 'User first name',
    nullable: false,
    minLength: 1,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  firstName: string;

  @ApiProperty({
    description: 'User last name',
    nullable: false,
    minLength: 1,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  lastName: string;

  @ApiProperty({
    description: 'User contact',
    nullable: true,
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  contact: string;

  @ApiProperty({
    description: 'User address',
    nullable: true,
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  address: string;
}
