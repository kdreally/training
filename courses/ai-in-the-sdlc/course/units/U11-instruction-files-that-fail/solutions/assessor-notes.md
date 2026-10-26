# U11 Assessor notes

Assessor-only.

## Diagnosis

- Vague: "world-class," "clean," "production-ready," "DRY."
- Bloated: "40-page engineering handbook pasted below."
- Contradictory pairs (any one is enough if both sides are quoted): improve nearby vs never edit server.js; never edit server.js vs expose every function via the API; use lodash/dayjs/express vs do not add dependencies.
- Task-stuffed: microservices, overdue loans with dayjs.
- Secret: `shelf-demo-123`. Remove it. If real, rotate the credential, do not only delete the line.

## Repaired file

Same bar as U10. HTTP policy should not be both "never" and "always." Best repair: the task names files; the standing file does not demand an API for every function and does not forbid `server.js` forever.

## Q1

"Use well-known libraries (express)" and "expose it via the API" both bless the rewrite. "Do not add dependencies without asking" conflicts with the library list. The agent can quote the list. The file failed before the model did.

## Q2

IMPORTANT does not create a yes/no check. The agent still defines "clean."

## Common weak submissions

- Diagnosis that calls the whole file "bad" without the four modes.
- Repaired file that still contains the password "so the agent can test."
- New contradiction introduced: "never touch server.js" kept next to "update the API when functions change."
