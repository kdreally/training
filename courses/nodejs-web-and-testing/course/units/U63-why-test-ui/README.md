# U63 — Why test the UI; manual browser checklist

**Phase 8 — Browser tests with Playwright**

## Where you are

You have a real UI on top of your API. Phase 5 taught automated checks for logic and HTTP. **UI tests** check what a human sees and does in the browser. Start **manual** — same pedagogy as U37.

## What you will be able to do

- Explain what UI/E2E tests protect that API tests do not.
- Write a manual browser test plan for your notes UI.
- Execute it and record pass/fail.
- Name limits of UI testing (speed, flakiness foreshadow).

## What you need already

- **U61–U62**, **U37–U38** mindset
- Running full-stack app

## Time and energy

**60–90 minutes.**

## Why this exists

Automating a broken or undefined UI journey multiplies pain. Manual plans define **expected user-visible behavior** first.

## Plain-language teaching

### What API tests do not see

| API test can prove | UI test can prove |
|--------------------|-------------------|
| POST returns 201 | Form submit shows the new title in the list |
| 400 JSON error | Error text appears for the user |
| JSON shape | Button is usable; page did not go blank |

Wiring bugs live between `fetch`, DOM updates, and wrong element ids.

### Manual UI case shape

| Field | Content |
|-------|---------|
| Name | Short journey name |
| Setup | Server running; empty DB/memory if needed |
| Steps | Open URL → type → click → observe |
| Expected | Visible text, no console panic |
| Actual | What you saw |
| Pass? | Y/N |

### Example cases

1. Home shows heading and empty list (or known state)
2. Create note → appears in list
3. Empty title → error visible; list unchanged
4. Refresh → data still there (if API-backed)
5. Keyboard: Tab to field, type, Enter submits

### Limits (honest)

- Slower than unit tests  
- More moving parts (browser, timing)  
- Should **not** replace unit/API tests (pyramid still holds; U73)

Automation (Playwright) will run these journeys faster and more often — after install and concepts (U64–U66).

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| UI test | Check interface behavior | |
| E2E | End-to-end path through system | Sometimes = UI + API together |
| Journey | Multi-step user flow | |
| Smoke test | Thin “is it alive” check | |

## Worked example

Fill a table while clicking through create + validation on your app.

## Common errors

### Error: Only testing happy path in the browser

Empty title and failed fetch matter.

### Error: No setup notes

“Works on my machine with leftover notes” is not a plan.

## Checkpoints

1. What can UI tests catch that API tests miss?
2. Parts of a manual UI case?
3. Why still keep unit/API tests?
4. What will Playwright automate later?

## Practice

### P1 — ≥8 manual UI cases

### P2 — execute and fill Actual/Pass

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- Installing Playwright yet

## Next unit

**U64 — Browser automation and what Playwright is**
