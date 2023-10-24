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

Properties:

- `optionalProperty`: Whether the property is optional (`T` will also be `T | undefined`)
- `nullableProperty`: Whether the property can be null (`T` will also be `T | null`)

Methods:

- `.optional()`: Mark current property as optional
- `.nullable()`: Mark current property as nullable

> ![WARNING]
> All modifier methods causes the type for the validator to be overriden. This means you should use core modifiers **last**.

### Objects

You are able to verify objects as well!

> [!NOTE]
> When parsing, this will call `JSON.parse()` with the object.

```ts
const objValidator = v.object({
  name: z.string().minLength(2).maxLength(80),
  age: z.number().min(13),
});

objValidator.parse();
```

### String

TODO

### Number

TODO

### Enum

TODO
