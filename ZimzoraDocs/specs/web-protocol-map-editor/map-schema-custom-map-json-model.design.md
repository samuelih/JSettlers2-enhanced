---
id: map-schema-custom-map-json-model.design
type: DESIGN
tenant-id: 019ec5a4-5e07-7341-98b8-45f59e05fe07
scope: sgd:codelens/64c51e15-af55-50cd-8d03-12b24fb09071/web-protocol-map-editor
owner: codelens-agent
last-verified: 2026-06-14
visibility: subtree
freshness-window-days: 14
invariants: []
references:
  - _scope.md
  - web-protocol-map-editor.arch.md
  - ../quality-infrastructure/quality-infrastructure.arch.md
  - ../web-client-board-rendering/web-client-board-rendering.arch.md
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
  sourceHash: sha256:98c6235e3f31ed1d69662b37b93b3b35b86666b9fd3cffaec0d10b53492ed4d8
  lastValidatedCommit: 3a054b7699dc15d756802f5b6449718fe50a2343
  deterministicReferences: true
---

# Map Schema & Custom-Map JSON Model

## Overview
This module is the data-model spine of the web map editor: it defines `CustomMap` (name, playerCounts, shuffle, landHexes, optional landAreas, ports, boardHeight/Width, robber/pirate hexes) plus the element interfaces, and the codec that moves a map between on-disk `.map.json` text and the editor's in-memory model. Repository evidence: `web/src/map-editor/mapSchema.ts`. Coordinates stay as their on-disk `"0xRRCC"` strings throughout the model so an import → edit → export round-trip is lossless; `parseCoord`/`encodeCoord` and `rowOf`/`colOf`/`coordOf` convert to and from the integer `(row<<8)|col` form only where the renderer or validator needs ints. On export, `serializeMapJson` first runs `mapWithCanonicalLandAreas` to rebuild land-area ranges from per-hex tags, then emits an ordered JSON object that omits empty optionals to match the sample map's diff-friendly shape. No coordinate range/parity/business validation lives here — that responsibility sits entirely in `validation.ts`.

## Components
- **mapSchema.ts** (referenced; defined externally)
- **CustomMapLoader / CustomMapValidator** (referenced; defined externally)
- **validation.ts** (referenced; defined externally)

## Connections
- **validation.ts** (outbound) — via Sibling map-editor module that consumes CustomMap and owns coordinate range/parity/business validation (mirrors CustomMapValidator); this module deliberately holds none. (evidence: web/src/map-editor/mapSchema.ts module header comment ('No coordinate range/parity/business validation lives here — that is entirely in validation.ts'))
- **soc.server.CustomMapLoader** (bidirectional) — via On-disk .map.json file format — this TS model mirrors the Java CustomMapJson/HexJson/PortJson/LandAreaJson POJOs and the parseCoord/validator coord contract so exported files load on the server. (evidence: web/src/map-editor/mapSchema.ts module header comment referencing soc.server.CustomMapLoader and CustomMapValidator.parseCoord)

## Design Decisions
- **Keep coordinates as on-disk "0xRRCC" strings inside the model rather than parsing to ints at load time**: The module is explicitly designed for lossless import → edit → export: storing the author's exact coord string (optional 0x prefix, casing) means a round-trip never rewrites coords the user didn't touch. Integer conversion is deferred to parseCoord/encodeCoord at the renderer/validator boundary, so the editor model and the on-disk file stay byte-faithful.
Repository evidence: `web/src/map-editor/mapSchema.ts`. This keeps a single source of validation truth and lets the editor open partial/legacy files without throwing.
- **Treat per-hex landArea tags as authoring intent and rebuild authoritative landAreas ranges at serialize time via mapWithCanonicalLandAreas**: The server consumes landAreas by consecutive file order, not per-hex hints, so the editor lets users tag hexes individually then canonicalizes: hexes are grouped by area ascending (stable within area) and contiguous ranges/counts are recomputed. A map with no explicit areas is left as a single implicit area 1 to keep one-island maps concise.
Repository evidence: `web/src/map-editor/mapSchema.ts`. Explicit landAreas ranges still override untagged hexes by file order, so explicit definitions win over the default.

## Constraints
- **[UNVERIFIED]** parseCoord MUST reject any coordinate string that is not pure hexadecimal (optional 0x/0X prefix), and MUST return null for null/undefined/blank or negative values, mirroring the Java Integer.parseInt(t,16) contract. — web/src/map-editor/mapSchema.ts::parseCoord (regex /^[+-]?[0-9a-fA-F]+$/ guard and v < 0 check) (cross-document reconciliation: not verified against `web/src/map-editor/mapSchema.ts`; recorded as design intent, not current code fact.)
- **[UNVERIFIED]** parseMapJson MUST throw when the text is not a JSON object (null, array, or non-object), so a structurally wrong file cannot become a silent empty map. — web/src/map-editor/mapSchema.ts::parseMapJson (Array.isArray / typeof guard throwing 'Map file must be a JSON object') (cross-document reconciliation: not verified against `web/src/map-editor/mapSchema.ts`; recorded as design intent, not current code fact.)
- **[UNVERIFIED]** serializeMapJson SHOULD omit empty optional fields (description, landAreas, ports, robberHex, pirateHex) and preserve sample-map field order for readable diffs. — web/src/map-editor/mapSchema.ts::serializeMapJson (cross-document reconciliation: not verified against `web/src/map-editor/mapSchema.ts`; recorded as design intent, not current code fact.)
- **[UNVERIFIED]** Editor-authored port types SHOULD be normalized to canonical names, collapsing the import-only "3:1" alias to "misc". — web/src/map-editor/mapSchema.ts::canonicalPortTypeName / CANONICAL_PORT_TYPE_NAMES (cross-document reconciliation: not verified against `web/src/map-editor/mapSchema.ts`; recorded as design intent, not current code fact.)

## Non-Functional Requirements
- **error-handling** — JSON parse failures are wrapped with a descriptive message ('JSON parse error: ...') and non-object roots throw a distinct 'Map file must be a JSON object' error, so the editor can distinguish malformed text from a wrong-shaped document. — web/src/map-editor/mapSchema.ts::parseMapJson
- **reliability** — Deserialization is total: every coercion helper returns [] for non-array input and fills per-field defaults, so a partial or legacy file never throws during model construction (problems are deferred to validation.ts). — web/src/map-editor/mapSchema.ts::fromRaw / toHexArray / toPortArray / toLandAreaArray

## Examples
*Shows the 0xRRCC encoding: row is the high byte, column the low byte of a 16-bit coord.*
*Source: `web/src/map-editor/mapSchema.ts:rowOf/colOf`*
```
export function rowOf(coord: number): number {
  return coord >> 8;
}

export function colOf(coord: number): number {
  return coord & 0xff;
}
```

*Serialization canonicalizes land areas first, then builds an ordered object — order and canonicalization are deliberate.*
*Source: `web/src/map-editor/mapSchema.ts:serializeMapJson`*
```
const canonical = mapWithCanonicalLandAreas(map);
const out: Record<string, unknown> = {
  name: canonical.name,
};
```

**Negative example** — what NOT to do:
*A negative or non-hex coord must yield null, not a coerced number — callers must handle the null rather than assume a valid coord.*
*Source: `web/src/map-editor/mapSchema.ts:parseCoord`*
```
if (!/^[+-]?[0-9a-fA-F]+$/.test(t)) {
  return null;
}
const v = Number.parseInt(t, 16);
if (!Number.isFinite(v) || v < 0) {
  return null;
}
```

## Diagrams
### Design

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'primaryTextColor': '#111827', 'secondaryTextColor': '#111827', 'tertiaryTextColor': '#111827', 'lineColor': '#6b7280', 'fontFamily': 'Inter, ui-sans-serif, system-ui, sans-serif'}}}%%
graph TD
    classDef default fill:#f8fafc,stroke:#475569,color:#111827

    CustomMapLoader___CustomMapValidator["CustomMapLoader / CustomMapValidator"]
    mapSchema_ts["mapSchema.ts"]
    validation_ts["validation.ts"]

    ext_Coordinates_stay_as_their_on_disk___0xRRCC___strings_throughout_the_model_so_an_import["Coordinates stay as their on-disk `"0xRRCC"` strings throughout the model so an import"]:::default
    ext_edit["edit"]:::default

    ext_Coordinates_stay_as_their_on_disk___0xRRCC___strings_throughout_the_model_so_an_import --> ext_edit
```

## Source Linkage
- [Board-layout schema model (CustomMap)](../../../web/src/map-editor/mapSchema.ts)
- [Map JSON serialization](../../../web/src/map-editor/mapSchema.ts::serializeMapJson)
- [Map JSON parsing/deserialization](../../../web/src/map-editor/mapSchema.ts::parseMapJson)
- [Raw-record coercion to CustomMap](../../../web/src/map-editor/mapSchema.ts::fromRaw)
- [Land-area canonicalization](../../../web/src/map-editor/mapSchema.ts::mapWithCanonicalLandAreas)
- [0xRRCC coordinate encode/decode](../../../web/src/map-editor/mapSchema.ts::encodeCoord)
- [Coordinate string parsing](../../../web/src/map-editor/mapSchema.ts::parseCoord)
- [Land-area inference default-to-1](../../../web/src/map-editor/mapSchema.ts::inferAreaByHexIndex)
- [Empty starter map factory](../../../web/src/map-editor/mapSchema.ts::emptyMap)

Parent scope: [_scope.md](_scope.md)
Sibling feature: [map-schema-custom-map-json-model.feature.md](map-schema-custom-map-json-model.feature.md)
Scope architecture: [web-protocol-map-editor.arch.md](web-protocol-map-editor.arch.md)

## Source Linkage Grounding

_Per-row confidence; `_unverified_` rows are disclosed, not verified; `0.08 (resolved, uncited)` is the resolved-but-uncited baseline, not measured evidence._

| Element | Doc Evidence | Code Evidence | Confidence |
|---------|--------------|---------------|-----------:|
| Source Linkage: Board-layout schema model (CustomMap) |  | web/src/map-editor/mapSchema.ts | 0.75 |
| Source Linkage: Map JSON serialization |  | web/src/map-editor/mapSchema.ts:390-426 | 0.75 |
| Source Linkage: Map JSON parsing/deserialization |  | web/src/map-editor/mapSchema.ts:327-338 | 0.75 |
| Source Linkage: Raw-record coercion to CustomMap |  | web/src/map-editor/mapSchema.ts:350-379 | 0.75 |
| Source Linkage: Land-area canonicalization |  | web/src/map-editor/mapSchema.ts:213-254 | 0.75 |
| Source Linkage: 0xRRCC coordinate encode/decode |  | web/src/map-editor/mapSchema.ts:312-315 | 0.75 |
| Source Linkage: Coordinate string parsing |  | web/src/map-editor/mapSchema.ts:266-287 | 0.75 |
| Source Linkage: Land-area inference default-to-1 |  | web/src/map-editor/mapSchema.ts:496-516 | 0.75 |
| Source Linkage: Empty starter map factory |  | web/src/map-editor/mapSchema.ts:429-438 | 0.75 |

Related scopes: [Quality Infrastructure](../quality-infrastructure/quality-infrastructure.arch.md), [Web Client & Board Rendering](../web-client-board-rendering/web-client-board-rendering.arch.md)

## Contract Gaps Detected

| File | Declared Field | Accepting Function | Gap |
|------|----------------|--------------------|-----|
| `web/src/map-editor/mapSchema.ts` | `CustomMap.name` | `inferAreaByHexIndex(map: CustomMap)` | No same-file read of `map.name` was detected; document it as declared intent, not enforced behavior. |
