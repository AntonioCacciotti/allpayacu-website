#!/usr/bin/env bash
#
# server.sh — start/stop the Allpayacu Next.js server.
#
# Usage:
#   ./scripts/server.sh start                 # dev server, foreground (Ctrl+C to stop)
#   ./scripts/server.sh start --background     # dev server, detached
#   ./scripts/server.sh start -d --prod        # production build + start, detached
#   ./scripts/server.sh stop                   # stop the detached server
#   ./scripts/server.sh restart --background
#   ./scripts/server.sh status
#
# Options:
#   -d, --background   run detached; returns immediately, logs to .run/server.log
#       --prod          run 'next build && next start' instead of 'next dev'
#   -p, --port <n>      port to bind (default 3000)
#
# Runs 'next' directly from node_modules/.bin (not via 'npm run dev') so the
# PID we track is the actual server process — killing it is then reliable,
# instead of hoping a signal propagates through an npm wrapper process.
#
set -euo pipefail
IFS=$'\n\t'

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
RUN_DIR="$PROJECT_ROOT/.run"
PID_FILE="$RUN_DIR/server.pid"
LOG_FILE="$RUN_DIR/server.log"

PORT=3000
MODE="dev"
BACKGROUND=0

# ── logging ──────────────────────────────────────────────────────────────
if [[ -t 1 ]]; then
  C_INFO='\033[0;36m'; C_OK='\033[0;32m'; C_WARN='\033[0;33m'; C_ERR='\033[0;31m'; C_DIM='\033[2m'; C_RESET='\033[0m'
else
  C_INFO=''; C_OK=''; C_WARN=''; C_ERR=''; C_DIM=''; C_RESET=''
fi
log_info() { printf "%b[INFO]%b  %s\n" "$C_INFO" "$C_RESET" "$1"; }
log_ok()   { printf "%b[OK]%b    %s\n" "$C_OK"   "$C_RESET" "$1"; }
log_warn() { printf "%b[WARN]%b  %s\n" "$C_WARN" "$C_RESET" "$1"; }
log_err()  { printf "%b[ERROR]%b %s\n" "$C_ERR"  "$C_RESET" "$1" >&2; }
log_dim()  { printf "%b         %s%b\n" "$C_DIM" "$1" "$C_RESET"; }

usage() { grep '^#' "$0" | sed 's/^#//'; }

# ── args ─────────────────────────────────────────────────────────────────
COMMAND="${1:-start}"
[[ $# -gt 0 ]] && shift

while [[ $# -gt 0 ]]; do
  case "$1" in
    -d|--background) BACKGROUND=1; shift ;;
    --prod) MODE="prod"; shift ;;
    -p|--port) PORT="$2"; shift 2 ;;
    -h|--help) usage; exit 0 ;;
    *) log_err "Unknown option: $1"; usage; exit 1 ;;
  esac
done

# ── nvm / node ───────────────────────────────────────────────────────────
export NVM_DIR="${NVM_DIR:-$HOME/.nvm}"
load_nvm() {
  if [[ -s "$NVM_DIR/nvm.sh" ]]; then
    # nvm.sh isn't 'set -e' safe to source — relax around it, same as setup.sh
    set +euo pipefail
    # shellcheck disable=SC1091
    \. "$NVM_DIR/nvm.sh"
    set -euo pipefail
  fi
}

ensure_node() {
  load_nvm
  if command -v nvm >/dev/null 2>&1 && [[ -f "$PROJECT_ROOT/.nvmrc" ]]; then
    nvm use "$(tr -d '[:space:]' < "$PROJECT_ROOT/.nvmrc")" >/dev/null
  fi
  if ! command -v node >/dev/null 2>&1; then
    log_err "node not found on PATH. Run 'npm run setup' (or './scripts/setup.sh') first."
    exit 1
  fi
}

# ── process helpers ──────────────────────────────────────────────────────
is_running() {
  [[ -f "$PID_FILE" ]] || return 1
  local pid
  pid="$(cat "$PID_FILE")"
  [[ -n "$pid" ]] && kill -0 "$pid" 2>/dev/null
}

# ── commands ─────────────────────────────────────────────────────────────
do_start() {
  ensure_node

  if is_running; then
    log_warn "Server already running (PID $(cat "$PID_FILE")) — use 'restart' or 'stop' first"
    exit 0
  fi

  local bin="$PROJECT_ROOT/node_modules/.bin/next"
  if [[ ! -x "$bin" ]]; then
    log_err "next binary not found at $bin — run 'npm run setup' first"
    exit 1
  fi

  mkdir -p "$RUN_DIR"

  local run_cmd
  if [[ "$MODE" == "prod" ]]; then
    log_info "Building production bundle ('next build')..."
    "$bin" build
    run_cmd=("$bin" start -p "$PORT")
    log_info "Starting production server on port $PORT..."
  else
    run_cmd=("$bin" dev -p "$PORT")
    log_info "Starting dev server on port $PORT..."
  fi

  if [[ "$BACKGROUND" -eq 1 ]]; then
    : > "$LOG_FILE"
    nohup "${run_cmd[@]}" >> "$LOG_FILE" 2>&1 &
    local pid=$!
    disown "$pid" 2>/dev/null || true
    echo "$pid" > "$PID_FILE"

    log_info "Waiting for the process to come up..."
    local ok=0
    for _ in 1 2 3 4 5; do
      sleep 1
      if kill -0 "$pid" 2>/dev/null; then ok=1; break; fi
    done

    if [[ "$ok" -eq 1 ]]; then
      log_ok "Server running in background — PID $pid, port $PORT"
      log_dim "Logs: tail -f $LOG_FILE"
      log_dim "Stop: ./scripts/server.sh stop"
    else
      log_err "Server exited immediately — see $LOG_FILE"
      rm -f "$PID_FILE"
      exit 1
    fi
  else
    log_info "Running in foreground on port $PORT — Ctrl+C to stop"
    exec "${run_cmd[@]}"
  fi
}

do_stop() {
  if ! is_running; then
    log_warn "No running server found"
    rm -f "$PID_FILE"
    return
  fi

  local pid
  pid="$(cat "$PID_FILE")"
  log_info "Stopping server (PID $pid, SIGTERM)..."
  kill -TERM "$pid" 2>/dev/null || true

  local stopped=0
  for _ in 1 2 3 4 5; do
    kill -0 "$pid" 2>/dev/null || { stopped=1; break; }
    sleep 1
  done

  if [[ "$stopped" -eq 0 ]]; then
    log_warn "Still running after 5s — sending SIGKILL"
    kill -KILL "$pid" 2>/dev/null || true
  fi

  rm -f "$PID_FILE"
  log_ok "Server stopped"
}

do_status() {
  if is_running; then
    log_ok "Running — PID $(cat "$PID_FILE")"
    log_dim "Logs: $LOG_FILE"
  else
    log_info "Not running"
  fi
}

case "$COMMAND" in
  start) do_start ;;
  stop) do_stop ;;
  restart)
    do_stop
    BACKGROUND=1
    do_start
    ;;
  status) do_status ;;
  -h|--help) usage ;;
  *)
    log_err "Unknown command: $COMMAND"
    usage
    exit 1
    ;;
esac
