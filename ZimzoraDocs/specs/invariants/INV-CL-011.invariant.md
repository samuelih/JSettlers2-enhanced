---
id: INV-CL-011
name: lifecycle-web-src-main-tsx-requires
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
    query: setInterval clearInterval null
    scope: web
    expected: the cited lifecycle owner keeps paired start, clear, and null transitions for the interval handle
cited-by-code:
  - oracle: code.search
    query: "snapshot. Inert for\n// ordinary users (forwards to already-public store actions); see testHooks.ts.\ninstallTestHooks();\n\nconst container = document.getElementBy"
    scope: web/src
promotion-criteria:
  - "The record's derived `checks:` oracle query stays green over an observation window (every cited site keeps its marker/guard; no silent drift) — the green-gate criterion."
  - A human reviewer ratifies the rule as real and load-bearing (not a situational guard) and RE-MINTS it out of the INV-CL- namespace into a platform invariant record (the platform id grammar does not admit INV-CL-).
  - "Cross-path verification: the guarded condition is confirmed load-bearing on every relevant code path."
defined-in: invariants/INV-CL-011.invariant.md
references:
  - ../documentation-conventions.md
  - _scope.md
codelens:
  diklUsed: false
  projectId: 64c51e15-af55-50cd-8d03-12b24fb09071
  campaignId: codelens-b7eef336
  lifecycle: hypothesis
  confidence: 0.698
  sourceHash: 3a054b7699dc15d756802f5b6449718fe50a2343
  lastValidatedCommit: 3a054b7699dc15d756802f5b6449718fe50a2343
  severity: soft
  deterministicReferences: true
---

# [INV-CL-011] lifecycle: `web/src/main.tsx` requires snapshot state before the dependent operation proceeds

> _Detected by ; HYPOTHESIS candidate invariant pending human ratification._

## Guarantee
lifecycle: `web/src/main.tsx` requires snapshot state before the dependent operation proceeds

## Why This Invariant Exists
Archetype: `lifecycle`. Specificity score: `0.920`. Evidence spans 1 production file(s) across 1 package/directory boundary(ies). The score requires a sanctioned site, forbidden bypass, dispatchable check, and concrete failure mode; breadth raises confidence but is not the only admission rule.
- `web/src/main.tsx`

## Sanctioned Implementation Site
- web/src/main.tsx

## Preconditions
_(detected from source pattern; preconditions not extracted -- review and document manually)_

## Checks
- `code.search` — query: `setInterval clearInterval null` (scope: `web`); expected: the cited lifecycle owner keeps paired start, clear, and null transitions for the interval handle

## Cited By Code
- [web/src/main.tsx:9](../../../web/src/main.tsx#L9) — `snapshot. Inert for
// ordinary users (forwards to already-public store actions); see testHooks.ts.
installTestHooks();

const container = document.getElementById('root');
if (!container) {
  throw`

## Forbidden Bypasses
- Starting, stopping, or clearing lifecycle-owned runtime state outside the sanctioned owner.

## Failure Mode This Prevents
- Runtime resources keep running after shutdown or start twice because transitions bypass the lifecycle owner.

## Relationship To Sibling Invariants
- Pairs with single-writer invariants: one lifecycle owner should be the only writer for the guarded runtime handle.

## Detection Method
`lifecycle` heuristic classified as `lifecycle`.

## Promotion Criteria
Pre-ratification hypothesis in the `INV-CL-` namespace — see the [promotion conventions](../documentation-conventions.md#invariant-promotion-criteria) and the registry's [candidate lifecycle](_scope.md).
