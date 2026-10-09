# U32 Rubric

Visible to learners. Total **20 points**.

| Criterion | Points | Must-have? | Evidence |
|-----------|--------|------------|----------|
| Four one-host limits named and explained | 4 | Yes | `answers.md` Q1 |
| Scheduling, scaling, self-healing defined correctly with examples | 4 | Yes | `answers.md` Q2 |
| Docker/Kubernetes relationship correct (same images; runtime underpins it) | 3 | Yes | `answers.md` Q3 |
| At least three sensible "when not to" cases with costs | 3 | Yes | `answers.md` Q4 |
| Concept-mapping table substantially correct | 2 | Yes | `answers.md` Q5 |
| Recommendation is specific, reasoned, and names a trigger | 2 | No | `answers.md` Q6 |
| Manifest questions answered correctly | 2 | Yes | `manifest-reading.md` |
| Honest reflection | 0–1 | No | `answers.md` Q7 |

### Partial credit notes (assessors)

- Q1: 1 point per limit correctly identified (cap 4); explanation not required for full marks if the limit is clearly named.
- Q2: award 1.5 per term with a valid example; a correct definition with no example earns 1.
- Q3: the two decisive facts are "Kubernetes uses the same container images" and "it needs a container runtime (for example containerd) on each node." Award 1.5 each.
- Q5: key mappings are service→Deployment (or Pod), `ports:`→Service/containerPort, `volumes:`→PersistentVolume/PVC, `restart:`→part of desired-state via controllers, `depends_on:`→no simple equivalent (accept "readiness probes / init containers" as a thoughtful answer).
- Q6: full credit requires a trigger to revisit; a choice with no trigger earns at most 1.
- Do not penalise learners for not knowing `kubectl` commands; this is a survey unit.
