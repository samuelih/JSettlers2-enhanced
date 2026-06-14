---
id: source-docs.doc-cities-and-knights-implemented
type: DESIGN
tenant-id: 019ec5a4-5e07-7341-98b8-45f59e05fe07
scope: sgd:codelens/64c51e15-af55-50cd-8d03-12b24fb09071/source-docs
owner: codelens-agent
last-verified:
visibility: subtree
freshness-window-days: 14
source-doc: doc/Cities-and-Knights-Implemented.md
references:
  - ../../../doc/Cities-and-Knights-Implemented.md
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

# Source Doc Redocumentation: Cities & Knights — implemented rules and protocol

## Overview
This deterministic SGD record represents one source markdown document discovered during Stage 0. It preserves the source path, section map, and bounded digest so the generated corpus can prove that the input document was seen and carried forward. It is not a ratified replacement for the source file; unresolved claims remain obligations for deeper synthesis or human review.

## Source Document
- [doc/Cities-and-Knights-Implemented.md](../../../doc/Cities-and-Knights-Implemented.md)

## Section Inventory
- H1 Cities & Knights — implemented rules and protocol
- H2 Official expansion baseline
- H2 Scenario
- H2 Commodities (`_CK_IMP`)
- H2 City improvements (`_CK_IMP`)
- H2 Metropolis (`_CK_METR`)
- H2 Knights (`_CK_KNI`)
- H2 Barbarians (`_CK_BARB`)
- H2 Server progress cards (`_CK_PROG`)
- H2 Web client
- H2 Joining / reconnecting
- H2 Bots
- H2 Simplifications

## Content Digest
```markdown
# Cities & Knights — implemented rules and protocol

This document describes the **shipped** Cities & Knights implementation (scenario `SC_CK`),
which realizes Phases 1–3 of Cities-and-Knights-Design.md (Cities-and-Knights-Design.md).
Where the boxed game and this implementation differ, the difference is listed in
Simplifications (#simplifications). All mechanics are gated on the `_CK_*` game options and
are inert in every other game.

## Official expansion baseline

Reference target: the 2025 CATAN Cities & Knights rulebook. In the boxed game,
the base development cards, base sea frame 1-2, and Largest Army tile are not used.
Cities & Knights adds:

| Component | Count | Implementation status |
|-----------|-------|-----------------------|
| Commodity cards | 36: 12 cloth, 12 coin, 12 paper | Server-backed as per-player counters |
| Progress cards | 54: 18 Trade, 18 Politics, 18 Science | Web lists all; server supports a subset |
| Event/red dice | 3 dice total: event die, red die, white die | Server uses the two standard dice as a simplification |
| Knights | 24: 6 per color, two each basic/strong/mighty | Server tracks aggregate counts, not board pieces |
| City walls | 12: 3 per color | Reference-only in web UI |
| Metropolises | 3: one per improvement track | Server tracks owner per track, not city placement |
| Merchant piece | 1 | Reference-only in web UI |
| Barbarian ship/track | 1 ship on the C&K sea frame | Server tracks a strength counter |
| Defender VP tokens | 6 | Server-backed as Special VP |
| City-improvement boards/cubes | 4 boards, 12 cubes | Server-backed as special-item track levels |

Official progress deck names and counts:

| Deck | Cards |
|------|-------|
| Trade | 2 Commercial Harbor, 2 Guild Dues (older: Master Merchant), 6 Merchant, 2 Merchant Fleet, 4 Resource Monopoly, 2 Trade Monopoly |
| Politics | 2 Diplomacy (older: Diplomat), 2 Encouragement (older: Warlord), 3 Espionage (older: Spy), 2 Intrigue, 2 Sabotage, 2 Taxation (older: Bishop), 2 Treason (older: Deserter), 1 Constitution, 2 Wedding |
| Science | 2 Alchemy (older: Alchemist), 2 Crane, 1 Engineering (older: Engineer), 2 Invention (older: Inventor), 2 Irrigation, 2 Medicine, 2 Mining, 2 Road Building, 2 Smithing (older: Smith), 1 Printing (older: Printer) |

The web client now renders this full official inventory in the Cities & Knights

[...digest truncated by CodeLens...]
```

## Redocumentation Obligations
- Preserve this source document's claims in a generated feature, design, architecture, gateway, testplan, or invariant record before treating the corpus as a full semantic replacement for the original docs tree.
- Reconcile any conflict between this digest and direct source-code evidence through the source-truth audit, not by repeating doc-only claims as implemented behavior.

## Source Linkage
- [doc/Cities-and-Knights-Implemented.md](../../../doc/Cities-and-Knights-Implemented.md)
