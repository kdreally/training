# U01 Assessor notes — assessors only

Do not link this file from learner-facing materials.

## Model answer sketch

**Q1:** "React is a JavaScript toolbox for building screens out of reusable pieces." Any phrasing is fine if it keeps (a) JavaScript/library/toolbox and (b) reusable parts. Synonyms for "parts" are acceptable **if the learner defines them**.

**Q2:** The maintenance/reuse pain: e.g., a button used in five places must be edited in five places by hand; a component edits once. Accept any concrete scenario. Reject abstract restatements of the lesson with no scenario.

**Q3:**
- Structure — what's inside (a heading, an icon, an input).
- Look — styling (color, spacing, radius).
- Behavior — what happens on interaction (a click opens something).
Good examples come from the learner's own design file.

**Q4:** Expect a design component/symbol, a layer style, or an auto-layout frame. The reason must name what makes it reusable — instances inherit the master, one edit propagates. Vague "it looks consistent" earns little.

**Q5:** Any two of: not a design tool, not a website builder, not a language, not a replacement for HTML/CSS. The confusion sentence must be plausible — e.g., "people expect it to draw screens like Figma."

**Q6:** Order: HTML structure → CSS look → browser turns it into a page → JavaScript changes the page → components name reusable parts. Reason: each layer depends on the one above; React speaks HTML/CSS underneath, so it must come after. (The lesson chain appears as interfaces → HTML → CSS → browser/DOM → JavaScript → components; accept the four-item subset ordered correctly.)

**Q7:** Aims: build a small static React page with a few components and one interaction; read/adjust an existing project; speak developers' vocabulary. Non-promises: becoming a full software engineer; databases/servers; large production apps alone.

**Q8:** Correct: no new component is needed. You keep one component and hand it different text/configuration. The learner need not say "props"; recognizing "configure, don't duplicate" is enough.

## `mental-model.md` model answer

**Learner A:** Wrong part = "React is a design tool like Figma / won't need design files." React does not draw or replace a design tool; you still make design decisions. React is a JavaScript library for turning those decisions into a working interface.

**Learner B:** Wrong part = "React replaces HTML and CSS / skip the foundation." React produces HTML and CSS in the browser and is built on top of them; skipping the foundation makes later units harder, not easier.

## Common weak submissions

- Restates the six words without translating them.
- "Component = a part of a car" style literalism with no bridge.
- Claims React can be learned without HTML/CSS, or that it replaces Figma.
- Q8 predicts a new component per variant (misses the whole reuse point).
- Copies the "What React is not" list verbatim from the README.

## Common wrong-but-thoughtful answers (partial credit)

- Calls React a "framework" (slightly wrong technically but shows understanding of "pre-made code"). Award full on Q1 if "reusable parts" is intact; optionally note the distinction.
- Design bridge naming a one-off element that is never actually reused. Explain the "reused in many places" test; partial credit.
