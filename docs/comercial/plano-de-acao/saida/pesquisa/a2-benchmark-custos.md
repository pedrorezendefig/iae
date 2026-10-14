# A2. Benchmark de custo de infraestrutura de vídeo (VOD) para a plataforma IAE

Agente A, item 2. Pesquisa feita em 13/10/2026. Todos os preços são de lista, pay-as-you-go, vigentes na data de acesso, sem descontos negociados.

**Cotação usada:** USD 1 = R$ 5,03 (AwesomeAPI, 13/10/2026). Todos os valores em reais deste arquivo são conversões diretas com essa cotação, sem IOF nem impostos de importação de serviço (que, na prática, somam algo entre 6,38% de IOF no cartão internacional e eventuais tributos; ver "Confiança").

## Resumo em 10 linhas

1. **A hipótese dos sócios ("armazenamento é o maior custo") só vale em dois casos:** quando a entrega é gratuita ou de preço fixo (Cloudflare R2 atrás do cache da Cloudflare, ou o novo plano fixo do AWS CloudFront) ou quando a audiência é muito pequena (até cerca de 25 alunos para cada 300 h de acervo). Em qualquer provedor que cobra entrega por GB ou por minuto, **a entrega (egress) domina, com 80% a 99% da conta mensal**, a partir de poucas dezenas de alunos.
2. Regra de bolso (1080p, 6 h/aluno/mês): cada aluno ativo consome cerca de **10,3 GB/mês**; cada hora de acervo ocupa **3,7 GB** (ladder 360p+720p+1080p). Um aluno custa por mês o mesmo que 12 horas de acervo na Bunny, 13 horas na AWS e 2 horas no Mux.
3. **Hoje (cerca de 30 h de vídeo, até 50 alunos) qualquer opção custa entre US$ 3 e US$ 46 por mês (R$ 13 a R$ 230).** A decisão de provedor não é de custo agora, é de arquitetura e de quanto custa escalar depois.
4. **Cenário 1.000 h + 1.000 alunos em 1080p (mensal):** Cloudflare R2 US$ 61 (R$ 306); AWS com CloudFront plano fixo US$ 100 (R$ 502); Mux US$ 439; B2+Bunny US$ 491; Bunny Stream US$ 503; Cloudflare Stream US$ 660; GCP US$ 944; AWS pay-as-you-go US$ 1.112 (R$ 5.592).
5. **Cenário 1.000 h + 5.000 alunos em 1080p (mensal):** R2 US$ 63; AWS plano fixo US$ 263; Mux US$ 1.784; Cloudflare Stream US$ 2.100; Bunny US$ 2.364; GCP US$ 3.285; AWS pay-as-you-go US$ 5.447 (R$ 27.398). Diferença de 86 vezes entre o mais barato e o mais caro.
6. **Transcoding é custo único e pequeno**, exceto em Google Transcoder (US$ 4.500 para 1.000 h em 1080p) e AWS MediaConvert (US$ 1.810). FFmpeg próprio custa centavos por hora de vídeo em CPU (estimativa: US$ 0,04 por hora de aula em 1080p); Cloudflare Stream, Bunny Stream e Mux basic não cobram encoding.
7. **4K multiplica o armazenamento por 2,8 e a entrega por 1,7 a 3,2** (conforme o provedor) em relação ao 1080p; no Mux, a entrega 4K custa 3,2 vezes a 1080p. Cloudflare Stream nem entrega 4K (máximo 1080p).
8. **Hostinger VPS sozinho não comporta** nada acima de cerca de 100 h em 1080p (disco máximo de 400 GB no KVM 8) e a Hostinger não vende object storage (páginas testadas retornam 404). Serve para o app, não para o acervo.
9. Degraus de preço mais relevantes: Mux entrega 100.000 min/mês grátis (cerca de 277 alunos a 6 h); CloudFront dá 1 TB/mês grátis (cerca de 97 alunos em 1080p); plano fixo CloudFront Pro (US$ 15) aguenta até 10 milhões de requisições (cerca de 2.700 alunos com segmentos HLS de 6 s) e 50 TB; Cloudflare Stream é cobrado em blocos pré-pagos de 1.000 minutos armazenados (US$ 5 cada).
10. Recomendação de custo para o consolidador: **R2 (armazenamento) + cache Cloudflare (entrega a custo zero) + FFmpeg próprio** é a opção mais barata em todos os cenários; **Bunny Stream ou Mux** são as opções gerenciadas de menor esforço; **AWS CloudFront plano fixo** é a alternativa "nuvem grande" com custo previsível. A escolha final depende também de complexidade operacional (itens 1 e 8 do Agente A).

## 1. Tabela 1: preços unitários por provedor (lista, 13/10/2026)

Unidades: GB decimal (10^9 bytes) salvo quando indicado GiB. Conversão: R$ = US$ x 5,03.

| Provedor / produto | Armazenamento | Entrega (egress) | Transcoding / encoding | Mínimo e franquia grátis | Fonte (acesso 13/10/2026) |
|---|---|---|---|---|---|
| **Hostinger VPS KVM 2 / 4 / 8** | Disco NVMe 100 / 200 / 400 GB incluso | Banda 8 / 16 / 32 TB/mês inclusa, porta de 1 Gbps | Por conta própria (CPU do VPS) | US$ 8,99 / 12,99 / 25,99 por mês na promoção; **renova a US$ 14,99 / 28,99 / 49,99** (R$ 75 / 146 / 251). No site BR: R$ 43,99 / 59,99 / 119,99 promo, renovação R$ 77,99 / 149,99 / 259,99 | hostinger.com/vps-hosting ; hostinger.com.br/servidor-vps |
| **Hostinger object storage** | Não oferecido (URLs /object-storage, /cloud-storage, /storage retornam 404) | n/a | n/a | n/a | teste de URL em hostinger.com |
| **Google Cloud Storage** (Standard, Iowa us-central1) | US$ 0,000027397/GiB-hora = **US$ 0,020/GiB-mês** (R$ 0,10) | Direto para internet: US$ 0,12/GiB (0 a 10 TiB) | n/a | Always Free: 5 GB-mês, 100 GB de egress da América do Norte | cloud.google.com/storage/pricing |
| **Google Cloud CDN** | n/a | América do Sul: **US$ 0,09/GiB** (0 a 10 TiB), 0,06 (10 a 150 TiB), 0,05 (150 TiB a 1 PiB). América do Norte e Europa: 0,08. Cache fill US$ 0,01 a 0,04/GiB. Lookup US$ 0,0075 por 10.000 req. | n/a | Sem franquia | cloud.google.com/cdn/pricing |
| **Google Transcoder API** | n/a | n/a | Por minuto de saída: SD US$ 0,015; HD (720p a 1080p) US$ 0,03; UHD (acima de 1080p até 4K) US$ 0,06; só áudio US$ 0,005 | Faixas de volume descem para 0,012 / 0,024 / 0,048 | cloud.google.com/transcoder/pricing |
| **AWS S3 Standard** | **US$ 0,023/GB-mês** em N. Virginia (primeiros 50 TB); US$ 0,0405 em São Paulo | Para internet: 100 GB/mês grátis (agregado AWS); para o CloudFront: grátis | n/a | Sem mínimo | aws.amazon.com/s3/pricing (JSON oficial de preços b0.p.awsstatic.com) |
| **AWS CloudFront pay-as-you-go** | n/a | América do Sul: **US$ 0,110/GB** (1 a 10 TB), 0,105 (próx. 40 TB), 0,090 (próx. 100 TB). EUA/Europa: 0,085 / 0,080 / 0,060. HTTPS: US$ 0,022 por 10.000 req na América do Sul | n/a | Always Free: **1 TB/mês** e 10 milhões de req/mês | aws.amazon.com/cloudfront/pricing/pay-as-you-go |
| **AWS CloudFront planos fixos** (novos) | Crédito S3: 5 GB / 50 GB / 1 TB / 5 TB | Free US$ 0 (100 GB, 1 M req); **Pro US$ 15** (50 TB, 10 M req); **Business US$ 200** (50 TB, 125 M req); Premium US$ 1.000 (50 TB, 500 M req, configurável até 600 TB por novo preço) | n/a | "Sem cobrança de excedente"; acima da franquia de forma sustentada a AWS pode "ajustar a entrega" (menos PoPs ou menor performance). Primeiro pico até 3x tolerado. Exige WAF associado; URLs assinadas suportadas | aws.amazon.com/cloudfront/pricing ; docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/flat-rate-pricing-plan.html |
| **AWS MediaConvert** (on-demand, US East Ohio) | n/a | n/a | Por minuto normalizado: Basic US$ 0,0075 (primeiros 100 mil), 0,0053, 0,0038. Professional 0,012 / 0,0096 / 0,0072 / 0,0036. Multiplicador AVC: SD 1x, HD 2x, 4K 4x. HEVC (Pro) SD 2x, HD 4x, 4K 8x. AV1 (Pro) SD 3,5x, HD 7x, 4K 14x | Sem free tier descrito | aws.amazon.com/mediaconvert/pricing |
| **Cloudflare R2** (Standard) | **US$ 0,015/GB-mês** (IA: 0,01 + 0,01/GB de leitura) | **Egress grátis** | n/a (FFmpeg próprio) | Grátis: 10 GB-mês, 1 M ops classe A, 10 M ops classe B. Classe A US$ 4,50/M, classe B US$ 0,36/M | developers.cloudflare.com/r2/pricing |
| **Cloudflare Workers Paid** (para validar acesso às aulas na borda) | n/a | n/a | n/a | US$ 5/mês, 10 M req inclusas, US$ 0,30/M adicional | developers.cloudflare.com/workers/platform/pricing |
| **Cloudflare Stream** | **US$ 5 por 1.000 min armazenados/mês** (pré-pago), independe da resolução | **US$ 1 por 1.000 min entregues** (banda inclusa) | **Grátis** (ingest e encoding) | Sem franquia; H.264, ABR de 360p a **1080p** (não entrega 4K); upload até 30 GB | developers.cloudflare.com/stream/pricing ; Context7 /websites/developers_cloudflare_stream |
| **Bunny CDN** (rede Standard, 119 PoPs) | n/a | Europa/América do Norte US$ 0,01/GB; **América do Sul US$ 0,045/GB**; Ásia 0,03; África/Oriente Médio 0,06. Rede Volume (10 PoPs): US$ 0,005/GB até 500 TB | n/a | Mínimo US$ 1/mês | bunny.net/pricing |
| **Bunny Storage** | HDD 1 região **US$ 0,01/GB**; 2 regiões 0,02; 3 regiões 0,025. SSD Edge 0,02 por região | Tráfego Storage para Bunny CDN grátis | n/a | Mínimo US$ 1/mês | bunny.net/pricing/storage |
| **Bunny Stream** | US$ 0,01/GB (região padrão Frankfurt), **cada resolução gerada é armazenada e cobrada**; replicação +0,01 (2a) e +0,005 (3a em diante) | Preço da Bunny CDN (América do Sul US$ 0,045/GB) | **Encoding padrão grátis**; Premium Encoding por minuto de saída: 2160p/1440p US$ 0,150; 1080p/720p US$ 0,050; 480p a 240p US$ 0,025. Transcrição US$ 0,10/min por idioma. DRM MediaCage Enterprise US$ 99/mês + US$ 0,005 por licença | Mínimo US$ 1/mês | bunny.net/stream ; bunny.net/docs/stream-pricing |
| **Backblaze B2** | **US$ 6,95/TB-mês** (US$ 0,00695/GB) | Grátis até **3x o volume armazenado**; depois US$ 0,01/GB; grátis sem limite para parceiros CDN (Cloudflare, Bunny, Fastly e outros) | n/a | 10 GB grátis; sem mínimo de tamanho ou de duração | backblaze.com/cloud-storage/pricing |
| **DigitalOcean Spaces** | US$ 5/mês inclui **250 GiB + 1 TiB de saída**; excedente US$ 0,02/GiB (cold 0,007) | Excedente **US$ 0,01/GiB**, CDN embutida | n/a | Mínimo US$ 5/mês | digitalocean.com/pricing/spaces-object-storage |
| **Wasabi** (pay as you go) | **US$ 7,99/TB-mês** (cerca de US$ 0,0078/GB) | Sem cobrança de egress, **desde que o egress mensal seja menor ou igual ao volume armazenado**; acima disso o uso "não é adequado" e o serviço pode ser limitado | n/a | **Mínimo de 1 TB cobrado** e retenção mínima de 90 dias | wasabi.com/pricing ; wasabi.com/pricing/faq |
| **Mux Video** (pay as you go) | Por minuto armazenado/mês (basic e plus): 720p US$ 0,0024; **1080p US$ 0,0030**; 1440p 0,0048; 4K 0,0096 (faixas menores acima de 50 mil min). Cold storage automático: -40% após 30 dias sem play, -60% após 90 dias | Por minuto entregue: **100.000 min/mês grátis**; depois 720p US$ 0,0008; **1080p US$ 0,0010**; 1440p 0,0016; 4K 0,0032 (faixas decrescentes a partir de 500 mil min) | Basic: **grátis**. Plus: 720p US$ 0,025/min; 1080p 0,03125; 1440p 0,05; 4K 0,10. Premium: 0,0375 / 0,046875 / 0,075 / 0,15 | Planos Launch US$ 20 (crédito US$ 100) e Scale US$ 500 (crédito US$ 1.000); página cita crédito de uso de US$ 20/mês no pay as you go | mux.com/pricing ; mux.com/docs/pricing/video |

Observação sobre a política da Cloudflare: os termos específicos de serviço dizem que, fora do plano Enterprise, a Cloudflare oferece serviços pagos "(e.g., the Developer Platform, Images, and Stream) that you must use in order to serve video and other large files via the CDN". R2 faz parte da Developer Platform, então servir HLS a partir do R2 com domínio próprio é o caminho aceito; servir vídeo de outra origem (por exemplo B2 ou VPS) só pelo CDN gratuito da Cloudflare é zona cinzenta (fonte: cloudflare.com/service-specific-terms-application-services). Limite de arquivo cacheável no Free/Pro/Business: 512 MB por objeto, o que não é problema para segmentos HLS de 6 s (developers.cloudflare.com/cache/concepts/default-cache-behavior).

## 2. Premissas (todas declaradas)

### 2.1 Tamanho por hora de vídeo, por degrau (H.264/AVC, 30 fps, aula com professor e slides)

| Degrau | Bitrate total (vídeo + áudio 128 kbps) | GB por hora | Referência Apple HLS (H.264, conteúdo genérico) |
|---|---|---|---|
| 360p | 0,8 Mbps | 0,36 | 365 kbps (640x360) |
| 480p (não usado no ladder base) | 1,2 Mbps | 0,54 | 730 a 2.000 kbps (768x432 a 960x540) |
| 720p | 2,5 Mbps | 1,125 | 3.000 a 4.500 kbps |
| 1080p | 5 Mbps | 2,25 | 6.000 a 7.800 kbps |
| 1440p/4K (degrau "premium") | 15 Mbps | 6,75 | HEVC: 1440p 8.100 kbps; 2160p 11.600 a 16.800 kbps |

Por que abaixo da Apple: a tabela da Apple (HLS Authoring Specification, developer.apple.com) é para conteúdo genérico, com movimento. Aula com professor parado e slides é conteúdo de baixa complexidade e comprime bem; 2,5 Mbps em 720p e 5 Mbps em 1080p são valores de mercado comuns para esse tipo de conteúdo (estimativa; o item 3 do Agente A deve confirmar com teste real de encode). **Sensibilidade:** se usar os bitrates da Apple (3 Mbps em 720p e 6 Mbps em 1080p), todos os números de armazenamento e entrega deste arquivo sobem cerca de 20%. O degrau 4K em 15 Mbps só é realista com HEVC; em H.264 puro o 4K pediria 20 a 30 Mbps, quase dobrando os custos de 4K mostrados aqui.

Segmentação HLS: segmentos de 6 s, como recomenda a Apple ("Target durations SHOULD be 6 seconds", item 7.5 da especificação). Isso dá cerca de **600 requisições por hora assistida**, número usado para custo de requisições (CloudFront, Cloud CDN, Workers).

### 2.2 Ladder armazenado (soma dos degraus)

| Teto do ladder | Degraus guardados | GB por hora de acervo | Fator sobre o degrau maior |
|---|---|---|---|
| 720p | 360p + 720p | 1,49 | 1,3x |
| 1080p | 360p + 720p + 1080p | 3,74 | 1,66x |
| 4K | 360p + 720p + 1080p + 4K | 10,49 | 1,55x |

Não incluímos o arquivo original (master). Se o master for guardado, some cerca de 1 a 2 vezes o degrau maior por hora, de preferência em armazenamento frio (R2 Infrequent Access US$ 0,01, B2 US$ 0,00695 ou Wasabi).

Para Cloudflare Stream e Mux o armazenamento é cobrado por minuto de vídeo (não por GB): 100 h = 6.000 min; 300 h = 18.000 min; 1.000 h = 60.000 min.

### 2.3 Horas assistidas por aluno por mês: **6 h**

Justificativa (estimativa, sem fonte direta medida): um aluno engajado de uma turma presencial do IAE consome 24 h em 2 meses, ou seja, 12 h/mês enquanto o curso está ativo. Assinantes de clube e compradores vitalícios assistem bem menos, e a literatura de cursos online registra taxas de conclusão baixas. Usamos 6 h/mês como média entre "aluno de turma ativa" (12 h) e "assinante passivo" (1 a 3 h). A calculadora deve deixar esse valor ajustável de 2 a 12 h; os custos de entrega são lineares nele (dobrar as horas dobra a entrega).

### 2.4 Mix de resolução efetivamente assistida

| Teto oferecido | Mix assistido | GB entregue por hora assistida |
|---|---|---|
| 720p | 85% 720p, 15% 360p | 1,01 |
| 1080p | 60% 1080p, 30% 720p, 10% 360p | 1,72 |
| 4K | 25% 4K, 45% 1080p, 25% 720p, 5% 360p | 3,00 |

O mix 4K supõe que só um quarto das sessões tem tela, rede e decodificador para 4K (estimativa). Em Mux, cobramos a entrega pela tabela da resolução do teto do ativo (premissa conservadora; a cobrança real pode ser pela resolução entregue).

### 2.5 Outras premissas

- Público no Brasil, servido por PoPs da América do Sul (por isso Bunny a US$ 0,045 e CloudFront a US$ 0,110).
- Acervo e número de alunos constantes no horizonte (estado estacionário). Acumulado em N meses = transcoding único + N x custo mensal. A calculadora do consolidador pode simular crescimento.
- Hostinger: preço de renovação em USD (o promocional só vale no primeiro ciclo). 40 GB de disco reservados para sistema e aplicação.
- Não incluímos custo do servidor da aplicação (Next.js, FastAPI, Postgres), só a infraestrutura de vídeo.
- Não incluímos impostos, IOF nem spread de cartão.

## 3. Tabela 2: armazenamento mensal (US$/mês) por volume de acervo e teto de resolução

Valores em US$ por mês, ladder completo (seção 2.2). Para converter em reais, multiplique por 5,03. Asterisco no Cloudflare Stream: cobra o mesmo por minuto em qualquer resolução, mas entrega no máximo 1080p, então a coluna 4K não é um 4K de verdade.

| Provedor | 100 h 720p | 300 h 720p | 1000 h 720p | 100 h 1080p | 300 h 1080p | 1000 h 1080p | 100 h 4K | 300 h 4K | 1000 h 4K |
|---|---|---|---|---|---|---|---|---|---|
| GB armazenados (ladder) | 148 | 445 | 1.485 | 374 | 1.120 | 3.735 | 1.048 | 3.146 | 10.485 |
| Hostinger VPS (disco) | KVM 4 US$ 28,99 | não cabe (>400 GB) | não cabe (>400 GB) | não cabe (>400 GB) | não cabe (>400 GB) | não cabe (>400 GB) | não cabe (>400 GB) | não cabe (>400 GB) | não cabe (>400 GB) |
| Google GCS (Iowa) | 2,97 | 8,91 | 29,70 | 7,47 | 22,41 | 74,70 | 20,97 | 62,91 | 210 |
| AWS S3 (N. Virginia) | 3,42 | 10,25 | 34,15 | 8,59 | 25,77 | 85,91 | 24,12 | 72,35 | 241 |
| Cloudflare R2 | 2,08 | 6,53 | 22,12 | 5,45 | 16,66 | 55,88 | 15,58 | 47,03 | 157 |
| Cloudflare Stream | 30,00 | 90,00 | 300 | 30,00 | 90,00 | 300 | 30,00* | 90,00* | 300* |
| Bunny Storage/Stream (1 região) | 1,49 | 4,45 | 14,85 | 3,73 | 11,21 | 37,35 | 10,48 | 31,46 | 105 |
| Backblaze B2 | 0,96 | 3,03 | 10,25 | 2,53 | 7,72 | 25,89 | 7,22 | 21,79 | 72,80 |
| DigitalOcean Spaces | 5,00 | 8,30 | 27,66 | 6,96 | 20,87 | 69,57 | 19,53 | 58,59 | 195 |
| Wasabi | 7,99 | 7,99 | 11,58 | 7,99 | 8,74 | 29,13 | 8,18 | 24,53 | 81,78 |
| Mux (por minuto) | 14,40 | 43,20 | 143 | 18,00 | 54,00 | 179 | 57,60 | 173 | 573 |

Leitura rápida:

- O armazenamento é barato em qualquer object storage: mesmo **1.000 h com ladder 4K (10,5 TB) custa de US$ 73 (B2) a US$ 241 (S3) por mês**, ou R$ 366 a R$ 1.213.
- Provedores cobrados por minuto (Mux e Cloudflare Stream) são **de 3 a 20 vezes mais caros por hora armazenada** que object storage, porque embutem encoding, player e operação no preço. Em compensação, o encoding é grátis.
- Wasabi tem mínimo de 1 TB (US$ 7,99), então só compensa acima de 1 TB; e **não serve como origem de vídeo** porque o egress gratuito só vale enquanto o egress for menor ou igual ao volume armazenado. Pode ser destino de backup.
- Hostinger VPS: **só cabe o cenário de 100 h em 720p** (148 GB, plano KVM 4). Qualquer acervo acima de cerca de 360 GB de vídeo não cabe em um VPS único (disco máximo de 400 GB no KVM 8). A Hostinger não oferece object storage, então para crescer seria preciso outro provedor de armazenamento de qualquer jeito.
- Em S3 São Paulo o armazenamento custaria 76% a mais que em N. Virginia (US$ 0,0405 contra 0,023). Como a entrega passa pelo CloudFront, a região de origem pouco afeta a experiência do aluno; recomendamos origem nos EUA. Atenção LGPD: vídeo de aula não é dado pessoal, mas logs de acesso e dados de alunos são; isso é tema do Agente C.

## 4. Tabela 3: transcoding (custo único por vídeo) em US$

Custo para gerar o ladder completo uma única vez. Os gerenciados cobram por minuto de saída (somando os degraus); o FFmpeg próprio custa o tempo de CPU.

| Opção | 100 h 720p | 300 h 720p | 1000 h 720p | 100 h 1080p | 300 h 1080p | 1000 h 1080p | 100 h 4K | 300 h 4K | 1000 h 4K |
|---|---|---|---|---|---|---|---|---|---|
| FFmpeg próprio (VPS KVM 4, estimativa) | 2,38 | 7,15 | 23,83 | 3,97 | 11,91 | 39,71 | 15,88 | 47,65 | 159 |
| AWS MediaConvert (Basic, AVC) | 135 | 405 | 1.174 | 225 | 675 | 1.810 | 405 | 1.079 | 3.082 |
| Google Transcoder API | 270 | 810 | 2.700 | 450 | 1.350 | 4.500 | 810 | 2.430 | 8.100 |
| Mux (qualidade plus) | 149 | 432 | 1.381 | 186 | 540 | 1.727 | 595 | 1.728 | 5.525 |
| Mux (qualidade basic) | 0,00 | 0,00 | 0,00 | 0,00 | 0,00 | 0,00 | 0,00 | 0,00 | 0,00 |
| Cloudflare Stream | 0,00 | 0,00 | 0,00 | 0,00 | 0,00 | 0,00 | 0,00 | 0,00 | 0,00 |
| Bunny Stream (padrão) | 0,00 | 0,00 | 0,00 | 0,00 | 0,00 | 0,00 | 0,00 | 0,00 | 0,00 |

Como cada linha foi calculada:

- **FFmpeg próprio (estimativa):** VPS Hostinger KVM 4 (4 vCPU AMD EPYC) a US$ 28,99/mês na renovação, ou US$ 0,0397 por hora de máquina. Supomos que o ladder 720p leva 0,6 h de CPU por hora de aula, o 1080p 1,0 h e o 4K 4,0 h (x264 preset medium/veryfast para conteúdo de baixa complexidade; **não medido**, validar com um teste real de encode da aula de 5 h que o IAE já tem). Mesmo errando por um fator de 5, o custo continua irrisório. O custo real é de engenharia (fila de jobs, retry, monitoramento) e de tempo: 1.000 h de 1080p levariam cerca de 6 semanas em uma única máquina de 4 vCPU. Para lotes grandes, alugar VPS temporários por hora (ou uma máquina maior) resolve.
- **AWS MediaConvert Basic (AVC):** minutos normalizados = minutos de saída x multiplicador (SD 1x, HD 2x, 4K 4x). Ladder 720p = 3x, 1080p = 5x, 4K = 9x por minuto de aula. Primeiros 100 mil minutos normalizados a US$ 0,0075, depois 0,0053. Exemplo: 1 h de aula em 1080p = 300 minutos normalizados = **US$ 2,25**.
- **Google Transcoder:** SD 0,015 + HD 0,03 por degrau HD + UHD 0,06. Ladder 1080p = US$ 0,075 por minuto de aula = **US$ 4,50 por hora**; ladder 4K = US$ 0,135/min, que bate com o exemplo oficial da página.
- **Mux plus:** por minuto de entrada na resolução do teto (720p US$ 0,025; 1080p 0,03125; 4K 0,10), com faixas de volume. **Mux basic é grátis** e, para aula com slides, a diferença de qualidade entre basic e plus tende a ser pequena (validar visualmente).
- **Cloudflare Stream e Bunny Stream:** encoding padrão grátis. Bunny Premium Encoding (opcional) custaria US$ 0,025 + 0,05 + 0,05 = US$ 0,125 por minuto de aula no ladder 1080p (US$ 7,50 por hora), não recomendado para este caso.
- Codecs: HEVC e AV1 reduzem o tamanho (Apple indica 1080p HEVC a 4,5 a 5,8 Mbps contra 6 a 7,8 Mbps em H.264, cerca de 25% menos), mas no MediaConvert custam 2x (HEVC) e 3,5x (AV1) o minuto normalizado e exigem um degrau H.264 de compatibilidade. Para aula, H.264 é o padrão recomendado; a decisão fica com o item 3 do Agente A.

## 5. Tabela 4: egress/entrega mensal (US$/mês) por número de alunos

Premissa: 6 h por aluno por mês e mix da seção 2.4. Linhas "GB entregues" e "minutos entregues" mostram o volume que gera a cobrança.

#### Egress mensal (US$), teto do ladder 720p
| Provedor | 50 alunos | 200 alunos | 1000 alunos | 5000 alunos |
|---|---|---|---|---|
| GB entregues/mês | 303 | 1.212 | 6.061 | 30.307 |
| Minutos entregues/mês | 18.000 | 72.000 | 360.000 | 1.800.000 |
| Cloudflare R2 (egress zero) | 0,00 | 0,00 | 0,00 | 0,00 |
| Cloudflare Stream (US$1/1.000 min) | 18,00 | 72,00 | 360 | 1.800 |
| Bunny CDN América do Sul (também B2/Wasabi + Bunny) | 13,64 | 54,55 | 273 | 1.364 |
| AWS CloudFront pay-as-you-go (América do Sul) | 0,00 | 23,35 | 557 | 3.140 |
| AWS CloudFront plano fixo | 15,00 | 15,00 | 15,00 | 200 |
| Google Cloud CDN (América do Sul) | 25,54 | 102 | 511 | 2.014 |
| DigitalOcean Spaces (excedente de 1 TiB) | 0,00 | 1,05 | 46,21 | 272 |
| Mux (por minuto entregue) | 0,00 | 0,00 | 208 | 1.284 |
| Hostinger VPS (banda do plano) | incluso no plano | incluso no plano | incluso no plano | incluso no plano |

#### Egress mensal (US$), teto do ladder 1080p
| Provedor | 50 alunos | 200 alunos | 1000 alunos | 5000 alunos |
|---|---|---|---|---|
| GB entregues/mês | 517 | 2.068 | 10.341 | 51.705 |
| Minutos entregues/mês | 18.000 | 72.000 | 360.000 | 1.800.000 |
| Cloudflare R2 (egress zero) | 0,00 | 0,00 | 0,00 | 0,00 |
| Cloudflare Stream (US$1/1.000 min) | 18,00 | 72,00 | 360 | 1.800 |
| Bunny CDN América do Sul (também B2/Wasabi + Bunny) | 23,27 | 93,07 | 465 | 2.327 |
| AWS CloudFront pay-as-you-go (América do Sul) | 0,00 | 118 | 1.026 | 5.361 |
| AWS CloudFront plano fixo | 15,00 | 15,00 | 15,00 | 200 (Business; 51,7 TB, 3% acima da franquia de 50 TB, tolerado pela regra de uso) |
| Google Cloud CDN (América do Sul) | 43,47 | 174 | 869 | 3.210 |
| DigitalOcean Spaces (excedente de 1 TiB) | 0,00 | 9,02 | 86,07 | 471 |
| Mux (por minuto entregue) | 0,00 | 0,00 | 260 | 1.605 |
| Hostinger VPS (banda do plano) | incluso no plano | incluso no plano | incluso no plano | estoura banda (52 TB) |

#### Egress mensal (US$), teto do ladder 4K
| Provedor | 50 alunos | 200 alunos | 1000 alunos | 5000 alunos |
|---|---|---|---|---|
| GB entregues/mês | 900 | 3.599 | 17.996 | 89.978 |
| Minutos entregues/mês | 18.000 | 72.000 | 360.000 | 1.800.000 |
| Cloudflare R2 (egress zero) | 0,00 | 0,00 | 0,00 | 0,00 |
| Cloudflare Stream (US$1/1.000 min) | 18,00 | 72,00 | 360 | 1.800 |
| Bunny CDN América do Sul (também B2/Wasabi + Bunny) | 40,49 | 162 | 810 | 4.049 |
| AWS CloudFront pay-as-you-go (América do Sul) | 0,00 | 286 | 1.830 | 8.806 |
| AWS CloudFront plano fixo | 15,00 | 15,00 | 15,00 | Premium, preço sob consulta (acima de 50 TB) |
| Google Cloud CDN (América do Sul) | 75,55 | 302 | 1.315 | 5.349 |
| DigitalOcean Spaces (excedente de 1 TiB) | 0,00 | 23,28 | 157 | 828 |
| Mux (por minuto entregue) | 0,00 | 0,00 | 832 | 5.136 |
| Hostinger VPS (banda do plano) | incluso no plano | incluso no plano | incluso no plano | estoura banda (90 TB) |

Notas da Tabela 4:

- **Cloudflare R2:** egress zero. Custos residuais: operações classe B (US$ 0,36 por milhão, só em cache miss) e Workers para validar token (US$ 5/mês fixo + US$ 0,30 por milhão acima de 10 M). No pior caso (5.000 alunos, 18 milhões de segmentos/mês sem cache nenhum) somaria cerca de US$ 3 de classe B e US$ 2,40 de Workers. Esses valores entram na Tabela 5.
- **Bunny:** a mesma linha vale para Bunny Stream, Bunny Storage + CDN, B2 + Bunny CDN e Wasabi + Bunny CDN (o egress da origem para a Bunny é grátis no B2 e no Bunny Storage). Se a rede Volume da Bunny (US$ 0,005/GB, 10 PoPs) atender bem o Brasil, a entrega cairia para 1/9 do valor mostrado; **não confirmamos se há PoP da rede Volume na América do Sul** (pendência).
- **CloudFront pay-as-you-go:** já desconta o 1 TB grátis e inclui requisições acima de 10 milhões (US$ 0,022 por 10 mil).
- **CloudFront plano fixo:** Pro US$ 15 enquanto a conta ficar abaixo de 10 milhões de requisições e 50 TB; acima disso, Business US$ 200 (125 M req). Em 5.000 alunos com 4K (90 TB) seria necessário o Premium configurado acima de 50 TB, cujo preço não está publicado.
- **Google Cloud CDN:** preço por GiB convertido do volume em GB; inclui lookup de cache (US$ 0,0075 por 10 mil). Não inclui cache fill (US$ 0,01 a 0,04/GiB sobre o que sai da origem), que acrescenta pouco.
- **DigitalOcean Spaces:** os US$ 5 da assinatura (contados na Tabela 2) já incluem 1 TiB de saída; aqui só o excedente a US$ 0,01/GiB. É a opção "simples" mais barata por GB entregue entre os object storages com CDN embutida, mas não tem região no Brasil.
- **Mux:** 100 mil minutos grátis por mês cobrem até cerca de 277 alunos a 6 h. Acima disso, cobrança por minuto.
- **Hostinger VPS:** banda inclusa até 8/16/32 TB conforme o plano, mas há três limites práticos: a porta de 1 Gbps (pico estimado de 160 streams simultâneos com 5.000 alunos, perto do limite), a falta de CDN (todo aluno baixa do mesmo servidor, latência maior e risco de derrubar o app junto) e o disco (Tabela 2). Com 5.000 alunos em 1080p (52 TB) a banda do maior plano estoura.
- **Backblaze B2 direto, sem CDN (alternativa não tabelada):** o egress grátis de 3x o armazenado é grande. Com 1.000 h em 1080p (3,7 TB) o B2 libera 11,2 TB/mês grátis, suficiente para 1.000 alunos (10,3 TB). Com 5.000 alunos, pagaria 40,5 TB x US$ 0,01 = US$ 405/mês. Desvantagens: sem cache de borda no Brasil (B2 tem regiões só nos EUA, Canadá e Europa), latência maior e controle de acesso mais trabalhoso.

## 6. Tabela 5: custo total mensal e acumulado (12, 24, 36 meses)

Total mensal = armazenamento + entrega + fixos. Acumulado = transcoding único + N x mensal (acervo e alunos constantes). Valores em US$ salvo as colunas em R$ (cotação 5,03). A coluna "Domina" mostra o maior componente da conta mensal e sua participação.

Pilhas avaliadas:

- **Cloudflare R2 + FFmpeg próprio:** R2 para os segmentos HLS, entrega pelo cache da Cloudflare (egress zero), Workers Paid (US$ 5) para validar acesso, transcoding no VPS.
- **Cloudflare Stream:** tudo gerenciado, cobrado por minuto.
- **Bunny Stream:** encoding grátis, armazenamento por GB (1 região), entrega pela Bunny CDN América do Sul.
- **Mux (basic):** tudo gerenciado, por minuto, encoding grátis.
- **AWS pay-as-you-go:** S3 N. Virginia + CloudFront por GB + MediaConvert Basic.
- **AWS plano fixo:** S3 (descontado o crédito do plano) + CloudFront Pro ou Business + MediaConvert.
- **B2 + Bunny CDN + FFmpeg:** armazenamento mais barato do mercado com entrega da Bunny.
- **Google:** GCS Iowa + Cloud CDN + Transcoder API.
- **Hostinger VPS único:** vídeo no disco do VPS, servido pelo próprio servidor (arquitetura (a) do Agente A).

O cenário S0 foi acrescentado para mostrar o custo de hoje (um curso de 24 h mais as 5 h já gravadas, arredondado para 30 h, e 50 alunos).


#### S0: Hoje: 30 h, 50 alunos, 1080p

| Pilha | Armazen. /mês | Entrega /mês | Fixo /mês | Transcode (1x) | Total /mês USD | Total /mês R$ | Acum. 12 m USD | Acum. 24 m USD | Acum. 36 m USD | Acum. 36 m R$ | Domina |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Cloudflare R2 + FFmpeg próprio | 1,53 | 0,00 | 5,00 | 1,19 | **6,53** | 32,85 | 79,56 | 158 | 236 | 1.189 | fixo (77%) |
| Cloudflare Stream | 9,00 | 18,00 | 0,00 | 0,00 | **27,00** | 136 | 324 | 648 | 972 | 4.889 | entrega (67%) |
| Bunny Stream | 1,12 | 23,27 | 0,00 | 0,00 | **24,39** | 123 | 293 | 585 | 878 | 4.416 | entrega (95%) |
| Mux (basic) | 5,40 | 0,00 | 0,00 | 0,00 | **5,40** | 27,16 | 64,80 | 130 | 194 | 978 | armazenamento (100%) |
| AWS S3 + CloudFront PAYG + MediaConvert | 2,58 | 0,00 | 0,00 | 67,50 | **2,58** | 12,96 | 98,43 | 129 | 160 | 806 | armazenamento (100%) |
| AWS S3 + CloudFront plano fixo + MediaConvert | 1,43 | 15,00 | 0,00 | 67,50 | **16,43** | 82,63 | 265 | 462 | 659 | 3.314 | entrega (91%) |
| Backblaze B2 + Bunny CDN + FFmpeg | 0,71 | 23,27 | 0,00 | 1,19 | **23,98** | 121 | 289 | 577 | 864 | 4.348 | entrega (97%) |
| Google GCS + Cloud CDN + Transcoder | 2,24 | 43,47 | 0,00 | 135 | **45,71** | 230 | 684 | 1.232 | 1.781 | 8.957 | entrega (95%) |
| Hostinger VPS único + FFmpeg (KVM 4 (renovação)) | 28,99 | 0,00 | 0,00 | 1,19 | **28,99** | 146 | 349 | 697 | 1.045 | 5.256 | plano fixo (VPS) |

#### S1: 100 h, 50 alunos, 720p

| Pilha | Armazen. /mês | Entrega /mês | Fixo /mês | Transcode (1x) | Total /mês USD | Total /mês R$ | Acum. 12 m USD | Acum. 24 m USD | Acum. 36 m USD | Acum. 36 m R$ | Domina |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Cloudflare R2 + FFmpeg próprio | 2,08 | 0,00 | 5,00 | 2,38 | **7,08** | 35,60 | 87,31 | 172 | 257 | 1.294 | fixo (71%) |
| Cloudflare Stream | 30,00 | 18,00 | 0,00 | 0,00 | **48,00** | 241 | 576 | 1.152 | 1.728 | 8.692 | armazenamento (62%) |
| Bunny Stream | 1,49 | 13,64 | 0,00 | 0,00 | **15,12** | 76,07 | 181 | 363 | 544 | 2.739 | entrega (90%) |
| Mux (basic) | 14,40 | 0,00 | 0,00 | 0,00 | **14,40** | 72,43 | 173 | 346 | 518 | 2.608 | armazenamento (100%) |
| AWS S3 + CloudFront PAYG + MediaConvert | 3,42 | 0,00 | 0,00 | 135 | **3,42** | 17,18 | 176 | 217 | 258 | 1.298 | armazenamento (100%) |
| AWS S3 + CloudFront plano fixo + MediaConvert | 2,27 | 15,00 | 0,00 | 135 | **17,27** | 86,85 | 342 | 549 | 757 | 3.805 | entrega (87%) |
| Backblaze B2 + Bunny CDN + FFmpeg | 0,96 | 13,64 | 0,00 | 2,38 | **14,60** | 73,44 | 178 | 353 | 528 | 2.656 | entrega (93%) |
| Google GCS + Cloud CDN + Transcoder | 2,97 | 25,54 | 0,00 | 270 | **28,51** | 143 | 612 | 954 | 1.296 | 6.520 | entrega (90%) |
| Hostinger VPS único + FFmpeg (KVM 4 (renovação)) | 28,99 | 0,00 | 0,00 | 2,38 | **28,99** | 146 | 350 | 698 | 1.046 | 5.261 | plano fixo (VPS) |

#### S2: 300 h, 200 alunos, 1080p

| Pilha | Armazen. /mês | Entrega /mês | Fixo /mês | Transcode (1x) | Total /mês USD | Total /mês R$ | Acum. 12 m USD | Acum. 24 m USD | Acum. 36 m USD | Acum. 36 m R$ | Domina |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Cloudflare R2 + FFmpeg próprio | 16,66 | 0,00 | 5,00 | 11,91 | **21,66** | 109 | 272 | 532 | 792 | 3.982 | armazenamento (77%) |
| Cloudflare Stream | 90,00 | 72,00 | 0,00 | 0,00 | **162** | 815 | 1.944 | 3.888 | 5.832 | 29.335 | armazenamento (56%) |
| Bunny Stream | 11,21 | 93,07 | 0,00 | 0,00 | **104** | 524 | 1.251 | 2.503 | 3.754 | 18.882 | entrega (89%) |
| Mux (basic) | 54,00 | 0,00 | 0,00 | 0,00 | **54,00** | 272 | 648 | 1.296 | 1.944 | 9.778 | armazenamento (100%) |
| AWS S3 + CloudFront PAYG + MediaConvert | 25,77 | 118 | 0,00 | 675 | **143** | 721 | 2.394 | 4.114 | 5.833 | 29.339 | entrega (82%) |
| AWS S3 + CloudFront plano fixo + MediaConvert | 24,62 | 15,00 | 0,00 | 675 | **39,62** | 199 | 1.150 | 1.626 | 2.101 | 10.570 | armazenamento (62%) |
| Backblaze B2 + Bunny CDN + FFmpeg | 7,72 | 93,07 | 0,00 | 11,91 | **101** | 507 | 1.221 | 2.431 | 3.640 | 18.310 | entrega (92%) |
| Google GCS + Cloud CDN + Transcoder | 22,41 | 174 | 0,00 | 1.350 | **196** | 987 | 3.706 | 6.061 | 8.417 | 42.337 | entrega (89%) |
| Hostinger VPS único + FFmpeg | não comporta | | | | | | | | | | |

#### S3: 1.000 h, 1.000 alunos, 1080p

| Pilha | Armazen. /mês | Entrega /mês | Fixo /mês | Transcode (1x) | Total /mês USD | Total /mês R$ | Acum. 12 m USD | Acum. 24 m USD | Acum. 36 m USD | Acum. 36 m R$ | Domina |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Cloudflare R2 + FFmpeg próprio | 55,88 | 0,00 | 5,00 | 39,71 | **60,88** | 306 | 770 | 1.501 | 2.231 | 11.223 | armazenamento (92%) |
| Cloudflare Stream | 300 | 360 | 0,00 | 0,00 | **660** | 3.320 | 7.920 | 15.840 | 23.760 | 119.513 | entrega (55%) |
| Bunny Stream | 37,35 | 465 | 0,00 | 0,00 | **503** | 2.529 | 6.032 | 12.065 | 18.097 | 91.028 | entrega (93%) |
| Mux (basic) | 179 | 260 | 0,00 | 0,00 | **439** | 2.208 | 5.268 | 10.536 | 15.804 | 79.494 | entrega (59%) |
| AWS S3 + CloudFront PAYG + MediaConvert | 85,91 | 1.026 | 0,00 | 1.810 | **1.112** | 5.592 | 15.151 | 28.491 | 41.832 | 210.413 | entrega (92%) |
| AWS S3 + CloudFront plano fixo + MediaConvert | 84,75 | 15,00 | 0,00 | 1.810 | **99,75** | 502 | 3.007 | 4.204 | 5.401 | 27.168 | armazenamento (85%) |
| Backblaze B2 + Bunny CDN + FFmpeg | 25,89 | 465 | 0,00 | 39,71 | **491** | 2.471 | 5.935 | 11.829 | 17.724 | 89.152 | entrega (95%) |
| Google GCS + Cloud CDN + Transcoder | 74,70 | 869 | 0,00 | 4.500 | **944** | 4.749 | 15.830 | 27.160 | 38.490 | 193.606 | entrega (92%) |
| Hostinger VPS único + FFmpeg | não comporta | | | | | | | | | | |

#### S4: 1.000 h, 5.000 alunos, 1080p

| Pilha | Armazen. /mês | Entrega /mês | Fixo /mês | Transcode (1x) | Total /mês USD | Total /mês R$ | Acum. 12 m USD | Acum. 24 m USD | Acum. 36 m USD | Acum. 36 m R$ | Domina |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Cloudflare R2 + FFmpeg próprio | 55,88 | 0,00 | 7,40 | 39,71 | **63,27** | 318 | 799 | 1.558 | 2.318 | 11.658 | armazenamento (88%) |
| Cloudflare Stream | 300 | 1.800 | 0,00 | 0,00 | **2.100** | 10.563 | 25.200 | 50.400 | 75.600 | 380.268 | entrega (86%) |
| Bunny Stream | 37,35 | 2.327 | 0,00 | 0,00 | **2.364** | 11.891 | 28.369 | 56.738 | 85.107 | 428.087 | entrega (98%) |
| Mux (basic) | 179 | 1.605 | 0,00 | 0,00 | **1.784** | 8.974 | 21.408 | 42.816 | 64.224 | 323.047 | entrega (90%) |
| AWS S3 + CloudFront PAYG + MediaConvert | 85,91 | 5.361 | 0,00 | 1.810 | **5.447** | 27.398 | 67.173 | 132.537 | 197.900 | 995.439 | entrega (98%) |
| AWS S3 + CloudFront plano fixo + MediaConvert (franquia 50 TB levemente excedida) | 62,91 | 200 | 0,00 | 1.810 | **263** | 1.322 | 4.965 | 8.120 | 11.275 | 56.711 | entrega (76%) |
| Backblaze B2 + Bunny CDN + FFmpeg | 25,89 | 2.327 | 0,00 | 39,71 | **2.353** | 11.834 | 28.271 | 56.502 | 84.734 | 426.211 | entrega (99%) |
| Google GCS + Cloud CDN + Transcoder | 74,70 | 3.210 | 0,00 | 4.500 | **3.285** | 16.522 | 43.916 | 83.331 | 122.747 | 617.418 | entrega (98%) |
| Hostinger VPS único + FFmpeg | não comporta | | | | | | | | | | |

#### S5: 300 h, 200 alunos, 4K

| Pilha | Armazen. /mês | Entrega /mês | Fixo /mês | Transcode (1x) | Total /mês USD | Total /mês R$ | Acum. 12 m USD | Acum. 24 m USD | Acum. 36 m USD | Acum. 36 m R$ | Domina |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Cloudflare R2 + FFmpeg próprio | 47,03 | 0,00 | 5,00 | 47,65 | **52,03** | 262 | 672 | 1.296 | 1.921 | 9.662 | armazenamento (90%) |
| Cloudflare Stream (entrega máx. 1080p) | 90,00 | 72,00 | 0,00 | 0,00 | **162** | 815 | 1.944 | 3.888 | 5.832 | 29.335 | armazenamento (56%) |
| Bunny Stream | 31,46 | 162 | 0,00 | 0,00 | **193** | 973 | 2.321 | 4.642 | 6.963 | 35.023 | entrega (84%) |
| Mux (basic) | 173 | 0,00 | 0,00 | 0,00 | **173** | 869 | 2.074 | 4.147 | 6.221 | 31.291 | armazenamento (100%) |
| AWS S3 + CloudFront PAYG + MediaConvert | 72,35 | 286 | 0,00 | 1.079 | **358** | 1.802 | 5.378 | 9.677 | 13.976 | 70.297 | entrega (80%) |
| AWS S3 + CloudFront plano fixo + MediaConvert | 71,20 | 15,00 | 0,00 | 1.079 | **86,20** | 434 | 2.113 | 3.147 | 4.182 | 21.034 | armazenamento (83%) |
| Backblaze B2 + Bunny CDN + FFmpeg | 21,79 | 162 | 0,00 | 47,65 | **184** | 924 | 2.253 | 4.458 | 6.663 | 33.513 | entrega (88%) |
| Google GCS + Cloud CDN + Transcoder | 62,91 | 302 | 0,00 | 2.430 | **365** | 1.837 | 6.811 | 11.193 | 15.574 | 78.339 | entrega (83%) |
| Hostinger VPS único + FFmpeg | não comporta | | | | | | | | | | |

#### S6: 1.000 h, 1.000 alunos, 4K

| Pilha | Armazen. /mês | Entrega /mês | Fixo /mês | Transcode (1x) | Total /mês USD | Total /mês R$ | Acum. 12 m USD | Acum. 24 m USD | Acum. 36 m USD | Acum. 36 m R$ | Domina |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Cloudflare R2 + FFmpeg próprio | 157 | 0,00 | 5,00 | 159 | **162** | 815 | 2.104 | 4.050 | 5.995 | 30.157 | armazenamento (97%) |
| Cloudflare Stream (entrega máx. 1080p) | 300 | 360 | 0,00 | 0,00 | **660** | 3.320 | 7.920 | 15.840 | 23.760 | 119.513 | entrega (55%) |
| Bunny Stream | 105 | 810 | 0,00 | 0,00 | **915** | 4.601 | 10.976 | 21.952 | 32.927 | 165.624 | entrega (89%) |
| Mux (basic) | 573 | 832 | 0,00 | 0,00 | **1.405** | 7.066 | 16.858 | 33.715 | 50.573 | 254.381 | entrega (59%) |
| AWS S3 + CloudFront PAYG + MediaConvert | 241 | 1.830 | 0,00 | 3.082 | **2.071** | 10.416 | 27.930 | 52.778 | 77.627 | 390.462 | entrega (88%) |
| AWS S3 + CloudFront plano fixo + MediaConvert | 240 | 15,00 | 0,00 | 3.082 | **255** | 1.283 | 6.142 | 9.202 | 12.262 | 61.679 | armazenamento (94%) |
| Backblaze B2 + Bunny CDN + FFmpeg | 72,80 | 810 | 0,00 | 159 | **883** | 4.439 | 10.750 | 21.341 | 31.932 | 160.620 | entrega (92%) |
| Google GCS + Cloud CDN + Transcoder | 210 | 1.315 | 0,00 | 8.100 | **1.525** | 7.672 | 26.402 | 44.704 | 63.006 | 316.922 | entrega (86%) |
| Hostinger VPS único + FFmpeg | não comporta | | | | | | | | | | |
## 7. Conclusão: qual componente domina

### 7.1 Veredito sobre a hipótese dos sócios

**Refutada para o caso geral, confirmada em dois casos específicos.**

| Cenário | Provedores com entrega por GB (Bunny, B2+Bunny, AWS pay-as-you-go, Google) | Provedores por minuto (Mux, Cloudflare Stream) | R2 e AWS plano fixo |
|---|---|---|---|
| S0 hoje (30 h, 50 alunos, 1080p) | Entrega domina (95% a 97%), exceto AWS pay-as-you-go, que cabe no 1 TB grátis | Mux: armazenamento (entrega grátis até 100 mil min); Stream: entrega (67%) | Fixos (Workers, plano Pro) dominam; tudo abaixo de US$ 17 |
| S1 (100 h, 50 alunos, 720p) | Entrega 90% a 93% (AWS pay-as-you-go: armazenamento, por causa do 1 TB grátis) | Armazenamento (Mux 100%, Stream 62%) | Fixos |
| S2 (300 h, 200 alunos, 1080p) | **Entrega 82% a 92%** | Armazenamento (Mux 100%, Stream 56%) | Armazenamento (62% a 77%) |
| S3 (1.000 h, 1.000 alunos, 1080p) | **Entrega 92% a 95%** | **Entrega** (Mux 59%, Stream 55%) | Armazenamento (85% a 92%) |
| S4 (1.000 h, 5.000 alunos, 1080p) | **Entrega 98% a 99%** | **Entrega** (Mux 90%, Stream 86%) | R2: armazenamento (88%); AWS fixo: entrega (plano Business, 76%) |
| S5 (300 h, 200 alunos, 4K) | **Entrega 80% a 88%** | Armazenamento (Mux 100%, Stream 56%) | Armazenamento (83% a 90%) |
| S6 (1.000 h, 1.000 alunos, 4K) | **Entrega 86% a 92%** | **Entrega** (Mux 59%, Stream 55%) | Armazenamento (94% a 97%) |

Resumo para o relatório:

1. **Com CDN cobrada por GB, a entrega domina sempre que houver mais do que algumas dezenas de alunos.** Isso é o que acontece em Bunny, AWS pay-as-you-go, Google, DigitalOcean e B2 com CDN paga.
2. **Os sócios têm razão quando a entrega é zerada ou fixa.** Com R2 atrás da Cloudflare ou com o plano fixo do CloudFront, o armazenamento vira o maior item, mas a conta total fica entre US$ 22 e US$ 263 por mês mesmo com 1.000 h de acervo e 5.000 alunos. Ou seja: armazenamento domina justamente nas arquiteturas em que o custo total é baixo.
3. **Em provedores por minuto, o armazenamento domina enquanto a audiência é pequena** (o Mux não cobra os primeiros 100 mil minutos entregues) e a entrega passa a dominar a partir de cerca de 300 a 1.000 alunos.
4. **O transcoding pode ser o maior gasto do primeiro ano** nas pilhas AWS e Google: no S3, o Google Transcoder custa US$ 4.500 uma vez, contra US$ 75/mês de armazenamento. Com FFmpeg próprio ou serviços com encoding grátis, esse item desaparece.
5. **O custo por aluno é baixo em qualquer cenário em relação ao ticket:** em 1080p, entrega por aluno/mês = US$ 0 (R2), US$ 0,36 (Mux e Stream, após franquia), US$ 0,47 (Bunny, R$ 2,34), US$ 0,87 (Google), US$ 1,14 (AWS pay-as-you-go, R$ 5,72). Contra um curso de R$ 2.000 ou uma assinatura mensal, a infraestrutura de vídeo não ameaça a margem; o risco real é escolher uma pilha cara e ficar preso nela ao escalar.

### 7.2 Ponto de virada: a partir de quantos alunos a entrega passa o armazenamento (1080p)

Fórmula: entrega mensal = armazenamento mensal quando N alunos = custo de armazenamento por hora de acervo x H horas / custo de entrega por aluno.

| Provedor | Armazenamento por hora de acervo/mês | Entrega por aluno/mês | Virada (N alunos para H horas de acervo) | Exemplo com 300 h |
|---|---|---|---|---|
| Bunny Stream | US$ 0,037 | US$ 0,465 | N = 0,08 x H | 24 alunos |
| B2 + Bunny CDN | US$ 0,026 | US$ 0,465 | N = 0,056 x H | 17 alunos |
| Google GCS + Cloud CDN | US$ 0,075 | US$ 0,87 | N = 0,086 x H | 26 alunos |
| AWS S3 + CloudFront pay-as-you-go | US$ 0,086 | US$ 1,14 (após 1 TB grátis, cerca de 97 alunos) | N = 97 + 0,076 x H | 120 alunos |
| Mux (basic) | US$ 0,18 | US$ 0,36 (após 100 mil min grátis, cerca de 277 alunos) | N = 277 + 0,5 x H | 427 alunos |
| Cloudflare Stream | US$ 0,30 | US$ 0,36 | N = 0,83 x H | 250 alunos |
| Cloudflare R2 | US$ 0,056 | US$ 0 | nunca | nunca |
| AWS CloudFront plano fixo Pro | US$ 0,086 | US$ 15 fixos até cerca de 2.700 alunos | armazenamento passa os US$ 15 com cerca de 190 h | n/a |

### 7.3 Onde o custo "dá degrau"

| Degrau | Onde acontece | Efeito |
|---|---|---|
| Fim do free tier do Mux | 100 mil min entregues/mês, cerca de **277 alunos** a 6 h/mês | Entrega passa de US$ 0 para US$ 0,001/min (1080p) |
| Fim do free tier do CloudFront pay-as-you-go | 1 TB/mês, cerca de **97 alunos em 1080p** (165 em 720p) | Entrega passa de US$ 0 para US$ 0,11/GB |
| CloudFront plano fixo Pro para Business | 10 milhões de requisições/mês, cerca de **2.700 alunos** com segmentos de 6 s (4.600 com segmentos de 10 s) | De US$ 15 para US$ 200/mês |
| CloudFront plano fixo acima de 50 TB | cerca de **4.800 alunos em 1080p** ou 2.800 em 4K | Exige Premium (US$ 1.000) configurado acima de 50 TB, preço não publicado |
| Cloudflare R2 free tier | 10 GB, ou seja, cerca de 2,7 h de acervo em 1080p | Irrelevante: a partir daí US$ 0,015/GB |
| Workers Paid | 10 M req/mês inclusas | US$ 0,30 por milhão adicional, irrelevante até milhares de alunos |
| Cloudflare Stream | blocos pré-pagos de 1.000 min armazenados (US$ 5) | Degrau de US$ 5 a cada 16,7 h de acervo; teto técnico de 1080p |
| Mux armazenamento | 50 mil min (833 h) | Preço por minuto cai cerca de 3% |
| Mux resolução | 720p, 1080p, 1440p, 4K | Cada salto de teto multiplica armazenamento e entrega: 1080p custa 1,25x o 720p; 4K custa 3,2x o 1080p |
| Hostinger VPS disco | KVM 4 (200 GB) cabe cerca de 40 h em 1080p; KVM 8 (400 GB) cerca de 96 h | Acima disso não há plano maior padrão; precisa de storage externo |
| Hostinger VPS banda e porta | 8/16/32 TB/mês e porta de 1 Gbps | 5.000 alunos em 1080p estouram a banda do maior plano |
| Hostinger promoção para renovação | Fim do primeiro ciclo | KVM 4 vai de US$ 12,99 para US$ 28,99 (2,2x) |
| Wasabi mínimo | 1 TB cobrado sempre; retenção mínima de 90 dias | Até 1 TB paga US$ 7,99 fixos |
| Wasabi regra de egress | Egress maior que o volume armazenado | Uso "não adequado", risco de suspensão: não usar como origem de vídeo |
| Backblaze B2 egress | 3x o volume armazenado | Acima disso US$ 0,01/GB (ou grátis via Bunny/Cloudflare) |
| DigitalOcean Spaces | 250 GiB e 1 TiB inclusos nos US$ 5 | Excedente US$ 0,02/GiB armazenado e US$ 0,01/GiB entregue |
| Google Cloud CDN / CloudFront faixas | 10 TiB/10 TB | Preço por GB cai (Google de 0,09 para 0,06; AWS de 0,110 para 0,105) |
| Mudança de teto 1080p para 4K | Qualquer provedor | Armazenamento x2,8; entrega x1,7 (por GB) ou x3,2 (Mux) |

### 7.4 Recomendação de custo para o consolidador

- **Enxuto (agora até cerca de 300 h e 200 alunos):** qualquer opção gerenciada cabe em menos de US$ 165/mês. Bunny Stream (US$ 15 a 104/mês nos cenários S1 e S2) ou Mux basic (US$ 14 a 54/mês, entrega grátis até 277 alunos) são as que exigem menos engenharia. R2 + FFmpeg custa menos ainda (US$ 7 a 22/mês), mas exige montar o pipeline.
- **Recomendado (crescimento até milhares de alunos):** R2 + cache Cloudflare + FFmpeg próprio, com a esteira de encoding rodando num VPS separado do app. Custo praticamente insensível ao número de alunos: US$ 61 a 63/mês com 1.000 h de acervo, de 1.000 a 5.000 alunos.
- **Alternativa "nuvem grande":** AWS S3 + CloudFront plano fixo. US$ 100 a 263/mês nos cenários grandes, previsível, com URLs assinadas e WAF, mas com risco de "ajuste de entrega" se a franquia for excedida de forma sustentada e com MediaConvert caro no encoding (trocar por FFmpeg próprio reduz o custo único).
- **Evitar para este caso:** Hostinger VPS como armazenamento e entrega de vídeo (não escala no disco nem na banda, e coloca app e vídeo no mesmo ponto de falha); Google Transcoder e AWS pay-as-you-go sem plano fixo (os mais caros em quase todos os cenários); Wasabi como origem.
- **4K:** em qualquer provedor, o teto 4K custa cerca de 2,6 a 3,2 vezes o 1080p na conta mensal (exceto R2 e AWS fixo, em que só o armazenamento cresce). Para aula de professor com slides, o benefício visual é pequeno; a decisão de qualidade é do item 3 do Agente A, mas o custo do degrau está mostrado aqui.

## 8. Blocos JSON para a calculadora

### parametros_calculadora

```json
{
  "parametros_calculadora": {
    "cotacao": {"usd_brl": 5.03, "fonte": "AwesomeAPI", "data": "2026-10-13"},
    "hostinger_vps": {
      "modelo": "plano_fixo",
      "planos": [
        {"nome": "KVM 2", "disco_gb": 100, "banda_tb_mes": 8, "porta_gbps": 1, "preco_promo_usd": 8.99, "preco_renovacao_usd": 14.99},
        {"nome": "KVM 4", "disco_gb": 200, "banda_tb_mes": 16, "porta_gbps": 1, "preco_promo_usd": 12.99, "preco_renovacao_usd": 28.99},
        {"nome": "KVM 8", "disco_gb": 400, "banda_tb_mes": 32, "porta_gbps": 1, "preco_promo_usd": 25.99, "preco_renovacao_usd": 49.99}
      ],
      "storage_usd_gb_mes": null,
      "egress_usd_gb": 0,
      "transcode_usd_min": 0.00066,
      "minimo_mensal_usd": 14.99,
      "free_tier": "banda inclusa no plano",
      "observacoes": "Sem object storage na Hostinger. Disco limita o acervo a ~96 h em 1080p (KVM 8). transcode_usd_min é estimativa de CPU do FFmpeg (ladder 1080p, KVM 4). Reservar 40 GB para sistema."
    },
    "google_cloud": {
      "storage_usd_gb_mes": 0.020,
      "storage_unidade": "GiB",
      "egress_usd_gb": 0.09,
      "egress_unidade": "GiB",
      "egress_faixas": [{"ate_tib": 10, "usd": 0.09}, {"ate_tib": 150, "usd": 0.06}, {"ate_tib": 1024, "usd": 0.05}, {"acima": true, "usd": 0.04}],
      "requisicoes_usd_10k": 0.0075,
      "cache_fill_usd_gib": [0.01, 0.04],
      "transcode_usd_min": {"sd": 0.015, "hd": 0.03, "uhd": 0.06, "audio": 0.005},
      "transcode_ladder_usd_min": {"720p": 0.045, "1080p": 0.075, "4k": 0.135},
      "minimo_mensal_usd": 0,
      "free_tier": "5 GB-mes de storage Standard em us-central1/us-east1/us-west1; 100 GB egress da America do Norte",
      "observacoes": "GCS Standard Iowa. Cloud CDN com preco da America do Sul. Transcoder cobra por minuto de saida, somando degraus."
    },
    "aws_payg": {
      "storage_usd_gb_mes": 0.023,
      "storage_usd_gb_mes_sao_paulo": 0.0405,
      "egress_usd_gb": 0.110,
      "egress_faixas": [{"ate_tb": 1, "usd": 0}, {"ate_tb": 10, "usd": 0.110}, {"ate_tb": 50, "usd": 0.105}, {"ate_tb": 150, "usd": 0.090}],
      "requisicoes_usd_10k": 0.022,
      "requisicoes_gratis_mes": 10000000,
      "transcode_usd_min_normalizado": {"basic_ate_100k": 0.0075, "basic_100k_1m": 0.0053, "basic_acima_1m": 0.0038},
      "transcode_multiplicador_avc": {"sd": 1, "hd": 2, "4k": 4},
      "transcode_ladder_usd_min": {"720p": 0.0225, "1080p": 0.0375, "4k": 0.0675},
      "minimo_mensal_usd": 0,
      "free_tier": "CloudFront: 1 TB e 10 M req por mes, sempre",
      "observacoes": "S3 N. Virginia + CloudFront America do Sul + MediaConvert Basic AVC. S3 para CloudFront sem custo."
    },
    "aws_cloudfront_plano_fixo": {
      "modelo": "plano_fixo",
      "planos": [
        {"nome": "Free", "usd_mes": 0, "dados_tb": 0.1, "requisicoes": 1000000, "credito_s3_gb": 5},
        {"nome": "Pro", "usd_mes": 15, "dados_tb": 50, "requisicoes": 10000000, "credito_s3_gb": 50},
        {"nome": "Business", "usd_mes": 200, "dados_tb": 50, "requisicoes": 125000000, "credito_s3_gb": 1000},
        {"nome": "Premium", "usd_mes": 1000, "dados_tb": 50, "requisicoes": 500000000, "credito_s3_gb": 5000, "configuravel_ate_tb": 600}
      ],
      "storage_usd_gb_mes": 0.023,
      "egress_usd_gb": 0,
      "transcode_usd_min": "igual aws_payg",
      "minimo_mensal_usd": 15,
      "free_tier": "sem cobranca de excedente; primeiro pico ate 3x tolerado",
      "observacoes": "Franquia nao e limite rigido: uso acima sustentado por 2 a 3 meses pode ter entrega ajustada. Exige WAF. Suporta URLs assinadas. Requisicoes HLS: ~600 por hora assistida com segmentos de 6 s."
    },
    "cloudflare_r2": {
      "storage_usd_gb_mes": 0.015,
      "storage_ia_usd_gb_mes": 0.01,
      "egress_usd_gb": 0,
      "ops_classe_a_usd_milhao": 4.50,
      "ops_classe_b_usd_milhao": 0.36,
      "transcode_usd_min": 0.00066,
      "fixo_workers_usd_mes": 5,
      "workers_req_inclusas": 10000000,
      "workers_usd_milhao_extra": 0.30,
      "minimo_mensal_usd": 0,
      "free_tier": "10 GB-mes, 1 M ops classe A, 10 M ops classe B",
      "observacoes": "Entrega pelo cache Cloudflare com dominio proprio (Developer Platform, permitido para video pelos termos). transcode_usd_min e estimativa de FFmpeg proprio. Workers opcional para validar acesso."
    },
    "cloudflare_stream": {
      "modelo": "por_minuto",
      "stream_storage_usd_min": 0.005,
      "stream_delivery_usd_min": 0.001,
      "transcode_usd_min": 0,
      "resolucao_maxima": "1080p",
      "minimo_mensal_usd": 5,
      "free_tier": "nenhum",
      "observacoes": "Armazenamento pre-pago em blocos de 1.000 min (US$ 5). Encoding e banda inclusos. H.264, ABR 360p a 1080p. Upload ate 30 GB."
    },
    "bunny_stream": {
      "storage_usd_gb_mes": 0.01,
      "storage_replicacao_usd_gb": {"segunda_regiao": 0.01, "terceira_em_diante": 0.005},
      "egress_usd_gb": 0.045,
      "egress_usd_gb_regioes": {"europa_america_norte": 0.01, "america_sul": 0.045, "asia_oceania": 0.03, "oriente_medio_africa": 0.06},
      "egress_volume_network_usd_gb": 0.005,
      "transcode_usd_min": 0,
      "premium_encoding_usd_min": {"2160p_1440p": 0.15, "1080p_720p": 0.05, "480p_240p": 0.025},
      "transcricao_usd_min_idioma": 0.10,
      "drm_mediacage_usd_mes": 99,
      "drm_licenca_usd": 0.005,
      "minimo_mensal_usd": 1,
      "free_tier": "nenhum",
      "observacoes": "Cada resolucao gerada e cobrada como armazenamento (usar GB do ladder). Mesmo preco de egress para Bunny Storage + CDN."
    },
    "backblaze_b2": {
      "storage_usd_gb_mes": 0.00695,
      "egress_usd_gb": 0.01,
      "egress_gratis_multiplo_storage": 3,
      "egress_gratis_parceiros": ["Cloudflare", "bunny.net", "Fastly", "CacheFly"],
      "transcode_usd_min": 0.00066,
      "minimo_mensal_usd": 0,
      "free_tier": "10 GB de storage; egress gratis ate 3x o armazenado",
      "observacoes": "Combinar com Bunny CDN (egress B2 para Bunny gratis, entrega a 0.045/GB). Servir video so pelo CDN gratis da Cloudflare a partir do B2 e zona cinzenta nos termos."
    },
    "digitalocean_spaces": {
      "storage_usd_gb_mes": 0.02,
      "storage_unidade": "GiB",
      "egress_usd_gb": 0.01,
      "egress_unidade": "GiB",
      "incluso": {"storage_gib": 250, "egress_gib": 1024},
      "transcode_usd_min": 0.00066,
      "minimo_mensal_usd": 5,
      "free_tier": "250 GiB e 1 TiB de saida inclusos nos US$ 5",
      "observacoes": "CDN embutida. Sem regiao no Brasil."
    },
    "wasabi": {
      "storage_usd_gb_mes": 0.0078,
      "egress_usd_gb": 0,
      "transcode_usd_min": null,
      "minimo_mensal_usd": 7.99,
      "free_tier": "egress gratis desde que egress mensal <= volume armazenado",
      "observacoes": "Minimo de 1 TB e retencao minima de 90 dias. Nao usar como origem de video (viola a regra de egress). Serve para backup de masters."
    },
    "mux": {
      "modelo": "por_minuto",
      "stream_storage_usd_min": {"720p": 0.0024, "1080p": 0.0030, "1440p": 0.0048, "4k": 0.0096},
      "stream_storage_faixas_min": [50000, 150000, 250000],
      "stream_delivery_usd_min": {"720p": 0.0008, "1080p": 0.0010, "1440p": 0.0016, "4k": 0.0032},
      "stream_delivery_faixas_min": [500000, 1000000, 2000000, 6000000, 10000000],
      "delivery_gratis_min_mes": 100000,
      "transcode_usd_min": {"basic": 0, "plus_720p": 0.025, "plus_1080p": 0.03125, "plus_1440p": 0.05, "plus_4k": 0.10},
      "cold_storage_desconto": {"30_dias_sem_play": 0.40, "90_dias_sem_play": 0.60},
      "minimo_mensal_usd": 0,
      "free_tier": "100.000 min entregues por mes; credito de uso de US$ 20/mes citado na pagina",
      "observacoes": "Basic tem cobranca minima de 1 mes de armazenamento por ativo. Calculadora deve usar a resolucao do teto do ladder."
    }
  }
}
```

### premissas

```json
{
  "premissas": {
    "codec": "H.264/AVC, 30 fps, audio AAC 128 kbps",
    "segmento_hls_s": 6,
    "requisicoes_por_hora_assistida": 600,
    "bitrate_mbps": {"360p": 0.8, "480p": 1.2, "720p": 2.5, "1080p": 5.0, "4k": 15.0},
    "gb_por_hora": {"360p": 0.36, "480p": 0.54, "720p": 1.125, "1080p": 2.25, "4k": 6.75},
    "ladder_armazenado_gb_por_hora": {"720p": 1.485, "1080p": 3.735, "4k": 10.485},
    "ladder_degraus": {"720p": ["360p", "720p"], "1080p": ["360p", "720p", "1080p"], "4k": ["360p", "720p", "1080p", "4k"]},
    "mix_assistido": {
      "720p": {"720p": 0.85, "360p": 0.15},
      "1080p": {"1080p": 0.60, "720p": 0.30, "360p": 0.10},
      "4k": {"4k": 0.25, "1080p": 0.45, "720p": 0.25, "360p": 0.05}
    },
    "gb_entregue_por_hora_assistida": {"720p": 1.01, "1080p": 1.723, "4k": 3.0},
    "horas_por_aluno_mes": 6,
    "horas_por_aluno_mes_faixa_sugerida": [2, 12],
    "pico_simultaneo_fator": 4,
    "disco_reservado_sistema_gb": 40,
    "transcode_cpu_horas_por_hora_video": {"720p": 0.6, "1080p": 1.0, "4k": 4.0},
    "usd_brl": 5.03,
    "data_precos": "2026-10-13",
    "sensibilidade_bitrate_apple": "usar 3 Mbps (720p) e 6 Mbps (1080p) aumenta storage e egress em ~20%"
  }
}
```

Fórmulas para a calculadora (consolidador):

- `gb_armazenados = horas_acervo x ladder_armazenado_gb_por_hora[teto]`
- `minutos_armazenados = horas_acervo x 60`
- `gb_entregues_mes = alunos x horas_por_aluno_mes x gb_entregue_por_hora_assistida[teto]`
- `minutos_entregues_mes = alunos x horas_por_aluno_mes x 60`
- `requisicoes_mes = alunos x horas_por_aluno_mes x 600`
- Provedor por GB: `mensal = gb_armazenados x storage + max(0, gb_entregues - franquia) x egress (com faixas) + fixos`
- Provedor por minuto: `mensal = minutos_armazenados x stream_storage + max(0, minutos_entregues - franquia) x stream_delivery`
- `acumulado_N = transcode_unico + N x mensal`, com `transcode_unico = minutos_acervo x transcode_ladder_usd_min[teto]`

## Confiança

**Fato verificado (página oficial aberta em 13/10/2026):**

- Preços de Cloudflare R2, Cloudflare Stream, Cloudflare Workers, Bunny CDN, Bunny Storage, Bunny Stream (inclui Premium Encoding, transcrição e DRM), Mux (tabelas completas por resolução e faixa), Backblaze B2, Wasabi (preço, mínimo de 1 TB, 90 dias, regra de egress), DigitalOcean Spaces, AWS S3 (do JSON oficial de preços da AWS), CloudFront pay-as-you-go (América do Sul), CloudFront planos fixos (franquias, regra de excedente, recursos não suportados), AWS MediaConvert (tarifas e multiplicadores), Google Cloud CDN (faixas por região), Google Transcoder (por minuto), GCS Standard Iowa (US$ 0,000027397/GiB-hora, convertido para US$ 0,020/GiB-mês com 730 h), Hostinger VPS (planos, disco, banda, porta 1 Gbps, preço promocional e de renovação em USD e BRL).
- Cloudflare Stream entrega H.264 de 360p a 1080p (documentação via Context7).
- Termos da Cloudflare exigem Developer Platform, Images ou Stream para servir vídeo pela CDN fora do Enterprise.
- Bitrates de referência e segmento de 6 s da especificação HLS da Apple.

**Estimativa (premissa nossa, sem medição):**

- Bitrates de 2,5 Mbps (720p), 5 Mbps (1080p) e 15 Mbps (4K) para aula com slides; mix de resolução assistida; 6 h por aluno por mês; fator de pico 4x para o VPS.
- Custo de CPU do FFmpeg (0,6 / 1,0 / 4,0 h de CPU por hora de vídeo). Deve ser validado com um encode real da aula de 5 h existente.
- Cobrança do Mux pela resolução do teto (pode ser menor se for pela resolução entregue).
- Hostinger: ausência de object storage inferida por URLs que retornam 404 e pela página de preços sem menção ao produto; não confirmamos com o suporte.
- Custo de transcoding e entrega supõe acervo e alunos constantes; crescimento real muda o acumulado.
- Impostos e IOF não incluídos (pagamento em USD com cartão brasileiro tem IOF; nota fiscal de serviço importado pode ter tributos).

**Sem resposta / pendências:**

- GCS São Paulo (southamerica-east1): preço não extraído (a página carrega por região via script); usamos Iowa.
- Se a rede Volume da Bunny (US$ 0,005/GB) tem PoP na América do Sul e qual a latência para o Brasil.
- Preço do CloudFront Premium configurado acima de 50 TB (não publicado).
- Se o crédito de US$ 20/mês do Mux pay as you go é automático para qualquer conta (texto da página ambíguo); não aplicado nos cálculos.
- Pesquisa de comunidade dos últimos 30 dias (skill last30days) sobre custos de vídeo voltou sem sinal útil (Reddit com limite de requisições e resultados fora do tema); não há relato recente de comunidade incorporado.
- WebSearch ficou indisponível durante a pesquisa (limite de buscas da sessão esgotado); todos os números vieram de WebFetch/curl direto nas páginas oficiais.

## Fontes

Todas acessadas em 13/10/2026.

- Cloudflare R2 pricing: https://developers.cloudflare.com/r2/pricing/
- Cloudflare Stream pricing: https://developers.cloudflare.com/stream/pricing/
- Cloudflare Stream FAQ: https://developers.cloudflare.com/stream/faq/
- Cloudflare Stream upload: https://developers.cloudflare.com/stream/uploading-videos/
- Cloudflare Stream (docs via Context7, resoluções 360p a 1080p): https://developers.cloudflare.com/stream/index.md
- Cloudflare Workers pricing: https://developers.cloudflare.com/workers/platform/pricing/
- Cloudflare cache, tamanho máximo cacheável: https://developers.cloudflare.com/cache/concepts/default-cache-behavior/
- Cloudflare Service-Specific Terms: https://www.cloudflare.com/service-specific-terms-application-services/
- Bunny CDN pricing: https://bunny.net/pricing/
- Bunny Storage pricing: https://bunny.net/pricing/storage/
- Bunny Stream: https://bunny.net/stream/
- Bunny Stream pricing (docs): https://bunny.net/docs/stream-pricing
- Mux pricing: https://www.mux.com/pricing
- Mux Video pricing (tabelas por resolução): https://www.mux.com/docs/pricing/video
- Backblaze B2 pricing: https://www.backblaze.com/cloud-storage/pricing
- Wasabi pricing: https://wasabi.com/pricing
- Wasabi pricing FAQ: https://wasabi.com/pricing/faq
- DigitalOcean Spaces pricing: https://www.digitalocean.com/pricing/spaces-object-storage
- AWS S3 pricing: https://aws.amazon.com/s3/pricing/
- AWS S3 price list JSON: https://b0.p.awsstatic.com/pricing/2.0/meteredUnitMaps/s3/USD/current/s3.json
- AWS CloudFront pricing (planos fixos): https://aws.amazon.com/cloudfront/pricing/
- AWS CloudFront pay-as-you-go: https://aws.amazon.com/cloudfront/pricing/pay-as-you-go/
- AWS CloudFront flat-rate plans (guia): https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/flat-rate-pricing-plan.html
- AWS MediaConvert pricing: https://aws.amazon.com/mediaconvert/pricing/
- Google Cloud Storage pricing: https://cloud.google.com/storage/pricing
- Google Cloud CDN pricing: https://cloud.google.com/cdn/pricing
- Google Transcoder API pricing: https://cloud.google.com/transcoder/pricing
- Hostinger VPS (USD): https://www.hostinger.com/vps-hosting
- Hostinger VPS (BRL): https://www.hostinger.com.br/servidor-vps
- Hostinger pricing (sem object storage): https://www.hostinger.com/pricing
- Apple HLS Authoring Specification: https://developer.apple.com/documentation/http-live-streaming/hls-authoring-specification-for-apple-devices
- Cotação USD/BRL 5,03: AwesomeAPI, 13/10/2026 (informada pelo orquestrador)
