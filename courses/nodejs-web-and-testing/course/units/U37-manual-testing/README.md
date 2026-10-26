# U37 — What “testing” means; manual checks

**Phase 5 — Automated testing**

## Where you are

You can build a small API. Now the craft of **checking** it — starting **manually**, without runners.

## What you will be able to do

- Define testing without school-exam baggage.
- Write a manual test plan with expected results.
- Execute the plan against your API.
- List limits of manual testing.

## What you need already

- A small API from Phase 4 (U35/U36 ideal)
- **U09** debug habits

## Time and energy

**60–90 minutes.**

## Why this exists

Automation without knowing what you are checking produces false confidence. Manual plans teach **expected vs actual**.

## Plain-language teaching

### Reframe “test”

A **test** is a check that software behaves as specified.  
An **automated test** is a program that performs such a check.  
A **manual test** is a human performing the check.

Failing a test means **behavior mismatch** — not “you are a failure.”

### Manual test plan

For each case:

| Field | Content |
|-------|---------|
| Name | Short label |
| Setup | Any starting state |
| Action | What you do (curl/browser) |
| Expected | Status + body ideas |
| Actual | What happened |
| Pass? | Y/N |

### Example cases for notes API

1. Health returns 200 `{ok:true}`
2. Empty list returns `[]`
3. Create valid note → 201 + id
4. Create missing title → 400
5. Get existing id → 200
6. Get missing id → 404

### Why manual still matters forever

Exploratory testing, UX, “does this feel wrong?” — humans.  
Automation handles **regression** and speed.

### Limits of only-manual

- Slow
- Inconsistent (humans skip steps)
- Does not run on every change easily
- Hard to prove to others

That motivates automation (U38+).

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Test case | One scenario check | |
| Expected vs actual | Predicted vs observed | |
| Regression | Old bug returns | |
| Exploratory testing | Freeform human hunting | |
| Test plan | Written set of cases | |

## Worked example

Fill a table for create-valid-note while running curl; mark pass/fail honestly.

## Common errors

### Error: Only testing happy path

Bugs live in edges. Include 400/404.

### Error: No expected column

Without expected, everything “looks fine.”

## Checkpoints

1. Test vs automated test?
2. Parts of a manual case?
3. Two limits of manual-only?
4. Emotional reframe of fail?

## Practice

### P1 — write ≥8 cases for your API

### P2 — execute and fill Actual/Pass

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- Jest/node:test yet
- Coverage tools

## Next unit

**U38 — Why automate; tests as specs**
