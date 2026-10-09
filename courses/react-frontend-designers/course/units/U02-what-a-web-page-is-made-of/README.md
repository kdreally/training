# U02 — What a web page is made of

**Phase 1 — Foundations**

## Where you are

U00 gave you the rules and U01 explained where we are going. Now we start the foundation: **what is actually inside a web page?**

This unit is about **looking, not building**. You will not write a single line of code here. Instead you will learn that every page is made of two layers — structure and presentation — and that the browser turns those into a live, structured model called the **DOM**. You will learn to open two windows that let you *see* all of it. Writing your own page starts in U03.

If you have ever opened a page, right-clicked, and immediately closed the scary wall of text that appeared: this unit reopens that wall and hands you a torch.

## What you will be able to do

- Explain, in plain words, the difference between a page's **structure** (HTML) and its **presentation** (CSS).
- Explain what the **DOM** is and why it is a *tree*.
- Use **View Source** and the browser's **DevTools** to look at a page you did not build.
- Point at a piece of a page and say which layer made it look or behave that way.

## What you need already

- **U00 — How this course works.**
- **U01 — What React is, and why a designer should care.**

That is all. No terminal, no installation, no coding.

## Time and energy

About **50–80 minutes**. Most of it is looking at real pages with a guide. If your eyes glaze over the first time you open DevTools, that is normal — DevTools is dense by design. You are learning to *find one thing*, not to read the whole panel.

## Why this exists

React does not float in the air. When React builds something, what the browser actually shows is HTML and CSS. If those words are fog, React will always feel like memorizing spells. If those words are clear, React becomes "a way to produce HTML and CSS from reusable parts" — and that is a completely different, learnable thing.

This unit is also where "the browser is a black box" stops being true. Designers are visual learners; you are about to *see* the structure of a page with your own eyes.

## Plain-language teaching

### Every page is two layers

A web page is built from two kinds of instructions that arrive together:

1. **Structure (HTML)** — *what* is on the page: a heading, a paragraph, a list, an image, a button. HTML stands for **HyperText Markup Language**. Ignore the hyper-capitalized name; the useful part is **Markup Language**: a way of labeling content so the browser knows what each piece *is*.

2. **Presentation (CSS)** — *how* it looks: size, color, spacing, font, position. CSS stands for **Cascading Style Sheets**. Again, ignore the grand name; the useful part is **Style Sheets**: sheets of styling rules applied to the structure.

The useful mental model: **HTML is the skeleton; CSS is the skin and clothes.** The same skeleton can wear a formal suit or gym clothes, which is exactly why separating them is useful.

Most design tools hide the skeleton from you — you draw a rectangle, and the tool decides what markup to generate. In this course you will see and, from U03, write the skeleton yourself.

### Structure, seen as tags

HTML labels content using **tags**. A tag is written with angle brackets, like this:

```html
<h1>Good morning</h1>
```

Read it like a label with an opening and a closing:

- `<h1>` opens the label: "the following content is a level-1 heading."
- `Good morning` is the content.
- `</h1>` closes it. The slash means "close."

An **element** is the whole thing, open tag + content + close tag. (You will write these yourself in U03. Here, we only need to *recognize* them.)

Some pieces of content are tagged in pairs like the heading above. Others stand alone and have no closing tag — an image, for example, is a single tag. You will see both shapes in the worked example.

### Presentation, seen as rules

CSS does not sit inside the structure; it is a set of **rules** that *select* parts of the structure and describe how they should look. A rule names a target and then gives it properties:

```text
heading  →  color: dark red;  size: large
```

The real syntax looks stranger than that, but the idea is exactly this: **pick a target, describe its look.** You will write real rules in U04.

### The browser builds a tree: the DOM

This is the big idea of the unit, so take it slowly.

When a browser loads a page, it reads the HTML and builds a live, in-memory model of it. That model is called the **DOM** — the **Document Object Model**. In plain words: *the browser's structured map of everything on the page.*

It is a **tree** because HTML nests. Look at the shape:

```text
page (the document)
 └─ main content
     ├─ heading
     ├─ paragraph
     │   └─ a link
     └─ image
```

Each item in the tree is called a **node**. The heading and the paragraph are children of the main content, which is their **parent**. The heading and paragraph are **siblings** to each other. That is the entire vocabulary — parent, child, sibling — and it comes straight from your design-tool world of frames inside frames inside layers.

Why does the DOM matter? Two reasons:

1. It is what you will actually *see* when you inspect a page.
2. Later, JavaScript and React do not edit the HTML text file directly. They edit this live tree. When React "updates the page," it is updating the DOM.

That is the whole point of this unit in one line: **the browser turns HTML + CSS into a live tree (the DOM), and that tree is what the user sees.**

### Two windows for looking

You need two observation tools. Neither writes anything; both only look.

**View Source** shows you the raw HTML *text* that was sent to the browser. It is like opening the original sketch file: the instructions, not the rendered result.

**DevTools** (Developer Tools) is a panel built into your browser that shows the *live* page and lets you inspect it. The **Elements** panel shows the browser's current DOM tree — which, importantly, can differ from the raw source because the browser has already processed it.

Here is the distinction that trips up almost everyone:

| | View Source | DevTools → Elements |
|---|---|---|
| Shows | The original HTML text sent by the server | The browser's live, current DOM tree |
| Can the browser have changed it? | No — it is the raw input | Yes — it is the processed result |
| Analogy | The original design file | The rendered frame, with everything applied |

For a static page these often look similar. As soon as code starts changing the page, they diverge — and the DOM is the one that reflects reality.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Browser | The program that reads HTML/CSS and displays a page (Chrome, Firefox, Safari, Edge) | Not the internet itself |
| HTML | The language that labels the *structure* of a page | Not a programming language; not the look |
| CSS | The language of *presentation* — size, color, spacing, font | Not the structure; not behavior |
| Tag | A label written with angle brackets, e.g. `<h1>` | Often used loosely to mean the whole element |
| Element | Open tag + content + close tag, as one unit | Not the same as just one tag |
| Nesting | Putting elements inside other elements | Not "stacking in a design tool" visually — it means belonging |
| DOM | The browser's live, structured map (tree) of the page | Not the HTML file; the browser builds it *from* the file |
| Tree | The parent/child/sibling shape of nested elements | Not a literal picture; a way of describing relationships |
| Node | One item in the DOM tree | Not a "node" in a diagramming app |
| Parent / child / sibling | Element relationships in the tree | Same idea as frames/layers inside frames |
| Render | The browser turning structure + presentation into pixels | Not "download" |
| View Source | A view of the raw HTML text the browser received | Not the processed DOM |
| DevTools | Browser tool panel; **Elements** shows the live DOM | Not a code editor; it only looks unless you edit deliberately |

## Worked example

Below is a tiny, complete page. **Do not type it** — read it, then match it to the tree beneath it. Every line is explained after.

```html
<main>
  <h1>Morning routine</h1>
  <p>Three things I do before coffee.</p>
  <img src="coffee.jpg" alt="A cup of coffee">
</main>
```

**Line by line:**

- `<main>` — opens the label "this is the main content of the page." It will be closed at the bottom.
- `<h1>Morning routine</h1>` — a level-1 heading. Open tag, content, close tag. This is an **element**.
- `<p>Three things I do before coffee.</p>` — a paragraph element.
- `<img src="coffee.jpg" alt="A cup of coffee">` — an image element. It is a **single tag** (no closing tag) because an image has no inner content. The `src="..."` is extra information telling the browser *which file* to show, and `alt="..."` is the text description shown if the image cannot load. Those extra words are called **attributes** — settings written inside the opening tag. (You will use attributes properly in U03.)
- `</main>` — closes the main content.

**The DOM tree the browser builds:**

```text
main
 ├─ h1  →  "Morning routine"
 ├─ p   →  "Three things I do before coffee."
 └─ img →  (an image; the alt text describes the coffee cup)
```

The `main` element is the **parent**; the `h1`, `p`, and `img` are its **children** and are **siblings** to each other. That is the whole tree.

### Observing a real page (your first use of the tools)

These are **steps, not terminal commands**. Do this on any website you already trust and use — your email, a news page, a portfolio. Do not use a banking or government site; many of them deliberately block right-clicking.

**Task A — View Source:**

1. Right-click anywhere on the page.
2. Choose **View Page Source** (wording varies slightly by browser).
3. A new tab opens showing raw HTML text, often colorful.

*Success looks like:* a wall of angle-bracket text — the actual HTML the browser received.

*Decoded failure:* if instead you get a normal-looking page, or a "Save As" dialog, you clicked the wrong menu item. Close it and pick **View Page Source** specifically. If a shortcut does nothing (Windows/Linux: usually **Ctrl+U**; macOS Safari: **Cmd+Option+U**), fall back to the right-click menu.

**Task B — DevTools Elements:**

1. Right-click a heading or a button on the page.
2. Choose **Inspect** (or **Inspect Element**).
3. A panel opens, usually on the right or bottom. The **Elements** tab is selected, and one line is highlighted.

*Success looks like:* a nested list of tags, and the tag corresponding to the thing you right-clicked is highlighted. You are looking at the live DOM.

*Decoded failure:* if the panel is empty or on a different tab, click the **Elements** tab. If right-click did nothing at all, the site blocked it — open DevTools with the menu (**More tools → Developer tools**) or the shortcut (Windows/Linux: **Ctrl+Shift+I** or **F12**; macOS: **Cmd+Option+I**), then use the little arrow-in-a-box icon at the top-left of the panel to click an element on the page.

**Task C — Compare:** scroll through the View Source tab and the Elements panel side by side. For a simple page they look similar. That similarity is the point: the DOM was built from that HTML.

## Common errors

### Error: "The HTML I saw in View Source and the structure in DevTools don't match."

**What happens:** Confusion — which one is "real"?

**Fix:** Both are real, for different things. View Source is the raw input the browser received. DevTools shows the live DOM the browser currently has. Once code changes the page, they differ, and the DOM is what the user sees. For now, expect them to be close; later, expect differences and trust the DOM.

### Error: "DevTools is too complicated, I must be doing it wrong."

**What happens:** You open a dense panel full of tabs and close it in defeat.

**Fix:** You are not meant to read the whole panel. In this unit you only need the **Elements** tab and one highlighted line. Ignore everything else. Complexity is not a sign you are behind.

### Error: "CSS is inside the HTML tags."

**What happens:** You look for styling in the middle of the structure and get lost.

**Fix:** Structure (HTML) and presentation (CSS) are separate layers that the browser combines. CSS usually lives in its own place and *targets* the structure. Mixing them up is like looking for a garment's color inside its skeleton.

### Error: Reading `<img ...>` and looking for `</img>`.

**What happens:** You assume every tag must close, can't find the closing image tag, and conclude the page is broken.

**Fix:** Some elements have no inner content, so they have no closing tag. An image, a line break, and an input are common examples. In U03 you will learn which is which.

## Checkpoints

Answer in your own words. If you can, you are ready for the assignment:

1. What are the two layers of every page, and what does each one decide?
2. What is the DOM, in one sentence, for a person who has never heard the term?
3. Why is the DOM called a *tree*? Name the three relationship words.
4. What is the difference between View Source and the Elements panel?
5. What does a CSS rule do, at the level of "pick a target, describe its look"?

## Practice exercises

Ungraded; done by looking, not building.

### P1 — Layer spotting

Open any page you use. Without inspecting, look at one heading, one image, and one button. For each, write one sentence: "Its structure is ______; its presentation (color/size/spacing) makes it look ______."

### P2 — Draw the tree

Open one of your own design files (or sketch on paper). Pick a small frame with three or four layers inside it. Draw the same shape as a DOM tree — one parent with children, using the format from the worked example. Notice how little changes between "layers" and "nodes."

### P3 — Inspect and name

Using DevTools → Elements on a real page, click three different elements. For each, write down the tag name (the word inside the angle brackets) and whether it can have children or stands alone.

### P4 — Source vs DOM

Find a page you know updates itself (a feed, a mail inbox). Open View Source and the Elements panel together. Write one sentence about whether they look the same or different, and why.

### P5 — Decode this error note

A learner wrote: *"I right-clicked, chose 'Save as', and got a file. I thought I was viewing source but nothing looks like HTML."* In two sentences, explain what they did wrong and what to choose instead.

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md). It is visible on purpose — read it before you start.

## What is *not* in this unit

- No writing HTML or CSS (that begins in U03 and U04).
- No JavaScript.
- No React, components, or installing anything.
- No expectation that you understand every tab in DevTools.

## Next unit

**U03 — HTML as structure.** You stop observing and start writing: tags, nesting, semantic sections, links, images, and the difference between a button and a generic box.
