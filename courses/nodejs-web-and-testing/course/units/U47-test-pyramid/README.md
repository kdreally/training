# U47 — Kinds of tests map (pyramid thinking)

**Phase 5**

## Where you are

You have unit, integration, API tests, and doubles. Now: **choose** the cheapest honest test for a risk.

## What you will be able to do

- Map test kinds to questions they answer.
- Apply a simple pyramid: many fast unit, fewer integration, fewer HTTP.
- Decide a test type for given scenarios.
- Spot redundant tests.

## What you need already

- **U41–U46**

## Time and energy

**40–60 minutes.**

## Why this exists

“Write more tests” without strategy wastes time. Strategy is part of craft.

## Plain-language teaching

### Questions → kinds

| Question | Kind |
|----------|------|
| Does this pure rule work? | Unit |
| Do my modules wire correctly? | Integration |
| Does the HTTP contract hold? | API/HTTP |
| Did an old bug return? | Regression (any layer; U48) |
| Does the whole UI flow work? | E2E (out of main path) |

### Pyramid (heuristic, not religion)

```text
      /\
     /E2E\        few, slow, brittle risk
    /------\
   /  API   \     fewer
  /----------\
 / integration\
/--------------\
/     unit      \ many, fast
----------------
```

Prefer pinning logic at unit level; use HTTP tests for contract; do not re-test the same rule five ways without reason.

### Cost of the wrong layer

- Only E2E/API: slow, vague failures  
- Only unit: miss wiring bugs  
- Balance.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Test pyramid | Distribution heuristic | Not a law |
| Brittle test | Breaks on irrelevant changes | |
| Feedback time | How long until result | |

## Worked example

Scenario: title validation rule → unit test on validator + one API test that 400s. Not twenty API tests for every string.

## Common errors

### Error: Pyramid as dogma

If your app is a thin HTTP shell, more API tests may be fine. Think.

### Error: Zero HTTP tests

Clients care about HTTP.

## Checkpoints

1. Pyramid idea?
2. Best layer for pure rule?
3. Best layer for status codes contract?
4. Why not only unit?

## Practice

### P1 — classify 8 scenarios into layers

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- Corporate testing policy docs

## Next unit

**U48 — Regression: bug becomes a test**
