import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { IsString, MinLength } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'Category name',
    nullable: false,
    minLength: 5,
  })
  @IsString()
  @MinLength(1)
  name: string;

  @ApiProperty({
    description: 'Category description',
    nullable: true,
    minLength: 5,
    default: 'Category description',
  })
  @IsString()
  @IsOptional()
  description?: string;
}
