---
status: accepted
---

# Código e banco em inglês, telas e docs em pt-BR

O `CLAUDE.md` manda tudo em pt-BR, e isso vale para o que o time lê: issues, PRs, ADRs, telas e mensagens. Para o código da Plataforma de cursos (nomes de tabelas, colunas, classes, rotas e variáveis) escolhemos inglês: `course`, `lesson`, `video`, `enrollment`, `lesson_progress`. Bibliotecas, exemplos e agentes de código trabalham melhor assim, e nomes de tabela são caros de mudar. O glossário em `CONTEXT.md` é a ponte: cada termo em pt-BR tem o nome em inglês que o código usa. A alternativa, tabelas em pt-BR, misturaria `matricula` com `created_at` e `user_id` e foi descartada.
