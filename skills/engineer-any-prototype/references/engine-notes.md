# Engine entry points and pitfalls

Entry points and pitfalls only, not tutorials. Checked on 2026-11-06 against Unity 6 Test Framework and Godot 4.3/4.4 command-line documentation. Engines change: confirm flags and APIs against the version the project actually uses.

## Unity

**Entry points**
- Scenes in the build and their order: `ProjectSettings/EditorBuildSettings.asset`. The scene the user presses Play in may differ; ask or check the open scene when it matters.
- Packages: `Packages/manifest.json`. Input handling: `activeInputHandler` in `ProjectSettings/ProjectSettings.asset` (legacy Input Manager, Input System, or both).
- Editor automation: if the session has a Unity MCP server or CLI connected to a running Editor, prefer it for creating objects, wiring references and entering Play mode.

**Pitfalls**
- Every asset has a `.meta` file holding its GUID; scenes and prefabs reference GUIDs. Move, rename or delete an asset together with its `.meta`. Do not hand-write GUIDs; let Unity import new files and generate them.
- Scene and prefab files are YAML with cross-referenced file IDs. Hand-edit only small, known fields; create objects and references through the Editor, an Editor script or a connected tool.
- A `MonoBehaviour` can be added as a component only if its class name matches its file name.
- Serialized values stored in scenes and prefabs override field initializers. Changing a default in code does not change existing instances.
- With only the Input System active, legacy `Input.GetKey`-style calls throw at runtime.

**Verification entry points**
- Compile check: `Unity -batchmode -projectPath <project> -quit -logFile <log>`, then search the log for `error CS`.
- Tests: `Unity -batchmode -projectPath <project> -runTests -testPlatform EditMode|PlayMode -testResults <xml> -logFile <log>`. Do not add `-quit` while tests run; it is not supported. Tests require the Unity Test Framework package and a test assembly definition.
- A project already open in another Editor instance cannot be opened in batch mode at the same time.

## Godot 4

**Entry points**
- `project.godot`: `run/main_scene`, `[autoload]` singletons and `[input]` actions.
- Scenes (`.tscn`) and resources (`.tres`) are text and reference each other by `res://` path and `uid://` identifier.

**Pitfalls**
- Godot 3 and Godot 4 APIs differ substantially (for example `KinematicBody2D` became `CharacterBody2D`, and `move_and_slide()` takes no arguments and uses `velocity`). Confirm the major version before writing code from memory.
- Imported assets have `.import` sidecar files and cached results under `.godot/imported/`. Godot 4.4+ also writes `.uid` files next to scripts and shaders. Move these sidecars with their files.
- GDScript errors often appear only when a script is loaded. A project that opens is not proof that its scripts parse.

**Verification entry points**
- Import new assets without opening the editor: `godot --headless --path <project> --import`.
- Parse a script: `godot --headless --path <project> --script <script> --check-only`.
- Run the game headless for a fixed number of iterations and read the log for script errors: `godot --headless --path <project> --quit-after <iterations>`.
- `--script` runs a `SceneTree` or `MainLoop` script, which can drive scripted input and assert state.

## Browser (canvas, Phaser or similar)

**Entry points**
- `index.html` and the `scripts` in `package.json`, if any, identify the real start path and dev server.

**Pitfalls**
- Opening the page through `file://` breaks ES modules and asset loading in most browsers. Serve it over local HTTP.
- Browsers block audio until a user gesture. Create or resume the audio context on the first input.
- Space and arrow keys scroll the page unless the handler calls `preventDefault()`. Keyboard input needs a focused canvas or a listener on `window`.

**Verification entry points**
- Without a browser, run pure game logic under Node.
- With a headless browser available (for example Playwright), load the page, fail on console errors, dispatch input events and capture screenshots at the moments that matter.
