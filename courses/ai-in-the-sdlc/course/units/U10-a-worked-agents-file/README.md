# U10 — A worked AGENTS.md

**Phase 2 — Standing instructions**

## Where you are

You have the catalog. This unit puts it into one file you could commit at the root of shelf. You are expected to copy the shape, then write the sentences yourself in the assignment so they are yours. The worked file below is the reference, not a secret.

## What you will be able to do

- Write a complete `AGENTS.md` for shelf that a teammate could review.
- Point at which section blocks a dependency, a database call, a drive-by edit, and a fake test pass.
- Keep tasks, tool-specific JSON, and inspiration out of the file.

## What you need already

- **U07**, **U08**, **U09**.

## Time and energy

About **50–80 minutes**. Most of it is writing carefully, not reading.

## Why this exists

Catalogs stay abstract until one file exists. A reviewer needs a single path to open. An agent needs a single path to load. This is that path for shelf: `AGENTS.md` next to `package.json`.

## Plain-language teaching

### What "good" looks like for this file

- A human can read it in two minutes.
- Every constraint is checkable.
- No ticket, no model name, no JSON permissions.
- The project map matches the real tree. If the map says tests are in `tests/` and they are in `test/`, the agent will create the wrong folder.

### The worked file

You could commit this at `course/examples/shelf/AGENTS.md`. Read each bullet and connect it to a category from U09 before you copy any of it.

```markdown
# Shelf — standing instructions

Shelf is a tiny in-memory library-loan tracker.

- Loan rules: `src/loans.js`
- Books: `src/books.js`
- HTTP: `src/server.js` (`GET /loans` only; other paths return 404)
- Tests: `test/loans.test.js`, run with `npm test` (`node:test`)
- There are no npm dependencies.

## Constraints

- Edit only the files the current task names. Do not create files or folders the task does not name.
- Do not reformat, rename, or "clean up" code the task does not mention.
- Do not add npm dependencies or a framework. Do not run a package install. If a library seems necessary, stop and ask.
- Do not connect to a database server, a network API, or any host outside this repo. Do not read connection strings.
- Do not read, print, or commit secrets (`.env`, keys, tokens, passwords).
- Match `src/loans.js`: ESM imports, plain functions, `{ ok: false, error: "kebab-name" }` on failure, `{ ok: true, loan }` on success.
- A behavior change adds or updates a `node:test` test. Do not delete, skip, or weaken tests to get a pass. If `npm test` fails, stop and report the output.
- If the task disagrees with this file or with the current code, stop and describe the conflict. Do not invent routes, fields, or error codes.
- You may run `npm test` and `node` on files in this repo. Do not run destructive git commands.
- When a behavior change is accepted, append one line to `CHANGELOG.md` under `## Unreleased`. Do not log reads, guesses, or test runs there.
```

### Line-by-line, the non-obvious bits

The identity block repeats paths because agents guess paths. `test/` versus `tests/` is a common guess. Writing the real path closes it.

"Other paths return 404" is in the map so a new route is a conflict with the map, which triggers the honesty rule. You could instead leave the route list only in a spec. Putting the **current** truth in the map helps the agent notice when a task would change the HTTP surface. The task still has to say so explicitly. The map is not permission to add routes.

"Stop and ask" appears twice on purpose: dependencies, and any conflict. Those are the moments a fluent guess does the most damage.

The changelog bullet says **when a change is accepted**. The agent does not accept its own work (U05). In practice you will often ask for the changelog line in the same turn as the code, and you will delete that line if you restore the code. That is slightly messy and still better than a diary of tool calls. If you prefer the changelog to be a human-only edit, write that instead: "Do not edit `CHANGELOG.md`. The human will add the line." Pick one. Do not write both. This course's worked file asks the agent to draft the line, and you keep it only if you accept the turn.

### What you still type per task

This file does not name `countForBorrower`. It does not contain an example of overdue dates. Those are specs. The file makes the spec shorter because you do not repeat "no lodash" every time. You may repeat it anyway on a risky task. Repetition is allowed. Contradiction is not.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Project map | The short "where things live" block | Not a full architecture document |
| Reference file | The worked example in this unit | Not the only legal wording |
| Two-minute file | Readable in one sitting without a heading per adjective | Not "as short as a tweet" |

## Worked example

**Prompt, after this file is loaded:** "Add `countForBorrower(borrower)` in `src/loans.js`. Add a test. Draft the changelog line."

**A diff that respects the file:**

```javascript
export function countForBorrower(borrower) {
  return activeLoans().filter((loan) => loan.borrower === borrower).length;
}
```

Plus a test, plus:

```markdown
- countForBorrower returns how many active loans a borrower has.
```

**A diff that violates it, even if tests pass:**

```javascript
import _ from "lodash";
```

You restore. You do not argue with the report. The bullet to cite is "Do not add npm dependencies."

## Common errors

### Copying this file into a different project unchanged

**What you see:** A Python service whose `AGENTS.md` talks about `src/loans.js` and `npm test`.

**What it means:** The map is now a lie. The agent will create a Node layout inside a Python repo because you told it that is the layout.

**What to do:** Keep the categories. Replace every path, command, and style example with this project's real ones.

### Adding a "current sprint" section because the file felt empty

**What you see:** The two-minute file becomes a backlog.

**What it means:** U08 was skipped in spirit.

**What to do:** Leave the file boring. Put the sprint in `specs/` or the tracker.

## Checkpoints

1. Which bullet would you cite if the agent created `src/utils/time.js` without being asked?
2. Which bullet would you cite if it changed an error string in a test to match a bug it introduced?
3. Why is the path `test/` written explicitly?

## Practice exercises

### P1 — Cite

For each incident, quote the bullet from the worked file that it violates. One incident may violate two.

1. `npm install dayjs` in the transcript.
2. `src/server.js` rewritten in Express while adding a count helper.
3. A test changed from `no-copies` to `sold-out` so the new code passes.
4. Changelog gains `- opened loans.js`.

### P2 — Map check

Open `course/examples/shelf/`. Confirm every path in the worked file exists. Write "match" or note any mismatch you find. (Authors believe they match. Checking is the habit.)

### P3 — Your command list

If your real job project allows `pytest` and forbids network calls, write two command bullets in the shelf style, with those facts. Label them `example only`.

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- You do not need to make your sentences identical to the worked file.
- No spec writing yet.
- No tool install.

## Next unit

**U11 — Instruction files that fail.**
