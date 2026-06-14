---
id: i18n-translation-tooling.testplan
type: TESTPLAN
tenant-id: 019ec5a4-5e07-7341-98b8-45f59e05fe07
scope: sgd:codelens/64c51e15-af55-50cd-8d03-12b24fb09071/i18n-translation-tooling/contracts
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
  confidence: 0.620
  sourceHash: sha256:05a33c2ec5b0c3659512660874c53b378fac739a64b4c13580484a3ac62fd369
  lastValidatedCommit: 3a054b7699dc15d756802f5b6449718fe50a2343
  deterministicReferences: true
---

# i18n Translation Tooling Test Plan

## Coverage Gaps
- [src/main/java/net/nand/util/i18n/ParsedPropsFilePair.java](../../../../src/main/java/net/nand/util/i18n/ParsedPropsFilePair.java) has no mapped test file in the scanned corpus.
- [src/main/java/net/nand/util/i18n/PropsFileParser.java](../../../../src/main/java/net/nand/util/i18n/PropsFileParser.java) has no mapped test file in the scanned corpus.
- [src/main/java/net/nand/util/i18n/PropsFilePseudoLocalizer.java](../../../../src/main/java/net/nand/util/i18n/PropsFilePseudoLocalizer.java) has no mapped test file in the scanned corpus.
- [src/main/java/net/nand/util/i18n/PropsFileWriter.java](../../../../src/main/java/net/nand/util/i18n/PropsFileWriter.java) has no mapped test file in the scanned corpus.
- [src/main/java/net/nand/util/i18n/gui/PTEMain.java](../../../../src/main/java/net/nand/util/i18n/gui/PTEMain.java) has no mapped test file in the scanned corpus.
- [src/main/java/net/nand/util/i18n/gui/PropertiesTranslatorEditor.java](../../../../src/main/java/net/nand/util/i18n/gui/PropertiesTranslatorEditor.java) has no mapped test file in the scanned corpus.
- [src/main/java/net/nand/util/i18n/mgr/StringManager.java](../../../../src/main/java/net/nand/util/i18n/mgr/StringManager.java) has no mapped test file in the scanned corpus.

## Source Linkage Grounding

_Per-row confidence; `_unverified_` rows are disclosed, not verified; `0.08 (resolved, uncited)` is the resolved-but-uncited baseline, not measured evidence._

| Element | Doc Evidence | Code Evidence | Confidence |
|---------|--------------|---------------|-----------:|
| Coverage Gaps: src/main/java/net/nand/util/i18n/ParsedPropsFilePair.java |  | src/main/java/net/nand/util/i18n/ParsedPropsFilePair.java | 0.75 |
| Coverage Gaps: src/main/java/net/nand/util/i18n/PropsFileParser.java |  | src/main/java/net/nand/util/i18n/PropsFileParser.java | 0.72 |
| Coverage Gaps: src/main/java/net/nand/util/i18n/PropsFilePseudoLocalizer.java |  | src/main/java/net/nand/util/i18n/PropsFilePseudoLocalizer.java | 0.16 |
| Coverage Gaps: src/main/java/net/nand/util/i18n/PropsFileWriter.java |  | src/main/java/net/nand/util/i18n/PropsFileWriter.java | 0.75 |
| Coverage Gaps: src/main/java/net/nand/util/i18n/gui/PTEMain.java |  | src/main/java/net/nand/util/i18n/gui/PTEMain.java | 0.75 |
| Coverage Gaps: src/main/java/net/nand/util/i18n/gui/PropertiesTranslatorEditor.java |  | src/main/java/net/nand/util/i18n/gui/PropertiesTranslatorEditor.java | 0.75 |
| Coverage Gaps: src/main/java/net/nand/util/i18n/mgr/StringManager.java |  | src/main/java/net/nand/util/i18n/mgr/StringManager.java | 0.75 |
