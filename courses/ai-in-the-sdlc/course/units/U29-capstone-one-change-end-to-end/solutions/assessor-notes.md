# U29 Assessor notes

Assessor-only. Do not link from the learner README.

## What a strong packet contains

**AGENTS.md:** the U10 shape. Due dates are absent. Paths are `src/loans.js`, `test/`, `npm test`. No database. No surprise packages. Changelog is one accepted behavior line.

**Spec:**

- Two-argument `borrow` unchanged, no `due`.
- Third argument `today` sets `due`.
- 2026-01-01 + 14 days = 2026-01-15. Arithmetic: the date fourteen days later is the 15th.
- `overdueLoans("2026-01-15")` excludes that loan; the 16th includes it.
- Ben without `today` is absent from a later overdue query.
- Returned loans excluded if they thought of it. Not required, but good.
- Non-goals: date-fns/dayjs/moment/luxon, `Date.now`, `new Date()` as the source of today, no Express, no email.
- Turn plan: turn 1 stores `due`; turn 2 adds `overdueLoans` after accept.

**Prompts:** match U19. Turn 2's allow list is still the three files. It should say the due rule already exists; do not reinterpret "14 days."

**Oracle:** `node:test` blocks for the dates above, plus `no-copies` or a two-argument borrow that still returns `ok: true`. `resetLoans()` used.

**Evaluation:** result column `not run` unless `optional/` exists. Evidence points at `git diff --stat`, `package.json`, test names.

**Predicted failure:** import from `date-fns`, `new Date()`, `GET /overdue` or `src/dates.js`, deleted `no-copies` test or rewritten `borrow` that requires `today`. Each tied to a row.

**Answers:** five artifacts, five jobs. Policy lasts. Spec is the contract. Prompts are per turn. Tests are the oracle. The sheet is the decision record.

## Optional run

Award +2 only if the diff is real and the sheet agrees with it. A green run that added `date-fns` and a sheet of all passes gets **0 bonus** and a conversation. A failed run they restored, with the sheet showing fail, gets the bonus. The skill is judgment.

If they edited the course's shared `course/examples/shelf` and left it dirty, ask them to restore it. The capstone does not require changing the shared example.

## Common weak submissions

- One prompt that also "modernizes the API."
- `AGENTS.md` includes "implement due dates with dayjs."
- All evaluation rows Pass, no optional output.
- January 14 as the due date with no work shown.
- Turn 2 sent conceptually as "do whatever is left."

## Partial credit

A packet that drops overdue listing and only specifies `due` can still pass if they narrow the README's change on purpose and the prompts stay consistent. Score spec at 4/5 if the "next day overdue" example is then absent. Do not fail them for choosing a smaller capstone **if** they say they narrowed it. The assignment asks for both. Prefer the full scope. If they narrowed without saying so, and overdue is missing, spec row 3/5.

## Red flags

- A real password or connection string in `AGENTS.md`. Stop grading the cleverness. Tell them to rotate it.
- Live agent pointed at a production database. The packet should have forbidden it. If the diff shows a connection, overall judgment is a fail regardless of tests.
