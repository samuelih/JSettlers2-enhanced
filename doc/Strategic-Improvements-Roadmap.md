# Strategic Improvements Roadmap

This roadmap collects larger Sammys-Settlers improvement goals which are too
large to treat as one code change. It is intentionally split by implementation
surface: Client/UI, Robot/AI, Architecture, Testing/Quality, and Persistence.

Status terms:

- **Shipped baseline**: Already present in the current tree.
- **Near-term**: Can be implemented without changing the wire protocol or game
  model contracts.
- **Medium-term**: Requires shared APIs, more tests, or protocol additions.
- **Long-term**: Requires architectural extraction, migration planning, or
  backward-compatibility design.

## 1. Client/UI Focus

The Java Swing client remains the full-featured supported client. The web client
under `web/` is a newer alternative front end, but it is not yet at parity with
the Swing client. Client/UI work should therefore improve the Swing client
without blocking the web client from continuing to mature.

### 1.1 Shipped baseline

- User Preferences dialog and registry:
  - Sound effects.
  - Bot trade auto-reject seconds.
  - Remembered face icon.
  - Hex graphics set.
  - Forced UI scale.
  - Smooth board drawing.
  - Board image scaling quality.
  - Color-blind assist mode.
  - UI font size.
- Board rendering quality:
  - Antialiasing preference.
  - Image interpolation preference.
  - Theme color files for hex graphics sets.
  - Dice-number circle image cache.
  - Solid-color UI remapping for color-blind assist modes.
- Board interaction:
  - Left-click confirm-to-build for roads, ships, settlements, and cities.
  - Existing right-click build menu remains available.
  - Build hotkeys for settlement, city, and development card where legal.
- Trade UX:
  - Bot trade auto-reject countdown is laid out on its own line.
  - Trade offer hotkeys remain available.
  - Existing offer/counter/accept/reject panels are still the source of truth.
  - The client player's trade composer summarizes selected give/get resources.
  - The trade composer previews bank/port eligibility using the player's current
    4:1 bank, 3:1 generic port, or 2:1 resource-port rate.
  - Incoming offer and counteroffer panels show compact human-readable summaries.
  - Counteroffers are prefilled from the original offer, mirrored from the
    client's point of view.
  - Counteroffers show a live compact delta against the original offer while
    the player edits.
- Event timeline:
  - `SOCPlayerInterface` now keeps a bounded event history independent of the
    shorter game text display.
  - Game text, reset notices, and connection-stop notices feed the timeline.
  - The timeline can be opened from the game-text context menu or with
    Ctrl/Cmd-T.
  - The timeline is a non-modal Swing frame with copy-all and close controls.
  - It has case-insensitive search with Previous/Next and match count.
  - Auto-scroll can be paused while reading older events; Latest jumps back to
    the end.
- Localization:
  - New timeline UI strings are in the base English client bundle.
  - Translated bundles fall back to the base bundle until translators add local
    strings.
  - `.properties` files remain ISO-8859-1 and are covered by the existing
    Python escape-validation test.

### 1.2 Modern Client Shell

Goal: make `SOCPlayerInterface` less monolithic while preserving the existing
Swing UI, layout behavior, and client compatibility.

Near-term goals:

- Extract small view components only when the ownership boundary is obvious:
  - Event timeline frame is now separate from `SOCPlayerInterface`.
  - Next candidates: game text/chat panel, in-game command input, game status
    strip, and board action prompt.
- Keep `SOCPlayerInterface` as the coordinator until the extracted panels have
  tests or obvious manual QA paths.
- Move context-menu setup out of the player interface once both game text and
  chat share a reusable helper with optional actions.
- Add explicit lifecycle hooks for non-modal child windows:
  - Statistics frame.
  - Event timeline frame.
  - Future replay/timeline inspectors.
- Document each UI child window's owner and close behavior.
- Avoid adding new protocol handling inside UI components; keep message
  interpretation in the existing client listener/message handler path.

Medium-term goals:

- Introduce a `GameWindowModel` or similarly small read-only adapter for UI
  panels that only need display state.
- Move game text/chat state into a small model with append, clear, export, and
  snapshot operations.
- Split player-interface layout decisions from event handling:
  - Layout manager computes rectangles.
  - UI panels own rendering and controls.
  - Player interface wires game state to panels.
- Make the Swing client friendlier to UI smoke tests by exposing stable
  component names for major controls.

Long-term goals:

- Convert the largest hand-built panels to smaller Swing containers where that
  reduces risk.
- Keep the Java 8 compatibility target unless the release branch explicitly
  changes it.
- Decide whether the Swing client remains indefinitely supported or becomes a
  compatibility client after the web client reaches parity.

### 1.3 Board Rendering Refresh

Goal: improve board legibility, resizing, and interaction feedback without
rewriting the coordinate system.

Shipped baseline:

- Board resizing and scaling already work through `SOCBoardPanel`.
- Rendering hints and color-blind assist are preference-driven.
- Theme files let a graphics set define colors outside Java code.
- Coordinate overlays already exist through `=*= showcoords`.

Near-term goals:

- Add a visible board zoom level indicator if users can control zoom directly.
- Add explicit keyboard commands for board zoom and reset-zoom if they do not
  conflict with existing shortcuts.
- Add a board panning affordance only if the board can exceed the visible panel.
- Make hover prompts more consistent between left-click build, right-click build,
  robber movement, pirate movement, and special-item placement.
- Add UI smoke coverage for board rendering:
  - Open a practice game.
  - Verify the board panel is non-empty.
  - Verify resize does not throw and still paints.
  - Verify showcoords toggles tooltip content.

Medium-term goals:

- Add optional high-DPI raster assets if the artifact size and asset pipeline are
  acceptable.
- Add a stable board screenshot test harness that can tolerate platform font and
  antialiasing differences.
- Convert more overlay drawing to named helper methods with deterministic inputs.
- Separate board geometry calculations from painting where feasible, so geometry
  can be unit-tested without AWT.

Deferred goals:

- Full vector board art.
- SVG rendering in the Swing client.
- Asynchronous rendering off the AWT event thread.
- Live dynamic DPI switching between displays.

### 1.4 Trade UX Overhaul

Goal: make player trades and bank/port trades easier to compare and less error
prone, while preserving the existing message flow.

Shipped baseline:

- Trade panels already show give/get resources and offer controls.
- Trade offer hotkeys already exist.
- Bot auto-reject countdown text no longer overlaps trade controls.
- The client hand panel summarizes the selected trade resources and shows
  bank/port hints before sending.
- Incoming offer and counteroffer panels summarize "they give/they get" or
  "you give/you get" in plain text.
- Counteroffers start from the original offer and show a live "Change" line
  while editing.
- The game text area announces trade offers and completed trades.
- The new event timeline gives players a separate place to review trade history.

Near-term goals:

- Preserve current validation through `SOCHandPanel` and server rejection; UI
  hints must not become a second source of truth.
- Add a "copy offer summary" action to the visible offer panel if it helps
  debugging and teaching.
- Add tests for resource-set summary formatting without involving Swing.
- Consider a larger side-by-side comparison panel only if the compact delta line
  is not enough in playtesting.

Medium-term goals:

- Add a trade comparison subpanel that remains stable across counteroffers.
- Show previous offer and current counteroffer side by side.
- Let players pin a trade offer while inspecting the board or hand panels.
- Add a "decline all visible bot offers" convenience action if multiple robot
  offers are common enough to justify it.

Long-term goals:

- Represent the trade UI with a small view model:
  - offerer.
  - recipient set.
  - give set.
  - get set.
  - legal action buttons.
  - countdown state.
- Use the same view model in Swing and web clients.
- Add accessibility labels and keyboard traversal across all trade controls.

### 1.5 Event Timeline Panel

Goal: make game events easy to scan during play and useful for debugging,
teaching, and future replay tooling.

Shipped baseline:

- The Swing client has a non-modal Event Timeline window.
- It is populated from existing game text paths in `SOCPlayerInterface`.
- It keeps up to 500 recent game-text lines, independent of the shorter visible
  `SnippingTextArea`.
- It is cleared when a board reset reconstructs the game UI.
- It is copied with one button for bug reports and manual review.

Near-term goals:

- Add optional filters:
  - trades.
  - builds.
  - dice/resource events.
  - robber/pirate.
  - system/reset/disconnect.
- Add timestamps from local receipt time, clearly marked as client-local.
- Include chat in a separate tab only if there is a clear user need; keep game
  events and chat separate by default.

Medium-term goals:

- Feed the timeline from structured client events, not only localized text.
- Add stable event categories so filtering is language-independent.
- Export timeline text and structured JSON.
- Link timeline entries to board highlights where possible.

Long-term goals:

- Build a replay viewer over `GameEventLog` and deterministic message/action
  logs.
- Let the timeline consume server-side recorded events when observing a replay.
- Reuse the timeline model in the web client.

### 1.6 Localization Tooling Polish

Goal: reduce i18n regressions without corrupting Java `.properties` files.

Shipped baseline:

- Client strings live in `src/main/resources/resources/strings/client/data*.properties`.
- Server-to-client strings live in
  `src/main/resources/resources/strings/server/toClient*.properties`.
- Java `.properties` files remain ISO-8859-1, not UTF-8.
- The existing Python i18n test checks placeholder strings for missing
  MessageFormat escaping.
- The Python i18n test compares translated keys against their base bundle:
  - argument indexes must match.
  - SoC-special placeholder types (`rsrcs`, `list`, `dcards`) must match.
  - locale-only obsolete keys are reported.
  - normal `MessageFormat` pluralization changes such as `number` versus
    `choice` are allowed.
- Timeline strings were added only to the base English bundle; locale-specific
  files fall back to base English until translated.

Near-term goals:

- Add a test that reports base keys missing in locale bundles, but keep it
  non-failing until translation coverage is intentionally enforced.
- Add a helper script to list untranslated keys by locale.
- Document the preferred workflow:
  - edit with PTE or ISO-8859-1-aware tooling.
  - run `gradle testPython`.
  - avoid manually converting whole files to UTF-8.

Medium-term goals:

- Add pseudolocalization to more UI smoke tests.
- Add maximum text-width checks for compact controls most likely to overflow.
- Add comments for new keys whose English text is not self-explanatory.

## 2. Robot / AI Improvements

The bot subsystem is first-class: bots connect through the same protocol as
human clients, and built-in bots run inside the server JVM. Robot improvements
should preserve that compatibility unless a new bridge is explicitly added.

### 2.1 Bot Tournament Harness

Goal: run many headless bot games and emit repeatable stats.

Shipped baseline:

- `jsettlers.bots.botgames.total` can run robot-only games.
- `jsettlers.bots.botgames.parallel` controls parallelism.
- `jsettlers.bots.botgames.shutdown=Y` can exit after bot games complete.
- Existing debug/data-check properties can catch resource-tracking problems.

Near-term goals:

- Emit machine-readable tournament summaries:
  - game count.
  - winner distribution.
  - average rounds.
  - average duration.
  - timeout count.
  - force-end-turn count.
  - bot exception count.
- Exit non-zero when a bot throws or a game hangs past configured limits.
- Capture seed, game options, board encoding, and bot class/profile per game.
- Add a command-line report mode that does not require a GUI observer.

Medium-term goals:

- Add ranking reports:
  - win rate.
  - average VP.
  - average resource production.
  - trade acceptance/rejection ratios.
  - longest-road/largest-army frequency.
- Add fixed-seed tournament files for regression comparisons.
- Add CSV and JSON output formats.

Long-term goals:

- Add league/tournament orchestration with multiple bot implementations.
- Add statistical significance helpers for strategy comparisons.
- Add optional replay archive generation for selected games.

### 2.2 Stronger Bot Brains

Goal: improve bot decisions while keeping the strategy code pluggable and
measurable.

Near-term goals:

- Define interfaces for pluggable evaluators:
  - initial settlement placement.
  - build-plan scoring.
  - robber targeting.
  - bank/port trade choice.
  - player-trade offer and acceptance.
- Add test fixtures around evaluator inputs and outputs.
- Keep the current heuristic as the default implementation.

Medium-term goals:

- Add alternate heuristic profiles for common strategies:
  - expansion-first.
  - city-first.
  - port-heavy.
  - road-pressure.
  - dev-card pressure.
- Add a bounded Monte Carlo or MCTS-style experiment behind a property flag.
- Instrument decision time so stronger bots cannot stall the game loop.

Long-term goals:

- Add learned or data-driven evaluators only after the tournament harness can
  compare them reliably.
- Keep bot logic deterministic under a fixed seed wherever possible.

### 2.3 Explainable Bots

Goal: let a developer or player inspect why a bot chose an action.

Shipped baseline:

- Debug commands like `:consider-move` and `:consider-target` already expose
  some location-specific bot reasoning.

Near-term goals:

- Add a `BotDecisionTrace` value object:
  - considered action.
  - score.
  - top contributing factors.
  - rejected alternatives.
  - elapsed decision time.
- Add debug output for the chosen build plan and the top alternatives.
- Keep traces disabled by default to avoid large logs.

Medium-term goals:

- Add timeline integration for bot explanations in practice/debug games.
- Add tournament sampling: store traces only for selected games or failures.

Long-term goals:

- Surface explainable bot hints to human players in a teaching/coach mode.

### 2.4 Bot Personality Profiles

Goal: make bot behavior varied and configurable.

Near-term goals:

- Add profile metadata:
  - display name.
  - strategy weights.
  - trade posture.
  - robber hostility.
  - expansion/city/dev-card preference.
- Allow profile selection by server property.
- Include profile names in bot-game/tournament summaries.

Medium-term goals:

- Add built-in profiles:
  - aggressive trader.
  - expansionist.
  - city-first.
  - port-heavy.
  - dev-card-focused.
  - robber-hostile.
  - robber-conservative.
- Let third-party bots expose profile names through `_EXT_BOT` or a future bot
  metadata message.

Long-term goals:

- Add profile-aware matchmaking or tournament brackets.

### 2.5 External Bot SDK

Goal: make third-party bots easier to build without depending on internal
server classes.

Shipped baseline:

- Bots use the same `SOCMessage` protocol as human clients.
- `soc.robot.sample3p` provides simple third-party bot examples.

Near-term goals:

- Write a bot SDK guide:
  - connection flow.
  - cookie/security expectations.
  - join/sit/start flow.
  - required messages.
  - version compatibility.
  - `_EXT_BOT` usage.
- Add compatibility tests for sample third-party bots.
- Add golden protocol fixtures for common bot flows.

Medium-term goals:

- Provide a small Java helper library with stable public APIs.
- Add a lightweight JSON bridge for non-Java bots while preserving the existing
  UTF protocol.

Long-term goals:

- Version the SDK separately from internal bot implementation details.

## 3. Architecture

Architecture work should reduce coupling around game rules, message dispatch,
and game options without destabilizing the deployed protocol.

### 3.1 Game Engine Extraction

Goal: separate pure game rules from server, network, and UI concerns.

Near-term goals:

- Identify `SOCGame` methods that are pure rule checks versus methods that
  directly coordinate messaging or side effects.
- Extract small immutable command/result types for high-value actions:
  - build road/ship.
  - build settlement/city.
  - roll dice.
  - move robber/pirate.
  - bank trade.
  - player trade acceptance.
- Add rule tests around extracted helpers before moving more code.

Medium-term goals:

- Create a rule-engine facade that can apply commands to a game model and return
  structured results.
- Keep server authoritative and message-compatible.
- Let client-side UI use rule helpers only for hints, never authority.

Long-term goals:

- Reuse the rule engine in deterministic replay tests, web UI hints, and bot
  simulations.

### 3.2 Actor-Style Game Loop

Goal: process each game's commands through a serialized queue to reduce
concurrency risk.

Near-term goals:

- Audit all per-game message handling paths for shared mutable state access.
- Document which thread owns game state today.
- Add assertions or debug checks for unexpected cross-thread mutation.

Medium-term goals:

- Add an optional per-game command queue behind a property flag.
- Start with a narrow command type and expand only after tests are stable.
- Measure bot-game throughput before and after.

Long-term goals:

- Make actor-style game processing the default if it proves simpler and safe.

### 3.3 Formal Protocol Spec

Goal: generate or maintain a clear protocol reference from `SOCMessage`
definitions.

Near-term goals:

- Inventory all message classes, type numbers, min versions, and parse/toCmd
  behavior.
- Add protocol doc generation for message names and IDs.
- Link generated docs from `doc/Message-Sequences-for-Game-Actions.md`.

Medium-term goals:

- Generate per-message examples where tests already have fixtures.
- Add version notes for fields added after initial message creation.

Long-term goals:

- Use the spec to keep Java, web, and external bot codecs aligned.

### 3.4 Protocol Compatibility Test Corpus

Goal: lock down wire strings for all message types and version edge cases.

Near-term goals:

- Expand `TestToCmdToStringParse` coverage where gaps exist.
- Store canonical golden strings for every message class.
- Include invalid/legacy examples for parser behavior.

Medium-term goals:

- Share fixtures with the web protocol tests.
- Add a corpus runner for third-party SDK implementations.

### 3.5 Optional Modern Transport

Goal: keep the existing UTF protocol while enabling web and tooling clients.

Shipped baseline:

- The current tree includes additive WebSocket server bridge classes.
- The web client uses WebSocket framing carrying raw `SOCMessage.toCmd()` text.

Near-term goals:

- Keep WebSocket disabled unless explicitly configured.
- Document deployment and security expectations.
- Add protocol compatibility tests over both TCP and WebSocket where feasible.

Medium-term goals:

- Add a small HTTP status endpoint only if operational tooling needs it.
- Add a JSON bridge for external tooling without replacing core messages.

Long-term goals:

- Revisit v3 protobuf/JSON ideas only with migration and compatibility plans.

### 3.6 Game Option Cleanup

Goal: make game options easier to validate, display, and extend.

Near-term goals:

- Add richer metadata:
  - dependencies.
  - conflicts.
  - UI group.
  - scenario owner.
  - validation hints.
- Add tests for option dependencies and conflicts.
- Keep keyname compatibility and the 8-character limit rules.

Medium-term goals:

- Split server-only option operations from common option metadata.
- Generate option UI grouping from metadata.

Long-term goals:

- Make third-party option registration less dependent on editing one central
  registry.

### 3.7 Plugin-Like Scenario System

Goal: let new scenarios register rules and metadata more cleanly.

Near-term goals:

- Document the current scenario registration path.
- Identify code paths that special-case scenario keys.
- Add test coverage before moving registration.

Medium-term goals:

- Add a scenario descriptor type:
  - key.
  - display strings.
  - required options.
  - special items.
  - board constraints.
  - optional setup hooks.

Long-term goals:

- Allow third-party or custom scenarios to register without core source edits,
  while preserving network compatibility.

## 4. Testing / Quality

Testing work should make large features safer to land in phases.

### 4.1 Property-Based Rule Tests

Goal: validate invariants over many generated game states.

Near-term goals:

- Start with pure or mostly pure invariants:
  - resource counts never go negative.
  - legal move checks reject occupied nodes/edges.
  - longest road remains consistent after builds.
  - largest army changes only with valid card play.
- Keep generators small and deterministic.

Medium-term goals:

- Add generated board scenarios.
- Add generated trade sequences.
- Add undo/replay invariants.

### 4.2 Deterministic Replay Tests

Goal: replay recorded logs and verify final state.

Shipped baseline:

- `GameEventLog` and `GameActionExtractor` provide a foundation for recorded
  events and action extraction.

Near-term goals:

- Define a minimal replay fixture format.
- Replay action logs through server/game code and compare final game state.
- Add tests for a few known short games.

Medium-term goals:

- Compare message-log replay with action-log replay.
- Use replay tests for bug reports and protocol changes.

### 4.3 Functional Test Speed Tiers

Goal: make CI and local testing easier to choose.

Near-term goals:

- Define fast smoke, medium integration, and long functional tiers.
- Document which Gradle tasks run which tiers.
- Keep long bot/tournament tests out of the default fast loop.

Medium-term goals:

- Add CI labels or job names matching those tiers.
- Add flaky-test quarantine rules and ownership.

### 4.4 CI Matrix

Goal: protect Java 8 compatibility while using modern JDKs for builds.

Near-term goals:

- Test Java 8 target compatibility.
- Compile and run tests on at least one modern JDK.
- Include Python test tasks.

Medium-term goals:

- Add OS variation only where UI or path behavior needs it.
- Add web client CI once the web surface is intended to stay green.

### 4.5 Gradle Wrapper

Goal: remove local Gradle version friction.

Near-term goals:

- Add Gradle wrapper for an agreed 6.9.x or 7.x version.
- Document wrapper use in AGENTS.md, CLAUDE.md, and developer docs.
- Keep compatibility with installed `gradle` where contributors prefer it.

### 4.6 Golden UI Smoke Tests

Goal: catch obvious client startup and interaction regressions.

Near-term goals:

- Start Swing client in a practice game under a headless-friendly harness where
  possible.
- Verify main window startup, create practice game, and first-turn controls.
- Add screenshot or component-state checks that tolerate platform differences.

Medium-term goals:

- Add board render smoke tests.
- Add trade panel smoke tests.
- Add event timeline smoke tests.

## 5. Persistence

Persistence work should move saved games from debug/admin workflows toward
normal user-facing features, while preserving optional DB behavior.

### 5.1 First-Class Saved Games

Shipped baseline:

- Server debug/admin commands support `*SAVEGAME*`, `*LOADGAME*`, and
  `*RESUMEGAME*` for supported games.

Near-term goals:

- Document which scenarios and states can be saved.
- Add normal UI affordances for practice-game save/load.
- Preserve current JSON format compatibility.
- Improve error messages for missing GSON or unsupported scenario state.

Medium-term goals:

- Add a saved-game browser.
- Add autosave for practice games.
- Add deterministic replay metadata to saves.

Long-term goals:

- Support all shipped scenarios, including Cities & Knights state.

### 5.2 Account/Profile System Refresh

Goal: keep accounts optional while making profiles useful.

Near-term goals:

- Audit existing DB-backed account/stat code.
- Separate local client preferences from server account stats in docs.
- Add optional profile stats that do not require DB setup for casual play.

Medium-term goals:

- Add achievements or milestones only if they do not distort gameplay.
- Add ranked/unranked distinction if persistent stats become user-facing.

### 5.3 Schema Migration Discipline

Goal: keep DB support vendor-neutral and testable.

Near-term goals:

- Continue editing SQL templates, not generated vendor SQL.
- Add clearer migration tests for `SOCDBHelper.upgradeSchema()`.
- Document each schema version and supported upgrade path.

Medium-term goals:

- Introduce explicit migration files if they can remain vendor-neutral.
- Add fixture DBs for MySQL/PostgreSQL/SQLite where practical.

### 5.4 Portable Game Archive Format

Goal: bundle everything needed for replay, debugging, and sharing.

Near-term goals:

- Define archive contents:
  - savegame JSON.
  - message log.
  - action log.
  - game options.
  - board seed/layout.
  - server/client versions.
  - player/bot metadata.
- Add a manifest file with format version.

Medium-term goals:

- Add export/import commands.
- Add anonymization options for public bug reports.

Long-term goals:

- Use archives as fixtures for replay tests and UI replay tools.

## 6. Suggested Execution Order

The following sequence keeps the riskiest architecture changes behind
verification and gives the client visible improvements early:

1. Finish Client/UI event timeline polish:
   - filters.
   - client-local timestamps.
   - UI smoke tests.
2. Add localization validation helpers:
   - placeholder parity.
   - untranslated-key report.
   - pseudolocale smoke coverage.
3. Add protocol compatibility corpus:
   - complete golden strings.
   - share fixtures with web tests.
4. Add bot tournament reporting:
   - machine-readable summaries.
   - non-zero failure exit.
   - fixed-seed run mode.
5. Add deterministic replay tests:
   - short action-log fixtures.
   - final-state comparison.
6. Extract narrow rule helpers:
   - begin with bank trade and build legality.
   - test before moving side effects.
7. Improve trade UX:
   - copyable offer summaries.
   - playtest compact counteroffer delta display.
   - structured trade view model.
8. Add first-class practice-game save/load UI.
9. Add bot evaluator interfaces and first personality profiles.
10. Revisit actor-style game loop behind a property flag.

## 7. Definition of Done for Large Improvements

A significant feature or refactor should normally include:

- Code integrated through existing package boundaries.
- Javadocs with `@since` on new public/package-visible fields and methods.
- Unit tests for pure logic or formatting.
- Functional or manual QA notes for UI behavior.
- Protocol compatibility tests if messages change.
- Documentation updates:
  - `doc/Versions.md` for user-visible changes.
  - `doc/Readme.developer.md` for contributor-facing architecture.
  - focused docs such as this roadmap when a feature spans workstreams.
- No silent changes to generated SQL scripts; edit templates instead.
- No UTF-8 conversion of Java `.properties` files.
