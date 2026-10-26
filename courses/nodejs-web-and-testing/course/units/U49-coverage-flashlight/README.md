# U49 — Coverage as a flashlight, not a score

**Phase 5**

## Where you are

Tools can measure which lines ran during tests. **Coverage** is useful — and dangerously misused.

## What you will be able to do

- Define code coverage.
- Run a simple coverage tool if available, or reason without it.
- Interpret uncovered lines as questions, not shame.
- Reject coverage% as a sole quality metric.

## What you need already

- **U40–U45**

## Time and energy

**40–70 minutes.**

## Why this exists

Managers sometimes worship 100%. That produces empty tests. You will use coverage as a **flashlight**.

## Plain-language teaching

### Coverage

**Code coverage** measures which parts of code executed while tests ran (lines/branches).

High coverage means “tests touched this code,” **not** “code is correct.”

### Flashlight use

Uncovered lines ask: “Did we forget a case?”  
Maybe that branch is dead and should be deleted.  
Maybe you need a test.

### Not a trophy

100% with weak asserts is worse than 70% with sharp tests.  
Assert quality > coverage number.

### Running coverage (optional tool)

Node ecosystem often uses `c8` or `nodejs --experimental-test-coverage` depending on version.

Example exploration (try; if unavailable, write conceptual answers):

```bash
node --test --experimental-test-coverage
```

or install `c8` as devDependency and run `npx c8 npm test` — only after understanding U26.

If tooling fights you, skip install and complete conceptual assignment — honesty over cargo cult.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Line coverage | Lines executed | |
| Branch coverage | if/else paths | |
| False confidence | High % weak tests | |

## Worked example

Uncovered `404` branch → add API test for missing id.

## Common errors

### Error: Writing tests only to raise %

Tests without meaningful asserts.

### Error: Ignoring uncovered error handlers

Those are often production paths.

## Checkpoints

1. What coverage measures?
2. What it does not prove?
3. Flashlight meaning?
4. Why 100% can be fake?

## Practice

### P1 — list 3 uncovered risks you suspect without tools

### P2 — try coverage flag if available

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- Corporate coverage gates debate full essay

## Next unit

**U50 — Capstone: feature + tests together**
