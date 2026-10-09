# U32 Assessor notes (solutions — do not link from learner README)

## Model answer sketch

**Q1:** The build produces fixed files (`index.html`, hashed `.js`/`.css`) that are identical for every visitor; no server-side database generates the page. The host only stores and delivers those files; React then runs in the visitor's browser.

**Q2:** GitHub Pages (lives with the code; course default), Netlify (drag-and-drop deploy), Vercel (auto-rebuild from a repo). All free at this scale. Course uses GitHub Pages to keep code and site together and to teach the `base` gotcha.

**Q3:** Project site = `https://<username>.github.io/<repo-name>/` (sub-path). User site = `https://<username>.github.io/` (root), only when the repo is named `<username>.github.io`.

**Q4:** `base` is the sub-path prefix Vite writes into every asset reference. A project site lives under `/<repo-name>/`, so `base` must be `'/<repo-name>/'`; the default `'/'` points at the domain root where no such files exist.

**Q5:** A URL of the form `https://<username>.github.io/<repo>/` that loads the styled page.

**Q6:** `index-5b6e9a0f.js` failed with 404. The browser requested it at `https://samdesign.github.io/assets/...` (domain root) but the file is at `https://samdesign.github.io/<repo>/assets/...`. Cause: `base` left at default. Fix: set `base: '/<repo>/'`, rebuild, re-upload `dist/` contents, hard refresh.

**Q7:** e.g. (1) nested `dist` folder — reveals `index.html` is not at repo root; (2) Pages not enabled — reveals no publish target set; (3) private repo — reveals Pages unavailable on free plan; (4) wrong branch/folder — reveals Pages reads the wrong directory.

## Expected artifacts

- Public repo with `index.html` and `assets/` at root.
- `vite.config.js` containing `base: '/<repo>/'` (or `/` for a user site).
- Pages enabled: `main` / `/ (root)`.
- Live URL loading styled content.

## Common wrong-but-thoughtful answers (award partial credit)

- Confuses *deploy* with *build*: "deploy runs npm run build." Deploy is publishing; the build is a separate prior step. Explain and award Q1/Q4 points if the rest is sound.
- Believes the host runs React. Clarify: React executes in the browser; the host is a file server. Award Q1 point if they correctly say files are static.
- Sets `base: 'my-page'` (no slashes). This is a real near-miss; award Q4 partial (they saw the need for the repo name, missed the slash format).

## Grading in 3 minutes

1. Click the live URL in Q5. If styled and loads, mark the must-have.
2. Read Q4 for the sub-path idea.
3. Check Q6 names both the file and the wrong location.
4. Skim `deploy-log.md` for a real repo name and `base` value.
5. Confirm `checklist.md` present and honest.
