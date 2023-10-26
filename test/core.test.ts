import { BaseValidator } from '../src/core';

class SampleValidator extends BaseValidator<string> {
  _validate(data: string): boolean {
    if (data === 'invalid' || data === null || data === undefined) {
      return false;
    }
    return true;
  }

  convert(data: string): string {
    if (data === 'error') {
      throw new Error('An error');
    }
    return data;
  }
}

describe('core validator', () => {
  const validator = new SampleValidator();
  test('parse valid', () => {
    expect(validator.parse('valid')).toEqual({
      success: true,
      data: 'valid',
    });
  });

  test('parse error', () => {
    expect(validator.parse('error')).toEqual({ success: false });
    expect(validator.parse('invalid')).toEqual({ success: false });
  });

  test('nullability', () => {
    const nullValidator = new SampleValidator().nullable();
    expect(
      // @ts-expect-error
      nullValidator.parse(null)
    ).toEqual({ success: true, data: null });
    expect(
      // @ts-expect-error
      validator.parse(null)
    ).toEqual({ success: false });
  });

  test('optional', () => {
    const optionalValidator = new SampleValidator().optional();
    expect(
      // @ts-expect-error
      optionalValidator.parse(undefined)
    ).toEqual({
      success: true,
      data: undefined,
    });
    expect(
      // @ts-expect-error
      validator.parse(undefined)
    ).toEqual({ success: false });
  });
});
