# Agente A: infraestrutura de vídeo (hospedagem, transcoding, entrega, lives e proteção)

Arquivo consolidado do Agente A, montado a partir das três partes da pesquisa: `a1-arquitetura-qualidade.md` (itens 1, 3, 6, 7 e 8), `a2-benchmark-custos.md` (item 2) e `a3-lives-protecao.md` (itens 4 e 5). Organizado na ordem dos itens do Agente A na seção 6 do `PROMPT.md`. Nada foi resumido: tabelas, números, blocos JSON e fontes das partes estão preservados. Onde as partes divergem, a seção "Nota do editor: contradições resolvidas" diz qual número prevalece e por quê, e há notas do editor no ponto exato do texto.

- **Data da pesquisa:** 13/10/2026.
- **Cotação usada (as três partes):** USD 1 = R$ 5,03 (AwesomeAPI, 13/10/2026). Todos os valores em reais são conversão direta do USD, sem IOF nem impostos de importação de serviço (que, na prática, somam algo como 6,38% de IOF no cartão internacional e eventuais tributos; ver "Confiança").
- **Preços:** de lista, pay-as-you-go, vigentes na data de acesso, sem descontos negociados.
- **Limitação comum às partes A2 e A3:** a cota compartilhada de WebSearch da sessão (200 buscas entre agentes) esgotou durante a pesquisa. Os preços vieram de páginas oficiais abertas diretamente (WebFetch/curl) e de documentação oficial via Context7. Onde a página oficial não trouxe o número, o valor está marcado como **estimativa** ou **não verificado**.

## 0. Resumo

### 0.1 Conclusões consolidadas do Agente A (editor)

1. **Arquitetura inicial:** serviço gerenciado de vídeo (**Mux Basic**) + app próprio na VPS (Next.js + FastAPI + Postgres no Coolify, que nunca toca no arquivo de vídeo) + cópia dos masters num bucket próprio (R2). Camada `VideoProvider` no FastAPI, tabela `lesson_video` com campo `provider` e componente `<AulaPlayer>` permitem trocar de fornecedor depois sem reescrever telas.
2. **Hipótese dos sócios ("armazenamento domina") refutada no caso geral:** com CDN cobrada por GB ou por minuto, a **entrega (egress) é 80% a 99% da conta** a partir de poucas dezenas de alunos. Armazenamento só domina quando a entrega é zero ou fixa (Cloudflare R2, CloudFront plano fixo), com audiência muito pequena, ou no Mux enquanto a franquia de 100.000 min entregues/mês (cerca de 277 alunos a 6 h/mês) cobre tudo.
3. **Hoje (30 h, 50 alunos, 1080p):** qualquer opção de vídeo custa US$ 0 a 46/mês (R$ 0 a 229); Mux Basic usa US$ 5,40, coberto pelo crédito de US$ 20/mês do pay-as-you-go (custo efetivo US$ 0). Custo não decide agora; decide a arquitetura e o custo de escalar.
4. **1.000 h e 1.000 alunos (1080p):** R2 + FFmpeg US$ 61 (R$ 306); AWS CloudFront plano fixo US$ 100; Mux US$ 419 (R$ 2.108, já com o crédito de US$ 20/mês); Bunny Stream US$ 503; Cloudflare Stream US$ 660; Google US$ 939; AWS pay-as-you-go US$ 1.112 (R$ 5.592). Com 5.000 alunos: R2 US$ 63 contra AWS pay-as-you-go US$ 5.447 (86 vezes).
5. **Mux é o gerenciado mais barato em todos os cenários 1080p** do benchmark (contra Bunny Stream e Cloudflare Stream). R2 + FFmpeg próprio é a pilha mais barata de todas, mas exige engenharia de vídeo que a equipe não tem: entra na fase 3, quando a economia passar de algumas centenas de dólares por mês (no cenário 1.000 h + 1.000 alunos, US$ 358/mês, R$ 1.801).
6. **Transcoding:** custo único e pequeno, exceto Google Transcoder (US$ 4.500 para 1.000 h em 1080p) e AWS MediaConvert (US$ 1.810). Mux Basic, Cloudflare Stream e Bunny Stream não cobram encoding.
7. **Qualidade:** ladder H.264, 30 fps, 360p/540p/720p/1080p. Topo 1080p entre 3,5 e 5 Mbps para aula com slides (1,6 a 2,25 GB por hora assistida no topo; 3,5 a 3,74 GB por hora de acervo com a ladder). Validar com encode de 10 min da aula real de 5 h. **4K não se justifica:** no Mux custa 3,2 vezes o 1080p em entrega e armazenamento; na conta mensal, 2,6 a 3,2 vezes. Proposta: gravar master na maior resolução, entregar até 1080p, 1440p como degrau opcional pago.
8. **Codec:** só H.264 no MVP (Brasil é 78,78% Android; H.264 é o único com decodificação garantida). HEVC/AV1 só como segunda ladder quando o egress dominar a conta.
9. **Lives:** MVP com **Zoom Pro** (US$ 16,99/mês, ou US$ 8,50 com 50% de desconto para sem fins lucrativos verificada) e ingestão automática da gravação pelo webhook `recording.completed` (token de download vale 24 h). Fase 2: **LiveKit Cloud** embutido (Ship, US$ 50/mês), híbrido com plateia em HLS acima de cerca de 100 espectadores. Fallback: OBS para Cloudflare Stream Live ou YouTube não listado. Cenário IAE (4 lives de 3 h, 30 alunos): R$ 43 a R$ 311/mês; crescimento (8 lives, 200 alunos): R$ 55 (Zoom) a R$ 5.729 (100ms videoconferência).
10. **Proteção:** URL assinada de 1 a 4 h, restrição de domínio, marca d'água visual dinâmica (nome + CPF parcial), limite de 2 reproduções simultâneas, sem download, cláusula contratual. Custo de infraestrutura zero, 5 a 8 dias de desenvolvimento. **DRM fora do MVP:** Mux US$ 100/mês + US$ 0,003/licença (Bunny MediaCage US$ 99/mês + US$ 0,005/licença), e não impede gravação de tela.
11. **Três cenários consolidados** (vídeo + live, por mês, seção 8.4): enxuto US$ 8,50 hoje (R$ 43); recomendado US$ 9,51 a 19,02 hoje (R$ 48 a 96), US$ 55 a 76 com 300 h e 200 alunos, US$ 464 a 508 com 1.000 h e 1.000 alunos (valores já com o crédito de US$ 20/mês do Mux); premium US$ 162 a 163 hoje (R$ 814 a 819), por causa do DRM e do LiveKit.

### 0.2 Resumo da parte A1 (arquitetura, qualidade, stack, operação, veredito)

1. Para o IAE hoje (poucas dezenas de horas, dezenas a centenas de alunos), a arquitetura certa é **serviço gerenciado de vídeo** (Mux como primeira escolha, Bunny Stream como alternativa barata), com o nosso app (Next.js + FastAPI + Postgres no Coolify) guardando só metadados, progresso e permissões.
2. VPS servindo MP4 direto é o caminho mais barato no papel e o mais arriscado na prática: sem bitrate adaptativo, banda da VPS compartilhada com o app, download trivial, sem CDN.
3. FFmpeg próprio + object storage (R2) + CDN é viável e barato em escala, mas transfere para nós o que não dominamos (fila de transcodificação, ladder, empacotamento HLS, URLs assinadas, legendas). Faz sentido como fase 3, não como MVP.
4. **Qualidade:** ladder H.264 de 360p/540p/720p/1080p a 30 fps resolve aula com slides. Na referência oficial da Apple, 1080p H.264 fica entre 6.000 e 7.800 kbps; para conteúdo de baixa movimentação (professor + slide), a estimativa é de 3 a 4,5 Mbps no topo, o que dá cerca de **1,6 a 2,1 GB por hora** no degrau 1080p.
5. **4K não se justifica** para este caso: multiplica por 3 a 4,6 vezes o tráfego por hora assistida, encarece cada minuto no Mux (entrega 4K custa 3,2 vezes a de 1080p), não melhora a leitura de slide em celular e o Brasil é 79% Android. Pedro tem razão; a ideia dele de "degrau de qualidade com custo à mostra" é tecnicamente suportada (o Mux Player tem `max-auto-resolution` e o Mux cobra por faixa de resolução).
6. Codec: **H.264 obrigatório** (universal; a Apple pede variantes H.264 por compatibilidade). HEVC e AV1 só como segunda ladder quando o tráfego dominar o custo; hoje não compensam a complexidade.
7. Upload: direct upload do navegador para o provedor (URL assinada gerada pelo FastAPI), webhook do provedor de volta para o FastAPI marca o vídeo como pronto. O VPS nunca recebe o arquivo bruto.
8. Transcrição: Mux e Cloudflare Stream geram legenda automática em português **sem custo extra** (no Cloudflare Stream: estimativa, não verificada); o texto (.txt/.vtt) alimenta busca e o agente de IA. Whisper/Deepgram/AssemblyAI ficam como plano B (US$ 0,15 a 0,36 por hora de áudio).
9. Operação: o vídeo fica fora da VPS, então a VPS cair não apaga nem interrompe vídeo já carregado no player; backup do Postgres via Coolify para S3, cópia dos masters em R2 ou B2 como seguro contra lock-in.
10. Evolução sem reescrever: uma camada fina `VideoProvider` no FastAPI (criar upload, obter playback, assinar token, receber webhook) e um campo `provider` + `provider_asset_id` por aula. Trocar Mux por Bunny ou por pipeline próprio vira migração de dados, não de código de tela.

### 0.3 Resumo da parte A2 (benchmark de custos)

1. **A hipótese dos sócios ("armazenamento é o maior custo") só vale em dois casos:** quando a entrega é gratuita ou de preço fixo (Cloudflare R2 atrás do cache da Cloudflare, ou o novo plano fixo do AWS CloudFront) ou quando a audiência é muito pequena (até cerca de 25 alunos para cada 300 h de acervo). Em qualquer provedor que cobra entrega por GB ou por minuto, **a entrega (egress) domina, com 80% a 99% da conta mensal**, a partir de poucas dezenas de alunos.
2. Regra de bolso (1080p, 6 h/aluno/mês): cada aluno ativo consome cerca de **10,3 GB/mês**; cada hora de acervo ocupa **3,7 GB** (ladder 360p+720p+1080p). Um aluno custa por mês o mesmo que 12 horas de acervo na Bunny, 13 horas na AWS e 2 horas no Mux.
3. **Hoje (cerca de 30 h de vídeo, até 50 alunos) qualquer opção custa entre US$ 0 (Mux, uso coberto pelo crédito de US$ 20/mês) e US$ 46 por mês (R$ 0 a R$ 229).** A decisão de provedor não é de custo agora, é de arquitetura e de quanto custa escalar depois.
4. **Cenário 1.000 h + 1.000 alunos em 1080p (mensal):** Cloudflare R2 US$ 61 (R$ 306); AWS com CloudFront plano fixo US$ 100 (R$ 502); Mux US$ 419; B2+Bunny US$ 491; Bunny Stream US$ 503; Cloudflare Stream US$ 660; GCP US$ 939; AWS pay-as-you-go US$ 1.112 (R$ 5.592).
5. **Cenário 1.000 h + 5.000 alunos em 1080p (mensal):** R2 US$ 63; AWS plano fixo US$ 263; Mux US$ 1.764; Cloudflare Stream US$ 2.100; Bunny US$ 2.364; GCP US$ 3.280; AWS pay-as-you-go US$ 5.447 (R$ 27.398). Diferença de 86 vezes entre o mais barato e o mais caro.
6. **Transcoding é custo único e pequeno**, exceto em Google Transcoder (US$ 4.500 para 1.000 h em 1080p) e AWS MediaConvert (US$ 1.810). FFmpeg próprio custa centavos por hora de vídeo em CPU (estimativa: US$ 0,04 por hora de aula em 1080p); Cloudflare Stream, Bunny Stream e Mux basic não cobram encoding.
7. **4K multiplica o armazenamento por 2,8 e a entrega por 1,7 a 3,2** (conforme o provedor) em relação ao 1080p; no Mux, a entrega 4K custa 3,2 vezes a 1080p. Cloudflare Stream nem entrega 4K (máximo 1080p).
8. **Hostinger VPS sozinho não comporta** nada acima de cerca de 100 h em 1080p (disco máximo de 400 GB no KVM 8) e a Hostinger não vende object storage (páginas testadas retornam 404). Serve para o app, não para o acervo.
9. Degraus de preço mais relevantes: Mux entrega 100.000 min/mês grátis (cerca de 277 alunos a 6 h); CloudFront dá 1 TB/mês grátis (cerca de 97 alunos em 1080p); plano fixo CloudFront Pro (US$ 15) aguenta até 10 milhões de requisições (cerca de 2.700 alunos com segmentos HLS de 6 s) e 50 TB; Cloudflare Stream é cobrado em blocos pré-pagos de 1.000 minutos armazenados (US$ 5 cada).
10. Recomendação de custo para o consolidador: **R2 (armazenamento) + cache Cloudflare (entrega a custo zero) + FFmpeg próprio** é a opção mais barata em todos os cenários; **Bunny Stream ou Mux** são as opções gerenciadas de menor esforço; **AWS CloudFront plano fixo** é a alternativa "nuvem grande" com custo previsível. A escolha final depende também de complexidade operacional (itens 1 e 8 do Agente A).

### 0.4 Resumo da parte A3 (lives e proteção de conteúdo)

- **O que o cliente descreveu é videoconferência**: dois professores conversando e alunos que eventualmente falam ("como numa chamada de vídeo"). Com 30 alunos, videoconferência custa praticamente o mesmo que streaming. A conta só muda a partir de algumas centenas de espectadores.
- **MVP (até dez/2026): Zoom Workplace Pro**, com desconto de 50% para entidade sem fins lucrativos verificada, e ingestão automática da gravação pelo webhook `recording.completed`. Custo: US$ 8,50 a 16,99 por mês (R$ 43 a 85). Risco técnico perto de zero. Os professores já sabem usar e não há infraestrutura de tempo real para manter.
- **Evolução (fase 2): LiveKit Cloud (plano Ship, US$ 50/mês)** embutido na plataforma, com papéis (professor publica, aluno só assiste, aluno "levanta a mão" e é promovido a falar), chat próprio e Egress gravando direto no nosso bucket. É open source: se o volume crescer ou o fornecedor virar problema, dá para auto-hospedar o mesmo servidor sem reescrever o front.
- **Fallback de emergência**: YouTube Live não listado ou Cloudflare Stream Live via OBS, com o link publicado na própria plataforma. Fica documentado no runbook, sem uso no dia a dia.
- **Cenário IAE (4 lives de 3 h, 30 alunos):** de R$ 43 (Zoom com desconto) a R$ 311 (Daily) por mês. LiveKit Cloud fica em cerca de R$ 264.
- **Cenário crescimento (8 lives de 3 h, 200 alunos):** de R$ 55 (Zoom Business com desconto) a R$ 5.729 (100ms em videoconferência). LiveKit Cloud fica em cerca de R$ 2.495 e streaming HLS (100ms, Mux, Cloudflare) entre R$ 1.194 e R$ 1.755.
- **Proteção de conteúdo, nível recomendado:** URL assinada de vida curta, restrição de domínio, marca d'água visual dinâmica com nome e parte do CPF/e-mail do aluno, limite de 2 reproduções simultâneas por conta, sem botão de download, e cláusula contratual. **DRM fica fora do MVP.** Na Mux, custaria US$ 100/mês fixos (R$ 503) mais US$ 0,003 por licença. Além disso, DRM não impede gravação de tela, que é o vetor real de vazamento de aula.

## Nota do editor: contradições resolvidas

As três partes foram escritas em paralelo e divergem em alguns pontos. Abaixo, cada divergência, o número que prevalece neste arquivo e o motivo. Os textos originais foram mantidos; notas do editor no corpo apontam para esta tabela.

| # | Tema | O que diz cada parte | O que prevalece | Por quê |
|---|---|---|---|---|
| C1 | Bitrate e peso por hora de 1080p | A1: 3.500 + 128 kbps no topo (1,63 GB/h; até 2,08 GB/h com muito movimento), ladder 360p/540p/720p/1080p com cerca de 3,5 GB por hora de acervo. A2: 5 Mbps total no topo (2,25 GB/h), ladder 360p+720p+1080p com 3,74 GB por hora de acervo e 1,72 GB entregue por hora assistida | **Para custo: A2** (5 Mbps, 3,74 GB/h). **Para configurar o encoder: A1** (600/1.200/2.000/3.500 kbps) como ponto de partida | Toda a tabela de custos foi calculada com a premissa de A2, que é mais conservadora (superestima o custo, lado seguro para proposta). A ladder de A1 é a configuração a testar. As duas são estimativas: o teste de encode de 10 min da aula real de 5 h decide. Se A1 se confirmar, a entrega das tabelas de A2 cai até cerca de 27% e o armazenamento cerca de 6% |
| C2 | Quanto o 4K multiplica o custo | A1: tráfego por hora assistida 3,2 a 4,6 vezes (1,6 GB/h em 1080p contra 5,2 a 7,6 GB/h em 4K HEVC, todas as sessões no topo). A2: armazenamento 2,8 vezes; entrega 1,7 vez por GB (mix com 25% das sessões em 4K) ou 3,2 vezes no Mux; conta mensal 2,6 a 3,2 vezes | **Para projeção de custo: A2.** A1 vale como pior caso físico | Não é erro de nenhuma parte, são premissas diferentes (100% das sessões no topo contra mix realista). No Mux, as duas concordam: 3,2 vezes. A conclusão é a mesma: 4K não se justifica |
| C3 | Cenário ilustrativo de custo | A1 seção 1.3: 100 h, 200 alunos, **10 h/aluno/mês**: Mux US$ 38, Cloudflare Stream US$ 150, Bunny US$ 150. A2: premissa de **6 h/aluno/mês** em todas as tabelas | **A2** | Premissa declarada e justificada, aplicada de forma uniforme a todos os provedores e cenários. A1 seção 1.3 fica como teste de sensibilidade a 10 h. Com 6 h, o mesmo cenário daria Mux US$ 18 (72.000 min entregues, dentro da franquia), Bunny Stream US$ 96,80 e Cloudflare Stream US$ 102 (cálculo do editor com preços e premissas de A2). A conclusão de A1 (entrega domina) se mantém para Bunny e Stream |
| C4 | Bunny Stream como "alternativa barata" ao Mux | A1 (resumo, 8.1 e cenário enxuto) apresenta Bunny Stream como alternativa barata. A2 mostra Mux Basic mais barato em todos os cenários 1080p (valores com o crédito de US$ 20/mês do Mux): S0 US$ 0 contra 24,39; S2 34 contra 104; S3 419 contra 503; S4 1.764 contra 2.364. Em 720p (S1) o Mux sai a US$ 0 (uso de 14,40 coberto pelo crédito) contra 15,12. Bunny só é mais barato no S6 (4K, 1.000 alunos: 915 contra 1.385) | **A2: Mux é o gerenciado mais barato** nos cenários relevantes ao IAE | Cálculo completo com preços verificados. Bunny continua como alternativa por outros motivos (cobrança por GB, upload TUS retomável, DRM MediaCage), e ficaria bem mais barato se a rede Volume (US$ 0,005/GB) atendesse o Brasil, o que não foi confirmado |
| C5 | Qual é a arquitetura "recomendada" | A1: Mux gerenciado + masters em R2. A2 seção 7.4: "Recomendado" = R2 + cache Cloudflare + FFmpeg próprio | **A1 para a arquitetura inicial; A2 como alvo da fase 3** | A própria A2 diz que sua recomendação é só de custo e que a escolha final depende da complexidade operacional (itens 1 e 8). A2 dá o gatilho da migração: no cenário 1.000 h + 1.000 alunos, Mux custa US$ 419/mês (com o crédito de US$ 20) e R2 + FFmpeg US$ 60,88, economia de US$ 358/mês (R$ 1.801), o que paga a engenharia do pipeline |
| C6 | Resolução máxima do Cloudflare Stream | A1: sem resposta (fonte de terceiros fala em 1080p). A2: verificado na documentação oficial via Context7: H.264, ABR de 360p a **1080p**, não entrega 4K | **A2** | Fonte oficial |
| C7 | Preços da Bunny (transcrição e rede Volume) | A1: transcrição sem preço oficial (fonte secundária: US$ 0,10/min por idioma) e rede Volume não obtida (página com erro 502). A2: transcrição **US$ 0,10/min por idioma** e rede Volume **US$ 0,005/GB até 500 TB**, ambos em páginas oficiais | **A2** | A2 obteve as páginas oficiais (bunny.net/pricing e bunny.net/docs/stream-pricing). Continua pendente se a rede Volume tem PoP na América do Sul |
| C8 | Preço do DRM da Bunny (MediaCage Enterprise) | A3: não verificado (página com erro 502). A1: taxa base de US$ 99/mês. A2: **US$ 99/mês + US$ 0,005 por licença** | **A2** | Valor completo, da documentação oficial de preços do Bunny Stream. Com ele, a tabela de DRM de A3 (item 5) ganha a linha Bunny: cenário IAE (600 licenças) US$ 102 (R$ 513,06); cenário 1.000 alunos (20.000 licenças) US$ 199 (R$ 1.000,97). Mux fica igual no pequeno porte e mais barato no grande (US$ 101,80 e US$ 160) |
| C9 | Hostinger: object storage e preço de VPS | A3 cita "Hostinger Object Storage" como destino S3 compatível do LiveKit Egress e diz que o preço de VPS Hostinger não foi verificado. A2: a Hostinger **não vende object storage** (URLs testadas retornam 404) e verificou os preços de VPS (KVM 2/4/8 renovam a US$ 14,99/28,99/49,99) | **A2** | A2 testou diretamente. Ler a menção de A3 como "R2 ou B2". Com os preços de A2, as duas VPS do Jitsi em KVM 4 custariam US$ 57,98/mês na renovação, dentro da estimativa de A3 (US$ 30 a 60) |
| C10 | Validade do token de reprodução | A1 seção 6.3: 2 a 6 h. A3 seção 8.5: 1 a 4 h (Cloudflare: padrão 1 h, máximo 24 h) | **A3: 1 a 4 h**, com renovação silenciosa | A3 é a parte responsável por proteção (item 5); o intervalo mais curto reduz o tempo de vida de um link vazado e, com renovação silenciosa (A1), não atrapalha uma aula de 3 h |
| C11 | Crédito de US$ 20/mês do Mux pay-as-you-go | A3 aplica o crédito no cenário de Mux Live (US$ 4,66 após crédito). A2 não aplicava (texto da página parecia ambíguo) | **A3: aplicar.** Mux Live no cenário IAE = **US$ 4,66 (R$ 23,44)**; Mux VOD S0 = US$ 0, S1 = US$ 0, S2 = US$ 34, S3 = US$ 419 | A documentação oficial de preços confirma: "Pay-as-you-go: includes a $20 monthly usage credit." O crédito é um só por conta: VOD e live dividem os US$ 20, então os US$ 4,66 da live só valem se o VOD não tiver consumido o crédito |
| C12 | "Custo de live nunca será dominante" | A3: o custo de live nunca será o componente dominante nos próximos 12 meses; VOD pesa mais. A2: hoje (S0) o VOD no Mux usa US$ 5,40/mês, coberto pelo crédito de US$ 20 (custo efetivo US$ 0) | **Ressalva do editor:** hoje a licença do Zoom (US$ 8,50 a 16,99) é maior que o VOD no Mux (US$ 0 com o crédito); a partir de 300 h e 200 alunos (Mux US$ 34 com o crédito) a afirmação de A3 vale | Os dois valores são pequenos; a ressalva não muda nenhuma recomendação |
| C13 | Armazenamento de 300 h em R2 | A1: cerca de 1 TB, US$ 15,75/mês (R$ 79). A2: 1.120 GB, US$ 16,66/mês | **A2** | Decorre de C1 (3,74 GB por hora de acervo) |
| C14 | Limite de acervo na VPS Hostinger | A2 resumo: "nada acima de cerca de 100 h em 1080p". A2 seções 7.3 e JSON: cerca de 96 h no KVM 8 | **96 h** (KVM 8, 400 GB menos 40 GB reservados ao sistema) | É o número calculado; "cerca de 100 h" é arredondamento do mesmo cálculo |

## 1. Arquiteturas possíveis para VOD, do mais simples ao mais robusto

Fonte principal: parte A1, seção 1.

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
| Cloudflare Stream | US$ 5 por 1.000 min armazenados (pré-pago) + US$ 1 por 1.000 min entregues | Grátis | Sim, grátis (estimativa, não verificada), `pt` na lista | Player próprio (iframe) ou HLS em qualquer player | Resolução máxima de saída não confirmada na documentação (ver Confiança) |
| Bunny Stream | Por GB: armazenamento a partir de US$ 0,01/GB-mês; CDN América do Sul US$ 0,045/GB (rede padrão) | Padrão grátis; premium US$ 0,05/min HD | Sim (transcrição paga; preço não confirmado na fonte oficial) | Player próprio grátis | DRM MediaCage Enterprise com taxa base de US$ 99/mês |
| api.video | Não verificado nesta pesquisa | | | | Ver A2 |
| Vimeo (OTT/Enterprise) | Contrato anual, pacote fechado | | | Player Vimeo | Produto voltado a canal OTT pronto; pouco controle de integração |
| AWS MediaConvert + S3 + CloudFront | Por minuto de saída transcodificada + GB armazenado + GB entregue | Pago por minuto | Via Amazon Transcribe (pago à parte) | Qualquer player HLS | Peças avulsas; complexidade próxima da opção (b) |
| Google Transcoder API + GCS + Cloud CDN | Idem AWS | Pago por minuto | Via Speech-to-Text (pago à parte) | Qualquer player HLS | Idem |

Notas: AWS e Google são "gerenciados" só na transcodificação; storage, CDN, assinatura de URL, legenda e player continuam sendo montagem nossa. Na prática são a opção (b) com a CPU terceirizada.

> **Nota do editor:** Duas lacunas desta tabela foram resolvidas pela parte A2: a resolução máxima do Cloudflare Stream é **1080p** (documentação oficial) e a transcrição do Bunny custa **US$ 0,10/min por idioma** (página oficial). O DRM MediaCage é US$ 99/mês + US$ 0,005 por licença. Ver C6, C7 e C8.

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

> **Nota do editor:** A premissa desta ilustração (10 h por aluno por mês) difere da usada no benchmark (6 h). Prevalece o benchmark do item 2; com 6 h, este cenário daria Mux US$ 18, Bunny Stream US$ 96,80 e Cloudflare Stream US$ 102. Ver C3.

## 2. Benchmark de custo (armazenamento, transcoding, entrega)

Fonte principal: parte A2 (inteira). As subseções mantêm a numeração original da parte A2, com o prefixo "A2." (por exemplo, quando o texto diz "seção 2.4", leia "A2.2.4, mix de resolução assistida").

### A2.1. Tabela 1: preços unitários por provedor (lista, 13/10/2026)

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
| **AWS CloudFront planos fixos** (novos) | Crédito S3: 5 GB / 50 GB / 1 TB / 5 TB | Free US$ 0 (100 GB, 1 M req); **Pro US$ 15** (50 TB, 10 M req); **Business US$ 200** (50 TB, 125 M req); Premium US$ 1.000 (50 TB, 500 M req); acima de 50 TB, níveis publicados: 75 TB US$ 1.450; 125 TB US$ 2.250; 200 TB US$ 3.500; 350 TB US$ 6.000; 600 TB US$ 10.000 | n/a | "Sem cobrança de excedente"; acima da franquia de forma sustentada a AWS pode "ajustar a entrega" (menos PoPs ou menor performance). Primeiro pico até 3x tolerado. Exige WAF associado; URLs assinadas suportadas | aws.amazon.com/cloudfront/pricing ; docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/flat-rate-pricing-plan.html |
| **AWS MediaConvert** (on-demand, US East Ohio) | n/a | n/a | Por minuto normalizado: Basic US$ 0,0075 (primeiros 100 mil), 0,0053, 0,0038. Professional 0,012 / 0,0096 / 0,0072 / 0,0036. Multiplicador AVC: SD 1x, HD 2x, 4K 4x. HEVC (Pro) SD 2x, HD 4x, 4K 8x. AV1 (Pro) SD 3,5x, HD 7x, 4K 14x | Sem free tier descrito | aws.amazon.com/mediaconvert/pricing |
| **Cloudflare R2** (Standard) | **US$ 0,015/GB-mês** (IA: 0,01 + 0,01/GB de leitura (estimativa, não verificada)) | **Egress grátis** | n/a (FFmpeg próprio) | Grátis: 10 GB-mês, 1 M ops classe A, 10 M ops classe B. Classe A US$ 4,50/M, classe B US$ 0,36/M | developers.cloudflare.com/r2/pricing |
| **Cloudflare Workers Paid** (para validar acesso às aulas na borda) | n/a | n/a | n/a | US$ 5/mês, 10 M req inclusas, US$ 0,30/M adicional | developers.cloudflare.com/workers/platform/pricing |
| **Cloudflare Stream** | **US$ 5 por 1.000 min armazenados/mês** (pré-pago), independe da resolução | **US$ 1 por 1.000 min entregues** (banda inclusa) | **Grátis** (ingest e encoding) | Sem franquia; H.264, ABR de 360p a **1080p** (não entrega 4K); upload até 30 GB | developers.cloudflare.com/stream/pricing ; Context7 /websites/developers_cloudflare_stream |
| **Bunny CDN** (rede Standard, 119 PoPs) | n/a | Europa/América do Norte US$ 0,01/GB; **América do Sul US$ 0,045/GB**; Ásia 0,03; África/Oriente Médio 0,06. Rede Volume (10 PoPs): US$ 0,005/GB até 500 TB | n/a | Mínimo US$ 1/mês | bunny.net/pricing |
| **Bunny Storage** | HDD 1 região **US$ 0,01/GB**; 2 regiões 0,02; 3 regiões 0,025. SSD Edge 0,02 por região | Tráfego Storage para Bunny CDN grátis | n/a | Mínimo US$ 1/mês | bunny.net/pricing/storage |
| **Bunny Stream** | US$ 0,01/GB (região padrão Frankfurt), **cada resolução gerada é armazenada e cobrada**; replicação +0,01 (2a) e +0,005 (3a em diante) | Preço da Bunny CDN (América do Sul US$ 0,045/GB) | **Encoding padrão grátis**; Premium Encoding por minuto de saída: 2160p/1440p US$ 0,150; 1080p/720p US$ 0,050; 480p a 240p US$ 0,025. Transcrição US$ 0,10/min por idioma. DRM MediaCage Enterprise US$ 99/mês + US$ 0,005 por licença | Mínimo US$ 1/mês | bunny.net/stream ; bunny.net/docs/stream-pricing |
| **Backblaze B2** | **US$ 6,95/TB-mês** (US$ 0,00695/GB) | Grátis até **3x o volume armazenado**; depois US$ 0,01/GB; grátis sem limite para parceiros CDN (Cloudflare, Bunny, Fastly e outros) | n/a | 10 GB grátis; sem mínimo de tamanho ou de duração | backblaze.com/cloud-storage/pricing |
| **DigitalOcean Spaces** | US$ 5/mês inclui **250 GiB + 1 TiB de saída**; excedente US$ 0,02/GiB (cold 0,007) | Excedente **US$ 0,01/GiB**, CDN embutida | n/a | Mínimo US$ 5/mês | digitalocean.com/pricing/spaces-object-storage |
| **Wasabi** (pay as you go) | **US$ 7,99/TB-mês** (cerca de US$ 0,0078/GB) | Sem cobrança de egress, **desde que o egress mensal seja menor ou igual ao volume armazenado**; acima disso o uso "não é adequado" e o serviço pode ser limitado | n/a | **Mínimo de 1 TB cobrado** e retenção mínima de 90 dias | wasabi.com/pricing ; wasabi.com/pricing/faq |
| **Mux Video** (pay as you go) | Por minuto armazenado/mês (basic e plus): 720p US$ 0,0024; **1080p US$ 0,0030**; 1440p 0,0048; 4K 0,0096 (faixas menores acima de 50 mil min). Cold storage automático: -40% após 30 dias sem play, -60% após 90 dias | Por minuto entregue: **100.000 min/mês grátis**; depois 720p US$ 0,0008; **1080p US$ 0,0010**; 1440p 0,0016; 4K 0,0032 (faixas decrescentes a partir de 500 mil min) | Basic: **grátis**. Plus: 720p US$ 0,025/min; 1080p 0,03125; 1440p 0,05; 4K 0,10. Premium: 0,0375 / 0,046875 / 0,075 / 0,15 | Planos Launch US$ 20 (crédito US$ 100) e Scale US$ 500 (crédito US$ 1.000); pay-as-you-go inclui crédito de uso de US$ 20/mês ("Pay-as-you-go: includes a $20 monthly usage credit", documentação oficial), um só por conta para VOD e live | mux.com/pricing ; mux.com/docs/pricing/video |

Observação sobre a política da Cloudflare: os termos específicos de serviço dizem que, fora do plano Enterprise, a Cloudflare oferece serviços pagos "(e.g., the Developer Platform, Images, and Stream) that you must use in order to serve video and other large files via the CDN". R2 faz parte da Developer Platform, então servir HLS a partir do R2 com domínio próprio é o caminho aceito; servir vídeo de outra origem (por exemplo B2 ou VPS) só pelo CDN gratuito da Cloudflare é zona cinzenta (fonte: cloudflare.com/service-specific-terms-application-services) (estimativa, não verificada). Limite de arquivo cacheável no Free/Pro/Business: 512 MB por objeto, o que não é problema para segmentos HLS de 6 s (developers.cloudflare.com/cache/concepts/default-cache-behavior).

### A2.2. Premissas (todas declaradas)

#### A2.2.1 Tamanho por hora de vídeo, por degrau (H.264/AVC, 30 fps, aula com professor e slides)

| Degrau | Bitrate total (vídeo + áudio 128 kbps) | GB por hora | Referência Apple HLS (H.264, conteúdo genérico) |
|---|---|---|---|
| 360p | 0,8 Mbps | 0,36 | 365 kbps (640x360) |
| 480p (não usado no ladder base) | 1,2 Mbps | 0,54 | 730 a 2.000 kbps (768x432 a 960x540) |
| 720p | 2,5 Mbps | 1,125 | 3.000 a 4.500 kbps |
| 1080p | 5 Mbps | 2,25 | 6.000 a 7.800 kbps |
| 1440p/4K (degrau "premium") | 15 Mbps | 6,75 | HEVC: 1440p 8.100 kbps; 2160p 11.600 a 16.800 kbps |

Por que abaixo da Apple: a tabela da Apple (HLS Authoring Specification, developer.apple.com) é para conteúdo genérico, com movimento. Aula com professor parado e slides é conteúdo de baixa complexidade e comprime bem; 2,5 Mbps em 720p e 5 Mbps em 1080p são valores de mercado comuns para esse tipo de conteúdo (estimativa; o item 3 do Agente A deve confirmar com teste real de encode). **Sensibilidade:** se usar os bitrates da Apple (3 Mbps em 720p e 6 Mbps em 1080p), todos os números de armazenamento e entrega deste arquivo sobem cerca de 20%. O degrau 4K em 15 Mbps só é realista com HEVC; em H.264 puro o 4K pediria 20 a 30 Mbps, quase dobrando os custos de 4K mostrados aqui.

Segmentação HLS: segmentos de 6 s, como recomenda a Apple ("Target durations SHOULD be 6 seconds", item 7.5 da especificação). Isso dá cerca de **600 requisições por hora assistida**, número usado para custo de requisições (CloudFront, Cloud CDN, Workers).

#### A2.2.2 Ladder armazenado (soma dos degraus)

| Teto do ladder | Degraus guardados | GB por hora de acervo | Fator sobre o degrau maior |
|---|---|---|---|
| 720p | 360p + 720p | 1,49 | 1,3x |
| 1080p | 360p + 720p + 1080p | 3,74 | 1,66x |
| 4K | 360p + 720p + 1080p + 4K | 10,49 | 1,55x |

Não incluímos o arquivo original (master). Se o master for guardado, some cerca de 1 a 2 vezes o degrau maior por hora, de preferência em armazenamento frio (R2 Infrequent Access US$ 0,01, B2 US$ 0,00695 ou Wasabi).

Para Cloudflare Stream e Mux o armazenamento é cobrado por minuto de vídeo (não por GB): 100 h = 6.000 min; 300 h = 18.000 min; 1.000 h = 60.000 min.

#### A2.2.3 Horas assistidas por aluno por mês: **6 h**

Justificativa (estimativa, sem fonte direta medida): um aluno engajado de uma turma presencial do IAE consome 24 h em 2 meses, ou seja, 12 h/mês enquanto o curso está ativo. Assinantes de clube e compradores vitalícios assistem bem menos, e a literatura de cursos online registra taxas de conclusão baixas. Usamos 6 h/mês como média entre "aluno de turma ativa" (12 h) e "assinante passivo" (1 a 3 h). A calculadora deve deixar esse valor ajustável de 2 a 12 h; os custos de entrega são lineares nele (dobrar as horas dobra a entrega).

#### A2.2.4 Mix de resolução efetivamente assistida

| Teto oferecido | Mix assistido | GB entregue por hora assistida |
|---|---|---|
| 720p | 85% 720p, 15% 360p | 1,01 |
| 1080p | 60% 1080p, 30% 720p, 10% 360p | 1,72 |
| 4K | 25% 4K, 45% 1080p, 25% 720p, 5% 360p | 3,00 |

O mix 4K supõe que só um quarto das sessões tem tela, rede e decodificador para 4K (estimativa). Em Mux, cobramos a entrega pela tabela da resolução do teto do ativo (premissa conservadora; a cobrança real pode ser pela resolução entregue).

#### A2.2.5 Outras premissas

- Público no Brasil, servido por PoPs da América do Sul (por isso Bunny a US$ 0,045 e CloudFront a US$ 0,110).
- Acervo e número de alunos constantes no horizonte (estado estacionário). Acumulado em N meses = transcoding único + N x custo mensal. A calculadora do consolidador pode simular crescimento.
- Hostinger: preço de renovação em USD (o promocional só vale no primeiro ciclo). 40 GB de disco reservados para sistema e aplicação.
- Não incluímos custo do servidor da aplicação (Next.js, FastAPI, Postgres), só a infraestrutura de vídeo.
- Não incluímos impostos, IOF nem spread de cartão.

### A2.3. Tabela 2: armazenamento mensal (US$/mês) por volume de acervo e teto de resolução

Valores em US$ por mês, ladder completo (seção 2.2). Para converter em reais, multiplique por 5,03. Google GCS cobra por GiB: os GB da linha de volume foram convertidos para GiB (divididos por 1,0737) antes de aplicar US$ 0,020/GiB-mês. Asterisco no Cloudflare Stream: cobra o mesmo por minuto em qualquer resolução, mas entrega no máximo 1080p, então a coluna 4K não é um 4K de verdade.

| Provedor | 100 h 720p | 300 h 720p | 1000 h 720p | 100 h 1080p | 300 h 1080p | 1000 h 1080p | 100 h 4K | 300 h 4K | 1000 h 4K |
|---|---|---|---|---|---|---|---|---|---|
| GB armazenados (ladder) | 148 | 445 | 1.485 | 374 | 1.120 | 3.735 | 1.048 | 3.146 | 10.485 |
| Hostinger VPS (disco) | KVM 4 US$ 28,99 | não cabe (>400 GB) | não cabe (>400 GB) | não cabe (>400 GB) | não cabe (>400 GB) | não cabe (>400 GB) | não cabe (>400 GB) | não cabe (>400 GB) | não cabe (>400 GB) |
| Google GCS (Iowa) | 2,77 | 8,30 | 27,66 | 6,96 | 20,87 | 69,57 | 19,53 | 58,59 | 195 |
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

### A2.4. Tabela 3: transcoding (custo único por vídeo) em US$

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

### A2.5. Tabela 4: egress/entrega mensal (US$/mês) por número de alunos

Premissa: 6 h por aluno por mês e mix da seção 2.4. Linhas "GB entregues" e "minutos entregues" mostram o volume que gera a cobrança.

##### Egress mensal (US$), teto do ladder 720p
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

##### Egress mensal (US$), teto do ladder 1080p
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

##### Egress mensal (US$), teto do ladder 4K
| Provedor | 50 alunos | 200 alunos | 1000 alunos | 5000 alunos |
|---|---|---|---|---|
| GB entregues/mês | 900 | 3.599 | 17.996 | 89.978 |
| Minutos entregues/mês | 18.000 | 72.000 | 360.000 | 1.800.000 |
| Cloudflare R2 (egress zero) | 0,00 | 0,00 | 0,00 | 0,00 |
| Cloudflare Stream (US$1/1.000 min) | 18,00 | 72,00 | 360 | 1.800 |
| Bunny CDN América do Sul (também B2/Wasabi + Bunny) | 40,49 | 162 | 810 | 4.049 |
| AWS CloudFront pay-as-you-go (América do Sul) | 0,00 | 286 | 1.830 | 8.806 |
| AWS CloudFront plano fixo | 15,00 | 15,00 | 15,00 | 2.250 (Premium nível 125 TB; 90 TB) |
| Google Cloud CDN (América do Sul) | 75,55 | 302 | 1.315 | 5.349 |
| DigitalOcean Spaces (excedente de 1 TiB) | 0,00 | 23,28 | 157 | 828 |
| Mux (por minuto entregue) | 0,00 | 0,00 | 832 | 5.136 |
| Hostinger VPS (banda do plano) | incluso no plano | incluso no plano | incluso no plano | estoura banda (90 TB) |

Notas da Tabela 4:

- **Cloudflare R2:** egress zero. Custos residuais: operações classe B (US$ 0,36 por milhão, só em cache miss) e Workers para validar token (US$ 5/mês fixo + US$ 0,30 por milhão acima de 10 M). No pior caso (5.000 alunos, 18 milhões de segmentos/mês sem cache nenhum) somaria cerca de US$ 3 de classe B e US$ 2,40 de Workers. Só os Workers entram na Tabela 5 (S4: fixo de US$ 7,40); a classe B (cerca de US$ 2,88 no pior caso sem cache) não foi somada.
- **Bunny:** a mesma linha vale para Bunny Stream, Bunny Storage + CDN, B2 + Bunny CDN e Wasabi + Bunny CDN (o egress da origem para a Bunny é grátis no B2 e no Bunny Storage). Se a rede Volume da Bunny (US$ 0,005/GB, 10 PoPs) atender bem o Brasil, a entrega cairia para 1/9 do valor mostrado; **não confirmamos se há PoP da rede Volume na América do Sul** (pendência).
- **CloudFront pay-as-you-go:** já desconta o 1 TB grátis e inclui requisições acima de 10 milhões (US$ 0,022 por 10 mil).
- **CloudFront plano fixo:** Pro US$ 15 enquanto a conta ficar abaixo de 10 milhões de requisições e 50 TB; acima disso, Business US$ 200 (125 M req). Em 5.000 alunos com 4K (90 TB) seria necessário o Premium configurado acima de 50 TB; o preço é publicado (75 TB US$ 1.450; 125 TB US$ 2.250; 200 TB US$ 3.500; 350 TB US$ 6.000; 600 TB US$ 10.000), e 90 TB cabem no nível de 125 TB, **US$ 2.250/mês**.
- **Google Cloud CDN:** preço por GiB convertido do volume em GB; inclui lookup de cache (US$ 0,0075 por 10 mil). Não inclui cache fill (US$ 0,01 a 0,04/GiB sobre o que sai da origem), que acrescenta pouco.
- **DigitalOcean Spaces:** os US$ 5 da assinatura (contados na Tabela 2) já incluem 1 TiB de saída; aqui só o excedente a US$ 0,01/GiB. É a opção "simples" mais barata por GB entregue entre os object storages com CDN embutida, mas não tem região no Brasil.
- **Mux:** 100 mil minutos grátis por mês cobrem até cerca de 277 alunos a 6 h. Acima disso, cobrança por minuto.
- **Hostinger VPS:** banda inclusa até 8/16/32 TB conforme o plano, mas há três limites práticos: a porta de 1 Gbps (pico estimado de 160 streams simultâneos com 5.000 alunos, perto do limite), a falta de CDN (todo aluno baixa do mesmo servidor, latência maior e risco de derrubar o app junto) e o disco (Tabela 2). Com 5.000 alunos em 1080p (52 TB) a banda do maior plano estoura.
- **Backblaze B2 direto, sem CDN (alternativa não tabelada):** o egress grátis de 3x o armazenado é grande. Com 1.000 h em 1080p (3,7 TB) o B2 libera 11,2 TB/mês grátis, suficiente para 1.000 alunos (10,3 TB). Com 5.000 alunos, pagaria 40,5 TB x US$ 0,01 = US$ 405/mês. Desvantagens: sem cache de borda no Brasil (B2 tem regiões só nos EUA, Canadá e Europa), latência maior e controle de acesso mais trabalhoso.

### A2.6. Tabela 5: custo total mensal e acumulado (12, 24, 36 meses)

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

Mux: a coluna "Fixo" desconta o crédito de uso de US$ 20/mês do pay-as-you-go (documentação oficial de preços), limitado ao valor usado. O crédito é um só por conta e é dividido com a live no Mux, se houver. A coluna "Domina" do Mux considera o uso antes do crédito.

##### S0: Hoje: 30 h, 50 alunos, 1080p

| Pilha | Armazen. /mês | Entrega /mês | Fixo /mês | Transcode (1x) | Total /mês USD | Total /mês R$ | Acum. 12 m USD | Acum. 24 m USD | Acum. 36 m USD | Acum. 36 m R$ | Domina |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Cloudflare R2 + FFmpeg próprio | 1,53 | 0,00 | 5,00 | 1,19 | **6,53** | 32,85 | 79,56 | 158 | 236 | 1.189 | fixo (77%) |
| Cloudflare Stream | 10,00 | 18,00 | 0,00 | 0,00 | **28,00** | 140,84 | 336 | 672 | 1.008 | 5.070 | entrega (64%) |
| Bunny Stream | 1,12 | 23,27 | 0,00 | 0,00 | **24,39** | 123 | 293 | 585 | 878 | 4.416 | entrega (95%) |
| Mux (basic) | 5,40 | 0,00 | -5,40 (crédito) | 0,00 | **0,00** | 0,00 | 0,00 | 0 | 0 | 0 | armazenamento (100%, coberto pelo crédito) |
| AWS S3 + CloudFront PAYG + MediaConvert | 2,58 | 0,00 | 0,00 | 67,50 | **2,58** | 12,96 | 98,43 | 129 | 160 | 806 | armazenamento (100%) |
| AWS S3 + CloudFront plano fixo + MediaConvert | 1,43 | 15,00 | 0,00 | 67,50 | **16,43** | 82,63 | 265 | 462 | 659 | 3.314 | entrega (91%) |
| Backblaze B2 + Bunny CDN + FFmpeg | 0,71 | 23,27 | 0,00 | 1,19 | **23,98** | 121 | 289 | 577 | 864 | 4.348 | entrega (97%) |
| Google GCS + Cloud CDN + Transcoder | 2,09 | 43,47 | 0,00 | 135 | **45,56** | 229 | 682 | 1.228 | 1.775 | 8.929 | entrega (95%) |
| Hostinger VPS único + FFmpeg (KVM 4 (renovação)) | 28,99 | 0,00 | 0,00 | 1,19 | **28,99** | 146 | 349 | 697 | 1.045 | 5.256 | plano fixo (VPS) |

##### S1: 100 h, 50 alunos, 720p

| Pilha | Armazen. /mês | Entrega /mês | Fixo /mês | Transcode (1x) | Total /mês USD | Total /mês R$ | Acum. 12 m USD | Acum. 24 m USD | Acum. 36 m USD | Acum. 36 m R$ | Domina |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Cloudflare R2 + FFmpeg próprio | 2,08 | 0,00 | 5,00 | 2,38 | **7,08** | 35,60 | 87,31 | 172 | 257 | 1.294 | fixo (71%) |
| Cloudflare Stream | 30,00 | 18,00 | 0,00 | 0,00 | **48,00** | 241 | 576 | 1.152 | 1.728 | 8.692 | armazenamento (62%) |
| Bunny Stream | 1,49 | 13,64 | 0,00 | 0,00 | **15,12** | 76,07 | 181 | 363 | 544 | 2.739 | entrega (90%) |
| Mux (basic) | 14,40 | 0,00 | -14,40 (crédito) | 0,00 | **0,00** | 0,00 | 0 | 0 | 0 | 0 | armazenamento (100%, coberto pelo crédito) |
| AWS S3 + CloudFront PAYG + MediaConvert | 3,42 | 0,00 | 0,00 | 135 | **3,42** | 17,18 | 176 | 217 | 258 | 1.298 | armazenamento (100%) |
| AWS S3 + CloudFront plano fixo + MediaConvert | 2,27 | 15,00 | 0,00 | 135 | **17,27** | 86,85 | 342 | 549 | 757 | 3.805 | entrega (87%) |
| Backblaze B2 + Bunny CDN + FFmpeg | 0,96 | 13,64 | 0,00 | 2,38 | **14,60** | 73,44 | 178 | 353 | 528 | 2.656 | entrega (93%) |
| Google GCS + Cloud CDN + Transcoder | 2,77 | 25,54 | 0,00 | 270 | **28,31** | 142 | 610 | 949 | 1.289 | 6.482 | entrega (90%) |
| Hostinger VPS único + FFmpeg (KVM 4 (renovação)) | 28,99 | 0,00 | 0,00 | 2,38 | **28,99** | 146 | 350 | 698 | 1.046 | 5.261 | plano fixo (VPS) |

##### S2: 300 h, 200 alunos, 1080p

| Pilha | Armazen. /mês | Entrega /mês | Fixo /mês | Transcode (1x) | Total /mês USD | Total /mês R$ | Acum. 12 m USD | Acum. 24 m USD | Acum. 36 m USD | Acum. 36 m R$ | Domina |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Cloudflare R2 + FFmpeg próprio | 16,66 | 0,00 | 5,00 | 11,91 | **21,66** | 109 | 272 | 532 | 792 | 3.982 | armazenamento (77%) |
| Cloudflare Stream | 90,00 | 72,00 | 0,00 | 0,00 | **162** | 815 | 1.944 | 3.888 | 5.832 | 29.335 | armazenamento (56%) |
| Bunny Stream | 11,21 | 93,07 | 0,00 | 0,00 | **104** | 524 | 1.251 | 2.503 | 3.754 | 18.882 | entrega (89%) |
| Mux (basic) | 54,00 | 0,00 | -20,00 (crédito) | 0,00 | **34,00** | 171 | 408 | 816 | 1.224 | 6.157 | armazenamento (100%) |
| AWS S3 + CloudFront PAYG + MediaConvert | 25,77 | 118 | 0,00 | 675 | **143** | 721 | 2.394 | 4.114 | 5.833 | 29.339 | entrega (82%) |
| AWS S3 + CloudFront plano fixo + MediaConvert | 24,62 | 15,00 | 0,00 | 675 | **39,62** | 199 | 1.150 | 1.626 | 2.101 | 10.570 | armazenamento (62%) |
| Backblaze B2 + Bunny CDN + FFmpeg | 7,72 | 93,07 | 0,00 | 11,91 | **101** | 507 | 1.221 | 2.431 | 3.640 | 18.310 | entrega (92%) |
| Google GCS + Cloud CDN + Transcoder | 20,87 | 174 | 0,00 | 1.350 | **195** | 980 | 3.687 | 6.024 | 8.362 | 42.059 | entrega (89%) |
| Hostinger VPS único + FFmpeg | não comporta | | | | | | | | | | |

##### S3: 1.000 h, 1.000 alunos, 1080p

| Pilha | Armazen. /mês | Entrega /mês | Fixo /mês | Transcode (1x) | Total /mês USD | Total /mês R$ | Acum. 12 m USD | Acum. 24 m USD | Acum. 36 m USD | Acum. 36 m R$ | Domina |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Cloudflare R2 + FFmpeg próprio | 55,88 | 0,00 | 5,00 | 39,71 | **60,88** | 306 | 770 | 1.501 | 2.231 | 11.223 | armazenamento (92%) |
| Cloudflare Stream | 300 | 360 | 0,00 | 0,00 | **660** | 3.320 | 7.920 | 15.840 | 23.760 | 119.513 | entrega (55%) |
| Bunny Stream | 37,35 | 465 | 0,00 | 0,00 | **503** | 2.529 | 6.032 | 12.065 | 18.097 | 91.028 | entrega (93%) |
| Mux (basic) | 179 | 260 | -20,00 (crédito) | 0,00 | **419** | 2.108 | 5.028 | 10.056 | 15.084 | 75.873 | entrega (59%) |
| AWS S3 + CloudFront PAYG + MediaConvert | 85,91 | 1.026 | 0,00 | 1.810 | **1.112** | 5.592 | 15.151 | 28.491 | 41.832 | 210.413 | entrega (92%) |
| AWS S3 + CloudFront plano fixo + MediaConvert | 84,75 | 15,00 | 0,00 | 1.810 | **99,75** | 502 | 3.007 | 4.204 | 5.401 | 27.168 | armazenamento (85%) |
| Backblaze B2 + Bunny CDN + FFmpeg | 25,89 | 465 | 0,00 | 39,71 | **491** | 2.471 | 5.935 | 11.829 | 17.724 | 89.152 | entrega (95%) |
| Google GCS + Cloud CDN + Transcoder | 69,57 | 869 | 0,00 | 4.500 | **939** | 4.723 | 15.769 | 27.037 | 38.306 | 192.677 | entrega (93%) |
| Hostinger VPS único + FFmpeg | não comporta | | | | | | | | | | |

##### S4: 1.000 h, 5.000 alunos, 1080p

| Pilha | Armazen. /mês | Entrega /mês | Fixo /mês | Transcode (1x) | Total /mês USD | Total /mês R$ | Acum. 12 m USD | Acum. 24 m USD | Acum. 36 m USD | Acum. 36 m R$ | Domina |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Cloudflare R2 + FFmpeg próprio | 55,88 | 0,00 | 7,40 | 39,71 | **63,27** | 318 | 799 | 1.558 | 2.318 | 11.658 | armazenamento (88%) |
| Cloudflare Stream | 300 | 1.800 | 0,00 | 0,00 | **2.100** | 10.563 | 25.200 | 50.400 | 75.600 | 380.268 | entrega (86%) |
| Bunny Stream | 37,35 | 2.327 | 0,00 | 0,00 | **2.364** | 11.891 | 28.369 | 56.738 | 85.107 | 428.087 | entrega (98%) |
| Mux (basic) | 179 | 1.605 | -20,00 (crédito) | 0,00 | **1.764** | 8.873 | 21.168 | 42.336 | 63.504 | 319.425 | entrega (90%) |
| AWS S3 + CloudFront PAYG + MediaConvert | 85,91 | 5.361 | 0,00 | 1.810 | **5.447** | 27.398 | 67.173 | 132.537 | 197.900 | 995.439 | entrega (98%) |
| AWS S3 + CloudFront plano fixo + MediaConvert (franquia 50 TB levemente excedida) | 62,91 | 200 | 0,00 | 1.810 | **263** | 1.322 | 4.965 | 8.120 | 11.275 | 56.711 | entrega (76%) |
| Backblaze B2 + Bunny CDN + FFmpeg | 25,89 | 2.327 | 0,00 | 39,71 | **2.353** | 11.834 | 28.271 | 56.502 | 84.734 | 426.211 | entrega (99%) |
| Google GCS + Cloud CDN + Transcoder | 69,57 | 3.210 | 0,00 | 4.500 | **3.280** | 16.496 | 43.854 | 83.208 | 122.562 | 616.489 | entrega (98%) |
| Hostinger VPS único + FFmpeg | não comporta | | | | | | | | | | |

##### S5: 300 h, 200 alunos, 4K

| Pilha | Armazen. /mês | Entrega /mês | Fixo /mês | Transcode (1x) | Total /mês USD | Total /mês R$ | Acum. 12 m USD | Acum. 24 m USD | Acum. 36 m USD | Acum. 36 m R$ | Domina |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Cloudflare R2 + FFmpeg próprio | 47,03 | 0,00 | 5,00 | 47,65 | **52,03** | 262 | 672 | 1.296 | 1.921 | 9.662 | armazenamento (90%) |
| Cloudflare Stream (entrega máx. 1080p) | 90,00 | 72,00 | 0,00 | 0,00 | **162** | 815 | 1.944 | 3.888 | 5.832 | 29.335 | armazenamento (56%) |
| Bunny Stream | 31,46 | 162 | 0,00 | 0,00 | **193** | 973 | 2.321 | 4.642 | 6.963 | 35.023 | entrega (84%) |
| Mux (basic) | 173 | 0,00 | -20,00 (crédito) | 0,00 | **153** | 769 | 1.834 | 3.667 | 5.501 | 27.669 | armazenamento (100%) |
| AWS S3 + CloudFront PAYG + MediaConvert | 72,35 | 286 | 0,00 | 1.079 | **358** | 1.802 | 5.378 | 9.677 | 13.976 | 70.297 | entrega (80%) |
| AWS S3 + CloudFront plano fixo + MediaConvert | 71,20 | 15,00 | 0,00 | 1.079 | **86,20** | 434 | 2.113 | 3.147 | 4.182 | 21.034 | armazenamento (83%) |
| Backblaze B2 + Bunny CDN + FFmpeg | 21,79 | 162 | 0,00 | 47,65 | **184** | 924 | 2.253 | 4.458 | 6.663 | 33.513 | entrega (88%) |
| Google GCS + Cloud CDN + Transcoder | 58,59 | 302 | 0,00 | 2.430 | **361** | 1.815 | 6.759 | 11.089 | 15.418 | 77.552 | entrega (84%) |
| Hostinger VPS único + FFmpeg | não comporta | | | | | | | | | | |

##### S6: 1.000 h, 1.000 alunos, 4K

| Pilha | Armazen. /mês | Entrega /mês | Fixo /mês | Transcode (1x) | Total /mês USD | Total /mês R$ | Acum. 12 m USD | Acum. 24 m USD | Acum. 36 m USD | Acum. 36 m R$ | Domina |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Cloudflare R2 + FFmpeg próprio | 157 | 0,00 | 5,00 | 159 | **162** | 815 | 2.104 | 4.050 | 5.995 | 30.157 | armazenamento (97%) |
| Cloudflare Stream (entrega máx. 1080p) | 300 | 360 | 0,00 | 0,00 | **660** | 3.320 | 7.920 | 15.840 | 23.760 | 119.513 | entrega (55%) |
| Bunny Stream | 105 | 810 | 0,00 | 0,00 | **915** | 4.601 | 10.976 | 21.952 | 32.927 | 165.624 | entrega (89%) |
| Mux (basic) | 573 | 832 | -20,00 (crédito) | 0,00 | **1.385** | 6.966 | 16.618 | 33.235 | 49.853 | 250.760 | entrega (59%) |
| AWS S3 + CloudFront PAYG + MediaConvert | 241 | 1.830 | 0,00 | 3.082 | **2.071** | 10.416 | 27.930 | 52.778 | 77.627 | 390.462 | entrega (88%) |
| AWS S3 + CloudFront plano fixo + MediaConvert | 240 | 15,00 | 0,00 | 3.082 | **255** | 1.283 | 6.142 | 9.202 | 12.262 | 61.679 | armazenamento (94%) |
| Backblaze B2 + Bunny CDN + FFmpeg | 72,80 | 810 | 0,00 | 159 | **883** | 4.439 | 10.750 | 21.341 | 31.932 | 160.620 | entrega (92%) |
| Google GCS + Cloud CDN + Transcoder | 195 | 1.315 | 0,00 | 8.100 | **1.511** | 7.599 | 26.228 | 44.357 | 62.485 | 314.299 | entrega (87%) |
| Hostinger VPS único + FFmpeg | não comporta | | | | | | | | | | |
### A2.7. Conclusão: qual componente domina

#### A2.7.1 Veredito sobre a hipótese dos sócios

**Refutada para o caso geral, confirmada em dois casos específicos.**

| Cenário | Provedores com entrega por GB (Bunny, B2+Bunny, AWS pay-as-you-go, Google) | Provedores por minuto (Mux, Cloudflare Stream) | R2 e AWS plano fixo |
|---|---|---|---|
| S0 hoje (30 h, 50 alunos, 1080p) | Entrega domina (95% a 97%), exceto AWS pay-as-you-go, que cabe no 1 TB grátis | Mux: armazenamento (entrega grátis até 100 mil min); Stream: entrega (64%) | Fixos (Workers, plano Pro) dominam; tudo abaixo de US$ 17 |
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
4. **O transcoding pode ser o maior gasto do primeiro ano** nas pilhas AWS e Google: no S3, o Google Transcoder custa US$ 4.500 uma vez, contra US$ 70/mês de armazenamento. Com FFmpeg próprio ou serviços com encoding grátis, esse item desaparece.
5. **O custo por aluno é baixo em qualquer cenário em relação ao ticket:** em 1080p, entrega por aluno/mês = US$ 0 (R2), US$ 0,36 (Mux e Stream, após franquia), US$ 0,47 (Bunny, R$ 2,34), US$ 0,87 (Google), US$ 1,14 (AWS pay-as-you-go, R$ 5,72). Contra um curso de R$ 2.000 ou uma assinatura mensal, a infraestrutura de vídeo não ameaça a margem; o risco real é escolher uma pilha cara e ficar preso nela ao escalar.

#### A2.7.2 Ponto de virada: a partir de quantos alunos a entrega passa o armazenamento (1080p)

Fórmula: entrega mensal = armazenamento mensal quando N alunos = custo de armazenamento por hora de acervo x H horas / custo de entrega por aluno.

| Provedor | Armazenamento por hora de acervo/mês | Entrega por aluno/mês | Virada (N alunos para H horas de acervo) | Exemplo com 300 h |
|---|---|---|---|---|
| Bunny Stream | US$ 0,037 | US$ 0,465 | N = 0,08 x H | 24 alunos |
| B2 + Bunny CDN | US$ 0,026 | US$ 0,465 | N = 0,056 x H | 17 alunos |
| Google GCS + Cloud CDN | US$ 0,070 | US$ 0,87 | N = 0,08 x H | 24 alunos |
| AWS S3 + CloudFront pay-as-you-go | US$ 0,086 | US$ 1,14 (após 1 TB grátis, cerca de 97 alunos) | N = 97 + 0,076 x H | 120 alunos |
| Mux (basic) | US$ 0,18 | US$ 0,36 (após 100 mil min grátis, cerca de 277 alunos) | N = 277 + 0,5 x H | 427 alunos |
| Cloudflare Stream | US$ 0,30 | US$ 0,36 | N = 0,83 x H | 250 alunos |
| Cloudflare R2 | US$ 0,056 | US$ 0 | nunca | nunca |
| AWS CloudFront plano fixo Pro | US$ 0,086 | US$ 15 fixos até cerca de 2.700 alunos | armazenamento passa os US$ 15 com cerca de 190 h | n/a |

#### A2.7.3 Onde o custo "dá degrau"

| Degrau | Onde acontece | Efeito |
|---|---|---|
| Fim do free tier do Mux | 100 mil min entregues/mês, cerca de **277 alunos** a 6 h/mês | Entrega passa de US$ 0 para US$ 0,001/min (1080p) |
| Fim do free tier do CloudFront pay-as-you-go | 1 TB/mês, cerca de **97 alunos em 1080p** (165 em 720p) | Entrega passa de US$ 0 para US$ 0,11/GB |
| CloudFront plano fixo Pro para Business | 10 milhões de requisições/mês, cerca de **2.700 alunos** com segmentos de 6 s (4.600 com segmentos de 10 s) | De US$ 15 para US$ 200/mês |
| CloudFront plano fixo acima de 50 TB | cerca de **4.800 alunos em 1080p** ou 2.800 em 4K | Exige Premium configurado acima de 50 TB, com preço publicado: 75 TB US$ 1.450; 125 TB US$ 2.250; 200 TB US$ 3.500; 350 TB US$ 6.000; 600 TB US$ 10.000 |
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

#### A2.7.4 Recomendação de custo para o consolidador

- **Enxuto (agora até cerca de 300 h e 200 alunos):** qualquer opção gerenciada cabe em menos de US$ 165/mês. Bunny Stream (US$ 15 a 104/mês nos cenários S1 e S2) ou Mux basic (US$ 0 a 34/mês com o crédito de US$ 20/mês, entrega grátis até 277 alunos) são as que exigem menos engenharia. R2 + FFmpeg custa menos ainda (US$ 7 a 22/mês), mas exige montar o pipeline.
- **Recomendado (crescimento até milhares de alunos):** R2 + cache Cloudflare + FFmpeg próprio, com a esteira de encoding rodando num VPS separado do app. Custo praticamente insensível ao número de alunos: US$ 61 a 63/mês com 1.000 h de acervo, de 1.000 a 5.000 alunos.
- **Alternativa "nuvem grande":** AWS S3 + CloudFront plano fixo. US$ 100 a 263/mês nos cenários grandes, previsível, com URLs assinadas e WAF, mas com risco de "ajuste de entrega" se a franquia for excedida de forma sustentada e com MediaConvert caro no encoding (trocar por FFmpeg próprio reduz o custo único).
- **Evitar para este caso:** Hostinger VPS como armazenamento e entrega de vídeo (não escala no disco nem na banda, e coloca app e vídeo no mesmo ponto de falha); Google Transcoder e AWS pay-as-you-go sem plano fixo (os mais caros em quase todos os cenários); Wasabi como origem.
- **4K:** em qualquer provedor, o teto 4K custa cerca de 2,6 a 3,2 vezes o 1080p na conta mensal (exceto R2 e AWS fixo, em que só o armazenamento cresce). Para aula de professor com slides, o benefício visual é pequeno; a decisão de qualidade é do item 3 do Agente A, mas o custo do degrau está mostrado aqui.

> **Nota do editor:** A recomendação "Recomendado" acima é só de custo. Para a arquitetura inicial prevalece o veredito do item 8 (Mux + masters em R2); R2 + FFmpeg próprio é o alvo da fase 3. Ver C5.

### A2.8. Blocos JSON para a calculadora

#### parametros_calculadora

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
        {"nome": "Premium", "usd_mes": 1000, "dados_tb": 50, "requisicoes": 500000000, "credito_s3_gb": 5000, "configuravel_ate_tb": 600, "niveis_acima_50tb": [{"dados_tb": 75, "usd_mes": 1450}, {"dados_tb": 125, "usd_mes": 2250}, {"dados_tb": 200, "usd_mes": 3500}, {"dados_tb": 350, "usd_mes": 6000}, {"dados_tb": 600, "usd_mes": 10000}]}
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
      "free_tier": "100.000 min entregues por mes; credito de uso de US$ 20/mes no pay-as-you-go (documentacao oficial), um por conta, dividido entre VOD e live",
      "observacoes": "Basic tem cobranca minima de 1 mes de armazenamento por ativo. Calculadora deve usar a resolucao do teto do ladder."
    }
  }
}
```

#### premissas

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

## 3. Qualidade: resolução, bitrate e codec

Fonte principal: parte A1, seção 3.

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

> **Nota do editor:** O benchmark de custos (item 2) usa bitrates mais altos (720p 2,5 Mbps; 1080p 5 Mbps total; 2,25 GB/h no topo; 3,74 GB por hora de acervo). Para custo prevalece o benchmark (conservador); para configurar o encoder, esta proposta. Ver C1 e C2.

### 3.3 Codec: H.264 vs H.265 (HEVC) vs AV1

| Critério | H.264 | HEVC | AV1 |
|---|---|---|---|
| Suporte em navegador | Universal | Parcial: Chrome a partir da versão 107 e Firefox a partir da 137 marcados como parciais (dependem de decodificador do sistema); Safari completo; Samsung Internet completo | Chrome 70+, Firefox 67+, Edge 121+, Samsung Internet 12+; Safari só parcial (17+), com decodificação em hardware (exemplo da Apple: iPhone 15 Pro) (estimativa, não verificada) |
| Economia de bitrate | Base | Cerca de 20% a 26% a menos nos degraus 720p e 1080p da ladder da Apple (1080p 5.800 vs 7.800 kbps, 25,6%; 4.500 vs 6.000, 25%; 720p 3.400 vs 4.500, 24%; 2.400 vs 3.000, 20%) | Geralmente maior que HEVC (sem fonte oficial nesta pesquisa; estimativa da literatura) |
| Custo de codificar | Baixo | Médio | Alto (lento em CPU) |
| Exigência na Apple | "Algum conteúdo SHOULD ser H.264" (item 1.12) | Aceito | Aceito em fMP4 (item 1.39); "desde 2025" (estimativa, não verificada) |

Brasil: em setembro de 2026, 78,78% dos celulares são Android e 21,21% iOS (StatCounter). A base Android é muito heterogênea em hardware; H.264 é o único codec com decodificação garantida em todos.

**Recomendação de codec:** só H.264 no MVP. Uma segunda ladder (AV1 ou HEVC) dobra a contagem de renditions armazenadas e só compensa quando o egress mensal passar a ser a maior linha da conta. Nos gerenciados, essa decisão é do fornecedor (ex.: Bunny cobra premium encoding por codec de saída, US$ 0,05/min por codec em HD).

### 3.4 Veredito sobre 4K (Rib quer, Pedro acha que não)

**4K não faz sentido para o IAE agora.** Evidências:
1. Conteúdo: aula de professor falando com slide. O detalhe que importa é texto do slide; slide em 1080p (1920 x 1080) tem resolução igual à de um projetor ou monitor Full HD comum. A própria Apple define a variante padrão da playlist (a primeira, ponto de partida do player) em 2.000 kbps (540p), item 1.32 da especificação.
2. Custo: no Mux, entrega 2160p custa US$ 0,0032/min contra US$ 0,0010/min em 1080p (3,2 vezes); armazenamento US$ 0,0096 contra US$ 0,003/min (3,2 vezes); encoding Plus US$ 0,10 contra US$ 0,03125/min. Por GB (Bunny, R2 + CDN), o tráfego por hora assistida sobe 3,2 a 4,6 vezes.
3. Público: 79% Android, muito acesso por celular e notebook; tela de celular não mostra diferença entre 1080p e 4K a distância normal. Aula de 3 horas em 4K também pesa no plano de dados do aluno.
4. Captura: 4K na entrega só faz sentido se a gravação for 4K com boa luz e lente; aula presencial gravada ou chamada de vídeo raramente entrega isso. Lives via Zoom/Meet saem em 720p ou 1080p no máximo, e o Mux limita live a 1080p.
5. Possível exceção: **1440p para tela compartilhada** com planilha ou documento de letra miúda (ex.: aula de orçamento do jurídico mostrando Excel). Mesmo aí a solução melhor é o professor dar zoom na tela.

Proposta para conciliar os sócios (ideia do Pedro, viável tecnicamente): **gravar e guardar o master na maior resolução que a câmera der** (custo pequeno, só armazenamento), **entregar até 1080p**, e deixar 1440p/4K como degrau habilitável depois. No Mux isso é literal: `max_resolution_tier` no upload (1080p, 1440p ou 2160p) e `max-auto-resolution` no Mux Player para limitar o que é entregue por faixa de preço. A calculadora da proposta pode mostrar o custo de cada degrau.

## 4. Lives (aula ao vivo)

Fonte principal: parte A3, seções 2 a 7 e 9. As subseções mantêm a numeração original da parte A3, com o prefixo "A3." (por exemplo, "ver 8.3" significa "A3.8.3", no item 5 deste arquivo).

### A3.2. Dois modelos de live

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

### A3.3. Opções avaliadas, uma a uma

#### A3.3.1 Zoom (Workplace Pro/Business, Webinars, API)

- **Preço (zoom.us/pricing):** Pro US$ 16,99/mês por licença (anual US$ 14,16/mês), 100 participantes, reunião de até 30 h, 10 GB de gravação em nuvem por licença. Business US$ 21,99/mês (anual US$ 18,33), **300 participantes**. Large Meeting add-on leva a 1.000 participantes, mas o preço não aparece na página.
- **Webinars (zoom.us/pricing/webinar):** a página mostra um único preço, US$ 89/mês (anual US$ 66,67/mês), e diz que o preço varia por capacidade de público. A capacidade correspondente a esse preço não aparece. **Faixas de 100/500/1.000 não verificadas.**
- **Desconto para sem fins lucrativos (zoom.us/pricing/developer, FAQ):** entidades verificadas têm **50% de desconto** em Workplace Pro, Business, Webinars e Large Meetings. O IAE é instituição sem fins lucrativos, mas precisa passar pela verificação (TechSoup ou equivalente).
- **Gravação automática na plataforma (Context7, doc oficial Zoom):** o webhook `recording.completed` traz `recording_files[]` com `download_url`, `file_type` (MP4, M4A, VTT de transcrição, chat), `recording_type` (ex.: `shared_screen_with_speaker_view`) e um `download_token`. **O token vale só 24 h**: o nosso backend (FastAPI) precisa baixar o arquivo assim que o evento chegar e enviar para o pipeline de VOD. Também existe API REST para listar e apagar gravações, o que permite liberar a cota de 10 GB.
- **Chat:** nativo, e o arquivo de chat também vem no webhook.
- **Qualidade:** boa e estável. Gravação em nuvem costuma sair em 720p a 1080p, dependendo da conta (não verificado nesta pesquisa).
- **Risco:** baixo de queda. A experiência é fora da plataforma (o aluno sai do site para o Zoom), e o link pode ser repassado. Mitigação: inscrição obrigatória com link único por aluno, sala de espera, desativar gravação local de participantes. Dependência de fornecedor: média. Trocar depois exige só mudar a origem do arquivo gravado.
- **Embutir na plataforma:** possível com Zoom Meeting SDK ou Video SDK. A página de preços para desenvolvedor não informa o valor por minuto do Video SDK (não verificado).

#### A3.3.2 Google Meet (Workspace)

- **Preço (workspace.google.com/pricing, exibido em R$):** Business Standard R$ 81,80/usuário/mês (anual), Meet com 150 participantes e gravação no Drive. Business Plus R$ 128,40, 500 participantes. Starter (R$ 40,90) **não grava**. Enterprise: 1.000 participantes e transmissão ao vivo só dentro do domínio.
- **Gravação:** vai para o Drive do organizador. Publicar automaticamente na plataforma exige a Meet REST API ou a Drive API (não verificado via Context7 nesta pesquisa). É mais trabalhoso que o webhook do Zoom.
- **Risco:** não embute na plataforma e não tem webinar de verdade. Bom se o IAE já usa Google Workspace (o Google for Nonprofits pode zerar a licença, não verificado).
- **Veredito:** viável, mas inferior ao Zoom para este caso.

#### A3.3.3 Jitsi auto-hospedado

- **Requisitos (jitsi.github.io handbook):** servidor com 4 núcleos dedicados e 8 GB de RAM. A rede é o item mais crítico: cerca de 2,5 Mbit/s por fluxo de 720p, e um link de 1 Gbit/s serve para um servidor pequeno. **Gravação exige Jibri**: uma instância por gravação simultânea, com no mínimo 8 GB de RAM para 720p e SSD, e o Jibri **não deve rodar no mesmo servidor** do Jitsi.
- **Custo:** duas VPS (Jitsi+JVB e Jibri). **Estimativa** de US$ 30 a 60/mês (R$ 150 a 300) em VPS de 4 a 8 vCPU. Preço Hostinger não verificado nesta pesquisa.
- **Risco: alto.** Se a VPS cair, a aula cai e a culpa é nossa. Recomenda CPU dedicada e não compartilhada (a VPS Hostinger é compartilhada). A gravação falha silenciosamente se faltar memória ou disco. Escalar para 200+ pessoas exige vários JVB e conhecimento de OCTO, que o próprio handbook desaconselha para administrador inexperiente.
- **Veredito:** não recomendado. Troca dinheiro pouco por risco operacional alto, exatamente onde a equipe tem menos experiência.

> **Nota do editor:** Com os preços da parte A2, duas VPS Hostinger KVM 4 (Jitsi e Jibri) custam US$ 57,98/mês na renovação, dentro desta estimativa. A VPS Hostinger tem CPU compartilhada, o que o handbook desaconselha. Ver C9.

#### A3.3.4 Daily.co

- **Preço (daily.co/pricing/video-sdk):** 10.000 minutos-participante grátis por mês. Vídeo a US$ 0,0040/min-participante (10.001 a 100.000), US$ 0,0037 (100k a 500k), caindo até US$ 0,0015 acima de 50M. Gravação em nuvem US$ 0,01349 por minuto gravado (relógio, não por participante). Streaming RTMP US$ 0,015/min codificado, HLS US$ 0,03/min. Transcrição pós-aula US$ 0,0043/min.
- **Limite de participantes por chamada:** não informado na página.
- **Gravação automática (Context7, doc Daily REST API):** `POST /rooms/{room}/recordings/start` (com `maxDuration`, layout, bitrate). Webhooks `recording.started` e `recording.ready-to-download` (traz `recording_id`, `duration`, `s3_key`). `GET /recordings/{id}/access-link` gera link temporário de 15 min a 12 h. A sala aceita `recordings_bucket`, ou seja, **grava direto no nosso bucket S3**.
- **Chat:** `enable_chat` e chat avançado no Prebuilt. Também é possível fazer chat próprio por app-message.
- **Risco:** baixo. Empresa madura, SDK estável, Prebuilt pronto para embutir (iframe).
- **Veredito:** ótima DX, mas é a mais cara por participante. Boa alternativa ao LiveKit se quisermos o Prebuilt pronto.

#### A3.3.5 100ms

- **Preço (100ms.live/pricing):** videoconferência com 10.000 min grátis, depois US$ 0,004/min por participante. **Live streaming (HLS) com 10.000 min grátis, depois US$ 0,0012/min por espectador.** Gravação com 300 min grátis, depois US$ 0,0135/min. Limite máximo de participantes não informado.
- **Ponto forte:** o modo HLS barateia a plateia grande e mantém os professores em WebRTC.
- **Risco:** fornecedor menor que Daily e LiveKit, com foco no mercado indiano. Gravação, webhooks e chat existem, mas não foram verificados via Context7 nesta pesquisa.

#### A3.3.6 LiveKit (Cloud e auto-hospedado)

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

> **Nota do editor:** A Hostinger não vende object storage (verificado na parte A2). Onde este texto cita "Hostinger Object Storage" como destino do Egress, ler R2 ou B2. Ver C9.

#### A3.3.7 Mux Live

- **Preço (mux.com/pricing/video e /pricing/live):** codificação ao vivo 1080p Plus US$ 0,03125/min de entrada. A página de live cita "Plus a partir de US$ 0,025/min para 720p". Entrega US$ 0,0008/min (720p) ou US$ 0,001/min (1080p), com **100.000 min de entrega grátis por mês**. Armazenamento da gravação US$ 0,003/min/mês. Simulcast US$ 0,02/min por destino. Plano pay-as-you-go com crédito de US$ 20/mês. Launch US$ 20/mês com US$ 100 de crédito.
- **Gravação automática (mux.com/docs, start-live-streaming):** cada transmissão vira um Asset ("Active Asset"). No fim, o evento `video.asset.live_stream_completed` troca o playback para VOD. Latência padrão de cerca de 30 s, "reduced" 10 a 15 s, "low" a partir de 5 s. **Desconecta automaticamente após 12 h.**
- **Risco:** baixo. Só transmite, então precisa de OBS ou de uma sala WebRTC exportando RTMP. Chat é por nossa conta.

#### A3.3.8 Cloudflare Stream Live

- **Preço (developers.cloudflare.com/stream/pricing):** ingestão e codificação **grátis**. Armazenamento US$ 5/mês por 1.000 min (pré-pago). Entrega US$ 1 por 1.000 min. A gravação ao vivo entra no armazenamento. Transmissão WebRTC não é gravada, e a cobrança de entrega WebRTC começa em **15/10/2026**.
- **Funcionamento (stream-live):** RTMPS ou SRT, ABR automático, **toda live é gravada** e fica disponível cerca de 60 s depois do fim. Webhooks `live_input.connected`, `live_input.disconnected` e `live_input.errored` (inclusive `ERR_STORAGE_QUOTA_EXHAUSTED`).
- **Risco:** baixo. Mesmo modelo da Mux (só transmite), com chat por nossa conta.

#### A3.3.9 Bunny Stream

- A página oficial de produto (bunny.net/stream) **não menciona live streaming**. Para este projeto, Bunny é opção de VOD (hospedagem das gravações), não de live. Live da Bunny: não verificado.

#### A3.3.10 YouTube Live não listado (fallback)

- **Custo:** zero.
- **Riscos (support.google.com/youtube, respostas 2853700 e 2474026):** canal precisa estar verificado e sem restrição nos últimos 90 dias. Strike bloqueia live por 14 dias. É proibido usar outro canal para contornar. Limite de 10 streams ativos por canal. Vídeo não listado **não tem controle de acesso**: quem tiver o link assiste. Conteúdo do IAE vira refém da política de terceiros (direitos autorais de slides, música de fundo).
- **Uso recomendado:** só fallback de emergência, documentado no runbook.

#### A3.3.11 Vimeo Live

- A página de planos (vimeo.com/upgrade-plan) não carregou o conteúdo de preços via fetch. **Não verificado.** Pelo histórico conhecido, live exige o plano Advanced ou superior, na faixa de **US$ 65 a 75/mês (estimativa)**. Não traz vantagem sobre Mux ou Cloudflare para quem vai construir a plataforma.

---

### A3.4. Custo por hora de live, por número de participantes

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

> **Nota do editor:** Ressalva: hoje (30 h, 50 alunos) o VOD no Mux usa US$ 5,40/mês, coberto pelo crédito de US$ 20/mês (custo efetivo US$ 0), menos que a licença do Zoom (US$ 8,50 a 16,99). A afirmação vale a partir de cerca de 300 h e 200 alunos. Ver C12.

---

### A3.5. Tabela de custo mensal: cenário IAE (4 lives de 3 h, 30 alunos)

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

> **Nota do editor:** O crédito de US$ 20/mês do Mux pay-as-you-go está confirmado na documentação oficial ("Pay-as-you-go: includes a $20 monthly usage credit"). Mux Live no cenário IAE = US$ 4,66 (R$ 23,44) após o crédito. O crédito é um só por conta: se o VOD também estiver no Mux, os dois dividem os US$ 20. Ver C11.

### A3.6. Tabela de custo mensal: cenário crescimento (8 lives de 3 h, 200 alunos)

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
| Daily | 90.000 × 0,004 + 190.880 × 0,0037 = 1.066,26 + gravação 19,43 | 1.085,69 | 5.461,02 |
| 100ms, videoconferência | 280.880 × 0,004 = 1.123,52 + gravação 15,39 | 1.138,91 | 5.728,72 |

Leitura: com 200 alunos por aula, o Zoom continua imbatível em preço (licença fixa), mas a experiência continua fora da plataforma. Entre as soluções embutidas, **streaming (Mux, Cloudflare) custa metade do LiveKit**, porque a banda WebRTC do LiveKit é cobrada por GB. O desenho que equilibra as duas coisas é o **híbrido**: professores e alunos com a palavra no LiveKit (poucas dezenas), e a plateia assistindo por HLS, via Egress RTMP para Mux ou Cloudflare, ou HLS próprio no bucket. Assim o custo fica perto do streaming e a interação perto da videoconferência.

---

### A3.7. Recomendação de lives

#### MVP (até fim de nov/começo de dez de 2026): Zoom Pro integrado

1. Uma licença Zoom Pro em nome do IAE. Pedir o desconto de 50% para sem fins lucrativos.
2. Na plataforma: página da aula ao vivo com botão "Entrar na aula", que gera link de inscrição único por aluno via API de registrants, sala de espera e senha.
3. App OAuth no Zoom Marketplace com webhook `recording.completed`, ligado ao FastAPI. O backend baixa o MP4 e o VTT **em até 24 h** (validade do `download_token`), envia para o pipeline de VOD (o mesmo do Agente A) e cria a aula gravada como rascunho para o admin publicar. Depois apaga do Zoom para não estourar os 10 GB.
4. Transcrição VTT do Zoom (ou Whisper) alimenta busca e agente de IA.

**Esforço estimado:** 3 a 5 dias de desenvolvimento. **Risco:** baixo. **Dependência:** trocável, porque só a origem do arquivo muda.

#### Evolução (fase 2, 2027): LiveKit Cloud embutido, híbrido

1. Sala LiveKit com papéis: professor (publica áudio, vídeo e tela), aluno (só assina; "levantar a mão" promove a publicador) e moderador.
2. Chat próprio (Supabase Realtime ou data channel), salvo no Postgres e exibido ao lado da gravação.
3. Egress Room Composite gravando HLS segmentado direto no object storage do VOD. A gravação vira aula assíncrona sem retranscodificar.
4. Acima de cerca de 100 espectadores por aula: Egress RTMP para Cloudflare Stream ou Mux, com plateia em HLS.
5. Se o volume justificar (custo mensal LiveKit acima de cerca de US$ 500), migrar para LiveKit auto-hospedado numa VPS com CPU dedicada. O front não muda.

**Esforço estimado:** 2 a 3 semanas. **Risco:** médio (UX de sala, testes de rede de alunos).

#### Fallback (sempre): runbook de 1 página

Se o Zoom ou o LiveKit cair, o professor abre o OBS e transmite para Cloudflare Stream Live (chave pré-cadastrada) ou YouTube não listado. A plataforma mostra um banner com o link. A gravação é recuperada pelo webhook do Cloudflare ou subida manualmente.

#### Por que não as outras

- **Jitsi:** risco operacional alto na área em que a equipe é mais fraca.
- **Google Meet:** gravação no Drive e sem embutir. Inferior ao Zoom sem ser mais barato.
- **Daily e 100ms:** boas, mas mais caras por participante que o LiveKit e sem a saída open source. A Daily fica como segunda opção se o Prebuilt (iframe pronto) economizar tempo.
- **Mux e Cloudflare sozinhos:** não resolvem a conversa entre dois professores nem a pergunta por voz do aluno.
- **Vimeo:** sem vantagem e preço não verificado.

---
### A3.9. Sinal da comunidade (last30days)

Rodei a skill last30days (v3.21.1) comparando LiveKit, Daily e Zoom para aulas ao vivo, com subreddits WebRTC, webdev, elearning, instructionaldesign e selfhosted. O resultado foi **fraco e pouco relevante**: Reddit parcial (HTTP 429), X só com posts promocionais (um lançamento de streaming "onchain" usando LiveKit) e vagas abertas da LiveKit que reforçam o reposicionamento da empresa para "infraestrutura de agentes de IA". Apareceu um relato de escola de idiomas que dá "teoria em casa e prática ao vivo no Zoom onde todos falam" (r/TEFCanada, 13/10/2026). Esse formato, de aula assíncrona mais encontro síncrono interativo, é o mesmo que o IAE descreveu. Não há sinal recente de quedas ou problemas graves em nenhum dos três provedores. Arquivo bruto: `~/Documents/Last30Days/livekit-raw-v3.md`.

## 5. Proteção de conteúdo

Fonte principal: parte A3, seção 8 (numeração original com prefixo "A3.").

### A3.8. Proteção de conteúdo

#### A3.8.1 Camadas possíveis, do mais barato ao mais caro

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

#### A3.8.2 Detalhes técnicos verificados

- **Cloudflare Stream** (developers.cloudflare.com/stream/viewing-videos/securing-your-stream): `requireSignedURLs`; tokens gerados localmente com signing key (recomendado para volume), via endpoint `/token` ou Workers. Expiração padrão de 1 h e **máximo de 24 h** com signing key. `nbf` (não antes de). Até 5 regras de acesso por token (IP, país, allow/block). Download só se o token tiver `downloadable: true`. **A página não menciona DRM.**
- **Mux** (mux.com/docs/guides/protect-videos-with-drm): signed playback IDs com JWT. **DRM como add-on: US$ 100/mês de acesso mais US$ 0,003 por licença** (uma licença corresponde aproximadamente a uma reprodução). Widevine e PlayReady gerenciados pela Mux. FairPlay exige que o cliente obtenha o pacote FPS da Apple (conta Apple Developer ativa). DRM exige URL assinada. **Live também pode ser protegida:** basta incluir o DRM em `advanced_playback_policies` da live; `new_asset_settings` protege o DVR e a gravação.
- **Bunny Stream** (bunny.net/stream): token authentication e proteção contra hotlink, "todos os recursos de segurança gratuitos", watermark listado como recurso, e "multi-DRM enterprise" (MediaCage) que promete impedir download, gravação e captura de tela. **O preço do MediaCage Enterprise DRM não foi obtido** (página retornou 502).
- **Daily** (doc REST): link de gravação temporário de 900 s a 43.200 s.
- **Zoom:** link de download da gravação com token de 24 h. Inscrição com link único por participante.

#### A3.8.3 Custo de DRM

| Provedor | Taxa fixa | Por licença | Cenário IAE (30 alunos × 20 reproduções/mês = 600) | Cenário 1.000 alunos × 20 = 20.000 |
|---|---|---|---|---|
| Mux | US$ 100/mês | US$ 0,003 | US$ 101,80 (R$ 512,05) | US$ 160,00 (R$ 804,80) |
| Cloudflare Stream | não oferece DRM na doc consultada | n/a | n/a | n/a |
| Bunny (MediaCage Enterprise) | não verificado | não verificado | n/d | n/d |
| Licença avulsa (EZDRM, Axinom, BuyDRM) com pipeline próprio | não verificado | não verificado; mercado costuma cobrar frações de centavo por licença com mínimo mensal (estimativa) | n/d | n/d |

**Além do custo de DRM:** conta Apple Developer (FairPlay), empacotamento CMAF/CENC no transcoding, player compatível (Shaka Player ou o player do provedor) e testes em Safari, iOS, Android e Smart TV. Para o IAE, com 5 alunos pagos hoje e cerca de R$ 2.000 por curso, US$ 100/mês fixos (R$ 503) equivalem a cerca de 25% do preço de um curso inteiro (R$ 2.000), para proteger contra um vetor (download por ferramenta) que a gravação de tela contorna de qualquer jeito.

> **Nota do editor:** A linha Bunny desta tabela foi resolvida pela parte A2: MediaCage Enterprise custa **US$ 99/mês + US$ 0,005 por licença**. Cenário IAE (600 licenças): US$ 102 (R$ 513,06). Cenário 1.000 alunos (20.000 licenças): US$ 199 (R$ 1.000,97). Ver C8.

#### A3.8.4 O que fazem Hotmart, Kiwify e FGV

- **Hotmart** (hotmart.com/pt-br/club, FAQ): declara "proteção por criptografia e marca d'água para evitar cópias não autorizadas" em celular, computador e smart TV, sistema antifraude, e permite assistir offline pelo app Hotmart Player (download controlado dentro do app). Não fala em DRM nem em limite de dispositivos na página.
- **Kiwify** (kiwify.com.br): a página principal só diz que hospeda e exibe os vídeos sem custo extra e tem canal de denúncia de pirataria. **Nenhuma medida técnica de proteção é descrita** (não verificado na central de ajuda).
- **FGV online:** não verificado nesta pesquisa. A cota de busca acabou antes.
- **Leitura:** o padrão de mercado no Brasil para infoproduto e curso de ticket médio é **URL protegida + marca d'água com dados do aluno + antifraude**, não DRM de estúdio. Isso confirma o nível recomendado abaixo.

#### A3.8.5 Nível recomendado para o IAE

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

## 6. Compatibilidade com o stack (Next.js + FastAPI + Postgres + Coolify na VPS Hostinger)

Fonte principal: parte A1, seção 6.

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

> **Nota do editor:** Prevalece a validade de 1 a 4 h recomendada no item 5 (seção A3.8.5), com renovação silenciosa. Ver C10.
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
| Cloudflare Stream captions | Grátis para vídeo armazenado no Stream (estimativa, não verificada) | `pt` suportado | Endpoint `captions/{lang}/generate` |
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

Fonte principal: parte A1, seção 7.

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

Fonte principal: parte A1, seção 8; a recomendação de custo da parte A2 está em A2.7.4 (item 2) e a de lives e proteção em A3.7 e A3.8.5 (itens 4 e 5). A subseção 8.4 é consolidação do editor.

### 8.1 Arquitetura inicial recomendada

**Serviço gerenciado (Mux) + app próprio na VPS + masters em bucket próprio.** Em uma frase: o IAE sobe o vídeo direto para o Mux, o Mux transcodifica, gera legenda em português, entrega por CDN com token assinado, e nosso FastAPI controla quem pode assistir e onde cada aluno parou.

Por que Mux primeiro: encoding Basic grátis, 100.000 minutos de entrega grátis por mês (cerca de 1.667 horas assistidas, cobre a fase inicial do IAE), legendas automáticas grátis em português estável, player pronto com retomar/velocidade/legenda, cobrança por resolução que encaixa na calculadora de degraus, e menor custo por hora assistida em 1080p entre os três avaliados. Mux também publicou em 13/10/2026 uma biblioteca de prompts para agentes de código montarem features de vídeo (paywall, por exemplo), o que casa com nosso jeito de trabalhar (único sinal relevante encontrado na varredura de comunidade dos últimos 30 dias).

Alternativa se o preço por minuto do Mux pesar ou o cliente preferir cobrança por GB: **Bunny Stream** (mesmo fluxo de upload TUS + webhook, player próprio ou hls.js).

> **Nota do editor:** Pelo benchmark do item 2, Bunny Stream não é mais barato que o Mux em nenhum cenário 1080p (ex.: 1.000 h e 1.000 alunos: Mux US$ 419 com o crédito de US$ 20/mês, Bunny US$ 503). Bunny fica como alternativa pela cobrança por GB, pelo upload TUS e pelo DRM, não pelo preço. Ver C4.

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

### 8.4 Três cenários com números (consolidação do editor)

Os cenários qualitativos da seção 8.3 foram precificados com os preços e premissas da parte A2 (vídeo) e da parte A3 (lives e DRM). Cálculo do editor; nenhum preço novo foi pesquisado.

Premissas da tabela:
- Volumes do benchmark A2: **hoje** = S0 (30 h, 50 alunos, 1080p); **300 h** = S2 (300 h, 200 alunos, 1080p); **1.000 h** = S3 (1.000 h, 1.000 alunos, 1080p). 6 h assistidas por aluno por mês.
- Vídeo: Mux Basic (armazenamento + entrega, Tabela 5 de A2), menos o crédito de uso de US$ 20/mês do pay-as-you-go (limitado ao valor usado) nos cenários enxuto e recomendado. No premium, Mux Plus cobra o mesmo armazenamento e entrega, mais encoding único (US$ 0,03125/min em 1080p); a linha premium não desconta o crédito (conservador; descontando, cada valor mensal cai US$ 20).
- Masters em R2 Standard (US$ 0,015/GB-mês), com 1 a 2 vezes o degrau 1080p por hora (2,25 a 4,5 GB/h, premissa de A2 seção 2.2): 30 h = US$ 1,01 a 2,03; 300 h = US$ 10,13 a 20,25; 1.000 h = US$ 33,75 a 67,50.
- Live: hoje, Zoom Pro (US$ 8,50 com desconto de sem fins lucrativos; US$ 16,99 cheio). Com 200 ou mais alunos, Zoom Business (US$ 11 com desconto; US$ 21,99 cheio), porque o Pro limita a 100 participantes. No premium, LiveKit Cloud Ship: US$ 52,40 no cenário IAE de A3 (4 lives, 30 alunos) e US$ 496,04 no cenário crescimento de A3 (8 lives, 200 alunos), este usado para 300 h e 1.000 h.
- DRM (premium): Mux, US$ 100/mês + US$ 0,003 por licença, com 20 reproduções por aluno por mês (premissa de A3): US$ 103 (50 alunos), US$ 112 (200), US$ 160 (1.000).
- Acumulado = custo único + N x mensal, acervo e alunos constantes (mesma regra de A2). R$ = US$ x 5,03.

| Cenário | Composição | Hoje (30 h, 50 alunos) US$/mês | R$/mês | 300 h, 200 alunos US$/mês | R$/mês | 1.000 h, 1.000 alunos US$/mês | R$/mês | Custo único (encoding) |
|---|---|---|---|---|---|---|---|---|
| Enxuto | Mux Basic, sem cópia de masters, token assinado, Zoom com desconto | 8,50 | 42,76 | 45,00 | 226,35 | 430,00 | 2.162,90 | 0 |
| Recomendado | Mux Basic + masters em R2 + Mux Player + Zoom (com desconto a cheio) + proteção do item 5 (custo zero) | 9,51 a 19,02 | 47,85 a 95,65 | 55,13 a 76,24 | 277,28 a 383,49 | 463,75 a 508,49 | 2.332,66 a 2.557,70 | 0 |
| Premium | Mux Plus + masters em R2 + DRM Mux + LiveKit Cloud embutido | 161,81 a 162,82 | 813,92 a 819,01 | 672,16 a 682,29 | 3.380,99 a 3.431,92 | 1.128,79 a 1.162,54 | 5.677,81 a 5.847,58 | US$ 56,25 / 540 / 1.727 |

Acumulado em 12 e 36 meses (US$):

| Cenário | Hoje 12 m | Hoje 36 m | 300 h 12 m | 300 h 36 m | 1.000 h 12 m | 1.000 h 36 m |
|---|---|---|---|---|---|---|
| Enxuto | 102,00 | 306,00 | 540,00 | 1.620,00 | 5.160,00 | 15.480,00 |
| Recomendado | 114,15 a 228,18 | 342,45 a 684,54 | 661,50 a 914,88 | 1.984,50 a 2.744,64 | 5.565,00 a 6.101,88 | 16.695,00 a 18.305,64 |
| Premium | 1.998,00 a 2.010,15 | 5.881,50 a 5.917,95 | 8.605,98 a 8.727,48 | 24.737,94 a 25.102,44 | 15.272,48 a 15.677,48 | 42.363,44 a 43.578,44 |

Leitura:
- **Enxuto e recomendado custam quase o mesmo:** a diferença é a cópia dos masters (US$ 1 a 68/mês), que é o seguro contra lock-in. Por isso o recomendado é o ponto de partida.
- **O premium é caro por causa do DRM e do LiveKit**, não do vídeo. O DRM sozinho (US$ 103/mês hoje) é 19 vezes a conta de vídeo no Mux hoje (US$ 5,40). Só se justifica com os gatilhos do item 5 (vazamento comprovado, contrato B2B que exija, mais de cerca de 1.000 alunos ativos).
- **Gatilho da fase 3 (pipeline próprio em R2 + FFmpeg):** com 1.000 h e 1.000 alunos, R2 + FFmpeg custa US$ 60,88/mês contra US$ 419 do Mux com o crédito (A2, Tabela 5, S3). A economia de cerca de US$ 358/mês (R$ 1.801) paga a engenharia. Com 5.000 alunos a diferença sobe para US$ 1.701/mês (Mux US$ 1.764 contra R2 US$ 63,27).
- Nenhum cenário inclui o servidor da aplicação (Next.js, FastAPI, Postgres), impostos nem IOF.

## Confiança

Seção unificada das partes A1, A2 e A3. Itens que uma parte deixou sem resposta e outra verificou foram movidos para "Fato verificado", com a indicação da parte que resolveu.

### Fato verificado (página ou documentação oficial, acessada em 13/10/2026)

**Vídeo sob demanda, preços**
- Cloudflare R2: US$ 0,015/GB-mês, egress grátis, franquia e operações classe A/B.
- Cloudflare Stream: US$ 5 por 1.000 min armazenados (pré-pago), US$ 1 por 1.000 min entregues, encoding grátis; entrega H.264 de 360p a 1080p, não entrega 4K (documentação via Context7; resolvido por A2, estava sem resposta em A1).
- Cloudflare Workers (US$ 5/mês, 10 M req inclusas).
- Termos da Cloudflare exigem Developer Platform, Images ou Stream para servir vídeo pela CDN fora do Enterprise (estimativa, não verificada).
- Bunny CDN (por região, rede Standard e Volume a US$ 0,005/GB), Bunny Storage, Bunny Stream: encoding padrão grátis, Premium Encoding por codec (US$ 0,025/0,05/0,15 por min), transcrição US$ 0,10/min por idioma (resolvido por A2), DRM MediaCage Enterprise US$ 99/mês + US$ 0,005 por licença (resolvido por A2), replicação de storage, webhooks e upload TUS.
- Mux: tabelas completas por resolução e faixa (encoding, armazenamento, entrega, cold storage, 100.000 min de entrega grátis por mês), crédito de uso de US$ 20/mês no pay-as-you-go (um por conta, aplicado a partir de C11), live até 1080p, legendas automáticas grátis com português estável.
- Backblaze B2; Wasabi (preço, mínimo de 1 TB, 90 dias, regra de egress); DigitalOcean Spaces.
- AWS S3 (do JSON oficial de preços), CloudFront pay-as-you-go (América do Sul), CloudFront planos fixos (franquias, regra de excedente, recursos não suportados, preços do Premium acima de 50 TB: 75 TB US$ 1.450 a 600 TB US$ 10.000), AWS MediaConvert (tarifas e multiplicadores).
- Google Cloud CDN (faixas por região), Google Transcoder (por minuto), GCS Standard Iowa (US$ 0,000027397/GiB-hora, convertido para US$ 0,020/GiB-mês com 730 h).
- Hostinger VPS: planos, disco, banda, porta de 1 Gbps, preço promocional e de renovação em USD e BRL (resolvido por A2; estava sem resposta em A3).

**Qualidade e compatibilidade**
- Ladder da Apple (H.264 e HEVC), IDR a cada 2 s, segmentos de 6 s, H.264 por compatibilidade, AV1 aceito em fMP4.
- Bitrates recomendados de upload do YouTube e de envio do Cloudflare Stream.
- Suporte de HEVC e AV1 por navegador (caniuse); Safari 17 com AV1 só com decodificação em hardware (WebKit) (estimativa, não verificada).
- Market share mobile no Brasil (StatCounter, setembro/2026: 78,78% Android, 21,21% iOS).

**Stack, transcrição e operação**
- Atributos do Mux Player (`start-time`, `max-resolution`, `max-auto-resolution`, `tokens`).
- Preços de transcrição OpenAI, Deepgram, AssemblyAI.
- Backups do Coolify (agendamento, S3, retenção, restauração).

**Lives**
- Preços da Daily (vídeo, gravação, streaming, transcrição, franquia de 10.000 min).
- Preços do LiveKit Cloud (Build, Ship, Scale, excedentes, banda, conexões).
- Preços do 100ms (videoconferência, HLS por espectador, gravação, franquias).
- Preços da Mux para live (1080p US$ 0,03125/min, entrega, armazenamento, franquia de 100k min, limite de 12 h, latências).
- Cloudflare Stream Live (ingestão grátis, gravação automática, webhooks de live).
- Zoom Pro e Business (preço, participantes, 30 h, 10 GB), preço único de Webinars US$ 89/mês, desconto de 50% para sem fins lucrativos verificadas.
- Google Workspace em R$ (Starter sem gravação, Standard 150, Plus 500).
- Requisitos do Jitsi e do Jibri.
- APIs de gravação: Zoom `recording.completed` com token de 24 h; Daily start/webhook/access-link/bucket próprio; LiveKit Egress (S3/GCS/Azure, HLS segmentado, limites de duração configuráveis).
- Regras de restrição do YouTube Live.

**Proteção**
- Mux DRM US$ 100/mês + US$ 0,003/licença; live também pode ser protegida (`advanced_playback_policies` da live; `new_asset_settings` para DVR e gravação).
- Cloudflare Stream: tokens de no máximo 24 h, ausência de DRM na página de segurança.
- Hotmart declara criptografia + marca d'água.

### Estimativa (premissa ou cálculo nosso sobre preço verificado)

- Bitrates para aula com slides: duas propostas, ambas sem medição. A1: 600/1.200/2.000/3.500 kbps (360p/540p/720p/1080p). A2: 2,5 Mbps (720p), 5 Mbps (1080p) e 15 Mbps (4K). Para custo prevalece A2; ver C1. Precisam de teste com a aula real de 5 h.
- Mix de resolução assistida; 6 h por aluno por mês; fator de pico 4x para o VPS (A2).
- Economia de bitrate do AV1 sobre HEVC (A1).
- Custo de CPU do FFmpeg (0,6 / 1,0 / 4,0 h de CPU por hora de vídeo). Deve ser validado com um encode real.
- Cobrança do Mux pela resolução do teto (pode ser menor se for pela resolução entregue).
- Hostinger: ausência de object storage inferida por URLs que retornam 404 e pela página de preços sem menção ao produto; não confirmada com o suporte.
- Custo de transcoding e entrega supõe acervo e alunos constantes; crescimento real muda o acumulado.
- Tabela ilustrativa de custo da seção 1.3 (premissa de 10 h assistidas por aluno por mês, tudo em 1080p); substituída pelo benchmark do item 2 (C3).
- A afirmação de que o Mux é o gerenciado mais barato por hora assistida em 1080p: estimativa em A1, confirmada pelo benchmark de A2 para todos os cenários 1080p (C4).
- Banda de cerca de 1,5 Mbit/s por aluno no LiveKit (0,675 GB/h), que domina o custo LiveKit no cenário de 200 alunos.
- Custo de VPS para Jitsi (US$ 30 a 60); compatível com os preços Hostinger de A2 (C9).
- Vimeo Advanced (US$ 65 a 75).
- 20 reproduções por aluno por mês no cálculo de DRM.
- Esforços em dias de desenvolvimento.
- Cenários consolidados da seção 8.4 (composição do editor sobre os números de A2 e A3).
- Impostos e IOF não incluídos (pagamento em USD com cartão brasileiro tem IOF; nota fiscal de serviço importado pode ter tributos).

### Sem resposta (pendências)

- Preços de api.video e Vimeo OTT/Enterprise (nenhuma parte pesquisou).
- Planos, limites e preço de live do Vimeo.
- GCS São Paulo (southamerica-east1): preço não extraído (a página carrega por região via script); usado Iowa.
- Se a rede Volume da Bunny (US$ 0,005/GB) tem PoP na América do Sul e qual a latência para o Brasil.
- Política exata de reenvio de webhooks de cada provedor.
- Quem no mercado brasileiro de educação usa cada provedor.
- Preço do Zoom Webinars por faixa de público e do Large Meeting add-on.
- Preço por minuto do Zoom Video SDK.
- Bunny live streaming.
- Preço de licença DRM avulsa (EZDRM, Axinom, BuyDRM).
- O que FGV online faz em proteção.
- O que a Kiwify faz tecnicamente.
- Limite máximo de participantes por sala da Daily e do 100ms.
- Pesquisa de comunidade dos últimos 30 dias (skill last30days, 13/10/2026): sem sinal útil sobre custos e provedores de VOD além do anúncio da biblioteca de prompts do Mux para agentes de código; para lives, sinal fraco (Reddit com HTTP 429, X só promocional), sem relato recente de quedas graves em LiveKit, Daily ou Zoom. Arquivo bruto de A3: `~/Documents/Last30Days/livekit-raw-v3.md`.
- Causa comum das lacunas: a cota de WebSearch da sessão (200 buscas compartilhadas entre agentes) esgotou; todos os números vieram de WebFetch/curl direto nas páginas oficiais e de Context7. Vale rodar de novo essas lacunas quando a cota renovar.

## Fontes

Todas acessadas em 13/10/2026. Lista unificada das partes A1, A2 e A3, sem duplicatas (a mesma URL citada por mais de uma parte aparece uma vez).

### Vídeo gerenciado: Mux

- Mux, preços (página geral): https://www.mux.com/pricing (acesso em 13/10/2026)
- Mux, preços detalhados de vídeo: https://www.mux.com/docs/pricing/video (acesso em 13/10/2026)
- Mux, níveis de qualidade (Basic, Plus, Premium): https://www.mux.com/docs/guides/use-video-quality-levels (acesso em 13/10/2026)
- Mux, legendas automáticas e transcrição: https://www.mux.com/docs/guides/add-autogenerated-captions-and-use-transcripts (acesso em 13/10/2026)
- Mux, vídeo em 4K (max_resolution_tier): https://www.mux.com/docs/guides/stream-videos-in-4k (acesso em 13/10/2026)
- Mux, changelog de idiomas das legendas automáticas: https://www.mux.com/docs/changelog/additional-languages-for-vod-auto-generated-captions (acesso em 13/10/2026)
- Mux Player, referência de atributos: https://github.com/muxinc/elements/blob/main/packages/mux-player/REFERENCE.md (acesso em 13/10/2026)
- Mux Player React: https://github.com/muxinc/elements/blob/main/packages/mux-player-react/README.md (acesso em 13/10/2026)
- Mux no X, biblioteca de prompts (13/10/2026): https://x.com/MuxHQ/status/2110108922631913794 (acesso em 13/10/2026)
- Mux, preços de vídeo (página de produto): https://www.mux.com/pricing/video (acesso em 13/10/2026)
- Mux, preços de live: https://www.mux.com/pricing/live (acesso em 13/10/2026)
- Mux, DRM: https://www.mux.com/docs/guides/protect-videos-with-drm (acesso em 13/10/2026)
- Mux, live streaming: https://www.mux.com/docs/guides/start-live-streaming (acesso em 13/10/2026)

### Cloudflare (Stream, R2, Workers, cache, termos)

- Cloudflare Stream, preços: https://developers.cloudflare.com/stream/pricing/ (acesso em 13/10/2026)
- Cloudflare Stream, FAQ: https://developers.cloudflare.com/stream/faq/ (acesso em 13/10/2026)
- Cloudflare Stream, legendas: https://developers.cloudflare.com/stream/edit-videos/adding-captions/ (acesso em 13/10/2026)
- Cloudflare Stream, direct creator upload: https://developers.cloudflare.com/stream/manage-video-library/creator-id/ (acesso em 13/10/2026)
- Cloudflare R2, preços: https://developers.cloudflare.com/r2/pricing/ (acesso em 13/10/2026)
- Cloudflare Stream upload: https://developers.cloudflare.com/stream/uploading-videos/ (acesso em 13/10/2026)
- Cloudflare Stream (docs via Context7, resoluções 360p a 1080p): https://developers.cloudflare.com/stream/index.md (acesso em 13/10/2026)
- Cloudflare Workers pricing: https://developers.cloudflare.com/workers/platform/pricing/ (acesso em 13/10/2026)
- Cloudflare cache, tamanho máximo cacheável: https://developers.cloudflare.com/cache/concepts/default-cache-behavior/ (acesso em 13/10/2026)
- Cloudflare Service-Specific Terms: https://www.cloudflare.com/service-specific-terms-application-services/ (acesso em 13/10/2026)
- Cloudflare Stream Live: https://developers.cloudflare.com/stream/stream-live/ (acesso em 13/10/2026)
- Cloudflare Stream Live, webhooks: https://developers.cloudflare.com/stream/stream-live/webhooks/ (acesso em 13/10/2026)
- Cloudflare Stream, segurança (URLs assinadas): https://developers.cloudflare.com/stream/viewing-videos/securing-your-stream/ (acesso em 13/10/2026)
- Cloudflare Stream, webhooks: https://developers.cloudflare.com/stream/manage-video-library/using-webhooks/ (acesso em 13/10/2026)

### Bunny.net

- Bunny Stream, página de preços: https://bunny.net/pricing/stream/ (acesso em 13/10/2026)
- Bunny Stream, documentação de preços (via Context7): https://bunny.net/docs/stream/pricing (acesso em 13/10/2026)
- Bunny Stream, premium encoding: https://bunny.net/docs/stream/premium-encoding (acesso em 13/10/2026)
- Bunny Stream, webhooks: https://bunny.net/docs/stream/webhooks (acesso em 13/10/2026)
- Bunny Stream, upload TUS: https://bunny.net/docs/stream/tus-resumable-uploads (acesso em 13/10/2026)
- Bunny Stream, token authentication: https://bunny.net/docs/stream/token-authentication (acesso em 13/10/2026)
- Swarmify, review do Bunny Stream (fonte secundária para transcrição e DRM): https://swarmify.com/blog/bunny-stream-review/ (acesso em 13/10/2026)
- Bunny CDN pricing: https://bunny.net/pricing/ (acesso em 13/10/2026)
- Bunny Storage pricing: https://bunny.net/pricing/storage/ (acesso em 13/10/2026)
- Bunny Stream: https://bunny.net/stream/ (acesso em 13/10/2026)
- Bunny Stream pricing (docs): https://bunny.net/docs/stream-pricing (acesso em 13/10/2026)

### AWS

- AWS S3 pricing: https://aws.amazon.com/s3/pricing/ (acesso em 13/10/2026)
- AWS S3 price list JSON: https://b0.p.awsstatic.com/pricing/2.0/meteredUnitMaps/s3/USD/current/s3.json (acesso em 13/10/2026)
- AWS CloudFront pricing (planos fixos): https://aws.amazon.com/cloudfront/pricing/ (acesso em 13/10/2026)
- AWS CloudFront pay-as-you-go: https://aws.amazon.com/cloudfront/pricing/pay-as-you-go/ (acesso em 13/10/2026)
- AWS CloudFront flat-rate plans (guia): https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/flat-rate-pricing-plan.html (acesso em 13/10/2026)
- AWS MediaConvert pricing: https://aws.amazon.com/mediaconvert/pricing/ (acesso em 13/10/2026)

### Google Cloud e Google Workspace

- Google Cloud Storage pricing: https://cloud.google.com/storage/pricing (acesso em 13/10/2026)
- Google Cloud CDN pricing: https://cloud.google.com/cdn/pricing (acesso em 13/10/2026)
- Google Transcoder API pricing: https://cloud.google.com/transcoder/pricing (acesso em 13/10/2026)
- Google Workspace, preços: https://workspace.google.com/pricing (acesso em 13/10/2026)

### Object storage independente (Backblaze, Wasabi, DigitalOcean)

- Backblaze B2 pricing: https://www.backblaze.com/cloud-storage/pricing (acesso em 13/10/2026)
- Wasabi pricing: https://wasabi.com/pricing (acesso em 13/10/2026)
- Wasabi pricing FAQ: https://wasabi.com/pricing/faq (acesso em 13/10/2026)
- DigitalOcean Spaces pricing: https://www.digitalocean.com/pricing/spaces-object-storage (acesso em 13/10/2026)

### Hostinger

- Hostinger VPS (USD): https://www.hostinger.com/vps-hosting (acesso em 13/10/2026)
- Hostinger VPS (BRL): https://www.hostinger.com.br/servidor-vps (acesso em 13/10/2026)
- Hostinger pricing (sem object storage): https://www.hostinger.com/pricing (acesso em 13/10/2026)

### Padrões, codecs e dispositivos

- Apple, HLS Authoring Specification for Apple devices: https://developer.apple.com/documentation/http-live-streaming/hls-authoring-specification-for-apple-devices (acesso em 13/10/2026)
- Apple, HLS Authoring Specification, apêndices: https://developer.apple.com/documentation/http-live-streaming/hls-authoring-specification-for-apple-devices-appendixes (acesso em 13/10/2026)
- YouTube, configurações de codificação recomendadas para upload: https://support.google.com/youtube/answer/1722171 (acesso em 13/10/2026)
- caniuse, HEVC: https://caniuse.com/hevc (acesso em 13/10/2026)
- caniuse, AV1: https://caniuse.com/av1 (acesso em 13/10/2026)
- WebKit, recursos do Safari 17.0 (AV1): https://webkit.org/blog/14445/webkit-features-in-safari-17-0/ (acesso em 13/10/2026)
- StatCounter, SO mobile no Brasil: https://gs.statcounter.com/os-market-share/mobile/brazil (acesso em 13/10/2026)

### Lives: Zoom, Daily, 100ms, LiveKit, Jitsi, YouTube, Vimeo

- Daily, preços do Video SDK: https://www.daily.co/pricing/video-sdk/ (acesso em 13/10/2026)
- LiveKit Cloud, preços: https://livekit.com/pricing (acesso em 13/10/2026)
- 100ms, preços: https://www.100ms.live/pricing (acesso em 13/10/2026)
- Zoom, preços: https://zoom.us/pricing (acesso em 13/10/2026)
- Zoom Webinars, preços: https://zoom.us/pricing/webinar (acesso em 13/10/2026)
- Zoom, preços para desenvolvedor e FAQ: https://zoom.us/pricing/developer (acesso em 13/10/2026)
- Zoom, eventos de reunião (webhooks): https://developers.zoom.us/docs/api/meetings/events (via Context7, `/websites/developers_zoom_us`) (acesso em 13/10/2026)
- Zoom Video SDK, eventos: https://developers.zoom.us/docs/api/video-sdk/events (via Context7) (acesso em 13/10/2026)
- Daily, iniciar gravação: https://docs.daily.co/reference/rest-api/rooms/recordings/start (via Context7, `/websites/daily_co_reference_rest-api`) (acesso em 13/10/2026)
- Daily, webhook de gravação pronta: https://docs.daily.co/reference/rest-api/webhooks/events/recording-ready-to-download (via Context7) (acesso em 13/10/2026)
- Daily, link de gravação: https://docs.daily.co/reference/rest-api/recordings/get-recording-link (via Context7) (acesso em 13/10/2026)
- LiveKit Egress: https://github.com/livekit/egress (README e código, via Context7, `/livekit/egress`) (acesso em 13/10/2026)
- Jitsi, requisitos de servidor: https://jitsi.github.io/handbook/docs/devops-guide/devops-guide-requirements/ (acesso em 13/10/2026)
- YouTube, requisitos de live: https://support.google.com/youtube/answer/2853700 (acesso em 13/10/2026)
- YouTube, restrições de live: https://support.google.com/youtube/answer/2474026 (acesso em 13/10/2026)
- Vimeo, planos: https://vimeo.com/upgrade-plan (sem dados de preço no fetch) (acesso em 13/10/2026)

### Transcrição

- OpenAI, preços da API (transcrição): https://developers.openai.com/api/docs/pricing (acesso em 13/10/2026)
- Deepgram, preços: https://deepgram.com/pricing (acesso em 13/10/2026)
- AssemblyAI, preços: https://www.assemblyai.com/pricing (acesso em 13/10/2026)

### Operação

- Coolify, backups de banco: https://coolify.io/docs/databases/backups (acesso em 13/10/2026)

### Mercado brasileiro e comunidade

- Hotmart Club: https://hotmart.com/pt-br/club (acesso em 13/10/2026)
- Kiwify: https://kiwify.com.br/ (acesso em 13/10/2026)
- Reddit r/TEFCanada, aulas teóricas em casa e prática ao vivo no Zoom: https://www.reddit.com/r/TEFCanada/comments/1x5ad23/we_run_french_classes_like_a_gym_theory_at_home/ (via last30days) (acesso em 13/10/2026)
- LiveKit, vagas: https://jobs.ashbyhq.com/livekit (vagas, via last30days) (acesso em 13/10/2026)

### Cotação

- AwesomeAPI, USD-BRL = R$ 5,03 em 13/10/2026 (informada pelo orquestrador e usada nas três partes)
