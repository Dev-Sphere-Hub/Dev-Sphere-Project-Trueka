import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { OfferStatus } from '../entities/offer.entity';

export class UpdateOfferDto {
  @ApiProperty({
    description: 'Offer status',
    nullable: false,
    minLength: 4,
    default: OfferStatus.PENDING,
    enum: Object.values(OfferStatus),
    example: Object.values(OfferStatus),
    enumName: 'OfferStatus',
  })
  @IsString()
  @IsNotEmpty()
  @IsEnum(OfferStatus, {
    message:
      'Invalid status. It must be one of the allowed values in OfferStatus enum.',
  })
  @MinLength(4)
  status: OfferStatus;
}
