---
id: server-message-protocol.api-boundary
type: DESIGN
tenant-id: 019ec5a4-5e07-7341-98b8-45f59e05fe07
scope: sgd:codelens/64c51e15-af55-50cd-8d03-12b24fb09071/server-message-protocol/contracts
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
  confidence: 0.860
  sourceHash: 3a054b7699dc15d756802f5b6449718fe50a2343
  lastValidatedCommit: 3a054b7699dc15d756802f5b6449718fe50a2343
  deterministicReferences: true
---

# Server & Message Protocol API Boundary

## Purpose
Public boundary-shaped source files exist for this epic, but insufficient route/topic evidence is available to specify OpenAPI/AsyncAPI contracts without risk of inaccuracy.

## Boundary Evidence
- `src/main/java/soc/server/CustomMapLoader.java`
- `src/main/java/soc/server/CustomMapValidator.java`
- `src/main/java/soc/server/GameHandler.java`
- `src/main/java/soc/server/GameMessageHandler.java`
- `src/main/java/soc/server/SOCBoardAtServer.java`
- `src/main/java/soc/server/SOCChannelList.java`
- `src/main/java/soc/server/SOCChatRecentBuffer.java`
- `src/main/java/soc/server/SOCClientData.java`
- `src/main/java/soc/server/SOCClientPinger.java`
- `src/main/java/soc/server/SOCForceEndTurnThread.java`
- `src/main/java/soc/server/SOCGameHandler.java`
- `src/main/java/soc/server/SOCGameListAtServer.java`
- `src/main/java/soc/server/SOCGameMessageHandler.java`
- `src/main/java/soc/server/SOCGameTimeoutChecker.java`
- `src/main/java/soc/server/SOCLocalRobotClient.java`
- `src/main/java/soc/server/SOCMessageDispatcher.java`
- `src/main/java/soc/server/SOCReplaceRequest.java`
- `src/main/java/soc/server/SOCServer.java`
- `src/main/java/soc/server/SOCServerMessageHandler.java`
- `src/main/java/soc/server/StatsFileWriterTask.java`

## Machine-Readable Contracts
- OpenAPI: not emitted; no grounded route path and HTTP method resolved.
- AsyncAPI: not emitted; no grounded topic string resolved.
