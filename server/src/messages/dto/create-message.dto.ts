import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateMessageDto {
  @ApiProperty({
    description: 'Comment message',
    nullable: false,
    minLength: 1,
  })
  @IsNotEmpty({
    message: 'Debe proporcionar un message',
  })
  @IsString({
    message: 'El message debe ser un string',
  })
  @MinLength(1)
  message: string;

  @ApiProperty({
    description: 'Comment senderId',
    nullable: false,
    minLength: 1,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @IsMongoId({
    message: 'El senderId debe ser un id valido',
  })
  senderId: string;

  @ApiProperty({
    description: 'Comment recipient',
    nullable: false,
    minLength: 1,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @IsMongoId({
    message: 'El recipientId debe ser un id valido',
  })
  recipientId: string;

  @ApiProperty({
    description: 'Comment product target',
    nullable: false,
  })
  @IsNotEmpty({
    message: 'Debe proporcionar un array de Items',
  })
  @IsString({
    message: 'El targetItemId debe ser un string',
  })
  targetItemid: string;
}
