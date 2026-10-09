# U21 Assignment — A component with its own stylesheet

Submit to your trainer in **one folder or zip** named `U21-YourName`.

You will build a small styled component and explain your choices. Keep it small: one component, one stylesheet, one using file.

## Files to submit

### 1. Your component (folder `component/`)

Create a component folder using the course layout. Use **your own component idea** — it must not be the Card from the lesson. Good options: a `ProfileChip`, a `PriceTag`, an `EventBadge`, a `StatTile`. Pick one with at least a title and one other part.

Required contents:

```text
component/
  YourComponent/
    YourComponent.jsx
    YourComponent.css
  App.jsx
```

- `YourComponent.jsx` must `import "./YourComponent.css";`.
- It must accept **at least two props** (one text prop and one optional variant prop that toggles a modifier class).
- `YourComponent.css` must follow the naming convention: every class starts with the component's prefix, using `__` for elements and `--` for the modifier.
- `App.jsx` renders the component **twice**: once default, once with the variant prop set.

If you have a Vite project from U09, drop these files into it and confirm it runs. If you do not, submitting the three files is enough; note that in `answers.md`.

### 2. `answers.md`

Answer in your own words:

1. **Import.** In one or two sentences, explain what `import "./YourComponent.css";` does and what it does **not** do.
2. **Naming.** List every class you created. For each, label it block, element, or modifier, and explain why the prefix prevents collisions.
3. **Collision scenario.** Describe a realistic way your class names could have collided with another component if you had used bare names like `.title`.
4. **Inspection.** Open Developer Tools (F12), select your variant instance, and describe which two classes you see applied and one property that came from the modifier.
5. **Design bridge.** Map one of your design-tool components to your class names (block = component, elements = inner parts, modifiers = variants). Use your own design vocabulary.
6. **Reflection.** Name one thing that was harder than expected and how you resolved it (or what you are still unsure about).

### 3. `checklist.md`

Copy and mark each item `[x]` when true:

```markdown
- [ ] My component and stylesheet live in the same folder.
- [ ] I imported the stylesheet in the component file.
- [ ] Every class starts with my component's prefix.
- [ ] I used `__` for elements and `--` for the modifier.
- [ ] The variant prop changes the class string, verified in the browser.
- [ ] I checked the browser for console warnings.
- [ ] I read the U21 rubric before submitting.
```

## Definition of done

- The component renders twice in `App.jsx`; the variant instance visibly differs.
- The stylesheet imports correctly and there are no console errors.
- Class names follow the convention consistently.
- All written answers are in your own words.

## Predict-then-run requirement

Before you run your component, write in `answers.md` the exact `className` string you expect on the rendered root element for both instances. Then run and confirm. If your prediction was wrong, say what you had wrong.
