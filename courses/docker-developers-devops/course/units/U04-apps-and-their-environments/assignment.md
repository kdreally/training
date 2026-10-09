# U04 Assignment — The environment spec

Submit the following to your trainer in **one folder or zip** named:

`U04-YourName` (use your real name or student id as they prefer)

## Files to submit

### 1. `environment-spec.md`

Choose one small app: the `app.py` from the lesson, or any small app you have used (a to-do list, a calculator, a static site generator). Write an **environment spec** for it. Use these headings and fill each one in:

```text
Runtime:              (name + version, e.g. Python 3.11)
Libraries:            (at least two)
Manifest / lockfile:  (the file that lists dependencies)
Configuration:        (at least two settings or environment variables)
Port:                 (the number the app listens on, or "does not listen")
OS bits:              (one OS-level thing the app relies on)
```

Below the spec, answer these prompts in your own words:

1. **Explain in your own words.** Define *runtime*, *dependency*, *environment variable*, and *port* as if to a friend who is not technical.
2. **Predict then read.** A teammate runs the app and sees `ModuleNotFoundError: No module named 'flask'`. Write your prediction of what went wrong *before* re-reading the lesson. Then write what the lesson says it means. Note whether you matched.
3. **Two failures.** Describe one failure caused by a **missing library** and one caused by a **port already in use**. For each, write the kind of error message you would expect and the first thing you would check.
4. **Why drift happens.** In 3–5 lines, explain why two machines running "the same app" can still behave differently. Use at least three of the five environment parts from the lesson.
5. **The flawed reasoning.** A teammate says, "It crashes, so I reinstalled everything; it still crashes, so the code is broken." Write two or three sentences explaining what is wrong with that reasoning.

### 2. `checklist.md`

```markdown
- [ ] I read the whole U04 README, not only the assignment.
- [ ] My environment spec names a runtime and at least two libraries.
- [ ] I can explain runtime, dependency, environment variable, and port.
- [ ] I wrote my Q2 prediction before re-reading the lesson.
- [ ] I read the U04 rubric before writing environment-spec.md.
```

## Definition of done

- Both files present with the exact names above.
- The spec is complete: runtime, two libraries, a manifest, two configuration values, a port, and one OS bit.
- `environment-spec.md` answers all five prompts in your own words.
- The prediction in Q2 appears before its explanation.
- The checklist is completed honestly.
