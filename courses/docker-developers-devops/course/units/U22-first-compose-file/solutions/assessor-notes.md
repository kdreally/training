# U22 Assessor notes

Assessor-only. Do not link from learner documents.

## Model answer sketch

**Q1:** `services` = top-level map of the containers to run; `build` = build an image from a Dockerfile in the given folder; `ports` = publish a host port to a container port; `environment` = set key/value variables inside the container.

**Q2:** `8081` is on the learner's machine (host); `8000` is inside the container. Reach it at `http://localhost:8081`.

**Q3:** `image:` says "run this already-existing image"; `build:` says "create the image now from a Dockerfile here." `build:` is what `docker build` did in Phase 3.

**Q4:** No rebuild needed for an environment change. Environment variables are applied when the container is created, not baked into the image (unless the Dockerfile itself set them at build time). Compose will stop and recreate the container with the new value.

**Q5:** The bug is indentation/placement. `web:` must be a child of `services:`, and `ports:` must be a child of `web:` at the same level as `image:`. Corrected:

```yaml
services:
  web:
    image: nginx:alpine
    ports:
      - "8080:80"
```

**Q6:** Compose creates a project-scoped network by default so services in the same project can reach each other by service name (U20). This removes the manual `docker network create` step.

## Expected artifacts

- `project/app.py` reading `GREETING` from the environment with a personalized default.
- `project/Dockerfile` with `FROM python:3.12-slim`, `WORKDIR`, `COPY`, `CMD`.
- `project/compose.yaml` with service `web`, `build: .`, `ports: ["8081:8000"]`, `environment: GREETING: ...`.
- `evidence.txt` showing real output.

## Common weak submissions

- `compose.yaml` uses `"8000:8081"` (ports reversed) — site unreachable at 8081; award port points 0.
- Service named `web` but `build: .` omitted, using an unrelated image.
- Evidence only shows `Ctrl+C` with no site request.
- Q5 fixed by deleting `ports` entirely instead of correcting indentation — partial credit only.
- Tabs used in YAML; file fails to parse.
- Personalized greeting only in `app.py` default, not passed via `environment` — acceptable if explained, but Q4/Q1 may reveal a misconception.

## Grading stance

Prioritize a project that genuinely runs and is reached. A working project with a slightly imperfect explanation is stronger evidence than polished prose with no successful run. Be strict on port direction and the `image`/`build` distinction, since U23 and U24 build directly on them.
