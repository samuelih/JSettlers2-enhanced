# Web client architecture

How the TypeScript/React web client talks to the unchanged Java `SOCServer`, and how
the pieces fit together. This is the design companion to
[`MIGRATION_SPEC.md`](MIGRATION_SPEC.md) (the decisions) and
[`protocol.md`](protocol.md) (the message-by-message wire reference). Read the spec
first if you want the *why*; this file is the *what and where*.

## Big picture

The web client replaces only the Swing front end. The Java server, game model
(`SOCGame`/`SOCPlayer`/`SOCBoardLarge`), robots, scenarios and custom-map loader are
authoritative and unchanged. The only Java change is an **additive WebSocket
listener** that runs beside the existing TCP listener.

```
┌──────────────────────── Browser (web/) ────────────────────────┐
│  React screens / SVG board / dialogs                            │
│        ▲ subscribe / dispatch actions                           │
│  ┌─────┴───────── Zustand stores ──────────────┐                │
│  │ gameStore (connection + lobby + game state) │                │
│  │ uiStore (active screen)  settingsStore       │                │
│  └─────▲───────────────────────────┬───────────┘                │
│        │ decoded SOCMessage         │ action senders            │
│  ┌─────┴───────── net/GameConnection ───────────┐               │
│  │ decode(frame) → dispatch    encode(msg)→send  │               │
│  └─────▲───────────────────────────┬─────────────┘               │
│        │  protocol/ codec (pure TS, ~67 messages)                │
└────────┼───────────────────────────┼────────────────────────────┘
         │  ws text frame             │  ws text frame
         │  (1 toCmd() string)        ▼  (1 toCmd() string)
┌────────┴────────────────────────────────────────────────────────┐
│  Java SOCServer  (soc.server.genericServer)                      │
│   WebSocketServerBridge  ──onMessage──▶ SOCMessage.toMsg(str)    │
│         │ onOpen → addConnection            │                    │
│         ▼                                    ▼                    │
│   WebSocketConnection (extends Connection)  inQueue / dispatch    │
│         │ put(str) → ws.send(str)                                │
│   ════ unchanged: SOCServer, SOCGame, soc.robot bots ════        │
└──────────────────────────────────────────────────────────────────┘
```

The same `SOCServer` also still serves the Swing client over TCP; the two transports
are independent and can run at once.

## Transport: WebSocket text frames

The defining decision (see `MIGRATION_SPEC.md` §2 and §4): **each WebSocket text
frame carries exactly one raw `SOCMessage.toCmd()` string — no length prefix, no
`writeUTF`.**

The Java TCP transport (`NetConnection`) wraps each command in
`DataOutputStream.writeUTF` (a 2-byte length prefix + modified UTF-8). The WebSocket
transport does **not**: WebSocket already provides message framing, so a frame *is* a
command. Concretely:

- **Server → client:** `WebSocketConnection.put(str)` calls `ws.send(str)`.
- **Client → server:** the bridge's `onMessage(ws, str)` calls
  `SOCMessage.toMsg(str)` and routes the result into the server.
- **TS client:** `socket.send(encode(msg))` out; `decode(frame.data)` in.

This means the TypeScript codec only ever produces/parses `toCmd()` strings — there
is no `writeUTF` emulation anywhere.

### Java side (`soc.server.genericServer`, new files)

Both classes live in `soc.server.genericServer` so they can reach the package-private
server internals (`inQueue`, `addConnection`, `removeConnection`,
`processFirstCommand`). They are additive: `Server.java`, `Connection.java` and
`NetConnection.java` are untouched.

- **`WebSocketConnection extends Connection`** — wraps one
  `org.java_websocket.WebSocket`. `put()` → `ws.send()` (synchronized, no-op if
  closing). It is *event-driven*: there is no per-connection reader thread, so
  `run()` is a no-op and `isInputAvailable()` always returns `false` (which makes the
  server set up its version-wait timer, exactly as desired). A `markRemoved()`
  compare-and-set guards against double-removal when both `onError` and `onClose`
  fire.
- **`WebSocketServerBridge extends org.java_websocket.server.WebSocketServer`** —
  - `onOpen`: build a `WebSocketConnection`, stash it on the socket via
    `ws.setAttachment(conn)`, then call `ourServer.addConnection(conn)`
    **synchronously**. `addConnection` runs `newConnection1/2`, which send the server
    greeting and create the per-connection `SOCClientData` that `onMessage` depends
    on. Java-WebSocket invokes `onOpen` before `onMessage` on a connection's single
    worker thread, so doing setup here serializes it correctly ahead of the first
    inbound frame.
  - `onMessage`: parse with `SOCMessage.toMsg(str)`; route the connection's **first**
    message through `processFirstCommand` (and stop if it handled it), otherwise push
    to `inQueue`. Tracks first-vs-later per connection via `conn.seenFirst`.
  - `onClose`/`onError`: `removeConnection` once (guarded). `onStart` logs
    `WebSocket listener started on port N`.
  - `setReuseAddr(true)` in the constructor mirrors the TCP listener so the port can
    be re-bound quickly after a restart.

### Server wiring & dependency

`SOCServer` reads `jsettlers.websocket.port` (constant
`PROP_JSETTLERS_WEBSOCKET_PORT`). When it is set and `> 0`, `SOCServer` constructs and
`.start()`s a `WebSocketServerBridge` on that port, in a `try/catch` so a WebSocket
failure (e.g. port in use) never kills the TCP server. The bind is asynchronous: a
failure is reported via the bridge's `onError(null, ex)`, and the real success line
comes from `onStart()`.

`build.gradle` adds `implementation 'org.java-websocket:Java-WebSocket:1.5.6'` (which
transitively pulls `slf4j-api`). The `serverJar`/`fullJar` manifests list both jars in
their `Class-Path` (so they must sit next to the jar at runtime), and a `runServer`
`JavaExec` task runs `SOCServer` on the full runtime classpath so Gradle supplies the
deps directly during development/E2E.

## Handshake

The connect sequence (verified against the live server, `protocol.md` §3):

1. Client opens the WebSocket. On open it does **not** send anything yet.
2. Server immediately sends its `SOCVersion` (then `SOCChannels`).
3. On the server's `SOCVersion`, the client replies with **its own** `SOCVersion`:
   vernum `2700`, verstr `2.7.00`, a **non-null** build (`"web"`), the feature list
   `;6pl;sb;sc=2700;`, and locale `en_US`. The non-null build is essential: Java
   `SOCVersion` throws if `build == null && feats != null`, and the server then drops
   the whole VERSION message, leaving the connection feature-limited.
4. The features (`6pl`, `sb`, `sc=<vers>`) stop the server from downgrading sea-board
   / 6-player / scenario options to `OTYPE_UNKNOWN`; `sc` equal to our own version
   also clears the limited-features flag entirely.
5. The server then sends the game list (`SOCGamesWithOptions`).
6. `SOCServerPing` frames are echoed straight back as keep-alive.

This lives in `net/GameConnection.ts` (`handleInbound`): version handshake and ping
echo happen *before* user handlers run, so the store always sees a fully handshaked
connection.

## TypeScript protocol codec (`src/protocol/`)

Pure TypeScript, no React — so it is exhaustively unit-testable in Vitest.

- **`SOCMessage.ts`** — the `SOCMessage` interface (`type` + `toCmd()`), a
  type-id → parser **registry**, and `encode`/`decode`. `decode(raw)` mirrors Java's
  `SOCMessage.toMsg(String)`: read the integer type id up to the first `SEP`, look up
  the parser, hand it the remaining data portion, and return `null` for an
  unknown/garbled frame (matching Java's "ignore unknown" behavior). Each message
  module calls `registerParser(type, parser)` to register itself.
- **`constants.ts`** — the wire tokens (`SEP='|'`, `SEP2=','`, `EMPTYSTR='\t'`,
  `GAME_NONE`), message type ids, and the game enums (`GameState`, resource/element
  types, dev-card constants, status values, option types).
- **`messages/*.ts`** — one module per `SOCMessage` subclass (~67), each documenting
  its Java source class and reproducing `toCmd()`/`parseDataStr()` exactly, including
  the quirky bits (leading-comma artifacts, `EMPTYSTR` handling, multi-message `SEP`
  grouping, special `(char)0`/`(char)1` text separators). Every module has a
  round-trip + known-wire-string test; many are cross-checked byte-for-byte against
  the live Java server. See `protocol.md` for the catalog and the documented
  subtleties.
- **`gameOptions.ts`** — the shared option descriptor model and the
  `serializeOptions`/`parseOptions` helpers used by the New Game dialog and the
  option-discovery flow.

## State: Zustand store (`src/store/`)

- **`gameStore.ts`** is the heart: it owns the `GameConnection`, subscribes to
  decoded messages, and reduces them into UI-facing state — connection status, server
  version, games list, discovered options/scenarios, the joined `CurrentGame` (board
  model, per-player views, the local hand, dev-card inventory, turn/phase, trade
  offers, robber/discard prompts, game log, final scores). It also exposes the
  **action senders** (`createGame`, `sitDown`, `startGame`, `rollDice`, `buildPiece`,
  `bankTrade`, `makeOffer`, `buyDevCard`, `playKnight`, `moveRobber`, `discard`, …)
  that encode and send the corresponding `SOCMessage`. Reducers are plain functions
  driven by protocol dispatch, so they unit-test without a socket.
- **`uiStore.ts`** tracks which top-level screen is active (lobby/game vs. the
  standalone map editor). `Root.tsx` is the router that reads connection status +
  game state + UI view to pick a screen.
- **`settingsStore.ts`** holds theme / color-blind mode / sound / render-quality /
  font-scale and reflects them onto `<html>` data-attributes + CSS vars; it is
  independent of the protocol.

## SVG board (`src/board/`)

The renderer targets the **large / sea board** (`SOCBoardLarge`), whose coordinates
are `0xRRCC` (row in the high byte, column in the low byte; hexes, nodes and edges
share one square `(row, col)` grid, `coord = (row << 8) | col`).

- **`boardModel.ts`** decodes the `SOCBoardLayout2` (typeId 1084) named layout parts
  — `LH` land hexes (coord/type/dice triples), `PL` ports (stored as three blocks:
  types, edges, facings), `RH` robber, `PH` pirate — into a `BoardModel`. Potential
  settlements come from `SOCPotentialSettlements` (1057).
- **`coords.ts`** is pure geometry ported from `SOCBoardLarge`/`SOCBoard` (topology:
  which nodes/edges touch which) and `SOCBoardPanel` (the linear pixel mapping
  `x = col·HALFDELTA_X`, `y = row·HALFDELTA_Y + TOP_MARGIN`, shared by hex centers,
  node corners and edge endpoints so pieces land exactly on hex corners). Hexes are
  pointy-top SVG polygons; nodes/edges are computed from the same mapping.
- **`BoardSVG.tsx` + `pieces/`** render hexes, ports, robber/pirate, and player
  pieces, and expose click targets (`data-testid="hex-…"/"node-…"/"edge-…"`) that the
  store turns into build/move/robber actions for the current phase.

## How to add a new message type or feature

**Adding a `SOCMessage` type** (port from Java):

1. Read the Java class's `toCmd()` and `parseDataStr()` (and note any subtlety —
   optional/`EMPTYSTR` fields, multi-message `SEP` grouping, special separators).
2. Add the type id (and any enums) to `protocol/constants.ts`.
3. Create `protocol/messages/SOCFoo.ts`: a class implementing `SOCMessage` with a
   faithful `toCmd()`, a parser, and a `registerParser(MessageType.FOO, parse)` call.
   Document the Java source class in the header.
4. Add a Vitest test: encode→decode→encode round-trip plus at least one
   known-wire-string fixture (ideally captured from the real Java class / live
   server). Record it in `protocol.md`.
5. Import the module so its `registerParser` runs (the message barrel pulls them in).

**Wiring it into the UI:** add a handler in `gameStore.ts` that reduces the decoded
message into state (and/or an action sender that encodes + sends it via the
`GameConnection`), then render the new state in the relevant screen/component.

**Adding a Java message type the server doesn't already speak** would also require
the corresponding server-side handler — but that is server work, unchanged by the
transport; the WebSocket bridge carries whatever `SOCMessage`s already flow.
