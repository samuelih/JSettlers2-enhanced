---
id: source-docs.doc-versions
type: DESIGN
tenant-id: 019ec5a4-5e07-7341-98b8-45f59e05fe07
scope: sgd:codelens/64c51e15-af55-50cd-8d03-12b24fb09071/source-docs
owner: codelens-agent
last-verified:
visibility: subtree
freshness-window-days: 14
source-doc: doc/Versions.md
references:
  - ../../../doc/Versions.md
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

# Source Doc Redocumentation: Released Versions of Sammys-Settlers

## Overview
This deterministic SGD record represents one source markdown document discovered during Stage 0. It preserves the source path, section map, and bounded digest so the generated corpus can prove that the input document was seen and carried forward. It is not a ratified replacement for the source file; unresolved claims remain obligations for deeper synthesis or human review.

## Source Document
- [doc/Versions.md](../../../doc/Versions.md)

## Section Inventory
- H1 Released Versions of Sammys-Settlers
- H2 `3.0.00` (build JX202xxxxx)
- H2 `2.7.00` (build JM2022xxxx)
- H2 `2.6.10` (build JM20220705)
- H2 `2.6.00` (build JM20220612)
- H2 `2.5.00` (build JM20211230)
- H2 `2.4.00` (build JM20200704)
- H2 `2.3.00` (build JM20200525)
- H2 `2.2.00` (build JM20200229)
- H2 `2.1.00` (build JM20200119)
- H2 `2.0.00` (build JM20200102)
- H2 `1.2.01` (build OV20180526)
- H2 `1.2.00` (build OV20171005)
- H2 `1.1.20` (build OV20161024)
- H2 `1.1.19` (build OV20141127)
- H2 `1.1.18` (build OV20130402)
- H2 `1.1.17` (build OV20121212)
- H2 `1.1.16` (build OV20121027)
- H2 `1.1.15` (build OV20121021)
- H2 `1.1.14` (build OV20120930)
- H2 `1.1.13` (build JM20111101)
- H2 `1.1.12` (build JM20110122)
- H2 `1.1.11` (build JM20101231)
- H2 `1.1.10` (build JM20100613)

## Content Digest
```markdown
# Released Versions of Sammys-Settlers

Project home and source history are at https://github.com/samuelih/Sammys-Settlers (https://github.com/samuelih/Sammys-Settlers).
Source history for version `1.1.06` and earlier is at https://github.com/samuelih/Sammys-Settlers (https://github.com/samuelih/Sammys-Settlers).

JARs for recent Sammys-Settlers versions can be downloaded from
https://github.com/samuelih/Sammys-Settlers/releases (https://github.com/samuelih/Sammys-Settlers/releases).


## `3.0.00` (build JX202xxxxx)
- Experimental branch `v3`, not currently the main line of development
- Experimental features: html5 client, jetty/tomcat servlet; protobuf option for bots
- Major refactoring: Game data types, etc, thanks to Ruud Poutsma


## `2.7.00` (build JM2022xxxx)
- Currently being developed
- Gameplay:
	- Player can cancel Monopoly, Year of Plenty cards while choosing resources,
	  or Knight card while moving the robber or pirate or just after converting a ship to a Warship
	    - Dev card is returned to their hand
	    - That player's client must be v2.7.00 or newer; other players can use older clients
	- New optional house rule: Allow undo building and moving pieces (new game option `UB`; requires client v2.7.00 or newer)
	    - Includes placements from Road Building card
	    - For convenience, in Practice games this rule is on by default
	    - Also is on by default when client and server both support the option (using Opportunistic Game Options and FLAG_SET_AT_CLIENT_ONCE)
	    - Builds/moves which reveal fog hexes can't be undone, so players can't peek to choose the best hex
	- Opportunistic Game Options
	    - A way to automatically use new options like `UB` when possible, with graceful fallback when not
	    - New clients can have these options on by default, but older clients can still join the game while it's forming
	    - Once players are seated and the game is starting, if it uses Opportunistic Game Options and any player's client version is too old for those options, the options are removed from that game for backwards compatibility
	    - If a game still has Opportunistic options after it starts, older clients can't sit as players because it could be unfair to change options during game play
	- Road Building card: After placing first free road or ship, server sends text prompting you to place second one
- I18N:

[...digest truncated by CodeLens...]
```

## Redocumentation Obligations
- Preserve this source document's claims in a generated feature, design, architecture, gateway, testplan, or invariant record before treating the corpus as a full semantic replacement for the original docs tree.
- Reconcile any conflict between this digest and direct source-code evidence through the source-truth audit, not by repeating doc-only claims as implemented behavior.

## Source Linkage
- [doc/Versions.md](../../../doc/Versions.md)
