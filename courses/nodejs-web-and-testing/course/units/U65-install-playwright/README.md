# U65 — Installing Playwright (with understanding)

**Phase 8**

## Where you are

You know what Playwright is. Now install it **deliberately**: package + browser binaries + where files land.

## What you will be able to do

- Add `@playwright/test` as a **devDependency** (why dev: U26).
- Install browser binaries Playwright needs.
- Explain generated config at a beginner level.
- Run the tool’s version/help and a dry command without panic.

## What you need already

- **U22–U26**, **U64**
- Node/npm working; network for download

## Time and energy

**45–90 minutes** (downloads can be large).

## Why this exists

Playwright install is heavier than `ms`. Blind `npx` without knowing *what* downloaded creates fear when disk fills or CI fails.

## Plain-language teaching

### What you are installing

1. **npm package** `@playwright/test` — JS API + test runner  
2. **Browser binaries** — Chromium (and optionally Firefox/WebKit) engines Playwright drives  

Binaries are not “your users’ Chrome settings.” They are browsers for tests.

### Prefer project-local install

In your app project (or a small `ui-tests` folder your trainer accepts):

```bash
cd notes-app
npm install -D @playwright/test
npx playwright install chromium
```

| Command piece | Meaning |
|---------------|---------|
| `npm install -D` | Save as **devDependency** — tests are not production runtime |
| `@playwright/test` | Package name |
| `npx playwright install chromium` | Download Chromium for Playwright |
| Start with **chromium only** | Smaller; enough for learning |

Later: `npx playwright install` for all browsers if needed.

### Init config (optional but common)

```bash
npx playwright init
```

or create `playwright.config.js` yourself (U66–U71 will use fields gradually).

A minimal config idea:

```javascript
// playwright.config.js
const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./e2e",
  use: {
    baseURL: "http://127.0.0.1:3000",
    headless: true
  }
});
```

| Field | Plain meaning |
|-------|----------------|
| `testDir` | Folder of `*.spec.js` tests |
| `baseURL` | Prefix so tests can `goto('/')` |
| `headless` | Hide browser window by default |

You may not need every wizard option. Prefer understanding over accepting 20 plugins.

### Verify

```bash
npx playwright --version
```

Should print a version. If “command not found,” check local install and `npx` from project root.

### Disk and time honesty

Browser downloads are **big**. On slow networks, wait. Corporate proxies may block — ask trainer.

### Security/trust reminder (U21/U54)

Official package name matters. Prefer docs from playwright.dev and npm package `@playwright/test`.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| devDependency | Needed to develop/test, not run prod app | |
| Browser binary | Engine Playwright launches | Not npm registry “package” only |
| `npx` | Run local/project binary | |
| baseURL | Default origin for tests | |
| testDir | Where specs live | |

## Worked example

After install, `package.json` shows `@playwright/test` under `devDependencies`. `npx playwright --version` works.

## Common errors

### Error: Installed only the npm package, never browsers

Tests fail looking for browsers. Run `npx playwright install chromium`.

### Error: Global install chaos

Stick to project `-D` install for this course.

### Error: Wrong directory

Install in the project you will test, not a random folder.

### Error: “Playwright” vs `@playwright/test`

Use **`@playwright/test`** for the test runner API taught here.

## Checkpoints

1. Why `-D` / devDependency?
2. What does `playwright install chromium` add?
3. What is baseURL for?
4. How do you verify install?

## Practice

### P1 — install package + chromium

### P2 — record versions in notes (node, playwright)

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- Writing full E2E journeys (soon)
- CI browser cache tuning

## Next unit

**U66 — First Playwright test**
