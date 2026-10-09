# U26 Rubric

Visible to learners. Total **20 points**. "Must-have" criteria decide pass/fail; nice-to-have criteria improve the mark but do not sink it.

| Criterion | Points | Must-have? | Evidence |
|-----------|--------|------------|----------|
| Explains the local-only problem with at least two concrete consequences | 3 | Yes | `answers.md` Q1 |
| Correctly defines registry, repository, namespace, tag | 4 | Yes | `answers.md` Q2 |
| Decodes `ghcr.io/acme/shopping-list:1.2` and expands `nginx:1.27` correctly | 4 | Yes | `answers.md` Q3 |
| Names Docker Hub plus two other registries with a sensible use case each | 3 | No | `answers.md` Q4 |
| Explains login + access token + why public pulls need no login | 3 | Yes | `answers.md` Q5 |
| Corrects the "registry" misconception about a repository/name | 1 | No | `answers.md` Q6 |
| Registry map complete and correct for all five names | 2 | Yes | `registry-map.md` |
| Files named correctly; checklist present | 0 | Yes | folder/zip structure |

## Partial credit notes (assessors)

- Q2: award 2/4 if registry and repository are right but namespace/tag are blurred.
- Q3: award 2/4 if the ghcr name is decoded but `nginx:1.27` is not expanded to include `docker.io/library`.
- Q5: award 1/3 if they say "login is how you use Docker" without the identity/permission idea.
- Registry map: `nginx:1.27` and `ubuntu:24.04` are the tell — both are remote (`docker.io/library/...`).
- Do not penalize imperfect English. Penalize copy-pasted definitions with no personalization.

## Common wrong-but-thoughtful answers

- Calling `docker.io` a "website" rather than a registry — partial credit if the rest is right.
- Believing `latest` is always the newest image — understandable (U14 covers this); do not mark down here, but note it for U27.
