---
id: web-client-board-rendering.testplan
type: TESTPLAN
tenant-id: 019ec5a4-5e07-7341-98b8-45f59e05fe07
scope: sgd:codelens/64c51e15-af55-50cd-8d03-12b24fb09071/web-client-board-rendering/contracts
owner: codelens-agent
last-verified: 2026-06-14
visibility: subtree
freshness-window-days: 14
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
  confidence: 0.850
  sourceHash: sha256:478eb9e0bc464d710d8798f202b49b4de2b0c20c290fd37b63ab4a79cf3234a2
  lastValidatedCommit: 3a054b7699dc15d756802f5b6449718fe50a2343
  deterministicReferences: true
---

# Web Client & Board Rendering Test Plan

> _Coverage Map aggregated by test file: 17 test file(s) mapping 201 test case(s). Per-file case counts sum to the full total; when this plan exceeds the doc size ceiling the full file inventory is chunked into `*.part-N.testplan.md` sidecars (see Testplan Sidecars)._

## Coverage Map
- [web/src/board/BoardSVG.test.tsx](../../../../web/src/board/BoardSVG.test.tsx#L47) `renders the board-svg root with the expected hex count`, `shows a dice number on the resource hex but not on desert/water`, `renders the robber on the robber hex`, `renders the port marker`, `renders a settlement at the correct node and a road on its edge`, `renders a city with a filled body and small architectural details`, `renders clickable node targets for highlightNodes and fires onNodeClick`, `renders clickable edge targets for highlightEdges and fires onEdgeClick`, `only wires hex clicks for highlighted robber/pirate targets`, `omits highlight target groups when none are given` (10 test cases) covers web/src/board/BoardSVG.tsx
- [web/src/components/Button.test.tsx](../../../../web/src/components/Button.test.tsx#L8) `renders its children`, `defaults to type="button"`, `calls onClick when activated`, `does not fire onClick when disabled` (4 test cases) covers web/src/components/Button.tsx
- [web/src/components/Dialog.test.tsx](../../../../web/src/components/Dialog.test.tsx#L8) `keeps tab focus inside the modal`, `does not override autofocus inside the modal` (2 test cases) covers web/src/components/Button.tsx, web/src/components/Dialog.tsx
- [web/src/components/ck/ckCatalog.test.ts](../../../../web/src/components/ck/ckCatalog.test.ts#L13) `lists the full official 54-card progress deck`, `maps server-backed item types to their official current-edition names`, `includes the official C&K pieces and materials missing from the old web panel` (3 test cases) covers web/src/components/Panel.tsx
- [web/src/components/newgame/NewGameDialog.test.tsx](../../../../web/src/components/newgame/NewGameDialog.test.tsx#L36) `renders name, nickname (default WebPlayer) and Create/Cancel`, `promotes PL and VP into the prominent block at the top`, `disables Create until a game name is entered`, `calls onCreate with the entered name, nick and chosen option values`, `falls back to default nick WebPlayer when cleared`, `shows a scenario select when scenarios are provided and passes the chosen key`, `does not render a scenario select when no scenarios are given`, `calls onCancel when Cancel is clicked`, `shows a spinner in the options area while option discovery is in flight`, `hides the spinner once options have loaded` (10 test cases) covers web/src/components/Dialog.tsx, web/src/components/Spinner.tsx, web/src/components/newgame/NewGameDialog.tsx
- [web/src/components/newgame/OptionField.test.tsx](../../../../web/src/components/newgame/OptionField.test.tsx#L9) `renders a bool option as a labeled checkbox and fires onChange`, `renders an int option as a number input and clamps to min/max`, `renders an intbool option, disabling the number when unchecked`, `renders an enum option as a select of enumVals (1-indexed) and fires onChange`, `renders an enumbool option with checkbox + select, select disabled when unchecked`, `renders a str option as a text input and fires onChange`, `renders a strhide option as a masked (password) input`, `renders an unknown option as a non-interactive notice`, `strips the # marker from the rendered label` (9 test cases) covers web/src/components/newgame/OptionField.tsx
- [web/src/map-editor/validation.test.ts](../../../../web/src/map-editor/validation.test.ts#L30) `produces zero errors`, `produces zero warnings (each island is one contiguous area)`, `flags a missing name`, `flags name containing | or ,`, `flags a name with control/newline characters`, `flags a name with a Unicode LINE SEPARATOR (U+2028)`, `flags a name with a Unicode PARAGRAPH SEPARATOR (U+2029)`, `errors on a dashed prefix with nothing after it`, `errors on a dashed prefix missing the required trailing space`, `errors on a bracketed prefix missing the required trailing space`, …and 54 more in this file (64 test cases) covers web/src/main.tsx
- [web/src/net/liveDiscovery.test.ts](../../../../web/src/net/liveDiscovery.test.ts#L191) `returns PL/VP/SBL/BC as fully-typed descriptors, not unknown`, `the defaults reply lists the standard option keys` (2 test cases) covers web/src/App.tsx
- [web/src/screens/DisconnectOverlay.test.tsx](../../../../web/src/screens/DisconnectOverlay.test.tsx#L95) `renders when the connection drops while a game is in progress`, `does not render while connected, nor when no game is joined`, `Reconnect re-runs connect against the saved host/port and clears the stale game`, `"Back to connect screen" abandons the stale game and shows the connect screen` (4 test cases) covers web/src/screens/DisconnectOverlay.tsx, web/src/screens/Root.tsx
- [web/src/screens/GameOverOverlay.test.tsx](../../../../web/src/screens/GameOverOverlay.test.tsx#L55) `renders for GAMESTATE OVER and names the CURRENT_PLAYER winner`, `fills final per-seat scores from GAMESTATS (TYPE_PLAYERS)`, `does not render the overlay before the game is OVER` (3 test cases) covers web/src/screens/GameScreen.tsx
- [web/src/screens/GameRoom.test.tsx](../../../../web/src/screens/GameRoom.test.tsx#L35) `shows "Starting game…" and disables the button after clicking Start`, `re-enables Start when the server rejects the request (error toast)`, `labels empty-seat actions by seat number before the player sits`, `labels room-level and locked-seat actions clearly` (4 test cases) covers web/src/screens/GameRoom.tsx, web/src/screens/Root.tsx
- [web/src/screens/GameScreen.test.tsx](../../../../web/src/screens/GameScreen.test.tsx#L49) `renders a player panel per seat with name, color swatch, and resource total`, `highlights the current player via data-current`, `shows the turn banner with the current player name and a state label`, `shows the dice display with the last roll total`, `shows a placeholder dice display before any roll`, `shows the local player per-resource breakdown`, `updates the VP shown after placing a settlement`, `renders the game log with appended lines`, `renders player chat lines with the speaker nickname, distinct from server lines`, `renders the chat input row with Send disabled until text is entered`, …and 4 more in this file (14 test cases) covers web/src/screens/GameScreen.tsx
- [web/src/screens/GameScreenCK.test.tsx](../../../../web/src/screens/GameScreenCK.test.tsx#L78) `renders the C&K panel in a C&K game`, `does not render the C&K panel in a plain game`, `shows my cloth/coin/paper counts`, `enables Build only on my turn in PLAY1 with enough of the commodity`, `disables Build outside PLAY1`, `shows a metropolis badge with the owner name`, `shows counts by level with active totals`, `gates Buy (sheep+ore), Activate (wheat + an inactive knight), Promote`, `disables Activate when all knights are active and Buy when unaffordable`, `requires Politics >= 3 to promote a strong knight to mighty`, …and 13 more in this file (23 test cases) covers web/src/screens/GameScreen.tsx
- [web/src/screens/GameScreenInteractions.test.tsx](../../../../web/src/screens/GameScreenInteractions.test.tsx#L68) `renders the bank and propose-offer controls`, `keeps bank trade at 4:1 when the player does not own the visible port`, `unlocks a resource harbor only from a settlement on either port corner`, `shows an incoming offer with Accept/Reject buttons`, `quick asks prefill the player-trade composer`, `shows bot-to-bot offers without invalid local actions`, `records declined and accepted trade activity clearly`, `records successful bank trades in the trade activity feed`, `renders Buy + a Play button for a playable Knight`, `disables Play for a brand-new (this-turn) card`, …and 8 more in this file (18 test cases) covers web/src/screens/GameScreen.tsx
- [web/src/screens/LobbyScreen.test.tsx](../../../../web/src/screens/LobbyScreen.test.tsx#L35) `shows a non-OK SOCStatusMessage error as a toast and clears it`, `does not toast when there is no error`, `shows a loading row until the initial game list arrives`, `shows the populated list once games arrive`, `labels join buttons with their game names`, `shows grouped expansion choices in stable order` (6 test cases) covers web/src/screens/LobbyScreen.tsx
- [web/src/screens/MapEditorScreen.test.tsx](../../../../web/src/screens/MapEditorScreen.test.tsx#L30) `mounts with the core editor regions`, `loads the bundled sample map and reports a valid state`, `loads a template and can undo back to the prior draft`, `edits the selected hex through the inspector`, `clicks a validation issue to focus the offending field`, `zooms the editor canvas from the workflow bar`, `labels repeated stepper controls for assistive tech`, `surfaces an error when mutated to an invalid state`, `surfaces a dice-range error when a bad dice number is imported`, `exports JSON that round-trips back to the sample map`, …and 7 more in this file (17 test cases) covers web/src/screens/MapEditorScreen.tsx
- [web/src/screens/SettingsScreen.test.tsx](../../../../web/src/screens/SettingsScreen.test.tsx#L20) `renders nothing when settings are closed`, `renders all controls inside settings-body`, `changing theme select updates store + data-theme`, `changing color-blind select updates store + data-theme-cb`, `changing quality select updates store + data-render-quality`, `moving font-scale slider updates store + --font-scale`, `sound toggle disables the volume slider when off`, `reset button restores defaults` (8 test cases) covers web/src/screens/Root.tsx, web/src/screens/SettingsScreen.tsx

## Acceptance Evidence
- Given the implementation under test, when renders the board svg root with the expected hex count is exercised by [web/src/board/BoardSVG.test.tsx::renders the board-svg root with the expected hex count](../../../../web/src/board/BoardSVG.test.tsx#L47), then the feature preserves that observable behavior.
- Given the implementation under test, when shows a dice number on the resource hex but not on desert/water is exercised by [web/src/board/BoardSVG.test.tsx::shows a dice number on the resource hex but not on desert/water](../../../../web/src/board/BoardSVG.test.tsx#L59), then the feature preserves that observable behavior.
- Given the implementation under test, when renders the robber on the robber hex is exercised by [web/src/board/BoardSVG.test.tsx::renders the robber on the robber hex](../../../../web/src/board/BoardSVG.test.tsx#L66), then the feature preserves that observable behavior.
- Given the implementation under test, when renders the port marker is exercised by [web/src/board/BoardSVG.test.tsx::renders the port marker](../../../../web/src/board/BoardSVG.test.tsx#L73), then the feature preserves that observable behavior.
- Given the implementation under test, when renders a settlement at the correct node and a road on its edge is exercised by [web/src/board/BoardSVG.test.tsx::renders a settlement at the correct node and a road on its edge](../../../../web/src/board/BoardSVG.test.tsx#L80), then the feature preserves that observable behavior.
- Given the implementation under test, when renders a city with a filled body and small architectural details is exercised by [web/src/board/BoardSVG.test.tsx::renders a city with a filled body and small architectural details](../../../../web/src/board/BoardSVG.test.tsx#L93), then the feature preserves that observable behavior.
- Given the implementation under test, when renders clickable node targets for highlight Nodes and fires on Node Click is exercised by [web/src/board/BoardSVG.test.tsx::renders clickable node targets for highlightNodes and fires onNodeClick](../../../../web/src/board/BoardSVG.test.tsx#L110), then the feature preserves that observable behavior.
- Given the implementation under test, when renders clickable edge targets for highlight Edges and fires on Edge Click is exercised by [web/src/board/BoardSVG.test.tsx::renders clickable edge targets for highlightEdges and fires onEdgeClick](../../../../web/src/board/BoardSVG.test.tsx#L132), then the feature preserves that observable behavior.

## Coverage Gaps
- [web/src/board/pieces/BoardDefs.tsx](../../../../web/src/board/pieces/BoardDefs.tsx) has no mapped test file in the scanned corpus.
- [web/src/board/pieces/HexTile.tsx](../../../../web/src/board/pieces/HexTile.tsx) has no mapped test file in the scanned corpus.
- [web/src/board/pieces/Pieces.tsx](../../../../web/src/board/pieces/Pieces.tsx) has no mapped test file in the scanned corpus.
- [web/src/board/pieces/PortMarker.tsx](../../../../web/src/board/pieces/PortMarker.tsx) has no mapped test file in the scanned corpus.
- [web/src/board/pieces/ResourceMotif.tsx](../../../../web/src/board/pieces/ResourceMotif.tsx) has no mapped test file in the scanned corpus.
- [web/src/board/pieces/RobberPirate.tsx](../../../../web/src/board/pieces/RobberPirate.tsx) has no mapped test file in the scanned corpus.
- [web/src/board/pieces/TerrainTexture.tsx](../../../../web/src/board/pieces/TerrainTexture.tsx) has no mapped test file in the scanned corpus.
- [web/src/components/AppFrame.tsx](../../../../web/src/components/AppFrame.tsx) has no mapped test file in the scanned corpus.
- [web/src/components/Toast.tsx](../../../../web/src/components/Toast.tsx) has no mapped test file in the scanned corpus.
- [web/src/components/ck/CKPanel.tsx](../../../../web/src/components/ck/CKPanel.tsx) has no mapped test file in the scanned corpus.
- …and 6 more unmapped paths (see parts).

## Source Linkage Grounding

_Per-row confidence; `_unverified_` rows are disclosed, not verified; `0.08 (resolved, uncited)` is the resolved-but-uncited baseline, not measured evidence._

| Element | Doc Evidence | Code Evidence | Confidence |
|---------|--------------|---------------|-----------:|
| Coverage Map: web/src/board/BoardSVG.test.tsx |  | linkonly: web/src/board/BoardSVG.test.tsx | 0.08 (resolved, uncited) |
| Coverage Map: web/src/components/Button.test.tsx |  | linkonly: web/src/components/Button.test.tsx | 0.08 (resolved, uncited) |
| Coverage Map: web/src/components/Dialog.test.tsx |  | linkonly: web/src/components/Dialog.test.tsx | 0.08 (resolved, uncited) |
| Coverage Map: web/src/components/ck/ckCatalog.test.ts |  | linkonly: web/src/components/ck/ckCatalog.test.ts | 0.08 (resolved, uncited) |
| Coverage Map: web/src/components/newgame/NewGameDialog.test.tsx |  | linkonly: web/src/components/newgame/NewGameDialog.test.tsx | 0.08 (resolved, uncited) |
| Coverage Map: web/src/components/newgame/OptionField.test.tsx |  | linkonly: web/src/components/newgame/OptionField.test.tsx | 0.08 (resolved, uncited) |
| Coverage Map: web/src/map-editor/validation.test.ts | Tests for validation.ts — mirrors soc.server.CustomMapValidator rule-for-rule. | web/src/map-editor/validation.test.ts | 0.14 |
| Coverage Map: web/src/net/liveDiscovery.test.ts | @vitest-environment node | linkonly: web/src/net/liveDiscovery.test.ts | 0.08 (resolved, uncited) |
| Coverage Map: web/src/screens/DisconnectOverlay.test.tsx | Tests for the mid-game disconnect flow: when the WebSocket drops (status | web/src/screens/DisconnectOverlay.test.tsx | 0.51 |
| Coverage Map: web/src/screens/GameOverOverlay.test.tsx | Vitest render test for the game-over overlay (Phase 4). | linkonly: web/src/screens/GameOverOverlay.test.tsx | 0.08 (resolved, uncited) |
| Coverage Map: web/src/screens/GameRoom.test.tsx | Tests for the GameRoom's Start-game pending state: after clicking Start, the | linkonly: web/src/screens/GameRoom.test.tsx | 0.08 (resolved, uncited) |
| Coverage Map: web/src/screens/GameScreen.test.tsx | Render tests for the live in-game GameScreen: board, per-seat player panels | linkonly: web/src/screens/GameScreen.test.tsx | 0.08 (resolved, uncited) |
| Coverage Map: web/src/screens/GameScreenCK.test.tsx | Render tests for the Cities & Knights GameScreen additions: the C&K panel | linkonly: web/src/screens/GameScreenCK.test.tsx | 0.08 (resolved, uncited) |
| Coverage Map: web/src/screens/GameScreenInteractions.test.tsx | Render tests for the Phase-4 interaction UI on GameScreen: the trade panel | linkonly: web/src/screens/GameScreenInteractions.test.tsx | 0.08 (resolved, uncited) |
| Coverage Map: web/src/screens/LobbyScreen.test.tsx | Tests for LobbyScreen's surfacing of server-side rejections. A non-OK | linkonly: web/src/screens/LobbyScreen.test.tsx | 0.08 (resolved, uncited) |
| Coverage Map: web/src/screens/MapEditorScreen.test.tsx | Component test for the map editor screen (Phase 5). | linkonly: web/src/screens/MapEditorScreen.test.tsx | 0.08 (resolved, uncited) |
| Coverage Map: web/src/screens/SettingsScreen.test.tsx | Tests for SettingsScreen: it renders the labeled controls inside | linkonly: web/src/screens/SettingsScreen.test.tsx | 0.08 (resolved, uncited) |
| Acceptance Evidence: web/src/board/BoardSVG.test.tsx::renders the board-svg root with the expected hex count |  | linkonly: web/src/board/BoardSVG.test.tsx | 0.08 (resolved, uncited) |
| Coverage Gaps: web/src/board/pieces/BoardDefs.tsx | Hex kinds that get a gradient sheen, paired with their gradient id. */ | web/src/board/pieces/BoardDefs.tsx | 0.24 |
| Coverage Gaps: web/src/board/pieces/HexTile.tsx | Map a HexKind to its CSS-module fill class. */ | web/src/board/pieces/HexTile.tsx | 0.08 (resolved, uncited) |
| Coverage Gaps: web/src/board/pieces/Pieces.tsx | Owning player's color (hex/rgb string from the playerColors prop). */ | web/src/board/pieces/Pieces.tsx | 0.79 |
| Coverage Gaps: web/src/board/pieces/PortMarker.tsx | Port type 0 = misc 3:1; 1..5 = clay/ore/sheep/wheat/wood 2:1. */ | web/src/board/pieces/PortMarker.tsx | 0.24 |
| Coverage Gaps: web/src/board/pieces/ResourceMotif.tsx | Hex center pixel. */ | web/src/board/pieces/ResourceMotif.tsx | 0.75 |
| Coverage Gaps: web/src/board/pieces/RobberPirate.tsx | 0xRRCC hex coordinate the marker sits on. */ | web/src/board/pieces/RobberPirate.tsx | 0.36 |
| Coverage Gaps: web/src/board/pieces/TerrainTexture.tsx |  | web/src/board/pieces/TerrainTexture.tsx | 0.64 |
| Coverage Gaps: web/src/components/AppFrame.tsx | App title shown in the header. Defaults to "Sammy's Settlers". */ | linkonly: web/src/components/AppFrame.tsx | 0.08 (resolved, uncited) |
| Coverage Gaps: web/src/components/Toast.tsx | Auto-dismiss delay in ms. Use 0 to keep until dismissed. Default 5000. */ | web/src/components/Toast.tsx | 0.24 |
| Coverage Gaps: web/src/components/ck/CKPanel.tsx | Cities & Knights in-game UI: the local player's C&K panel (commodities, | web/src/components/ck/CKPanel.tsx | 0.72 |

## Unverified Areas

Parts of this document have limited verifiable source evidence — treat normative claims as unverified until confirmed. See [documentation conventions](../../documentation-conventions.md#unverified-areas).
