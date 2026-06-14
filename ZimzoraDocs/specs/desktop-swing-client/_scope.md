---
id: desktop-swing-client.scope
type: SCOPE
kind: code
tenant-id: 019ec5a4-5e07-7341-98b8-45f59e05fe07
name: Desktop Swing Client
purpose: The Java AWT/Swing desktop client for Sammys-Settlers. `SOCPlayerClient` owns network communication and the game-list window, while `SOCPlayerInterface` hosts the in-game UI and `SOCBoardPanel` renders the board. The 2.0 refactor inserted the `PlayerClientListener` and `GameDisplay` interfaces between `SOCPlayerClient` and the AWT/Swing UI so network handling stays separate from display. Per doc/Improvements-2026-06.md, recent work added a central Preferences dialog and a preference registry, board rendering-quality controls (antialiasing, image-scaling interpolation), a color-blind assist mode, externalized per-graphics-set themes, startup font-size scaling, and in-game build hotkeys and left-click confirm-to-build. This domain covers the desktop presentation layer; authoritative game state and rules live at the server, with clients holding only partial state. Governs 2 code areas rooted at `src/main/java/soc/client`, `src/main/java/soc`, spanning 9 member documents (1 ARCH, 4 DESIGN, 4 FEATURE).
scope: sgd:codelens/64c51e15-af55-50cd-8d03-12b24fb09071/desktop-swing-client
parent: sgd:codelens/64c51e15-af55-50cd-8d03-12b24fb09071
owner: codelens-agent
last-verified: 2026-06-14
visibility: subtree
freshness-window-days: 14
governs:
  - src/main/java/soc/client/SOCPlayerClient.java
  - src/main/java/soc/client/SOCPlayerInterface.java
  - src/main/java/soc/client/SOCBoardPanel.java
  - src/main/java/soc/client
  - src/main/java/soc/client/TradePanel.java
  - src/main/java/soc/client/ColorSquare.java
  - src/main/java/soc/client/PreferencesDialog.java
  - src/main/java/soc/client/UserPreferences.java
  - src/main/java/soc/client/SwingMainDisplay.java
references:
  - board-rendering-visual-themes.design.md
  - client-preferences-settings.design.md
  - desktop-swing-client.arch.md
  - in-game-player-interface.design.md
  - network-game-list-client.design.md
  - ../documentation-conventions.md
gateway-docs:
  - contracts/desktop-swing-client.gateway.md
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
  confidence: 0.850
  sourceHash: 3a054b7699dc15d756802f5b6449718fe50a2343
  lastValidatedCommit: 3a054b7699dc15d756802f5b6449718fe50a2343
  deterministicReferences: true
---

# Desktop Swing Client

## Purpose
The Java AWT/Swing desktop client for Sammys-Settlers. `SOCPlayerClient` owns network communication and the game-list window, while `SOCPlayerInterface` hosts the in-game UI and `SOCBoardPanel` renders the board. The 2.0 refactor inserted the `PlayerClientListener` and `GameDisplay` interfaces between `SOCPlayerClient` and the AWT/Swing UI so network handling stays separate from display. Per doc/Improvements-2026-06.md, recent work added a central Preferences dialog and a preference registry, board rendering-quality controls (antialiasing, image-scaling interpolation), a color-blind assist mode, externalized per-graphics-set themes, startup font-size scaling, and in-game build hotkeys and left-click confirm-to-build. This domain covers the desktop presentation layer; authoritative game state and rules live at the server, with clients holding only partial state. Governs 2 code areas rooted at `src/main/java/soc/client`, `src/main/java/soc`, spanning 9 member documents (1 ARCH, 4 DESIGN, 4 FEATURE).

## Scope
sgd:codelens/64c51e15-af55-50cd-8d03-12b24fb09071/desktop-swing-client

## Local Laws
- Use the project glossary's established terminology consistently — 466 term(s) carry a citable source document (e.g. "Game").

## Members

| Member | Kind | Status |
|--------|------|--------|
| [Board Rendering & Visual Themes](board-rendering-visual-themes.design.md) | DESIGN | Draft |
| [board-rendering-visual-themes.feature](board-rendering-visual-themes.feature.md) | FEATURE | Draft |
| [Client Preferences & Settings](client-preferences-settings.design.md) | DESIGN | Draft |
| [client-preferences-settings.feature](client-preferences-settings.feature.md) | FEATURE | Draft |
| [Desktop Swing Client](desktop-swing-client.arch.md) | ARCH | Draft |
| [In-Game Player Interface](in-game-player-interface.design.md) | DESIGN | Draft |
| [in-game-player-interface.feature](in-game-player-interface.feature.md) | FEATURE | Draft |
| [Network & Game-List Client](network-game-list-client.design.md) | DESIGN | Draft |
| [network-game-list-client.feature](network-game-list-client.feature.md) | FEATURE | Draft |

Total direct children: 9

## Source Linkage
- [src/main/java/soc/client/SOCPlayerClient.java](../../../src/main/java/soc/client/SOCPlayerClient.java)
- [src/main/java/soc/client/SOCPlayerInterface.java](../../../src/main/java/soc/client/SOCPlayerInterface.java)
- [src/main/java/soc/client/SOCBoardPanel.java](../../../src/main/java/soc/client/SOCBoardPanel.java)
- [src/main/java/soc/client](../../../src/main/java/soc/client)
- [src/main/java/soc/client/TradePanel.java](../../../src/main/java/soc/client/TradePanel.java)
- [src/main/java/soc/client/ColorSquare.java](../../../src/main/java/soc/client/ColorSquare.java)
- [src/main/java/soc/client/PreferencesDialog.java](../../../src/main/java/soc/client/PreferencesDialog.java)
- [src/main/java/soc/client/UserPreferences.java](../../../src/main/java/soc/client/UserPreferences.java)
- [src/main/java/soc/client/SwingMainDisplay.java](../../../src/main/java/soc/client/SwingMainDisplay.java)

Charter conventions: [documentation-conventions.md](../documentation-conventions.md#epic-charter-conventions)

## Source Linkage Grounding

_Per-row confidence; `_unverified_` rows are disclosed, not verified; `0.08 (resolved, uncited)` is the resolved-but-uncited baseline, not measured evidence._

| Element | Doc Evidence | Code Evidence | Confidence |
|---------|--------------|---------------|-----------:|
| Source Linkage: src/main/java/soc/client/SOCPlayerClient.java |  | src/main/java/soc/client/SOCPlayerClient.java | 0.86 |
| Source Linkage: src/main/java/soc/client/SOCPlayerInterface.java |  | src/main/java/soc/client/SOCPlayerInterface.java | 0.83 |
| Source Linkage: src/main/java/soc/client/SOCBoardPanel.java |  | src/main/java/soc/client/SOCBoardPanel.java | 0.83 |
| Source Linkage: src/main/java/soc/client |  | src/main/java/soc/client | 1.00 |
| Source Linkage: src/main/java/soc/client/TradePanel.java |  | src/main/java/soc/client/TradePanel.java | 0.75 |
| Source Linkage: src/main/java/soc/client/ColorSquare.java |  | src/main/java/soc/client/ColorSquare.java | 0.83 |
| Source Linkage: src/main/java/soc/client/PreferencesDialog.java |  | src/main/java/soc/client/PreferencesDialog.java | 0.43 |
| Source Linkage: src/main/java/soc/client/UserPreferences.java |  | src/main/java/soc/client/UserPreferences.java | 0.92 |
| Source Linkage: src/main/java/soc/client/SwingMainDisplay.java |  | src/main/java/soc/client/SwingMainDisplay.java | 0.75 |
