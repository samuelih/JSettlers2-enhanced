---
id: server-message-protocol.gateway
type: GATEWAY
tenant-id: 019ec5a4-5e07-7341-98b8-45f59e05fe07
scope: sgd:codelens/64c51e15-af55-50cd-8d03-12b24fb09071/server-message-protocol/contracts
owner: codelens-agent
last-verified: 2026-06-14
visibility: subtree
freshness-window-days: 14
max-tokens: 2000
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
  sourceHash: 3a054b7699dc15d756802f5b6449718fe50a2343
  lastValidatedCommit: 3a054b7699dc15d756802f5b6449718fe50a2343
  deterministicReferences: true
---

# Server & Message Protocol Gateway

> Capability Index — public-API contract for the `Server & Message Protocol` epic. Cross-scope callers depend on the symbols listed below.

## Rationale
Bounded public-capability contract for cross-scope callers — see [documentation conventions](../../documentation-conventions.md#gateway-rationale).

## Capability Index

| Capability | File:Symbol | Guarantee |
|------------|-------------|-----------|
| `type` | [src/main/java/soc/client/UserPreferences.java:464](../../../../src/main/java/soc/client/UserPreferences.java#L464) `UserPreferences.PreferenceDescriptor.Type` | Exports the Type enum contract. |
| `listener` | [src/main/java/soc/client/stats/SOCGameStatistics.java:43](../../../../src/main/java/soc/client/stats/SOCGameStatistics.java#L43) `SOCGameStatistics.Listener` | Exports the Listener type contract. |
| `listener-registration` | [src/main/java/soc/client/stats/SOCGameStatistics.java:52](../../../../src/main/java/soc/client/stats/SOCGameStatistics.java#L52) `SOCGameStatistics.ListenerRegistration` | Exports the ListenerRegistration type contract. |
| `action-type` | [src/main/java/soc/game/GameAction.java:316](../../../../src/main/java/soc/game/GameAction.java#L316) `GameAction.ActionType` | Exports the ActionType enum contract. |
| `effect-type` | [src/main/java/soc/game/GameAction.java:651](../../../../src/main/java/soc/game/GameAction.java#L651) `GameAction.EffectType` | Exports the EffectType enum contract. |
| `seat-lock-state` | [src/main/java/soc/game/SOCGame.java:11804](../../../../src/main/java/soc/game/SOCGame.java#L11804) `SOCGame.SeatLockState` | Exports the SeatLockState enum contract. |
| `s-o-c-game-event` | [src/main/java/soc/game/SOCGameEvent.java:40](../../../../src/main/java/soc/game/SOCGameEvent.java#L40) `SOCGameEvent` | Exports the SOCGameEvent enum contract. |
| `s-o-c-player-event` | [src/main/java/soc/game/SOCPlayerEvent.java:40](../../../../src/main/java/soc/game/SOCPlayerEvent.java#L40) `SOCPlayerEvent` | Exports the SOCPlayerEvent enum contract. |
| `g-e-type` | [src/main/java/soc/message/SOCGameElements.java:58](../../../../src/main/java/soc/message/SOCGameElements.java#L58) `SOCGameElements.GEType` | Exports the GEType enum contract. |
| `p-e-type` | [src/main/java/soc/message/SOCPlayerElement.java:116](../../../../src/main/java/soc/message/SOCPlayerElement.java#L116) `SOCPlayerElement.PEType` | Exports the PEType enum contract. |
| `option-type-name` | [src/main/java/soc/game/SOCGameOption.java:1946](../../../../src/main/java/soc/game/SOCGameOption.java#L1946) `SOCGameOption.optionTypeName` | For user output, the string name of the option type's constant. |
| `s-o-c-displayless-player-client` | [src/main/java/soc/baseclient/SOCDisplaylessPlayerClient.java:97](../../../../src/main/java/soc/baseclient/SOCDisplaylessPlayerClient.java#L97) `SOCDisplaylessPlayerClient` | "Headless" standalone client for connecting to the SOCServer. |
| `s-o-c-displayless-player-client` | [src/main/java/soc/baseclient/SOCDisplaylessPlayerClient.java:263](../../../../src/main/java/soc/baseclient/SOCDisplaylessPlayerClient.java#L263) `SOCDisplaylessPlayerClient.SOCDisplaylessPlayerClient` | Constructor to set up using this server connect info. |
| `get-nickname` | [src/main/java/soc/baseclient/SOCDisplaylessPlayerClient.java:279](../../../../src/main/java/soc/baseclient/SOCDisplaylessPlayerClient.java#L279) `SOCDisplaylessPlayerClient.getNickname` | @return the nickname of this user |
| `get-game` | [src/main/java/soc/baseclient/SOCDisplaylessPlayerClient.java:290](../../../../src/main/java/soc/baseclient/SOCDisplaylessPlayerClient.java#L290) `SOCDisplaylessPlayerClient.getGame` | Get a game that we've joined in this client. |
| `run` | [src/main/java/soc/baseclient/SOCDisplaylessPlayerClient.java:301](../../../../src/main/java/soc/baseclient/SOCDisplaylessPlayerClient.java#L301) `SOCDisplaylessPlayerClient.run` | Continuously read from the net in a separate thread. |
| `resend` | [src/main/java/soc/baseclient/SOCDisplaylessPlayerClient.java:347](../../../../src/main/java/soc/baseclient/SOCDisplaylessPlayerClient.java#L347) `SOCDisplaylessPlayerClient.resend` | resend the last message |
| `put` | [src/main/java/soc/baseclient/SOCDisplaylessPlayerClient.java:360](../../../../src/main/java/soc/baseclient/SOCDisplaylessPlayerClient.java#L360) `SOCDisplaylessPlayerClient.put` | write a message to the net @param s  the message @return true if the message was sent, false if not @throws IllegalArgumentException if {@code s} is {@code null} |
| `handle-g-a-m-e-s-t-a-t-s` | [src/main/java/soc/baseclient/SOCDisplaylessPlayerClient.java:1326](../../../../src/main/java/soc/baseclient/SOCDisplaylessPlayerClient.java#L1326) `SOCDisplaylessPlayerClient.handleGAMESTATS` | Handle the "game stats" message: static version to share with SOCPlayerClient. |
| `handle-d-i-c-e-r-e-s-u-l-t-r-e-s-o-u-r-c-e-s` | [src/main/java/soc/baseclient/SOCDisplaylessPlayerClient.java:1388](../../../../src/main/java/soc/baseclient/SOCDisplaylessPlayerClient.java#L1388) `SOCDisplaylessPlayerClient.handleDICERESULTRESOURCES` | Handle all players' dice roll result resources: static version to share with SOCPlayerClient. |
| `_overflow` | — | 3396 additional documented exports omitted to keep this gateway within its token budget; the omitted symbols remain in the  and should be promoted into narrower gateways only when they become cross-scope contracts. |
