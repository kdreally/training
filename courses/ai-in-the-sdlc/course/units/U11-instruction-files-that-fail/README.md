# U11 — Instruction files that fail

**Phase 2 — Standing instructions**

## Where you are

You can write a healthy `AGENTS.md`. This unit studies files that load on every turn and still produce bad diffs, because the file is vague, huge, contradictory, or stuffed with tasks. Repairing a bad policy file is as useful as writing a fresh one. You will meet these files in real repositories.

## What you will be able to do

- Diagnose a standing file as vague, bloated, contradictory, or task-stuffed.
- Rewrite it into a short checkable file without losing a real constraint.
- Explain how a contradiction lets an agent justify either diff.

## What you need already

- **U10 — A worked AGENTS.md.**

## Time and energy

About **50–75 minutes**.

## Why this exists

Most teams who "tried AGENTS.md" and concluded that agents ignore rules were loading a file no one could follow. A model faced with "be careful" and "improve anything you notice" and "never edit server.js" and "keep routes in sync" will satisfy a subset and sound obedient. The repair is editing the file. Prompting harder on top of a contradictory file repeats the failure.

## Plain-language teaching

### Four failure modes

| Mode | How it looks | What the agent does |
|------|----------------|---------------------|
| Vague | "Be careful," "production quality," "best practices" | Invents a best practice, often a popular package |
| Bloated | Handbook, architecture essay, ten old tickets | Follows a random slice; ignores the rest |
| Contradictory | Two bullets bless opposite actions | Picks the bullet that matches the larger edit |
| Task-stuffed | Current bugs and features live in the policy file | Re-does finished work on unrelated turns |

A file can have all four. Fix contradictions first, then delete tasks, then delete mush, then shorten. Adding more bullets to a contradictory file makes the contradiction harder to see.

### A file that fails

```markdown
# AI instructions

We are a world-class team. Write clean, production-ready, DRY code.
Always improve nearby code when you see a problem.
Never edit src/server.js, it is fragile.
When you add a function, expose it via the API so clients stay in sync.
Use well-known libraries (lodash, dayjs, express) rather than hand-rolled code.
Do not add dependencies without asking.
Current work:
- migrate shelf to microservices
- add overdue loans with dayjs
- Sam's password for the demo db is shelf-demo-123 (do not share)
Also follow our 40-page engineering handbook (pasted below).
... hundreds of lines ...
```

Walk it.

- "World-class / clean / production-ready" is vague.
- "Improve nearby code" contradicts any file fence and fights "never edit server.js."
- "Never edit server.js" contradicts "expose it via the API."
- "Use lodash, dayjs, express" contradicts "do not add dependencies."
- The current-work list is task-stuffed. "Migrate to microservices" would be catastrophic as a standing order.
- A password in the file is a secret in the worst possible place: a file you intend to load into the tool and commit. The repair is to **remove it**, rotate the password if it was ever real, and add the secrets bullet. Shelf's course example must not contain a real secret. The one above is a fake teaching string. Do not reuse it anywhere else.
- A pasted handbook makes the file bloated. Point humans at the handbook. Do not paste it into the agent's prompt budget.

### What the repaired file keeps

The only lasting, checkable ideas hiding in that mess are:

- do not add dependencies without asking (so delete the library shopping list),
- do not spread edits across nearby files (so delete "always improve nearby"),
- HTTP changes are deliberate (so delete both the total ban and the "always expose" order; the spec for a task will name `server.js` when a route change is real),
- secrets do not belong here.

The microservices migration is a program of work with its own specs, or it is a bad idea. It is not a bullet.

### How contradiction shows up in a diff

Prompt: "Add `countForBorrower`."

The agent edits `server.js` to add `GET /counts`, imports express, and says: "The instructions say to expose new functions via the API and to use express rather than hand-rolled servers."

It is citing the file. Reviewers who say "the model disobeyed" are only half right. It obeyed a different bullet. Your repair is to make one story possible.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Vague | No yes/no on a diff | Sounds mature |
| Bloated | Too long to review or to follow reliably | Feels thorough |
| Contradictory | Two rules bless opposite edits | Feels like nuance |
| Task-stuffed | Tickets stored as policy | Feels organized |
| Rotate | Change a leaked password so the leaked copy dies | Not "delete the line and hope" |

## Worked example

**Before:** the bad file above.

**After:**

```markdown
# Shelf — standing instructions

Shelf is an in-memory loan tracker. See README.md for how humans run it.
Code: `src/loans.js`, `src/books.js`, `src/server.js`. Tests: `npm test`.
No npm dependencies.

## Constraints

- Edit only files the current task names. Do not "improve" other files in passing.
- Do not add dependencies or run installs. If one seems necessary, stop and ask. Do not pick a library yourself.
- Do not connect to a database or network host. Do not put secrets in this file or in the repo.
- Match existing style in `src/loans.js`. Behavior changes need a node:test test. Do not weaken tests.
- If the task conflicts with this file, stop and describe the conflict.
- Changelog: one line under `## Unreleased` per accepted behavior change.
```

Deleted on purpose: the password, the handbook paste, the microservice order, the overdue task, the express shopping list, both of the warring HTTP bullets.

If a later spec says "edit `src/server.js` to add `POST /loans`," that spec is allowed to name the file. The standing file no longer forbids it forever, and no longer demands it for every helper function. The task's file list is the fence (U18).

## Common errors

### Adding "IMPORTANT" to a vague bullet

**What you see:** "IMPORTANT: write clean code."

**What it means:** Volume was used as a substitute for a check.

**What to do:** Rewrite or delete. Importance is not a category.

### Leaving the secret and "making a note"

**What you see:** The password remains, with "do not share" beside it.

**What it means:** The file still loads the secret into the agent context and into Git.

**What to do:** Remove the secret from the file. If it was ever a real credential, rotate it in the system that issued it. A fake example in a lesson is not a credential. A string in your company repo might be.

## Checkpoints

1. Name the four failure modes.
2. Why does "the model disobeyed" sometimes mean "the file allowed both"?
3. What do you do with a password found in `AGENTS.md`?

## Practice exercises

### P1 — Label

Label each bullet vague, bloated, contradictory (name the pair), or task-stuffed:

1. "Prefer well-known libraries" sitting next to "zero dependencies."
2. "Refactor anything that looks old."
3. "Bugfix: returnLoan crashes on empty borrower — do this first always."
4. A 30-line company history.

### P2 — One pair

Write two bullets that contradict each other about tests. Then write the single bullet you would keep.

### P3 — Shrink

Take the repaired file in the worked example and see whether you can remove one more bullet without losing a check. If you cannot, say which bullet you almost removed and why you kept it.

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- No new catalog categories. This is repair.
- You do not start the specification phase until the next unit, except to notice that tasks leave this file.

## Next unit

**U12 — What a spec is for.**
