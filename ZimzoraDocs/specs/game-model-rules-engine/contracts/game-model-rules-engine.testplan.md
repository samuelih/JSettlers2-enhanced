---
id: game-model-rules-engine.testplan
type: TESTPLAN
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
  sourceHash: sha256:046482f6a7cb3dd733568b30cd4e1e9be47dd3f25dc3268a068449f8f9590395
  lastValidatedCommit: 3a054b7699dc15d756802f5b6449718fe50a2343
  deterministicReferences: true
---

# Game Model & Rules Engine Test Plan

## Coverage Gaps
- [src/main/java/soc/game/GameAction.java](../../../../src/main/java/soc/game/GameAction.java) has no mapped test file in the scanned corpus.
- [src/main/java/soc/game/ResourceSet.java](../../../../src/main/java/soc/game/ResourceSet.java) has no mapped test file in the scanned corpus.
- [src/main/java/soc/game/SOCBoard.java](../../../../src/main/java/soc/game/SOCBoard.java) has no mapped test file in the scanned corpus.
- [src/main/java/soc/game/SOCBoard4p.java](../../../../src/main/java/soc/game/SOCBoard4p.java) has no mapped test file in the scanned corpus.
- [src/main/java/soc/game/SOCBoard6p.java](../../../../src/main/java/soc/game/SOCBoard6p.java) has no mapped test file in the scanned corpus.
- [src/main/java/soc/game/SOCBoardLarge.java](../../../../src/main/java/soc/game/SOCBoardLarge.java) has no mapped test file in the scanned corpus.
- [src/main/java/soc/game/SOCCKProgressCardConstants.java](../../../../src/main/java/soc/game/SOCCKProgressCardConstants.java) has no mapped test file in the scanned corpus.
- [src/main/java/soc/game/SOCCity.java](../../../../src/main/java/soc/game/SOCCity.java) has no mapped test file in the scanned corpus.
- [src/main/java/soc/game/SOCDevCard.java](../../../../src/main/java/soc/game/SOCDevCard.java) has no mapped test file in the scanned corpus.
- [src/main/java/soc/game/SOCDevCardConstants.java](../../../../src/main/java/soc/game/SOCDevCardConstants.java) has no mapped test file in the scanned corpus.
- [src/main/java/soc/game/SOCForceEndTurnResult.java](../../../../src/main/java/soc/game/SOCForceEndTurnResult.java) has no mapped test file in the scanned corpus.
- [src/main/java/soc/game/SOCFortress.java](../../../../src/main/java/soc/game/SOCFortress.java) has no mapped test file in the scanned corpus.
- [src/main/java/soc/game/SOCGame.java](../../../../src/main/java/soc/game/SOCGame.java) has no mapped test file in the scanned corpus.
- [src/main/java/soc/game/SOCGameEvent.java](../../../../src/main/java/soc/game/SOCGameEvent.java) has no mapped test file in the scanned corpus.
- [src/main/java/soc/game/SOCGameEventListener.java](../../../../src/main/java/soc/game/SOCGameEventListener.java) has no mapped test file in the scanned corpus.
- [src/main/java/soc/game/SOCGameOption.java](../../../../src/main/java/soc/game/SOCGameOption.java) has no mapped test file in the scanned corpus.
- [src/main/java/soc/game/SOCGameOptionSet.java](../../../../src/main/java/soc/game/SOCGameOptionSet.java) has no mapped test file in the scanned corpus.
- [src/main/java/soc/game/SOCGameOptionVersionException.java](../../../../src/main/java/soc/game/SOCGameOptionVersionException.java) has no mapped test file in the scanned corpus.
- [src/main/java/soc/game/SOCInventory.java](../../../../src/main/java/soc/game/SOCInventory.java) has no mapped test file in the scanned corpus.
- [src/main/java/soc/game/SOCInventoryItem.java](../../../../src/main/java/soc/game/SOCInventoryItem.java) has no mapped test file in the scanned corpus.
- [src/main/java/soc/game/SOCLRPathData.java](../../../../src/main/java/soc/game/SOCLRPathData.java) has no mapped test file in the scanned corpus.
- [src/main/java/soc/game/SOCMoveRobberResult.java](../../../../src/main/java/soc/game/SOCMoveRobberResult.java) has no mapped test file in the scanned corpus.
- [src/main/java/soc/game/SOCOldLRStats.java](../../../../src/main/java/soc/game/SOCOldLRStats.java) has no mapped test file in the scanned corpus.
- [src/main/java/soc/game/SOCPlayer.java](../../../../src/main/java/soc/game/SOCPlayer.java) has no mapped test file in the scanned corpus.
- [src/main/java/soc/game/SOCPlayerEvent.java](../../../../src/main/java/soc/game/SOCPlayerEvent.java) has no mapped test file in the scanned corpus.
- [src/main/java/soc/game/SOCPlayerNumbers.java](../../../../src/main/java/soc/game/SOCPlayerNumbers.java) has no mapped test file in the scanned corpus.
- [src/main/java/soc/game/SOCPlayingPiece.java](../../../../src/main/java/soc/game/SOCPlayingPiece.java) has no mapped test file in the scanned corpus.
- [src/main/java/soc/game/SOCResourceConstants.java](../../../../src/main/java/soc/game/SOCResourceConstants.java) has no mapped test file in the scanned corpus.
- [src/main/java/soc/game/SOCResourceSet.java](../../../../src/main/java/soc/game/SOCResourceSet.java) has no mapped test file in the scanned corpus.
- [src/main/java/soc/game/SOCRoad.java](../../../../src/main/java/soc/game/SOCRoad.java) has no mapped test file in the scanned corpus.
- [src/main/java/soc/game/SOCRoutePiece.java](../../../../src/main/java/soc/game/SOCRoutePiece.java) has no mapped test file in the scanned corpus.
- [src/main/java/soc/game/SOCScenario.java](../../../../src/main/java/soc/game/SOCScenario.java) has no mapped test file in the scanned corpus.
- [src/main/java/soc/game/SOCSettlement.java](../../../../src/main/java/soc/game/SOCSettlement.java) has no mapped test file in the scanned corpus.
- [src/main/java/soc/game/SOCShip.java](../../../../src/main/java/soc/game/SOCShip.java) has no mapped test file in the scanned corpus.
- [src/main/java/soc/game/SOCSpecialItem.java](../../../../src/main/java/soc/game/SOCSpecialItem.java) has no mapped test file in the scanned corpus.
- [src/main/java/soc/game/SOCTradeOffer.java](../../../../src/main/java/soc/game/SOCTradeOffer.java) has no mapped test file in the scanned corpus.
- [src/main/java/soc/game/SOCVersionedItem.java](../../../../src/main/java/soc/game/SOCVersionedItem.java) has no mapped test file in the scanned corpus.
- [src/main/java/soc/game/SOCVillage.java](../../../../src/main/java/soc/game/SOCVillage.java) has no mapped test file in the scanned corpus.
- [src/main/java/soc/server/CustomMapLoader.java](../../../../src/main/java/soc/server/CustomMapLoader.java) has no mapped test file in the scanned corpus.
- [src/main/java/soc/server/CustomMapValidator.java](../../../../src/main/java/soc/server/CustomMapValidator.java) has no mapped test file in the scanned corpus.
- [src/main/java/soc/server/SOCBoardAtServer.java](../../../../src/main/java/soc/server/SOCBoardAtServer.java) has no mapped test file in the scanned corpus.

## Source Linkage Grounding

_Per-row confidence; `_unverified_` rows are disclosed, not verified; `0.08 (resolved, uncited)` is the resolved-but-uncited baseline, not measured evidence._

| Element | Doc Evidence | Code Evidence | Confidence |
|---------|--------------|---------------|-----------:|
| Coverage Gaps: src/main/java/soc/game/GameAction.java |  | src/main/java/soc/game/GameAction.java | 0.75 |
| Coverage Gaps: src/main/java/soc/game/ResourceSet.java |  | linkonly: src/main/java/soc/game/ResourceSet.java | 0.08 (resolved, uncited) |
| Coverage Gaps: src/main/java/soc/game/SOCBoard.java |  | src/main/java/soc/game/SOCBoard.java | 0.83 |
| Coverage Gaps: src/main/java/soc/game/SOCBoard4p.java |  | src/main/java/soc/game/SOCBoard4p.java | 0.16 |
| Coverage Gaps: src/main/java/soc/game/SOCBoard6p.java |  | src/main/java/soc/game/SOCBoard6p.java | 0.08 (resolved, uncited) |
| Coverage Gaps: src/main/java/soc/game/SOCBoardLarge.java |  | src/main/java/soc/game/SOCBoardLarge.java | 0.83 |
| Coverage Gaps: src/main/java/soc/game/SOCCKProgressCardConstants.java |  | src/main/java/soc/game/SOCCKProgressCardConstants.java | 0.75 |
| Coverage Gaps: src/main/java/soc/game/SOCCity.java |  | src/main/java/soc/game/SOCCity.java | 0.75 |
| Coverage Gaps: src/main/java/soc/game/SOCDevCard.java |  | src/main/java/soc/game/SOCDevCard.java | 0.75 |
| Coverage Gaps: src/main/java/soc/game/SOCDevCardConstants.java |  | src/main/java/soc/game/SOCDevCardConstants.java | 0.75 |
| Coverage Gaps: src/main/java/soc/game/SOCForceEndTurnResult.java |  | src/main/java/soc/game/SOCForceEndTurnResult.java | 0.48 |
| Coverage Gaps: src/main/java/soc/game/SOCFortress.java |  | src/main/java/soc/game/SOCFortress.java | 0.75 |
| Coverage Gaps: src/main/java/soc/game/SOCGame.java |  | src/main/java/soc/game/SOCGame.java | 0.95 |
| Coverage Gaps: src/main/java/soc/game/SOCGameEvent.java |  | linkonly: src/main/java/soc/game/SOCGameEvent.java | 0.08 (resolved, uncited) |
| Coverage Gaps: src/main/java/soc/game/SOCGameEventListener.java |  | src/main/java/soc/game/SOCGameEventListener.java | 0.24 |
| Coverage Gaps: src/main/java/soc/game/SOCGameOption.java |  | src/main/java/soc/game/SOCGameOption.java | 0.83 |
| Coverage Gaps: src/main/java/soc/game/SOCGameOptionSet.java |  | src/main/java/soc/game/SOCGameOptionSet.java | 0.83 |
| Coverage Gaps: src/main/java/soc/game/SOCGameOptionVersionException.java |  | src/main/java/soc/game/SOCGameOptionVersionException.java | 0.16 |
| Coverage Gaps: src/main/java/soc/game/SOCInventory.java |  | src/main/java/soc/game/SOCInventory.java | 0.75 |
| Coverage Gaps: src/main/java/soc/game/SOCInventoryItem.java |  | src/main/java/soc/game/SOCInventoryItem.java | 0.86 |
| Coverage Gaps: src/main/java/soc/game/SOCLRPathData.java |  | src/main/java/soc/game/SOCLRPathData.java | 0.75 |
| Coverage Gaps: src/main/java/soc/game/SOCMoveRobberResult.java |  | src/main/java/soc/game/SOCMoveRobberResult.java | 0.75 |
| Coverage Gaps: src/main/java/soc/game/SOCOldLRStats.java |  | src/main/java/soc/game/SOCOldLRStats.java | 0.08 (resolved, uncited) |
| Coverage Gaps: src/main/java/soc/game/SOCPlayer.java |  | src/main/java/soc/game/SOCPlayer.java | 0.83 |
| Coverage Gaps: src/main/java/soc/game/SOCPlayerEvent.java |  | linkonly: src/main/java/soc/game/SOCPlayerEvent.java | 0.08 (resolved, uncited) |
| Coverage Gaps: src/main/java/soc/game/SOCPlayerNumbers.java |  | src/main/java/soc/game/SOCPlayerNumbers.java | 0.75 |
| Coverage Gaps: src/main/java/soc/game/SOCPlayingPiece.java |  | src/main/java/soc/game/SOCPlayingPiece.java | 0.86 |
| Coverage Gaps: src/main/java/soc/game/SOCResourceConstants.java |  | src/main/java/soc/game/SOCResourceConstants.java | 0.75 |
| Coverage Gaps: src/main/java/soc/game/SOCResourceSet.java |  | src/main/java/soc/game/SOCResourceSet.java | 0.75 |
| Coverage Gaps: src/main/java/soc/game/SOCRoad.java |  | src/main/java/soc/game/SOCRoad.java | 0.75 |
| Coverage Gaps: src/main/java/soc/game/SOCRoutePiece.java |  | src/main/java/soc/game/SOCRoutePiece.java | 0.75 |
| Coverage Gaps: src/main/java/soc/game/SOCScenario.java |  | src/main/java/soc/game/SOCScenario.java | 0.75 |
| Coverage Gaps: src/main/java/soc/game/SOCSettlement.java |  | src/main/java/soc/game/SOCSettlement.java | 0.75 |
| Coverage Gaps: src/main/java/soc/game/SOCShip.java |  | src/main/java/soc/game/SOCShip.java | 0.75 |
| Coverage Gaps: src/main/java/soc/game/SOCSpecialItem.java |  | src/main/java/soc/game/SOCSpecialItem.java | 0.86 |
| Coverage Gaps: src/main/java/soc/game/SOCTradeOffer.java |  | src/main/java/soc/game/SOCTradeOffer.java | 0.75 |
| Coverage Gaps: src/main/java/soc/game/SOCVersionedItem.java |  | src/main/java/soc/game/SOCVersionedItem.java | 0.75 |
| Coverage Gaps: src/main/java/soc/game/SOCVillage.java |  | src/main/java/soc/game/SOCVillage.java | 0.75 |
| Coverage Gaps: src/main/java/soc/server/CustomMapLoader.java |  | src/main/java/soc/server/CustomMapLoader.java | 0.83 |
| Coverage Gaps: src/main/java/soc/server/CustomMapValidator.java |  | src/main/java/soc/server/CustomMapValidator.java | 0.83 |
| Coverage Gaps: src/main/java/soc/server/SOCBoardAtServer.java |  | src/main/java/soc/server/SOCBoardAtServer.java | 0.75 |
