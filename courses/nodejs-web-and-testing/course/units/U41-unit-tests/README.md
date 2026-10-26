# U41 — Unit tests: one unit of behavior

**Phase 5**

## Where you are

Runner works. **Unit tests** focus on a small unit — usually a pure function or small module — **in isolation**.

## What you will be able to do

- Define unit test in course terms.
- Test store/logic modules without starting HTTP.
- Choose what counts as a “unit” at beginner scale.
- Keep tests fast and deterministic.

## What you need already

- **U40**, notes store logic from Phase 4

## Time and energy

**70–100 minutes.**

## Why this exists

HTTP tests are valuable but slower and broader. Unit tests pin core rules cheaply.

## Plain-language teaching

### Unit test

A **unit test** checks one unit of behavior with minimal dependencies — often pure functions or a module with in-memory state reset per test.

### Example: notesStore

`notesStore.js` exports `createNote`, `listNotes`, `getNote`, `reset` (reset helps tests).

```javascript
// notesStore.test.js
const test = require("node:test");
const assert = require("node:assert/strict");
const store = require("./notesStore");

test("createNote assigns incrementing ids", function () {
  store.reset();
  const a = store.createNote("A", "");
  const b = store.createNote("B", "");
  assert.equal(a.id, 1);
  assert.equal(b.id, 2);
});

test("getNote returns null when missing", function () {
  store.reset();
  assert.equal(store.getNote(99), null);
});
```

### Isolation

Each test should start from a **known state**. Shared mutable store without reset causes order-dependent flakes.

### What not to unit-test first

- Full Express wiring (that’s closer to integration/API tests)
- Third-party library internals

Test **your** rules: validation helpers, store, pure transforms.

### Speed

Unit tests should feel instant. If they need network, they may not be unit tests.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Unit test | Small isolated behavior check | Not “one assert only” always |
| Isolation | Limited dependencies / clean state | |
| Deterministic | Same result each run | |
| Fixture/reset | Known starting state | |

## Worked example

Above id increment tests.

## Common errors

### Error: Tests depend on order

Test B expects data from test A. Reset always.

### Error: Testing console output only

Prefer return values and state.

## Checkpoints

1. Unit test definition?
2. Why reset store?
3. What belongs in unit vs API tests?
4. Why fast matters?

## Practice

### P1 — unit tests for notesStore

### P2 — unit tests for a validateTitle helper

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- Mocks/spies heavy
- HTTP supertest yet

## Next unit

**U42 — Arrange–Act–Assert and naming**
