# Agente E, parte 1: consolidação e checagem cruzada

- **Data:** 13/10/2026.
- **Cotação:** USD 1 = R$ 5,03 (AwesomeAPI, 13/10/2026, a mesma dos quatro agentes). Valores em reais são conversão direta, sem IOF (3,5% no cartão internacional, Decreto 12.466/2025) e sem spread bancário.
- **Arquivos lidos, inteiros:** `PROMPT.md`, `a-infraestrutura.md`, `b-referencias-funcionalidades.md`, `c-precificacao-modelo-de-servico.md`, `d-mercado-captacao-regulatorio.md`, `verificacao-a.md`, `verificacao-b.md`, `verificacao-c.md`, `verificacao-d.md`.
- **Regra de precedência usada aqui:** (1) a verificação cética prevalece sobre o arquivo do agente quando os dois divergem; (2) o arquivo do agente prevalece sobre o resumo que o orquestrador repassou, porque os arquivos A e C já incorporaram parte das correções. Exemplos: o resumo do Agente A ainda fala em Mux US$ 439 e economia de US$ 378/mês no cenário 1.000 h + 1.000 alunos; o arquivo já aplica o crédito de US$ 20/mês do Mux (confirmado pela verificação) e chega a **US$ 419** e **US$ 358**. O resumo do B fala em capacidade de 60 a 75 dias-pessoa; a verificação derruba para **23 a 38**.
- **Marcação:** cada divergência da checagem cruzada recebe um código **[Dn]**. As que continuam sem decisão aparecem na seção 3.

---

## 1. Decisões consolidadas

### 1.1 As 15 decisões em uma tabela

| # | Decisão | Número-chave (USD) | Número-chave (BRL) | Base |
|---|---|---|---|---|
| 1 | **Arquitetura inicial: compor.** App próprio (Next.js + FastAPI + Postgres no Coolify, VPS que nunca toca no arquivo de vídeo) + **Mux Basic** para vídeo + cópia dos masters em **Cloudflare R2** + gateway Asaas + Zoom para live. Camada `VideoProvider` no FastAPI, campo `provider` na tabela `lesson_video` e componente `<AulaPlayer>` | Mux hoje US$ 5,40/mês de uso, coberto pelo crédito de US$ 20 | R$ 0 de Mux hoje | A 8.1, B 2.4, verificação A |
| 2 | **Evolução sem reescrever:** fase 3 troca o Mux por R2 + FFmpeg em worker separado quando a conta do Mux passar de cerca de US$ 400/mês | Cenário 1.000 h + 1.000 alunos: Mux US$ 419 contra R2 US$ 60,88; economia US$ 358/mês | R$ 2.108 contra R$ 306; economia R$ 1.801/mês | A 8.2, A2 Tabela 5 S3 |
| 3 | **Hipótese "armazenamento domina" refutada no caso geral:** com entrega cobrada por GB ou por minuto, a entrega é 80% a 99% da conta a partir de poucas dezenas de alunos. Armazenamento só domina com entrega zero ou fixa (R2, CloudFront plano fixo) ou dentro da franquia de 100 mil min do Mux (cerca de 277 alunos a 6 h/mês) | Com 5.000 alunos: R2 US$ 63 contra AWS pay-as-you-go US$ 5.447 (86 vezes) | R$ 318 contra R$ 27.398 | A2.7 |
| 4 | **Custo de infra do cenário recomendado** (Mux + masters R2 + Zoom), por mês | Hoje US$ 9,51 a 19,02; 300 h e 200 alunos US$ 55,13 a 76,24; 1.000 h e 1.000 alunos US$ 463,75 a 508,49 | R$ 47,84 a 95,67; R$ 277,30 a 383,49; R$ 2.332,66 a 2.557,70 | A 8.4 (com crédito Mux) |
| 5 | **Qualidade:** ladder H.264 30 fps 360p/540p/720p/1080p; encoder começa em 600/1.200/2.000/3.500 kbps de vídeo + 128 kbps de áudio; custo projetado com 5 Mbps no topo (2,25 GB/h) por conservadorismo; teste de 10 min com a aula real decide | 1080p: 1,63 a 2,25 GB por hora assistida no topo; 3,5 a 3,74 GB por hora de acervo | n/a | A 3, contradição C1 |
| 6 | **4K não.** Master guardado na maior resolução, entrega até 1080p, 1440p como degrau opcional pago | No Mux, 4K custa 3,2 vezes o 1080p em armazenamento e entrega; conta mensal 2,6 a 3,2 vezes | n/a | A 3.4, A2.7.4 |
| 7 | **Lives:** MVP com Zoom Pro (desconto de 50% para sem fins lucrativos) e link único por aluno; fase 2 LiveKit Cloud Ship embutido, híbrido com plateia em HLS acima de cerca de 100 pessoas; fallback OBS para Cloudflare Stream Live ou YouTube não listado | Zoom Pro US$ 8,50 (com desconto) a 16,99/mês; LiveKit Ship US$ 50/mês fixo (US$ 52,40 no cenário IAE) | R$ 42,76 a 85,46; R$ 263,57 | A3.7 |
| 8 | **Proteção:** URL assinada de 1 a 4 h com renovação silenciosa, restrição de domínio, sem download, 2 sessões simultâneas, termos com multa; marca d'água visual com nome e e-mail parcial (sem CPF, por LGPD). DRM só na fase 3, com gatilho | Infra US$ 0; DRM Mux US$ 100/mês + US$ 0,003/licença (US$ 101,80 no cenário IAE) | R$ 0; R$ 512,05 | A3.8.5, verificação A, D 3.3 |
| 9 | **Gateway: Asaas.** Pix e boleto R$ 1,99, cartão 2,99% + R$ 0,49, até 12x, Pix Automático, NFS-e a R$ 0,49. Plano B Pagar.me. Não usar Hotmart, Stripe nem Vindi | Hotmart cobraria US$ 39,86 por venda de R$ 2.000 | Asaas R$ 1,99 (Pix) a R$ 60,29 (cartão) contra Hotmart R$ 200,49 | B 5 |
| 10 | **Setup (projeto fechado), três cenários:** enxuto, recomendado e premium. O recomendado é condição de parceiro fundador, abaixo da mediana de pleno | Enxuto US$ 2.783; recomendado US$ 5.567; premium US$ 10.934 a 13.917 | **R$ 14.000; R$ 28.000; R$ 55.000 a 70.000** | C 3.2, verificação C |
| 11 | **Recorrência:** sustentação obrigatória por faixa de alunos ativos + ciclos semanais de evolução vendidos em planos, com pausa; funcionalidades do catálogo medidas em ciclos (a ideia do Rib, sem aluguel por funcionalidade) | Ciclo US$ 397,61 | Sustentação **R$ 1.500/mês** (até 500 alunos; R$ 2.500 até 2.000; R$ 4.000 até 10.000); ciclo **R$ 2.000**; Ritmo 2 ciclos **R$ 3.800/mês**; Intenso 4 ciclos **R$ 7.200/mês** | C 3.3 |
| 12 | **Infra repassada a custo, contas no CNPJ e no cartão do IAE**, margem 0%; nossa gestão da infra está dentro da sustentação | Margem 0% | Exceção (conta nossa): +10% de gestão, e o câmbio come 7% a 10% | C 4, verificação C |
| 13 | **Prazo:** o MVP completo da lista de B (47,5 dias-pessoa, mais 6 a 10 de design, QA e migração) **não cabe** até 05/12/2026 com três sócios CLT (capacidade realista de 23 a 38 dias-pessoa). Até 05/12 entra o **Marco 1** (cerca de 30 dias-pessoa: aula online assistível, compra e live por link). Clube de membros e o resto do MVP vão para o **Marco 2** (jan a mar/2027 no plano Intenso) | n/a | n/a | B 4.3, verificação B, verificação C |
| 14 | **Regulatório:** vender como "curso", "programa de formação" e "certificado de conclusão" de curso livre. Não usar "pós-graduação", "especialização", "MBA" nem "extensão" sem IES. A pós de 1 a 2 anos só com IES credenciada no formato certo (360 h, no mínimo 30% de docentes com stricto sensu) | n/a | n/a | D 3, verificação D |
| 15 | **Esteira de edição automática fica guardada na manga.** Spike de 1 dia com a aula de 5 h para a próxima reunião; entrega completa só se o cliente pedir, sempre "a IA propõe, o admin aprova", em worker separado da VPS do app | US$ 0,12 a 1,28 por hora de aula processada | R$ 0,60 a 6,44 por hora; aula de 3 h R$ 1,81 a 19,32; esforço 13 a 20 dias com MCP | B 3, verificação B |

### 1.2 Arquitetura: inicial e evolução

**Inicial (Marco 1, até 05/12/2026).** O professor ou a Helena sobe o vídeo do navegador direto para o Mux (direct upload com URL gerada pelo FastAPI). O Mux transcodifica em Basic (grátis), gera legenda automática em português (grátis), entrega por CDN com token assinado. O webhook `video.asset.ready` marca a aula como pronta no Postgres. O FastAPI decide quem pode assistir e guarda o progresso. O master vai também para um bucket R2 (US$ 0,015/GB-mês) como seguro contra lock-in. A VPS Hostinger roda Next.js, FastAPI, Postgres e um worker leve de webhooks; nunca transcodifica nem serve vídeo. Upload com `max_resolution_tier: "1080p"`, `video_quality: "basic"`, `playback_policies: ["signed"]`, `generated_subtitles` em `pt`. Player: Mux Player encapsulado em `<AulaPlayer>`.

**Por que não as alternativas no início:** VPS com MP4 não tem bitrate adaptativo, divide banda com o app e é baixável. R2 + FFmpeg próprio é o mais barato em todos os cenários, mas coloca fila, ladder, HLS, assinatura e legendas no colo de quem não domina vídeo. AWS e Google só terceirizam a CPU e têm o encoding mais caro (Google Transcoder US$ 4.500 e MediaConvert US$ 1.810 para 1.000 h em 1080p). Bunny Stream e Cloudflare Stream ficam como alternativas gerenciadas, mas são mais caros que o Mux em todos os cenários 1080p do benchmark.

**Evolução:**

| Fase | O que muda na infra | O que não muda | Gatilho |
|---|---|---|---|
| Marco 1 (até 05/12/2026) | Mux Basic 1080p, H.264, legendas pt, Mux Player, direct upload, webhook, masters em R2 | `VideoProvider`, `lesson_video.provider`, `<AulaPlayer>` | n/a |
| Marco 2 (jan a mar/2027) | Ingestão automática da gravação do Zoom pelo webhook `recording.completed` (baixar em até 24 h), marca d'água | Idem | Fim do Marco 1 |
| Fase 2 (1º sem/2027) | Busca na transcrição, capítulos, agente de IA lendo transcrições (pgvector), LiveKit Cloud Ship embutido, degrau 1440p pago se o cliente quiser | Idem | Marco 2 estável por 30 dias; turma online vendida fora do Rio |
| Fase 3 (2º sem/2027 em diante) | Acervo migra para R2 + FFmpeg em worker separado (ou contrato de volume com o Mux); segunda ladder AV1 se a entrega dominar; DRM se houver gatilho | Telas e regras de acesso | Conta do Mux acima de cerca de US$ 400/mês; vazamento comprovado; contrato B2B que exija DRM; mais de cerca de 1.000 alunos ativos |

### 1.3 Custo de infraestrutura por cenário de serviço (vídeo + live, por mês)

Premissas: 6 h assistidas por aluno por mês; 1080p; Mux Basic com o crédito de US$ 20/mês nos cenários enxuto e recomendado; masters em R2 a 2,25 a 4,5 GB/h; Zoom Pro até 100 participantes e Zoom Business (US$ 11 com desconto, US$ 21,99 cheio) a partir de 200 alunos; premium com Mux Plus, DRM Mux e LiveKit, sem o crédito. Sem servidor da aplicação, sem impostos e sem IOF.

| Cenário | Hoje: 30 h, 50 alunos | 300 h, 200 alunos | 1.000 h, 1.000 alunos | Custo único (encoding) |
|---|---|---|---|---|
| Enxuto (Mux sem masters + Zoom com desconto) | US$ 8,50 (R$ 42,76) | US$ 45,00 (R$ 226,35) | US$ 430,00 (R$ 2.162,90) | US$ 0 |
| **Recomendado** (Mux + masters R2 + Zoom com desconto a cheio) | **US$ 9,51 a 19,02 (R$ 47,84 a 95,67)** | **US$ 55,13 a 76,24 (R$ 277,30 a 383,49)** | **US$ 463,75 a 508,49 (R$ 2.332,66 a 2.557,70)** | US$ 0 |
| Premium (Mux Plus + R2 + DRM + LiveKit) | US$ 161,81 a 162,82 (R$ 813,90 a 818,98) | US$ 672,16 a 682,29 (R$ 3.380,99 a 3.431,92) | US$ 1.128,79 a 1.162,54 (R$ 5.677,81 a 5.847,58) | US$ 56,25 / 540 / 1.727 |

Acumulado do recomendado: 12 meses hoje US$ 114,15 a 228,18; 36 meses com 1.000 h e 1.000 alunos US$ 16.695 a 18.305,64 (acervo e alunos constantes).

**Benchmark resumido, vídeo apenas, 1080p, por mês:**

| Pilha | Hoje (S0: 30 h, 50 alunos) | S2: 300 h, 200 alunos | S3: 1.000 h, 1.000 alunos | S4: 1.000 h, 5.000 alunos |
|---|---|---|---|---|
| Mux Basic (com crédito) | US$ 0 | US$ 34 (R$ 171) | US$ 419 (R$ 2.108) | US$ 1.764 (R$ 8.873) |
| R2 + FFmpeg próprio | US$ 6,53 | US$ 21,66 | US$ 60,88 (R$ 306) | US$ 63,27 (R$ 318) |
| AWS S3 + CloudFront plano fixo | US$ 16,43 | US$ 39,62 | US$ 99,75 (R$ 502) | US$ 263 (R$ 1.322) |
| Bunny Stream (Standard, América do Sul) | US$ 24,39 | US$ 104 | US$ 503 (R$ 2.529) | US$ 2.364 (R$ 11.891) |
| Cloudflare Stream | US$ 28,00 | US$ 162 | US$ 660 (R$ 3.320) | US$ 2.100 (R$ 10.563) |
| Google GCS + Cloud CDN + Transcoder | US$ 45,56 | US$ 195 | US$ 939 (R$ 4.723) | US$ 3.280 (R$ 16.496) |
| AWS S3 + CloudFront pay-as-you-go | US$ 2,58 | US$ 143 | US$ 1.112 (R$ 5.592) | US$ 5.447 (R$ 27.398) |
| Hostinger VPS único | US$ 28,99 | não comporta | não comporta | não comporta |

Custo de entrega por aluno por mês em 1080p: US$ 0 (R2), US$ 0,36 (Mux e Cloudflare Stream após franquia), US$ 0,47 (Bunny), US$ 0,87 (Google), US$ 1,14 (AWS pay-as-you-go). Contra um curso de R$ 2.000, a infra de vídeo não ameaça a margem; o risco é ficar preso a uma pilha cara.

### 1.4 Ladder de vídeo e veredito sobre 4K

| Degrau | Configuração do encoder (A1, ponto de partida) | Premissa de custo (A2, conservadora) | GB por hora (custo) |
|---|---|---|---|
| 360p | 600 + 128 kbps | 0,8 Mbps total | 0,36 |
| 540p | 1.200 + 128 kbps | (não usado no custo) | 0,60 (A1) |
| 720p | 2.000 + 128 kbps | 2,5 Mbps total | 1,125 |
| 1080p (topo) | 3.500 + 128 kbps (até 4.500 com muito movimento) | 5 Mbps total | 2,25 |
| 1440p (opcional pago) | não recomendado agora | 10 Mbps total (estimativa do consolidador, ver [D6]) | 4,5 |
| 2160p (4K) | não recomendado | 15 Mbps total (só realista com HEVC) | 6,75 |

- Codec: **só H.264 no MVP** (Brasil 78,78% Android; H.264 é o único com decodificação ampla). HEVC economiza 20% a 26% nos degraus 720p e 1080p da ladder da Apple (correção da verificação), mas exige segunda ladder; só quando a entrega for a maior linha da conta.
- **4K não se justifica:** slide em 1080p tem a resolução de um projetor Full HD; Zoom e Mux Live saem em até 1080p; no Mux, 4K custa 3,2 vezes o 1080p; na conta mensal, 2,6 a 3,2 vezes. Cloudflare Stream nem entrega 4K.
- **Ideia do Pedro, viável:** guardar o master na maior resolução, entregar até 1080p, e mostrar o degrau 1440p na calculadora com o custo à mostra. No Mux: `max_resolution_tier` no upload e `max-auto-resolution` no player.
- **Pendente:** codificar 10 min da aula real de 5 h (CRF 21, preset slow) e medir. Se o bitrate de A1 se confirmar, a entrega das tabelas cai até cerca de 27% e o armazenamento cerca de 6%.

### 1.5 Lives

| Cenário | Recomendação | Custo/mês |
|---|---|---|
| IAE hoje (4 lives de 3 h, 30 alunos) | Zoom Pro com desconto de sem fins lucrativos, 1 licença, o segundo professor como co-host, link único por aluno via API de registrants | US$ 8,50 (R$ 42,76); cheio US$ 16,99 (R$ 85,46) |
| Crescimento (8 lives de 3 h, 200 alunos) | Zoom Business (Pro limita a 100) | US$ 11 (R$ 55,33); cheio US$ 21,99 (R$ 110,61) |
| Fase 2, embutido | LiveKit Cloud Ship, híbrido (professores e alunos promovidos em WebRTC, plateia em HLS via Egress) | IAE US$ 52,40 (R$ 263,57); crescimento US$ 496,04 (R$ 2.495,08) |
| Fallback | OBS para Cloudflare Stream Live (chave pré-cadastrada) ou YouTube não listado, banner na plataforma | Cloudflare US$ 1,80/h com 30 espectadores; YouTube US$ 0 |

Comparativos corrigidos pela verificação: Daily no cenário IAE US$ 61,87 (US$ 64,03 se a gravação ficar no bucket da Daily); Daily no crescimento **US$ 1.085,69 (R$ 5.461,02)**, não US$ 1.048,69; Mux Live no cenário IAE US$ 4,66 depois do crédito, mas só se o VOD não estiver usando o mesmo crédito. Jitsi descartado (risco operacional alto onde a equipe é mais fraca); Google Meet inferior ao Zoom sem ser mais barato.

### 1.6 Nível de proteção

| Quando | O que entra | Custo |
|---|---|---|
| Marco 1 | Vídeo só para logado com direito ao curso; token assinado de 1 a 4 h com renovação silenciosa; restrição de domínio; sem botão de download, só HLS; limite de 2 reproduções simultâneas (tabela `playback_sessions`, heartbeat de 60 s); termos de uso com cláusula de uso pessoal | US$ 0 de infra; cerca de 2 dias (item 42 de B) |
| Marco 2 | Marca d'água visual dinâmica com **nome e e-mail parcial ou ID curto** (nunca CPF, ver [D14]) | US$ 0; cerca de 2 dias (item 43 de B) |
| Fase 2 | Relatório de suspeita de compartilhamento (mais de 3 cidades ou 5 dispositivos por semana); desativar gravação local no Zoom | US$ 0 |
| Fase 3, só com gatilho | DRM Mux (cobre VOD e live via `advanced_playback_policies`) ou Bunny MediaCage | Mux US$ 100/mês + US$ 0,003/licença: US$ 101,80 (R$ 512,05) com 30 alunos, US$ 160 (R$ 804,80) com 1.000; Bunny US$ 99/mês por biblioteca + US$ 0,005 a 0,003/licença por faixa |

DRM não impede gravação de tela, que é o vetor real de vazamento. Para advogado, ser identificável pela marca d'água tem peso reputacional e ético.

### 1.7 Construir vs comprar vs compor

**Veredito: COMPOR.** Construímos o que o cliente mais valoriza e o que fazemos rápido (regras de acesso com assinatura e vitalício convivendo, bolsas UERJ e OAB, B2B por assentos, admin, agente de IA, trilha) e alugamos o que não é nosso forte (vídeo gerenciado, gateway, live). Motivos: o risco declarado dos sócios é vídeo, não funcionalidade; o tom institucional exige controle do design inteiro (checkout, e-mails, certificado); plataformas prontas cobram R$ 100 a R$ 200 por venda de R$ 2.000 (Hotmart 9,9% + R$ 2,49; Kiwify 8,99% + R$ 2,49; Eduzz 4,9% + R$ 2,49) e têm cara de infoproduto; as áreas de membros baratas não documentam hospedagem própria de vídeo; Thinkific limita banda (100 a 400 GB/mês) e só faz trilha no Plus.

**Plano B** (se o Marco 1 não estiver estável em meados de novembro): Thinkific Start (US$ 82/mês no anual, R$ 412,46; US$ 109/mês no mensal, R$ 548,27) ou Memberkit Essencial (R$ 197/mês, até 1.000 membros) com o vídeo no Mux que já teríamos contratado. Em ambos, contrato de vídeo e gateway seguem do IAE, o que facilita voltar ao app próprio.

### 1.8 Modelo de precificação: setup + recorrência + infra

**Estrutura recomendada (híbrida):** (1) setup do MVP como projeto fechado, parcelado 30% na assinatura, 30% na entrega do protótipo assistindo vídeo, 40% no go-live; (2) sustentação mensal obrigatória após o go-live; (3) ciclos semanais de evolução (segunda refinamento, quinta link de teste, sexta produção; pedido fora do ciclo entra na semana seguinte; canal oficial é o quadro, WhatsApp só para aviso; 1 pedido ativo por vez; pausa); (4) catálogo de funcionalidades medido em ciclos (P = 1, M = 2, G = 3 a 4, GG = projeto à parte); (5) infra repassada a custo na conta do IAE; (6) pacotes opcionais (agente de IA, esteira de edição, funil de aula gratuita, agente de WhatsApp) com preço em ciclos mais o custo de uso.

| Componente | Enxuto | Recomendado | Premium |
|---|---|---|---|
| Setup | R$ 14.000 (US$ 2.783), 12 a 15 pessoa-dias | **R$ 28.000 (US$ 5.567)**, 25 a 30 pessoa-dias | R$ 55.000 a 70.000 (US$ 10.934 a 13.917), 50 a 65 pessoa-dias; não cabe até dezembro |
| R$/h implícito | R$ 117 a 146 | R$ 117 a 140 (R$ 933 a 1.120 por dia de 8 h, abaixo da mediana de pleno de R$ 150 a 160/h) | R$ 106 a 175 |
| Recorrência mensal | Sustentação R$ 1.500 + 1 ciclo R$ 2.000 = **R$ 3.500/mês** | Sustentação R$ 1.500 + Ritmo R$ 3.800 = **R$ 5.300/mês** | Sustentação R$ 1.500 + Intenso R$ 7.200 = **R$ 8.700/mês** |
| Recorrência por semana (equivalente) | R$ 807,69 | R$ 1.223,08 | R$ 2.007,69 |
| Infra | Repasse a custo, conta do IAE, margem 0% | Idem | Idem |
| Custo total para o IAE em 12 meses (C 3.5) | R$ 56.100 (70% / 32% / 15% do faturamento estimado conservador / base / otimista) | R$ 89.900 (112% / 51% / 24%) | n/d |

Franqueza sobre o ciclo: R$ 1.000/semana é preço de júnior (R$ 67 a 83/h); **R$ 2.000 é pleno** (R$ 133 a 167/h). O modelo semanal puro (R$ 1.500 x 52 = R$ 78.000/ano) paga menos por hora (R$ 100 a 125/h) e não separa investimento de continuidade; não é que ele seja mais caro pelo que entrega (correção da verificação C). O setup de R$ 28.000 deve aparecer como **condição de parceiro fundador** (em troca de depoimento, case e logo), para não virar âncora do próximo cliente. O contrato pressupõe que temos **CNPJ** (multa de 2% e juros de 1% ao mês livres só entre pessoas jurídicas, Lei 14.905/2024) e deve ressalvar nossos componentes pré-existentes (Lei 9.609, art. 4º dá o código ao contratante por padrão). Pelo Simples, o cenário provável é o Anexo V (15,5%), porque os sócios CLT não tiram pró-labore.

### 1.9 Fases

| Fase | Período | Escopo (itens da lista de B) | Esforço | Critério para avançar |
|---|---|---|---|---|
| **Marco 1** | 20/10 a 05/12/2026 | 1 login, 2 papéis, 3 catálogo simples, 4 página do curso, 6 estrutura, 7 player com progresso, 8 velocidade e legenda, 9 continuar assistindo, 11 admin de conteúdo (4 dias, ajuste da verificação), 17 e-mails, 18 LGPD básica, 22 checkout vitalício (Pix e cartão via Asaas), 28 live por link do Zoom com publicação manual (0,5 dia), 41 vídeo gerenciado (Mux), 42 proteção básica. Mais design visual, QA com os 5 alunos atuais e migração do curso de 5 h | 24,5 dias-pessoa de funcionalidade + cerca de 5 a 6 de design, QA e migração = **cerca de 30** | Alunos atuais assistindo online; primeira venda online paga por Pix |
| **Marco 2** | jan a mar/2027 | 23 assinatura do clube convivendo com vitalício (primeiro item de janeiro), 27 benefícios do clube, 24 cupons e bolsas UERJ/OAB, 25 cancelamento e reembolso (3,5 dias), 26 NFS-e pelo Asaas, 14 e 15 certificado com QR e validação, 10 materiais, 12 comentários, 13 busca, 16 avaliação e depoimento, 5 página do professor, 19 agenda com .ics, 20 PWA, ingestão automática da gravação do Zoom (webhook), 43 marca d'água | **cerca de 29 dias-pessoa** (24 da lista de B + 2 de marca d'água + cerca de 3 de ingestão automática; 12 a 19 ciclos) | 30 dias sem incidente P1; clube vendendo |
| **Fase 2** | 1º sem/2027 | Itens 21, 29 a 40, 43, 45 a 47 de B: ao vivo integrado (LiveKit), transcrição e busca, agente de IA, convênios automáticos, comunidade enxuta, notificações, turmas, pílulas avulsas, quizzes, indicadores, CRM Nexoris e Analytics, funil de aula gratuita, presença, engajamento, B2B para escritórios (puxar para o início) | cerca de 62 dias-pessoa | Turma online vendida fora do Rio (São Paulo); 50 ou mais alunos ativos |
| **Fase 3** | 2º sem/2027 em diante | Itens 44 (DRM, só com gatilho), 48 a 51 (trilha, pré-requisito, histórico, certificação com IES), 52 (edição automática), 53 (app nativo); migração para R2 + FFmpeg | cerca de 60 dias-pessoa (com os ajustes da verificação: trilha 8 a 12, DRM 2 a 4 + licença, app 20 a 30) + parceria acadêmica | Convênio com IES assinado; Mux acima de US$ 400/mês; pedido do cliente |

**Onde a Helena entra:** ponte técnica do lado do IAE desde a semana 1 do projeto; testa o admin no Marco 1 (dona do painel); integra o site atual e o CRM Nexoris na fase 2 (item 39); recebe o MCP da esteira de edição se ela for contratada. Esquema de banco de programa, módulo, pré-requisito e histórico nasce no Marco 1 (custo dentro da modelagem), telas na fase 3.

**Como pagar o Marco 2:** o Plano Intenso de jan a mar (3 x R$ 7.200 = 12 ciclos) cobre o piso da estimativa (12 a 19 ciclos); no teto, faltam 1 a 2 meses de Intenso. Com Intenso por 3 meses e depois Ritmo, o custo do IAE em 12 meses vai a **R$ 100.100** (setup R$ 28.000 + sustentação R$ 16.500 + Intenso R$ 21.600 + Ritmo 8 meses R$ 30.400 + infra R$ 3.600): 125% do faturamento conservador, 57% do base, 26% do otimista. No Ritmo desde janeiro (2 ciclos por mês), o Marco 2 leva 6 a 10 meses e termina entre junho e outubro de 2027. Decisão em aberto [D10].

### 1.10 Regulatório e vocabulário (resumo para a proposta)

- Pode: "curso", "programa de formação", "formação executiva", "trilha", "certificado de conclusão" com carga horária, dizendo na página e no certificado que é curso livre.
- Não pode sem IES: "pós-graduação", "especialização", "MBA" (a equiparação vem da página do MEC, não da Res. CNE/CES 1/2018), "extensão".
- Pós com IES: a IES oferta e certifica; 360 h (cerca de 15 módulos de 24 h); no mínimo 30% de docentes com stricto sensu (art. 9º); formato limitado ao credenciamento da IES (Decreto 12.456/2025). UERJ é estadual: checar o Conselho Estadual de Educação do RJ além do e-MEC.
- LGPD: IAE controlador; nós operador (contrato de operador); provedores no CNPJ do IAE são operadores do IAE, não suboperadores nossos; transferência internacional com cláusulas-padrão da ANPD (prazo de adaptação venceu em 23/08/2025).
- Imagem e autoral: termo de cessão de imagem, voz e direitos autorais de cada professor antes de publicar, cobrindo IA e edição automática; aviso de gravação para alunos.
- Tributos: curso livre é item 8.02 da LC 116 (ISS); imunidade possível (CF art. 150, VI, c; CTN art. 14; LC 214/2025 art. 9º, III, para IBS e CBS); curso livre não tem a redução de 60% do Anexo II da LC 214; remuneração de dirigentes-professores precisa de contador (Lei 9.532, art. 12, §2º, "a", redação da Lei 13.204/2015, e §§4º a 6º).

---

## 2. Checagem cruzada

### 2.1 Os números de A batem com as fórmulas da calculadora de C?

**Resposta curta: as fórmulas de C (já corrigidas no arquivo, com `custoInfra(e)` pura) estão certas na estrutura; as constantes, não.** C usa bitrates, mix e horas assistidas próprios, mais baixos que os de A. Com as constantes de C, os provedores cobrados por GB saem 35% a 60% mais baratos que no benchmark de A. O bloco CALC (seção 4) usa as constantes de A.

| Código | Ponto | A diz | C diz | Efeito | Status |
|---|---|---|---|---|---|
| **[D1]** | GB por hora por degrau | 360p 0,36; 720p 1,125; 1080p 2,25; 4K 6,75 | 360p 0,27; 720p 0,68; 1080p 1,35; 1440p 2,70; 2160p 5,40 | Armazenamento 1080p de C é 0,62 do de A (2,30 contra 3,735 GB por hora de acervo) | **Resolvido no CALC: vale A** (o próprio C pede "substituir pelos valores do Agente A") |
| **[D2]** | Mix assistido 1080p | 60% 1080p, 30% 720p, 10% 360p = 1,7235 GB por hora assistida | 70% / 25% / 5% = 1,1285 GB/h | Entrega por GB de C é 0,65 da de A | **Resolvido no CALC: vale A** |
| **[D3]** | Horas assistidas por aluno por mês (padrão) | 6 h (faixa sugerida 2 a 12) | 4 h (faixa 0,5 a 20) | Entrega de C é 2/3 da de A no padrão | **Resolvido no CALC:** padrão 6 h, faixa do slider 0,5 a 20 |
| **[D4]** | R2: Workers | Fixo de US$ 5/mês (Workers Paid para validar acesso) | Sem Workers | R2 de C sai US$ 5 mais barato | **Resolvido no CALC:** Workers como fixo opcional, ligado por padrão |
| **[D5]** | Mux: faixas de volume | Armazenamento 1080p cai para US$ 0,0029 acima de 50 mil min; entrega 0,00095 entre 500 mil e 1 milhão de min pagos e 0,0009 acima | Preço único | C superestima o Mux em 1% a 4% em escala grande (exemplo 2: US$ 1.260 contra US$ 1.224) | **Resolvido no CALC** (faixas conhecidas incluídas) |
| **[D6]** | 1440p | A2 não tem degrau 1440p próprio (junta 1440p e 4K a 15 Mbps); Mux cobra 1440p à parte (armazenamento 0,0048, entrega 0,0016) | 1440p a 6 Mbps | Sem número de A para GB/h de 1440p | **Aberto (seção 3):** CALC usa 10 Mbps (2 vezes o 1080p de A, mesma razão de C), marcado como estimativa do consolidador |
| **[D7]** | Mux por resolução | Tabela completa 720p a 4K | Fixo em 1080p | A seleção de qualidade não afetava o Mux na calculadora de C | **Resolvido no CALC** |
| **[D8]** | Live na calculadora | Custos por hora e por participante, Zoom como licença fixa | `LIVE_USD_HORA.gerenciada = null`; Mux live em Plus 0,03125/min; entrega de live por participante (já corrigido) | Faltava custo de live para Zoom, LiveKit, 100ms, Daily | **Resolvido no CALC** (bloco `lives`) |
| **[D9]** | Bunny Stream: entrega | US$ 0,045/GB (Standard, América do Sul, tabela da CDN) | Mesmo valor como padrão (já corrigido); nota de que a página do Stream sugere cerca de US$ 0,03/GB | Até 1,5 vez de diferença | **Aberto:** confirmar com a Bunny qual tabela vale para o Stream; CALC usa 0,045 |
| D-ok | Cloudflare Stream | Blocos pré-pagos de 1.000 min (US$ 5); US$ 1 por 1.000 min entregues | Idem (`Math.ceil`) | Bate | Confirmado |
| D-ok | Mux crédito de US$ 20 | Um por conta, dividido entre VOD e live | `Math.max(0, total menos 20)` sobre VOD + live | Bate | Confirmado |
| D-ok | Infra no custo de 12 meses de C | Recomendado hoje R$ 47,84 a 95,67/mês; 300 h e 200 alunos R$ 277 a 383 | R$ 300/mês fixo | C é conservador no começo e coerente com a escala de 2027 | Confirmado como teto |

**Exemplos de C recalculados com as constantes de A** (1080p, 4 h assistidas, como em C):

| Exemplo | Provedor | C (constantes de C) | Com constantes de A | Diferença |
|---|---|---|---|---|
| 1: 100 h, 200 alunos x 4 h | Cloudflare Stream | US$ 78 | US$ 78 | igual (cobra por minuto) |
| 1 | Mux, sem lives | US$ 0 | US$ 0 | igual |
| 1 | Mux, com as lives padrão (4 x 3 h, Plus) | US$ 20,50 | US$ 20,50 | igual |
| 1 | Bunny Standard América do Sul | US$ 42,93 (R$ 216) | **US$ 65,78 (R$ 330,88)** | +53% |
| 1 | R2 (+ Workers) | US$ 3,30 (sem Workers) | **US$ 10,45** | +US$ 7 |
| 2: 1.000 h, 5.000 alunos x 4 h | Bunny Standard | US$ 1.038,65 (R$ 5.224) | **US$ 1.588,50 (R$ 7.990,16)** | +53% |
| 2 | Mux | US$ 1.260 | **US$ 1.224** (com faixas) | -3% |
| 2 | R2 (+ Workers) | US$ 34,35 | **US$ 60,88** | +77% |

As conclusões de C não mudam (egress domina em escala; infra do IAE em 2027 fica entre R$ 0 e cerca de R$ 500/mês; a maior linha da proposta é o serviço), mas os números absolutos da calculadora final devem ser os de A.

### 2.2 A lista de funcionalidades de B respeita a prioridade de infraestrutura de A?

**Em grande parte sim.** O único item difícil no MVP é o vídeo, e ele entra como serviço gerenciado (item 41, 3 dias); B deixa DRM, ao vivo integrado, edição automática e app nativo fora do MVP. Nada no MVP de B coloca carga de vídeo na VPS do app. Divergências:

| Código | Ponto | B | A | Recomendação |
|---|---|---|---|---|
| **[D11]** | Onde roda a esteira de edição (item 52) e transcrição local | b3: "FFmpeg e render rodam na VPS que já existe (custo marginal zero)" | "Nada de vídeo no volume do Coolify"; FFmpeg só em outro servidor, nunca na VPS do app (decisão dos sócios: funcionalidade nova não pode prejudicar o processamento) | **Prevalece A.** Esteira, Whisper local e qualquer re-encode em worker separado (VPS extra de cerca de US$ 28,99/mês na renovação ou máquina por hora). Somar esse custo ao pacote opcional da esteira |
| **[D12]** | Legendas e transcrição (item 30) | Fase 2, 3 dias, "Whisper" (corrigido para API) | Mux gera legenda pt grátis no upload; texto em `.txt` e `.vtt` para busca e IA | Legenda no player entra no **Marco 1** sem custo (configuração do upload). A busca e o agente de IA sobre a transcrição continuam na fase 2. C (escopo Recomendado) cita "Whisper": substituir por legenda automática do Mux |
| **[D13]** | Gravação da live no acervo | Item 28 (MVP): publicação manual; item 29 (fase 2): automática com sala própria | MVP com webhook `recording.completed` do Zoom (3 a 5 dias, token de 24 h) | Marco 1 manual (cabe no prazo); ingestão automática pelo webhook no **Marco 2**; sala própria (LiveKit) na fase 2 |
| **[D14]** | Marca d'água | Item 43 na fase 2, "nome e CPF do aluno" | MVP obrigatório, "nome + CPF parcial ou e-mail" | **Marco 2**, com nome e e-mail parcial ou ID curto. D (LGPD): nunca CPF |
| **[D15]** | Ao vivo integrado (item 29) | 8 dias | LiveKit embutido: 2 a 3 semanas (10 a 15 dias) | Usar 10 a 15 dias na fase 2 |
| **[D16]** | Esforço de DRM, trilha e app nativo | 44: 10+ dias; 48 a 50: 18 dias; 53: 15+ dias | Verificação B: DRM 2 a 4 dias + licença (com Mux); trilha 8 a 12; app 20 a 30 | Usar os números da verificação |
| D-ok | Pipeline de vídeo | Item 41 supõe serviço gerenciado (3 dias; 10 com FFmpeg próprio) | Mux gerenciado | Bate |
| D-ok | Proteção básica | Item 42 no MVP (URLs assinadas, sem download, sessões simultâneas) | Token curto, sem download, 2 sessões | Bate |

### 2.3 As estimativas de dias de B batem com o preço de setup de C?

**Não. [D17]** O escopo do MVP de B é cerca de duas vezes o esforço que C precificou no setup Recomendado.

| | B (MVP completo) | C (setup Recomendado) |
|---|---|---|
| Escopo | 27 itens (1 a 20 menos o 21, 22 a 28, 41, 42) | Login, catálogo, player, progresso, admin, certificado, brand kit, LGPD, checkout com assinatura e vitalício, cupons e bolsas, benefícios, live externa, legendas, onboarding, monitoramento |
| Esforço | 47,5 dias-pessoa (dias de 6 a 8 h) + 6 a 10 não estimados (design, QA, termos, e-mail, observabilidade, migração) = **54 a 58** | **25 a 30 pessoa-dias** de 8 h (200 a 240 h) |
| Horas | 324 a 464 h | 200 a 240 h |
| R$/h se o preço fosse R$ 28.000 | **R$ 60 a 86/h** (preço de júnior) | R$ 117 a 140/h |
| Preço do escopo de B ao R$/h de C | **R$ 38.000 a 65.000** | R$ 28.000 |

**Recomendação do consolidador:** manter R$ 28.000 como preço do **Marco 1** (cerca de 30 dias-pessoa, o que mantém R$ 117 a 156/h) e vender o resto do MVP de B (Marco 2, cerca de 29 dias-pessoa com ingestão automática e marca d'água) em ciclos. Isso alinha a proposta com C (setup + ciclos) e com B (a lista inteira, só que em dois marcos). Outra saída é um "setup completo" (Marco 1 + Marco 2, cerca de 59 dias-pessoa, 354 a 472 h) de R$ 45.000 a 55.000, entregue em março de 2027; fica como decisão dos sócios.

### 2.4 O prazo de dezembro cabe?

**Só com o Marco 1. [D18]**

| Fonte | Capacidade até o MVP | MVP | Cabe? |
|---|---|---|---|
| B | 60 a 75 dias-pessoa (8 a 10 por semana) | 48 | Sim, segundo B |
| Verificação B | **23 a 38 dias-pessoa** (3 a 5 por semana, 10 a 13 h por sócio) | 48 + 6 a 10 | **Não** |
| C | 27 pessoa-dias de 8 h (36 h/semana x 6 semanas, 20/10 a 30/11) | Recomendado 25 a 30 | Só no piso |
| Consolidador | 23 a 38 (verificação B) | Marco 1: 24,5 + 5 a 6 = cerca de 30 | **Cabe no meio da faixa, sem folga para imprevisto do emprego** |

Riscos do prazo: a "semana 1 até 20/10" do cronograma de B é impossível sem contrato assinado; o projeto começa na assinatura. Ponto de controle: se em 20/11 o player com compra não estiver em homologação, ativar o Plano B (Thinkific ou Memberkit + Mux) só para as turmas de dezembro. O clube de membros que o Vinicius quer até dezembro **não entra no Marco 1**; a recomendação é abrir lista de interesse e pré-venda do clube em dezembro e entregar a assinatura como primeiro item de janeiro [D10].

### 2.5 Outras divergências entre os arquivos

| Código | Ponto | Divergência | Resolução |
|---|---|---|---|
| **[D19]** | "Espaço livre" do IAE | B e D: Insper e FGVlaw só para líderes com 2 a 5 anos | Verificação B: o curta duração da FGVlaw (8 encontros, 32 h-a, R$ 4.790 a 5.275) pede só "atuantes em departamentos jurídicos". Posicionar o IAE como **porta de entrada e formação contínua do in-house**, a R$ 83/h contra R$ 150 a 165/h-a (FGVlaw) e R$ 203/h (Insper Live Learning) |
| **[D20]** | Preço do Insper | B (original): R$ 10.885,74 por 40 h como concorrente online | Live Learning é R$ 7.321,27 por 36 h (R$ 203/h); Insper custa 3,7 a 5,4 vezes o IAE |
| **[D21]** | "Vão" de R$ 1.500 a 3.000 | D: quase ninguém com marca institucional | As pós da Damásio (R$ 2.599,99 a 3.099,99) estão no intervalo; o vão é por hora, não por preço absoluto |
| **[D22]** | Esteira de edição: esforço | B: 10 dias + 2 a 3 de MCP | Verificação B: 10 a 15 + 3 a 5 de MCP com OAuth = **13 a 20** |
| **[D23]** | Exemplo de vídeo em B (b1) | Mux US$ 18/mês e Cloudflare US$ 78/mês, 0,7 a 1,5 GB/h | Superado por A (Mux US$ 0 com crédito; 1,63 a 2,25 GB/h) |
| **[D24]** | Hotmart | B: 9,9% + R$ 2,49 contra 9,9% + R$ 1,00 | A própria página da Hotmart traz os dois; usar R$ 2,49 (FAQ e tabela) |
| **[D25]** | Funil de captação | D: 8% de visita para cadastro (Unbounce) | A métrica da Unbounce inclui cliques; como taxa de cadastro é otimista. A conclusão (orgânico agora, tráfego pago só na fase 3) se mantém |
| **[D26]** | Resumos do orquestrador vs arquivos | Resumo de A: Mux US$ 439, hoje US$ 3 a 46, recomendado US$ 14,91 a 24,41, economia US$ 378 | Arquivo de A (corrigido): US$ 419, US$ 0 a 45,56, US$ 9,51 a 19,02, US$ 358. Valem os do arquivo |

---

## 3. O que ainda está em aberto

| # | Divergência ou pendência | Recomendação do consolidador | Quem decide ou resolve |
|---|---|---|---|
| [D6] | GB/h do degrau 1440p não foi pesquisado por A | Usar 10 Mbps (4,5 GB/h) como estimativa até o teste de encode; mostrar como "estimativa" na calculadora | Pedro, no teste de encode |
| [D9] | Bunny Stream cobra entrega pela tabela regional da CDN (US$ 0,045 na América do Sul) ou por valor único (cerca de US$ 0,03)? A rede Volume (US$ 0,005) tem PoP no Brasil? | Usar 0,045 na calculadora; perguntar ao suporte da Bunny. Não muda a recomendação (Mux é o gerenciado mais barato) | Lucas, por e-mail à Bunny |
| [D10] | Clube de membros até dezembro (Vinicius) contra capacidade real | Marco 1 sem clube; lista de interesse e pré-venda em dezembro; assinatura como primeiro item de janeiro. Marco 2 pago em ciclos (Intenso jan a mar cobre o piso, R$ 100.100 no ano para o IAE) ou no Ritmo (termina entre junho e outubro) | Sócios, depois o cliente |
| [D17] | Setup de C (25 a 30 pd) contra MVP de B (54 a 58 pd) | R$ 28.000 = Marco 1; Marco 2 em ciclos. Alternativa: setup completo de R$ 45.000 a 55.000 | Sócios |
| [D18] | Capacidade real dos sócios | Cada sócio declara horas por semana até 05/12 antes de assinar; se a soma der menos de 30 h/semana, cortar mais do Marco 1 (página do professor e cupons já estão fora) | Pedro, Rib, Lucas |
| [D11] | Worker separado para esteira e transcrição local | Prevalece A: nunca na VPS do app. Custo de VPS extra (cerca de US$ 28,99/mês) vai no pacote da esteira | Fechado no plano; validar com o Berg |
| [D13], [D14] | Ingestão automática da gravação e marca d'água: MVP (A) ou fase 2 (B)? | Marco 2 para os dois (limite de sessões fica no Marco 1, dentro do item 42); marca d'água com nome e e-mail parcial, nunca CPF | Fechado no plano |
| Bitrate real | Os dois bitrates (A1 e A2) são estimativa sem medição | Teste de 10 min da aula real, CRF 21, preset slow, antes da proposta | Pedro |
| Crédito do Mux dividido | VOD e live no Mux dividem os US$ 20 | Com live no Zoom, o crédito fica todo no VOD; a calculadora aplica um crédito só | Fechado |
| Exemplos de vídeo por resolução | Nenhum arquivo traz URL pública verificada por degrau | Gerar 1 trecho de 2 a 3 min da aula real em 360p, 720p, 1080p e 1440p no Mux (custo irrisório) e usar esses links na calculadora | Pedro |
| Members Club e Jack Roberts | Não confirmado que é o mymembersclub.com.br que o Vinicius viu, nem que @Itssssss_Jack é o Jack Roberts que o Rib citou | Pedir os links ao Vinicius e ao Rib | Pedro e Rib |
| Credenciamento EAD da IES parceira | UERJ é estadual; checar e-MEC e Conselho Estadual de Educação do RJ | Não prometer pós online na proposta; citar como fase 3 condicionada | Cliente, com advogado educacional |
| Tributos do IAE | Imunidade de ISS e IBS/CBS, remuneração de dirigentes-professores, ADI 1802 | Contador do IAE antes de definir preço e emissão de nota | Cliente |
| Nossa tributação e CNPJ | Simples Anexo V (15,5%) provável; ISS retido pelo tomador no Rio | Abrir ou confirmar o CNPJ antes de assinar; contador | Sócios |
| Zoom | Capacidade do Webinars a US$ 89 e preço do Large Meetings; verificação de sem fins lucrativos (Zoom Cares) | IAE pede o desconto já; Webinars só para aula aberta grande, fase 2 | Cliente |
| Daily e 100ms | Limite de participantes por sala não publicado | Irrelevante enquanto a recomendação for Zoom e LiveKit | n/a |
| Preços não verificados | api.video, Vimeo OTT e Live, GCS São Paulo, Mux plano Launch, AppzJoy, Mercado Pago (403), Iugu, Cademí, Teachable (taxa internacional) | Não usar na proposta; nenhum muda a recomendação | n/a |
| Política de reenvio de webhooks | Mux, Bunny, Cloudflare, Zoom | Tratar webhook como idempotente e ter rotina de reconciliação diária | Implementação |
| Validação externa | Arquitetura e custos ainda não passaram pelo Berg | Mandar este arquivo e o bloco CALC ao Berg antes da reunião com o cliente | Pedro |

---

## 4. Bloco CALC

Bloco único com tudo o que a calculadora do HTML precisa. Os números são os das tabelas de A (premissas A2, preços verificados) e de C (serviço), depois das verificações. Onde o valor é estimativa do consolidador, o campo `fonte` diz.

Fórmulas (iguais às de A2.8 e à `custoInfra(e)` de C, com as constantes daqui):

- `gb_armazenados = horas_acervo x degrau.gb_armazenado_por_hora_acervo`
- `gb_entregues_mes = alunos x horas_por_aluno_mes x degrau.gb_por_hora_assistida + horas_live_mes x participantes_live x degrau.gb_por_hora_assistida`
- `min_armazenados = horas_acervo x 60`; `min_entregues_mes = (alunos x horas_por_aluno_mes + horas_live_mes x participantes_live) x 60`
- Por GB: `mensal = max(0, gb_armazenados menos free_tier_gb) x storage_usd_gb_mes + max(0, gb_entregues menos franquia_egress_gb) x egress_usd_gb (com faixas) + fixos`
- Por minuto: `mensal = min_armazenados x stream_storage_usd_min[teto] + max(0, min_entregues menos 100.000) x stream_delivery_usd_min[teto] (com faixas) + live; Mux: menos o crédito de US$ 20, até zero`
- Cloudflare Stream: armazenamento em blocos: `ceil(min_armazenados / 1000) x 5`
- `transcode_unico = horas_acervo x 60 x transcode_usd_min[teto]`; `acumulado_N = transcode_unico + soma mês a mês (acervo cresce com horas_novas_mes e com as lives gravadas)`
- Serviço: `nosso_preco_mes = sustentacao(alunos) + plano_ciclos`; `total_mes = infra_brl + nosso_preco_mes`; setup mostrado à parte (e diluído só como visualização)
- Conferência: com estas constantes, S2 Mux = US$ 34, S3 Mux = US$ 419, S3 Bunny = US$ 503, S3 R2 = US$ 60,88, S4 Mux = US$ 1.764 (iguais a A2 Tabela 5).

```json
{
  "CALC": {
    "versao": "2026-10-13",
    "cotacao": {"usd_brl": 5.03, "fonte": "AwesomeAPI", "data": "2026-10-13", "iof_cartao_internacional_pct": 3.5, "observacao": "Valores em BRL sem IOF nem spread"},
    "premissas": {
      "codec": "H.264/AVC, 30 fps, AAC 128 kbps",
      "segmento_hls_s": 6,
      "requisicoes_por_hora_assistida": 600,
      "horas_por_aluno_mes_padrao": 6,
      "horas_por_aluno_mes_faixa_slider": [0.5, 20],
      "horas_por_aluno_mes_faixa_sugerida": [2, 12],
      "crescimento": "acervo cresce com horas_novas_mes e com as horas de live gravadas; alunos constantes",
      "exclui": ["servidor da aplicação", "impostos", "IOF", "spread bancário"]
    },
    "degraus_ladder": {
      "360p": {"bitrate_kbps": 800, "gb_por_hora": 0.36},
      "720p": {"bitrate_kbps": 2500, "gb_por_hora": 1.125},
      "1080p": {"bitrate_kbps": 5000, "gb_por_hora": 2.25},
      "1440p": {"bitrate_kbps": 10000, "gb_por_hora": 4.5, "fonte": "estimativa do consolidador (2 vezes o 1080p de A); A não mediu 1440p"},
      "2160p": {"bitrate_kbps": 15000, "gb_por_hora": 6.75, "observacao": "só realista com HEVC; em H.264 pediria 20 a 30 Mbps"}
    },
    "ladder_encoder_recomendado_a1": {
      "observacao": "configuração inicial do encoder; custos usam a premissa conservadora acima",
      "360p": {"video_kbps": 600, "audio_kbps": 128, "gb_por_hora": 0.328},
      "540p": {"video_kbps": 1200, "audio_kbps": 128, "gb_por_hora": 0.598},
      "720p": {"video_kbps": 2000, "audio_kbps": 128, "gb_por_hora": 0.958},
      "1080p": {"video_kbps": 3500, "audio_kbps": 128, "gb_por_hora": 1.633}
    },
    "degraus_qualidade": [
      {"nome": "720p", "teto": "720p", "ladder": ["360p", "720p"], "bitrate_kbps": 2500, "gb_armazenado_por_hora_acervo": 1.485, "fator_ladder_armazenado": 1.32, "mix_assistido": {"720p": 0.85, "360p": 0.15}, "gb_por_hora_assistida": 1.01, "mux_tier": "720p", "recomendado": false, "exemplo_video_url": null},
      {"nome": "1080p (recomendado)", "teto": "1080p", "ladder": ["360p", "720p", "1080p"], "bitrate_kbps": 5000, "gb_armazenado_por_hora_acervo": 3.735, "fator_ladder_armazenado": 1.66, "mix_assistido": {"1080p": 0.60, "720p": 0.30, "360p": 0.10}, "gb_por_hora_assistida": 1.7235, "mux_tier": "1080p", "recomendado": true, "exemplo_video_url": null},
      {"nome": "1440p (opcional pago)", "teto": "1440p", "ladder": ["360p", "720p", "1080p", "1440p"], "bitrate_kbps": 10000, "gb_armazenado_por_hora_acervo": 8.235, "fator_ladder_armazenado": 1.83, "mix_assistido": {"1440p": 0.30, "1080p": 0.45, "720p": 0.20, "360p": 0.05}, "gb_por_hora_assistida": 2.6055, "mux_tier": "1440p", "recomendado": false, "fonte": "estimativa do consolidador (bitrate de 1440p e mix no formato de C)", "exemplo_video_url": null},
      {"nome": "4K (não recomendado)", "teto": "2160p", "ladder": ["360p", "720p", "1080p", "2160p"], "bitrate_kbps": 15000, "gb_armazenado_por_hora_acervo": 10.485, "fator_ladder_armazenado": 1.55, "mix_assistido": {"2160p": 0.25, "1080p": 0.45, "720p": 0.25, "360p": 0.05}, "gb_por_hora_assistida": 3.0, "mux_tier": "2160p", "recomendado": false, "observacao": "Cloudflare Stream entrega no máximo 1080p", "exemplo_video_url": null}
    ],
    "exemplo_video_pendencia": "Nenhum vídeo público por resolução foi verificado. Gerar trechos de 2 a 3 min da aula real do IAE no Mux em cada degrau e preencher exemplo_video_url.",
    "provedores": [
      {
        "id": "mux",
        "nome": "Mux Video (Basic)",
        "modelo_cobranca": "por_minuto",
        "recomendado": "arquitetura inicial",
        "stream_storage_usd_min": {"720p": 0.0024, "1080p": 0.0030, "1440p": 0.0048, "2160p": 0.0096},
        "stream_storage_faixas": {"1080p": [{"ate_min": 50000, "usd": 0.0030}, {"ate_min": 150000, "usd": 0.0029}], "2160p": [{"ate_min": 50000, "usd": 0.0096}, {"ate_min": 150000, "usd": 0.00928}], "observacao": "faixas acima de 150 mil min não levantadas"},
        "stream_delivery_usd_min": {"720p": 0.0008, "1080p": 0.0010, "1440p": 0.0016, "2160p": 0.0032},
        "stream_delivery_faixas_min_pagos": {"1080p": [{"ate_min": 500000, "usd": 0.0010}, {"ate_min": 1000000, "usd": 0.00095}, {"ate_min": 2000000, "usd": 0.0009}]},
        "delivery_gratis_min_mes": 100000,
        "credito_usd_mes": 20,
        "credito_regra": "um por conta, dividido entre VOD e live, limitado ao uso",
        "transcode_usd_min": {"basic": 0, "plus": {"720p": 0.025, "1080p": 0.03125, "1440p": 0.05, "2160p": 0.10}},
        "live_encoding_usd_min": {"720p": 0.025, "1080p": 0.03125},
        "live_entrega": "minutos de live x espectadores simultâneos médios, mesma franquia de 100 mil min do VOD",
        "cold_storage": "aula nova começa no tier Cold (40% do preço) até a primeira reprodução; -40% após 30 dias sem play, -60% após 90",
        "legendas_automaticas": "grátis, português estável",
        "drm": {"usd_mes": 100, "usd_licenca": 0.003, "cobre_live": true},
        "minimo_mensal_usd": 0,
        "free_tier_gb": 0
      },
      {
        "id": "cloudflare_stream",
        "nome": "Cloudflare Stream",
        "modelo_cobranca": "por_minuto",
        "stream_storage_usd_min": 0.005,
        "stream_storage_bloco_min": 1000,
        "stream_storage_bloco_usd": 5,
        "stream_delivery_usd_min": 0.001,
        "transcode_usd_min": 0,
        "resolucao_maxima": "1080p",
        "live": "ingestão grátis; quem assiste conta como minuto entregue; gravação entra no armazenamento",
        "drm": null,
        "minimo_mensal_usd": 5,
        "free_tier_gb": 0
      },
      {
        "id": "bunny_stream",
        "nome": "Bunny Stream (rede Standard, América do Sul)",
        "modelo_cobranca": "por_gb",
        "storage_usd_gb_mes": 0.01,
        "storage_por_regiao_extra_usd_gb": {"segunda": 0.01, "terceira_em_diante": 0.005},
        "egress_usd_gb": 0.045,
        "egress_volume_usd_gb": 0.005,
        "egress_observacao": "0,045 é a tabela da CDN para a América do Sul; confirmar se o Stream usa essa tabela; rede Volume sem PoP confirmado no Brasil",
        "transcode_usd_min": 0,
        "premium_encoding_usd_min": {"480p_240p": 0.025, "1080p_720p": 0.05, "2160p_1440p": 0.15},
        "transcricao_usd_min_idioma": 0.10,
        "drm": {"usd_mes_por_biblioteca": 99, "faixas_licenca": [{"ate": 20000, "usd": 0.005}, {"ate": 100000, "usd": 0.004}, {"ate": 500000, "usd": 0.003}]},
        "minimo_mensal_usd": 1,
        "free_tier_gb": 0
      },
      {
        "id": "r2_ffmpeg",
        "nome": "Cloudflare R2 + FFmpeg próprio (fase 3)",
        "modelo_cobranca": "por_gb",
        "storage_usd_gb_mes": 0.015,
        "egress_usd_gb": 0,
        "transcode_usd_min": {"720p": 0.000397, "1080p": 0.00066, "2160p": 0.00265},
        "transcode_fonte": "estimativa de CPU numa VPS KVM 4 (US$ 0,0397 por hora de máquina), não medida",
        "fixo_usd_mes": {"workers_paid": 5},
        "workers_req_inclusas": 10000000,
        "workers_usd_milhao_extra": 0.30,
        "ops_classe_b_usd_milhao": 0.36,
        "ops_gratis_mes": {"classe_a": 1000000, "classe_b": 10000000},
        "minimo_mensal_usd": 0,
        "free_tier_gb": 10
      },
      {
        "id": "aws_payg",
        "nome": "AWS S3 + CloudFront pay-as-you-go + MediaConvert",
        "modelo_cobranca": "por_gb",
        "storage_usd_gb_mes": 0.023,
        "egress_usd_gb": 0.110,
        "egress_faixas": [{"ate_gb": 1000, "usd": 0}, {"ate_gb": 10000, "usd": 0.110}, {"ate_gb": 50000, "usd": 0.105}, {"ate_gb": 150000, "usd": 0.090}],
        "requisicoes_usd_10k": 0.022,
        "requisicoes_gratis_mes": 10000000,
        "transcode_usd_min": {"720p": 0.0225, "1080p": 0.0375, "2160p": 0.0675},
        "transcode_observacao": "MediaConvert Basic AVC, primeiros 100 mil min normalizados; depois 0,0053 por min normalizado",
        "minimo_mensal_usd": 0,
        "free_tier_gb": 0,
        "franquia_egress_gb": 1000
      },
      {
        "id": "aws_cloudfront_fixo",
        "nome": "AWS S3 + CloudFront plano fixo + MediaConvert",
        "modelo_cobranca": "plano_fixo",
        "storage_usd_gb_mes": 0.023,
        "egress_usd_gb": 0,
        "planos": [
          {"nome": "Pro", "usd_mes": 15, "dados_tb": 50, "requisicoes": 10000000, "credito_s3_gb": 50},
          {"nome": "Business", "usd_mes": 200, "dados_tb": 50, "requisicoes": 125000000, "credito_s3_gb": 1000},
          {"nome": "Premium", "usd_mes": 1000, "dados_tb": 50, "requisicoes": 500000000, "credito_s3_gb": 5000, "niveis_acima_50tb": [{"dados_tb": 75, "usd_mes": 1450}, {"dados_tb": 125, "usd_mes": 2250}, {"dados_tb": 200, "usd_mes": 3500}, {"dados_tb": 350, "usd_mes": 6000}, {"dados_tb": 600, "usd_mes": 10000}]}
        ],
        "transcode_usd_min": {"720p": 0.0225, "1080p": 0.0375, "2160p": 0.0675},
        "observacao": "sem excedente; uso acima da franquia por 2 a 3 meses pode ter entrega ajustada; exige WAF",
        "minimo_mensal_usd": 15,
        "free_tier_gb": 0
      },
      {
        "id": "google",
        "nome": "Google GCS (Iowa) + Cloud CDN + Transcoder API",
        "modelo_cobranca": "por_gb",
        "storage_usd_gb_mes": 0.020,
        "storage_unidade": "GiB (dividir GB por 1,0737)",
        "egress_usd_gb": 0.09,
        "egress_unidade": "GiB",
        "egress_faixas_tib": [{"ate_tib": 10, "usd": 0.09}, {"ate_tib": 150, "usd": 0.06}, {"ate_tib": 1024, "usd": 0.05}, {"acima": true, "usd": 0.04}],
        "lookup_usd_10k": 0.0075,
        "transcode_usd_min": {"720p": 0.045, "1080p": 0.075, "2160p": 0.135},
        "minimo_mensal_usd": 0,
        "free_tier_gb": 5
      },
      {
        "id": "b2_bunny",
        "nome": "Backblaze B2 + Bunny CDN + FFmpeg",
        "modelo_cobranca": "por_gb",
        "storage_usd_gb_mes": 0.00695,
        "egress_usd_gb": 0.045,
        "egress_observacao": "B2 para Bunny grátis; entrega pela Bunny Standard América do Sul",
        "transcode_usd_min": {"720p": 0.000397, "1080p": 0.00066, "2160p": 0.00265},
        "minimo_mensal_usd": 1,
        "free_tier_gb": 10
      },
      {
        "id": "digitalocean_spaces",
        "nome": "DigitalOcean Spaces (CDN embutida)",
        "modelo_cobranca": "por_gb",
        "storage_usd_gb_mes": 0.02,
        "storage_unidade": "GiB",
        "egress_usd_gb": 0.01,
        "egress_unidade": "GiB",
        "incluso": {"storage_gib": 250, "egress_gib": 1024},
        "transcode_usd_min": {"720p": 0.000397, "1080p": 0.00066, "2160p": 0.00265},
        "minimo_mensal_usd": 5,
        "free_tier_gb": 268
      },
      {
        "id": "wasabi",
        "nome": "Wasabi (só backup de masters)",
        "modelo_cobranca": "por_gb",
        "storage_usd_gb_mes": 0.0078,
        "egress_usd_gb": 0,
        "egress_regra": "grátis só se o egress mensal for menor ou igual ao armazenado; não usar como origem de vídeo",
        "transcode_usd_min": null,
        "retencao_minima_dias": 90,
        "minimo_mensal_usd": 7.99,
        "free_tier_gb": 0
      },
      {
        "id": "hostinger_vps",
        "nome": "Hostinger VPS único (não recomendado para vídeo)",
        "modelo_cobranca": "plano_fixo",
        "storage_usd_gb_mes": null,
        "egress_usd_gb": 0,
        "planos": [
          {"nome": "KVM 2", "disco_gb": 100, "banda_tb_mes": 8, "usd_mes_renovacao": 14.99, "usd_mes_promo": 8.99},
          {"nome": "KVM 4", "disco_gb": 200, "banda_tb_mes": 16, "usd_mes_renovacao": 28.99, "usd_mes_promo": 12.99},
          {"nome": "KVM 8", "disco_gb": 400, "banda_tb_mes": 32, "usd_mes_renovacao": 49.99, "usd_mes_promo": 25.99}
        ],
        "limite_acervo_1080p_horas": 96,
        "disco_reservado_sistema_gb": 40,
        "object_storage": false,
        "transcode_usd_min": {"720p": 0.000397, "1080p": 0.00066, "2160p": 0.00265},
        "minimo_mensal_usd": 14.99,
        "free_tier_gb": 0
      }
    ],
    "masters_backup": {"provedor": "cloudflare_r2", "storage_usd_gb_mes": 0.015, "gb_por_hora_master": [2.25, 4.5], "observacao": "1 a 2 vezes o degrau 1080p; entra no cenário recomendado"},
    "lives": {
      "observacao": "custo marginal por hora, sem franquia mensal, como em A3.4. Videoconferência: participantes incluem os 2 professores. Streaming: participantes são espectadores, mais 2 professores numa sala WebRTC (dentro da franquia grátis de LiveKit, Daily ou 100ms). Licenças fixas: custo por hora calculado com 12 h/mês (30 participantes) e 24 h/mês (200 participantes).",
      "opcoes": [
        {"id": "zoom_pro_desconto", "nome": "Zoom Pro, desconto de sem fins lucrativos (MVP)", "modelo": "licenca_fixa", "usd_mes": 8.50, "limite_participantes": 100, "custo_usd_por_hora": {"30": 0.71, "200": null}, "gravacao": "inclusa, nuvem de 10 GB, webhook recording.completed, token de 24 h", "recomendado": "Marco 1"},
        {"id": "zoom_pro", "nome": "Zoom Pro, preço cheio", "modelo": "licenca_fixa", "usd_mes": 16.99, "limite_participantes": 100, "custo_usd_por_hora": {"30": 1.42, "200": null}},
        {"id": "zoom_business_desconto", "nome": "Zoom Business, desconto de sem fins lucrativos", "modelo": "licenca_fixa", "usd_mes": 11.00, "limite_participantes": 300, "custo_usd_por_hora": {"30": 0.92, "200": 0.46}},
        {"id": "zoom_business", "nome": "Zoom Business, preço cheio", "modelo": "licenca_fixa", "usd_mes": 21.99, "limite_participantes": 300, "custo_usd_por_hora": {"30": 1.83, "200": 0.92}},
        {"id": "google_meet", "nome": "Google Meet (Business Standard até 150; Business Plus até 500)", "modelo": "licenca_fixa", "usd_mes": {"standard": 16.26, "plus": 25.53}, "custo_usd_por_hora": {"30": 1.36, "200": 1.06}, "gravacao": "no Drive, sem webhook simples"},
        {"id": "livekit_ship", "nome": "LiveKit Cloud Ship (fase 2)", "modelo": "por_minuto_e_banda", "usd_mes_fixo": 50, "usd_min_participante": 0.0005, "gb_por_hora_por_aluno": 0.675, "usd_gb_excedente": 0.12, "franquia": {"min": 150000, "gb": 250, "gravacao_min": 600}, "custo_usd_por_hora": {"30": 3.33, "200": 22.20}, "gravacao_usd_hora": 1.20, "recomendado": "fase 2"},
        {"id": "daily", "nome": "Daily (videoconferência)", "modelo": "por_minuto_participante", "usd_min_participante": 0.004, "franquia_min_mes": 10000, "custo_usd_por_hora": {"30": 7.20, "200": 48.00}, "gravacao_usd_hora": 0.81, "armazenamento_gravacao_usd_hora": 0.18},
        {"id": "100ms_videoconf", "nome": "100ms (videoconferência)", "modelo": "por_minuto_participante", "usd_min_participante": 0.004, "franquia_min_mes": 10000, "custo_usd_por_hora": {"30": 7.20, "200": 48.00}, "gravacao_usd_hora": 0.81},
        {"id": "100ms_hls", "nome": "100ms (streaming HLS)", "modelo": "por_minuto_espectador", "usd_min_espectador": 0.0012, "franquia_min_mes": 10000, "custo_usd_por_hora": {"30": 2.64, "200": 14.88}, "gravacao_usd_hora": 0.81},
        {"id": "mux_live", "nome": "Mux Live 1080p (streaming)", "modelo": "por_minuto", "usd_min_encoding": 0.03125, "usd_min_entregue": 0.001, "custo_usd_por_hora": {"30": 3.68, "200": 13.88}, "armazenamento_gravacao_usd_hora_mes": 0.18, "observacao": "divide o crédito de US$ 20 e a franquia de 100 mil min com o VOD"},
        {"id": "cloudflare_stream_live", "nome": "Cloudflare Stream Live (fallback)", "modelo": "por_minuto", "usd_min_entregue": 0.001, "custo_usd_por_hora": {"30": 1.80, "200": 12.00}, "armazenamento_gravacao_usd_hora_mes": 0.30},
        {"id": "youtube_nao_listado", "nome": "YouTube não listado (só emergência)", "modelo": "gratis", "custo_usd_por_hora": {"30": 0, "200": 0}, "observacao": "sem controle de acesso"},
        {"id": "jitsi", "nome": "Jitsi auto-hospedado (não recomendado)", "modelo": "infra_fixa", "usd_mes": 57.98, "custo_usd_por_hora": {"30": 4.83, "200": 2.42}, "observacao": "2 VPS KVM 4; 200 participantes exigiriam mais JVB (estimativa)"}
      ],
      "cenarios_referencia_usd_mes": {
        "iae_4_lives_3h_30_alunos": {"zoom_pro_desconto": 8.50, "zoom_pro": 16.99, "mux_live_com_credito": 4.66, "cloudflare_stream_live": 26.60, "100ms_hls": 19.59, "100ms_videoconf": 57.83, "livekit_ship": 52.40, "daily": 61.87, "daily_com_armazenamento": 64.03},
        "crescimento_8_lives_3h_200_alunos": {"zoom_business_desconto": 11.00, "zoom_business": 21.99, "zoom_webinars": 89.00, "mux_live": 237.32, "cloudflare_stream_live": 298.00, "100ms_hls": 348.99, "livekit_ship": 496.04, "livekit_scale": 524.00, "daily": 1085.69, "100ms_videoconf": 1138.91}
      }
    },
    "protecao": {
      "nivel_recomendado": "token assinado de 1 a 4 h, domínio restrito, sem download, 2 sessões simultâneas, marca d'água com nome e e-mail parcial",
      "custo_infra_usd_mes": 0,
      "drm_opcional": {"mux": {"usd_mes": 100, "usd_licenca": 0.003}, "bunny": {"usd_mes_por_biblioteca": 99, "usd_licenca": 0.005}, "licencas_por_aluno_mes": 20}
    },
    "servico": {
      "moeda": "BRL",
      "setup_brl": {
        "enxuto": {"valor": 14000, "pessoa_dias": [12, 15], "cabe_ate_dez_2026": true},
        "recomendado": {"valor": 28000, "pessoa_dias": [25, 30], "cabe_ate_dez_2026": "só no piso; equivale ao Marco 1", "condicao": "parceiro fundador"},
        "premium": {"valor_min": 55000, "valor_max": 70000, "valor_referencia": 62500, "pessoa_dias": [50, 65], "cabe_ate_dez_2026": false}
      },
      "setup_pagamento_pct": [30, 30, 40],
      "ciclo_brl": 2000,
      "ciclo_horas": [12, 15],
      "planos_ciclos_brl_mes": {"0": 0, "1": 2000, "2": 3800, "4": 7200},
      "sustentacao_brl_mes": [{"ate_alunos": 500, "valor": 1500}, {"ate_alunos": 2000, "valor": 2500}, {"ate_alunos": 10000, "valor": 4000}],
      "recorrencia_por_cenario": {
        "enxuto": {"composicao": "sustentação + 1 ciclo/mês", "recorrencia_brl_mes": 3500, "recorrencia_brl_semana": 807.69},
        "recomendado": {"composicao": "sustentação + plano Ritmo (2 ciclos/mês)", "recorrencia_brl_mes": 5300, "recorrencia_brl_semana": 1223.08},
        "premium": {"composicao": "sustentação + plano Intenso (4 ciclos/mês)", "recorrencia_brl_mes": 8700, "recorrencia_brl_semana": 2007.69}
      },
      "observacao_recorrencia": "valores com sustentação na faixa de até 500 alunos; semana = mês x 12 / 52",
      "margem_infra_pct": 0,
      "infra_regra": "repasse a custo, contas no CNPJ e no cartão do IAE; gestão da infra incluída na sustentação",
      "excecao_conta_nossa": {"taxa_gestao_pct": 10, "iof_pct": 3.5, "spread_pct": [4, 6]},
      "custo_12_meses_iae_brl": {"minimo_enxuto_1_ciclo": 56100, "recomendado_ritmo": 89900, "recomendado_1_ciclo": 70100, "marco2_intenso_3_meses_depois_ritmo": 100100},
      "faturamento_iae_12_meses_estimado_brl": {"conservador": 80000, "base": 175640, "otimista": 378800}
    }
  }
}
```

---

## 5. Fontes consolidadas

Todas as URLs dos arquivos A, B, C e D, mais as que as quatro verificações acrescentaram, sem duplicatas (267 endereços). Todas acessadas em 13/10/2026. Entre parênteses, quais arquivos citam cada uma.

Fontes que não são URL:

- Cotação: AwesomeAPI, USD 1 = R$ 5,03 em 13/10/2026 (informada pelo orquestrador e usada por todos os agentes).
- Transcrições das reuniões no Wispr Flow: reunião 1, id `630a8195-6f53-4c21-82af-142a4f9776dc`; reunião 2, id `7ccec9f7-800c-437a-81c6-3607a2620af7` (PROMPT.md).
- Saídas brutas da skill last30days (13/10/2026): `~/Documents/Last30Days/livekit-raw-v3.md`; `~/Documents/Last30Days/future-law-e-members-club-area-de-membros-raw-v3.md`; `~/Documents/Last30Days/matt-pocock-raw-v3-2026-10-13.md`; `~/Documents/Last30Days/skool-circle-hotmart-club-course-community-platform-ux-raw-v3.md`; `~/Documents/Last30Days/ai-dev-agency-pricing-productized-dev-subscription-raw-v3-2026-10-13.md`; `~/Documents/Last30Days/capta-o-de-alunos-cursos-jur-dicos-online-ticket-alto-raw-v3.md`.
- Documentação via Context7: `/websites/developers_cloudflare_stream`, `/websites/developers_zoom_us`, `/websites/daily_co_reference_rest-api`, `/livekit/egress`, `/websites/mux`, `/wyattblue/auto-editor`.
- API do GitHub (estrelas e datas de mattpocock/course-video-manager, mattpocock/skills, mattpocock/sandcastle, WyattBlue/auto-editor, heygen-com/hyperframes).

### Mux

- https://github.com/muxinc/elements/blob/main/packages/mux-player-react/README.md (acesso em 13/10/2026; citada em: Agente A)
- https://github.com/muxinc/elements/blob/main/packages/mux-player/REFERENCE.md (acesso em 13/10/2026; citada em: Agente A)
- https://www.mux.com/docs/changelog/additional-languages-for-vod-auto-generated-captions (acesso em 13/10/2026; citada em: Agente A)
- https://www.mux.com/docs/guides/add-autogenerated-captions-and-use-transcripts (acesso em 13/10/2026; citada em: Agente A, verificação A)
- https://www.mux.com/docs/guides/protect-videos-with-drm (acesso em 13/10/2026; citada em: Agente A, verificação A)
- https://www.mux.com/docs/guides/secure-video-playback (acesso em 13/10/2026; citada em: Agente B)
- https://www.mux.com/docs/guides/start-live-streaming (acesso em 13/10/2026; citada em: Agente A, verificação A)
- https://www.mux.com/docs/guides/stream-videos-in-4k (acesso em 13/10/2026; citada em: Agente A, verificação A)
- https://www.mux.com/docs/guides/use-video-quality-levels (acesso em 13/10/2026; citada em: Agente A)
- https://www.mux.com/docs/pricing/video (acesso em 13/10/2026; citada em: Agente A, verificação A)
- https://www.mux.com/docs/webhook-reference (acesso em 13/10/2026; citada em: Agente B)
- https://www.mux.com/pricing (acesso em 13/10/2026; citada em: Agente A, Agente B, Agente C, verificação C)
- https://www.mux.com/pricing.md (acesso em 13/10/2026; citada em: Agente C, verificação C)
- https://www.mux.com/pricing/live (acesso em 13/10/2026; citada em: Agente A, verificação A)
- https://www.mux.com/pricing/video (acesso em 13/10/2026; citada em: Agente A)
- https://x.com/MuxHQ/status/2110108922631913794 (acesso em 13/10/2026; citada em: Agente A)

### Cloudflare

- https://blog.cloudflare.com/stream-automatic-captions-with-ai/ (acesso em 13/10/2026; citada em: verificação A)
- https://developers.cloudflare.com/cache/concepts/default-cache-behavior/ (acesso em 13/10/2026; citada em: Agente A)
- https://developers.cloudflare.com/r2/pricing/ (acesso em 13/10/2026; citada em: Agente A, Agente C, verificação A, verificação C)
- https://developers.cloudflare.com/stream/ (acesso em 13/10/2026; citada em: verificação A)
- https://developers.cloudflare.com/stream/edit-videos/adding-captions/ (acesso em 13/10/2026; citada em: Agente A, verificação A)
- https://developers.cloudflare.com/stream/faq/ (acesso em 13/10/2026; citada em: Agente A, verificação A)
- https://developers.cloudflare.com/stream/index.md (acesso em 13/10/2026; citada em: Agente A)
- https://developers.cloudflare.com/stream/manage-video-library/creator-id/ (acesso em 13/10/2026; citada em: Agente A)
- https://developers.cloudflare.com/stream/manage-video-library/using-webhooks/ (acesso em 13/10/2026; citada em: Agente A)
- https://developers.cloudflare.com/stream/pricing/ (acesso em 13/10/2026; citada em: Agente A, Agente B, Agente C, verificação A, verificação C)
- https://developers.cloudflare.com/stream/stream-live/ (acesso em 13/10/2026; citada em: Agente A, verificação A)
- https://developers.cloudflare.com/stream/stream-live/webhooks/ (acesso em 13/10/2026; citada em: Agente A)
- https://developers.cloudflare.com/stream/uploading-videos/ (acesso em 13/10/2026; citada em: Agente A)
- https://developers.cloudflare.com/stream/viewing-videos/securing-your-stream/ (acesso em 13/10/2026; citada em: Agente A, verificação A)
- https://developers.cloudflare.com/workers/platform/pricing/ (acesso em 13/10/2026; citada em: Agente A, verificação A)
- https://www.cloudflare.com/service-specific-terms-application-services/ (acesso em 13/10/2026; citada em: Agente A, verificação A)

### Bunny.net

- https://bunny.net/docs/stream-pricing (acesso em 13/10/2026; citada em: Agente A)
- https://bunny.net/docs/stream/premium-encoding (acesso em 13/10/2026; citada em: Agente A)
- https://bunny.net/docs/stream/pricing (acesso em 13/10/2026; citada em: Agente A)
- https://bunny.net/docs/stream/pricing.md (acesso em 13/10/2026; citada em: verificação A)
- https://bunny.net/docs/stream/token-authentication (acesso em 13/10/2026; citada em: Agente A)
- https://bunny.net/docs/stream/tus-resumable-uploads (acesso em 13/10/2026; citada em: Agente A)
- https://bunny.net/docs/stream/webhooks (acesso em 13/10/2026; citada em: Agente A)
- https://bunny.net/pricing/ (acesso em 13/10/2026; citada em: Agente A, verificação A)
- https://bunny.net/pricing/cdn/ (acesso em 13/10/2026; citada em: Agente C, verificação C)
- https://bunny.net/pricing/storage/ (acesso em 13/10/2026; citada em: Agente A, verificação A)
- https://bunny.net/pricing/stream/ (acesso em 13/10/2026; citada em: Agente A, Agente B, Agente C, verificação A, verificação C)
- https://bunny.net/stream/ (acesso em 13/10/2026; citada em: Agente A)
- https://swarmify.com/blog/bunny-stream-review/ (acesso em 13/10/2026; citada em: Agente A)

### AWS

- https://aws.amazon.com/cloudfront/pricing/ (acesso em 13/10/2026; citada em: Agente A, verificação A)
- https://aws.amazon.com/cloudfront/pricing/pay-as-you-go/ (acesso em 13/10/2026; citada em: Agente A, verificação A)
- https://aws.amazon.com/mediaconvert/pricing/ (acesso em 13/10/2026; citada em: Agente A, verificação A)
- https://aws.amazon.com/s3/pricing/ (acesso em 13/10/2026; citada em: Agente A, verificação A)
- https://b0.p.awsstatic.com/pricing/2.0/meteredUnitMaps/s3/USD/current/s3.json (acesso em 13/10/2026; citada em: Agente A, verificação A)
- https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/flat-rate-pricing-plan.html (acesso em 13/10/2026; citada em: Agente A, verificação A)

### Google (Cloud, Workspace, YouTube)

- https://cloud.google.com/cdn/pricing (acesso em 13/10/2026; citada em: Agente A, verificação A)
- https://cloud.google.com/storage/pricing (acesso em 13/10/2026; citada em: Agente A, verificação A)
- https://cloud.google.com/transcoder/pricing (acesso em 13/10/2026; citada em: Agente A, verificação A)
- https://support.google.com/youtube/answer/1722171 (acesso em 13/10/2026; citada em: Agente A, verificação A)
- https://support.google.com/youtube/answer/2474026 (acesso em 13/10/2026; citada em: Agente A)
- https://support.google.com/youtube/answer/2853700 (acesso em 13/10/2026; citada em: Agente A)
- https://workspace.google.com/pricing (acesso em 13/10/2026; citada em: Agente A)

### Object storage independente

- https://wasabi.com/pricing (acesso em 13/10/2026; citada em: Agente A, verificação A)
- https://wasabi.com/pricing/faq (acesso em 13/10/2026; citada em: Agente A, verificação A)
- https://www.backblaze.com/cloud-storage/pricing (acesso em 13/10/2026; citada em: Agente A, verificação A)
- https://www.digitalocean.com/pricing/spaces-object-storage (acesso em 13/10/2026; citada em: Agente A, verificação A)

### Hostinger

- https://www.hostinger.com.br/servidor-vps (acesso em 13/10/2026; citada em: Agente A)
- https://www.hostinger.com/br/servidor-vps (acesso em 13/10/2026; citada em: verificação A)
- https://www.hostinger.com/object-storage (acesso em 13/10/2026; citada em: verificação A)
- https://www.hostinger.com/pricing (acesso em 13/10/2026; citada em: Agente A)
- https://www.hostinger.com/vps-hosting (acesso em 13/10/2026; citada em: Agente A, verificação A)

### Padrões, codecs e dispositivos

- https://caniuse.com/av1 (acesso em 13/10/2026; citada em: Agente A, verificação A)
- https://caniuse.com/hevc (acesso em 13/10/2026; citada em: Agente A, verificação A)
- https://developer.apple.com/documentation/http-live-streaming/hls-authoring-specification-for-apple-devices (acesso em 13/10/2026; citada em: Agente A, verificação A)
- https://developer.apple.com/documentation/http-live-streaming/hls-authoring-specification-for-apple-devices-appendixes (acesso em 13/10/2026; citada em: Agente A)
- https://gs.statcounter.com/os-market-share/mobile/brazil (acesso em 13/10/2026; citada em: Agente A, verificação A)
- https://webkit.org/blog/14445/webkit-features-in-safari-17-0/ (acesso em 13/10/2026; citada em: Agente A, verificação A)

### Lives

- https://developers.zoom.us/blog/meeting-api-querying-tips-part4/ (acesso em 13/10/2026; citada em: verificação A)
- https://developers.zoom.us/docs/api/meetings/events (acesso em 13/10/2026; citada em: Agente A)
- https://developers.zoom.us/docs/api/video-sdk/events (acesso em 13/10/2026; citada em: Agente A)
- https://docs.daily.co/reference/rest-api/recordings/get-recording-link (acesso em 13/10/2026; citada em: Agente A)
- https://docs.daily.co/reference/rest-api/rooms/recordings/start (acesso em 13/10/2026; citada em: Agente A)
- https://docs.daily.co/reference/rest-api/webhooks/events/recording-ready-to-download (acesso em 13/10/2026; citada em: Agente A)
- https://github.com/livekit/egress (acesso em 13/10/2026; citada em: Agente A)
- https://jitsi.github.io/handbook/docs/devops-guide/devops-guide-requirements/ (acesso em 13/10/2026; citada em: Agente A, verificação A)
- https://jobs.ashbyhq.com/livekit (acesso em 13/10/2026; citada em: Agente A)
- https://livekit.com/pricing (acesso em 13/10/2026; citada em: Agente A, verificação A)
- https://vimeo.com/upgrade-plan (acesso em 13/10/2026; citada em: Agente A)
- https://www.100ms.live/pricing (acesso em 13/10/2026; citada em: Agente A, verificação A)
- https://www.daily.co/pricing/video-sdk/ (acesso em 13/10/2026; citada em: Agente A, verificação A)
- https://zoom.us/pricing (acesso em 13/10/2026; citada em: Agente A, verificação A)
- https://zoom.us/pricing/developer (acesso em 13/10/2026; citada em: Agente A, verificação A)
- https://zoom.us/pricing/webinar (acesso em 13/10/2026; citada em: Agente A, verificação A)

### IA, transcrição e edição

- https://ai.google.dev/gemini-api/docs/pricing (acesso em 13/10/2026; citada em: Agente B, verificação B)
- https://ai.google.dev/gemini-api/docs/video-understanding (acesso em 13/10/2026; citada em: Agente B, verificação B)
- https://claude.com/pricing (acesso em 13/10/2026; citada em: Agente B)
- https://deepgram.com/pricing (acesso em 13/10/2026; citada em: Agente A, Agente B)
- https://developers.openai.com/api/docs/pricing (acesso em 13/10/2026; citada em: Agente A, Agente B)
- https://docs.x.ai/developers/grok-4-7 (acesso em 13/10/2026; citada em: Agente B, verificação B)
- https://docs.x.ai/developers/model-capabilities/images/understanding (acesso em 13/10/2026; citada em: Agente B)
- https://docs.x.ai/developers/pricing (acesso em 13/10/2026; citada em: Agente B, verificação B)
- https://github.com/WyattBlue/auto-editor (acesso em 13/10/2026; citada em: Agente B)
- https://github.com/heygen-com/hyperframes (acesso em 13/10/2026; citada em: Agente B, verificação B)
- https://platform.claude.com/docs/en/about-claude/pricing (acesso em 13/10/2026; citada em: Agente B)
- https://quso.ai/blog/opus-clip-pricing (acesso em 13/10/2026; citada em: Agente B)
- https://suprmind.ai/hub/grok/ (acesso em 13/10/2026; citada em: Agente B)
- https://vizard.ai/pricing (acesso em 13/10/2026; citada em: Agente B)
- https://www.assemblyai.com/pricing (acesso em 13/10/2026; citada em: Agente A, Agente B)
- https://www.capterra.com/p/10009818/Vizard/pricing/ (acesso em 13/10/2026; citada em: Agente B)
- https://www.datacamp.com/tutorial/grok-imagine-api (acesso em 13/10/2026; citada em: verificação B)
- https://www.descript.com/api (acesso em 13/10/2026; citada em: Agente B)
- https://www.descript.com/pricing (acesso em 13/10/2026; citada em: Agente B)
- https://www.opus.pro/api (acesso em 13/10/2026; citada em: Agente B)
- https://www.opus.pro/pricing (acesso em 13/10/2026; citada em: Agente B)
- https://www.remotion.pro/license (acesso em 13/10/2026; citada em: Agente B)
- https://www.usagepricing.com/blueprint/opus-clip (acesso em 13/10/2026; citada em: Agente B)

### Operação

- https://coolify.io/docs/databases/backups (acesso em 13/10/2026; citada em: Agente A)

### Referências do cliente e concorrência

- http://cers.com.br/ (acesso em 13/10/2026; citada em: Agente D)
- https://abreuadvogados.com/conhecimento/eventos/abreu/3a-edicao-curso-in-house-40-instituto-de-conhecimento-future-law/ (acesso em 13/10/2026; citada em: Agente D, verificação D)
- https://cursosgratuitos.fgv.br/ (acesso em 13/10/2026; citada em: Agente B, verificação B)
- https://direitorio.fgv.br/ (acesso em 13/10/2026; citada em: Agente B)
- https://direitosp.fgv.br/cursos/curta-duracao/curta-duracao-contencioso-estrategico (acesso em 13/10/2026; citada em: Agente D)
- https://direitosp.fgv.br/cursos/curta-duracao/fgvlaw-compliance-empresarial-gestao-riscos-corporativos (acesso em 13/10/2026; citada em: Agente B)
- https://direitosp.fgv.br/cursos/curta-duracao/fgvlaw-fusoes-aquisicoes (acesso em 13/10/2026; citada em: Agente D)
- https://direitosp.fgv.br/cursos/pos-graduacao-lato-sensu/fgvlaw-gestao-juridica-executiva (acesso em 13/10/2026; citada em: Agente B, Agente D, verificação B, verificação D)
- https://direitosp.fgv.br/cursos/pos-lato-sensu-fgvlaw/curta-duracao (acesso em 13/10/2026; citada em: Agente B)
- https://direitosp.fgv.br/cursos/pos-lato-sensu-fgvlaw/pos-graduacao-lato-sensu (acesso em 13/10/2026; citada em: Agente B)
- https://direitosp.fgv.br/sites/default/files/cursos/arq-prog/2026-09/programa-2027-compliance-empresarial-e-gestao-de-riscos-corporativos-fgv-law_0.pdf (acesso em 13/10/2026; citada em: Agente B, verificação B)
- https://direitosp.fgv.br/sites/default/files/link-arquivo/2026-09/Investimento%20-%20Pos-12.pdf (acesso em 13/10/2026; citada em: Agente B, verificação B)
- https://educacao-executiva.fgv.br/cursos/areas/direito (acesso em 13/10/2026; citada em: Agente D)
- https://educacao-executiva.fgv.br/cursos/online/curta-media-duracao-online (acesso em 13/10/2026; citada em: Agente B)
- https://educacao-executiva.fgv.br/cursos/online/curta-media-duracao-online/direito-processual-civil-1 (acesso em 13/10/2026; citada em: Agente D)
- https://educacao-executiva.fgv.br/cursos/online/curta-media-duracao-online/direito-tributario-4 (acesso em 13/10/2026; citada em: Agente D)
- https://educacao-executiva.fgv.br/produto/direito-tributario-01tV200000Ij5ieIAB (acesso em 13/10/2026; citada em: verificação D)
- https://ee.insper.edu.br/cursos/direito/ (acesso em 13/10/2026; citada em: Agente B, Agente D)
- https://ee.insper.edu.br/cursos/direito/eficiencia-juridica/ (acesso em 13/10/2026; citada em: Agente D)
- https://ee.insper.edu.br/cursos/direito/estrategias-avancadas-para-lideres-juridicos/ (acesso em 13/10/2026; citada em: Agente B, Agente D, verificação B)
- https://ee.insper.edu.br/cursos/direito/gestao-estrategica-de-departamento-juridico/ (acesso em 13/10/2026; citada em: Agente B, Agente D, verificação B, verificação D)
- https://esa.oab.org.br/home/course/gestao-juridica-4-0-e-metodologias-ageis-para-o-direito/96 (acesso em 13/10/2026; citada em: Agente D, verificação D)
- https://inteligenciajuridica.intelijur.com.br/gestao-de-departamentos-juridicos-na-pratica (acesso em 13/10/2026; citada em: Agente D, verificação D)
- https://ipog.edu.br/cursos/pos-graduacao/gestao-na-advocacia-mba-remoto (acesso em 13/10/2026; citada em: Agente D, verificação D)
- https://mymembersclub.com.br/ (acesso em 13/10/2026; citada em: Agente B, verificação B)
- https://www.ceisc.com.br/ (acesso em 13/10/2026; citada em: Agente D, verificação D)
- https://www.damasio.com.br/ (acesso em 13/10/2026; citada em: Agente D, verificação D)
- https://www.ebradi.com.br/ (acesso em 13/10/2026; citada em: Agente D, verificação D)
- https://www.estrategia.com/oab/ (acesso em 13/10/2026; citada em: Agente D)
- https://www.futurelaw.com.br/ (acesso em 13/10/2026; citada em: Agente B, Agente D, verificação B, verificação D)
- https://www.futurelaw.com.br/cursos/advocacia-4-0 (acesso em 13/10/2026; citada em: Agente D)
- https://www.futurelaw.com.br/cursos/clm-gestao-contratos (acesso em 13/10/2026; citada em: Agente D)
- https://www.futurelaw.com.br/cursos/direito-da-concorrencia (acesso em 13/10/2026; citada em: Agente B)
- https://www.futurelaw.com.br/cursos/eficiencia-na-pratica-com-ia (acesso em 13/10/2026; citada em: Agente B, Agente D)
- https://www.futurelaw.com.br/cursos/legal-operations-nova-edicao (acesso em 13/10/2026; citada em: Agente B, Agente D, verificação B, verificação D)
- https://www.futurelaw.com.br/cursos/poder-publico-4-0-inovacao-e-fomento-da-tecnologia (acesso em 13/10/2026; citada em: Agente B)
- https://www.futurelaw.com.br/cursos/tech-driven-law (acesso em 13/10/2026; citada em: Agente B)
- https://www.grancursosonline.com.br/assinatura-ilimitada (acesso em 13/10/2026; citada em: Agente D, verificação D)
- https://www.insper.edu.br/noticias/flavio-franco-advogado-corporativo-precisa-ter-interesse-genuino-por-negocios/ (acesso em 13/10/2026; citada em: Agente D)
- https://www.insper.edu.br/pos-graduacao/direito/direito-societario/ (acesso em 13/10/2026; citada em: verificação B)
- https://www.insper.edu.br/pt/cursos/pos-graduacao/direito (acesso em 13/10/2026; citada em: Agente B)
- https://www.insper.edu.br/pt/cursos/pos-graduacao/precos-cursos-pos-graduacao-insper (acesso em 13/10/2026; citada em: Agente B)
- https://www.legale.com.br/ (acesso em 13/10/2026; citada em: Agente D, verificação D)
- https://www.oabrj.org.br/esa (acesso em 13/10/2026; citada em: Agente D)
- https://www.verbojuridico.com.br/pos-graduacoes-a-distancia-ead/pos-graduacao-em-gestao-juridica-empresarial/ (acesso em 13/10/2026; citada em: Agente D, verificação D)

### Plataformas prontas de LMS e comunidade

- https://ajuda.cademi.com.br/llms.txt (acesso em 13/10/2026; citada em: Agente B, verificação B)
- https://blog.freshlearn.com/blog/thinkific-pricing (acesso em 13/10/2026; citada em: Agente B, verificação B)
- https://cademi.com.br/ (acesso em 13/10/2026; citada em: Agente B, verificação B)
- https://circle.so/pricing (acesso em 13/10/2026; citada em: Agente B, verificação B)
- https://curseduca.com/ (acesso em 13/10/2026; citada em: Agente B)
- https://frappe.io/cloud/pricing (acesso em 13/10/2026; citada em: Agente B)
- https://frappe.io/learning (acesso em 13/10/2026; citada em: Agente B)
- https://hotmart.com/pt-br/club (acesso em 13/10/2026; citada em: Agente A)
- https://hotmart.com/pt-br/taxa-hotmart (acesso em 13/10/2026; citada em: Agente B, verificação B)
- https://kajabi.com/pricing (acesso em 13/10/2026; citada em: Agente B, verificação B)
- https://kiwify.com.br/ (acesso em 13/10/2026; citada em: Agente A, Agente B, verificação B)
- https://memberkit.com.br/ (acesso em 13/10/2026; citada em: Agente B, verificação B)
- https://openedx.org/get-started/ (acesso em 13/10/2026; citada em: Agente B)
- https://teachable.com/pricing (acesso em 13/10/2026; citada em: Agente B, verificação B)
- https://waid.io/ (acesso em 13/10/2026; citada em: Agente B, verificação B)
- https://www.eduzz.com/produtos/nutror (acesso em 13/10/2026; citada em: Agente B)
- https://www.eduzz.com/taxas (acesso em 13/10/2026; citada em: Agente B, verificação B)
- https://www.mightynetworks.com/pricing (acesso em 13/10/2026; citada em: Agente B, verificação B)
- https://www.thinkific.com/pricing/ (acesso em 13/10/2026; citada em: Agente B, verificação B)

### Pagamentos no Brasil

- https://atendimento.vindi.com.br/hc/pt-br/articles/12114248534171 (acesso em 13/10/2026; citada em: Agente B)
- https://docs.asaas.com/docs/assinaturas (acesso em 13/10/2026; citada em: Agente B)
- https://docs.asaas.com/docs/pix-automatico (acesso em 13/10/2026; citada em: Agente B, verificação B)
- https://docs.stripe.com/billing/revenue-recovery/smart-retries (acesso em 13/10/2026; citada em: Agente B, verificação B)
- https://docs.stripe.com/payments/installments (acesso em 13/10/2026; citada em: Agente B, verificação B)
- https://docs.stripe.com/payments/pix (acesso em 13/10/2026; citada em: Agente B, verificação B)
- https://edvan.com.br/iuguboleto (acesso em 13/10/2026; citada em: Agente B)
- https://mindconsulting.com.br/2026/07/gateways-pagamento-online-brasil-comparativo-2026/ (acesso em 13/10/2026; citada em: Agente B)
- https://pagar.me/precos/ (acesso em 13/10/2026; citada em: Agente B)
- https://pagarme.helpjuice.com/pt_BR/p1-saques-recebimentos-e-antecipa%C3%A7%C3%A3o/antecipa%C3%A7%C3%A3o-o-que-%C3%A9-antecipa%C3%A7%C3%A3o (acesso em 13/10/2026; citada em: Agente B)
- https://sellsync.ai/pt/blog/taxa-mercado-pago-2026-guia-completo/ (acesso em 13/10/2026; citada em: Agente B)
- https://stripe.com/br/pricing (acesso em 13/10/2026; citada em: Agente B, verificação B)
- https://support.iugu.com/hc/pt-br/articles/360056021752-Onde-localizo-as-taxas-cobradas-por-transa%C3%A7%C3%A3o (acesso em 13/10/2026; citada em: Agente B)
- https://vindi.com.br/precos/ (acesso em 13/10/2026; citada em: Agente B, verificação B)
- https://www.asaas.com/precos-e-taxas (acesso em 13/10/2026; citada em: Agente B, verificação B)
- https://www.calculadoradetaxas.com.br/mercado-pago/taxas (acesso em 13/10/2026; citada em: Agente B)
- https://www.infomoney.com.br/minhas-financas/bc-faz-ajustes-em-seguranca-e-estabelece-junho-de-2025-para-lancar-pix-automatico/ (acesso em 13/10/2026; citada em: verificação B)
- https://www.iugu.com/iugu-recorrencia (acesso em 13/10/2026; citada em: Agente B, verificação B)
- https://www.mercadopago.com.br/custos-receber-pagamentos (acesso em 13/10/2026; citada em: verificação B)
- https://www.pagamentos.vindi.com.br/assets/contratos/tabela-de-tarifas.pdf (acesso em 13/10/2026; citada em: Agente B, verificação B)
- https://www.pagar.me/ofertas (acesso em 13/10/2026; citada em: Agente B, verificação B)

### UX

- https://www.nngroup.com/articles/empty-state-interface-design/ (acesso em 13/10/2026; citada em: Agente B)
- https://www.nngroup.com/articles/mobile-app-onboarding/ (acesso em 13/10/2026; citada em: Agente B)
- https://www.nngroup.com/articles/onboarding-tutorials/ (acesso em 13/10/2026; citada em: Agente B)
- https://www.nngroup.com/articles/progressive-disclosure/ (acesso em 13/10/2026; citada em: Agente B)
- https://www.skool.com/pricing (acesso em 13/10/2026; citada em: Agente B)

### Captação

- https://unbounce.com/conversion-benchmark-report/ (acesso em 13/10/2026; citada em: Agente D, verificação D)
- https://unbounce.com/conversion-benchmark-report/education-conversion-rate/ (acesso em 13/10/2026; citada em: Agente D, verificação D)

### Precificação de serviço

- https://clutch.co/web-developers/pricing (acesso em 13/10/2026; citada em: Agente C, verificação C)
- https://taskip.net/ai-automation-agency-pricing/ (acesso em 13/10/2026; citada em: Agente C, verificação C)
- https://www.designjoy.co/ (acesso em 13/10/2026; citada em: Agente C, verificação C)
- https://www.figue.ai/en/blog/best-unlimited-development-subscriptions (acesso em 13/10/2026; citada em: Agente C, verificação C)
- https://www.freelanceronline.com.br/blog/quanto-cobrar-como-freelancer-tabela-de-precos-e-como-calcular-em-2026/ (acesso em 13/10/2026; citada em: Agente C, verificação C)
- https://www.groovyweb.co/blog/ai-consulting-rates-2026 (acesso em 13/10/2026; citada em: Agente C, verificação C)
- https://www.lancei.pro/benchmark (acesso em 13/10/2026; citada em: Agente C)
- https://www.lancei.pro/benchmark/desenvolvedor-backend (acesso em 13/10/2026; citada em: Agente C, verificação C)
- https://www.lancei.pro/benchmark/desenvolvedor-frontend (acesso em 13/10/2026; citada em: Agente C, verificação C)
- https://www.manyrequests.com/blog/productized-agency-examples (acesso em 13/10/2026; citada em: Agente C)
- https://www.manyrequests.com/blog/productized-service-guide (acesso em 13/10/2026; citada em: Agente C, verificação C)

### Matt Pocock

- https://github.com/mattpocock (acesso em 13/10/2026; citada em: verificação B)
- https://github.com/mattpocock/course-video-manager (acesso em 13/10/2026; citada em: Agente B, verificação B)
- https://github.com/mattpocock/course-video-manager/blob/main/CONTEXT.md (acesso em 13/10/2026; citada em: Agente B)
- https://github.com/mattpocock/course-video-manager/tree/main/.claude/skills (acesso em 13/10/2026; citada em: Agente B)
- https://github.com/mattpocock/course-video-manager/tree/main/docs (acesso em 13/10/2026; citada em: Agente B)
- https://github.com/mattpocock/sandcastle (acesso em 13/10/2026; citada em: Agente B, verificação B)
- https://github.com/mattpocock/skills (acesso em 13/10/2026; citada em: Agente B, verificação B)
- https://github.com/shanraisshan/claude-code-best-practice/blob/main/videos/claude-matt-pocock-24-apr-26.md (acesso em 13/10/2026; citada em: Agente B)
- https://www.aihero.dev/ (acesso em 13/10/2026; citada em: Agente B)
- https://www.aihero.dev/cohorts/claude-code-for-real-engineers-2026-04 (acesso em 13/10/2026; citada em: Agente B)
- https://www.instagram.com/reel/Dd61VJkkb8D/ (acesso em 13/10/2026; citada em: Agente B)
- https://www.youtube.com/watch?v=Q3uuE2adUT8 (acesso em 13/10/2026; citada em: Agente B)
- https://x.com/mattpocockuk/status/2056447804537741327 (acesso em 13/10/2026; citada em: Agente B)

### Jack Roberts

- https://chooseto.ai/creator/Itssssss_Jack (acesso em 13/10/2026; citada em: Agente B)
- https://creatordb.app/creatorstats/itssssss_jack/ (acesso em 13/10/2026; citada em: Agente B)
- https://creatordb.app/creatorstats/jackroberts___/ (acesso em 13/10/2026; citada em: Agente B)
- https://github.com/datassthou64-source/JackRobertsMotionGraphicSkill (acesso em 13/10/2026; citada em: Agente B, verificação B)
- https://jackaistudio.com/ (acesso em 13/10/2026; citada em: Agente B)
- https://jackroberts.ai/ (acesso em 13/10/2026; citada em: Agente B, verificação B)
- https://maily.so/josh/posts/vpzl2jp2rk9 (acesso em 13/10/2026; citada em: Agente B)
- https://www.skool.com/@jack-roberts (acesso em 13/10/2026; citada em: Agente B)
- https://www.skool.com/aiautomationsbyjack/about (acesso em 13/10/2026; citada em: Agente B, verificação B)
- https://www.youtube.com/@Itssssss_Jack (acesso em 13/10/2026; citada em: verificação B)
- https://www.youtube.com/@Itssssss_Jack/videos (acesso em 13/10/2026; citada em: Agente B)

### Legislação e regulação

- http://portal.mec.gov.br/index.php?option=com_docman&view=download&alias=85591-rces001-18&category_slug=abril-2018-pdf&Itemid=30192 (acesso em 13/10/2026; citada em: Agente D)
- https://anec.org.br/wp-content/uploads/2021/08/RESOLUCAO-No-1-DE-6-DE-ABRIL-DE-2018.pdf (acesso em 13/10/2026; citada em: Agente D, verificação D)
- https://www.ceesp.sp.gov.br/wp-content/uploads/2024/11/1815409-19-cee-247-16-par-400-19.pdf (acesso em 13/10/2026; citada em: Agente D, verificação D)
- https://www.gov.br/anpd/pt-br/acesso-a-informacao/institucional/atos-normativos/regulamentacoes_anpd/resolucao-cd-anpd-no-19-de-23-de-agosto-de-2024 (acesso em 13/10/2026; citada em: verificação D)
- https://www.gov.br/anpd/pt-br/acesso-a-informacao/institucional/atos-normativos/regulamentacoes_anpd/resolucao-cd-anpd-no-2-de-27-de-janeiro-de-2022 (acesso em 13/10/2026; citada em: verificação D)
- https://www.migalhas.com.br/depeso/412021/juros-e-atualizacao-monetaria-no-cc-brasileiro-lei-14-905-24-no-cc (acesso em 13/10/2026; citada em: verificação C)
- https://www.migalhas.com.br/depeso/415220/anpd-aprova-o-regulamento-de-transferencia-internacional-de-dados (acesso em 13/10/2026; citada em: verificação C)
- https://www.planalto.gov.br/ccivil_03/_ato2004-2006/2004/decreto/d5154.htm (acesso em 13/10/2026; citada em: Agente D, verificação D)
- https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2017/decreto/d9235.htm (acesso em 13/10/2026; citada em: Agente D)
- https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm (acesso em 13/10/2026; citada em: Agente C, Agente D, verificação D)
- https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2025/decreto/D12456.htm (acesso em 13/10/2026; citada em: Agente D, verificação D)
- https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm (acesso em 13/10/2026; citada em: Agente D, verificação D)
- https://www.planalto.gov.br/ccivil_03/leis/2002/l10406compilada.htm (acesso em 13/10/2026; citada em: Agente D, verificação D)
- https://www.planalto.gov.br/ccivil_03/leis/l5172compilado.htm (acesso em 13/10/2026; citada em: Agente D, verificação D)
- https://www.planalto.gov.br/ccivil_03/leis/l8078compilado.htm (acesso em 13/10/2026; citada em: Agente D)
- https://www.planalto.gov.br/ccivil_03/leis/l9394.htm (acesso em 13/10/2026; citada em: Agente D, verificação D)
- https://www.planalto.gov.br/ccivil_03/leis/l9532.htm (acesso em 13/10/2026; citada em: Agente D, verificação D)
- https://www.planalto.gov.br/ccivil_03/leis/l9609.htm (acesso em 13/10/2026; citada em: Agente C)
- https://www.planalto.gov.br/ccivil_03/leis/l9610.htm (acesso em 13/10/2026; citada em: Agente D)
- https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp116.htm (acesso em 13/10/2026; citada em: Agente D, verificação D)
- https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp214.htm (acesso em 13/10/2026; citada em: Agente D, verificação D)
- https://www.qconcursos.com/questoes-de-concursos/questoes/4bc27efb-66 (acesso em 13/10/2026; citada em: verificação C)
- https://www2.camara.leg.br/legin/fed/decret/2025/decreto-12466-22-maio-2025-797486-normaatualizada-pe.pdf (acesso em 13/10/2026; citada em: verificação C)
- https://www2.camara.leg.br/legin/fed/lei/2018/lei-13709-14-agosto-2018-787077-normaatualizada-pl.html (acesso em 13/10/2026; citada em: Agente C, verificação C)

### Contexto e pesquisa social

- https://notes.wisprflow.ai/shared/HbHxBPoTdgpzyFYGWY7ZuAYBrw4X6pmr5jnm87V3XoM (acesso em 13/10/2026; citada em: Agente B)
- https://www.reddit.com/r/TEFCanada/comments/1x5ad23/we_run_french_classes_like_a_gym_theory_at_home/ (acesso em 13/10/2026; citada em: Agente A)
- https://x.com/wbcomdesigns/status/2109505089228439940 (acesso em 13/10/2026; citada em: Agente B)
