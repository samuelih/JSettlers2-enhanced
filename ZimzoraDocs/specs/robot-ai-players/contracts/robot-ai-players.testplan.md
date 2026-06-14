---
id: robot-ai-players.testplan
type: TESTPLAN
tenant-id: 019ec5a4-5e07-7341-98b8-45f59e05fe07
scope: sgd:codelens/64c51e15-af55-50cd-8d03-12b24fb09071/robot-ai-players/contracts
owner: codelens-agent
last-verified: 2026-06-14
visibility: subtree
freshness-window-days: 14
invariants: []
references:
  - ../../documentation-conventions.md
stateful-fields:
  - id: body
    name: Document body
    status: Draft
codelens:
  diklUsed: false
  projectId: 64c51e15-af55-50cd-8d03-12b24fb09071
  campaignId: codelens-b7eef336
  lifecycle: hypothesis
  confidence: 0.830
  sourceHash: sha256:17862136e9334bc06803eb6e52c1688f4e6fa4d891a527a559aff338a1e7c723
  lastValidatedCommit: 3a054b7699dc15d756802f5b6449718fe50a2343
  deterministicReferences: true
---

# Robot / AI Players Test Plan

## Coverage Gaps
- [src/main/java/soc/baseclient/SOCDisplaylessPlayerClient.java](../../../../src/main/java/soc/baseclient/SOCDisplaylessPlayerClient.java) has no mapped test file in the scanned corpus.
- [src/main/java/soc/baseclient/ServerConnectInfo.java](../../../../src/main/java/soc/baseclient/ServerConnectInfo.java) has no mapped test file in the scanned corpus.
- [src/main/java/soc/robot/BoardNodeScorePair.java](../../../../src/main/java/soc/robot/BoardNodeScorePair.java) has no mapped test file in the scanned corpus.
- [src/main/java/soc/robot/DiscardStrategy.java](../../../../src/main/java/soc/robot/DiscardStrategy.java) has no mapped test file in the scanned corpus.
- [src/main/java/soc/robot/MonopolyStrategy.java](../../../../src/main/java/soc/robot/MonopolyStrategy.java) has no mapped test file in the scanned corpus.
- [src/main/java/soc/robot/OpeningBuildStrategy.java](../../../../src/main/java/soc/robot/OpeningBuildStrategy.java) has no mapped test file in the scanned corpus.
- [src/main/java/soc/robot/RobberStrategy.java](../../../../src/main/java/soc/robot/RobberStrategy.java) has no mapped test file in the scanned corpus.
- [src/main/java/soc/robot/SOCBuildPlan.java](../../../../src/main/java/soc/robot/SOCBuildPlan.java) has no mapped test file in the scanned corpus.
- [src/main/java/soc/robot/SOCBuildPlanStack.java](../../../../src/main/java/soc/robot/SOCBuildPlanStack.java) has no mapped test file in the scanned corpus.
- [src/main/java/soc/robot/SOCBuildPossibility.java](../../../../src/main/java/soc/robot/SOCBuildPossibility.java) has no mapped test file in the scanned corpus.
- [src/main/java/soc/robot/SOCBuildingSpeedEstimate.java](../../../../src/main/java/soc/robot/SOCBuildingSpeedEstimate.java) has no mapped test file in the scanned corpus.
- [src/main/java/soc/robot/SOCBuildingSpeedEstimateFactory.java](../../../../src/main/java/soc/robot/SOCBuildingSpeedEstimateFactory.java) has no mapped test file in the scanned corpus.
- [src/main/java/soc/robot/SOCNumberProbabilities.java](../../../../src/main/java/soc/robot/SOCNumberProbabilities.java) has no mapped test file in the scanned corpus.
- [src/main/java/soc/robot/SOCPlayerTracker.java](../../../../src/main/java/soc/robot/SOCPlayerTracker.java) has no mapped test file in the scanned corpus.
- [src/main/java/soc/robot/SOCPossibleCard.java](../../../../src/main/java/soc/robot/SOCPossibleCard.java) has no mapped test file in the scanned corpus.
- [src/main/java/soc/robot/SOCPossibleCity.java](../../../../src/main/java/soc/robot/SOCPossibleCity.java) has no mapped test file in the scanned corpus.
- [src/main/java/soc/robot/SOCPossiblePickSpecialItem.java](../../../../src/main/java/soc/robot/SOCPossiblePickSpecialItem.java) has no mapped test file in the scanned corpus.
- [src/main/java/soc/robot/SOCPossiblePiece.java](../../../../src/main/java/soc/robot/SOCPossiblePiece.java) has no mapped test file in the scanned corpus.
- [src/main/java/soc/robot/SOCPossibleRoad.java](../../../../src/main/java/soc/robot/SOCPossibleRoad.java) has no mapped test file in the scanned corpus.
- [src/main/java/soc/robot/SOCPossibleSettlement.java](../../../../src/main/java/soc/robot/SOCPossibleSettlement.java) has no mapped test file in the scanned corpus.
- [src/main/java/soc/robot/SOCPossibleShip.java](../../../../src/main/java/soc/robot/SOCPossibleShip.java) has no mapped test file in the scanned corpus.
- [src/main/java/soc/robot/SOCResSetBuildTimePair.java](../../../../src/main/java/soc/robot/SOCResSetBuildTimePair.java) has no mapped test file in the scanned corpus.
- [src/main/java/soc/robot/SOCRobotBrain.java](../../../../src/main/java/soc/robot/SOCRobotBrain.java) has no mapped test file in the scanned corpus.
- [src/main/java/soc/robot/SOCRobotClient.java](../../../../src/main/java/soc/robot/SOCRobotClient.java) has no mapped test file in the scanned corpus.
- [src/main/java/soc/robot/SOCRobotDM.java](../../../../src/main/java/soc/robot/SOCRobotDM.java) has no mapped test file in the scanned corpus.
- [src/main/java/soc/robot/SOCRobotNegotiator.java](../../../../src/main/java/soc/robot/SOCRobotNegotiator.java) has no mapped test file in the scanned corpus.
- [src/main/java/soc/robot/SOCRobotPinger.java](../../../../src/main/java/soc/robot/SOCRobotPinger.java) has no mapped test file in the scanned corpus.
- [src/main/java/soc/robot/SOCRobotResetThread.java](../../../../src/main/java/soc/robot/SOCRobotResetThread.java) has no mapped test file in the scanned corpus.
- [src/main/java/soc/robot/SOCTradeTree.java](../../../../src/main/java/soc/robot/SOCTradeTree.java) has no mapped test file in the scanned corpus.
- [src/main/java/soc/robot/sample3p/Sample3PBrain.java](../../../../src/main/java/soc/robot/sample3p/Sample3PBrain.java) has no mapped test file in the scanned corpus.
- [src/main/java/soc/robot/sample3p/Sample3PClient.java](../../../../src/main/java/soc/robot/sample3p/Sample3PClient.java) has no mapped test file in the scanned corpus.
- [src/main/java/soc/robot/sample3p/SampleDiscardStrategy.java](../../../../src/main/java/soc/robot/sample3p/SampleDiscardStrategy.java) has no mapped test file in the scanned corpus.
- [src/main/java/soc/util/SOCRobotParameters.java](../../../../src/main/java/soc/util/SOCRobotParameters.java) has no mapped test file in the scanned corpus.

## Source Linkage Grounding

_Per-row confidence; `_unverified_` rows are disclosed, not verified; `0.08 (resolved, uncited)` is the resolved-but-uncited baseline, not measured evidence._

| Element | Doc Evidence | Code Evidence | Confidence |
|---------|--------------|---------------|-----------:|
| Coverage Gaps: src/main/java/soc/baseclient/SOCDisplaylessPlayerClient.java |  | src/main/java/soc/baseclient/SOCDisplaylessPlayerClient.java | 0.89 |
| Coverage Gaps: src/main/java/soc/baseclient/ServerConnectInfo.java |  | src/main/java/soc/baseclient/ServerConnectInfo.java | 0.48 |
| Coverage Gaps: src/main/java/soc/robot/BoardNodeScorePair.java |  | src/main/java/soc/robot/BoardNodeScorePair.java | 0.24 |
| Coverage Gaps: src/main/java/soc/robot/DiscardStrategy.java |  | src/main/java/soc/robot/DiscardStrategy.java | 0.16 |
| Coverage Gaps: src/main/java/soc/robot/MonopolyStrategy.java |  | src/main/java/soc/robot/MonopolyStrategy.java | 0.16 |
| Coverage Gaps: src/main/java/soc/robot/OpeningBuildStrategy.java |  | src/main/java/soc/robot/OpeningBuildStrategy.java | 0.75 |
| Coverage Gaps: src/main/java/soc/robot/RobberStrategy.java |  | src/main/java/soc/robot/RobberStrategy.java | 0.32 |
| Coverage Gaps: src/main/java/soc/robot/SOCBuildPlan.java |  | src/main/java/soc/robot/SOCBuildPlan.java | 0.16 |
| Coverage Gaps: src/main/java/soc/robot/SOCBuildPlanStack.java |  | src/main/java/soc/robot/SOCBuildPlanStack.java | 0.75 |
| Coverage Gaps: src/main/java/soc/robot/SOCBuildPossibility.java |  | src/main/java/soc/robot/SOCBuildPossibility.java | 0.08 (resolved, uncited) |
| Coverage Gaps: src/main/java/soc/robot/SOCBuildingSpeedEstimate.java |  | src/main/java/soc/robot/SOCBuildingSpeedEstimate.java | 0.75 |
| Coverage Gaps: src/main/java/soc/robot/SOCBuildingSpeedEstimateFactory.java |  | src/main/java/soc/robot/SOCBuildingSpeedEstimateFactory.java | 0.08 (resolved, uncited) |
| Coverage Gaps: src/main/java/soc/robot/SOCNumberProbabilities.java |  | linkonly: src/main/java/soc/robot/SOCNumberProbabilities.java | 0.08 (resolved, uncited) |
| Coverage Gaps: src/main/java/soc/robot/SOCPlayerTracker.java |  | src/main/java/soc/robot/SOCPlayerTracker.java | 0.75 |
| Coverage Gaps: src/main/java/soc/robot/SOCPossibleCard.java |  | src/main/java/soc/robot/SOCPossibleCard.java | 0.08 (resolved, uncited) |
| Coverage Gaps: src/main/java/soc/robot/SOCPossibleCity.java |  | src/main/java/soc/robot/SOCPossibleCity.java | 0.24 |
| Coverage Gaps: src/main/java/soc/robot/SOCPossiblePickSpecialItem.java |  | src/main/java/soc/robot/SOCPossiblePickSpecialItem.java | 0.16 |
| Coverage Gaps: src/main/java/soc/robot/SOCPossiblePiece.java |  | src/main/java/soc/robot/SOCPossiblePiece.java | 0.75 |
| Coverage Gaps: src/main/java/soc/robot/SOCPossibleRoad.java |  | src/main/java/soc/robot/SOCPossibleRoad.java | 0.75 |
| Coverage Gaps: src/main/java/soc/robot/SOCPossibleSettlement.java |  | src/main/java/soc/robot/SOCPossibleSettlement.java | 0.75 |
| Coverage Gaps: src/main/java/soc/robot/SOCPossibleShip.java |  | src/main/java/soc/robot/SOCPossibleShip.java | 0.08 (resolved, uncited) |
| Coverage Gaps: src/main/java/soc/robot/SOCResSetBuildTimePair.java |  | src/main/java/soc/robot/SOCResSetBuildTimePair.java | 0.75 |
| Coverage Gaps: src/main/java/soc/robot/SOCRobotBrain.java |  | src/main/java/soc/robot/SOCRobotBrain.java | 0.83 |
| Coverage Gaps: src/main/java/soc/robot/SOCRobotClient.java |  | src/main/java/soc/robot/SOCRobotClient.java | 0.75 |
| Coverage Gaps: src/main/java/soc/robot/SOCRobotDM.java |  | src/main/java/soc/robot/SOCRobotDM.java | 0.75 |
| Coverage Gaps: src/main/java/soc/robot/SOCRobotNegotiator.java |  | src/main/java/soc/robot/SOCRobotNegotiator.java | 0.75 |
| Coverage Gaps: src/main/java/soc/robot/SOCRobotPinger.java |  | linkonly: src/main/java/soc/robot/SOCRobotPinger.java | 0.08 (resolved, uncited) |
| Coverage Gaps: src/main/java/soc/robot/SOCRobotResetThread.java |  | linkonly: src/main/java/soc/robot/SOCRobotResetThread.java | 0.08 (resolved, uncited) |
| Coverage Gaps: src/main/java/soc/robot/SOCTradeTree.java |  | src/main/java/soc/robot/SOCTradeTree.java | 0.16 |
| Coverage Gaps: src/main/java/soc/robot/sample3p/Sample3PBrain.java |  | linkonly: src/main/java/soc/robot/sample3p/Sample3PBrain.java | 0.08 (resolved, uncited) |
| Coverage Gaps: src/main/java/soc/robot/sample3p/Sample3PClient.java |  | src/main/java/soc/robot/sample3p/Sample3PClient.java | 0.08 (resolved, uncited) |
| Coverage Gaps: src/main/java/soc/robot/sample3p/SampleDiscardStrategy.java |  | linkonly: src/main/java/soc/robot/sample3p/SampleDiscardStrategy.java | 0.08 (resolved, uncited) |
| Coverage Gaps: src/main/java/soc/util/SOCRobotParameters.java |  | src/main/java/soc/util/SOCRobotParameters.java | 0.75 |

## Unverified Areas

Parts of this document have limited verifiable source evidence — treat normative claims as unverified until confirmed. See [documentation conventions](../../documentation-conventions.md#unverified-areas).
