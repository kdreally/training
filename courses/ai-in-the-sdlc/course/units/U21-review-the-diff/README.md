# U21 — Review the diff

**Phase 5 — Making the code correct**

## Where you are

Tests tell you about behavior you remembered to assert. The **diff** tells you what else changed: a new import, a touched file, a rewritten comment, a deleted line in an old test. This unit is a review method you can apply to an agent diff the same way you apply it to a teammate's branch. The agent is not owed a gentler review.

## What you will be able to do

- Review a diff in a fixed order: files, tests, dependencies, behavior, leftovers.
- Accept or reject with a reason tied to a line, not a mood.
- Use `git diff` and `git diff --stat` as the source of truth, not the agent's file list.

## What you need already

- **U20 — Tests before you accept.**
- You already use Git. This unit does not reteach commits.

## Time and energy

About **50–75 minutes**.

## Why this exists

Agent reports list the files they remember editing. The working tree lists the files that changed. Those sets diverge often enough that "I read the summary" is not a review. A short order keeps you from blessing a green suite that also added `date-fns`.

## Plain-language teaching

### The review order

Do it in this order every time. Skipping to "does the function look smart?" is how leftovers survive.

1. **Stat.** `git diff --stat`. How many files? Any file outside the allow list? Any unexpected new file?
2. **Dependencies.** Does `package.json` or a lockfile appear? Any import that is not `./`, `../`, or `node:`?
3. **Tests.** Read test changes before implementation. Were old assertions edited? Were tests deleted?
4. **Behavior.** Does the implementation match the spec examples you just saw asserted?
5. **Leftovers.** `console.log`, commented-out code, new folders, changelog diary, drive-by format.

Then decide: accept, or restore. "Accept with a follow-up prompt in the same dirty tree" is not a third option. U22 handles repair. Review ends in a decision.

### Commands

From the project root, after the turn:

```text
git diff --stat
git diff
```

**What they do:** `--stat` is the file list with line counts. Without `--stat`, you get the full line-by-line diff.

**Success:** you can name every file. **Failure:** `not a git repository` means you are outside the repo or the example was never committed. The shelf example in this course may be read without a personal commit. For the assignment, a printed diff is provided so you are not blocked on Git history. On your own projects, review the Git diff, not a copy the agent pasted. Pasted diffs can omit files.

### A diff to practice on

**Prompt claimed:** add `countForBorrower` only. Allow list: `src/loans.js`, `test/loans.test.js`, `CHANGELOG.md`.

```diff
--- a/package.json
+++ b/package.json
@@
-  "scripts": {
-    "test": "node --test"
-  }
+  "scripts": {
+    "test": "node --test"
+  },
+  "dependencies": {
+    "lodash": "^4.17.21"
+  }

--- a/src/loans.js
+++ b/src/loans.js
@@
+import _ from "lodash";
+
 export function activeLoans() {
-  return loans.filter((loan) => loan.returned === false);
+  return _.filter(loans, (loan) => loan.returned === false);
 }
+
+export function countForBorrower(borrower) {
+  console.log("counting", borrower);
+  return _.filter(activeLoans(), (loan) => loan.borrower == borrower).length;
+}

--- a/CHANGELOG.md
+++ b/CHANGELOG.md
@@
 ## Unreleased
+- read loans.js and improved filters
```

No test file in the diff. The report said "tests pass."

### Decision

Reject. Reasons you can cite:

- `package.json` was not on the allow list. Lodash arrived.
- `activeLoans` was rewritten. That is a drive-by. `==` instead of `===` also coerces types.
- `console.log` is a leftover.
- No test for the new function. The oracle is missing.
- Changelog describes process, not behavior.

You do not need a sixth reason. One forbidden file is enough to restore the whole turn.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Stat | The short "which files" diff | Not a statistics course |
| Leftover | Debug print, unused import, diary changelog | Not a feature |
| Drive-by | Edit outside the behavior, often a rewrite of a neighbor | Described as cleanup |
| Decision | Accept or restore | Not "we'll tidy it later" in the same turn |

## Worked example

The diff above is the example. Walk the order:

1. Stat would show `package.json`, `src/loans.js`, `CHANGELOG.md`. Three files. One is forbidden. Stop is already justified. You still finish the list so your notes teach the next person.
2. Dependency: lodash.
3. Tests: absent.
4. Behavior: `==` and lodash, and a log. Not the neighbor style.
5. Leftovers: `console.log`, changelog wording.

Decision: restore all three files. Do not keep the function "and remove lodash in a follow-up" inside this dirty tree. The function uses lodash. A partial keep is how the import returns.

## Common errors

### Reviewing only the new function

**What you see:** The function's last line looks right, so you approve. You never opened `package.json`.

**What it means:** Step 1 was skipped.

**What to do:** Start at `--stat` every time, including small turns. Especially small turns. Forbidden files hide in "small" turns because you feel safe.

### Accepting a pasted diff

**What you see:** The agent says "here is the full diff" and omits `package.json`.

**What it means:** The narrator edited the evidence.

**What to do:** On a real repo, `git diff` yourself. In this lesson, treat missing tests as missing, not as "probably fine."

## Checkpoints

1. What are the five review steps, in order?
2. Why is a missing test file a finding even if the function looks correct?
3. What is the decision if one forbidden file changed and the function is perfect?

## Practice exercises

### P1 — Order

List what you would open first, second, and third for the worked diff. One line each.

### P2 — One finding is enough

Write the restore note you would send a teammate, citing only the `package.json` hunk. Four sentences maximum.

### P3 — A clean one

Describe a stat line that would pass step 1 for the count feature. Invent plausible line counts. Then name one thing you would still check in the test hunk before accepting.

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- You are not required to produce a Git commit.
- Repair strategy after the reject is U22.

## Next unit

**U22 — Stop, revert, tighten, retry.**
