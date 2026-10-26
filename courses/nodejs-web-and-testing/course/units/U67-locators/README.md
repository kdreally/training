# U67 — Locators: role, text, test id

**Phase 8**

## Where you are

You can open a page. **Locators** are how Playwright finds elements — choose them so tests survive redesigns.

## What you will be able to do

- Prefer role- and label-based locators.
- Use `getByTestId` with your U62 hooks.
- Avoid brittle CSS/XPath as a first resort.
- Read “strict mode” violations and narrow locators.

## What you need already

- **U62**, **U66**

## Time and energy

**60–90 minutes.**

## Why this exists

`page.locator("div > div:nth-child(3) > span")` is a future outage. Locator choice is a design skill.

## Plain-language teaching

### Locator

A **locator** is a lazy handle describing **how to find** element(s). Playwright resolves it when you act or assert, and can **retry** until ready (U69).

### Preferred order (course guidance)

1. **Role + name** — how users and assistive tech see it  
2. **Label** — form fields  
3. **Test id** — when you own the app and need stability  
4. **Text** — careful with duplicates  
5. **CSS** — last resort for learning projects  

### Examples

```javascript
page.getByRole("button", { name: "Add note" });
page.getByLabel("Title");
page.getByTestId("note-title");
page.getByText("Could not load notes");
```

### Test id

Requires markup: `data-testid="note-title"` (default). Configure alternate attribute only if you must.

```javascript
await page.getByTestId("note-submit").click();
```

### Strict mode

If a locator matches **multiple** elements, many actions throw. Good — ambiguity is a bug in the test or the page. Narrow:

- Better name/role  
- `.filter({ hasText: "…" })`  
- test id on the exact control  

### Anti-patterns

```javascript
// brittle
page.locator(".css-ab12x > span")
page.locator("xpath=//div[3]/button")
```

OK for emergencies; not your default.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Locator | Find strategy | Not the element snapshot only |
| Role | ARIA/semantic role (button, heading) | |
| Accessible name | Name exposed to a11y tree | Often label/button text |
| Strict mode | Fail on multiple matches | |
| Test id | data-testid hook | |

## Worked example

Rewrite a CSS-based click into `getByRole("button", { name: "Add note" })`.

## Common errors

### Error: Wrong role

A clickable `div` is not a button. Fix markup (U62) or use test id.

### Error: Partial name mismatch

`name: "Add"` may not match `"Add note"` depending on options; be precise.

### Error: Duplicate “Title” labels on page

Use test id or nest locator in a form: `page.getByTestId("note-form").getByLabel("Title")`.

## Checkpoints

1. Preferred locator order?
2. Why strict mode helps?
3. When test id is appropriate?
4. Why avoid nth-child CSS?

## Practice

### P1 — list every control on notes page with best locator

### P2 — one test using only role/label/testid (no raw CSS)

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- Full locator API encyclopedia
- Frame/shadow DOM deep dives

## Next unit

**U68 — Actions: click, fill, submit**
