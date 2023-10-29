import { BaseValidator, InferType } from './core';

export type IsValidatorOptional<T> = undefined extends InferType<T>
  ? true
  : false;

type JSONType<T> = null | undefined | string | unknown[] | T | Partial<T>;

export class ObjectValidator<
  V extends {
    [k: string]: V[keyof V] extends BaseValidator<infer Inner>
      ? BaseValidator<Inner>
      : never;
  },
  T extends {
    [k in keyof V as IsValidatorOptional<V[k]> extends false
      ? k
      : never]: InferType<V[k]>;
  } & {
    [k in keyof V as IsValidatorOptional<V[k]> extends true
      ? k
      : never]+?: InferType<V[k]>;
  }
> extends BaseValidator<T, JSONType<T>> {
  validator: V;

  constructor(validator: V) {
    super();
    this.validator = validator;
  }

  convert(data: string): JSONType<T> {
    return JSON.parse(data);
  }

  _validate(data: JSONType<T>) {
    if (typeof data !== 'object' || Array.isArray(data) || data === null) {
      return false;
    }

    const validatorKeys = new Set(Object.keys(this.validator));
    const objectKeys = new Set(Object.keys(data));

    const missingKeys = Array.from(validatorKeys).filter(
      (k) => !objectKeys.has(k) && !this.validator[k]!.optionalProperty
    );
    if (missingKeys.length >= 1) return false;

    const extraKeys = Array.from(objectKeys).filter(
      (k) => !validatorKeys.has(k)
    );
    if (extraKeys.length >= 1) return false;

    return Object.entries(this.validator)
      .map(([key, validator]) =>
        Object.keys(data).includes(key)
          ? validator.validate(data[key as keyof typeof data])
          : validator.optionalProperty
      )
      .every((res) => res);
  }
}
