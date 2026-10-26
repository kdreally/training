# U43 — Edge cases and deliberate failure cases

**Phase 5**

## Where you are

Happy-path tests are not enough. Edges and failures pin real behavior.

## What you will be able to do

- Inventory edge cases for a function/API.
- Write tests that expect errors/validation failures.
- Test empty, zero, boundary, duplicate, missing.
- Explain “characterization” when behavior is unclear.

## What you need already

- **U41–U42**

## Time and energy

**60–90 minutes.**

## Why this exists

Production is all edges. Tests that only check ideal input lie by omission.

## Plain-language teaching

### Edge case

An **edge case** is an uncommon but valid (or provocatively invalid) input at the boundary of assumptions.

Examples for notes:

- title of only spaces
- very long title
- missing body
- id `0` or negative
- empty list
- non-numeric id param

### Deliberate failure cases

Tests where the **correct** outcome is failure: 400/404/throw.

```javascript
test("validateTitle rejects whitespace-only", function () {
  assert.equal(validateTitle("   ").ok, false);
});
```

### Boundary thinking

If rule is `length >= 1`, test length 0 and 1.  
If max 100, test 100 and 101.

### Characterization tests

When legacy behavior is unclear, write a test that documents **current** behavior, then decide if it is desired. Honesty over fantasy.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Edge case | Boundary scenario | Not only “errors” |
| Failure case | Expected reject/error path | |
| Boundary | On either side of a limit | |
| Characterization | Document actual behavior | |

## Worked example

Add tests for whitespace title and missing note id.

## Common errors

### Error: Only invalid cases

Still keep happy paths. Balance.

### Error: Undefined edges

If unspecified, pick a rule, document it, test it.

## Checkpoints

1. Edge vs happy path?
2. Why test failures?
3. Boundary example?
4. Characterization use?

## Practice

### P1 — brainstorm 10 edges for notes API

### P2 — automate at least 5

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- Fuzz testing full theory
- Property-based testing

## Next unit

**U44 — Integration tests**
