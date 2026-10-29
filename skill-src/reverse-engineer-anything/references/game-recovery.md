# Recovering a Unity game

Use `inspect_game_project` on the caller's exported project directory when the
connected server advertises it. CLI fallback from this fork's built checkout:
`node scripts/rea.mjs inspect-game-project /absolute/project --json`.
This is a target-free read-only operation; do not open a native target first.
The upstream npm release may not include the fork's capability.

Read exact case/meta/GUID and build-scene observations before proposing repairs.
Keep original paths, GUIDs and backups when a repair is authorized. The inspection
does not itself repair files. Unresolved Assets-index script GUIDs may belong to
Packages, and inert-looking C# methods are heuristic candidates, not proven stubs.
Use the reported file/line and digest for review. Do not imply that a successfully
imported scene contains functioning gameplay.

For APK inputs, inventory each base/ABI/data split separately with archive tools.
JADX covers Java/Kotlin, not native Unity IL2CPP gameplay. Establish whether real
CIL is present before choosing managed decompilation. An IL2CPP native image and
metadata require native analysis and an authenticated address mapping. Keep
Cpp2IL's RVA/file offset, linked native address and provider database address
distinct. Verify original bytes, including method extents, before translation.

AssetRipper and Cpp2IL are external caller-supplied tools. A DLL or C# file with
correct class names may still contain empty/default/throw-null bodies. Verify
the actual tool version's output rather than trusting an “IL recovery” mode name.
REA does not automatically convert IL2CPP to a playable C# project.

When a playable restoration is requested, trace a complete flow from launcher
through input, physics/game rules, scoring, loss, retry and save/load. Preserve
method-level native evidence and distinguish translated logic from authored UI,
bootstrap and platform adapters. Record unresolved coroutines, effects and service
dependencies. Do not invent behavior and label it decompiled source. Verify the
actual Unity player and the selected target platform before claiming equivalence.

The static project tool returns its budgets and every skipped path. Symlinks,
binary serialization, packages and unsupported C# syntax can leave incomplete
coverage. Do not convert missing coverage into proof that code or assets are absent.
