import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { IsString, MinLength } from 'class-validator';

export class CreateSubcategoryDto {
  @ApiProperty({
    description: 'Subcategory name',
    nullable: false,
    minLength: 3,
  })
  @IsString()
  @MinLength(1)
  name: string;

  @ApiProperty({
    description: 'Subcategory description',
    nullable: true,
    minLength: 5,
    default: 'Subcategory description',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Category id',
    nullable: false,
    minLength: 10,
  })
  @IsString()
  category: string;
}
