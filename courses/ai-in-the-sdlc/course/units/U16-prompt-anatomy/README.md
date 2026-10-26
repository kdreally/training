# U16 — Prompt anatomy

**Phase 4 — Prompts**

## Where you are

You can write a spec. A **prompt** is the short message that starts one turn. It points at the spec, repeats the fences that are easy to miss, and says how to stop. It is not a second copy of the spec, and it is not a pep talk.

## What you will be able to do

- Name the parts of a prompt: target, fences, verify, stop.
- Write a prompt that implements a spec without restating every example.
- Spot a prompt that smuggles in a new decision the spec did not make.

## What you need already

- **U05** (a turn), **U13** (spec shape).

## Time and energy

About **45–70 minutes**.

## Why this exists

The spec is the contract. The prompt is the hand-off. If the hand-off restates the contract in different words, the agent follows whichever paragraph it attends to. If the hand-off says only "do the spec," some tools do that well, and some wander. A small, stable anatomy keeps the hand-off shorter than the spec and still hard to misunderstand.

## Plain-language teaching

### The four parts

```text
1. Target    — which spec, or which single behavior if the spec is tiny
2. Fences    — files that may change, files that must not, dependency ban
3. Verify    — the command to run (npm test)
4. Stop       — what to do if a test fails or the spec conflicts with the repo
```

That is the whole prompt. Motivation ("this is important to Sam") does not help the diff. Apologies ("sorry for the bother") do not help the diff. A novel about the library's history does not help the diff.

### A prompt that matches the count spec

Assume `specs/count-for-borrower.md` is the spec from U13/U14, and `AGENTS.md` is loaded.

```text
Implement specs/count-for-borrower.md.

Fences:
- You may edit only src/loans.js, test/loans.test.js, and CHANGELOG.md.
- Do not edit src/server.js, src/books.js, or package.json.
- Do not add files. Do not add dependencies.

Verify:
- Run npm test.
- Paste the pass/fail summary.

Stop:
- If a test fails, stop. Do not delete or edit the failing assertion to force a pass.
- If the spec conflicts with the code, stop and describe the conflict.
- One changelog line for the behavior, only if tests pass.
```

The examples stay in the spec. The prompt does not invent a new one ("also treat empty string as zero") on the way. That would be a second contract.

### What you repeat, and why

You repeat the file list even though the spec has it. Models drop a section. A fence in the last thing you typed is cheap insurance. You do **not** repeat by rephrasing. Copy the file names. Rephrasing "do not edit the server" into "feel free to touch HTTP if needed for completeness" is a contradiction you just wrote.

You usually do not repeat `AGENTS.md` line by line. You may add one reminder when the task word is a known trap: "overdue" → "no date library, even though the task mentions dates." U18 is about those fences in depth. The anatomy reserves a place for them.

### One turn, one spec

A prompt that says "implement `specs/a.md` and `specs/b.md`" is two turns. If both land in one diff, a failure in B makes you revert A as well, or keep a mixed tree. U05 already argued this. The anatomy enforces it: one target.

### The prompt is not where new product decisions go

If you discover a missing decision while writing the prompt, put it in the spec first, then point at the spec. The prompt is a bad notebook. It scrolls away. The spec remains for evaluation.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Prompt | The message that starts one turn | Not the spec |
| Target | The spec or the single behavior to implement | Not a list of hopes |
| Fence | Files and bans for this turn | Not a personality request ("be careful") |
| Verify | The command whose output is evidence | Not "make sure it works" |
| Stop rule | When to halt instead of pushing through | Not "give up easily" |

## Worked example

**Spec says:** error string `already-borrowed`. No HTTP.

**Prompt, wrong:**

```text
Implement specs/already-borrowed.md.
Use a nice REST endpoint POST /already-borrowed and a clear message
"You already borrowed this" for the UI. Be thorough and improve names.
```

New decisions snuck in: a route, a different error string, permission to rename. The spec was overruled by the prompt. The agent cannot be "wrong" if it follows you.

**Prompt, right:** the four parts, target `specs/already-borrowed.md`, files `src/loans.js`, `test/loans.test.js`, `CHANGELOG.md`, verify `npm test`, stop on failure. No new error string.

## Common errors

### The prompt that is longer than the spec

**What you see:** The spec is ten lines and the prompt is a page, with new edge cases.

**What it means:** The prompt became the spec, and the spec is now stale. Evaluation against the spec will fight evaluation against the prompt.

**What to do:** Move the new cases into the spec. Shrink the prompt back to target, fences, verify, stop.

### No stop rule

**What you see:** The agent "fixes" a failing test by changing the expected `no-copies` to `already-borrowed`.

**What it means:** A green summary was easier than a report of failure.

**What to do:** The stop rule says the assertion is not the thing to edit. U20 and U26 come back to this. Put the sentence in the prompt now so the habit starts.

## Checkpoints

1. Name the four parts of a prompt.
2. Why is rephrasing a fence dangerous?
3. Where do you write a decision you discover while prompting?

## Practice exercises

### P1 — Label

Label each sentence target, fence, verify, stop, or delete (because it does not belong):

1. "Implement specs/return-all.md."
2. "Sam will be happy if this is fast."
3. "Run npm test."
4. "Do not edit package.json."
5. "If tests fail, stop and report."
6. "Use lodash if the loop looks ugly."

### P2 — Write

Write a four-part prompt for `specs/count-for-borrower.md`. Keep it under 20 lines.

### P3 — Smuggle hunt

```text
Implement the count spec. Also capitalize borrower names so the UI looks better.
```

What decision was smuggled? Which file would it touch? What should the prompt say instead?

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- The gallery of bad generations is U17.
- You do not run an agent. You write the message you would send.

## Next unit

**U17 — What ambiguous prompts produce.**
