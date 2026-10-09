# U27 Assignment — Context (light)

Submit the following to your trainer in **one folder or zip** named:

`U27-YourName` (use your real name or student id as they prefer)

## What you are building

A small app with a **shared value that several components read directly**, without prop drilling. The recommended build is a **theme** (light/dark), but you may choose another "region-wide" value if you prefer: a language, a text-size setting, or a "compact / comfortable" density. Keep the subject small.

Requirements:

- At least **three components below the provider** read the same value.
- At least **one of those components is two or more levels below** the provider, so the "no drilling" benefit is real.
- One control (a button, a select, or a toggle) changes the shared value.
- The value is stored in a component's `useState` (the single source of truth), not invented inside the context file.

## Files to submit

### 1. Your project files

Include:

- The context file (for example `ThemeContext.js`).
- The component that owns the state and renders the provider.
- The components that read the context.
- Any CSS you added.

If your project has many files, include only the ones you touched and say so in `answers.md`.

### 2. `answers.md`

Answer these prompts in your own words. Do not paste lesson text back unchanged.

1. **Explain prop drilling.** In 3–6 sentences, explain to another designer what prop drilling is and the specific moment it becomes worth solving.
2. **Map your tree.** Draw or describe your component tree from the provider down to each reader as indented text. Mark which components receive the shared value as a prop (you should be able to mark none, or very few).
3. **Name the pieces.** Point to the three pieces in your own code: the line that creates the context, the provider, and at least one `useContext` call.
4. **State vs context.** In one or two sentences, say where the actual state lives and what context is doing. Use the phrase "single source of truth" correctly.
5. **Predict then run.** Before running, predict what a reader shows if the provider is removed (or if a reader is moved outside the provider). Then test it and record the result.
6. **When NOT to use it.** Give two concrete situations from your own experience where passing a normal prop would be the better choice. Explain why for each.
7. **Debug this snippet.** Explain why the button below does nothing, then fix it.

   ```jsx
   const ThemeContext = createContext({ theme: "light", toggleTheme: () => {} });

   function App() {
     const [theme, setTheme] = useState("light");
     return (
       <ThemeContext.Provider value={{ theme }}>
         <Page />
       </ThemeContext.Provider>
     );
   }
   ```

8. **Design bridge.** Name a style or component property you have set at "file" or "global" level in a design tool. In two or three sentences, connect that choice to placing a provider around a region of the app rather than the whole file/app.

### 3. `checklist.md`

Copy this checklist and mark each item `[x]` when true:

```markdown
- [ ] My shared value is stored in one component's `useState`.
- [ ] The provider wraps the region that needs the value.
- [ ] At least three components read the value with `useContext`.
- [ ] At least one reader is nested two or more levels deep.
- [ ] No intermediate component receives the value as a prop just to forward it.
- [ ] I wrote down when I would *not* use context.
- [ ] I read the U27 rubric before writing answers.md.
```

## Definition of done

- A working app where one control changes a value read by three or more components.
- The three context pieces are present and named in `answers.md`.
- At least one honest "do not use context here" example.
- `checklist.md` completed honestly.
- No errors in the browser console while the page is open.

## Submission format

Put everything inside one folder named `U27-YourName`. Compress it only if your trainer asks. If your file names differ from the suggestions, list them at the top of `answers.md`.
