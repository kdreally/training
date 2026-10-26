# U40 — Test runners: discover, run, report

**Phase 5**

## Where you are

You can assert in a script. A **test runner** finds many tests, runs them, and reports pass/fail cleanly.

## What you will be able to do

- Explain what a test runner does.
- Use Node’s built-in test runner (`node:test`) with `node:assert`.
- Add an `npm test` script.
- Read a pass/fail report.

## What you need already

- **U25**, **U26**, **U39**
- Node 18+ recommended (built-in test runner)

## Time and energy

**70–100 minutes.**

## Why this exists

Hand-running `node check1.js && node check2.js` does not scale. Runners are the packaging for automated tests.

## Plain-language teaching

### Test runner jobs

1. **Discover** test files
2. **Run** tests (often isolated)
3. **Report** which passed/failed
4. Set process **exit code** (0 success, non-zero failure) for humans and CI later

### Why Node built-in first

No extra package required to start. Fits our “earn dependencies” culture. Third-party runners (Jest, etc.) can come later if needed.

### First test file

`math.test.js`:

```javascript
const test = require("node:test");
const assert = require("node:assert/strict");

function add(a, b) {
  return a + b;
}

test("add sums two numbers", function () {
  assert.equal(add(2, 3), 5);
});

test("add handles negatives", function () {
  assert.equal(add(-1, 1), 0);
});
```

Run:

```bash
node --test math.test.js
```

Or many files:

```bash
node --test
```

(Node discovers `*.test.js` patterns depending on version/docs — be explicit with paths if unsure.)

### package.json script

```json
"scripts": {
  "test": "node --test"
}
```

```bash
npm test
```

`test` script belongs with dev workflow; runner is built-in so no devDependency required yet.

### Anatomy

```javascript
test("readable name of behavior", function () {
  // arrange
  // act
  // assert
});
```

Names should read like specifications (U38).

### Failure report

Shows which test name failed and assertion details. Use U09 skills.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Test runner | Tool that runs tests + reports | Not only CI |
| Test case | One `test(...)` | |
| Exit code | 0/ok vs non-zero/fail | |
| `node:test` | Built-in runner module | |
| Discover | Find test files | |

## Worked example

Two tests green; break one; see red name; fix.

## Common errors

### Error: Old Node without test runner

Upgrade Node LTS (U12).

### Error: Forgetting npm test script

Document command in README anyway.

### Error: Vague test names

`test("test1")` helps no one.

## Checkpoints

1. Four jobs of a runner?
2. Command to run tests?
3. Why built-in first?
4. What does non-zero exit mean?

## Practice

### P1 — math.test.js + npm test

### P2 — force one failure; read report

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- Mocking
- Coverage
- Jest config mazes

## Next unit

**U41 — Unit tests**
