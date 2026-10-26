# U25 Assessor notes

Assessor-only.

## Spec

- Asha, Asha, b1 → `already-borrowed`.
- Asha then Ben on b1 → Ben ok.
- Asha then Ben on b2 → `no-copies`.
- Asha then Asha on b2 → `already-borrowed` (conflict; same borrower wins over the copies wording).
- Unknown book and blank borrower unchanged.
- `returnLoan` untouched. No HTTP.

Accept a different conflict winner only if the spec is explicit and the prompt matches. The rubric asks for `already-borrowed`. If they pick `no-copies` and say so, award 2/4 on that row: they decided, but not the decision the assignment named. Do not give 0 if the choice is conscious and the rest of the keeps are intact. Actually the rubric says score 0 if "either is fine". A conscious opposite choice is partial: 2/4.

## keep.md

Concrete calls. "Existing behavior stays" alone fails the row.

## Prompt

Allowed files loans + test + changelog. Stop: do not change expected `no-copies`.

## Q2

Restore tests and code. Tighten: "the Asha/Ben b2 test stays no-copies; do not edit that assertion." Do not prompt "make tests consistent."

## Common weak submissions

- already-borrowed for every rejected borrow, including unknown books.
- Simplify `borrow` in the prompt.

## Partial credit

See conflict-winner note above.
