import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsString,
  MinLength,
  Validate,
} from 'class-validator';
import { IsMongoIdArrayConstraint } from 'src/helpers/customs.validators';

export class CreateOfferDto {
  @ApiProperty({
    description: 'Offer status',
    nullable: false,
    minLength: 1,
  })
  @IsNotEmpty({
    message: 'Debe proporcionar un status de oferta',
  })
  @IsString({
    message: 'El status debe ser un string',
  })
  @MinLength(1)
  status: string;

  @ApiProperty({
    description: 'Offer offerOwnerId',
    nullable: false,
    minLength: 1,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @IsMongoId({
    message: 'El offerOwnerId debe ser un id valido',
  })
  offerOwnerId: string;

  @ApiProperty({
    description: 'Offer TargetItem',
    nullable: false,
    minLength: 1,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @IsMongoId({
    message: 'El offerTargetItem debe ser un id valido',
  })
  offerTargetItem: string;

  @ApiProperty({
    description: 'Offered Items',
    nullable: false,
  })
  @IsNotEmpty({
    message: 'Debe proporcionar un array de Items',
  })
  @IsArray({
    message: 'Debe proporcionar un array de Items',
  })
  @Validate(IsMongoIdArrayConstraint)
  offeredItems: string[];
}
