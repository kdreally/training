# U16 Assessor notes

Assessor-only.

## Model prompt

Target: implement `specs/already-borrowed.md`.

Fences: only `src/loans.js`, `test/loans.test.js`, `CHANGELOG.md`. No server, no package.json, no new files, no dependencies.

Verify: `npm test`, include the summary.

Stop: on failure do not weaken assertions; on conflict, report; changelog only if tests pass.

## Smuggled decisions in the bad prompt

- REST route
- a status-code library
- rename `borrow` to `checkout`
- tests optional
- urgency and Sam (delete; not a contract)

## Q3

A rename is a spec of its own: every caller and test changes, so the file list is wide. It does not ride along with `already-borrowed`.

## Common weak submissions

- Prompt copies ten examples and then adds "also REST."
- Stop rule missing.
- "Don't bother with tests" retained as flexibility.

## Partial credit

A prompt that inlines three examples is fine if it does not contradict a spec and stays fenced. Do not require the file to be under 15 lines if the four parts are clean.
