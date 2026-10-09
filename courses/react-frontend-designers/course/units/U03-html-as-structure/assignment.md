# U03 Assignment — Build a small static page

Submit the following to your trainer in **one folder or zip** named:

`U03-YourName` (use your real name or student id as they prefer)

This is your first built artifact. It does **not** need to look beautiful — styling is U04. It needs to be **structurally correct**: real tags, sensible nesting, meaning in the right places.

## Choose your page

Pick **one** of these (or invent a similar small one — clear it with your trainer if unsure):

- A recipe page (one recipe, with ingredients and steps).
- A personal reading list (a few books and a short opinion on each).
- A small portfolio "About me" page (your intro, a few skill areas, a contact link).

Keep it small. One page, a handful of sections. You are practising structure, not content volume.

## Files to submit

### 1. `index.html`

A single, complete HTML file that includes **all** of the following:

- [ ] The document skeleton: `<!DOCTYPE html>`, `<html lang="en">`, a `<head>` with `<meta charset="utf-8">` and a `<title>`, and a `<body>`.
- [ ] A `<header>` containing an `<h1>` and one `<p>`.
- [ ] A `<nav>` containing at least one `<a>` with a real `href`.
- [ ] A `<main>` containing **at least two** `<section>` elements, each opened by an `<h2>`.
- [ ] One list (`<ul>` or `<ol>`) with **at least three** `<li>` items.
- [ ] One `<img>` with a working `src` and a meaningful `alt` text. (Use any image file you own or that is free to use. If you cannot supply an image file, that is fine — keep the `<img>` and write a meaningful `alt`, and note this in `answers.md`. The broken-image icon is acceptable evidence here.)
- [ ] One `<button>` with a clear action label (e.g. "Save", "Add", "Subscribe").
- [ ] A `<footer>` with one short paragraph.

Indent your code so the nesting is readable. Do not add CSS or JavaScript.

### 2. `answers.md`

1. **Semantic vs generic.** In 3–5 lines, explain why you used semantic tags (`header`, `nav`, `main`, `section`, `footer`) instead of `<div>` for those areas. Give one concrete benefit.
2. **Button vs div.** Explain, in your own words, why your action element is a `<button>` and not a `<div>`. Mention at least one thing a `<div>` cannot do.
3. **The alt text.** Paste your exact `<img>` line and explain what your `alt` text describes and who benefits from it.
4. **Tree.** Draw the DOM tree of your own `index.html` (same text-tree format as the lesson). It must show at least one grandchild relationship.
5. **Predict then run.** Before opening your page in the browser, write what you expected the default (unstyled) page to look like. Then open it and write what you actually saw. Note any difference.
6. **Debug this broken snippet.** The snippet below has **three** problems. For each: quote the problem, name the rule it breaks, and give the corrected line.

   ```html
   <section>
     <h2>Supplies<h2>
     <p>Tape and labels.
   </section>
   <div>Save list</div>
   ```

### 3. `page.png` (or `page.jpg`)

A screenshot of your page open in a browser, so your trainer can see it rendered.

- **Windows:** press **Win + Shift + S**, drag over your page, then save the capture.
- **macOS:** press **Cmd + Shift + 4**, drag over your page; the image is saved to your Desktop.
- **Linux:** use your screenshot tool (often the **PrtSc** key or an app like Screenshot/GNOME Screenshot).

Name it `page.png` or `page.jpg` (either is fine).

### 4. `checklist.md`

Copy this checklist and mark each item `[x]` when true:

```markdown
- [ ] I read the U03 README fully (not only the assignment).
- [ ] My file is named exactly index.html (not index.html.txt).
- [ ] Every element I opened is properly closed (void tags excepted).
- [ ] I used at least two <section>s and one <ul> or <ol>.
- [ ] My alt text is meaningful (not "image" or empty).
- [ ] My "Save"-type action uses <button>, not <div>.
- [ ] I took a screenshot and named it page.png or page.jpg.
- [ ] I read the U03 rubric before submitting.
```

## Definition of done

- All four items present with the exact names above.
- `index.html` opens in a browser and shows the expected regions (header, nav, main with sections, footer).
- The structure is genuinely nested — no overlapping tags.
- `answers.md` includes the tree, the predict-then-run note, and the corrected broken snippet.
- The checklist is completed honestly.

If something does not render, use the U00 stuck protocol and the decoded failures in the lesson (especially the `.txt` trap and the wrong image path) before asking for help.
