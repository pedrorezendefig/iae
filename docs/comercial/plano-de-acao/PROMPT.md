# IAE: plano de ação para a plataforma de cursos (pesquisa multiagente)

Você vai conduzir uma pesquisa pesada, em paralelo, com vários agentes especializados, e consolidar tudo num **relatório HTML único** (plano de ação) que será lido por três sócios de uma empresa de tecnologia para decidir **como prestar o serviço, com que infraestrutura, a que custo e com que proposta**. O relatório vai para `./saida/plano-de-acao-iae.html`. Pesquisa e rascunhos intermediários vão em `./saida/pesquisa/<agente>.md`.

Leia este prompt inteiro antes de fazer qualquer coisa. Tudo que está aqui veio de duas reuniões reais do mesmo dia (13/10/2026): a reunião de refinamento com o cliente e, logo depois, a conversa entre os sócios. As transcrições completas estão no Wispr Flow e podem ser consultadas pelo MCP se algum agente precisar do verbatim:

- Reunião 1, refinamento com o cliente (53 min), id `630a8195-6f53-4c21-82af-142a4f9776dc`, link https://notes.wisprflow.ai/shared/jxQ4_fHzhjXYoHmHDxHebbAFaVZ6x9fp39j6jM3Kevg
- Reunião 2, sócios entre si (20 min), id `7ccec9f7-800c-437a-81c6-3607a2620af7`, link https://notes.wisprflow.ai/shared/HbHxBPoTdgpzyFYGWY7ZuAYBrw4X6pmr5jnm87V3XoM

---

## 1. Quem somos e quem é o cliente

**Nós (prestadores):** três sócios de tecnologia (Pedro, Rib e Lucas), todos com emprego CLT, tocando a empresa própria em paralelo com forte uso de IA (Claude Code, pipeline de issues e ondas, deploy em Coolify sobre VPS Hostinger, Next.js no front e FastAPI no back, Supabase/Postgres). Já temos um app hospitalar em produção com esse stack. Entregamos funcionalidade muito rápido; o que **não** dominamos ainda é infraestrutura de vídeo em escala. É isso que a pesquisa precisa resolver.

**Cliente: IAE**, escola de prática jurídica voltada a advogados corporativos (in-house). Instituição **sem fins lucrativos**, mas com missão de crescer e faturar para a própria instituição.

- Presidente: Gustavo Costa, 30 anos no jurídico da White Martins, 17 como vice-presidente para a América Latina. Dá aula sempre em dupla com outro professor.
- Sócios: Vinicius Almeida (fala com a gente, faz o atendimento comercial), Ana Luiza Lima, Rodrigo (ausente).
- Helena Lannes: desenvolvedora do IAE desde o dia 1 (Engenharia Computacional e Ciência de Dados). Fez o site atual com área administrativa e algumas automações. **Deve constar na proposta como ponte técnica do lado do cliente** e participar do projeto.
- Posicionamento: querem ser **a referência** em educação de departamento jurídico. Não existe isso no mercado: as pós em Direito Empresarial são teóricas, dadas por professores que nunca trabalharam em empresa, e confundem com Direito Societário. O produto é "advocacia in-house na prática", vindo de quem viveu 30 anos dentro de empresa.
- Tom desejado: **institucional**, credibilidade, confiança (comparam-se a FGV e Insper). Não querem cara de infoproduto de marketing digital. Vender serviço (aula) é mais difícil que vender produto; a pessoa precisa confiar para pagar cerca de R$ 2.000 por um curso.

## 2. Estado atual do IAE (o que já existe)

- **Cursos presenciais** começaram na semana anterior à reunião, dois cursos, no centro do Rio, à noite. Formato: 2 meses, 8 encontros semanais de 3 horas, **24 horas no total**. Já existe um curso com cerca de 5 horas gravadas/dadas. Preço na casa de R$ 2.000. Já têm **5 alunos pagos**.
- Segunda turma presencial prevista para março/abril de 2027. Presencial não será abandonado: modelo híbrido, alguns cursos 100% digitais.
- Crescimento **orgânico de propósito** ("tijolo a tijolo"): gerar credibilidade, depoimentos e material antes de escalar. O presencial foi laboratório: testar o que o público quer ouvir, dinâmica entre professores, feedback olho no olho.
- **Evento de lançamento** em 24/09/2026 na FIRJAN, com bons convidados.
- **Tráfego pago** por 10 a 15 dias após o lançamento, caindo direto no WhatsApp (sem landing page). Leads muito desqualificados, só 1 aluno veio do tráfego. Foi cortado. Vão nos mandar os criativos usados.
- **Site** atual feito pela Helena, com área administrativa. Vai permanecer como está.
- **CRM** Nexoris funcional. **Google Analytics** configurado.
- **Equipe de marketing/comercial** terceirizada: posts (Instagram e LinkedIn), um gestor de tráfego, responsável por criativo.
- **WhatsApp**: atendimento manual feito pelo Vinicius, via API não oficial. Volume baixo (0 a 2 leads por dia), sem IA ainda. Automação de atendimento está sendo desenvolvida em paralelo com o time comercial.
- **Parcerias**: convênio com a UERJ (bolsas para alunos e ex-alunos da graduação) e convênio com a OAB Rio em desenvolvimento. Querem usar parcerias como benefício do clube de membros.
- **Brand kit** (manual de marca, tipografia) existe e será enviado.
- Demanda concreta já existente: **São Paulo** ("quando tiver online a gente faz") e alunos atuais que reclamam de estar no centro à noite. Limitação geográfica é o principal gargalo de escala.

## 3. Públicos-alvo (quatro)

1. Estudantes terminando Direito e recém-formados, que nunca ouviram falar de advocacia in-house (a graduação só fala de concurso e escritório).
2. Advogados já dentro de empresas que querem se qualificar ("ganhar traquejo corporativo").
3. Advogados de escritório migrando para empresa (CLT, qualidade de vida), que chegam sem traquejo organizacional.
4. Escritórios que querem entender a cabeça do cliente (quem decide contratação, orçamento, suprimentos vs jurídico). Formato enxuto: **máximo 8 horas, duas sessões de 4**, contratado pelo escritório (B2B).

Geração jovem quer conteúdo **curto, rápido, com conteúdo, baseado em trajetória de sucesso**. Nem a FGV consegue trazer aluno fácil; o gargalo do setor é captação.

## 4. O que o cliente quer da plataforma (tudo que foi dito, sem filtrar)

**Decisão da reunião: prioridade número um é a plataforma online onde os alunos assistem às aulas.** O resto vem depois, em paralelo, tijolo a tijolo.

Funcionalidades e desejos citados:

- Aulas **síncronas ao vivo** (como numa chamada de vídeo, com os dois professores) **e assíncronas gravadas**. Toda aula ao vivo fica gravada e disponível depois para quem não conseguiu entrar (Helena). Mesma plataforma para os dois modos (Ana Luiza).
- **Conteúdos curtos** de 30 a 40 minutos, comprados avulsos, a qualquer hora ("quero entender como se faz o orçamento do departamento jurídico").
- **Modelos de acesso coexistindo**: assinatura mensal estilo Netflix (clube de membros) + cursos comprados de forma vitalícia (compra única) + no longo prazo **pós-graduação** de 1 a 2 anos cujos módulos são os cursos de 24 h, oferecidos de forma cíclica e organizada (precisa trilha, pré-requisitos, histórico do aluno).
- **Área de membros / clube de membros** com comunidade, benefícios dos membros, parcerias (UERJ, OAB, outros produtos e serviços), fidelização. Vinicius quer algo de clube de membros **pronto até o fim dos cursos atuais: fim de novembro ou começo de dezembro de 2026**. Gustavo pondera que comunidade vem depois e em paralelo; prioridade é dar aula e captar aluno.
- **Área administrativa** da plataforma: editar títulos, vídeos, comentários, conteúdo, sem depender de nós.
- **Agente de IA dentro da plataforma** respondendo com base no conhecimento que eles mesmos inserem (tirar dúvidas do aluno, orientar).
- **Funil de aula gratuita** (Helena): tráfego pago leva a formulário, aula gratuita, grupo, lead mais qualificado. Pedro concorda, mas é etapa posterior.
- Materiais: reaproveitar aulas presenciais gravadas e depoimentos de alunos satisfeitos como material de venda.
- **Agente de IA no WhatsApp**: fica em **segundo plano** enquanto a captação é orgânica.
- **Tráfego pago, landing page, VSL, SEO**: etapa posterior; só faz sentido quando a estrutura existir e estiver alinhada ao público (Pedro). A proposta pode mencionar como fase futura.

**Referências citadas pelo cliente** (o agente de produto deve estudar todas):

- **Members Club** (plataforma por assinatura que "faz uma Netflix do seu negócio"); Vinicius estava olhando durante a reunião. É a referência mais próxima do que querem, mas eles esperam que faltem coisas.
- **Future Law**: encontro síncrono gravado, disponibilizado "ad eternum" até alguém regravar; reciclagem de conteúdo; temas modernos do Direito.
- **Cursos curtos da FGV** (5 horas, objetivos, pessoa treinada para falar online, direto ao ponto).
- **Insper** (transcrito como "Wispr"), a instituição que mais se aproxima do que gostam; FGV Direito também citada.
- Plataformas de marketing digital por onde Pedro já passou (Hotmart, Kiwify, Eduzz e similares) como repertório de funcionalidades que evoluíram com o tempo, mas o cliente **não** quer essa cara produtizada.

**Formato de trabalho combinado**: proposta vem **desenhada com entregáveis** e o cliente analisa; custo se debate na hora. Troca de requisitos por arquivos `.md` gerados por IA. Marcamos nova conversa quando tivermos algo tangível (uma estrutura, telas, um protótipo assistindo vídeo) e um grupo para ir soltando notícias de pesquisa.

## 5. O que nós, sócios, decidimos e discutimos depois (reunião 2)

**Decisões:**

- **Foco 100% em infraestrutura e performance.** Funcionalidade é fácil para nós; o desafio real é vídeo em cloud. Plataforma lenta perde assinante, e essa plataforma **é o centro do negócio do cliente**. Novas funcionalidades não podem prejudicar o processamento.
- **Qualidade de vídeo**: ofertar a maior qualidade que fizer sentido, com opções para quem assiste em rede ruim. Rib falou em 4K; Pedro acha que 4K não faz sentido para aula de 5 horas (ninguém aguenta, nem o computador do aluno). **Isso precisa ser resolvido por evidência**: qual resolução, bitrate e codec para aula de professor falando com slides. Ideia de Pedro: proposta inicial limita a qualidade e sobe conforme entram assinantes, mas deixando o custo de cada degrau à mostra.
- **Armazenamento deve ser o maior custo** da infraestrutura. Pode passar de 1 TB. Hoje já há um curso de 5 horas. Precisa de **benchmark de custo** por resolução (720p, 1080p e opcionalmente 1440p/4K), por hora de vídeo, por volume de vídeos, por provedor (Google Cloud, AWS, Hostinger VPS e object storage, e outros que a pesquisa achar), em horizonte de longo prazo (12, 24, 36 meses), incluindo transcoding e tráfego de saída (egress), não só o disco.
- **Lives**: ainda não definido como serão (Zoom, Meet, Jitsi, streaming próprio, etc.). Precisa de recomendação.
- **Skill/esteira de edição de vídeo** (cliente sobe aula crua, a plataforma corta, limpa, gera versões): fica **guardada na manga como diferencial**, não como base do projeto. Mesmo assim, investigar viabilidade e custo. Rib citou o Grok como modelo a avaliar para integração; Pedro citou MCP e "um Claude" para o cliente ter autonomia.
- **UX**: simples de entender sem tutorial obrigatório (ninguém lê, todo mundo clica "avançar"). Evitar a sensação de "um milhão de coisas" das plataformas de comunidade. Pensar em alternativa a tutorial (onboarding progressivo, estados vazios que ensinam, etc.).
- **Proposta**: separar com transparência o **preço do nosso serviço** (cabeças, mão de obra) dos **custos de infraestrutura** (repassados ou estimados). Proposta **interativa**, não estática: uma **calculadora** onde o cliente escolhe qualidade de vídeo, volume de vídeos/horas, número de alunos, e vê o custo mensal estimado, com link para um vídeo de exemplo em cada definição. Estilo artefato do Claude.
- **Pesquisa pesada**: os três vão pesquisar infraestrutura em paralelo (todas as nuvens possíveis), comparar resultados e validar com o Berg (pessoa de confiança em infra). Este prompt é a parte do Pedro.
- **Validar com o cliente uma lista grande de funcionalidades** (Rib: "pensamos em 30, mandamos, eles tiram e põem") antes de fechar escopo.

**Precificação, ainda em aberto (duas ideias, precisam ser comparadas com o mercado):**

- Rib: cobrar **por funcionalidade** entregue, possivelmente com mensalidade por funcionalidade. Consultoria por hora não faz mais sentido na era da IA (uma hora entrega um sistema inteiro).
- Pedro: **ciclo semanal de melhorias**, R$ 1.000 a R$ 2.000 por semana, com 1 a 2 reuniões curtas (30 min a 1 h) de um de nós com o cliente. Esteira determinística: segunda reunião de refinamento, planejar, prototipar, mandar link para o cliente testar, fechar escopo, subir para produção até sexta. Pedidos fora do ciclo não entram pelo WhatsApp; vão para a próxima semana. A divisão interna é por semanas assumidas por cada sócio (quem assume duas semanas recebe o dobro de quem assume uma). Exceções só para trabalho que foge muito da esteira semanal.
- Pedro pediu explicitamente: **recomendar práticas de precificação de quem presta esse tipo de serviço** (frequência de entrega, melhorias por mês, setup inicial vs recorrência, repasse de infra), com referências.

**Ideias laterais citadas (registrar, mas fora do escopo principal):** Photocraft para gerar artes do Instagram da nossa empresa; Last Thirty Days para pesquisa social; referências técnicas do Matt Pocock (projeto de plataforma de vídeo que ele está construindo e testando com skills de IA ao vivo) e do Jack Roberts (ferramenta de geração de conteúdo/edição para redes sociais). Esses dois últimos **devem** ser pesquisados pelo agente de referências.

---

## 6. O que você deve fazer agora (orquestração)

Monte um workflow multiagente (ultracode) com os agentes abaixo rodando **em paralelo** onde não houver dependência. Cada agente grava seu resultado em `./saida/pesquisa/<nome>.md` com **fontes citadas (URL e data de acesso)** e uma seção "Confiança" dizendo o que é fato verificado, o que é estimativa e o que ficou sem resposta. Use pesquisa na web (modo extended onde o tema for de preço ou recente), Context7 para documentação de serviços, e a skill `last30days` para sentir o que a comunidade diz nos últimos 30 dias sobre os provedores e plataformas. Preços devem ser os **vigentes na data da pesquisa**, em dólar e convertidos para real com a cotação do dia (anotar a cotação usada). Depois, um agente consolidador escreve o HTML.

### Agente A: infraestrutura de vídeo (hospedagem, transcoding, entrega)

Responder, com números:

1. Arquiteturas possíveis para VOD (vídeo sob demanda) de aulas, do mais simples ao mais robusto: (a) VPS único com arquivos MP4 servidos direto; (b) object storage + CDN + transcoding próprio (FFmpeg) com HLS/DASH adaptativo; (c) serviço gerenciado de vídeo (Mux, Cloudflare Stream, Bunny Stream, api.video, Vimeo OTT/Enterprise, AWS MediaConvert + CloudFront, Google Transcoder API + Cloud CDN, YouTube não listado); (d) híbrido. Para cada uma: custo, complexidade operacional, risco, o que quebra em escala, e quem no mercado usa.
2. **Benchmark de custo** em tabela: para 100 h, 300 h e 1.000 h de vídeo armazenado; para 50, 200, 1.000 e 5.000 alunos assistindo em média X horas/mês (declarar a premissa); nas resoluções 720p, 1080p e 1440p/4K; nos provedores Hostinger (VPS e object storage), Google Cloud, AWS, Cloudflare (R2 com egress zero + Stream), Bunny.net, Backblaze B2, DigitalOcean Spaces, Wasabi, Mux. Separar **armazenamento**, **transcoding (uma vez por vídeo)** e **egress/entrega (todo mês)**. Mostrar o custo mensal e acumulado em 12, 24 e 36 meses. Indicar qual componente domina em cada cenário (a hipótese dos sócios é que armazenamento domina; **confirmar ou refutar**, porque em muitos cenários o egress domina).
3. **Qualidade**: recomendação fundamentada de resolução, bitrate e codec (H.264 vs H.265 vs AV1) para aula de professor com slides, em ladder adaptativo (ex.: 360p/720p/1080p). Quanto pesa 1 hora de aula em cada degrau. Decidir com evidência se 4K faz sentido para este caso.
4. **Lives**: opções para aula ao vivo com dois professores e chat (Zoom com gravação em nuvem e API, Google Meet, Jitsi auto-hospedado, Daily.co, 100ms, LiveKit, Mux Live, Cloudflare Stream Live, YouTube Live não listado como fallback). Custo por hora de live por número de participantes, qualidade, facilidade de gravar e publicar automaticamente na plataforma, e risco (plataforma de terceiros derrubar a aula).
5. **Proteção de conteúdo**: URLs assinadas, expiração, DRM (quando vale a pena e quanto custa), marca d'água dinâmica, bloqueio de download. Qual nível é razoável para curso jurídico de R$ 2.000.
6. **Compatibilidade com nosso stack**: como cada opção se encaixa em Next.js + FastAPI + Postgres + Coolify numa VPS Hostinger. Player recomendado (hls.js, Video.js, Plyr, player do provedor), retomar de onde parou, velocidade, legendas, transcrição automática (Whisper) para busca e para o agente de IA.
7. **Operação**: backup, retenção, monitoramento, o que acontece se a VPS cair durante uma live, plano de rollback.
8. **Veredito**: uma recomendação clara de arquitetura inicial e de caminho de evolução (o que começa simples e o que troca depois sem reescrever), com os três cenários de custo (enxuto, recomendado, premium).

### Agente B: plataformas de referência e funcionalidades

1. Estudar a fundo as referências do cliente: **Members Club**, **Future Law**, cursos curtos e pós da **FGV**, **Insper** (formatos online, área do aluno, o que transmite credibilidade institucional). Para cada uma: modelo de negócio, formatos de curso, área de membros, preço, o que é bom, o que falta, o que o IAE deveria copiar e o que deveria evitar.
2. Estudar plataformas prontas de LMS/área de membros que poderíamos **usar em vez de construir** ou usar como peça (Hotmart Club, Kiwify, Eduzz Nutror, Memberkit, Curseduca, Cademi, Teachable, Thinkific, Kajabi, Circle, Mighty Networks, Moodle, Open edX, Frappe LMS). Custo, aderência ao tom institucional, lock-in, limites de vídeo, se aceitam assinatura + compra vitalícia + trilha de pós. Responder honestamente **"construir vs comprar vs compor"** para este cliente, considerando que nós entregamos software rápido mas a infraestrutura de vídeo é o risco.
3. Pesquisar o que **Matt Pocock** está construindo em vídeo/plataforma e como usa skills de IA nisso, e o que **Jack Roberts** oferece de geração/edição de conteúdo. Extrair o que serve para a esteira de edição automática de aula (item "guardado na manga").
4. Produzir a **lista de funcionalidades** (meta: 30 ou mais) para mandar ao cliente, **categorizada por dificuldade de abstração e construção**:
   - **Fácil / commodity** (temos pronto ou é trivial com IA): login, catálogo, player com progresso, certificado, admin de conteúdo, comentários, busca.
   - **Médio** (precisa integração ou desenho cuidadoso): assinatura recorrente + compra vitalícia convivendo, cupons, parcerias/bolsas (UERJ, OAB), comunidade, notificações, agente de IA com base de conhecimento, live integrada com gravação automática.
   - **Difícil / não abstraível** (depende de infraestrutura, escala ou regra de negócio pesada): pipeline de vídeo adaptativo, DRM, pós-graduação com trilha, pré-requisitos, histórico acadêmico e certificação reconhecida (requisitos do MEC para pós lato sensu EAD, mesmo que seja só para apontar que precisa de parceria com IES credenciada), edição automática de aula crua, B2B para escritórios (compra por empresa, vários assentos).
   Para cada funcionalidade: valor para o cliente (alto/médio/baixo), esforço nosso (dias), dependências, e em qual fase entra (MVP até dez/2026, fase 2, fase 3).
5. **Pagamentos no Brasil**: Stripe, Pagar.me, Asaas, Mercado Pago, Hotmart como gateway; Pix, boleto, cartão recorrente, parcelamento, nota fiscal; peculiaridades de instituição sem fins lucrativos.
6. **UX sem tutorial**: padrões de onboarding progressivo e de simplicidade em plataformas de curso bem avaliadas; o que evitar das plataformas de comunidade "cheias de coisa".

### Agente C: precificação e modelo de serviço

1. Como consultorias e estúdios que entregam software com IA estão cobrando hoje (2025 e 2026): por hora, por projeto fechado, por sprint/semana, retainer mensal, por funcionalidade, por resultado, assinatura de produto. Fontes: comunidades (Reddit, Indie Hackers, X, Hacker News), artigos, relatórios. Trazer **números reais no Brasil** e fora.
2. Comparar as duas ideias dos sócios (por funcionalidade vs ciclo semanal de R$ 1.000 a 2.000) com o mercado: riscos de cada uma (scope creep, subprecificação, dependência de WhatsApp), como outras empresas protegem a cadência ("pedido fora do ciclo entra na próxima semana"), e uma **recomendação com modelo híbrido** se fizer sentido (setup inicial + recorrência semanal/mensal + repasse de infra + opcionais).
3. Precificar o **setup inicial** (MVP da plataforma de aulas) em três cenários de escopo, e a **recorrência**. Dizer com franqueza se R$ 1.000 a 2.000 por semana está abaixo do mercado para o que será entregue, dado que a plataforma é o centro do negócio do cliente.
4. **Infraestrutura na proposta**: repassar custo real, cobrar margem, ou cobrar fixo por faixa de uso? O que o mercado faz e o que recomenda para transparência sem prejuízo nosso. Quem fica com a conta da cloud (conta do cliente ou nossa).
5. Divisão interna entre sócios por semanas assumidas: como registrar sem dar atrito (planilha simples, regra para exceção).
6. **Contrato e proteção**: itens mínimos (SLA, propriedade do código e dos vídeos, LGPD com dados de alunos, rescisão, o que acontece com a infra se o contrato acabar), lembrando que é instituição sem fins lucrativos.
7. Modelo para a **calculadora interativa** da proposta: variáveis de entrada (qualidade, horas de vídeo, alunos ativos, horas assistidas por aluno, lives por mês), fórmulas, saídas (custo infra mensal, nosso preço, total), e os pontos onde o custo dá degrau.

### Agente D: mercado, concorrência e captação (contexto para a proposta, menor profundidade)

1. Mapa do mercado de educação jurídica online no Brasil (FGV, Insper, PUC, Future Law, Ebradi, Damásio, Verbo Jurídico, CEISC, outros) com preço, formato e o que falta para in-house.
2. O que funciona em captação para cursos de ticket alto com público jovem de Direito: aula gratuita, webinar, comunidade, LinkedIn, parcerias com OAB e universidades. Só o suficiente para a proposta posicionar as fases futuras (tráfego, landing, agente de WhatsApp) sem se comprometer agora.
3. Riscos regulatórios: o que pode ser chamado de "pós-graduação" e de "certificado" sem IES credenciada; o que vale para curso livre.

### Agente E: consolidador (roda depois de A a D)

Lê os quatro arquivos de pesquisa e escreve o HTML final. Antes de escrever, roda uma passada de **checagem cruzada**: números de A batem com a calculadora de C? A lista de funcionalidades de B respeita a prioridade de infraestrutura de A? Marcar divergências explicitamente numa seção "O que ainda está em aberto".

---

## 7. O relatório HTML (entregável)

Arquivo único, auto-contido (CSS inline, sem dependência de rede obrigatória, exceto uma biblioteca de gráficos por CDN se usar), **em pt-BR**, legível em celular e desktop, com índice navegável no topo. Será lido pelos três sócios para tomar decisão; depois uma versão derivada vai virar a proposta ao cliente, então escreva de modo que seções inteiras possam ser reaproveitadas.

**Regra de tipografia obrigatória: não use travessão (U+2014) nem meia-risca (U+2013) em lugar nenhum do HTML, dos arquivos de pesquisa ou das mensagens.** Use vírgula, ponto, parênteses ou dois-pontos. Hífen só entre números e em palavras compostas. Antes de terminar, rode um grep por esses dois caracteres em `./saida/` e corrija.

Estrutura mínima do HTML (pode acrescentar o que julgar útil):

1. **Resumo executivo** (meia página): a recomendação, o custo, o preço, o prazo, os três riscos principais.
2. **O cliente e o problema** (reaproveitável na proposta): quem é o IAE, públicos, por que a plataforma é o centro do negócio.
3. **Arquitetura recomendada de infraestrutura** com diagrama (SVG inline ou mermaid renderizado), caminho de evolução, e por que não as alternativas.
4. **Benchmark de custos** com tabelas e gráficos: por provedor, por resolução, por volume, em 12/24/36 meses. Qual componente domina.
5. **Qualidade de vídeo**: ladder recomendado, peso por hora, veredito sobre 4K, exemplos para colocar na proposta.
6. **Lives**: recomendação e custo.
7. **Funcionalidades categorizadas por dificuldade** (tabela com valor, esforço, fase, dependências), e a versão enxuta dessa lista pronta para mandar ao cliente validar.
8. **Construir vs comprar vs compor**: veredito com justificativa.
9. **Fases e cronograma**: o que entra até o fim de novembro / começo de dezembro de 2026 (data que o Vinicius pediu), o que é fase 2 e 3; critérios para avançar de fase; onde a Helena entra.
10. **Modelo de serviço e precificação**: comparação das duas ideias, recomendação, preço de setup, preço de recorrência, repasse de infra, divisão interna, cadência e regras da esteira semanal.
11. **Calculadora interativa** (JavaScript puro, dentro do HTML): sliders ou campos para qualidade, horas de vídeo, alunos ativos, horas assistidas por aluno e lives por mês; saída com custo de infra por provedor, nosso preço e total; gráfico que atualiza. É o protótipo da que vai para a proposta.
12. **Esqueleto da proposta ao cliente**: seções, ordem, tom (institucional, transparente, sem jargão), o que mostrar na primeira apresentação (telas, protótipo assistindo vídeo, calculadora), o que pedir ao cliente (brand kit, criativos, vídeos existentes, acesso ao site e ao CRM).
13. **Riscos e mitigação**: técnicos, comerciais, de prazo, de dependência de terceiros, regulatórios.
14. **Decisões pendentes para os sócios** (perguntas objetivas com recomendação destacada em cada uma) e **perguntas para o cliente** na próxima reunião.
15. **Ideias guardadas na manga**: edição automática de aula crua, agente de IA na plataforma, agente de WhatsApp, funil de aula gratuita, com estimativa de esforço e quando reavaliar.
16. **Próximos passos** em lista numerada, com dono (Pedro, Rib ou Lucas) e prazo, incluindo "validar com o Berg".
17. **Fontes**: todas as URLs citadas, com data de acesso e cotação do dólar usada.

Ao final, imprima no terminal o caminho do HTML, o tamanho, e um resumo de 10 linhas do que foi recomendado. Não pergunte nada no meio do caminho: se faltar informação, assuma a premissa mais provável, deixe-a escrita na seção de decisões pendentes e siga até o fim.
