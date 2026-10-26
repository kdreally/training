# U15 Assignment — Translate a rough note

Submit `U15-YourName`.

## Files

### 1. `specs/return-all.md`

Translate this note:

```text
people keep returning books one at a time which is silly.
add a way to return all books for a borrower in one go.
should obviously talk to the database so we don't lose it on restart.
make the API RESTful and modern while you're there.
if they have no books, I guess error? or not. you decide.
use a solid library if the loop is annoying.
```

Include:

- an `Open questions` section (use it, or write `None` and justify in answers),
- a `Defaults chosen` section,
- the six spec headings from U13 (they may sit under the questions),
- examples using `b1` and `b2`,
- non-goals for the database, the "modern API," and the library.

You may decide the empty-borrower case yourself. Label it as a default.

### 2. `answers.md`

1. List each dangerous reading and the non-goal that kills it.
2. Name one thing you refused to ask a stakeholder, and why it was yours to decide.
3. Say whether your spec is ready to implement today, or blocked. If it is ready, say who closed the last question.

### 3. `checklist.md`

```markdown
- [ ] I read the U15 README.
- [ ] The spec does not instruct the agent to connect to a database.
- [ ] I read the rubric.
```

## Definition of done

A reviewer can see your defaults without reading your mind, and can see that Postgres, express, and a utility library are refused.

## Submission format

```text
U15-YourName/
  specs/return-all.md
  answers.md
  checklist.md
```
