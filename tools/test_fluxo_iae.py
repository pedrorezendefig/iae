"""Testes da adaptação do fluxo de entrega ao IAE (issue #5).

O motor das ondas veio do Hospital (PR #10). Estes testes travam o que muda
aqui: os agentes da onda com o nome do IAE, nenhum script apontando para a
pasta do app do Hospital, e a subida terminando no merge enquanto o
`docs/spec/deploy/project.json` não tiver plataforma.
"""

from __future__ import annotations

import re
from pathlib import Path

RAIZ = Path(__file__).resolve().parents[1]
AGENTES = RAIZ / ".claude" / "agents"


def test_agentes_da_onda_tem_o_nome_do_iae_e_nenhum_e_do_hospital() -> None:
    nomes = sorted(p.stem for p in AGENTES.glob("*.md"))
    assert {"iae-implementador", "iae-revisor", "iae-corretor"} <= set(nomes)
    assert not [n for n in nomes if n.startswith("hr-")]
    for papel in ("implementador", "revisor", "corretor"):
        cabecalho = (AGENTES / f"iae-{papel}.md").read_text(encoding="utf-8").split("---")[1]
        assert re.search(rf"^name: iae-{papel}$", cabecalho, re.M)


def test_quem_dispara_os_agentes_chama_pelo_nome_novo() -> None:
    velho = re.compile(r"\bhr-(implementador|revisor|corretor\b|\*)")
    citam = [str(p.relative_to(RAIZ)) for p in _textos((".claude", ".github", "docs/agents"))
             if velho.search(p.read_text(encoding="utf-8", errors="replace"))]
    assert citam == []


def test_lente_de_seguranca_do_revisor_protege_dado_de_aluno() -> None:
    revisor = (AGENTES / "iae-revisor.md").read_text(encoding="utf-8")
    assert "dado de aluno exposto" in revisor
    assert "dado de outro aluno" in revisor
    assert not re.search(r"paciente|Facilitador", revisor)


def test_nenhum_script_aponta_para_a_pasta_do_app_do_hospital() -> None:
    pasta_do_hospital = "hospital" + "-reunioes"  # partido para este arquivo não se acusar
    citam = [str(p.relative_to(RAIZ)) for p in _textos((".claude", "tools", ".github"), (".py", ".sh", ".yml"))
             if pasta_do_hospital in p.read_text(encoding="utf-8", errors="replace")]
    assert citam == []


def _textos(pastas, sufixos=(".md", ".py", ".sh", ".yml", ".txt")):
    """Arquivos de texto do repositório, sem os worktrees de agente que moram
    dentro de `.claude/worktrees/` na árvore principal."""
    for pasta in pastas:
        for p in (RAIZ / pasta).rglob("*"):
            if p.is_file() and p.suffix in sufixos and "worktrees" not in p.relative_to(RAIZ).parts:
                yield p
