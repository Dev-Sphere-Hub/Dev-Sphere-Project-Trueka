import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty } from 'class-validator';
import { IsString, MinLength } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    description: 'Item name',
    nullable: false,
    minLength: 1,
  })
  @IsNotEmpty({
    message: 'Debe proporcionar un nombre de artículo',
  })
  @IsString({
    message: 'El nombre del artículo debe ser un string',
  })
  @MinLength(1)
  name: string;

  @ApiProperty({
    description: 'Item description',
    nullable: false,
    minLength: 1,
  })
  @MinLength(1)
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Item images',
    nullable: false,
  })
  @IsNotEmpty({
    message: 'Debe proporcionar urls de imágenes',
  })
  @IsArray({
    message: 'Debe proporcionar un array de urls de imágenes',
  })
  images: string[];

  @ApiProperty({
    description: 'Item owner',
    nullable: false,
  })
  @MinLength(1)
  @IsNotEmpty({
    message: 'Debe proporcionar un Owner ID',
  })
  @IsString({
    message: 'Owner ID debe ser un string',
  })
  owner: string;

  @ApiProperty({
    description: 'Item category',
    nullable: false,
  })
  @MinLength(1)
  @IsNotEmpty()
  @IsString()
  category: string;

  @ApiProperty({
    description: 'Item Subcategory',
    nullable: false,
  })
  @MinLength(1)
  @IsNotEmpty()
  @IsString()
  subcategory: string;

  @ApiProperty({
    description: 'Item longitude',
    nullable: false,
  })
  @MinLength(1)
  @IsNotEmpty()
  @IsString()
  lon: string;

  @ApiProperty({
    description: 'Item latitude',
    nullable: false,
  })
  @MinLength(1)
  @IsNotEmpty()
  @IsString()
  lat: string;

  @ApiProperty({
    description: 'Item location',
    nullable: false,
  })
  @MinLength(5, {
    message: "La dirección ('location') debe contener al menos 5 caracteres",
  })
  @IsNotEmpty({
    message: "Debe proporcionar una direccion ('location')",
  })
  @IsString({
    message: "Debe proporcionar una direccion ('location') en formato string",
  })
  location: string;
}
