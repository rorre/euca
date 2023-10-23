import { BaseValidator, ValidateFunc } from './core';

export class EnumValidator<
  T extends Record<string | number, string | number>
> extends BaseValidator<T, keyof T> {
  funcs: ValidateFunc<keyof T>[];
  enumType: T;

  constructor(enumType: T) {
    super();
    this.enumType = enumType;
    this.funcs = [
      (data) => Object.keys(this.enumType).includes(data.toString()),
    ];
  }

  _validate(data: keyof T) {
    return this.funcs.every((f) => f(data));
  }

  convert(data: string) {
    return this.enumType[data];
  }

  parse(data: string) {
    if (this.validate(data))
      return {
        success: true as const,
        data,
      };

    return {
      success: false as const,
    };
  }
}
