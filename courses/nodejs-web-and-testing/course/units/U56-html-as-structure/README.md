# U56 — HTML as structure

**Phase 7**

## Where you are

Frontend is the browser side. **HTML** describes **structure** of a page — headings, forms, lists — not styling and not full program logic.

## What you will be able to do

- Explain HTML as a document tree of elements.
- Write a valid minimal page with `!doctype`, `html`, `head`, `body`.
- Use headings, paragraphs, lists, links, forms, buttons, labels.
- Open an HTML file in a browser and view source.

## What you need already

- **U55**
- Text editor; any modern browser

## Time and energy

**70–100 minutes.**

## Why this exists

Playwright and DOM JS both need a real structure. Broken HTML makes automation and scripting miserable.

## Plain-language teaching

### HTML

**HTML** (HyperText Markup Language) marks up content with **tags** so the browser knows what each piece *is*.

```html
<p>This is a paragraph.</p>
```

- `<p>` open tag  
- `</p>` close tag  
- Content in between  

Some elements are empty-ish: `<br>`, `<img …>` (void elements — details as needed).

### Minimal page

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Notes UI</title>
  </head>
  <body>
    <h1>Notes</h1>
    <p>Welcome.</p>
  </body>
</html>
```

| Part | Role |
|------|------|
| `<!doctype html>` | “This is HTML5” |
| `<head>` | Metadata for browser/tab (title, charset) |
| `<body>` | Visible content |
| `lang="en"` | Language hint |

### Nesting = tree

Elements nest inside elements. That tree becomes the **DOM** (U58). Invalid nesting confuses browsers and tools.

### Common structural elements

| Element | Use |
|---------|-----|
| `h1`–`h6` | Headings (one main `h1` per page is a good habit) |
| `p` | Paragraph |
| `ul`/`ol`/`li` | Lists |
| `a href="..."` | Link |
| `form` | Group inputs for submit |
| `label` | Names an input (accessibility + click target) |
| `input` | Text field, etc. |
| `button` | Clickable action |
| `main`, `header`, `nav`, `section` | Landmarks (semantic HTML) |

### Form skeleton (you will wire JS later)

```html
<form id="note-form">
  <label for="title">Title</label>
  <input id="title" name="title" type="text" />
  <button type="submit">Add note</button>
</form>
<ul id="note-list"></ul>
```

`id` attributes give hooks for JS and tests. Prefer meaningful ids; later also `data-testid` (U62).

### Open the file

Save as `index.html`. Double-click or browser → File open, or drag into browser.  
URL may look like `file:///.../index.html`. Later we **serve** files over HTTP (U61) — needed for `fetch` to APIs cleanly.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Element / tag | Building block of HTML | |
| Attribute | Extra info on a tag (`href`, `id`) | |
| Semantic HTML | Tags that describe meaning | Not only `div` soup |
| Nesting | Elements inside elements | |
| Void element | No closing content pair | |

## Worked example

Build the notes skeleton above; open in browser; confirm heading and form show.

## Common errors

### Error: Forgetting `label` / `for` / `id` match

Screen readers and humans suffer; Playwright role locators get harder.

### Error: Using `div` for everything

Works, but poorer structure. Prefer semantic tags when they fit.

### Error: Unclosed tags

Browsers guess; your DOM tree may not match your mental model.

## Checkpoints

1. head vs body?
2. Why labels?
3. What does nesting create?
4. Why `id` on form controls?

## Practice

### P1 — about page

`about.html` with heading, two paragraphs, a list, a link home.

### P2 — notes skeleton

`index.html` with form + empty list.

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- CSS beauty
- Form submission behavior (U59)
- React components

## Next unit

**U57 — CSS as presentation**
