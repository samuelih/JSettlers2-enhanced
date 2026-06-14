#!/usr/bin/env bash
# Validate an exported .map.json against the REAL Sammys-Settlers Java custom-map validator.
#
# This is the round-trip proof for the web map editor (Phase 5): a .map.json produced by the
# TypeScript editor is fed through the actual soc.server.CustomMapLoader /
# soc.server.CustomMapValidator pipeline (the same code the live server uses), via a tiny
# standalone CLI (web/scripts/MapValidateCLI.java).
#
# Usage:
#   web/scripts/validate-map.sh <path-to.map.json>
#
# Exit codes: 0 = VALID, 1 = INVALID (validation/parse failure or missing file), 2 = setup error.
#
# Requires the project to have been compiled at least once so build/classes + build/resources exist:
#   JAVA_HOME=/opt/homebrew/opt/openjdk@17 gradle compileJava processResources copyRuntimeLibs
# Set JS_SERVER_CLASSPATH to a colon-separated runtime classpath to bypass build/runtime-libs.
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$REPO_ROOT"

if [ $# -ne 1 ]; then
  echo "Usage: web/scripts/validate-map.sh <path-to.map.json>" >&2
  exit 2
fi
MAP_JSON="$1"

JAVA_BIN="${JAVA_BIN:-/opt/homebrew/opt/openjdk@17/bin/java}"
if ! [ -x "$JAVA_BIN" ]; then JAVA_BIN="$(command -v java)"; fi
JAVAC_BIN="${JAVAC_BIN:-/opt/homebrew/opt/openjdk@17/bin/javac}"
if ! [ -x "$JAVAC_BIN" ]; then JAVAC_BIN="$(command -v javac)"; fi

MAIN_CLASSES="build/classes/java/main"
MAIN_RES="build/resources/main"
RUNTIME_LIB_DIR="build/runtime-libs"
if [ ! -d "$MAIN_CLASSES" ] || [ ! -d "$MAIN_RES" ]; then
  echo "Compiled classes/resources not found under build/." >&2
  echo "Run: JAVA_HOME=/opt/homebrew/opt/openjdk@17 gradle compileJava processResources copyRuntimeLibs" >&2
  exit 2
fi

runtime_classpath() {
  if [ -n "${JS_SERVER_CLASSPATH:-}" ]; then
    printf '%s\n' "$JS_SERVER_CLASSPATH"
    return
  fi

  local runtime_jars=("$RUNTIME_LIB_DIR"/*.jar)
  if [ ! -e "${runtime_jars[0]}" ]; then
    echo "Runtime jars not found in $RUNTIME_LIB_DIR." >&2
    echo "Run: JAVA_HOME=/opt/homebrew/opt/openjdk@17 gradle copyRuntimeLibs" >&2
    echo "Or set JS_SERVER_CLASSPATH to a colon-separated runtime classpath." >&2
    exit 2
  fi

  printf '%s\n' "$RUNTIME_LIB_DIR/*"
}

RUNTIME_CP="$(runtime_classpath)"

# Compile the standalone CLI on demand (only when its source is newer than the .class, or no .class).
SCRIPTS_DIR="web/scripts"
CLI_SRC="$SCRIPTS_DIR/MapValidateCLI.java"
CLI_OUT="$SCRIPTS_DIR/.classes"
CLI_CLASS="$CLI_OUT/MapValidateCLI.class"
if [ ! -f "$CLI_CLASS" ] || [ "$CLI_SRC" -nt "$CLI_CLASS" ]; then
  mkdir -p "$CLI_OUT"
  "$JAVAC_BIN" -cp "$MAIN_CLASSES:$RUNTIME_CP" -d "$CLI_OUT" "$CLI_SRC"
fi

# Classpath: CLI classes, compiled server classes/resources, and copied runtime jars.
CP="$CLI_OUT:$MAIN_CLASSES:$MAIN_RES:$RUNTIME_CP"

set +e
OUTPUT="$("$JAVA_BIN" -cp "$CP" MapValidateCLI "$MAP_JSON")"
STATUS=$?
set -e

echo "$OUTPUT"
exit "$STATUS"
