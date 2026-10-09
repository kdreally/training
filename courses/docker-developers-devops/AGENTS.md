# AGENTS.md — Docker for Developers & DevOps

Course-specific teaching doctrine. The shared doctrine in the repo root applies in full; this file adds the mission, audience assumptions, and curriculum map.

## 1. Mission

Take a learner from **"it works on my machine" frustration** through **confident use of Docker**: running containers, building images from real Dockerfiles, composing multi-service apps, pushing to registries, and understanding how containers fit into developer and DevOps workflows. Success means they can containerize a small app themselves, read any Dockerfile or compose file, and explain what every running container is doing.

## 2. Who the learner is

- A developer or DevOps-curious learner with **some programming experience** but little or no container experience.
- May have run a `docker run` command once and copied a Dockerfile from Stack Overflow — without understanding it.
- Can use a terminal for basic navigation. Docker Desktop (or Docker Engine) is not yet installed or configured.
- Will build on a Windows, macOS, or Linux machine — call out differences when commands differ.

### Never assume they know

| Term | Why it is often wrongly assumed |
|------|----------------------------------|
| What a container *is* vs a virtual machine | Marketing blurred the difference |
| What an image is vs a running container | "docker run the image" sounds like one thing |
| What a registry is | `docker push` feels like magic |
| What a port is for | "-p 3000:80" looks like l33t speak |
| What a volume is | Data mysteriously "disappears" |
| What a Dockerfile instruction does | Copy-paste culture |
| Why `docker compose` exists | Three terminals running three things feels fine |
| What layers and cache are | Builds are magic and slow |
| What "production-ready" means for an image | Works locally is the only bar |

## 3. Dependency chain (do not invert)

```
the "works on my machine" problem
  → an app needs its environment
    → containers package the app AND its environment
      → an image is the recipe, a container is the running instance
        → Dockerfile is how we write the recipe
          → layers and caching explain build speed
            → volumes exist because containers are disposable
              → ports exist because containers are isolated
                → compose exists because real apps have several services
                  → registries exist so images can travel
                    → CI builds images automatically
                      → deployment runs containers somewhere
```

## 4. Curriculum map

### Phase 0 — Orientation
| ID | Unit focus |
|----|------------|
| U00 | How this course works; how assessment works |
| U01 | What we are building toward; honest scope |

### Phase 1 — Why containers exist
| ID | Unit focus |
|----|------------|
| U02 | The "works on my machine" problem |
| U03 | The terminal, deliberately (cd, ls/dir, commands) |
| U04 | Apps and their environments (dependencies, versions, OS bits) |
| U05 | Virtual machines vs containers (the honest trade-offs) |

### Phase 2 — Docker basics
| ID | Unit focus |
|----|------------|
| U06 | Installing Docker safely; verifying install |
| U07 | Running your first container |
| U08 | Images vs containers (the recipe/cake idea, precisely) |
| U09 | Pulling and running existing images from Docker Hub |
| U10 | Container lifecycle: start, stop, logs, exec, rm |

### Phase 3 — Building images
| ID | Unit focus |
|----|------------|
| U11 | What a Dockerfile is and is not |
| U12 | FROM, WORKDIR, COPY, RUN, CMD — each explained |
| U13 | .dockerignore and why build context matters |
| U14 | Tags and naming your images |
| U15 | Layers and build cache (why order matters) |
| U16 | Multi-stage builds: smaller, safer images |

### Phase 4 — Data and networking
| ID | Unit focus |
|----|------------|
| U17 | Volumes: keeping data alive beyond a container |
| U18 | Ports: letting the outside in |
| U19 | Container networking basics (localhost, bridge) |
| U20 | Connecting containers to each other |

### Phase 5 — Docker Compose
| ID | Unit focus |
|----|------------|
| U21 | Why one file beats four terminals |
| U22 | Your first compose file, line by line |
| U23 | A two-service app (app + database) |
| U24 | Environment variables and .env files (intro to secrets) |
| U25 | Compose lifecycle: up, down, logs, rebuild |

### Phase 6 — Registries and automation
| ID | Unit focus |
|----|------------|
| U26 | Images beyond your laptop: registries |
| U27 | Pushing and pulling from Docker Hub |
| U28 | Why automate image builds (CI idea) |
| U29 | A minimal GitHub Actions build (guided) |
| U30 | Image scanning and size hygiene |

### Phase 7 — Craft and capstone
| ID | Unit focus |
|----|------------|
| U31 | From image to service: what "deploy" means here |
| U32 | Orchestration survey: where Kubernetes fits (no deep dive) |
| U33 | Security habits: non-root users, minimal images, no secrets in layers |
| U34 | Debugging containers calmly |
| U35 | Capstone: containerize a real small app end to end |

## 5. Technical defaults

| Choice | Default |
|--------|---------|
| Docker product | Docker Desktop (macOS/Windows), Docker Engine (Linux) |
| Files | Dockerfile, `.dockerignore`, `docker-compose.yml` |
| Examples | small Python/Node web apps (already familiar to the audience) |
| Registry | Docker Hub for examples; any registry notes allowed |
| Shell | PowerShell on Windows; bash on macOS/Linux — show both where needed |
| Compose command | `docker compose` (v2 plugin), not legacy `docker-compose` binary |
| No cloud required | Everything runs locally; cloud is discussed, not required |

## 6. Authoring rules for this course

- Every `docker ...` command is preceded by: what it does, what success looks like, and one decoded failure.
- Prefer commands that produce visible output the learner can verify.
- When a flag appears (`-p`, `-v`, `-e`, `--name`), explain it in plain words first.
- Capstone (U35) must be achievable on a student laptop: one app, one database (if data is needed), one compose file.
