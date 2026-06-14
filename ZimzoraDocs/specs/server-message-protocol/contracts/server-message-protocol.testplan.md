---
id: server-message-protocol.testplan
type: TESTPLAN
tenant-id: 019ec5a4-5e07-7341-98b8-45f59e05fe07
scope: sgd:codelens/64c51e15-af55-50cd-8d03-12b24fb09071/server-message-protocol/contracts
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
  confidence: 0.860
  sourceHash: sha256:42bfdbd6004a7a6fe26d309a8503752c9e99d1da424671d04977776d96b9a1e5
  lastValidatedCommit: 3a054b7699dc15d756802f5b6449718fe50a2343
  deterministicReferences: true
---

# Server & Message Protocol Test Plan

## Coverage Gaps
- [src/main/java/soc/message/SOCAcceptOffer.java](../../../../src/main/java/soc/message/SOCAcceptOffer.java) has no mapped test file in the scanned corpus.
- [src/main/java/soc/message/SOCAdminPing.java](../../../../src/main/java/soc/message/SOCAdminPing.java) has no mapped test file in the scanned corpus.
- [src/main/java/soc/message/SOCAdminReset.java](../../../../src/main/java/soc/message/SOCAdminReset.java) has no mapped test file in the scanned corpus.
- [src/main/java/soc/message/SOCAuthRequest.java](../../../../src/main/java/soc/message/SOCAuthRequest.java) has no mapped test file in the scanned corpus.
- [src/main/java/soc/message/SOCBCastTextMsg.java](../../../../src/main/java/soc/message/SOCBCastTextMsg.java) has no mapped test file in the scanned corpus.
- [src/main/java/soc/message/SOCBankTrade.java](../../../../src/main/java/soc/message/SOCBankTrade.java) has no mapped test file in the scanned corpus.
- [src/main/java/soc/message/SOCBoardLayout.java](../../../../src/main/java/soc/message/SOCBoardLayout.java) has no mapped test file in the scanned corpus.
- [src/main/java/soc/message/SOCBoardLayout2.java](../../../../src/main/java/soc/message/SOCBoardLayout2.java) has no mapped test file in the scanned corpus.
- [src/main/java/soc/message/SOCBotGameDataCheck.java](../../../../src/main/java/soc/message/SOCBotGameDataCheck.java) has no mapped test file in the scanned corpus.
- [src/main/java/soc/message/SOCBotJoinGameRequest.java](../../../../src/main/java/soc/message/SOCBotJoinGameRequest.java) has no mapped test file in the scanned corpus.
- …and 154 more unmapped paths (see parts).

## Source Linkage Grounding

_Per-row confidence; `_unverified_` rows are disclosed, not verified; `0.08 (resolved, uncited)` is the resolved-but-uncited baseline, not measured evidence._

| Element | Doc Evidence | Code Evidence | Confidence |
|---------|--------------|---------------|-----------:|
| Coverage Gaps: src/main/java/soc/message/SOCAcceptOffer.java |  | src/main/java/soc/message/SOCAcceptOffer.java | 0.75 |
| Coverage Gaps: src/main/java/soc/message/SOCAdminPing.java |  | src/main/java/soc/message/SOCAdminPing.java | 0.08 (resolved, uncited) |
| Coverage Gaps: src/main/java/soc/message/SOCAdminReset.java |  | src/main/java/soc/message/SOCAdminReset.java | 0.16 |
| Coverage Gaps: src/main/java/soc/message/SOCAuthRequest.java |  | src/main/java/soc/message/SOCAuthRequest.java | 0.32 |
| Coverage Gaps: src/main/java/soc/message/SOCBCastTextMsg.java |  | src/main/java/soc/message/SOCBCastTextMsg.java | 0.08 (resolved, uncited) |
| Coverage Gaps: src/main/java/soc/message/SOCBankTrade.java |  | src/main/java/soc/message/SOCBankTrade.java | 0.16 |
| Coverage Gaps: src/main/java/soc/message/SOCBoardLayout.java |  | src/main/java/soc/message/SOCBoardLayout.java | 0.40 |
| Coverage Gaps: src/main/java/soc/message/SOCBoardLayout2.java |  | src/main/java/soc/message/SOCBoardLayout2.java | 0.40 |
| Coverage Gaps: src/main/java/soc/message/SOCBotGameDataCheck.java |  | src/main/java/soc/message/SOCBotGameDataCheck.java | 0.32 |
| Coverage Gaps: src/main/java/soc/message/SOCBotJoinGameRequest.java |  | src/main/java/soc/message/SOCBotJoinGameRequest.java | 0.16 |

## Unverified Areas

Parts of this document have limited verifiable source evidence — treat normative claims as unverified until confirmed. See [documentation conventions](../../documentation-conventions.md#unverified-areas).
