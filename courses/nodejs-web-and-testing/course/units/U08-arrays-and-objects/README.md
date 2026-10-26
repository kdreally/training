# U08 — Data shapes: arrays and objects

**Phase 1**

## Where you are

Single values are not enough. Programs need **lists** and **labeled records**.

## What you will be able to do

- Create and read arrays; use length and indexes.
- Loop over arrays with `for`.
- Create objects; read/write properties.
- Choose array vs object for simple cases.

## What you need already

- **U04–U07**

## Time and energy

**80–110 minutes.**

## Why this exists

APIs send lists of records. Tests check properties. Config is often an object. This is everyday data shape literacy.

## Plain-language teaching

### Arrays — ordered lists

An **array** holds an ordered list of values.

```javascript
let nums = [10, 20, 30];
```

- Index starts at **0**: `nums[0]` is `10`, `nums[1]` is `20`, `nums[2]` is `30`.
- `nums.length` is `3`.

### Changing and appending (basic)

```javascript
nums[1] = 25;
nums.push(40); // add at end → [10, 25, 30, 40]
```

### Loop all items

```javascript
let total = 0;
for (let i = 0; i < nums.length; i = i + 1) {
  total = total + nums[i];
}
```

Pattern: index from `0` to `length - 1`.

### Objects — labeled bags of values

An **object** maps **property names** (keys) to values.

```javascript
let user = {
  name: "Ada",
  age: 36,
  active: true
};
```

Read:

```javascript
user.name  // "Ada"
user["age"] // 36
```

Write:

```javascript
user.age = 37;
```

### Arrays of objects (very common)

```javascript
let books = [
  { title: "Dune", pages: 412 },
  { title: "Neuromancer", pages: 271 }
];
books[0].title // "Dune"
```

### Choosing shapes

| Need | Prefer |
|------|--------|
| Ordered collection of similar things | Array |
| One thing with named fields | Object |
| Many records | Array of objects |

### Nested access

```javascript
let order = {
  id: 9,
  items: ["tea", "honey"]
};
order.items[1] // "honey"
```

Go left to right: object → property → index.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Array | Ordered list | Not the same as object |
| Index | Position number from 0 | Not from 1 |
| Element / item | One value in an array | |
| Object | Key–value collection | Not “OOP class” yet |
| Property / key | Name of a field on an object | |
| push | Add to end of array | |

## Worked example

```javascript
function sumPages(books) {
  let total = 0;
  for (let i = 0; i < books.length; i = i + 1) {
    total = total + books[i].pages;
  }
  return total;
}

let shelf = [
  { title: "A", pages: 100 },
  { title: "B", pages: 50 }
];
sumPages(shelf) // 150
```

## Common errors

### Error: Off-by-one on indexes

Last index is `length - 1`. `arr[arr.length]` is `undefined`.

### Error: `for (let i = 0; i <= arr.length; i++)`

Uses `<=` → one step too far. Use `i < arr.length`.

### Error: Confusing `[]` and `{}`

`[]` array, `{}` object.

## Checkpoints

1. What is `["a","b"][0]`?
2. Why does indexing start at 0 (as a practical fact to remember)?
3. How do you read property `title` from object `book`?
4. When array of objects?

## Practice

### P1 — Index

`let colors = ["red", "green", "blue"]` — values of `colors[2]`, `colors.length`, `colors[3]`?

### P2 — Loop

Function `maxNumber(arr)` assuming non-empty array of numbers.

### P3 — Object

Object for a course unit: `id`, `title`, `minutes`. Create one literal.

### P4 — Filter-by-hand

Count how many users in an array have `active === true` (write loop).

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- `map`/`filter`/`forEach` (can come later)
- Classes / prototypes
- Deep copy / reference theory beyond basics

## Next unit

**U09 — Errors and reading messages**
