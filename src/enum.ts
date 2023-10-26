import { BaseValidator, ValidateFunc } from './core';

type EnumValues<T> = keyof T | T[keyof T] | undefined;
export class EnumValidator<
  T extends Record<string | number, string | number>
> extends BaseValidator<T, EnumValues<T>> {
  funcs: ValidateFunc<EnumValues<T>>[];
  enumType: T;

  constructor(enumType: T) {
    super();
    this.enumType = enumType;
    this.funcs = [
      (data) =>
        data !== undefined &&
        Object.keys(this.enumType).includes(data.toString()),
    ];
  }

  _validate(data: EnumValues<T>) {
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
