# U28 Assessor notes (solutions — do not link from learner README)

## Model answer sketch

**Q1 (definition):** A custom hook is a JavaScript function whose name starts with `use` and which calls one or more React hooks. It packages stateful behavior so components can reuse it. It shares **behavior, not data**: each component that calls it gets its own independent state. It renders nothing.

**Q2 (before/after):** Any pair where inline repeated logic becomes a single hook call. Example "before": three lines of `useState` + open/close functions copied in two components. "After": `const [isOpen, toggleOpen] = useToggle(false);`.

**Q3 (rules):**
1. Call hooks only at the top level — not in loops, conditions, nested functions, or after an early return.
2. Call hooks only from React components or from other hooks.
Why order matters: React identifies each hook by its position in the sequence; if the sequence changes between renders, React matches values to the wrong hooks.

**Q4 (independence):** `useToggle()` called in `ComponentA` and `ComponentB` produces two separate `useState` values. `useState` is per-component-instance; a hook is just a call wrapper, so each call site gets its own state. They do not share because no single value is stored outside the components.

**Q5 (predict/run):** `useLocalStorage` should survive a reload because the value is written to `window.localStorage`. Good answers note the lazy initializer reads storage once on mount.

**Q6 (debug):** The `useState` for `middle` is inside `if (hasMiddleName)`. Fix by always calling it at the top:

```jsx
export function useName(hasMiddleName) {
  const [first, setFirst] = useState("");
  const [middle, setMiddle] = useState("");
  return hasMiddleName ? middle : first; // or return an object
}
```

Partial credit if they identify the conditional hook but the fix still nests a hook.

**Q7 (error reading):** Expected message family: `React Hook "useState" is called conditionally. React Hooks must be called in the exact same order in every component render.` Decoded meaning and fix should match rule 1.

**Q8 (design bridge):** Strong answers name a repeated pattern (hover treatment, modal shell, form row) and connect "define once, reuse everywhere" across design and code.

## Common weak submissions

- Module-level variable used to "share" state between callers; the values leak across components.
- Hook named without `use` (e.g. `toggleState`), losing lint protection.
- Hook that is really a component (returns JSX) but is named `useSomething`.
- One hook only, reused in one place, with no independence shown.
- `useLocalStorage` storing an object without `JSON.stringify`, then crashing on read.
- Hooks placed after an early `return` in the containing component.
- `answers.md` restates headings without explaining.

## Common wrong-but-thoughtful answers

- "A custom hook is React's way of sharing state." Well-meant but wrong on the key point. Redirect: it shares logic; state stays per-caller. Sharing data is U26 (lifting) or U27 (context).
- "I should make a hook for every repeated line." Over-abstraction. If the logic is one trivial line and used once, a hook adds indirection. Note that naming needs a real repeat.
- "The rules of hooks are style suggestions." They are enforced by React's runtime and the linter because hook order is how React tracks state. Useful to explain via the "numbered stack of layers" idea.
- "I used `useEffect` to sync `localStorage`." Also valid and idiomatic; accept it if it is correct, but note the lazy-initializer approach reads storage without an extra render.
