import { ArrayValidator } from './array';
import { BooleanValidator } from './boolean';
import { BaseValidator, InferType as InferTypeLib } from './core';
import { EnumValidator } from './enum';
import { NumberValidator } from './number';
import { ObjectValidator } from './object';
import { StringValidator } from './string';

const v = {
  string() {
    return new StringValidator();
  },
  number() {
    return new NumberValidator();
  },
  object<
    V extends {
      [k: string]: V[keyof V] extends BaseValidator<infer Inner>
        ? BaseValidator<Inner>
        : never;
    }
  >(validator: V) {
    return new ObjectValidator(validator);
  },
  enum<T extends Record<string | number, string | number>>(enumType: T) {
    return new EnumValidator(enumType);
  },
  array<V, TValidate = V>(validator: BaseValidator<V, TValidate>) {
    return new ArrayValidator(validator);
  },
  boolean() {
    return new BooleanValidator();
  },
};

export default v;
export type InferType<T> = InferTypeLib<T>;
