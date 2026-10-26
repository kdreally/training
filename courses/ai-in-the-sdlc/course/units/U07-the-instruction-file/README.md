# U07 — The instruction file

**Phase 2 — Standing instructions**

## Where you are

You know why standing rules must live in the project. This unit names the file this course uses, and it separates that file from a product's configuration. People invent filenames (`AGENTS.md`, a hidden JSON file, a dot-directory). The invention is understandable. Two different jobs are being stuffed into one name.

## What you will be able to do

- Say what `AGENTS.md` is for in a project, and what it is not.
- Tell **instruction prose** apart from **tool wiring**.
- Decide where a given sentence or setting belongs.
- Explain what to do when a tool looks for a different filename.

## What you need already

- **U06 — Why standing instructions exist.**

## Time and energy

About **50–70 minutes**.

## Why this exists

If the rules have no agreed place, every developer picks a favorite: a note in the README, a JSON file they hoped the tool would read, a 200-line comment at the top of `server.js`. The agent reads some of these and skips others. You will think the rule is in force because you wrote it down. It was in a file the tool never loads.

This course picks one place for prose rules: **`AGENTS.md` at the project root.** The name is plain. Several local agents look for it. It is Markdown, so a human can review it in the same pull request as the code. Your course-author doctrine file happens to use the same filename in a different folder. That is a name collision to be aware of, not a mystery: **the `AGENTS.md` next to shelf's `package.json` is for the agent that edits shelf.** The one in the course repository root is for people writing the course.

## Plain-language teaching

### The instruction file

An **instruction file** is Markdown the agent loads as text. It contains sentences a human can argue about: do not add dependencies, do not touch a database, append a changelog line when behavior changes.

For every project in this course, that file is:

```text
AGENTS.md
```

sitting in the project root, beside `package.json`. Not inside `src/`. Not named `notes.md`, because the tool will not look for `notes.md` unless you always remember to point at it.

A minimal shape:

```markdown
# Project name — standing instructions

One short paragraph: what this project is, where the code lives, how tests run.

## Constraints

- Checkable rule.
- Checkable rule.
```

U10 fills this in for shelf. Today, learn the shape and the job.

### Tool wiring is a different job

**Tool wiring** is configuration for one product: which model to call, whether the shell is allowed to run, whether network access is off, which folders are hidden. It is often JSON or a settings screen. The agent may not treat it as "advice." It treats it as permissions.

Examples of wiring, stated without requiring any product:

- "Allow `npm test`. Deny `npm install`."
- "Do not send files that match `.env`."
- "Start in this workspace."

Examples of instructions, which wiring should not be asked to express in a comment field if you can help it:

- "Match the `{ ok, error }` result style."
- "A behavior change needs a test."

If you only set permissions, the agent can still write a lodash import and wait for the install to fail. If you only write prose, a sloppy mode might still run `npm install` before anyone reads the prose. Real safety uses both. This course **writes the prose** and **describes the permissions in words**. It does not standardize a JSON filename. Products disagree, and a fake required `config.json` would become folklore by next year.

When you use a real agent, open its documentation once and find two facts:

1. Does it load `AGENTS.md` from the project root?
2. Where do command permissions live?

Write those two facts in your own notes. If the tool loads a different Markdown file instead, put the **same** rules there, or make that file a three-line pointer: "Follow `AGENTS.md` in this directory." Do not keep two copies that can drift. Drift means one file forbids new dependencies and the other allows them "for prototypes." The agent will satisfy the looser one.

### What the file is not

- Not a README for humans discovering the project. Shelf's `README.md` explains how to run tests. `AGENTS.md` tells the agent how to behave. A little overlap is harmless. A full user guide inside `AGENTS.md` hides the rules.
- Not the spec of the week.
- Not a prompt you paste.
- Not proof the tool obeyed.

### How loading fits the turn

From U05, insert one beat:

```text
1. You are in the project root. The tree is clean.
2. The tool loads AGENTS.md (and any wiring).
3. You send one prompt.
4. Actions happen under those rules.
5. You compare the diff to both the prompt and AGENTS.md.
```

If your tool does not load the file automatically, step 2 is your job: the prompt begins with "Follow AGENTS.md in this folder." That sentence is a backup, not the design. Automatic load is the point of a stable filename.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| `AGENTS.md` | The Markdown file of standing rules at the project root | Not the course-author doctrine, unless you are in that folder |
| Instruction prose | Sentences about how to work in this repo | Not permissions enforced by the tool |
| Tool wiring | Product settings: commands, network, ignored files | Not a home for coding style |
| Project root | Next to `package.json` | Not `src/AGENTS.md` |
| Drift | Two copies of the rules that no longer match | Happens when each tool has its own edited file |

## Worked example

A teammate proposes this JSON as "the constraints file":

```json
{
  "model": "fast",
  "allowCommands": ["npm test", "node"],
  "denyCommands": ["npm install", "git push"],
  "notes": "be careful and write clean code"
}
```

Sort it.

| Piece | Home | Why |
|-------|------|-----|
| `model` | Tool wiring | A product setting. Shelf's policy does not change if the model name changes |
| `allowCommands` / `denyCommands` | Tool wiring | Permissions, if the product supports them |
| `notes` | Nowhere yet | "Be careful" is not checkable. The real rules belong as sentences in `AGENTS.md` |

`AGENTS.md` for the same intent:

```markdown
# Shelf — standing instructions

Shelf is an in-memory loan tracker. Tests: `npm test` (node:test). No npm dependencies.

## Constraints

- Do not add dependencies or frameworks.
- Do not connect to a database or any network service.
- Do not read or print secrets.
- Change only files named in the current task.
- Match existing ESM style and `{ ok: false, error }` results.
- Keep a test with every behavior change. Do not delete tests to get a pass.
- After an accepted behavior change, add one line under `CHANGELOG.md` `## Unreleased`.
```

The JSON did not say most of that. The Markdown can. The deny list for `npm install` is still worth setting in wiring if the product allows it, because prose can be ignored and a denied command cannot run.

You are not expected to drop this file into shelf until U10's assignment. This is the shape.

## Common errors

### Rules hidden in README section 14

**What you see:** A heading "AI stuff" in the middle of the human README. The agent never receives it. The next agent session installs lodash.

**What it means:** The prose was written for a human scrolling, in a file the tool is not guaranteed to load in full. Some tools do read READMEs. Do not depend on that for policy.

**What to do:** Put policy in `AGENTS.md`. Let the README tell humans how to run the tests.

### Two sources of truth

**What you see:** `AGENTS.md` says "no new dependencies." A product-specific file says "you may add small helpers from npm."

**What it means:** Drift. The session will pick one.

**What to do:** One prose source. The other file points at it.

## Checkpoints

1. Where does `AGENTS.md` sit in shelf, and who is it for?
2. Is "deny `npm install`" prose or wiring?
3. What do you do if your tool loads `CONTRIBUTING_AGENT.md` instead?

## Practice exercises

### P1 — Sort the lines

For each, write `prose`, `wiring`, or `neither`:

1. "Allow the shell to run `npm test` only."
2. "Error strings stay kebab-case, like `no-copies`."
3. "Use the fast model."
4. "Add overdue loans today."
5. "Hide files named `.env` from the agent."

### P2 — Pointer file

Your tool only auto-loads a file called `AGENT_NOTES.md`. Write the full three-line contents of that file so the rules themselves stay in `AGENTS.md`.

### P3 — Name collision

In two sentences, explain how the `AGENTS.md` beside shelf's `package.json` differs in audience from a teaching-doctrine `AGENTS.md` at a course root.

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- The long catalog of which constraints are good (U09).
- A graded full shelf policy (U10).
- Any requirement to install a tool or produce JSON in a vendor schema.

## Next unit

**U08 — Standing rules vs today's task.**
