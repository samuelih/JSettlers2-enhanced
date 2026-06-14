---
id: INV-CL-001
name: single-writer-next-landarea
type: INVARIANT
status: candidate
tenant-id: 019ec5a4-5e07-7341-98b8-45f59e05fe07
scope: sgd:codelens/64c51e15-af55-50cd-8d03-12b24fb09071/invariants
owner: codelens-agent
last-verified: 2026-06-14
ubiquitous: true
visibility: ubiquitous
preconditions: []
checks:
  - oracle: code.search
    query: assignments to `landArea` (`*.landArea = ...`)
    scope: web
    expected: every assignment site resolves into the single writer function named in this record (3 cited site(s)); a new writer elsewhere is a drift signal
cited-by-code:
  - oracle: code.search
    query: next.landArea = ...
    scope: web/src/map-editor
promotion-criteria:
  - "The record's derived `checks:` oracle query stays green over an observation window (every cited site keeps its marker/guard; no silent drift) — the green-gate criterion."
  - A human reviewer ratifies the rule as real and load-bearing (not a situational guard) and RE-MINTS it out of the INV-CL- namespace into a platform invariant record (the platform id grammar does not admit INV-CL-).
  - "Cross-path verification: call-graph analysis confirms the field has exactly one writer across the full corpus on every code path (the heuristic is lexical and file-local)."
defined-in: invariants/INV-CL-001.invariant.md
references:
  - ../documentation-conventions.md
  - _scope.md
codelens:
  diklUsed: false
  projectId: 64c51e15-af55-50cd-8d03-12b24fb09071
  campaignId: codelens-b7eef336
  lifecycle: hypothesis
  confidence: 0.662
  sourceHash: 3a054b7699dc15d756802f5b6449718fe50a2343
  lastValidatedCommit: 3a054b7699dc15d756802f5b6449718fe50a2343
  severity: hard
  deterministicReferences: true
---

# [INV-CL-001] single-writer: field `next.landArea` is mutated by exactly one function (`placeHex`)

> _Detected by ; HYPOTHESIS candidate invariant pending human ratification._

## Guarantee
single-writer: field `next.landArea` is mutated by exactly one function (`placeHex`)

## Why This Invariant Exists
Archetype: `single-writer`. Specificity score: `1.000`. Evidence spans 1 production file(s) across 1 package/directory boundary(ies). The score requires a sanctioned site, forbidden bypass, dispatchable check, and concrete failure mode; breadth raises confidence but is not the only admission rule.
- `web/src/map-editor/editorActions.ts`

## Sanctioned Implementation Site
- web/src/map-editor/editorActions.ts

## Preconditions
_(detected from source pattern; preconditions not extracted -- review and document manually)_

## Checks
- `code.search` — query: `assignments to \`landArea\` (\`*.landArea = ...\`)` (scope: `web`); expected: every assignment site resolves into the single writer function named in this record (3 cited site(s)); a new writer elsewhere is a drift signal

## Cited By Code
- [web/src/map-editor/editorActions.ts:72](../../../web/src/map-editor/editorActions.ts#L72) — `next.landArea = ...`
- [web/src/map-editor/editorActions.ts:74](../../../web/src/map-editor/editorActions.ts#L74) — `next.landArea = ...`
- [web/src/map-editor/editorActions.ts:80](../../../web/src/map-editor/editorActions.ts#L80) — `next.landArea = ...`

## Forbidden Bypasses
- Direct writes to `next.landArea` outside the cited writer function.

## Failure Mode This Prevents
- State drift from multiple writers mutating the same field without a shared transition contract.

## Relationship To Sibling Invariants
- Pairs with lifecycle invariants: one writer is the enforcement site for the allowed state transitions.

## Detection Method
`single-writer` heuristic classified as `single-writer`.

## Promotion Criteria
Pre-ratification hypothesis in the `INV-CL-` namespace — see the [promotion conventions](../documentation-conventions.md#invariant-promotion-criteria) and the registry's [candidate lifecycle](_scope.md).
