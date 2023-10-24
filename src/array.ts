import { BaseValidator } from './core';

export class ArrayValidator<T> extends BaseValidator<T, T[]> {
  validator: BaseValidator<T>;

  constructor(validator: BaseValidator<T>) {
    super();
    this.validator = validator;
  }

  _validate(data: T[]): boolean {
    return data.every((member) => this.validator.validate(member));
  }

  convert(data: string): T[] {
    return JSON.parse(data);
  }
}
