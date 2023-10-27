import v from '../src/index';

enum Test {
  ONE,
  TWO,
}

enum TestValue {
  ONE = 'one',
  TWO = 'two',
}

enum Mixed {
  ONE,
  TWO = 9,
}

describe('enum module', () => {
  test('validate regular enum', () => {
    const validator = v.enum(Test);
    expect(validator.parse(Test.ONE.toString())).toEqual({
      success: true,
      data: Test.ONE,
    });

    expect(validator.parse('ONE')).toEqual({
      success: true,
      data: 'ONE',
    });

    expect(validator.parse('three')).toEqual({
      success: false,
    });
  });

  test('validate value enum', () => {
    const validator = v.enum(TestValue);
    expect(validator.parse(TestValue.ONE.toString())).toEqual({
      success: true,
      data: TestValue.ONE,
    });

    expect(validator.parse('one')).toEqual({
      success: true,
      data: 'one',
    });

    expect(validator.parse('three')).toEqual({
      success: false,
    });
  });

  test('validate mixed enum', () => {
    const validator = v.enum(Mixed);
    expect(validator.parse(Mixed.ONE.toString())).toEqual({
      success: true,
      data: Mixed.ONE,
    });

    expect(validator.parse('ONE')).toEqual({
      success: true,
      data: 'ONE',
    });

    expect(validator.parse('three')).toEqual({
      success: false,
    });
  });
});
