# U31 Assessor notes (solutions — do not link from learner README)

## Model answer sketch

**Q1:** Dev server (`npm run dev`) is for the builder: live reload, readable errors, no compression, runs only while the terminal is open. Production build (`npm run build`) is for visitors: bundled, minified, hashed, optimized, intended to be served by a host.

**Q2:** `dist/` is the generated export containing `index.html`, `assets/*.js`, and usually `assets/*.css`. It is regenerated on every build, so hand edits are overwritten.

**Q3:**
- Bundling: combining many source files into a few files to reduce downloads.
- Minification: removing spaces, comments, and long names to shrink files without changing behavior.
- Content hashing: adding a fingerprint (e.g. `index-5b6e9a0f.js`) that changes only when the file's content changes, so browsers can cache safely.

**Q4:** Any real run output. Module count and gzip size read from the pasted text. Accept "approximately."

**Q5:** `http://localhost:4173/`. A correct one-sentence confirmation.

**Q6:** Vite read `src/App.jsx` and could not find the module at `./components/Card`. Fixes: create the file, correct the path, match capitalization/extensions.

**Q7:** (1) The dev page is not published at a public URL — it exists only on the learner's machine while the server runs. (2) It is not optimized for delivery (larger, no minification, dev-only behavior) and can break or slow for visitors. Either two distinct reasons earns full.

## Expected artifacts

- `dist/index.html`, `dist/assets/<name>-<hash>.js`, usually `dist/assets/<name>-<hash>.css`.
- Terminal preview line naming port 4173.

## Common wrong-but-thoughtful answers (award partial credit)

- Calls minification "compression." Minification removes characters; gzip is the compression step the report also shows. This is a reasonable confusion — note the distinction, award Q3 point if hashing/minification otherwise sound.
- Believes `dist/` duplicates the whole project including `node_modules/`. Correct them: only built output is copied.
- Uses the lesson's example numbers because they ran the build but not in their own project. Ask them to re-run and resubmit Q4.

## Grading in 3 minutes

1. Open `answers.md`. Check Q1–Q3 for correct concepts (not phrasing).
2. Confirm pasted build output is real (numbers differ from lesson).
3. Confirm preview port is 4173.
4. Read Q6 fix; award by concreteness.
5. Skim `build-report.md`; verify `dist/` file list is plausible.
6. Confirm `checklist.md` present and honest.
