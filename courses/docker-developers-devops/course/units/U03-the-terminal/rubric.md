# U03 Rubric

Visible to learners. Total **24 points**.

| Criterion | Points | Must-have? | Evidence |
|-----------|--------|------------|----------|
| Transcript shows real output for all seven tasks, with commands included | 6 | Yes | `terminal-transcript.md` |
| `cd` task and the `pwd` proof both present | 3 | Yes | Tasks 4–5 |
| Terminal vs shell explained correctly | 3 | Yes | `answers.md` Q1 |
| Absolute vs relative paths explained with a real example | 3 | Yes | `answers.md` Q3 |
| `..` correctly explained, including the top-of-filesystem case | 2 | Yes | `answers.md` Q4 |
| `pwd`, `ls`/`dir`, `cd` described accurately in plain words | 3 | Yes | `answers.md` Q5 |
| One error decoded (looked-for vs found) | 2 | No | `answers.md` Q6 |
| All four broken commands fixed with sensible reasons | 2 | Yes | `broken-commands.md` |
| Files named correctly; checklist present and honest | 0 (gate) | Yes | folder / zip structure |

The last row is a **gate**, not points. Flag missing or misnamed files to the learner without reducing the total out of 24.

### Partial credit notes (assessors)

- Transcript: award full marks for a transcript that is clearly from the learner's own machine, even if their folder names differ greatly from any example. Deduct 1 point for each task whose output is missing; award 0 if the output is copied word-for-word from the lesson.
- A failed task that is **kept and explained** counts as complete (award full for that task). We reward honesty, not a perfect run.
- `answers.md` Q4: the top-of-filesystem case differs by system (bash stops at `/`; Windows at `C:\`). Any accurate description earns full marks.
- `broken-commands.md`: accepting any correct fix. `ls -1` in Command Prompt should become `dir` (or opening PowerShell). `cd ..Desktop` should become `cd ../Desktop` or `cd ..\Desktop` — accept either separator.
- Do not penalize imperfect English. Penalize invented output or pasted lesson text.

### Note on platform

Assess the learner on **their** platform. Do not mark Windows learners down for using `dir` or PowerShell learners down for `ls`. The criterion is correct behaviour, not one specific spelling.
