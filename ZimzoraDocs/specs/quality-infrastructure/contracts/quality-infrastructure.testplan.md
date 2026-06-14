---
id: quality-infrastructure.testplan
type: TESTPLAN
tenant-id: 019ec5a4-5e07-7341-98b8-45f59e05fe07
scope: sgd:codelens/64c51e15-af55-50cd-8d03-12b24fb09071/quality-infrastructure/contracts
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
  confidence: 0.700
  sourceHash: sha256:19d2832bc15c45bf2e5be30a3d866664797eec3781c09d7a68b6d8d3f72ddf26
  lastValidatedCommit: 3a054b7699dc15d756802f5b6449718fe50a2343
  deterministicReferences: true
---

# Quality Infrastructure Test Plan

## Coverage Map
- [src/extraTest/python/server/test_startup_params.py](../../../../src/extraTest/python/server/test_startup_params.py#L222) `test_run_and_get_outputs` covers src/extraTest/python/server/__init__.py
- [src/extraTest/python/server/test_startup_params.py](../../../../src/extraTest/python/server/test_startup_params.py#L491) `test_params_main` covers src/extraTest/python/server/__init__.py

## Acceptance Evidence
- Given the implementation under test, when run and get outputs is exercised by [src/extraTest/python/server/test_startup_params.py::test_run_and_get_outputs](../../../../src/extraTest/python/server/test_startup_params.py#L222), then the feature preserves that observable behavior.
- Given the implementation under test, when params main is exercised by [src/extraTest/python/server/test_startup_params.py::test_params_main](../../../../src/extraTest/python/server/test_startup_params.py#L491), then the feature preserves that observable behavior.

## Source Linkage
- linkonly: [src/extraTest/python/server/test_startup_params.py::test_run_and_get_outputs](../../../../src/extraTest/python/server/test_startup_params.py::test_run_and_get_outputs)
- linkonly: [src/extraTest/python/server/__init__.py](../../../../src/extraTest/python/server/__init__.py)

- linkonly: [src/extraTest/python/server/test_startup_params.py::test_params_main](../../../../src/extraTest/python/server/test_startup_params.py::test_params_main)

## Coverage Gaps
- [src/extraTest/java/soctest/game/TestBoardLayoutsRounds.java](../../../../src/extraTest/java/soctest/game/TestBoardLayoutsRounds.java) has no mapped test file in the scanned corpus.
- [src/extraTest/java/soctest/server/TestActionsMessages.java](../../../../src/extraTest/java/soctest/server/TestActionsMessages.java) has no mapped test file in the scanned corpus.
- [src/extraTest/java/soctest/server/TestClientVersion.java](../../../../src/extraTest/java/soctest/server/TestClientVersion.java) has no mapped test file in the scanned corpus.
- [src/extraTest/python/game/__init__.py](../../../../src/extraTest/python/game/__init__.py) has no mapped test file in the scanned corpus.
- [src/test/java/soctest/client/TestDataOutputUtils.java](../../../../src/test/java/soctest/client/TestDataOutputUtils.java) has no mapped test file in the scanned corpus.
- [src/test/java/soctest/client/TestWhatsNewInfoDialog.java](../../../../src/test/java/soctest/client/TestWhatsNewInfoDialog.java) has no mapped test file in the scanned corpus.
- [src/test/java/soctest/db/TestBCryptMisc.java](../../../../src/test/java/soctest/db/TestBCryptMisc.java) has no mapped test file in the scanned corpus.
- [src/test/java/soctest/db/TestProps.java](../../../../src/test/java/soctest/db/TestProps.java) has no mapped test file in the scanned corpus.
- [src/test/java/soctest/game/GameTestUtils.java](../../../../src/test/java/soctest/game/GameTestUtils.java) has no mapped test file in the scanned corpus.
- [src/test/java/soctest/game/TestBoard.java](../../../../src/test/java/soctest/game/TestBoard.java) has no mapped test file in the scanned corpus.
- [src/test/java/soctest/game/TestBoardLarge.java](../../../../src/test/java/soctest/game/TestBoardLarge.java) has no mapped test file in the scanned corpus.
- [src/test/java/soctest/game/TestBoardLayouts.java](../../../../src/test/java/soctest/game/TestBoardLayouts.java) has no mapped test file in the scanned corpus.
- [src/test/java/soctest/game/TestCitiesAndKnights.java](../../../../src/test/java/soctest/game/TestCitiesAndKnights.java) has no mapped test file in the scanned corpus.
- [src/test/java/soctest/game/TestDevCard.java](../../../../src/test/java/soctest/game/TestDevCard.java) has no mapped test file in the scanned corpus.
- [src/test/java/soctest/game/TestGame.java](../../../../src/test/java/soctest/game/TestGame.java) has no mapped test file in the scanned corpus.
- [src/test/java/soctest/game/TestGameAction.java](../../../../src/test/java/soctest/game/TestGameAction.java) has no mapped test file in the scanned corpus.
- [src/test/java/soctest/game/TestGameOptions.java](../../../../src/test/java/soctest/game/TestGameOptions.java) has no mapped test file in the scanned corpus.
- [src/test/java/soctest/game/TestPlayer.java](../../../../src/test/java/soctest/game/TestPlayer.java) has no mapped test file in the scanned corpus.
- [src/test/java/soctest/game/TestPlayingPiece.java](../../../../src/test/java/soctest/game/TestPlayingPiece.java) has no mapped test file in the scanned corpus.
- [src/test/java/soctest/game/TestResourceSet.java](../../../../src/test/java/soctest/game/TestResourceSet.java) has no mapped test file in the scanned corpus.
- [src/test/java/soctest/game/TestScenarioOpts.java](../../../../src/test/java/soctest/game/TestScenarioOpts.java) has no mapped test file in the scanned corpus.
- [src/test/java/soctest/game/TestScenarioRules.java](../../../../src/test/java/soctest/game/TestScenarioRules.java) has no mapped test file in the scanned corpus.
- [src/test/java/soctest/game/TestSpecialItem.java](../../../../src/test/java/soctest/game/TestSpecialItem.java) has no mapped test file in the scanned corpus.
- [src/test/java/soctest/game/TestTradeOffer.java](../../../../src/test/java/soctest/game/TestTradeOffer.java) has no mapped test file in the scanned corpus.
- [src/test/java/soctest/game/TestVersionedItem.java](../../../../src/test/java/soctest/game/TestVersionedItem.java) has no mapped test file in the scanned corpus.
- [src/test/java/soctest/i18n/TestI18N.java](../../../../src/test/java/soctest/i18n/TestI18N.java) has no mapped test file in the scanned corpus.
- [src/test/java/soctest/i18n/TestI18NGameoptScenStrings.java](../../../../src/test/java/soctest/i18n/TestI18NGameoptScenStrings.java) has no mapped test file in the scanned corpus.
- [src/test/java/soctest/message/TestConstructorParams.java](../../../../src/test/java/soctest/message/TestConstructorParams.java) has no mapped test file in the scanned corpus.
- [src/test/java/soctest/message/TestSOCChangeGameOptions.java](../../../../src/test/java/soctest/message/TestSOCChangeGameOptions.java) has no mapped test file in the scanned corpus.
- [src/test/java/soctest/message/TestSOCGameStats.java](../../../../src/test/java/soctest/message/TestSOCGameStats.java) has no mapped test file in the scanned corpus.
- [src/test/java/soctest/message/TestSOCKeyedMessages.java](../../../../src/test/java/soctest/message/TestSOCKeyedMessages.java) has no mapped test file in the scanned corpus.
- [src/test/java/soctest/message/TestSOCStatusMessage.java](../../../../src/test/java/soctest/message/TestSOCStatusMessage.java) has no mapped test file in the scanned corpus.
- [src/test/java/soctest/message/TestStringConstantsAndEnums.java](../../../../src/test/java/soctest/message/TestStringConstantsAndEnums.java) has no mapped test file in the scanned corpus.
- [src/test/java/soctest/message/TestTemplatesAbstracts.java](../../../../src/test/java/soctest/message/TestTemplatesAbstracts.java) has no mapped test file in the scanned corpus.
- [src/test/java/soctest/message/TestToCmdToStringParse.java](../../../../src/test/java/soctest/message/TestToCmdToStringParse.java) has no mapped test file in the scanned corpus.
- [src/test/java/soctest/robot/TestBuildPlan.java](../../../../src/test/java/soctest/robot/TestBuildPlan.java) has no mapped test file in the scanned corpus.
- [src/test/java/soctest/robot/TestGameActionExtractor.java](../../../../src/test/java/soctest/robot/TestGameActionExtractor.java) has no mapped test file in the scanned corpus.
- [src/test/java/soctest/robot/TestPossiblePiece.java](../../../../src/test/java/soctest/robot/TestPossiblePiece.java) has no mapped test file in the scanned corpus.
- [src/test/java/soctest/server/DisplaylessTesterClient.java](../../../../src/test/java/soctest/server/DisplaylessTesterClient.java) has no mapped test file in the scanned corpus.
- [src/test/java/soctest/server/TestCustomMapLoader.java](../../../../src/test/java/soctest/server/TestCustomMapLoader.java) has no mapped test file in the scanned corpus.
- [src/test/java/soctest/server/TestGameEventLog.java](../../../../src/test/java/soctest/server/TestGameEventLog.java) has no mapped test file in the scanned corpus.
- [src/test/java/soctest/server/TestRecorder.java](../../../../src/test/java/soctest/server/TestRecorder.java) has no mapped test file in the scanned corpus.
- [src/test/java/soctest/server/TestSOCChatRecentBuffer.java](../../../../src/test/java/soctest/server/TestSOCChatRecentBuffer.java) has no mapped test file in the scanned corpus.
- [src/test/java/soctest/server/TestSOCGameHandler.java](../../../../src/test/java/soctest/server/TestSOCGameHandler.java) has no mapped test file in the scanned corpus.
- [src/test/java/soctest/server/TestSOCServerMisc.java](../../../../src/test/java/soctest/server/TestSOCServerMisc.java) has no mapped test file in the scanned corpus.
- [src/test/java/soctest/server/savegame/TestLoadgame.java](../../../../src/test/java/soctest/server/savegame/TestLoadgame.java) has no mapped test file in the scanned corpus.
- [src/test/java/soctest/server/savegame/TestSavegame.java](../../../../src/test/java/soctest/server/savegame/TestSavegame.java) has no mapped test file in the scanned corpus.
- [src/test/java/soctest/util/TestDataUtils.java](../../../../src/test/java/soctest/util/TestDataUtils.java) has no mapped test file in the scanned corpus.
- [src/test/java/soctest/util/TestFeatureSet.java](../../../../src/test/java/soctest/util/TestFeatureSet.java) has no mapped test file in the scanned corpus.
- [src/test/java/soctest/util/TestGameList.java](../../../../src/test/java/soctest/util/TestGameList.java) has no mapped test file in the scanned corpus.
- [src/test/java/soctest/util/TestVersion.java](../../../../src/test/java/soctest/util/TestVersion.java) has no mapped test file in the scanned corpus.
- [src/test/python/i18n/__init__.py](../../../../src/test/python/i18n/__init__.py) has no mapped test file in the scanned corpus.
- [src/test/python/server/__init__.py](../../../../src/test/python/server/__init__.py) has no mapped test file in the scanned corpus.
- [src/test/python/server/savegame/__init__.py](../../../../src/test/python/server/savegame/__init__.py) has no mapped test file in the scanned corpus.

## Source Linkage Grounding

_Per-row confidence; `_unverified_` rows are disclosed, not verified; `0.08 (resolved, uncited)` is the resolved-but-uncited baseline, not measured evidence._

| Element | Doc Evidence | Code Evidence | Confidence |
|---------|--------------|---------------|-----------:|
| Coverage Map: src/extraTest/python/server/test_startup_params.py | Sammys-Settlers functional testing: Server startup params | src/extraTest/python/server/test_startup_params.py | 0.92 |
| Acceptance Evidence: src/extraTest/python/server/test_startup_params.py::test_run_and_get_outputs | Sammys-Settlers functional testing: Server startup params | src/extraTest/python/server/test_startup_params.py | 0.92 |
| Source Linkage: src/extraTest/python/server/test_startup_params.py::test_run_and_get_outputs | Basic tests for _run_and_get_outputs; expects unix-style env (runs sleep, false, etc) | src/extraTest/python/server/test_startup_params.py:223-241 | 0.92 |
| Source Linkage: src/extraTest/python/server/__init__.py | server test package | linkonly: src/extraTest/python/server/__init__.py | 0.08 (resolved, uncited) |
| Source Linkage: src/extraTest/python/server/test_startup_params.py::test_params_main | Main function: Check environment, set up, run tests, clean up, assert tests_failed_count==0. | src/extraTest/python/server/test_startup_params.py:492-506 | 0.92 |
| Coverage Gaps: src/extraTest/java/soctest/game/TestBoardLayoutsRounds.java |  | linkonly: src/extraTest/java/soctest/game/TestBoardLayoutsRounds.java | 0.08 (resolved, uncited) |
| Coverage Gaps: src/extraTest/java/soctest/server/TestActionsMessages.java |  | src/extraTest/java/soctest/server/TestActionsMessages.java | 0.75 |
| Coverage Gaps: src/extraTest/java/soctest/server/TestClientVersion.java |  | linkonly: src/extraTest/java/soctest/server/TestClientVersion.java | 0.08 (resolved, uncited) |
| Coverage Gaps: src/extraTest/python/game/__init__.py | game test package | linkonly: src/extraTest/python/game/__init__.py | 0.08 (resolved, uncited) |
| Coverage Gaps: src/test/java/soctest/client/TestDataOutputUtils.java |  | linkonly: src/test/java/soctest/client/TestDataOutputUtils.java | 0.08 (resolved, uncited) |
| Coverage Gaps: src/test/java/soctest/client/TestWhatsNewInfoDialog.java |  | linkonly: src/test/java/soctest/client/TestWhatsNewInfoDialog.java | 0.08 (resolved, uncited) |
| Coverage Gaps: src/test/java/soctest/db/TestBCryptMisc.java |  | src/test/java/soctest/db/TestBCryptMisc.java | 0.60 |
| Coverage Gaps: src/test/java/soctest/db/TestProps.java |  | linkonly: src/test/java/soctest/db/TestProps.java | 0.08 (resolved, uncited) |
| Coverage Gaps: src/test/java/soctest/game/GameTestUtils.java |  | linkonly: src/test/java/soctest/game/GameTestUtils.java | 0.08 (resolved, uncited) |
| Coverage Gaps: src/test/java/soctest/game/TestBoard.java |  | src/test/java/soctest/game/TestBoard.java | 0.08 (resolved, uncited) |
| Coverage Gaps: src/test/java/soctest/game/TestBoardLarge.java |  | src/test/java/soctest/game/TestBoardLarge.java | 0.16 |
| Coverage Gaps: src/test/java/soctest/game/TestBoardLayouts.java |  | src/test/java/soctest/game/TestBoardLayouts.java | 0.92 |
| Coverage Gaps: src/test/java/soctest/game/TestCitiesAndKnights.java |  | src/test/java/soctest/game/TestCitiesAndKnights.java | 0.75 |
| Coverage Gaps: src/test/java/soctest/game/TestDevCard.java |  | linkonly: src/test/java/soctest/game/TestDevCard.java | 0.08 (resolved, uncited) |
| Coverage Gaps: src/test/java/soctest/game/TestGame.java |  | src/test/java/soctest/game/TestGame.java | 0.48 |
| Coverage Gaps: src/test/java/soctest/game/TestGameAction.java |  | linkonly: src/test/java/soctest/game/TestGameAction.java | 0.08 (resolved, uncited) |
| Coverage Gaps: src/test/java/soctest/game/TestGameOptions.java |  | src/test/java/soctest/game/TestGameOptions.java | 0.08 (resolved, uncited) |
| Coverage Gaps: src/test/java/soctest/game/TestPlayer.java |  | src/test/java/soctest/game/TestPlayer.java | 0.56 |
| Coverage Gaps: src/test/java/soctest/game/TestPlayingPiece.java |  | linkonly: src/test/java/soctest/game/TestPlayingPiece.java | 0.08 (resolved, uncited) |
| Coverage Gaps: src/test/java/soctest/game/TestResourceSet.java |  | src/test/java/soctest/game/TestResourceSet.java | 0.75 |
| Coverage Gaps: src/test/java/soctest/game/TestScenarioOpts.java |  | linkonly: src/test/java/soctest/game/TestScenarioOpts.java | 0.08 (resolved, uncited) |
| Coverage Gaps: src/test/java/soctest/game/TestScenarioRules.java |  | src/test/java/soctest/game/TestScenarioRules.java | 0.16 |
| Coverage Gaps: src/test/java/soctest/game/TestSpecialItem.java |  | linkonly: src/test/java/soctest/game/TestSpecialItem.java | 0.08 (resolved, uncited) |
| Coverage Gaps: src/test/java/soctest/game/TestTradeOffer.java |  | linkonly: src/test/java/soctest/game/TestTradeOffer.java | 0.08 (resolved, uncited) |
| Coverage Gaps: src/test/java/soctest/game/TestVersionedItem.java |  | linkonly: src/test/java/soctest/game/TestVersionedItem.java | 0.08 (resolved, uncited) |
| Coverage Gaps: src/test/java/soctest/i18n/TestI18N.java |  | src/test/java/soctest/i18n/TestI18N.java | 0.32 |
| Coverage Gaps: src/test/java/soctest/i18n/TestI18NGameoptScenStrings.java |  | src/test/java/soctest/i18n/TestI18NGameoptScenStrings.java | 0.16 |
| Coverage Gaps: src/test/java/soctest/message/TestConstructorParams.java |  | linkonly: src/test/java/soctest/message/TestConstructorParams.java | 0.08 (resolved, uncited) |
| Coverage Gaps: src/test/java/soctest/message/TestSOCChangeGameOptions.java |  | linkonly: src/test/java/soctest/message/TestSOCChangeGameOptions.java | 0.08 (resolved, uncited) |
| Coverage Gaps: src/test/java/soctest/message/TestSOCGameStats.java |  | linkonly: src/test/java/soctest/message/TestSOCGameStats.java | 0.08 (resolved, uncited) |
| Coverage Gaps: src/test/java/soctest/message/TestSOCKeyedMessages.java |  | linkonly: src/test/java/soctest/message/TestSOCKeyedMessages.java | 0.08 (resolved, uncited) |
| Coverage Gaps: src/test/java/soctest/message/TestSOCStatusMessage.java |  | linkonly: src/test/java/soctest/message/TestSOCStatusMessage.java | 0.08 (resolved, uncited) |
| Coverage Gaps: src/test/java/soctest/message/TestStringConstantsAndEnums.java |  | linkonly: src/test/java/soctest/message/TestStringConstantsAndEnums.java | 0.08 (resolved, uncited) |
| Coverage Gaps: src/test/java/soctest/message/TestTemplatesAbstracts.java |  | src/test/java/soctest/message/TestTemplatesAbstracts.java | 0.16 |
| Coverage Gaps: src/test/java/soctest/message/TestToCmdToStringParse.java |  | src/test/java/soctest/message/TestToCmdToStringParse.java | 0.32 |
| Coverage Gaps: src/test/java/soctest/robot/TestBuildPlan.java |  | linkonly: src/test/java/soctest/robot/TestBuildPlan.java | 0.08 (resolved, uncited) |
| Coverage Gaps: src/test/java/soctest/robot/TestGameActionExtractor.java |  | src/test/java/soctest/robot/TestGameActionExtractor.java | 0.75 |
| Coverage Gaps: src/test/java/soctest/robot/TestPossiblePiece.java |  | src/test/java/soctest/robot/TestPossiblePiece.java | 0.24 |
| Coverage Gaps: src/test/java/soctest/server/DisplaylessTesterClient.java |  | src/test/java/soctest/server/DisplaylessTesterClient.java | 0.40 |
| Coverage Gaps: src/test/java/soctest/server/TestCustomMapLoader.java |  | src/test/java/soctest/server/TestCustomMapLoader.java | 0.75 |
| Coverage Gaps: src/test/java/soctest/server/TestGameEventLog.java |  | src/test/java/soctest/server/TestGameEventLog.java | 0.56 |
| Coverage Gaps: src/test/java/soctest/server/TestRecorder.java |  | src/test/java/soctest/server/TestRecorder.java | 0.75 |
| Coverage Gaps: src/test/java/soctest/server/TestSOCChatRecentBuffer.java |  | src/test/java/soctest/server/TestSOCChatRecentBuffer.java | 0.48 |
| Coverage Gaps: src/test/java/soctest/server/TestSOCGameHandler.java |  | linkonly: src/test/java/soctest/server/TestSOCGameHandler.java | 0.08 (resolved, uncited) |
| Coverage Gaps: src/test/java/soctest/server/TestSOCServerMisc.java |  | linkonly: src/test/java/soctest/server/TestSOCServerMisc.java | 0.08 (resolved, uncited) |
| Coverage Gaps: src/test/java/soctest/server/savegame/TestLoadgame.java |  | src/test/java/soctest/server/savegame/TestLoadgame.java | 0.75 |
| Coverage Gaps: src/test/java/soctest/server/savegame/TestSavegame.java |  | linkonly: src/test/java/soctest/server/savegame/TestSavegame.java | 0.08 (resolved, uncited) |
| Coverage Gaps: src/test/java/soctest/util/TestDataUtils.java |  | linkonly: src/test/java/soctest/util/TestDataUtils.java | 0.08 (resolved, uncited) |
| Coverage Gaps: src/test/java/soctest/util/TestFeatureSet.java |  | linkonly: src/test/java/soctest/util/TestFeatureSet.java | 0.08 (resolved, uncited) |
| Coverage Gaps: src/test/java/soctest/util/TestGameList.java |  | linkonly: src/test/java/soctest/util/TestGameList.java | 0.08 (resolved, uncited) |
| Coverage Gaps: src/test/java/soctest/util/TestVersion.java |  | linkonly: src/test/java/soctest/util/TestVersion.java | 0.08 (resolved, uncited) |
| Coverage Gaps: src/test/python/i18n/__init__.py | i18n test package | linkonly: src/test/python/i18n/__init__.py | 0.08 (resolved, uncited) |
| Coverage Gaps: src/test/python/server/__init__.py | a unit test package | linkonly: src/test/python/server/__init__.py | 0.08 (resolved, uncited) |
| Coverage Gaps: src/test/python/server/savegame/__init__.py | a unit test package | linkonly: src/test/python/server/savegame/__init__.py | 0.08 (resolved, uncited) |

## Unverified Areas

Parts of this document have limited verifiable source evidence — treat normative claims as unverified until confirmed. See [documentation conventions](../../documentation-conventions.md#unverified-areas).
