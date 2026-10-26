# U29 Assignment — Due dates, as a packet

Submit `U29-YourName`.

You are specifying shelf due dates as described in the U29 README. You do not have to modify `course/examples/shelf` in the course repo.

## Files

### 1. `AGENTS.md`

The standing file you would load. It must match shelf (paths, no dependencies, no database, tests, changelog, stop on conflict). It must not contain the due-date task as a standing order.

### 2. `specs/due-dates.md`

Six headings, plus a short "Turn plan" that sequences two turns. Examples must include:

- `2026-01-01` → due `2026-01-15`, with your arithmetic in one line,
- a loan with no `due` is not overdue,
- due date equal to `today` is not overdue,
- the next day is overdue,
- one keep: `no-copies` or two-argument `borrow` still succeeds.

Non-goals must name date libraries, the clock, HTTP, and email or any network.

### 3. `prompts/turn-1.txt` and `prompts/turn-2.txt`

Turn 1 does not implement `overdueLoans`. Turn 2 does not change the due-date rule and does not add a route. Both have fences, a neighbor or an example, `npm test`, and a stop rule.

### 4. `oracle.md`

Tests for turn 1 and turn 2, written out as `node:test` blocks, plus one existing-contract assertion you will not weaken.

### 5. `evaluation.md`

Rows for the examples and non-goals. Evidence column says where you will look. Do not mark pass unless you actually ran an agent and checked. If you did not run one, the result column is `not run` and the overall line says the packet is ready to run, not that the feature passed.

### 6. `predicted-failure.md`

Describe a plausible bad generation (at least four inventions: a date library, a clock, a new route or file, and a weakened or missing keep). Map each to the evaluation row that would fail.

### 7. `answers.md`

In your own words: why the rules file, the spec, the two prompts, the tests, and the sheet are five different artifacts. One paragraph each.

### 8. `checklist.md`

```markdown
- [ ] I computed 2026-01-01 plus 14 days myself.
- [ ] Turn 2 is a separate prompt.
- [ ] I did not mark the feature passed without running it.
- [ ] I read the rubric.
```

### Optional `optional/`

If you ran a local agent on a copy of shelf: `diff.txt` and `test-output.txt`, and a filled evaluation with real pass/fail. This can add credit. It cannot replace files 1–7.

## Definition of done

A teammate could execute the packet without asking you what overdue means, and could reject `date-fns` without asking you whether you like that library.

## Submission format

```text
U29-YourName/
  AGENTS.md
  specs/due-dates.md
  prompts/turn-1.txt
  prompts/turn-2.txt
  oracle.md
  evaluation.md
  predicted-failure.md
  answers.md
  checklist.md
  optional/          (only if you ran an agent)
```
