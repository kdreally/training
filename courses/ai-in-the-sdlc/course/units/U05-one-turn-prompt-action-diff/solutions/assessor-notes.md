# U05 Assessor notes

Assessor-only.

## Model answer sketch

**Q1:** A turn is one prompt, the reads/edits/commands it caused, and the human's accept or restore based on the diff. A session can contain many turns. The agent's "done" is a report.

**Q2:** Clean tree, prompt as given, actions as given, tests 7 pass, diff includes `server.js` which was not requested, report admits an extra API convenience. Restore `server.js` at minimum; restoring all is the cautious full-credit answer. Accepting everything because tests passed misses the lesson.

**Q3:** The pre-existing hand edit and the agent's edit share `server.js` in one diff. You cannot restore the file without losing your hand work. Next time, commit or set aside hand edits so the tree is clean.

**Q4:** Untouched shelf has 6 tests, all passing. Output similar to `# tests 6` / `# pass 6` / `# fail 0`.

## Common weak submissions

- Accepts the turn because "7 pass" is bigger than 6.
- Q3 says a dirty tree is fine if you trust the agent.
