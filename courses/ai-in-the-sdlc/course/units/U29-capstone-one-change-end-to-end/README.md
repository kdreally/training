# U29 — Capstone: one change end to end

**Phase 7 — Capstone**

## Where you are

This is the last unit. You will assemble the workflow for one real change to shelf: **due dates and overdue loans**. You will not be scored on a live model's cleverness. You will be scored on a packet a teammate could run, and on an evaluation sheet that would catch the usual inventions.

The feeling that the packet is "a lot of writing for a small function" is normal. The writing is the work. The function is the small part.

## What you will be able to do

- Produce standing-rule reminders, a spec, two sequenced prompts, oracles, and an evaluation sheet for due dates.
- Split "store a due date" and "list overdue loans" into two turns.
- Predict a bad generation and show which rows would fail.

## What you need already

- **U10** (standing file), **U14** (examples and non-goals), **U19** (prompt patterns), **U24–U28** (workflows).

## Time and energy

About **3–5 hours**, split across a break. If you also run a local agent, add time, and still submit the packet if the agent misbehaves. A bad agent run with a good evaluation is a strong capstone. A good agent run with no packet is not.

## Why this exists

Each earlier unit held one piece. Due dates pull on every piece at once: a magnet word ("date"), a change to an existing function (`borrow`), a new function, a keep list, tests, and a ban on libraries and clocks. If you can specify that without handing the agent a wish, you can run the workflow on your own repository next week. Replace the nouns. Keep the order.

## Plain-language teaching

### The change

Shelf loans do not have due dates. After this change:

- `borrow(bookId, borrower)` stays valid. The loan has no `due`. Existing tests pass without edits to their expectations.
- `borrow(bookId, borrower, today)` stores `due` as the calendar date **14 days after** `today`.
- `today` is `YYYY-MM-DD`. No time-of-day. No time zone. No `Date.now`.
- `overdueLoans(today)` returns active loans whose `due` string is strictly less than `today`.
- A loan with no `due` is never overdue.
- A loan due **on** `today` is not overdue yet.
- Returned loans are not overdue.
- No HTTP change. No date library. No new source file.

Date arithmetic without a library is a small function: parse the three numbers, add 14 days using `Date.UTC`, format back to `YYYY-MM-DD`. You may describe that in the spec as allowed implementation, or you may leave the algorithm to the implementer and keep only the examples. Examples are the contract:

```text
borrow("b1", "Asha", "2026-01-01") → loan.due === "2026-01-15"
borrow("b1", "Asha", "2026-01-20") → loan.due === "2026-02-03"
overdueLoans("2026-01-15") does not include the first loan
overdueLoans("2026-01-16") includes it
borrow("b1", "Ben") without today → overdueLoans("2026-12-01") does not include Ben
```

Check the month rollover yourself before you freeze the example. 20 January 2026 plus 14 days is 3 February 2026. If you are unsure, compute it by hand and show the arithmetic in the spec. Do not ask an agent to invent the expected date and then test against its invention.

### Two turns

| Turn | Behavior | Files |
|------|----------|--------|
| 1 | Optional `today` on `borrow`, field `due`, existing two-argument calls unchanged | `src/loans.js`, `test/loans.test.js`, `CHANGELOG.md` |
| 2 | `overdueLoans(today)` only, after turn 1 is accepted | same allow list |

One spec may describe both. Two prompts. Do not ask for the route, the email, or the microservice.

### What the evaluation must catch

A generation that imports `date-fns`, reads `new Date()`, adds `GET /overdue`, or edits the `no-copies` expectation fails the sheet even if a new test is green.

### Optional live run

If you have a local coding agent, start it in a **copy** of shelf, not in a folder full of unrelated work. Load your `AGENTS.md`. Send prompt 1 only. Review. Then prompt 2. Attach `git diff` and your real `npm test` summary under `optional/`. If you skip this, you lose no must-have points.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Capstone | The combined packet | Not a new theory unit |
| Sequenced prompts | Turn 2 waits for turn 1 to be accepted | Not two wishes in one message |
| Hand arithmetic | You compute an expected date yourself | Not a library requirement |

## Worked example

A fragment of prompt 1, not the whole packet:

```text
Implement only the due-date part of specs/due-dates.md.
Do not add overdueLoans in this turn.

Allowed: src/loans.js, test/loans.test.js, CHANGELOG.md. No other files.
Neighbor: borrow in src/loans.js. Keep the two-argument form working.
Example: borrow("b1","Asha","2026-01-01") stores due "2026-01-15".
borrow("b1","Asha") still returns ok true and does not set due.

No date-fns, dayjs, moment, or luxon. Do not call Date.now or new Date()
for "today". You may use Date.UTC to add days.
Do not edit src/server.js. Do not change no-copies.

Verify: npm test
Stop: if an existing test fails, stop. Do not edit its expected error.
```

Prompt 2 exists only on paper until prompt 1 would be accepted. Writing it now is correct. Sending it on a dirty failed turn is not.

## Common errors

### One prompt for dates, API, and email

**What you see:** The capstone spec's goal paragraph includes "notify the borrower."

**What it means:** Scope returned to the rough note from U15.

**What to do:** Non-goal the network. Two behaviors maximum: store `due`, list overdue.

### Expected dates you did not compute

**What you see:** `due` is `"2026-01-14"` because 14 days was added to the day number without checking.

**What it means:** The oracle is wrong, so a correct function would fail it or a buggy one would pass.

**What to do:** Show the arithmetic beside the example. January 1 plus 14 days lands on January 15, not January 14. "Plus 14" from the 1st is the 15th if you count the way calendars count: the due date is fourteen days later, so the 15th.

## Checkpoints

1. Why are there two prompts?
2. What is overdue on the due date itself, in this capstone?
3. What evidence would fail a `date-fns` import?

## Practice exercises

### P1 — Arithmetic

Compute 2026-12-25 plus 14 days. Write the steps. Use that date only if you also put it in the spec; otherwise the January examples are enough.

### P2 — Keep

Write three keep lines: two-argument `borrow`, `no-copies` on `b2`, `GET /loans` unchanged.

### P3 — Sheet skeleton

Write five evaluation rows with the evidence column filled by what you **would** open (`git diff --stat`, a test name), not by a pretend pass.

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- No production database, no email, no framework migration.
- No requirement to buy or install a particular agent.
- No next unit. Take the packet shape to your own repository, and change the map in `AGENTS.md` so it describes that repository rather than shelf.

## Next unit

None. This is the end of the course. The next step is a real change in a real repo, with the same packet, at a size you can review in one sitting.
