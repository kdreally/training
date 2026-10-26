# U27 — Workflow: debugging

**Phase 6 — Life-cycle workflows**

## Where you are

A bug fix starts when you can name the failing claim. **Debugging** is what you do when a test fails and you do not yet know which line is wrong. Agents are eager to rewrite the file until the red text goes away. That destroys the evidence. This unit teaches an evidence loop: hypothesis, one check, stop.

## What you will be able to do

- Read a failure output and state what it proves.
- Write a prompt that asks for a hypothesis and a single experiment, and forbids a rewrite.
- Refuse a debugging turn that edits production code before the hypothesis is checked.

## What you need already

- **U26 — Workflow: bug fix.**

## Time and energy

About **50–75 minutes**.

## Why this exists

Red test output is information. A rewrite replaces the information with a new program that may pass for a different reason. You then do not know whether the bug is gone or hidden. Debugging with an agent works when the agent is used as a reader of evidence, not as a janitor of the symptom.

## Plain-language teaching

### What a failure proves

Here is output from a shelf-style run. Read it before you imagine a fix.

```text
# tests 7
# fail 1
# pass 6

not ok 4 - returnLoan finds the loan by book id and borrower
  AssertionError [ERR_ASSERTION]: Expected values to be strictly equal:
  false !== true

  code: 'ERR_ASSERTION'
  expected: true
  actual: false
  operator: 'strictEqual'
```

What it proves:

- `returnLoan("b1", "Asha")` returned an object whose `ok` is `false`, after a borrow, in that test.
- Six other tests passed. `borrow` still records loans in those tests. The suite is not "all broken."

What it does not prove:

- It does not prove the `find` comparison is swapped. That is a **hypothesis** you get by reading the function.
- It does not prove you need a new library.
- It does not prove the test is wrong.

### Hypothesis, then one experiment

A hypothesis is a sentence you could be wrong about.

```text
Hypothesis: find compares item.bookId to borrower, so no loan matches.
Experiment: log or temporarily inspect the two sides being compared,
or read the find line and quote it. Do not change behavior yet.
```

The experiment can be you, reading the line. You do not need an agent for that. Use the agent when the file is long and you want it to **find** the line, not when you want it to **invent** a repair.

If the quoted line shows the swap, you leave debugging and enter U26 with a fix prompt. The workflows are neighbors. Debugging ends when the hypothesis is confirmed or killed.

### A debug prompt

```text
npm test failed:
returnLoan("b1","Asha") returned ok: false after borrow("b1","Asha").
Six other tests passed.

Do not edit files.
Quote the comparison inside returnLoan and state one hypothesis
for why ok is false.
Stop. Do not propose a refactor. Do not add logs that you commit.
```

"Do not edit files" is the fence. A debug turn that edits is a fix turn you did not authorize.

If your tool cannot answer without "editing," ask it to print the quote in the reply only. Then you revert if it touched the tree anyway (U22).

### Thrash

**Thrash** is a series of edits that each chase the latest error: change the test, change the function, add a package, skip the test. The suite may end green. The hypothesis was never stated. Thrash is the debugging version of the U17 fixture.

The ceiling is the same as U22. One experiment. If it was wrong, write a new hypothesis. Two failed experiments, then you read the code yourself line by line. A third rewrite is not a plan.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Failure output | What the runner printed when an assertion failed | Not a verdict on you |
| Hypothesis | A claim about the cause that might be false | Not a fix |
| Experiment | One check that supports or kills the hypothesis | Not a redesign |
| Thrash | Repeated edits that chase the symptom | Feels like persistence |

## Worked example

Output above. You open `returnLoan` and see:

```javascript
(item) => item.bookId === borrower && item.borrower === bookId
```

Hypothesis confirmed by reading. You do not ask the agent to "make tests pass" until you switch to the U26 prompt, which names the swap. If you had prompted "fix the failure" with no hypothesis, a likely generation is `assert.equal(returnLoan("b1", "Asha").ok, false)`, which makes the test agree with the bug. That is thrash's smallest form. The debug prompt's "do not edit" exists so you see the quote first.

## Common errors

### Pasting the stack and saying "fix"

**What you see:** The entire output goes into a prompt with the word fix. The diff rewrites `loans.js`.

**What it means:** Debugging was skipped. A fix was requested without a cause.

**What to do:** Ask for a quote and a hypothesis. Edit nothing until the quote matches the hypothesis.

### Adding logs and committing them

**What you see:** `console.log(item, bookId, borrower)` remains in the accepted diff.

**What it means:** The experiment became production code.

**What to do:** The experiment lives in the transcript or is reverted. The fix diff does not include the log. U21's leftover step catches it.

## Checkpoints

1. What does the sample failure prove about `ok`?
2. What must a debug prompt forbid?
3. When do you switch from this unit's workflow to U26?

## Practice exercises

### P1 — Prove

Rewrite the sample output's lesson in two bullets: proves / does not prove.

### P2 — Prompt

Write a five-line debug prompt for: `borrow("b1"," ")` returned `ok: true` and a test expected `borrower-required`. You have not opened the file. Forbid edits.

### P3 — Thrash diary

List three edits that would count as thrash for P2. One sentence on the alternative.

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- No production incident process, pagers, or log platforms.
- You are not asked to attach a debugger UI.

## Next unit

**U28 — Workflow: evaluation.**
