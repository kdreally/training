# U24 Assessor notes

Assessor-only.

## Spec

`hasActiveLoan("b1","Asha")` is true after borrow, false after return, false for Ben while Asha holds it. `b2` / two copies can appear but are not required. Non-goals: no route, no package, no class, do not change borrow's errors.

## Prompt

Neighbor `activeLoans` or `borrow`. Files: loans.js, test, changelog. `npm test`. Stop rather than edit old assertions.

## Oracle

The three cases as assertions. Plus `borrow("b2","Asha")` then Ben → `no-copies`, or blank borrower.

## Steps

Behavior, spec, oracle, prompt, turn, review, changelog. Order matters. Changelog last and only on accept.

## Q2

File fence or review step failed. Restore. A route is a new spec. Do not extend in the dirty tree.

## Common weak submissions

- `hasActiveLoan` returns a loan object instead of boolean, with no example either way. If they choose object and example it, accept the choice. The assignment said `true`/`false`. If they drift, deduct on the spec row.
- Seven steps replaced by "ask the agent, then see."

## Partial credit

Including a changelog line inside the spec's Done section is good, not required.
