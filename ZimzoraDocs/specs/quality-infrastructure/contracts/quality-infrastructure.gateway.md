---
id: quality-infrastructure.gateway
type: GATEWAY
tenant-id: 019ec5a4-5e07-7341-98b8-45f59e05fe07
scope: sgd:codelens/64c51e15-af55-50cd-8d03-12b24fb09071/quality-infrastructure/contracts
owner: codelens-agent
last-verified: 2026-06-14
visibility: subtree
freshness-window-days: 14
max-tokens: 2000
invariants: []
references:
  - ../../documentation-conventions.md
stateful-fields:
  - id: body
    name: Document body
    status: Draft
codelens:
  diklUsed: false
  projectId: 64c51e15-af55-50cd-8d03-12b24fb09071
  campaignId: codelens-b7eef336
  lifecycle: hypothesis
  confidence: 0.700
  sourceHash: 3a054b7699dc15d756802f5b6449718fe50a2343
  lastValidatedCommit: 3a054b7699dc15d756802f5b6449718fe50a2343
  deterministicReferences: true
---

# Quality Infrastructure Gateway

> Capability Index — public-API contract for the `Quality Infrastructure` epic. Cross-scope callers depend on the symbols listed below.

## Rationale
Bounded public-capability contract for cross-scope callers — see [documentation conventions](../../documentation-conventions.md#gateway-rationale).

## Capability Index

| Capability | File:Symbol | Guarantee |
|------------|-------------|-----------|
| `use-theme` | [web/src/theme/useTheme.ts:14](../../../../web/src/theme/useTheme.ts#L14) `useTheme` | Exports the useTheme hook. |
| `board-dimensions` | [web/src/board/boardModel.ts:40](../../../../web/src/board/boardModel.ts#L40) `BoardDimensions` | Exports the BoardDimensions type contract. |
| `parsed-potentials` | [web/src/board/boardModel.ts:141](../../../../web/src/board/boardModel.ts#L141) `ParsedPotentials` | Exports the ParsedPotentials type contract. |
| `point` | [web/src/board/coords.ts:63](../../../../web/src/board/coords.ts#L63) `Point` | Exports the Point type contract. |
| `edge-pixels` | [web/src/board/coords.ts:312](../../../../web/src/board/coords.ts#L312) `EdgePixels` | Exports the EdgePixels type contract. |
| `hex-kind` | [web/src/board/types.ts:28](../../../../web/src/board/types.ts#L28) `HexKind` | Exports the HexKind type contract. |
| `board-hex` | [web/src/board/types.ts:48](../../../../web/src/board/types.ts#L48) `BoardHex` | Exports the BoardHex type contract. |
| `board-port` | [web/src/board/types.ts:67](../../../../web/src/board/types.ts#L67) `BoardPort` | Exports the BoardPort type contract. |
| `board-model` | [web/src/board/types.ts:74](../../../../web/src/board/types.ts#L74) `BoardModel` | Exports the BoardModel type contract. |
| `piece-type` | [web/src/board/types.ts:93](../../../../web/src/board/types.ts#L93) `PieceType` | Exports the PieceType type contract. |
| `board-piece` | [web/src/board/types.ts:96](../../../../web/src/board/types.ts#L96) `BoardPiece` | Exports the BoardPiece type contract. |
| `c-k-deck-key` | [web/src/components/ck/ckCatalog.ts:3](../../../../web/src/components/ck/ckCatalog.ts#L3) `CKDeckKey` | Exports the CKDeckKey type contract. |
| `c-k-support` | [web/src/components/ck/ckCatalog.ts:5](../../../../web/src/components/ck/ckCatalog.ts#L5) `CKSupport` | Exports the CKSupport type contract. |
| `c-k-deck-info` | [web/src/components/ck/ckCatalog.ts:7](../../../../web/src/components/ck/ckCatalog.ts#L7) `CKDeckInfo` | Exports the CKDeckInfo type contract. |
| `c-k-progress-catalog-entry` | [web/src/components/ck/ckCatalog.ts:15](../../../../web/src/components/ck/ckCatalog.ts#L15) `CKProgressCatalogEntry` | Exports the CKProgressCatalogEntry type contract. |
| `c-k-component-entry` | [web/src/components/ck/ckCatalog.ts:28](../../../../web/src/components/ck/ckCatalog.ts#L28) `CKComponentEntry` | Exports the CKComponentEntry type contract. |
| `editor-overlay` | [web/src/map-editor/editorEnhancements.ts:23](../../../../web/src/map-editor/editorEnhancements.ts#L23) `EditorOverlay` | Exports the EditorOverlay type contract. |
| `editor-template` | [web/src/map-editor/editorEnhancements.ts:25](../../../../web/src/map-editor/editorEnhancements.ts#L25) `EditorTemplate` | Exports the EditorTemplate type contract. |
| `issue-target` | [web/src/map-editor/editorEnhancements.ts:32](../../../../web/src/map-editor/editorEnhancements.ts#L32) `IssueTarget` | Exports the IssueTarget type contract. |
| `map-balance-metrics` | [web/src/map-editor/editorEnhancements.ts:39](../../../../web/src/map-editor/editorEnhancements.ts#L39) `MapBalanceMetrics` | Exports the MapBalanceMetrics type contract. |
| `grid-hex-cell` | [web/src/map-editor/editorGrid.ts:35](../../../../web/src/map-editor/editorGrid.ts#L35) `GridHexCell` | Exports the GridHexCell type contract. |
| `grid-edge-cell` | [web/src/map-editor/editorGrid.ts:43](../../../../web/src/map-editor/editorGrid.ts#L43) `GridEdgeCell` | Exports the GridEdgeCell type contract. |
| `editor-board-size` | [web/src/map-editor/editorGrid.ts:55](../../../../web/src/map-editor/editorGrid.ts#L55) `EditorBoardSize` | Exports the EditorBoardSize type contract. |
| `hex-type-name` | [web/src/map-editor/mapSchema.ts:21](../../../../web/src/map-editor/mapSchema.ts#L21) `HexTypeName` | Exports the HexTypeName type contract. |
| `port-type-name` | [web/src/map-editor/mapSchema.ts:48](../../../../web/src/map-editor/mapSchema.ts#L48) `PortTypeName` | Exports the PortTypeName type contract. |
| `facing-name` | [web/src/map-editor/mapSchema.ts:83](../../../../web/src/map-editor/mapSchema.ts#L83) `FacingName` | Exports the FacingName type contract. |
| `map-land-hex` | [web/src/map-editor/mapSchema.ts:111](../../../../web/src/map-editor/mapSchema.ts#L111) `MapLandHex` | Exports the MapLandHex type contract. |
| `map-port` | [web/src/map-editor/mapSchema.ts:126](../../../../web/src/map-editor/mapSchema.ts#L126) `MapPort` | Exports the MapPort type contract. |
| `map-land-area` | [web/src/map-editor/mapSchema.ts:139](../../../../web/src/map-editor/mapSchema.ts#L139) `MapLandArea` | Exports the MapLandArea type contract. |
| `custom-map` | [web/src/map-editor/mapSchema.ts:150](../../../../web/src/map-editor/mapSchema.ts#L150) `CustomMap` | Exports the CustomMap type contract. |
| `severity` | [web/src/map-editor/validation.ts:58](../../../../web/src/map-editor/validation.ts#L58) `Severity` | Exports the Severity type contract. |
| `_overflow` | — | 509 additional documented exports omitted to keep this gateway within its token budget; the omitted symbols remain in the  and should be promoted into narrower gateways only when they become cross-scope contracts. |
