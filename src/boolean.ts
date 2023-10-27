import { BaseValidator, ValidateFunc } from './core';

export class BooleanValidator<
  T extends boolean = boolean
> extends BaseValidator<T> {
  funcs: ValidateFunc<boolean>[];
  constructor() {
    super();
    this.funcs = [(data) => typeof data === 'boolean'];
  }

  convert(data: string) {
    return JSON.parse(data);
  }

  is<V extends boolean>(expected: V) {
    this.funcs.push((data) => data === expected);
    return this as unknown as BooleanValidator<V>;
  }

  _validate(data: boolean) {
    return this.funcs.every((f) => f(data));
  }
}
