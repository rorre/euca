import v from '../src/index';

describe('boolean module', () => {
  const validator = v.boolean();

  test('valid', () => {
    expect(validator.parse('true')).toEqual({
      success: true,
      data: true,
    });

    expect(validator.parse('false')).toEqual({
      success: true,
      data: false,
    });
  });

  test('invalid datatype', () => {
    expect(validator.parse('1')).toEqual({ success: false });
    expect(validator.parse('null')).toEqual({ success: false });
    expect(validator.parse('"invalid"')).toEqual({ success: false });
    expect(validator.parse('{}')).toEqual({ success: false });
  });

  test('is function', () => {
    const isValidator = v.boolean().is(true);
    expect(isValidator.parse('false')).toEqual({ success: false });
    expect(isValidator.parse('true')).toEqual({ success: true, data: true });
  });
});
