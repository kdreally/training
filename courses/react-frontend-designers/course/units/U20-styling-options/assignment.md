# U20 Assignment — Choosing a styling approach, with reasons

Submit to your trainer in **one folder or zip** named `U20-YourName`.

This assignment is written and comparative. You are **not** required to build a styled component yet; U21 does that.

## Files to submit

### 1. `answers.md`

Answer in your own words. Short paragraphs are fine. Do not paste the lesson text back unchanged.

1. **Four families.** List the four styling families. For each, write one sentence describing it and one sentence naming an honest cost.
2. **`className`.** Explain, to a designer who has never written JSX, why React writes `className` and not `class`. Include what a learner sees if they get it wrong.
3. **Inline `style`.** In 3–4 lines, explain when inline `style` is reasonable and one concrete reason it is wrong for styling a full component library.
4. **Our choice.** State which family this course uses. Give **two** reasons from the lesson and, in your own words, one thing that choice obliges us to be careful about.
5. **Design bridge.** Name one design-tool decision you make repeatedly (for example, corner radius, spacing scale, button style). Explain how a *shared named value* (a token) would help, and why duplicating the value by hand causes drift. (Token mechanics are taught in U22; here we only want your reasoning.)
6. **Your opinion.** If you were joining a team that ships a large design system, would plain CSS still be your first choice? Answer yes or no and give one honest reason either way. There is no wrong preference; empty reasoning is the only failure.

### 2. `fix-me.md`

The snippet below is broken. Write the corrected version and name **two** problems.

```jsx
export default function Card() {
  return <div class="card" style="padding: 16px">Hello</div>;
}
```

### 3. `checklist.md`

Copy and mark each item `[x]` when true:

```markdown
- [ ] I can name all four styling families without looking.
- [ ] I can explain the difference between class and className.
- [ ] I know this course uses plain CSS per component plus a tokens file.
- [ ] I understand that "scoped" in plain CSS depends on our naming discipline.
- [ ] I read the U20 rubric before writing answers.md.
```

## Definition of done

- All three files present with the exact names above.
- `answers.md` answers all six prompts in your own words.
- `fix-me.md` names two distinct problems, not one problem twice.
- Checklist completed honestly.

## Notes on submitting

If you are on Windows, zip the folder with right-click → **Send to → Compressed (zipped) folder**. On macOS, right-click the folder → **Compress**. On Linux, your file manager's "Compress" option works. If your trainer uses a learning platform, upload the same files there.
