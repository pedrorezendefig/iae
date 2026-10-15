---
status: accepted
---

# O Vídeo é convertido no computador do Operador e servido do Cloudflare R2

A plataforma precisa entregar aulas em vídeo com qualidade adaptável e custo que não cresça com o número de alunos. A pesquisa dos sócios recomendava o Mux no começo, e a Ponte técnica do IAE propôs ffmpeg no computador com armazenamento no R2. Escolhemos o caminho do IAE: o Operador converte o Original em HLS (H.264, 360p, 720p e 1080p, pedaços de 6 s) com um script no próprio computador, sobe o Vídeo e o Original para o R2 e registra o Vídeo pela API. Nenhum servidor nosso converte nem serve vídeo: a VPS guarda só metadados e progresso, e o navegador do aluno baixa os pedaços direto do R2 pelo cache da Cloudflare.

## Considered Options

- **Mux:** upload pelo navegador, legenda automática e token assinado prontos. Custa R$ 0 até cerca de 200 alunos e cerca de R$ 730 por mês com 500. Exigiria re-converter o acervo na migração.
- **Worker de conversão na nuvem:** tira a dependência do computador do Operador, mas é mais um servidor para manter e foi vetado pelos sócios (nada de vídeo nos servidores do app).
- **ffmpeg no computador do Operador + R2 (escolhida):** custo quase fixo (armazenamento a US$ 0,015 por GB, saída grátis), formato padrão desde o início, sem migração futura. O preço é uma rotina manual por aula e a legenda fora do caminho principal.

## Consequences

- A rotina de subida depende de uma pessoa com o script instalado. Por isso há dois Operadores desde o início.
- Proteção por token em cada pedaço exige um Cloudflare Worker (plano pago, cerca de R$ 25 por mês). A primeira versão fica sem ele, com as URLs já preparadas para recebê-lo.
- Legenda não vem de graça; entra depois, gerada no computador do Operador.
