# U06 — Why standing instructions exist

**Phase 2 — Standing instructions**

## Where you are

You can run a clean turn in the right folder. Each turn so far has carried its own limits inside the prompt ("do not change any other behavior"). That works once. It fails as a project policy, because the next session starts blank. This unit explains **standing instructions**: rules loaded every turn, whether or not you remember to type them.

## What you will be able to do

- Explain why repeating rules in chat memory is not project policy.
- Give two examples of rules that belong on every shelf turn, and one example of a sentence that must not.
- Describe what happens when a project has no standing instructions and the prompt is brief.

## What you need already

- **U05 — One turn.**

## Time and energy

About **40–60 minutes**.

## Why this exists

Projects have rules that outlive a ticket. Shelf must not grow a database connection "just for this feature." Shelf must not gain a random npm package. The changelog should record accepted behavior changes. You can type those sentences into every prompt. You will forget on the tired afternoon, and the agent will fill the silence with a plausible package.

A file that the tool reads at the start of every session survives that afternoon. The rules are in the repo, so your teammates get them too, and so code review can discuss a rule change the same way it discusses code.

Without the file, the alternative is folklore: a Slack message, a memory in one person's account, a paragraph you paste when you remember. Folklore does not show up in `git diff` when it changes, and it does not load when someone else opens the project.

## Plain-language teaching

### Smallest definition

**Standing instructions** are written rules that a coding agent is given at the start of every turn in this project, before it reads today's prompt. They say how to behave here. They do not say what to build today.

### What they are not

- They are **not** a chat transcript. A transcript belongs to one person and one product account. The repo belongs to the team.
- They are **not** today's spec. "Add `countForBorrower`" expires when the function exists. "Do not add dependencies" does not expire.
- They are **not** a style sermon. "Be elegant" cannot be checked in a diff. U09 separates checkable rules from wishes.
- They are **not** a guarantee. Models miss instructions. The file raises the odds and gives you a document to point at when a diff violates policy. Your review (U21) is still the gate.

### Why "the AI will remember" fails

Account memory, if a product even has it, is tied to a login. It is invisible to a teammate. It is not versioned. It mixes projects: a rule you set while hacking a script ("you may install packages") leaks into shelf. It cannot be code-reviewed. When it is wrong, you cannot `git revert` it.

Standing instructions in the repository have the opposite properties. They are shared, versioned, project-scoped, and reviewable.

### A brief prompt plus a loaded file

You still write a prompt for today's task. The file carries the stable limits so the prompt can stay short and specific. Example of a stable limit:

```text
Do not add npm dependencies. Shelf uses the Node.js standard library only.
```

Example of a sentence that must stay out of the standing file:

```text
Implement countForBorrower before Friday.
```

That sentence is a task. Left in the file, it will be re-attempted next month, after the function exists, and the agent will "improve" it again.

### What a missing file costs

Prompt: "Add a way to list overdue loans."

No standing instructions. No spec. The agent invents a due date, imports a date library, adds a route the server did not have, and writes a paragraph of advice into the README. Each invention was a guess that filled a silence. Some guesses are charming. `npm install` is not charming when your deployment policy forbids new packages without review.

You are allowed to feel annoyed at that output. The fix starts with a file, not with a sharper insult in the next prompt.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Standing instructions | Rules loaded every turn, stored in the project | Not the prompt, not chat memory |
| Policy | A rule the team intends to keep | Not a one-off task |
| Folklore | Rules that live in people's heads or old chats | Feels faster until someone else starts a session |
| Load | The tool reads the file into the turn before your prompt | Not the same as you pasting it |

## Worked example

Two sessions, same prompt: "Add `countForBorrower(borrower)` to the loan logic. Add a test."

**Session A, no standing file.**

Resulting extra lines in `package.json`:

```json
"dependencies": {
  "lodash": "^4.17.21"
}
```

And in `src/loans.js`:

```javascript
import _ from "lodash";

export function countForBorrower(borrower) {
  return _.filter(activeLoans(), (loan) => loan.borrower === borrower).length;
}
```

The function works. The project now depends on lodash for one filter. A reviewer has to notice.

**Session B, standing file contains** "Do not add npm dependencies. Use the JavaScript already used in this file."

A better result is the filter written with `.filter`, which is how `activeLoans` is already written. The standing sentence did not name `countForBorrower`. It only closed a bad guess. You still read the diff.

Session B can still go wrong. The file is a rail, not a proof. It is a rail you can point at: "this diff violates `AGENTS.md`."

## Common errors

### Pasting the company handbook into every chat

**What you see:** A 40-page paste, then a vague implementation, because the task was drowned.

**What it means:** Policy was dumped, not stored, and it was not trimmed to rules an agent can follow on a coding turn.

**What to do:** Put the short, checkable coding rules in the project file. Leave HR policy, brand voice, and the roadmap out. U11 shows what "too long" does.

### Putting today's bug in the standing file "so it does not forget"

**What you see:** Next week the agent re-opens a fixed bug and "fixes" it differently.

**What it means:** A task was stored as policy.

**What to do:** Tasks live in the spec and the prompt. When the task is done, those can be archived or deleted. The standing file stays.

## Checkpoints

1. Why is chat memory a poor home for "do not add dependencies"?
2. Write one shelf rule that should load every turn, and one sentence that should not.
3. Does a standing file remove the need to read the diff?

## Practice exercises

### P1 — Sort

Mark each line `standing` or `not standing`:

1. Do not connect to a database.
2. Asha's loan is stuck; clear it.
3. Tests use `node:test`.
4. Please make the code clean.
5. Append an accepted behavior change to `CHANGELOG.md`.

For line 4, add one sentence on why it fails even though it sounds like policy.

### P2 — Cost of silence

In five sentences, describe a shelf diff that a one-line prompt "support overdue books" could produce if no rules are loaded. Name at least one new file and one new package. You are inventing a plausible failure, not running a tool.

### P3 — Shared

A teammate uses a different coding agent than you do. In three sentences, why does putting the rules in the repo help them more than your personal chat memory does?

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- The filename and the section structure are U07 and U10.
- The full catalog of good constraints is U09.
- You are not graded on a live session.

## Next unit

**U07 — The instruction file.**
