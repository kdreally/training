# U31 Rubric

Visible to learners. Total **20 points**.

| Criterion | Points | Must-have? | Evidence |
|-----------|--------|------------|----------|
| Correct plain-language explanation of "deploy" using host/runtime/service | 4 | Yes | `answers.md` Q1 |
| Three ingredients named and consequences of each missing | 3 | Yes | `answers.md` Q2 |
| Restart policy choices are sensible and justified | 4 | Yes | `answers.md` Q3 |
| Reboot prediction for `unless-stopped` is correct (stays stopped) | 3 | Yes | `answers.md` Q4 |
| "Restart ≠ healthy" reasoning is sound; suggests logs/health check | 2 | No | `answers.md` Q5 |
| Honest reflection (one clear, one fuzzy) | 1 | No | `answers.md` Q6 |
| Evidence transcript complete and shows `RestartCount` > 0 | 2 | Yes | `evidence.txt` |
| Deploy note explains host, command, and flags; names a real limitation | 1 | No | `deploy-note.md` |

### Partial credit notes (assessors)

- Q1: award half if host/runtime/service appear but one is misused (for example calling a container a host).
- Q3: award 1 point per policy that has a valid situation; award 2/4 if situations are real but justifications are missing.
- Q4: the key idea is "`unless-stopped` respects a manual stop." No credit if they say it restarts anyway.
- Evidence: if they show a restart but never a count, award 1/2. If they never actually killed the process, award 0/2.
- Do not penalize imperfect English. Penalize empty or copy-pasted lesson text.
