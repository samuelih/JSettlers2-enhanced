---
id: protocol-message-sequence-consistency-tests.design
type: DESIGN
tenant-id: 019ec5a4-5e07-7341-98b8-45f59e05fe07
scope: sgd:codelens/64c51e15-af55-50cd-8d03-12b24fb09071/quality-infrastructure
owner: codelens-agent
last-verified: 2026-06-14
visibility: subtree
freshness-window-days: 14
invariants: []
references:
  - _scope.md
  - quality-infrastructure.arch.md
  - ../desktop-swing-client/desktop-swing-client.arch.md
  - ../game-model-rules-engine/game-model-rules-engine.arch.md
  - ../robot-ai-players/robot-ai-players.arch.md
  - ../server-message-protocol/server-message-protocol.arch.md
stateful-fields:
  - id: body
    name: Document body
    status: Draft
codelens:
  diklUsed: false
  projectId: 64c51e15-af55-50cd-8d03-12b24fb09071
  campaignId: codelens-b7eef336
  lifecycle: hypothesis
  confidence: 0.350
  sourceHash: sha256:32ce48308f6ead4cfd770b558130f1615aa8bd08951b4b7c05c5fdf27da9e2a5
  lastValidatedCommit: 3a054b7699dc15d756802f5b6449718fe50a2343
  deterministicReferences: true
---

# Protocol Message-Sequence Consistency Tests

## Strategic Context
- **Wire-format interop is the asset being protected** — Per the SOCMessage design (cited in CLAUDE.md), messages are deliberately plain writeUTF strings so non-Java clients and bots can interop; the per-action sequences in doc/Message-Sequences-for-Game-Actions.md are the documented contract. These tests exist specifically as the regression guard that prevents that contract from silently drifting and breaking external readers.
- **The robot/bot subsystem is a first-class consumer** — Because bots connect exactly like human clients and recognize actions from the message stream (the GameActionExtractor path), a sequence change is not merely cosmetic — it can break the AI subsystem that originated this codebase, which is why the extraction-side test asserts recognition end-to-end rather than only checking emission.

## Overview
These two JUnit classes guard the property that the SOCMessage sequence emitted for each game action stays stable on the wire, so bots and non-Java readers can recognize an action from its stream. On the recording side, TestRecorder boots a RecordingSOCServer on a stringport, connects DisplaylessTesterClients, loads or creates games, and drives actions; the server records every outgoing (and optionally client-origin) message into a per-game GameEventLog of EventEntry rows, which compareRecordsToExpected diffs against an expected String[][] of recipient-prefixed headers and field fragments. On the extraction side, TestGameActionExtractor constructs a GameEventLog from hand-authored or soclog-loaded EventEntry strings, runs it through GameActionExtractor, and asserts the resulting GameActionLog recognizes each ActionType. Recording proves the contract is emitted; extraction proves a reader can parse it back.

## Components
- **TestRecorder**
- **TestRecorder.compareRecordsToExpected** (referenced; defined externally)
- **TestGameActionExtractor**
- **TestGameActionExtractor.makeEmptyEventLog** (referenced; defined externally)
- **TestGameActionExtractor.ExtractResultsChecker** (referenced; defined externally)
- **GameActionExtractor (integration)** (referenced; defined externally)
- **RecordingSOCServer / GameEventLog (integration)** (referenced; defined externally)

## Connections
- **RecordingSOCServer** (outbound) — via import soc.extra.server.RecordingSOCServer; srv = new RecordingSOCServer() and srv.records.get(gameName) (evidence: src/test/java/soctest/server/TestRecorder.java imports + startStringportServer)
- **GameEventLog / GameEventLog.EventEntry** (outbound) — via import soc.extra.server.GameEventLog[.EventEntry]; read log.entries and construct EventEntry fixtures (evidence: src/test/java/soctest/server/TestRecorder.java and src/test/java/soctest/robot/TestGameActionExtractor.java imports)
- **GameActionExtractor / GameActionLog** (outbound) — via class TestGameActionExtractor extends GameActionExtractor; asserts GameActionLog.Action entries (evidence: src/test/java/soctest/robot/TestGameActionExtractor.java::TestGameActionExtractor)
- **SOCServer / SOCGameHandler** (outbound) — via import soc.server.SOCServer; createAndJoinReloadedGame, resumeReloadedGame, destroyGameAndBroadcast (evidence: src/test/java/soctest/server/TestRecorder.java::testBasics_Loadgame, resumeLoadedGame)
- **TestLoadgame (savegame fixtures)** (outbound) — via import soctest.server.savegame.TestLoadgame; TestLoadgame.load("classic-botturn.game.json", server) (evidence: src/test/java/soctest/server/TestRecorder.java::testBasics_Loadgame)
- **doc/Message-Sequences-for-Game-Actions.md** (inbound) — via documented per-action message sequence contract these tests enforce (evidence: feature source_linkage doc_evidence; CLAUDE.md protocol section)

## Design Decisions
- **Split coverage into a recording-side test and an extraction-side test**: TestRecorder verifies the server emits the documented sequence for an action; TestGameActionExtractor verifies an automated reader can recover the action from that sequence. The contract only holds if both directions agree, so each end is guarded independently rather than in one round-trip test.
- **Express expected sequences as String[][] of recipient-prefix + field substring, compared by compareRecordsToExpected**: The wire format is itself textual (writeUTF strings), so a human-readable {"p3:SOCGameServerText:","text=..."} fixture mirrors what travels on the wire and reads as documentation. The substring match also tolerates localized text without pinning exact bytes.
- **TestGameActionExtractor extends the GameActionExtractor it tests**: The javadoc states it does so 'as an easy way to access its methods being tested' — extension exposes the protected read cursor (next, backtrackTo, nextIfType, state, currentSequence) to assertions without widening that API for production callers.
- **Encode message recipient in the fixture prefix (all: / p3: / f3: / !p3:)**: A sequence's correctness includes who each message is sent to (broadcast vs per-player vs from-client vs excluded), so the recipient is carried in the comparison key and the extractor is re-checked per client perspective via the toClientPN parameter.
- **Run on an in-process stringport server with unique per-test client names**: RecordingSOCServer.STRINGPORT_NAME avoids real sockets for fast, isolated runs; the clientNamesUsed set prevents two methods reusing a name, which 'would intermittently cause auth problems' when tests run in parallel.

## Constraints
- **[UNVERIFIED]** A new game's recorded log MUST begin with SOCVersion immediately followed by SOCNewGame (or SOCNewGameWithOptions for games created with options). — src/test/java/soctest/server/TestRecorder.java::testNewGameFirstLogEntries asserts log.entries.size()==2 and the exact {all:SOCVersion, all:SOCNewGame[WithOptions]} prologue (cross-document reconciliation: not verified against `src/test/java/soctest/server/TestRecorder.java`; recorded as design intent, not current code fact.)
- **[UNVERIFIED]** Client-origin (from-client) messages MUST NOT appear in the recorded log unless isRecordGameEventsFromClientsActive() is enabled (srv.isRecordingFromClients). — src/test/java/soctest/server/TestRecorder.java::testRecordClientMessage — empty expected log before toggle, f3:* entries only after setting isRecordingFromClients=true (cross-document reconciliation: not verified against `src/test/java/soctest/server/TestRecorder.java`; recorded as design intent, not current code fact.)
- **[SOFT]** The extractor input log SHOULD start with version, newgame, and startgame entries before any action sequence. — src/test/java/soctest/robot/TestGameActionExtractor.java::makeEmptyEventLog comment "Extractor expects to see version, newgame, and startgame"
- **[UNVERIFIED]** Each test SHOULD use a unique client nickname to avoid auth interference across parallel runs. — src/test/java/soctest/server/TestRecorder.java::clientNamesUsed and per-method CLIENT_NAME constants (cross-document reconciliation: not verified against `src/test/java/soctest/server/TestRecorder.java`; recorded as design intent, not current code fact.)

## Non-Functional Requirements
- **reliability** — Acts as the regression guard that documented per-action message sequences do not drift on the wire; TestRecorder additionally cross-checks loaded-game asserts by keeping bot-only games alive (DESTROY_BOT_ONLY_GAMES_WHEN_OVER=false). — src/test/java/soctest/server/TestRecorder.java::startStringportServer
- **observability** — Recorded EventEntry rows retain recipient routing (all/per-player/from-client) and message fields, enabling assertions on both content and addressing. — src/test/java/soctest/server/TestRecorder.java::compareRecordsToExpected and EventEntry usage
- **performance** — Tests run against an in-memory stringport server rather than real sockets, with short Thread.sleep waits for client/server thread hand-off, keeping the unit suite fast. — src/test/java/soctest/server/TestRecorder.java — RecordingSOCServer.STRINGPORT_NAME, DisplaylessTesterClient.init() + Thread.sleep(120)
- **error-handling** — Extractor must recover from an unknown sequence and continue recognizing subsequent actions; verified by an UNKNOWN action surrounded by recognized ones. — src/test/java/soctest/robot/TestGameActionExtractor.java::testUnknownSequenceRecovery

## Examples
*Shows the recipient-prefixed String[][] fixture encoding the required log-header invariant.*
*Source: `src/test/java/soctest/server/TestRecorder.java (testNewGameFirstLogEntries)`*
```
{"all:SOCVersion:" + Version.versionNumber(), "str=" + Version.version()},
{"all:SOCNewGame:", "game=" + gaName}
```

*Documents the prologue the extractor depends on before any action sequence is appended.*
*Source: `src/test/java/soctest/robot/TestGameActionExtractor.java (makeEmptyEventLog)`*
```
log.add(new EventEntry("Extractor expects to see version, newgame, and startgame"));
```

*Verifies the extractor degrades an unrecognized middle sequence to UNKNOWN yet still recognizes the actions after it.*
*Source: `src/test/java/soctest/robot/TestGameActionExtractor.java (testUnknownSequenceRecovery)`*
```
act = actionLog.get(4);
assertEquals(desc, ActionType.UNKNOWN, act.actType);
```

## Diagrams
### Class

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'primaryTextColor': '#111827', 'secondaryTextColor': '#111827', 'tertiaryTextColor': '#111827', 'lineColor': '#6b7280', 'fontFamily': 'Inter, ui-sans-serif, system-ui, sans-serif'}}}%%
classDiagram
    class StartedTestGameObjects {
        +StartedTestGameObjects()
    }
    class TestGameActionExtractor {
        +public TestGameActionExtractor()
        -private static GameEventLog makeEmptyEventLog()
        +testBasicsReadEvents()
        +@Test
    public void testBasicsNextIfGameStateOrOver()
        -addEventLogEntries()
        +@Test
    public void testUnknownSequenceRecovery()
        +@Test
    public void testInitialPlacement()
        +testInitialPlacementCancelSettlement()
        +testLoadAndExtractInitialPlacement()
        +@Test
    public void testTurnWithBuilding()
        +@Test
    public void testBuildUndo()
        +@Test
    public void testMoveShipUndo()
        +@Test
    public void testSpecialBuildingPhase()
        +@Test
    public void testBankTradePlayerTrade()
        +@Test
    public void testRoll7DiscardsMoveRobberSteal()
        +@Test
    public void testBuyDevCard()
        +@Test
    public void testPlayDevCards()
        +@Test
    public void testPlayDevCardRoadBuilding()
        +@Test
    public void testGoldHexFogHex()
        +@Test
    public void testRollGainCloth()
        +@Test
    public void testGameOver()
        -testExtractEventSequence()
    }
    class ExtractResultsChecker {
        <<interface>>
    }
    class TestRecorder {
        +@BeforeClass
    public static void startStringportServer()
        +@AfterClass
    public static void shutdownServer()
        +resumeLoadedGame()
        +testBasics_ServerUpWithBotsConnectClient()
        +testBasics_Loadgame()
        +testBasics_SendToClientWithLocale()
        +testBasics_ClientVersion()
        +@Test
    public void testBasics_compareIgnoresFromClient()
        +@Test
    public void testNewGameFirstLogEntries()
        +testRecordClientMessage()
        +testMakeElapsedMS()
        -activateOptionAtServerForClient()
        +connectCreateJoinNewGame()
        +createJoinNewGame()
        +connectLoadJoinResumeGame()
        +connectObserver()
        -validateAndUseClientName()
        -activateObservabilityGameOption()
        -connectNewTesterClient()
        +testLoadAndBasicSequences()
        +buildRoadSequence()
        +moveRobberStealSequence()
        +testTradeDecline2Clients()
        +compareRecordsToExpected()
    }

```

### Dependency

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'primaryTextColor': '#111827', 'secondaryTextColor': '#111827', 'tertiaryTextColor': '#111827', 'lineColor': '#6b7280', 'fontFamily': 'Inter, ui-sans-serif, system-ui, sans-serif'}}}%%
graph TD
    classDef default fill:#f8fafc,stroke:#475569,color:#111827

    src_test_java_soctest_robot_TestGameActionExtractor_java["TestGameActionExtractor.java"]
    src_test_java_soctest_server_TestRecorder_java["TestRecorder.java"]


    ext_src_main_java_soc_baseclient_SOCDisplaylessPlayerClient_java["SOCDisplaylessPlayerClient.java"]:::default
    src_test_java_soctest_server_TestRecorder_java -.->|"imports"| ext_src_main_java_soc_baseclient_SOCDisplaylessPlayerClient_java
    ext_src_main_java_soc_extra_robot_GameActionExtractor_java["GameActionExtractor.java"]:::default
    src_test_java_soctest_robot_TestGameActionExtractor_java -.->|"imports"| ext_src_main_java_soc_extra_robot_GameActionExtractor_java
    ext_src_main_java_soc_extra_robot_GameActionLog_java["GameActionLog.java"]:::default
    src_test_java_soctest_robot_TestGameActionExtractor_java -.->|"imports"| ext_src_main_java_soc_extra_robot_GameActionLog_java
    ext_src_main_java_soc_extra_server_GameEventLog_java["GameEventLog.java"]:::default
    src_test_java_soctest_robot_TestGameActionExtractor_java -.->|"imports"| ext_src_main_java_soc_extra_server_GameEventLog_java
    src_test_java_soctest_server_TestRecorder_java -.->|"imports"| ext_src_main_java_soc_extra_server_GameEventLog_java
    ext_src_main_java_soc_extra_server_RecordingSOCServer_java["RecordingSOCServer.java"]:::default
    src_test_java_soctest_server_TestRecorder_java -.->|"imports"| ext_src_main_java_soc_extra_server_RecordingSOCServer_java
    ext_src_main_java_soc_game_GameAction_java["GameAction.java"]:::default
    src_test_java_soctest_server_TestRecorder_java -.->|"imports"| ext_src_main_java_soc_game_GameAction_java
    ext_src_main_java_soc_game_SOCBoard_java["SOCBoard.java"]:::default
    src_test_java_soctest_server_TestRecorder_java -.->|"imports"| ext_src_main_java_soc_game_SOCBoard_java
    ext_src_main_java_soc_game_SOCBoardLarge_java["SOCBoardLarge.java"]:::default
    src_test_java_soctest_server_TestRecorder_java -.->|"imports"| ext_src_main_java_soc_game_SOCBoardLarge_java
    ext_src_main_java_soc_game_SOCCity_java["SOCCity.java"]:::default
    src_test_java_soctest_robot_TestGameActionExtractor_java -.->|"imports"| ext_src_main_java_soc_game_SOCCity_java
    ext_src_main_java_soc_game_SOCDevCardConstants_java["SOCDevCardConstants.java"]:::default
    src_test_java_soctest_robot_TestGameActionExtractor_java -.->|"imports"| ext_src_main_java_soc_game_SOCDevCardConstants_java
    src_test_java_soctest_server_TestRecorder_java -.->|"imports"| ext_src_main_java_soc_game_SOCDevCardConstants_java
    ext_src_main_java_soc_game_SOCGame_java["SOCGame.java"]:::default
    src_test_java_soctest_robot_TestGameActionExtractor_java -.->|"imports"| ext_src_main_java_soc_game_SOCGame_java
    src_test_java_soctest_server_TestRecorder_java -.->|"imports"| ext_src_main_java_soc_game_SOCGame_java
    ext_src_main_java_soc_game_SOCGameOption_java["SOCGameOption.java"]:::default
    src_test_java_soctest_server_TestRecorder_java -.->|"imports"| ext_src_main_java_soc_game_SOCGameOption_java
    ext_src_main_java_soc_game_SOCGameOptionSet_java["SOCGameOptionSet.java"]:::default
    src_test_java_soctest_server_TestRecorder_java -.->|"imports"| ext_src_main_java_soc_game_SOCGameOptionSet_java
    ext_src_main_java_soc_game_SOCMoveRobberResult_java["SOCMoveRobberResult.java"]:::default
    src_test_java_soctest_server_TestRecorder_java -.->|"imports"| ext_src_main_java_soc_game_SOCMoveRobberResult_java
    ext_src_main_java_soc_game_SOCPlayer_java["SOCPlayer.java"]:::default
    src_test_java_soctest_server_TestRecorder_java -.->|"imports"| ext_src_main_java_soc_game_SOCPlayer_java
    ext_src_main_java_soc_game_SOCPlayingPiece_java["SOCPlayingPiece.java"]:::default
    src_test_java_soctest_robot_TestGameActionExtractor_java -.->|"imports"| ext_src_main_java_soc_game_SOCPlayingPiece_java
    src_test_java_soctest_server_TestRecorder_java -.->|"imports"| ext_src_main_java_soc_game_SOCPlayingPiece_java
    ext_src_main_java_soc_game_SOCResourceConstants_java["SOCResourceConstants.java"]:::default
    src_test_java_soctest_server_TestRecorder_java -.->|"imports"| ext_src_main_java_soc_game_SOCResourceConstants_java
    ext_src_main_java_soc_game_SOCResourceSet_java["SOCResourceSet.java"]:::default
    src_test_java_soctest_robot_TestGameActionExtractor_java -.->|"imports"| ext_src_main_java_soc_game_SOCResourceSet_java
    src_test_java_soctest_server_TestRecorder_java -.->|"imports"| ext_src_main_java_soc_game_SOCResourceSet_java
    ext_src_main_java_soc_game_SOCRoad_java["SOCRoad.java"]:::default
    src_test_java_soctest_robot_TestGameActionExtractor_java -.->|"imports"| ext_src_main_java_soc_game_SOCRoad_java
    src_test_java_soctest_server_TestRecorder_java -.->|"imports"| ext_src_main_java_soc_game_SOCRoad_java
    ext_src_main_java_soc_game_SOCScenario_java["SOCScenario.java"]:::default
    src_test_java_soctest_robot_TestGameActionExtractor_java -.->|"imports"| ext_src_main_java_soc_game_SOCScenario_java
    ext_src_main_java_soc_game_SOCSettlement_java["SOCSettlement.java"]:::default
    src_test_java_soctest_server_TestRecorder_java -.->|"imports"| ext_src_main_java_soc_game_SOCSettlement_java
    ext_src_main_java_soc_game_SOCShip_java["SOCShip.java"]:::default
    src_test_java_soctest_robot_TestGameActionExtractor_java -.->|"imports"| ext_src_main_java_soc_game_SOCShip_java
    ext_src_main_java_soc_game_SOCTradeOffer_java["SOCTradeOffer.java"]:::default
    src_test_java_soctest_server_TestRecorder_java -.->|"imports"| ext_src_main_java_soc_game_SOCTradeOffer_java
    ext_src_main_java_soc_message_SOCRollDiceRequest_java["SOCRollDiceRequest.java"]:::default
    src_test_java_soctest_robot_TestGameActionExtractor_java -.->|"imports"| ext_src_main_java_soc_message_SOCRollDiceRequest_java
    ext_src_main_java_soc_server_SOCClientData_java["SOCClientData.java"]:::default
    src_test_java_soctest_server_TestRecorder_java -.->|"imports"| ext_src_main_java_soc_server_SOCClientData_java
    ext_src_main_java_soc_server_SOCGameHandler_java["SOCGameHandler.java"]:::default
    src_test_java_soctest_server_TestRecorder_java -.->|"imports"| ext_src_main_java_soc_server_SOCGameHandler_java
    ext_src_main_java_soc_server_SOCGameListAtServer_java["SOCGameListAtServer.java"]:::default
    src_test_java_soctest_server_TestRecorder_java -.->|"imports"| ext_src_main_java_soc_server_SOCGameListAtServer_java
    ext_src_main_java_soc_server_SOCServer_java["SOCServer.java"]:::default
    src_test_java_soctest_server_TestRecorder_java -.->|"imports"| ext_src_main_java_soc_server_SOCServer_java
    ext_src_main_java_soc_server_genericServer_Connection_java["Connection.java"]:::default
    src_test_java_soctest_server_TestRecorder_java -.->|"imports"| ext_src_main_java_soc_server_genericServer_Connection_java
    ext_src_main_java_soc_server_savegame_SavedGameModel_java["SavedGameModel.java"]:::default
    src_test_java_soctest_server_TestRecorder_java -.->|"imports"| ext_src_main_java_soc_server_savegame_SavedGameModel_java
    ext_src_main_java_soc_util_SOCStringManager_java["SOCStringManager.java"]:::default
    src_test_java_soctest_server_TestRecorder_java -.->|"imports"| ext_src_main_java_soc_util_SOCStringManager_java
    ext_src_main_java_soc_util_Version_java["Version.java"]:::default
    src_test_java_soctest_robot_TestGameActionExtractor_java -.->|"imports"| ext_src_main_java_soc_util_Version_java
    src_test_java_soctest_server_TestRecorder_java -.->|"imports"| ext_src_main_java_soc_util_Version_java
    ext_src_test_java_soctest_server_TestGameEventLog_java["TestGameEventLog.java"]:::default
    src_test_java_soctest_robot_TestGameActionExtractor_java -.->|"imports"| ext_src_test_java_soctest_server_TestGameEventLog_java
    ext_src_test_java_soctest_server_savegame_TestLoadgame_java["TestLoadgame.java"]:::default
    src_test_java_soctest_server_TestRecorder_java -.->|"imports"| ext_src_test_java_soctest_server_savegame_TestLoadgame_java
```

## Source Linkage
- [Protocol recorder consistency test](../../../src/test/java/soctest/server/TestRecorder.java::TestRecorder)
- [Recorder expected-sequence comparison helper](../../../src/test/java/soctest/server/TestRecorder.java::TestRecorder)
- [New-game log-header invariant test](../../../src/test/java/soctest/server/TestRecorder.java::TestRecorder)
- [Game-action extractor recognition test](../../../src/test/java/soctest/robot/TestGameActionExtractor.java::TestGameActionExtractor)
- [Minimal event-log fixture builder](../../../src/test/java/soctest/robot/TestGameActionExtractor.java::TestGameActionExtractor)
- [Game-action extractor under test](../../../src/main/java/soc/extra/robot/GameActionExtractor.java::GameActionExtractor)
- [Recorded game-event log model](../../../src/main/java/soc/extra/server/GameEventLog.java::GameEventLog)
- [Recording server fixture source](../../../src/main/java/soc/extra/server/RecordingSOCServer.java::RecordingSOCServer)
- [Recorded game-event fixture (hypothesized)](../../../src/test/resources/resources/gameevent/all-basic-actions.soclog)

Parent scope: [_scope.md](_scope.md)
Sibling feature: [protocol-message-sequence-consistency-tests.feature.md](protocol-message-sequence-consistency-tests.feature.md)
Scope architecture: [quality-infrastructure.arch.md](quality-infrastructure.arch.md)

## Source Linkage Grounding

_Per-row confidence; `_unverified_` rows are disclosed, not verified; `0.08 (resolved, uncited)` is the resolved-but-uncited baseline, not measured evidence._

| Element | Doc Evidence | Code Evidence | Confidence |
|---------|--------------|---------------|-----------:|
| Source Linkage: Protocol recorder consistency test |  | src/test/java/soctest/server/TestRecorder.java:87-2045 | 0.75 |
| Source Linkage: Game-action extractor recognition test |  | src/test/java/soctest/robot/TestGameActionExtractor.java:69-72 | 0.75 |
| Source Linkage: Game-action extractor under test |  | src/main/java/soc/extra/robot/GameActionExtractor.java:201-249 | 0.83 |
| Source Linkage: Recorded game-event log model |  | src/main/java/soc/extra/server/GameEventLog.java:231-280 | 0.75 |
| Source Linkage: Recording server fixture source |  | src/main/java/soc/extra/server/RecordingSOCServer.java:157-163 | 0.75 |
| Source Linkage: Recorded game-event fixture (hypothesized) | Game created at: 2021-10-10 22:48:46 -0400 | src/test/resources/resources/gameevent/all-basic-actions.soclog | 0.08 (resolved, uncited) |

Related scopes: [Desktop Swing Client](../desktop-swing-client/desktop-swing-client.arch.md), [Game Model & Rules Engine](../game-model-rules-engine/game-model-rules-engine.arch.md), [Robot / AI Players](../robot-ai-players/robot-ai-players.arch.md), [Server & Message Protocol](../server-message-protocol/server-message-protocol.arch.md)
