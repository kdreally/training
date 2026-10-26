# U29 Rubric

Visible to learners. Total **20 points**.

| Criterion | Points | Must-have? | Evidence |
|-----------|--------|------------|----------|
| `AGENTS.md` is shelf policy and does not store the due-date ticket | 3 | Yes | `AGENTS.md` |
| Spec examples cover 2026-01-15, not-overdue without due, not overdue on the due date, overdue the next day, and one keep; arithmetic is shown | 5 | Yes | spec |
| Non-goals name date libraries, clock, and HTTP or network | 2 | Yes | spec |
| Two prompts are sequenced and fenced; turn 1 does not include overdue listing | 4 | Yes | prompts |
| Oracle tests match the examples and protect one old contract | 3 | Yes | `oracle.md` |
| Evaluation rows exist and are not fake passes; predicted failure maps four inventions to rows | 3 | Yes | evaluation + predicted-failure |

### Nice-to-have

| Criterion | Points | Evidence |
|-----------|--------|----------|
| Optional agent run: real diff and test output, sheet matches the diff, inventions were restored or correctly failed | +2 bonus, cap the total at 20 | `optional/` |

Bonus cannot lift a missing must-have above 15 if a must-have row scored 0. Record the bonus beside the score.

### Partial credit

- Due date off by one (January 14) with honest arithmetic showing the off-by-one reasoning: 3/5 on the spec row, and a note to fix the oracle before they use it. Silent wrong date with no arithmetic: 1/5.
- Single combined prompt: cap the prompt row at 1/4.
- Evaluation pre-filled with Pass and no optional run: cap that row at 0. The checklist forbids it.

### Must-have vs nice-to-have

The optional run is the only nice-to-have. Any must-have that scores 0 caps the grade at 15/20 before bonus.
