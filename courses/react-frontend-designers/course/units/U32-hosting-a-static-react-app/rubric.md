# U32 Rubric

Visible to learners. Total **20 points**.

| Criterion | Points | Must-have? | Evidence |
|-----------|--------|------------|----------|
| Explains static site + host's role correctly | 3 | Yes | `answers.md` Q1 |
| Names three free hosts with a plausible strength each | 2 | Yes | `answers.md` Q2 |
| Distinguishes project vs user site with address shapes | 2 | Yes | `answers.md` Q3 |
| Explains `base` correctly (sub-path prefix for assets) | 4 | Yes | `answers.md` Q4; `deploy-log.md` |
| Provides a working live URL on the correct pattern | 3 | Yes | `answers.md` Q5 |
| Decodes the 404 line, naming the file and the wrong location | 3 | Yes | `answers.md` Q6 |
| Lists two distinct deploy-404 causes with what each reveals | 2 | No | `answers.md` Q7 |
| Repo/Pages settings recorded accurately | 1 | No | `deploy-log.md` |

### Partial credit notes (assessors)

- Q2: full only if all three are free options from the unit. Naming a paid host loses the point.
- Q3: award 1/2 if they describe project vs user sites but muddle the address shapes.
- Q4: award full only if `base` is tied to *asset URLs under a sub-path*. "It fixes the page" without the sub-path idea gets 1–2.
- Q5: award 3 only if the URL matches `https://<username>.github.io/<repo>/` (or a user-site root) and loads styled content. A localhost URL is 0. A URL that 404s or is blank gets 1 and a request to fix before marking the "must-have" satisfied.
- Q6: must contain: file = built `.js`; browser looked at domain root instead of `/<repo>/`; fix = set `base`, rebuild, re-upload, hard refresh.
- Q7: two distinct causes from: nested `dist` folder, Pages not enabled, wrong branch/folder, private repo, not finished publishing. Overlapping causes count once.

### Common weak submissions

- Reports `http://localhost:4173/` as the deployed URL (that is U31's preview).
- Copies the lesson's repo name or URL instead of their own.
- Says `base` is "the folder where my project is."
- Explains the 404 as "GitHub is broken."
- Enables Pages but never rebuilds after adding `base`, then reports a blank page without a diagnosis.
- Uploads the `dist` folder as a folder, leaving `index.html` nested.
