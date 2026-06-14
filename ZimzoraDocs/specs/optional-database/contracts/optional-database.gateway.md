---
id: optional-database.gateway
type: GATEWAY
tenant-id: 019ec5a4-5e07-7341-98b8-45f59e05fe07
scope: sgd:codelens/64c51e15-af55-50cd-8d03-12b24fb09071/optional-database/contracts
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
  confidence: 0.820
  sourceHash: 3a054b7699dc15d756802f5b6449718fe50a2343
  lastValidatedCommit: 3a054b7699dc15d756802f5b6449718fe50a2343
  deterministicReferences: true
---

# Optional Database Gateway

> Capability Index — public-API contract for the `Optional Database` epic. Cross-scope callers depend on the symbols listed below.

## Rationale
Bounded public-capability contract for cross-scope callers — see [documentation conventions](../../documentation-conventions.md#gateway-rationale).

## Capability Index

| Capability | File:Symbol | Guarantee |
|------------|-------------|-----------|
| `dbtypes-fallthrough-only` | [src/main/bin/sql/template/render.py:50](../../../../src/main/bin/sql/template/render.py#L50) `DBTYPES_FALLTHROUGH_ONLY` | Exports the DBTYPES_FALLTHROUGH_ONLY constant. |
| `db-tokens` | [src/main/bin/sql/template/render.py:54](../../../../src/main/bin/sql/template/render.py#L54) `DB_TOKENS` | Exports the DB_TOKENS constant. |
| `parse-cmdline` | [src/main/bin/sql/template/render.py:96](../../../../src/main/bin/sql/template/render.py#L96) `parse_cmdline` | Parse command line. |
| `setup-tokens` | [src/main/bin/sql/template/render.py:154](../../../../src/main/bin/sql/template/render.py#L154) `setup_tokens` | Set up TOKENS from dynamic tokens and DB_TOKENS[dbtype]. |
| `render` | [src/main/bin/sql/template/render.py:161](../../../../src/main/bin/sql/template/render.py#L161) `render` | Given an input string which may contain template TOKENS, return a rendered output string. |
| `render-one` | [src/main/bin/sql/template/render.py:171](../../../../src/main/bin/sql/template/render.py#L171) `render_one` | Render or compare files; pass in either outfile or compfile, which can include token %s to be replaced by dbtype |
| `custom-map-loader` | [src/main/java/soc/server/CustomMapLoader.java:59](../../../../src/main/java/soc/server/CustomMapLoader.java#L59) `CustomMapLoader` | Loads, validates, parses, and registers user-defined custom board maps at server startup (standard rules only, v1). |
| `get-loaded-map` | [src/main/java/soc/server/CustomMapLoader.java:85](../../../../src/main/java/soc/server/CustomMapLoader.java#L85) `CustomMapLoader.getLoadedMap` | Get a previously-loaded and registered custom map's parsed layout, by its scenario key. |
| `is-custom-map` | [src/main/java/soc/server/CustomMapLoader.java:98](../../../../src/main/java/soc/server/CustomMapLoader.java#L98) `CustomMapLoader.isCustomMap` | Is the given scenario key a registered custom map? @param scenarioKey  Scenario key, or {@code null} @return true if {@code scenarioKey} names a loaded custom map |
| `load-and-register-all` | [src/main/java/soc/server/CustomMapLoader.java:113](../../../../src/main/java/soc/server/CustomMapLoader.java#L113) `CustomMapLoader.loadAndRegisterAll` | Scan a directory for {@code *.map.json} files, parse and validate each, and register the valid ones as custom scenarios via {@link SOCScenario#registerCustomScenario(SOCScenario)}. |
| `load-and-register-one` | [src/main/java/soc/server/CustomMapLoader.java:167](../../../../src/main/java/soc/server/CustomMapLoader.java#L167) `CustomMapLoader.loadAndRegisterOne` | Parse, validate, and register a single custom map file. |
| `parse-and-validate-for-tests` | [src/main/java/soc/server/CustomMapLoader.java:225](../../../../src/main/java/soc/server/CustomMapLoader.java#L225) `CustomMapLoader.parseAndValidateForTests` | Parse and validate a single custom map file WITHOUT registering its scenario or caching it. |
| `derive-scenario-key` | [src/main/java/soc/server/CustomMapLoader.java:261](../../../../src/main/java/soc/server/CustomMapLoader.java#L261) `CustomMapLoader.deriveScenarioKey` | Derive a custom scenario key from a map's filename, using reserved prefix {@link SOCScenario#CUSTOM_SCENARIO_KEY_PREFIX}. |
| `clear-loaded-maps-for-tests` | [src/main/java/soc/server/CustomMapLoader.java:291](../../../../src/main/java/soc/server/CustomMapLoader.java#L291) `CustomMapLoader.clearLoadedMapsForTests` | For unit tests: clear all loaded custom maps and unregister their scenarios. |
| `parsed-custom-map` | [src/main/java/soc/server/CustomMapLoader.java:396](../../../../src/main/java/soc/server/CustomMapLoader.java#L396) `CustomMapLoader.ParsedCustomMap` | Fully-parsed and validated custom map, with integer arrays ready to feed into the board pipeline. |
| `supports-player-count` | [src/main/java/soc/server/CustomMapLoader.java:490](../../../../src/main/java/soc/server/CustomMapLoader.java#L490) `CustomMapLoader.ParsedCustomMap.supportsPlayerCount` | Is the given max-player count supported by this map? @param maxPl  Maximum players (2, 3, 4, or 6) @return true if {@code maxPl} is in {@link #playerCounts} |
| `custom-map-exception` | [src/main/java/soc/server/CustomMapLoader.java:505](../../../../src/main/java/soc/server/CustomMapLoader.java#L505) `CustomMapLoader.CustomMapException` | Thrown when a custom map file can't be parsed, fails validation, or otherwise can't be registered. |
| `custom-map-exception` | [src/main/java/soc/server/CustomMapLoader.java:513](../../../../src/main/java/soc/server/CustomMapLoader.java#L513) `CustomMapLoader.CustomMapException.CustomMapException` | Create an exception with a detail message. |
| `custom-map-validator` | [src/main/java/soc/server/CustomMapValidator.java:67](../../../../src/main/java/soc/server/CustomMapValidator.java#L67) `CustomMapValidator` | Validates and parses a {@link CustomMapJson} into a {@link ParsedCustomMap} for {@link CustomMapLoader} (standard rules only, v1). |
| `_overflow` | — | 382 additional documented exports omitted to keep this gateway within its token budget; the omitted symbols remain in the  and should be promoted into narrower gateways only when they become cross-scope contracts. |
