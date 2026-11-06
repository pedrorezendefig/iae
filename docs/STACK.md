# Stack

O que o projeto usa hoje e o que está previsto para a Plataforma de cursos. Peça nova na stack entra aqui, no mesmo PR que a traz. A Página do Projeto do IAE no PedroOS mostra este arquivo na Documentação, sub-aba Stack.

## Hoje: ferramentas do repo

| Peça | Para que serve |
|---|---|
| Python 3.12 | os lints de `tools/` e os scripts das skills |
| `gh` (GitHub CLI) | issues, PRs e a subida das skills do fluxo |
| GitHub Actions | o CI dos PRs (testes de `tools/` e o lint de texto) |
| pytest e Node | os testes de `tools/`; o Node roda nos testes o script do `higiene-issues.yml` |

## Prevista: Plataforma de cursos

Nada desta lista existe ainda. É a stack prevista, e cada peça entra na tabela de cima quando o primeiro PR com ela for mergeado.

| Peça | Papel previsto |
|---|---|
| Next.js | o site dos alunos e a área de administração (previsto) |
| FastAPI | a API: matrículas, progresso, permissões e webhooks (previsto) |
| Postgres | o banco de alunos, matrículas, progresso e metadados das aulas (previsto) |
| Coolify em VPS Hostinger | o deploy dos três serviços acima (previsto; ainda não há deploy) |
