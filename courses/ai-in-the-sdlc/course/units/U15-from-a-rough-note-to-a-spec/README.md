# U15 — From a rough note to a spec

**Phase 3 — Specifications**

## Where you are

You can write a spec when the goal is already clear. Real requests arrive as a paragraph from a teammate, a ticket, or a hallway conversation. This unit is the translation step: rough note → questions → spec. The agent is the wrong first reader of the rough note. You are the first reader.

## What you will be able to do

- Mark decisions in a rough note as decided, undecided, or dangerous.
- Write a short question list for the undecided items that block implementation.
- Produce a spec that chooses a default where the course gives you authority, and that leaves a question where a wrong guess would change product behavior.

## What you need already

- **U14 — Examples and non-goals.**

## Time and energy

About **60–90 minutes**.

## Why this exists

Feeding a stakeholder paragraph straight to an agent feels efficient. It moves the undecided product choices into a diff, where they are expensive to undo and easy to miss. A five-line question list is the slower path for ten minutes and the faster path for the rest of the week.

Some gaps are yours to close. "Which file?" on shelf is not a stakeholder question. You know the map. Asking a product owner which JavaScript file to edit wastes them and stalls you. Ask humans about behavior they own. Decide technical placement yourself and write it in the spec.

## Plain-language teaching

### Three marks

Read each claim in the note and mark it:

| Mark | Meaning | What you do |
|------|---------|-------------|
| Decided | The note states a behavior you can turn into an example | Put the example in the spec |
| Undecided | Two honest readings exist, and they change what a test would assert | Ask, or pick a default and label it as a default |
| Dangerous | A reading would break standing rules (database, new package, secret, force-push) | Refuse that reading in non-goals, even if the note sounds excited |

### What is worth a question

Ask when the answer changes an example's expected value and you are not the owner of that choice.

- "Overdue on the due date, or the day after?" changes the test.
- "Do returned books still show as overdue?" changes the test.
- "Which file holds the function?" does not. You decide.

### Defaults you may choose on shelf

Label them in the spec as `Default (you may overturn):`.

- No HTTP unless the note clearly asks for an API.
- No new dependency.
- Strict string match on names.
- Caller passes `today`; the code does not read the clock.
- Existing error strings stay.

A default is still a decision. It is written down so a reviewer can overturn it without reverse-engineering the code.

### A rough note

```text
hey can we do overdue stuff? sam was annoyed that the shelf
keeps showing books people already should have returned.
maybe email them? or at least a list. due date could be
two weeks, use whatever date lib is standard.
also the api should be modern. thanks!!
```

Marks:

- "a list" of overdue loans → decided that a list exists, undecided what it returns and to whom.
- "books people already should have returned" → undecided whether the due date itself is included.
- "maybe email" → dangerous if it means network, and undecided as a feature. Default: no email. Non-goal.
- "whatever date lib is standard" → dangerous. Standing rules ban surprise packages. Non-goal: no date library. You do not need permission to refuse this.
- "api should be modern" → dangerous mush. Default: no HTTP change until a spec names a route. Question only if the sender truly needs an endpoint this change.
- "two weeks" → decided as 14 days, undecided from which date. Shelf has no checkout date stored. Question: the caller passes `today`, or we refuse due dates until borrow stores one?

You can write the spec with defaults and a question section at the top. Do not pretend a question is answered.

### Question section

Put unresolved items first, so nobody implements past them.

```markdown
## Open questions

1. Is a loan overdue on its due date, or only after that date?
   Blocked examples: overdueLoans("2026-01-15") for a loan due that day.
2. Does "a list" need a new HTTP route in this change?
   Default if unanswered: no HTTP. Function only.

## Defaults chosen so drafting can continue

- No email, no network.
- No date library.
- 14 days, caller supplies today as YYYY-MM-DD.
```

If question 1 is unanswered, the Done section says: do not implement yet. A spec with a blocking question is a successful spec. An implementation that guesses the due-date boundary is not.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Rough note | The human request, unstructured | Not a spec |
| Blocking question | An unknown that changes an expected test result | Not a technical preference |
| Default | A choice you document so work can continue | Not a silent guess inside code |
| Dangerous reading | An interpretation that breaks standing policy | Not "a feature I dislike" |

## Worked example

**Note:** "Let Asha return everything she has out, one call. Keep it simple. Probably hit the database so it sticks."

**Marks:**

- One call returns all of one borrower's active loans → decided as a goal, undecided on the name and the return shape.
- "Keep it simple" → mush. Drop.
- "Hit the database" → dangerous. Non-goal. Shelf has no database. You do not ask whether to add Postgres. You refuse and, if persistence is truly required, that is a different project with a human design, not an agent guess.

**Questions worth asking:**

1. Should the function return the loans it closed, or only a count?
2. If she has nothing out, is that success with an empty list, or an error?

**Not a question:** which database driver to import.

**Spec fragment after you choose defaults (and label them):**

```markdown
## Open questions
None. Defaults below were chosen by the implementer because the note did not say.

## Defaults chosen
- Name: returnAll(borrower)
- Returns { ok: true, loans } with the loans that were active and are now returned.
- Zero active loans → { ok: true, loans: [] }, not an error.
- No database. In-memory, same as returnLoan.
- No HTTP.

## Behavior
Examples:
- borrow b1 Asha, borrow b2 Asha, returnAll("Asha")
  → ok true, two loans, both returned, activeLoans() is []
- returnAll("Ben") with nothing out → ok true, loans: []
- Asha's loans of b1 do not return Ben's loan of b1
```

The note said "everything she has out." Ben's loan surviving is the neighbor case. Write it or the agent may clear the array.

## Common errors

### Asking the stakeholder which file to edit

**What you see:** A blocked ticket: "please specify the path."

**What it means:** A technical placement was treated as a product question.

**What to do:** Choose `src/loans.js` and write it under Files.

### Implementing with the question still open

**What you see:** The spec says "open: inclusive or exclusive due date" and the prompt says "implement the spec."

**What it means:** The agent will pick inclusive or exclusive and your tests will canonize the guess.

**What to do:** The prompt for that spec is "do not implement. The due-date question is blocking." Or you close the question yourself, label the default, and then implement. Both are honest. Guessing inside the code is not.

## Checkpoints

1. What makes a question blocking?
2. Why is "which date library?" not a question you ask the stakeholder on shelf?
3. Where do defaults sit so a reviewer can see them?

## Practice exercises

### P1 — Mark

Mark decided, undecided, or dangerous:

```text
Add POST /loans that borrows a book.
Body should be JSON.
Use express, our server is old-fashioned.
Password for staging is in the wiki, grab it if tests need the real db.
```

### P2 — Questions only

Write at most three blocking questions for the P1 note. Write at least two non-questions you refuse to ask.

### P3 — Default

Write a four-line default block that keeps shelf's `node:http` server and refuses express and the staging database. You do not need the full spec.

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- You do not implement the note.
- You do not send the questions to a real stakeholder. You write them as part of the spec packet.

## Next unit

**U16 — Prompt anatomy.**
