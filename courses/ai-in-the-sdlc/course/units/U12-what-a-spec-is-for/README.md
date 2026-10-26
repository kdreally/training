# U12 — What a spec is for

**Phase 3 — Specifications**

## Where you are

Standing instructions exist so every turn shares the same limits. They do not say what to build today. This unit introduces the **spec**: a short document, written before the prompt, that says what done means for one change. People skip it and put the whole idea in the prompt. The agent then invents the parts you had not decided.

## What you will be able to do

- Define a spec, and separate it from `AGENTS.md`, from a prompt, and from the code.
- Say what goes wrong when the only description of the change is a one-line prompt.
- Point at a shelf behavior and say whether it is specified or merely hoped for.

## What you need already

- **U10** or **U11** (you know what standing instructions hold).

## Time and energy

About **45–70 minutes**.

## Why this exists

"Add overdue loans" is a wish. An agent will satisfy a wish by choosing a definition: a library, a date format, a route, a meaning of overdue. Those choices are product decisions. If they appear first in a diff, you are reviewing someone else's product, not your own. A spec is where **you** make the decisions, in a file small enough to read, before any edit.

You would still want a spec if you were typing the code yourself. The agent raises the cost of skipping it, because it types faster than it asks.

## Plain-language teaching

### Smallest definition

A **spec** is a written description of one change: the behavior you want, the behavior you do not want, and how you will know the change is done. It is written in ordinary language plus examples. It is not the implementation.

This course stores specs at `specs/<short-name>.md` inside the project, one change per file. The folder does not exist in shelf yet. Creating it is part of doing a change, not part of standing policy. Some teams use an issue tracker instead. The home can vary. The timing cannot: the spec exists before the implementation prompt.

### What it is not

- **Not `AGENTS.md`.** Policy is lasting. A spec expires or gets archived when the change ships.
- **Not the prompt.** The prompt tells the agent to implement *this* spec and names the fences for the turn. The spec holds the decisions. If you only have a prompt, you have nowhere stable to point during review: "you asked for this in paragraph three" is a weak contract. "The spec's example says `1`" is a contract.
- **Not the code.** The code is one way to satisfy the spec. Another way that also satisfies the examples can be acceptable. A way that fails an example is not, even if it looks elegant.
- **Not a 20-page design book.** If the spec is longer than the change, it will not be read. U13 gives a shape that stays short. This unit only fixes the job of the document.

### Decisions a spec must already have made

For shelf, a behavior change usually decides:

- the function or route name,
- the inputs and outputs, including the error strings,
- what existing behavior stays,
- which files may change,
- which tests prove it.

If any of those is "the agent will know," it is unspecified. The agent will know *something*. It will not necessarily know what you wanted.

### A wish, then a spec

Wish, as a prompt with no spec:

```text
Add a way to count a borrower's active loans.
```

Unspecified, and therefore free for the agent to invent: the function name, whether returned loans count, whether the comparison trims spaces, whether the count is an HTTP field, whether lodash is used, whether a new file is created.

The same wish as decisions:

```text
Name: countForBorrower(borrower)
Counts active loans only (returned === false).
borrower must match the trimmed name already stored by borrow.
countForBorrower("Asha") is 0 when Asha has no active loan.
After borrow("b1", "Asha"), countForBorrower("Asha") is 1.
Does not add an HTTP route.
Does not add a dependency.
Files: src/loans.js, test/loans.test.js, CHANGELOG.md.
```

Those decisions were not hard. They were unmade. Writing them down is the work.

### Who the spec is for

You, so you notice you had not decided. The agent, so it stops guessing. The reviewer, so they can evaluate without re-deriving your intent from a diff. U28 is that evaluation. It is impossible to do fairly without a spec.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Spec | Decisions about one change, written before implementation | Not the code, not the standing policy |
| Wish | A one-liner that leaves the decisions unmade | Feels like a spec because it is a sentence |
| Archive | Move a shipped spec out of the active list | Not a Git erase |
| Contract | Examples you can test against | Not a legal document |

## Worked example

**Existing behavior, already true in shelf, restated so you can feel a spec:**

`borrow("b2", "Asha")` then `borrow("b2", "Ben")` returns `{ ok: false, error: "no-copies" }` because `b2` has one copy.

That sentence is specified by the current tests. You can point at `test/loans.test.js`. An agent that "improves" `borrow` and changes that error string has broken a contract even if you never wrote a new spec. Existing tests are specs that already shipped. U20 will lean on that. For a new behavior, there is no test yet, so the spec has to create the contract before the code does.

## Common errors

### Spec after the code, to "document what it did"

**What you see:** A markdown file that describes whatever the agent invented, written afterward so the ticket looks complete.

**What it means:** The spec cannot fail the diff, because it was copied from the diff. Review becomes theatre.

**What to do:** Write the examples first. If implementation teaches you that an example was wrong, change the spec in a separate, visible edit and say why. Do not silently match the spec to the code.

### A spec that says "see AGENTS.md"

**What you see:** The spec is one line, and policy is asked to carry the behavior.

**What it means:** `AGENTS.md` would have to change every task, which is the failure mode in U08.

**What to do:** Policy stays. The spec holds today's names, examples, and files.

## Checkpoints

1. What is a spec, in one sentence?
2. Name two decisions the wish "add overdue loans" leaves open.
3. Why is a spec written after the code a weak review tool?

## Practice exercises

### P1 — Label the document

Label each artifact `policy`, `spec`, `prompt`, or `code`:

1. "Do not add npm dependencies."
2. "`countForBorrower("Asha")` is 1 after one active loan."
3. "Implement `specs/count-for-borrower.md`. Touch only the files it names."
4. The function body that uses `.filter`.

### P2 — Open decisions

List four decisions still open in: "Let people return all of a borrower's books at once."

### P3 — Already specified

Find the test in `test/loans.test.js` that specifies blank borrowers. Quote the error string. That string is a contract an agent must not "clarify" into a friendlier sentence unless a spec says so.

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- The full section template is U13.
- Examples and non-goals get a deeper pass in U14.
- You are not asked to implement the function.

## Next unit

**U13 — A spec shape agents can execute.**
