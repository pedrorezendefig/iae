"""Testes do fluxo do GitHub do IAE (issue #3).

O passo "Lint travessão" do `.github/workflows/ci.yml` roda aqui como roda no
CI: o `run:` do passo é lido do YAML e executado num diretório temporário que
imita o repositório. Os caracteres proibidos entram por escape para não existir
literal neste arquivo.
"""

from __future__ import annotations

import subprocess
from pathlib import Path

import yaml

RAIZ = Path(__file__).resolve().parent.parent
CI = RAIZ / ".github" / "workflows" / "ci.yml"
TRAVESSAO = "—"
MEIA_RISCA = "–"


def _passo_travessao() -> str:
    ci = yaml.safe_load(CI.read_text(encoding="utf-8"))
    for job in ci["jobs"].values():
        for passo in job["steps"]:
            if passo.get("name") == "Lint travessão":
                return passo["run"]
    raise AssertionError("ci.yml sem o passo 'Lint travessão'")


def _rodar_lint(repo: Path) -> subprocess.CompletedProcess[str]:
    return subprocess.run(
        ["bash", "-e", "-c", _passo_travessao()],
        cwd=repo,
        check=False,
        capture_output=True,
        text=True,
    )


def _repo_limpo(tmp_path: Path) -> Path:
    (tmp_path / "docs" / "adr").mkdir(parents=True)
    (tmp_path / "docs" / "adr" / "0001-x.md").write_text("ok, sem traço\n")
    (tmp_path / "CLAUDE.md").write_text("regras\n")
    (tmp_path / "CONTEXT.md").write_text("glossário\n")
    return tmp_path


def test_repo_sem_travessao_passa_no_lint(tmp_path: Path) -> None:
    assert _rodar_lint(_repo_limpo(tmp_path)).returncode == 0


def test_travessao_em_qualquer_pasta_de_docs_fica_vermelho(tmp_path: Path) -> None:
    repo = _repo_limpo(tmp_path)
    (repo / "docs" / "agents").mkdir()
    (repo / "docs" / "agents" / "x.md").write_text(f"a {TRAVESSAO} b\n")
    assert _rodar_lint(repo).returncode != 0


def test_meia_risca_no_readme_fica_vermelho(tmp_path: Path) -> None:
    repo = _repo_limpo(tmp_path)
    (repo / "README.md").write_text(f"1{MEIA_RISCA}2\n")
    assert _rodar_lint(repo).returncode != 0


def test_travessao_numa_skill_fica_vermelho(tmp_path: Path) -> None:
    repo = _repo_limpo(tmp_path)
    (repo / ".claude" / "skills" / "x").mkdir(parents=True)
    (repo / ".claude" / "skills" / "x" / "SKILL.md").write_text(f"a {TRAVESSAO} b\n")
    assert _rodar_lint(repo).returncode != 0


def test_repo_real_passa_no_lint() -> None:
    assert _rodar_lint(RAIZ).returncode == 0, _rodar_lint(RAIZ).stdout
