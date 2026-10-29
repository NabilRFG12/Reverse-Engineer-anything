# Reverse engineering Unity games

The `Reverse-game` fork adds `inspect_game_project` to inspect a recovered Unity
project before trying to run it. The equivalent CLI command is
`inspect-game-project`. This capability is available from this checkout after
building; do not assume the upstream npm release advertises it.

It addresses a common failure: an export can contain every sprite and a valid
scene while its launcher, collision callbacks and game controller are still
metadata stubs. Successful import does not establish recovered gameplay.

## Inspect a recovered project

```sh
npm ci
npm run build:cached
node scripts/rea.mjs inspect-game-project /absolute/path/RecoveredGame --json
```

Development uses the Node/npm versions pinned in `.nvmrc` and `package.json`.
No Unity editor, Java, Ghidra or AssetRipper installation is needed for this
inspection. The target is a local directory containing `Assets` and
`ProjectSettings`; APKs use the archive and native workflows below.

Equivalent MCP request:

```json
{
  "name": "inspect_game_project",
  "arguments": { "path": "/absolute/path/RecoveredGame" }
}
```

Read the result in three parts:

- **Observations:** exact case-collision path groups; duplicate, malformed and
  missing meta files; serialized and decoded build-scene paths; and script GUIDs
  that are unresolved in the inspected Assets index. Package GUIDs can remain
  unresolved even in a healthy project.
- **Inferences:** located C# method candidates with empty bodies, default returns
  or `throw null`. Lifecycle candidates highlight `Awake`, `Start`, `StartGame`,
  `Update`, `FixedUpdate`, `OnEnable` and `OnCollisionEnter2D`. Legitimate no-op
  methods can look identical; these are inspection leads, not proof of missing code.
- **Unknowns and coverage:** compilation, execution and game-flow equivalence
  remain unknown. The C# scanner is lexical, not a compiler. Raw strings,
  preprocessors, properties and explicit interface implementations are not
  exhaustively analyzed. Binary serialization and package contents are not decoded.

Each inspected text file has a relative source path, byte count and SHA-256.
The report's `inspection_sha256` commits to those sources, observed paths and gaps;
it is **not a digest of the complete Unity project or every asset byte**. The
Evidence subject stays null because the whole directory's bytes are not identified;
its parameters and root location retain the caller's selected project path.
The inspection does not modify `.meta`, remap GUIDs, import assets or execute code.

Defaults bound traversal to 100,000 entries, selected text reads/retention to
64 MiB, and one file to 8 MiB. Reads overlap in bounded groups and reserve their
shared byte budget before allocating. Failed/changed reads retain their reservation
conservatively. Limits and gaps affect coverage explicitly; no empty result is
treated as proof of completeness. Raise the relevant budget when required:

```sh
node scripts/rea.mjs inspect-game-project /absolute/path/RecoveredGame \
  --max-entries 200000 --max-read-bytes 134217728 --max-file-bytes 16777216 --json
```

MCP uses `max_entries`, `max_read_bytes` and `max_file_bytes`. Symbolic links are
reported and not followed. Acquisition is not an atomic filesystem snapshot.

## Move from APK evidence to recovered gameplay

1. Preserve the supplied base APK and every ABI/data split separately, including
   their digests. Use `open_binary` and `inspect_artifact` for each selected archive.
   See [Android analysis](android-analysis.md) for the distinction between archive
   contents and Java/Kotlin method analysis. Do not discard a data split because
   the base APK opens successfully.
2. Establish the Unity scripting backend from actual contents. A readable managed
   `Assembly-CSharp.dll` with CIL supports managed inspection. `libil2cpp.so` plus
   `global-metadata.dat` instead requires native analysis and metadata mapping;
   JADX's Java output is not the Unity IL2CPP gameplay source.
3. Use caller-supplied asset/metadata tools where necessary. REA does not bundle
   AssetRipper or Cpp2IL and does not install them. Preserve bundle transformations,
   original hashes and exact tool versions. A mode named “IL recovery” is not
   evidence that the selected version restores executable method bodies: inspect
   its output for empty/default/throwing implementations.
4. Use Ghidra/Hopper/IDA for selected native functions. Keep Cpp2IL RVA, declared
   file offset, ELF linked address and provider database address distinct. Reuse
   [native address inspection](cli.md) to resolve the chosen representation and
   compare the complete original method bytes before trusting a mapping. A provider
   timeout is not a decompilation result; record it and narrow the next analysis.
5. Inspect the exported project with `inspect_game_project`. Resolve path/meta
   conflicts with backups and preserved GUIDs; inspect launcher and gameplay stub
   candidates alongside the native function evidence. Preserve native-derived C#
   translations separately from newly authored bootstrap/UI/platform adapters.
6. Verify a complete player flow: launch → enter game → input → collision/merge →
   scoring → loss → retry, then save/load and the secondary systems being claimed.
   Unity compilation alone does not verify physics, UI or gameplay equivalence.
   Keep desktop and Android execution claims separate.

The repository supports analysis and evidence for this process. It does not
provide an automatic APK-to-playable-C# converter. A recovered game can require
method-by-method translation, coroutine recovery and replacement of unavailable
platform integrations. Record unresolved behavior instead of inventing native facts.

## Verification and contribution scope

The static inspector has filesystem regressions for meta/case problems, GUID
references, scene selection, byte/entry budgets, symlinks, literal masking and
cancellation. A boundary test validates the SDK-advertised JSON Schemas and runs
the same temporary project through the CLI and MCP with identical Evidence.

```sh
npm run test:local -- src/inspector/game/UnityProjectInspector.test.ts
npm run test:focused -- tests/boundary/mcp/gameProjectInspectionMcp.test.ts
npm run check:fast
```

These checks establish static inspection behavior. They are not real Unity,
Ghidra or Android runtime conformance. Do not commit recovered APKs, game assets,
native libraries, editor caches or third-party game source to this tooling repo.
Real-project verification for this fork was performed on Linux. The filesystem
case-collision regression runs only when the host preserves both case variants;
it cannot establish that observation on a case-insensitive filesystem.
