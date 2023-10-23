import { BaseValidator, InferType } from './core';

type IsValidatorOptional<T> = T extends BaseValidator<infer Inner>
  ? Inner extends undefined
    ? true
    : false
  : false;

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
    [k in keyof V as IsValidatorOptional<V[k]> extends false
      ? never
      : k]+?: InferType<V[k]>;
  }
> extends BaseValidator<T> {
  validator: V;

  constructor(validator: V) {
    super();
    this.validator = validator;
  }

  convert(data: string) {
    return JSON.parse(data);
  }

  _validate(data: T) {
    // Validator -> Data and Data -> Validator, basically check extras
    // Inefficient but it works(TM) will optimize later
    const validatorKeys = new Set(Object.keys(this.validator));
    const objectKeys = new Set(Object.keys(data));

    const missingKeys = [...validatorKeys].filter(
      (k) => !objectKeys.has(k) && !this.validator[k].optionalProperty
    );
    if (missingKeys.length >= 1) return false;

    return Object.entries(this.validator)
      .map(([key, validator]) =>
        Object.keys(data).includes(key)
          ? validator.validate(data[key as keyof typeof data])
          : validator.optionalProperty
      )
      .every((res) => res);
  }
}
