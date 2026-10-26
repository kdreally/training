# U66 — First Playwright test: goto and assert text

**Phase 8**

## Where you are

Playwright is installed. First green test: **open a page, assert something visible**. Small on purpose.

## What you will be able to do

- Write a `*.spec.js` using `@playwright/test`.
- Use `page.goto` and `expect(...).toBeVisible` / `toHaveText`.
- Run tests with `npx playwright test`.
- Run headed mode once to *see* the browser.

## What you need already

- **U65**
- App serving a page (U61) **or** a tiny static `public/index.html` with known heading

## Time and energy

**60–90 minutes.**

## Why this exists

Confidence comes from one green path before forms, waits, and full stacks pile on.

## Plain-language teaching

### Test file shape

`e2e/home.spec.js`:

```javascript
const { test, expect } = require("@playwright/test");

test("home page shows Notes heading", async function ({ page }) {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Notes" })).toBeVisible();
});
```

| Piece | Meaning |
|-------|---------|
| `test("…", async …)` | One test case with a readable name |
| `{ page }` | Playwright gives you a fresh page (browser tab-like) |
| `await` | Browser work is asynchronous — wait for it |
| `page.goto("/")` | Navigate (uses `baseURL` from config if set) |
| `getByRole("heading", { name: "Notes" })` | Find by role + accessible name (U62/U67) |
| `expect(…).toBeVisible()` | Assert it shows |

### Run

App must be running **or** configured to start (U71 `webServer`). For this unit, **manual start** is OK:

Terminal 1:

```bash
npm start
```

Terminal 2:

```bash
npx playwright test
```

### See the browser

```bash
npx playwright test --headed
```

### npm script (recommended)

```json
"scripts": {
  "test:e2e": "playwright test",
  "test:e2e:headed": "playwright test --headed"
}
```

E2E script separate from `npm test` (unit/API) keeps layers clear — or document a combined strategy later.

### If goto fails

- Is server up?
- Is `baseURL` correct (`http://127.0.0.1:3000`)?
- Does `/` really return your HTML?

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| `page` | Tab-like automation context | |
| `goto` | Navigate to URL | |
| Assertion (Playwright) | `expect` from Playwright | Slightly different API than node:assert |
| Spec file | File of tests | |
| Headed run | Visible browser | |

## Worked example

Heading test above green against your notes home.

## Common errors

### Error: `connect ECONNREFUSED`

Nothing listening on baseURL. Start the app.

### Error: Strict mode / wrong role name

Heading text must match accessible name (visible text of `h1`).

### Error: Forgetting `await`

Assertions and actions return Promises — always await.

## Checkpoints

1. What does `page.goto` do?
2. Why `await`?
3. How do you run headed?
4. What must be true for baseURL to work?

## Practice

### P1 — heading visible test

### P2 — assert page title (`toHaveTitle`) if you set `<title>`

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- Filling forms (U68)
- Deep locator strategy (U67 next)

## Next unit

**U67 — Locators**
