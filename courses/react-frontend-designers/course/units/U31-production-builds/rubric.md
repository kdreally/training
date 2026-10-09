# U31 Rubric

Visible to learners. Total **20 points**.

| Criterion | Points | Must-have? | Evidence |
|-----------|--------|------------|----------|
| Correctly contrasts dev server vs production build (audience + purpose) | 3 | Yes | `answers.md` Q1 |
| Explains `dist/` as generated output not to be hand-edited | 2 | Yes | `answers.md` Q2 |
| Defines bundling, minification, and hashing correctly | 4 | Yes | `answers.md` Q3 |
| Pastes real build output and reads module count + gzip size accurately | 3 | Yes | `answers.md` Q4; `build-report.md` |
| Confirms `npm run preview` on the correct port (4173) | 2 | Yes | `answers.md` Q5; `build-report.md` |
| Decodes the "Could not resolve" error with a plausible fix | 3 | Yes | `answers.md` Q6 |
| Gives two honest reasons dev-server links are not for clients | 2 | No | `answers.md` Q7 |
| Re-built after a change and connects the hash change to content | 1 | No | `build-report.md` |

### Partial credit notes (assessors)

- Q3: award 1 point per correct definition; award the fourth only if hashing is tied to caching or content change, not "random string."
- Q4: award full only if the pasted output matches the learner's project (numbers differ from the lesson example). If they paste the lesson's example verbatim, award 0–1 and ask them to re-run.
- Q5: award 1/2 if they previewed but reports `5173` (they likely ran `npm run dev` by mistake).
- Q6: award full for any concrete fix (create the file, fix path, fix capitalization, add extension). Vague "check your files" gets 1/3.
- Q7: two distinct reasons (dev server is not hosted on a public address / not built for performance / runs only while terminal is open / may contain dev-only behavior). Overlapping reasons count once.

### Common weak submissions

- Copies the lesson's build output and numbers instead of running the build.
- Says `dist/` is "where my source code goes."
- Confuses minification with bundling (calls both "combining files").
- Reports a green build but never actually opened `localhost:4173`.
- Treats the size warning (chunk > 500 kB) as a fatal error and stops.
