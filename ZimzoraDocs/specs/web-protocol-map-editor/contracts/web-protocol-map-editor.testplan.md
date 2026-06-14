---
id: web-protocol-map-editor.testplan
type: TESTPLAN
tenant-id: 019ec5a4-5e07-7341-98b8-45f59e05fe07
scope: sgd:codelens/64c51e15-af55-50cd-8d03-12b24fb09071/web-protocol-map-editor/contracts
owner: codelens-agent
last-verified: 2026-06-14
visibility: subtree
freshness-window-days: 14
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
  sourceHash: sha256:98eea62558a54836da622e2794ca6a04fb1aca47bfc4ecb145fb3a079af6b24e
  lastValidatedCommit: 3a054b7699dc15d756802f5b6449718fe50a2343
  deterministicReferences: true
---

# Web Protocol & Map Editor Test Plan

## Coverage Gaps
- [web/src/map-editor/components/EditorCanvas.tsx](../../../../web/src/map-editor/components/EditorCanvas.tsx) has no mapped test file in the scanned corpus.
- [web/src/map-editor/components/EditorPalette.tsx](../../../../web/src/map-editor/components/EditorPalette.tsx) has no mapped test file in the scanned corpus.
- [web/src/map-editor/components/ImportExportPanel.tsx](../../../../web/src/map-editor/components/ImportExportPanel.tsx) has no mapped test file in the scanned corpus.
- [web/src/map-editor/components/MapReadinessPanel.tsx](../../../../web/src/map-editor/components/MapReadinessPanel.tsx) has no mapped test file in the scanned corpus.
- [web/src/map-editor/components/ValidationPanel.tsx](../../../../web/src/map-editor/components/ValidationPanel.tsx) has no mapped test file in the scanned corpus.

## Source Linkage Grounding

_Per-row confidence; `_unverified_` rows are disclosed, not verified; `0.08 (resolved, uncited)` is the resolved-but-uncited baseline, not measured evidence._

| Element | Doc Evidence | Code Evidence | Confidence |
|---------|--------------|---------------|-----------:|
| Coverage Gaps: web/src/map-editor/components/EditorCanvas.tsx |  | web/src/map-editor/components/EditorCanvas.tsx | 0.32 |
| Coverage Gaps: web/src/map-editor/components/EditorPalette.tsx | Hex-type -> swatch fill CSS variable, matching the canvas/board theme tokens. */ | web/src/map-editor/components/EditorPalette.tsx | 0.24 |
| Coverage Gaps: web/src/map-editor/components/ImportExportPanel.tsx | Live validation issues from the editor; errors block the one-click download. */ | web/src/map-editor/components/ImportExportPanel.tsx | 0.24 |
| Coverage Gaps: web/src/map-editor/components/MapReadinessPanel.tsx | Compact game-coverage dashboard for the custom-map authoring workflow. */ | web/src/map-editor/components/MapReadinessPanel.tsx | 0.64 |
| Coverage Gaps: web/src/map-editor/components/ValidationPanel.tsx |  | web/src/map-editor/components/ValidationPanel.tsx | 0.08 (resolved, uncited) |

## Unverified Areas

Parts of this document have limited verifiable source evidence — treat normative claims as unverified until confirmed. See [documentation conventions](../../documentation-conventions.md#unverified-areas).
