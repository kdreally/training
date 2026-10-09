# AGENTS.md — React.js Frontend for Designers

Course-specific teaching doctrine. The shared doctrine in the repo root applies in full; this file adds the mission, audience assumptions, and curriculum map.

## 1. Mission

Take a **designer** — someone who thinks in visual composition, spacing, and interaction — to **building real, working interfaces in React**. By the end, the learner can assemble a small React app from components, map their design decisions to props and state, and hand off or ship a static frontend. The course never assumes a software-engineering background; it translates between design language and React language constantly.

## 2. Who the learner is

- A practicing or aspiring designer (Figma/Adobe tools comfortable) who is curious about code.
- Little to no programming experience. Has maybe pasted a snippet into a site builder before.
- Terrified of the terminal and of red error text. Needs the environment earned slowly.
- Strong intuitions about layout, hierarchy, color — leverage them deliberately.

### Never assume they know

| Term | Why it is often wrongly assumed |
|------|----------------------------------|
| What HTML and CSS actually do (vs tools that generate them) | Design tools hide the markup |
| What JavaScript is | "Just add this script" from tutorials |
| What a component is | Sounds like a part of a car |
| What props are | Designers have *layers*, not props — bridge this |
| What state is | The screen changing is a design decision, not data |
| What JSX is | HTML-looking text inside code is confusing at first |
| Why `npm` exists | Everything arrives by magic |
| What the DOM is | Browser rendering is a black box |

## 3. Dependency chain (do not invert)

```
interfaces are built from parts
  → HTML gives those parts structure
    → CSS gives them look
      → the browser turns them into a page (DOM)
        → JavaScript can change the page
          → components name reusable parts
            → JSX lets us write components like markup
              → props configure a component like layer properties
                → state makes a component respond to events
                  → lists and conditions render dynamic content
                    → styling in React carries the design system over
                      → a finished app is built and hosted
```

## 4. Curriculum map

### Phase 0 — Orientation
| ID | Unit focus |
|----|------------|
| U00 | How this course works; how assessment works |
| U01 | What React is; why a designer should care |

### Phase 1 — Foundations (HTML/CSS/JS just enough)
| ID | Unit focus |
|----|------------|
| U02 | What a web page is made of (tags, tree, DOM) |
| U03 | HTML as structure — the skeleton behind Figma |
| U04 | CSS as presentation — the box model, flexbox |
| U05 | JavaScript: values, variables, functions (tiny, with console) |
| U06 | JavaScript: arrays, objects, and `map` (the list workhorse) |
| U07 | JavaScript: arrow functions, destructuring, imports |

### Phase 2 — Running React
| ID | Unit focus |
|----|------------|
| U08 | Installing Node.js safely; verifying the install |
| U09 | What npm and a dev server are; creating a Vite project |
| U10 | The project folder tour (what to touch, what not to) |
| U11 | Writing your first component |
| U12 | JSX explained — markup inside JavaScript, demystified |

### Phase 3 — Components and data
| ID | Unit focus |
|----|------------|
| U13 | Props as component "design properties" |
| U14 | Composing components into a page |
| U15 | Rendering lists with `map` |
| U16 | Conditional rendering (show/hide by rule) |
| U17 | Events and state with `useState` |
| U18 | Forms and controlled inputs |
| U19 | Side effects with `useEffect` (light, honest scope) |

### Phase 4 — Styling and design
| ID | Unit focus |
|----|------------|
| U20 | Styling options in a React app (landscape, one recommendation) |
| U21 | Component-scoped CSS |
| U22 | Design tokens as props: color, spacing, radius |
| U23 | Responsive layouts in React |
| U24 | Accessibility: semantics, labels, contrast, focus |
| U25 | Assets: images, icons, fonts |

### Phase 5 — Interaction and polish
| ID | Unit focus |
|----|------------|
| U26 | Lifting state: sharing data between components |
| U27 | Context (light): avoiding prop tunnels |
| U28 | Custom hooks: naming a reusable behavior |
| U29 | Simple transitions and animation |
| U30 | Building a small page, end to end |

### Phase 6 — Shipping and craft
| ID | Unit focus |
|----|------------|
| U31 | Production builds explained (`npm run build`) |
| U32 | Hosting a static React app |
| U33 | Working with developers: handoff and review |
| U34 | Capstone: design a page, build it in React, host it |

## 5. Technical defaults

| Choice | Default |
|--------|---------|
| React tooling | Vite (create-vite) |
| Language | JavaScript JSX (no TypeScript in main path) |
| Styling | Plain CSS files per component; one shared token file |
| Package manager | npm |
| Editor | Any; VS Code suggested, not mandated |
| No paid tools | Optional comparisons mention Figma pricing honestly |
| Devices | Examples render fine on a 13-inch laptop screen |

## 6. Authoring rules for this course

- Translate every React concept to a design-tool concept first (props ≈ layer properties, state ≈ interactive prototype variables).
- Every terminal command is preceded by meaning, expected output, and one decoded failure.
- Reading error messages is a recurring micro-skill — dedicate practice to it.
- Keep CSS honest: we teach what a stylesheet is before styling components.
- The capstone must be buildable in an evening: one page, 3–6 components, one stateful interaction.
