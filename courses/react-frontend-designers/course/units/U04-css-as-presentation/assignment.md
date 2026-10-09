# U04 Assignment — Style your page

Submit the following to your trainer in **one folder or zip** named:

`U04-YourName` (use your real name or student id as they prefer)

You are styling the page you built in U03. Do **not** rebuild the structure; add presentation to it. The structure should still be correct.

## Files to submit

### 1. `index.html`

Your U03 page, updated so that its `<head>` links to your stylesheet:

```html
<link rel="stylesheet" href="styles.css">
```

No CSS written inside the HTML (no `<style>` block, no `style="..."` attributes). Keeping the two separate is part of the lesson.

### 2. `styles.css`

An external stylesheet that does **all** of the following:

- [ ] Starts with `* { box-sizing: border-box; }`.
- [ ] Uses at least **one element selector** (e.g. `body` or `p`).
- [ ] Uses at least **two class selectors** (add `class` attributes to your HTML as needed).
- [ ] Sets a **color** using a hex code, plus at least one more color expressed any valid way (named, hex, `rgb`, or `rgba`).
- [ ] Sets a **font-family** stack ending in a generic family, plus `font-size` and `line-height`.
- [ ] Uses **padding** and **margin** deliberately (at least one of each, in a place you can explain).
- [ ] Uses **flexbox** (`display: flex`) on at least one container, with `gap`.
- [ ] Has short comments (`/* like this */`) on **at least three** rules explaining why each exists.

Do not use CSS frameworks, `!important`, or id selectors for styling. If you use an id, explain why in `answers.md`.

### 3. `answers.md`

1. **Selector vs declaration.** In 2–4 lines, explain the difference, using one of your own rules as the example.
2. **Why separate files.** Why is the CSS in `styles.css` rather than inside `index.html`? Give one practical benefit.
3. **Padding vs margin, in your page.** Point to one place in **your** CSS where you used padding and one where you used margin. For each, say in one sentence what the space is doing.
4. **Box-sizing.** Explain what `box-sizing: border-box` changed for you. What would go wrong without it?
5. **Flexbox.** Name the container you turned into a flex container. What did `display: flex` and `gap` do to its children? What does `align-items` or `justify-content` do in your case?
6. **Contrast and accessibility.** Find your body text and its background. State both colors and explain, in one or two sentences, why you believe the text is readable (aim for the 4.5:1 guideline mentioned in the lesson).
7. **Predict then run.** Before saving, write a prediction: "If I change the `gap` in my flex container from ___ to ___, ___ will happen." Then actually change it, observe, and write what happened. Revert it afterward if you prefer.
8. **Debug this broken stylesheet.** Find **three** problems below, explain each, and write the corrected version.

   ```css
   .card {
     background-color: white
     padding: 20px
     border-radius: 12px;
   }

   .crad__title {
     font-size: 20px;
   }
   ```

### 4. `styled.png` (or `styled.jpg`)

A screenshot of your styled page open in a browser.

- **Windows:** **Win + Shift + S**, drag over the page, then save.
- **macOS:** **Cmd + Shift + 4**, drag over the page; saved to your Desktop.
- **Linux:** your screenshot tool (often the **PrtSc** key or an app).

### 5. `checklist.md`

Copy this checklist and mark each item `[x]` when true:

```markdown
- [ ] I read the U04 README fully (not only the assignment).
- [ ] My stylesheet is linked (not pasted into the HTML).
- [ ] The page changes color when I change the body background in CSS.
- [ ] I used at least one element selector and two class selectors.
- [ ] I used a flex container with gap.
- [ ] I checked a padding-vs-margin decision against the box model.
- [ ] I took a screenshot and named it styled.png or styled.jpg.
- [ ] I read the U04 rubric before submitting.
```

## Definition of done

- All five items present with the exact names above.
- `index.html` still has the correct semantic structure from U03, now linked to `styles.css`.
- `styles.css` satisfies every checkbox in section 2.
- The screenshot clearly shows the page is styled (not the browser default look).
- `answers.md` covers all eight prompts, including the corrected broken stylesheet.
- The checklist is completed honestly.

If the CSS does nothing, work through the decoded failures in the lesson — the link path and filename are the usual causes — before asking for help, and note what you tried.
