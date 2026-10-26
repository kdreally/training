# U16 Assignment — Write the hand-off

Submit `U16-YourName`.

## Files

### 1. `prompts/already-borrowed.txt`

Write a prompt that implements a spec at `specs/already-borrowed.md` (your U13 spec, or the behavior described in U13 if you do not have it in front of you). Use the four parts. Do not restate every example. Do not introduce HTTP, a new error string, or a dependency.

### 2. `answers.md`

1. Map each paragraph of your prompt to target, fence, verify, or stop.
2. Rewrite this bad prompt into your four-part shape. Put the rewrite in the answer, and list the smuggled decisions you removed.

```text
Can you just add the already-borrowed thing quickly? Make it RESTful,
use a normal status code library if needed, rename borrow to checkout
because that's cleaner, and don't bother with tests unless you have time.
Thanks, this is urgent for Sam.
```

3. Where should "rename `borrow` to `checkout`" go if the team actually wants it later? One paragraph.

### 3. `checklist.md`

```markdown
- [ ] I read the U16 README.
- [ ] My prompt is shorter than a full spec would be.
- [ ] I read the rubric.
```

## Definition of done

A teammate can tell what will be implemented, what must not change, how it will be checked, and when the agent must stop.

## Submission format

```text
U16-YourName/
  prompts/already-borrowed.txt
  answers.md
  checklist.md
```
