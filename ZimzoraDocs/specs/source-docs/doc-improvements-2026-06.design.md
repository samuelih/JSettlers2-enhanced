---
id: source-docs.doc-improvements-2026-06
type: DESIGN
tenant-id: 019ec5a4-5e07-7341-98b8-45f59e05fe07
scope: sgd:codelens/64c51e15-af55-50cd-8d03-12b24fb09071/source-docs
owner: codelens-agent
last-verified:
visibility: subtree
freshness-window-days: 14
source-doc: doc/Improvements-2026-06.md
references:
  - ../../../doc/Improvements-2026-06.md
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

# Source Doc Redocumentation: Sammys-Settlers Improvements — June 2026

## Overview
This deterministic SGD record represents one source markdown document discovered during Stage 0. It preserves the source path, section map, and bounded digest so the generated corpus can prove that the input document was seen and carried forward. It is not a ratified replacement for the source file; unresolved claims remain obligations for deeper synthesis or human review.

## Source Document
- [doc/Improvements-2026-06.md](../../../doc/Improvements-2026-06.md)

## Section Inventory
- H1 Sammys-Settlers Improvements — June 2026
- H2 1. Overview
- H2 2. Workstreams
- H3 2.1 Graphics & themes
- H3 2.2 Playability & UX
- H3 2.3 Custom maps
- H3 2.4 Cities & Knights groundwork
- H3 2.5 Robot robustness
- H3 2.6 Build/test fixes
- H2 3. Verification
- H2 4. Honest limitations & roadmap
- H2 5. Cross-references
- H2 6. Web client migration (TypeScript/React over WebSocket)
- H3 6.1 The seven phases
- H3 6.2 Architecture (verifiable)
- H3 6.3 What works and is Playwright-proven
- H3 6.4 Honest limitations / not yet at parity with the Swing client

## Content Digest
```markdown
# Sammys-Settlers Improvements — June 2026

This is the single summary of an improvement initiative carried out on top of the
`2.7.00`-in-development line. It is the place to read first if you want to understand
everything that changed and why. Every claim here is verifiable in the repository;
where something is groundwork, a limitation, or deliberately deferred, this document
says so plainly rather than overselling it.

Baseline for "what changed" is commit `aa68826` ("Baseline: Sammys-Settlers as downloaded,
before improvement work"). All work landed in four commits on `main`, built and tested
in waves behind green gates, plus one post-review fix commit:

| Commit    | Title |
| --------- | ----- |
| `f3d3c91` | Add preferences dialog/registry, custom map loading, and C&K design docs |
| `6e8e54c` | Add board rendering quality prefs, themes, color-blind mode, hotkeys, C&K groundwork |
| `48c4989` | Add left-click build flow on board, robot fallback for unknown inventory items |
| `989675a` | Fix issues found in post-implementation code review |

(The earlier commit `2e0fc1d` "Fix TestI18NGameoptScenStrings failure when project path
contains spaces" predates this initiative's baseline and is not part of it.)


## 1. Overview

| Workstream | What shipped | Key files | Commits |
| ---------- | ------------ | --------- | ------- |
| Graphics & themes | Board rendering-quality preferences (antialiasing, image-scaling interpolation) actually consumed by the board; dice-number circle image caching; per-graphics-set externalized `theme.properties`; color-blind assist mode for the solid-color UI | `src/main/java/soc/client/SOCBoardPanel.java`, `src/main/java/soc/client/ColorSquare.java`, `src/main/resources/resources/hexes/pastel/theme.properties`, `src/main/resources/resources/hexes/classic/theme.properties` | `6e8e54c`, `989675a` |

[...digest truncated by CodeLens...]
```

## Redocumentation Obligations
- Preserve this source document's claims in a generated feature, design, architecture, gateway, testplan, or invariant record before treating the corpus as a full semantic replacement for the original docs tree.
- Reconcile any conflict between this digest and direct source-code evidence through the source-truth audit, not by repeating doc-only claims as implemented behavior.

## Source Linkage
- [doc/Improvements-2026-06.md](../../../doc/Improvements-2026-06.md)
