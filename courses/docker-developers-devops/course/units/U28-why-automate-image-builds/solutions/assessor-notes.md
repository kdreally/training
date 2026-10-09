# U28 Assessor notes (assessors only)

Do not link this file from learner docs.

## Model answer sketch

**Q1:** e.g. forgotten steps → automated stages; uncommitted local code → runner builds only committed code; machine differences → clean runner + pinned versions; no record → the workflow file is the record; needs a person → runs on trigger.

**Q2:** Build makes the image; test proves it works and blocks push on failure; push publishes. Order matters because test must be a gate: a failed test must prevent the bad image from reaching the registry.

**Q3:** "Every time someone changes the shared code, a machine automatically rebuilds it and runs the tests, so problems are caught within minutes."

**Q4:** No — reproducibility also requires a clean/consistent environment, all inputs committed, and deterministic dependency resolution (lockfiles), not just pinned direct versions.

**Q5:** Secrets store keeps the token out of version control and out of logs. If it leaks, rotate the token immediately and remove it from history, since anyone who read the repo may have copied it.

**Q6:** The laptop had `pytest` installed on the host; the image (and the clean runner) did not. Fix: install test dependencies inside the image or a dedicated test stage.

## pipeline.md expectations

Stages in order build → test → push; realistic commands; a secret named (e.g. `DOCKERHUB_TOKEN`); on test failure, stop and do not push.

## Common weak submissions

- Push before test.
- "CI = Continuous Improvement" or other expansion errors (it is *continuous integration*).
- Saying "put the password in the YAML, it is private."

## Grading discipline

Be strict on stage order and secrets. Both are safety-critical habits that recur in U29 and U33.
