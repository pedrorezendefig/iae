# A1. Arquitetura de VOD, qualidade de vídeo, encaixe no stack, operação e veredito

Agente A (parte 1). Itens 1, 3, 6, 7 e 8 do PROMPT.md. Data da pesquisa: 13/10/2026.
Cotação usada: **USD 1 = R$ 5,03** (AwesomeAPI, 13/10/2026). Os custos aqui são resumidos e servem para ordem de grandeza; o benchmark detalhado é do agente A2.

## 0. Resumo em dez linhas

1. Para o IAE hoje (poucas dezenas de horas, dezenas a centenas de alunos), a arquitetura certa é **serviço gerenciado de vídeo** (Mux como primeira escolha, Bunny Stream como alternativa barata), com o nosso app (Next.js + FastAPI + Postgres no Coolify) guardando só metadados, progresso e permissões.
2. VPS servindo MP4 direto é o caminho mais barato no papel e o mais arriscado na prática: sem bitrate adaptativo, banda da VPS compartilhada com o app, download trivial, sem CDN.
3. FFmpeg próprio + object storage (R2) + CDN é viável e barato em escala, mas transfere para nós o que não dominamos (fila de transcodificação, ladder, empacotamento HLS, URLs assinadas, legendas). Faz sentido como fase 3, não como MVP.
4. **Qualidade:** ladder H.264 de 360p/540p/720p/1080p a 30 fps resolve aula com slides. Na referência oficial da Apple, 1080p H.264 fica entre 6.000 e 7.800 kbps; para conteúdo de baixa movimentação (professor + slide), a estimativa é de 3 a 4,5 Mbps no topo, o que dá cerca de **1,6 a 2,1 GB por hora** no degrau 1080p.
5. **4K não se justifica** para este caso: multiplica por 3 a 4,6 vezes o tráfego por hora assistida, encarece cada minuto no Mux (entrega 4K custa 3,2 vezes a de 1080p), não melhora a leitura de slide em celular e o Brasil é 79% Android. Pedro tem razão; a ideia dele de "degrau de qualidade com custo à mostra" é tecnicamente suportada (o Mux Player tem `max-auto-resolution` e o Mux cobra por faixa de resolução).
6. Codec: **H.264 obrigatório** (universal; a Apple pede variantes H.264 por compatibilidade). HEVC e AV1 só como segunda ladder quando o tráfego dominar o custo; hoje não compensam a complexidade.
7. Upload: direct upload do navegador para o provedor (URL assinada gerada pelo FastAPI), webhook do provedor de volta para o FastAPI marca o vídeo como pronto. O VPS nunca recebe o arquivo bruto.
8. Transcrição: Mux e Cloudflare Stream geram legenda automática em português **sem custo extra**; o texto (.txt/.vtt) alimenta busca e o agente de IA. Whisper/Deepgram/AssemblyAI ficam como plano B (US$ 0,15 a 0,36 por hora de áudio).
9. Operação: o vídeo fica fora da VPS, então a VPS cair não apaga nem interrompe vídeo já carregado no player; backup do Postgres via Coolify para S3, cópia dos masters em R2 ou B2 como seguro contra lock-in.
10. Evolução sem reescrever: uma camada fina `VideoProvider` no FastAPI (criar upload, obter playback, assinar token, receber webhook) e um campo `provider` + `provider_asset_id` por aula. Trocar Mux por Bunny ou por pipeline próprio vira migração de dados, não de código de tela.

## 1. Arquiteturas de VOD, do mais simples ao mais robusto

### 1.1 Tabela comparativa

| Arquitetura | Complexidade operacional | Risco principal | O que quebra em escala | Custo (resumo) | Quem usa esse padrão |
|---|---|---|---|---|---|
| (a) VPS único servindo MP4 | Baixíssima para começar, alta para manter | Banda e disco da VPS compartilhados com o app; sem ABR; download fácil | Concorrência: 50 alunos simultâneos a 4 Mbps = 200 Mbps saindo de uma VPS; aluno em 4G trava | Só a VPS e disco (já pagamos); o custo real é qualidade e risco | Projetos pequenos, MVPs, intranets |
| (b) Object storage + CDN + FFmpeg próprio (HLS/DASH) | Alta: fila de jobs, workers, ladder, empacotamento, assinatura de URL, legendas | Bugs de pipeline, tempo de engenharia, ninguém de plantão | Fila de transcodificação na VPS compete com o app; precisa worker separado | Armazenamento barato (R2 US$ 0,015/GB-mês, egress zero); CPU de transcodificação | Plataformas que já têm time de vídeo (OTTs, grandes LMS) |
| (c) Serviço gerenciado (Mux, Cloudflare Stream, Bunny Stream, api.video, Vimeo, AWS MediaConvert + CloudFront, Google Transcoder + Cloud CDN) | Baixa a média (APIs prontas, player pronto, webhooks) | Lock-in de formato e de preço; reajuste do fornecedor | Custo por minuto cresce linear com audiência; em volume grande negocia-se contrato | Por minuto armazenado e entregue (Mux, Cloudflare) ou por GB (Bunny) | Startups de educação e mídia; SaaS que embute vídeo |
| (d) Híbrido | Média | Duas fontes de verdade se mal desenhado | Bem desenhado, escala por partes | Gerenciado para entrega + storage próprio para masters | Quem quer sair do lock-in sem reescrever |

### 1.2 Detalhe por opção

**(a) VPS único com MP4 direto.** O Next.js ou o Nginx do Coolify serve `aula.mp4` com HTTP Range. Funciona no primeiro dia e o navegador toca nativamente. Problemas concretos para o IAE:
- Sem bitrate adaptativo: um único arquivo 1080p a 4 Mbps trava em rede ruim; um arquivo 720p fica feio em monitor grande. O requisito dos sócios ("maior qualidade com opção para rede ruim") não é atendido.
- A banda de saída é a mesma do app: num pico (ex.: aula liberada às 19h para uma turma), o vídeo concorre com o login, o checkout e o agente de IA. Isso viola a decisão "novas funcionalidades não podem prejudicar o processamento".
- Sem CDN, todo aluno puxa do datacenter da Hostinger; latência e throughput dependem da rota.
- Proteção: a URL do MP4 é baixável com um clique direito ou extensão de navegador.
- Disco: cada hora em 1080p ocupa cerca de 1,6 a 3,5 GB (ver seção 3); 300 h já pedem disco dedicado e backup próprio.
Veredito: aceitável só como protótipo para a primeira demonstração ao cliente, nunca em produção paga.

**(b) Object storage + CDN + FFmpeg próprio.** Fluxo: upload para bucket (R2/B2/S3) via URL pré-assinada, job numa fila (ex.: Redis + worker Python), FFmpeg gera ladder HLS (segmentos fMP4 de 6 s, IDR a cada 2 s, conforme a especificação da Apple), worker sobe segmentos para o bucket, CDN entrega, player hls.js toca. Legendas via Whisper no mesmo worker.
- Vantagem: custo marginal mínimo. R2 cobra US$ 0,015 por GB-mês e não cobra egress (fonte: página de preços do R2). Para 300 h com ladder completa (cerca de 3,5 GB por hora), são cerca de 1 TB, US$ 15,75/mês (R$ 79).
- Custo escondido: engenharia e operação. Transcodificar 1 hora de vídeo em 4 resoluções com x264 consome muitos minutos de CPU; fazer isso na mesma VPS do app derruba a performance do app durante o job. Precisa de worker separado (outra VPS ou GPU sob demanda).
- O que quebra: fila travada sem alerta, segmentos corrompidos, cache de CDN servindo playlist antiga, URL assinada mal configurada (vazamento), legendas fora de sincronia. Cada um vira incidente que nós, sem experiência em vídeo, depuramos de madrugada.
Veredito: boa opção de fase 3, quando o volume de tráfego tornar o custo por minuto dos gerenciados relevante e já houver receita para pagar a engenharia.

**(c) Serviços gerenciados.** Resumo do que importa para o IAE (preços completos com A2):

| Serviço | Modelo de cobrança | Encoding | Legenda automática pt | Player | Observação |
|---|---|---|---|---|---|
| Mux Video | Por minuto: armazenamento US$ 0,003/min-mês (1080p), entrega US$ 0,001/min (1080p); 100.000 min de entrega grátis por mês | Basic grátis; Plus US$ 0,03125/min (1080p) | Sim, grátis, português estável | Mux Player (web component e React) | Cobra por faixa de resolução; tem cold storage automático para vídeo não assistido |
| Cloudflare Stream | US$ 5 por 1.000 min armazenados (pré-pago) + US$ 1 por 1.000 min entregues | Grátis | Sim, grátis, `pt` na lista | Player próprio (iframe) ou HLS em qualquer player | Resolução máxima de saída não confirmada na documentação (ver Confiança) |
| Bunny Stream | Por GB: armazenamento a partir de US$ 0,01/GB-mês; CDN América do Sul US$ 0,045/GB (rede padrão) | Padrão grátis; premium US$ 0,05/min HD | Sim (transcrição paga; preço não confirmado na fonte oficial) | Player próprio grátis | DRM MediaCage Enterprise com taxa base de US$ 99/mês |
| api.video | Não verificado nesta pesquisa | | | | Ver A2 |
| Vimeo (OTT/Enterprise) | Contrato anual, pacote fechado | | | Player Vimeo | Produto voltado a canal OTT pronto; pouco controle de integração |
| AWS MediaConvert + S3 + CloudFront | Por minuto de saída transcodificada + GB armazenado + GB entregue | Pago por minuto | Via Amazon Transcribe (pago à parte) | Qualquer player HLS | Peças avulsas; complexidade próxima da opção (b) |
| Google Transcoder API + GCS + Cloud CDN | Idem AWS | Pago por minuto | Via Speech-to-Text (pago à parte) | Qualquer player HLS | Idem |

Notas: AWS e Google são "gerenciados" só na transcodificação; storage, CDN, assinatura de URL, legenda e player continuam sendo montagem nossa. Na prática são a opção (b) com a CPU terceirizada.

**(d) Híbrido.** Duas variantes úteis:
1. Entrega gerenciada (Mux ou Bunny) + cópia dos masters (arquivo original enviado pelo professor) num bucket nosso (R2 ou Backblaze B2). Custo pequeno (o master de 1 hora em 1080p tem alguns GB) e elimina o lock-in: se o fornecedor subir preço, reprocessamos os masters em outro lugar.
2. Pipeline próprio para o acervo antigo e pouco assistido (barato em R2) + gerenciado para lançamentos e conteúdo quente. Só vale com volume grande; não é para o MVP.

### 1.3 Ilustração rápida de onde está o custo (estimativa, só para orientar A2)

Cenário: 100 h de aula armazenadas, 200 alunos assistindo 10 h por mês cada (2.000 h assistidas por mês, 120.000 min), tudo a 1080p.

| Provedor | Armazenamento/mês | Entrega/mês | Total/mês | Em R$ |
|---|---|---|---|---|
| Mux (Basic) | 6.000 min x US$ 0,003 = US$ 18 | (120.000 - 100.000 grátis) x US$ 0,001 = US$ 20 | US$ 38 | R$ 191 |
| Cloudflare Stream | 6.000 min = US$ 30 | 120.000 min = US$ 120 | US$ 150 | R$ 755 |
| Bunny Stream (rede padrão, AmSul) | cerca de 350 GB x US$ 0,01 = US$ 3,50 | cerca de 3.260 GB x US$ 0,045 = US$ 147 | US$ 150 | R$ 757 |

Leitura: com audiência minimamente ativa, **a entrega (egress) domina, não o armazenamento**. Isso refuta a hipótese dos sócios para todos os cenários com mais de algumas dezenas de alunos ativos; armazenamento só domina com acervo grande e pouca audiência. A2 deve confirmar com a tabela completa (inclusive a rede "volume" do Bunny e as faixas de desconto do Mux).

## 3. Qualidade: resolução, bitrate e codec

### 3.1 Referências oficiais

**Apple HLS Authoring Specification** (item 1.25, ladder sugerida para 16:9; valores em kbps de vídeo):

| Resolução | H.264 | HEVC 30 fps |
|---|---|---|
| 640 x 360 | 365 | 145 |
| 960 x 540 | 2.000 | 1.600 |
| 1280 x 720 | 3.000 e 4.500 | 2.400 e 3.400 |
| 1920 x 1080 | 6.000 e 7.800 | 4.500 e 5.800 |
| 2560 x 1440 | (não listado) | 8.100 |
| 3840 x 2160 | (não listado) | 11.600 e 16.800 |

A Apple diz que são "metas iniciais para conteúdo típico" e recomenda avaliar contra o próprio conteúdo; também pede IDR a cada 2 s, segmentos de 6 s, perfil High no H.264 e "algum conteúdo em H.264 por compatibilidade" (itens 1.4, 1.12, 1.13, 7.6).

**YouTube, bitrate recomendado para upload SDR** (Mbps, 24/25/30 fps): 360p 1; 480p 2,5; 720p 5; 1080p 8; 1440p 16; 2160p 35 a 45. Atenção: é bitrate de **envio** (o YouTube recomprime), por isso é mais alto que o de entrega.

**Cloudflare Stream, bitrate recomendado para envio:** 1080p 8 Mbps; 720p 4,8; 480p 2,4; 360p 1.

**Mux:** os níveis Plus e Premium usam codificação por título ("per-title") que reduz bitrate em conteúdo simples e aumenta em conteúdo complexo; o Basic usa ladder reduzida. Aula com professor e slide é o caso clássico de conteúdo simples, onde o per-title economiza.

### 3.2 Peso por hora em cada degrau

Fórmula: MB por hora = kbps x 0,45. Áudio AAC estéreo a 128 kbps soma 58 MB por hora (a Apple recomenda 32 a 160 kbps para AAC estéreo).

| Degrau | Referência Apple H.264 (vídeo) | MB/h na referência Apple | Proposta para aula com slides, H.264 30 fps (vídeo + áudio 128 kbps) | MB/h na proposta | Referência YouTube (envio) MB/h |
|---|---|---|---|---|---|
| 360p | 365 kbps | 164 | 600 + 128 kbps | 328 | 450 |
| 540p | 2.000 kbps | 900 | 1.200 + 128 kbps | 598 | (480p) 1.125 |
| 720p | 3.000 a 4.500 kbps | 1.350 a 2.025 | 2.000 + 128 kbps | 958 | 2.250 |
| 1080p | 6.000 a 7.800 kbps | 2.700 a 3.510 | 3.500 + 128 kbps (até 4.500 se houver muito movimento) | 1.633 (até 2.083) | 3.600 |
| 1440p | HEVC 8.100 kbps | 3.645 | não recomendado | | 7.200 |
| 2160p (4K) | HEVC 11.600 a 16.800 kbps | 5.220 a 7.560 | não recomendado | | 15.750 a 20.250 |

Consequências práticas (proposta):
- **Armazenamento** de 1 hora com a ladder completa (360p + 540p + 720p + 1080p): cerca de 3,5 GB, mais o master original.
- **Tráfego** de 1 hora assistida: depende do degrau que o player escolhe. Em banda boa, o player sobe para 1080p: cerca de 1,6 GB por hora assistida. Em 4K seriam 5,2 a 7,6 GB por hora (HEVC, referência Apple), ou seja, 3,2 a 4,6 vezes mais.
- Os valores da coluna "proposta" são **estimativa nossa** para conteúdo de baixa movimentação (câmera fixa ou slide). Precisam ser validados com a aula real de 5 h que o IAE já tem: codificar 10 minutos com CRF 21 e preset `slow`, medir o bitrate médio e ajustar.

### 3.3 Codec: H.264 vs H.265 (HEVC) vs AV1

| Critério | H.264 | HEVC | AV1 |
|---|---|---|---|
| Suporte em navegador | Universal | Parcial: Chrome a partir da versão 107 e Firefox a partir da 137 marcados como parciais (dependem de decodificador do sistema); Safari completo; Samsung Internet completo | Chrome 70+, Firefox 67+, Edge 121+, Samsung Internet 12+; Safari só parcial (17+), com decodificação em hardware (exemplo da Apple: iPhone 15 Pro) |
| Economia de bitrate | Base | Cerca de 25% a 40% a menos na ladder da Apple (1080p 5.800 vs 7.800 kbps) | Geralmente maior que HEVC (sem fonte oficial nesta pesquisa; estimativa da literatura) |
| Custo de codificar | Baixo | Médio | Alto (lento em CPU) |
| Exigência na Apple | "Algum conteúdo SHOULD ser H.264" (item 1.12) | Aceito | Aceito desde 2025 em fMP4 (item 1.39) |

Brasil: em setembro de 2026, 78,78% dos celulares são Android e 21,21% iOS (StatCounter). A base Android é muito heterogênea em hardware; H.264 é o único codec com decodificação garantida em todos.

**Recomendação de codec:** só H.264 no MVP. Uma segunda ladder (AV1 ou HEVC) dobra a contagem de renditions armazenadas e só compensa quando o egress mensal passar a ser a maior linha da conta. Nos gerenciados, essa decisão é do fornecedor (ex.: Bunny cobra premium encoding por codec de saída, US$ 0,05/min por codec em HD).

### 3.4 Veredito sobre 4K (Rib quer, Pedro acha que não)

**4K não faz sentido para o IAE agora.** Evidências:
1. Conteúdo: aula de professor falando com slide. O detalhe que importa é texto do slide; slide em 1080p (1920 x 1080) tem resolução igual à de um projetor ou monitor Full HD comum. A própria Apple coloca o degrau padrão inicial em 2.000 kbps (540p), sinal de que a maioria das sessões nem chega no topo.
2. Custo: no Mux, entrega 2160p custa US$ 0,0032/min contra US$ 0,0010/min em 1080p (3,2 vezes); armazenamento US$ 0,0096 contra US$ 0,003/min (3,2 vezes); encoding Plus US$ 0,10 contra US$ 0,03125/min. Por GB (Bunny, R2 + CDN), o tráfego por hora assistida sobe 3,2 a 4,6 vezes.
3. Público: 79% Android, muito acesso por celular e notebook; tela de celular não mostra diferença entre 1080p e 4K a distância normal. Aula de 3 horas em 4K também pesa no plano de dados do aluno.
4. Captura: 4K na entrega só faz sentido se a gravação for 4K com boa luz e lente; aula presencial gravada ou chamada de vídeo raramente entrega isso. Lives via Zoom/Meet saem em 720p ou 1080p no máximo, e o Mux limita live a 1080p.
5. Possível exceção: **1440p para tela compartilhada** com planilha ou documento de letra miúda (ex.: aula de orçamento do jurídico mostrando Excel). Mesmo aí a solução melhor é o professor dar zoom na tela.

Proposta para conciliar os sócios (ideia do Pedro, viável tecnicamente): **gravar e guardar o master na maior resolução que a câmera der** (custo pequeno, só armazenamento), **entregar até 1080p**, e deixar 1440p/4K como degrau habilitável depois. No Mux isso é literal: `max_resolution_tier` no upload (1080p, 1440p ou 2160p) e `max-auto-resolution` no Mux Player para limitar o que é entregue por faixa de preço. A calculadora da proposta pode mostrar o custo de cada degrau.

## 6. Encaixe com o stack (Next.js + FastAPI + Postgres + Coolify na VPS Hostinger)

### 6.1 Princípio

A VPS não toca no arquivo de vídeo. Ela gera credenciais, guarda metadados, registra progresso e autoriza reprodução. Bytes de vídeo vão do navegador do professor direto ao provedor e do CDN do provedor direto ao aluno.

### 6.2 Fluxo de upload (direct upload + webhook)

1. Admin (IAE) clica "Enviar aula" no Next.js.
2. Next.js chama `POST /videos/uploads` no FastAPI; FastAPI cria a aula no Postgres (status `uploading`) e pede ao provedor uma URL de upload:
   - Mux: `POST /video/v1/uploads` com `new_asset_settings` (`playback_policies: ["signed"]`, `video_quality: "basic"`, `max_resolution_tier: "1080p"`, `inputs[].generated_subtitles` com `language_code: "pt"`) e `cors_origin` do nosso domínio. Retorna `upload.url` e `upload.id`.
   - Cloudflare Stream: `POST /accounts/{id}/stream/direct_upload` com `maxDurationSeconds`, `requireSignedURLs: true`, `allowedOrigins`, `creator`. Retorna `uploadURL` e `uid`. Atenção: upload pendente reserva `maxDurationSeconds` na cota de armazenamento até concluir ou expirar.
   - Bunny Stream: cria o vídeo (`POST /library/{id}/videos`) e assina o upload TUS com SHA-256 de `libraryId + apiKey + expiration + videoId`. O navegador usa `tus-js-client` (upload retomável, bom para arquivo de 5 GB em conexão instável).
3. Navegador envia o arquivo direto ao provedor (Mux Uploader, TUS ou PUT), com barra de progresso.
4. Provedor chama o webhook no FastAPI:
   - Mux: `video.asset.ready` (aula tocável) e `video.asset.track.ready` com `text_source: "generated_vod"` (legenda pronta).
   - Cloudflare: webhook de vídeo pronto (`readyToStream`); depois `POST .../captions/pt/generate`.
   - Bunny: POST com `VideoGuid` e `Status` (3 = terminado, 4 = uma resolução pronta e já tocável, 5 = falhou, 9 = legendas geradas).
5. FastAPI valida a assinatura do webhook, grava `provider_asset_id`, `playback_id`, duração, status `ready` e dispara a ingestão da transcrição para busca/IA.

Modelo de dados mínimo (tabela `lesson_video`): `id`, `lesson_id`, `provider` (mux/bunny/cloudflare/self), `provider_asset_id`, `playback_id`, `status`, `duration_s`, `max_resolution`, `master_url` (cópia própria opcional), `transcript_text`, `created_at`. É esse campo `provider` que permite trocar de fornecedor depois sem reescrever telas.

### 6.3 Reprodução protegida

- FastAPI verifica se o aluno tem direito à aula (assinatura ativa ou compra vitalícia) e emite um token curto: JWT assinado de playback no Mux (passado ao player via `tokens.playback`), URL assinada no Cloudflare Stream, token + `expires` no Bunny (token authentication).
- Next.js renderiza o player com esse token. Expiração curta (ex.: 2 a 6 horas) e renovação silenciosa.
- Detalhes de DRM e marca d'água ficam com o agente de proteção de conteúdo (item 5).

### 6.4 Player

| Opção | Prós | Contras | Quando usar |
|---|---|---|---|
| Mux Player (`@mux/mux-player-react`) | Pronto: ABR, seletor de qualidade, legendas automáticas aparecem sozinhas, prévia na timeline, Chromecast, `start-time`, `max-resolution`, `max-auto-resolution`, tokens assinados, métricas Mux Data automáticas | Acoplado ao Mux | Se o provedor for Mux (recomendado) |
| hls.js + `<video>` próprio (ou Media Chrome para os controles) | Funciona com qualquer HLS (Bunny, Cloudflare, pipeline próprio); controle total de UI | Nós fazemos controles, legendas, velocidade, acessibilidade | Se quisermos independência do provedor desde o início |
| Video.js | Maduro, plugins (marca d'água, capítulos), HLS embutido | Visual datado, bundle maior | Se precisar de plugin específico |
| Plyr | Visual limpo, leve | Precisa de hls.js por baixo; manutenção mais lenta | Interface simples sobre hls.js |
| Player do provedor (iframe Bunny/Cloudflare) | Zero código | Pouco controle de eventos para progresso, UX fora da marca | Protótipo |

Recomendação: **Mux Player** no MVP. Se o provedor for Bunny ou Cloudflare, usar hls.js com Media Chrome para manter a mesma UI. Em ambos os casos, encapsular num componente `<AulaPlayer>` nosso, para trocar o miolo sem mexer nas páginas.

Funcionalidades exigidas, como ficam:
- **Retomar de onde parou:** o player emite `timeupdate`; o Next.js envia a posição ao FastAPI a cada 10 a 15 s e no `pause`/`visibilitychange` (tabela `lesson_progress`: aluno, aula, posição, percentual, concluído). Na abertura, passar `start-time` ao player.
- **Velocidade:** `playbackRate` nativo do elemento de vídeo (0,75x a 2x); o Mux Player traz o menu pronto. Útil para aula longa.
- **Legendas:** VTT gerado pelo provedor, editável (baixar VTT, corrigir termos jurídicos, reenviar).
- **Capítulos:** cue points / WebVTT de capítulos gerados a partir da transcrição (fase 2).

### 6.5 Transcrição automática para busca e para o agente de IA

| Opção | Preço | Português | Observação |
|---|---|---|---|
| Mux legendas automáticas (VOD) | Grátis, incluído no encoding e armazenamento | Estável | Texto em `stream.mux.com/{PLAYBACK_ID}/text/{TRACK_ID}.txt` e `.vtt`; webhook `video.asset.track.ready` |
| Cloudflare Stream captions | Grátis para vídeo armazenado no Stream | `pt` suportado | Endpoint `captions/{lang}/generate` |
| Bunny Stream transcribing | Pago; valor não confirmado na fonte oficial (fonte secundária cita US$ 0,10/min por idioma) | Lista de idiomas via API | Também gera título e descrição automáticos |
| OpenAI (Whisper / gpt-transcribe / gpt-4o-mini-transcribe) | US$ 0,006 / 0,0045 / 0,003 por minuto (US$ 0,36 / 0,27 / 0,18 por hora) | Sim | Bom para pipeline próprio |
| Deepgram Nova-3 | US$ 0,0043/min monolíngue (US$ 0,26/h) | Sim (não verificado nesta pesquisa) | US$ 200 de crédito inicial |
| AssemblyAI Universal-2 / Universal-3.5 Pro | US$ 0,15/h e US$ 0,21/h | Não confirmado na página de preços | US$ 50 de crédito inicial |
| Whisper auto-hospedado | Só CPU/GPU | Sim | Não rodar na VPS do app |

Uso: a transcrição vai para o Postgres (texto + timestamps), com índice full-text em português e, para o agente de IA, embeddings em pgvector por trecho de 30 a 60 s com link `?t=segundos` para a aula. Custo de transcrever as 24 h de um curso por API externa: menos de US$ 9 no pior caso da tabela.

### 6.6 Coolify e VPS

- Nada de vídeo no volume do Coolify. A VPS hospeda Next.js, FastAPI, Postgres (ou Supabase) e um worker leve para webhooks e ingestão de transcrição.
- Se um dia houver pipeline próprio (opção b), o worker de FFmpeg roda em **outro servidor** gerenciado pelo mesmo Coolify (o Coolify gerencia múltiplos servidores), nunca na VPS do app.

## 7. Operação

### 7.1 Backup e retenção

| O que | Onde mora | Backup | Retenção sugerida |
|---|---|---|---|
| Postgres (alunos, matrículas, progresso, metadados de aula) | VPS (Coolify) ou Supabase | Backup agendado do Coolify (cron), com upload para S3 compatível (R2 ou B2); retenção local e S3 configuradas separadamente | Diário com 30 dias; semanal com 6 meses |
| Masters dos vídeos (arquivo original) | Bucket próprio (R2 ou B2), além do provedor | Versionamento ou bloqueio de exclusão no bucket | Indefinida (é o patrimônio do cliente) |
| Renditions (HLS) | Provedor | Não precisa: são regeneráveis a partir do master | Enquanto a aula estiver publicada; Mux move sozinho para "infrequent" (30 dias sem ver) e "cold" (90 dias) com desconto |
| Legendas/transcrições | Postgres + provedor | Vão junto no backup do Postgres | Indefinida |

O Coolify avisa na documentação que "um backup bem-sucedido só prova que um arquivo foi criado": testar restauração num banco descartável uma vez por mês.

### 7.2 Monitoramento

- Disponibilidade: monitor externo (ex.: Uptime Kuma em outra máquina, ou serviço SaaS) no Next.js, no FastAPI e no endpoint de webhook.
- Qualidade de reprodução: Mux Data vem automático com o Mux Player (tempo de início, rebuffering, falhas por navegador). Com Bunny/Cloudflare, usar as estatísticas do painel do provedor.
- Pipeline: alerta se uma aula ficar mais de 1 hora em `uploading` ou `processing`, ou se chegar webhook de falha (Bunny status 5, `video.asset.errored` no Mux).
- Custo: alerta de consumo mensal no painel do provedor (Mux e Cloudflare têm uso por minuto; Bunny por GB) para não surpreender o cliente.

### 7.3 E se a VPS cair durante uma live?

Depende de onde a live roda. A recomendação é que **a live não passe pela VPS**: transmissão por serviço externo (Zoom/Meet ou Mux Live/Cloudflare Live, decisão do agente de lives), com a plataforma só autenticando e embutindo.
- VPS cai, live no Zoom/Meet: quem já está na chamada continua; quem tenta entrar pela plataforma não consegue. Mitigação: link direto de contingência enviado antes da aula por e-mail/WhatsApp.
- VPS cai, live no Mux/Cloudflare: quem já está com o player carregado continua assistindo (o vídeo vem do CDN do provedor); novos acessos falham porque o token assinado é emitido pelo FastAPI. Mitigação: token de live com validade da duração da aula, emitido com antecedência; página estática de contingência fora da VPS.
- A gravação continua do lado do provedor e entra no acervo pelo webhook quando a VPS voltar (webhooks são reenviados pelo provedor em caso de falha; confirmar a política de reenvio de cada um).

### 7.4 Plano de rollback

- **App:** Coolify mantém imagens anteriores; rollback de deploy é reimplantar a versão anterior. Migrações de banco sempre aditivas (nova coluna antes de remover a antiga) para permitir voltar o código sem voltar o banco.
- **Vídeo:** como o provedor guarda o asset e nós guardamos o master, apagar ou corromper uma aula é recuperável: reenvia o master. Trocar de provedor é feito aula por aula, com o campo `provider` permitindo convivência dos dois durante a migração.
- **Provedor fora do ar:** baixa probabilidade, mas o componente `<AulaPlayer>` + campo `provider` permitem apontar aulas críticas para um segundo provedor reprocessando os masters.

## 8. Veredito

### 8.1 Arquitetura inicial recomendada

**Serviço gerenciado (Mux) + app próprio na VPS + masters em bucket próprio.** Em uma frase: o IAE sobe o vídeo direto para o Mux, o Mux transcodifica, gera legenda em português, entrega por CDN com token assinado, e nosso FastAPI controla quem pode assistir e onde cada aluno parou.

Por que Mux primeiro: encoding Basic grátis, 100.000 minutos de entrega grátis por mês (cerca de 1.667 horas assistidas, cobre a fase inicial do IAE), legendas automáticas grátis em português estável, player pronto com retomar/velocidade/legenda, cobrança por resolução que encaixa na calculadora de degraus, e menor custo por hora assistida em 1080p entre os três avaliados. Mux também publicou em 13/10/2026 uma biblioteca de prompts para agentes de código montarem features de vídeo (paywall, por exemplo), o que casa com nosso jeito de trabalhar (único sinal relevante encontrado na varredura de comunidade dos últimos 30 dias).

Alternativa se o preço por minuto do Mux pesar ou o cliente preferir cobrança por GB: **Bunny Stream** (mesmo fluxo de upload TUS + webhook, player próprio ou hls.js).

Por que não as outras como base: VPS com MP4 não atende rede ruim nem isola o app; FFmpeg próprio coloca o risco técnico exatamente onde não temos experiência; AWS/Google exigem montar storage, CDN, assinatura e legendas à parte; Vimeo OTT entrega um canal pronto, mas com pouco controle de integração com nossa área de membros.

### 8.2 Caminho de evolução (o que troca depois sem reescrever)

| Fase | O que entra | O que não muda |
|---|---|---|
| MVP (até dez/2026) | Mux Basic, 1080p máximo, H.264, legendas pt automáticas, Mux Player, direct upload, webhook, progresso no Postgres, masters copiados para R2 | Interface `VideoProvider` no FastAPI, tabela `lesson_video` com campo `provider`, componente `<AulaPlayer>` |
| Fase 2 | Busca na transcrição, capítulos, agente de IA lendo transcrições, Mux Plus ou degrau 1440p se o cliente pagar, lives com gravação automática via webhook | Mesmas interfaces |
| Fase 3 (se o egress virar a maior linha da conta) | Acervo pouco assistido migrado para pipeline próprio (R2 + FFmpeg em worker separado + CDN) ou contrato de volume com o provedor; segunda ladder AV1 | Telas e regras de acesso não mudam; só o adaptador e os dados |

### 8.3 Três cenários (qualitativos; números finais com A2)

| Cenário | Arquitetura | Qualidade | Proteção | Para quem |
|---|---|---|---|---|
| Enxuto | Bunny Stream (ou Mux Basic) só, sem cópia de masters, player do provedor ou hls.js | Até 720p ou 1080p, ladder reduzida | Token assinado com expiração | Validar o produto online com as primeiras turmas e poucos alunos |
| Recomendado | Mux Basic + masters em R2 + Mux Player + Postgres com progresso e transcrição | Ladder até 1080p, H.264; degrau 1440p disponível como opcional pago | Token assinado curto, domínio restrito; marca d'água conforme item 5 | IAE no primeiro ano, com assinatura e cursos avulsos convivendo |
| Premium | Mux Plus (per-title) ou Premium + masters em R2 + Mux Data + DRM | Até 1440p (4K só para conteúdo específico gravado em 4K) | DRM + marca d'água dinâmica | Quando houver pós-graduação, B2B com muitos assentos ou risco real de pirataria |

## Confiança

**Fato verificado (fonte oficial, acessada em 13/10/2026):**
- Ladder da Apple (H.264 e HEVC), IDR a cada 2 s, segmentos de 6 s, H.264 por compatibilidade, AV1 aceito em fMP4.
- Bitrates recomendados de upload do YouTube e de envio do Cloudflare Stream.
- Preços do Mux por resolução (encoding, armazenamento, entrega, cold storage, 100.000 min grátis, live até 1080p) e legendas automáticas grátis com português estável.
- Preços do Cloudflare Stream (US$ 5/1.000 min armazenados, US$ 1/1.000 min entregues, encoding grátis) e legendas geradas com `pt` suportado, grátis.
- Bunny: encoding padrão grátis, premium por codec (US$ 0,025/0,05/0,15 por min), CDN rede padrão por região (América do Sul US$ 0,045/GB), replicação de storage, DRM MediaCage Enterprise com base de US$ 99/mês, webhooks e upload TUS.
- R2: US$ 0,015/GB-mês, egress grátis.
- Suporte de HEVC e AV1 por navegador (caniuse); Safari 17 com AV1 só com decodificação em hardware (WebKit).
- Market share mobile no Brasil (StatCounter, setembro/2026).
- Preços de transcrição OpenAI, Deepgram, AssemblyAI.
- Backups do Coolify (agendamento, S3, retenção, restauração).
- Atributos do Mux Player (`start-time`, `max-resolution`, `max-auto-resolution`, `tokens`).

**Estimativa (nossa):**
- Bitrates da coluna "proposta para aula" (600/1.200/2.000/3.500 kbps). Precisam de teste com a aula real.
- Economia de bitrate do AV1 sobre HEVC.
- Tabela ilustrativa de custo da seção 1.3 (premissa: 10 h assistidas por aluno por mês, tudo em 1080p).
- Afirmação de que o Mux é o mais barato por hora assistida em 1080p vale para os três provedores comparados e para a premissa acima; A2 confirma.

**Sem resposta:**
- Resolução máxima de saída do Cloudflare Stream (a documentação não diz; fonte de terceiros fala em limite de 1080p).
- Preço oficial da transcrição do Bunny e preço da rede "volume" do Bunny para América do Sul (página de preços oficial retornou erro 502).
- Preços de api.video e Vimeo OTT/Enterprise (não pesquisados por limite de buscas; ficam com A2).
- Política exata de reenvio de webhooks de cada provedor.
- Quem no mercado brasileiro de educação usa cada provedor (não verificado).
- Varredura de comunidade (last30days, 13/10/2026) não trouxe sinal útil sobre os três provedores além do anúncio da biblioteca de prompts do Mux; a busca no Reddit voltou parcial (limite de requisições).

## Fontes

Todas acessadas em 13/10/2026.
- Apple, HLS Authoring Specification for Apple devices: https://developer.apple.com/documentation/http-live-streaming/hls-authoring-specification-for-apple-devices
- Apple, HLS Authoring Specification, apêndices: https://developer.apple.com/documentation/http-live-streaming/hls-authoring-specification-for-apple-devices-appendixes
- YouTube, configurações de codificação recomendadas para upload: https://support.google.com/youtube/answer/1722171
- Mux, preços (página geral): https://www.mux.com/pricing
- Mux, preços detalhados de vídeo: https://www.mux.com/docs/pricing/video
- Mux, níveis de qualidade (Basic, Plus, Premium): https://www.mux.com/docs/guides/use-video-quality-levels
- Mux, legendas automáticas e transcrição: https://www.mux.com/docs/guides/add-autogenerated-captions-and-use-transcripts
- Mux, vídeo em 4K (max_resolution_tier): https://www.mux.com/docs/guides/stream-videos-in-4k
- Mux, changelog de idiomas das legendas automáticas: https://www.mux.com/docs/changelog/additional-languages-for-vod-auto-generated-captions
- Mux Player, referência de atributos: https://github.com/muxinc/elements/blob/main/packages/mux-player/REFERENCE.md
- Mux Player React: https://github.com/muxinc/elements/blob/main/packages/mux-player-react/README.md
- Mux no X, biblioteca de prompts (13/10/2026): https://x.com/MuxHQ/status/2110108922631913794
- Cloudflare Stream, preços: https://developers.cloudflare.com/stream/pricing/
- Cloudflare Stream, FAQ: https://developers.cloudflare.com/stream/faq/
- Cloudflare Stream, legendas: https://developers.cloudflare.com/stream/edit-videos/adding-captions/
- Cloudflare Stream, direct creator upload: https://developers.cloudflare.com/stream/manage-video-library/creator-id/
- Cloudflare R2, preços: https://developers.cloudflare.com/r2/pricing/
- Bunny Stream, página de preços: https://bunny.net/pricing/stream/
- Bunny Stream, documentação de preços (via Context7): https://bunny.net/docs/stream/pricing
- Bunny Stream, premium encoding: https://bunny.net/docs/stream/premium-encoding
- Bunny Stream, webhooks: https://bunny.net/docs/stream/webhooks
- Bunny Stream, upload TUS: https://bunny.net/docs/stream/tus-resumable-uploads
- Bunny Stream, token authentication: https://bunny.net/docs/stream/token-authentication
- Swarmify, review do Bunny Stream (fonte secundária para transcrição e DRM): https://swarmify.com/blog/bunny-stream-review/
- caniuse, HEVC: https://caniuse.com/hevc
- caniuse, AV1: https://caniuse.com/av1
- WebKit, recursos do Safari 17.0 (AV1): https://webkit.org/blog/14445/webkit-features-in-safari-17-0/
- StatCounter, SO mobile no Brasil: https://gs.statcounter.com/os-market-share/mobile/brazil
- OpenAI, preços da API (transcrição): https://developers.openai.com/api/docs/pricing
- Deepgram, preços: https://deepgram.com/pricing
- AssemblyAI, preços: https://www.assemblyai.com/pricing
- Coolify, backups de banco: https://coolify.io/docs/databases/backups
- Cotação: AwesomeAPI, USD-BRL em 13/10/2026 (R$ 5,03), conforme instrução do orquestrador
