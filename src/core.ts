export type ParseResult<T> =
  | { success: false; data?: undefined }
  | { success: true; data: T };
export type ValidateFunc<T> = (data: T) => boolean;
export type InferType<T> = T extends BaseValidator<infer Inner, unknown>
  ? Inner
  : never;

export abstract class BaseValidator<T, TValidate = T> {
  optionalProperty: boolean;
  nullableProperty: boolean;

  constructor() {
    this.optionalProperty = false;
    this.nullableProperty = false;
  }

  /**
   * Validates given data towards the internal specification
   *
   * @param data - The data to be validated
   * @returns Whether the data is valid or not
   */
  validate(data: TValidate) {
    return (
      this._validate(data) ||
      (this.optionalProperty === true && data === undefined) ||
      (this.nullableProperty === true && data === null)
    );
  }

  abstract _validate(data: TValidate): boolean;

  /**
   * Parses data JSON string to data understandable by validator
   *
   * @param data A JSON containing the data
   * @returns Parsed data in respect of current validator type
   */
  abstract convert(data: string): TValidate;

  /**
   * Parses given JSON string and validates it with current validator
   *
   * @param data JSON string containing the data to be parsed
   * @returns An object with key success. If success, then data is also returned
   */
  parse(data: string) {
    let parsed: TValidate;
    try {
      parsed = this.convert(data);
    } catch {
      return {
        success: false as const,
      };
    }

    if (this.validate(parsed))
      return {
        success: true as const,
        data: parsed,
      };

    return {
      success: false as const,
    };
  }

  optional() {
    this.optionalProperty = true;
    return this as BaseValidator<T | undefined>;
  }

  nullable() {
    this.nullableProperty = true;
    return this as BaseValidator<T | null>;
  }
}
