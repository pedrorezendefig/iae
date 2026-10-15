# IAE: mapa do repositório

Este é o repositório dos sócios Pedro, Rib e Lucas para o projeto do IAE, a escola de prática jurídica para advogados in-house. Aqui mora o IAE OS (o painel que acompanha o trabalho), as skills do fluxo e, quando o código começar, a Plataforma de cursos. Este arquivo é o mapa: o que é cada pasta, por que existe, o que tem dentro e para que serve. Quem clona lê isto primeiro.

## Primeiro dia

1. Clone: `gh repo clone pedrorezendefig/iae`. Já tem o clone? `git pull --ff-only origin main`.
2. Ligue a trava da `main`, uma vez por clone: `git config core.hooksPath .githooks`.
3. Abra o Claude Code dentro da pasta e rode `/setup-maquina`. Ele confere a máquina e diz o conserto de cada item.
4. Rode `/ask-iae` para saber qual skill usar em cada momento. O passo a passo até o IAE OS aberto está em `docs/onboarding/dev.md`; o setup do Claude Code, em `docs/onboarding/claude-setup.md`.

## Como ler este mapa

A árvore de verdade é o disco: antes de responder sobre uma pasta, rode `ls` nela e confira. Pasta que o git conhece e não está na lista de cobertura no fim deste arquivo é sinal de que o mapa envelheceu: o teste `tools/test_docs_fluxo.py` reprova, e a correção é editar aqui no mesmo PR.

## A regra de uma frase

Tudo que está na árvore é código, doc viva ou decisão. Estado de trabalho fica nas GitHub Issues e em `docs/spec/deploy/*.json`, nunca em documento paralelo.

## Raiz

| Pasta ou arquivo | O que é | Por que existe | O que você acha dentro | Para que serve no dia a dia |
|---|---|---|---|---|
| `README.md` | Este mapa | Quem clona precisa saber o que é cada pasta sem perguntar | O que você está lendo | Primeiro dia; o `/setup-maquina --mapa` lê daqui |
| `CLAUDE.md` | Regras do repo para o agente | Mínimo que toda sessão precisa saber | Idioma, tipografia, trava da `main`, fluxo de trabalho, o que é proibido criar | Leia uma vez. O roteamento fino está no `/ask-iae` |
| `CONTEXT.md` | Glossário do projeto | Os sócios e o agente falam a mesma língua | Termos com definição e "evitar" (Sócio, Cliente, Ponte técnica, Plataforma de cursos, IAE OS) | Consultar antes de nomear qualquer coisa nova |
| `.claude/` | Skills e agentes do time, versionados | Quem clona recebe o fluxo inteiro | `skills/` (uma pasta por skill, com `SKILL.md` e, quando precisa, `references/` e `scripts/`) e `agents/` (`iae-implementador`, `iae-revisor`, `iae-corretor`, que a `/onda-enxuta` e o `/ship` disparam) | `/ask-iae` diz qual usar |
| `.githooks/` | Hooks de git do repo | O plano grátis do GitHub não protege a `main` de repo privado | `pre-push`, que recusa push direto na `main` | Ligar uma vez com `git config core.hooksPath .githooks` |
| `.github/` | CI e templates | Gates automáticos do `/ship` e formato único de issue e PR | `workflows/` (`ci.yml`, `lint-adr.yml`, `lint-skills.yml`, `higiene-issues.yml`) e `ISSUE_TEMPLATE/`, mais o `PULL_REQUEST_TEMPLATE.md` | Não se edita no dia a dia |
| `docs/` | Documentação viva | Ver seção abaixo | | |
| `tools/` | Ferramentas do repo | Lints do CI e o IAE OS | `lint_adr.py`, `lint_skills.py`, `checar_migration_repetida.py`, os testes `test_*.py` ao lado e `workflow-dashboard/` (o IAE OS, painel só de leitura das issues, dos PRs e do deploy) | `bash tools/workflow-dashboard/install-launchd.sh` e o painel em `http://localhost:8800` |

## `docs/`

| Pasta | O que é | Por que existe | O que tem | Quando abrir |
|---|---|---|---|---|
| `adr/` | Decisões de arquitetura e de processo | Decisão sem registro é rediscutida | `README.md` (índice por tema) e um `.md` por decisão, com `status` no frontmatter | Antes de propor mudança de regra. Só `accepted` vale |
| `agents/` | Protocolo do agente | Sessões paralelas precisam do mesmo contrato | `issue-tracker.md` (claim, worktrees, bloqueio, revisor), `triage-labels.md` (todas as labels do repo), `domain.md` (como ler glossário, ADRs e snapshots) | Ao pegar issue ou triar |
| `onboarding/` | Setup humano | Máquina nova | `dev.md` (do clone ao painel aberto, e o dia a dia), `claude-setup.md` (Claude Code, plugins e permissões) | Primeiro dia. O `/setup-maquina` confere o mesmo conteúdo |
| `spec/` | Contrato de deploy e mapa factual do app | O agente lê daqui, nunca de memória | `deploy/` (`project.json`, `state.json`, `history.json`; sem plataforma ainda) e `snapshots/` (rotas, tabelas e integrações, gerados pelo `/snapshot`; vazios até a plataforma ter código) | `/deploy status` e `/snapshot --check` |
| `comercial/` | Material comercial para o Cliente | O plano de ação proposto ao IAE e a pesquisa que o sustenta | `plano-de-acao/` (o prompt, a pesquisa em `saida/pesquisa/` e as páginas HTML geradas) e `dimensionamento-iae-ponte-tecnica.pdf` (o dimensionamento que a Ponte técnica fez, base da ADR 0002) | Ao conversar com o Cliente sobre escopo e preço. O IAE OS não lê esta pasta |
| `marca/` | Identidade visual do IAE | Telas e materiais precisam da marca certa | `manual-de-identidade-visual-iae.pdf` (o manual do Cliente) e referências de interface em imagem | Ao desenhar tela, PDF ou página com a marca do IAE |

Na raiz de `docs/`, o `STACK.md` lista a stack de hoje e a prevista. Peça nova na stack entra nele, no mesmo PR que a traz; o IAE OS mostra o arquivo na Documentação, sub-aba Stack.

## O fluxo, em uma linha por etapa

1. Ideia: `/grill-with-docs` afia contra `CONTEXT.md` e as ADRs. 2. `/to-prd` e `/to-issues` viram issues. 3. `/pegar-issue N` faz o claim e abre a branch. 4. `/tdd` escreve o teste primeiro. 5. `/ship` abre o PR, roda os gates e, com o PR verde, roda a subida (`fechar_onda.py`). 6. A subida mergeia pela API. O IAE ainda não tem deploy, então o caminho termina no merge.

## Cobertura (o teste `tools/test_docs_fluxo.py` confere esta lista)

Toda pasta de nível 1 e 2 que o git conhece precisa estar aqui. Pasta nova no repo: acrescente a linha e explique acima, no mesmo commit. O conteúdo de `.claude/skills/` e de `docs/adr/` fica fora da conferência, porque é descrito por padrão e não um a um.

<!-- cobertura:start -->
```
.claude
.claude/agents
.claude/skills
.githooks
.github
.github/ISSUE_TEMPLATE
.github/workflows
docs
docs/adr
docs/agents
docs/comercial
docs/marca
docs/onboarding
docs/spec
tools
tools/workflow-dashboard
```
<!-- cobertura:end -->

Não aparecem aqui, por não estarem no git: `.claude/worktrees/` (worktrees dos agentes), `.claude/settings.local.json` e os caches de ferramenta.
