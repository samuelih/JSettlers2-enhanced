---
id: optional-database.testplan
type: TESTPLAN
tenant-id: 019ec5a4-5e07-7341-98b8-45f59e05fe07
scope: sgd:codelens/64c51e15-af55-50cd-8d03-12b24fb09071/optional-database/contracts
owner: codelens-agent
last-verified: 2026-06-14
visibility: subtree
freshness-window-days: 14
invariants: []
references: []
stateful-fields:
  - id: body
    name: Document body
    status: Draft
codelens:
  diklUsed: false
  projectId: 64c51e15-af55-50cd-8d03-12b24fb09071
  campaignId: codelens-b7eef336
  lifecycle: hypothesis
  confidence: 0.820
  sourceHash: sha256:eeab68868f36a6c3bac537ec2803c3eca4ffc679d7606b8afa6db0a6ccfba4e9
  lastValidatedCommit: 3a054b7699dc15d756802f5b6449718fe50a2343
  deterministicReferences: true
---

# Optional Database Test Plan

## Coverage Gaps
- [src/main/bin/sql/template/render.py](../../../../src/main/bin/sql/template/render.py) has no mapped test file in the scanned corpus.
- [src/main/java/soc/server/database/BCrypt.java](../../../../src/main/java/soc/server/database/BCrypt.java) has no mapped test file in the scanned corpus.
- [src/main/java/soc/server/database/DBSettingMismatchException.java](../../../../src/main/java/soc/server/database/DBSettingMismatchException.java) has no mapped test file in the scanned corpus.
- [src/main/java/soc/server/database/SOCDBHelper.java](../../../../src/main/java/soc/server/database/SOCDBHelper.java) has no mapped test file in the scanned corpus.

## Source Linkage Grounding

_Per-row confidence; `_unverified_` rows are disclosed, not verified; `0.08 (resolved, uncited)` is the resolved-but-uncited baseline, not measured evidence._

| Element | Doc Evidence | Code Evidence | Confidence |
|---------|--------------|---------------|-----------:|
| Coverage Gaps: src/main/bin/sql/template/render.py | render.py - Simple template renderer for SQL DML/DDL to specific DBMS types. | src/main/bin/sql/template/render.py | 0.75 |
| Coverage Gaps: src/main/java/soc/server/database/BCrypt.java |  | src/main/java/soc/server/database/BCrypt.java | 0.86 |
| Coverage Gaps: src/main/java/soc/server/database/DBSettingMismatchException.java |  | src/main/java/soc/server/database/DBSettingMismatchException.java | 0.08 (resolved, uncited) |
| Coverage Gaps: src/main/java/soc/server/database/SOCDBHelper.java |  | src/main/java/soc/server/database/SOCDBHelper.java | 0.75 |
