# U18 Assignment — A controlled form

Submit the following to your trainer in **one folder or zip** named:

`U18-YourName`

## Files to submit

### 1. `ProfileForm.jsx`

A form component meeting this specification:

- At least **two** text fields (for example, a display name and a bio), each with its **own** state variable.
- Each field is a **controlled input** using `value` and `onChange`.
- A live preview area on the page that echoes what the user has typed (so the field and state are visibly in sync).
- A submit button inside the `<form>` with `type="submit"`.
- An `onSubmit` handler on the form that calls `event.preventDefault()` and then shows the submitted values (an on-page message is preferred; an `alert` is acceptable).

### 2. `App.jsx`

Imports and renders `ProfileForm`.

### 3. `answers.md`

Answer in your own words:

1. **Controlled input.** In 4–6 sentences, explain to a designer what a controlled input is, using a design-tool variable or prototype comparison.
2. **The loop.** Describe, in order, what happens from the moment a user presses a key to the moment the character appears in the box.
3. **The event object.** What is `event.target.value`, and why do we read the text from there rather than from the input some other way?
4. **preventDefault.** What happens if you forget `event.preventDefault()`? Describe what you would see.
5. **Predict then run.** Before running, write what your preview shows when: (a) nothing is typed, (b) only the first field has text, (c) both have text. Then run and confirm.

### 4. `error-reading.md`

Paste, run, and answer:

```jsx
import { useState } from "react";

function Search() {
  const [text, setText] = useState();

  return (
    <form>
      <input
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
    </form>
  );
}

export default Search;
```

a. Describe what happens when you start typing.
b. Quote the exact warning from the browser console.
c. Explain why React gives this warning, using the words "controlled" and "uncontrolled."
d. Fix the code.
e. Write the general rule in one sentence.

## Definition of done

- Two independent controlled text fields, each reflecting state.
- Live preview stays in sync with typing.
- Submit prevents the page reload and shows the values.
- `answers.md` answers all five prompts in your own words.
- `error-reading.md` quotes the real warning, explains it, fixes it, and states the rule.
- Files are named exactly as above.

## What a strong submission looks like

- Each field has its own state (two fields do not share one value).
- The typed characters appear in the preview immediately, proving the loop.
- The "loop" answer (Q2) correctly orders: keypress → change event → `onChange` handler → `setState` → re-render → `value` reflects state.
- The error-reading answer correctly identifies `useState()` (undefined start) as the cause of the controlled/uncontrolled warning.
