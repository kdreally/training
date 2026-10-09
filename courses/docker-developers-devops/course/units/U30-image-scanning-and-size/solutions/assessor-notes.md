# U30 Assessor notes (assessors only)

Do not link this file from learner docs.

## Model answer sketch

**Q1:** Pull time grows with size (teammates/CI/deploys wait); disk and registry storage are finite; larger package sets widen the attack surface (more code with known CVEs).

**Q2:** Dangling = untagged (`<none>`), no container uses it; tagged-but-unused = has a name but no container uses it right now. Plain `docker image prune` removes dangling only.

**Q3:** `prune` = removes dangling; good routine weekly cleanup. `prune -a` = removes all images not used by a container, tagged included; good when you want a clean slate or to reclaim space and can rebuild/re-pull.

**Q4:** Smaller base (`python:3.12-slim`) — removes unneeded OS/tooling (U16/U27); multi-stage — removes build toolchain from final image (U16); `.dockerignore` — keeps large/unneeded files out of the build context (U13); optionally combine RUN + clean caches.

**Q5:** Look at the base image first; address CRITICAL then HIGH; check whether a fixed version exists; ignore LOW by volume until the rest is handled. 120 LOW findings are not null, but they are lower priority and often in the base image, so updating/shrinking the base can clear many at once.

**Q6:** Size drops substantially (Alpine is much smaller). Risk: package ABI/glibc-vs-musl differences; some Python/native packages fail to build or find no wheel on Alpine, needing extra build steps or failing outright.

**Q7:** `-a` removed the tagged image because no container was using it. Recovery: rebuild with `docker build` from its Dockerfile, or `docker pull` it again from the registry (U27).

## Common weak submissions

- Reporting only one size.
- Saying `prune` and `prune -a` are identical.
- Treating any scan finding as a mandatory personal failure.

## Grading discipline

Reward honest "build broke on alpine, here is the error" as strong evidence of real experimentation. Do not require a scanner install; Q5 reasoning is the real assessment target.
