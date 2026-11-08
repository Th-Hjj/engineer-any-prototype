---
name: engineer-any-prototype
description: >-
  Build a playable game prototype, or implement, fix, and iterate a prototype
  already established as the current deliverable, from a description, design
  notes, a single mechanic, or a non-digital game, including an isolated
  experiment inside an existing project. Use when the user asks for a prototype
  or prior conversation clearly identifies the work being continued as
  prototyping. A placeholder implementation, playtest feedback, or an early
  iteration of a production feature does not establish prototype scope.
metadata:
  version: "0.3.0"
---

# Engineer Any Prototype

Help the user turn the experience they describe into a digital prototype they can operate, judge, and change. Build the requested experience in playable increments. Prefer the simplest implementation that preserves it, without silently narrowing the user's requirements. Keep the user's creative direction intact while actively handling implementation.

## Confirm prototype scope

Determine scope from what the user wants delivered now. Distinguish references to an old prototype, such as a placeholder being replaced, from requests to build or continue one. An existing game can contain an explicitly requested prototype. Once prototype work is established, carry it into follow-ups without asking the user to restate it. When prototype scope is unclear, continue with the ordinary game-development or design task. Respect an explicit request to avoid this skill throughout the continuing task.

If this skill was loaded for work that is not a prototype, or the user moves from prototyping to production, stop applying its prototype defaults (grayboxes, placeholders, deferred polish, the smallest playable scope, an early playtest handoff) and follow the request and the project's usual standards.

Accept incomplete ideas and local systems. Work directly from the user's input or from Prototype Anything; require neither another skill nor a complete design document, finished game, or formal validation hypothesis.

Use the user's language for conversation and delivery instructions unless they request otherwise.

## Collaborate at the right level

- Read relevant material and prior decisions before asking questions. Continue related follow-ups from the current state; preserve established terminology, follow the user's latest corrections, and keep different projects separate.
- Match the user's experience and desired involvement. Give beginners the setup help and short, executable instructions they need; use an experienced developer's existing conventions. Ask about experience only when it affects the next step and cannot be inferred.
- Use a brief mirror-back when it resolves meaningful ambiguity. Ask only questions that block useful progress. When the direction is clear, proceed without questionnaires, repeated confirmations, or lengthy methodology explanations.
- Make routine implementation choices within the request and the user's delegation. Use adjustable starting values and placeholders where needed; distinguish these provisional choices from the user's design decisions. Explain assumptions that materially affect experience, scope, cost, or technical direction.
- Discuss consequential changes to core rules, essential interactions, or an established technical direction before applying them when they fall outside the user's stated delegation. Do not silently drop a requirement or substitute a different experience for engineering convenience. Continue independent, authorized work while a decision is pending.
- Follow the user's current intent. A natural request to build or change something is enough to act; a question or request to discuss an option does not automatically authorize applying it. Carry authorized implementation through to a usable handoff rather than stopping at a plan or code fragments.

## Build and iterate

Use the following sequence to move toward something the user can try. Revisit the relevant step as needed, and enter at the appropriate point for an existing prototype or a small fix. Do not turn these steps into approval gates or require a planning document for every change.

### 1. Understand the experience and inspect the environment

Identify what the player does, how the game responds, and how the interaction is intended to feel. Match the level of presentation to what the user needs to try or judge in this iteration. Infer this from the available description where possible; do not require a formal experience-goal document. Preserve the user's stated constraints and open questions; clarify only what implementation needs now.

For existing projects, inspect the project instructions and the entry points, code, scenes, assets, dependencies, and runtime relevant to the task. Broaden the investigation only when dependencies or observed problems require it. Establish what currently works or fails; do not infer implementation from filenames or old documentation alone.

For a non-digital experience, identify the behaviors, relationships, and feedback that must survive the conversion. Make consequential changes of medium explicit.

### 2. Choose the smallest faithful implementation

Use the project's existing tools and decisions where they fit. Choose the engine, platform, 2D or 3D presentation, and multiplayer approach for the actual experience and available environment. When several approaches fit, consider the user's familiarity and the effort needed to set up, play, modify, and share the prototype—not just how quickly the AI can generate it. Do not default every project to the same stack or silently change a requested platform.

In a Unity, Godot or browser project, read [engine-notes.md](references/engine-notes.md) for entry points and engine-specific pitfalls before editing project files or choosing how to verify.

Briefly explain the next playable scope and any meaningful tradeoff. Prefer a direct implementation over infrastructure for hypothetical future reuse. Research technical questions when they affect the work; run a focused feasibility experiment only for a concrete risk to the core interaction, then bring the result back into the prototype.

If a required capability is unavailable, explain the specific constraint and the closest faithful options. Ask before replacing the core experience with a more convenient substitute.

### 3. Make the core interaction work from end to end

Connect a real entry point, player input, system behavior, and perceivable feedback early. Add only the content needed to experience that interaction and, where relevant, continue or try again. Let the experience determine whether menus, levels, objectives, or win conditions are needed.

Use grayboxes, placeholder assets, small content sets, and temporary solutions freely. Preserve what the user needs to feel or observe: movement and physics need real behavior when they are central; interactions between players need actual multiplayer in the intended form.

Keep changes to existing projects focused and preserve working behavior. Make the core interaction responsive and perceivable. Choose feedback and presentation based on what serves the intended experience. Sound, animation, visual effects, and other forms of polish are options, not requirements. Avoid adding effects that do not meaningfully contribute to the playtest. Use existing or lightweight placeholder assets when useful.

Defer presentation work that does not help the current playtest. Avoid unnecessary UI, explanations, peripheral systems, broad refactors, and general-purpose frameworks. Expose a few consequential, unsettled values as easy-to-find parameters when this helps iteration.

Read [core-interaction-pitfalls.md](references/core-interaction-pitfalls.md) when implementing movement, physics, input or restart behavior. It separates implementation errors to fix directly from feel-relevant parameters that belong to the user.

Do not turn game descriptions, design rationale or development notes into UI copy. When creating a screen or simplifying UI copy, review all player-visible text on the affected screens and recompose the layout after removing text. Read [player-facing-text.md](references/player-facing-text.md) before writing or revising player-visible text.

### 4. Check the result and provide a playable entry point

Test enough to catch issues that matter for the next playtest, including startup, input, and a representative core interaction when the environment supports it. When running the prototype, check that key responses can be seen or heard, that their timing supports the interaction, and that the presentation does not obscure play. Check important behavior this change could break. Add tests where they resolve a concrete risk; do not build comprehensive test infrastructure before the first playtest.

When no one is watching the screen, verify as far up this ladder as the environment allows. Evidence counts only if it comes from the project, build or running process you actually changed, and only if it was collected after the change.

1. The target project or build compiles or loads without errors.
2. The core interaction runs from the real entry point under scripted input (an automated test, input replay or headless run).
3. State or logs confirm the expected response.
4. Captured frames or recordings show the feedback appears at the right moment.
5. The user plays it — the only rung that judges feel.

Use the cheapest means that reaches each rung; do not build test infrastructure just to climb it.

For multiplayer, check the intended interaction between participants or instances. Simulated input, a single instance, compilation, or source inspection do not by themselves establish that the core interaction works.

Provide the project or build, its usable entry point, necessary dependencies, brief launch instructions, and controls. Keep the handoff focused on helping the user play or continue. Name the highest verification rung reached and how to check the next one in one line; do not turn it into a verification report. List the provisional values and placeholders you introduced so the user can tell them from their own design. Mention blockers or limitations only when they materially affect play or continuation, and never claim results that were not actually observed. Once the requested interaction and its basic feedback are ready for the user to judge through play, hand it over rather than adding speculative improvements that depend on playtest feedback. Leave only the records needed to continue later.

### 5. Iterate from what happened during play

Start from the user's concrete observations. Distinguish implementation errors, feel or parameter issues, rule problems, and unclear feedback before choosing a change. Use the smallest useful change to investigate or improve the experience.

When rules confuse players, consider simplifying the interaction before adding tutorial text, and discuss any change to the user's core design. Return to design or propose a different approach when the experience calls for it. Let evidence and the user's goals drive the next iteration, without a fixed schedule or an obligation to preserve an unsuccessful implementation.

Before handing off, check that the user can follow the launch instructions, operate the intended interaction, and perceive its key feedback. Keep the explanation proportional to what they need to try it and continue.
