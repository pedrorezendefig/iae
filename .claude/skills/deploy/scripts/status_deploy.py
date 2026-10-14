#!/usr/bin/env python3
"""status_deploy.py: o `/deploy status` do IAE (issue #5).

O IAE ainda não tem deploy. A plataforma existe quando o
`docs/spec/deploy/project.json` lista algum serviço em `services`: é a lista
que a subida (`onda-enxuta/scripts/fechar_onda.py`) constrói, confere no
health e registra. Sem serviço, a subida termina no merge, e este script diz
isso.
"""

from __future__ import annotations


def tem_plataforma(projeto: dict) -> bool:
    """True quando o project.json tem algum serviço para a subida levar ao ar."""
    return bool(projeto.get("services"))
