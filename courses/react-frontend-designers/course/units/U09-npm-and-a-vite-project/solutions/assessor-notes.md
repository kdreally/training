# U09 Assessor notes

Assessor-only. Do not link from learner materials.

## Model answer sketch

**Q1:** npm = Node Package Manager. (1) Downloads packages (React, Vite, and their dependencies) into the project. (2) Runs named scripts from `package.json`, e.g. `npm run dev`.

**Q2:** A dev server is a local program that serves the app to your browser and watches source files. Hot reload means saving a file updates the open page automatically; it removes the manual "save → re-export/re-share → refresh" loop.

**Q3:** `localhost` = this computer as a network name. A port is a numbered channel; Vite defaults to 5173, may fall back. Accept any port the student actually used.

**Q4:** e.g. `cd Desktop` → `npm create vite@latest my-first-react-app` → `cd my-first-react-app` → `npm install` → `npm run dev`. (Five lines; the assignment says "four," but scaffold+cd+install+run is the core. Do not penalize an extra `cd`.)

**Q5:** JavaScript keeps the course to one language; TypeScript adds type syntax to learn and is unnecessary for the audience. Any answer naming "simpler / fewer things to learn" is full.

**Q6:** Ctrl + C in the server's terminal; the process stops and the prompt returns.

**Q7:** Running `npm run dev` outside the project yields `npm error Missing script: "dev"` (or similar), meaning the folder's `package.json` has no `dev` script — wrong folder.

**Q8:** Vulnerabilities are advisory audit notes; the install still succeeded. Correct action: ignore them, do not run `npm audit fix --force` during the course.

## Field notes

- The most common genuine blocker is a corporate network/proxy blocking npm downloads (`ETIMEDOUT`). If a cohort hits this together, it is an environment issue, not a learner failure.
- Some learners on Windows will scaffold with TypeScript by accident. Teach the fix (delete + re-scaffold) rather than hand-converting.
- A learner may have an old global Vite or create-react-app habit. If they used `create-react-app`, their commands differ from the lesson; grade the understanding, note the divergence, and re-point them to Vite.

## Common weak submissions

- No screenshot, or a screenshot of a different site.
- `commands.md` is copied lesson text.
- Confuses dev server with "the internet" or with deployment (U32 topics).
- Reports npm vulnerabilities and ran `audit fix --force`, then the app fails to start.
