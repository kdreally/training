# U12 Assessor notes

Assessor-only. Do not link from the learner README.

## Model answer sketch

**Q1:**
- `FROM` — picks the base image to build on; build time.
- `WORKDIR` — sets the working folder inside the image and creates it if missing; build time (it also affects the container's start directory).
- `COPY` — copies files from the build context into the image; build time.
- `RUN` — executes a command while building and saves the result; build time.
- `CMD` — the default command for a container; run time.
- `EXPOSE` — documents the intended port; metadata (neither executes at build nor run).

**Q2:** `RUN` runs during the build and its result is frozen into the image. `CMD` is recorded and runs when a container starts. If a server is started with `RUN`, the build waits for a process that never exits, so the build hangs (or times out) rather than producing an image.

**Q3:** `EXPOSE` is a hint/metadata; it does not publish the port. `-p 8080:8000` publishes host port 8080 to container port 8000 (left is host, right is container).

**Q4:** Copying the dependency list first and installing before copying source lets Docker cache the (slow) install layer and reuse it when only source changes. Full credit for a reasoned guess; U15 confirms.

**Q5:** `ENTRYPOINT` is the fixed program the container runs; `CMD` provides default arguments to it. With `ENTRYPOINT ["python"]` and `CMD ["app.py"]`, the container runs `python app.py`.

**Q6:** Typical error is `ModuleNotFoundError: No module named '<pkg>'` at run time. Correct decoding: the dependency was not installed into the image (removed from the list or the install step did not run), so the code cannot import it.

## Partial credit guidance

- Accept any working app and base image. A Node learner using `node:20-slim`, `CMD ["node","server.js"]` is fully valid.
- Q1 is the diagnostic: if they mark `CMD` as build time, they have not separated the two phases and need a nudge before U15.
- Q3: many learners say `EXPOSE` "opens the port." Award 1/2 and require the correction, because U18 depends on this being clear.

## Common weak submissions

- Dockerfile uses `RUN python app.py` and the build hangs; learner "solves" it by Ctrl-C and reports success anyway.
- Uses `EXPOSE` and expects the browser to reach the app without `-p`.
- `COPY` paths relative to the learner's home folder rather than the context, so the build fails on the trainer's machine.
- Evidence shows a build error but no successful rebuild.
- Q6 error is pasted but described as "it didn't work" with no diagnosis.

## Red flags for a trainer conversation

- Learner believes `EXPOSE` publishes the port. Flag clearly before U18.
- Learner cannot distinguish build from run after this unit. Consider a short re-teach using the cooking metaphor before continuing to U13.
