---
id: source-docs.doc-readme-developer
type: DESIGN
tenant-id: 019ec5a4-5e07-7341-98b8-45f59e05fe07
scope: sgd:codelens/64c51e15-af55-50cd-8d03-12b24fb09071/source-docs
owner: codelens-agent
last-verified:
visibility: subtree
freshness-window-days: 14
source-doc: doc/Readme.developer.md
references:
  - ../../../doc/Readme.developer.md
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

# Source Doc Redocumentation: Developing Sammys-Settlers

## Overview
This deterministic SGD record represents one source markdown document discovered during Stage 0. It preserves the source path, section map, and bounded digest so the generated corpus can prove that the input document was seen and carried forward. It is not a ratified replacement for the source file; unresolved claims remain obligations for deeper synthesis or human review.

## Source Document
- [doc/Readme.developer.md](../../../doc/Readme.developer.md)

## Section Inventory
- H1 Developing Sammys-Settlers
- H2 Contents
- H2 Overall structure of the code and project
- H3 Project layout
- H3 Packages and notable classes
- H3 Board layouts and coordinates
- H3 Development
- H2 Tips for Debugging
- H3 Sammys-Settlers client properties for debugging and testing
- H2 Setup instructions for Sammys-Settlers as an Eclipse project
- H2 Build Setup and Results
- H3 Including Sammys-Settlers as a subproject build
- H2 Recommended debug/run configurations for testing
- H2 To configure a sqlite database for testing (optional)
- H2 Current partially-done work
- H2 To do: The current TODO list
- H2 Saving and loading games at server
- H3 Usage/UI
- H3 Saving game message logs / game event logs
- H2 Game rules, Game Options
- H3 Inactive/activated Game Options:
- H3 Third-Party Game Options:
- H3 Custom maps (user-defined scenarios):
- JDBC

## Content Digest
```markdown
# Developing Sammys-Settlers

## Contents

- Overall structure of the code and project
- Tips for debugging
- Setup instructions for Sammys-Settlers as an Eclipse project
- Build Setup and Results
- Recommended debug/run configurations for testing
- To configure a sqlite database for testing
- Current partially-done work
- To do: The current TODO list
- Saving and loading games at server
- Game rules, Game Options
- JDBC
- Internationalization (I18N)
- Robots (AI)
- Client preferences and board rendering
- Network Communication and interop with other versions or languages
- Coding Style
- Release Testing
- Sammys-Settlers on Github
- Related Projects



## Overall structure of the code and project

### Project layout

This project uses gradle 6.x or 7.x (or IDEs) to build, and
follows the directory structure/layout of a maven/gradle project.

Also see the "Build Setup and Results" section.

### Packages and notable classes

The most important major classes have several paragraphs of class javadocs
describing their structure and interactions. If something is unclear after
reading those docs and this README section, please file an issue at github
or email `jsettlers@nand.net` to clarify things.

The main server class is soc.server.SOCServer (../src/main/java/soc/server/SOCServer.java);
 clients' requests and actions are dispatched into
SOCServerMessageHandler (../src/main/java/soc/server/SOCServerMessageHandler.java),
SOCGameMessageHandler (../src/main/java/soc/server/SOCGameMessageHandler.java),
and SOCGameHandler (../src/main/java/soc/server/SOCGameHandler.java).
The client communication and game-list window is in
soc.client.SOCPlayerClient (../src/main/java/soc/client/SOCPlayerClient.java),
and in-game interface is in
soc.client.SOCPlayerInterface (../src/main/java/soc/client/SOCPlayerInterface.java).
Game state is held at the server in
soc.game.SOCGame (../src/main/java/soc/game/SOCGame.java) and its fields;
only partial game state is known at clients.
The game's "business logic" is mostly in SOCGame,
SOCPlayer (../src/main/java/soc/game/SOCPlayer.java),
and SOCBoard (../src/main/java/soc/game/SOCBoard.java).

The sea board and scenarios use SOCBoardLarge (../src/main/java/soc/game/SOCBoardLarge.java).
Game options and scenario rules
are controlled through SOCGameOption (../src/main/java/soc/game/SOCGameOption.java):

[...digest truncated by CodeLens...]
```

## Redocumentation Obligations
- Preserve this source document's claims in a generated feature, design, architecture, gateway, testplan, or invariant record before treating the corpus as a full semantic replacement for the original docs tree.
- Reconcile any conflict between this digest and direct source-code evidence through the source-truth audit, not by repeating doc-only claims as implemented behavior.

## Source Linkage
- [doc/Readme.developer.md](../../../doc/Readme.developer.md)
