# Product

<!-- impeccable:product-schema 1 -->

Este registro vale só para o IAE OS. A Plataforma de cursos terá o próprio PRODUCT.md quando o código dela começar.

## Platform

web

## Users

Os três Sócios (Pedro, Rib e Lucas). Eles abrem o painel na própria máquina, várias vezes por dia, para saber em que pé está o trabalho: quais issues estão pendentes e em que fase, quais PRs estão parados, o que já foi mergeado e o que a documentação viva diz. Ninguém do Cliente usa o painel.

## Product Purpose

O IAE OS mostra o andamento do projeto do IAE num lugar só, a partir do GitHub e dos arquivos do clone. Ele responde rápido "o que está pendente, com quem e há quanto tempo" sem abrir o GitHub aba por aba. Sucesso é o Sócio entender o estado do trabalho em segundos e achar a regra ou a decisão que procura sem sair do painel.

## Positioning

- Visão de fluxo: cada issue aparece na fase do fluxo do time (Triagem, Fila, Bloqueada, Em andamento, PR aberto, Mergeada, Em produção, Humana, Encerrada sem PR), na árvore PRD para fatias, com o desenho das ondas. O GitHub não mostra isso.
- Docs vivos ao lado do trabalho: fluxo de trabalho desenhado, mapa da app, ADRs por tema, glossário e stack na mesma janela das issues e dos PRs.
- Local e só leitura: roda na máquina do Sócio, em `127.0.0.1`, lê o `gh` e os JSONs de `docs/spec/deploy/`, não guarda nada e nunca escreve na working tree.

## Operating Context

- Servido pelo `serve.py` (Python, só stdlib). Como serviço do macOS fica em `http://localhost:8800`; rodada manual em `http://localhost:8765`. O `--fixture dados.json` dá um render repetível.
- Quatro abas, uma fonte por aba: Issues (home), PRs, Produção e Documentação (sub-pills Fluxo, Mapa, Decisões, Glossário e Stack).
- Aba, item aberto e filtros vivem no hash da URL; copiar a URL volta ao mesmo ponto.
- Usado ao lado do terminal e do Claude Code, durante o fluxo `/pegar-issue`, `/ship` e `/onda-enxuta`.

## Capabilities and Constraints

- Somente leitura. Nada no painel deriva de arquivo o que o GitHub já diz.
- Front em HTML, CSS e JavaScript sem build, servido como arquivos estáticos. O `marked` vem copiado em `static/vendor/`. Diagramas são desenhados pelo `diagramas.js`, sem mermaid.js.
- A fase da issue é calculada no `fases.py`; o front só desenha.
- Sem métrica por pessoa e sem lead time individual.
- Cada pessoa tem uma cor própria, usada em filtros, raias e chips.
- Ainda não existe deploy: a aba Produção mostra que não há deploy e a subida termina no merge.
- O IAE OS é uma cópia solta do Hospital OS (ADR 0001). Os dois evoluem separados; o Hospital OS roda ao lado na porta 8799.

## Brand Commitments

- Nome: IAE OS. Evitar "dashboard" e "Hospital OS" para se referir a ele (`CONTEXT.md`).
- Todo texto de tela em pt-BR, direto e funcional.
- Sem travessão nem meia-risca em nenhum texto.

## Evidence on Hand

- Dados reais vêm do GitHub do repositório `pedrorezendefig/iae` e de `docs/spec/deploy/*.json`.
- Docs exibidos: `docs/adr/`, `CONTEXT.md`, `docs/STACK.md`, `docs/spec/snapshots/` (vazio até a plataforma ter código) e `static/fluxo.json`.

## Product Principles

1. Estado em segundos: a primeira tela responde o que está pendente e com quem.
2. Uma fonte por informação: o painel mostra, o GitHub e os arquivos do clone decidem.
3. Tudo navegável por link: cada aba, card e filtro tem endereço.
4. Ferramenta interna dos Sócios: densidade e clareza valem mais que vitrine.
