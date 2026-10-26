# U48 — Regression: a bug becomes a test

**Phase 5**

## Where you are

Bugs will happen. Professionals **trap** them so they cannot return silently.

## What you will be able to do

- Define regression test.
- Follow bug → failing test → fix → green workflow.
- Write a regression test from a bug report.
- Prefer the smallest layer that catches the bug.

## What you need already

- **U41–U45**

## Time and energy

**60–90 minutes.**

## Why this exists

Fixing without a test invites infinite recurrence.

## Plain-language teaching

### Regression

A **regression** is when something that worked (or was fixed) breaks again.  
A **regression test** fails if that bug returns.

### Workflow

1. Reproduce bug (manual or automated attempt)
2. Write a test that **fails** because of the bug (red)
3. Fix code
4. Test **passes** (green)
5. Keep the test forever (or until requirement changes)

### Example

Bug: whitespace-only title accepted.  
Test: POST/ create with `"   "` expects 400.  
Fix validation.  
Test stays.

### Choose layer

If pure validator bug → unit test.  
If only wrong status mapping → API test.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Regression | Re-break | |
| Red-green | Fail then pass | TDD-related |
| Reproduce | Make bug happen again | |

## Worked example

Whitespace title regression as above.

## Common errors

### Error: Fix without test

“I’ll remember.” You will not.

### Error: Huge vague test

Pin the bug precisely.

## Checkpoints

1. Regression meaning?
2. Four workflow steps?
3. Why keep the test?
4. Layer choice?

## Practice

### P1 — invent a bug in store, trap it

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- Production incident management full process

## Next unit

**U49 — Coverage as a flashlight**
