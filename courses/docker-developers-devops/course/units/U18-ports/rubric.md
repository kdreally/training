# U18 Rubric

Visible to learners. Total **20 points**.

| Criterion | Points | Must-have? | Evidence |
|-----------|--------|------------|----------|
| Distinguishes port (which program) from IP (which machine) | 3 | Yes | `answers.md` Q1 |
| Reads `host:container` correctly and traces a browser request | 4 | Yes | `answers.md` Q2 |
| Explains unreachability using isolation and publish | 3 | Yes | `answers.md` Q3 |
| Predicts `docker port` output correctly; runs it; explains any mismatch | 3 | Yes | `answers.md` Q4 |
| Decodes a real port-conflict error and gives a correct fix | 3 | Yes | `answers.md` Q5 |
| Transcript shows the unpublished state, then the published mapping and a reached server | 2 | Yes | `transcript.md` |
| Reflects honestly on a remaining confusion | 1 | No | `answers.md` Q6 |
| Files named correctly; checklist present and honest | 1 | Yes | folder structure |

### Partial credit notes (assessors)

- Q2: award 2/4 if they identify both numbers but cannot describe what a request to `localhost:6000` does (the request hits host port 6000, which forwards to container port 80).
- Q3: award 1/3 if they only say "ports must be published" without naming isolation as the reason.
- Q4: expected output is a mapping line such as `80/tcp -> 0.0.0.0:5500`. Award 1/3 if the prediction is missing but the run and real output are present; award 0 if no real run is shown.
- Q5: any real wording of the conflict message is acceptable (for example `bind: address already in use` or Docker Desktop's `Ports are not available`). Reward a fix that changes the host port or stops the other container.
- Q6: any concrete question is fine.
- Do not penalize imperfect English. Penalize empty answers or lesson text pasted back with no personalization.
