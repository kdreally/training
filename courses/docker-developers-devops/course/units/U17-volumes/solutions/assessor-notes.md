# U17 Assessor notes — Volumes

Assessor-only. Do not link from learner materials.

## Model answer sketch

**Q1:** A container has its own private, disposable filesystem. Anything written while it runs goes to its *writable layer*, which is destroyed together with the container on `docker rm`. The image contains none of it, so a fresh container does not see it.

**Q2:** Named volume = Docker-managed storage referred to by name; Docker picks the host location. Good for persistent data like a database. Bind mount = a specific folder on the host mapped in; you choose the path. Good for live-editing source or using an existing folder. Rule of thumb: named volume for Docker-managed data, bind mount when you must point at a folder you own.

**Q3:** Predicted/real output is `hello`. If the learner predicted something else, look for a correct explanation (for example, they thought `--rm` removed the volume — it does not; volumes outlive containers).

**Q4:** Accept any single, well-reasoned error. Strong answers:
- `sh: can't create /var/log/app.txt: Permission denied` → the container process runs as a user that does not own the mount; check the container's user, or the mount's ownership.
- `Error: No such volume: logs` / `volume name is too short` → the volume name is wrong or was never created; check `docker volume ls`.
- `Error response from daemon: ... is already in use` → a container still uses the name/volume.

**Q5:** Without a volume, the stored rows/files lived in the writable layer, so `docker rm` destroys them and the recreated container starts empty. With a named volume mounted at the database's data directory, the data lives in the volume; recreating the container reattaches the same volume and the data is still there. (U23 will do this in practice.)

**Q6:** Any concrete question is fine (e.g., "Where exactly is the Mountpoint on Windows?").

## Expected transcript shape (P5)

```text
docker run --name keeper -v keeper-data:/data alpine sh -c "echo saved > /data/out.txt"
docker rm keeper
docker run --rm -v keeper-data:/data alpine cat /data/out.txt
saved
```

The crucial evidence is the final line: `saved` printed by a *new* container.

## Common weak submissions

- Says "data is lost because containers are temporary" but never identifies the writable layer or the fix.
- Confuses volumes with ports or networks.
- Claims `docker rm` also deletes named volumes (it does not; `docker volume rm` does).
- Q3 prediction added after seeing the output with no note (subtract on Q3 only if there is clear evidence the "prediction" was written after the real output; otherwise accept).
- Repeats the lesson's worked example verbatim in `answers.md` instead of explaining.

## Common wrong-but-thoughtful answers (partial credit)

- Believes bind mounts are "the professional choice" and named volumes are "for beginners." Award Q2 partial (2/4); explain that the choice is about who should own the host path, not skill level.
- Thinks a stopped container has released its volume. It has not — the volume counts as "in use" until the container is removed. This is a good teaching moment, not a failure.
