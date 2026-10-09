# U25 Assignment — Bringing assets into a component

Submit to your trainer in **one folder or zip** named `U25-YourName`.

You will build one small component that uses an image, an inline SVG icon, and a project font, and report what you learned from the Network panel.

## Files to submit

### 1. Your component (folder `component/`)

```text
component/
  YourComponent/
    YourComponent.jsx
    YourComponent.css
  icons/
    YourIcon.jsx
  App.jsx
```

- Pick your own subject: a `TeamMember`, `EventTile`, `RecipeCard`, `ProductHighlight`, or similar.
- Use **one image** imported from `src/assets/` (not `public/`) — a photo or illustration you are allowed to use. Free options include your own export or a public-domain image.
- Use **one inline SVG icon** as its own component with a `size` prop and `currentColor` stroke.
- Use the **project font** from `tokens.css`, loaded via `<link>` or `@font-face`.
- Give the image correct `alt` text (or an empty `alt` if it is genuinely decorative, explained in `answers.md`).

### 2. `answers.md`

1. **Folder choice.** Explain why your image lives in `src/assets/` rather than `public/`. Then name one asset type that would belong in `public/` and why.
2. **Import.** In your own words, what does an image `import` give you, and how do you use it in JSX?
3. **`alt` decision.** State your `alt` text and justify it (informative vs decorative).
4. **Icon.** Explain how `stroke="currentColor"` lets your icon match its surroundings. Include one React-specific attribute rule for SVG.
5. **Font.** State which method you used (link or `@font-face`), which weights you requested, and why you did not request more.
6. **Performance.** Open the Network panel, reload, and report: the image's size, the font file size(s), and whether any request returned a non-200 status. Name the largest asset and whether you would reduce it.
7. **Path reading.** Paste any 404 or build "failed to resolve" message you hit (or, if none, write the exact absolute-path form `public/` uses versus the relative form an import uses for a file two folders up).
8. **Design bridge.** State the typeface and weights you use in a design file, and list exactly which font files you requested in code.

### 3. `checklist.md`

```markdown
- [ ] My image is imported from src/assets/ and renders.
- [ ] My image has considered alt text (empty if decorative).
- [ ] My icon is an inline SVG component with a size prop.
- [ ] My icon uses currentColor and camelCase SVG attributes.
- [ ] My font is loaded and applied via a token.
- [ ] I requested only the font weights I use.
- [ ] I checked the Network panel for sizes and status codes.
- [ ] I read the U25 rubric before submitting.
```

## Definition of done

- The component renders the image, the icon, and the font correctly.
- No 404s in the Network panel for the assets you added.
- `answers.md` reports real observations from the Network panel.
- Written answers are in your own words.

## Predict-then-run requirement

Before checking the Network panel, predict the approximate size of your image file and which asset you expect to be the largest. Then verify and explain any surprise.
