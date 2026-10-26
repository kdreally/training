# U70 — Fixtures, beforeEach, test isolation

**Phase 8**

## Where you are

E2E tests share a **real app** with **in-memory data**. Without isolation, test order breaks results. **beforeEach** and clean state fix that.

## What you will be able to do

- Explain test isolation for UI tests.
- Use `test.beforeEach` to open a known page state.
- Reset backend data between tests (test-only endpoint or restart strategy).
- Avoid depending on test run order.

## What you need already

- **U41** isolation idea, **U68–U69**

## Time and energy

**70–100 minutes.**

## Why this exists

“Works alone, fails together” is almost always shared state. Professionals reset.

## Plain-language teaching

### Isolation

Each test should behave as if the world were created for it alone — as far as practical.

### beforeEach

```javascript
const { test, expect } = require("@playwright/test");

test.beforeEach(async function ({ page }) {
  await page.goto("/");
});
```

Runs before every test in the file: common arrange.

### Resetting API data

In-memory store keeps notes across tests. Options:

1. **Test-only reset route** (learning projects): `POST /api/test/reset` clears store — **never enable in real production** without protection.  
2. **Unique titles per test** — weaker; leftover data still piles up.  
3. **Restart server per test** — slow; usually overkill.

Course recommendation for toys: guarded reset endpoint or module reset used only when `NODE_ENV=test`.

```javascript
// server-side sketch
if (process.env.NODE_ENV === "test") {
  app.post("/api/test/reset", function (req, res) {
    store.reset();
    res.status(204).end();
  });
}
```

```javascript
test.beforeEach(async function ({ page, request }) {
  await request.post("/api/test/reset");
  await page.goto("/");
});
```

`request` is Playwright’s APIRequestContext — HTTP without UI. Great for setup.

### Fixtures (idea)

Playwright **fixtures** inject `page`, `request`, etc. You can build custom fixtures later; `beforeEach` is enough now.

### Independence check

Run tests in different order if your runner supports shuffle; or run each file alone. Failures that appear only in full suite scream shared state.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Isolation | Tests don’t depend on each other | |
| `beforeEach` | Hook before every test | |
| Fixture | Injected test dependency | |
| `request` | Playwright HTTP helper | Not browser fetch only |
| Order dependence | Pass only in certain order | Bug in suite design |

## Worked example

Reset + goto in beforeEach; two tests both create “A” without conflict.

## Common errors

### Error: Reset route left open in production deploy

Gate with env; document risk (U54).

### Error: Only clearing the DOM, not the API

Refresh reloads old notes from server.

### Error: One giant test that does everything

Split journeys; reset between.

## Checkpoints

1. Why isolation for e2e?
2. What beforeEach is for?
3. Why reset API not only UI?
4. Risk of test reset endpoints?

## Practice

### P1 — add reset + beforeEach

### P2 — two tests that would conflict without reset

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- Full custom fixture factories
- Parallelism tuning deep dive

## Next unit

**U71 — Full stack E2E: UI + API**
