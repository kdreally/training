# U27 Assessor notes (assessors only)

Do not link this file from learner docs.

## Model answer sketch

**Q1:** `docker tag` attaches an additional reference (name) to the same image id; no image data is duplicated. `docker image ls` lists references, so two names → two rows, one image id.

**Q2:** `unauthorized` = the registry does not know who you are (no/invalid login). `denied` = the registry knows who you are but your account lacks write permission for that namespace/repository. First is about identity, second about permission.

**Q3:** Push uploads layers; any layer the registry already has (same content hash) is reported "Layer already exists" and is not re-sent. Only new/changed layers upload.

**Q4:** e.g. (1) smaller base image — removes OS packages you do not use; (2) multi-stage build — removes compilers/build tools from the final image; (3) `.dockerignore` — keeps big/unneeded files out of the build context and layers.

**Q5:** The base `python:3.12-slim` layer is unchanged → already exists. `app.py` and metadata change → pushed. Full push has all layers pushed.

**Q6:** `docker pull Sam-Demo/...` fails on uppercase: `invalid reference format: repository name must be lowercase`. Fix to `sam-demo/shopping-list:1.0`. Caveat: if the repository is private, they must also be logged in.

## Common weak submissions

- Evidence table filled with text copied from README instead of their own run.
- Claiming `denied` and `unauthorized` are the same.
- Saying slimming is "delete files after building" without a method.

## Grading discipline

Verify the digest format in `evidence.md` (`sha256:` + 64 hex chars) — a fabricated digest is an integrity flag. Do not fail a learner whose network blocked the push if they documented it honestly and completed `answers.md`.
