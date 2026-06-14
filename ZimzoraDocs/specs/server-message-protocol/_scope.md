---
id: server-message-protocol.scope
type: SCOPE
kind: code
tenant-id: 019ec5a4-5e07-7341-98b8-45f59e05fe07
name: Server & Message Protocol
purpose: "The authoritative server runtime and the client⇄server wire protocol for this Settlers of Catan system. The `soc.server.SOCServer` process accepts client connections and dispatches their requests across three handlers: `SOCServerMessageHandler` for connection- and lobby-level traffic (joins, channels), `SOCGameMessageHandler` for in-game player actions, and `SOCGameHandler` for per-game logic glue (the design anticipates future game *types* each extending a `GameHandler`). All traffic is carried by `soc.message.SOCMessage` subclasses — one class per message type — serialized as plain unicode strings via `DataOutputStream.writeUTF`/`readUTF`, deliberately simple so non-Java clients and bots can interoperate. An additive WebSocket listener carries exactly one `SOCMessage` string per text frame, letting the TypeScript browser client speak the same protocol without changing the server's authority over game state, rules, robots, and scenarios. The recognized network sequences for each game action are catalogued in `doc/Message-Sequences-for-Game-Actions.md` and exercised by the server test suite. This scope covers that runtime dispatch, the message vocabulary, and the browser-facing transport bridge; it does not cover the game rules model or the desktop/web UIs that sit above the protocol. Governs 5 code areas rooted at `src/main/java/soc`, `src/main/java/soc/server`, `src/main/java/soc/message` (and 2 more), spanning 9 member documents (1 ARCH, 4 DESIGN, 4 FEATURE)."
scope: sgd:codelens/64c51e15-af55-50cd-8d03-12b24fb09071/server-message-protocol
parent: sgd:codelens/64c51e15-af55-50cd-8d03-12b24fb09071
owner: codelens-agent
last-verified: 2026-06-14
visibility: subtree
freshness-window-days: 14
governs:
  - src/main/java/soc/server
  - src/main/java/soc/message
  - src/main/java/soc/server/SOCServer.java
  - src/main/java/soc/server/SOCServerMessageHandler.java
  - src/main/java/soc/server/SOCGameMessageHandler.java
  - src/main/java/soc/server/SOCGameHandler.java
  - src/main/java/soc/message/SOCMessage.java
  - src/main/java/soc/message/SOCBoardLayout2.java
  - src/main/java/soc/message/SOCGameElements.java
  - src/main/java/soc/message/SOCPlayerElements.java
  - src/main/java/soc/message/SOCServerPing.java
  - src/test/java/soctest/message/TestToCmdToStringParse.java
  - doc/Message-Sequences-for-Game-Actions.md
references:
  - browser-websocket-protocol-bridge.design.md
  - game-action-message-sequences.design.md
  - server-message-protocol.arch.md
  - server-runtime-request-dispatch.design.md
  - socmessage-wire-vocabulary.design.md
  - ../../../doc/Message-Sequences-for-Game-Actions.md
  - ../documentation-conventions.md
gateway-docs:
  - contracts/server-message-protocol.gateway.md
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
  confidence: 0.860
  sourceHash: 3a054b7699dc15d756802f5b6449718fe50a2343
  lastValidatedCommit: 3a054b7699dc15d756802f5b6449718fe50a2343
  deterministicReferences: true
---

# Server & Message Protocol

## Purpose
The authoritative server runtime and the client⇄server wire protocol for this Settlers of Catan system. The `soc.server.SOCServer` process accepts client connections and dispatches their requests across three handlers: `SOCServerMessageHandler` for connection- and lobby-level traffic (joins, channels), `SOCGameMessageHandler` for in-game player actions, and `SOCGameHandler` for per-game logic glue (the design anticipates future game *types* each extending a `GameHandler`). All traffic is carried by `soc.message.SOCMessage` subclasses — one class per message type — serialized as plain unicode strings via `DataOutputStream.writeUTF`/`readUTF`, deliberately simple so non-Java clients and bots can interoperate. An additive WebSocket listener carries exactly one `SOCMessage` string per text frame, letting the TypeScript browser client speak the same protocol without changing the server's authority over game state, rules, robots, and scenarios. The recognized network sequences for each game action are catalogued in `doc/Message-Sequences-for-Game-Actions.md` and exercised by the server test suite. This scope covers that runtime dispatch, the message vocabulary, and the browser-facing transport bridge; it does not cover the game rules model or the desktop/web UIs that sit above the protocol. Governs 5 code areas rooted at `src/main/java/soc`, `src/main/java/soc/server`, `src/main/java/soc/message` (and 2 more), spanning 9 member documents (1 ARCH, 4 DESIGN, 4 FEATURE).

## Scope
sgd:codelens/64c51e15-af55-50cd-8d03-12b24fb09071/server-message-protocol

## Local Laws
- Use the project glossary's established terminology consistently — 466 term(s) carry a citable source document (e.g. "Game").

## Members

| Member | Kind | Status |
|--------|------|--------|
| [Browser WebSocket Protocol Bridge](browser-websocket-protocol-bridge.design.md) | DESIGN | Draft |
| [browser-websocket-protocol-bridge.feature](browser-websocket-protocol-bridge.feature.md) | FEATURE | Draft |
| [Game-Action Message Sequences](game-action-message-sequences.design.md) | DESIGN | Draft |
| [game-action-message-sequences.feature](game-action-message-sequences.feature.md) | FEATURE | Draft |
| [Server & Message Protocol](server-message-protocol.arch.md) | ARCH | Draft |
| [Server Runtime & Request Dispatch](server-runtime-request-dispatch.design.md) | DESIGN | Draft |
| [server-runtime-request-dispatch.feature](server-runtime-request-dispatch.feature.md) | FEATURE | Draft |
| [SOCMessage Wire Vocabulary](socmessage-wire-vocabulary.design.md) | DESIGN | Draft |
| [socmessage-wire-vocabulary.feature](socmessage-wire-vocabulary.feature.md) | FEATURE | Draft |

Total direct children: 9

## Source Linkage
- [src/main/java/soc/server](../../../src/main/java/soc/server)
- [src/main/java/soc/message](../../../src/main/java/soc/message)
- [src/main/java/soc/server/SOCServer.java](../../../src/main/java/soc/server/SOCServer.java)
- [src/main/java/soc/server/SOCServerMessageHandler.java](../../../src/main/java/soc/server/SOCServerMessageHandler.java)
- [src/main/java/soc/server/SOCGameMessageHandler.java](../../../src/main/java/soc/server/SOCGameMessageHandler.java)
- [src/main/java/soc/server/SOCGameHandler.java](../../../src/main/java/soc/server/SOCGameHandler.java)
- [src/main/java/soc/message/SOCMessage.java](../../../src/main/java/soc/message/SOCMessage.java)
- [src/main/java/soc/message/SOCBoardLayout2.java](../../../src/main/java/soc/message/SOCBoardLayout2.java)
- [src/main/java/soc/message/SOCGameElements.java](../../../src/main/java/soc/message/SOCGameElements.java)
- [src/main/java/soc/message/SOCPlayerElements.java](../../../src/main/java/soc/message/SOCPlayerElements.java)
- [src/main/java/soc/message/SOCServerPing.java](../../../src/main/java/soc/message/SOCServerPing.java)
- [src/test/java/soctest/message/TestToCmdToStringParse.java](../../../src/test/java/soctest/message/TestToCmdToStringParse.java)
- [doc/Message-Sequences-for-Game-Actions.md](../../../doc/Message-Sequences-for-Game-Actions.md)

Charter conventions: [documentation-conventions.md](../documentation-conventions.md#epic-charter-conventions)

## Source Linkage Grounding

_Per-row confidence; `_unverified_` rows are disclosed, not verified; `0.08 (resolved, uncited)` is the resolved-but-uncited baseline, not measured evidence._

| Element | Doc Evidence | Code Evidence | Confidence |
|---------|--------------|---------------|-----------:|
| Source Linkage: src/main/java/soc/server |  | src/main/java/soc/server | 0.95 |
| Source Linkage: src/main/java/soc/message |  | src/main/java/soc/message | 0.75 |
| Source Linkage: src/main/java/soc/server/SOCServer.java |  | src/main/java/soc/server/SOCServer.java | 0.83 |
| Source Linkage: src/main/java/soc/server/SOCServerMessageHandler.java |  | src/main/java/soc/server/SOCServerMessageHandler.java | 0.83 |
| Source Linkage: src/main/java/soc/server/SOCGameMessageHandler.java |  | src/main/java/soc/server/SOCGameMessageHandler.java | 0.83 |
| Source Linkage: src/main/java/soc/server/SOCGameHandler.java |  | src/main/java/soc/server/SOCGameHandler.java | 0.83 |
| Source Linkage: src/main/java/soc/message/SOCMessage.java |  | src/main/java/soc/message/SOCMessage.java | 0.83 |
| Source Linkage: src/main/java/soc/message/SOCBoardLayout2.java |  | src/main/java/soc/message/SOCBoardLayout2.java | 0.40 |
| Source Linkage: src/main/java/soc/message/SOCGameElements.java |  | src/main/java/soc/message/SOCGameElements.java | 0.16 |
| Source Linkage: src/main/java/soc/message/SOCPlayerElements.java |  | src/main/java/soc/message/SOCPlayerElements.java | 0.16 |
| Source Linkage: src/main/java/soc/message/SOCServerPing.java |  | src/main/java/soc/message/SOCServerPing.java | 0.24 |
| Source Linkage: src/test/java/soctest/message/TestToCmdToStringParse.java |  | src/test/java/soctest/message/TestToCmdToStringParse.java | 0.32 |
| Source Linkage: doc/Message-Sequences-for-Game-Actions.md | Overview | doc: doc/Message-Sequences-for-Game-Actions.md | 0.03 |
