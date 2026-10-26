# U38 — Why automate; tests as executable specifications

**Phase 5**

## Where you are

You felt manual testing’s cost. Automation is the next tool — still explained before used heavily.

## What you will be able to do

- Argue for automated tests with concrete reasons.
- Explain “executable specification.”
- Describe the feedback loop: change → run tests → green/red.
- Name fears automation reduces and fears it does not.

## What you need already

- **U37**

## Time and energy

**40–60 minutes.**

## Why this exists

People automate to impress, or refuse tests from trauma. We pick a professional middle: tests as **safety and clarity**.

## Plain-language teaching

### Automation idea

Write a program that:

1. Puts the system in a known state (or uses pure functions)
2. Performs an action
3. **Asserts** expected outcomes
4. Reports pass/fail

Run it hundreds of times cheaply.

### Executable specification

A good test names behavior:

`createNote with empty title returns 400`

That is documentation that **cannot rot silently** as easily as a wiki — if it fails, you know.

### Feedback loop

```text
edit code → run tests → red/green → fix or continue
```

Green is not moral purity; it means “checks we wrote still pass.”

### What tests reduce

- Fear of changing code
- Repeat manual labor
- “Works on my machine” ambiguity (somewhat)

### What tests do not do

- Guarantee no bugs
- Replace thinking
- Fix unclear requirements magically
- Measure your worth

### Cost of tests

Writing time, maintenance when requirements change, bad tests that lock bad design. Still usually worth it for logic and APIs you will touch again.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Automated test | Programmed check | Not CI only |
| Assertion | Claim that must be true | |
| Red/green | Fail/pass | |
| Spec | Specification of behavior | |
| False confidence | Green but weak tests | |

## Worked example

Manual case “missing title → 400” becomes an automated test that sends POST and asserts status 400 — next units implement.

## Common errors

### Error: Testing implementation details only

Brittle tests. Prefer observable behavior.

### Error: Zero tests then 1000 at once

Grow with features.

## Checkpoints

1. What does an automated test do?
2. Executable specification meaning?
3. Two benefits, two non-benefits?
4. What is red/green loop?

## Practice

### P1 — rewrite 3 manual cases as test titles

### P2 — essay: fear you want tests to reduce

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- Writing runner code yet (U39–U40)

## Next unit

**U39 — Assertions**
