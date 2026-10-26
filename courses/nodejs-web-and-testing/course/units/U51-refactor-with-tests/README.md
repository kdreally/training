# U51 — Refactoring with tests as a safety net

**Phase 6 — Craft**

## Where you are

Capstone works. Now improve structure **without changing behavior** — tests prove it.

## What you will be able to do

- Define refactoring.
- Perform a small refactor with tests green before/after.
- List safe refactors vs risky changes.
- Use tests as permission to clean code.

## What you need already

- **U50** (or equivalent suite)

## Time and energy

**60–120 minutes.**

## Why this exists

Fear freezes messy code. Tests unfreeze improvement.

## Plain-language teaching

### Refactoring

**Refactoring** = change internal structure without changing external behavior.

Not: new features. Not: bugfixes (those change behavior intentionally).

### Workflow

1. Tests green
2. Make a small structural change
3. Tests still green
4. Commit/save checkpoint
5. Repeat

### Safe examples

- Rename variables for clarity
- Extract function
- Split file
- Move validation helper

### Risky (not pure refactors)

- Changing status codes
- Altering validation rules
- Renaming JSON fields clients use

Those need deliberate test updates as **requirement changes**.

## Vocabulary

| Term | Plain meaning |
|------|---------------|
| Refactor | Same behavior, better structure |
| Safety net | Tests that catch breaks |
| Behavior | Externally observable results |

## Worked example

Extract `sendJson` helper; tests stay green.

## Common errors

### Error: Big-bang rewrite

Small steps.

### Error: Refactor + feature mixed

Separate commits/submissions mentally.

## Checkpoints

1. Refactor definition?
2. Workflow steps?
3. Example safe vs unsafe?
4. Role of tests?

## Practice

### P1 — one extract-function refactor on capstone

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## Next unit

**U52 — README for another human**
