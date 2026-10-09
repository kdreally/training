# U30 Assessor notes (solutions — do not link from learner README)

This unit integrates prior skills; there is little new syntax to key. Assess the **assembly**, not novelty.

## Model answer sketch

**Q1 (page plan):** Expected shape:

```
App (owns query)
├── Header (props: title; static)
├── FilterBar (props: value, onValueChange)
└── ProductGrid (props: products = filtered)
    └── ProductCard (props: product)
```

**Q2 (build order):** Accept any sensible staged order — static structure → data list → extract card → add filter state → tokens → responsive → a11y/motion — and a concrete ordering consequence. Good answers often cite checkpoint 4 (typing did nothing) or the `map`/`key` warning.

**Q3 (data flow):** `query` is created in `App` with `useState`. It flows down to `FilterBar` as `value`, changes flow up via `onValueChange` (the setter), and the filtered array flows down to `ProductGrid` as `products`. `ProductCard` receives one product.

**Q4 (derived data):** The filtered list is computed each render from `query` + `PRODUCTS`. It is not stored, to avoid a second source of truth that can drift.

**Q5 (tokens):** Any three from the token file (color, space, radius). Benefit: one edit updates everywhere; consistency; themeable.

**Q6 (responsive):** Grid uses `repeat(auto-fit, minmax(220px, 1fr))` (or media queries); at narrow widths it drops to one column with no horizontal overflow.

**Q7 (a11y):** Any two: `<label htmlFor>` tied to input `id` (clicking label focuses input; announced purpose); `<section aria-label>`; `<article>` + `<h2>` per card (heading navigation); meaningful `alt`; visible `:focus-visible` ring.

**Q8 (predict/run):** Concrete prediction with value and result. E.g. `"la"` → "Desk lamp", "Floor lamp". Case-insensitivity via `toLowerCase` should be noted.

**Q9 (error reading):** Common genuine issues: `key` warning; 404 for images; `Cannot read properties of undefined (reading 'toLowerCase')` from a data typo; a controlled-input frozen state. Full credit for message + cause + fix.

**Q10 (design bridge):** Strong answers connect stage-by-stage building (a working draft after each stage) to presenting a review at each milestone rather than one giant reveal — catching problems early, keeping feedback grounded in something real.

## Common weak submissions

- All logic in one giant `App` component; no card extraction.
- `FilterBar` holds its own `useState` and filters locally, so the grid and input disagree.
- Filtered list stored in `useState` and synced with `useEffect`.
- `key={index}` in the mapped list.
- Tokens defined but not actually used in CSS (hard-coded hex values remain).
- Fixed three-column grid that squeezes instead of reflowing.
- No label on the input; `alt=""` on meaningful product images; `outline: none` with no replacement.
- No reduced-motion rule.
- `answers.md` restates the lesson rather than describing their own build.

## Common wrong-but-thoughtful answers

- "I stored the filtered list in state so it updates only when I want." Understandable, but it is a second source of truth. It can drift and causes an extra render. The derived approach is the taught default; note `useMemo` as an optional optimization only.
- "I used `key={index}` and it looks fine." It often does until the list filters or reorders, at which point React reuses the wrong DOM node and stale details flash. The P5 exercise demonstrates this.
- "Responsive means the cards get smaller." No — reflow means the number of columns changes; shrinking alone will overflow or squash.
- "I removed the focus outline because it looked messy." That breaks keyboard use. Provide a clear custom focus style instead.
- "My page has one component because it was fastest." Integration is about composition; a monolith bypasses the skill being assessed. Note the card-extraction and single-responsibility criteria.

## Grading quick pass

1. Run it. Does typing filter? Does it reflow narrow? Do cards lift (and not under reduced motion)?
2. Read `App.jsx`. Is state in the right place? Is the list derived?
3. Grep the CSS for hard-coded hex and for `prefers-reduced-motion`.
4. Check the input for a label and images for `alt`.
5. Read `answers.md` for genuine personal process.
