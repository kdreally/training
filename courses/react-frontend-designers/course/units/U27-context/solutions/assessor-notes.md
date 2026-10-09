# U27 Assessor notes (solutions — do not link from learner README)

## Model answer sketch

**Q1 (prop drilling):** Passing a prop through components that do not use it, only to reach a descendant that does. It becomes worth fixing when the same value is needed by many components at different depths and it is a value that feels global to a region (theme, language, current user, shared tokens). Short chains and one-off props should still be plain props.

**Q2 (map):** A valid answer is an indented tree, e.g.:

```
App (owns theme, renders Provider)
 └── Page
      └── Layout
           └── Header
                └── ThemeToggleButton (reads theme)
```

The key: no `theme` prop on `Page`, `Layout`, or `Header`.

**Q3 (pieces):** `export const ThemeContext = createContext(...)`, `<ThemeContext.Provider value={...}>`, `useContext(ThemeContext)` (often destructured).

**Q4 (state vs context):** The state lives in `App` via `useState`; context is a distribution channel for that value and the function that changes it. The state is the single source of truth; the context is the phone line.

**Q5 (predict):** Removing the provider makes readers receive the context default. If the default is shaped like the real value (object with `theme` and no-op `toggleTheme`), the page still renders with the default theme and a button that does nothing. If the default is a bare string, destructuring `{ theme }` yields `undefined` and may crash.

**Q6 (when not):** Accept any two concrete cases, e.g.:
- Only one child needs it → pass a prop.
- Parent and child directly → pass a prop.
- A reusable component that should work anywhere → a prop keeps the dependency visible.
- A value that changes very often → a small scoped prop (or lifted state) avoids re-rendering every reader.

**Q7 (debug):** The provider value is `{ theme }`; there is no `toggleTheme`. The button's `onClick` is `undefined`, so clicking is silent. Fix: `value={{ theme, toggleTheme }}` where `toggleTheme` is defined in `App`. Accept a named toggle or the raw setter wrapped appropriately.

**Q8 (design bridge):** Strong answers map a file-level or global style (text style, color style, shared component) to a provider scoped to a region, and note the trade-off: strong reach, easy to over-apply. Weaker answers just say "styles are shared."

## Common weak submissions

- Context file also contains `useState` and exports a hook that owns the state, but the learner cannot explain where the state lives. (Some learners write `useState` *inside* a provider component — that is actually fine and common; assess the explanation, not the location, but note that the state is still in a component, not "in the context.")
- Provider wraps the entire app for a value only one page needs.
- Three components read the value, but all three are direct children of the provider connected by props anyway.
- `answers.md` claims context is "always cleaner than props."
- Reader moved outside the provider causes a crash and the learner cannot decode the error.
- Missing `toggleTheme` in the value; button silently does nothing.

## Common wrong-but-thoughtful answers

- "Context is React's global state." Close but scoped: it only reaches components inside the provider, and the *state* still lives in a component. This is the main conceptual correction.
- "I use context for everything now." Gently redirect to U26. Context is for region-wide values; props keep component dependencies honest and visible. This is exactly what question 6 measures.
- "I should put the provider at the very top so it always works." It works, but it broadcasts to the whole app and re-renders all readers on change. Scoping is better when possible.
- "The default value is the initial theme." No — it is a fallback for reading outside any provider. The initial value comes from `useState` in the provider component.
