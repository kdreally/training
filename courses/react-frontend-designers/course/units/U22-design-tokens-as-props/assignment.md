# U22 Assignment — Tokens and a tone-driven component

Submit to your trainer in **one folder or zip** named `U22-YourName`.

You will create a shared token file and one component whose variant is chosen by a token name passed as a prop.

## Files to submit

### 1. `tokens.css`

A token file with at least:

- Three color tokens (a text color and two variant pairs, or a documented equivalent).
- Two spacing tokens.
- One radius token.
- One font-size token.

Group them with comments. Name tokens by **role** (what they mean), not by appearance (what they look like).

### 2. Your component (folder `component/`)

```text
component/
  YourComponent/
    YourComponent.jsx
    YourComponent.css
  App.jsx
```

- The component must accept a `tone` (or similarly named) prop that chooses among **at least three** named variants.
- It must define the list of valid values and guard against an invalid one (like the `TONES.includes(...)` pattern).
- `YourComponent.css` must express its colors, spacing, radius, and font size using `var(--token)` — **no raw hex or pixel values** for those groupings.
- `App.jsx` renders the component in every valid variant.

Pick your own component: a `StatusPill`, `Alert`, `Tag`, `StatChip`, or similar. Do not reuse the lesson's `Badge` unchanged.

### 3. `answers.md`

Answer in your own words:

1. **Token vs style.** Explain the difference between a design token and a component style, with one example of each from your own files.
2. **`:root` and the import.** Why do we declare tokens on `:root`, and why is the token file imported once instead of in every component?
3. **Prop → class → token.** Trace one instance end to end: the prop you pass, the class string it becomes, and the tokens that class uses.
4. **Drift.** Describe a specific value in your component that would drift if you had copied it instead of tokenizing it.
5. **Invalid tone.** Explain what happens if someone passes a variant that does not exist, and how your guard changes that behavior.
6. **Design bridge.** Show a table mapping at least three Figma variables or styles to your token names and values. Note any name you had to adjust for CSS rules.

### 4. `checklist.md`

```markdown
- [ ] My token file is imported once in the entry file (main.jsx).
- [ ] Component colors/spacing/radius/font-size use var() tokens, not raw values.
- [ ] My component has at least three named variants.
- [ ] I guard against an invalid variant value.
- [ ] All variants visibly render in App.jsx.
- [ ] I inspected a token in Developer Tools and confirmed it resolves.
- [ ] I read the U22 rubric before submitting.
```

## Definition of done

- All files present with the exact names above.
- Changing one token value visibly updates every use of it.
- No raw color/spacing/radius/font-size values in the component stylesheet (except legitimately one-off values, which you must call out in `answers.md`).
- Written answers are in your own words.

## Predict-then-run requirement

Before running, write the exact class string your component produces for **each** variant. Then run and confirm. State any prediction you got wrong.
