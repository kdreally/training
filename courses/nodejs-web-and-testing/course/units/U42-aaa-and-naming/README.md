# U42 — Arrange–Act–Assert; naming tests

**Phase 5**

## Where you are

You write unit tests. Structure and names make them readable as specs.

## What you will be able to do

- Structure tests as Arrange–Act–Assert (AAA).
- Name tests as behavior sentences.
- Avoid over-sharing setup that hides intent.
- Refactor messy tests into AAA.

## What you need already

- **U41**

## Time and energy

**40–70 minutes.**

## Why this exists

Tests are read more than written. Future you is a stranger.

## Plain-language teaching

### AAA

| Phase | Do |
|-------|-----|
| **Arrange** | Set up data/state |
| **Act** | Perform the one behavior under test |
| **Assert** | Check outcomes |

```javascript
test("createNote trims title", function () {
  // Arrange
  store.reset();
  // Act
  const note = store.createNote("  Hi  ", "");
  // Assert
  assert.equal(note.title, "Hi");
});
```

Comments optional once habit forms; blank lines can mark phases.

### Naming patterns

Good:

- `returns null when note id is missing`
- `rejects empty title with error message`

Bad:

- `test1`
- `works`
- `createNote` (no expected behavior)

Prefer: **unit + condition + result**.

### One behavior per test (guideline)

Multiple asserts ok if same behavior. Avoid testing create+delete+list in one case without reason.

### Helper setup

`function emptyStore() { store.reset(); }` is fine. Do not hide the Act in a helper with a cryptic name.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Arrange–Act–Assert | Test structure | |
| Behavior name | Spec-like title | |
| Over-assertion | Checking unrelated extras | |

## Worked example

Rename and restructure one messy test from U41 into AAA.

## Common errors

### Error: Assert then Act

Confusing order. Always act before assert.

### Error: Giant arrange

If setup is huge, maybe the unit is too coupled.

## Checkpoints

1. Three AAA phases?
2. What makes a good test name?
3. When multiple asserts OK?
4. Risk of cryptic helpers?

## Practice

### P1 — rewrite 3 tests with AAA + better names

### P2 — peer-read your names: can a stranger predict the assert?

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- BDD frameworks (Given/When/Then tools)

## Next unit

**U43 — Edge cases and deliberate failures**
