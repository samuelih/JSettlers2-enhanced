---
id: source-docs.doc-release-testing
type: DESIGN
tenant-id: 019ec5a4-5e07-7341-98b8-45f59e05fe07
scope: sgd:codelens/64c51e15-af55-50cd-8d03-12b24fb09071/source-docs
owner: codelens-agent
last-verified:
visibility: subtree
freshness-window-days: 14
source-doc: doc/Release-Testing.md
references:
  - ../../../doc/Release-Testing.md
stateful-fields:
  - id: body
    name: Document body
    status: Draft
codelens:
  projectId: 64c51e15-af55-50cd-8d03-12b24fb09071
  campaignId: codelens-b7eef336
  lifecycle: hypothesis
  confidence: 0.750
  sourceHash: 3a054b7699dc15d756802f5b6449718fe50a2343
  lastValidatedCommit: 3a054b7699dc15d756802f5b6449718fe50a2343
  deterministicReferences: true
---

# Source Doc Redocumentation: Release Testing

## Overview
This deterministic SGD record represents one source markdown document discovered during Stage 0. It preserves the source path, section map, and bounded digest so the generated corpus can prove that the input document was seen and carried forward. It is not a ratified replacement for the source file; unresolved claims remain obligations for deeper synthesis or human review.

## Source Document
- [doc/Release-Testing.md](../../../doc/Release-Testing.md)

## Section Inventory
- H1 Release Testing
- H2 Quick tests and setup
- H2 Basic functional tests
- H2 New features
- H2 Regression testing
- H3 Setup
- H3 New features in previous 2 versions
- H3 Each available Game Option
- H3 Basic rules and game play
- H3 Build by left-click and keyboard shortcuts
- H3 Undo Build/Move Pieces
- H3 Scenarios and Victory Points to Win
- H3 Unprivileged info commands
- H3 Game info sent to observer
- H3 Game reset voting
- H3 Fog Hex reveal gives resources, during initial placement and normal game play
- H3 Scenario-specific behaviors
- H3 New Game minimum version warning
- H3 Client preferences
- H3 Network robustness: Client reconnect when scenario's board layout has "special situations"
- H3 Version compatibility testing
- H3 Server robustness: Bot disconnect/reconnect during game start
- H3 StatusMessage "status value" fallback at older versions
- H3 Game Option and Scenario info sync/negotiation when server and client are different versions/locales

## Content Digest
```markdown
# Release Testing

When preparing to release a new version, testing should include:

## Quick tests and setup

- Before building the JARs to be tested, `git status` should have no untracked or uncommitted changes
    - Run `gradle distCheckSrcDirty` to check that and list any files with such changes
- All unit tests run in IDE without failures
- `gradle clean build` runs without failures, under gradle 6.9.x and 7.5.x
- These should print the expected version and build number:
    - `java -jar build/libs/Sammys-Settlers-2.*.jar --version`
    - `java -jar build/libs/Sammys-SettlersServer-2.*.jar --version`
- Message Traffic debug prints during all tests, to help debugging if needed:
  Run server and clients with JVM property `-Djsettlers.debug.traffic=Y`

## Basic functional tests

- Game setup, join, and reset:
    - Create and start playing a practice game with 1 locked space & 2 bots, past initial placement
      into normal play (roll dice, etc) with default options
        - During initial placement, cancel and re-place a settlement
            - That settlement's visual highlight for "latest placement" should disappear along with the settlement
            - If second settlement is canceled, game should return gained resources to the bank
    - Create and start playing a practice game on the 6-player board (5 bots), with options like Roll No 7s for First 7 Turns
    - `Sammys-SettlersServer.jar`: Start a dedicated server on another ("remote") machine's text-only console
    - Join that remote server & play a full game, then reset board and start another game
        - `*STATS*` command should include the finished game
        - Bots should rejoin and play
    - `Sammys-Settlers.jar`: Start a Server (non-default port # like 8080), start a game
    - In the new game's chat, say a few lines ("x", "y", "z" etc)
    - Start another client, join first client's local server and that game
    - Joining client should see "recap" of the game chat ("x", "y", "z")
    - Start the game (will have 2 human clients & 2 bots), finish initial placement
    - Ensure the 2 clients can talk to each other in the game's chat area
    - Client leaves game (not on their turn): A bot should join, replace them, and play their entire next turn (not unresponsive)
    - Have new client join and replace bot; verify all of player info is sent

[...digest truncated by CodeLens...]
```

## Redocumentation Obligations
- Preserve this source document's claims in a generated feature, design, architecture, gateway, testplan, or invariant record before treating the corpus as a full semantic replacement for the original docs tree.
- Reconcile any conflict between this digest and direct source-code evidence through the source-truth audit, not by repeating doc-only claims as implemented behavior.

## Source Linkage
- [doc/Release-Testing.md](../../../doc/Release-Testing.md)
