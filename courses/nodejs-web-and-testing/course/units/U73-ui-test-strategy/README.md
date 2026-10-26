# U73 — UI test strategy vs unit/API pyramid

**Phase 8**

## Where you are

You can write unit, API, full-stack e2e, and stubbed UI tests. Strategy prevents a slow, brittle mountain of Playwright.

## What you will be able to do

- Place UI/E2E at the top of the pyramid with clear jobs.
- Choose the cheapest honest layer for a risk.
- Prune redundant Playwright tests.
- Write a short test strategy for your notes app.

## What you need already

- **U47**, **U71–U72**

## Time and energy

**40–70 minutes.**

## Why this exists

Teams drown in e2e. You will not.

## Plain-language teaching

### Updated pyramid

```text
         /  E2E UI (Playwright)  \     few journeys
        /------------------------\
       /   HTTP API tests         \   contract
      /----------------------------\
     /  integration (modules)       \
    /--------------------------------\
   /  unit (pure + store rules)       \  many, fast
  --------------------------------------
```

### Job descriptions

| Layer | Job |
|-------|-----|
| Unit | Rules: validation, store ids, pure helpers |
| API | Status codes, JSON bodies, auth later |
| E2E | Critical user journeys & wiring |
| Stubbed UI | Hard-to-force UI error states |

### Decision questions

1. Can a unit test catch this cheaper?  
2. Is it part of the HTTP contract? → API test  
3. Does it need a real browser (DOM, fetch wiring, labels)? → Playwright  
4. Is it the same journey twice? → delete one  

### Example pruning

- 10 Playwright tests all creating notes with different titles → keep 1–2  
- Title trim rule → unit test; one e2e for “empty shows error”  

### Speed budget (mental)

If e2e suite needs coffee every run, you over-invested at the top. Prefer fixing lower layers.

## Vocabulary

| Term | Plain meaning |
|------|---------------|
| Test strategy | Written choices about what to test where |
| Redundant test | Same risk covered again without new info |
| Critical journey | Path business/users cannot afford broken |

## Worked example

Write a one-page strategy for notes app: list unit/API/e2e counts targets and journey names.

## Common errors

### Error: “Playwright only” portfolio

Looks impressive; fails as a feedback loop.

### Error: Zero e2e because “unit is enough”

Wiring bugs ship.

## Checkpoints

1. Job of e2e vs API?
2. Two pruning heuristics?
3. When stubbed UI?
4. What is a critical journey for your app?

## Practice

### P1 — inventory your tests by layer

### P2 — cut or justify each Playwright test

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- Enterprise QA org charts

## Next unit

**U74 — Frontend + Playwright capstone**
