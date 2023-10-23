import { BaseValidator, ValidateFunc } from './core';

export class NumberValidator extends BaseValidator<number> {
  funcs: ValidateFunc<number>[];
  constructor() {
    super();
    this.funcs = [(data) => typeof data === 'number'];
  }

  convert(data: string) {
    return Number(data);
  }

  max(n: number) {
    this.funcs.push((data) => data <= n);
    return this;
  }

  min(n: number) {
    this.funcs.push((data) => data >= n);
    return this;
  }

  _validate(data: number) {
    return this.funcs.every((f) => f(data));
  }
}
