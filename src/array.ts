import { BaseValidator } from './core';

export class ArrayValidator<T, TValidate = T> extends BaseValidator<
  T[],
  TValidate[]
> {
  validator: BaseValidator<TValidate>;

  constructor(validator: BaseValidator<T, TValidate>) {
    super();
    this.validator = validator;
  }

  _validate(data: TValidate[]): boolean {
    return data.every((member) => this.validator.validate(member));
  }

  convert(data: string): TValidate[] {
    return JSON.parse(data);
  }
}
