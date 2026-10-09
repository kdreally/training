# U16 Assessor notes

Assessor-only. Do not link from learner README.

## Model answer sketch

**State inventory:** signed out → "Please sign in…"; signed in + no messages → friendly empty state + guidance; signed in + messages → list.

**part 2 (why empty states matter):** A new user often has zero data. Without an empty state they see a blank area and may think the app is broken. The empty state is the first impression for many users.

**part 3 (condition):** `messages.length === 0` decides empty vs loaded. Using the array itself (`messages ? ...`) always takes the "true" branch because `[]` is truthy, so the empty state would never show.

**part 4 (tool choice):** Signed-out → early return (distinct whole view). Empty vs loaded → ternary (exactly two options). A learner may reasonably use `&&` for one branch and a ternary for the other; accept if justified.

## Sample `MessageList.jsx`

```jsx
function MessageList({ isSignedIn, messages }) {
  if (!isSignedIn) {
    return <p>Please sign in to see your messages.</p>;
  }

  return (
    <section>
      <h2>Messages</h2>
      {messages.length === 0 ? (
        <p>No messages yet. When someone writes to you, it will appear here.</p>
      ) : (
        <ul>
          {messages.map((m) => (
            <li key={m.id}>{m.text}</li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default MessageList;
```

## Error-reading model

With `items=[]`, `items.length` is `0`. `0 && <b>...</b>` short-circuits to `0`, so React renders the numeral `0`. The page reads "You have 0 in your cart." (or similar with a stray 0). Fix:

```jsx
{items.length > 0 ? <b>{items.length} items</b> : <b>0 items</b>}
```

Rule: **never put a number on the left of `&&`; make the condition a real boolean.**

## Common weak submissions

- Ships only the loaded state; empty state entirely absent.
- Checks `messages && ...` instead of `.length`.
- Empty state is the literal word "empty" or a blank `<div>`.
- Nested ternaries four levels deep.
- Error-reading that adds a `+ ""` hack instead of making the condition boolean.

## Common wrong-but-thoughtful answers

- Using `&&` for both branches by writing `messages.length === 0 && <Empty/>` plus `messages.length > 0 && <List/>`. Verbose but correct; award full if it works and they explain the readability tradeoff.
- Using `if/else` statements with two returns instead of one early return + ternary. Accept; note early return is preferred for the distinct-view case.
- Wondering why `[]` is truthy. Good question — JavaScript defines all objects (including arrays) as truthy; only `.length` reveals emptiness. Credit the curiosity.

## Notes on running

- `npm run dev` from the project folder. No new tooling.
- The `isSignedIn` and `messages` values are constants here; interactive toggling arrives in U17.
