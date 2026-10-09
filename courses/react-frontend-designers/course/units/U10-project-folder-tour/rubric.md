# U10 Rubric

Visible to learners. Total **20 points**.

| Criterion | Points | Must-have? | Evidence |
|-----------|--------|------------|----------|
| Distinguishes source vs generated files | 3 | Yes | `answers.md` Q1 |
| Accurately traces `index.html` → `main.jsx` → `App.jsx` | 4 | Yes | `answers.md` Q2 |
| Correct `package.json` vs `package-lock.json` distinction | 3 | Yes | `answers.md` Q3 |
| Correct `public/` vs `src/assets/` distinction | 3 | Yes | `answers.md` Q4 |
| Four leave-alone files with sound reasons | 3 | Yes | `answers.md` Q5 |
| Locates the mount point | 2 | No | `answers.md` Q6 |
| Error-reading practice decoded | 2 | No | `answers.md` Q7 |
| Complete, accurate file map | 0 bonus / part of evidence | Yes | `file-map.md`, screenshot |

Note: `file-map.md` and the screenshot are the **evidence** for Q1 and Q2. If the map is missing or incomplete, cap the source/generated and chain criteria at half.

### Partial credit notes (assessors)

- Q1: full for a clear "you edit vs tool manages" split with a concrete example. "Big vs small" earns 1/3.
- Q2: full only if all three of `index.html`, `main.jsx`, `App.jsx` appear in the right order with what flows between them. Missing any link caps at 2/4. Confusing `main.jsx` with `App.jsx` caps at 2/4.
- Q3: full if they convey "declared intention vs exact locked versions." Award 2/3 for "one is auto-generated" without the version idea.
- Q4: full requires the processed-vs-served distinction. "Public is for images" alone earns 1/3.
- Q5: accept any four genuinely-managed files (`node_modules`, `package-lock.json`, `vite.config.js`, `eslint.config.js`, and often `.gitignore`). Do **not** accept `src/App.jsx` or `index.html` as leave-alone, since later units edit them.
- Q7: any genuine module-not-found error correctly decoded earns full.

### Common weak submissions

- `file-map.md` lists only files, omitting `node_modules` or `public/`.
- Claims to edit `node_modules` "to fix a bug."
- Q2 reverses `main.jsx` and `App.jsx`.
- No screenshot of the changed title.
- Copy-pasted lesson tree instead of their own project's output.
