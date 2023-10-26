import v from '../src/index';
import { ArrayValidator } from '../src/array';
import { EnumValidator } from '../src/enum';
import { NumberValidator } from '../src/number';
import { ObjectValidator } from '../src/object';
import { StringValidator } from '../src/string';
import { BooleanValidator } from '../src/boolean';

enum EmptyEnum {
  TEST,
}

describe('index module', () => {
  test('should have string validator', () => {
    expect(v.string()).toBeInstanceOf(StringValidator);
  });

  test('should have number validator', () => {
    expect(v.number()).toBeInstanceOf(NumberValidator);
  });

  test('should have enum validator', () => {
    expect(v.enum(EmptyEnum)).toBeInstanceOf(EnumValidator);
  });

  test('should have array validator', () => {
    expect(v.array(v.string())).toBeInstanceOf(ArrayValidator);
  });

  test('should have object validator', () => {
    expect(v.object({})).toBeInstanceOf(ObjectValidator);
  });

  test('should have boolean validator', () => {
    expect(v.boolean()).toBeInstanceOf(BooleanValidator);
  });
});
