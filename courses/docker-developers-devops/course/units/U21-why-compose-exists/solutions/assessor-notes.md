# U21 Assessor notes

Assessor-only. Do not link from learner documents.

## Model answer sketch

**Q1:** Repetition of long commands; remembering network/volume/env names; start order; many terminals for logs; no single answer to "how do I run this."

**Q2:** Declarative = describe the desired result, not the steps. Valid analogies: packing list, recipe card, seating chart, blueprint. It fits when the list describes *what should exist*, and the executor figures out the order.

**Q3:** Any two of: not a Dockerfile replacement (Dockerfile builds one image; Compose uses images); not Kubernetes / not production orchestration; not a fix for a broken image; not a program.

**Q4:** `compose.yaml` (and `.yml`) is the modern name; `docker-compose.yml` is the older, still-supported name; same content. `docker compose` is v2 plugin (space); `docker-compose` is legacy v1 binary (hyphen).

**Q5:** Approximate commands should include a network (or assume one), `-e` for DB settings, `-v` for data, `-p` for the web app, and `--name`. Saving: one file holds all settings; one command starts everything; settings are reviewable and shareable.

**Q6:** "…I write what the app should look like, and Compose works out how to create it."

## Common weak submissions

- Q1 lists "it's a lot of typing" only — accept but cap at 2/4 unless three distinct pains appear.
- Q2 analogy that requires reading code to understand (e.g., "it's like a YAML file").
- Q3 claims Compose replaces Dockerfiles.
- Q4 treats `docker compose` and `docker-compose` as identical commands with no version distinction.
- `version-output.txt` invented (e.g., a made-up version with no tool installed). Look for real format `Docker Compose version vX.Y.Z`; a decoded error is acceptable.

## Grading stance

This unit tests conceptual understanding, not tool mastery. Be generous with partial credit for clear thinking expressed in plain language; be firm when key distinctions (file names, command versions, declarative vs imperative) are muddled, because later units depend on them.
