# U01 — What React is, and why a designer should care

**Phase 0 — Orientation**

## Where you are

This is the second unit in the course. U00 gave you the map, the rules, and the stuck protocol. U01 explains **where we are going**: what React actually is, what problem it solves for a human, and why your design instincts already prepare you for it.

There is no installation in this unit and no code to type. This is the "look at the mountain before we climb it" unit. That is deliberate — you should know what a word means before anyone asks you to use it.

## What you will be able to do

By the end of this unit you can:

- Explain, in your own words, what React is and what problem it solves.
- Explain what a **component** is using an analogy to a symbol or component in your design tool.
- Say honestly what React is **not**, so you stop expecting it to be something it isn't.
- Describe the road from a design file to a working web page, and where React sits on that road.

## What you need already

- **U00 — How this course works.** That is the only prerequisite.

If terms below feel new, that is expected. They are defined in this unit before you are asked to do anything with them.

## Time and energy

About **45–75 minutes**. This unit is reading and reflecting, not installing. Take breaks. It is completely fine to read it twice; the second pass is usually where it clicks.

## Why this exists

Most people who bounce off React did not bounce because React is impossible. They bounced because the first explanation was "a JavaScript library for building user interfaces" — a sentence made entirely of words they had not been given. That sentence assumes you already know JavaScript, already know what a library is in code, and already know what "user interface" means to a programmer.

You are a designer. You think in composition, spacing, states, and reuse. This unit translates the programmer's sentence into yours. If you leave knowing *why* React exists, every later command will feel like it has a purpose instead of being a ritual.

## Plain-language teaching

### The problem React solves (in human terms)

Imagine a web page with a button that appears in five places: a sign-up card, a settings panel, a dialog box, a toolbar, and a footer. You design it once — good. But the page has to be *built*, and every one of those five buttons is its own piece of markup with its own copy of the styling and behavior.

Now imagine the client says: "Make the button rounded." In a design tool, you change the master component and every instance updates. On a hand-built web page, someone has to find all five buttons and change all five — and if they miss one, the page is subtly inconsistent. This is the everyday pain that React was created to remove.

**Plain definition.** React is a **JavaScript library for building interfaces out of reusable parts.** We will unpack every word of that sentence below, because that is the whole job of this unit.

### Unpacking the sentence, one word at a time

**Interface.** The part of the software a person actually sees and touches: the screen, the buttons, the text, the images, the forms. You already design interfaces.

**JavaScript.** A programming language that web browsers understand. It is the language that lets a page *change* — respond to a click, show a menu, update a number. JavaScript is not HTML and not CSS; we will meet all three properly in phase 1.

**Library.** A collection of pre-written, reusable code that does common jobs so you do not start from zero. A library is not a full app; it is a toolbox you call on when you need it. (You do not have to install anything to understand that description — installation comes much later, in U08.)

**Building.** Writing the instructions that produce the interface.

**Interfaces out of reusable parts.** Instead of writing each button five separate times, you describe the button **once** and place it wherever you need it. Change it in one place; it changes everywhere. If that sounds exactly like what a component or symbol does in your design tool, good — that is the same idea, and it is the heart of React.

### Components, in design language

A **component** in React is a named, reusable piece of interface. It bundles three things that belong together:

1. **Structure** — what is in it (text, an image, an input).
2. **Look** — how it is styled.
3. **Behavior** — what happens when someone interacts with it.

Here is the bridge to your world:

| In your design tool | In React |
|---------------------|----------|
| A master component / symbol | A component |
| An instance placed on a screen | Using the component in the interface |
| Overriding text or color on one instance | Configuring the component (later we call this **props**) |
| Changing the master updates all instances | Editing the component updates every place it appears |
| Variants of a component (default, hover, disabled) | The component handling different **states** |
| A page composed of frames and components | An app composed of components inside components |

You are not learning a foreign religion. You are learning the same craft, with different nouns and a keyboard.

### What React is *not*

Naming the wrong expectations is as useful as naming the right one.

- **Not a design tool.** React does not replace Figma, and it will not draw for you. You still decide layout, hierarchy, and color; React is how those decisions become a real page.
- **Not a website builder.** It does not give you a drag-and-drop canvas. It is a toolbox you write with.
- **Not a programming language.** It is written *in* JavaScript, using JavaScript's rules.
- **Not a replacement for HTML and CSS.** React sits on top of them. Every React interface still becomes HTML and CSS in the browser. This is why we learn HTML and CSS first.
- **Not magic, and not instant.** There is a real learning curve. The course paces it on purpose.

### Where React sits on the road

Think of building a page as a chain. Each link depends on the one before it:

```text
interfaces are built from parts
  → HTML gives those parts structure
    → CSS gives them their look
      → the browser turns them into a page (the DOM)
        → JavaScript can change that page
          → components name reusable parts
            → (and further along, JSX, props, and state)
```

React enters near the **bottom** of that chain, not the top. It is excellent at naming reusable parts and letting JavaScript change the page — but it still speaks in HTML and CSS underneath. That is precisely why this course teaches HTML and CSS first, in U02–U04, and only starts React in U11. The order is not bureaucratic; it is how the ideas actually stack.

### Honest scope

Here is what you will honestly be able to do by the end of this course, with no exaggeration:

- Build a small, real, static front-end page in React — a handful of components and one interactive detail.
- Read and adjust an existing React project enough to be useful in a team.
- Speak the same vocabulary as the developers you hand off to, so reviews and handoffs go better.

Here is what this course does **not** promise: that you become a full software engineer, that you learn databases and servers, or that you will be building large production apps alone. When a course over-promises, learners blame themselves for not reaching an impossible bar. This course will not do that to you.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| React | A JavaScript library for building interfaces from reusable parts | Not a design tool; not a language |
| JavaScript | The programming language browsers understand that lets a page change | Not Java; not HTML; not CSS |
| Library | A toolbox of pre-written, reusable code | Not an app by itself; not a framework you must obey |
| Interface | The part of software a person sees and touches | Sometimes called "UI" (user interface) |
| Component | A named, reusable piece of interface (structure + look + behavior) | Not a part of a car; not just a visual symbol |
| Reusable | Written once, used in many places | Not "copy-pasted many times" |
| Render | To turn described parts into what is actually shown on screen | Not "download" |
| Props | The settings you pass into a component to configure an instance | Not taught in this unit; coming in U13 — here it is only named |
| State | The part of a component that can change (a menu open, a count) | Not taught in this unit; coming in U17 — here it is only named |
| DOM | The browser's live, structured model of the page | Explained properly in U02; here it is only named |

## Worked example

This is a **thinking example**, not code to type. It shows the difference React exists to make. Read it slowly.

**Scenario:** A team designs a "notification card." One card appears in three places: a top banner, a sidebar, and a settings screen.

**The hand-built way (before React-style thinking):**

```text
Card 1 (banner):    its own copy of the padding, border, text, and icon
Card 2 (sidebar):   its own copy of the padding, border, text, and icon
Card 3 (settings):  its own copy of the padding, border, text, and icon
```

Three copies. Tomorrow the border color changes. Whoever builds this must find and edit all three.

**The component way (React-style thinking):**

```text
One definition:  NotificationCard  =  padding + border + text + icon
Place it:        use NotificationCard in the banner
                 use NotificationCard in the sidebar
                 use NotificationCard in the settings screen
```

One definition, three uses. Change the border once; all three update. This is the exact same promise as a master component in your design tool.

**Why this matters:** React is not primarily about *looking* different. It is about changing the *cost* of maintenance. Designers feel that pain constantly — the "did we update every instance?" panic. React is one serious answer to it.

**Predict before you read on:** if one of the three cards needs different text, does that mean you must make a whole new component? (Answer: no. You keep one component and hand it different text — that handing-in is what "props" will mean in U13. Just recognize the shape for now.)

## Common errors

### Error: "React is a design tool, so I can skip learning HTML and CSS."

**What happens:** Later units feel impossible, because React produces HTML and CSS in the browser. Skipping the foundation is the single most common reason people stall.

**Fix:** Trust the order. U02–U04 exist so that React has something solid to stand on.

### Error: "I must master all of JavaScript before I touch React."

**What happens:** You study JavaScript for months, never reach React, and lose momentum.

**Fix:** This course teaches only the JavaScript you need, right before you need it (U05–U07). Enough to be useful, not a computer-science degree.

### Error: "Let me install everything now so I'm ready."

**What happens:** You install tools you cannot yet explain, hit an error, and conclude you are "bad at this." The tooling is not earned yet.

**Fix:** Installation is taught — and only taught — in U08, after you know what Node and npm are for. For now, keep your hands off the terminal.

### Error: Reading "library" as "framework" and worrying about rules.

**What happens:** You expect React to dictate your whole app's shape and feel overwhelmed.

**Fix:** A library is a toolbox you reach into. It is called on when needed, not a lifestyle. Precision comes later; for now, "toolbox" is enough.

## Checkpoints

Answer these in your own words. If you can, you are ready for the assignment:

1. In one sentence, what problem does React solve better than building a page by hand?
2. What are the three things a component bundles together?
3. Name one thing in your design tool that a React component is *like*, and say why.
4. Name two things React is *not*.
5. Where does React sit in the chain: before or after HTML and CSS? Why does the order matter?

## Practice exercises

These are ungraded. Struggle is allowed and useful here.

### P1 — Retell the sentence

Cover the lesson. Write the sentence "React is a JavaScript library for building interfaces out of reusable parts" and then, underneath, translate each of those six words into your own plain language. Peek when stuck.

### P2 — Design bridge

Pick one component you actually reuse in a design file (a card, a button, an avatar, a tag). Write 2–4 sentences describing what it bundles: its structure, its look, and its behavior. This is the exact way you will later describe a React component.

### P3 — Predict then check

Look at the "hand-built way" example. Predict what happens to the three cards when the border color changes in the hand-built version **and** in the component version. Write both predictions, then re-read the worked example to check.

### P4 — Scope honestly

Write two lines: one thing you hope to build by the end of this course, and one thing that is outside this course's scope (see "Honest scope"). Being honest about the second protects you from disappointment.

### P5 — Spot the wrong mental model

Here is a sentence a learner wrote: *"React draws my screens for me, so I can stop using Figma and just type colors."* Name the two things wrong with it.

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md). Read it **before** you write the assignment; there are no secret criteria.

## What is *not* in this unit

- No installing anything (Node arrives in U08).
- No code, HTML, CSS, or JavaScript to write.
- No components, JSX, props, or state yet — those are named here only so they are not strangers later.
- No second design tool required; your existing tool is enough.

## Next unit

**U02 — What a web page is made of.** We look under the hood of any page: HTML, CSS, and the tree the browser builds (the DOM), using inspection tools — no writing code yet.
