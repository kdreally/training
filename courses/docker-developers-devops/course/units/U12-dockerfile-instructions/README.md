# U12 — Dockerfile instructions

**Phase 3 — Building images**

## Where you are

In U11 you learned what a Dockerfile is and built a two-line image. Now you learn the actual **instructions** — the verbs at the start of each line. By the end you will build a real, tiny web app image and reach it from your browser. Every instruction here is one you will use for the rest of the course.

## What you will be able to do

- Explain the purpose of `FROM`, `WORKDIR`, `COPY`, `RUN`, `CMD`, `EXPOSE`, and (briefly) `ENTRYPOINT`.
- Tell the difference between instructions that act at **build time** and instructions that act at **run time**.
- Write a complete Dockerfile for a small app and build it.
- Run the image, reach the app, read its logs, and clean up the container.

## What you need already

- **U11 — What a Dockerfile is.** You need the Dockerfile idea, the build context, and `docker build -t`.
- **U10 — Container lifecycle.** You need `docker run -d`, `docker logs`, `docker stop`, and `docker rm`.
- **U08 — Images vs containers.** You need to keep "image" and "container" apart in your head.

## Time and energy

About **90–120 minutes**. There is one real build, and the first build downloads a base image, so it can take a few minutes depending on your connection. This unit is dense with vocabulary; reading slowly is encouraged.

## Why this exists

A Dockerfile without instructions is an empty page. The instructions are how you say: *start from this base, put my files here, install what the app needs, and run this when a container starts.* Once you can read these seven words, you can read almost any Dockerfile you meet in the wild — and most real Dockerfiles use only a small vocabulary like this one.

## Plain-language teaching

### Two kinds of instruction: build time vs run time

This distinction prevents most beginner confusion, so we state it before the list.

- **Build-time instructions** run *while Docker is building the image*. Their result is baked into the image. Example: installing a package with `RUN`.
- **Run-time instructions** do not run during the build. They are *recorded* in the image and used later, when someone starts a container. Examples: `CMD` and `ENTRYPOINT`.

A useful image: building is cooking the meal; `CMD` is how the plate is served when a guest arrives.

### The instructions, one at a time

#### `FROM` — choose your starting point

**Purpose:** every image is built on top of another image. `FROM` names that base. It is almost always the first instruction.

```dockerfile
FROM python:3.12-slim
```

Read it as: "start from the official Python 3.12 image, in its smaller `slim` variant." You do not build an operating system from nothing; you borrow a base that already has the language runtime.

*What it is not:* `FROM` is not your app, and not the final image. It is the floor you build on.

#### `WORKDIR` — set the working folder inside the image

**Purpose:** sets the current directory *inside the image* for the instructions that follow, and for the container when it starts. If the folder does not exist, Docker creates it.

```dockerfile
WORKDIR /app
```

*What it is not:* it is not a folder on your laptop. `/app` exists only inside the image. A bonus effect: after `WORKDIR /app`, you can write `COPY app.py .` (the dot means "here, in the working folder").

#### `COPY` — bring files in from the build context

**Purpose:** copies files from the **build context** (your folder, from U11) into the image.

```dockerfile
COPY app.py .
```

Format: `COPY <source-on-your-disk-relative-to-context> <destination-inside-the-image>`. The source must be inside the build context; you cannot reach files "above" it.

*What it is not:* it is not a download, and it is not a move. It copies files in; your originals stay where they are.

#### `RUN` — do work while building

**Purpose:** executes a command *during the build*, on top of the current image, and saves the result into the image. This is how you install dependencies.

```dockerfile
RUN pip install --no-cache-dir -r requirements.txt
```

*What it is not:* `RUN` does **not** run when the container starts. This is the single most common beginner mix-up. If you want a command to run each time a container starts, that is `CMD` (or `ENTRYPOINT`).

#### `CMD` — the default command when a container starts

**Purpose:** says what to run when someone starts a container from the image, if they do not give a command of their own.

```dockerfile
CMD ["python", "app.py"]
```

The bracket form is called **exec form** and is preferred, because it passes the program and its arguments separately and handles stopping cleanly. The other form, `CMD python app.py`, is **shell form** and runs through a shell. Use exec form unless you have a reason not to.

*What it is not:* not build-time. Also, if a Dockerfile has several `CMD` lines, only the **last** one takes effect. Keep one.

#### `EXPOSE` — declare the intended port

**Purpose:** documents which network port the app inside listens on. Tools and people read it as a hint.

```dockerfile
EXPOSE 8000
```

*What it is not:* `EXPOSE` does **not** make the port reachable from your machine. It is a label, like a sign on a door. To actually reach the port you publish it at run time with `-p` (fully covered in U18). We use `-p` below and explain it in plain words: `-p 8000:8000` means "connect port 8000 on my machine to port 8000 in the container."

#### `ENTRYPOINT` — the command that always runs (brief)

**Purpose:** like `CMD`, but it is meant to be the fixed program of the image. When both exist, `CMD` supplies default *arguments* to `ENTRYPOINT`.

```dockerfile
ENTRYPOINT ["python"]
CMD ["app.py"]
```

Here the container always runs `python`, and unless told otherwise it runs `python app.py`. This is a brief introduction only; `ENTRYPOINT` gets more attention when we discuss image hygiene later (U33). For now, know it exists and that `CMD` alone is enough for most simple apps.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Instruction | A verb at the start of a Dockerfile line (`FROM`, `COPY`, …) | Not a shell command you type |
| Base image | The image named by `FROM` that you build upon | Not the final app image |
| Build-time | Happens while the image is being built (`RUN`, `COPY`) | Confused with run time |
| Run-time | Happens when a container starts (`CMD`, `ENTRYPOINT`) | `RUN` is wrongly put here |
| Exec form | JSON-style command, e.g. `["python", "app.py"]` | Not a file format; just arguments |
| Shell form | Command written as plain text, run through a shell | Can swallow stop signals — see U34 |
| Publish a port | `-p host:container` connects a host port to a container port | `EXPOSE` alone does not publish |
| `requirements.txt` | A list of Python packages the app needs | Not the app itself |

## Worked example

We build a small Flask web app. Flask is a free, widely used Python web framework; the example uses one small dependency. If your build runs offline, it will stop at `RUN pip install` — connect to the internet and build again.

### The project folder

```text
hello-flask/
  app.py
  requirements.txt
  Dockerfile
```

**`app.py`**

```python
from flask import Flask

app = Flask(__name__)

@app.route("/")
def home():
    return "Hello from inside a container!\n"

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)
```

**`requirements.txt`**

```text
flask==3.0.3
```

**`Dockerfile`**

```dockerfile
FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY app.py .
EXPOSE 8000
CMD ["python", "app.py"]
```

### Why each line is there

| Line | What it does |
|------|--------------|
| `FROM python:3.12-slim` | Start from a small Python base that already has `python` and `pip`. |
| `WORKDIR /app` | Make `/app` the working folder inside the image. |
| `COPY requirements.txt .` | Copy the dependency list into `/app`. |
| `RUN pip install ...` | Install Flask at build time, into the image. |
| `COPY app.py .` | Copy the app code into `/app`. |
| `EXPOSE 8000` | Declare that the app listens on 8000 (a hint, not a switch). |
| `CMD ["python", "app.py"]` | Default run-time command. |

Notice the order: we copy `requirements.txt` and install *before* copying `app.py`. That feels slightly odd now, but U15 shows it is deliberate — it makes future builds much faster.

### Build it

**What it does:** builds an image named `hello-flask`, tag `1.0`, using the current folder as context.

```text
docker build -t hello-flask:1.0 .
```

**What success looks like** (trimmed):

```text
[+] Building 24.3s (10/10) FINISHED
 => [1/6] FROM docker.io/library/python:3.12-slim
 => [3/6] COPY requirements.txt .
 => [4/6] RUN pip install --no-cache-dir -r requirements.txt
 => [5/6] COPY app.py .
 => exporting to image
 => => naming to docker.io/library/hello-flask:1.0
```

**One decoded failure.** If you see:

```text
COPY failed: file not found in build context ... stat app.py: file does not exist
```

Docker is saying the file named on the `COPY` line is not in the build context. Either the filename is spelled differently, or you ran `docker build` from the wrong folder. Check the folder you are in and the exact spelling.

### Run it

**What it does:** starts a container in the background (`-d`), publishes port 8000 on your machine to port 8000 in the container (`-p 8000:8000`), and names it `hello` (`--name`). The `--name` flag is optional but makes later commands easier.

```text
docker run -d -p 8000:8000 --name hello hello-flask:1.0
```

**What success looks like:** a long container ID printed on its own line, for example:

```text
8f3c1b2a9d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0
```

### Reach the app

**What it does:** asks the app on your machine's port 8000 for its home page.

```text
curl http://localhost:8000
```

- **macOS / Linux:** `curl` works as written.
- **Windows PowerShell:** `curl` is an alias for a different tool in some versions. Use `curl.exe http://localhost:8000` to be safe, or open `http://localhost:8000` in a browser.

**What success looks like:**

```text
Hello from inside a container!
```

**One decoded failure.** If you see:

```text
docker: Error response from daemon: driver failed programming external connectivity ... port is already allocated
```

then something else already uses port 8000 on your machine. Pick another host port: `-p 8080:8000` connects host 8080 to container 8000. Remember, the left number is your machine, the right number is inside the container.

### Read logs, then clean up

```text
docker logs hello
```

**What success looks like:** Flask's startup lines, ending with something like `Running on http://0.0.0.0:8000`.

```text
docker stop hello
docker rm hello
```

**What success looks like:** each command prints the container's name (`hello`) back to you. Stopping and removing keeps your machine tidy — a habit from U10.

## Common errors

### Error: putting `RUN` where you meant `CMD`

**What happens:** The build tries to launch your server as a build step and hangs or fails, because `RUN python app.py` never returns.

**Fix:** Launching belongs in `CMD` (run time), not `RUN` (build time). Install dependencies with `RUN`; start the app with `CMD`.

### Error: multiple `CMD` lines

**What happens:** The image runs something different from what you expected.

**Fix:** Only the last `CMD` counts. Keep exactly one, and make sure it is what you want.

### Error: `ModuleNotFoundError: No module named 'flask'`

**What happens:** The container starts, but the app cannot find its dependency.

**Fix:** The dependency was never installed into the image. Confirm `requirements.txt` is copied *before* the `RUN pip install` line, and that the install actually succeeded in the build output.

### Error: `COPY failed` or a file not found

**What happens:** `COPY` cannot find the source file.

**Fix:** Check spelling and check the folder you ran `docker build` from. The source path is relative to the build context, not to some other folder.

## Checkpoints

Answer in your own words before the assignment:

1. Which instructions act at build time, and which at run time?
2. What is the difference between `RUN` and `CMD`?
3. What does `EXPOSE` do, and what does it *not* do?
4. Why is `COPY requirements.txt .` placed before `COPY app.py .`? (A short guess is fine; U15 confirms.)

## Practice exercises

Ungraded. Do these before the assignment.

### P1 — Predict then run

Change the app's greeting text in `app.py`, rebuild (`docker build -t hello-flask:1.1 .`), run it on a new port, and confirm your change appears. Predict the output first.

### P2 — Break it on purpose

Remove the `RUN pip install ...` line, rebuild, and run. Read the error. Add the line back and confirm the fix.

### P3 — Fill in the blank

Write a Dockerfile for a Python app that listens on port 5000, using a file `server.py` and a dependency list `requirements.txt`. Use `FROM`, `WORKDIR`, `COPY`, `RUN`, `EXPOSE`, and `CMD`.

### P4 — Explain to a friend

In five lines, describe to a friend who knows Python but not Docker what each line of the worked-example Dockerfile does.

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- No `.dockerignore` — that is **U13**.
- No detailed tag discussion — that is **U14**.
- No layers or build cache theory — that is **U15**, though we used its ordering here.
- No multi-stage builds — that is **U16**.
- No full treatment of ports — that is **U18**; here `-p` is explained just enough to reach the app.
- No deep treatment of `ENTRYPOINT` — that returns in **U33**.

## Next unit

**U13 — .dockerignore and build context** (controlling exactly which files Docker receives).
