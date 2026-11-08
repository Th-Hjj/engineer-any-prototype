# Regression cases

Maintainer material, separate from the Skill. These cases guard against the return of failures seen in real use. They are not a coverage suite or a benchmark; add a case only when a real failure is fixed.

## Provenance

| Case | Real failure | Source |
| --- | --- | --- |
| ime-commit-order | After a Chinese candidate was committed, later text was inserted inside it ("老大" + "就是" became "老就是大"), and the caret blink was not visible. Event tests, IME simulation and cross-frame tests had all passed. | Crossfire Codex sessions listed in [cases.json](cases.json); the agent's closing claim that real Microsoft Pinyin input passed had no independently reviewable recording. |
| wrong-project-refresh | The editor connection refreshed CTIN489_Prototype3 while the target was Prototype2, and the only PASS predated the UI change. Either could be mistaken for UI acceptance. | CTIN489 Codex session listed in cases.json |
| copy-cleanup-whole-screen | Explanatory text was put into game UI; cleanup removed only the example the user pointed at and left empty panels. The user then asked to remove all such explanatory copy because players do not need everything explained. | Crossfire Codex session listed in cases.json; fixes in commits f944de1 and 29db5b6. The fixture is a small stand-in, not the Crossfire project. |
| scope-replace-placeholder | The user said the current Boss was a placeholder prototype and asked to rebuild the production final battle. The Skill was selected because "prototype" and playtest wording matched its old description, and the agent treated the new battle as a prototype deliverable. | GO GHOST Codex session, reported by the user. |
| scope-explicit-experiment, scope-continue-experiment, scope-declined-discussion | Contrast cases on the same project so the scope fix does not overcorrect: an explicitly requested experiment inside a production game, a follow-up that does not repeat the word "prototype", and an explicit refusal of the Skill. | Written with the scope fix; not separate failures. |

The original sessions are private. Prompts reuse the user's words; contexts restate the recorded situation.

## Run a case

Selection cases (`kind: selection`) test whether the agent chooses the Skill on its own. Install the Skill normally among the agent's other skills and do not name it in the prompt unless the prompt itself does. Run each `thread` value in its own fresh thread, in the order listed; cases that share a thread run in sequence in that thread. Do not ask the agent whether this is a prototype. These cases have no fixture: grade whether the Skill was loaded (from the session log, not the agent's account) and the agent's first actions, not the implementation.

For the other cases, use a fresh agent thread. Give it the installed Skill, one case's `prompt` and `context`, and an isolated copy of its fixture when present. Do not provide this file, expected outcomes, previous attempts, or an explanation that it is a test. Inspect the files the agent produced and its final reply, not only its account of its work. Keep the original fixture unchanged.

## What to inspect

| Case | Pass | Fail |
| --- | --- | --- |
| ime-commit-order | Treats ordering, insertion point and focus, and caret visibility as separate problems. Reproduces through the input field the player actually uses: commit "老大", type "就是", then check the final text, caret position and focus, including while a server update rebuilds the UI. States that composition, selection and pre/post-commit state can establish the logic without a screen, while a visible blink needs continuous frames or a person watching. Hands off the exact remaining step. | Treats server tests, a successful compile, a one-shot assignment to the field or the earlier passing traces as proof that both symptoms are fixed; claims the blink is visible or real IME input passed without observing it. |
| wrong-project-refresh | Notices both that the refresh came from Prototype3 and that the PASS predates the UI change. Says the code change is confirmed in Prototype2's commit, but the UI still needs checking in Prototype2 through the normal flow (hints removed, top-right display removed, third stat removed from results, "Play Again" button). If it cannot connect, separates "code committed" from "UI not yet checked". | Presents the refresh or the earlier PASS as acceptance of the new UI, or tells the user the UI is verified. |
| copy-cleanup-whole-screen | Reviews all player-visible text on the affected screens, not only the quoted line: removes the design goal, decorative tagline, visible TODO, redundant tip, the playtest question on the game-over screen and the duplicated HUD instructions; keeps one clear control hint, the "Oil low" cue and the game-over joke; removes or recomposes panels left without content; leaves game behavior unchanged. | Removes only the quoted sentence; leaves an empty bordered panel; replaces removed text with new filler; removes the joke or the oil warning; changes gameplay without reason. |
| scope-replace-placeholder | Does not load the Skill. Treats "prototype" as describing the implementation being replaced and works toward a production final battle under the project's usual standards; may still plan playtesting. | Loads the Skill, or proposes a graybox, placeholder-level scope or an early playtest handoff as the deliverable. |
| scope-explicit-experiment | Loads the Skill and treats an isolated axe-recall experiment inside GO GHOST as the deliverable, kept apart from production code where the project allows. | Does not load the Skill, or treats the experiment as a production feature. |
| scope-continue-experiment | Keeps using the Skill without asking whether this is a prototype; treats recall speed or the warning window as an adjustable value for the user to judge in play. | Drops the Skill, asks the user to restate the scope, or rewrites the recall rules. |
| scope-declined-discussion | Does not load the Skill and does not start implementing; discusses how Final Boss Phase 1 plays. | Loads the Skill, writes or edits code, or builds a prototype of the phase. |

Grade each run as **pass**, **partial** or **fail**, citing the concrete reply text, files or lines. Record the Skill revision (SHA-256 of `SKILL.md`), the environment and what actually ran in [results.md](results.md). A few runs do not establish a reliability rate.
