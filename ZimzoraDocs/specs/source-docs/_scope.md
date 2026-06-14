---
id: source-docs
type: SCOPE
tenant-id: 019ec5a4-5e07-7341-98b8-45f59e05fe07
name: Source Document Redocumentation
purpose: Deterministic SGD records for every discovered source markdown document so redocumentation coverage is explicit, auditable, and never silently dropped.
owner: codelens-agent
last-verified:
parent: sgd:codelens/64c51e15-af55-50cd-8d03-12b24fb09071
scope: sgd:codelens/64c51e15-af55-50cd-8d03-12b24fb09071/source-docs
visibility: subtree
kind: concept
freshness-window-days: 14
governs: []
references:
  - agents.design.md
  - claude.design.md
  - doc-cities-and-knights-design.design.md
  - doc-cities-and-knights-implemented.design.md
  - doc-custom-maps.design.md
  - doc-database.design.md
  - doc-extra-gameactionextractor.design.md
  - doc-improvements-2026-06.design.md
  - doc-message-sequences-for-game-actions.design.md
  - doc-readme-developer.design.md
  - doc-release-testing.design.md
  - doc-versions.design.md
  - doc-web-docker.design.md
  - readme.design.md
local-laws:
  - Every discovered non-archived markdown source document MUST have one member record in this scope.
  - Member records preserve source path and section inventory without fabricating implementation status.
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

# Source Document Redocumentation

## Purpose
This sub-scope provides deterministic coverage for the existing markdown corpus discovered before CodeLens writes new SGD artifacts. Each member records a source path, section inventory, bounded digest, and explicit obligation language. The scope prevents silent loss of product, API, risk, roadmap, research, brand, and readiness documents while keeping implementation claims subordinate to direct source-code evidence.

## Members

| Member | Kind | Status |
|--------|------|--------|
| [agents.design](agents.design.md) | DESIGN | Draft |
| [claude.design](claude.design.md) | DESIGN | Draft |
| [doc-cities-and-knights-design.design](doc-cities-and-knights-design.design.md) | DESIGN | Draft |
| [doc-cities-and-knights-implemented.design](doc-cities-and-knights-implemented.design.md) | DESIGN | Draft |
| [doc-custom-maps.design](doc-custom-maps.design.md) | DESIGN | Draft |
| [doc-database.design](doc-database.design.md) | DESIGN | Draft |
| [doc-extra-gameactionextractor.design](doc-extra-gameactionextractor.design.md) | DESIGN | Draft |
| [doc-improvements-2026-06.design](doc-improvements-2026-06.design.md) | DESIGN | Draft |
| [doc-message-sequences-for-game-actions.design](doc-message-sequences-for-game-actions.design.md) | DESIGN | Draft |
| [doc-readme-developer.design](doc-readme-developer.design.md) | DESIGN | Draft |
| [doc-release-testing.design](doc-release-testing.design.md) | DESIGN | Draft |
| [doc-versions.design](doc-versions.design.md) | DESIGN | Draft |
| [doc-web-docker.design](doc-web-docker.design.md) | DESIGN | Draft |
| [readme.design](readme.design.md) | DESIGN | Draft |

Total direct children: 14
