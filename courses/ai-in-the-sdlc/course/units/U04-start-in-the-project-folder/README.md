# U04 — Start in the project folder

**Phase 1 — The agent in the project**

## Where you are

You know what the agent can do. This unit is about **where** it does it. The current folder of the terminal is the project the agent will treat as home. Starting in the wrong folder is the first failure mode, and it feels like the agent "went rogue" when it only did what the folder allowed.

## What you will be able to do

- Explain why a session must start inside the repository, not in your home directory and not in a parent folder that contains several projects.
- Predict what an agent will edit if it is started in the wrong directory.
- Use `pwd` (macOS/Linux) or `Get-Location` (Windows PowerShell) to prove the folder before any agent work.

## What you need already

- **U03**. You already know how to `cd` in a terminal. This unit does not reteach navigation. It tells you why the folder is part of the safety story.

## Time and energy

About **40–60 minutes**.

## Why this exists

A local agent trusts the folder you give it. If that folder is `C:\Users\You`, the agent can read far more than shelf, and it may create `AGENTS.md` in a place no project expects. If that folder is `D:\green`, the agent sees many projects at once and may "helpfully" edit a sibling. If that folder is `course/examples/shelf`, it sees the loan tracker and little else. The folder is the first fence. You set it before you type a task.

## Plain-language teaching

### Current directory

The **current directory** is the folder your terminal is "in." Programs you launch, including an agent, inherit it. They resolve relative paths from it. `src/loans.js` means "the file `loans.js` inside `src` inside the current directory," not "that file somewhere on the disk."

### The right folder for this course

For shelf work, the right folder is the shelf project root: the directory that contains `package.json`, `src/`, and `test/`. Not `src/` itself (too narrow: the agent cannot see `package.json` as a sibling in the usual way, and test paths break). Not the course root (too wide: many units and two other courses if you are inside `training`).

### Prove it before you start

**What the command does:** prints the folder the shell is in.

macOS or Linux, or Git Bash on Windows:

```text
pwd
```

Windows PowerShell:

```text
Get-Location
```

**Success:** the path ends with the project root you meant. For the example, it ends with `shelf`.

**Typical failure:** the path ends with your user name, `training`, or `courses`. No error is printed. That silence is why this failure is easy to miss. The shell is happy. The agent will be happy. The edits land in the wrong tree.

### What the wrong folder does to an agent

Imagine you meant to add a test in shelf, but the shell is in your home directory.

- A read of `src/loans.js` fails, or finds a different `src` from another experiment.
- The agent may **create** `src/loans.js` so the path exists. You now have a second project, born by accident.
- `npm test` runs some other `package.json`, or reports that none exists.
- An `AGENTS.md` written "at the root" becomes a home-directory policy file. Later sessions pick it up and apply shelf's rules to unrelated work, or the reverse.

None of that requires a bad prompt. The folder was the bug.

### One project per session

If a task truly spans two repositories, do them as two sessions, with two diffs. A single session opened at a parent folder will mix the diffs and will apply one project's rules to the other. This course's assignments never require that.

### Editor panels

If your agent lives in an editor sidebar, the "folder" is the folder you opened as the workspace, not whatever random terminal tab is sitting nearby. Check the workspace root the same way you check `pwd`. A terminal in `shelf` and an editor opened on `training` are two different homes.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Current directory | The folder the shell will resolve relative paths from | Not "the folder I was thinking about" |
| Project root | The folder that holds `package.json` and the top of `src/` | Not `src/` itself, not your home folder |
| Workspace | The folder an editor has opened as the project | Can disagree with the terminal's current directory |
| Parent folder | The folder one level up, often containing several projects | A bad place to start an agent |

## Worked example

**Intended home:**

```text
D:\green\training\courses\ai-in-the-sdlc\course\examples\shelf
```

**Check (PowerShell):**

```text
Get-Location
```

**Success output (your user path may differ; the ending is the point):**

```text
Path
----
D:\green\training\courses\ai-in-the-sdlc\course\examples\shelf
```

**Wrong, and silent:**

```text
D:\green\training
```

From there, `src\loans.js` does not exist. An agent told "fix `src/loans.js`" may search, may give up, or may create `D:\green\training\src\loans.js`. Predict that before you feel betrayed by the tool.

**Also wrong:** starting in `...\shelf\src`. Then `npm test` does not see the `package.json` in the parent, and a new file `test/loans.test.js` would be created at `src/test/`, which is not the suite.

## Common errors

### "It edited a random project"

**What you see:** A diff in a sibling folder you had forgotten was on disk.

**What it means:** The session started in a parent directory that contains both projects. The agent searched, found a similar filename, and edited it.

**What to do:** Close the session. From the project root, run `git status` in the sibling and in the intended project. Restore anything you did not want, using the Git workflow you already use (`git restore` or your editor's revert). Re-open the agent only after `pwd` / `Get-Location` shows the project root.

### Two homes

**What you see:** The terminal is in `shelf`. The editor workspace is `training`. The agent in the sidebar edits files outside shelf.

**What it means:** You checked one home and worked in the other.

**What to do:** Make them the same folder before the next prompt.

## Checkpoints

1. What is the project root of shelf, in terms of which files sit directly inside it?
2. Why does the wrong folder often produce no error at all?
3. Why is starting inside `src/` also wrong?

## Practice exercises

### P1 — Predict

You are in `course/examples` (the parent of `shelf`). The prompt is "add a line to `CHANGELOG.md`." Where will that file most likely be created or edited? State the path relative to `course/examples`.

### P2 — Prove your shell

Open a terminal. Navigate to the shelf example. Run `pwd` or `Get-Location`. Paste the result into a note. Then run the same command from the parent folder and paste that too. Write one sentence on which one is a legal start.

### P3 — Repair story

In four sentences, describe how you would notice and undo a `src/loans.js` that an agent created in your home directory. You do not have to perform the accident.

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- No agent launch command, because that command is product-specific and is not the skill.
- No standing-instructions file yet.

## Next unit

**U05 — One turn: prompt, action, diff.**
