# U02 — Chat window vs project agent

**Phase 1 — The agent in the project**

## Where you are

You know the destination. This unit separates two tools people call by the same name. A **chat window** talks about code. A **local coding agent** works inside a project folder on your machine. The rest of the course is about the second one. The feeling of "I already use AI at work, why is this a whole course?" is normal, and it usually means the two tools have been treated as one.

## What you will be able to do

- Define a local coding agent in one plain sentence, and name three things it is not.
- Decide, for a given task, whether a chat window or a project agent is the fitting tool.
- Explain what goes wrong when repo edits are requested from a chat that cannot see the repo.

## What you need already

- **U00**, **U01**.

## Time and energy

About **45–70 minutes**. Reading and judgment. No install.

## Why this exists

A chat window is excellent at explaining an error you paste in, or at drafting a paragraph. It is a poor place to change `src/loans.js`, because it does not have your files unless you paste them, and it cannot run `npm test` unless you paste the output back. People still ask it to "update my project." They then copy a snippet into the wrong file, or they miss that the snippet imported a package the project does not use.

A local coding agent exists so the help and the files are in the same place. You start it on your computer, in the project, and it proposes edits there. You still decide what to keep. The agent is not a colleague with good judgment. It is a fast editor with incomplete context unless you provide the context.

## Plain-language teaching

### Smallest definition

A **local coding agent** is a program installed on your computer that you run against a project folder. It reads files in that folder, can edit them, and can run commands you permit. You talk to it in a terminal session (a **CLI**, which only means "you type, it prints," as opposed to a website).

CLI is the short name for command-line interface. If you have used `git` or `npm` in a terminal, you have used a CLI. The agent is another program in that same place. Some products also draw a panel inside an editor. If that panel is clearly operating on the open project — reading those files, writing those files — it is the same idea. A website where you paste code into a box is the chat window, even if the website says "code."

### What it is not

- It is **not** a general chat about your day, your career, or a library you do not have checked out. That is the chat window's job.
- It is **not** the author of record. Your name goes on the change. You accept the diff.
- It is **not** a live view of production. Unless you foolishly give it credentials, it sees the files in the folder. Shelf has no production database. Your real projects might. Access is a decision you make, and U09 will make it a written rule.
- It is **not** one brand. Several programs do this job. This course teaches the job.

### What a chat window is good for

Use a chat window when the work product is **an answer in the conversation**: explain this stack trace, suggest three names, review a paragraph of a spec you pasted. You bring the context in by pasting. You carry the answer out by copying. Nothing in the repo changes until you change it.

### What the project agent is good for

Use the project agent when the work product is **a change to files**: implement this spec, add this test, fix this function. The agent can see `src/loans.js` without you pasting it, which is the whole point, and also the whole risk. It may edit the wrong file because it can.

### A picture of responsibility

```text
You decide the task and the limits.
The agent reads the folder and proposes edits and commands.
You read the diff and the test output.
You keep the change or you throw it away.
```

If any sentence in that picture is skipped, the workflow has a hole. Later units fill the holes. This unit only makes the picture familiar.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Chat window | A conversation. You paste context in and copy answers out | Called "AI" as if it could see your repo |
| Local coding agent | A program on your machine, aimed at a project folder, able to read and edit files | Not automatically wise |
| CLI | A program you run by typing in a terminal | Not a particular vendor's product name |
| Session | One run of the agent, from start until you quit | Not the same as a Git commit |
| Work product | The thing that should exist when you are done: either an answer, or a file change | People ask a chat to produce a file change |

## Worked example

**Situation A.** You do not remember what `??` means in this line from `src/books.js`:

```javascript
return books.find((book) => book.id === id) ?? null;
```

**Fitting tool:** chat window, or your own memory. Paste the line. The work product is an explanation. Shelf does not need to change.

**Situation B.** Borrowers want a count of books they have out. The change belongs in `src/loans.js` and in the test file.

**Fitting tool:** project agent, after a spec exists (you will write specs in Phase 3). The work product is a diff. A chat window would hand you a snippet that might not match shelf's `{ ok, error }` style, and you would be the one to notice.

**Situation C.** You want a pep talk before a review meeting.

**Fitting tool:** neither of the tools this course cares about. It is not a software change.

## Common errors

### Pasting the repo into chat "so it has context"

**What you see:** A huge paste, then a reply that edits a function you deleted last month, because the paste was stale. Or a reply that includes a secret that was in a file you pasted without looking.

**What it means:** The chat's context is whatever you dropped in, frozen at paste time.

**What to do:** For file changes, work in the project folder with an agent that reads the current files, and keep secrets out of both tools. U04 and U09 go further.

### Letting the agent run because "it is the same AI I chat with"

**What you see:** Files change that you did not have a spec for.

**What it means:** The capable tool was used without the decisions in the responsibility picture.

**What to do:** Until Phase 4, you are learning to **recognise** the tool. You are not required to point it at shelf yet.

## Checkpoints

1. In one sentence, what is a local coding agent?
2. Name a task in shelf that belongs in a chat window, and one that belongs in the agent.
3. Who accepts the diff?

## Practice exercises

### P1 — Sort the tasks

Label each as `chat`, `agent`, or `neither`:

1. "Explain why `borrow` returns `no-copies` for book `b2`."
2. "Add `countForBorrower` to `src/loans.js` and a test."
3. "What should we eat after the retro?"
4. "Rename `returnLoan` to `giveBack` across the repo."

Write one sentence of justification for item 4. It is an agent task with a wide blast radius. Width matters, and U18 will fence it. For now, notice the width.

### P2 — Work product

For item 1 and item 2 above, write what exists when the work is done if it was done well. Be concrete: "a paragraph in the chat" or "a diff in these files."

### P3 — A mismatch

Write four sentences about a time you (or a teammate) asked a chat window for a project change. What did you have to do by hand afterward? If you have no such story, invent a realistic one using shelf and say you invented it.

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- No install instructions for a specific agent.
- No `AGENTS.md`.
- No prompt templates yet.

## Next unit

**U03 — What the agent can see and do.**
