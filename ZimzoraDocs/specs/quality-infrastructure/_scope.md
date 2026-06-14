---
id: quality-infrastructure.scope
type: SCOPE
kind: code
tenant-id: 019ec5a4-5e07-7341-98b8-45f59e05fe07
name: Quality Infrastructure
purpose: "This scope governs the automated test surface that validates both the Java server/desktop client and the TypeScript web client. Java unit tests reside in src/test/java/soctest/** with companion Python tests in src/test/python, while lengthy functional tests live in src/extraTest/java/soctest/** (a separately-wired source set excluded from the shipped JARs). A cross-cutting concern within this domain is protocol message-sequence consistency: per doc/Message-Sequences-for-Game-Actions.md and doc/extra/GameActionExtractor.md, TestRecorder.testLoadAndBasicSequences, TestActionsMessages, and TestGameActionExtractor verify the SOCMessage game-action sequences that bots and automated readers depend on, checked against recorded game-event fixtures such as all-basic-actions.soclog. The web client is exercised by Vitest unit tests (the *.test.tsx files alongside components and screens) and Playwright end-to-end tests, both wired through web/package.json scripts. The build also enforces SQL-template consistency via testSrcDBTemplateTokens and testSrcDBTemplates. These test directories are nested under src and web, which are governed elsewhere, but the test code is this domain's primary home and carries the verbatim directory credit. Governs 10 code areas rooted at `src/test/java`, `src/extraTest/java`, `src/test` (and 7 more), spanning 9 member documents (1 ARCH, 4 DESIGN, 4 FEATURE)."
scope: sgd:codelens/64c51e15-af55-50cd-8d03-12b24fb09071/quality-infrastructure
parent: sgd:codelens/64c51e15-af55-50cd-8d03-12b24fb09071
owner: codelens-agent
last-verified: 2026-06-14
visibility: subtree
freshness-window-days: 14
governs:
  - src/test/java/soctest
  - src/extraTest/java/soctest
  - src/test/python
  - src/extraTest/python
  - src/test/java/soctest/server/TestRecorder.java
  - src/test/java/soctest/robot/TestGameActionExtractor.java
  - src/test/resources/resources/gameevent/all-basic-actions.soclog
  - web/src/screens/MapEditorScreen.test.tsx
  - web/src/screens/MapEditorScreen.tsx
  - web/src/components/Dialog.test.tsx
  - web/package.json
references:
  - functional-test-suite-extratest.design.md
  - java-unit-test-suite.design.md
  - protocol-message-sequence-consistency-tests.design.md
  - quality-infrastructure.arch.md
  - web-client-test-suite.design.md
  - ../documentation-conventions.md
gateway-docs:
  - contracts/quality-infrastructure.gateway.md
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
  confidence: 0.700
  sourceHash: 3a054b7699dc15d756802f5b6449718fe50a2343
  lastValidatedCommit: 3a054b7699dc15d756802f5b6449718fe50a2343
  deterministicReferences: true
---

# Quality Infrastructure

## Purpose
This scope governs the automated test surface that validates both the Java server/desktop client and the TypeScript web client. Java unit tests reside in src/test/java/soctest/** with companion Python tests in src/test/python, while lengthy functional tests live in src/extraTest/java/soctest/** (a separately-wired source set excluded from the shipped JARs). A cross-cutting concern within this domain is protocol message-sequence consistency: per doc/Message-Sequences-for-Game-Actions.md and doc/extra/GameActionExtractor.md, TestRecorder.testLoadAndBasicSequences, TestActionsMessages, and TestGameActionExtractor verify the SOCMessage game-action sequences that bots and automated readers depend on, checked against recorded game-event fixtures such as all-basic-actions.soclog. The web client is exercised by Vitest unit tests (the *.test.tsx files alongside components and screens) and Playwright end-to-end tests, both wired through web/package.json scripts. The build also enforces SQL-template consistency via testSrcDBTemplateTokens and testSrcDBTemplates. These test directories are nested under src and web, which are governed elsewhere, but the test code is this domain's primary home and carries the verbatim directory credit. Governs 10 code areas rooted at `src/test/java`, `src/extraTest/java`, `src/test` (and 7 more), spanning 9 member documents (1 ARCH, 4 DESIGN, 4 FEATURE).

## Scope
sgd:codelens/64c51e15-af55-50cd-8d03-12b24fb09071/quality-infrastructure

## Local Laws
- Use the project glossary's established terminology consistently — 466 term(s) carry a citable source document (e.g. "Game").

## Members

| Member | Kind | Status |
|--------|------|--------|
| [Functional Test Suite (extraTest)](functional-test-suite-extratest.design.md) | DESIGN | Draft |
| [functional-test-suite-extratest.feature](functional-test-suite-extratest.feature.md) | FEATURE | Draft |
| [Java Unit Test Suite](java-unit-test-suite.design.md) | DESIGN | Draft |
| [java-unit-test-suite.feature](java-unit-test-suite.feature.md) | FEATURE | Draft |
| [Protocol Message-Sequence Consistency Tests](protocol-message-sequence-consistency-tests.design.md) | DESIGN | Draft |
| [protocol-message-sequence-consistency-tests.feature](protocol-message-sequence-consistency-tests.feature.md) | FEATURE | Draft |
| [Quality Infrastructure](quality-infrastructure.arch.md) | ARCH | Draft |
| [Web Client Test Suite](web-client-test-suite.design.md) | DESIGN | Draft |
| [web-client-test-suite.feature](web-client-test-suite.feature.md) | FEATURE | Draft |

Total direct children: 9

## Source Linkage
- [src/test/java/soctest](../../../src/test/java/soctest)
- [src/extraTest/java/soctest](../../../src/extraTest/java/soctest)
- [src/test/python](../../../src/test/python)
- [src/extraTest/python](../../../src/extraTest/python)
- [src/test/java/soctest/server/TestRecorder.java](../../../src/test/java/soctest/server/TestRecorder.java)
- [src/test/java/soctest/robot/TestGameActionExtractor.java](../../../src/test/java/soctest/robot/TestGameActionExtractor.java)
- [src/test/resources/resources/gameevent/all-basic-actions.soclog](../../../src/test/resources/resources/gameevent/all-basic-actions.soclog)
- [src/test/java/soctest/server/TestRecorder.java::TestRecorder](../../../src/test/java/soctest/server/TestRecorder.java::TestRecorder)
- [src/test/java/soctest/robot/TestGameActionExtractor.java::TestGameActionExtractor](../../../src/test/java/soctest/robot/TestGameActionExtractor.java::TestGameActionExtractor)
- [src/test/java/soctest/robot/TestGameActionExtractor.java::GameActionExtractor](../../../src/test/java/soctest/robot/TestGameActionExtractor.java::GameActionExtractor)
- [src/test/java/soctest/server/TestRecorder.java::GameEventLog](../../../src/test/java/soctest/server/TestRecorder.java::GameEventLog)
- [src/test/java/soctest/server/TestRecorder.java::RecordingSOCServer](../../../src/test/java/soctest/server/TestRecorder.java::RecordingSOCServer)
- [web/src/screens/MapEditorScreen.test.tsx](../../../web/src/screens/MapEditorScreen.test.tsx)
- [web/src/screens/MapEditorScreen.tsx](../../../web/src/screens/MapEditorScreen.tsx)
- [web/src/components/Dialog.test.tsx](../../../web/src/components/Dialog.test.tsx)
- [web/package.json](../../../web/package.json)
- [web/src/screens/MapEditorScreen.test.tsx::importJson](../../../web/src/screens/MapEditorScreen.test.tsx::importJson)
- [web/src/screens/MapEditorScreen.tsx::MapEditorScreen](../../../web/src/screens/MapEditorScreen.tsx::MapEditorScreen)

Charter conventions: [documentation-conventions.md](../documentation-conventions.md#epic-charter-conventions)

## Source Linkage Grounding

_Per-row confidence; `_unverified_` rows are disclosed, not verified; `0.08 (resolved, uncited)` is the resolved-but-uncited baseline, not measured evidence._

| Element | Doc Evidence | Code Evidence | Confidence |
|---------|--------------|---------------|-----------:|
| Source Linkage: src/test/java/soctest |  | src/test/java/soctest | 1.00 |
| Source Linkage: src/extraTest/java/soctest |  | src/extraTest/java/soctest | 0.75 |
| Source Linkage: src/test/python |  | src/test/python | 0.56 |
| Source Linkage: src/extraTest/python |  | src/extraTest/python | 0.92 |
| Source Linkage: src/test/java/soctest/server/TestRecorder.java |  | src/test/java/soctest/server/TestRecorder.java | 0.75 |
| Source Linkage: src/test/java/soctest/robot/TestGameActionExtractor.java |  | src/test/java/soctest/robot/TestGameActionExtractor.java | 0.75 |
| Source Linkage: src/test/resources/resources/gameevent/all-basic-actions.soclog | Game created at: 2021-10-10 22:48:46 -0400 | src/test/resources/resources/gameevent/all-basic-actions.soclog | 0.08 (resolved, uncited) |
| Source Linkage: src/test/java/soctest/server/TestRecorder.java::TestRecorder |  | src/test/java/soctest/server/TestRecorder.java:87-2045 | 0.75 |
| Source Linkage: src/test/java/soctest/robot/TestGameActionExtractor.java::TestGameActionExtractor |  | src/test/java/soctest/robot/TestGameActionExtractor.java:69-72 | 0.75 |
| Source Linkage: src/test/java/soctest/robot/TestGameActionExtractor.java::GameActionExtractor |  | src/test/java/soctest/robot/TestGameActionExtractor.java:69-72 | 0.75 |
| Source Linkage: src/test/java/soctest/server/TestRecorder.java::GameEventLog |  | src/main/java/soc/extra/server/GameEventLog.java:231-280 | 0.75 |
| Source Linkage: src/test/java/soctest/server/TestRecorder.java::RecordingSOCServer |  | src/main/java/soc/extra/server/RecordingSOCServer.java:157-163 | 0.75 |
| Source Linkage: web/src/screens/MapEditorScreen.test.tsx | Component test for the map editor screen (Phase 5). | web/src/screens/MapEditorScreen.test.tsx | 0.08 (resolved, uncited) |
| Source Linkage: web/src/screens/MapEditorScreen.tsx |  | web/src/screens/MapEditorScreen.tsx | 0.75 |
| Source Linkage: web/src/components/Dialog.test.tsx |  | web/src/components/Dialog.test.tsx | 0.08 (resolved, uncited) |
| Source Linkage: web/package.json |  | web/package.json | 0.08 (resolved, uncited) |
| Source Linkage: web/src/screens/MapEditorScreen.test.tsx::importJson | /** Paste text into the import textarea and click "Import pasted JSON". */ | web/src/screens/MapEditorScreen.test.tsx:20-24 | 0.08 (resolved, uncited) |
| Source Linkage: web/src/screens/MapEditorScreen.tsx::MapEditorScreen |  | web/src/screens/MapEditorScreen.tsx:95-533 | 0.75 |
