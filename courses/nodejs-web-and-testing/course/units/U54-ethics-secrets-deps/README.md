# U54 — Ethics: dependencies, secrets, not shipping keys

**Phase 6**

## Where you are

Final craft unit: responsibility that comes with running servers and installing code.

## What you will be able to do

- Explain supply-chain responsibility at beginner level.
- Define secrets and why they must not be committed.
- List safe habits for API keys, passwords, `.env` ideas.
- State honesty norms for assignments (what collaboration is OK).

## What you need already

- Phase 3–5 awareness

## Time and energy

**40–60 minutes.**

## Why this exists

Technical skill without ethics harms users (and your future self). Short, clear, non-preachy.

## Plain-language teaching

### Dependencies are trust decisions

Every package can run code on install/runtime. Minimize; prefer known sources; keep lockfiles; update deliberately (U21).

### Secrets

A **secret** is data that grants access: API keys, passwords, private tokens, private certificates.

**Never** put secrets in:

- Source code committed to git  
- Public READMEs  
- Screenshots of `.env` in public forums  

### Patterns

- Use environment variables (`process.env.SECRET`) loaded from a local untracked file  
- Provide `.env.example` with fake placeholders  
- Rotate keys if exposed  

### Assignment honesty

- You may discuss concepts with peers  
- Submitted code and written answers must be **your work** unless group work is declared  
- Copy-pasting whole solutions without understanding violates the point of the course  

### Users of your API

Even toy APIs: do not store real people’s private data casually; do not log passwords; validate input (you already learned why).

## Vocabulary

| Term | Plain meaning |
|------|---------------|
| Secret | Access-granting credential |
| Supply chain | Path of dependency code |
| `.env` | Common local env file pattern |
| Rotate key | Replace exposed credential |

## Worked example

Bad: `const KEY = "sk_live_abc"` in `server.js`.  
Good: `const KEY = process.env.STRIPE_KEY` with key only on deploy machine.

## Common errors

### Error: Committing `.env`

Add to ignore lists when using git.

### Error: “It’s only a school project” for real keys

Bots scan public repos.

## Checkpoints

1. What is a secret?
2. Why minimize dependencies?
3. What is `.env.example` for?
4. Honesty line for assignments?

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## Next unit

**U55 — Why a frontend; browser as a different runtime** (Track B), or stop here if your cohort is backend-only.
