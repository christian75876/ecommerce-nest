import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function MinDigits(min: number, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'minDigits',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [min],
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [minDigits] = args.constraints;
          return typeof value === 'number' && value.toString().length >= minDigits;
        },
        defaultMessage(args: ValidationArguments) {
          const [minDigits] = args.constraints;
          return `The number must have at least ${minDigits} digits`;
        },
      },
    });
  };
}