# U08 — Standing rules vs today's task

**Phase 2 — Standing instructions**

## Where you are

You know the file's name and the difference between prose and wiring. The most common way to ruin `AGENTS.md` is to store today's ticket in it. This unit trains the sort: lasting constraint, or task that expires.

## What you will be able to do

- Sort a mixed list into `AGENTS.md` versus a spec or prompt.
- Rewrite a vague lasting rule so it could be checked on a diff.
- Explain the damage caused by a finished task left in the standing file.

## What you need already

- **U07 — The instruction file.**

## Time and energy

About **40–60 minutes**.

## Why this exists

A standing file full of old tasks is worse than a short one. The agent tries to satisfy all of them on every turn. It re-implements a feature that already shipped, "fixes" a bug that is gone, and still misses the limit you actually cared about, because that limit was one bullet among forty. The kindness you can do the next turn is a boring file.

## Plain-language teaching

### The question to ask of every sentence

> Will this still be true, and still be wanted, on the next task after this one ships?

- **Yes** → candidate for `AGENTS.md`.
- **No** → spec or prompt. Delete or archive it when the task is done.
- **Yes, but nobody could apply it to a diff** → rewrite it until someone could, or leave it out. U09 is the full treatment of "checkable." This unit only gets you to notice the mush.

### Worked sorts

| Sentence | Home | Reason |
|----------|------|--------|
| Do not add npm dependencies. | Standing | True on every shelf task |
| Add `countForBorrower` this afternoon. | Task | False as soon as it exists |
| Keep using `{ ok: false, error }` for failures. | Standing | Project style |
| Error text for the new case is `already-borrowed`. | Task | Specific to one behavior |
| Tests live in `test/` and use `node:test`. | Standing | Where checks go |
| Make sure the demo data includes Sam. | Task | Fixture for one story |
| Do not connect to a database server. | Standing | True even when a task says "persist this" — the agent must stop and ask, not open a connection |
| Write clean code. | Nowhere | Cannot be checked. Rewrite or drop |

### "Stop and ask" is allowed in standing rules

Some lasting rules describe a **refusal**, not a behavior the agent can finish alone. "If the task needs a new dependency, stop and report why. Do not install it." That remains true after every task. It belongs in the file. The particular dependency a ticket wanted belongs in the ticket's outcome, as a human decision, not as a quiet install.

### Finished tasks left behind

Suppose `AGENTS.md` still says "Implement `countForBorrower`." Next week you ask for a changelog typo fix. The agent "helpfully" rewrites `countForBorrower` to use a class, because the standing order is still to implement it and the current function looks too plain. Your typo prompt did not ask for that. The old task did.

The repair is to delete the finished task from `AGENTS.md` in the same change that accepts the feature. Policy edits are diffs too. Review them.

### A place for the task

This course uses a spec file per change, introduced in U12, for example `specs/count-for-borrower.md`. You do not need that structure today. You only need to **refuse** to put the task in `AGENTS.md`. A scratch file, the ticket, or the prompt are all better homes than the standing file.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Lasting | Still wanted after this task ships | Not "important" |
| Task | Expires when the behavior exists | Not rude to keep it out of AGENTS.md |
| Mush | A rule no one could apply to a diff | Often sounds inspiring |
| Archive | Move a finished spec out of the active path | Not "delete the Git history" |

## Worked example

Someone dumps this into a new `AGENTS.md`:

```markdown
# Notes for the AI

- Be really careful.
- Add overdue loans using moment.js.
- Shelf is a loan tracker with code in src/loans.js.
- GET /loans should return counts too, Sam asked.
- Never touch production.
- Fix the bug where b2 allows two loans.
```

Rewrite the dump. Standing file after the sort:

```markdown
# Shelf — standing instructions

Shelf is an in-memory loan tracker. Loan logic is in `src/loans.js`.
Tests are `npm test` using node:test. There are no npm dependencies.

## Constraints

- Do not add dependencies. If a task seems to need one, stop and ask.
- Do not connect to a database or a network service. There is no production environment in this repo. Do not invent one.
- Change only files the current task names.
```

Moved to a task note (not standing):

```markdown
# Tasks, not policy

- Overdue loans: needs a spec. Do not assume moment.js.
- GET /loans counts: separate spec. Sam's request is not a standing order.
- Bug: b2 and two loans — write a failing test first, then fix. (See U26.)
```

"Be really careful" was dropped. "Never touch production" was rewritten into something shelf can obey: there is no production connection to open.

Notice `moment.js` did not survive. A library name inside a standing file becomes a permanent dependency grant. That is the opposite of shelf's policy.

## Common errors

### Keeping a "current focus" section in `AGENTS.md`

**What you see:** A heading `## Current focus` with the sprint's three tickets. It feels tidy.

**What it means:** Those tickets will still be in focus in the file after they ship, unless someone remembers to edit the file. People forget. The agent does not.

**What to do:** Current focus lives in the issue tracker or in `specs/` files you archive. U15 shows the spec. The standing file stays boring.

### Rewriting every task as a permanent law

**What you see:** "Always include Sam in sample data." Six months later every example is about Sam, including tests where Sam makes no sense.

**What it means:** A fixture escaped into policy.

**What to do:** Ask the lasting-question. Sample names are not policy. The error-object shape is.

## Checkpoints

1. What question do you ask before a sentence enters `AGENTS.md`?
2. Where should "error string is `already-borrowed`" live?
3. What goes wrong if a finished feature stays as an order in the standing file?

## Practice exercises

### P1 — Sort

Sort: standing, task, or drop.

1. Do not delete tests to obtain a green run.
2. Borrower names in examples should be Asha and Ben this week.
3. Use async/await everywhere, even if the file is synchronous today.
4. Append one line to `CHANGELOG.md` when an accepted change alters behavior.
5. The due date of a loan is 14 days after `today` for the capstone.

### P2 — Rewrite

Rewrite item 3 as either a checkable standing rule or a decision to drop it. Shelf's `loans.js` is synchronous. A rule that fights the file will make the agent "modernize" the file during unrelated tasks.

### P3 — Cleanup

Write the three-line task note you would keep **out** of `AGENTS.md` for: "Sam wants `GET /loans` to include a count." Include "needs a spec" in it.

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- Not the full constraint catalog (next unit).
- Not a complete shelf `AGENTS.md` submission yet (U10). You will sort and rewrite, which is the skill this unit exists to build.

## Next unit

**U09 — Constraints worth writing.**
