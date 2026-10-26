# U64 — Browser automation; what Playwright is (and is not)

**Phase 8**

## Where you are

You have a manual UI plan. **Browser automation** means a program drives a browser to perform those steps. **Playwright** is one such tool.

## What you will be able to do

- Define browser automation / E2E UI testing in plain words.
- Explain Playwright’s role vs unit tests vs API tests.
- Know Playwright is not a browser replacement for users; not a unit test runner for pure functions.
- Preview install pieces without installing yet (next unit).

## What you need already

- **U63**, packages/npm (**U19–U26**), Phase 5 culture

## Time and energy

**45–70 minutes.**

## Why this exists

“Just add Playwright” without a mental model creates copy-paste config fear. Name the tool and its job first.

## Plain-language teaching

### Browser automation

A **library/driver** launches or connects to a browser (Chromium, Firefox, WebKit), then:

1. Opens a URL  
2. Finds elements (locators)  
3. Types, clicks, navigates  
4. Asserts text/visibility/URL  
5. Reports pass/fail  

Like a careful intern following your manual plan very fast.

### What Playwright is

**Playwright** (by Microsoft) is a **browser automation toolkit** with a first-class **test runner** (`@playwright/test`) popular for end-to-end web tests.

It can:

- Control Chromium/Firefox/WebKit  
- Auto-wait for elements (U69 deepens)  
- Record traces on failure (later awareness)  
- Run headed (see browser) or headless (no visible window)

### What Playwright is not

| Not this | Reality |
|----------|---------|
| A replacement for unit tests | Still use `node:test` for pure logic |
| A replacement for API tests | HTTP contract tests stay cheaper for APIs |
| “The browser” users install | Drives browsers for tests |
| Magic that fixes flaky product code | Flaky app → flaky tests |
| Only visual screenshot tool | Can do screenshots; main path is interaction + assertions |

### How it fits the pyramid

```text
        [ Playwright UI/E2E ]   ← few, high-value journeys
     [ HTTP/API tests ]
  [ integration ]
[ many unit tests ]
```

### Pieces you will meet (preview)

| Piece | Role |
|-------|------|
| `@playwright/test` | npm package: test runner + API |
| Browser binaries | Downloaded Chromium etc. for tests |
| `playwright.config.js` | How tests run (base URL, webServer…) |
| Spec files | `*.spec.js` tests you write |

Install and first green test: **U65–U66**.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Automation | Program performs steps | Not CI alone |
| Headless | Browser without visible UI | Still a real browser engine |
| Headed | You see the browser | Good for debugging |
| Locator | Way to find an element | U67 |
| Spec | Test file/case | |
| WebServer config | Auto-start app for tests | U71 |

## Worked example — map one manual case

Manual: “Submit empty title → see error.”  
Playwright (concept): goto `/` → click submit → expect error test id visible with text.

You will write real syntax soon.

## Common errors

### Error: Planning to re-test every unit rule only in Playwright

Slow and brittle. Keep unit/API tests; UI for journeys and wiring.

### Error: Thinking headless means “fake browser”

Headless is still a browser engine; just not drawn on screen.

## Checkpoints

1. What does browser automation do?
2. Playwright vs node:test roles?
3. Headless meaning?
4. Why few E2E tests?

## Practice

### P1 — Rewrite 5 manual cases as future Playwright titles

### P2 — Pyramid: where does each of your existing test kinds sit?

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- npm install playwright
- Writing specs

## Next unit

**U65 — Installing Playwright with understanding**
