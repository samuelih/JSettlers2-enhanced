---
id: game-model-rules-engine.scope
type: SCOPE
kind: code
tenant-id: 019ec5a4-5e07-7341-98b8-45f59e05fe07
name: Game Model & Rules Engine
purpose: This scope is the authoritative game model and rules engine that holds Settlers of Catan game state and enforces its rules at the server. Its core business logic lives in `SOCGame`, `SOCPlayer`, and `SOCBoard`, with the sea board and every scenario using `SOCBoardLarge`; per doc/Readme.developer.md, full game state is held at the server while clients hold only partial state. Game rules, optional house rules, and scenarios are all driven through `SOCGameOption` (registered in `SOCGameOptionSet.getAllKnownOptions`), which keys conventions such as `_SC_`-prefixed scenario rules and underscore-prefixed internal options. This domain also covers the shipped Cities & Knights scenario (`SC_CK`) — commodities, city-improvement tracks, knights, barbarians, and metropolis tracking gated on the `_CK_*` options per doc/Cities-and-Knights-Implemented.md — and server-side custom-map loading and validation that registers user-defined board layouts as scenarios per doc/Custom-Maps.md. Governs 3 code areas rooted at `src/main/java/soc`, `src/main/java/soc/game`, `src/main/java/soc/server`, spanning 9 member documents (1 ARCH, 4 DESIGN, 4 FEATURE).
scope: sgd:codelens/64c51e15-af55-50cd-8d03-12b24fb09071/game-model-rules-engine
parent: sgd:codelens/64c51e15-af55-50cd-8d03-12b24fb09071
owner: codelens-agent
last-verified: 2026-06-14
visibility: subtree
freshness-window-days: 14
governs:
  - src/main/java/soc/game
  - src/main/java/soc/game/SOCGame.java
  - src/main/java/soc/game/SOCPlayer.java
  - src/main/java/soc/game/SOCBoard.java
  - src/main/java/soc/game/SOCBoardLarge.java
  - src/main/java/soc/game/SOCGameOption.java
  - src/main/java/soc/game/SOCGameOptionSet.java
  - src/main/java/soc/game/SOCScenario.java
  - src/main/java/soc/game/SOCSpecialItem.java
  - src/main/java/soc/server/CustomMapLoader.java
  - src/main/java/soc/server/CustomMapValidator.java
  - src/main/java/soc/server/SOCBoardAtServer.java
references:
  - cities-knights-scenario-sc-ck.design.md
  - core-game-state-board-model.design.md
  - custom-map-loading-validation.design.md
  - game-model-rules-engine.arch.md
  - game-options-scenarios.design.md
  - ../documentation-conventions.md
gateway-docs:
  - contracts/game-model-rules-engine.gateway.md
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
  confidence: 0.900
  sourceHash: 3a054b7699dc15d756802f5b6449718fe50a2343
  lastValidatedCommit: 3a054b7699dc15d756802f5b6449718fe50a2343
  deterministicReferences: true
---

# Game Model & Rules Engine

## Purpose
This scope is the authoritative game model and rules engine that holds Settlers of Catan game state and enforces its rules at the server. Its core business logic lives in `SOCGame`, `SOCPlayer`, and `SOCBoard`, with the sea board and every scenario using `SOCBoardLarge`; per doc/Readme.developer.md, full game state is held at the server while clients hold only partial state. Game rules, optional house rules, and scenarios are all driven through `SOCGameOption` (registered in `SOCGameOptionSet.getAllKnownOptions`), which keys conventions such as `_SC_`-prefixed scenario rules and underscore-prefixed internal options. This domain also covers the shipped Cities & Knights scenario (`SC_CK`) — commodities, city-improvement tracks, knights, barbarians, and metropolis tracking gated on the `_CK_*` options per doc/Cities-and-Knights-Implemented.md — and server-side custom-map loading and validation that registers user-defined board layouts as scenarios per doc/Custom-Maps.md. Governs 3 code areas rooted at `src/main/java/soc`, `src/main/java/soc/game`, `src/main/java/soc/server`, spanning 9 member documents (1 ARCH, 4 DESIGN, 4 FEATURE).

## Scope
sgd:codelens/64c51e15-af55-50cd-8d03-12b24fb09071/game-model-rules-engine

## Local Laws
- Use the project glossary's established terminology consistently — 466 term(s) carry a citable source document (e.g. "Game").

## Members

| Member | Kind | Status |
|--------|------|--------|
| [Cities & Knights Scenario (SC_CK)](cities-knights-scenario-sc-ck.design.md) | DESIGN | Draft |
| [cities-knights-scenario-sc-ck.feature](cities-knights-scenario-sc-ck.feature.md) | FEATURE | Draft |
| [Core Game State & Board Model](core-game-state-board-model.design.md) | DESIGN | Draft |
| [core-game-state-board-model.feature](core-game-state-board-model.feature.md) | FEATURE | Draft |
| [Custom Map Loading & Validation](custom-map-loading-validation.design.md) | DESIGN | Draft |
| [custom-map-loading-validation.feature](custom-map-loading-validation.feature.md) | FEATURE | Draft |
| [Game Model & Rules Engine](game-model-rules-engine.arch.md) | ARCH | Draft |
| [Game Options & Scenarios](game-options-scenarios.design.md) | DESIGN | Draft |
| [game-options-scenarios.feature](game-options-scenarios.feature.md) | FEATURE | Draft |

Total direct children: 9

## Source Linkage
- [src/main/java/soc/game](../../../src/main/java/soc/game)
- [src/main/java/soc/game/SOCGame.java](../../../src/main/java/soc/game/SOCGame.java)
- [src/main/java/soc/game/SOCPlayer.java](../../../src/main/java/soc/game/SOCPlayer.java)
- [src/main/java/soc/game/SOCBoard.java](../../../src/main/java/soc/game/SOCBoard.java)
- [src/main/java/soc/game/SOCBoardLarge.java](../../../src/main/java/soc/game/SOCBoardLarge.java)
- [src/main/java/soc/game/SOCGameOption.java](../../../src/main/java/soc/game/SOCGameOption.java)
- [src/main/java/soc/game/SOCGameOptionSet.java](../../../src/main/java/soc/game/SOCGameOptionSet.java)
- [src/main/java/soc/game/SOCScenario.java](../../../src/main/java/soc/game/SOCScenario.java)
- [src/main/java/soc/game/SOCSpecialItem.java](../../../src/main/java/soc/game/SOCSpecialItem.java)
- [src/main/java/soc/server/CustomMapLoader.java](../../../src/main/java/soc/server/CustomMapLoader.java)
- [src/main/java/soc/server/CustomMapValidator.java](../../../src/main/java/soc/server/CustomMapValidator.java)
- [src/main/java/soc/server/SOCBoardAtServer.java](../../../src/main/java/soc/server/SOCBoardAtServer.java)

Charter conventions: [documentation-conventions.md](../documentation-conventions.md#epic-charter-conventions)

## Source Linkage Grounding

_Per-row confidence; `_unverified_` rows are disclosed, not verified; `0.08 (resolved, uncited)` is the resolved-but-uncited baseline, not measured evidence._

| Element | Doc Evidence | Code Evidence | Confidence |
|---------|--------------|---------------|-----------:|
| Source Linkage: src/main/java/soc/game |  | src/main/java/soc/game | 0.95 |
| Source Linkage: src/main/java/soc/game/SOCGame.java |  | src/main/java/soc/game/SOCGame.java | 0.95 |
| Source Linkage: src/main/java/soc/game/SOCPlayer.java |  | src/main/java/soc/game/SOCPlayer.java | 0.83 |
| Source Linkage: src/main/java/soc/game/SOCBoard.java |  | src/main/java/soc/game/SOCBoard.java | 0.83 |
| Source Linkage: src/main/java/soc/game/SOCBoardLarge.java |  | src/main/java/soc/game/SOCBoardLarge.java | 0.83 |
| Source Linkage: src/main/java/soc/game/SOCGameOption.java |  | src/main/java/soc/game/SOCGameOption.java | 0.83 |
| Source Linkage: src/main/java/soc/game/SOCGameOptionSet.java |  | src/main/java/soc/game/SOCGameOptionSet.java | 0.83 |
| Source Linkage: src/main/java/soc/game/SOCScenario.java |  | src/main/java/soc/game/SOCScenario.java | 0.75 |
| Source Linkage: src/main/java/soc/game/SOCSpecialItem.java |  | src/main/java/soc/game/SOCSpecialItem.java | 0.86 |
| Source Linkage: src/main/java/soc/server/CustomMapLoader.java |  | src/main/java/soc/server/CustomMapLoader.java | 0.83 |
| Source Linkage: src/main/java/soc/server/CustomMapValidator.java |  | src/main/java/soc/server/CustomMapValidator.java | 0.83 |
| Source Linkage: src/main/java/soc/server/SOCBoardAtServer.java |  | src/main/java/soc/server/SOCBoardAtServer.java | 0.75 |
