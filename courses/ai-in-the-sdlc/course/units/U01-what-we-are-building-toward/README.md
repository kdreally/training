# U01 — What we are building toward

**Phase 0 — Orientation**

## Where you are

You know how a unit works. This unit shows the destination in honest terms: what you will be able to do by U29, what the little **shelf** project is, and which tempting topics this course leaves alone.

## What you will be able to do

- State the five artifacts the course revolves around: standing instructions, spec, prompt, tests, evaluation.
- Describe the shelf project well enough to recognise its files later.
- Name three topics this course will not cover, and why that limit exists.
- Check that Node.js 20 or newer is available on your machine.

## What you need already

- **U00 — How this course works.**

## Time and energy

About **45–70 minutes**, including one version check in a terminal. If Node is missing, budget extra time for the install notes below. You do not need an agent installed.

## Why this exists

Without a destination, every file looks equally urgent. People then collect prompt tips, config screenshots, and product comparisons, and still cannot ship a small change safely. This unit is the map. You are not expected to perform the workflow yet.

## Plain-language teaching

### The job, in one paragraph

You will learn to keep a **local coding agent** inside a repository and to judge its work. A local coding agent is a program installed on your computer. You start it from a terminal in a project folder. It can read files, edit files, and run commands you allow. The course uses that idea without requiring a particular brand. U02 defines it slowly. For now, hold the picture: the agent works *in the project*, and you decide what is allowed to stay.

### Five artifacts

Everything later is one of these, or a review of one of these.

| Artifact | What it is | When it is written |
|----------|------------|--------------------|
| Standing instructions | Rules loaded on **every** turn. This course uses a file named `AGENTS.md`. | Once per project, then edited when policy changes |
| Spec | What "done" means for **this** change: behavior, examples, non-goals | Before implementation |
| Prompt | The message for **this** turn. It points at the spec and the limits | When you ask the agent to act |
| Tests | A check a machine can run. For shelf, `npm test` | With the change, before you accept it |
| Evaluation | A written pass/fail against the spec, with evidence from tests and the diff | After the agent stops |

Chat memory is not on this list. A clever sentence with no file behind it disappears on the next session.

### The shelf project

Shelf is a tiny library-loan tracker. It is the same example in every unit so you are learning the workflow, not a new application each week.

- `src/books.js` — two books. `b1` has two copies. `b2` has one.
- `src/loans.js` — `borrow`, `returnLoan`, `activeLoans`. Data is an array in memory.
- `src/server.js` — one route, `GET /loans`.
- `test/loans.test.js` — tests for the loan functions, using Node's built-in test runner.
- `package.json` — `"type": "module"` and a test script. **No dependencies.**
- `CHANGELOG.md` — a heading `## Unreleased` where accepted behavior changes get one line.

A loan result looks like `{ ok: true, loan }` or `{ ok: false, error: "no-copies" }`. Error names you will see: `unknown-book`, `borrower-required`, `no-copies`, `no-active-loan`.

The full tree is in `course/examples/shelf/`. Units also quote the lines they need, so you are not forced to hunt.

### What "correct code" will mean here

Correct means: the spec's examples hold, the existing tests still pass, the new tests pass, and the diff stays inside the files and dependency rules you set. A confident summary from the agent is not correctness. That standard arrives in full in Phase 5. You are only meeting it now so the destination is visible.

### What this course will not make you do

- Pick a model vendor, compare benchmarks, or install a specific CLI as a graded requirement.
- Build a chatbot, fine-tune a model, or design prompts for end users of a product.
- Replace code review, Git, or tests with an agent.
- Connect shelf to a real database. Shelf stays in memory on purpose, so "do not touch production data" can be practiced without a production system.

Those are real skills. They are other courses.

### Check Node before later units need it

You will run shelf's tests from U20 onward. Check now.

**What the command does:** prints the Node.js version installed on your machine.

```text
node --version
```

**Success** looks like `v20.11.0` or any `v20`, `v22`, or newer. The exact patch number does not matter.

**A typical failure** looks like:

```text
node: command not found
```

or, on Windows PowerShell:

```text
node: The term 'node' is not recognized as the name of a cmdlet, function, script file, or operable program.
```

**What it means:** the shell cannot find the Node program. It does not mean the rest of this course is blocked today. Install the current LTS build from the Node.js website (nodejs.org), then open a **new** terminal and run `node --version` again. If the old terminal still fails and the new one works, the old one was started before install and never reloaded its program list.

You are not expected to learn Node in this course. You are expected to be able to run one test command later.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Local coding agent | A program on your computer that reads and edits a project from the folder you started it in | Not a web chat about code |
| Standing instructions | Rules present on every turn | Not the task you typed today |
| Spec | A description of done for one change | Not the source code, and not a prompt |
| Prompt | The message that asks the agent to act on a spec | Not a substitute for the spec |
| Evaluation | Your written judgment of a change against the spec | Not a model-quality benchmark |
| Shelf | The small loan tracker used in every unit | Not a library framework |
| Dependency | Another package the project would install | Shelf has none; adding one is a decision, not a default |

## Worked example

Here is a complete, tiny picture of the workflow you are heading toward. You are **not** expected to write this yet. Read it as a map.

**Task someone might say:** "Count how many books a borrower has out."

**Standing rule already in the repo (preview):** do not add npm packages.

**Spec fragment:**

```text
Add countForBorrower(borrower) to src/loans.js.
It returns how many active loans that borrower has.
countForBorrower("Asha") is 0 when Asha has nothing out.
After borrow("b1", "Asha") it is 1.
Do not add files. Do not add dependencies.
```

**Prompt fragment:**

```text
Implement specs/count-for-borrower.md.
Touch only src/loans.js, test/loans.test.js, and CHANGELOG.md.
Run npm test. Stop if a test fails and report the output.
```

**Evaluation fragment:**

```text
Pass: test "Asha with one loan" passed. Diff adds one function and one test.
Pass: package.json is unchanged.
```

That packet — rules, spec, prompt, test, evaluation — is the whole course in miniature.

## Common errors

### Treating the map as homework to perform today

**What you see:** You try to write a perfect `AGENTS.md` before U06 explains why the file exists.

**What it means:** The preview felt like an order.

**What to do:** Leave the packet until those units. Your assignment today is to show you understand the destination.

### Installing three coding agents "to be ready"

**What you see:** An evening gone to accounts and API keys. No workflow practiced.

**What it means:** Tooling was mistaken for the skill.

**What to do:** If you already have one local agent, keep it. If you do not, wait. Every graded task can be done on paper.

## Checkpoints

1. Name the five artifacts, in the order you would create them for a change.
2. How many HTTP routes does shelf have today, and what is the path?
3. Why does a live model reply not count as the definition of done?

## Practice exercises

### P1 — File roles

Without opening the example folder, write what you expect to find in `src/loans.js`, `src/server.js`, and `test/loans.test.js`. Then open `course/examples/shelf/` and correct your list in a sentence.

### P2 — Version

Run `node --version`. Paste the output into a scratch note. If it failed, paste the error and one sentence of decoding, using the failure box above.

### P3 — Out of scope

A colleague says the course should include "which model is smartest this month." Write two sentences explaining why that request sits outside this course.

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- You do not write `AGENTS.md`, a spec, or a prompt for submission yet.
- You do not launch an agent.
- You do not change shelf's behavior.

## Next unit

**U02 — Chat window vs project agent.**
