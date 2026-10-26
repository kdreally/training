# U72 — Network: mock/stub API in browser tests (when earned)

**Phase 8**

## Where you are

Full-stack e2e is valuable and sometimes **slow or awkward** (backend down, error paths hard to force). Playwright can **intercept** network calls and return fake responses. Use this with judgment — not as a way to avoid testing the real stack.

## What you will be able to do

- Explain request interception / route mocking.
- Stub a GET/POST with `page.route`.
- Test an error UI path without breaking the real API.
- Know when to prefer real e2e instead.

## What you need already

- **U60**, **U71**, **U46** doubles mindset

## Time and energy

**70–100 minutes.**

## Why this exists

You already know doubles. Browser network stubs are doubles for **HTTP from the page’s point of view**.

## Plain-language teaching

### When stubbing helps

| Goal | Real API | Stub |
|------|----------|------|
| Prove UI+API wiring | Best | Weak |
| Prove UI shows “server says 500” | Hard to force | Easy |
| Backend flaky in class | Painful | Useful temporarily |
| Contract of API | Prefer API tests | Don’t only stub |

### `page.route` sketch

```javascript
test("shows error when list API fails", async function ({ page }) {
  await page.route("**/api/notes", async function (route) {
    if (route.request().method() === "GET") {
      await route.fulfill({
        status: 500,
        contentType: "application/json",
        body: JSON.stringify({ error: "nope" })
      });
      return;
    }
    await route.continue();
  });

  await page.goto("/");
  await expect(page.getByTestId("error")).toContainText("nope");
});
```

| Piece | Meaning |
|-------|---------|
| `page.route(urlPattern, handler)` | Intercept matching requests |
| `fulfill` | Respond with fake payload |
| `continue` | Let request hit real server |

### Risks

- Stubed tests can green while API is dead  
- Stubs drift from real JSON shapes  
- Too many stubs → testing a fantasy app  

**Rule:** keep a core of **real** full-stack journeys (U71). Add stubs for **hard error paths** or UI-only branches.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Intercept / route | Catch request in the browser automation layer | Not Express router |
| Fulfill | Fake response | |
| Continue | Pass through to network | |
| Contract drift | Stub shape ≠ real API | |

## Worked example

Stub GET 500 → assert error region; separate real test still loads notes from API.

## Common errors

### Error: Route pattern not matching

Wrong path/glob → real server still called or never stubbed. Log requests while debugging.

### Error: Stubbing everything

You no longer have e2e — say so and keep real tests.

### Error: Forgetting method checks

GET stub accidentally catches POST.

## Checkpoints

1. What problem does route mocking solve?
2. fulfill vs continue?
3. When prefer real e2e?
4. What is contract drift?

## Practice

### P1 — one stubbed failure UI test

### P2 — keep ≥2 real network tests

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- Full service virtualization platforms
- HAR replay deep dive

## Next unit

**U73 — UI test strategy vs the pyramid**
