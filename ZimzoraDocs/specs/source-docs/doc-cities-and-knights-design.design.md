---
id: source-docs.doc-cities-and-knights-design
type: DESIGN
tenant-id: 019ec5a4-5e07-7341-98b8-45f59e05fe07
scope: sgd:codelens/64c51e15-af55-50cd-8d03-12b24fb09071/source-docs
owner: codelens-agent
last-verified:
visibility: subtree
freshness-window-days: 14
source-doc: doc/Cities-and-Knights-Design.md
references:
  - ../../../doc/Cities-and-Knights-Design.md
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

# Source Doc Redocumentation: Cities & Knights Design

## Overview
This deterministic SGD record represents one source markdown document discovered during Stage 0. It preserves the source path, section map, and bounded digest so the generated corpus can prove that the input document was seen and carried forward. It is not a ratified replacement for the source file; unresolved claims remain obligations for deeper synthesis or human review.

## Source Document
- [doc/Cities-and-Knights-Design.md](../../../doc/Cities-and-Knights-Design.md)

## Section Inventory
- H1 Cities & Knights Design
- H2 1. Honest verdict up front
- H2 2. Scope & phasing
- H3 Phase 0 — Groundwork (this release)
- H3 Phase 1 — Non-commodity mechanics
- H3 Phase 2 — Commodity / 6th-resource refactor
- H3 Phase 3 — Progress cards + knights + client UI
- H3 Phase 4 — Bot competence
- H2 3. Key representation decisions (with rationale and cited patterns)
- H3 3.1 Knights are city-linked player state, NOT a new `SOCPlayingPiece`
- H3 3.2 City improvements are `SOCSpecialItem` typed entries with levels 1-5 per track
- H3 3.3 Progress cards are a `SOCInventoryItem` subclass, following `SC_FTRI`
- H3 3.4 Barbarian attack is a `SOCGame` counter advanced in `rollDice()`, following `SC_PIRI`
- H3 3.5 Metropolis is an automatic VP award to the track leader
- H3 3.6 VP target 13 via the existing `VP` option
- H2 4. Bot impact summary
- H2 5. The commodity problem, honestly
- H3 5.1 Why the constants break
- H3 5.2 Blast radius (verified)
- H3 5.3 Migration plan
- H2 6. Game option & scenario surface
- H3 6.1 Reserved `_CK_*` options
- H3 6.2 `K_SC_CK` scenario stub
- H2 7. Cross-references

## Content Digest
```markdown
# Cities & Knights Design

> **Status update:** Phases 1–3 of this design are now **implemented** — the `SC_CK`
> scenario is playable. See Cities-and-Knights-Implemented.md (Cities-and-Knights-Implemented.md)
> for the shipped rules, wire protocol, and the simplifications relative to the boxed game.
> Commodities shipped as separate per-player counters (the "separate optional dimension" of
> section 5.3) rather than the full `SOCResourceSet` refactor; Phase 4 (bot competence)
> remains future work. The rest of this document is the original design rationale.

This is a **decision-complete design document** for adding *Cities & Knights*-style rules
to Sammys-Settlers. It was written before implementation so that the groundwork
(reserved game options, a disabled scenario stub, two flag-hidden prototypes, and proposed
message sequences) was built against an agreed plan, and so the multi-release roadmap that
follows could be picked up one independently-shippable phase at a time.

It replaces and expands the one-line TODO entry "Cities & Knights support" in
Readme.developer.md (Readme.developer.md). Proposed network message sequences for the new
actions live in the clearly-marked PROPOSED section at the end of
Message-Sequences-for-Game-Actions.md (Message-Sequences-for-Game-Actions.md); protocol
review should happen against that section before any of those messages are implemented.

Throughout, every design decision cites the existing Sammys-Settlers pattern it reuses, so that
the eventual implementation imitates proven code rather than inventing new mechanisms.


## 1. Honest verdict up front

A playable Cities & Knights is **not** achievable in a single initiative, and this document
does not pretend otherwise. The blocking item is structural, not just effort: Cities & Knights
adds three commodities (cloth, coin, paper) on top of the five base resources, and the entire
Sammys-Settlers codebase assumes exactly five resources. See section 5 (#5-the-commodity-problem-honestly)
for the full analysis. On top of commodities, Cities & Knights needs knight semantics that
conflict with the existing meaning of "knight" (dev-card count feeding Largest Army), a
progress-card deck, a barbarian state machine, metropolis tracking, client UI, and bot strategy.

What *is* realistic now, and what the groundwork in this release commits to:

[...digest truncated by CodeLens...]
```

## Redocumentation Obligations
- Preserve this source document's claims in a generated feature, design, architecture, gateway, testplan, or invariant record before treating the corpus as a full semantic replacement for the original docs tree.
- Reconcile any conflict between this digest and direct source-code evidence through the source-truth audit, not by repeating doc-only claims as implemented behavior.

## Source Linkage
- [doc/Cities-and-Knights-Design.md](../../../doc/Cities-and-Knights-Design.md)
