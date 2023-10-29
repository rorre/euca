import v, { InferType } from '../src/index';

enum Role {
  ADMIN,
  MODERATOR,
  USER,
}

describe('object module', () => {
  const validator = v.object({
    username: v.string().minLength(1).maxLength(20),
    age: v.number().min(13).max(60),
    description: v.string().nullable(),
    roles: v.array(v.enum(Role)),
    profile: v.object({
      twitter: v.string().optional(),
      github: v.string(),
    }),
  });

  type Data = InferType<typeof validator>;

  test('valid', () => {
    const data: Data = {
      age: 20,
      description: 'Hello world!',
      profile: {
        github: 'rorre',
        twitter: 'example',
      },
      roles: [Role.ADMIN, Role.USER],
      username: 'rorre',
    };

    expect(validator.parse(JSON.stringify(data))).toEqual({
      success: true,
      data: data,
    });
  });

  test('missing attribute', () => {
    const data = {
      description: 'Hello world!',
      profile: {
        github: 'rorre',
        twitter: 'example',
      },
      roles: [Role.ADMIN, Role.USER],
      username: 'rorre',
    };

    expect(validator.parse(JSON.stringify(data))).toEqual({
      success: false,
    });
  });

  test('extra attribute', () => {
    const data = {
      extra: 'attrib',
      age: 20,
      description: 'Hello world!',
      profile: {
        github: 'rorre',
        twitter: 'example',
      },
      roles: [Role.ADMIN, Role.USER],
      username: 'rorre',
    };

    expect(validator.parse(JSON.stringify(data))).toEqual({
      success: false,
    });
  });

  test('failed check outer layer', () => {
    const data = {
      age: 1,
      description: null,
      profile: {
        github: 'rorre',
        twitter: 'example',
      },
      roles: [Role.ADMIN, Role.USER],
      username: 'rorre',
    };

    expect(validator.parse(JSON.stringify(data))).toEqual({
      success: false,
    });
  });

  test('failed check inner layer', () => {
    const data = {
      age: 13,
      description: null,
      profile: {},
      roles: [Role.ADMIN, Role.USER],
      username: 'rorre',
    };

    expect(validator.parse(JSON.stringify(data))).toEqual({
      success: false,
    });
  });
});
