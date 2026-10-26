# U55 — Why a frontend; the browser as a different runtime

**Phase 7 — Frontend (Track B)**

## Where you are

You can build and test **backends**. Users usually do not curl JSON all day. They use **pages in a browser**. This track teaches enough frontend to serve real people — then tests that UI with Playwright.

## What you will be able to do

- Explain frontend vs backend in one conversation diagram.
- Contrast **Node runtime** vs **browser runtime**.
- Name what this track will and will not teach (no React yet).
- State how Playwright fits later (UI automation, not now).

## What you need already

- **U27–U36** strongly; **U50** API ideal.
- Phase 5 testing culture (**U37+**) before Phase 8.

## Time and energy

**40–60 minutes.**

## Why this exists

Jumping to “install React + Playwright” smuggles ten ideas. We name the destination and the **browser as a place JS runs** — different from Node.

## Plain-language teaching

### The missing piece of the web conversation

| Side | Runs where | Job |
|------|------------|-----|
| Backend (you built) | Node on a server/machine | Data, rules, HTTP API |
| Frontend (this track) | **Browser** on the user’s machine | Structure, look, interaction, call API |

Same human goal (e.g. manage notes); two programs cooperating over HTTP.

### Browser runtime ≠ Node

| | Browser | Node |
|--|---------|------|
| Primary job | Show documents/apps to humans | Run general programs/servers |
| DOM | Yes — page as objects | No (unless you add libraries) |
| `fs` / listen on ports | No (normal pages) | Yes |
| JS language core | Yes | Yes |

`document`, `window`, clicking buttons: **browser world**.  
`require('http')`, `npm test` for API: **Node world**.

You already know JS *language*. You are learning **new APIs and environment**.

### What we will build

A **small multi-page or single-page-ish UI** in plain HTML/CSS/JS that:

- Lists items from your API
- Creates items via a form
- Shows errors clearly

Served as **static files** (and later by Express). No framework required for competence.

### What we will not prioritize

- React/Vue/Svelte (later optional)
- Fancy design systems
- Pixel-perfect art
- CSS-in-JS wars

### Where Playwright sits (preview only)

**Playwright** is a tool that **drives a real browser** like a careful robot user: open page, click, fill, assert text. That is Phase 8. First you need a page worth testing.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Frontend | Browser-side UI program/docs | Not “the designer only” |
| Browser runtime | Where page JS executes | Not Node |
| DOM | Browser’s object model of the page | Later unit deepens |
| Static files | HTML/CSS/JS files sent as-is | Not “no JavaScript” |
| SPA | Single-page app pattern | Not required here |
| E2E / UI test | Browser-level automated check | Playwright later |

## Worked example — full path for “add a note”

1. User opens `http://localhost:3000/` (HTML page).
2. Browser runs page JS; `fetch` POST to `/api/notes`.
3. Your Express API validates and stores.
4. Page updates the list from GET `/api/notes`.
5. (Later) Playwright does steps 1–4 without a human hand.

## Common errors

### Error: “I already did HTML in 2019 so skip”

You may skim syntax; still learn **how it connects to your API and tests**.

### Error: Treating frontend as only CSS beauty

Structure + behavior + honest errors matter more than gradients.

## Checkpoints

1. Frontend vs backend one sentence each?
2. Name one API the browser has that Node does not.
3. Name one API Node has that a normal page does not.
4. Why not Playwright on day one of this track?

## Practice

### P1 — Diagram

ASCII: Browser ↔ HTTP ↔ Your API ↔ memory store.

### P2 — Inventory

List 3 user actions your notes API still needs a UI for.

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- Writing HTML/CSS yet
- Installing Playwright

## Next unit

**U56 — HTML as structure**
