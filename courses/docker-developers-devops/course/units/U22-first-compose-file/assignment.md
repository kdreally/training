# U22 Assignment — Your first compose file

Submit the following to your trainer in **one folder or zip** named:

`U22-YourName`

## What to build

A single-service Compose project based on the worked example, started and verified. Put your project files in a subfolder named `project/`.

## Files to submit

### 1. `project/app.py`

The Python web app from the README, with one change: the default greeting must include your name (for example `"Hello from Amina's Compose service"`).

### 2. `project/Dockerfile`

The Dockerfile from the README (unchanged is fine).

### 3. `project/compose.yaml`

A Compose file that:

- names the service `web`,
- builds from the local Dockerfile,
- publishes host port **8081** to container port **8000**,
- sets the environment variable `GREETING` to `Hello from <your name>`.

### 4. `evidence.txt`

Paste exactly what you did and saw, in this order:

- The command you ran to start the project.
- The `docker compose up` output lines that show the network/container being created.
- The command you used to reach the site (for example `curl http://localhost:8081`).
- The output that proves the site responded.
- The command and output for stopping and cleaning up.

A screenshot may be included as `evidence.png` **in addition to** the text, but the text is required.

### 5. `answers.md`

1. **Line by line.** Explain in your own words what each of these keys does: `services`, `build`, `ports`, `environment`. One or two sentences each.
2. **Ports.** In your mapping, which number is on your machine and which is inside the container? How would you reach the site from your browser?
3. **Image vs build.** Explain the difference between `image:` and `build:` as if to a teammate who has only ever used `docker run`.
4. **Predict then explain.** You change only the `GREETING` value and run `docker compose up` again. Will Docker need to rebuild the image? Justify your answer in 2–3 lines.
5. **Debug this.** The following `compose.yaml` fails to start. Explain what is wrong and give the corrected file.

   ```yaml
   services:
   web:
       image: nginx:alpine
     ports:
       - "8080:80"
   ```

6. **Explain in your own words.** Why does the project get a default network without you creating one?

### 6. `checklist.md`

Copy and complete:

```markdown
- [ ] I read the U22 README fully (not only the assignment).
- [ ] `docker compose up` created a container and a network for my project.
- [ ] I reached the site in a browser or with `curl`.
- [ ] I stopped the project cleanly with `docker compose down`.
- [ ] I read the U22 rubric before writing answers.md.
```

## Definition of done

- `project/` contains `app.py`, `Dockerfile`, and `compose.yaml` as specified.
- The site was actually reached (evidence shows a response), not only started.
- `answers.md` is in your own words; Q5 fixes the broken file correctly.
- `checklist.md` completed honestly.

## Submission format

One folder or zip named `U22-YourName` containing `project/`, `evidence.txt`, `answers.md`, and `checklist.md`. Keep the names exactly as written so your trainer can find everything.
