# U08 Assessor notes

Assessor-only. Do not link from learner materials.

## Model answer sketch

**Q1:** Node.js is a program that runs JavaScript outside the browser. The build tool that turns React into plain HTML/CSS/JS runs on Node. It is the workshop, never the finished page.

**Q2:** Terminal = the text window/app. Shell = the program inside it that reads commands (PowerShell on Windows, bash on macOS/Linux).

**Q3:** `Get-ChildItem` (Windows) or `ls` (macOS/Linux); real folder names required.

**Q4:** e.g. `cd Documents` then `cd ..`. Successful `cd` prints nothing; only the prompt changes.

**Q5:** e.g. `v20.11.1` / `10.2.4`; major = 20, which is ≥ 18.

**Q6:** Any genuine error-reading. Example: typed `lss`, terminal said `The term 'lss' is not recognized`; it names the unknown word, meaning that command does not exist.

**Q7:** A terminal loads its list of known programs (PATH) when it starts; programs installed later are invisible until a new terminal starts.

**Q8:** PATH is the ordered list of folders the shell searches for a command name. If Node's folder is missing or the wrong Node comes first, `node` is "not recognized."

## Expected version ranges (as of 2026)

- Node LTS: 20.x or 22.x (18+ acceptable). npm: 9.x–10.x. Accept anything ≥ 18 and note it.

## Common weak submissions

- Claims install succeeded but shows no real version output.
- Q2 answer collapses terminal and shell without acknowledging any difference.
- Q4 invents prompt text like "Entering Documents…" (terminals do not do this).
- Q6 says only "there was an error" without quoting or decoding it.
- Blames "the computer" for a `not recognized` error with no mention of a fresh terminal.

## Grading the blocked learner

If the learner cannot install Node, that is a legitimate outcome (managed/locked-down machine, network restriction, corporate policy). Grade the honesty and completeness of `install-log.md` and `answers.md` under the same criteria. A learner who documents the exact error, what they tried, and it is consistent with a real failure has demonstrated the unit's real outcome: using a terminal and reading errors. Flag it for trainer follow-up, not as a failure.
