# U03 — HTML as structure

**Phase 1 — Foundations**

## Where you are

U02 taught you to *read* a page: structure (HTML), presentation (CSS), and the DOM tree the browser builds. This unit is where you start **writing** the structure with your own hands.

You will create your first file — a small, complete web page — and open it in a browser. No installation, no terminal. Just a text file and a browser you already have.

This is a big step, and it is normal to feel a small flutter of "what if I break it?" Good news: HTML is the most forgiving language in this course. Nothing you write here can damage your computer. The worst case is a page that looks wrong, and "looks wrong" is fixable.

## What you will be able to do

- Create and save a file named `index.html` and open it in a browser.
- Write tags and elements: headings, paragraphs, lists, links, images, and buttons.
- Use **attributes** such as `href`, `src`, and `alt` correctly.
- Nest elements so they form a sensible DOM tree.
- Use **semantic** tags — `header`, `nav`, `main`, `section`, `footer` — instead of guessing with generic boxes.
- Explain when to use a `<button>` and when a `<div>` is the right tool.

## What you need already

- **U00 — How this course works.**
- **U01 — What React is, and why a designer should care.**
- **U02 — What a web page is made of.** You need its ideas: tags, nesting, the DOM, and how to inspect a page.

No terminal and no installation are needed for this unit.

## Time and energy

About **90–120 minutes**, including practice. This is the first unit where you build something. Take breaks between sections — your brain needs the pauses to let syntax settle. It is completely fine to make a mess in practice; that is what practice is for.

## Why this exists

You cannot design a good page if you do not know what a page is made of underneath. Design tools generate markup for you, and that works — until something looks wrong and the tool gives you no way to see *why*. Knowing HTML means you can look at any page and understand its skeleton, fix your own, and eventually read the HTML that React writes for you.

HTML is also **where meaning lives**. A heading is not just "big text"; it is a claim that this text is a heading. A button is not just "a clickable box"; it is a claim that this thing performs an action. Browsers, screen readers, search engines, and other developers all rely on that meaning. Designers care about meaning — this is your accessibility and handoff skills showing up as code.

## Plain-language teaching

### A web page is a text file

The simplest true statement about HTML: **a web page is a plain text file**. That's it. You write words in a file, save it with a special ending, and the browser reads it.

The special ending is the **file extension** — the part after the dot in the filename. For web pages, it is `.html`. A file named `index.html` is a text file the browser knows to read as HTML.

**`index.html` is a convention.** Web servers and browsers treat a file named `index.html` as the page to show first. We will use that name now so the habit is correct later when we host pages. Do not worry about servers yet; just use the name.

### Creating your first file (no terminal)

You need a plain text editor — any one will do. Some options you may already have:

- **Windows:** Notepad (built in), or Notepad++/VS Code if installed.
- **macOS:** TextEdit (built in), or VS Code if installed.
- **Linux:** gedit, Kate, or VS Code.

One important warning before you start, because it bites almost every beginner:

**Notepad and TextEdit like to add an ending of their own.** If you type `index.html` and Notepad saves it as `index.html.txt`, the browser will not read it as HTML. You must either:

- In Notepad, choose **File → Save as**, set **Save as type** to **All Files (*.*)**, then type `index.html`; or
- In TextEdit, choose **Format → Make Plain Text** first, then save with the **.html** extension and uncheck "If no extension is provided, use .txt."

*Success looks like:* your file is named exactly `index.html`, and when you view the folder it does **not** show something like `index.html.txt`.

*Decoded failure:* if the browser shows your code as plain text instead of a page, or your file is called `index.html.txt`, you saved with the wrong type. Rename the file so it ends in exactly `.html`.

Put this file in a new folder you can find easily, for example a folder called `practice-html` on your Desktop.

### The smallest real page

This is the smallest page that browsers accept as a proper document. **Read it first; you will type your own in the worked example.**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>My first page</title>
  </head>
  <body>
    <h1>Hello</h1>
  </body>
</html>
```

Line by line:

- `<!DOCTYPE html>` — a declaration, not a tag with content. It tells the browser "this is a modern HTML document." It always goes first. It does not close.
- `<html lang="en">` — wraps the whole document. `lang="en"` is an **attribute** saying the page's language is English; screen readers use it to choose a voice. Closed at the very bottom.
- `<head>` — information *about* the page that is not shown in the page body (like its title).
  - `<meta charset="utf-8">` — says which character set to use so accents and symbols show correctly. Stands alone.
  - `<title>My first page</title>` — the text shown in the browser tab. Not shown on the page itself.
- `</head>` — closes the head.
- `<body>` — everything the visitor actually sees goes inside here.
  - `<h1>Hello</h1>` — a level-1 heading.
- `</body>`, `</html>` — close body and document.

If some of this feels like boilerplate you'll copy for a while: it is, and that is expected. You are **not** expected to invent the document skeleton from memory on day one.

### Tags, elements, attributes, nesting

You met these in U02. Here is the precise version for writing.

- **Tag:** the label in angle brackets, e.g. `<h1>` or `</h1>`.
- **Element:** open tag + content + close tag, as one unit.
- **Attribute:** extra information inside the opening tag, written as `name="value"`. Example: `<html lang="en">` has the attribute `lang` with value `en`.
- **Nesting:** putting elements inside other elements. The **rule** is "last opened, first closed" — like nested boxes. This is correct:

```html
<section>
  <p>This is inside the section.</p>
</section>
```

This is broken (`<p>` and `<section>` overlap):

```html
<section>
  <p>This is inside the section.
</section>
</p>
```

The browser will try to *guess* a fix, which is exactly why broken nesting is dangerous: it often "works" but produces a different tree than you intended.

**Void elements** (also called self-closing) have no content and no closing tag. The important ones here: `<img>`, `<br>` (a line break), and `<input>` (a form field). You saw `<img>` in U02.

### Semantic tags: structure with meaning

In a design tool you group layers with boring generic frames. In HTML you have better options. **Semantic tags** are elements whose names say what the content *is*, not just that it's a box.

| Tag | What it means | Use it for |
|-----|---------------|------------|
| `<header>` | Introductory area | A page or section heading, logo, tagline |
| `<nav>` | Navigation | A group of links to move around |
| `<main>` | The main content | The one primary content area of the page |
| `<section>` | A thematic chunk | A distinct part of the main content (e.g. "About") |
| `<footer>` | Closing area | Copyright, contact, small print |

Why not just use generic boxes for everything? Because semantics are how the meaning travels:

- **Screen readers** let users jump to `<nav>`, `<main>`, or headings. Generic boxes give them nothing to jump to.
- **Search engines** understand the page better.
- **Future you and your teammates** can read the structure at a glance.

This is one place where a designer's accessibility instincts and a programmer's structure instincts are the *same skill*.

### Headings, lists, links, images, buttons

**Headings** go from `<h1>` (most important) to `<h6>` (least). Choose them for **hierarchy and meaning**, never for size — size is CSS's job (U04). Use one `<h1>` that describes the page, then `<h2>` for major sections, `<h3>` for sub-parts. Skipping levels (h1 then h3) confuses assistive tools.

**Lists** come in two types:

- `<ul>` — unordered list (bullet points). Each item is an `<li>`.
- `<ol>` — ordered list (numbered). Each item is an `<li>`.

```html
<ul>
  <li>Bread</li>
  <li>Milk</li>
</ul>
```

**Links** use `<a>`, with an `href` attribute saying where they go:

```html
<a href="https://example.com">Visit example</a>
```

`href` stands for "hypertext reference." The text between the tags is what the user clicks.

**Images** use `<img>`, a void element, with two attributes that matter:

```html
<img src="photo.jpg" alt="A cat asleep on a keyboard">
```

- `src` — the file to show. It can be a file next to your HTML file (just its name) or a full web address.
- `alt` — a text description, shown if the image fails to load and read aloud by screen readers. **Always write a meaningful `alt`.** This is accessibility, not decoration.

**Buttons vs divs — a rule you will use constantly.**

- `<button>` is a real, interactive element. Browsers make it clickable, focusable by keyboard, and announced as a button by screen readers.
- `<div>` is a **generic container** — a box with no meaning. Use it for grouping, layout, and styling, never for something a user is meant to *activate*.

```html
<button>Save</button>     <!-- right: performs an action -->
<div>Save</div>           <!-- wrong: looks like a button, behaves like nothing -->
```

If a thing does something when activated, it is a `<button>`. If it groups other things, it is a `<div>` (or a better semantic tag). We are not making it clickable yet — that is JavaScript, much later — but choosing the right element now is what makes it *become* interactive correctly later, and accessible in the meantime.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| HTML file | A plain text file saved with a `.html` ending | Not a special format you need special software to make |
| File extension | The part after the dot: `.html`, `.txt` | Hidden on some systems; can hide a `.txt` mistake |
| Tag | The angle-bracket label, e.g. `<p>` | Often used loosely to mean the whole element |
| Element | Open tag + content + close tag | Not just the opening tag |
| Attribute | A `name="value"` setting inside an opening tag | Not the content between tags |
| Nesting | Elements inside elements; last opened, first closed | Not visual stacking; it means containment |
| Void element | A tag with no content and no closing tag (`img`, `br`, `input`) | People look for a closing `</img>` and get stuck |
| Semantic tag | A tag whose name states the content's meaning (`nav`, `main`) | Not "a tag with special powers" |
| `header`/`nav`/`main`/`section`/`footer` | Named regions of a page | Not the same as the literal top/bottom of the screen |
| Heading | `<h1>`–`<h6>`, ranked by importance | Not chosen by font size — that's CSS |
| `href` | The destination of a link | Not the link text |
| `src` | The file an image points to | Not the description of the image |
| `alt` | A text description of an image | Not optional decoration; it is accessibility |
| `<div>` | A generic container with no meaning | Not a button; not fulfilled by making it look clickable |
| `<button>` | A real interactive element | Not "just a styled div" |

## Worked example

This is a complete page you **can** type into your `index.html`. It is small but uses every element from this unit. Read the explanation after each part.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Nadia's Tea Log</title>
  </head>
  <body>
    <header>
      <h1>Nadia's Tea Log</h1>
      <p>One cup, one note, every day.</p>
    </header>

    <nav>
      <a href="https://example.com/teas">Tea index</a>
    </nav>

    <main>
      <section>
        <h2>Today's cup</h2>
        <p>Jasmine green tea, brewed at 80&deg;C.</p>
        <img src="cup.jpg" alt="A glass cup of jasmine tea">
        <ul>
          <li>Leaves: 3 g</li>
          <li>Water: 250 ml</li>
          <li>Time: 2 minutes</li>
        </ul>
      </section>

      <section>
        <h2>Add a note</h2>
        <p>Keep a short record of how it tasted.</p>
        <button>Save note</button>
      </section>
    </main>

    <footer>
      <p>Tea Log, a personal project.</p>
    </footer>
  </body>
</html>
```

**Why each part exists:**

- The document head is the required boilerplate from earlier; only the `<title>` changed.
- `<header>` holds the page's intro: the `<h1>` name and a one-line description.
- `<nav>` holds a link to move elsewhere. `href` is the destination; the text is what's clickable.
- `<main>` is the one primary area. Inside it are two `<section>`s, each introduced by an `<h2>`.
- The `<img>` stands alone, with `src` (the filename next to this HTML file) and `alt` (a description).
- The `<ul>` holds three `<li>` items — a bullet list. Notice it nests inside `<section>`, which nests inside `<main>`.
- The `<button>` is the correct choice for "Save note" — it performs an action, so it is not a `<div>`.
- `<footer>` closes the page with small print.
- `&deg;` is a **character reference** for the degree symbol (°). It exists because some symbols need a safe spelling in HTML. You can also type the ° character directly; both work.

**The DOM tree this produces** (compare to U02):

```text
body
 ├─ header
 │   ├─ h1 → "Nadia's Tea Log"
 │   └─ p  → "One cup, one note, every day."
 ├─ nav
 │   └─ a → "Tea index"
 ├─ main
 │   ├─ section
 │   │   ├─ h2 → "Today's cup"
 │   │   ├─ p  → "Jasmine green tea..."
 │   │   ├─ img → (cup photo)
 │   │   └─ ul
 │   │       ├─ li → "Leaves: 3 g"
 │   │       ├─ li → "Water: 250 ml"
 │   │       └─ li → "Time: 2 minutes"
 │   └─ section
 │       ├─ h2 → "Add a note"
 │       ├─ p  → "Keep a short record..."
 │       └─ button → "Save note"
 └─ footer
     └─ p → "Tea Log, a personal project."
```

Notice how the tree mirrors the indentation of your code. Good indentation is not vanity — it is how you keep the tree readable to yourself.

### Opening your page in the browser (no terminal)

1. Save your file as `index.html` (remember the extension warning).
2. Find the file in your file manager.
3. **Windows:** double-click it, or right-click → **Open with** → your browser.
   **macOS:** double-click it; if it opens in an editor, right-click → **Open With** → your browser.
   **Linux:** double-click it, or right-click → **Open With**.

*Success looks like:* the browser shows your heading, paragraph, link, image area, list, and button — laid out plainly with the browser's default styling.

*Decoded failure:* if you see your HTML code as plain text, the file is probably named `index.html.txt`. Rename so it ends in exactly `.html`. If the image area shows only a broken-image icon and your `alt` text, the browser could not find `cup.jpg` — see the errors section.

You can leave the file open and re-save after edits, then refresh the browser (Windows/Linux: **F5** or **Ctrl+R**; macOS: **Cmd+R**) to see changes.

## Common errors

### Error: The image shows a broken icon and the alt text.

**What happens:** You wrote `<img src="cup.jpg" ...>` but the browser cannot find a file named `cup.jpg` next to your HTML file.

**Fix:** Either put the image file in the same folder as `index.html` with exactly the same name and extension (`cup.jpg` is not `cup.jpeg`), or update `src` to the correct name/path. The `alt` text appearing is the browser doing its job correctly — it is telling you what the image was *meant* to be.

### Error: HTML looks unforgiving, so mistakes will "error."

**What happens:** You expect the browser to shout at you like a terminal. It usually doesn't. It quietly guesses.

**Fix:** Understand that HTML is **forgiving by design**, which is a trap as much as a kindness. To see how the browser *actually* interpreted your file, open DevTools → **Elements** (U02) and compare the tree to your code. If a heading swallowed the next paragraph, your tags probably overlapped. The DOM is the truth.

### Error: Using `<div>` for a button (or for everything).

**What happens:** The "button" looks right after CSS but cannot be reached by keyboard, is not announced as a button by screen readers, and will not behave like a button when we add interactivity.

**Fix:** If it does something, use `<button>`. If it groups things, use `<div>` or a semantic tag. Looks are CSS's job; behavior and meaning are the element's job.

### Error: Choosing headings by how big they look.

**What happens:** You use `<h3>` because it's "the size you wanted," producing a broken hierarchy that confuses assistive tools and future styling.

**Fix:** Choose the heading level by **importance**: one `<h1>`, then `<h2>` for main sections, `<h3>` for their sub-parts. Size is adjusted later with CSS. Never skip a level just to get a look.

### Error: Overlapping tags instead of truly nesting.

**What happens:** You write `<section><p>text</section></p>`. The browser guesses a repair, and the DOM is not what you pictured.

**Fix:** "Last opened, first closed." Indent so the shape is visible. Check the Elements panel if unsure.

## Checkpoints

Answer in your own words. If you can, you are ready for the assignment:

1. What is the difference between a tag and an element?
2. What does the `alt` attribute do, and what happens when it is used?
3. Name three semantic tags and what each is for.
4. When do you use `<button>`, and when is `<div>` correct?
5. What is a void element? Name two.
6. Why should you choose a heading level by meaning rather than by its default size?

## Practice exercises

Ungraded. Do them in your `practice-html` folder. The difficulty increases on purpose.

### P1 — Read and predict

Before running anything, look at this snippet and write down the DOM tree you expect (parent, children, and any grandchildren).

```html
<main>
  <h2>Garden</h2>
  <ul>
    <li>Basil</li>
    <li>Mint</li>
  </ul>
</main>
```

Then type it into your file, open it, and confirm with DevTools → Elements. A wrong prediction is useful — note what differed.

### P2 — Change one value

In the worked example, change the `<h1>` text to your own name and the `<title>` to something else. Save and refresh. Confirm that the browser tab and the on-page heading changed, and nothing else did.

### P3 — Fill in the blank

Complete this so it renders an ordered list of three steps and a link to `https://example.com/steps`:

```html
<main>
  <h2>Steps</h2>
  <!-- your list here -->
  <!-- your link here -->
</main>
```

### P4 — Write a section from a specification

Add a `<section>` to the worked example called "Ratings" that contains an `<h2>`, a paragraph, and a `<button>` labelled "Add rating." Save and verify in the browser and in DevTools → Elements.

### P5 — Fix the broken example

This snippet has **three** problems. Find them, explain each, and write the corrected version.

```html
<section>
  <h2>Supplies<h2>
  <p>Paper and pens.
</section>
<div>Buy more</div>
```

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md). It is visible so there are no surprises.

## What is *not* in this unit

- No CSS or styling (that is U04).
- No JavaScript, no interactivity, no "making the button do something."
- No terminal and no installation — those arrive in U08–U09.
- No React, components, or JSX.
- No forms beyond seeing a `<button>` and `<input>` named; full forms come much later.

## Next unit

**U04 — CSS as presentation.** You keep your U03 page and give it a look: selectors, the box model, colors, fonts, and flexbox — all from a stylesheet you write by hand.
