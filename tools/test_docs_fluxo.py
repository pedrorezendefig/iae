"""Testes da documentação do fluxo (issue #6).

Cada teste trava um critério de aceite da issue: as labels documentadas são as
do repo, o onboarding leva do clone ao painel aberto, o README tem o mapa de
pastas no formato do Hospital e nenhum doc diz que o IAE já tem Coolify,
Vercel ou Manual.
"""

from __future__ import annotations

import re
from pathlib import Path

RAIZ = Path(__file__).resolve().parents[1]

# As labels do repo pedrorezendefig/iae em 2026-10-14 (`gh label list`).
# Label nova no GitHub entra aqui e em docs/agents/triage-labels.md juntas.
LABELS_DO_REPO = {
    "accessibility", "bug", "documentation", "duplicate", "enhancement", "good first issue",
    "help wanted", "invalid", "question", "wontfix",
    "needs-triage", "needs-info", "ready-for-agent", "ready-for-human", "in-progress", "revisor-comentou",
    "fatia:P", "fatia:M", "fatia:G",
    "type:feature", "type:fix", "type:chore", "type:refactor", "type:docs", "type:spec", "type:test",
    "area:backend", "area:frontend", "area:supabase", "area:infra", "area:docs", "area:skills", "area:spec",
    "area:video",
    "wayfinder:map", "wayfinder:research", "wayfinder:prototype", "wayfinder:grilling", "wayfinder:task",
}


def _labels_nas_tabelas(texto: str) -> set[str]:
    """Primeira célula de cada linha de tabela, quando ela é um código: é a label."""
    return set(re.findall(r"^\| `([^`]+)` \|", texto, re.M))


def test_triage_labels_lista_as_mesmas_labels_do_repo_com_area_video() -> None:
    texto = (RAIZ / "docs/agents/triage-labels.md").read_text(encoding="utf-8")
    assert _labels_nas_tabelas(texto) == LABELS_DO_REPO
