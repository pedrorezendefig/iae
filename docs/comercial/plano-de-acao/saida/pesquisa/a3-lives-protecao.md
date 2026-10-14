# A3: Lives (aula ao vivo) e proteção de conteúdo

Agente A, itens 4 e 5 do PROMPT.md. Pesquisa feita em 13/10/2026.

**Cotação usada:** USD 1 = R$ 5,03 (AwesomeAPI, 13/10/2026). Todos os valores em R$ são conversão direta do USD, sem IOF nem impostos.

**Limitação desta pesquisa:** a cota compartilhada de WebSearch da sessão estava esgotada quando este agente começou. Os preços abaixo vêm de páginas oficiais abertas diretamente com WebFetch e da documentação oficial via Context7. Onde a página oficial não trouxe o número (Zoom Webinars por faixa, Vimeo, Bunny MediaCage DRM, licença de DRM avulsa, Hostinger), o valor está marcado como **estimativa** ou **não verificado**.

---

## 1. Resumo para decisão

- **O que o cliente descreveu é videoconferência**: dois professores conversando e alunos que eventualmente falam ("como numa chamada de vídeo"). Com 30 alunos, videoconferência custa praticamente o mesmo que streaming. A conta só muda a partir de algumas centenas de espectadores.
- **MVP (até dez/2026): Zoom Workplace Pro**, com desconto de 50% para entidade sem fins lucrativos verificada, e ingestão automática da gravação pelo webhook `recording.completed`. Custo: US$ 8,50 a 16,99 por mês (R$ 43 a 85). Risco técnico perto de zero. Os professores já sabem usar e não há infraestrutura de tempo real para manter.
- **Evolução (fase 2): LiveKit Cloud (plano Ship, US$ 50/mês)** embutido na plataforma, com papéis (professor publica, aluno só assiste, aluno "levanta a mão" e é promovido a falar), chat próprio e Egress gravando direto no nosso bucket. É open source: se o volume crescer ou o fornecedor virar problema, dá para auto-hospedar o mesmo servidor sem reescrever o front.
- **Fallback de emergência**: YouTube Live não listado ou Cloudflare Stream Live via OBS, com o link publicado na própria plataforma. Fica documentado no runbook, sem uso no dia a dia.
- **Cenário IAE (4 lives de 3 h, 30 alunos):** de R$ 43 (Zoom com desconto) a R$ 311 (Daily) por mês. LiveKit Cloud fica em cerca de R$ 264.
- **Cenário crescimento (8 lives de 3 h, 200 alunos):** de R$ 55 (Zoom Business com desconto) a R$ 5.729 (100ms em videoconferência). LiveKit Cloud fica em cerca de R$ 2.495 e streaming HLS (100ms, Mux, Cloudflare) entre R$ 1.194 e R$ 1.755.
- **Proteção de conteúdo, nível recomendado:** URL assinada de vida curta, restrição de domínio, marca d'água visual dinâmica com nome e parte do CPF/e-mail do aluno, limite de 2 reproduções simultâneas por conta, sem botão de download, e cláusula contratual. **DRM fica fora do MVP.** Na Mux, custaria US$ 100/mês fixos (R$ 503) mais US$ 0,003 por licença. Além disso, DRM não impede gravação de tela, que é o vetor real de vazamento de aula.

---

## 2. Dois modelos de live

| | Videoconferência (WebRTC, todos podem falar) | Streaming (professores transmitem, alunos assistem) |
|---|---|---|
| Latência | menos de 0,5 s | 5 a 30 s (HLS); Mux "low" chega a cerca de 5 s |
| Interação | voz e vídeo de qualquer aluno, quando permitido | só chat (texto) e perguntas moderadas |
| Custo por aluno | cobra por minuto de participante (US$ 0,0005 a 0,004/min) | cobra por minuto entregue (US$ 0,001 a 0,0012/min) |
| Escala | centenas por sala, com SFU | milhares sem esforço (CDN) |
| Gravação | precisa de um "compositor" (Egress, Jibri, cloud recording) | quase sempre automática (Mux, Cloudflare) |
| Exemplos | Zoom Meeting, Google Meet, Jitsi, Daily, 100ms, LiveKit | Zoom Webinars, Mux Live, Cloudflare Stream Live, YouTube Live, Vimeo Live, 100ms HLS |
| Encaixe no IAE | **turmas de 20 a 50 alunos, dinâmica de sala de aula** | aula aberta, aula gratuita do funil, palestras com 200+ pessoas |

Para streaming, os dois professores precisam primeiro estar juntos num "estúdio": a mesma sala física com OBS ou uma sala WebRTC (LiveKit, Daily, 100ms) que exporta RTMP para o serviço de streaming. Por isso o modelo híbrido mais limpo é: **sala WebRTC para professores e alunos promovidos a falar, e plateia como assinante só de recepção**. O LiveKit faz isso nativamente (permissão `canPublish` falsa para aluno). Os 100ms e a Daily fazem com a modalidade HLS.

---

## 3. Opções avaliadas, uma a uma

### 3.1 Zoom (Workplace Pro/Business, Webinars, API)

- **Preço (zoom.us/pricing):** Pro US$ 16,99/mês por licença (anual US$ 14,16/mês), 100 participantes, reunião de até 30 h, 10 GB de gravação em nuvem por licença. Business US$ 21,99/mês (anual US$ 18,33), **300 participantes**. Large Meeting add-on leva a 1.000 participantes, mas o preço não aparece na página.
- **Webinars (zoom.us/pricing/webinar):** a página mostra um único preço, US$ 89/mês (anual US$ 66,67/mês), e diz que o preço varia por capacidade de público. A capacidade correspondente a esse preço não aparece. **Faixas de 100/500/1.000 não verificadas.**
- **Desconto para sem fins lucrativos (zoom.us/pricing/developer, FAQ):** entidades verificadas têm **50% de desconto** em Workplace Pro, Business, Webinars e Large Meetings. O IAE é instituição sem fins lucrativos, mas precisa passar pela verificação (TechSoup ou equivalente).
- **Gravação automática na plataforma (Context7, doc oficial Zoom):** o webhook `recording.completed` traz `recording_files[]` com `download_url`, `file_type` (MP4, M4A, VTT de transcrição, chat), `recording_type` (ex.: `shared_screen_with_speaker_view`) e um `download_token`. **O token vale só 24 h**: o nosso backend (FastAPI) precisa baixar o arquivo assim que o evento chegar e enviar para o pipeline de VOD. Também existe API REST para listar e apagar gravações, o que permite liberar a cota de 10 GB.
- **Chat:** nativo, e o arquivo de chat também vem no webhook.
- **Qualidade:** boa e estável. Gravação em nuvem costuma sair em 720p a 1080p, dependendo da conta (não verificado nesta pesquisa).
- **Risco:** baixo de queda. A experiência é fora da plataforma (o aluno sai do site para o Zoom), e o link pode ser repassado. Mitigação: inscrição obrigatória com link único por aluno, sala de espera, desativar gravação local de participantes. Dependência de fornecedor: média. Trocar depois exige só mudar a origem do arquivo gravado.
- **Embutir na plataforma:** possível com Zoom Meeting SDK ou Video SDK. A página de preços para desenvolvedor não informa o valor por minuto do Video SDK (não verificado).

### 3.2 Google Meet (Workspace)

- **Preço (workspace.google.com/pricing, exibido em R$):** Business Standard R$ 81,80/usuário/mês (anual), Meet com 150 participantes e gravação no Drive. Business Plus R$ 128,40, 500 participantes. Starter (R$ 40,90) **não grava**. Enterprise: 1.000 participantes e transmissão ao vivo só dentro do domínio.
- **Gravação:** vai para o Drive do organizador. Publicar automaticamente na plataforma exige a Meet REST API ou a Drive API (não verificado via Context7 nesta pesquisa). É mais trabalhoso que o webhook do Zoom.
- **Risco:** não embute na plataforma e não tem webinar de verdade. Bom se o IAE já usa Google Workspace (o Google for Nonprofits pode zerar a licença, não verificado).
- **Veredito:** viável, mas inferior ao Zoom para este caso.

### 3.3 Jitsi auto-hospedado

- **Requisitos (jitsi.github.io handbook):** servidor com 4 núcleos dedicados e 8 GB de RAM. A rede é o item mais crítico: cerca de 2,5 Mbit/s por fluxo de 720p, e um link de 1 Gbit/s serve para um servidor pequeno. **Gravação exige Jibri**: uma instância por gravação simultânea, com no mínimo 8 GB de RAM para 720p e SSD, e o Jibri **não deve rodar no mesmo servidor** do Jitsi.
- **Custo:** duas VPS (Jitsi+JVB e Jibri). **Estimativa** de US$ 30 a 60/mês (R$ 150 a 300) em VPS de 4 a 8 vCPU. Preço Hostinger não verificado nesta pesquisa.
- **Risco: alto.** Se a VPS cair, a aula cai e a culpa é nossa. Recomenda CPU dedicada e não compartilhada (a VPS Hostinger é compartilhada). A gravação falha silenciosamente se faltar memória ou disco. Escalar para 200+ pessoas exige vários JVB e conhecimento de OCTO, que o próprio handbook desaconselha para administrador inexperiente.
- **Veredito:** não recomendado. Troca dinheiro pouco por risco operacional alto, exatamente onde a equipe tem menos experiência.

### 3.4 Daily.co

- **Preço (daily.co/pricing/video-sdk):** 10.000 minutos-participante grátis por mês. Vídeo a US$ 0,0040/min-participante (10.001 a 100.000), US$ 0,0037 (100k a 500k), caindo até US$ 0,0015 acima de 50M. Gravação em nuvem US$ 0,01349 por minuto gravado (relógio, não por participante). Streaming RTMP US$ 0,015/min codificado, HLS US$ 0,03/min. Transcrição pós-aula US$ 0,0043/min.
- **Limite de participantes por chamada:** não informado na página.
- **Gravação automática (Context7, doc Daily REST API):** `POST /rooms/{room}/recordings/start` (com `maxDuration`, layout, bitrate). Webhooks `recording.started` e `recording.ready-to-download` (traz `recording_id`, `duration`, `s3_key`). `GET /recordings/{id}/access-link` gera link temporário de 15 min a 12 h. A sala aceita `recordings_bucket`, ou seja, **grava direto no nosso bucket S3**.
- **Chat:** `enable_chat` e chat avançado no Prebuilt. Também é possível fazer chat próprio por app-message.
- **Risco:** baixo. Empresa madura, SDK estável, Prebuilt pronto para embutir (iframe).
- **Veredito:** ótima DX, mas é a mais cara por participante. Boa alternativa ao LiveKit se quisermos o Prebuilt pronto.

### 3.5 100ms

- **Preço (100ms.live/pricing):** videoconferência com 10.000 min grátis, depois US$ 0,004/min por participante. **Live streaming (HLS) com 10.000 min grátis, depois US$ 0,0012/min por espectador.** Gravação com 300 min grátis, depois US$ 0,0135/min. Limite máximo de participantes não informado.
- **Ponto forte:** o modo HLS barateia a plateia grande e mantém os professores em WebRTC.
- **Risco:** fornecedor menor que Daily e LiveKit, com foco no mercado indiano. Gravação, webhooks e chat existem, mas não foram verificados via Context7 nesta pesquisa.

### 3.6 LiveKit (Cloud e auto-hospedado)

- **Preço Cloud (livekit.com/pricing):**

| Plano | Mensal | Minutos WebRTC incluídos | Excedente | Gravação/composição | Banda de saída | Conexões simultâneas |
|---|---|---|---|---|---|---|
| Build | US$ 0 | 5.000 | n/d | 60 min | 50 GB | 100 |
| Ship | a partir de US$ 50 | 150.000 | US$ 0,0005/min | 600 min, depois US$ 0,02/min (vídeo) | 250 GB, depois US$ 0,12/GB | 1.000 |
| Scale | a partir de US$ 500 | 1.500.000 | US$ 0,0004/min | 8.000 min, depois US$ 0,015/min | 3 TB, depois US$ 0,10/GB | 5.000 |

- **Gravação (Context7, repositório livekit/egress):** o Egress grava a sala composta (Room Composite, via Chrome headless com layout) em MP4 ou em **segmentos HLS** e envia para S3, GCS, Azure ou endpoint S3 compatível (R2, B2, Hostinger Object Storage). Tem upload de backup se o destino principal falhar. Para auto-hospedagem, existe `session_limits` (`file_output_max_duration`, `segment_output_max_duration`). Os exemplos da doc usam 1 h e 3 h, e **para aula de 3 h é preciso configurar acima disso**. O fim da gravação é notificado por webhook (`egress_ended`) e retorna o manifesto com arquivos e playlists.
- **Auto-hospedado:** servidor SFU em Go (open source, Apache 2.0) e Egress em contêiner separado. Cada composição consome cerca de 3 unidades de CPU, segundo o `cpu_cost` padrão `room_composite_cpu_cost: 3.0`. Requer Redis. Roda no Coolify, mas WebRTC exige portas UDP abertas e, idealmente, TURN.
- **Chat:** data channels e componentes React prontos (`@livekit/components-react`). Ou chat próprio via Supabase Realtime.
- **Risco:** baixo na Cloud. Sem lock-in real: o mesmo cliente funciona com servidor próprio. A empresa hoje se posiciona em "infraestrutura para agentes de IA" (vagas abertas em Ashby, 10/2026), mas o produto de vídeo continua sendo a base.
- **Veredito: melhor opção para a fase 2.** É a mais barata por minuto entre as gerenciadas e a única com saída para auto-hospedagem sem reescrever.

### 3.7 Mux Live

- **Preço (mux.com/pricing/video e /pricing/live):** codificação ao vivo 1080p Plus US$ 0,03125/min de entrada. A página de live cita "Plus a partir de US$ 0,025/min para 720p". Entrega US$ 0,0008/min (720p) ou US$ 0,001/min (1080p), com **100.000 min de entrega grátis por mês**. Armazenamento da gravação US$ 0,003/min/mês. Simulcast US$ 0,02/min por destino. Plano pay-as-you-go com crédito de US$ 20/mês. Launch US$ 20/mês com US$ 100 de crédito.
- **Gravação automática (mux.com/docs, start-live-streaming):** cada transmissão vira um Asset ("Active Asset"). No fim, o evento `video.asset.live_stream_completed` troca o playback para VOD. Latência padrão de cerca de 30 s, "reduced" 10 a 15 s, "low" a partir de 5 s. **Desconecta automaticamente após 12 h.**
- **Risco:** baixo. Só transmite, então precisa de OBS ou de uma sala WebRTC exportando RTMP. Chat é por nossa conta.

### 3.8 Cloudflare Stream Live

- **Preço (developers.cloudflare.com/stream/pricing):** ingestão e codificação **grátis**. Armazenamento US$ 5/mês por 1.000 min (pré-pago). Entrega US$ 1 por 1.000 min. A gravação ao vivo entra no armazenamento. Transmissão WebRTC não é gravada, e a cobrança de entrega WebRTC começa em **15/10/2026**.
- **Funcionamento (stream-live):** RTMPS ou SRT, ABR automático, **toda live é gravada** e fica disponível cerca de 60 s depois do fim. Webhooks `live_input.connected`, `live_input.disconnected` e `live_input.errored` (inclusive `ERR_STORAGE_QUOTA_EXHAUSTED`).
- **Risco:** baixo. Mesmo modelo da Mux (só transmite), com chat por nossa conta.

### 3.9 Bunny Stream

- A página oficial de produto (bunny.net/stream) **não menciona live streaming**. Para este projeto, Bunny é opção de VOD (hospedagem das gravações), não de live. Live da Bunny: não verificado.

### 3.10 YouTube Live não listado (fallback)

- **Custo:** zero.
- **Riscos (support.google.com/youtube, respostas 2853700 e 2474026):** canal precisa estar verificado e sem restrição nos últimos 90 dias. Strike bloqueia live por 14 dias. É proibido usar outro canal para contornar. Limite de 10 streams ativos por canal. Vídeo não listado **não tem controle de acesso**: quem tiver o link assiste. Conteúdo do IAE vira refém da política de terceiros (direitos autorais de slides, música de fundo).
- **Uso recomendado:** só fallback de emergência, documentado no runbook.

### 3.11 Vimeo Live

- A página de planos (vimeo.com/upgrade-plan) não carregou o conteúdo de preços via fetch. **Não verificado.** Pelo histórico conhecido, live exige o plano Advanced ou superior, na faixa de **US$ 65 a 75/mês (estimativa)**. Não traz vantagem sobre Mux ou Cloudflare para quem vai construir a plataforma.

---

## 4. Custo por hora de live, por número de participantes

Premissas: preço de lista, **sem descontar a franquia grátis mensal** (para comparar o custo marginal); gravação à parte. Em videoconferência, os participantes incluem os dois professores. Em streaming, 2 professores em WebRTC mais N espectadores.

**Estimativa de banda LiveKit:** cada aluno recebe cerca de 1,5 Mbit/s (tela compartilhada mais duas câmeras pequenas, com simulcast), ou seja, cerca de 0,675 GB por hora por aluno.

| Opção | Modelo | 20 participantes/h | 100 participantes/h | 500 participantes/h | Gravação/h |
|---|---|---|---|---|---|
| Zoom Pro / Business | videoconf. | licença fixa (Pro) | licença fixa (Pro, limite 100) | exige Business + Large Meeting ou Webinars (preço n/d) | inclusa (cota 10 GB) |
| Google Meet | videoconf. | licença fixa (Standard) | licença fixa (Standard) | exige Business Plus (R$ 128,40/usuário) | inclusa (Drive) |
| Jitsi auto-hosp. | videoconf. | VPS fixa | VPS fixa | vários JVB (estimativa) | Jibri, VPS própria |
| Daily | videoconf. | US$ 4,80 (R$ 24,14) | US$ 24,00 (R$ 120,72) | US$ 120,00 (R$ 603,60) | US$ 0,81 |
| 100ms | videoconf. | US$ 4,80 (R$ 24,14) | US$ 24,00 (R$ 120,72) | US$ 120,00 (R$ 603,60) | US$ 0,81 |
| 100ms | streaming HLS | US$ 1,92 (R$ 9,66) | US$ 7,68 (R$ 38,63) | US$ 36,48 (R$ 183,49) | US$ 0,81 |
| LiveKit Cloud (Ship) | videoconf. ou híbrido | US$ 2,22 (R$ 11,17) | US$ 11,10 (R$ 55,83) | US$ 55,50 (R$ 279,17) | US$ 1,20 |
| Mux Live 1080p | streaming | US$ 3,08 (R$ 15,49) | US$ 7,88 (R$ 39,64) | US$ 31,88 (R$ 160,36) | armazenamento US$ 0,18/mês |
| Cloudflare Stream Live | streaming | US$ 1,20 (R$ 6,04) | US$ 6,00 (R$ 30,18) | US$ 30,00 (R$ 150,90) | armazenamento US$ 0,30/mês |
| YouTube não listado | streaming | US$ 0 | US$ 0 | US$ 0 | US$ 0 |

Leitura: até 100 pessoas, a diferença por hora entre as opções é de dezenas de reais. A 500 pessoas, streaming custa cerca de metade do LiveKit e um quarto do Daily. Para o IAE, o custo de live **nunca será o componente dominante** da infraestrutura nos próximos 12 meses. Armazenamento e entrega do VOD pesam mais (ver arquivo do Agente A sobre benchmark).

---

## 5. Tabela de custo mensal: cenário IAE (4 lives de 3 h, 30 alunos)

Base: 720 min de aula por mês; 32 participantes (30 alunos e 2 professores) = **23.040 minutos-participante**; 21.600 minutos-espectador no modelo streaming. Franquias grátis **aplicadas**.

| Opção | Cálculo | USD/mês | R$/mês |
|---|---|---|---|
| Zoom Pro, desconto sem fins lucrativos (50%) | 1 licença; o outro professor entra como co-host | 8,50 | 42,73 |
| Zoom Pro, preço cheio | 1 licença | 16,99 | 85,46 |
| Google Meet Business Standard | 1 licença (R$ 81,80) | 16,26 | 81,80 |
| Jitsi auto-hospedado | 2 VPS (estimativa) | 30 a 60 | 151 a 302 |
| YouTube não listado | grátis | 0 | 0 |
| Mux Live 1080p | 720 × 0,03125 = 22,50 + entrega na franquia + armazenamento 2,16 | 24,66 (4,66 após crédito PAYG de US$ 20) | 124,04 (23,44) |
| Cloudflare Stream Live | entrega 21.600 min = 21,60 + bloco de 1.000 min armazenados = 5,00 | 26,60 | 133,80 |
| 100ms, HLS | espectadores (21.600 menos 10.000) × 0,0012 = 13,92 + gravação (720 menos 300) × 0,0135 = 5,67 | 19,59 | 98,54 |
| 100ms, videoconferência | (23.040 menos 10.000) × 0,004 = 52,16 + gravação 5,67 | 57,83 | 290,88 |
| LiveKit Cloud Ship | 50 fixo; minutos e banda (cerca de 243 GB) na franquia; gravação 120 min × 0,02 = 2,40 | 52,40 | 263,57 |
| Daily | (23.040 menos 10.000) × 0,004 = 52,16 + gravação 720 × 0,01349 = 9,71 | 61,87 | 311,21 |

Observação: Mux e Cloudflare precisam de algo que junte os dois professores (OBS numa sala física ou uma sala WebRTC). Se os professores estiverem em locais diferentes, some o custo da sala WebRTC dos dois (dentro da franquia grátis de Daily, 100ms ou LiveKit).

## 6. Tabela de custo mensal: cenário crescimento (8 lives de 3 h, 200 alunos)

Base: 1.440 min de aula por mês; 202 participantes = **290.880 minutos-participante**; 288.000 minutos-espectador.

| Opção | Cálculo | USD/mês | R$/mês |
|---|---|---|---|
| Zoom Business, desconto 50% | 1 licença (300 participantes) | 11,00 | 55,31 |
| Zoom Business, preço cheio | 1 licença | 21,99 | 110,61 |
| Zoom Webinars (capacidade não informada) | preço único publicado | 89,00 | 447,67 |
| Google Meet Business Plus | 1 licença (R$ 128,40) | 25,53 | 128,40 |
| Mux Live 1080p | codificação 45,00 + entrega (288.000 menos 100.000) × 0,001 = 188,00 + armazenamento 4,32 | 237,32 | 1.193,72 |
| Cloudflare Stream Live | entrega 288,00 + 2.000 min armazenados 10,00 | 298,00 | 1.498,94 |
| 100ms, HLS | (288.000 menos 10.000) × 0,0012 = 333,60 + gravação (1.440 menos 300) × 0,0135 = 15,39 | 348,99 | 1.755,42 |
| LiveKit Cloud Ship | 50 + (290.880 menos 150.000) × 0,0005 = 70,44 + gravação 840 × 0,02 = 16,80 + banda (3.240 menos 250 GB) × 0,12 = 358,80 | 496,04 | 2.495,08 |
| LiveKit Cloud Scale | 500 + banda 240 GB × 0,10 = 24,00 | 524,00 | 2.635,72 |
| Daily | 90.000 × 0,004 + 180.880 × 0,0037 = 1.029,26 + gravação 19,43 | 1.048,69 | 5.274,91 |
| 100ms, videoconferência | 280.880 × 0,004 = 1.123,52 + gravação 15,39 | 1.138,91 | 5.728,72 |

Leitura: com 200 alunos por aula, o Zoom continua imbatível em preço (licença fixa), mas a experiência continua fora da plataforma. Entre as soluções embutidas, **streaming (Mux, Cloudflare) custa metade do LiveKit**, porque a banda WebRTC do LiveKit é cobrada por GB. O desenho que equilibra as duas coisas é o **híbrido**: professores e alunos com a palavra no LiveKit (poucas dezenas), e a plateia assistindo por HLS, via Egress RTMP para Mux ou Cloudflare, ou HLS próprio no bucket. Assim o custo fica perto do streaming e a interação perto da videoconferência.

---

## 7. Recomendação de lives

### MVP (até fim de nov/começo de dez de 2026): Zoom Pro integrado

1. Uma licença Zoom Pro em nome do IAE. Pedir o desconto de 50% para sem fins lucrativos.
2. Na plataforma: página da aula ao vivo com botão "Entrar na aula", que gera link de inscrição único por aluno via API de registrants, sala de espera e senha.
3. App OAuth no Zoom Marketplace com webhook `recording.completed`, ligado ao FastAPI. O backend baixa o MP4 e o VTT **em até 24 h** (validade do `download_token`), envia para o pipeline de VOD (o mesmo do Agente A) e cria a aula gravada como rascunho para o admin publicar. Depois apaga do Zoom para não estourar os 10 GB.
4. Transcrição VTT do Zoom (ou Whisper) alimenta busca e agente de IA.

**Esforço estimado:** 3 a 5 dias de desenvolvimento. **Risco:** baixo. **Dependência:** trocável, porque só a origem do arquivo muda.

### Evolução (fase 2, 2027): LiveKit Cloud embutido, híbrido

1. Sala LiveKit com papéis: professor (publica áudio, vídeo e tela), aluno (só assina; "levantar a mão" promove a publicador) e moderador.
2. Chat próprio (Supabase Realtime ou data channel), salvo no Postgres e exibido ao lado da gravação.
3. Egress Room Composite gravando HLS segmentado direto no object storage do VOD. A gravação vira aula assíncrona sem retranscodificar.
4. Acima de cerca de 100 espectadores por aula: Egress RTMP para Cloudflare Stream ou Mux, com plateia em HLS.
5. Se o volume justificar (custo mensal LiveKit acima de cerca de US$ 500), migrar para LiveKit auto-hospedado numa VPS com CPU dedicada. O front não muda.

**Esforço estimado:** 2 a 3 semanas. **Risco:** médio (UX de sala, testes de rede de alunos).

### Fallback (sempre): runbook de 1 página

Se o Zoom ou o LiveKit cair, o professor abre o OBS e transmite para Cloudflare Stream Live (chave pré-cadastrada) ou YouTube não listado. A plataforma mostra um banner com o link. A gravação é recuperada pelo webhook do Cloudflare ou subida manualmente.

### Por que não as outras

- **Jitsi:** risco operacional alto na área em que a equipe é mais fraca.
- **Google Meet:** gravação no Drive e sem embutir. Inferior ao Zoom sem ser mais barato.
- **Daily e 100ms:** boas, mas mais caras por participante que o LiveKit e sem a saída open source. A Daily fica como segunda opção se o Prebuilt (iframe pronto) economizar tempo.
- **Mux e Cloudflare sozinhos:** não resolvem a conversa entre dois professores nem a pergunta por voz do aluno.
- **Vimeo:** sem vantagem e preço não verificado.

---

## 8. Proteção de conteúdo

### 8.1 Camadas possíveis, do mais barato ao mais caro

| Camada | O que impede | O que não impede | Custo | Esforço |
|---|---|---|---|---|
| Player só para logado, sem botão de download | aluno leigo baixar | extensões de download, gravação de tela | zero | trivial |
| **URL assinada com expiração** (token JWT por aluno) | repassar o link do vídeo; hotlink | quem está logado baixar o HLS com ferramenta | zero (Cloudflare, Mux, Bunny incluem) | 1 a 2 dias |
| Restrição de domínio / referer / país / IP | embutir o vídeo em outro site | quem acessa pelo site oficial | zero | horas |
| **Limite de reproduções simultâneas por conta** | uma conta compartilhada por 5 pessoas ao mesmo tempo | compartilhamento em horários diferentes | zero (Postgres) | 2 a 3 dias |
| **Detecção de compartilhamento de conta** | uso anômalo (muitos IPs, cidades, dispositivos por semana) | casal que divide a conta com cuidado | zero | 2 a 4 dias |
| **Marca d'água visual dinâmica** (nome + CPF parcial/e-mail, posição variando) | vazamento anônimo: quem grava a tela se identifica | vazamento por quem não se importa de ser identificado; recorte do vídeo | zero (overlay no player) | 1 a 2 dias |
| DRM (Widevine, FairPlay, PlayReady) | download do arquivo por ferramenta; captura de tela em alguns navegadores e dispositivos com L1 | gravação por câmera ou captura externa; navegadores com Widevine L3 | ver 8.3 | 1 a 2 semanas (FairPlay exige conta Apple Developer e pacote FPS) |
| Marca d'água forense (A/B por sessão, invisível) | vazamento mesmo com a marca visual recortada | nada prático para este porte | contrato enterprise (Irdeto, NAGRA, Castlabs); não verificado | alto |

### 8.2 Detalhes técnicos verificados

- **Cloudflare Stream** (developers.cloudflare.com/stream/viewing-videos/securing-your-stream): `requireSignedURLs`; tokens gerados localmente com signing key (recomendado para volume), via endpoint `/token` ou Workers. Expiração padrão de 1 h e **máximo de 24 h** com signing key. `nbf` (não antes de). Até 5 regras de acesso por token (IP, país, allow/block). Download só se o token tiver `downloadable: true`. **A página não menciona DRM.**
- **Mux** (mux.com/docs/guides/protect-videos-with-drm): signed playback IDs com JWT. **DRM como add-on: US$ 100/mês de acesso mais US$ 0,003 por licença** (uma licença corresponde aproximadamente a uma reprodução). Widevine e PlayReady gerenciados pela Mux. FairPlay exige que o cliente obtenha o pacote FPS da Apple (conta Apple Developer ativa). DRM exige URL assinada. **Live não é protegida por DRM.**
- **Bunny Stream** (bunny.net/stream): token authentication e proteção contra hotlink, "todos os recursos de segurança gratuitos", watermark listado como recurso, e "multi-DRM enterprise" (MediaCage) que promete impedir download, gravação e captura de tela. **O preço do MediaCage Enterprise DRM não foi obtido** (página retornou 502).
- **Daily** (doc REST): link de gravação temporário de 900 s a 43.200 s.
- **Zoom:** link de download da gravação com token de 24 h. Inscrição com link único por participante.

### 8.3 Custo de DRM

| Provedor | Taxa fixa | Por licença | Cenário IAE (30 alunos × 20 reproduções/mês = 600) | Cenário 1.000 alunos × 20 = 20.000 |
|---|---|---|---|---|
| Mux | US$ 100/mês | US$ 0,003 | US$ 101,80 (R$ 512,05) | US$ 160,00 (R$ 804,80) |
| Cloudflare Stream | não oferece DRM na doc consultada | n/a | n/a | n/a |
| Bunny (MediaCage Enterprise) | não verificado | não verificado | n/d | n/d |
| Licença avulsa (EZDRM, Axinom, BuyDRM) com pipeline próprio | não verificado | não verificado; mercado costuma cobrar frações de centavo por licença com mínimo mensal (estimativa) | n/d | n/d |

**Além do custo de DRM:** conta Apple Developer (FairPlay), empacotamento CMAF/CENC no transcoding, player compatível (Shaka Player ou o player do provedor) e testes em Safari, iOS, Android e Smart TV. Para o IAE, com 5 alunos pagos hoje e cerca de R$ 2.000 por curso, US$ 100/mês fixos equivalem a 25% da receita de um aluno por mês, para proteger contra um vetor (download por ferramenta) que a gravação de tela contorna de qualquer jeito.

### 8.4 O que fazem Hotmart, Kiwify e FGV

- **Hotmart** (hotmart.com/pt-br/club, FAQ): declara "proteção por criptografia e marca d'água para evitar cópias não autorizadas" em celular, computador e smart TV, sistema antifraude, e permite assistir offline pelo app Hotmart Player (download controlado dentro do app). Não fala em DRM nem em limite de dispositivos na página.
- **Kiwify** (kiwify.com.br): a página principal só diz que hospeda e exibe os vídeos sem custo extra e tem canal de denúncia de pirataria. **Nenhuma medida técnica de proteção é descrita** (não verificado na central de ajuda).
- **FGV online:** não verificado nesta pesquisa. A cota de busca acabou antes.
- **Leitura:** o padrão de mercado no Brasil para infoproduto e curso de ticket médio é **URL protegida + marca d'água com dados do aluno + antifraude**, não DRM de estúdio. Isso confirma o nível recomendado abaixo.

### 8.5 Nível recomendado para o IAE

**MVP (obrigatório):**

1. Vídeo só para aluno logado e com direito ao curso, verificado no backend a cada emissão de token.
2. URL assinada por aluno com expiração curta (1 a 4 h), restrita ao domínio da plataforma.
3. Marca d'água visual dinâmica no player: nome do aluno e CPF parcial (ex.: `***.456.789-**`) ou e-mail, semitransparente, mudando de posição a cada 30 a 60 s. Para público de advogados, ser identificável num vazamento tem peso reputacional e ético (OAB), o que torna esta a **barreira mais eficaz por real gasto**.
4. Limite de 2 reproduções simultâneas por conta: tabela `playback_sessions` com heartbeat de 60 s; a terceira sessão derruba a mais antiga, com aviso.
5. Sem botão de download e sem MP4 público. Só HLS.
6. Termos de uso com cláusula de uso pessoal e multa por compartilhamento, aceitos no checkout.

**Fase 2 (quando houver dado):** relatório de suspeita de compartilhamento (mais de 3 cidades ou 5 dispositivos por semana) para o admin; bloqueio de download também das gravações de live (Zoom: desativar gravação local de participantes).

**Fase 3 (só se houver gatilho):** DRM via Mux ou Bunny se ocorrer vazamento comprovado, se um contrato B2B com escritório exigir, ou se o catálogo passar de cerca de 1.000 alunos ativos (DRM abaixo de 10% do custo de infra). Marca d'água forense: não recomendada para este porte.

**Custo incremental do nível recomendado: zero em infraestrutura.** Cerca de 5 a 8 dias de desenvolvimento no total.

---

## 9. Sinal da comunidade (last30days)

Rodei a skill last30days (v3.21.1) comparando LiveKit, Daily e Zoom para aulas ao vivo, com subreddits WebRTC, webdev, elearning, instructionaldesign e selfhosted. O resultado foi **fraco e pouco relevante**: Reddit parcial (HTTP 429), X só com posts promocionais (um lançamento de streaming "onchain" usando LiveKit) e vagas abertas da LiveKit que reforçam o reposicionamento da empresa para "infraestrutura de agentes de IA". Apareceu um relato de escola de idiomas que dá "teoria em casa e prática ao vivo no Zoom onde todos falam" (r/TEFCanada, 13/10/2026). Esse formato, de aula assíncrona mais encontro síncrono interativo, é o mesmo que o IAE descreveu. Não há sinal recente de quedas ou problemas graves em nenhum dos três provedores. Arquivo bruto: `~/Documents/Last30Days/livekit-raw-v3.md`.

---

## Confiança

**Fato verificado (página oficial ou doc oficial, 13/10/2026):**
- Preços da Daily (vídeo, gravação, streaming, transcrição, franquia de 10.000 min).
- Preços do LiveKit Cloud (Build, Ship, Scale, excedentes, banda, conexões).
- Preços do 100ms (videoconferência, HLS por espectador, gravação, franquias).
- Preços da Mux (live 1080p US$ 0,03125/min, entrega, armazenamento, franquia de 100k min, DRM US$ 100/mês + US$ 0,003/licença, limite de 12 h, latências).
- Preços e funcionamento do Cloudflare Stream e Stream Live (ingestão grátis, US$ 5/1.000 min armazenados, US$ 1/1.000 min entregues, gravação automática, webhooks de live, tokens de no máximo 24 h, ausência de DRM na página de segurança).
- Zoom Pro e Business (preço, participantes, 30 h, 10 GB), preço único de Webinars US$ 89/mês, desconto de 50% para sem fins lucrativos verificadas.
- Google Workspace em R$ (Starter sem gravação, Standard 150, Plus 500).
- Requisitos do Jitsi e do Jibri.
- APIs de gravação: Zoom `recording.completed` com token de 24 h; Daily start/webhook/access-link/bucket próprio; LiveKit Egress (S3/GCS/Azure, HLS segmentado, limites de duração configuráveis).
- Regras de restrição do YouTube Live.
- Hotmart declara criptografia + marca d'água.

**Estimativa (cálculo meu sobre preço verificado ou premissa declarada):**
- Banda de cerca de 1,5 Mbit/s por aluno no LiveKit (0,675 GB/h), que domina o custo LiveKit no cenário de 200 alunos.
- Custo de VPS para Jitsi (US$ 30 a 60).
- Vimeo Advanced (US$ 65 a 75).
- 20 reproduções por aluno por mês no cálculo de DRM.
- Esforços em dias.

**Sem resposta:**
- Preço do Zoom Webinars por faixa de público e do Large Meeting add-on.
- Preço por minuto do Zoom Video SDK.
- Preço do Bunny MediaCage Enterprise DRM (página com erro 502).
- Bunny live streaming.
- Planos e limites do Vimeo.
- Preço de licença DRM avulsa (EZDRM, Axinom, BuyDRM).
- O que FGV online faz em proteção.
- O que a Kiwify faz tecnicamente.
- Limite máximo de participantes por sala da Daily e do 100ms.
- Preço de VPS Hostinger.

Causa: a cota de WebSearch da sessão (200 buscas compartilhadas entre agentes) estava esgotada. Vale rodar de novo essas lacunas quando a cota renovar.

## Fontes

Todas acessadas em 13/10/2026.

- https://www.daily.co/pricing/video-sdk/
- https://livekit.com/pricing
- https://www.100ms.live/pricing
- https://www.mux.com/pricing/video
- https://www.mux.com/pricing/live
- https://www.mux.com/docs/guides/protect-videos-with-drm
- https://www.mux.com/docs/guides/start-live-streaming
- https://developers.cloudflare.com/stream/pricing/
- https://developers.cloudflare.com/stream/stream-live/
- https://developers.cloudflare.com/stream/stream-live/webhooks/
- https://developers.cloudflare.com/stream/viewing-videos/securing-your-stream/
- https://developers.cloudflare.com/stream/manage-video-library/using-webhooks/
- https://zoom.us/pricing
- https://zoom.us/pricing/webinar
- https://zoom.us/pricing/developer
- https://developers.zoom.us/docs/api/meetings/events (via Context7, `/websites/developers_zoom_us`)
- https://developers.zoom.us/docs/api/video-sdk/events (via Context7)
- https://docs.daily.co/reference/rest-api/rooms/recordings/start (via Context7, `/websites/daily_co_reference_rest-api`)
- https://docs.daily.co/reference/rest-api/webhooks/events/recording-ready-to-download (via Context7)
- https://docs.daily.co/reference/rest-api/recordings/get-recording-link (via Context7)
- https://github.com/livekit/egress (README e código, via Context7, `/livekit/egress`)
- https://workspace.google.com/pricing
- https://jitsi.github.io/handbook/docs/devops-guide/devops-guide-requirements/
- https://bunny.net/pricing/stream/
- https://bunny.net/stream/
- https://support.google.com/youtube/answer/2853700
- https://support.google.com/youtube/answer/2474026
- https://hotmart.com/pt-br/club
- https://kiwify.com.br/
- https://vimeo.com/upgrade-plan (sem dados de preço no fetch)
- https://www.reddit.com/r/TEFCanada/comments/1x5ad23/we_run_french_classes_like_a_gym_theory_at_home/ (via last30days)
- https://jobs.ashbyhq.com/livekit (vagas, via last30days)
- Cotação: AwesomeAPI, USD-BRL 5,03 em 13/10/2026 (fornecida pelo orquestrador)
