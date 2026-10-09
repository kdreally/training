# U11 Assessor notes

Assessor-only. Do not link from learner materials.

## Model answer sketch

**Q1:** A React component is a function that returns a piece of interface (markup).

**Q2:** Capital-letter names are treated as components; lowercase names are treated as built-in HTML elements. `<Greeting />` is your part; `<div>` is HTML. A lowercase component name makes React look for a nonexistent HTML tag.

**Q3:** `import App from './App.jsx'`. "Default" means the file's single main export; it is imported without braces. (A named export would need braces.)

**Q4:** Any small component; the file should include `function App() { return (<div>...</div>) }` and `export default App`.

**Q5:** `main.jsx` renders `<App />`. It was untouched because it already imported and rendered `App`; editing `App.jsx` only changed what that component returns.

**Q6:** e.g. a button symbol reused across screens; reusable because one definition edits all instances. Any concrete, genuinely-reused design element is full.

**Q7:** e.g. exporting `Appp` while `main.jsx` imports `App`. Console: `Warning: React.jsx: type is invalid ... but got: undefined`, or Vite: `"Appp" is not defined`.

**Q8:** Renaming to lowercase `app` and using `<App />` (or importing `app`) mismatches; if used as `<app />`, React treats it as an unknown HTML element and warns. The capital letter distinguishes your component from HTML.

## Expected errors (verbatim flavor)

- Export/import mismatch: `Warning: React.jsx: type is invalid -- expected a string ... but got: undefined.` or `ReferenceError: App is not defined`.
- Lowercase component used as JSX: React warning about an unrecognized tag, or nothing renders because `App` is undefined.
- Multiple roots without wrapper (if the learner wanders into U12 territory): `Adjacent JSX elements must be wrapped in an enclosing tag.`

## Field notes

- Beginners often delete the whole `App.jsx` including the `export default App` line. That is the core failure this unit targets; give clear, warm correction.
- Some editors auto-import named exports with braces, producing `import { App } from './App.jsx'` against a default export. If the learner's app actually runs, their code may legitimately differ; grade the running evidence.
- If the learner kept `useState` and the counter, that is beyond scope but not wrong. Do not penalize.

## Common weak submissions

- No screenshot, or screenshot of the default Vite page.
- `App.jsx` still the scaffold.
- Two sibling roots with no wrapper (defer full credit to U12).
- Q7/Q8 answered "there was an error" with no quote or decoding.
