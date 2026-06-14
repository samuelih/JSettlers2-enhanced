---
id: web-protocol-map-editor.scope
type: SCOPE
kind: code
tenant-id: 019ec5a4-5e07-7341-98b8-45f59e05fe07
name: Web Protocol & Map Editor
purpose: "This scope covers the web client's protocol layer and its in-browser custom-map editor. The protocol layer under web/src/protocol re-implements the SOCMessage string wire format and its message-type constants in TypeScript, so the browser client can serialize and parse the same unicode-string messages the authoritative Java SOCServer speaks; per Readme.md, each WebSocket text frame carries one existing SOCMessage string, which keeps the server, rules engine, and robot subsystem unchanged while only the front end is replaced. The map-editor under web/src/map-editor lets players author user-defined board layouts on the sea-board grid (EditorCanvas, EditorPalette) and shape them with mapSchema against the server's custom-map JSON format; per doc/Custom-Maps.md, those layouts target the same `*.map.json` structure the server loads at startup and registers as custom scenarios, so any current client can play them. Governs 4 code areas rooted at `web/src`, `web/src/protocol`, `web/src/map-editor/components` (and 1 more), spanning 7 member documents (1 ARCH, 3 DESIGN, 3 FEATURE)."
scope: sgd:codelens/64c51e15-af55-50cd-8d03-12b24fb09071/web-protocol-map-editor
parent: sgd:codelens/64c51e15-af55-50cd-8d03-12b24fb09071
owner: codelens-agent
last-verified: 2026-06-14
visibility: subtree
freshness-window-days: 14
governs:
  - web/src/protocol
  - web/src/map-editor
  - web/src/protocol/constants.ts
  - web/src/protocol/index.ts
  - web/src/map-editor/components/EditorCanvas.tsx
  - web/src/map-editor/components/EditorPalette.tsx
  - web/src/map-editor/index.ts
references:
  - custom-map-editor-canvas-palette.design.md
  - map-schema-custom-map-json-model.design.md
  - typescript-socmessage-protocol-layer.design.md
  - web-protocol-map-editor.arch.md
  - ../documentation-conventions.md
gateway-docs:
  - contracts/web-protocol-map-editor.gateway.md
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
  confidence: 0.800
  sourceHash: 3a054b7699dc15d756802f5b6449718fe50a2343
  lastValidatedCommit: 3a054b7699dc15d756802f5b6449718fe50a2343
  deterministicReferences: true
---

# Web Protocol & Map Editor

## Purpose
This scope covers the web client's protocol layer and its in-browser custom-map editor. The protocol layer under web/src/protocol re-implements the SOCMessage string wire format and its message-type constants in TypeScript, so the browser client can serialize and parse the same unicode-string messages the authoritative Java SOCServer speaks; per Readme.md, each WebSocket text frame carries one existing SOCMessage string, which keeps the server, rules engine, and robot subsystem unchanged while only the front end is replaced. The map-editor under web/src/map-editor lets players author user-defined board layouts on the sea-board grid (EditorCanvas, EditorPalette) and shape them with mapSchema against the server's custom-map JSON format; per doc/Custom-Maps.md, those layouts target the same `*.map.json` structure the server loads at startup and registers as custom scenarios, so any current client can play them. Governs 4 code areas rooted at `web/src`, `web/src/protocol`, `web/src/map-editor/components` (and 1 more), spanning 7 member documents (1 ARCH, 3 DESIGN, 3 FEATURE).

## Scope
sgd:codelens/64c51e15-af55-50cd-8d03-12b24fb09071/web-protocol-map-editor

## Local Laws
- Use the project glossary's established terminology consistently — 466 term(s) carry a citable source document (e.g. "Game").

## Members

| Member | Kind | Status |
|--------|------|--------|
| [Custom Map Editor Canvas & Palette](custom-map-editor-canvas-palette.design.md) | DESIGN | Draft |
| [custom-map-editor-canvas-palette.feature](custom-map-editor-canvas-palette.feature.md) | FEATURE | Draft |
| [Map Schema & Custom-Map JSON Model](map-schema-custom-map-json-model.design.md) | DESIGN | Draft |
| [map-schema-custom-map-json-model.feature](map-schema-custom-map-json-model.feature.md) | FEATURE | Draft |
| [TypeScript SOCMessage Protocol Layer](typescript-socmessage-protocol-layer.design.md) | DESIGN | Draft |
| [typescript-socmessage-protocol-layer.feature](typescript-socmessage-protocol-layer.feature.md) | FEATURE | Draft |
| [Web Protocol & Map Editor](web-protocol-map-editor.arch.md) | ARCH | Draft |

Total direct children: 7

## Source Linkage
- [web/src/protocol](../../../web/src/protocol)
- [web/src/map-editor](../../../web/src/map-editor)
- [web/src/protocol/constants.ts](../../../web/src/protocol/constants.ts)
- [web/src/protocol/index.ts](../../../web/src/protocol/index.ts)
- [web/src/map-editor/components/EditorCanvas.tsx](../../../web/src/map-editor/components/EditorCanvas.tsx)
- [web/src/map-editor/components/EditorPalette.tsx](../../../web/src/map-editor/components/EditorPalette.tsx)
- [web/src/map-editor/index.ts](../../../web/src/map-editor/index.ts)
- [web/src/map-editor/components/EditorCanvas.tsx::EditorCanvas](../../../web/src/map-editor/components/EditorCanvas.tsx::EditorCanvas)
- [web/src/map-editor/components/EditorCanvas.tsx::computeViewBox](../../../web/src/map-editor/components/EditorCanvas.tsx::computeViewBox)
- [web/src/map-editor/components/EditorCanvas.tsx::HexCell](../../../web/src/map-editor/components/EditorCanvas.tsx::HexCell)
- [web/src/map-editor/components/EditorCanvas.tsx::kindForType](../../../web/src/map-editor/components/EditorCanvas.tsx::kindForType)
- [web/src/map-editor/components/EditorPalette.tsx::EditorPalette](../../../web/src/map-editor/components/EditorPalette.tsx::EditorPalette)
- [web/src/map-editor/components/EditorPalette.tsx::toolHint](../../../web/src/map-editor/components/EditorPalette.tsx::toolHint)
- [web/src/map-editor/components/EditorPalette.tsx::sameCounts](../../../web/src/map-editor/components/EditorPalette.tsx::sameCounts)

Charter conventions: [documentation-conventions.md](../documentation-conventions.md#epic-charter-conventions)

## Source Linkage Grounding

_Per-row confidence; `_unverified_` rows are disclosed, not verified; `0.08 (resolved, uncited)` is the resolved-but-uncited baseline, not measured evidence._

| Element | Doc Evidence | Code Evidence | Confidence |
|---------|--------------|---------------|-----------:|
| Source Linkage: web/src/protocol |  | web/src/protocol | 1.00 |
| Source Linkage: web/src/map-editor |  | web/src/map-editor | 0.86 |
| Source Linkage: web/src/protocol/constants.ts | Protocol constants ported from soc.message.SOCMessage (Java). | web/src/protocol/constants.ts | 0.83 |
| Source Linkage: web/src/protocol/index.ts | Public surface of the protocol core. | web/src/protocol/index.ts | 0.75 |
| Source Linkage: web/src/map-editor/components/EditorCanvas.tsx |  | web/src/map-editor/components/EditorCanvas.tsx | 0.32 |
| Source Linkage: web/src/map-editor/components/EditorPalette.tsx | Hex-type -> swatch fill CSS variable, matching the canvas/board theme tokens. */ | web/src/map-editor/components/EditorPalette.tsx | 0.24 |
| Source Linkage: web/src/map-editor/index.ts | Public surface of the custom-map editor data layer (schema, validation, preview). */ | web/src/map-editor/index.ts | 0.16 |
| Source Linkage: web/src/map-editor/components/EditorCanvas.tsx::EditorCanvas |  | web/src/map-editor/components/EditorCanvas.tsx:223-414 | 0.32 |
| Source Linkage: web/src/map-editor/components/EditorCanvas.tsx::computeViewBox | /** Compute an SVG viewBox spanning all enumerated cells, with a one-hex margin. */ | web/src/map-editor/components/EditorCanvas.tsx:425-444 | 0.32 |
| Source Linkage: web/src/map-editor/components/EditorCanvas.tsx::HexCell | /** Render a single placed-or-empty hex cell. */ | web/src/map-editor/components/EditorCanvas.tsx:75-211 | 0.32 |
| Source Linkage: web/src/map-editor/components/EditorCanvas.tsx::kindForType | /** Convert loose map type strings into known board-art motif keys. */ | web/src/map-editor/components/EditorCanvas.tsx:447-462 | 0.32 |
| Source Linkage: web/src/map-editor/components/EditorPalette.tsx::EditorPalette | Hex-type -> swatch fill CSS variable, matching the canvas/board theme tokens. */ | web/src/map-editor/components/EditorPalette.tsx:93-346 | 0.24 |
| Source Linkage: web/src/map-editor/components/EditorPalette.tsx::toolHint | /** Short usage hint per tool. */ | web/src/map-editor/components/EditorPalette.tsx:349-366 | 0.24 |
| Source Linkage: web/src/map-editor/components/EditorPalette.tsx::sameCounts | /** True when both player-count lists contain the same values in order. */ | web/src/map-editor/components/EditorPalette.tsx:369-374 | 0.24 |
