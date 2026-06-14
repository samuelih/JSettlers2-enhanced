---
id: source-docs.claude
type: DESIGN
tenant-id: 019ec5a4-5e07-7341-98b8-45f59e05fe07
scope: sgd:codelens/64c51e15-af55-50cd-8d03-12b24fb09071/source-docs
owner: codelens-agent
last-verified:
visibility: subtree
freshness-window-days: 14
source-doc: CLAUDE.md
references:
  - ../../../CLAUDE.md
stateful-fields:
  - id: body
    name: Document body
    status: Draft
codelens:
  projectId: 64c51e15-af55-50cd-8d03-12b24fb09071
  campaignId: codelens-b7eef336
  lifecycle: hypothesis
  confidence: 0.750
  sourceHash: 3a054b7699dc15d756802f5b6449718fe50a2343
  lastValidatedCommit: 3a054b7699dc15d756802f5b6449718fe50a2343
  deterministicReferences: true
---

# Source Doc Redocumentation: CLAUDE.md

## Overview
This deterministic SGD record represents one source markdown document discovered during Stage 0. It preserves the source path, section map, and bounded digest so the generated corpus can prove that the input document was seen and carried forward. It is not a ratified replacement for the source file; unresolved claims remain obligations for deeper synthesis or human review.

## Source Document
- [CLAUDE.md](../../../CLAUDE.md)

## Section Inventory
- H1 CLAUDE.md
- H2 What this is
- H2 Build & test
- H2 Running locally
- H2 Architecture
- H3 Client ⇄ server message protocol
- H3 Game model (`soc.game`)
- H3 Game options & scenarios — the central extensibility mechanism
- H3 Robots / AI (`soc.robot`)
- H3 Packages
- H2 Conventions that bite
- H2 Debugging
- H2 Database (optional)
- H2 Further docs

## Content Digest
````markdown
# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Sammys-Settlers is a Java client-server implementation of *Settlers of Catan*. The same codebase builds two JARs: a server (`SOCServer`) and a full client (`SOCPlayerClient`) that can also host a server or run offline practice games against robot players. It originated as Robert S Thomas' AI-agent dissertation, so the robot/bot subsystem is first-class, not an afterthought.

## Build & test

The build is **Gradle 6.9.x or 7.x** and targets **Java 8** (`sourceCompatibility`/`targetCompatibility = 1.8`) for client compatibility, though it compiles on newer JDKs. There is **no Gradle wrapper checked in** — `gradle` must be installed and on `PATH`. The Gradle build also shells out to `python3`/`python` for several test/codegen tasks, so Python must be available too.

```bash
gradle build      # compile, build JARs into build/libs/, run unit tests
gradle assemble   # build JARs without running tests
gradle test       # run JUnit 4 unit tests (also runs python tests via testPython)
gradle extraTest  # run unit tests PLUS lengthy functional tests (depends on test)
gradle javadoc    # API docs -> build/docs/javadoc/
gradle clean
```

Run a **single Java test** (extraTest example — same `--tests` flag works for `test`):
```bash
gradle extraTest --exclude-task extraTestPython --exclude-task testPython --tests TestActionsMessages.testBuildAndMove
```

> **IMPORTANT:** Even when running `SOCServer`/`SOCPlayerClient` directly from an IDE, you must first run `gradle assemble` (or `build`) at least once to copy `src/main/resources/` into the build output. Otherwise startup fails with `Packaging error: Cannot determine Sammys-Settlers version`.

Test layout: unit tests in `src/test/java/soctest/**` (+ `src/test/python/`); long-running functional tests in `src/extraTest/java/soctest/**` (+ `src/extraTest/python/`). The `extraTest` source set has its own classpath wired in `build.gradle` and is **not** part of the shipped JARs.

The `test` task also runs `testSrcDBTemplateTokens` and `testSrcDBTemplates`, which verify the SQL scripts in `src/main/bin/sql/` are consistent with their template — see "Database" below.

## Running locally

[...digest truncated by CodeLens...]
````

## Redocumentation Obligations
- Preserve this source document's claims in a generated feature, design, architecture, gateway, testplan, or invariant record before treating the corpus as a full semantic replacement for the original docs tree.
- Reconcile any conflict between this digest and direct source-code evidence through the source-truth audit, not by repeating doc-only claims as implemented behavior.

## Source Linkage
- [CLAUDE.md](../../../CLAUDE.md)
