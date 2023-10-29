import { BaseValidator, ValidateFunc } from './core';

export class StringValidator extends BaseValidator<string> {
  funcs: ValidateFunc<string>[];
  constructor() {
    super();
    this.funcs = [(data) => typeof data === 'string'];
  }

  maxLength(n: number) {
    this.funcs.push((data) => data.length <= n);
    return this;
  }

  minLength(n: number) {
    this.funcs.push((data) => data.length >= n);
    return this;
  }

  _validate(data: string) {
    return this.funcs.every((f) => f(data));
  }

  convert(data: string) {
    return data;
  }
}
