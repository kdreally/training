# U10 Assessor notes

Assessor-only. Do not link from learner materials.

## Model answer sketch

**Q1:** Source = human-authored, editable, lives mostly in `src/` (e.g. `App.jsx`). Generated/managed = created by tools, large or fragile (`node_modules/`, `package-lock.json`).

**Q2:** Browser loads `index.html` → `<script src="/src/main.jsx">` loads `main.jsx` → `main.jsx` imports `App` from `App.jsx` → React renders `<App />` into `<div id="root">`.

**Q3:** `package.json` declares the project and its intended dependencies/scripts; `package-lock.json` records the exact versions actually installed so the install is reproducible. npm manages the lock file; hand-editing corrupts reproducibility.

**Q4:** `src/assets/` files are processed/bundled and imported in code (e.g. `import logo from './assets/logo.png'`). `public/` files are copied as-is and referenced by URL (`/logo.png`). Use `public/` for favicons/stable URLs; `src/assets/` for images your components import.

**Q5:** e.g. `node_modules/` (generated, regenerable), `package-lock.json` (npm-managed), `vite.config.js` (build config, Phase 2 no-touch), `eslint.config.js` (lint rules, no-touch). `.gitignore` also acceptable.

**Q6:** The mount point is the DOM element React fills — `<div id="root"></div>` in `index.html`, located by `document.getElementById('root')` in `main.jsx`.

**Q7:** Changing the import to a nonexistent file yields something like:

```text
Failed to resolve import "./Wrong.jsx" from "src/main.jsx". Does the file exist?
```

Meaning: the bundler cannot find the module you asked for — a path/name mismatch.

## Field notes

- Vite versions differ. Newer scaffolds may include `src/App.css`, `src/index.css`, and an `eslint.config.js`; older ones use `.eslintrc.cjs`. Accept version-appropriate trees.
- Some learners run `npm create vite` and get an interactive prompt that also offers "Others → create-vite" and variants; if they picked TypeScript the tree has `.tsx` files. Grade the understanding, note the divergence.
- If a learner's project lacks `package-lock.json` (they may have deleted it), the Q3 answer can still be correct conceptually. Do not require the file to exist.

## Common weak submissions

- Omits `node_modules` from the file map.
- Describes the mount point as a file rather than a DOM element.
- Says `public/` and `src/assets/` "do the same thing."
- Lists `App.jsx` among files to never edit.
- Reverses `main.jsx`/`App.jsx` in the chain.
