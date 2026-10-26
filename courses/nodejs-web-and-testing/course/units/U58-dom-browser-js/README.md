# U58 — JavaScript in the browser; the DOM

**Phase 7**

## Where you are

Structure and style exist. **Browser JS** changes the page after it loads by talking to the **DOM**.

## What you will be able to do

- Explain the DOM as the browser’s live tree of the page.
- Load a JS file with `<script>`.
- Use `document.querySelector` / `getElementById`.
- Change text content and create list items.
- Know `console` in browser DevTools.

## What you need already

- **U56–U57**, Phase 1 JS, **U07** functions

## Time and energy

**80–110 minutes.**

## Why this exists

Without DOM skills, frontend is static posters. With DOM skills, pages respond — and Playwright asserts what the DOM shows users.

## Plain-language teaching

### The DOM

When the browser reads HTML, it builds an in-memory tree: the **Document Object Model (DOM)**.  
JavaScript can **query** and **change** that tree; the user sees updates.

HTML file on disk is the recipe. DOM is the cooked dish you can rearrange.

### Load script

Put before `</body>` (so HTML exists first):

```html
<script src="app.js"></script>
```

Or `type="module"` later; classic script is fine now.

### Select elements

```javascript
const heading = document.querySelector("h1");
const list = document.getElementById("note-list");
const input = document.querySelector("#title");
```

- `querySelector` — first match for a **CSS selector**
- `getElementById` — by id

If nothing matches, you get `null`. Calling methods on `null` → error (U09 skills).

### Change content

```javascript
heading.textContent = "My Notes";
```

`textContent` sets plain text (safe default). `innerHTML` interprets HTML — avoid with untrusted strings.

### Create elements

```javascript
function addNoteToList(title) {
  const li = document.createElement("li");
  li.textContent = title;
  list.appendChild(li);
}

addNoteToList("First note");
```

### Browser console

Right-click → Inspect → **Console**. `console.log` appears there (not the Node terminal). Different runtime, same idea.

### No `require` in plain browser scripts

Browser scripts do not use Node `require` unless you add a bundler. For this track: plain functions in `app.js`, or ES modules later if needed. Keep it simple.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| DOM | Live page tree | Not the HTML file itself |
| `querySelector` | Find element by CSS selector | |
| `textContent` | Plain text content | |
| `createElement` | Make a new element node | |
| DevTools | Browser debugging UI | |

## Worked example

On load, set heading text and append two hard-coded list items from JS.

## Common errors

### Error: Script in `head` without defer

Runs before body exists → null elements. Put script at end of body or use `defer`.

### Error: Looking at Node terminal for `console.log`

Browser page logs go to DevTools.

### Error: Typos in selectors

`#note-list` vs `#notelist` → null.

## Checkpoints

1. DOM vs HTML file?
2. Why script at end of body?
3. What if querySelector finds nothing?
4. textContent vs innerHTML risk?

## Practice

### P1 — change h1 via JS

### P2 — render an array of strings into `ul`

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- Frameworks
- Events deep (next)
- fetch (U60)

## Next unit

**U59 — Events and forms**
