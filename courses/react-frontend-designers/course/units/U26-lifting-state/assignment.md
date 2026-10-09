# U26 Assignment — Lifting state

Submit the following to your trainer in **one folder or zip** named:

`U26-YourName` (use your real name or student id as they prefer)

## What you are building

A small screen with **two sibling components that share one piece of data**:

- A **text field** (for example, a search box or a "filter by name" box).
- A **list** that changes based on what the field contains.

You choose the subject (products, books, team members, coffee orders). Keep it to 4–8 items. The point is not the topic; the point is that the state lives in the right place.

## Files to submit

### 1. Your project files

Include the component files you wrote or changed. At minimum:

- The parent component that owns the state.
- The child that contains the input.
- The child that renders the list.

If your project has many files, include only the ones you touched and say so in `answers.md`.

### 2. `answers.md`

Answer these prompts in your own words. Short paragraphs or bullet lists are both fine. Do not paste lesson text back unchanged.

1. **Explain lifting state.** In 3–6 sentences, explain to another designer what "lifting state up" means and why the search box cannot hold the shared value by itself.
2. **Name the owner.** Quote the one line of code where the shared value is created (your `useState`). Explain why that component is the closest common parent.
3. **Down, then up.** Describe, in your own words, what travels *down* to the input and what travels *up* back to the parent.
4. **Predict then run.** Before running, write down which items you expect to see when the field contains a specific letter or word. Then run it and record what actually appeared. If they differ, explain why.
5. **Derived data.** Is your filtered list stored in `useState` or calculated every render? Explain in one or two sentences why.
6. **Debug this snippet.** The snippet below runs without crashing but the list never changes. Explain what is wrong and give the corrected version.

   ```jsx
   function FilterBox({ value, onValueChange }) {
     return <input value={value} onChange={(event) => onValueChange} />;
   }
   ```

7. **Design bridge.** Describe a place in your design work where several frames or components must stay consistent (for example, a color style, a shared header, or a set of card variants). In two or three sentences, connect that to "single source of truth."

### 3. `checklist.md`

Copy this checklist and mark each item `[x]` when true:

```markdown
- [ ] My shared value lives in one parent, not in two components.
- [ ] The input reads its value from a prop, not from its own `useState`.
- [ ] The input can send changes back up through a callback prop.
- [ ] The list receives the already-filtered data, or visibly reflects the shared value.
- [ ] The page still works after I refresh it.
- [ ] I read the U26 rubric before I wrote answers.md.
- [ ] I ran the app and watched it behave, not only read the code.
```

## Definition of done

- One working screen where a single piece of state in a parent drives both children.
- The three component files (or the touched ones) present.
- `answers.md` present and in your own words.
- `checklist.md` completed honestly.
- No errors in the browser console while the page is open.

## Submission format

Put everything inside one folder named `U26-YourName`. Compress it only if your trainer asks for a zip. If a file name differs from the suggestions above, list your actual file names at the top of `answers.md`.
