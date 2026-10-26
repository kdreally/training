# U18 Rubric

Visible to learners. Total **20 points**.

| Criterion | Points | Must-have? | Evidence |
|-----------|--------|------------|----------|
| Closed allow list uses real shelf paths and excludes the server | 5 | Yes | prompt |
| Date libraries named; clock banned; generic no-new-packages present | 5 | Yes | prompt |
| Two existing error strings protected; verify and stop present | 4 | Yes | prompt |
| Explains why a server-only deny misses a new file | 3 | Yes | `answers.md` Q1 |
| Replaces a bad server ban when the bug is in the server, with a behavior fence | 3 | Yes | `answers.md` Q2 |

### Partial credit

- Allow list: 3/5 if paths are right but "no other files" is missing.
- Q2: 1/3 if they allow `server.js` and forget to say `GET /loans` must keep working.

### Must-have vs nice-to-have

All rows must-have. Q3 in the assignment is extra and unscored except as a tie-break in your notes. A miss on a scored row caps at 15/20.
