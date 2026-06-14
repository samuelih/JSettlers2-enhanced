---
id: source-docs.doc-message-sequences-for-game-actions
type: DESIGN
tenant-id: 019ec5a4-5e07-7341-98b8-45f59e05fe07
scope: sgd:codelens/64c51e15-af55-50cd-8d03-12b24fb09071/source-docs
owner: codelens-agent
last-verified:
visibility: subtree
freshness-window-days: 14
source-doc: doc/Message-Sequences-for-Game-Actions.md
references:
  - ../../../doc/Message-Sequences-for-Game-Actions.md
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

# Source Doc Redocumentation: Overview

## Overview
This deterministic SGD record represents one source markdown document discovered during Stage 0. It preserves the source path, section map, and bounded digest so the generated corpus can prove that the input document was seen and carried forward. It is not a ratified replacement for the source file; unresolved claims remain obligations for deeper synthesis or human review.

## Source Document
- [doc/Message-Sequences-for-Game-Actions.md](../../../doc/Message-Sequences-for-Game-Actions.md)

## Section Inventory
- H1 Overview
- H1 Game actions and their message sequences
- H2 Roll dice
- H3 Roll 7
- H3 Roll other than 7
- H2 Buy and build piece
- H3 Initial Placement
- H4 Basic example with player 2's first initial road, second initial settlement:
- H4 Cancel and re-place initial settlement location
- H4 Building ship (or settlement) reveals non-gold hex from fog
- H4 Building ship (or settlement) reveals gold hex from fog
- H3 Settlement
- H3 City
- H3 Road (may set Longest Route)
- H3 Ship (may set Longest Route)
- H2 Undo build or move piece
- H3 Road
- H3 City (upgrade from settlement)
- H3 Ship (undo build)
- H3 Ship (undo move)
- H2 Move piece (move ship)
- H2 Buy dev card
- H2 Use/Play each dev card type
- H3 Road Building

## Content Digest
```markdown
Message Sequences for Game Actions

# Overview

This is a list of the basic actions players can take in a game (roll dice, build settlements, etc)
and the network message sequences that convey them, for reference.

Doesn't include some scenario-specific actions such as placing a "gift port" in the Forgotten Tribe.

These messages assume server and client version 2.5.00 or newer.
That version updated and reorganized many sequences to be more efficient
and easier for bots and other automated readers to recognize.
Since the server and built-in robots are packaged together,
the bots also use these updated message sequences.
When recording game event sequences, the server records using the latest version format,
even when it actually sent different messages to an older client to be compatible.

If you're curious about older versions, see the code and comments in message classes like `SOCPutPiece`
and server classes like `SOCGameMessageHandler` and `SOCGameHandler` which communicate with clients.

Sequences are tested for consistency during unit tests and release testing:
- `/src/test/java/soctest/server/TestRecorder.java` `testLoadAndBasicSequences()` runs through some basic game actions
- `/src/extraTest/java/soctest/server/TestActionsMessages.java` runs through the rest of them
- `src/test/java/soctest/robot/TestGameActionExtractor.java` tests recognition of hardcoded message sequences
- `/src/test/resources/resources/gameevent/all-basic-actions.soclog` has all of these sequences and some non-sequence messages
  (debug commands, a client joins the game, etc).

For sample code which recognizes and extracts game actions from these sequences,
see GameActionExtractor.md (extra/GameActionExtractor.md).


# Game actions and their message sequences

This list isn't exhaustive; some sequences like Roll Dice
vary depending on game options and scenarios. All sequences
document their starting and ending messages, which can be relied on
regardless of game options or scenarios in use.

All `SOCGameServerText` should be considered optional or ignored,
since server may not localize and send text to bots.

The format used here is from `soc.extra.server.GameEventLog.EventEntry.toString()`.
It shows the origin of each message from a client player (`f3:`)
or the audience of each message from server (`all:`, `p3:`, etc).

[...digest truncated by CodeLens...]
```

## Redocumentation Obligations
- Preserve this source document's claims in a generated feature, design, architecture, gateway, testplan, or invariant record before treating the corpus as a full semantic replacement for the original docs tree.
- Reconcile any conflict between this digest and direct source-code evidence through the source-truth audit, not by repeating doc-only claims as implemented behavior.

## Source Linkage
- [doc/Message-Sequences-for-Game-Actions.md](../../../doc/Message-Sequences-for-Game-Actions.md)
