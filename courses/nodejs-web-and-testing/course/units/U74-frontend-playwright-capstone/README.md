# U74 — Capstone: frontend + Playwright

**Phase 8**

## Where you are

Ship an assessor-runnable **full-stack notes (or tasks) app** with UI, API, unit/API tests, and a **small Playwright suite**.

## What you will be able to do

- Deliver one project: static UI + `/api` + in-memory data.
- Keep `npm test` (or documented unit/API) and `npm run test:e2e` green.
- Document cold start for a stranger.
- Show isolation + a few high-value journeys.

## What you need already

- **U55–U73** skills as applicable; backend from Phase 4–5

## Time and energy

**6–12 hours** across days. Pace yourself.

## Why this exists

Track B ends with evidence, not vibes.

## Plain-language teaching

### Minimum product

| Area | Minimum |
|------|---------|
| UI | List + create form + visible errors |
| API | health, list, create, get-or-404 as you already built |
| Serve | Express static + API same origin |
| Unit tests | Store/validation still present |
| API tests | HTTP contract still present |
| E2E | ≥3 Playwright journeys incl. happy + validation |
| Isolation | Reset or equivalent |
| Config | baseURL + webServer (preferred) |
| README | install, start, test, test:e2e, env notes |

### Optional polish

- Stubbed error UI test (U72)  
- `data-testid` consistency  
- Keyboard-usable form  

### Assessor cold path

```bash
npm install
npx playwright install chromium
npm test
npm run test:e2e
npm start   # if they want to click manually
```

If `playwright install` is required, README must say so.

### What “done” feels like

A trainer clones, installs, runs tests, sees green, clicks the UI once, understands structure from README — without calling you.

## Vocabulary

| Term | Plain meaning |
|------|---------------|
| Capstone | Culminating integrated project |
| Cold start | Run from clean install |

## Worked example

Your U61+ app cleaned up with e2e folder and scripts is enough if it meets the table.

## Common errors

### Error: E2E only, unit/API deleted

Out of strategy — restore pyramid.

### Error: README assumes app already running forever

Document webServer or two-terminal flow clearly.

### Error: Reset route open without note

Document `NODE_ENV=test` safety.

## Checkpoints

1. Minimum e2e count and kinds?
2. Same-origin serving?
3. Cold install steps?
4. What must stay from Phase 5?

## Practice

### P1 — gap checklist

### P2 — delete node_modules simulation: reinstall + all tests

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- React rewrite
- Cloud deploy
- Auth provider integration

## Next unit

**Track B complete.** Optional next paths: TypeScript, real DB, React, visual regression — outside core.
