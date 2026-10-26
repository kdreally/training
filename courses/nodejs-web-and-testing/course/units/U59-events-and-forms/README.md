# U59 — Events and forms

**Phase 7**

## Where you are

You can change the DOM. Users **act**: click, type, submit. **Events** let JS react.

## What you will be able to do

- Attach click and submit listeners.
- Prevent full page reload on form submit.
- Read input values and clear fields.
- Update the list on each submit (local only; API next).

## What you need already

- **U58**

## Time and energy

**70–100 minutes.**

## Why this exists

UI without events is a poster. Playwright will later **fire** the same kinds of actions.

## Plain-language teaching

### Events

An **event** is something that happened: click, submit, keydown, load…

You **listen** with a function (handler):

```javascript
const button = document.querySelector("#go");
button.addEventListener("click", function () {
  console.log("clicked");
});
```

### Form submit

Browsers default to sending the form and **reloading** the page. For JS-driven UIs we often:

```javascript
const form = document.querySelector("#note-form");
const input = document.querySelector("#title");
const list = document.querySelector("#note-list");

form.addEventListener("submit", function (event) {
  event.preventDefault(); // stop full reload
  const title = input.value.trim();
  if (title === "") {
    alert("Title required"); // replace with nicer UI later
    return;
  }
  const li = document.createElement("li");
  li.textContent = title;
  list.appendChild(li);
  input.value = "";
  input.focus();
});
```

### `event.preventDefault()`

Stops the browser’s default action (here: navigate/reload on submit). Critical for SPA-like pages and for predictable Playwright tests.

### Input values

`input.value` is a string — same spirit as reading form data. Trim for validation.

### Local-only state

This unit may keep notes **only in the page**. Refresh loses them. Connecting to your API is **U60–U61**.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Event | Something that happened | |
| Listener / handler | Function that runs on event | |
| `preventDefault` | Cancel browser default action | |
| Submit | Form send attempt | Not only button click |

## Worked example

Type a title, submit, see list item, input clears.

## Common errors

### Error: Listening to button click only, not form submit

Enter key may not run your logic. Prefer form `submit`.

### Error: Forgetting preventDefault

Page reloads; list “resets”; feels like a bug.

### Error: Not trimming input

Whitespace-only titles sneak in (you know this from API validation).

## Checkpoints

1. What is an event listener?
2. Why preventDefault on submit?
3. How do you read the text field?
4. What happens on refresh with local-only list?

## Practice

### P1 — working local notes form

### P2 — show error message in a `<p id="error">` instead of alert

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- fetch/API
- Playwright

## Next unit

**U60 — fetch to your API; CORS idea**
