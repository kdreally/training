# U46 — Test doubles (gentle): stub/fake/mock

**Phase 5**

## Where you are

Sometimes a real dependency is slow, nondeterministic, or external. **Test doubles** stand in — only when pain is real.

## What you will be able to do

- Define stub, fake, mock in plain language (course-simple).
- Replace a time/email dependency with a fake in a unit test.
- Know when *not* to mock (prefer real in-memory store).
- Avoid mock-heavy tests that assert nothing useful.

## What you need already

- **U41**, **U44**

## Time and energy

**60–90 minutes.**

## Why this exists

Mock culture can become theater. We introduce doubles as **tools for specific pains**.

## Plain-language teaching

### The problem

Function `sendWelcome(user, mailer)` should call mailer. Real mailer sends email — bad for automated tests.

### Double

A **test double** is a stand-in for a dependency in tests.

| Kind (simple) | Idea |
|---------------|------|
| **Stub** | Returns fixed data |
| **Fake** | Working simplified implementation (in-memory DB) |
| **Mock** | Records how it was called; test asserts on calls |

Exact industry definitions vary; keep these practical.

### Example fake mailer

```javascript
function createFakeMailer() {
  const sent = [];
  return {
    sent: sent,
    send: function (to, subject) {
      sent.push({ to: to, subject: subject });
    }
  };
}

test("sendWelcome sends one email", function () {
  const mailer = createFakeMailer();
  sendWelcome({ email: "a@b.c", name: "Ada" }, mailer);
  assert.equal(mailer.sent.length, 1);
  assert.equal(mailer.sent[0].to, "a@b.c");
});
```

Design code to **accept dependencies as parameters** (injection) so tests can pass fakes.

### When not to double

- Your own in-memory store — use the real one
- Pure functions — no need
- When a fake becomes as complex as production

### Danger

Mocks that only verify “function was called” without checking outcomes can green while product is wrong. Prefer checking **results** and **meaningful interactions**.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Test double | Stand-in dependency | |
| Stub | Fixed response | |
| Fake | Simplified real behavior | |
| Mock | Call-centered double | Overused word |
| Injection | Pass deps in | |

## Worked example

Fake mailer above.

## Common errors

### Error: Mocking everything

Tests mirror implementation; refactors break tests without catching bugs.

### Error: No injection seam

If `sendWelcome` hardcodes real mailer, testing is painful. Refactor signature.

## Checkpoints

1. Why doubles exist?
2. Stub vs fake vs mock (course defs)?
3. When avoid mocking?
4. What is injection?

## Practice

### P1 — write a function with injected clock or mailer + tests

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- Sinon/Jest mock deep APIs
- Partial mocking modules by magic

## Next unit

**U47 — Test kinds map / pyramid**
