# U05 — One turn: prompt, action, diff

**Phase 1 — The agent in the project**

## Where you are

You can put the agent in the right folder and name what it is allowed to do. This unit slows down a single **turn** until you can narrate it. A turn is one request, the actions that follow, and your decision at the end. Sessions go bad when turns blur together and nobody can say which prompt caused which edit.

## What you will be able to do

- Define a turn and point to its prompt, its actions, and its diff.
- Explain why you decide at the end of every turn, instead of stacking prompts on an unreviewed diff.
- Read a short transcript and say whether the turn should be accepted.

## What you need already

- **U03** (action types) and **U04** (folder).

## Time and energy

About **45–70 minutes**.

## Why this exists

Agents invite a style of work that feels like chat: type, skim, type again. File edits do not behave like chat messages. They accumulate in the working tree. A second prompt then "fixes" a mix of the first prompt's mistakes and the new request, and the diff becomes unreadable. One turn, one review, then either keep or discard. That rhythm is the whole of Phase 5 in miniature. You are learning the rhythm before the paperwork.

## Plain-language teaching

### The shape of a turn

```text
1. You are in the project root. The working tree is clean, or you can name every dirty file.
2. You send one prompt.
3. The agent reads, edits, and maybe runs a command.
4. It stops and reports.
5. You read git diff and the command output.
6. You accept (and later commit) or you restore the files.
```

Step 1 is U04. Step 6 is yours. The agent does not do step 6, even if its report says "Done."

### Accept means you can explain the diff

You do not need a perfect diff. You need to be able to point at each file and say why it changed. If a file changed and you cannot say why, the turn is not accepted. Restore it. Curiosity can happen in a new turn with a narrower prompt.

### A clean tree is a courtesy to your future self

**Working tree clean** means `git status` shows nothing to commit. You already use this. Before an agent turn it matters more than usual, because the agent's edits and your half-finished hand edits look identical in `git diff`. If you start from a dirty tree, you will not know which lines the agent wrote.

If you have unfinished hand work, commit it or stash it with the Git habits you already have. This course will not teach stash. It will insist you can tell agent lines from your lines.

### One prompt, one behavior

A turn that asks for a count function **and** a new HTTP route **and** a changelog cleanup is three turns wearing one coat. When the route is wrong you cannot revert it without also reverting the count function. U19 will push this harder. Here, notice the pain in the example below.

### The report is not the diff

A report sounds like this:

```text
I added borrower counts and tests. All tests pass.
```

The diff might also contain a rewritten comment, a new dependency, and a changed error string. Believe the diff and the test output. Use the report as a table of contents, then check that every chapter is really there.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Turn | One prompt plus the actions it caused plus your accept-or-restore decision | Not a whole afternoon session |
| Accept | You can explain every touched file and you keep the edits | Not "the agent said done" |
| Restore | Put the touched files back to the last commit | Not a moral failure |
| Clean tree | No uncommitted changes at the start of the turn | Not "the code is high quality" |
| Report | The agent's closing summary | Not evidence |

## Worked example

**Start:** `git status` in shelf is clean. Prompt:

```text
Add countForBorrower(borrower) to src/loans.js.
It returns the number of active loans for that borrower.
Add one test. Do not change any other behavior.
```

**Actions:**

```text
Read src/loans.js
Read test/loans.test.js
Edit src/loans.js
Edit test/loans.test.js
Command npm test
```

**Test output (success):**

```text
# tests 7
# pass 7
# fail 0
```

The suite had 6 tests. A seventh appeared. That matches "add one test."

**Diff, file list:**

```text
src/loans.js
test/loans.test.js
```

You open the diff, see the function from U03's picture, see a test that borrows `b1` for Asha and expects `1`. No other lines move. **Accept.**

**A second version of the same turn,** same prompt, different agent mood. File list:

```text
src/loans.js
src/server.js
package.json
test/loans.test.js
```

Report: "I added borrower counts and exposed them via Express so the UI can use them. Tests pass."

**Do not accept.** The prompt did not ask for Express or for `server.js`. Restore all four files, including the test, because you cannot yet trust that the test imports Express. Then stop. A tighter prompt is a new turn, which you will learn to write later. Restoring feels slow the first time and cheap the tenth time.

## Common errors

### The follow-up that buries the mistake

**What you see:** Unwanted `package.json` change, then a second prompt: "also add the changelog line," without a restore.

**What it means:** Two tasks share one dirty tree. The changelog edit sits on top of the bad dependency.

**What to do:** Restore first. Confirm `git status` is clean. Then do the changelog turn.

### Grading the report

**What you see:** You accept because the last line says "All tests pass," and you never open the diff. The tests pass because the agent deleted one.

**What it means:** The report replaced the evidence.

**What to do:** Open `git diff` and the test command's own output. Count tests. U20 makes this a habit.

## Checkpoints

1. List the six steps of a turn, in order.
2. Why does a clean `git status` matter before the prompt?
3. The report says done and the diff touches a file you did not name. What is the decision?

## Practice exercises

### P1 — Mark the boundaries

Take the worked example's "do not accept" file list. Write the turn as six numbered steps, ending in restore. Use the actual filenames.

### P2 — Two behaviors

A prompt says "add `countForBorrower` and change `GET /loans` to include the count." Explain in four sentences why this should be two turns even if both changes are desired.

### P3 — Predict acceptance

```text
Files changed: test/loans.test.js
Test output: pass 6, fail 0
Prompt was: add a test that borrow("b2", "Asha") then borrow("b2", "Ben") expects no-copies.
The diff only adds that test. Existing tests are untouched.
```

Accept or restore? One paragraph. The suite still shows 6 tests because one was added and the prompt did not ask for a new function. That can be legitimate. Say what you would open in the diff to be sure.

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- No full prompt template yet (U16).
- No standing rules file yet (U06–U10).
- You are not required to run an agent.

## Next unit

**U06 — Why standing instructions exist.**
