# U27 Rubric

Visible to learners. Total **24 points**. Must-have criteria decide pass/fail.

| Criterion | Points | Must-have? | Evidence |
|-----------|--------|------------|----------|
| Real build → tag → push → pull → run round trip completed | 6 | Yes | `evidence.md` table |
| Evidence output is genuine and matches commands | 3 | Yes | `evidence.md` table |
| Explains that `docker tag` adds a name, not data | 3 | Yes | `answers.md` Q1 |
| Correctly distinguishes `denied` (permission) from `unauthorized` (not authenticated) | 4 | Yes | `answers.md` Q2 |
| Explains push speed using layers correctly | 3 | Yes | `answers.md` Q3 |
| Names three valid slimming techniques with what each removes | 3 | No | `answers.md` Q4 |
| Predict-then-explain on second push is reasoned, not guessed | 1 | No | `answers.md` Q5 |
| Corrects the broken pull command and explains why | 1 | No | `answers.md` Q6 |

## Partial credit notes (assessors)

- Evidence: award 3/6 if the round trip is attempted and honestly reported but blocked by a documented network error.
- Q2: award 2/4 if they say "one is login" without the distinction between *being* authenticated and *being permitted*.
- Q3: require the word "layer" to be used in a way that is actually true (matching layers are reused). Vague "Docker caches things" gets 1/3.
- Q4: any three of — smaller base (`slim`/`alpine`), multi-stage build, `.dockerignore`, removing caches, combining RUN steps.
- Q6: the uppercase namespace is the core error (`repository name must be lowercase`); accept the "if it is private I also need to log in" caveat.

## Common wrong-but-thoughtful answers

- "`denied` means the server is down" — confused, but shows they read the word literally; explain and do not penalize twice.
- Thinking `docker tag` copies the whole image and wastes disk — a very common, reasonable assumption; correct it in feedback.
