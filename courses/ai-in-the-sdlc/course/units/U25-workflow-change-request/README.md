# U25 — Workflow: change request

**Phase 6 — Life-cycle workflows**

## Where you are

A feature adds behavior. A **change request** alters behavior that already exists, while other behavior must stay. Agents are dangerous here because "update borrow" sounds like permission to rewrite `borrow`. This unit is the same packet as U24, plus an explicit **keep** list.

## What you will be able to do

- State what stays, what changes, and which existing tests must still pass.
- Write a spec whose examples include both the new result and a surviving old result.
- Refuse a rewrite that "simplifies" the function by dropping an old error.

## What you need already

- **U24 — Workflow: new feature.**

## Time and energy

About **60–90 minutes**.

## Why this exists

Change requests arrive as "can you just tweak borrow so the same person can't take two." The tweak is `already-borrowed`. The part people forget to say is that `no-copies` still happens for two different people and one copy. An agent that replaces the copies check with a duplicate check will look done and break the library. The keep list is the change-request's extra artifact.

## Plain-language teaching

### What changes vs what stays

Write two lists before the prompt.

**Changes**

- A second active loan of the same book by the same borrower returns `{ ok: false, error: "already-borrowed" }`.

**Stays**

- `unknown-book`, `borrower-required`, and `no-copies` keep those strings.
- Two different borrowers may hold `b1` (two copies).
- `b2` still has one copy: Asha then Ben is `no-copies`, not `already-borrowed`.
- `returnLoan` is untouched.
- HTTP is untouched.

If you cannot write the stays list, you are not ready to prompt. You would be asking the agent to decide which old behavior is expendable.

### Order of checks is now part of the spec

When Asha already holds `b2` and borrows it again, both "no copies left" and "already borrowed" could apply. Pick one and example it.

```text
borrow("b2", "Asha") then borrow("b2", "Asha")
→ { ok: false, error: "already-borrowed" }
```

A thoughtful spec says why: the same borrower should hear that they already have it, even when they also happen to hold the last copy. If you do not say so, the agent picks, and your test canonizes the pick (U12).

### The packet

Same seven steps as a feature. The spec's Behavior section leads with stays, then changes. The prompt repeats one stay as a behavior fence:

```text
Do not change the assertion for no-copies on b2 between Asha and Ben.
Asha's second borrow of b2 is already-borrowed, not a rewrite of no-copies.
```

### What a bad change looks like

The agent deletes the copies check and says duplicates are the only rule. Ben can no longer be rejected when Asha holds the only copy of `b2`, unless Ben is Asha. The old test fails. A weakened suite updates the old test to `ok: true`. Review step 3 (tests) catches it. The keep list in the spec gives you the words for the reject.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Change request | Alter an existing behavior | Not a green-field function |
| Keep list | Old results that must survive | Not "don't break anything" |
| Conflict case | An input that matches two rules | The spec must pick a winner |

## Worked example

Keep list and change list above are the example. Oracle sketch:

```javascript
test("same borrower cannot hold two active loans of b1", () => {
  resetLoans();
  borrow("b1", "Asha");
  assert.deepEqual(borrow("b1", "Asha"), { ok: false, error: "already-borrowed" });
});

test("other borrower can take the second copy of b1", () => {
  resetLoans();
  borrow("b1", "Asha");
  assert.equal(borrow("b1", "Ben").ok, true);
});

test("single copy still yields no-copies for a different borrower", () => {
  resetLoans();
  borrow("b2", "Asha");
  assert.deepEqual(borrow("b2", "Ben"), { ok: false, error: "no-copies" });
});
```

All three ship in the change turn. The third is the keep. The prompt says not to delete it.

## Common errors

### "Simplify" as a goal

**What you see:** The prompt says "simplify borrow while adding the new rule."

**What it means:** Drive-by consistency (U23) was invited. Throws and renamed errors will follow.

**What to do:** Remove "simplify." Add the keep list.

### Forgetting the conflict case

**What you see:** Tests cover Asha twice on `b1` only. `b2` is never mentioned. The copies check is gone and no test fails, if the old `no-copies` test was edited.

**What it means:** The stay was not an example.

**What to do:** Put the stay in the spec as an example, not as the word "stays."

## Checkpoints

1. What does a keep list contain?
2. Why must Asha's second borrow of `b2` be specified separately from Ben's borrow of `b2`?
3. Which review step catches a weakened `no-copies` test?

## Practice exercises

### P1 — Lists

Write the changes list and the stays list for: "trim is not enough; reject borrower names that are shorter than 2 characters with `borrower-too-short`." Decide whether `"A"` is the new error and `" A "` is still `borrower-required` because trim happens first. That decision is the conflict case.

### P2 — Fence line

Write one prompt line that protects `no-copies`.

### P3 — Bad generation

The agent returns `already-borrowed` for Ben borrowing `b2` while Asha holds it. Which example did it fail? Is the fix a new rule or a restore-and-retry?

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- You do not migrate a database. Shelf has none.
- Bug-sized fixes are U26. Use this unit when the product owner wants a new result from an old function.

## Next unit

**U26 — Workflow: bug fix.**
