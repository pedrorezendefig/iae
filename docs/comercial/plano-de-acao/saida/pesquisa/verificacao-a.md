# Verificação cética do arquivo `a-infraestrutura.md` (Agente A)

- **Data da verificação:** 13/10/2026.
- **Método:** cada preço e afirmação técnica foi conferido na página oficial (WebFetch), no JSON oficial de preços da AWS (curl) ou no HTML bruto das páginas do Google Cloud e da Apple (curl + extração de texto), porque o WebFetch devolveu essas páginas truncadas. Recalculei 40 células das tabelas com as premissas declaradas no próprio arquivo.
- **O arquivo original não foi editado.**
- **Veredito geral:** os preços unitários estão quase todos certos, e as contas das tabelas de VOD batem. Os problemas estão em seis pontos: (1) o crédito de US$ 20/mês do Mux pay-as-you-go **não é ambíguo**, a documentação oficial o confirma; (2) o DRM do Mux **protege live**, ao contrário do que o arquivo diz; (3) o CloudFront Premium acima de 50 TB **tem preço publicado**; (4) há um erro de conta na linha Daily do cenário crescimento; (5) o Cloudflare Stream no S0 usa um bloco a menos do que deveria; (6) a economia de bitrate do HEVC está exagerada no teto da faixa.

## 1. Tabela de verificação

Legenda do veredito: **confirmado** (a fonte oficial diz o mesmo), **corrigir** (a fonte diz outra coisa ou a conta não fecha), **não verificável** (a fonte oficial não traz o dado ou a página não carregou).

### 1.1 Armazenamento e CDN

| Afirmação | O que o arquivo diz | O que a fonte diz | Veredito | URL |
|---|---|---|---|---|
| R2 Standard, armazenamento | US$ 0,015/GB-mês | US$ 0,015/GB-mês | confirmado | https://developers.cloudflare.com/r2/pricing/ |
| R2 Infrequent Access | US$ 0,01/GB-mês + US$ 0,01/GB de leitura | US$ 0,01/GB-mês; a taxa de recuperação por GB não apareceu na extração. A página mostra classe A IA US$ 9,00/M e classe B IA US$ 0,90/M, que o arquivo omite | confirmado (armazenamento); não verificável (taxa de leitura) | https://developers.cloudflare.com/r2/pricing/ |
| R2, egress, operações e franquia | Egress grátis; classe A US$ 4,50/M, classe B US$ 0,36/M; grátis 10 GB-mês, 1 M classe A, 10 M classe B | Idêntico | confirmado | https://developers.cloudflare.com/r2/pricing/ |
| Cloudflare Workers Paid | US$ 5/mês, 10 M req, US$ 0,30/M adicional | US$ 5/mês mínimo, 10 M req, US$ 0,30/M; também 30 M ms de CPU inclusos, depois US$ 0,02/M ms | confirmado | https://developers.cloudflare.com/workers/platform/pricing/ |
| Cloudflare Stream, preço | US$ 5 por 1.000 min armazenados (pré-pago), US$ 1 por 1.000 min entregues, encoding grátis, sem franquia | Idêntico; "ingress and encoding are always free" | confirmado | https://developers.cloudflare.com/stream/pricing/ |
| Cloudflare Stream, resolução máxima | ABR de 360p a 1080p, H.264, sem 4K | "supporting resolutions from 360p to 1080p", H.264 | confirmado | https://developers.cloudflare.com/stream/ |
| Cloudflare Stream, upload | Até 30 GB | "a video upload can be at most 30 GB" (padrão) | confirmado | https://developers.cloudflare.com/stream/faq/ |
| Cloudflare Stream, bitrate de envio | 1080p 8 Mbps; 720p 4,8; 480p 2,4; 360p 1 | Idêntico | confirmado | https://developers.cloudflare.com/stream/faq/ |
| Cloudflare Stream, legenda automática em pt | Grátis, `pt` na lista | `pt` está entre os 12 idiomas. A gratuidade vem do anúncio do blog (2024), não da página de preços atual | confirmado (idioma); não verificável na página de preços (gratuidade) | https://developers.cloudflare.com/stream/edit-videos/adding-captions/ ; https://blog.cloudflare.com/stream-automatic-captions-with-ai/ |
| Cloudflare Stream, tokens | Padrão 1 h, máximo 24 h com signing key, até 5 regras de acesso, `downloadable`, página não cita DRM | Idêntico | confirmado | https://developers.cloudflare.com/stream/viewing-videos/securing-your-stream/ |
| Bunny CDN, rede Standard | 119 PoPs; EU/NA US$ 0,01; América do Sul US$ 0,045; Ásia 0,03; África/Oriente Médio 0,06; mínimo US$ 1 | Idêntico | confirmado | https://bunny.net/pricing/ |
| Bunny CDN, rede Volume | US$ 0,005/GB até 500 TB, 10 PoPs; cobertura na América do Sul não confirmada | US$ 0,005 até 500 TB, 0,004 até 1 PB, 0,002 até 2 PB; "single global rate"; a página não diz onde estão os 10 PoPs | confirmado (preço); não verificável (PoP na América do Sul) | https://bunny.net/pricing/ |
| Bunny Storage | HDD 1 região US$ 0,01; 2 regiões 0,02; 3 regiões 0,025; SSD 0,02 por região; tráfego para a CDN grátis | Idêntico; cada região extra de HDD acima de 3 soma US$ 0,005 | confirmado | https://bunny.net/pricing/storage/ |
| Bunny Stream, armazenamento e replicação | US$ 0,01/GB (Frankfurt); +0,01 (2ª região); +0,005 (3ª em diante) | Idêntico | confirmado | https://bunny.net/docs/stream/pricing.md |
| Bunny Stream, Premium Encoding | 2160p/1440p US$ 0,150; 1080p/720p 0,050; 480p a 240p 0,025 por min | Idêntico | confirmado | https://bunny.net/docs/stream/pricing.md |
| Bunny Stream, transcrição | US$ 0,10/min por idioma | "$0.10 per minute to transcribe with AI" por idioma | confirmado | https://bunny.net/docs/stream/pricing.md |
| Bunny MediaCage Enterprise DRM | US$ 99/mês + US$ 0,005 por licença | US$ 99/mês por biblioteca de vídeo + US$ 0,005 (0 a 20.000), 0,004 (20.001 a 100.000), 0,003 (100.001 a 500.000). Licença contada por dispositivo de reprodução (vídeo e áudio podem gerar licenças separadas) | confirmado, com ressalva: faltam as faixas e a regra "por biblioteca" | https://bunny.net/docs/stream/pricing.md |
| Bunny Stream e live | A página de produto não menciona live | Não menciona | confirmado | https://bunny.net/pricing/stream/ |
| Backblaze B2 | US$ 6,95/TB-mês; egress grátis até 3x o armazenado, depois US$ 0,01/GB; 10 GB grátis; parceiros CDN grátis | Idêntico; parceiros: Fastly, Cloudflare, bunny.net, CacheFly e outros | confirmado | https://www.backblaze.com/cloud-storage/pricing |
| Wasabi | US$ 7,99/TB-mês; mínimo de 1 TB; retenção de 90 dias; egress grátis só se for menor ou igual ao armazenado | Idêntico; acima disso a Wasabi pode "limit or suspend your service" | confirmado | https://wasabi.com/pricing ; https://wasabi.com/pricing/faq |
| DigitalOcean Spaces | US$ 5/mês com 250 GiB + 1 TiB de saída; excedente US$ 0,02/GiB armazenado, US$ 0,01/GiB entregue; cold 0,007; CDN embutida | Idêntico | confirmado | https://www.digitalocean.com/pricing/spaces-object-storage |
| AWS S3 Standard | US$ 0,023/GB-mês (N. Virginia, primeiros 50 TB); US$ 0,0405 em São Paulo | JSON oficial: N. Virginia 0,023; São Paulo 0,0405 | confirmado | https://b0.p.awsstatic.com/pricing/2.0/meteredUnitMaps/s3/USD/current/s3.json |
| AWS S3, transferência | 100 GB/mês grátis (agregado); S3 para CloudFront grátis | Idêntico | confirmado | https://aws.amazon.com/s3/pricing/ |
| CloudFront pay-as-you-go, América do Sul | US$ 0,110 (até 10 TB), 0,105 (próx. 40 TB), 0,090 (próx. 100 TB); HTTPS US$ 0,022/10 mil; 1 TB e 10 M req grátis | Idêntico (1 TB grátis, depois 0,110 / 0,105 / 0,090 / 0,080 / 0,060 / 0,050 / 0,040) | confirmado | https://aws.amazon.com/cloudfront/pricing/pay-as-you-go/ |
| CloudFront planos fixos, franquias | Free US$ 0 (100 GB, 1 M req, 5 GB S3); Pro US$ 15 (50 TB, 10 M, 50 GB); Business US$ 200 (50 TB, 125 M, 1 TB); Premium US$ 1.000 (50 TB, 500 M, 5 TB) | Idêntico; "No overage charges" | confirmado | https://aws.amazon.com/cloudfront/pricing/ |
| CloudFront plano fixo, regras de excedente | Primeiro pico até 3x tolerado; uso sustentado pode "ajustar a entrega"; exige WAF; URLs assinadas suportadas | Idêntico: pico até 3x no mês sem efeito; avaliação em 2 a 3 meses; Web ACL do WAF obrigatória; Signed URLs em todos os planos | confirmado | https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/flat-rate-pricing-plan.html |
| CloudFront Premium acima de 50 TB | "Configurável até 600 TB por novo preço"; "preço não publicado" (Tabela 4 4K 5.000 alunos, A2.7.3, pendências) | Preço **publicado**: 75 TB US$ 1.450; 125 TB US$ 2.250; 200 TB US$ 3.500; 350 TB US$ 6.000; 600 TB US$ 10.000 | **corrigir**: 5.000 alunos em 4K (90 TB) = Premium 125 TB, **US$ 2.250/mês** | https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/flat-rate-pricing-plan.html |
| AWS MediaConvert | Basic US$ 0,0075 (primeiros 100 mil), 0,0053, 0,0038; Professional 0,012 / 0,0096 / 0,0072 / 0,0036; AVC SD 1x, HD 2x, 4K 4x; HEVC SD 2x, HD 4x, 4K 8x; AV1 3,5x / 7x / 14x | Idêntico (HEVC single-pass; HEVC multi-pass é 3,5x / 7x / 14x; AV1 só no Professional) | confirmado | https://aws.amazon.com/mediaconvert/pricing/ |
| GCS Standard Iowa | US$ 0,000027397/GiB-hora = US$ 0,020/GiB-mês | US$ 0,000027397/GiB-hora | confirmado | https://cloud.google.com/storage/pricing |
| GCS, egress e Always Free | US$ 0,12/GiB (0 a 10 TiB); 5 GB-mês; 100 GB de egress da América do Norte | Idêntico | confirmado | https://cloud.google.com/storage/pricing |
| GCS, cálculo da Tabela 2 | 300 h 1080p = US$ 22,41 | O preço é por **GiB**: 1.120,5 GB = 1.043,6 GiB x 0,02 = US$ 20,87. O arquivo multiplicou GB pelo preço por GiB (superestima cerca de 7%) | corrigir (pequeno, lado conservador) | https://cloud.google.com/storage/pricing |
| Google Cloud CDN, América do Sul | US$ 0,09 (0 a 10 TiB), 0,06, 0,05; NA/Europa 0,08; cache fill 0,01 a 0,04; lookup US$ 0,0075/10 mil | Idêntico (acima de 1 PiB: 0,04) | confirmado | https://cloud.google.com/cdn/pricing |
| Google Transcoder | SD US$ 0,015; HD 0,03; UHD 0,06; áudio 0,005; ladder 4K = US$ 0,135/min bate com o exemplo oficial | Idêntico; exemplo oficial: 2 min x US$ 0,135 = US$ 0,27 | confirmado | https://cloud.google.com/transcoder/pricing |
| Hostinger VPS (USD) | KVM 2/4/8: promo US$ 8,99 / 12,99 / 25,99; renovação 14,99 / 28,99 / 49,99; disco 100/200/400 GB; banda 8/16/32 TB; 1 Gbps | Idêntico ("Renews at ... for 2 years") | confirmado | https://www.hostinger.com/vps-hosting |
| Hostinger VPS (BRL) | Promo R$ 43,99 / 59,99 / 119,99; renovação R$ 77,99 / 149,99 / 259,99 | Idêntico | confirmado | https://www.hostinger.com/br/servidor-vps |
| Hostinger object storage | Não oferecido (URLs retornam 404) | /object-storage, /cloud-storage, /storage e /s3-storage retornam 404; a home não cita "object storage"; busca não encontrou lançamento | confirmado (por ausência; não confirmado com o suporte) | https://www.hostinger.com/object-storage |
| Política da Cloudflare para vídeo na CDN gratuita | Fora do Enterprise, vídeo deve usar Developer Platform, Images ou Stream | Não reaberto nesta verificação | não verificável (não reaberto) | https://www.cloudflare.com/service-specific-terms-application-services/ |

### 1.2 Mux (VOD, live, DRM)

| Afirmação | O que o arquivo diz | O que a fonte diz | Veredito | URL |
|---|---|---|---|---|
| Mux, armazenamento | 720p US$ 0,0024; 1080p 0,0030; 1440p 0,0048; 4K 0,0096 por min-mês; faixas acima de 50 mil min | Idêntico (próximos 100 mil: 0,0029 em 1080p) | confirmado | https://www.mux.com/docs/pricing/video |
| Mux, entrega | 100.000 min/mês grátis; 720p 0,0008; 1080p 0,0010; 1440p 0,0016; 4K 0,0032 | Idêntico; a franquia vale "regardless of quality or resolution" | confirmado | https://www.mux.com/docs/pricing/video |
| Mux, encoding | Basic grátis; Plus 720p 0,025, 1080p 0,03125, 1440p 0,05, 4K 0,10; Premium 0,0375 / 0,046875 / 0,075 / 0,15 | Idêntico | confirmado | https://www.mux.com/docs/pricing/video |
| Mux, cold storage | -40% após 30 dias sem play; -60% após 90 dias | Idêntico. Fato omitido: **"New assets start in the Cold tier until first played"** (aula nunca assistida já paga 40% do preço) | confirmado | https://www.mux.com/docs/pricing/video |
| Mux, crédito de US$ 20/mês no pay-as-you-go | "Texto da página ambíguo"; não aplicado (C11); Mux Live IAE = US$ 24,66 | "Pay-as-you-go: includes a $20 monthly usage credit." Sem ambiguidade na documentação de preços | **corrigir**: aplicar o crédito. Mux VOD S0 = **US$ 0** (5,40 coberto); S1 = US$ 0; S2 = **US$ 34**; S3 = **US$ 419**. Mux Live IAE = **US$ 4,66** (se o crédito não estiver sendo consumido pelo VOD; os dois somados usam o mesmo crédito) | https://www.mux.com/docs/pricing/video ; https://www.mux.com/pricing/live |
| Mux, planos Launch e Scale | Launch US$ 20 (crédito US$ 100); Scale US$ 500 (crédito US$ 1.000) | Idêntico | confirmado | https://www.mux.com/docs/pricing/video |
| Mux, Basic com mínimo de 1 mês de armazenamento | Sim | Sim; Plus não tem mínimo | confirmado | https://www.mux.com/docs/pricing/video |
| Mux, legendas automáticas VOD | Grátis, português estável | "No additional charge"; `pt` Stable | confirmado | https://www.mux.com/docs/guides/add-autogenerated-captions-and-use-transcripts |
| Mux, 4K | `max_resolution_tier` 1080p, 1440p ou 2160p | 2160p e 1440p documentados; live aceita entrada 4K mas sai e é cobrada em 1080p | confirmado | https://www.mux.com/docs/guides/stream-videos-in-4k |
| Mux Live, resolução | Live até 1080p | Plus e Premium ao vivo "up to 1080p"; Basic só VOD | confirmado | https://www.mux.com/pricing/live |
| Mux Live, preço | Encoding 1080p US$ 0,03125/min; entrega com 100 mil min grátis; simulcast US$ 0,02/min | A página de live só mostra "Plus a partir de US$ 0,025 (720p)"; 0,03125 é o Plus 1080p da tabela de VOD; simulcast US$ 0,020 confirmado | confirmado | https://www.mux.com/pricing/live |
| Mux Live, limites | Desconecta após 12 h; latência padrão cerca de 30 s, reduced 10 a 15 s, low a partir de 5 s; evento `video.asset.live_stream_completed` | Idêntico | confirmado | https://www.mux.com/docs/guides/start-live-streaming |
| Mux Live, legendas | Não citado | Legendas ao vivo: 6.000 min/mês grátis, depois US$ 0,024/min | complemento | https://www.mux.com/pricing/live |
| Mux DRM, preço | US$ 100/mês + US$ 0,003 por licença; uma licença corresponde a cerca de uma reprodução | Idêntico; descontos de volume | confirmado | https://www.mux.com/docs/guides/protect-videos-with-drm |
| Mux DRM, requisitos | Widevine e PlayReady gerenciados; FairPlay exige conta Apple Developer; exige URL assinada | Idêntico; o pedido FairPlay à Apple leva "vários dias" | confirmado | https://www.mux.com/docs/guides/protect-videos-with-drm |
| Mux DRM em live | **"Live não é protegida por DRM"** (A3.8.2 e Confiança) | **Live é suportada:** basta incluir o DRM em `advanced_playback_policies` da live; `new_asset_settings` protege DVR e gravação | **corrigir** | https://www.mux.com/docs/guides/protect-videos-with-drm |

### 1.3 Lives

| Afirmação | O que o arquivo diz | O que a fonte diz | Veredito | URL |
|---|---|---|---|---|
| Zoom Pro | US$ 16,99/mês (anual 14,16), 100 participantes, 30 h, 10 GB | Idêntico | confirmado | https://zoom.us/pricing |
| Zoom Business | US$ 21,99/mês (anual 18,33), 300 participantes | Idêntico | confirmado | https://zoom.us/pricing |
| Zoom Large Meetings | Até 1.000 participantes, preço não aparece | Idêntico ("contact Zoom Sales") | confirmado | https://zoom.us/pricing |
| Zoom Webinars | US$ 89/mês (anual 66,67), capacidade não informada | Idêntico | confirmado | https://zoom.us/pricing/webinar |
| Zoom, desconto sem fins lucrativos | 50% em Pro, Business, Webinars e Large Meetings, com verificação | Idêntico (verificação pelo Zoom Cares) | confirmado | https://zoom.us/pricing/developer |
| Zoom Video SDK | Preço por minuto não informado | "billed on a minutes usage basis", sem valor | confirmado | https://zoom.us/pricing/developer |
| Zoom `download_token` | Vale 24 h | Blog oficial de desenvolvedores: "the download_token expires after 24 hours". Fórum relata que o token já sumiu do payload em alguns casos: tratar ausência | confirmado | https://developers.zoom.us/blog/meeting-api-querying-tips-part4/ |
| Daily, preços | 10.000 min grátis; US$ 0,0040 (10 mil a 100 mil), 0,0037 (100 mil a 500 mil), até 0,0015; gravação US$ 0,01349/min; RTMP 0,015; HLS 0,03; transcrição pós-chamada 0,0043 | Idêntico. Omitido: gravação soma **US$ 0,003/min de armazenamento adicional** | confirmado, com complemento | https://www.daily.co/pricing/video-sdk/ |
| Daily, limite de participantes | Não informado | Não informado | confirmado (lacuna real) | https://www.daily.co/pricing/video-sdk/ |
| 100ms | Videoconferência 10.000 min grátis, depois US$ 0,004; streaming 10.000 grátis, depois US$ 0,0012 por espectador; gravação 300 min grátis, depois US$ 0,0135 | Idêntico (preços "SD") | confirmado | https://www.100ms.live/pricing |
| LiveKit Cloud | Build US$ 0 / 5.000 min / 60 min de gravação / 50 GB / 100 conexões; Ship US$ 50 / 150.000 / US$ 0,0005 / 600 min, depois 0,02 / 250 GB, depois 0,12 / 1.000; Scale US$ 500 / 1,5 M / 0,0004 / 8.000, depois 0,015 / 3 TB, depois 0,10 / 5.000 | Idêntico | confirmado | https://livekit.com/pricing |
| Cloudflare Stream Live | RTMPS/SRT; toda live é gravada; gravação em cerca de 60 s; WebRTC não gravado; cobrança de entrega WebRTC a partir de 15/10/2026 | Idêntico | confirmado | https://developers.cloudflare.com/stream/stream-live/ ; https://developers.cloudflare.com/stream/pricing/ |
| Jitsi | 4 núcleos dedicados, 8 GB; 2,5 Mbit/s por fluxo 720p; 1 Gbit/s para servidor pequeno; Jibri: um por gravação, 8 GB, SSD, servidor separado | Idêntico | confirmado | https://jitsi.github.io/handbook/docs/devops-guide/devops-guide-requirements/ |

### 1.4 Qualidade, codecs e navegadores

| Afirmação | O que o arquivo diz | O que a fonte diz | Veredito | URL |
|---|---|---|---|---|
| GB por hora por degrau (A2) | 0,8 Mbps = 0,36 GB/h; 2,5 = 1,125; 5 = 2,25; 15 = 6,75 | Conta: Mbps x 3.600 / 8 / 1.000 = 0,36 / 1,125 / 2,25 / 6,75 | confirmado (aritmética) | cálculo |
| Fórmula MB/h (A1) | MB/h = kbps x 0,45; 3.628 kbps = 1.633 MB/h | 3.628 x 0,45 = 1.632,6 | confirmado (aritmética) | cálculo |
| Ladder armazenado | 720p 1,485; 1080p 3,735; 4K 10,485 GB por hora de acervo | 0,36 + 1,125 = 1,485; + 2,25 = 3,735; + 6,75 = 10,485 | confirmado (aritmética) | cálculo |
| GB entregue por hora assistida | 720p 1,01; 1080p 1,72; 4K 3,00 | 0,85 x 1,125 + 0,15 x 0,36 = 1,010; 0,6 x 2,25 + 0,3 x 1,125 + 0,1 x 0,36 = 1,7235; 4K = 2,999 | confirmado (aritmética) | cálculo |
| Ladder H.264 da Apple | 360p 365; 540p 2.000; 720p 3.000 e 4.500; 1080p 6.000 e 7.800 kbps | Idêntico (há também 768x432 a 730 e 1.100 kbps) | confirmado | https://developer.apple.com/documentation/http-live-streaming/hls-authoring-specification-for-apple-devices |
| Ladder HEVC da Apple | 1080p 4.500 e 5.800; 1440p 8.100; 2160p 11.600 e 16.800 (30 fps) | Idêntico | confirmado | idem |
| Itens da especificação Apple | IDR a cada 2 s (1.13); segmentos de 6 s (7.5); High Profile (1.4); "algum conteúdo SHOULD ser H.264" (1.12); AV1 em fMP4 (1.39); AAC estéreo 32 a 160 kbps | Idêntico | confirmado | idem |
| AV1 "aceito desde 2025" | Data citada | A especificação atual aceita AV1 (1.1 e 1.39) mas não traz data de inclusão | não verificável (data) | idem |
| "A Apple coloca o degrau padrão inicial em 2.000 kbps (540p), sinal de que a maioria das sessões nem chega no topo" | Inferência | O item 1.32 diz que a variante padrão (a primeira da playlist) SHOULD ser a de 2.000 kbps. Isso define o ponto de partida do player, não diz nada sobre em que degrau as sessões terminam | corrigir (inferência sem base; manter só o fato do item 1.32) | idem |
| Economia de bitrate do HEVC | "Cerca de 25% a 40% a menos" (tabela 3.3) | Na ladder da Apple: 1080p 5.800 contra 7.800 = 25,6%; 4.500 contra 6.000 = 25%; 720p 3.400 contra 4.500 = 24%; 2.400 contra 3.000 = 20% | **corrigir**: **20% a 26%** nos degraus 720p e 1080p (o texto de A2.4, "cerca de 25%", está certo) | idem |
| YouTube, bitrate de upload SDR | 360p 1; 480p 2,5; 720p 5; 1080p 8; 1440p 16; 2160p 35 a 45 Mbps | Idêntico | confirmado | https://support.google.com/youtube/answer/1722171 |
| HEVC nos navegadores | Chrome parcial a partir de 107; Firefox parcial a partir de 137; Safari completo; Samsung Internet completo | Chrome parcial desde 107; Firefox parcial desde 137 (desativado por padrão de 121 a 136); Safari completo desde 13; Samsung completo desde 21; Edge parcial; Chrome Android parcial | confirmado | https://caniuse.com/hevc |
| AV1 nos navegadores | Chrome 70+, Firefox 67+, Edge 121+, Samsung 12+; Safari parcial (17+) | Idêntico; Safari iOS também parcial desde 17.0 | confirmado | https://caniuse.com/av1 |
| AV1 no Safari | Só com decodificação em hardware (ex.: iPhone 15 Pro) | O caniuse marca "partial" sem detalhar; o post do WebKit não foi reaberto | não verificável nesta passada | https://webkit.org/blog/14445/webkit-features-in-safari-17-0/ |
| Brasil, SO mobile | Setembro/2026: Android 78,78%, iOS 21,21% | Idêntico | confirmado | https://gs.statcounter.com/os-market-share/mobile/brazil |
| "H.264 é o único codec com decodificação garantida em todos os Android" | Afirmação técnica | Coerente com o caniuse (HEVC e AV1 parciais ou dependentes de hardware no Chrome Android), mas nenhuma fonte oficial afirma "garantida em todos" | confirmado em substância; formulação forte | https://caniuse.com/hevc |

### 1.5 Recálculo de células das tabelas

| Célula | O que o arquivo diz | Recálculo | Veredito |
|---|---|---|---|
| Tabela 2, R2 300 h 1080p | US$ 16,66 | (1.120,5 GB menos 10 GB grátis) x 0,015 = 16,66 | confirmado |
| Tabela 2, S3 300 h 1080p | US$ 25,77 | 1.120,5 x 0,023 = 25,77 | confirmado |
| Tabela 2, DigitalOcean 300 h 1080p | US$ 20,87 | 1.043,6 GiB menos 250 = 793,6 x 0,02 = 15,87 + 5 = 20,87 | confirmado |
| Tabela 2, Mux 1.000 h 1080p | US$ 179 | 50.000 x 0,003 + 10.000 x 0,0029 = 179 | confirmado |
| Tabela 2, Mux 1.000 h 4K | US$ 573 | 50.000 x 0,0096 + 10.000 x 0,00928 = 572,80 | confirmado |
| Tabela 2, Wasabi 1.000 h 1080p | US$ 29,13 | 3.735 GB x 0,0078 = 29,13 (com 7,99 por TB decimal daria 29,84) | confirmado (arredondamento) |
| Tabela 3, MediaConvert 1.000 h 1080p | US$ 1.810 | 300.000 min normalizados: 100.000 x 0,0075 + 200.000 x 0,0053 = 1.810 | confirmado |
| Tabela 3, Google Transcoder 1.000 h 1080p | US$ 4.500 | 60.000 x 0,075 = 4.500 | confirmado |
| Tabela 3, Mux Plus 1.000 h 1080p | US$ 1.727 | 5.000 x 0,03125 + 10.000 x 0,029688 + 10.000 x 0,028906 + 35.000 x 0,028125 = 1.726,6 | confirmado |
| Tabela 4, Bunny 1080p 1.000 alunos | US$ 465 | 10.341 GB x 0,045 = 465,3 | confirmado |
| Tabela 4, CloudFront PAYG 1080p 1.000 alunos | US$ 1.026 | 9.000 GB x 0,110 + 341 x 0,105 = 1.025,8 (3,6 M req, dentro da franquia) | confirmado |
| Tabela 4, CloudFront PAYG 1080p 5.000 alunos | US$ 5.361 | 990 + 4.200 + 1.705 x 0,09 = 5.343,45 + 8 M req x 0,022/10 mil = 17,60; total 5.361 | confirmado |
| Tabela 4, Google CDN 1080p 1.000 alunos | US$ 869 | 9.631 GiB x 0,09 = 866,8 + lookup 2,70 = 869,5 | confirmado |
| Tabela 4, Mux 1080p 5.000 alunos | US$ 1.605 | 1,7 M min pagos: 500 mil x 0,001 + 500 mil x 0,00095 + 700 mil x 0,0009 = 1.605 | confirmado |
| Tabela 4, CloudFront plano fixo 4K 5.000 alunos | "Premium, preço sob consulta" | 90 TB cabe no nível Premium de 125 TB, US$ 2.250 (publicado) | **corrigir** |
| Tabela 5, S0 Cloudflare Stream, armazenamento | US$ 9,00; total US$ 27,00; entrega 67% | 1.800 min exigem **2 blocos** pré-pagos de 1.000 min = **US$ 10**; total **US$ 28,00 (R$ 140,84)**; entrega 64%; acumulado 36 m US$ 1.008 | **corrigir** |
| Tabela 5, S0 AWS plano fixo | US$ 16,43; entrega 91% | (112 GB menos 50 GB de crédito) x 0,023 = 1,43 + 15 = 16,43; 15 / 16,43 = 91% | confirmado |
| Tabela 5, S3 Mux | US$ 439; acumulado 12 m US$ 5.268 | 179 + 260 = 439; 12 x 439 = 5.268 (sem o crédito de US$ 20; com crédito, 419) | confirmado na conta; corrigir pelo crédito |
| Tabela 5, S3 AWS PAYG | US$ 1.112; acumulado 12 m US$ 15.151 | 85,91 + 1.026 = 1.111,9; 1.810 + 12 x 1.111,9 = 15.153 | confirmado (arredondamento) |
| Tabela 5, S4 R2 fixo | US$ 7,40 | Workers 5 + (18 M menos 10 M) x 0,30 = 7,40. Os cerca de US$ 3 de classe B citados na nota da Tabela 4 ("entram na Tabela 5") não entraram | corrigir (pequeno: nota e tabela divergem) |
| A2.7.3, virada do Mux | Cerca de 277 alunos | 100.000 / (6 x 60) = 277,8 | confirmado |
| A2.7.3, CloudFront 1 TB | Cerca de 97 alunos em 1080p | 1.000 / 10,34 = 96,7 | confirmado |
| A2.7.3, Hostinger KVM 8 | Cerca de 96 h | (400 menos 40) / 3,735 = 96,4 | confirmado |
| A2.7.2, virada Bunny com 300 h | 24 alunos | 0,03735 x 300 / 0,465 = 24,1 | confirmado |
| A3.4, LiveKit 20 participantes/h | US$ 2,22 | 1.200 min x 0,0005 = 0,60 + 13,5 GB x 0,12 = 1,62; total 2,22 | confirmado |
| A3.4, 100ms HLS 100 participantes/h | US$ 7,68 | 2 professores x 60 x 0,004 = 0,48 + 100 x 60 x 0,0012 = 7,20; total 7,68 | confirmado |
| A3.5, LiveKit Ship IAE | US$ 52,40 | 50 + gravação (720 menos 600) x 0,02 = 2,40; banda 30 x 12 h x 0,675 = 243 GB, na franquia | confirmado |
| A3.5, Daily IAE | US$ 61,87 | 13.040 x 0,004 = 52,16 + 720 x 0,01349 = 9,71 = 61,87; com o armazenamento de gravação de US$ 0,003/min (se gravar no bucket da Daily): **US$ 64,03 (R$ 322,07)** | confirmado na conta; complemento |
| A3.6, LiveKit Ship crescimento | US$ 496,04 | 50 + 140.880 x 0,0005 = 70,44 + 840 x 0,02 = 16,80 + 2.990 GB x 0,12 = 358,80; total 496,04 | confirmado |
| A3.6, Daily crescimento | 90.000 x 0,004 + **180.880** x 0,0037 = 1.029,26; total US$ 1.048,69 (R$ 5.274,91) | Faixa de 100 mil a 500 mil: 290.880 menos 100.000 = **190.880** min. 360 + 706,26 = 1.066,26 + gravação 19,43 = **US$ 1.085,69 (R$ 5.461,02)**; com armazenamento de gravação, US$ 1.090,01 (R$ 5.482,75) | **corrigir** |
| A3.6, 100ms videoconferência crescimento | US$ 1.138,91 | 280.880 x 0,004 = 1.123,52 + 1.140 x 0,0135 = 15,39 | confirmado |
| A3.8.3, DRM Mux 1.000 alunos | US$ 160 | 100 + 20.000 x 0,003 = 160 | confirmado |
| C8, DRM Bunny 1.000 alunos | US$ 199 | 99 + 20.000 x 0,005 = 199 (exatamente no limite da 1ª faixa) | confirmado |
| 8.4, Recomendado hoje | US$ 14,91 a 24,41 | 5,40 + 1,01 a 2,03 + 8,50 a 16,99 = 14,91 a 24,42; com o crédito do Mux: **US$ 9,51 a 19,02** | confirmado na conta; corrigir pelo crédito |
| 8.4, Premium 1.000 h | US$ 1.128,79 a 1.162,54 | 439 + 33,75 a 67,50 + 160 + 496,04 = 1.128,79 a 1.162,54 | confirmado |
| 8.4, Premium hoje, encoding único | US$ 56,25 | 1.800 min x 0,03125 = 56,25 | confirmado |
| A3.8.3, "US$ 100/mês fixos equivalem a 25% da receita de um aluno por mês" | 25% | R$ 503 / R$ 2.000 = 25% do **preço de um curso inteiro**, não da receita mensal de um aluno | corrigir (redação) |

## 2. As 10 correções mais importantes

1. **Crédito de US$ 20/mês do Mux pay-as-you-go é oficial**, não ambíguo ("Pay-as-you-go: includes a $20 monthly usage credit"). Mux VOD hoje (S0) = **US$ 0**, S2 = **US$ 34**, S3 = **US$ 419**; Mux Live IAE = **US$ 4,66**. O crédito é um só por conta: VOD e live dividem os US$ 20. Isso derruba a decisão C11 e a ressalva C12.
2. **Mux DRM protege live:** a documentação oficial mostra DRM em `advanced_playback_policies` da live e em `new_asset_settings` para DVR e gravação. Remover "Live não é protegida por DRM" (A3.8.2 e Confiança).
3. **CloudFront Premium acima de 50 TB tem preço publicado:** 75 TB US$ 1.450; 125 TB US$ 2.250; 200 TB US$ 3.500; 350 TB US$ 6.000; 600 TB US$ 10.000. 4K com 5.000 alunos (90 TB) = **US$ 2.250/mês**. Tirar a pendência "preço não publicado".
4. **Daily no cenário crescimento:** erro de faixa (180.880 em vez de 190.880 minutos). Valor certo **US$ 1.085,69 (R$ 5.461,02)**, ou US$ 1.090,01 com o armazenamento de gravação.
5. **Cloudflare Stream no S0:** 30 h = 1.800 min = 2 blocos pré-pagos, **US$ 10** e não US$ 9. Total **US$ 28,00/mês (R$ 140,84)**.
6. **Economia de bitrate do HEVC:** a ladder da Apple dá **20% a 26%** em 720p e 1080p, não "25% a 40%".
7. **Daily cobra US$ 0,003/min de armazenamento de gravação** além dos US$ 0,01349/min. Cenário IAE vai a **US$ 64,03** se a gravação ficar na Daily. Com gravação direto no nosso bucket, o valor do arquivo continua válido.
8. **Bunny MediaCage tem faixas:** US$ 0,005 (até 20 mil licenças), 0,004 (até 100 mil), 0,003 (até 500 mil), e a taxa de US$ 99 é **por biblioteca de vídeo**. As licenças são contadas por dispositivo, e vídeo e áudio podem gerar licenças separadas, o que pode dobrar a contagem.
9. **Mux: aula nova começa no tier Cold** até a primeira reprodução (paga 40% do preço de armazenamento enquanto ninguém assistiu). Isso deixa o armazenamento do Mux menor que o das tabelas no lançamento de acervo.
10. **GCS calculado em GB com preço por GiB:** a Tabela 2 superestima o Google em cerca de 7% (300 h 1080p: **US$ 20,87**, não 22,41). Pequeno e do lado conservador, mas a nota da Tabela 4 diz que o Google CDN foi convertido para GiB, então a Tabela 2 fica inconsistente com ela.

Correções menores: a inferência sobre o item 1.32 da Apple (variante padrão de 2.000 kbps não indica onde as sessões terminam); "25% da receita de um aluno por mês" deveria ser "25% do preço de um curso"; nota da Tabela 4 diz que classe B do R2 (cerca de US$ 3) entra na Tabela 5, mas não entrou.

## 3. Pendências (não consegui verificar)

- Se a rede Volume da Bunny tem PoP na América do Sul (a página fala só em "single global rate", sem lista de PoPs).
- Taxa de recuperação por GB do R2 Infrequent Access (não apareceu na extração).
- Se a geração de legendas do Cloudflare Stream continua grátis e sem limite de duração (o anúncio de 2024 falava em vídeos de até 2 h em beta; a documentação atual não cita limite nem preço).
- Data em que a Apple passou a aceitar AV1 ("desde 2025").
- AV1 no Safari só com decodificação em hardware (post do WebKit não reaberto).
- Termos da Cloudflare sobre vídeo na CDN gratuita (não reabertos).
- Limite máximo de participantes por sala da Daily e do 100ms (as páginas não informam).
- Capacidade de público do Zoom Webinars a US$ 89 e preço do Large Meetings (as páginas não informam).
- Detalhes não reabertos nesta passada: link de gravação da Daily (900 s a 43.200 s), LiveKit Egress (`session_limits`, `room_composite_cpu_cost`), YouTube Live (10 streams ativos, strike de 14 dias), webhooks de live do Cloudflare Stream, preços de transcrição de OpenAI, Deepgram e AssemblyAI, Hotmart e Kiwify.
- Custo de CPU do FFmpeg e bitrates para aula com slides continuam estimativas sem medição (o próprio arquivo admite).
