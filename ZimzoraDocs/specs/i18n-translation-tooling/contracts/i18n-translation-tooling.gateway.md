---
id: i18n-translation-tooling.gateway
type: GATEWAY
tenant-id: 019ec5a4-5e07-7341-98b8-45f59e05fe07
scope: sgd:codelens/64c51e15-af55-50cd-8d03-12b24fb09071/i18n-translation-tooling/contracts
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
  confidence: 0.620
  sourceHash: 3a054b7699dc15d756802f5b6449718fe50a2343
  lastValidatedCommit: 3a054b7699dc15d756802f5b6449718fe50a2343
  deterministicReferences: true
---

# i18n Translation Tooling Gateway

> Capability Index — public-API contract for the `i18n Translation Tooling` epic. Cross-scope callers depend on the symbols listed below.

## Rationale
Bounded public-capability contract for cross-scope callers — see [documentation conventions](../../documentation-conventions.md#gateway-rationale).

## Capability Index

| Capability | File:Symbol | Guarantee |
|------------|-------------|-----------|
| `cell-status` | [src/main/java/net/nand/util/i18n/gui/PropertiesTranslatorEditor.java:1822](../../../../src/main/java/net/nand/util/i18n/gui/PropertiesTranslatorEditor.java#L1822) `PropertiesTranslatorEditor.CellStatus` | Exports the CellStatus enum contract. |
| `parsed-props-file-pair` | [src/main/java/net/nand/util/i18n/ParsedPropsFilePair.java:53](../../../../src/main/java/net/nand/util/i18n/ParsedPropsFilePair.java#L53) `ParsedPropsFilePair` | Represents a source-language and destination-language pair of properties files. |
| `parsed-props-file-pair` | [src/main/java/net/nand/util/i18n/ParsedPropsFilePair.java:125](../../../../src/main/java/net/nand/util/i18n/ParsedPropsFilePair.java#L125) `ParsedPropsFilePair.ParsedPropsFilePair` | Create a new empty FilePair to begin parsing. |
| `size` | [src/main/java/net/nand/util/i18n/ParsedPropsFilePair.java:137](../../../../src/main/java/net/nand/util/i18n/ParsedPropsFilePair.java#L137) `ParsedPropsFilePair.size` | Get the number of key-value pairs in {@link #getContents()}. |
| `get-contents` | [src/main/java/net/nand/util/i18n/ParsedPropsFilePair.java:147](../../../../src/main/java/net/nand/util/i18n/ParsedPropsFilePair.java#L147) `ParsedPropsFilePair.getContents` | Get the list of key-value pairs found in the source and maybe also the destination. |
| `extract-contents-half` | [src/main/java/net/nand/util/i18n/ParsedPropsFilePair.java:162](../../../../src/main/java/net/nand/util/i18n/ParsedPropsFilePair.java#L162) `ParsedPropsFilePair.extractContentsHalf` | Get the source or destination "half" of the parsed pair's contents, in a format suitable for {@link PropsFileWriter#write(List, String)}. |
| `get-row` | [src/main/java/net/nand/util/i18n/ParsedPropsFilePair.java:217](../../../../src/main/java/net/nand/util/i18n/ParsedPropsFilePair.java#L217) `ParsedPropsFilePair.getRow` | Get row {@code r} of the contents. |
| `is-key-dest-only` | [src/main/java/net/nand/util/i18n/ParsedPropsFilePair.java:229](../../../../src/main/java/net/nand/util/i18n/ParsedPropsFilePair.java#L229) `ParsedPropsFilePair.isKeyDestOnly` | Is this key found only in the destination file, not in the source file? This is an error and a rare occurrence. |
| `get-dest-only-size` | [src/main/java/net/nand/util/i18n/ParsedPropsFilePair.java:246](../../../../src/main/java/net/nand/util/i18n/ParsedPropsFilePair.java#L246) `ParsedPropsFilePair.getDestOnlySize` | Get the number of key-value pairs found only in the destination, or 0,  in {@link #getDestOnly()}. |
| `get-dest-only` | [src/main/java/net/nand/util/i18n/ParsedPropsFilePair.java:257](../../../../src/main/java/net/nand/util/i18n/ParsedPropsFilePair.java#L257) `ParsedPropsFilePair.getDestOnly` | Get the list of key-value pairs found only in the destination, or {@code null} if none. |
| `get-src-dupe-keys` | [src/main/java/net/nand/util/i18n/ParsedPropsFilePair.java:270](../../../../src/main/java/net/nand/util/i18n/ParsedPropsFilePair.java#L270) `ParsedPropsFilePair.getSrcDupeKeys` | Get any keys seen during source parsing more than once with different values. |
| `get-dest-dupe-keys` | [src/main/java/net/nand/util/i18n/ParsedPropsFilePair.java:282](../../../../src/main/java/net/nand/util/i18n/ParsedPropsFilePair.java#L282) `ParsedPropsFilePair.getDestDupeKeys` | Get any keys seen during destination parsing more than once with different values. |
| `parse-src` | [src/main/java/net/nand/util/i18n/ParsedPropsFilePair.java:293](../../../../src/main/java/net/nand/util/i18n/ParsedPropsFilePair.java#L293) `ParsedPropsFilePair.parseSrc` | Parse the source-language file at {@link #srcFile}. |
| `set-dest-is-new` | [src/main/java/net/nand/util/i18n/ParsedPropsFilePair.java:345](../../../../src/main/java/net/nand/util/i18n/ParsedPropsFilePair.java#L345) `ParsedPropsFilePair.setDestIsNew` | Call this method to indicate that {@link #destFile} is new and does not yet exist. |
| `parse-dest` | [src/main/java/net/nand/util/i18n/ParsedPropsFilePair.java:382](../../../../src/main/java/net/nand/util/i18n/ParsedPropsFilePair.java#L382) `ParsedPropsFilePair.parseDest` | Parse the destination-language file at {@link #destFile}; call {@link #parseSrc()} before calling this method, so this method can merge the structures together into {@link #cont}. |
| `insert-row` | [src/main/java/net/nand/util/i18n/ParsedPropsFilePair.java:546](../../../../src/main/java/net/nand/util/i18n/ParsedPropsFilePair.java#L546) `ParsedPropsFilePair.insertRow` | Add/insert a row before or after an existing row. |
| `convert-inserted-rows` | [src/main/java/net/nand/util/i18n/ParsedPropsFilePair.java:568](../../../../src/main/java/net/nand/util/i18n/ParsedPropsFilePair.java#L568) `ParsedPropsFilePair.convertInsertedRows` | Check for rows added by the editor, with the {@link FileKeyEntry#newAdd} flag; inspect these for keys and values, and if needed convert them to {@link FileCommentEntry}. |
| `_overflow` | — | 68 additional documented exports omitted to keep this gateway within its token budget; the omitted symbols remain in the  and should be promoted into narrower gateways only when they become cross-scope contracts. |
