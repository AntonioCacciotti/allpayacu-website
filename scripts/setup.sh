#!/usr/bin/env bash
#
# setup.sh — bootstrap all dependencies for the Allpayacu Next.js project.
#
# Idempotent: safe to re-run. Skips work that's already satisfied.
#   - Installs nvm (pinned version) if missing
#   - Installs/selects the Node.js version this project needs (via .nvmrc)
#   - Installs npm dependencies only if package-lock.json changed since last run
#
# NOTE: on a machine with no Node/npm at all, you can't run this via
# 'npm run setup' the first time (npm doesn't exist yet to run it).
# Run it directly instead:  ./scripts/setup.sh
# Once Node/npm exist, 'npm run setup' works for all subsequent re-runs.
#
# Usage:
#   ./scripts/setup.sh            # normal run
#   ./scripts/setup.sh --force    # force a clean dependency reinstall
#   ./scripts/setup.sh --ci       # non-interactive, npm ci semantics only (no fallback to npm install)
#
set -euo pipefail
IFS=$'\n\t'

# ── config ────────────────────────────────────────────────────────────────
NVM_VERSION="v0.39.7"                # pinned, not "latest" — reproducible installs
DEFAULT_NODE_VERSION="20"            # used if no .nvmrc is present
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
HASH_FILE="$PROJECT_ROOT/node_modules/.install-hash"
START_TIME=$SECONDS

FORCE=0
CI_MODE=0
for arg in "$@"; do
  case "$arg" in
    --force) FORCE=1 ;;
    --ci) CI_MODE=1 ;;
    -h|--help)
      grep '^#' "$0" | sed 's/^#//'
      exit 0
      ;;
    *)
      echo "Unknown option: $arg" >&2
      exit 1
      ;;
  esac
done

# ── logging ──────────────────────────────────────────────────────────────
if [[ -t 1 ]]; then
  C_INFO='\033[0;36m'; C_OK='\033[0;32m'; C_WARN='\033[0;33m'; C_ERR='\033[0;31m'; C_STEP='\033[1;35m'; C_DIM='\033[2m'; C_RESET='\033[0m'
else
  C_INFO=''; C_OK=''; C_WARN=''; C_ERR=''; C_STEP=''; C_DIM=''; C_RESET=''
fi
log_info()  { printf "%b[INFO]%b  %s\n"  "$C_INFO" "$C_RESET" "$1"; }
log_ok()    { printf "%b[OK]%b    %s\n"  "$C_OK"   "$C_RESET" "$1"; }
log_warn()  { printf "%b[WARN]%b  %s\n"  "$C_WARN" "$C_RESET" "$1"; }
log_err()   { printf "%b[ERROR]%b %s\n"  "$C_ERR"  "$C_RESET" "$1" >&2; }
log_dim()   { printf "%b         %s%b\n" "$C_DIM" "$1" "$C_RESET"; }

TOTAL_STEPS=3
STEP_NUM=0
step() {
  STEP_NUM=$((STEP_NUM + 1))
  printf "\n%b── Step %d/%d: %s ──%b\n" "$C_STEP" "$STEP_NUM" "$TOTAL_STEPS" "$1" "$C_RESET"
}

elapsed() { echo "$(( SECONDS - START_TIME ))s"; }

on_error() {
  log_err "setup failed at line $1 (after $(elapsed)). See output above for details."
  exit 1
}
trap 'on_error $LINENO' ERR

# ── OS guard ─────────────────────────────────────────────────────────────
log_info "Detected OS: $(uname -s) ($(uname -m))"
case "$(uname -s)" in
  Linux|Darwin) : ;;
  *)
    log_err "Unsupported OS: $(uname -s). Run this from WSL, Linux, or macOS."
    exit 1
    ;;
esac

# ── nvm ──────────────────────────────────────────────────────────────────
export NVM_DIR="${NVM_DIR:-$HOME/.nvm}"

load_nvm() {
  if [[ -s "$NVM_DIR/nvm.sh" ]]; then
    # nvm.sh isn't written to be sourced under 'set -euo pipefail' — it has
    # benign internal non-zero returns that would otherwise abort us here.
    set +euo pipefail
    # shellcheck disable=SC1091
    \. "$NVM_DIR/nvm.sh"
    set -euo pipefail
  fi
}

ensure_nvm() {
  log_info "Checking for an existing nvm installation at $NVM_DIR..."
  load_nvm
  if command -v nvm >/dev/null 2>&1; then
    log_ok "nvm already installed ($(nvm --version))"
    return
  fi

  log_warn "nvm not found"
  log_info "Downloading nvm $NVM_VERSION installer from GitHub..."
  log_dim "curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/${NVM_VERSION}/install.sh | bash"
  curl -o- "https://raw.githubusercontent.com/nvm-sh/nvm/${NVM_VERSION}/install.sh" | bash
  log_info "nvm installer finished — loading nvm into this shell..."
  load_nvm

  if ! command -v nvm >/dev/null 2>&1; then
    log_err "nvm install completed but 'nvm' is still not available in this shell."
    log_err "Open a new terminal (or 'source ~/.bashrc') and re-run this script."
    exit 1
  fi
  log_ok "nvm $NVM_VERSION installed"
}

# ── Node.js ──────────────────────────────────────────────────────────────
ensure_node() {
  local wanted_version
  if [[ -f "$PROJECT_ROOT/.nvmrc" ]]; then
    wanted_version="$(tr -d '[:space:]' < "$PROJECT_ROOT/.nvmrc")"
    log_info "Target Node version from .nvmrc: $wanted_version"
  else
    wanted_version="$DEFAULT_NODE_VERSION"
    log_warn "No .nvmrc found — defaulting to Node $wanted_version"
  fi

  if command -v nvm >/dev/null 2>&1; then
    log_info "Checking whether Node $wanted_version is already installed via nvm..."
    if nvm ls "$wanted_version" >/dev/null 2>&1 && [[ "$(nvm ls "$wanted_version" 2>/dev/null | grep -c 'N/A')" -eq 0 ]]; then
      log_ok "Node $wanted_version already installed"
    else
      log_info "Node $wanted_version not installed — downloading and installing (this can take a minute)..."
      log_dim "nvm install $wanted_version"
      nvm install "$wanted_version"
      log_ok "Node $wanted_version installed"
    fi
    log_info "Activating Node $wanted_version for this shell..."
    nvm use "$wanted_version" >/dev/null
  elif command -v node >/dev/null 2>&1; then
    log_warn "nvm unavailable; using system Node $(node -v) instead"
  else
    log_err "Neither nvm nor a system Node.js installation was found."
    exit 1
  fi

  if ! command -v node >/dev/null 2>&1 || ! command -v npm >/dev/null 2>&1; then
    log_err "node/npm still not on PATH after setup — aborting."
    exit 1
  fi

  local major
  major="$(node -v | sed 's/^v//' | cut -d. -f1)"
  if (( major < 18 )); then
    log_err "Node $(node -v) is too old — Next.js 14 requires Node >=18.17. Re-run with a newer .nvmrc value."
    exit 1
  fi

  log_ok "Using Node $(node -v) / npm $(npm -v) ($(command -v node))"
}

# ── npm dependencies (idempotent) ───────────────────────────────────────
install_dependencies() {
  cd "$PROJECT_ROOT"
  log_info "Project root: $PROJECT_ROOT"

  if [[ ! -f package.json ]]; then
    log_err "package.json not found in $PROJECT_ROOT"
    exit 1
  fi

  local pkg_count
  pkg_count="$(node -e "const p=require('./package.json'); console.log(Object.keys({...p.dependencies,...p.devDependencies}).length)" 2>/dev/null || echo '?')"
  log_info "package.json declares $pkg_count direct dependencies"

  local current_hash=""
  if [[ -f package-lock.json ]]; then
    log_info "Hashing package-lock.json to check if a reinstall is needed..."
    current_hash="$(sha256sum package-lock.json | awk '{print $1}')"
    log_dim "current:  ${current_hash:0:12}..."
    if [[ -f "$HASH_FILE" ]]; then
      log_dim "recorded: $(cut -c1-12 "$HASH_FILE")..."
    else
      log_dim "recorded: (none — first install)"
    fi
  else
    log_warn "No package-lock.json present"
  fi

  if [[ "$FORCE" -eq 0 && -d node_modules && -f "$HASH_FILE" && -n "$current_hash" && "$(cat "$HASH_FILE")" == "$current_hash" ]]; then
    log_ok "Dependencies already up to date — skipping install"
    log_dim "node_modules size: $(du -sh node_modules 2>/dev/null | cut -f1)"
    return
  fi

  if [[ "$FORCE" -eq 1 ]]; then
    log_info "--force passed — removing existing node_modules for a clean reinstall"
    rm -rf node_modules
  fi

  if [[ -f package-lock.json ]]; then
    log_info "Running 'npm ci' (deterministic install matching package-lock.json)..."
    log_dim "this may take a while on first run — npm's own progress will print below"
    npm ci
  elif [[ "$CI_MODE" -eq 1 ]]; then
    log_err "--ci requested but no package-lock.json is present."
    exit 1
  else
    log_warn "Falling back to 'npm install' (no lockfile to pin versions)"
    npm install
  fi

  mkdir -p node_modules
  echo "$current_hash" > "$HASH_FILE"
  log_ok "Dependencies installed — node_modules size: $(du -sh node_modules 2>/dev/null | cut -f1)"
}

# ── main ─────────────────────────────────────────────────────────────────
main() {
  log_info "Bootstrapping Allpayacu Next.js project in $PROJECT_ROOT"

  step "Ensuring nvm is installed"
  ensure_nvm

  step "Ensuring the required Node.js version is active"
  ensure_node

  step "Installing npm dependencies"
  install_dependencies

  printf "\n%b── Summary ──%b\n" "$C_STEP" "$C_RESET"
  log_ok "Node:    $(node -v)"
  log_ok "npm:     $(npm -v)"
  log_ok "Time:    $(elapsed)"
  log_ok "Setup complete. Run 'npm run dev' to start the dev server."
}

main
