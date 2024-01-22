import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { isValidObjectId } from 'mongoose';

@ValidatorConstraint({ name: 'IsMongoIdArray', async: false })
export class IsMongoIdArrayConstraint implements ValidatorConstraintInterface {
  validate(offeredItems: string[], args: ValidationArguments) {
    return offeredItems.every((item) => isValidObjectId(item));
  }

  defaultMessage(args: ValidationArguments) {
    return 'Cada elemento del array debe ser una ID de MongoDB';
  }
}
