# U32 Assessor notes

## Model answer sketch

**Q1:** (1) single host fails entirely; (2) cannot grow past the machine; (3) no one to restart/heal services at scale; (4) updates cause downtime without a second host.

**Q2:** Scheduling = choosing which node runs a container. Scaling = running more/fewer copies (horizontal) or a bigger machine (vertical). Self-healing = automatically replacing dead copies/work on failed nodes.

**Q3:** Kubernetes does not replace the image format; it runs the same images from the same registries. It is not itself a runtime; each node runs a container runtime (containerd is the common one), which Docker also uses. Compose = one host; Kubernetes = many hosts.

**Q4:** One small app on one machine; a team with no one to operate a cluster; learning Docker; wanting to save time/money now; unclear desired state. Costs: machines, attention, update burden, complexity.

**Q5:** service → Deployment (or Pod); `ports:` → Service / `containerPort`; `volumes:` → PersistentVolume + PersistentVolumeClaim; `restart:` → no single direct equivalent (desired state via controllers, restartPolicy within a Pod); `depends_on:` → no simple equivalent (readiness probes / init containers are the thoughtful answer).

**Q6:** For the scenario, "stay on Compose" is the defensible answer: one host, light steady load, two people. Trigger to change: need for high availability, downtime-free updates, multiple hosts, or sharp growth.

**Q7:** Accept any honest pair.

## Common weak submissions

- Claims Kubernetes replaces Docker or makes Dockerfiles obsolete.
- Recommends Kubernetes for the scenario with no concrete trigger.
- Defines "self-healing" as "fixing bugs in the app."
- Says deployment is impossible without Kubernetes.
- "No simple equivalent" written for every row without thought.

## Fast verification recipe

1. In Q3, confirm the words "same images" and "runtime" appear.
2. In Q6, confirm a trigger sentence exists ("I would revisit if…").
3. In `manifest-reading.md`, confirm they read `replicas` as a count of copies and `image` as a reference to the same kind of image they build with Docker.
