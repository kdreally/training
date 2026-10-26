# U68 — Actions: click, fill, submit

**Phase 8**

## Where you are

You can find elements. Now **drive** them like a user: type, click, submit — and assert outcomes.

## What you will be able to do

- `fill` inputs and `click` buttons.
- Submit forms via button or Enter where appropriate.
- Assert list text and error messages after actions.
- Keep AAA structure in E2E tests.

## What you need already

- **U59**, **U66–U67**

## Time and energy

**70–100 minutes.**

## Why this exists

Your manual plan’s “type title, click Add” becomes code. This is the core of UI automation.

## Plain-language teaching

### Common actions

```javascript
await page.getByTestId("note-title").fill("Buy milk");
await page.getByRole("button", { name: "Add note" }).click();
```

| Action | Meaning |
|--------|---------|
| `fill` | Clear and type text (good for inputs) |
| `click` | Click |
| `press("Enter")` | Keyboard key |
| `check` / `selectOption` | Later if needed |

### Example journey test

```javascript
test("user can add a note and see it listed", async function ({ page }) {
  // Arrange
  await page.goto("/");

  // Act
  await page.getByTestId("note-title").fill("Buy milk");
  await page.getByTestId("note-submit").click();

  // Assert
  await expect(page.getByTestId("note-list")).toContainText("Buy milk");
});
```

### Validation journey

```javascript
test("empty title shows error", async function ({ page }) {
  await page.goto("/");
  await page.getByTestId("note-submit").click();
  await expect(page.getByTestId("error")).toBeVisible();
  await expect(page.getByTestId("error")).not.toHaveText("");
});
```

(Adjust to your exact error behavior.)

### clear vs fill

`fill` replaces content. For append-like behavior, use `type` carefully — prefer `fill` for determinism.

### Don’t fight the app

If the app requires waiting on network, prefer Playwright expects (auto-wait) over random `sleep` (U69).

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Action | User-like interaction | |
| `fill` | Set input value | |
| Journey test | Multi-step flow | |
| `toContainText` | Assert text inside locator | |

## Worked example

Green “add note” test against your running app with clean state (U70 isolation deepens).

## Common errors

### Error: Clicking before field filled

Await each action in order; usually fine if sequential awaits.

### Error: Asserting too early without expect

Use Playwright `expect` which retries; raw checks may flake (U69).

### Error: Hardcoded data colliding across tests

Shared server memory: tests pollute each other → U70.

## Checkpoints

1. fill vs click roles?
2. AAA in an e2e test?
3. How assert a new list item?
4. Why avoid sleep for now?

## Practice

### P1 — add-note journey green

### P2 — empty-title journey green

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- File upload
- Drag and drop
- Multi-tab complex flows

## Next unit

**U69 — Waiting, auto-wait, flakiness**
