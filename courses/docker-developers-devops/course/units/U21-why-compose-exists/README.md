# U21 — Why Compose exists

**Phase 5 — Docker Compose**

## Where you are

You now know how to run one container, keep its data in a volume, open a port, and connect two containers over a network (U17–U20). That knowledge is real, but using it for a whole app means typing long commands and juggling several terminals. This unit explains the human problem that Compose solves. We will not read a full Compose file line by line yet — that is U22. Here we build the *why*.

## What you will be able to do

- Describe the pain of starting a multi-container app with individual `docker run` commands.
- Explain what it means for a file to be **declarative**.
- Say what a **Compose service** is, in plain words.
- Recognize both `compose.yaml` and `docker-compose.yml` as the same idea.
- Run `docker compose version` and read its output.

## What you need already

- **U17** — volumes (data that survives a container).
- **U18** — ports (letting the outside reach a container).
- **U20** — connecting containers to each other (service names on a user-defined network).
- Basic comfort in a terminal (U03).

You do **not** need to have memorized every flag. We will re-state what we use.

## Time and energy

About **45–70 minutes**. This unit is mostly reading and thinking, with exactly one command to run. Take a break after the "Plain-language teaching" section if your head feels full.

## Why this exists

Real applications are rarely one container. A typical small app is a web process, a database, maybe a cache. Starting them by hand means remembering every flag, starting them in the right order, and attaching them to the same network. Miss one flag and the app silently cannot reach the database. These materials exist so you never have to carry that in your head again.

## Plain-language teaching

### The problem, made concrete

Suppose your app has two pieces: a small web app image you built (U11–U16) and a PostgreSQL database image from Docker Hub (U09).

Without Compose, starting them looks something like this. Read it, but do **not** type it yet — we are showing the pain, not asking you to repeat it.

```text
docker network create appnet
docker run -d --name db --network appnet -e POSTGRES_PASSWORD=changeme -v db-data:/var/lib/postgresql/data postgres:16-alpine
docker run -d --name web --network appnet -p 8080:8000 -e DB_HOST=db my-web-image:1.0
```

Four commands. Two long ones. If you close your terminal, will you remember them tomorrow? If a teammate clones your project, do they know the network name is `appnet`? What if you need a third service? What if the database must start before the web app?

### The pain, named honestly

1. **Repetition.** Every start is the same long command, remembered by hand.
2. **Order and timing.** Containers must start in a sensible order.
3. **Implicit knowledge.** The network name, the volume name, the environment values — all live in your memory, not in your project.
4. **Many terminals.** Watching logs from three processes means three windows.
5. **Onboarding.** "How do I run this?" has no single answer to keep in the repository.

### What Compose is

**Docker Compose** is a tool that reads **one file** describing all your containers and runs them as a group. The file is a plain text file, usually named `compose.yaml`. When you run one command, Compose creates the network, starts the containers, applies the ports and volumes and environment variables, and shows you the combined logs.

The smallest honest definition: **Compose is a recipe for your whole app, written down once, that Docker can execute for you.**

### Declarative vs imperative

This is the one new idea this unit asks you to hold.

- **Imperative** means you describe *the steps*: "create a network, then run the db, then run the web." Our four `docker run` commands were imperative.
- **Declarative** means you describe *the result*: "there is a web service and a db service; the web maps port 8080 and talks to db." You do not list the steps. Compose works out the steps.

Why this matters: declarative files can be reviewed, version-controlled, and shared. Anyone who reads the file sees the whole app at a glance. The steps become an implementation detail Docker handles.

### What Compose is *not*

- It is **not** a replacement for Dockerfiles. A Dockerfile still builds one image (U11). Compose *uses* those images — and can even ask Docker to build them.
- It is **not** Kubernetes, and it is **not** for production orchestration at scale. Compose is for local development and simple single-machine runs. (We discuss bigger tools much later, U32.)
- It is **not** magic that fixes a broken app. If your image is wrong, Compose will faithfully run a wrong image.

### The two file names, and the two commands

You will see two file names in the wild:

| File name | Notes |
|-----------|-------|
| `compose.yaml` | The modern, preferred name. `docker compose` looks for it automatically. |
| `compose.yml` | Same as above, shorter extension. |
| `docker-compose.yml` | The older, extremely common name. Still fully supported today. |

They contain the same kind of content. If you find `docker-compose.yml` in an old project, you do not need to rename it. You only need to be consistent inside one project.

There are also two ways to *run* Compose, and this matters:

| Command | What it is | Use it? |
|---------|------------|---------|
| `docker compose version` | Compose **v2**, a plugin built into modern Docker. One command, a space. | **Yes — this course uses this.** |
| `docker-compose version` | Compose **v1**, a separate old binary with a hyphen. | Only to recognize it in old tutorials. |

The course defaults to `docker compose` (space). Same idea, newer engine.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Compose | A tool that runs a multi-container app from one file | Not the same as a Dockerfile, and not Kubernetes |
| `compose.yaml` / `docker-compose.yml` | The file describing your services | Not a program; it is data Docker reads |
| Declarative | You describe the result, not the steps | Not "less powerful"; it is a different style |
| Imperative | You describe the steps, one by one | What `docker run` commands are |
| Service | One container's worth of description inside the Compose file | Not a "Windows service"; not a running container itself until you start it |
| Project | The group of services Compose manages together (named after the folder by default) | Not a Git project, though they often align |
| `docker compose` | The v2 plugin command | Distinct from the legacy `docker-compose` binary |
| Network (Compose) | The private network Compose creates so services can reach each other by name | You no longer create it by hand (U20) |

## Worked example

**Goal:** confirm your Docker and Compose v2 are installed and talking.

**Command:**

```text
docker compose version
```

**What it does:** asks the Compose v2 plugin to print its version. It starts nothing.

**Success looks like this** (your exact number will differ):

```text
Docker Compose version v2.27.0
```

**A typical failure, decoded:**

```text
docker: 'compose' is not a docker command.
```

**What it means:** your Docker installation does not have the Compose v2 plugin available. This is not an error in your project file — there is no file yet. On Docker Desktop (Windows/macOS), Compose v2 is included, so this usually means Docker Desktop is not running or not fully installed (U06). On Linux, the plugin may live in a package such as `docker-compose-plugin`; if you installed the Docker Engine without it, the plugin is missing. **Fix:** start Docker Desktop, or install the Compose plugin through your distribution's package manager, then run the command again. If instead you typed the old hyphenated command and got "command not found," you used v1 syntax that is not installed — use `docker compose` (with a space).

## Common errors

### Error: Thinking Compose replaces your Dockerfile

**What happens:** A learner deletes their Dockerfile, expecting `compose.yaml` to build an image from source. Compose has nothing to build from and the app cannot start.

**Fix:** Keep the Dockerfile. Compose describes *services*; a Dockerfile describes *how to build one image*. U22 shows the `build:` key that connects the two.

### Error: Renaming files and commands randomly

**What happens:** A project has both `compose.yaml` and `docker-compose.yml`. Compose picks one and ignores the other, so your edits "do nothing." Or you run `docker-compose` on a machine that only has v2.

**Fix:** Keep one file per project. Prefer `compose.yaml`. Use `docker compose` (space) consistently.

## Checkpoints

Answer in your own words:

1. Name three specific pains of starting several containers with individual `docker run` commands.
2. What is the difference between "imperative" and "declarative"?
3. Is Compose a replacement for the Dockerfile? Why or why not?

If you can answer those three, you are ready for the exercises.

## Practice exercises

### P1 — Read and predict

Look again at the four-command example above. Write one sentence naming the command that would fail first if you accidentally used the network name `app-net` when starting `web` instead of `appnet`. (Prediction only; you do not need to run it.)

### P2 — Translate the pain

Choose any small app you have run before (a website, a dashboard, a script with a database). In 5–8 lines, list the pieces you would have to start and the settings you would have to remember. This is exactly what a Compose file will hold.

### P3 — Name the file

A teammate sends you a project containing `docker-compose.yml` and nothing else. Will the command `docker compose up` read that file? Write your answer and one sentence of reasoning.

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md). The rubric is short and visible on purpose.

## What is *not* in this unit

- No reading a Compose file line by line (that is U22).
- No `docker compose up` yet (U22).
- No environment variables or `.env` files (U24).
- No lifecycle commands such as `logs`, `ps`, or `exec` (U25).
- No production orchestration (U32).

## Next unit

**U22 — Your first compose file** (services, `image`/`build`, `ports`, `volumes`, `environment`, then `docker compose up` and `down`).
