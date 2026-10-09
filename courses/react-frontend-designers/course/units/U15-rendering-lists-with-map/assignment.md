# U15 Assignment — Render a list from data

Submit the following to your trainer in **one folder or zip** named:

`U15-YourName`

## Files to submit

### 1. `App.jsx`

A file that renders a list from an array of data using `.map`.

- Define an array of **at least four objects**. Each object must have an `id` and at least two other fields (for example `name` and `score`, or `title` and `price`).
- Render one component (reuse `Card` from U14, or define a small `Row` component) per object using `.map`.
- Each rendered item must have a `key` based on the object's stable `id`.
- Pass at least two fields through as props.

### 2. `answers.md`

Answer in your own words:

1. **Explain `.map`.** In 3–5 sentences, explain what `.map` does to a designer who has not coded. Use a "repeat" or "duplicate" metaphor from a design tool if it helps.
2. **Why not hand-write?** Give one concrete reason hand-writing repeated components fails when the data changes.
3. **The key.** Explain what a `key` is and what makes a good one. Say why the object's `id` is better than the array index.
4. **Predict then run.** Before running, write what this renders. Then run and report.

   ```jsx
   const tags = ["design", "code", "craft"];
   {tags.map((tag) => <span key={tag}>{tag}</span>)}
   ```

5. **Add a row.** Describe (in prose) exactly where in your file you would add a fifth object and what would appear in the browser. Then actually do it and confirm.

### 3. `error-reading.md`

Paste, run, and answer:

```jsx
const items = [
  { id: 1, label: "First" },
  { id: 2, label: "Second" },
];

function App() {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{label}</li>
      ))}
    </ul>
  );
}

export default App;
```

a. Describe what the browser shows (the list may be empty or the build may fail — describe whichever happens).
b. Read the console or terminal message and quote the part that names the problem.
c. Fix the code so the list shows "First" and "Second."
d. Write the general rule this bug teaches in one sentence.

## Definition of done

- `App.jsx` renders 4+ items via `.map`, each with a stable `key`.
- `answers.md` answers all five prompts in your own words.
- `error-reading.md` quotes the real error and includes the fix and the rule.
- Files are named exactly as above.

## What a strong submission looks like

- The list is genuinely data-driven: editing the array alone changes the page.
- Keys come from stable `id`s, and the answer explains *why* an id beats an index.
- The predict-then-run section is honest about any wrong prediction.
- The error-reading answer distinguishes the *error text* from the *rule* it teaches.
