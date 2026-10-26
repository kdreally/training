# U26 — Dev vs runtime dependencies

**Phase 3**

## Where you are

Not every package ships with production. Some exist only to **build or test**. That split is `dependencies` vs `devDependencies`.

## What you will be able to do

- Define runtime vs development dependency.
- Install with `--save-dev` and read the result in package.json.
- Place a hypothetical test runner in the correct bucket.
- Explain why the split matters (install size, production deploys).

## What you need already

- **U24**, **U25**

## Time and energy

**40–60 minutes.**

## Why this exists

When Phase 5 adds a test runner, you must put it in the right place without superstition.

## Plain-language teaching

### Runtime dependency

Needed to **run the app** for real users: web framework, DB client, `ms` if used in production code.

Listed under `"dependencies"`.

### Development dependency

Needed to **develop or test** the app, not to serve users in production: test runners, formatters, linters, build tools.

Listed under `"devDependencies"`.

### Install as dev

```bash
npm install --save-dev some-dev-tool
```

(Exact tool optional here; you can install a tiny dev tool your trainer approves, or only write the conceptual answers if offline.)

Example shape after a dev install:

```json
"devDependencies": {
  "some-dev-tool": "^1.2.3"
}
```

### Production installs (awareness)

In deployment pipelines you may see:

```bash
npm install --production
```

or modern equivalents that skip devDependencies. That keeps production leaner.

### Where a test runner goes

**devDependencies.** Users hitting your API do not need your test framework installed on the server (generally).

### Where Express goes (preview)

**dependencies** — the server needs it to run (if you choose Express later).

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| `dependencies` | Runtime packages | |
| `devDependencies` | Develop/test packages | |
| `--save-dev` / `-D` | Install as devDependency | |
| Production | Real deployed running app | |

## Worked example — sorting drill

| Package role | Bucket |
|--------------|--------|
| HTTP framework used by server | dependencies |
| Test runner | devDependencies |
| Assertion lib only for tests | devDependencies |
| `ms` used in production feature | dependencies |
| `ms` used only in a throwaway script never shipped | maybe dev — judgment |

## Common errors

### Error: Putting everything in dependencies “just in case”

Bloated production installs; unclear intent.

### Error: Putting runtime libs in devDependencies

Production install may omit them → app crashes when deployed.

## Checkpoints

1. Runtime vs dev dependency?
2. Flag for dev install?
3. Where does a test runner go?
4. Why production might skip devDeps?

## Practice

### P1 — Sort 6 imaginary packages into buckets with reasons.

### P2 — Read a package.json (yours) and label each dep.

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- Actually configuring Jest/Vitest yet
- Peer dependencies

## Next unit

**U27 — Client vs server; what backend means**
