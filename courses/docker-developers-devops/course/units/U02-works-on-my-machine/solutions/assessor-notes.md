# U02 Assessor notes

Assessor-only. Do not link from learner documents.

## Model answer sketch

**Q1:** Any coherent two-machine story works. The key marker is that both machines are described and a difference between them drives the failure.

**Q2:** Five parts: operating system, runtime, libraries, versions, configuration. A strong answer names which part caused the incident, not just all five. For the worked-example style failure (database unreachable), the culprit is usually **configuration** (missing `DATABASE_URL`) and sometimes the runtime/library versions.

**Q3:** Reinstalling produces whatever is current *today*, which may differ from what the other machine has. The goal is matching the environment, not merely having the software present. Version pinning is the real fix.

**Q4:** "connect ECONNREFUSED 127.0.0.1:5432" means the app tried to reach a database on the local machine at port 5432 and nothing answered. It is a *connection* failure, not an authentication failure.

**Q5:** Good drift questions: "Which runtime version does each machine use?" "Are dependencies pinned to exact versions?" "Are all required environment variables set on every machine?"

**Q6:** 
- environment = everything around the code that the code needs to run.
- version drift = two machines slowly ending up on different versions of the same software.
- reproducibility = getting the same result again and again, on any machine.

## Common weak submissions

- One-machine story: describes a failure but never shows a second machine's state, so no drift is demonstrated.
- Blames "the OS" with no specifics; misses configuration and versions.
- Q3 says only "they should reinstall" — the opposite of the lesson.
- Q4 prediction added after reading; check whether the "prediction" references details only visible in the decoded explanation.
- Q6 definitions copied verbatim from the vocabulary table.

## Common wrong-but-thoughtful answers

- Claiming the *code* is at fault because it "should not assume a database exists." This is defensible engineering opinion; award partial on Q2 and redirect: the lesson is about diagnosing mismatch, not app design.
- Predicting an authentication error instead of a connection error. Award Q4 partial — the reasoning about a missing database address is sound.

## Signals to watch

- A learner who cannot name the five environment parts likely skimmed; ask them to cover the vocabulary table and retry.
- A learner who reinstall-blames others may need the "separate work from person" point reinforced before group work.
