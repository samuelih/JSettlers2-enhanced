---
id: web-client-board-rendering.scope
type: SCOPE
kind: code
tenant-id: 019ec5a4-5e07-7341-98b8-45f59e05fe07
name: Web Client & Board Rendering
purpose: The in-development browser front end in `web/`, a TypeScript / React 18 / Zustand / Vite application that renders the Catan board as SVG and connects to the authoritative Java `SOCServer` over WebSocket. Per Readme.md, each WebSocket text frame carries one existing `SOCMessage` string, so this scope replaces only the front end while the Java server remains authoritative for game state, rules, robot players, scenarios, and custom-map validation. The domain spans the protocol/connectivity layer (`web/src/protocol`), board geometry and SVG rendering (`web/src/board`), connect/lobby/game screens (`web/src/screens`) with shared UI components (`web/src/components`), client-side state stores (`web/src/store` — `gameStore.ts`, `settingsStore.ts`, `uiStore.ts`), and a custom-map editor (`web/src/map-editor`). Readme.md notes it is a working in-development client, not yet a full replacement for the Java Swing client. Governs 8 code areas rooted at `web/src/protocol`, `web/src/store`, `web/src/board` (and 5 more), spanning 9 member documents (1 ARCH, 4 DESIGN, 4 FEATURE).
scope: sgd:codelens/64c51e15-af55-50cd-8d03-12b24fb09071/web-client-board-rendering
parent: sgd:codelens/64c51e15-af55-50cd-8d03-12b24fb09071
owner: codelens-agent
last-verified: 2026-06-14
visibility: subtree
freshness-window-days: 14
governs:
  - web/src/protocol/SOCMessage.ts
  - web/src/store/gameStore.ts
  - web/src/board/coords.ts
  - web/src/map-editor/mapSchema.ts
  - web
  - web/src/board/types.ts
  - web/src/board/BoardSVG.module.css
  - web/src/screens
  - web/src/components/index.ts
  - web/src/store/settingsStore.ts
  - web/src/store/uiStore.ts
  - web/src/screens/MapEditorScreen.module.css
references:
  - board-geometry-svg-rendering.design.md
  - custom-map-editor.design.md
  - screens-ui-components-client-state.design.md
  - server-protocol-websocket-connectivity.design.md
  - web-client-board-rendering.arch.md
  - ../documentation-conventions.md
gateway-docs:
  - contracts/web-client-board-rendering.gateway.md
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
  confidence: 0.850
  sourceHash: 3a054b7699dc15d756802f5b6449718fe50a2343
  lastValidatedCommit: 3a054b7699dc15d756802f5b6449718fe50a2343
  deterministicReferences: true
---

# Web Client & Board Rendering

## Purpose
The in-development browser front end in `web/`, a TypeScript / React 18 / Zustand / Vite application that renders the Catan board as SVG and connects to the authoritative Java `SOCServer` over WebSocket. Per Readme.md, each WebSocket text frame carries one existing `SOCMessage` string, so this scope replaces only the front end while the Java server remains authoritative for game state, rules, robot players, scenarios, and custom-map validation. The domain spans the protocol/connectivity layer (`web/src/protocol`), board geometry and SVG rendering (`web/src/board`), connect/lobby/game screens (`web/src/screens`) with shared UI components (`web/src/components`), client-side state stores (`web/src/store` — `gameStore.ts`, `settingsStore.ts`, `uiStore.ts`), and a custom-map editor (`web/src/map-editor`). Readme.md notes it is a working in-development client, not yet a full replacement for the Java Swing client. Governs 8 code areas rooted at `web/src/protocol`, `web/src/store`, `web/src/board` (and 5 more), spanning 9 member documents (1 ARCH, 4 DESIGN, 4 FEATURE).

## Scope
sgd:codelens/64c51e15-af55-50cd-8d03-12b24fb09071/web-client-board-rendering

## Local Laws
- Use the project glossary's established terminology consistently — 466 term(s) carry a citable source document (e.g. "Game").

## Members

| Member | Kind | Status |
|--------|------|--------|
| [Board Geometry & SVG Rendering](board-geometry-svg-rendering.design.md) | DESIGN | Draft |
| [board-geometry-svg-rendering.feature](board-geometry-svg-rendering.feature.md) | FEATURE | Draft |
| [Custom Map Editor](custom-map-editor.design.md) | DESIGN | Draft |
| [custom-map-editor.feature](custom-map-editor.feature.md) | FEATURE | Draft |
| [Screens, UI Components & Client State](screens-ui-components-client-state.design.md) | DESIGN | Draft |
| [screens-ui-components-client-state.feature](screens-ui-components-client-state.feature.md) | FEATURE | Draft |
| [Server Protocol & WebSocket Connectivity](server-protocol-websocket-connectivity.design.md) | DESIGN | Draft |
| [server-protocol-websocket-connectivity.feature](server-protocol-websocket-connectivity.feature.md) | FEATURE | Draft |
| [Web Client & Board Rendering](web-client-board-rendering.arch.md) | ARCH | Draft |

Total direct children: 9

## Source Linkage
- [web/src/protocol/SOCMessage.ts](../../../web/src/protocol/SOCMessage.ts)
- [web/src/store/gameStore.ts](../../../web/src/store/gameStore.ts)
- [web/src/board/coords.ts](../../../web/src/board/coords.ts)
- [web/src/map-editor/mapSchema.ts](../../../web/src/map-editor/mapSchema.ts)
- [web](../../../web)
- [web/src/board/types.ts](../../../web/src/board/types.ts)
- [web/src/board/BoardSVG.module.css](../../../web/src/board/BoardSVG.module.css)
- [web/src/screens](../../../web/src/screens)
- [web/src/components/index.ts](../../../web/src/components/index.ts)
- [web/src/store/settingsStore.ts](../../../web/src/store/settingsStore.ts)
- [web/src/store/uiStore.ts](../../../web/src/store/uiStore.ts)
- [web/src/screens/MapEditorScreen.module.css](../../../web/src/screens/MapEditorScreen.module.css)

Charter conventions: [documentation-conventions.md](../documentation-conventions.md#epic-charter-conventions)

## Source Linkage Grounding

_Per-row confidence; `_unverified_` rows are disclosed, not verified; `0.08 (resolved, uncited)` is the resolved-but-uncited baseline, not measured evidence._

| Element | Doc Evidence | Code Evidence | Confidence |
|---------|--------------|---------------|-----------:|
| Source Linkage: web/src/protocol/SOCMessage.ts | Base SOCMessage type, parser registry, and encode/decode helpers. | web/src/protocol/SOCMessage.ts | 0.75 |
| Source Linkage: web/src/store/gameStore.ts | gameStore — Zustand store for connection + lobby state. | web/src/store/gameStore.ts | 0.75 |
| Source Linkage: web/src/board/coords.ts |  | web/src/board/coords.ts | 0.75 |
| Source Linkage: web/src/map-editor/mapSchema.ts |  | web/src/map-editor/mapSchema.ts | 0.75 |
| Source Linkage: web |  | web | 1.00 |
| Source Linkage: web/src/board/types.ts |  | web/src/board/types.ts | 0.75 |
| Source Linkage: web/src/board/BoardSVG.module.css |  | web/src/board/BoardSVG.module.css | 0.48 |
| Source Linkage: web/src/screens |  | web/src/screens | 0.83 |
| Source Linkage: web/src/components/index.ts | Design-system primitives barrel. Import from '../components' for convenience. | web/src/components/index.ts | 0.75 |
| Source Linkage: web/src/store/settingsStore.ts |  | web/src/store/settingsStore.ts | 0.64 |
| Source Linkage: web/src/store/uiStore.ts | Top-level app views that sit alongside the connection/game flow. */ | web/src/store/uiStore.ts | 0.40 |
| Source Linkage: web/src/screens/MapEditorScreen.module.css |  | web/src/screens/MapEditorScreen.module.css | 0.48 |
