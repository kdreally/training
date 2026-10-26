# U71 — Full stack E2E: UI + their API

**Phase 8**

## Where you are

Pieces work. Now treat **one user journey** as the product: browser UI + real API + real store — started reliably for tests.

## What you will be able to do

- Configure Playwright `webServer` to start your app (or document a solid manual protocol).
- Write multi-step journeys that hit real endpoints through the UI.
- Keep e2e few and valuable.
- Read failures as UI vs API vs test-setup.

## What you need already

- **U61**, **U68–U70**

## Time and energy

**80–120 minutes.**

## Why this exists

The point of Playwright here is **confidence in the assembled system**, not mocking the world away (that’s U72 optional).

## Plain-language teaching

### webServer config

Playwright can start your app before tests:

```javascript
// playwright.config.js
const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./e2e",
  use: {
    baseURL: "http://127.0.0.1:3000"
  },
  webServer: {
    command: "node src/server.js",
    url: "http://127.0.0.1:3000/api/health",
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000
  }
});
```

| Field | Meaning |
|-------|---------|
| `command` | How to start the app |
| `url` | Wait until this URL responds (ready check) |
| `reuseExistingServer` | Locally reuse if already running; CI usually fresh |
| `timeout` | How long to wait for boot |

Use a **health** endpoint so “server accepted TCP” is not enough — app is ready.

Set `NODE_ENV=test` in command if you need reset routes:

```text
command: "cross-env NODE_ENV=test node src/server.js"
```

(On Windows without cross-env, use a small npm script that sets env portably, or document PowerShell env syntax your OS needs.)

### Journey quality bar

Good e2e:

- Create item via UI → appears  
- Validation error via UI  
- Optional: reload page → data still from API  

Avoid cloning every unit case.

### Debugging failure layers

| Symptom | Look at |
|---------|---------|
| webServer timeout | start command, port, health path |
| goto refused | baseURL vs listen host |
| UI error message from API | backend validation/logs |
| Element not found | locator/markup |
| Intermittent | isolation/waits |

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| webServer | Playwright-managed app start | Not Express middleware |
| Ready URL | Probe that app is up | |
| Full stack e2e | UI + real backend path | |
| CI | Machine that should not reuse random local servers | |

## Worked example

`npx playwright test` alone boots server, runs journeys, exits.

## Common errors

### Error: Ready URL is `/` but static slow/wrong

Prefer `/api/health` JSON.

### Error: Port already in use with reuseExistingServer false

Kill old process or change port consistently in app + config.

### Error: Server command wrong working directory

Run from package root; use npm script `"start": "node src/server.js"`.

## Checkpoints

1. What webServer does?
2. Why health URL?
3. What belongs in e2e vs unit?
4. reuseExistingServer local vs CI?

## Practice

### P1 — webServer config green from cold

### P2 — 3 high-value journeys only

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- Deployed staging e2e
- Multi-service docker compose

## Next unit

**U72 — Network mock/stub in browser tests**
