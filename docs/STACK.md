# Stack

O que o projeto usa hoje e o que está previsto para a Plataforma de cursos. Peça nova na stack entra aqui, no mesmo PR que a traz. O IAE OS mostra este arquivo na Documentação, sub-aba Stack.

## Hoje: IAE OS

| Peça | Para que serve |
|---|---|
| Python 3.12, só a biblioteca padrão | o coletor e o servidor do painel (`tools/workflow-dashboard/`), sem dependências para instalar |
| HTML, CSS e JavaScript sem build | o front do painel, servido como arquivos estáticos; o `marked` vem copiado em `static/vendor/` |
| `gh` (GitHub CLI) | a fonte dos dados do painel: issues, PRs e comentários |
| GitHub Actions | o CI dos PRs (testes de `tools/` e o lint de texto) |
| pytest e Node | os testes do painel; o Node roda o `app.js` de verdade nos testes |

## Prevista: Plataforma de cursos

Nada desta lista existe ainda. É a stack prevista, e cada peça entra na tabela de cima quando o primeiro PR com ela for mergeado.

| Peça | Papel previsto |
|---|---|
| Next.js | o site dos alunos e a área de administração (previsto) |
| FastAPI | a API: matrículas, progresso, permissões e webhooks (previsto) |
| Postgres | o banco de alunos, matrículas, progresso e metadados das aulas (previsto) |
| Coolify em VPS Hostinger | o deploy dos três serviços acima (previsto; ainda não há deploy) |
