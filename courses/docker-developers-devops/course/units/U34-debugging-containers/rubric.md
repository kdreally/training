# U34 Rubric

Visible to learners. Total **20 points**.

| Criterion | Points | Must-have? | Evidence |
|-----------|--------|------------|----------|
| Scenario A diagnosed (exit 127, command not found) with fix | 3 | Yes | `diagnosis.md` |
| Scenario B diagnosed (host port busy) with fix | 3 | Yes | `diagnosis.md` |
| Scenario C diagnosed (OOM, exit 137) with fix | 3 | Yes | `diagnosis.md` |
| Scenario D diagnosed (bound to 127.0.0.1 inside container) with fix | 3 | Yes | `diagnosis.md` |
| Five-step method reproduced in sensible order | 3 | Yes | `method.md` Q1 |
| Correct explanation of `ps -a` vs `ps` | 2 | Yes | `method.md` Q2 |
| Scenario D explanation names the `127.0.0.1` line | 2 | Yes | `method.md` Q4 |
| Practice log shows a real container and real output | 1 | No | `practice-log.txt` |

### Partial credit notes (assessors)

- Each scenario: award cause 2 points and fix 1 point. A correct exit-code reading with a vague cause earns 1.5.
- Scenario A: full credit requires recognising `python` is missing from the image, not merely "it exited."
- Scenario C: full credit requires connecting exit `137`/`OOMKilled=true` to the `--memory 20m` limit.
- Scenario D: the decisive evidence is `Running on http://127.0.0.1:8000`; the fix is binding to `0.0.0.0`. Award 0 for the scenario if the answer is only "restart it."
- Method Q1: five steps, order sensible. `ps -a` → logs → exit code/inspect → (exec if running) → fix and observe. Deduct 1 if only two or three steps are present.
- Practice log: award the point only if it contains at least three distinct diagnostic commands with output.
