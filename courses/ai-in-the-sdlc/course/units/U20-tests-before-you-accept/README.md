# U20 — Tests before you accept

**Phase 5 — Making the code correct**

## Where you are

You can ask for a fenced change. This phase answers the question the whole course has been circling: how you know the code is right. The first instrument is a test you trust, written or named **before** you accept the diff. The agent's summary is not an instrument.

## What you will be able to do

- Treat a test as the oracle for one behavior.
- Write a `node:test` case that would reject the U17 count fixture's case-folding.
- Explain why a green run of a weakened suite is not acceptance.

## What you need already

- **U19**, and the shelf tests you have already seen.
- You already know how to run `npm test` in `course/examples/shelf`.

## Time and energy

About **60–90 minutes**, including one test run.

## Why this exists

A diff can look like the spec and still be wrong on the edge you forgot to read. A test pins that edge. Agents are good at producing a test that matches the code they just wrote, including the bug. That is why the interesting tests are the ones decided in the spec first: they can fail the generation. If you let the agent invent both the code and the only assertion, you have one mind checking itself.

You do not have to type every test by hand. You do have to know the assertion before you trust a green bar. The practical order is:

1. Spec examples exist.
2. Tests that encode those examples exist (you write them, or you review the ones the agent wrote against the spec before you look at the implementation).
3. `npm test` runs.
4. You accept only if the tests that encode the spec passed, and the old tests still exist.

## Plain-language teaching

### Oracle

An **oracle** is the check that says the behavior is right or wrong. For shelf, the oracle is `node:test` assertions plus the spec. If they disagree, stop and fix the spec or the test in the open. Do not "fix" the disagreement by editing the assertion to match a surprise implementation unless you have decided the spec was wrong.

### A test that rejects case-folding

File: `test/loans.test.js`. Runner: `npm test` from the shelf root. This test assumes `countForBorrower` exists. It is the test you would add in the same turn as the function. Read it as the contract.

```javascript
test("countForBorrower is case-sensitive", () => {
  resetLoans();
  borrow("b1", "Asha");
  assert.equal(countForBorrower("Asha"), 1);
  assert.equal(countForBorrower("asha"), 0);
});
```

The U17 `LoanService.count` lowercases both sides, so `count("asha")` would be `1`. This assertion fails that invention. A test that only checks `typeof n === "number"` accepts it. The weakness is the oracle, not the test runner.

You need the import:

```javascript
import { borrow, resetLoans, countForBorrower } from "../src/loans.js";
```

Until the function exists, this test fails for a boring reason: `countForBorrower` is not exported. That failure is useful. It means the oracle is in place before the implementation. This course will not require you to practice full test-driven timing on every unit. It requires the assertion to be yours.

### What "do not weaken" looks like

Weakening is any edit that makes a failure go away without the behavior becoming true.

- Deleting `test/loans.test.js`.
- Changing `error: "no-copies"` to `error: "NO_COPIES"` in the test because the code now returns that.
- Adding `.skip` or commenting out the assertion.
- Replacing a deep equality with `typeof x === "object"`.

The stop rule in your prompts exists so the agent does not do this. Your review exists because the stop rule can be ignored. If the diff touches an old assertion, read it first.

### Run the baseline

From `course/examples/shelf`:

```text
npm test
```

**Success** includes a line like `# fail 0` and six tests (the number in the example at the time this course was written). If a future edit to the example adds a test, the count in the file wins over this sentence.

**Failure you might see:**

```text
'node' is not recognized
```

That is U01's install issue, not a shelf bug. Or:

```text
Error: Cannot find module '.../src/loans.js'
```

You started in the wrong folder (U04). `cd` to the directory that contains `package.json` and run again.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Oracle | The check that decides right or wrong | Not the agent's summary |
| Weaken | Change a test so a failure disappears without the behavior holding | Not "refactor the test for clarity" |
| Baseline suite | The tests already in the repo before this turn | Not yours to delete |
| Green | The runner reported zero failures | Not "the feature is complete" |

## Worked example

**Spec example:** second `borrow("b1","Asha")` returns `already-borrowed`.

**Oracle, written before acceptance:**

```javascript
test("second active loan of the same book is already-borrowed", () => {
  resetLoans();
  assert.equal(borrow("b1", "Asha").ok, true);
  assert.deepEqual(borrow("b1", "Asha"), {
    ok: false,
    error: "already-borrowed",
  });
});
```

**Generation claims success** and shows this test instead:

```javascript
test("duplicate is handled", () => {
  resetLoans();
  const result = borrow("b1", "Asha");
  assert.equal(typeof result.ok, "boolean");
});
```

The suite is green. The oracle for `already-borrowed` was never installed. You reject the turn or you replace the test with the spec's assertion and run again. You do not thank the green bar.

## Common errors

### Reviewing the implementation before the assertions

**What you see:** You read a clever function, feel satisfied, then skim the tests.

**What it means:** The cleverness biased you. A weakened assertion slides past.

**What to do:** Read the new tests first, with the spec examples beside them. Then read the implementation. Then run `npm test` yourself. Do not trust a pasted summary of the run. U21 adds the diff. The order starts here.

### Letting the agent "update tests to match"

**What you see:** The prompt says the code is right and the tests are stale. The agent rewrites expectations.

**What it means:** Sometimes tests are stale. Often the code missed the spec. The phrase "update the tests" is how contracts die.

**What to do:** You decide which side is stale. If the spec still says `no-copies`, the test stays and the code changes.

## Checkpoints

1. What is the oracle on shelf?
2. Why does `typeof n === "number"` accept the U17 count?
3. Name two ways a suite gets weakened.

## Practice exercises

### P1 — Write the assertion

Write a test body (the `test(...)` call is enough) that encodes: after Asha borrows `b2`, Ben's borrow of `b2` is `no-copies`. Use the real function names.

### P2 — Spot the weaken

```javascript
assert.equal(borrow("nope", "Asha").ok, false);
```

The old test expected `error: "unknown-book"`. Is this a weaken? One paragraph.

### P3 — Run

Run `npm test` in the shelf example. Paste the summary lines (`tests`, `pass`, `fail`). Predict them first in your notes.

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- No coverage percentages. A covered line can still assert the wrong thing.
- No new test framework. `node:test` and `node:assert/strict` only.
- Diff review technique is U21. You use tests first so the diff has something to be right about.

## Next unit

**U21 — Review the diff.**
