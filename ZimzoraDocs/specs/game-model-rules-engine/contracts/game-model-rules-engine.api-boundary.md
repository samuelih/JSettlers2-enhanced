---
id: game-model-rules-engine.api-boundary
type: DESIGN
tenant-id: 019ec5a4-5e07-7341-98b8-45f59e05fe07
scope: sgd:codelens/64c51e15-af55-50cd-8d03-12b24fb09071/game-model-rules-engine/contracts
owner: codelens-agent
last-verified: 2026-06-14
visibility: subtree
freshness-window-days: 14
invariants: []
references: []
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

# Game Model & Rules Engine API Boundary

## Purpose
Public boundary-shaped source files exist for this epic, but insufficient route/topic evidence is available to specify OpenAPI/AsyncAPI contracts without risk of inaccuracy.

## Boundary Evidence
- `src/main/java/soc/game/GameAction.java`
- `src/main/java/soc/game/ResourceSet.java`
- `src/main/java/soc/game/SOCBoard.java`
- `src/main/java/soc/game/SOCBoard4p.java`
- `src/main/java/soc/game/SOCBoard6p.java`
- `src/main/java/soc/game/SOCBoardLarge.java`
- `src/main/java/soc/game/SOCCKProgressCardConstants.java`
- `src/main/java/soc/game/SOCCity.java`
- `src/main/java/soc/game/SOCDevCard.java`
- `src/main/java/soc/game/SOCDevCardConstants.java`
- `src/main/java/soc/game/SOCForceEndTurnResult.java`
- `src/main/java/soc/game/SOCFortress.java`
- `src/main/java/soc/game/SOCGame.java`
- `src/main/java/soc/game/SOCGameEvent.java`
- `src/main/java/soc/game/SOCGameEventListener.java`
- `src/main/java/soc/game/SOCGameOption.java`
- `src/main/java/soc/game/SOCGameOptionSet.java`
- `src/main/java/soc/game/SOCGameOptionVersionException.java`
- `src/main/java/soc/game/SOCInventory.java`
- `src/main/java/soc/game/SOCInventoryItem.java`

## Machine-Readable Contracts
- OpenAPI: not emitted; no grounded route path and HTTP method resolved.
- AsyncAPI: not emitted; no grounded topic string resolved.
