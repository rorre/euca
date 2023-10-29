<p align="center">
  <h1 align="center">Euca</h1>
  <p align="center">Yet another validator and JSON parser with first class Typescript support and zod-like features.</p>
</p>

## Why

I want to experiment with building a TypeScript library, and I think this is a good way to learn because of how type inference is heavily used.

...and I love zod, so why not try and replicate what they did?

## How

### Installation

This package is not published on npm (and I'm not sure if I plan to do so), but you can install this package using git link.

```
npm i git+https://github.com/rorre/euca.git
```

The package exports one default object for you to use, `v`. You use it just like how you would do in zod!

### Example Usage

```ts
import v from 'euca';

const validator = v.string();
validator.parse('string');
validator.parse(12); // Not valid, only accepts string
```

### Core

Each validator subclasses the base validator (which is an abstract class), which serves as shared code for multiple validators.

Unless you wanted to extend the functionality by adding more validator, you probably don't need to use this class.

Properties:

- `optionalProperty`: Whether the property is optional (`T` will also be `T | undefined`)
- `nullableProperty`: Whether the property can be null (`T` will also be `T | null`)

Methods:

- `.optional()`: Mark current property as optional.
- `.nullable()`: Mark current property as nullable.
- `.parse(data: string)`: Parse and validate given data.
- `.parse(data: T)`: Validate given data.

> [!WARNING]
> All modifier methods causes the type for the validator to be overriden. This means you should use core modifiers **last**.

### Type Inference

You may infer the type of the object that you validate using `InferType`, just like zod!

```ts
import v, { InferType } from 'euca';

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

// Data is the following:
// {
//     username: string;
//     age: number;
//     description: string | null;
//     roles: Role[];
//     profile: {
//         github: string;
//     } & {
//         twitter?: string | undefined;
//     };
// } & {}
```

### String

Constructor: `v.string()`

Methods:

- `.maxLength(n: number)`: Check if the length of the string is less than or equal to the specified n
- `.minLength(n: number)`: Check if the length of the string is greater than or equal to the specified n.

```ts
const validator = v.string();
validator.parse('string');
```

### Number

Constructor: `v.number()`

Methods:

- `.max(n: number)`: Check if the numeric value is less than or equal to the specified n.
- `.min(n: number)`: Check if the numeric value is greater than or equal to the specified n.

```ts
const validator = v.number();
validator.parse('621');
```

### Enum

Constructor: `v.enum(EnumType)`

```ts
enum Role {
  USER,
  MODERATOR,
  ADMIN,
}

const validator = v.enum(Role);
validator.parse('USER');
```

### Array

Constructor: `v.array(validatorForElement)`

```ts
const validator = v.array(v.boolean());
validator.parse('[true, false, true]');
```

### Boolean

Constructor: `v.boolean()`

Methods:

- `.is(value: boolean)`: Restricts to only use this boolean value

```ts
const validator = v.boolean();
validator.parse('true');

const falseValidator = v.boolean().is(false);
falseValidator.parse('false');
```

### Objects

> [!NOTE]
> When parsing, this will call `JSON.parse()` with the object.

```ts
const objValidator = v.object({
  name: z.string().minLength(2).maxLength(80),
  age: z.number().min(13),
});

const result = objValidator.parse(`{
  name: "rorre",
  age: 90
}`);

if (result.success) {
  console.log(result.data);
}
```
