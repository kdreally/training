# U03 — What the agent can see and do

**Phase 1 — The agent in the project**

## Where you are

You can tell a chat window from a project agent. This unit lists the agent's actual powers. They are fewer than marketing implies, and larger than "autocomplete." People get surprised in both directions: the agent cannot see a file you never gave it access to, and it can run a command you did not read.

## What you will be able to do

- Classify an agent action as **read**, **edit**, **command**, or **refuse**.
- Explain what the agent sees by default: files in the project, not your intentions.
- Name two actions that should be refused on shelf even if the agent is capable of them.

## What you need already

- **U02 — Chat window vs project agent.**

## Time and energy

About **50–75 minutes**.

## Why this exists

If you do not know the action types, a transcript is a blur. You cannot review it. You also cannot write standing rules later, because a rule is a decision about an action type: "do not run network installs," "do not edit files outside `src/`." This unit gives you the four words those rules will use.

## Plain-language teaching

### The four action types

| Type | What happens | What you should see in a transcript |
|------|----------------|-------------------------------------|
| Read | The agent opens a file or lists a directory and does not change it | A path, and then text from that file |
| Edit | The agent writes, creates, deletes, or renames a file | A diff, or a "created file" note |
| Command | The agent runs a program in the shell: tests, git, npm | The command line and its output |
| Refuse | The agent was asked for something it should not do, and it stops | A short reason, and no diff |

Refuse is an action you **want** available. An agent that always complies is an agent that will eventually comply with a bad guess.

### What it can see

It can see files in the folder you started it in, subject to the tool's own ignore rules (often the same idea as Git's ignore list: dependencies and build output are hidden). It can see the text of those files. It cannot see:

- your unstated goal,
- the ticket in another system, unless that text is in the folder or in your prompt,
- production data,
- the contents of a file you excluded.

Shelf is small, so "seeing the project" means seeing a handful of JavaScript files, a changelog, and `package.json`. On a large repo, the agent still does not see all of it equally. It searches. If your prompt does not name a file, it may search, find a near match, and edit that. Naming the file is a kindness you will practice in U16. The point here is: **sight is files plus your message, not mind-reading.**

### What an edit looks like

An edit is a proposal until you accept it. In Git terms, it shows up as a working-tree change. `git diff` is how you read it. You already know that command. Use it. The agent's own "here is what I did" paragraph is a summary of the edit, and summaries drop lines.

A tiny honest diff for shelf would look like this. Read it as a picture of an edit, not as a task to apply.

```diff
--- a/src/loans.js
+++ b/src/loans.js
@@
 export function activeLoans() {
   return loans.filter((loan) => loan.returned === false);
 }
+
+export function countForBorrower(borrower) {
+  return activeLoans().filter((loan) => loan.borrower === borrower).length;
+}
```

One function, existing style, no new import. That is an edit you can hold in your head. U17 shows edits you should not hold onto.

### What a command can do

A command is not an edit, but it can cause worse damage than one. Examples, from harmless to unacceptable on shelf:

| Command | Why it exists | Verdict on shelf |
|---------|---------------|------------------|
| `npm test` | Runs the suite you trust | Allowed once tests exist |
| `node --version` | Checks the runtime | Harmless |
| `npm install lodash` | Fetches a package into the project | Refuse. Shelf has no dependencies, and this adds one |
| `git push --force` | Rewrites history on a shared branch | Refuse. Always, in this course |
| A command that connects to a database using a real URL | Reads or writes shared data | Refuse. Shelf has no database, and real projects need an explicit rule |

You will write these verdicts into `AGENTS.md` in U09 and U10. Today you only practice the classification.

### Capabilities are not intentions

The agent can edit `package.json` because the file is in the folder. "Can" is not "should." Standing instructions exist to turn "should not" into text the agent loads every turn. Until that file exists, **you** are the only refusal mechanism: you reject the diff.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Read | Look at a file without changing it | Not the same as understanding it |
| Edit | A change to a file | Not accepted until you say so |
| Command | A shell program the agent runs | Not automatically safe because it is "just a test" |
| Refuse | Stop without doing the risky part | Not a crash, and not rudeness |
| Working tree | Your files as they are now, including uncommitted edits | Not the last commit |
| Diff | The line-by-line difference | Not the agent's summary paragraph |

## Worked example

Transcript fragment (invented, on purpose):

```text
Read    src/loans.js
Read    package.json
Edit    src/loans.js          (adds countForBorrower)
Command npm install date-fns
Edit    package.json          (adds the dependency)
Command npm test
```

Classify, then judge.

- The two reads are appropriate. It looked at the code and the dependency list.
- The first edit may be appropriate if the task was the count function. You would still read the diff.
- `npm install date-fns` is a **command that should have been a refusal**. The count function does not need dates. The package was a guess.
- The `package.json` edit is the footprint of that guess.
- `npm test` is a fine command **after** the extra package is removed. Run in this order, it tests the wrong project: a project that now depends on `date-fns`.

The repair is not "ask it to continue." The repair is: refuse the install, restore `package.json`, keep or redo the function. U22 teaches the repair loop. Here, notice the classification.

## Common errors

### Calling every step "it did some AI"

**What you see:** A review comment that says "the AI changed stuff."

**What it means:** Reads, edits, and commands are blurred, so the dangerous command hides inside the sentence.

**What to do:** Force the four labels onto the transcript before you discuss quality.

### Assuming a read is harmless when the file is a secret

**What you see:** The transcript prints a `.env` file or a key.

**What it means:** A read is harmless only if the file was safe to show to the tool and to the transcript's storage.

**What to do:** On any real project, secrets are excluded. Shelf's example has none. Do not add one to practice this. The classification "read of a secret" is already a problem, even with no edit.

## Checkpoints

1. Name the four action types.
2. Why is `npm install` a bigger event than a one-line edit to `loans.js`?
3. Does the agent know your goal if you do not write it down?

## Practice exercises

### P1 — Label

Label each line `read`, `edit`, `command`, or `refuse`:

1. Open `test/loans.test.js`.
2. Insert a test into that file.
3. Run `npm test`.
4. Decline to run `git reset --hard`.
5. Create `src/utils/dates.js`.

### P2 — Verdict

For items 4 and 5, write "allow" or "refuse" **for a task whose spec only adds `countForBorrower` to `src/loans.js`**. One sentence each.

### P3 — See or not

List three things in a typical company repo the agent should not be given (examples: production database passwords, a customer data dump, a second repo that is not this project). Then list three things in shelf it should be allowed to read.

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- You do not write the full rules file yet.
- You do not need a live agent transcript. The samples here are the materials.

## Next unit

**U04 — Start in the project folder.**
