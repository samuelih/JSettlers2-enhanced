---
id: robot-ai-players.scope
type: SCOPE
kind: code
tenant-id: 019ec5a4-5e07-7341-98b8-45f59e05fe07
name: Robot / AI Players
purpose: "The built-in robot/AI player subsystem under soc.robot. Bots connect to the server exactly like human clients by speaking the SOCMessage protocol; the per-game decision loop lives in SOCRobotBrain.run() rather than in SOCRobotClient. Trivial subclasses in soc.robot.sample3p (Sample3PClient, Sample3PBrain) serve as the starting point for third-party bots. Per doc/Readme.developer.md, this domain originated from Robert S Thomas' intelligent-agents dissertation and is treated as first-class rather than an afterthought; built-in bots run inside the server JVM and fill empty seats so games can start and continue without enough human players. Governs 4 code areas rooted at `src/main/java/soc`, `src/main/java/soc/robot`, `src/main/java/soc/baseclient` (and 1 more), spanning 9 member documents (1 ARCH, 4 DESIGN, 4 FEATURE)."
scope: sgd:codelens/64c51e15-af55-50cd-8d03-12b24fb09071/robot-ai-players
parent: sgd:codelens/64c51e15-af55-50cd-8d03-12b24fb09071
owner: codelens-agent
last-verified: 2026-06-14
visibility: subtree
freshness-window-days: 14
governs:
  - src/main/java/soc/robot
  - src/main/java/soc/robot/SOCRobotBrain.java
  - src/main/java/soc/robot/SOCRobotClient.java
  - src/main/java/soc/baseclient/SOCDisplaylessPlayerClient.java
  - src/main/java/soc/baseclient/ServerConnectInfo.java
  - src/main/java/soc/util/SOCRobotParameters.java
  - src/main/java/soc/robot/sample3p
references:
  - robot-ai-players.arch.md
  - robot-client-networking-socrobotclient.design.md
  - robot-decision-loop-socrobotbrain.design.md
  - robot-robustness-for-unknown-inventory-items.design.md
  - third-party-bot-extension-framework-sample3p.design.md
  - ../documentation-conventions.md
gateway-docs:
  - contracts/robot-ai-players.gateway.md
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
  confidence: 0.830
  sourceHash: 3a054b7699dc15d756802f5b6449718fe50a2343
  lastValidatedCommit: 3a054b7699dc15d756802f5b6449718fe50a2343
  deterministicReferences: true
---

# Robot / AI Players

## Purpose
The built-in robot/AI player subsystem under soc.robot. Bots connect to the server exactly like human clients by speaking the SOCMessage protocol; the per-game decision loop lives in SOCRobotBrain.run() rather than in SOCRobotClient. Trivial subclasses in soc.robot.sample3p (Sample3PClient, Sample3PBrain) serve as the starting point for third-party bots. Per doc/Readme.developer.md, this domain originated from Robert S Thomas' intelligent-agents dissertation and is treated as first-class rather than an afterthought; built-in bots run inside the server JVM and fill empty seats so games can start and continue without enough human players. Governs 4 code areas rooted at `src/main/java/soc`, `src/main/java/soc/robot`, `src/main/java/soc/baseclient` (and 1 more), spanning 9 member documents (1 ARCH, 4 DESIGN, 4 FEATURE).

## Scope
sgd:codelens/64c51e15-af55-50cd-8d03-12b24fb09071/robot-ai-players

## Local Laws
- Use the project glossary's established terminology consistently — 466 term(s) carry a citable source document (e.g. "Game").

## Members

| Member | Kind | Status |
|--------|------|--------|
| [Robot / AI Players](robot-ai-players.arch.md) | ARCH | Draft |
| [Robot client networking (SOCRobotClient)](robot-client-networking-socrobotclient.design.md) | DESIGN | Draft |
| [robot-client-networking-socrobotclient.feature](robot-client-networking-socrobotclient.feature.md) | FEATURE | Draft |
| [Robot decision loop (SOCRobotBrain)](robot-decision-loop-socrobotbrain.design.md) | DESIGN | Draft |
| [robot-decision-loop-socrobotbrain.feature](robot-decision-loop-socrobotbrain.feature.md) | FEATURE | Draft |
| [Robot robustness for unknown inventory items](robot-robustness-for-unknown-inventory-items.design.md) | DESIGN | Draft |
| [robot-robustness-for-unknown-inventory-items.feature](robot-robustness-for-unknown-inventory-items.feature.md) | FEATURE | Draft |
| [Third-party bot extension framework (sample3p)](third-party-bot-extension-framework-sample3p.design.md) | DESIGN | Draft |
| [third-party-bot-extension-framework-sample3p.feature](third-party-bot-extension-framework-sample3p.feature.md) | FEATURE | Draft |

Total direct children: 9

## Source Linkage
- [src/main/java/soc/robot](../../../src/main/java/soc/robot)
- [src/main/java/soc/robot/SOCRobotBrain.java](../../../src/main/java/soc/robot/SOCRobotBrain.java)
- [src/main/java/soc/robot/SOCRobotClient.java](../../../src/main/java/soc/robot/SOCRobotClient.java)
- [src/main/java/soc/baseclient/SOCDisplaylessPlayerClient.java](../../../src/main/java/soc/baseclient/SOCDisplaylessPlayerClient.java)
- [src/main/java/soc/baseclient/ServerConnectInfo.java](../../../src/main/java/soc/baseclient/ServerConnectInfo.java)
- [src/main/java/soc/util/SOCRobotParameters.java](../../../src/main/java/soc/util/SOCRobotParameters.java)
- [src/main/java/soc/robot/sample3p](../../../src/main/java/soc/robot/sample3p)

Charter conventions: [documentation-conventions.md](../documentation-conventions.md#epic-charter-conventions)

## Source Linkage Grounding

_Per-row confidence; `_unverified_` rows are disclosed, not verified; `0.08 (resolved, uncited)` is the resolved-but-uncited baseline, not measured evidence._

| Element | Doc Evidence | Code Evidence | Confidence |
|---------|--------------|---------------|-----------:|
| Source Linkage: src/main/java/soc/robot |  | src/main/java/soc/robot | 0.83 |
| Source Linkage: src/main/java/soc/robot/SOCRobotBrain.java |  | src/main/java/soc/robot/SOCRobotBrain.java | 0.83 |
| Source Linkage: src/main/java/soc/robot/SOCRobotClient.java |  | src/main/java/soc/robot/SOCRobotClient.java | 0.75 |
| Source Linkage: src/main/java/soc/baseclient/SOCDisplaylessPlayerClient.java |  | src/main/java/soc/baseclient/SOCDisplaylessPlayerClient.java | 0.89 |
| Source Linkage: src/main/java/soc/baseclient/ServerConnectInfo.java |  | src/main/java/soc/baseclient/ServerConnectInfo.java | 0.48 |
| Source Linkage: src/main/java/soc/util/SOCRobotParameters.java |  | src/main/java/soc/util/SOCRobotParameters.java | 0.75 |
| Source Linkage: src/main/java/soc/robot/sample3p |  | src/main/java/soc/robot/sample3p | 0.08 (resolved, uncited) |
