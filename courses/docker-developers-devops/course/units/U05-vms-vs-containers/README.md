# U05 — Virtual machines vs containers

**Phase 1 — Why containers exist**

## Where you are

This is the last unit of Phase 1. You now understand the problem ("works on my machine" from U02) and what a program needs (its environment, from U04). Before we install Docker, we answer the big question honestly: **how do containers differ from virtual machines?** Marketing blurs these two ideas, and that blur causes real, expensive confusion. We will not run Docker in this unit.

## What you will be able to do

- Explain, in plain words, what a virtual machine is and what a container is.
- Explain the key differences: guest operating system vs shared kernel, size, startup time, and isolation.
- Choose virtual machines or containers for simple scenarios, and justify the choice.
- Correct four common false beliefs about containers.

## What you need already

- **U00 — How this course works.**
- **U01 — What we are building toward.** You need the rough preview of a container.
- **U02 — The works-on-my-machine problem.**
- **U03 — The terminal, deliberately.**
- **U04 — Apps and their environments.** You need the runtime/library/config/port list, because both VMs and containers exist to package that list.

No Docker installation is required.

## Time and energy

About **60–80 minutes**. This unit is conceptual, not hands-on. If you feel a metaphor slipping, slow down and name it — the whole point is to replace confused metaphors with clear ones.

## Why this exists

People often say "a container is like a tiny virtual machine." That sentence is comfortable and wrong in ways that cause bad decisions later. This unit gives you the honest picture so that when Docker arrives, you reason about it correctly instead of inheriting a myth.

## Plain-language teaching

### Two ways to package an environment

From U04 we know an app needs a runtime, libraries, OS bits, configuration, and a port. Teams wanted a way to package all of that and ship it. Two big approaches exist:

1. **Virtual machines** — package an entire computer inside your computer.
2. **Containers** — package the app and its needs, but share the machine's operating-system core.

They solve overlapping problems, but they are built differently. We take them one at a time.

### What a virtual machine is

A **virtual machine** (VM) is a complete, simulated computer running inside your real computer, as a program. Inside the VM there is its own operating system — its own **guest OS** — with its own kernel, drivers, and filesystem. The real computer is called the **host**.

The software that creates and runs VMs is a **hypervisor**. It splits the real machine's processor, memory, and disk into pretend machines. Some hypervisors run directly on the hardware (type 1, common in data centres); others run as an app on your desktop (type 2, such as VirtualBox or the virtualization built into Docker Desktop).

Because each VM carries a full operating system, it is **heavy**:

- Large: gigabytes of disk, mostly for the guest OS.
- Slow to start: booting an OS takes tens of seconds.
- Memory-hungry: each VM reserves memory for its whole OS.

The payoff is isolation: each VM is very separate from the host and from other VMs. It has its own kernel, so it behaves like an independent computer.

### What a container is

A **container** packages an app with its runtime, libraries, and configuration — the things from U04 — but it does **not** include a full operating system. Instead, all containers on a machine **share the host's kernel**.

The **kernel** is the core of an operating system: the part that manages processes, memory, and hardware. Sharing one kernel is the key idea. Because containers do not each carry an OS, they are **light**:

- Small: megabytes, not gigabytes.
- Fast to start: milliseconds to seconds, not tens of seconds.
- Efficient: many containers can share one machine comfortably.

The program that runs and manages containers is called a **container engine**. Docker is the most common one, which is why this course uses it.

The **image** a container starts from is the packaged snapshot of the app plus its runtime, libraries, and settings. (Precise, rigorous treatment of images arrives in U08.)

### How isolation works without a second OS

If containers share a kernel, how are they kept apart? The operating system provides two built-in features, which you only need to recognize by name:

- **Namespaces** give each container its own private view of things like processes, files, and network, so it cannot see other containers' internals.
- **cgroups** (control groups) limit and account for how much processor, memory, and disk each container may use.

So containers are isolated, but through the shared kernel rather than through a separate OS. The phrase to remember: **isolation without a second kernel.**

### Side-by-side comparison

The numbers below are **typical, approximate** values to build intuition. Do not memorize them; they vary by machine and workload.

```text
                        Virtual machine              Container
--------------------------------------------------------------------------------
What it contains        App + full guest OS          App + runtime + libraries
Operating system        Each VM has its own OS       Share the host's kernel
Size                    Gigabytes (GB)               Megabytes (MB)
Startup time            Seconds to a minute          Fractions of a second
Density on one host     A handful                    Dozens to hundreds
Isolation               Very strong (own kernel)     Strong (shared kernel rules)
Best when               Different OS, strong         Same OS, many small
                        separation needed            services, fast start needed
```

### When each one is the right tool

Choose a **virtual machine** when:

- You need a **different operating system** from the host (for example, running Windows on a Linux server).
- You need the strongest possible separation, such as running untrusted code.
- You are simulating a whole machine for testing or development of an OS.

Choose a **container** when:

- Your app runs on the **same kind of operating system** as the host.
- You want many services side by side, each small and quick to start.
- You want a reproducible, portable package (the goal of this course).

### The metaphor trap

Here is a sentence to be suspicious of: *"A container is just a tiny virtual machine."*

It is tempting because both isolate apps. But it makes you expect each container to contain its own operating system — which it does not. That wrong expectation leads to wrong guesses about size, startup time, and security. Keep the honest sentence instead: **a container is an isolated bundle of an app and its dependencies that shares the host's kernel.**

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Host OS | The operating system of the real machine | Not the same as the guest OS |
| Guest OS | The full operating system inside a virtual machine | Containers do **not** have one |
| Hypervisor | Software that creates and runs virtual machines | Not the same as a container engine |
| Virtual machine | A simulated computer with its own operating system | People over-generalize it to containers |
| Kernel | The core of an OS that manages processes, memory, hardware | Containers share one; VMs each have one |
| Container | An app plus its dependencies, isolated, sharing the host kernel | Not a small VM |
| Container engine | Software that runs containers (Docker is one) | Not a hypervisor |
| Isolation | Keeping one workload from affecting another | Achieved differently in VMs vs containers |
| Namespaces | Kernel feature giving each container a private view | You only need to recognize the name |
| cgroups | Kernel feature limiting resource use per container | You only need to recognize the name |
| Image | The packaged snapshot a container starts from | Not the same as a running container |
| Overhead | Extra cost (size, memory, time) beyond the app itself | VMs carry much more than containers |
| Boot time | How long something takes to become ready | Containers have almost none |

## Worked example

You are not running anything. Read the same app packaged both ways and compare.

**The app:** a small web service needing Python 3.11, three libraries, a `PORT` setting, and port 8000.

```text
Package it as a virtual machine:
  - Install a full Linux guest OS inside the hypervisor   (several GB)
  - Install Python 3.11 and the libraries in that OS
  - Copy the app in, set PORT, start it
  - Result: a complete simulated computer, ready in ~40 seconds,
            using ~1–2 GB of memory before the app even starts.

Package it as a container:
  - Start from a Python 3.11 base image
  - Add the libraries and the app, set PORT, expose port 8000
  - Result: a small bundle (tens to hundreds of MB) that starts in
            well under a second and shares the host's kernel.
```

### A "wrong on purpose" example

```text
Claim:  "The container starts fast because it is a small VM."
```

**Why it is wrong:** the speed does **not** come from being small; it comes from not starting a second operating system at all. A small virtual machine would still boot a full OS and be slow. The speed is a *consequence of sharing the kernel*, not of size.

Notice how the wrong sentence would lead you to the wrong reason. When you reason about Docker later, you want the real reason.

## Common errors

### Error: believing a container includes a full OS

**What happens:** You expect gigabytes and long startup, then distrust containers when they are small and fast, or you look for an "OS" inside a container that is not there.

**Fix:** A container includes the app's runtime and libraries, not a whole OS. It borrows the host's kernel.

### Error: believing containers are always more secure than VMs

**What happens:** You put untrusted code in a container, assuming the same isolation as a VM.

**Fix:** VMs have an extra boundary — a separate kernel. Containers are isolated well for normal workloads, but the strongest separation traditionally comes from VMs. Treat this as a trade-off, not a rule. (Security habits get their own unit, U33.)

### Error: believing VMs are obsolete

**What happens:** You dismiss VMs entirely, then cannot explain why cloud providers still rent them.

**Fix:** VMs remain essential for different-OS needs, strong isolation, and whole-machine testing. Containers and VMs coexist; often a container runs *inside* a VM in the cloud.

### Error: using the words interchangeably

**What happens:** You say "VM" when you mean "container," and a colleague's mental model breaks.

**Fix:** Keep the two words distinct. The difference is real and load-bearing.

## Checkpoints

Answer before the assignment:

1. What is the single biggest structural difference between a VM and a container?
2. Why does sharing the kernel make containers small and fast?
3. Name one task for which a VM is the better choice, and one for which a container is.

If you can answer these, you are ready.

## Practice exercises

Ungraded, increasing difficulty.

### P1 — Classify the workload

For each scenario, choose **VM** or **container** and write one sentence of justification:

1. Thirty small web services that must start and stop quickly.
2. Running Windows software on a Linux-only server.
3. A reproducible build environment for a Python app, same OS as the host.
4. Executing a stranger's untrusted code with maximum separation.
5. A team that wants every developer to get the identical app environment on their own laptops.

### P2 — Complete the comparison

Fill in the blanks from memory, then check the lesson:

```text
                        Virtual machine        Container
Own operating system?   ________               ________
Size (typical)          ________               ________
Startup time            ________               ________
Isolation mechanism     ________ kernel        shared kernel + ________ / cgroups
```

### P3 — Predict then read

Before reading further: a colleague says "we should replace all our VMs with containers to save money." Write **two** situations where that plan would fail or be risky. Then compare with the "When each one is the right tool" section.

### P4 — Fix the wrong sentence

Rewrite this so it is accurate, in one or two sentences: *"A container is a tiny VM that boots faster because it is smaller."*

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- No installing or running Docker.
- No namespaces or cgroups internals — names only.
- No Kubernetes, orchestration, or cloud platforms.
- No security deep dive (that is U33), only the key isolation trade-off.

## Next unit

**U06 — Installing Docker safely** (installing the container engine and verifying it works).
