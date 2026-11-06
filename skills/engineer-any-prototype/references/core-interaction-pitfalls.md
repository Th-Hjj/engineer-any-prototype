# Core interaction pitfalls

Two kinds of problems look alike in a playtest ("it feels wrong") but need different handling. Decide which kind a problem is before changing anything.

## 1. Implementation errors: fix directly

These make the prototype behave differently from what was built. Fixing them does not change the user's design.

- **Frame-rate-dependent motion.** Movement, timers or forces not scaled by frame time make speed depend on the machine.
- **Physics moved in the wrong step.** Physics bodies moved in the per-frame update, or positioned directly instead of through the physics API, jitter or skip collisions.
- **Lost or doubled presses.** Discrete input (a press or release) read only inside the fixed physics step can be missed or counted twice. Read it per frame and consume it in the physics step.
- **Delta spikes.** A pause, tab switch or breakpoint produces one very large frame time that teleports objects or tunnels them through walls. Clamp the step.
- **Tunneling.** Fast, small objects pass through thin colliders. Use continuous collision, a ray or shape cast, or thicker colliders.
- **Incomplete restart.** Retrying keeps stale timers, static fields, singletons or autoload state, so the second attempt differs from the first.
- **Slow retry.** When the playtest depends on trying again, a restart that needs several steps or a full reload hides the interaction being tested.
- **Text input and IME.** After a composition (for example a Chinese candidate) is committed, the committed text and the caret must sit where the player expects, so that further typing continues after it. An asynchronous UI update, such as a server message rebuilding the panel, must not steal focus or reset the selection. A simulated event trace that looks correct does not show that the caret is visible or blinking.
- **Unreproducible randomness.** An unseeded random source makes a reported problem impossible to reproduce. Log or expose the seed.

## 2. Feel-relevant parameters: expose, do not add silently

These change how the interaction feels, so they belong to the user's design. When the description specifies one, implement it as specified. When it does not, do not add it on the user's behalf. If the interaction cannot be judged without one, add it as an adjustable parameter, start it at a neutral value where one exists, and name it in the handoff.

- Input buffering: an early press that still counts.
- Late-input grace, such as coyote time.
- Acceleration, deceleration and stopping friction.
- Dash or jump distance, duration, cooldown, cancel windows and invulnerability frames.
- Gravity scale and variable jump height.
- Hit pause, screen shake, camera smoothing and look-ahead.
- Aim assist, magnetism or snapping.

A playtest complaint can come from either kind. For example, "the dash sometimes doesn't fire" may be a lost press, which is a bug, or the absence of input buffering, which is a design choice. Check for the bug first; raise the design choice with the user.
