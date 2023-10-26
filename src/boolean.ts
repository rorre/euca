import { BaseValidator, ValidateFunc } from './core';

export class BooleanValidator extends BaseValidator<boolean> {
  funcs: ValidateFunc<boolean>[];
  constructor() {
    super();
    this.funcs = [(data) => typeof data === 'boolean'];
  }

  convert(data: string) {
    return JSON.parse(data);
  }

  is(expected: boolean) {
    this.funcs.push((data) => data === expected);
    return this as BooleanValidator;
  }

  _validate(data: boolean) {
    return this.funcs.every((f) => f(data));
  }
}
