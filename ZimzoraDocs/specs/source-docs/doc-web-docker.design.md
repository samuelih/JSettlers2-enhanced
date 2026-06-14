---
id: source-docs.doc-web-docker
type: DESIGN
tenant-id: 019ec5a4-5e07-7341-98b8-45f59e05fe07
scope: sgd:codelens/64c51e15-af55-50cd-8d03-12b24fb09071/source-docs
owner: codelens-agent
last-verified:
visibility: subtree
freshness-window-days: 14
source-doc: doc/Web-Docker.md
references:
  - ../../../doc/Web-Docker.md
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

# Source Doc Redocumentation: Web Docker Deployment

## Overview
This deterministic SGD record represents one source markdown document discovered during Stage 0. It preserves the source path, section map, and bounded digest so the generated corpus can prove that the input document was seen and carried forward. It is not a ratified replacement for the source file; unresolved claims remain obligations for deeper synthesis or human review.

## Source Document
- [doc/Web-Docker.md](../../../doc/Web-Docker.md)

## Section Inventory
- H1 Web Docker Deployment
- H2 Build
- H2 Run On A Server
- H2 How Other Players Join

## Content Digest
````markdown
# Web Docker Deployment

The web client can run from one Docker image together with the Java
`SOCServer`. The image serves the React/Vite build on HTTP port `8080`, starts
the Java server on TCP port `8880`, and enables the browser WebSocket listener
on port `8888`.

## Build

```bash
docker build -t sammys-settlers-web .
```

Or use Compose:

```bash
docker compose up --build -d
```

## Run On A Server

```bash
docker run -d \
  --name sammys-settlers \
  -p 8080:8080 \
  -p 8888:8888 \
  -p 8880:8880 \
  -e JS_BOTS=7 \
  -e JS_MAX_CONNECTIONS=50 \
  sammys-settlers-web
```

Open inbound firewall ports:

- `8080/tcp` for the web app.
- `8888/tcp` for browser WebSocket connections.
- `8880/tcp` only if you also want desktop Java clients to connect directly.

## How Other Players Join

Give players the server URL, for example:

```text
http://your-server.example.com:8080
```

On the web client's connect screen they should enter:

```text
Host: your-server.example.com
Port: 8888
```

After connecting, one player creates a game in the lobby. The others join that
same game from the lobby, then sit in open seats. Built-in bots fill empty seats
when the game starts.

For an HTTPS site, terminate TLS in a reverse proxy and make sure WebSocket
upgrade traffic reaches the container's port `8888`. The current web client
opens `ws://HOST:PORT` from the Connect screen, so serve the web app over HTTP
for now or add `wss://` support before requiring HTTPS-only hosting.
````

## Redocumentation Obligations
- Preserve this source document's claims in a generated feature, design, architecture, gateway, testplan, or invariant record before treating the corpus as a full semantic replacement for the original docs tree.
- Reconcile any conflict between this digest and direct source-code evidence through the source-truth audit, not by repeating doc-only claims as implemented behavior.

## Source Linkage
- [doc/Web-Docker.md](../../../doc/Web-Docker.md)
