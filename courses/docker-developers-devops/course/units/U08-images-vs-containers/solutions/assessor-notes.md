# U08 Assessor notes

## Model answer sketch

**Q1:** Image = recipe (instructions); container = baked instance.

**Q2:** Image layers read-only; container gets writable layer on top → changes go there, image unchanged.

**Q3:** Show `docker images` table, `docker ps` (maybe empty), `docker ps -a` with exited containers.

**Q4:** e.g. `myfirst-ubuntu` exited from `ubuntu:latest`.

**Q5:** Many containers from same image (each gets own writable layer).

**Q6:** `docker ps` filters running only; `-a` shows all states.

## Common weak submissions

- Says "image is running container".
- Thinks deleting image removes containers.
- Mixes up ps flags.