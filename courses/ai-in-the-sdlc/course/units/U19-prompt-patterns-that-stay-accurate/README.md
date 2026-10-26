# U19 — Prompt patterns that stay accurate

**Phase 4 — Prompts**

## Where you are

You can fence a change. This unit names the small set of patterns that keep generations faithful without making every prompt a novel. Speed, in this course, means fewer bad turns, not a faster typing speed. A short prompt on top of a real spec is the fast path. A one-line wish is the slow path, because you pay in review and revert.

## What you will be able to do

- Apply four patterns: one behavior, cite the neighbor code, give one input/output, fence the magnets.
- Explain why each pattern prevents a specific invention from U17.
- Shorten a bloated prompt without opening a decision.

## What you need already

- **U18 — Fence the change.**

## Time and energy

About **50–70 minutes**.

## Why this exists

People collect prompt proverbs. "You are a senior engineer." "Think step by step." "Be thorough." Those sentences change tone, not file lists. The patterns that move the diff are boring and specific. This unit canonizes four of them so you can write the next prompt from a checklist instead of from anxiety.

## Plain-language teaching

### Pattern 1 — One behavior

One new observable behavior per turn. `countForBorrower` is one. `countForBorrower` plus `GET /loans` includes the count is two. Do them as two turns even if both will ship the same day. You already felt this in U05. Here it is a prompt rule.

If the behaviors share a file, they still split. Two hunks in `loans.js` from two turns are easier to read than one hunk that does both and also reformats the file.

### Pattern 2 — Cite the neighbor

Point at the existing function the new code should resemble.

```text
Follow the style of activeLoans and borrow in src/loans.js.
Use .filter. Return a number. Do not introduce a class.
```

The U17 fixture invented a class in a new folder because nothing said "the neighbor is `activeLoans`." Citing a neighbor is faster than describing an entire style guide in the prompt. The style guide still lives in `AGENTS.md`. The citation makes this turn look at it.

### Pattern 3 — One input and one output in the prompt

The spec holds the full example set. The prompt repeats **one** of them, the one most likely to be "helpfully" changed:

```text
After borrow("b1", "Asha"), countForBorrower("Asha") === 1.
Comparison is ===. "asha" is not Asha.
```

That single line blocks case-folding, which a paragraph of "be precise" does not.

### Pattern 4 — Fence the magnets

From U18. If the task word attracts a package, name the refusal. Do not add a proverb.

### The checklist

Before you send a prompt, confirm:

1. There is a spec, or the prompt itself contains the only behavior and you accept that it will be the contract.
2. One behavior.
3. Allowed files, closed.
4. Neighbor cited.
5. One input → output.
6. Magnets fenced.
7. `npm test` and a stop rule.

A prompt that passes the checklist is allowed to be twenty lines. A prompt that fails item 2 is not repaired by adding "be thorough."

### What does not earn a place

| Sentence | Why it stays out |
|----------|------------------|
| "You are a staff engineer" | Does not name a file or an output |
| "Think step by step" | May change the transcript length. Does not close a decision |
| "Make it production-ready" | Opens every decision |
| "Surprise me" | Asks for inventions |
| Long apologies and urgency | The model does not schedule your demo |

If a team standard requires a persona sentence, leave it in `AGENTS.md` once, not in every prompt. Do not expect it to replace a fence.

### Fast means reversible

The fastest accurate loop on shelf is:

```text
spec with examples
→ checklist prompt
→ npm test
→ git diff
→ accept or restore
```

Restoring a twenty-line bad turn is fast. Untangling the U17 fixture is slow. Patterns exist so the first turn is small enough to judge.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| One behavior | One new observable outcome | Not "one sentence," which can hide three outcomes |
| Neighbor | Existing code the change should resemble | Not a suggestion to copy bugs |
| Magnet fence | A ban aimed at packages this wording attracts | Not a general insult to libraries |
| Proverb | Tone advice with no checkable effect | Feels like prompt craft |

## Worked example

**Bloated prompt:**

```text
You are an expert Node.js architect. Think step by step and make shelf
production-ready. Add overdue loans, a REST API, emails, and clean up
the code. Use best-in-class libraries. Be thorough. Sam is waiting.
```

Checklist:

1. No spec. Several behaviors.
2. Overdue, REST, email, and cleanup are four behaviors.
3. No files named.
4. No neighbor.
5. No input/output.
6. "Best-in-class libraries" opens the magnet instead of fencing it.
7. No test command. No stop.

**Rewritten as the first turn only** (list function, not the API, not email):

```text
Implement specs/overdue-loans.md. This turn is only overdueLoans(today).

Allowed files: src/loans.js, test/loans.test.js, CHANGELOG.md.
No other files.

Neighbor: activeLoans in src/loans.js. Plain function, .filter, no class.

Example: a loan due "2026-01-15" is returned by overdueLoans("2026-01-16")
and is not returned by overdueLoans("2026-01-15"). Loans with no due are absent.

No date library (no date-fns, dayjs, moment, luxon). Do not read the clock.
Do not edit src/server.js. Do not add email.

Verify: npm test
Stop: on failure, do not change existing expected error strings.
```

The API and the email are not "forgotten." They are other specs, and email conflicts with standing rules unless a human designs it. Leaving them out of this prompt is accuracy, not laziness.

## Common errors

### Citing a neighbor that you want replaced

**What you see:** "Follow `LoanService`" when `LoanService` was the bad generation you have not restored.

**What it means:** The neighbor is now the invention. The next turn will imitate it.

**What to do:** Restore first. Cite `activeLoans` and `borrow`, which are in the committed tree.

### One behavior described so loosely it is three

**What you see:** "Handle returns properly" as "one behavior."

**What it means:** Properly includes all-return, error paths, and maybe HTTP.

**What to do:** If you cannot write one input → one output, it is not yet one behavior. Return to the spec.

## Checkpoints

1. Name the four patterns.
2. Which pattern blocks the class in `src/services/`?
3. Why is "think step by step" not on the checklist?

## Practice exercises

### P1 — Checklist

Run the seven-item checklist against the bloated prompt in the worked example. Write pass or fail per item. You should fail most of them.

### P2 — Shrink

Take your U18 overdue prompt if you have it, or the fenced prompt in U18's README. Add a neighbor citation and one input/output if they are missing. Do not add a persona.

### P3 — Split

"Add `countForBorrower` and include the count in `GET /loans`." Write the first prompt only. One sentence on what the second prompt will target after the first turn is accepted.

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- No live model.
- Tests as the acceptance gate are the next phase, starting at U20. You already refer to `npm test`; you do not design the suite in depth here.

## Next unit

**U20 — Tests before you accept.**
