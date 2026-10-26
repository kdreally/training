# U09 Assessor notes

Assessor-only.

## Model constraints

See the catalog in the unit README and the worked file in U10. Wording may differ. Each category must support a yes/no.

Special checks:

- Changelog says accepted behavior, not every action.
- Dependencies: stop and ask, do not install.
- Database: no connection, including "just this once."
- Honesty: stop on conflict, do not invent routes.

## Q1

- production-ready → drop or rewrite into tests + no secrets + no prod connection.
- log every tool call → rewrite to one line per accepted behavior change.
- small libraries → drop. This is the door `date-fns` uses.
- improve nearby code → drop or rewrite as "do not edit unnamed files."
- database unless it needs persistence → rewrite to a ban, or "stop and ask; do not connect." The original sentence lets the agent decide that persistence is needed.

## Q2

Dependencies: fail. Changelog: fail. Restore the turn.

## Q3

A human commit makes the dependency reviewable on its own, with a reason. An agent install hides the grant inside a feature diff. The standing rule is "stop and ask" so the human can say no.

## Common weak submissions

- "You may add small packages" copied into `constraints.md` because it sounds pragmatic.
- Changelog rule that says log all actions, which the lesson asked them to outgrow.
