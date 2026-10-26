# AGENTS.md — AI in the Software Development Life Cycle

Course-specific teaching doctrine. The shared doctrine in the repo root (`../../AGENTS.md`) applies in full. This file adds the mission, the audience, the dependency chain, the unit map, and the technical defaults for **this** course.

This file is for authors. Learners read `course/`.

## 1. Mission

Take a working developer from "I paste tickets into a chat window and hope" to a repeatable way of using a **local coding agent** inside a repository:

1. Standing instructions the agent loads on every turn.
2. A specification that says what done means before code is written.
3. A prompt that fences files, dependencies, and behavior.
4. Tests and a diff review that decide whether the generation is acceptable.
5. The same loop for a new feature, a change request, a bug fix, a debugging session, and an evaluation.

Success means the learner can explain why each artifact exists, produce the artifact, and reject a plausible-but-wrong generation. Success is not "the model wrote something that ran."

The course is **not** about a vendor, a model brand, or a chat website. Products change. The folder, the instruction file, the spec, the prompt, and the check do not.

## 2. Who the learner is

- A working developer. They can read and write a small Node.js module, run a terminal command, and use Git (`status`, `diff`, `commit`, restore a file).
- They have used an AI chat, or a coding agent, at least once. The result was sometimes useful and sometimes a pile of files they did not ask for.
- They are not asking to be taught what a function, an HTTP route, or a test is. They are asking to be taught how to **direct** an agent without losing the codebase.
- Default feeling around this topic: mild embarrassment. Colleagues talk as if prompting were obvious. It is not.

### Never assume they know

| Term | Why it is often wrongly assumed |
|------|----------------------------------|
| Local coding agent vs chat transcript | Both get called "AI" |
| Why the process must start in the project folder | People upload a zip, or chat from their home directory |
| Standing instructions vs the prompt of the day | They paste the same rules into every chat and still lose them |
| What `AGENTS.md` is for | The filename sounds like this authoring file; in a project it is policy for the agent |
| Spec vs prompt vs code | People ask for code in the same breath as the idea |
| Why a vague prompt imports a random package | The agent fills gaps with popular libraries |
| Why tests are the acceptance oracle | "It looks right" feels faster |
| Evaluation as a written pass/fail with evidence | People treat evaluation as a vibe, or as an ML benchmark |

If a unit needs Git or Node, it may **use** them. It must not **teach** them from zero. One reminder sentence and a pointer to the command is enough.

### Confidence

Name the embarrassment. Separate the learner from the generation ("the diff invented a dependency" is not "you are bad at AI"). Never say the workflow is easy.

## 3. Dependency chain (do not invert)

```
a local coding agent reads and edits a project on your machine
  → it only sees the folder you started it in
    → every turn needs the same project rules, so those rules live in a file
      → that file holds standing constraints, not today's task
        → a spec says what "done" means, with examples and non-goals
          → a prompt points at the spec and fences the change
            → ambiguity is filled with invented packages, files, and APIs
              → fences, existing patterns, and named tests prevent that
                → you accept code only after tests and a diff review
                  → the same loop is a feature, a change, a bug, a debug session, or an evaluation
```

Never ask for a prompt before standing rules and a spec exist as ideas. Never ask the learner to "trust the agent" before the review unit. Never grade a live model response; grade the learner's files and their review of a **fixed** generation printed in the unit.

## 4. Curriculum map

Unit IDs are stable. The running example in every phase is **shelf**, a tiny in-memory library-loan tracker under `course/examples/shelf/`.

### Phase 0 — Orientation

| ID | Unit focus | Learner can… |
|----|------------|--------------|
| U00 | How this course works; stuck protocol; assessment | Start without treating confusion as failure |
| U01 | Destination, honest scope, the shelf example | Say what the course will and will not make them do |

### Phase 1 — The agent in the project

| ID | Unit focus | Learner can… |
|----|------------|--------------|
| U02 | Chat window vs a local coding agent | Choose the project agent for repo work and say why |
| U03 | What the agent can see, edit, and run | Classify an action as read, edit, command, or refusal |
| U04 | Start in the project folder | Diagnose a session that ran in the wrong directory |
| U05 | One turn: prompt, actions, diff, your decision | Narrate a turn and name who is responsible for accepting it |

### Phase 2 — Standing instructions

| ID | Unit focus | Learner can… |
|----|------------|--------------|
| U06 | Why the same rules must load every turn | Explain why chat memory is not project policy |
| U07 | The instruction file (`AGENTS.md`) and tool wiring | Separate prose rules from a product's config file |
| U08 | Standing rules vs today's task | Sort sentences into the file or the prompt |
| U09 | Constraints worth writing | Write checkable rules (deps, secrets, data, changelog, scope) |
| U10 | A worked `AGENTS.md` for shelf | Produce a standing file another developer could drop into shelf |
| U11 | Instruction files that fail | Repair a vague, bloated, or contradictory file |

### Phase 3 — Specifications

| ID | Unit focus | Learner can… |
|----|------------|--------------|
| U12 | What a spec is for | Distinguish spec, prompt, and code |
| U13 | A spec shape agents can execute | Draft goal, behavior, files, tests, done |
| U14 | Examples and non-goals | Pin behavior with input/output and an explicit out-of-scope list |
| U15 | From a rough note to a spec | Turn a stakeholder paragraph into a spec plus open questions |

### Phase 4 — Prompts

| ID | Unit focus | Learner can… |
|----|------------|--------------|
| U16 | Prompt anatomy | Write a prompt that points at a spec and a done check |
| U17 | What ambiguous prompts produce | Name the failures in a fixed bad generation |
| U18 | Fence the change | Add allowed files, forbidden files, and a dependency ban |
| U19 | Patterns that stay accurate | Write one-behavior prompts that cite existing code and an example |

### Phase 5 — Making the code correct

| ID | Unit focus | Learner can… |
|----|------------|--------------|
| U20 | Tests before you accept | Write or name the test that would reject a wrong generation |
| U21 | Review the diff | Accept or reject a fixed diff with file-level reasons |
| U22 | Stop, revert, tighten, retry | Recover from a bad turn without stacking a second bad turn |
| U23 | Match the repo | Catch a drive-by restyle, a new package, and a new pattern |

### Phase 6 — Life-cycle workflows

| ID | Unit focus | Learner can… |
|----|------------|--------------|
| U24 | New feature | Produce a small feature packet (spec, prompt, test notes) |
| U25 | Change request | State what stays, what changes, and which tests must still pass |
| U26 | Bug fix | Start from a reproduction and ask for the smallest fix |
| U27 | Debugging | Demand evidence and one hypothesis; forbid a rewrite |
| U28 | Evaluation | Fill a pass/fail sheet against the spec, with evidence |

### Phase 7 — Capstone

| ID | Unit focus | Learner can… |
|----|------------|--------------|
| U29 | One change, end to end | Assemble rules, spec, prompt, tests, and an evaluation plan for due dates on shelf |

## 5. Technical defaults

| Choice | Default | Notes |
|--------|---------|--------|
| Agent | Any local coding agent the learner already has | Teach the workflow. Do not require a brand. Do not print vendor install steps as if they were the curriculum. |
| Instruction file | `AGENTS.md` at the repository root | Prose constraints. If a tool reads a different filename, the same prose is the source; do not maintain two conflicting copies. |
| Tool wiring | Mentioned, not standardized | Permissions, allowed commands, and "do not use the network" live in the product's own config. The course never invents a required `grok.config.json` or similar. |
| Example app | `course/examples/shelf/` | Node.js 20+, ESM, `node:http`, `node:test`, zero npm dependencies. |
| Language of examples | JavaScript | Learners are not taught Node. Snippets stay small. |
| Tests | `npm test` → `node --test` | The oracle for shelf behavior. |
| Change log | `CHANGELOG.md` under `## Unreleased` | One line per **accepted** behavior change. Not a log of every tool call. |
| Git | Used, not taught | `git status`, `git diff`, restore the files from the last commit. No force-push, no history rewrite. |
| OS | Windows, macOS, Linux | Call out a difference only when the command differs. `npm test` and `git diff` do not. |
| Secrets and data | Never | No real database, no credentials, no network calls in examples or assignments. |
| Live model | Optional nice-to-have | Assignments must be completable from the unit text alone. |

### Shelf contract (do not drift)

- Books: `b1` Plain Words (2 copies), `b2` The Shelf (1 copy).
- `borrow(bookId, borrower)` → `{ ok: true, loan }` or `{ ok: false, error }` with `unknown-book`, `borrower-required`, `no-copies`.
- Borrower names are trimmed. Loans live in a module-level array. `resetLoans()` clears them and is for tests.
- `returnLoan` uses error `no-active-loan`.
- HTTP surface is only `GET /loans` → `{ loans }` and anything else → `404 { error: "not-found" }`.
- Later units **add** behavior only through a spec. Baseline files do not grow inside `course/examples/shelf/` unless an author is revising the baseline on purpose. Learner solutions stay in `solutions/`.

### Constraint catalog (U09 teaches this; later units may reuse it)

A standing rule earns its place when a human can check it in a diff.

Include, in plain sentences:

- Project one-liner, stack, and where code lives.
- Edit only files the task names.
- Do not add npm dependencies. Use the Node built-ins already in the repo. If a library seems necessary, stop and ask.
- Do not connect to a database, a network API, or a real environment. Memory and local tests only.
- Do not read, print, or commit secrets (`.env`, keys, tokens).
- Match the existing style: ESM, `{ ok, error }` results, no new framework, no new folder layout.
- Do not reformat or rename unrelated code.
- Behavior changes ship with a `node:test` test. Do not delete a test to force a pass.
- When a behavior change is accepted, append one line under `CHANGELOG.md` → `## Unreleased`.
- If the spec and the code disagree, stop and say so. Do not invent routes or fields.
- Allowed commands: `npm test`, `node`. No install, no destructive git.

A rule does **not** earn its place when it is only taste: "be careful", "write clean code", "use best practices".

## 6. Authoring rules for this course

- Every new artifact (instruction file, spec, prompt, review sheet) gets the full "explain the hell out of it" treatment from the shared doctrine: problem, alternative, definition, what it is not, what the learner writes, what good looks like, what failure looks like.
- Show a **wrong-on-purpose** generation whenever the unit is about ambiguity. Use a complete snippet, then decode it.
- Keep shelf consistent with the contract above. Quote the few lines a unit needs so the unit stands alone.
- Assignments ask for files plus an explanation in the learner's own words. At least one predict-then-compare or debug-this task per unit when it fits.
- Rubrics are visible, observable, and split must-have from nice-to-have. Total 20 points unless a unit says otherwise.
- Assessor notes live in `solutions/assessor-notes.md` and are not linked from learner docs.
- Do not tell the learner to "ask an AI" or to look up a vendor's docs for something the unit itself requires.
- One new idea per unit. Workflow units (U24–U28) **combine** earlier ideas; they do not quietly introduce a new theory.
- Capstone (U29) must be an evening's written packet about shelf due dates, doable with no live model. Running their own agent and attaching a diff is nice-to-have only.

## 7. Worked shelf `AGENTS.md` (target of U10)

Authors may quote this. Learners meet it in U10, not before, except as a teaser that the file will exist.

```markdown
# Shelf — standing instructions

Shelf is a tiny in-memory library-loan tracker. Logic lives in `src/loans.js`.
Books live in `src/books.js`. HTTP lives in `src/server.js`. Tests live in `test/`
and use `node:test`. There are no npm dependencies.

## Constraints

- Change only the files named in the current task.
- Do not add dependencies. Do not introduce a framework, a database, or a network call.
- Do not read or write secrets.
- Match existing style: ESM imports, result objects `{ ok: true, loan }` or `{ ok: false, error }`.
- Do not reformat or rename code the task did not mention.
- A behavior change includes a test. Do not delete tests to obtain a pass.
- If the task and the code disagree, stop and report the disagreement.
- After an accepted behavior change, append one line to `CHANGELOG.md` under `## Unreleased`.
- You may run `npm test` and `node`. Do not run installers or destructive git commands.
```

## 8. One-page reminder

1. The agent works in the project folder, or it works on the wrong project.
2. Standing rules are a file. Today's task is a spec plus a prompt.
3. Rules must be checkable in a diff.
4. Ambiguity becomes packages, files, and invented APIs.
5. Tests and the diff are the acceptance. The agent's summary is not.
6. Same loop: feature, change, bug, debug, evaluation.
7. Grade files, not a live model.
