# syntax=docker/dockerfile:1

FROM gradle:7.6.4-jdk17 AS java-build

WORKDIR /workspace
COPY settings.gradle build.gradle ./
COPY src ./src

RUN gradle --no-daemon serverJar copyRuntimeLibs \
    && mkdir -p build/docker-server \
    && cp build/libs/Sammys-SettlersServer-*.jar build/docker-server/Sammys-SettlersServer.jar \
    && cp build/runtime-libs/*.jar build/docker-server/

FROM node:20-bookworm-slim AS web-build

WORKDIR /workspace/web
COPY web/package*.json ./
RUN npm ci
COPY web ./
RUN npm run build

FROM eclipse-temurin:17-jre-jammy

RUN apt-get update \
    && apt-get install -y --no-install-recommends nginx-light gettext-base ca-certificates \
    && rm -rf /var/lib/apt/lists/* \
    && rm -f /etc/nginx/sites-enabled/default

COPY --from=java-build /workspace/build/docker-server/ /app/server/
COPY --from=web-build /workspace/web/dist/ /usr/share/nginx/html/
COPY docker/nginx.conf.template /etc/nginx/templates/jsettlers.conf.template
COPY docker/entrypoint.sh /usr/local/bin/jsettlers-entrypoint

RUN chmod +x /usr/local/bin/jsettlers-entrypoint

ENV JS_WEB_PORT=8080 \
    JS_TCP_PORT=8880 \
    JS_WS_PORT=8888 \
    JS_BOTS=7 \
    JS_MAX_CONNECTIONS=50

EXPOSE 8080 8888 8880

ENTRYPOINT ["jsettlers-entrypoint"]
