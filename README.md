cat > backend/Dockerfile <<'DOCK'
cd ~
mkdir -p projects
cd projects

# Create and run the setup script
cat > setup_platform_core.sh <<'EOF'
#!/usr/bin/env bash
set -euo pipefail

GITHUB_REPO_URL="https://github.com/asmglobal-cloud/platform-core.git"

echo "==> Creating platform-core project structure..."
mkdir -p platform-core/{backend,frontend,infra}
cd platform-core
git init

# ---- README ----
cat > README.md <<'MD'
# ASMglobal Platform Core
This repository contains the backend, frontend, and infrastructure setup for the ASMglobal cloud platform.
