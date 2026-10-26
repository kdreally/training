# U50 — Capstone: feature + unit + API tests

**Phase 5**

## Where you are

Assemble a coherent mini-project proving backend + testing craft.

## What you will be able to do

- Ship a small notes/tasks API with clear README.
- Include unit tests and HTTP tests.
- Use npm scripts for start and test.
- Submit something a human assessor can run and grade.

## What you need already

- Phase 4–5 skills (**U31–U49** as applicable)

## Time and energy

**4–10 hours** across days. Permission to pace.

## Why this exists

Scattered exercises are not the same as an integrated artifact. Capstone is evidence.

## Plain-language teaching

### Minimum product

**Task/Notes API** (pick one domain):

| Method | Path | Behavior |
|--------|------|----------|
| GET | `/health` | `{ ok: true }` |
| GET | `/items` | list |
| GET | `/items/:id` | one or 404 |
| POST | `/items` | create with validation → 201/400 |
| (optional) | PATCH/DELETE | if you can test them |

In-memory persistence OK.

### Minimum tests

- ≥6 unit tests on store/validation
- ≥5 HTTP tests on contracts
- `npm test` green
- At least one regression-style edge (whitespace title, etc.)

### Project shape

Prefer U36 layout: `src/app.js`, `src/server.js`, tests beside or under `test/`.

### README must include

- What it is
- Node version assumption
- `npm install`
- `npm start`
- `npm test`
- Example curls

### Assessment mindset

Assessor clones/opens folder, installs, tests, starts, curls. Reduce friction.

## Vocabulary

| Term | Plain meaning |
|------|---------------|
| Capstone | Culminating project |
| Smoke check | Quick sanity run |

## Worked example

Your U35–U45 project cleaned and completed is enough if it meets the table.

## Common errors

### Error: Features without tests

Capstone requires both.

### Error: Unreadable README

Assessor cannot run → lost points.

### Error: Committed `node_modules`

Usually omit; keep lockfile.

## Checkpoints

1. Minimum routes?
2. Minimum tests?
3. Scripts required?
4. README contents?

## Practice

### P1 — gap checklist against your project

### P2 — full green run on clean install simulation

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- Deploy to cloud
- Frontend SPA
- Auth/OAuth

## Next unit

**U51 — Refactoring with tests** (Phase 6 craft)
