---
id: source-docs.readme
type: DESIGN
tenant-id: 019ec5a4-5e07-7341-98b8-45f59e05fe07
scope: sgd:codelens/64c51e15-af55-50cd-8d03-12b24fb09071/source-docs
owner: codelens-agent
last-verified:
visibility: subtree
freshness-window-days: 14
source-doc: Readme.md
references:
  - ../../../Readme.md
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

# Source Doc Redocumentation: ![logo](doc/graf/Logo32.png?raw=true) Sammys-Settlers

## Overview
This deterministic SGD record represents one source markdown document discovered during Stage 0. It preserves the source path, section map, and bounded digest so the generated corpus can prove that the input document was seen and carried forward. It is not a ratified replacement for the source file; unresolved claims remain obligations for deeper synthesis or human review.

## Source Document
- [Readme.md](../../../Readme.md)

## Section Inventory
- H1 ![logo](doc/graf/Logo32.png?raw=true) Sammys-Settlers
- H2 Introduction
- H2 Contents
- H2 Screenshots
- H2 Documentation
- H2 Requirements
- H2 Client Command Line
- H2 Web Client
- H2 Hosting the Webapp for Friends
- H2 Server Setup and Testing
- H3 Server Startup
- H3 Parameters and game option defaults:
- H3 Savegame optional feature:
- H3 jsserver.properties:
- H3 Connect a client
- H3 Server shutdown
- H3 Installing a Sammys-Settlers server
- H4 Checklist:
- H4 Details:
- H3 Upgrading from an earlier version
- H2 Security and Admin Users
- H2 Development and Building Sammys-Settlers

## Content Digest
```markdown
# !logo (doc/graf/Logo32.png?raw=true) Sammys-Settlers

A client-server version of Settlers of Catan with Java desktop and web clients


## Introduction

Sammys-Settlers is a client-server version of the board game Settlers of Catan.
This system supports games between people and optional "robot" opponents.
It was initially created by Robert S Thomas as a dissertation project about
intelligent agents and real-time decision making.

The original Java desktop client can host a server, connect to dedicated
Sammys-Settlers servers over the net, or play practice games offline against bots.
This repository now also includes a modern webapp in `web/` (web/README.md):
a TypeScript / React / SVG client that connects to the same Java `SOCServer`
over WebSocket and speaks the existing `SOCMessage` protocol.

The Java server remains authoritative for game state, rules, robot players,
scenarios, and custom-map validation. The webapp replaces only the front end.
It is a working in-development client, not yet a full replacement for the Java
Swing client.

The server can optionally use a database to store player account
information and game stats (details below).  A client java app to
create user accounts is also provided.

If you're upgrading from an earlier version of Sammys-Settlers: Check
doc/Versions.md (doc/Versions.md) for new features, bug fixes, and
config changes, then see **Upgrading from an earlier version** section
of this Readme.

Sammys-Settlers is an open-source project licensed under the GPL. The
project is hosted at https://github.com/samuelih/Sammys-Settlers/ and
https://nand.net/jsettlers/devel/ . Questions, bugs, and pull requests
can be posted at its github page.

\- The Sammys-Settlers Development Team


## Contents

-  Screenshots
-  Documentation
-  Requirements
-  Client Command Line
-  Web Client
-  Hosting the Webapp for Friends
-  Server Setup and Testing
-  Shutting down the server
-  Installing a Sammys-Settlers Server
-  Upgrading from an earlier version
-  Security and Admin Users
-  Development and Building Sammys-Settlers


## Screenshots

Web connect screen:
!Web connect screen (doc/screenshots/web-connect-20260613.png)

Web new-game options:
!Web new-game options (doc/screenshots/web-new-game-20260613.png)

Web sea-board game against bots:
!Web sea-board game against bots (doc/screenshots/web-game-board-20260613.png)

[...digest truncated by CodeLens...]
```

## Redocumentation Obligations
- Preserve this source document's claims in a generated feature, design, architecture, gateway, testplan, or invariant record before treating the corpus as a full semantic replacement for the original docs tree.
- Reconcile any conflict between this digest and direct source-code evidence through the source-truth audit, not by repeating doc-only claims as implemented behavior.

## Source Linkage
- [Readme.md](../../../Readme.md)
