# shelf

A small library-loan tracker. It is the running example for the course **AI in the Software Development Life Cycle**.

It is not a product. It exists so every unit can point at the same files.

## What it does

- `src/books.js` holds two books and `findBook`.
- `src/loans.js` lends a copy, takes it back, and lists active loans. Data lives in memory.
- `src/server.js` exposes `GET /loans` only.
- `test/loans.test.js` checks the loan functions with Node's built-in test runner.

There is no database, no framework, and no npm dependency.

## Run the tests

From this folder, with Node.js 20 or newer:

```text
npm test
```

Success is a passing test report. A failure means a loan rule broke, not that you failed as a person.

## Course note

Early units quote the pieces they need, so you can read them without this folder. From U10 onward you will write an `AGENTS.md` beside this code. Do not add that file to the example until the unit asks for it.
