# U25 — Assets: images, icons, fonts

**Phase 4 — Styling and design**

## Where you are

Your components, styles, tokens, and layouts are in place. What is missing is the raw material a real design needs: **images, icons, and typefaces**. This unit brings those into the project the right way, and is honest about the cost they carry.

Assets are where a designer's eye and a developer's performance budget meet. Handled carelessly, a beautiful page weighs ten megabytes and loads slowly on a phone. Handled well, it looks the same and loads in a blink. This unit teaches the difference.

## What you will be able to do

- Decide whether an asset belongs in `public/` or `src/assets/`.
- Import an image in a component and render it with correct `alt` text.
- Add an icon as an inline SVG component (no plugin required).
- Load a web font using a `<link>` or `@font-face`, and use it in CSS.
- Explain what a file's size does to load time, and one way to reduce it.
- Read a failed asset load (a broken image or a console 404) and fix it.

## What you need already

- **U10 — The project folder tour**: `public/`, `src/`, `index.html`, `main.jsx`.
- **U21 — Component-scoped CSS**: component stylesheets and naming.
- **U22 — Design tokens as props**: `tokens.css`; fonts and colors are tokens too.
- **U24 — Accessibility**: `alt` text was introduced there; this unit applies it to real files.

## Time and energy

About **90–120 minutes**. Downloading or exporting a font and a couple of images adds time. Free options are enough; nothing here requires a paid service.

## Why this exists

Designers ship files constantly — exports, SVGs, font choices — but the web has rules that a logo file on your desktop does not announce. Two files with the same name and different letter case, a 4MB hero image, a font weight nobody actually uses: each has a consequence in code.

Where a file lives changes how you reference it. A wrong path is the single most common asset bug, and it is easy to avoid once you understand the two locations. Size is the other half: your design decisions about imagery and type become the page's weight, so you should be the one deciding them deliberately.

## Plain-language teaching

### The two places assets live

A Vite project (U09) gives you two homes for assets, and they behave differently.

| Folder | How you refer to a file | Best for |
|--------|-------------------------|----------|
| `public/` | By absolute path from the site root: `src="/logo.png"` | Files whose name must stay fixed and be reachable by URL: `favicon.ico`, `robots.txt`, social images, or a font you reference by URL |
| `src/assets/` | By **importing** it in JavaScript: `import logo from "./assets/logo.png"` | Images and other assets tied to components, so the build can track, rename, and optimise them |

- **`public/`** is copied to the site root exactly as-is. A file at `public/logo.png` is served at `/logo.png`. The **absolute path** starts with `/` and means "from the site root," not "from this file."
- **`src/assets/`** is processed by the build. When you import a file, the import gives you back a **URL string** you can use in `src`. If the file moves, the build updates the URL; if you mistype, the build tells you.

Which to choose? Default to `src/assets/` for anything a component displays (logos, photos, illustrations), because the build manages it. Use `public/` for things that must live at a fixed URL and are not imported (favicons, a web manifest, a font referenced by URL).

A note on operating systems: Windows, macOS, and Linux differ in how they treat letter case. Windows usually ignores it (`Logo.png` and `logo.png` are "the same"); Linux and most servers do not. If your import uses `Logo.png` but the file is `logo.png`, it may work on your machine and fail once deployed. Match the case exactly, always.

### Importing an image in a component

```jsx
import heroImage from "../assets/hero.jpg";

export default function Hero() {
  return (
    <img src={heroImage} alt="A studio desk with a sketchbook and pencils" />
  );
}
```

- `import heroImage from "../assets/hero.jpg";` — the build reads the file and hands the variable `heroImage` a URL string.
- `<img src={heroImage} ... />` — braces, because `heroImage` is a JavaScript variable, not a quoted path.
- `alt` — the description from U24, written for a person who cannot see the image.

- **What it does:** renders the image, with the build tracking the real URL.
- **Success looks like:** the image appears, and Developer Tools' Network panel shows the file with status `200`.
- **One decoded failure:** importing a path that does not exist stops the build with *"Failed to resolve import "../assets/hero.jpg" from "src/components/Hero/Hero.jsx". Does the file exist?"* The message names the import and the file it could not find. Check spelling, folder, and letter case.

### `alt` text, applied

Rules from U24, made concrete:

- Informative image: `alt="A studio desk with a sketchbook and pencils"`.
- Decorative image (adds nothing): `alt=""` — deliberately empty, so screen readers skip it.
- Image inside a link or button that already has text: `alt=""` to avoid duplication.
- Never use `alt` to repeat visible caption text.

### Icons: the inline SVG approach

There are three common ways to add icons; we use the simplest dependency-free one: **inline SVG**.

An **SVG** (Scalable Vector Graphics) is a vector image described in text-based markup — basically the code version of a vector shape. Its advantage for UI is that it scales to any size without blurring, exactly like vector shapes in a design tool.

"**Inline**" means you paste the SVG's markup directly into your JSX, wrapped in a small component:

```jsx
export default function StarIcon({ size = 20 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="M12 2l3 7h7l-6 4 2 7-6-4-6 4 2-7-6-4h7z" />
    </svg>
  );
}
```

- `viewBox="0 0 24 24"` — the icon's internal coordinate grid; the shape is defined within it and scales with width/height.
- `stroke="currentColor"` — the icon takes the **current text color**, so it inherits whatever `color` its parent has. That is how you make an icon match a button label without editing the SVG.
- `aria-hidden="true"` — tells assistive tech to skip the icon when it is decorative. If the icon is the *only* content (an icon-only button), hide the icon and label the button instead, as in U24.
- `{...}` on `width`/`height` — the `size` prop (default 20) from U13.

Other approaches you may meet later: importing an `.svg` file as a URL for use in `<img src>` (fine for standalone illustrations), or a plugin that converts SVG files to components. We avoid the plugin here because it is an extra dependency and this unit has enough moving parts.

- **What it does:** draws a crisp, color-inheriting icon with no external file request.
- **Success looks like:** the icon renders at the requested size and matches the surrounding text color.
- **One decoded failure:** copying SVG markup and leaving HTML attributes like `stroke-width` (hyphenated) instead of React's camelCase `strokeWidth` triggers a console warning and the icon may lose its stroke. React uses camelCase for SVG attributes too.

### Fonts: two ways to load them

You already choose type in your design tool. On the web, the browser only has fonts you explicitly load; otherwise it falls back to a system font. There are two common methods.

#### Option A: a `<link>` to a font host (simplest)

Add tags to the `<head>` of `index.html`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap"
  rel="stylesheet"
/>
```

Then use the family in CSS:

```css
:root {
  --font-family-base: "Inter", system-ui, sans-serif;
}
body {
  font-family: var(--font-family-base);
}
```

- The `link` fetches a stylesheet that defines the font. `preconnect` warms the connection early, which speeds loading.
- `wght@400;600` limits the request to two weights. Every weight you request is more data; request only what you use.
- `display=swap` means text shows in a fallback font immediately, then swaps to Inter when it loads — so the page never shows invisible text.
- The `font-family` stack lists `"Inter"` first, then fallbacks (`system-ui`, then a generic `sans-serif`) in case Inter does not load.

**Cost honesty:** Google Fonts is free and easy, but it is a third-party request, and in some regions or regulated settings it is blocked or discouraged. Mention this to whoever owns the project. A locally hosted font avoids the external dependency at the cost of hosting the file yourself.

#### Option B: `@font-face` with local files (full control)

Put the font files in `public/fonts/`, then declare them in CSS:

```css
@font-face {
  font-family: "Inter";
  src: url("/fonts/Inter-Regular.woff2") format("woff2");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "Inter";
  src: url("/fonts/Inter-SemiBold.woff2") format("woff2");
  font-weight: 600;
  font-style: normal;
  font-display: swap;
}

:root {
  --font-family-base: "Inter", system-ui, sans-serif;
}
```

- Each `@font-face` block describes one file: a family name, where it is, its weight and style.
- The path `/fonts/...` is absolute because the files are in `public/`.
- `format("woff2")` is the modern, compressed font format; prefer it.
- `font-display: swap` avoids invisible text.

- **What it does:** loads your own font files, with no third party.
- **Success looks like:** text renders in Inter, and the Network panel shows the `.woff2` file with `200`.
- **One decoded failure:** a `404` on `/fonts/Inter-Regular.woff2` means the path or filename does not match what is in `public/fonts/`. Developer Tools' Network panel and the Console both show the requested URL; compare it to the actual file, letter by letter.

### Performance honesty: file size

Every asset is bytes the user must download. On a fast office laptop this is invisible; on a phone on a train it is the difference between instant and abandoned.

Practical rules:

- **Images:** prefer modern formats (`.webp`, `.avif`) over `.png`/`.jpg` where quality allows; size images to the largest size they will actually display; compress exports before adding them. A 4000px hero shown at 800px is wasted bytes.
- **Fonts:** request only the weights and styles you use; `woff2` only; `font-display: swap`. A variable font can cover many weights in one file if you need several.
- **Icons:** inline SVG scales for free and adds no image requests. Prefer it over exporting dozens of PNG icons.
- **Measure, do not guess:** the browser's **Network** panel (F12) shows each file's size and load time. That is your performance instrument. Sort by size and ask "does this earn its place?"

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Asset | A file your app uses: image, icon, font, etc. | Not only images |
| `public/` | Files copied as-is to the site root | Referred to by absolute path `/name`; not imported |
| `src/assets/` | Files processed by the build | Referred to via `import`, which returns a URL |
| Absolute path | Starts with `/`, means "from the site root" | Not "from this file" |
| Relative path | Starts with `./` or `../`, means "from this file" | `../` goes up one folder |
| Imported URL | The string an image import returns | Use it in `src`, not as a literal path |
| Inline SVG | SVG markup pasted directly into JSX | Not an image file; it is markup you can style |
| `currentColor` | A keyword meaning "inherit the text color" | Lets icons match their parent's color |
| `viewBox` | The SVG's internal coordinate grid | Enables clean scaling |
| `@font-face` | A CSS rule declaring a font file | One block per weight/style |
| `woff2` | Modern compressed web font format | Preferred over `.ttf`/`.otf`/`.woff` |
| `font-display: swap` | Show fallback text, then swap in the font | Prevents invisible text while loading |
| 404 | The browser's "not found" status for a missing file | The most common asset bug; check paths |
| Network panel | DevTools list of every file the page requested | Your tool for finding heavy assets |

## Worked example

A `PromoCard` that uses an imported image, an inline SVG icon, and a tokenised font.

### File 1 — `src/components/PromoCard/PromoCard.jsx`

```jsx
import promoImage from "../../assets/promo-workshop.jpg";
import CalendarIcon from "../icons/CalendarIcon";
import "./PromoCard.css";

export default function PromoCard({ title, date, description }) {
  return (
    <article className="promoCard">
      <img
        className="promoCard__image"
        src={promoImage}
        alt="A person sketching UI layouts on a whiteboard"
      />
      <div className="promoCard__body">
        <h3 className="promoCard__title">{title}</h3>
        <p className="promoCard__meta">
          <CalendarIcon />
          <span className="promoCard__metaText">{date}</span>
        </p>
        <p className="promoCard__description">{description}</p>
      </div>
    </article>
  );
}
```

Line-by-line:

- `import promoImage from ...` — the build returns a URL string; the file lives in `src/assets/`, two levels up from `src/components/PromoCard/`.
- `<img ... alt="...">` — informative alt text (U24).
- `import CalendarIcon from "../icons/CalendarIcon";` — the inline SVG icon component (file below). Component imports have no file extension.
- `<CalendarIcon />` — renders the icon at its default size; `stroke="currentColor"` makes it inherit the meta text color.

### File 2 — `src/components/icons/CalendarIcon.jsx`

```jsx
export default function CalendarIcon({ size = 16 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}
```

- `focusable="false"` — an extra safeguard for older browsers that made SVGs focusable; harmless here.
- `strokeWidth`, `strokeLinecap`, `strokeLinejoin` — React's camelCase spellings of the SVG attributes.

### File 3 — `src/components/PromoCard/PromoCard.css`

```css
.promoCard {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  overflow: hidden;
  background: var(--color-surface);
  max-width: 320px;
  font-family: var(--font-family-base);
}

.promoCard__image {
  display: block;
  width: 100%;
  height: 160px;
  object-fit: cover;
}

.promoCard__body {
  padding: var(--space-md);
}

.promoCard__title {
  margin: 0 0 var(--space-sm) 0;
  font-size: 1.125rem;
  color: var(--color-text);
}

.promoCard__meta {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  color: #64748b;
  margin: 0 0 var(--space-sm) 0;
}

.promoCard__description {
  margin: 0;
  color: #475569;
  line-height: 1.5;
}
```

- `object-fit: cover;` — makes the image fill its box and crop the overflow without distorting it. This is the CSS version of "Fill" in a design tool's image controls.
- `overflow: hidden;` on the card — clips the image to the card's rounded corners.
- The font-family comes from the `--font-family-base` token, so changing the font is a one-line change.

### File 4 — `src/tokens.css` (font token addition)

```css
:root {
  --font-family-base: "Inter", system-ui, sans-serif;
  --font-family-heading: "Inter", system-ui, sans-serif;
  /* ... existing color, space, radius tokens ... */
}
```

### File 5 — `index.html` (font link)

Add inside `<head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap"
  rel="stylesheet"
/>
```

### How to run and verify

1. Save the files; the dev server reloads.
2. The promo card should show the image, the calendar icon next to the date, and Inter as the font.
3. Press **F12** → **Network**, then reload (Ctrl/Cmd+R). Confirm:
   - the image file returns `200`,
   - the Inter font file(s) return `200`,
   - no red `404` rows.
4. Sort the Network list by **Size** and note which asset is largest. Ask whether it earns its weight.

## Common errors

### Error 1: Broken image, console shows a 404

**What you see:** a broken-image icon in the layout; the Console shows a red line ending in `404` for the image URL.

**What it means:** the path the browser requested does not point to a real file. Common causes: a `public/` file referenced with a relative path, a `src/assets/` file referenced by a hard-coded path instead of an import, or a letter-case mismatch.

**Fix:** decide which folder the file is in. If `public/`, reference it as `/name.jpg`. If `src/assets/`, `import` it and use the variable. Match letter case exactly.

### Error 2: "Failed to resolve import" stops the build

**What you see:** the dev server prints *"Failed to resolve import "./assets/promo.jpg" ... Does the file exist?"*

**What it means:** an `import` points at a file that is not there. This is a build-time error, so the page may not update at all.

**Fix:** read the exact path in the message and compare it to the actual file location. Adjust `../` depth or fix the filename.

### Error 3: SVG icon is invisible or has no stroke

**What you see:** the icon area is blank, and the Console warns about an invalid attribute.

**What it means:** you copied SVG markup that uses HTML attribute names (`stroke-width`) instead of React's camelCase (`strokeWidth`).

**Fix:** convert hyphenated SVG attributes to camelCase. `fill`, `stroke`, `width`, and `height` are already single words and stay as-is.

### Error 4: Text flashes in the wrong font, then changes

**What you see:** text briefly appears in a system font, then swaps to your font.

**What it means:** the web font loads after the initial paint. With `font-display: swap` this is expected and preferable to invisible text.

**Fix:** this is usually fine. To reduce the flash, `preconnect` to the font host (shown above), limit weights, and keep the fallback stack close in style to your brand font.

### Error 5: The page is slow, and you do not know why

**What you see:** a long load, especially on a throttled connection.

**What it means:** something is oversized — often a multi-megabyte image, several font weights, or many icon files.

**Fix:** open the **Network** panel, sort by size, and identify the top offenders. Re-export images smaller and in `.webp`/`.avif`, reduce font weights to those in use, and prefer inline SVG icons.

## Checkpoints

1. What is the difference between how you reference a file in `public/` and a file in `src/assets/`?
2. Given `import logo from "../assets/logo.png"`, what kind of value is `logo`, and how do you use it in JSX?
3. When is empty `alt=""` correct, and when must `alt` describe something?
4. How does `stroke="currentColor"` make an icon fit into a button?
5. Name one way to reduce page weight from fonts and one from images.
6. An image shows a broken icon. What one keystroke opens the tool that shows you the requested URL, and what status code are you looking for?

## Practice exercises

### P1 — Read and predict

Given `import icon from "./star.svg"` used as `<img src={icon} alt="" />`, predict whether the icon is announced by a screen reader. Explain your answer.

### P2 — Change one value

In `CalendarIcon.jsx`, change the default `size` from `16` to `40`. Predict the result, then apply. Note that the icon stays crisp because it is vector.

### P3 — Fill in the blank

Complete this snippet so the image is decorative (no description) and fills its box without distortion:

```jsx
<img src={banner} alt="____" className="banner" />
```

```css
.banner { width: 100%; height: 200px; object-fit: ____; }
```

### P4 — Debug this broken snippet

```jsx
function Logo() {
  return <img src="src/assets/logo.png" alt="Company logo" />;
}
```

Explain what is wrong and write the corrected version.

### P5 — Inspection practice

Open whichever site you use most, press **F12** → **Network**, reload, and sort by size. Write down the three largest resources and their types (image, font, script). Identify at least one that seems larger than necessary.

### P6 — Design bridge

Choose the typeface you use in a design file. Write down the weights and styles you actually use. List exactly which font files you would request in code (for example, `400` regular and `600` semibold, `woff2`) and which you would leave out.

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- No image CDNs, image APIs, or build-time image optimisation plugins.
- No icon-library installation; we use inline SVG only.
- No variable-font or font-subsetting tooling in depth (mentioned, not taught).
- No video or audio assets.
- No responsive `<picture>`/`srcset` art direction (mentioned via sizing, not taught).

## Next unit

**U26 — Lifting state: sharing data between components**: you move into Phase 5, where separate components start sharing the same data.
