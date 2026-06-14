---
id: source-docs.doc-database
type: DESIGN
tenant-id: 019ec5a4-5e07-7341-98b8-45f59e05fe07
scope: sgd:codelens/64c51e15-af55-50cd-8d03-12b24fb09071/source-docs
owner: codelens-agent
last-verified:
visibility: subtree
freshness-window-days: 14
source-doc: doc/Database.md
references:
  - ../../../doc/Database.md
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

# Source Doc Redocumentation: Sammys-Settlers - Optional Database

## Overview
This deterministic SGD record represents one source markdown document discovered during Stage 0. It preserves the source path, section map, and bounded digest so the generated corpus can prove that the input document was seen and carried forward. It is not a ratified replacement for the source file; unresolved claims remain obligations for deeper synthesis or human review.

## Source Document
- [doc/Database.md](../../../doc/Database.md)

## Section Inventory
- H1 Sammys-Settlers - Optional Database
- H2 Introduction
- H2 Contents
- H2 Database Setup (Installing a Sammys-Settlers DB)
- H3 Finding a JDBC driver JAR:
- H4 If SQLite gives "Operation not permitted" error at startup
- H3 If your database server isn't a type listed above
- H3 Database Creation
- H4 For mysql or mariadb:
- H4 For Postgresql:
- H4 For sqlite:
- H4 Sammys-Settlers Server startup after DB Creation:
- H2 Sammys-Settlers Features which use the Database
- H3 Storing Game Stats and Scores in the DB (optional)
- H3 Creating Sammys-Settlers Player Accounts in the DB (optional)
- H4 Password Encryption (BCrypt)
- H2 Security, Admin Users, Admin Commands
- H3 Admin Commands
- H3 Password Reset
- H2 Upgrading from an earlier version of Sammys-Settlers
- H3 Checklist before starting the upgrade:
- H3 When starting up the server using the new version:
- H4 Postgresql note:
- H3 Completing the upgrade:

## Content Digest
```markdown
# Sammys-Settlers - Optional Database
Setup and info about using the optional database for Sammys-Settlers user accounts and game results


## Introduction

The Sammys-Settlers server can optionally use a database to store player account
information and/or game stats. These features can be individually turned on
in the server config. A client java app to create user accounts is
also provided.

## Contents

-  Database Setup (Installing a Sammys-Settlers DB)
-  Sammys-Settlers Features which use the Database
   - Game Stats and Scores
   - Player Accounts
-  Security, Admin Users, Admin Commands
-  Upgrading from an earlier version of Sammys-Settlers
-  Settings Table and Checking Info about the DB


## Database Setup (Installing a Sammys-Settlers DB)

If you want to maintain user accounts or save scores of all completed games,
you will need to set up a MySQL/MariaDB, SQLite, or PostgreSQL database. This will
eliminate the "No user database available" console message seen when starting
the server.

This section first describes setting up the database and the Sammys-Settlers server's
connection to it, and then how to turn on optional features for Game Scores
or User Accounts.

For these instructions we'll assume you already installed the PostgreSQL, MariaDB, or
MySQL software, or will download a SQLite JAR to avoid database server setup.
Sammys-Settlers is tested with sqlite 3.27.2.1, mariadb 10.4, mysql 5.5, and
postgresql 8.4, 9.5, 11.6, 12.1.

You will need a JDBC driver JAR file in your classpath or the same directory as
the Sammys-Settlers JAR; see below for details. Besides PostgreSQL, MySQL, MariaDB,
or SQLite, any JDBC database can be used, including Oracle or MS SQL Server;
however only that list of db types are tested in depth with Sammys-Settlers.

The default type and name for the database is MySQL and "socdata". To use
another db type or another name, you'll need to specify it as a JDBC URL on
the command line, such as:
`-Djsettlers.db.url=jdbc:mariadb://localhost/socdata`
or
`-Djsettlers.db.url=jdbc:mysql://localhost/socdata`
or
`-Djsettlers.db.url=jdbc:postgresql://localhost/socdata`
or
`-Djsettlers.db.url=jdbc:sqlite:jsettlers.sqlite`

If needed you can also specify a database username and password as:
`-Djsettlers.db.user=socuser -Djsettlers.db.pass=socpass`

or place them on the command line after the port number and max connections:

[...digest truncated by CodeLens...]
```

## Redocumentation Obligations
- Preserve this source document's claims in a generated feature, design, architecture, gateway, testplan, or invariant record before treating the corpus as a full semantic replacement for the original docs tree.
- Reconcile any conflict between this digest and direct source-code evidence through the source-truth audit, not by repeating doc-only claims as implemented behavior.

## Source Linkage
- [doc/Database.md](../../../doc/Database.md)
