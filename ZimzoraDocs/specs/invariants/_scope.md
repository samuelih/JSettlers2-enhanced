---
id: invariants
type: SCOPE
tenant-id: 019ec5a4-5e07-7341-98b8-45f59e05fe07
name: Invariant Registry (codelens hypotheses)
purpose: Structured, machine-queryable INV-CL candidate records detected from the analyzed repo, pending human ratification; mirrors the platform invariant-registry charter shape.
owner: codelens-agent
last-verified: 2026-06-14
parent: sgd:codelens/64c51e15-af55-50cd-8d03-12b24fb09071
scope: sgd:codelens/64c51e15-af55-50cd-8d03-12b24fb09071/invariants
visibility: ubiquitous
ubiquitous: true
kind: concept
freshness-window-days: 14
governs: []
references:
  - INV-CL-001.invariant.md
  - INV-CL-002.invariant.md
  - INV-CL-003.invariant.md
  - INV-CL-004.invariant.md
  - INV-CL-005.invariant.md
  - INV-CL-006.invariant.md
  - INV-CL-007.invariant.md
  - INV-CL-008.invariant.md
  - INV-CL-009.invariant.md
  - INV-CL-010.invariant.md
  - INV-CL-011.invariant.md
local-laws:
  - "Every member MUST be a structured `.invariant.md` record (kebab `name:`, `type: INVARIANT`, dispatchable `checks:` objects); prose-only invariant docs are rejected."
  - "Every record carries `ubiquitous: true` + `visibility: ubiquitous` — a private invariant is a contradiction in terms."
  - "Records are append-only semantically: deprecation flips `status:`, never deletes the record."
  - "Every `checks:` entry is a concrete dispatchable oracle query (`{oracle, query, scope, expected}`); prose checks are rejected."
  - "Qualifying decision ladder (operator-ratified for this corpus): detection is mechanical, but promotion uses a specificity score. A candidate needs an exact guarantee, a sanctioned implementation site, a forbidden bypass, a dispatchable oracle check, and a concrete failure mode. Multi-file and multi-package breadth raise confidence, but a single-file chokepoint can qualify when the repo itself makes that file the sanctioned policy membrane. Lower-score candidates stay in the compliance report as invariant obligations rather than being fabricated as records."
stateful-fields:
  - id: body
    name: Document body
    status: Draft
codelens:
  diklUsed: false
  projectId: 64c51e15-af55-50cd-8d03-12b24fb09071
  campaignId: codelens-b7eef336
  lifecycle: hypothesis
  confidence: 0.000
  sourceHash: 3a054b7699dc15d756802f5b6449718fe50a2343
  lastValidatedCommit: 3a054b7699dc15d756802f5b6449718fe50a2343
  deterministicReferences: true
---

# Invariant Registry (detected candidates)

## Purpose
Structured, machine-queryable records of load-bearing contracts detected in the analyzed repository — HYPOTHESES pending human ratification, in the `INV-CL-` namespace. The registry mirrors the platform invariant-registry charter: structured records only, ubiquitous visibility, append-only semantics, and concrete dispatchable checks. It exists to separate mechanically detected candidate contracts from ratified architecture law: each emitted record must name the exact guarantee, sanctioned implementation site, forbidden bypass, machine check, and failure mode, while weaker detections remain disclosed as obligations instead of being promoted into normative docs.

## Local Laws
- Every member MUST be a structured `.invariant.md` record (kebab `name:`, `type: INVARIANT`, dispatchable `checks:` objects); prose-only invariant docs are rejected.
- Every record carries `ubiquitous: true` + `visibility: ubiquitous` — a private invariant is a contradiction in terms.
- Records are append-only semantically: deprecation flips `status:`, never deletes the record.
- Every `checks:` entry is a concrete dispatchable oracle query (`{oracle, query, scope, expected}`); prose checks are rejected.
- Qualifying decision ladder (operator-ratified for this corpus): detection is mechanical, but promotion uses a specificity score. A candidate needs an exact guarantee, a sanctioned implementation site, a forbidden bypass, a dispatchable oracle check, and a concrete failure mode. Multi-file and multi-package breadth raise confidence, but a single-file chokepoint can qualify when the repo itself makes that file the sanctioned policy membrane. Lower-score candidates stay in the compliance report as invariant obligations rather than being fabricated as records.

## Candidate lifecycle
Every record enters as `status: candidate` with a non-empty `promotion-criteria:` array. The `INV-CL-` namespace is PRE-ratification by construction: the platform invariant id grammar (`^INV(-SGD|-LAUNCH|-COMPANION|-UX)?-\d{3}$`, `packages/sgd-service/src/invariant-schema-validator/schema.ts`) does not admit `INV-CL-`, so promotion RE-MINTS the record into a platform namespace rather than flipping `status:` in place.

## Below-bar detections
9 detection(s) fell below the qualifying bar on this run (9 single-file, 0 single-package) and were not emitted — see the compliance report's SGD-INVARIANTS-BELOW-QUALIFYING-BAR row.

## Members

| Member | Kind | Status |
|--------|------|--------|
| [INV-CL-001.invariant](INV-CL-001.invariant.md) | INVARIANT | candidate |
| [INV-CL-002.invariant](INV-CL-002.invariant.md) | INVARIANT | candidate |
| [INV-CL-003.invariant](INV-CL-003.invariant.md) | INVARIANT | candidate |
| [INV-CL-004.invariant](INV-CL-004.invariant.md) | INVARIANT | candidate |
| [INV-CL-005.invariant](INV-CL-005.invariant.md) | INVARIANT | candidate |
| [INV-CL-006.invariant](INV-CL-006.invariant.md) | INVARIANT | candidate |
| [INV-CL-007.invariant](INV-CL-007.invariant.md) | INVARIANT | candidate |
| [INV-CL-008.invariant](INV-CL-008.invariant.md) | INVARIANT | candidate |
| [INV-CL-009.invariant](INV-CL-009.invariant.md) | INVARIANT | candidate |
| [INV-CL-010.invariant](INV-CL-010.invariant.md) | INVARIANT | candidate |
| [INV-CL-011.invariant](INV-CL-011.invariant.md) | INVARIANT | candidate |

Total direct children: 11

## Below-Qualifying-Bar Candidates

These detections did NOT clear the qualifying bar (single-file or single-package) and were NOT emitted as records. They are disclosed here as candidates that belong as a repo-local test or lint, not a cross-cutting invariant:

- [MUST] be called before any early return to obey the Rules of Hooks; it tolerates a null game internally. (`web/src/screens/GameScreen.tsx:926`) — belongs as a repo-local test/lint, not a cross-cutting invariant.
- [REQUIRES] at least 12 + maxIntValue fields. (`web/src/protocol/messages/SOCGameOptionInfo.ts:249`) — belongs as a repo-local test/lint, not a cross-cutting invariant.
- [REQUIRES] coord >= 0; parse returns null otherwise. Parsing reads four SEP2 tokens; garbled -> null. (`web/src/protocol/messages/SOCRemovePiece.ts:10`) — belongs as a repo-local test/lint, not a cross-cutting invariant.
- [REQUIRES] python 3, or 2.6 or later (`src/main/bin/sql/template/render.py:10`) — belongs as a repo-local test/lint, not a cross-cutting invariant.
- [NEVER] appear on the wire). playerNumber may be -1 for some element types. Parsing reads 5 or 6 SEP2 tokens; garbled -> null. (`web/src/protocol/messages/SOCPlayerElement.ts:10`) — belongs as a repo-local test/lint, not a cross-cutting invariant.
