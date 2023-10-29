import { BaseValidator, ValidateFunc } from './core';

type EnumValues<T extends Record<string | number, string | number>> =
  | T[keyof T]
  | undefined;

export class EnumValidator<
  T extends Record<string | number, string | number>
> extends BaseValidator<T[keyof T], EnumValues<T>> {
  funcs: ValidateFunc<EnumValues<T>>[];
  enumType: T;

  constructor(enumType: T) {
    super();
    this.enumType = enumType;
    this.funcs = [
      (data) =>
        data !== undefined && Object.values(this.enumType).includes(data),
    ];
  }

  _validate(data: EnumValues<T>) {
    return this.funcs.every((f) => f(data));
  }

  convert(data: string) {
    const key = this.enumType[data];
    if (key === undefined) {
      // This block is reserved because in constant enum with all string, typescript actually
      // does not provide the values as the key. So we can assume data is the value of the enum
      return data as EnumValues<T>;
    }
    return this.enumType[key] as EnumValues<T>;
  }
}
