---
id: optional-database.scope
type: SCOPE
kind: code
tenant-id: 019ec5a4-5e07-7341-98b8-45f59e05fe07
name: Optional Database
purpose: "The optional, vendor-neutral persistence layer for the Sammys-Settlers server, storing player accounts, completed-game stats/scores, and saved bot parameters. This domain keeps all SQL access portable across MySQL/MariaDB, PostgreSQL, SQLite, and Oracle: schema definition and runtime schema upgrades are centralized in soc.server.database.SOCDBHelper, while the concrete table-creation scripts under src/main/bin/sql/ are generated from a single template by render.py and kept consistent by build-task checks. Persistence is entirely opt-in — the server runs fully without any database, losing only persistent accounts and stats — and is configured through JDBC URL/driver/credential properties at startup, as described in doc/Database.md. Governs 3 code areas rooted at `src/main/java/soc/server`, `src/main/bin`, `src/main/bin/sql`, spanning 7 member documents (1 ARCH, 3 DESIGN, 3 FEATURE)."
scope: sgd:codelens/64c51e15-af55-50cd-8d03-12b24fb09071/optional-database
parent: sgd:codelens/64c51e15-af55-50cd-8d03-12b24fb09071
owner: codelens-agent
last-verified: 2026-06-14
visibility: subtree
freshness-window-days: 14
governs:
  - src/main/java/soc/server/database
  - src/main/bin/sql
  - src/main/bin/sql/template
references:
  - jdbc-persistence-helper-schema-upgrades.design.md
  - optional-database.arch.md
  - player-accounts-game-stats-persistence.design.md
  - sql-schema-templating-generation.design.md
  - ../documentation-conventions.md
gateway-docs:
  - contracts/optional-database.gateway.md
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
  confidence: 0.820
  sourceHash: 3a054b7699dc15d756802f5b6449718fe50a2343
  lastValidatedCommit: 3a054b7699dc15d756802f5b6449718fe50a2343
  deterministicReferences: true
---

# Optional Database

## Purpose
The optional, vendor-neutral persistence layer for the Sammys-Settlers server, storing player accounts, completed-game stats/scores, and saved bot parameters. This domain keeps all SQL access portable across MySQL/MariaDB, PostgreSQL, SQLite, and Oracle: schema definition and runtime schema upgrades are centralized in soc.server.database.SOCDBHelper, while the concrete table-creation scripts under src/main/bin/sql/ are generated from a single template by render.py and kept consistent by build-task checks. Persistence is entirely opt-in — the server runs fully without any database, losing only persistent accounts and stats — and is configured through JDBC URL/driver/credential properties at startup, as described in doc/Database.md. Governs 3 code areas rooted at `src/main/java/soc/server`, `src/main/bin`, `src/main/bin/sql`, spanning 7 member documents (1 ARCH, 3 DESIGN, 3 FEATURE).

## Scope
sgd:codelens/64c51e15-af55-50cd-8d03-12b24fb09071/optional-database

## Local Laws
- Use the project glossary's established terminology consistently — 466 term(s) carry a citable source document (e.g. "Game").

## Members

| Member | Kind | Status |
|--------|------|--------|
| [JDBC Persistence Helper & Schema Upgrades](jdbc-persistence-helper-schema-upgrades.design.md) | DESIGN | Draft |
| [jdbc-persistence-helper-schema-upgrades.feature](jdbc-persistence-helper-schema-upgrades.feature.md) | FEATURE | Draft |
| [Optional Database](optional-database.arch.md) | ARCH | Draft |
| [Player Accounts & Game Stats Persistence](player-accounts-game-stats-persistence.design.md) | DESIGN | Draft |
| [player-accounts-game-stats-persistence.feature](player-accounts-game-stats-persistence.feature.md) | FEATURE | Draft |
| [SQL Schema Templating & Generation](sql-schema-templating-generation.design.md) | DESIGN | Draft |
| [sql-schema-templating-generation.feature](sql-schema-templating-generation.feature.md) | FEATURE | Draft |

Total direct children: 7

## Source Linkage
- [src/main/java/soc/server/database](../../../src/main/java/soc/server/database)
- [src/main/bin/sql](../../../src/main/bin/sql)
- [src/main/bin/sql/template](../../../src/main/bin/sql/template)

Charter conventions: [documentation-conventions.md](../documentation-conventions.md#epic-charter-conventions)

## Source Linkage Grounding

_Per-row confidence; `_unverified_` rows are disclosed, not verified; `0.08 (resolved, uncited)` is the resolved-but-uncited baseline, not measured evidence._

| Element | Doc Evidence | Code Evidence | Confidence |
|---------|--------------|---------------|-----------:|
| Source Linkage: src/main/java/soc/server/database |  | src/main/java/soc/server/database | 0.86 |
| Source Linkage: src/main/bin/sql |  | src/main/bin/sql | 0.75 |
| Source Linkage: src/main/bin/sql/template |  | src/main/bin/sql/template | 0.75 |
