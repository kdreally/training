# U08 Assessor notes

Assessor-only.

## Model AGENTS.md

Should contain, in some wording:

- Shelf, `src/loans.js`, `npm test`, no dependencies.
- Do not connect to a database server.
- Edit only files the task names.
- Match `{ ok, error }` results.
- Changelog line under Unreleased for an accepted behavior change.

Must not contain: countForBorrower as an order, lodash as a requirement, Sam's overdue book, the poem, "be smart and clean."

## tasks.md

- Add countForBorrower — task, needs a spec.
- Sam / b2 overdue — task or fixture, needs a spec, not a hardcode in policy.
- Poem — dropped, not a software rule.
- "Be smart and clean" — dropped, not checkable.
- Lodash line — dropped or moved with a warning. It is phrased as policy but it contradicts the no-dependency fact and would rewrite every array function.

## answers

Lasting-question: still true and still wanted on the next task?

Lodash: grants a dependency and pressures the agent to rewrite existing `.filter` calls on unrelated turns.

Stale countForBorrower: a later typo-fix turn reopens the feature and "improves" it.

## Partial credit

A standing file that also says "stop and ask before any new dependency" is better than the dump, not a defect.

## Common weak submissions

- All ten lines copied into `AGENTS.md` under nicer headings.
- Poem kept as "team culture."
