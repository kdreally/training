# U39 — Assertions: claiming what should be true

**Phase 5**

## Where you are

Automation needs a way to **fail loudly** when reality ≠ expectation. That is an **assertion**.

## What you will be able to do

- Define assertion.
- Use Node’s `assert` module for equality checks.
- Write a tiny script that exits non-zero on failure.
- Read assertion error output.

## What you need already

- **U14**, **U38**

## Time and energy

**50–80 minutes.**

## Why this exists

Without assertions, “tests” are just scripts that always look successful if they do not crash.

## Plain-language teaching

### Assertion

An **assertion** is a statement that something must be true. If not, the program signals failure.

### Node `assert`

```javascript
const assert = require("assert");

const sum = 2 + 2;
assert.strictEqual(sum, 4);
```

If equal, nothing dramatic happens.  
If not, throws `AssertionError` with details.

### A mini test script (no runner yet)

`check.js`:

```javascript
const assert = require("assert");

function add(a, b) {
  return a + b;
}

assert.strictEqual(add(2, 3), 5);
assert.strictEqual(add(-1, 1), 0);

console.log("all assertions passed");
```

```bash
node check.js
```

Break `add` on purpose → crash with assertion error → restore.

### Useful assert methods (start small)

| Method | Use |
|--------|-----|
| `assert.strictEqual(a, b)` | Primitive equality |
| `assert.deepStrictEqual(a, b)` | Objects/arrays structure |
| `assert.ok(value)` | Value truthy |

### Why strict

`assert.equal` is looser; this course prefers **strict** variants.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Assertion | Must-be-true check | Not only log message |
| AssertionError | Failure type | |
| strictEqual | Strict equality check | |
| deepStrictEqual | Nested structure check | |

## Worked example

`deepStrictEqual({a:1}, {a:1})` passes.  
`strictEqual({a:1}, {a:1})` fails (different object references) — why deep exists.

## Common errors

### Error: Asserting the wrong thing

`assert.ok(true)` always passes — useless. Assert **outcomes of your code**.

### Error: No message context

Optional message arg helps: `assert.strictEqual(x, 1, "x should be 1 after init")`.

## Checkpoints

1. What is an assertion?
2. What happens on failure?
3. strictEqual vs deepStrictEqual?
4. Why not only console.log in tests?

## Practice

### P1 — assert pure functions from Phase 1

### P2 — intentional fail and read error

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- Full test runner (next)
- HTTP asserts yet

## Next unit

**U40 — Test runners**
