# U09 Rubric

Visible to learners. Total **20 points**.

| Criterion | Points | Must-have? | Evidence |
|-----------|--------|------------|----------|
| Explains npm's two jobs (packages + scripts) | 4 | Yes | `answers.md` Q1 |
| Explains dev server and hot reload clearly | 4 | Yes | `answers.md` Q2 |
| Correct `localhost` / port explanation with real port | 3 | Yes | `answers.md` Q3, screenshot |
| Correct command sequence and purposes | 3 | Yes | `answers.md` Q4, `commands.md` |
| Explains how to stop the dev server | 2 | Yes | `answers.md` Q6 |
| Error-reading practice decoded | 2 | No | `answers.md` Q7 |
| Distinguishes warnings from errors | 2 | No | `answers.md` Q8 |

The screenshot is the **evidence** that the project ran; without a working screenshot, cap the localhost/dev-server criteria at half unless the written description is unusually strong and consistent.

### Partial credit notes (assessors)

- Q1: award 3/4 if they name downloading packages and running scripts but describe npm as "the tool that makes React work"; award 1/4 for "it installs stuff" only.
- Q2: full requires the automatic-on-save idea. "It shows the website" earns 2/4.
- Q3: require a plausible port (5173 or a Vite-assigned alternative). A student who reports a different tool's port but explains it correctly gets full.
- Q4: order must be sensible: enter location → scaffold → `cd` into project → install → run. Missing `cd` into the project is a common, partly-correct answer; award 2/3.
- Q6: Ctrl + C accepted. Full if they also note the terminal returns to a prompt.
- Q7: any genuine wrong-folder error and correct decoding earns full.
- Q8: full for "warnings are advisory, not failures, and I left them alone." Award 0 if they ran `audit fix --force` and broke the project — then help them rebuild.

### Common weak submissions

- Screenshot shows the Vite page but URL bar cropped out (port unverifiable) — partial credit only.
- `commands.md` is a copy of the lesson with the student's name pasted in.
- Q2 confuses the dev server with the internet or with hosting.
- Q4 has commands in the wrong order.
- Claims success with no screenshot and no real terminal output.
