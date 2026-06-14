---
id: source-docs.doc-extra-gameactionextractor
type: DESIGN
tenant-id: 019ec5a4-5e07-7341-98b8-45f59e05fe07
scope: sgd:codelens/64c51e15-af55-50cd-8d03-12b24fb09071/source-docs
owner: codelens-agent
last-verified:
visibility: subtree
freshness-window-days: 14
source-doc: doc/extra/GameActionExtractor.md
references:
  - ../../../doc/extra/GameActionExtractor.md
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

# Source Doc Redocumentation: Approach

## Overview
This deterministic SGD record represents one source markdown document discovered during Stage 0. It preserves the source path, section map, and bounded digest so the generated corpus can prove that the input document was seen and carried forward. It is not a ratified replacement for the source file; unresolved claims remain obligations for deeper synthesis or human review.

## Source Document
- [doc/extra/GameActionExtractor.md](../../../doc/extra/GameActionExtractor.md)

## Section Inventory
- H2 Approach
- H2 Analysis: Decision tree to recognize sequences as game actions
- H3 When messages from all clients to server are visible: (server-side view)
- H3 When only messages from server are visible: (client-side view)

## Content Digest
```markdown
soc.extra.robot.GameActionExtractor

Recognizes and extracts basic higher-level actions in a game from its message sequences
in a `soc.extra.server.GameEventLog`.

Can be used by bots or any other code which wants to examine a game's logs and actions.

## Approach

Based on Message-Sequences-for-Game-Actions.md (../Message-Sequences-for-Game-Actions.md)'s
list of the message sequences for all the recognized game actions.
Analyze to find common starting messages and build a decision tree from sequences to game actions.
Read through the game's event messages looking for a starting message that's among the starting points of that tree.
If a sequence doesn't match any known sequence, scan forward until a starting message is shown,
and group the unknown messages before it for possible later analysis.

More info and some consistency testing of those message sequences:
- `/src/test/java/soctest/server/TestRecorder.java` `testLoadAndBasicSequences()` runs through some basic game actions
- `/src/extraTest/java/soctest/server/TestActionsMessages.java` runs through the rest of them
- `src/test/java/soctest/robot/TestGameActionExtractor.java` tests recognition of hardcoded message sequences
- `/src/test/resources/resources/gameevent/all-basic-actions.soclog` has all of these sequences and some non-sequence messages

## Analysis: Decision tree to recognize sequences as game actions

Server and client version 2.5.00 or newer.
Analysis ignores all `SOCGameServerText`, since server may not localize and send text to bots.
Tree is used to determine the game action based on sequence seen.

Will want to track current player, current game state.

Message sequence beginnings, roughly in same order as in Message-Sequences-for-Game-Actions.md (../Message-Sequences-for-Game-Actions.md):

### When messages from all clients to server are visible: (server-side view)

- all:SOCTurn
    - SOCTurn's gameState=15 -> Begin regular turn
    - SOCTurn's gameState=100 -> Begin SBP
- f3:SOCRollDice -> Roll Dice
- f3:SOCPutPiece -> Build piece
- f3:SOCBuildRequest
    - Own turn -> Build piece
    - Another player's turn -> Ask Special Building
- f3:SOCCancelBuildRequest -> Cancel built piece (like initial settlement)
- f3:SOCUndoPutPiece -> Undo build or move piece
- f3:SOCMovePiece -> Move ship
- f3:SOCBuyDevCardRequest -> Buy dev card
- f3:SOCPlayDevCardRequest -> Play dev card

[...digest truncated by CodeLens...]
```

## Redocumentation Obligations
- Preserve this source document's claims in a generated feature, design, architecture, gateway, testplan, or invariant record before treating the corpus as a full semantic replacement for the original docs tree.
- Reconcile any conflict between this digest and direct source-code evidence through the source-truth audit, not by repeating doc-only claims as implemented behavior.

## Source Linkage
- [doc/extra/GameActionExtractor.md](../../../doc/extra/GameActionExtractor.md)
