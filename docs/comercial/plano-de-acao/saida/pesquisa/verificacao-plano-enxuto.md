# Verificação do plano enxuto (template-plano.html, aba Plano)

- **Data:** 14/10/2026.
- **O que foi conferido:** só o conteúdo dentro de `<div id="view-plano">` (linhas 196 a 429 de `saida/template-plano.html`).
- **Fontes:** `e-consolidado.md` (tabela 1.1, seções 1.2 a 1.9, bloco CALC), `a-infraestrutura.md` (C14, seção 7, tabela de preços), `a2-benchmark-custos.md` e `b-referencias-funcionalidades.md` (seção 5, pagamentos).
- **Regras do Pedro que prevalecem sobre o consolidado:** VPS Hostinger KVM 4 a R$ 50/mês; o preço do nosso serviço não aparece; cenário de início de 50 h de vídeo, 30 alunos, 6 h por aluno por mês, 4 lives de 3 h, 1080p; USD 1 = R$ 5,03.
- **Regra de cálculo do Mux usada nas contas:** armazenamento de US$ 0,003 por minuto guardado (US$ 0,0029 acima de 50 mil min, faixa do CALC), entrega de US$ 0,001 por minuto acima de 100 mil min por mês, crédito de US$ 20 por mês abatido no total.
- **Coluna "onde":** número da linha no arquivo `template-plano.html`.

## Resumo

Os números do Mux, as tabelas de custo, o Asaas, o Zoom e as fases batem com a fonte. Há **11 correções**:

1. **Coluna "Hoje" da tabela de players (30 h, 50 alunos)** contradiz o cenário de início (50 h, 30 alunos). Recalculado com as constantes do CALC para 50 h e 30 alunos: Mux R$ 0; R2 + FFmpeg R$ 38; AWS plano fixo R$ 91; Bunny R$ 80; Cloudflare Stream R$ 130; Google R$ 148; AWS pay as you go R$ 22; Hostinger KVM 4 **não cabe** (186,75 GB de acervo contra 160 GB livres).
2. **96 h de limite na VPS** vale para o KVM 8 (400 GB). No KVM 4 (200 GB menos 40 GB do sistema), o limite é **cerca de 40 h** (conta exata: 42,8 h). Aparece em três lugares.
3. **AWS pay as you go, saída a US$ 0,085 por GB** é o preço de EUA e Europa. Na América do Sul é **US$ 0,110 por GB** (de 1 a 10 TB, depois do 1 TB grátis).
4. **270 alunos na franquia:** 100.000 / (6 x 60) = **277** alunos (a fonte diz "cerca de 277"). Aparece em quatro lugares.
5. **R2, cópia dos originais, R$ 9:** 50 h x 2,25 GB = 112,5 GB x US$ 0,015 x 5,03 = **R$ 8,49, ou seja R$ 8**. Os totais passam a **R$ 101** (low cost) e **R$ 118** (médio). Se o master for o dobro do 1080p (4,5 GB/h, teto da fonte), o R2 vai a R$ 17.
6. **2,2 GB por hora em 1080p e 1,1 GB em 720p:** a fonte diz **2,25 GB** e **1,125 GB** (premissa conservadora de 5 Mbps e 2,5 Mbps). Arredondar para baixo esconde a margem; usar 2,25 GB e 1,1 GB.
7. **DRM a R$ 500 por mês:** US$ 100 x 5,03 = **R$ 503** por mês, mais US$ 0,003 por licença (R$ 512 no cenário de 30 alunos). Aparece em dois lugares.
8. **"Guardar R$ 800, entregar R$ 1.300" (1.000 h, 1.000 alunos):** a soma está certa (R$ 2.108), mas guardar custa **R$ 900** bruto (US$ 179); os R$ 800 já descontam o crédito de US$ 20. Escrever "guardar R$ 900, entregar R$ 1.308, menos R$ 101 de crédito".
9. **"Hotmart, Kiwify ou Eduzz: 10% de cada venda":** só a Hotmart chega perto de 10% (9,9% + R$ 2,49). Kiwify cobra 8,99% + R$ 2,49 e Eduzz 4,9% + R$ 2,49. Escrever **"5% a 10% de cada venda (R$ 100 a R$ 200 numa venda de R$ 2.000)"**.
10. **"Aguenta 110 h de acervo e 270 alunos sem subir" (low cost):** só o Mux fica parado. O R2 sobe junto com o acervo: com 110 h, a cópia dos originais vai a cerca de R$ 19 por mês (247,5 GB). E o número de alunos é 277.
11. **Zoom Business com "webhook de gravação":** pela fonte, o webhook `recording.completed` existe também no Zoom Pro. A ingestão automática é item de desenvolvimento do Marco 2 e não depende do plano Business. Trocar a descrição por "live até 300 pessoas".

Correção de link: **asaas.com/precos** deve ser `https://www.asaas.com/precos-e-taxas` (URL citada na fonte).

## Tabela de verificação

| Trecho | O que o HTML diz | O que a fonte ou a conta diz | Veredito | Onde |
|---|---|---|---|---|
| Lead | Só custos de terceiros; o preço do nosso trabalho fica para outra conversa | Regra do Pedro: preço do serviço fora do documento | confirmado | cabeçalho da aba |
| Mosaico, VPS | R$ 50, VPS Hostinger KVM 4, roda o app e nunca o vídeo | Regra do Pedro: R$ 50 (a fonte traz US$ 28,99 na renovação, R$ 145,82; prevalece o preço pago) | confirmado | 217 |
| Mosaico, Mux hoje | R$ 0; crédito de US$ 20 cobre até 110 h | 20 / (60 x 0,003) = 111,1 h; com 50 h o uso é US$ 9, coberto | confirmado | 218 |
| Mosaico, 1080p | Teto de entrega, 4K não faz sentido | Decisão 6 do consolidado | confirmado | 219 |
| Mosaico, R$ 0,91 | Por hora guardada por mês, quando o crédito acabar | 60 x US$ 0,003 x 5,03 = R$ 0,9054 | confirmado | 220 |
| Mosaico, 05/12 | Alunos atuais assistindo online e primeira venda por Pix | Critério do Marco 1 (seção 1.9) | confirmado | 221 |
| Mosaico, R$ 1,99 | Por venda no Pix pelo Asaas, sem mensalidade | B seção 5: Pix R$ 1,99, mensalidade zero (R$ 0,99 nos 3 primeiros meses) | confirmado | 224 |
| Mosaico, 270 alunos | 270 alunos assistindo 6 h antes de pagar entrega | 100.000 / 360 = 277,8; fonte: "cerca de 277 alunos" | corrigir: 277 | 225 |
| Mosaico, Zoom | R$ 43, Zoom Pro com desconto de ONG, 100 pessoas, gravada | US$ 8,50 x 5,03 = R$ 42,76; limite 100; gravação em nuvem | confirmado | 226 |
| Mosaico, 2,2 GB | Uma hora em 1080p | Fonte: 2,25 GB por hora no degrau 1080p (5 Mbps); A1 dá 1,63 GB | corrigir: 2,25 GB | 227 |
| Mosaico, 8 players | 8 players comparados | Benchmark resumido tem 8 pilhas | confirmado | 228 |
| Mosaico, R$ 102 | Infra por mês no começo, tudo somado | 50 + 0 + 9 + 43 + 0 = 102 está certo, mas a linha do R2 deve ser R$ 8 (ver abaixo) | corrigir: R$ 101 | 231 |
| Mosaico, R$ 0,30 | Por hora assistida acima da franquia | 60 x US$ 0,001 x 5,03 = R$ 0,3018 | confirmado | 232 |
| Mosaico, Compor | App nosso, vídeo alugado | Decisão 1 e seção 1.7 | confirmado | 233 |
| Mosaico, US$ 400 | Gatilho para migrar para R2 + FFmpeg | Decisão 2: "cerca de US$ 400/mês" | confirmado | 234 |
| Mosaico, 1.000 h | 1.000 alunos: R$ 2.100 no Mux, R$ 306 no R2 | R$ 2.108 e R$ 306 (decisão 2) | confirmado (arredondado; sugerir R$ 2.108 para bater com a tabela) | 235 |
| Seção 01, frase | Mux; VPS nunca toca no arquivo; vídeo custa zero hoje | Decisão 1 | confirmado | 245 a 246 |
| Card Mux | Converte e gera legenda pt de graça, CDN com link assinado, upload direto | Seção 1.2: Basic grátis, legenda pt grátis, token assinado, direct upload | confirmado | 247 |
| Card VPS | KVM 4; disco acabaria em 96 h de aula | 96 h é o KVM 8 (400 GB). KVM 4: (200 menos 40) / 3,735 = 42,8 h; fonte A: "KVM 4 cabe cerca de 40 h" | corrigir: cerca de 40 h | 248 |
| Card R2 | R$ 0,08 por GB por mês, sem cobrar saída | US$ 0,015 x 5,03 = R$ 0,0755; egress zero | confirmado | 249 |
| Card Zoom | Pro com desconto de ONG, link único, gravação vai para o Mux | Seção 1.5 | confirmado | 250 |
| Seção 02, legenda | "Hoje" é o IAE agora: 30 h gravadas e 50 alunos | Cenário de início do Pedro: 50 h e 30 alunos. 30 h e 50 alunos é o S0 da pesquisa | corrigir: recalcular a coluna para 50 h e 30 alunos (valores abaixo) ou renomear para "S0 da pesquisa" | 256, 258 |
| Players, Mux | R$ 0 / 171 / 2.108 / 8.873 | US$ 0 / 34 / 419 / 1.764 x 5,03 = R$ 0 / 171,02 / 2.107,57 / 8.872,92. Com 50 h e 30 alunos: US$ 9 de uso, R$ 0 | confirmado | 260 |
| Players, R2 + FFmpeg | R$ 33 / 109 / 306 / 318 | US$ 6,53 / 21,66 / 60,88 / 63,27 x 5,03 = R$ 32,85 / 108,95 / 306,23 / 318,25. Com 50 h e 30 alunos: (186,75 menos 10 GB) x 0,015 + US$ 5 de Workers = US$ 7,65 = **R$ 38** | confirmado (S0); corrigir para R$ 38 no cenário de início | 261 |
| Players, AWS plano fixo | R$ 83 / 199 / 502 / 1.322 | US$ 16,43 / 39,62 / 99,75 / 263 = R$ 82,64 / 199,29 / 501,74 / 1.322,89. Com 50 h: US$ 15 + (186,75 menos 50) x 0,023 = US$ 18,15 = **R$ 91** | confirmado (S0); corrigir para R$ 91 no cenário de início | 262 |
| Players, Bunny | R$ 123 / 523 / 2.529 / 11.891 | US$ 24,39 / 104 / 503 / 2.364 = R$ 122,68 / 523,12 / 2.530,09 / 11.890,92. Com 50 h e 30 alunos: 186,75 x 0,01 + 310,23 GB x 0,045 = US$ 15,83 = **R$ 80** | confirmado (S0); corrigir para R$ 80 no cenário de início | 263 |
| Players, Bunny, veredito | Entrega na América do Sul a US$ 0,045 por GB | CALC: 0,045 (com a ressalva [D9]: a página do Stream sugere cerca de 0,03) | confirmado | 263 |
| Players, Cloudflare Stream | R$ 141 / 815 / 3.320 / 10.563 | US$ 28 / 162 / 660 / 2.100 = R$ 140,84 / 814,86 / 3.319,80 / 10.563. Com 50 h e 30 alunos: 3 blocos x US$ 5 + 10.800 min x 0,001 = US$ 25,80 = **R$ 130** | confirmado (S0); corrigir para R$ 130 no cenário de início | 264 |
| Players, Google | R$ 229 / 981 / 4.723 / 16.496; Transcoder US$ 4.500 para 1.000 h | US$ 45,56 / 195 / 939 / 3.280 = R$ 229,17 / 980,85 / 4.723,17 / 16.498,40; Transcoder US$ 4.500 (seção 1.2). Com 50 h e 30 alunos: cerca de US$ 29,5 = **R$ 148** | confirmado (S0); corrigir para R$ 148 no cenário de início | 265 |
| Players, AWS pay as you go | R$ 13 / 719 / 5.592 / 27.398 | US$ 2,58 / 143 / 1.112 / 5.447 = R$ 12,98 / 719,29 / 5.593,36 / 27.398,41. Com 50 h e 30 alunos: 186,75 x 0,023 = US$ 4,30 = **R$ 22** (entrega dentro do 1 TB grátis) | confirmado (S0); corrigir para R$ 22 no cenário de início | 266 |
| Players, AWS pay as you go, veredito | Saída a US$ 0,085 por GB | América do Sul: US$ 0,110/GB (1 a 10 TB); 0,085 é EUA e Europa | corrigir: US$ 0,110 | 266 |
| Players, Hostinger, valor | R$ 50 hoje | Regra do Pedro (KVM 4). A fonte usa US$ 28,99 | confirmado (pela regra do Pedro) | 267 |
| Players, Hostinger, veredito | Disco máximo de 400 GB, cerca de 96 h | 400 GB e 96 h são do KVM 8 (US$ 49,99). O KVM 4 que o IAE paga tem 200 GB, cerca de 40 h. Com 50 h de acervo (186,75 GB na ladder inteira) o KVM 4 **já não cabe** hoje | corrigir: "200 GB, cerca de 40 h"; coluna Hoje vira "não cabe" no cenário de 50 h | 267 |
| Seção 02, nota | Entrega é 80% a 99% da conta; guardar só domina com R2 ou na franquia do Mux | Decisão 3 | confirmado | 270 |
| Low cost, VPS | R$ 50 | Regra do Pedro | confirmado | 281 |
| Low cost, Mux | R$ 0 | 50 h: 3.000 min x 0,003 = US$ 9; entrega 30 x 360 = 10.800 min, dentro da franquia; crédito cobre | confirmado | 282 |
| Low cost, R2 | Cópia dos originais (110 GB), R$ 9 | 50 h x 2,25 GB = 112,5 GB; x 0,015 x 5,03 = R$ 8,49 (R$ 7,73 descontando 10 GB grátis). Com 110 GB: R$ 8,30. R$ 9 vem de arredondar o preço unitário para R$ 0,08 antes de multiplicar | corrigir: 112,5 GB, R$ 8 | 284 |
| Low cost, Zoom | Pro ONG, R$ 43 | US$ 8,50 x 5,03 = R$ 42,76 | confirmado | 285 |
| Low cost, Resend etc. | R$ 0 | A fonte não precifica e-mail transacional nem domínio; backup via Coolify para R2 sem custo extra relevante | confirmado (sem número na fonte; estimativa razoável) | 286 |
| Low cost, total | R$ 102 | 50 + 0 + 9 + 43 + 0 = 102 confere; com R2 a R$ 8, total R$ 101 | corrigir: R$ 101 | 287 |
| Low cost, nota | Aguenta 110 h de acervo e 270 alunos sem subir | Mux fica em zero até 111 h e 277 alunos; o R2 sobe com o acervo (110 h x 2,25 GB = 247,5 GB = R$ 18,67) | corrigir: 277 alunos; dizer que só o Mux fica parado (total vai a cerca de R$ 111) | 289 |
| Médio, VPS e Mux | R$ 50 e R$ 0 | Regra do Pedro; idem acima | confirmado | 295, 296 |
| Médio, R2 | R$ 9 | R$ 8 (mesma conta do low cost) | corrigir: R$ 8 | 297 |
| Médio, Zoom Business | Desconto de ONG, live até 300, webhook de gravação, R$ 55 | US$ 11 x 5,03 = R$ 55,33; limite 300. O webhook `recording.completed` existe também no Pro (CALC, opção zoom_pro_desconto) | corrigir a descrição: tirar "webhook de gravação" (valor confirmado) | 298 |
| Médio, backup e monitoramento | R$ 5 | A fonte não dá preço (A seção 7 só cita Uptime Kuma ou SaaS e backup do Coolify para R2) | confirmado como estimativa; marcar "estimativa" no HTML | 299 |
| Médio, total | R$ 119 | 50 + 0 + 9 + 55 + 5 = 119 confere; com R2 a R$ 8, total R$ 118 | corrigir: R$ 118 | 300 |
| Por venda, Pix e boleto | R$ 1,99 fixo | B seção 5: R$ 1,99 (promo de R$ 0,99 nos 3 primeiros meses) | confirmado | 309, 310 |
| Por venda, cartão | R$ 60,29; 2,99% + R$ 0,49 | 2.000 x 0,0299 + 0,49 = R$ 60,29. Parcelado 2 a 6x é 3,49%, 7 a 12x é 3,99% | confirmado (vale só à vista e recorrente, como o HTML diz) | 311 |
| Por venda, NFS-e | R$ 0,49 | B seção 5 | confirmado | 312 |
| Por venda, Hotmart | R$ 200; 9,9% + R$ 2,49 | 2.000 x 0,099 + 2,49 = R$ 200,49 | confirmado | 313 |
| Mux, texto | US$ 0,003/min guardado, US$ 0,001/min entregue acima de 100 mil | CALC, provedor mux | confirmado | 317 |
| Card R$ 0,91 | Curso de 24 h custa R$ 22 por mês; aula sem play por 30 dias cai 40% | 24 x 60 x 0,003 x 5,03 = R$ 21,73; cold storage menos 40% após 30 dias sem play | confirmado | 319 |
| Card R$ 0,30 | Franquia dá para 270 alunos | 277 alunos | corrigir: 277 | 320 |
| Card R$ 0 para converter | Basic não cobra transcoding nem legenda; crédito de US$ 20 | CALC: transcode basic 0; legendas grátis | confirmado | 321 |
| Degraus, linha 1 | Até 110 h e 270 alunos: R$ 0 | 111 h e 277 alunos | corrigir: 277 alunos (110 h pode ficar) | 325 |
| Degraus, 200 h | R$ 80 | 12.000 min x 0,003 = US$ 36 menos 20 = US$ 16 = R$ 80,48 (com até 277 alunos) | confirmado | 326 |
| Degraus, 300 h e 200 alunos | R$ 171 | 18.000 x 0,003 = US$ 54; entrega 72.000 min, dentro da franquia; 54 menos 20 = US$ 34 = R$ 171,02 | confirmado | 327 |
| Degraus, 500 alunos | + R$ 400 | (180.000 menos 100.000) x 0,001 = US$ 80 = R$ 402,40 | confirmado (arredondado) | 328 |
| Degraus, 1.000 h e 1.000 alunos, total | R$ 2.108 | 50.000 x 0,003 + 10.000 x 0,0029 = US$ 179; entrega 260.000 x 0,001 = US$ 260; 439 menos 20 = US$ 419 = R$ 2.107,57. Sem a faixa de 0,0029: US$ 420 = R$ 2.112,60 | confirmado | 329 |
| Degraus, 1.000 h, detalhe | Guardar R$ 800, entregar R$ 1.300 | Guardar bruto US$ 179 = R$ 900,37; já com o crédito, R$ 799,77. Entregar US$ 260 = R$ 1.307,80 | corrigir: "guardar R$ 900, entregar R$ 1.308, crédito menos R$ 101" (ou dizer que o crédito já está no guardar) | 329 |
| Degraus, gatilho | Acima de US$ 400 migrar; R2 R$ 306 no mesmo cenário | Decisão 2 | confirmado | 330 |
| Repasse | IOF de 3,5% mais spread; CNPJ e cartão do IAE | Decisão 12 e cabeçalho do consolidado | confirmado | 332 |
| Vídeo, ladder | 360p, 540p, 720p e 1080p | Decisão 5 | confirmado | 341 |
| Vídeo, codec | H.264; AV1 só se a entrega virar o maior custo | Seção 1.2, fase 3 | confirmado | 342 |
| Vídeo, peso | 2,2 GB em 1080p e 1,1 GB em 720p | 2,25 GB e 1,125 GB (seção 1.4) | corrigir: 2,25 GB e 1,1 GB | 343 |
| Vídeo, 4K | Custa 3 vezes mais | Mux: 3,2 vezes; conta mensal 2,6 a 3,2 vezes | confirmado | 344 |
| Vídeo, proteção | Link até 4 h, sem download, 2 sessões, nome e parte do e-mail | Seção 1.6 (marca d'água no Marco 2) | confirmado | 345 |
| Vídeo, DRM | R$ 500 por mês | US$ 100 x 5,03 = R$ 503, mais US$ 0,003 por licença (R$ 512,05 com 30 alunos) | corrigir: R$ 503 | 345 |
| Lives, agora | Zoom Pro ONG, R$ 43, 100 pessoas, gravação, link único | Seção 1.5 | confirmado | 351 |
| Lives, mais de 100 | Zoom Business, R$ 55, até 300 | US$ 11 x 5,03 = R$ 55,33 | confirmado | 352 |
| Lives, gravação | Vai para o Mux; no médio é automático (webhook do Zoom) | Ingestão automática é item do Marco 2 e funciona com Zoom Pro; não depende do plano médio | corrigir: "a partir do Marco 2 isso é automático" | 353 |
| Lives, fase 2 | LiveKit US$ 50 fixos por mês | Ship US$ 50/mês fixo; US$ 52,40 (R$ 263,57) no cenário IAE | confirmado (sugerir citar R$ 264 no cenário) | 354 |
| Lives, plano B | OBS para YouTube não listado | Seção 1.5 (também Cloudflare Stream Live) | confirmado | 355 |
| Seção 05, VPS | Disco de 400 GB acaba com 96 h | KVM 4: 200 GB, cerca de 40 h | corrigir: "disco de 200 GB acaba com cerca de 40 h" | 364 |
| Seção 05, plataformas | Hotmart, Kiwify ou Eduzz: 10% de cada venda | Hotmart 9,9% + R$ 2,49; Kiwify 8,99% + R$ 2,49; Eduzz 4,9% + R$ 2,49; R$ 100 a R$ 200 por venda de R$ 2.000 | corrigir: "5% a 10% de cada venda" | 365 |
| Seção 05, 4K | Triplica a conta | 2,6 a 3,2 vezes | confirmado | 366 |
| Seção 05, DRM | R$ 500 por mês e licença por play | R$ 503 por mês | corrigir: R$ 503 | 367 |
| Seção 05, pós | Sem IES credenciada não pode "pós", "especialização" nem "MBA" | Decisão 14 (também "extensão") | confirmado | 368 |
| Seção 05, clube | Pré-venda em dezembro, assinatura em janeiro | [D10] | confirmado | 369 |
| Fases, Marco 1 | Até 05/12/2026; escopo e critério | Seção 1.9: 20/10 a 05/12/2026; alunos atuais online e primeira venda por Pix | confirmado | 377 |
| Fases, Marco 2 | Jan a mar/2027; clube, cupons, bolsas, NF, certificado, comentários, busca, ingestão, marca d'água; 30 dias sem incidente | Seção 1.9 (incidente P1) | confirmado | 378 |
| Fases, Fase 2 | 1º sem/2027; pílulas de 30 a 40 min; turma fora do Rio e 50 alunos | Seção 1.9 e B item 36 | confirmado | 379 |
| Fases, Fase 3 | 2º sem/2027; trilha, edição, DRM, R2; IES ou Mux acima de US$ 400 | Seção 1.9 | confirmado | 380 |
| Helena | Ponte técnica desde a primeira semana, testa o admin, recebe requisitos em .md | Seção 1.9 confirma ponte e admin; ".md" não está na fonte | confirmado (o ".md" é decisão do plano) | 382 |
| Decisão Mux ou R2 | R2 é 7 vezes mais barato com 1.000 alunos | 2.108 / 306 = 6,9 | confirmado | 387 |
| Decisão 4K | Não; 1440p como degrau pago | Decisão 6 | confirmado | 389 |
| Decisão preço | Fora deste documento | Regra do Pedro; nenhum valor de setup, sustentação ou ciclo aparece na aba | confirmado | 391 |
| Próximos passos | Datas de 15/10 a 03/11 | Sem número na fonte (B tinha "até 03/11" para outra entrega); são decisões do plano | confirmado (não verificável na fonte) | 398 a 407 |
| Fontes, cotação e total | 13/10/2026, USD 1 = R$ 5,03, 267 fontes | Cabeçalho e seção 5 do consolidado | confirmado | 413 |
| Fontes, Zoom | zoom.com/pt/pricing | Fonte cita zoom.us/pricing | confirmado (mesma página; opcional trocar) | 422 |
| Fontes, Asaas | asaas.com/precos | Fonte cita https://www.asaas.com/precos-e-taxas | corrigir o link | 423 |

## Pendências

- **Lives viram acervo.** Se as 4 lives de 3 h forem para o Mux, o acervo cresce 12 h por mês. Saindo de 50 h, o crédito de US$ 20 (111 h) acaba em cerca de 5 meses, por volta de março de 2027. A partir daí, cada mês soma cerca de R$ 11 (12 h x R$ 0,91). Vale uma frase no HTML.
- **KVM 4 contra KVM 8.** O preço de R$ 50 é do KVM 4 (200 GB). Se o IAE estiver no KVM 8, os 96 h voltam a valer; confirmar com o Pedro qual plano é.
- **Master no R2.** A fonte usa master de 2,25 a 4,5 GB por hora. O plano usa o piso. O teste de 10 min com a aula real fecha esse número e o custo do R2 (R$ 8 a R$ 17 com 50 h).
- **Backup e monitoramento a R$ 5** e **Resend e domínio a R$ 0** não têm número na pesquisa; ficam como estimativa.
- **Coluna "Hoje" dos players.** Os valores recalculados para 50 h e 30 alunos usam as fórmulas do CALC e foram conferidos contra o S0 da fonte (mesma fórmula reproduz US$ 6,53, 16,43, 24,39, 28,00 e 2,58). O Google ficou cerca de US$ 0,10 abaixo do S0 da fonte na reprodução, então o R$ 148 é aproximado.
