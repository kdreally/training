# U24 — Workflow: new feature

**Phase 6 — Life-cycle workflows**

## Where you are

You have the pieces: standing rules, spec, prompt, tests, diff review, restore. This unit puts them in order for a **new feature**, a behavior shelf does not have yet. Nothing here is a new theory. The new skill is not skipping a step because the feature feels small.

## What you will be able to do

- List the feature workflow in order and say what each step produces.
- Produce a minimal packet for one shelf feature: spec, prompt, and the assertions you will accept.
- Name the step where a new HTTP route would have to be introduced on purpose, if at all.

## What you need already

- **U19** through **U23**. Standing instructions from U10 are assumed to exist in the project.

## Time and energy

About **70–100 minutes**. You are writing a packet, not running an agent.

## Why this exists

Features fail in agents when the happy idea goes straight into a prompt. The workflow is the slow version that is faster by the end of the day: decide, fence, oracle, then ask. A feature is the easiest workflow to over-scope, because there is no existing code that "is" the feature, so the agent feels free to invent the shape. Your spec is that shape.

## Plain-language teaching

### The order

| Step | You produce | Done when |
|------|-------------|-----------|
| 1. Behavior | A sentence a test can pin | One input → one output exists |
| 2. Spec | `specs/<name>.md` with six headings, examples, non-goals | A reviewer could reject an extra route from the text |
| 3. Oracle | Tests written or quoted before acceptance | Assertions match the examples |
| 4. Prompt | Four parts plus the U19 patterns | One behavior, neighbor cited, magnets fenced |
| 5. Turn | Agent runs in the shelf root, or you implement by hand | Tree was clean before the turn |
| 6. Review | U21 order, you run `npm test` | Decision: accept or restore |
| 7. Changelog | One line, only if you accepted | Describes behavior |

Step 5 may be you, typing the function, if you have no agent. The packet is the same. The course grades the packet.

### Feature for this unit

`countForBorrower`, as specified in earlier units. It is new. It does not change `borrow`. It does not add a route. If a stakeholder later wants the count on `GET /loans`, that is a second feature with its own spec, because the files and the risks differ (`server.js` is now in the allow list).

### What you do not do

- Do not put the feature title into `AGENTS.md`.
- Do not accept a class, a package, or a deleted test "so the feature can land."
- Do not combine this feature with overdue dates "while we are in the file."

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Feature | A behavior the product does not have yet | Not "any agent session" |
| Packet | Spec + prompt + oracle notes | Not a zip of the whole repo |
| Second feature | A follow-up with its own files and examples | Not a section in the first prompt |

## Worked example

A complete packet is short. Abbreviated spec:

```markdown
# Spec: count-for-borrower
## Goal
Return how many active loans a borrower has.
## Non-goals
No HTTP. No new package. No case-folding. No new file.
## Behavior
countForBorrower("Asha") === 1 after borrow("b1","Asha").
countForBorrower("asha") === 0.
After return, the count is 0.
## Files
src/loans.js, test/loans.test.js, CHANGELOG.md only.
## Tests
Case-sensitive example above. Old suite still passes.
## Done
npm test fail 0. Diff stat matches Files.
```

Prompt: U19's `count.txt` shape. Oracle: the test in U20. Review: restore if `package.json` or `server.js` appears.

Changelog if accepted:

```markdown
- countForBorrower returns the number of active loans for an exact borrower name.
```

That is the whole workflow. The assignment asks you to do it for a different feature so you are not only copying.

## Common errors

### Route as a free extra

**What you see:** The feature ships with `GET /count` because "a feature needs an API."

**What it means:** Step 2's non-goals were empty, or step 6 ignored the file list.

**What to do:** Restore. If the route is actually wanted, write `specs/count-route.md` after the function is accepted. Allow `src/server.js`. Fence Express out. Keep `GET /loans` as it is.

### Skipping the oracle because you will "test manually"

**What you see:** You call the function once in a REPL, see `1`, and accept.

**What it means:** The case-folding bug and the regression in `no-copies` were never checked.

**What to do:** Put the examples in `node:test`. Manual checks are extra, not the oracle.

## Checkpoints

1. List the seven steps in order.
2. Why is a count on `GET /loans` a second feature?
3. When do you write the changelog line?

## Practice exercises

### P1 — Order

A teammate wants to prompt first and spec later "if the diff looks wrong." Write four sentences on which steps that swaps, and what invention that allows.

### P2 — Split

"Add counts and also return all loans for a borrower." Name the two specs. One sentence each on files.

### P3 — Changelog

Write the one line for `countForBorrower`. Write a process line you would reject.

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- You do not implement the feature in shelf's example tree.
- Change requests, bugs, debugging, and evaluation have their own units. They reuse this order with different emphasis.

## Next unit

**U25 — Workflow: change request.**
