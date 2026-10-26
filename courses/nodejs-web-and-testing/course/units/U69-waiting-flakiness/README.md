# U69 — Waiting, auto-wait, and flakiness

**Phase 8**

## Where you are

UI tests sometimes **pass then fail** without code “logic” changes. That is often **timing**. Playwright’s **auto-wait** helps — if you use `expect` and locators correctly.

## What you will be able to do

- Explain why UI tests flake.
- Prefer auto-waiting assertions over `setTimeout` / fixed `waitForTimeout`.
- Use `expect` retrying as the default wait mechanism.
- Know when an explicit wait is justified (rare).

## What you need already

- **U68**, **U18** async intuition

## Time and energy

**60–90 minutes.**

## Why this exists

Learners blame themselves for flakes. Usually the test assumed the network/DOM was ready **instantly**. We teach the real model.

## Plain-language teaching

### Flaky test

A **flaky** test sometimes passes and sometimes fails **without meaningful product change** — often race conditions.

### Why races happen

1. `goto` finished but JS still fetching  
2. Click happened before button enabled  
3. Assert ran before list re-rendered  
4. Shared state from a previous test  

### Auto-wait (Playwright idea)

Before acting, Playwright waits for elements to be **actionable** (attached, visible, stable, enabled — details simplified).  
`expect` **retries** until timeout if condition not yet true.

```javascript
// Good: expect retries until text appears or timeout
await expect(page.getByTestId("note-list")).toContainText("Buy milk");
```

```javascript
// Bad default: fixed sleep
await page.waitForTimeout(3000); // brittle, slow, still can fail
```

Fixed sleeps are **not** your first tool. They make suites slow and still race.

### Timeouts

If something never appears, test fails after timeout. That failure is information: wrong locator, app bug, or server not running.

Increase timeout only with a reason — not as a lifestyle.

### Explicit waits (occasional)

```javascript
await page.getByTestId("note-list").waitFor({ state: "visible" });
```

Prefer assert-style expects when they express the outcome you care about.

### Debugging flakes

1. Run headed  
2. Use Playwright trace/UI mode when available (`npx playwright test --ui` or `--trace on` — explore after basics)  
3. Check for shared server state (U70)  
4. Log API errors in UI  

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Flaky | Intermittent pass/fail | Not “random computer hate” |
| Auto-wait | Built-in waiting before actions/expects | |
| Race | Order of completion not guaranteed | |
| Timeout | Max wait before fail | |
| Deterministic | Same result each run | |

## Worked example

Replace `waitForTimeout(2000)` before list assert with `toContainText` only; suite faster and more stable.

## Common errors

### Error: `assert` from node on playwright locators without await/expect

Use Playwright `expect`.

### Error: Catching failures by sleeping longer forever

Hides real slowness/bugs.

### Error: Assuming flake = bad learner

Usually timing/state/design.

## Checkpoints

1. What is a flaky test?
2. Why is fixed sleep a poor default?
3. How does expect help waiting?
4. Name two flake causes besides “sleep too short.”

## Practice

### P1 — audit tests for waitForTimeout; remove if possible

### P2 — force a race (assert without waiting path) and watch fail; fix with expect

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- Full trace viewer mastery
- Network idle dogma for every test

## Next unit

**U70 — Fixtures, beforeEach, isolation**
