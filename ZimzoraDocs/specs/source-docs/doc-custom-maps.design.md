---
id: source-docs.doc-custom-maps
type: DESIGN
tenant-id: 019ec5a4-5e07-7341-98b8-45f59e05fe07
scope: sgd:codelens/64c51e15-af55-50cd-8d03-12b24fb09071/source-docs
owner: codelens-agent
last-verified:
visibility: subtree
freshness-window-days: 14
source-doc: doc/Custom-Maps.md
references:
  - ../../../doc/Custom-Maps.md
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

# Source Doc Redocumentation: Sammys-Settlers - Custom Maps (User-Defined Board Layouts)

## Overview
This deterministic SGD record represents one source markdown document discovered during Stage 0. It preserves the source path, section map, and bounded digest so the generated corpus can prove that the input document was seen and carried forward. It is not a ratified replacement for the source file; unresolved claims remain obligations for deeper synthesis or human review.

## Source Document
- [doc/Custom-Maps.md](../../../doc/Custom-Maps.md)

## Section Inventory
- H1 Sammys-Settlers - Custom Maps (User-Defined Board Layouts)
- H2 Contents
- H2 Quick start
- H2 Enabling custom maps on the server
- H2 File format
- H3 Top-level fields
- H3 Land hexes
- H3 Land areas
- H3 Ports
- H3 Robber and pirate start
- H3 Coordinates
- H2 The sample map, field by field
- H2 Scenario keys (how custom maps are named)
- H2 What is validated
- H2 What is NOT validated
- H2 Troubleshooting

## Content Digest
````markdown
# Sammys-Settlers - Custom Maps (User-Defined Board Layouts)

Server-side support for user-defined board layouts, loaded from JSON files at
server startup and offered to players as custom scenarios. **Standard rules only
(v1):** custom maps change the board layout (land hexes, dice numbers, ports,
land areas, robber/pirate start), but not the game rules. They run on the sea
board (the same large board used by built-in scenarios) and use the standard
win condition.

Clients need no changes: the server sends a custom map's layout to clients with
the same `SOCBoardLayout2` message used by every other scenario, so any current
client can play a custom map.


## Contents

- Quick start
- Enabling custom maps on the server
- File format
  - Top-level fields
  - Land hexes
  - Land areas
  - Ports
  - Robber and pirate start
  - Coordinates
- The sample map, field by field
- Scenario keys (how custom maps are named)
- What is validated
- What is NOT validated
- Troubleshooting


## Quick start

1. Create a directory for your maps, e.g. `custommaps/`.
2. Copy `src/main/bin/custommaps/sample-island.map.json` into it, or write your own.
3. Start the server with `-Djsettlers.custommaps.dir=custommaps`
   (and make sure `gson.jar` is on the classpath — see below).
4. The server logs each loaded map at startup, e.g.
   `Custom map loaded: sample-island.map.json -> scenario SC_XSAMP ("Sample Two Islands")`.
5. Players choosing a new game will see the custom map in the scenario list.


## Enabling custom maps on the server

Set the server property `jsettlers.custommaps.dir` to the directory to scan.
The server scans it once at startup for files ending in `.map.json`.

```
java -jar Sammys-SettlersServer-<ver>.jar -Djsettlers.custommaps.dir=/path/to/custommaps
```

or in `jsserver.properties`:

```
jsettlers.custommaps.dir=custommaps
```

Custom maps use **GSON** for JSON parsing, exactly like the savegame feature.
If `gson.jar` isn't on the classpath, the server still starts normally and just
logs a warning that custom maps are disabled. (The shipped JARs declare
`gson.jar` on their `Class-Path`.)

Each valid map is registered as a scenario. Invalid maps are logged with an
actionable warning and skipped; a bad map file never crashes the server.


## File format

A custom map is a UTF-8 JSON file whose name ends in `.map.json`. The base

[...digest truncated by CodeLens...]
````

## Redocumentation Obligations
- Preserve this source document's claims in a generated feature, design, architecture, gateway, testplan, or invariant record before treating the corpus as a full semantic replacement for the original docs tree.
- Reconcile any conflict between this digest and direct source-code evidence through the source-truth audit, not by repeating doc-only claims as implemented behavior.

## Source Linkage
- [doc/Custom-Maps.md](../../../doc/Custom-Maps.md)
