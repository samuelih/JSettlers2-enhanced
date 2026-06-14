---
id: web-protocol-map-editor.gateway
type: GATEWAY
tenant-id: 019ec5a4-5e07-7341-98b8-45f59e05fe07
scope: sgd:codelens/64c51e15-af55-50cd-8d03-12b24fb09071/web-protocol-map-editor/contracts
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
  confidence: 0.800
  sourceHash: 3a054b7699dc15d756802f5b6449718fe50a2343
  lastValidatedCommit: 3a054b7699dc15d756802f5b6449718fe50a2343
  deterministicReferences: true
---

# Web Protocol & Map Editor Gateway

> Capability Index — public-API contract for the `Web Protocol & Map Editor` epic. Cross-scope callers depend on the symbols listed below.

## Rationale
Bounded public-capability contract for cross-scope callers — see [documentation conventions](../../documentation-conventions.md#gateway-rationale).

## Capability Index

| Capability | File:Symbol | Guarantee |
|------------|-------------|-----------|
| `app` | [web/src/App.tsx:17](../../../../web/src/App.tsx#L17) `App` | Exports the App React component. |
| `board-s-v-g` | [web/src/board/BoardSVG.tsx:72](../../../../web/src/board/BoardSVG.tsx#L72) `BoardSVG` | Exports the BoardSVG React component. |
| `board-defs` | [web/src/board/pieces/BoardDefs.tsx:31](../../../../web/src/board/pieces/BoardDefs.tsx#L31) `BoardDefs` | Exports the BoardDefs React component. |
| `hex-tile` | [web/src/board/pieces/HexTile.tsx:84](../../../../web/src/board/pieces/HexTile.tsx#L84) `HexTile` | Exports the HexTile React component. |
| `piece` | [web/src/board/pieces/Pieces.tsx:19](../../../../web/src/board/pieces/Pieces.tsx#L19) `Piece` | Exports the Piece React component. |
| `port-marker` | [web/src/board/pieces/PortMarker.tsx:58](../../../../web/src/board/pieces/PortMarker.tsx#L58) `PortMarker` | Exports the PortMarker React component. |
| `resource-motif` | [web/src/board/pieces/ResourceMotif.tsx:21](../../../../web/src/board/pieces/ResourceMotif.tsx#L21) `ResourceMotif` | Exports the ResourceMotif React component. |
| `robber` | [web/src/board/pieces/RobberPirate.tsx:19](../../../../web/src/board/pieces/RobberPirate.tsx#L19) `Robber` | Exports the Robber React component. |
| `pirate` | [web/src/board/pieces/RobberPirate.tsx:38](../../../../web/src/board/pieces/RobberPirate.tsx#L38) `Pirate` | Exports the Pirate React component. |
| `terrain-texture` | [web/src/board/pieces/TerrainTexture.tsx:36](../../../../web/src/board/pieces/TerrainTexture.tsx#L36) `TerrainTexture` | Exports the TerrainTexture React component. |
| `app-frame` | [web/src/components/AppFrame.tsx:28](../../../../web/src/components/AppFrame.tsx#L28) `AppFrame` | Exports the AppFrame React component. |
| `button` | [web/src/components/Button.tsx:22](../../../../web/src/components/Button.tsx#L22) `Button` | Exports the Button React component. |
| `dialog` | [web/src/components/Dialog.tsx:26](../../../../web/src/components/Dialog.tsx#L26) `Dialog` | Exports the Dialog React component. |
| `panel` | [web/src/components/Panel.tsx:19](../../../../web/src/components/Panel.tsx#L19) `Panel` | Exports the Panel React component. |
| `spinner` | [web/src/components/Spinner.tsx:18](../../../../web/src/components/Spinner.tsx#L18) `Spinner` | Exports the Spinner React component. |
| `toast-provider` | [web/src/components/Toast.tsx:63](../../../../web/src/components/Toast.tsx#L63) `ToastProvider` | Exports the ToastProvider React component. |
| `use-toast` | [web/src/components/Toast.tsx:115](../../../../web/src/components/Toast.tsx#L115) `useToast` | Exports the useToast hook. |
| `c-k-panel` | [web/src/components/ck/CKPanel.tsx:283](../../../../web/src/components/ck/CKPanel.tsx#L283) `CKPanel` | Exports the CKPanel React component. |
| `c-k-player-summary` | [web/src/components/ck/CKPanel.tsx:505](../../../../web/src/components/ck/CKPanel.tsx#L505) `CKPlayerSummary` | Exports the CKPlayerSummary React component. |
| `c-k-barbarian-banner` | [web/src/components/ck/CKPanel.tsx:548](../../../../web/src/components/ck/CKPanel.tsx#L548) `CKBarbarianBanner` | Exports the CKBarbarianBanner React component. |
| `c-k-commodity-pick-dialog` | [web/src/components/ck/CKPanel.tsx:582](../../../../web/src/components/ck/CKPanel.tsx#L582) `CKCommodityPickDialog` | Exports the CKCommodityPickDialog React component. |
| `new-game-dialog` | [web/src/components/newgame/NewGameDialog.tsx:60](../../../../web/src/components/newgame/NewGameDialog.tsx#L60) `NewGameDialog` | Exports the NewGameDialog React component. |
| `option-field` | [web/src/components/newgame/OptionField.tsx:78](../../../../web/src/components/newgame/OptionField.tsx#L78) `OptionField` | Exports the OptionField React component. |
| `editor-canvas` | [web/src/map-editor/components/EditorCanvas.tsx:223](../../../../web/src/map-editor/components/EditorCanvas.tsx#L223) `EditorCanvas` | Exports the EditorCanvas React component. |
| `editor-palette` | [web/src/map-editor/components/EditorPalette.tsx:93](../../../../web/src/map-editor/components/EditorPalette.tsx#L93) `EditorPalette` | Exports the EditorPalette React component. |
| `import-export-panel` | [web/src/map-editor/components/ImportExportPanel.tsx:27](../../../../web/src/map-editor/components/ImportExportPanel.tsx#L27) `ImportExportPanel` | Exports the ImportExportPanel React component. |
| `map-readiness-panel` | [web/src/map-editor/components/MapReadinessPanel.tsx:24](../../../../web/src/map-editor/components/MapReadinessPanel.tsx#L24) `MapReadinessPanel` | Exports the MapReadinessPanel React component. |
| `validation-panel` | [web/src/map-editor/components/ValidationPanel.tsx:19](../../../../web/src/map-editor/components/ValidationPanel.tsx#L19) `ValidationPanel` | Exports the ValidationPanel React component. |
| `connect-screen` | [web/src/screens/ConnectScreen.tsx:14](../../../../web/src/screens/ConnectScreen.tsx#L14) `ConnectScreen` | Exports the ConnectScreen React component. |
| `_overflow` | — | 32 additional documented exports omitted to keep this gateway within its token budget; the omitted symbols remain in the  and should be promoted into narrower gateways only when they become cross-scope contracts. |
