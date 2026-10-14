#!/usr/bin/env bash
# Abre uma sessão nova do Claude Code com o prompt do plano de ação do IAE
# em modo ultracode (multiagente). Uso:
#   bash rodar.sh          # pede permissão a cada edição fora do acceptEdits
#   bash rodar.sh --afk    # sem prompts de permissão (deixa rodar sozinho)
set -euo pipefail

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$DIR"

mkdir -p saida/pesquisa

# Repositório git próprio: o Workflow e o /code-review ultra gostam de git,
# e o HTML final fica versionado.
if [ ! -d .git ]; then
  git init -q
  printf 'saida/pesquisa/*.tmp\n.DS_Store\n' > .gitignore
  git add -A && git commit -qm "chore: prompt e launcher do plano de ação IAE" || true
fi

MODE="acceptEdits"
if [ "${1:-}" = "--afk" ]; then
  MODE="bypassPermissions"
fi

PROMPT="ultracode

$(cat PROMPT.md)"

echo "Pasta: $DIR"
echo "Modo:  $MODE"
echo "Saída: $DIR/saida/plano-de-acao-iae.html"
echo

exec claude --permission-mode "$MODE" "$PROMPT"
