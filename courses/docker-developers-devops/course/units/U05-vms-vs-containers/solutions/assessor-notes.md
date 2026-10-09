# U05 Assessor notes

Assessor-only. Do not link from learner documents.

## Model answer sketch

**Table:**
```text
                        Virtual machine              Container
Contains                App + full guest OS          App + runtime + libraries
Own OS?                 Yes, each VM has one         No, shares the host kernel
Size                    Gigabytes                    Megabytes
Startup time            Tens of seconds to minutes   Fractions of a second
Isolation mechanism     Separate kernel via hypervisor  Shared kernel + namespaces/cgroups
Best suited to          Different OS, strongest      Same OS, many small, fast
                        separation                   services, portability
```

**Q1:**
- hypervisor = software that creates and runs virtual machines.
- kernel = the core of an OS that manages processes, memory, and hardware.
- container engine = software that runs containers (Docker is one).
- isolation = keeping one workload from affecting another.

**Q2:** A VM includes its own full operating system and kernel; a container shares the host's kernel. Because a container does not boot a second OS, it uses far less space and starts almost instantly. The speed is a consequence of sharing the kernel, not of being small.

**Q3:** (a) container; (b) VM (needs a different OS); (c) VM (strongest separation for untrusted code); (d) container (portable, reproducible environments).

**Q4:** Corrections: a container is not a small VM — it does not include its own OS and shares the host kernel; it is not "always more secure" (VMs add a kernel boundary) and not "always the right choice" (different-OS and whole-machine needs favour VMs).

**Q5:** Risks include needing a different OS, requiring maximum isolation for untrusted code, whole-OS testing/development, and workloads built around VM snapshots. The lesson's "When each one is the right tool" list agrees.

## Common weak submissions

- Table uses "is faster" and "is smaller" as rows but never mentions the OS/kernel difference.
- Q1 says a container engine "is a hypervisor for containers" (confuses the two).
- Q2 says containers are fast "because they are smaller" — marks the result as the cause; partial.
- Q3 gives labels with no reasoning.
- Q4 corrects only the "smaller VM" part and leaves "always more secure/right" unchallenged.
- Q5 lists one risk or restates the phrase "it depends" without specifics.

## Common wrong-but-thoughtful answers

- Q3(c) answering "container" with "containers are isolated too." Accept only with acknowledgment of the kernel-boundary trade-off; otherwise partial and redirect.
- Q2 saying "containers share the OS." Partly right — they share the **kernel**; the OS as a whole is still involved. Refine the wording.
- Claiming VMs are always slower than containers for every task. Broadly true for startup, not for every workload; note the nuance.

## Signals to watch

- A learner who says "container = small VM" has not replaced the myth; ask them to redo Q4 and the metaphor-trap section.
- A learner who distinguishes kernel sharing correctly is ready for Phase 2; note it positively.
- Watch for learners worrying that "sharing a kernel" means "no isolation." Reassure: namespaces and cgroups provide strong isolation for normal workloads (U33 expands on security).
