# Web Hosting and Docker Deployment

This document explains how to run the Sammys-Settlers browser client for
friends, including a private Tailscale setup.

The web version is not a separate game server and does not require the old
JavaScript client. The current architecture is:

```text
Browser web client (web/, TypeScript/React)
  -> WebSocket text frames, one SOCMessage command per frame
  -> Java SOCServer
  -> existing game rules, lobby, robots, scenarios, and custom-map validation
```

The browser client replaces only the Swing front end. The Java `SOCServer`
remains authoritative.

## Ports

The Docker image starts both the static web server and the Java game server.

| Port | Purpose | Who needs it |
| ---- | ------- | ------------ |
| `8080/tcp` | Web page served by nginx | Browser players |
| `8888/tcp` | WebSocket listener for browser games | Browser players |
| `8880/tcp` | Classic TCP listener for Java desktop clients | Only desktop Java players |

If all players use the browser, `8080` and `8888` are enough.

## Recommended: Docker Compose

From the repository root:

```bash
docker compose up --build -d
```

This builds the Java server JAR, builds the React/Vite web app, starts nginx on
port `8080`, starts the normal Java TCP listener on `8880`, and enables the
browser WebSocket listener on `8888`.

Check logs:

```bash
docker compose logs -f sammys-settlers-web
```

You should see the Java server start and a line like:

```text
WebSocket listener started on port 8888
```

Stop it:

```bash
docker compose down
```

## Docker Without Compose

```bash
docker build -t sammys-settlers-web .

docker run -d \
  --name sammys-settlers \
  -p 8080:8080 \
  -p 8888:8888 \
  -p 8880:8880 \
  -e JS_BOTS=7 \
  -e JS_MAX_CONNECTIONS=50 \
  sammys-settlers-web
```

Useful environment variables:

| Variable | Default | Meaning |
| -------- | ------- | ------- |
| `JS_WEB_PORT` | `8080` | nginx HTTP port inside the container |
| `JS_WS_PORT` | `8888` | Java WebSocket listener port |
| `JS_TCP_PORT` | `8880` | Java desktop-client TCP listener port |
| `JS_BOTS` | `7` | built-in robot players to start |
| `JS_MAX_CONNECTIONS` | `50` | maximum server connections |
| `JAVA_OPTS` | empty | JVM options, before `-jar` |
| `JS_EXTRA_ARGS` | empty | extra `SOCServer` program arguments |

For a public server, do not enable the `debug` user. The development helper
`web/scripts/start-test-server.sh` intentionally enables debug access for
automated tests and deterministic local playthroughs.

## Hosting Over Tailscale

Tailscale is the simplest private hosting path because players do not need
router port-forwarding or public firewall rules.

1. Install and log in to Tailscale on the server.
2. Make sure each player is on the same tailnet, or share the server through
   Tailscale device sharing.
3. Start the container with Docker Compose:

   ```bash
   docker compose up --build -d
   ```

4. Find the server's Tailscale name or IP:

   ```bash
   tailscale status
   tailscale ip -4
   ```

5. Give browser players these values:

   ```text
   Open: http://SERVER-TAILSCALE-NAME:8080
   Host: SERVER-TAILSCALE-NAME
   Port: 8888
   ```

   The host field must be the server's Tailscale name or Tailscale IP. Do not
   tell players to use `localhost`; in their browser, `localhost` means their
   own computer.

With MagicDNS enabled, a name like `sammybox` or `sammybox.tailnet-name.ts.net`
usually works. If DNS is not working, use the `100.x.y.z` Tailscale IPv4
address from `tailscale ip -4`.

### Keep It Tailscale-Only

The checked-in `docker-compose.yml` publishes ports on all host interfaces. On a
home machine behind NAT this is usually still private unless you also forward
router ports. On a VPS, those ports may be reachable publicly if the host
firewall allows them.

For a private-only VPS deployment, either restrict the host firewall to the
Tailscale interface or bind Docker ports to the Tailscale IP:

```yaml
services:
  sammys-settlers-web:
    build: .
    image: sammys-settlers-web:local
    ports:
      - "100.x.y.z:8080:8080"
      - "100.x.y.z:8888:8888"
      - "100.x.y.z:8880:8880"
    environment:
      JS_BOTS: "7"
      JS_MAX_CONNECTIONS: "50"
```

Replace `100.x.y.z` with the server's Tailscale IPv4 address.

## Public Internet Hosting

For public HTTP hosting, open inbound firewall or cloud security-group ports:

- `8080/tcp` for the web page, unless a reverse proxy maps it to `80`.
- `8888/tcp` for browser WebSocket connections.
- `8880/tcp` only if Java desktop clients should connect directly.

Players then use:

```text
Open: http://your-server.example.com:8080
Host: your-server.example.com
Port: 8888
```

If hosting from home without Tailscale, forward `8080` and `8888` from the
router to the machine running Docker. Forward `8880` only for Java desktop
clients.

## HTTPS and Reverse Proxies

The current browser client opens WebSockets with:

```text
ws://HOST:PORT
```

That means plain HTTP hosting works, including HTTP over Tailscale. An
HTTPS-only site usually will not work yet, because browsers block a plain
`ws://` socket from an `https://` page.

The Docker nginx config already contains a `/ws` reverse-proxy location, but
the current client does not use that path. Before requiring HTTPS-only hosting,
change the web client to support either:

- `wss://HOST:PORT` for direct secure WebSocket connections, or
- a same-origin WebSocket path such as `/ws`, using `ws://` on HTTP pages and
  `wss://` on HTTPS pages.

Until that is implemented, prefer:

- Tailscale private HTTP: `http://server-tailnet-name:8080`
- Public HTTP with direct WebSocket port `8888`

## Manual Source Checkout

Docker is preferred for hosting. For development or a manual server, build the
Java project and web client separately:

```bash
gradle assemble

cd web
npm install
npm run build
cd ..
```

Start the Java server with the WebSocket listener:

```bash
gradle runServer \
  -Djsettlers.websocket.port=8888 \
  -Djsettlers.startrobots=7 \
  -PsocArgs='8880 50'
```

Serve the built web files:

```bash
python3 -m http.server 8080 --directory web/dist
```

Players open `http://SERVER:8080` and connect to host `SERVER`, port `8888`.

For local development only, you can instead use:

```bash
web/scripts/start-test-server.sh

cd web
npm run dev
```

Then open `http://localhost:5173` and connect to host `localhost`, port `8888`.
Do not use `web/scripts/start-test-server.sh` for public hosting because it
enables the debug user.

## Common Problems

### The page loads but Connect fails

Check that the WebSocket port is reachable from the player's machine:

- The player entered the server hostname, not `localhost`.
- Port `8888` is published by Docker.
- The host firewall allows `8888/tcp`.
- On Tailscale, the player is connected to the same tailnet and can reach the
  server's Tailscale name or IP.

### The browser says mixed content or security error

The page was probably served over HTTPS while the client tried to open
`ws://HOST:PORT`. Serve over HTTP for now, or implement `wss://` /
same-origin `/ws` support in the web client.

### The lobby works but no bots join

Check `JS_BOTS` in Docker or `jsettlers.startrobots` in manual startup. The
default Docker value is `7`.

### Java desktop clients cannot connect

Desktop Java clients use the classic TCP port, usually `8880`, not the browser
WebSocket port. Publish and allow `8880/tcp`, then connect the desktop client to
host `SERVER`, port `8880`.
