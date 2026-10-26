# U44 — Integration tests: units working together

**Phase 5**

## Where you are

Unit tests cover pieces. **Integration tests** check that pieces cooperate.

## What you will be able to do

- Define integration test in course terms.
- Test route module + store together without full network if possible.
- Or test app modules wired, still focusing on collaboration.
- Know the cost: slower, broader failures.

## What you need already

- **U36**, **U41**

## Time and energy

**70–100 minutes.**

## Why this exists

All units green separately can still fail when wired. Integration tests catch “forgot to call store from route.”

## Plain-language teaching

### Integration test

Checks **multiple units together**: e.g. validation helper + store + route handler function.

Not necessarily the entire system with real network (that can be API/e2e).

### Example style

Export a handler or use Express `app` with a lightweight request helper (U45 deepens HTTP). For this unit, you may:

```javascript
// Pseudo-structure
test("creating a note via service layer lists it", function () {
  store.reset();
  notesService.create({ title: "A" });
  const list = notesService.list();
  assert.equal(list.length, 1);
});
```

If `notesService` wraps store + validation, testing it is integration-ish versus pure store unit tests.

### Granularity honesty

Industry names blur. In this course:

- **Unit** — one module, heavy isolation
- **Integration** — several of *your* modules together
- **API/HTTP test** — full HTTP contract (U45)

Label your files `*.integration.test.js` if helpful.

### Cost

Failures may not pinpoint the exact line. Still valuable.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Integration test | Multi-unit collaboration | Not only “with real DB” |
| Seam | Boundary between units | |
| Wiring | Connecting modules | |

## Worked example

Service create+list integration test above.

## Common errors

### Error: Duplicating every unit test at integration level

Pick collaboration risks, not clones.

### Error: No reset between tests

Same as unit tests — clean state.

## Checkpoints

1. Integration vs unit?
2. Example collaboration risk?
3. Cost of broader tests?
4. How does this differ from HTTP tests?

## Practice

### P1 — write ≥3 integration tests for notes service+store

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- Real external DB
- Docker

## Next unit

**U45 — Testing HTTP/APIs**
