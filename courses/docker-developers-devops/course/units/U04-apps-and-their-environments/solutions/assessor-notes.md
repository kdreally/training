# U04 Assessor notes

Assessor-only. Do not link from learner documents.

## Model answer sketch

**Spec (example for the lesson app):**
```text
Runtime:             Python 3.11
Libraries:           flask, werkzeug (flask's own dependency)
Manifest / lockfile: requirements.txt
Configuration:       PORT (default 5000), and a database URL if one existed
Port:                5000
OS bits:             reading environment variables; opening a network port
```

**Q1:**
- runtime = the engine that runs the code (Python, Node.js, JVM, .NET).
- dependency = anything the app needs to run (runtime, libraries, system tools).
- environment variable = a named setting passed to the program from outside its code.
- port = a numbered door where the app listens for network traffic.

**Q2:** `ModuleNotFoundError: No module named 'flask'` means the Python runtime started and then could not find the `flask` library. The runtime is present; a library is missing. Fix: install from `requirements.txt`. The error does **not** mean Python is missing.

**Q3:**
- Missing library → `ModuleNotFoundError` / `ImportError`; first check: is the library installed, and at the right version?
- Port in use → `Address already in use` / `EADDRINUSE`; first check: which other program is listening on that port.

**Q4:** Any three or more of: runtime version, library versions, OS bits, configuration, ports. The point is that "the same app" does not pin down any of these.

**Q5:** Presence is not the same as matching. Reinstalling gets current versions, which may differ from the other machine. The goal is a matching, reproducible environment, not merely an installed one. The crash does not by itself prove the code is broken.

## Common weak submissions

- Spec leaves version numbers blank or writes "latest."
- Port line says "yes" instead of a number.
- Q1 describes a runtime as "the thing that makes code work" with no concrete example.
- Q3 treats `Address already in use` as a code bug.
- Q4 lists the five parts without explaining drift.
- Q5 conclusion is "the code must be broken after all."

## Common wrong-but-thoughtful answers

- Choosing a non-web app and writing "does not listen" for the port. Correct and rewarded; not every app has a port.
- Q2 predicting "Python is not installed." This confuses runtime-missing with library-missing. Award partial and point to the exact wording: `No module named` names a *module*, not the interpreter.
- Claiming `0.0.0.0` is a port. It is a host address; award partial if the learner recognises it as network-related and correct it for U18.

## Signals to watch

- A learner who cannot separate runtime from library may have skimmed. Ask them to cover the vocabulary table and re-explain.
- A learner who writes a genuinely consistent spec for a real app of their own is ready for U05; note it positively.
- Watch for learners describing ports as "the website." That is a common bridge idea; acknowledge and refine.
