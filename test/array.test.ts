import { BooleanValidator } from '../src/boolean';
import { EnumValidator } from '../src/enum';
import v from '../src/index';
import { NumberValidator } from '../src/number';
import { ObjectValidator } from '../src/object';
import { StringValidator } from '../src/string';

enum EmptyEnum {}

describe('array module', () => {
  test('init', () => {
    const testCases = [
      [v.string(), StringValidator],
      [v.boolean(), BooleanValidator],
      [v.enum(EmptyEnum), EnumValidator],
      [v.number(), NumberValidator],
      [v.object({}), ObjectValidator],
    ] as const;

    testCases.map(([validator, cls]) => {
      const cur = v.array(validator);
      expect(cur.validator).toBeInstanceOf(cls);
      expect(cur.validator).toBe(validator);
    });
  });

  test('valid array', () => {
    const validator = v.array(v.string());
    const testCases = [
      [],
      ['asd'],
      ['euca', 'gay'],
      ['gayest', 'of', 'all'],
      ['ferris'],
      ['rustacean'],
    ] as const;
    const result = testCases.map((tcase) =>
      validator.parse(JSON.stringify(tcase))
    );

    expect(result).toEqual(
      testCases.map((tcase) => ({
        data: tcase,
        success: true,
      }))
    );
  });

  test('invalid array', () => {
    const validator = v.array(v.string());
    expect(validator.parse(JSON.stringify([1]))).toEqual({ success: false });

    expect(
      validator.parse(JSON.stringify(['valid', { value: 'invalid' }]))
    ).toEqual({ success: false });

    expect(
      validator.parse(JSON.stringify([1, 'valid', { value: 'invalid' }]))
    ).toEqual({ success: false });
  });
});
