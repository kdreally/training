# U22 — Stop, revert, tighten, retry

**Phase 5 — Making the code correct**

## Where you are

You can reject a diff. This unit is what you do in the next ten minutes so the rejection does not turn into a pile of follow-up prompts. The loop is **stop, revert, tighten, retry**. People skip revert because it feels like losing work. The work was unfaithful. Keeping it costs more than rewriting a small function.

## What you will be able to do

- Stop a turn instead of negotiating with it.
- Name the Git restore you already trust, aimed at the files the turn touched.
- Tighten the prompt using evidence from the bad diff, then retry from a clean tree.

## What you need already

- **U21 — Review the diff.**

## Time and energy

About **45–70 minutes**.

## Why this exists

A bad turn is informative. It shows which magnet fired. If you leave the bad files in place and say "now remove lodash but keep the nice parts," the next turn is built on a dirty tree (U05) and on a neighbor that is the invention (U19). Revert is how the information survives and the code does not.

## Plain-language teaching

### The loop

```text
1. Stop. Do not send "looks good, just also…"
2. Revert the turn's files so git status is clean (or matches what you had before the turn).
3. Tighten. Add one fence per invention you actually saw.
4. Retry once from the clean tree.
5. Review again. If it fails the same way, stop for the day and change the spec. Do not cycle five times.
```

Two retries is a reasonable ceiling for one behavior. After that you are negotiating with a pattern, and the spec or the fence is still open.

### Revert

You already know how to throw away uncommitted edits. Use that. From the project root, for paths you have confirmed are the turn's files and not your own uncommitted work:

```text
git restore src/loans.js test/loans.test.js package.json CHANGELOG.md
```

**What it does:** puts those files back to the last commit. **Success:** `git status` no longer lists them. **Failure:** `pathspec did not match` means the path is wrong or the file is untracked.

Untracked new files (`src/services/LoanService.js`) are not removed by `git restore`. They were never committed. Delete those files yourself after you have looked at the names and confirmed they are the turn's leftovers. `git clean` can delete untracked files across the whole tree; this course will not make it a habit, because a wide clean removes work you forgot was untracked. Delete the specific unwanted paths.

If `package.json` was yours before the turn, you are in the dirty-tree problem from U05. You cannot restore it blindly. That is another reason the tree starts clean.

### Tighten from evidence

The bad diff is a list of fences you now know you need. Do not add a paragraph of scolding.

| What you saw | Line you add |
|--------------|----------------|
| lodash | "Do not import lodash. Use `.filter` like `activeLoans`." |
| `src/services/` | "No new files. No classes." |
| Case-folding | Repeat the `"asha"` → `0` example |
| Deleted tests | "Do not delete or edit existing tests. Add new tests only." |
| Express | "Do not edit `src/server.js`. Do not import express." |

One line per invention. Then retry.

### When not to retry

- The spec's example was wrong. Fix the spec. Do not prompt the code into matching a bad example.
- The tool is editing outside the project root (U04). Fix the folder before any retry.
- A secret appeared in the transcript. Stop. Rotate the secret if it is real. Do not continue the session as if it is fine.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Stop | No more prompts in this dirty tree | Not closing the laptop on the whole task |
| Revert / restore | Put the turn's files back | Not `git push --force`, not a history rewrite |
| Tighten | Add a fence aimed at an invention you just saw | Not "be more careful" |
| Retry ceiling | Two tries, then fix the spec | Not infinite patience |

## Worked example

**Bad turn:** the U21 diff (lodash, `==`, no tests, `console.log`).

**Stop.** You do not say "remove the console.log."

**Revert:**

```text
git restore package.json src/loans.js CHANGELOG.md
git status
```

`git status` is clean. There was no new untracked file in that particular diff. If `node_modules` appeared because an install ran, do not commit it. Shelf's project should ignore it or you delete that folder. Do not add lodash back.

**Tighten.** Add to the prompt:

```text
Do not import lodash. Use .filter and ===.
Do not rewrite activeLoans.
Do not add console.log.
Add a test: countForBorrower("asha") === 0 after borrow("b1","Asha").
Do not edit package.json.
```

**Retry** once. Review with U21's order. If `package.json` changes again, stop. The standing file and the prompt both failed. Do not install lodash to silence the import. Look at whether the session is even loading `AGENTS.md` (U07). That is a tooling fact to check, not a reason to accept lodash.

## Common errors

### The sculpt

**What you see:** Six prompts: remove lodash, remove the log, put tests back, fix `==`, restore `activeLoans`, update the changelog.

**What it means:** You rebuilt the revert by hand and probably missed a hunk.

**What to do:** One restore, one tighter prompt.

### Tightening with anger instead of fences

**What you see:** "You ALWAYS do this, NEVER be stupid, last chance."

**What it means:** No new file list, no new example. The next diff can repeat the invention.

**What to do:** One calm line per invention. The emotion is understandable. It is not a fence.

## Checkpoints

1. What are the four words of the loop?
2. Why doesn't `git restore` remove a brand-new untracked file?
3. What do you do after two failed retries?

## Practice exercises

### P1 — Map the loop

Write the five steps for the U17 fixture, including one delete of an untracked path (`src/services/LoanService.js`) and one restore of `src/server.js`.

### P2 — Tighten

From the U17 fixture, write four tighten-lines. No insults.

### P3 — Ceiling

Describe, in four sentences, a second failure that should send you back to the spec instead of a third prompt. Use the overdue due-date boundary as the example: the agent keeps treating the due date as already overdue.

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- No force-push, no `git reset --hard` as a recommendation. `git restore` on named paths is enough.
- Matching house style in more detail is U23.

## Next unit

**U23 — Match the repo.**
