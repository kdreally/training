# U12 Assessor notes

Assessor-only.

## Q1

Policy lasts and is `AGENTS.md`. A spec is one change's contract, written first. A prompt points the agent at the spec for one turn. Code is an implementation that either meets the examples or does not.

## Q2 examples

What overdue means (due date before a given today). Where the due date comes from. Date format. Whether returned loans can be overdue. Function name vs HTTP route. Which files. Whether a date library is allowed. What the empty case returns. Time zones.

Any five concrete ones pass.

## Q3

A spec copied from the diff cannot fail. Evaluation needs an independent expected result. If the spec changes after a surprise, that edit should be visible and justified.

## Q4

`borrower-required`. Test name is about a blank borrower. The call uses `"  "` or similar.

## Common weak submissions

- Spec defined as "a prompt you save."
- Open decisions that are only "make it good" and "handle edge cases" with no nouns.
