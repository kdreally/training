# U12 Assignment — JSX rules in practice

Submit the following to your trainer in **one folder or zip** named:

`U12-YourName`

## Files to submit

### 1. `answers.md`

Answer in your own words.

1. **What JSX is.** Explain what JSX is in 3–4 sentences. Say what it is **not** (at least two things).
2. **The transformation.** Roughly, what does JSX become after the build tool processes it? Why does that matter for understanding behavior?
3. **One root.** Why must a component return exactly one root element? Show both fixes for two siblings (a `<div>` and a fragment).
4. **`{}` in markup.** When do you use `{}`? Give one example of something that **cannot** go inside `{}` and say what to do instead.
5. **`className`.** Why is it `className` and not `class`? Show the same paragraph written wrong and right.
6. **Comments.** Write one JSX comment and one JavaScript comment, and say where each is allowed.
7. **Error-reading practice (two).** Paste the exact text of the `Adjacent JSX elements` error and the self-closing-tag error you produced in Practice P5. For each, explain what it meant and how you fixed it.
8. **Console warning.** In Practice P6 you used `class=` instead of `className=`. Paste the console warning you saw and explain it.

### 2. `App.jsx`

Your final working file. It must:

- Define a component named `App` and export it as default.
- Return a **single root** element (a `<div>` or a fragment `<>...</>`).
- Use `className` (at least once) rather than `class`.
- Use `{}` to insert at least one variable and at least one calculation.
- Include at least one JSX comment.
- Contain your own wording, not the lesson's.

### 3. `errors.md`

The two error texts from Practice P5, copied verbatim, each followed by one line: what I changed to fix it. (These may overlap with `answers.md` Q7; a short version here is fine.)

### 4. `screenshot.png` (or `.jpg`)

One screenshot of your browser showing the rendered result, and one screenshot of the browser **console** (F12 → Console) showing either no errors or the warning from Practice P6. Label them `render` and `console` in the filename or in a one-line caption.

## Definition of done

- Folder named `U12-YourName` with all four files present.
- `App.jsx` runs and matches the screenshot.
- Both error texts are real, from your own terminal/console.
- If something did not work, `answers.md` includes the exact error and what you tried.

## Note on stuck submissions

An honest log of the break-and-fix work is a valid submission. Never send nothing.
