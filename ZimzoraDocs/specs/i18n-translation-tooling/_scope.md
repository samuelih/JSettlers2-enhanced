---
id: i18n-translation-tooling.scope
type: SCOPE
kind: code
tenant-id: 019ec5a4-5e07-7341-98b8-45f59e05fe07
name: i18n Translation Tooling
purpose: "PTE, a desktop tool for maintaining the project's Java `.properties` localization files. Per doc/i18n/readme.htm, it presents a less-specific 'source' locale file and a more-specific 'destination' locale file side by side, matched by key, so translators can compare and edit them together with color highlighting and Unicode support. It saves edited files in the ISO-8859-1 encoding (with Unicode escapes) that Java resource bundles require, which avoids the string corruption that hand-editing those files in a UTF-8 editor risks. The tool launches from `net.nand.util.i18n.gui.PTEMain` and lives in the `net.nand.util.i18n` and `net.nand.util.i18n.gui` packages; it is packaged independently of the game client and server JARs via the `gradle i18neditorJar` task. This is developer/translator tooling rather than part of the runtime game, and `src/main/java/net/nand/util/i18n` is its primary home (the broader `src` tree is governed elsewhere). Governs 3 code areas rooted at `src/main/java/net/nand/util`, `src/main/java/net/nand/util/i18n`, `src/main/java/net/nand/util/i18n/gui`, spanning 7 member documents (1 ARCH, 3 DESIGN, 3 FEATURE)."
scope: sgd:codelens/64c51e15-af55-50cd-8d03-12b24fb09071/i18n-translation-tooling
parent: sgd:codelens/64c51e15-af55-50cd-8d03-12b24fb09071
owner: codelens-agent
last-verified: 2026-06-14
visibility: subtree
freshness-window-days: 14
governs:
  - src/main/java/net/nand/util/i18n
  - src/main/java/net/nand/util/i18n/gui
  - src/main/java/net/nand/util/i18n/gui/PTEMain.java
references:
  - editor-launch-and-file-pair-selection.design.md
  - iso-8859-1-encoding-with-unicode-escapes.design.md
  - side-by-side-properties-translation-editing.design.md
  - ../documentation-conventions.md
gateway-docs:
  - contracts/i18n-translation-tooling.gateway.md
local-laws:
  - "Use the project glossary's established terminology consistently — 466 term(s) carry a citable source document (e.g. \"Game\")."
stateful-fields:
  - id: body
    name: Document body
    status: Draft
codelens:
  diklUsed: false
  projectId: 64c51e15-af55-50cd-8d03-12b24fb09071
  campaignId: codelens-b7eef336
  lifecycle: hypothesis
  confidence: 0.620
  sourceHash: 3a054b7699dc15d756802f5b6449718fe50a2343
  lastValidatedCommit: 3a054b7699dc15d756802f5b6449718fe50a2343
  deterministicReferences: true
---

# i18n Translation Tooling

## Purpose
PTE, a desktop tool for maintaining the project's Java `.properties` localization files. Per doc/i18n/readme.htm, it presents a less-specific 'source' locale file and a more-specific 'destination' locale file side by side, matched by key, so translators can compare and edit them together with color highlighting and Unicode support. It saves edited files in the ISO-8859-1 encoding (with Unicode escapes) that Java resource bundles require, which avoids the string corruption that hand-editing those files in a UTF-8 editor risks. The tool launches from `net.nand.util.i18n.gui.PTEMain` and lives in the `net.nand.util.i18n` and `net.nand.util.i18n.gui` packages; it is packaged independently of the game client and server JARs via the `gradle i18neditorJar` task. This is developer/translator tooling rather than part of the runtime game, and `src/main/java/net/nand/util/i18n` is its primary home (the broader `src` tree is governed elsewhere). Governs 3 code areas rooted at `src/main/java/net/nand/util`, `src/main/java/net/nand/util/i18n`, `src/main/java/net/nand/util/i18n/gui`, spanning 7 member documents (1 ARCH, 3 DESIGN, 3 FEATURE).

## Scope
sgd:codelens/64c51e15-af55-50cd-8d03-12b24fb09071/i18n-translation-tooling

## Local Laws
- Use the project glossary's established terminology consistently — 466 term(s) carry a citable source document (e.g. "Game").

## Members

| Member | Kind | Status |
|--------|------|--------|
| [Editor launch and file-pair selection](editor-launch-and-file-pair-selection.design.md) | DESIGN | Draft |
| [editor-launch-and-file-pair-selection.feature](editor-launch-and-file-pair-selection.feature.md) | FEATURE | Draft |
| [i18n-translation-tooling.arch](i18n-translation-tooling.arch.md) | ARCH | Draft |
| [ISO-8859-1 encoding with Unicode escapes](iso-8859-1-encoding-with-unicode-escapes.design.md) | DESIGN | Draft |
| [iso-8859-1-encoding-with-unicode-escapes.feature](iso-8859-1-encoding-with-unicode-escapes.feature.md) | FEATURE | Draft |
| [Side-by-side properties translation editing](side-by-side-properties-translation-editing.design.md) | DESIGN | Draft |
| [side-by-side-properties-translation-editing.feature](side-by-side-properties-translation-editing.feature.md) | FEATURE | Draft |

Total direct children: 7

## Source Linkage
- [src/main/java/net/nand/util/i18n](../../../src/main/java/net/nand/util/i18n)
- [src/main/java/net/nand/util/i18n/gui](../../../src/main/java/net/nand/util/i18n/gui)
- [src/main/java/net/nand/util/i18n/gui/PTEMain.java](../../../src/main/java/net/nand/util/i18n/gui/PTEMain.java)

Charter conventions: [documentation-conventions.md](../documentation-conventions.md#epic-charter-conventions)

## Source Linkage Grounding

_Per-row confidence; `_unverified_` rows are disclosed, not verified; `0.08 (resolved, uncited)` is the resolved-but-uncited baseline, not measured evidence._

| Element | Doc Evidence | Code Evidence | Confidence |
|---------|--------------|---------------|-----------:|
| Source Linkage: src/main/java/net/nand/util/i18n |  | src/main/java/net/nand/util/i18n | 0.75 |
| Source Linkage: src/main/java/net/nand/util/i18n/gui |  | src/main/java/net/nand/util/i18n/gui | 0.75 |
| Source Linkage: src/main/java/net/nand/util/i18n/gui/PTEMain.java |  | src/main/java/net/nand/util/i18n/gui/PTEMain.java | 0.75 |
