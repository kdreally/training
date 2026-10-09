# U32 — Where Kubernetes fits

**Phase 7 — Craft and capstone**

## Where you are

In U31 you learned that a service needs a host, a runtime, and a process that stays up. That works beautifully for one machine. This unit is a **survey, not a tutorial**. We look at what breaks when one machine is not enough, and at the tool the industry reaches for: Kubernetes. You will not install it or run it here. By the end you will be able to say, honestly, when Kubernetes is the right answer and when it is expensive overkill.

If a word in this unit feels like jargon, that is expected. The goal is recognition, not mastery. We define every term the first time it appears.

## What you will be able to do

- Explain why one host stops being enough as a service grows.
- Define scheduling, scaling, and self-healing in plain language.
- Describe how Kubernetes relates to Docker — and what it does *not* replace.
- Read a Docker Compose file and a Kubernetes manifest side by side, without panic.
- Give a clear recommendation for a small app: Compose or Kubernetes.
- List concrete situations where reaching for Kubernetes is a mistake.

## What you need already

- **U21–U25** — Compose files, two-service apps, `compose up/down`, `restart:`.
- **U31** — host, runtime, service, restart policy, desired state.

No Kubernetes experience is expected or required.

## Time and energy

About **45–70 minutes**. This unit is mostly reading and judgement. There is very little to type, on purpose. Wear your "compare and decide" hat, not your "memorise a manual" hat.

## Why this exists

Every few months someone asks a developer with one small web app: "Should we use Kubernetes?" Sometimes the honest answer is yes. Very often it is no, and the person asking does not know how to say so without sounding unambitious.

Kubernetes is a powerful tool for a real problem: **running many containers across many machines, reliably, without a human babysitting each one.** If you do not have that problem, adopting Kubernetes creates work rather than removing it. This unit exists so you can make that call from understanding instead of fashion.

## Plain-language teaching

### What breaks when one host is not enough

Recall U31: a host is a machine that stays on. One host is a fine start. It fails in four predictable ways:

1. **The host dies, and so does the service.** A power supply, a disk, a kernel panic — any of these takes everything down at once. There is no second machine to take over.
2. **You cannot grow past the machine.** If traffic doubles, you can add memory and CPU up to the machine's limits. Past that, you are stuck.
3. **You are the restart policy.** On one host you might restart a crashed container from your terminal. At scale, nobody can watch a hundred services.
4. **Updates are scary.** Replacing a running service with a new image means a gap where the service is down, unless you have a second machine ready.

Each of these is solved by "more than one host, managed together." The general name for that is **orchestration**.

### The three words you must be able to define

- **Scheduling:** deciding *which* machine should run a given container. A **scheduler** is the component that picks. It looks at each machine's spare capacity and places work where it fits.
- **Scaling:** running more (or fewer) copies of the same service. **Horizontal scaling** means more copies across machines; **vertical scaling** means a bigger single machine (U31's limit).
- **Self-healing:** automatically replacing a copy that dies, and rescheduling work from a machine that fails.

### The cluster, briefly

A **cluster** is a group of machines that orchestration software treats as one pool. Each machine in the cluster is a **node**. You tell the cluster what you want; it works out which node runs what.

A cluster has two kinds of parts:

- **Nodes** where your containers actually run ("workers").
- A **control plane**: the small set of components that stores your intentions and makes decisions (the scheduler lives here).

You do not need to know the control plane's internals. You only need to know it exists and that you talk to it, not to each node by hand.

### Desired state, the big idea

In U31, one restart policy meant "keep this container up." Kubernetes takes that idea and expands it: you write down a **desired state** — "I want three copies of this service, reachable on this port, using this image" — and the cluster works continuously to make reality match.

The tool that reads your intent is a **controller**. It watches reality and nudges it back toward the desired state. A **manifest** is the file where you write the desired state, usually in YAML.

### How Kubernetes relates to Docker

This is the most common source of confusion, so read it twice:

- Kubernetes does **not** replace Docker's image format. Your images and Dockerfiles from U11–U16 still matter. Kubernetes pulls the same images from the same registries (U26).
- Kubernetes is **not** a container runtime itself. It relies on a runtime on each node (today usually `containerd`, which Docker also uses under the hood) to actually start containers.
- Docker (**Compose**) and Kubernetes solve **different sizes of the same problem**. Compose manages containers on **one host**. Kubernetes manages containers across **many hosts**.
- You can use Docker to build your image locally and Kubernetes to run it later. They cooperate; they do not compete.

### Docker Compose vs Kubernetes

| Dimension | Docker Compose | Kubernetes |
|-----------|----------------|------------|
| Scope | One host | Many hosts (a cluster) |
| File | `compose.yaml` | One or more YAML manifests |
| Command | `docker compose up` | `kubectl apply` (or `helm`), against a cluster |
| Scaling a service | Manual / `--scale` for testing | Designed for replicas, autoscaling |
| Self-healing | Restart policy on one host (U31) | Reschedules across nodes |
| Networking | Automatic default network (U19–U20) | Its own service and network model |
| Learning curve | Gentle; an afternoon | Steep; weeks to be effective |
| Good fit | Local dev, small single-machine services, prototypes | Multi-host production, many services, teams with ops capacity |
| Cost | Free; runs on your laptop | Free software, but real machines to run it on and real people to run it |
| Ops burden | Low | High; someone must operate the cluster |

### When NOT to reach for Kubernetes

Be honest in these cases:

- **One small app on one machine.** Compose is simpler and enough.
- **Learning Docker.** Kubernetes adds a second, larger learning curve too early.
- **A team with no one to operate a cluster.** An unmaintained cluster is worse than one clear Compose host.
- **You want to save money or time right now.** A cluster costs in machines, attention, and updates.
- **You cannot yet describe your desired state clearly.** Orchestration amplifies clarity; it also amplifies confusion.

Reach for Kubernetes when you genuinely have many services, many hosts, a need for automatic scaling or healing, and people who can run it.

### A look at a manifest (reading only)

Below is a tiny Kubernetes manifest, shown so it stops being mysterious. **Do not run it.** You are not expected to write one yet; the point is to notice it looks like a wish list, not a set of commands.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: notes-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: notes-app
  template:
    metadata:
      labels:
        app: notes-app
    spec:
      containers:
        - name: notes-app
          image: yourname/notes-app:1.0
          ports:
            - containerPort: 8000
```

Read it as English: "I want a Deployment called `notes-app`. Please keep **3** copies running. Each copy runs the image `yourname/notes-app:1.0` and listens on port 8000." That is desired state. Compare it with the Compose fragment from your earlier units: same intent, far more structure, because the cluster must make decisions a single host never had to.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Orchestration | Managing many containers across many machines automatically | Not the same as building images |
| Cluster | A group of machines treated as one pool | Not a single computer |
| Node | One machine inside a cluster | Not a container |
| Scheduler | Component that picks which node runs work | Not a person, not your shell |
| Scaling | Running more or fewer copies of a service | "Scaling" is not always adding RAM |
| Self-healing | Automatically replacing failed copies or nodes | Not a substitute for fixing bugs |
| Desired state | What you want the system to look like | Not the current state |
| Controller | Small program that nudges reality toward desire | Not your app's code |
| Manifest | YAML file describing desired state | Not an executable script |
| `kubectl` | The command-line tool to talk to a cluster | Not Docker; a different tool |
| Deployment | A Kubernetes object that manages copies of a service | Not "the act of deploying" in general |
| Compose | Docker's one-host multi-container tool | Not a mini-Kubernetes, exactly |

## Worked example

**Scenario:** A colleague asks, "Our notes app runs with `docker compose` on my laptop. Traffic is modest. Should we move to Kubernetes?" You answer with a short comparison.

**Step 1 — ground the current reality (safe, local).**

This lists the containers Compose is managing on your machine right now. It is the "one host" view.

```bash
docker compose ps
```

- **Purpose:** show the services Compose started here.
- **Success looks like:** a table with your service names, images, state (`running`), and ports. If you have none running, the table is empty — that is not a failure.
- **One decoded failure:** `no configuration file provided: not found` means you ran it in a folder without a `compose.yaml`. Change into your project folder (U22) and try again.

**Step 2 — reason about the four one-host failure modes.**

Write them next to your app: host dies; cannot grow past the machine; nobody to restart; updates cause downtime. Ask: *does this app actually suffer from these?* For a modest single-machine app, usually not yet.

**Step 3 — make a recommendation.**

For the scenario above, a defensible answer is: **stay on Compose for now.** The app has one host's worth of load, likely one person maintaining it, and no multi-node requirement. Note the trigger that would change your mind: multiple hosts, high availability, or many services needing automatic healing and scaling.

That is the whole skill: match the tool to the actual problem.

## Common errors

### Error: "Kubernetes replaces Docker"

**What happens:** You abandon learning images and Dockerfiles, thinking they are obsolete.

**Why:** Kubernetes runs the same container images. It swaps out the *orchestration*, not the *image format*.

**Fix:** Keep building images the Docker way. Kubernetes consumes them.

### Error: "More tools means more professional"

**What happens:** A single small app is moved onto a cluster. Now there are machines to pay for and a cluster to maintain, and the app is no better off.

**Why:** Tool choice is about the problem, not about appearance.

**Fix:** Write down the problem you are solving. If one host solves it, use one host.

### Error: "I need Kubernetes to deploy at all"

**What happens:** You delay shipping because you believe only Kubernetes counts as "real" deployment.

**Why:** U31 showed that running an image on a host *is* deployment. Kubernetes is one option, not a requirement.

**Fix:** Deploy on your Compose host. Adopt orchestration when a real limit appears.

### Error: Confusing Docker Swarm with Kubernetes

**What happens:** You read old tutorials about `docker swarm` and mix them up.

**Why:** Docker once shipped its own orchestrator, Swarm. It exists but is not what most people mean by "orchestration" today.

**Fix:** Note the name for recognition; this course does not teach it. Kubernetes is the tool the industry conversation is about.

## Checkpoints

Answer in your own words before the assignment:

1. Name the four ways one host stops being enough.
2. Define scheduling, scaling, and self-healing without using the word "just."
3. In one sentence, state how Kubernetes relates to Docker images.
4. Give two situations where Kubernetes is the wrong choice.
5. What does a controller do with your "desired state"?

## Practice exercises

### P1 — Concept mapping

Without looking back, write the Kubernetes equivalent (or "no simple equivalent") for each Compose idea: a service, `ports:`, `volumes:`, `restart:`, `depends_on:`.

### P2 — The four failure modes

Pick any app you have run in this course. For each of the four one-host failure modes, write one sentence: does it affect this app today? Yes/No and why.

### P3 — Recommendation drill

Write a three-sentence recommendation for each scenario:
- A solo developer's portfolio site, one container.
- A company with 40 services across 6 teams and a platform team.

### P4 — Read the manifest

Re-read the manifest above. In your own words, write what each of these lines asks for: `replicas: 3`, `image:`, `containerPort: 8000`.

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- No installing a cluster, `kubectl`, `minikube`, or `kind`.
- No writing or applying real manifests.
- No cloud providers or paid services.
- No deep networking, storage, or ingress topics.
- No Docker Swarm tutorial.

## Next unit

**U33 — Security habits** (non-root users, minimal images, and keeping secrets out of layers).
