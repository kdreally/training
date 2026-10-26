# U53 — Basic CI idea: a machine runs your tests

**Phase 6**

## Where you are

You run tests locally. **CI** means a remote machine also runs them on each change — concept first, light practice optional.

## What you will be able to do

- Define Continuous Integration at a beginner level.
- Explain why CI helps teams.
- Describe what a minimal CI config would run (`npm test`).
- Optional: add a simple GitHub Actions workflow if trainer uses GitHub.

## What you need already

- **U40**, green test suite
- Local tests trusted first

## Time and energy

**40–80 minutes.**

## Why this exists

CI is not magic. It is automation of `npm test` on a clean machine — catching “forgot to run tests” and environment surprises.

## Plain-language teaching

### CI

**Continuous Integration** practices: frequently combine work and **automatically verify** with builds/tests.

For you: on push/PR, a server runs:

```bash
npm install
npm test
```

and reports red/green.

### Why it matters

- Shared truth beyond one laptop  
- Pressure to keep tests green  
- Documents how to run the project in a clean environment  

### What CI is not

- Not a substitute for local testing  
- Not automatic deployment (that’s CD-adjacent)  
- Not proof of product quality alone  

### Minimal mental config

1. Start clean container/VM  
2. Checkout code  
3. Setup Node  
4. `npm install`  
5. `npm test`  
6. Fail the pipeline if tests fail  

### Optional GitHub Actions sketch

`.github/workflows/test.yml` (only if you use GitHub):

```yaml
name: test
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
      - run: npm install
      - run: npm test
```

If you do not use GitHub, write the steps as a checklist for any CI brand.

## Vocabulary

| Term | Plain meaning |
|------|---------------|
| CI | Automated verify on integrate |
| Pipeline | Sequence of CI steps |
| Clean environment | Fresh machine without your local junk |

## Worked example

Explain how CI would have caught a failing test you almost committed.

## Common errors

### Error: CI only, never local

Slow loop. Run local first.

### Error: CI without lockfile

Flaky version resolution — keep lockfile.

## Checkpoints

1. CI definition?
2. Minimal steps?
3. Why clean machine?
4. CI vs local?

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## Next unit

**U54 — Ethics: deps, secrets, shipping keys**
