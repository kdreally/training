# U23 Assessor notes

Assessor-only. Do not link from learner materials.

## Model answer sketch

**Q1 — Terms:**
- **Main axis:** the direction flex items flow, set by `flex-direction` (`row` by default).
- **Cross axis:** perpendicular to the main axis; `align-items` acts on it.
- **Breakpoint:** a viewport width at which the layout rules change (e.g. 640px).

**Q2 — Media query:** a correct paste plus a clear explanation, e.g. "At 640px and up, the row changes from column to row, wrapping is enabled, cards aim for 260px and grow to fill, and the gap increases to the medium token."

**Q3 — Mobile-first:** most traffic is small screens; writing small-first means base styles serve the majority, and each `min-width` block only describes the delta, keeping CSS short.

**Q4 — Fluid vs fixed:** e.g. cards should be fluid (`flex: 1 1 260px`) because the available width varies; an avatar should be fixed (`48px`) because it is an identity element that should not stretch.

**Q5 — CSS vs React:** the browser already knows the viewport width and evaluates media queries quickly, even before JS runs; React branching by screen size is slower and more fragile, so it is reserved for genuinely different components.

**Q6 — Inspection:** any plausible observed width near the chosen breakpoint (allowing for scrollbar rounding). The point is that they observed it, not that it is exact to the pixel.

**Q7 — Design bridge:** e.g. "Mobile frame 360px = one column; tablet frame 768px = two columns; desktop frame 1024px = three columns," matched to `min-width` breakpoints.

## Reference CSS (one valid answer)

```css
.cardRow {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

@media (min-width: 640px) {
  .cardRow { flex-direction: row; flex-wrap: wrap; gap: 16px; }
  .cardRow > * { flex: 1 1 260px; max-width: 100%; }
}

@media (min-width: 1024px) {
  .cardRow > * { flex-basis: 300px; }
}
```

## Common weak submissions

- Fixed-width columns, no wrap, no reflow.
- `max-width` desktop-first queries, contradicting the lesson.
- A typo in the media query that disables it silently.
- Horizontal scroll at 360px from a fixed width or long unbroken text.
- `answers.md` repeats definitions without reporting their own test.

## Grading stance

The transferable skill is: **design adapts by rules, not by guesswork.** A simple layout that genuinely reflows cleanly at the shared breakpoints is worth more than an elaborate layout that breaks at 360px. Reward consistent breakpoints and fluid thinking. Where a learner used `max-width` coherently but ignored the requested mobile-first approach, note the trade-off rather than treating it as a moral failure — but the row should reflect the miss.
