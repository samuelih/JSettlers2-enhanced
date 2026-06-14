---
id: documentation-conventions
tenant-id: 019ec5a4-5e07-7341-98b8-45f59e05fe07
name: Documentation Conventions
purpose: Shared conventions referenced by the generated documentation corpus
scope: sgd:codelens/64c51e15-af55-50cd-8d03-12b24fb09071
owner: codelens-agent
last-verified: 2026-06-14
visibility: subtree
codelens:
  diklUsed: false
  projectId: 64c51e15-af55-50cd-8d03-12b24fb09071
  campaignId: codelens-b7eef336
  deterministic: true
---

# Documentation Conventions

Shared conventions for this documentation corpus. Individual documents reference the named sections below instead of repeating the full explanation in every document.

## Unverified Areas

A document carrying an `## Unverified Areas` section has limited verifiable source evidence for parts of its content. Treat its normative claims as unverified until confirmed against code, tests, or authoritative docs — prose in such a document is a hypothesis, not a ratified architecture contract.

## Contracts Charters

A `contracts/_scope.md` child scope holds the generated contract sidecars detected for its enclosing scope. These artifacts expose machine-readable API surfaces, capability routing, schema evidence, test evidence, or boundary-disclosure notes only where grounded source evidence exists. Keeping them in a child scope separates operational contracts from product and design member docs while preserving a navigable proof trail for auditors and cross-scope callers.

Shared laws for every contracts charter:

- Generated sidecars stay under the child scope so parent-scope headroom reflects domain documentation rather than auxiliary artifacts; the parent scope keeps architecture, feature, and design members at product altitude.
- Absence of a sidecar is represented by absence of a document, not by an empty placeholder. A contracts scope exists only because sidecar evidence exists; absence of a sidecar family means no evidence was found for it.

## Gateway Rationale

A gateway document is the cross-scope contract for the public, docstring-backed capabilities in its scope. Entries are bounded to meaningful exported symbols with source links and one-sentence guarantees; symbols without a readable contract are omitted rather than given fabricated semantics.

## Invariant Promotion Criteria

Invariant records are pre-ratification hypotheses in the `INV-CL-` namespace. Promotion re-mints a record into a platform namespace (the platform invariant id grammar does not admit `INV-CL-`) after the promotion criteria in the record's frontmatter are met; the registry charter documents the candidate lifecycle.

## Epic Charter Conventions

Every charter is owned by `codelens-agent`, mirrored from the `owner:` frontmatter field. A charter's `## Local Laws` carry repo conventions derived from existing documentation and configuration in the analyzed repository: a law is emitted only when citable evidence exists, and an absent law means no evidence was found — never that the convention is forbidden.
