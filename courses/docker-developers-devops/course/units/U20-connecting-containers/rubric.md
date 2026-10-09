# U20 Rubric

Visible to learners. Total **20 points**.

| Criterion | Points | Must-have? | Evidence |
|-----------|--------|------------|----------|
| Explains the user-defined-network upgrade (embedded DNS) | 4 | Yes | `answers.md` Q1 |
| Gives the correct host/port (`db:5432`) and why `localhost` fails | 4 | Yes | `answers.md` Q2 |
| Explains embedded DNS and why IPs are not needed | 3 | Yes | `answers.md` Q3 |
| Predicts the cross-network failure, runs it, and explains it | 3 | Yes | `answers.md` Q4 |
| Decodes the `localhost` connection failure and fixes it | 2 | Yes | `answers.md` Q5 |
| Explains when to use `docker network connect` and how to undo it | 2 | Yes | `answers.md` Q6 |
| Transcript shows by-name success, localhost failure, database reachability, and connect | 2 | Yes | `transcript.md` |
| Reflects honestly on a remaining confusion | 1 | No | `answers.md` Q7 |
| Files named correctly; checklist present and honest | 1 | Yes | folder structure |

### Partial credit notes (assessors)

- Q1: award 2/4 if they say "you can use names" without mentioning Docker's embedded DNS being the reason the default bridge lacks it.
- Q2: award 2/4 if they give `db:5432` but cannot explain why `localhost:5432` fails. Award full only if the host/port is correct **and** the container-is-itself explanation is present.
- Q3: award 1/3 if they only say "DNS resolves names" without connecting it to not needing IPs.
- Q4: the written command omits `--network appnet`, so the honest real result is `ping: bad address 'cache'`. If the learner predicted success, the explanation should notice the missing `--network`. Award 1/3 if the prediction is absent but the run is present; award 0 if no run is shown.
- Q5: accept any sensible quoted log line; reward identifying that `localhost` is the app container and that the fix is to use the name `db`.
- Q6: key ideas: use `connect` when the container is already running; `docker network disconnect <network> <container>` undoes it.
- Do not penalize imperfect English. Penalize empty answers or lesson text pasted back with no personalization.
