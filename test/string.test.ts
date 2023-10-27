import v from '../src/index';

describe('string module', () => {
  test('normal', () => {
    const validator = v.string();
    expect(validator.parse('string')).toEqual({
      success: true,
      data: 'string',
    });

    expect(validator.parse('')).toEqual({
      success: true,
      data: '',
    });

    // @ts-expect-error
    expect(validator.parse(1)).toEqual({
      success: false,
    });

    // @ts-expect-error
    expect(validator.parse([])).toEqual({
      success: false,
    });
  });

  test('with minimum length', () => {
    const validator = v.string().minLength(5);
    expect(validator.parse('string')).toEqual({
      success: true,
      data: 'string',
    });

    expect(validator.parse('five5')).toEqual({
      success: true,
      data: 'five5',
    });

    expect(validator.parse('')).toEqual({
      success: false,
    });
  });

  test('with maximum length', () => {
    const validator = v.string().maxLength(5);
    expect(validator.parse('five5')).toEqual({
      success: true,
      data: 'five5',
    });

    expect(validator.parse('')).toEqual({
      success: true,
      data: '',
    });

    expect(validator.parse('string')).toEqual({
      success: false,
    });
  });

  test('with min-max length', () => {
    const validator = v.string().minLength(1).maxLength(5);
    expect(validator.parse('five5')).toEqual({
      success: true,
      data: 'five5',
    });

    expect(validator.parse('')).toEqual({
      success: false,
    });

    expect(validator.parse('string')).toEqual({
      success: false,
    });
  });
});
