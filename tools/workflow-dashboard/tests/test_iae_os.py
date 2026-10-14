"""O que a cópia do Hospital OS muda para virar o IAE OS (issue #2, PRD #1).

Os outros arquivos desta pasta vieram do Hospital e guardam as asserções de
lá. Aqui ficam os critérios que só existem no IAE: o nome na tela, a paleta,
o repo de reserva, a pasta do app, o serviço na porta 8800 e os snapshots de
um projeto que ainda não tem app.
"""

import json
import re
import shutil
import sys
from pathlib import Path

DASH = Path(__file__).resolve().parents[1]
RAIZ = DASH.parents[1]
STATIC = DASH / "static"
APP_JS = (STATIC / "app.js").read_text(encoding="utf-8")

sys.path.insert(0, str(DASH))
import collect  # noqa: E402

ISSUE_DO_IAE = {
    "number": 2,
    "title": "IAE OS de pé: painel copiado e adaptado",
    "state": "OPEN",
    "labels": [{"name": "in-progress"}],
    "createdAt": "2026-10-14T18:00:00Z",
    "closedAt": None,
    "assignees": [{"login": "pedrorezendefig"}],
    "author": {"login": "pedrorezendefig"},
    "body": "## Pai\n\n#1\n",
    "url": "https://github.com/pedrorezendefig/iae/issues/2",
}
PAGINA_VAZIA = json.dumps(
    {"data": {"repository": {"issues": {"pageInfo": {"hasNextPage": False, "endCursor": None}, "nodes": []}}}}
)


def _texto_da_tela():
    """Tudo que o painel pode mostrar: a SPA inteira e o que o Python manda para ela.

    O style.css fica de fora: não tem texto que aparece na tela, e o comentário
    da linha 1 continua o do Hospital porque só o bloco :root muda."""
    arquivos = [p for p in STATIC.rglob("*")
                if p.is_file() and "vendor" not in p.parts and p.suffix != ".css"]
    arquivos += sorted(DASH.glob("*.py"))
    return {str(p.relative_to(DASH)): p.read_text(encoding="utf-8") for p in arquivos}


def test_rodape_diz_iae_os():
    assert "IAE OS · somente leitura" in APP_JS


def test_nenhum_texto_do_painel_cita_o_hospital():
    citam = sorted(nome for nome, texto in _texto_da_tela().items() if "hospital" in texto.lower())
    assert citam == []


# ---------- coleta: o repo de reserva é o do IAE ----------


def _gh_do_iae(chamadas):
    """gh e git falsos: o gh responde uma issue do IAE; o git não tem origin."""

    def run(cmd, cwd, timeout=None):
        chamadas.append(cmd)
        if cmd[0] == "git":
            raise RuntimeError("sem origin")
        if cmd[:3] == ["gh", "issue", "list"]:
            return json.dumps([ISSUE_DO_IAE])
        if cmd[:3] == ["gh", "pr", "list"]:
            return "[]"
        return PAGINA_VAZIA

    return run


def test_coleta_sem_repo_no_state_le_as_issues_do_iae(monkeypatch, tmp_path):
    # o state.json do IAE não tem bloco production: a coleta cai no repo de reserva
    (tmp_path / "docs" / "spec" / "deploy").mkdir(parents=True)
    for nome in ("state.json", "history.json", "project.json"):
        shutil.copy(RAIZ / "docs" / "spec" / "deploy" / nome, tmp_path / "docs" / "spec" / "deploy" / nome)
    chamadas = []
    monkeypatch.setattr(collect, "_run", _gh_do_iae(chamadas))

    data = collect.collect(tmp_path)

    assert data["github"]["error"] is None
    assert [i["number"] for i in data["github"]["issues"]] == [2]
    assert data["repo_slug"] == "pedrorezendefig/iae"
    assert data["repo_url"] == "https://github.com/pedrorezendefig/iae"
    graphql = [c for c in chamadas if c[:3] == ["gh", "api", "graphql"]]
    assert graphql, "a coleta não pediu sub-issues nem bloqueios"
    for c in graphql:
        assert "owner=pedrorezendefig" in c and "name=iae" in c, c


# ---------- paleta: só o :root muda, e o favicon segue ----------

CSS = (STATIC / "style.css").read_text(encoding="utf-8")
INDEX = (STATIC / "index.html").read_text(encoding="utf-8")


def _raiz():
    return re.search(r":root\{(.*?)\}", CSS, re.S).group(1)


def _token(nome):
    m = re.search(rf"--{nome}:\s*(#[0-9a-fA-F]{{6}})", _raiz())
    assert m, f"--{nome} fora do :root"
    return m.group(1).lower()


def test_paleta_navy_do_iae_no_root():
    assert (_token("brand"), _token("navy")) == ("#173a75", "#081a3a")
    # tints e sombras derivam do navy do IAE, não do navy do Hospital
    assert "rgba(15,47,99" not in _raiz()
    assert "--navy40:rgba(8,26,58,.40)" in _raiz()


def test_favicon_segue_a_paleta():
    fundo = re.search(r"%3Crect[^%]*fill='%23([0-9a-fA-F]{6})'", INDEX).group(1).lower()
    circulo = re.search(r"%3Ccircle[^%]*fill='%23([0-9a-fA-F]{6})'", INDEX).group(1).lower()
    assert ("#" + fundo, "#" + circulo) == (_token("navy"), _token("brand-light"))
