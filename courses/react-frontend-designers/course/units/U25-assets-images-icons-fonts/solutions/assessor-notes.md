# U25 Assessor notes

Assessor-only. Do not link from learner materials.

## Model answer sketch

**Q1 — Folder choice:** the image lives in `src/assets/` because the build processes it, tracks its URL, and updates references if it moves; `public/` is for files that must be reachable at a fixed URL without importing (e.g. `favicon.ico`, `robots.txt`, social share images, or a font referenced by URL in `@font-face`).

**Q2 — Import:** an image import returns a URL string (e.g. `promoImage`), used as `<img src={promoImage} />` — braces because it is a variable, not a quoted path.

**Q3 — `alt`:** either a plain description of an informative image, or exactly `alt=""` for a decorative one, with justification.

**Q4 — Icon:** `stroke="currentColor"` means the icon inherits the `color` of its parent, so it matches a button label automatically; React requires camelCase SVG attributes such as `strokeWidth`, `strokeLinecap`, `strokeLinejoin`.

**Q5 — Font:** link or `@font-face`; only the weights in use (e.g. 400 and 600); more weights mean more bytes and a slower load.

**Q6 — Performance:** real numbers from the Network panel, e.g. image 180 KB, Inter woff2 ~30 KB, largest asset named, all `200`.

**Q7 — Path reading:** either a pasted real error, or the two forms — `public/` uses `/font.woff2` (absolute), while an import from `src/components/X/` to `src/assets/` uses `../../assets/name.png` (relative).

**Q8 — Design bridge:** e.g. Inter 400/600 only, requested as `wght@400;600` with `woff2` in `@font-face`.

## Reference icon (one valid answer)

```jsx
export default function CalendarIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}
```

## Common weak submissions

- `<img src="src/assets/logo.png" />` — a hard-coded source path; breaks in production.
- Exported PNG icons instead of inline SVG.
- Hyphenated SVG attributes (`stroke-width`) copied from an export.
- `wght@100..900` when only two weights are used.
- Descriptive `alt` on decorative images.
- `answers.md` Q6 with no sizes or status codes — evidence they did not open Network.

## Grading stance

The transferable skills are **choosing the right home for an asset**, **reading a failed load**, and **weighing bytes like a designer with a budget**. Reward learners who can explain *why* a file is where it is and who bring real Network-panel numbers. A component that loads correctly and is light beats a prettier one that ships multi-megabyte assets. Treat a hard-coded `src` path as the teachable moment it is, not a character flaw.
