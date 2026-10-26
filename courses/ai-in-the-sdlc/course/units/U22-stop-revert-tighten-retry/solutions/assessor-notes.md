# U22 Assessor notes

Assessor-only.

## Stop

Bad message they should refuse: "Remove express but keep LoanService" or "put the tests back and leave the rest." Reason: dirty tree, invention becomes the neighbor.

## Revert

`git restore src/server.js src/loans.js package.json test/loans.test.js CHANGELOG.md` as applicable. The fixture deleted tests, so restoring `test/loans.test.js` is essential. Delete `src/services/LoanService.js` and `test/count.test.js` as untracked or unwanted. Do not `git push --force`. Do not `git clean -fd` as the primary plan.

## Tighten

No express, no lodash, no date-fns, no new files, no case-folding, do not delete tests, no `src/services`, keep `node:http`. Any five concrete ones.

## Ceiling

If the second try deletes tests, stop. Check that `AGENTS.md` is loaded. Do not try a third rewrite. Fix the prompt's stop rule and the spec, or review the tool setup.

## Answers

Sculpting leaves leftovers and stacks hunks. A secret in the transcript: stop, do not retry in that session, remove the secret from any file, rotate if real.

## Common weak submissions

- `git reset --hard` with no path review, especially if they had other work. Note the risk; deduct on the revert row if they present it as the only safe command.
- Tighten section is a complaint without fences.

## Partial credit

Forgetting `package.json` in the restore list is a real gap. Mention it in feedback even if the rest is strong. Cap revert at 4/6.
