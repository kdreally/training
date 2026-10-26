# U25 — Scripts in `package.json`

**Phase 3**

## Where you are

Dependencies install. Teams also need **shared commands**: start the app, run tests. npm **scripts** name those commands.

## What you will be able to do

- Add `scripts` entries.
- Run them with `npm run <name>` and shortcuts like `npm start` / `npm test`.
- Explain why scripts beat memorizing long commands.
- Wire `start` to `node index.js`.

## What you need already

- **U23**, **U24**

## Time and energy

**40–60 minutes.**

## Why this exists

“How do I run this project?” should have an answer in `package.json`. Scripts are that answer.

## Plain-language teaching

### What a script is

Under `"scripts"` in `package.json`, keys are **names**, values are **shell commands**:

```json
"scripts": {
  "start": "node index.js",
  "hello": "node hello.js"
}
```

Run:

```bash
npm start
npm run hello
```

### Special shortcuts

| Command | Looks for script named |
|---------|------------------------|
| `npm start` | `start` |
| `npm test` | `test` |

Other names: `npm run <name>`.

### Why use scripts

- Documented entry points
- Same command on every OS machine in the team
- Later: `test` runs the test runner (Phase 5)

### PATH bonus inside scripts

npm scripts can run locally installed package binaries from `node_modules/.bin` without global installs. You will appreciate this when test tools arrive.

### Example project

`index.js`:

```javascript
console.log("started via npm");
```

`package.json` scripts:

```json
"start": "node index.js"
```

```bash
npm start
```

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| npm script | Named command in package.json | Not a JS function |
| `npm run` | Execute a script by name | |
| Lifecycle script | Special names like start/test | |

## Worked example

Add `"greet": "node greet.js"` and run `npm run greet`.

## Common errors

### Error: `Missing script: "start"`

No `start` key. Add it or use the correct name.

### Error: Script uses wrong path

Commands run with project root as cwd (usually). Keep paths relative to project root.

## Checkpoints

1. Where are scripts defined?
2. `npm start` vs `npm run start`?
3. Why scripts help teams?
4. What will `npm test` mean later?

## Practice

### P1 — start script

Wire and run.

### P2 — custom script

`npm run` something of your own.

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- Complex cross-env tooling
- CI pipelines

## Next unit

**U26 — Dev vs runtime dependencies**
