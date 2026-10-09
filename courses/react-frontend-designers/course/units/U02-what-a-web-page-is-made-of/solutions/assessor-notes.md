# U02 Assessor notes — assessors only

Do not link this file from learner-facing materials.

## Model answer sketch

**Q1:** Any original metaphor that keeps the roles straight. E.g., "HTML is the list of ingredients; CSS is the plating." HTML = structure/content (what is there). CSS = presentation (how it looks). Penalize only inverted roles or a copy of the lesson's skeleton/skin metaphor. If the metaphor is original but one role is fuzzy, award ~1.5.

**Q2:** Model: "The DOM is the browser's live map of the page — everything you drew, organized as a tree, that the browser updates. It is built from the HTML but is not the HTML file itself." Accept "structured model/tree of the page the user actually sees."

**Q3:** Tree because HTML nests: elements contain other elements. Parent = contains; child = contained; sibling = share the same parent. Example sentence: "The heading and paragraph are siblings because both are children of main."

**Q4:** View Source = raw HTML text the browser received. Elements = the live processed DOM. They differ once scripts or the browser change the page (dynamic content, injected elements). Full credit needs a valid differing reason, not just "they're the same."

**Q5:** "Pick a target (like a heading), then describe its look (color, size)." Accept variations. If the learner says CSS "creates the text" or "adds the content," correct and dock.

**Q6:** Must show a real prediction and a real observed result. A wrong prediction with a specific surprise ("I expected 3 children, found 5 including hidden ones") is excellent. A fabricated answer (claims a DOM shape that contradicts the site) earns 0. Reflection is required for full marks.

**Q7:** The learner used the browser's "Save as" (saves a file) instead of "View Page Source." Fix: choose **View Page Source**, or use the shortcut (Windows/Linux Ctrl+U; macOS Safari Cmd+Option+U). The file they saved wasn't HTML because "Save as" saves the resource, not always its source.

## `tree.md` model expectations

A valid tree has, e.g.:

```text
main
 ├─ header
 │   ├─ h1 → page title
 │   └─ nav → links
 ├─ section
 │   ├─ h2 → section title
 │   └─ p  → body text
 └─ footer
     └─ p  → copyright
```

- `main` is a parent with 3 children (`header`, `section`, `footer`).
- `header` has children (`h1`, `nav`), which are grandchildren of `main` — satisfies the grandchild requirement.
- Classification: `img`, `br`, `input`, `meta`, `link` stand alone; `div`, `p`, `h1`–`h6`, `ul`, `li`, `a`, `button` hold content. (`a` and `button` hold content despite sometimes looking simple.)

Reject invented tag names: `<box>`, `<card>`, `<text>`, `<container>`, `<image>` (the HTML tag is `<img>`). These indicate the learner did not actually inspect.

## Common weak submissions

- Tree is a flat list with no nesting (no parent/child structure).
- Uses "parent/child/sibling" backwards.
- Claims View Source and Elements are the same thing.
- Q5 says CSS holds the text/content.
- Tag names clearly invented rather than read from DevTools.

## Common wrong-but-thoughtful answers (partial credit)

- Calls the DOM "the HTML of the page" — close but imprecise. Explain that the DOM is the browser's live model built from the HTML; award partial (1–2/3) for Q2.
- Tree uses a CSS layout idea ("this div is a sibling because it sits next to it") — visual position, not nesting. Gently bridge: siblings share a parent, not necessarily a horizontal position.
