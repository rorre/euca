import v from '../src/index';

describe('number module', () => {
  test('type check', () => {
    const validator = v.number();
    expect(validator.parse('1')).toEqual({ success: true, data: 1 });
    expect(validator.parse('[]')).toEqual({ success: false });
    expect(validator.parse('"string"')).toEqual({ success: false });
    expect(validator.parse('"{}"')).toEqual({ success: false });
  });

  test('minimum check', () => {
    const validator = v.number().min(1);
    expect(validator.parse('1')).toEqual({ success: true, data: 1 });
    expect(validator.parse('-1')).toEqual({ success: false });
    expect(validator.parse('0')).toEqual({ success: false });

    const validatorMinus = v.number().min(-1);
    expect(validatorMinus.parse('0')).toEqual({ success: true, data: 0 });
    expect(validatorMinus.parse('-1')).toEqual({ success: true, data: -1 });
    expect(validatorMinus.parse('-5')).toEqual({ success: false });
  });

  test('maximum check', () => {
    const validator = v.number().max(1);
    expect(validator.parse('1')).toEqual({ success: true, data: 1 });
    expect(validator.parse('-1')).toEqual({ success: true, data: -1 });
    expect(validator.parse('0')).toEqual({ success: true, data: 0 });
    expect(validator.parse('2')).toEqual({ success: false });

    const validatorMinus = v.number().max(-1);
    expect(validatorMinus.parse('0')).toEqual({ success: false });
    expect(validatorMinus.parse('-1')).toEqual({ success: true, data: -1 });
    expect(validatorMinus.parse('-5')).toEqual({ success: true, data: -5 });
  });

  test('min-max check', () => {
    const validator = v.number().min(1).max(3);
    expect(validator.parse('1')).toEqual({ success: true, data: 1 });
    expect(validator.parse('3')).toEqual({ success: true, data: 3 });
    expect(validator.parse('-1')).toEqual({ success: false });
  });
});
