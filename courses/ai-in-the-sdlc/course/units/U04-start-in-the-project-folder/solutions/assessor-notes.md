# U04 Assessor notes

Assessor-only.

## Model answer sketch

**Q1:** The agent resolves paths from the current directory. Home: it may read personal files and write a policy file in the wrong place. Parent: it may edit a sibling project or create a new `src` beside the real projects. `src/`: `npm test` misses `package.json`, and new tests land in `src/test`.

**Q2:** Prediction ends with `shelf`. Output matches or the learner shows the command and a wrong folder they then corrected. Award 3/5 if they corrected it but the "prediction" was clearly written after the fact (past tense, no separate prediction line).

**Q3:** Session started in `D:\work`, not `D:\work\shelf`. Suspect: `D:\work\src\loans.js`, `D:\work\package.json`, and `node_modules` / lockfile from express. Stop. Do not prompt again there. Delete the accidental files if they are new and untracked, confirm with `git status` if `D:\work` is a repo, then `cd` into `D:\work\shelf` and prove it.

## Common weak submissions

- Says the agent should be started in `src` because "that is where the code is."
- Q3 recommends `npm install` to finish the express setup. That rewards the failure.
