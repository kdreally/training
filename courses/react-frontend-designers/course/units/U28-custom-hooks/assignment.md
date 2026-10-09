# U28 Assignment — Custom hooks

Submit the following to your trainer in **one folder or zip** named:

`U28-YourName` (use your real name or student id as they prefer)

## What you are building

Two things:

1. **At least two custom hooks**, each starting with `use`, each calling at least one React hook. One of them should be `useToggle`. The other should be a hook you find genuinely useful (for example `useLocalStorage`, `useInput`, `useCounter`, or `useWindowWidth`).
2. **At least two components** that use your hooks, including one component that uses **the same hook twice** or two components that each use the same hook — to prove the values are independent.

Keep each hook focused and short. If a hook needs more than about 15 lines, simplify it or split it.

## Files to submit

### 1. Your project files

Include:

- Each hook file.
- Each component file that uses a hook.
- Any CSS you added.

If your project has many files, include only the ones you touched and say so in `answers.md`.

### 2. `answers.md`

Answer these prompts in your own words. Do not paste lesson text back unchanged.

1. **Define a custom hook.** In 3–5 sentences, explain to another designer what a custom hook is. Use the phrase "shares behavior, not data" and explain what it means.
2. **Before and after.** Paste a short "before" (the repeated logic written inline in a component) and the "after" (the same component using your hook). One short example is enough.
3. **Rules of hooks.** State both rules in your own words. Then explain, in one or two sentences, *why* React cares about the order hooks run in.
4. **Independence check.** Show or describe a case where two components (or one component calling the hook twice) each get their own separate value. Explain why they do not share.
5. **Predict then run.** Before running, predict what your `useLocalStorage` (or equivalent) shows after a page reload. Run it, then write what actually happened and why.
6. **Debug this snippet.** The hook below has a rules-of-hooks problem. Explain what is wrong and give a corrected version.

   ```jsx
   import { useState } from "react";

   export function useName(hasMiddleName) {
     const [first, setFirst] = useState("");
     if (hasMiddleName) {
       const [middle, setMiddle] = useState("");
     }
     return first;
   }
   ```

7. **Error reading.** Copy one real error message you saw while building this assignment (or reproduce the `React Hook "useState" is called conditionally` message on purpose). Decode it: what does it mean, and what was the fix?
8. **Design bridge.** Name a repeated behavior you keep re-creating in your design work (for example, a card hover treatment, a modal pattern, or a form row). In two or three sentences, connect "naming the behavior once" in code to using one reusable component in a design system.

### 3. `checklist.md`

Copy this checklist and mark each item `[x]` when true:

```markdown
- [ ] Every custom hook name starts with `use`.
- [ ] Every hook calls its hooks at the top level (no hooks inside `if`, loops, or nested functions).
- [ ] I have at least two components using my hooks.
- [ ] I proved that two callers get independent values.
- [ ] I can explain why a hook shares behavior but not data.
- [ ] I read the U28 rubric before writing answers.md.
- [ ] I ran the app and saw the behavior, not only read the code.
```

## Definition of done

- Two custom hooks, named correctly, each calling at least one React hook.
- Two or more components using them, with demonstrated independence.
- Both rules of hooks stated and respected in your code.
- `answers.md` present and in your own words.
- `checklist.md` completed honestly.
- No rules-of-hooks warnings or errors in the browser console.

## Submission format

Put everything inside one folder named `U28-YourName`. Compress it only if your trainer asks. If your file names differ from the suggestions, list them at the top of `answers.md`.
