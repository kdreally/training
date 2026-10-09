# U14 Assessor notes

Assessor-only. Do not link from the learner README.

## Model answer sketch

**Q1:** `team-api` is the repository name; `1.4.2` is the tag. The tag is optional and defaults to `latest` when omitted.

**Q2 (any three):**
- `latest` moves — each build with `-t name:latest` overwrites what the name points to.
- Two machines can have different images both named `latest`, so "the same image" is not guaranteed.
- Rollback is ambiguous — you cannot go back to "the previous latest."
- `docker run name` silently picks `latest`, which may be older or newer than expected.

**Q3:** `1.4.2` is one exact release; `1.4` is the newest patch in the 1.4 line; `latest` is whatever was built last. Deploy the exact release (`1.4.2`), or an immutable identifier such as a commit hash, because it cannot be silently replaced. (`1.4` can shift when a new patch is pushed.)

**Q4:** Lowercase; allowed characters lowercase/digits/`. - _`; descriptive names; namespaces like `team/name`; meaningful tags (semver, date, commit hash). Any three.

**Q5:** `docker build -t` builds a new image and names it. `docker tag` adds another name/tag to an image that already exists; it does not build or copy.

**Q6:** Removing one of several tags just prints `Untagged: ...`; the image survives under the remaining tags. Removing the last tag deletes the image (if no container uses it). If a container references the image, `docker rmi` refuses with a conflict; remove the container first.

## Partial credit guidance

- The moving-target insight is the heart of the unit. A learner who only says "latest is bad" without the mechanism has not yet got it; award 1–2/4 and note.
- Accept reasonable naming schemes even if they differ from the lesson's. The criterion is coherence, not a specific scheme.
- If the learner uses `docker rmi -f` to bypass the conflict without understanding, award Q6 partial and flag it — the safety behaviour is the lesson.

## Common weak submissions

- Claims `latest` always points to the newest code.
- Believes `docker tag` creates a second copy, doubling disk usage.
- Thinks container names and image names are interchangeable.
- Deletes images with `-f` habitually and never sees the conflict message.
- Evidence has three tags but two different IMAGE IDs, indicating they rebuilt instead of re-tagging.

## Red flags for a trainer conversation

- Learner's team workflow relies entirely on `latest`. Flag this before U26 (registries) where it becomes a release problem.
- Learner forces removal of an in-use image without checking. Reinforce caution before U17 (volumes), where data can be at stake.
