# B3: referências técnicas (Matt Pocock, Jack Roberts) e esteira de edição automática de aula crua

Agente B, item 3. Pesquisa feita em 13/10/2026. Cotação usada: **USD 1 = R$ 5,03** (AwesomeAPI, 13/10/2026). Todos os preços são de lista, pagamento conforme uso, sem impostos (IOF de cartão internacional não incluído).

## Resumo

- **Matt Pocock** não está construindo uma "plataforma de cursos" para terceiros: ele mantém um app próprio, aberto no GitHub, o **Course Video Manager (CVM)**, que grava, corta, transcreve, gera capítulos, descrições, legendas, thumbnails e publica as aulas no site dele (AI Hero). O app é desenvolvido por agentes (Claude Code, skills no repositório, agentes "AFK" com o Sandcastle). É a referência mais útil que existe para a nossa esteira, porque resolve exatamente corte por silêncio, transcrição, capítulos e publicação, e documenta cada decisão em ADRs.
- **Jack Roberts** (o mais provável é o youtuber britânico @Itssssss_Jack, de automação com IA e Claude Code) **não tem uma ferramenta própria de edição de vídeo** que eu tenha conseguido verificar. O que ele vende é comunidade paga (Skool) com sistemas e skills de automação, inclusive de marketing e de transformar vídeo do YouTube em posts. O "estilo Jack Roberts" de Shorts com motion graphics virou uma skill de Remotion feita pela comunidade. Serve como referência para a fase de **reaproveitar aula em conteúdo de rede social**, não para a edição da aula em si.
- **Esteira de edição automática é viável e barata.** Montada por nós (FFmpeg/auto-editor + transcrição por API + LLM sobre a transcrição + renderização de thumbnails em HTML), custa entre **US$ 0,12 e US$ 1,28 por hora de aula processada (R$ 0,60 a R$ 6,44)**. Uma aula crua de 3 h sai entre **R$ 1,81 e R$ 19,32**. Ferramentas prontas (Opus Clip, Descript, Vizard) custam de 3 a 50 vezes mais por hora e não fazem o que o IAE precisa (cortes temáticos de 30 a 40 min em português, com dois professores).
- **Grok:** a API pública do xAI **não aceita vídeo como entrada** na documentação oficial do modelo atual (Grok 4.7: texto e imagem). O xAI tem a transcrição mais barata que achei (US$ 0,10/h) e LLM de texto competitivo (US$ 2/US$ 6 por milhão de tokens). O "Grok Imagine" é geração de vídeo, não edição. Para entender o vídeo nativamente, o **Gemini** é o caminho verificado (até 3 h de vídeo por chamada).
- **Viabilidade: 2 semanas de um sócio** para um MVP com revisão humana (não 100% automático). Semana 1: silêncio, transcrição, legendas, capítulos, resumo. Semana 2: detecção de repetições/erros, cortes temáticos, thumbnails e tela de aprovação.
- **MCP + "um Claude"**: proposta concreta na seção 4. Expor a esteira como servidor MCP remoto (dentro do nosso FastAPI), conectado ao Claude do cliente. A Helena ou o Vinicius pedem em português ("corta a aula 3 por tema e deixa como rascunho no curso X") e o Claude chama as ferramentas. Publicar continua exigindo confirmação na plataforma.

---

## 1. Matt Pocock: o que ele está construindo e como usa skills de IA

### 1.1 O projeto de vídeo: Course Video Manager (CVM)

O que o Rib viu nos vídeos é o **mattpocock/course-video-manager**, repositório público em TypeScript, criado em 24/07/2025, com 807 estrelas e commits no próprio dia 13/10/2026 (dados ao vivo da API do GitHub). O README define o app como "uma ferramenta para gerenciar o fluxo de publicação de vídeos de curso: editar metadados, gerar descrições, criar thumbnails e postar em redes sociais". Num vídeo, Matt diz que já gravou cerca de mil vídeos com ele.

Arquitetura (README e ADRs do repositório):

| Peça | O que faz | Relevância para o IAE |
|---|---|---|
| `apps/local` | App React Router que roda na máquina do Matt: editor de vídeo, gravador (OBS e gravador próprio), FFmpeg, fluxo de publicação e a CLI `cvm` | Mostra que a edição pesada roda num "sidecar" de jobs, separado do site |
| `packages/core` | Banco (Drizzle), sem acesso a disco, pode ser publicado na nuvem | Mesmo padrão que usaríamos: domínio no Postgres, trabalho pesado em worker |
| `packages/overlay-renderer` | Renderizador **Remotion** de sobreposições: legendas, CTA, "cartões de definição" | Arte gerada por código, igual ao que faríamos com HyperFrames/Remotion |
| Publicação | Gera um **bundle imutável** de MP4 + `course.json` consumido pelo site AI Hero | Contrato limpo entre esteira e plataforma de cursos |

Decisões técnicas documentadas que servem diretamente à nossa esteira:

1. **Corte por silêncio com FFmpeg `silencedetect`**: limiar padrão de **-38 dBFS**, trecho mínimo de 1 s, 0,08 s de folga no fim de cada corte "para não cortar a última sílaba" (`silence-detection-constants.ts`). Quando o gravador passa por uma calibração de áudio, o limiar vem da calibração.
2. **O conceito de "Take"**: o Matt não edita uma gravação longa depois. Cada trecho de fala entre silêncios vira um clipe na hora da gravação, e ele apaga o take ruim e regrava logo em seguida. É assim que "remove erros e repetições" sem IA nenhuma. Lição para o IAE: a melhor edição é uma boa prática de gravação; a IA entra para aula presencial, que não tem esse controle.
3. **Transcrição local com Whisper** (ADR 0033): trocou o `whisper-1` da OpenAI por `faster-whisper large-v3-turbo` em GPU (RTX 4060). Mediana caiu de 2,32 s para 0,95 s por clipe, com diferenças só de grafia. Arquivos longos são **fatiados em pedaços de cerca de 27 minutos, cortando em silêncios**, o que permite retomar de onde parou. Técnica que copiaríamos para aulas de 3 h.
4. **"Autofill" de capítulos e descrições** (ADR 0024): um job separado da publicação gera capítulos com **Sonnet 4.5** e descrições com **Haiku 4.5** (via AI SDK da Vercel e OpenRouter). O próprio ADR admite o risco: sem revisão humana, uma regressão de qualidade pode ir ao ar sem ninguém ver; a mitigação é fixar a versão do modelo e, no futuro, ter avaliações. Para o IAE, com aula jurídica e marca institucional, **recomendo manter um passo de revisão**.
5. **Hash de exportação e cache de renderização**: o vídeo só é renderizado de novo quando algo que muda o resultado mudou (clipes, ordem, sobreposições, versão do encoder). Evita reprocessar aula de 3 h à toa.
6. **Integração DaVinci Resolve apagada** (ADR 0039): ele desistiu de exportar para editor externo; tudo sai do próprio app. Sinal de que esteira própria + renderização por código é sustentável.

### 1.2 Como ele usa skills e agentes

- O repositório tem `.claude/skills` próprias do projeto: `do-work`, `to-prd-project`, `to-issues-project`, `improve-codebase-architecture-project`, `verify-cvm`, `deploy-migration`, `document-ai-hero-api`, entre outras. Ou seja, o app de vídeo é mantido por agentes seguindo skills, com `CLAUDE.md`, `GLOSSARY.md` (linguagem de domínio rigorosa) e ADRs.
- Usa o **Sandcastle** (mattpocock/sandcastle, 8,4 mil estrelas), que orquestra agentes de código em sandbox, para trabalho "AFK" (o agente implementa enquanto ele não está no teclado). Há commits "Update sandcastle to latest" no CVM.
- O repositório **mattpocock/skills** ("Skills for Real Engineers") tem cerca de **290 mil estrelas** (API do GitHub, 13/10/2026), com a versão 1.3 lançada em 04/10/2026. A peça central é o `/grill-me` (entrevista o desenvolvedor até entender o pedido antes de codar); as outras são `/write-a-prd`, `/prd-to-issues`, `/tdd`, `/improve-my-codebase`. O Pedro já usa esse fluxo (grill, PRD, issues).
- Comunidade nos últimos 30 dias (last30days, 13/10/2026): o vídeo "Ship like the best engineers: Matt Pocock's AI workflow" (The Hype Kevin, 178 mil views, 09/10/2026) cita que, **"no app que o Matt usa para fazer os cursos, uma spec subiu com 41 user stories"** em 25/09/2026, e que no trabalho normal ele recebe "cerca de 20 perguntas" do grill antes de codar. Ele também critica quem escreve spec gigante sem prototipar ("people just aren't prototyping anymore"). Fora isso, o assunto dominante é o repositório de skills, não o app de vídeo.
- Produto comercial: **AI Hero** (aihero.dev), com coorte "Claude Code for Real Engineers" (2 semanas, mais de 2.500 alunos na primeira edição, segundo ele no X) e curso autoguiado. O site de cursos consome o bundle do CVM pela "AI Hero API".

### 1.3 O que aproveitar na nossa esteira

| Ideia do CVM | Como aplicar no IAE |
|---|---|
| Silêncio por FFmpeg com limiar calibrado e folga no fim | Primeiro passo da esteira; calibrar o limiar por sala de aula (presencial tem ruído de fundo) |
| Fatiar arquivo longo em pedaços de ~27 min em silêncios | Transcrever aula de 3 h em paralelo e com retomada |
| Capítulos e descrição gerados por LLM como **job separado** | Job assíncrono no nosso worker; falha do LLM nunca derruba a publicação |
| Bundle imutável (MP4 + JSON) | Contrato entre esteira e plataforma: a plataforma só lê versões prontas |
| Glossário de domínio e ADRs | Glossário jurídico do IAE vira "keyterms" da transcrição e contexto do LLM |
| Skills no repositório | Uma skill `edicao-de-aula` versionada no nosso repo, usada por nós e pelo Claude do cliente |
| Sobreposições renderizadas por código (Remotion) | Thumbnails e cartelas com a marca do IAE via HyperFrames (licença Apache 2.0, sem custo) |

O que **não** copiar: o CVM depende de GPU NVIDIA local e de uma pessoa gravando em takes curtos. O IAE vai subir gravação presencial longa, com dois professores, sem controle de take.

---

## 2. Jack Roberts: quem é e o que oferece

### 2.1 Candidatos

| Candidato | Quem é | Bate com o contexto? |
|---|---|---|
| **Jack Roberts, @Itssssss_Jack** (YouTube) | Britânico, educador de automação com IA. Bio: vendeu uma startup de automação com mais de 60 mil clientes, fundou o **Glaido** (digitação por voz, lançamento oficial em 01/05/2026) e toca um negócio de automação "7 dígitos". Canal com cerca de 245 a 278 mil inscritos (estimativas de terceiros). Foco atual: Claude Code, skills, agentes, n8n | **Sim, o mais provável.** Pedro passou o nome ao Rib ("foi até você que me passou esse cara", reunião 2) e o Pedro acompanha criadores de IA e Claude Code |
| "jackroberts___" / "AI Automations with Jack" | Perfil de estatística que parece ser o mesmo criador sob outra identidade | Provavelmente o mesmo |
| Jack AI Studio (jackaistudio.com) | Empresa de produção de vídeo com IA para anúncios UGC e canais "faceless" | Não há ligação com Jack Roberts |
| Jack Roberts (ator) | Ator | Não |

### 2.2 O que ele oferece de fato

- **Comunidade paga no Skool** ("AI Automations by Jack"): mais de 110 blueprints de n8n e chamadas ao vivo diárias. Preço visto em uma listagem: US$ 87/mês subindo para US$ 97 (R$ 438 a R$ 488); uma matéria coreana cita US$ 50/mês. Valores de terceiros, não verificados na página oficial.
- **Newsletter jackroberts.ai** com posts recentes: "Insane Claude Marketing Skills (steal them)" (06/04/2026, gratuitas), "Claude Code + NotebookLM = Infinite Memory", "Claude + ChatGPT 5.5 + Gemini = Ultimate System", "I built an Alex Hormozi chatbot in 15 minutes".
- Tutoriais de **transformar vídeo do YouTube em posts de rede social** e de "sistema automatizado de social media com IA" (citados em agregadores).
- Vídeos recentes sobre animação com Claude ("Claude Design Now Makes Animated Film", "Claude Motion Design Just Destroyed Website Builders").
- O formato de Shorts de notícias de IA dele (9:16, cortes secos, rampas de velocidade, mascote) foi replicado por uma **skill de Claude Code feita pela comunidade**: `JackRobertsMotionGraphicSkill` (narração para motion graphics em Remotion, 26 templates). Não é dele.

**Não encontrei** um produto de edição de vídeo assinado por Jack Roberts. A fala do Rib ("ele também tem um negócio dele que é pra gerar conteúdo pra rede social, de edição") provavelmente se refere a esses sistemas de conteúdo ensinados no canal e na comunidade.

### 2.3 O que serve para nós

- Para a **aula em si**: pouco. Ele não trata de edição de aula longa.
- Para a **fase de captação** (o gargalo do IAE): o padrão "aula longa vira posts curtos" é exatamente o que dá para plugar no fim da nossa esteira. Depois que a transcrição e os capítulos existem, gerar 3 a 5 trechos de 30 a 90 s para Instagram e LinkedIn com legenda queimada e cartela institucional é barato (seção 3). Fica como fase posterior, alinhado ao tom institucional (sem "cara de infoproduto").
- Para a **nossa própria empresa**: as skills de marketing dele somam-se ao Photocraft citado na reunião 2 (fora do escopo deste item).

---

## 3. Esteira de edição automática de aula crua

### 3.1 O que a esteira precisa fazer (pedido do cliente e dos sócios)

Entrada: aula crua de cerca de 3 h (presencial, dois professores, slides). Saídas: corte de silêncios, remoção de erros e repetições, capítulos, transcrição, legendas, resumo, cortes de 30 a 40 min por tema, thumbnails.

### 3.2 Arquitetura proposta

```
Upload (bucket) -> job no worker (FastAPI + fila no Postgres)
  1. Normalizar: FFmpeg extrai áudio mono 16 kHz, mede loudness
  2. Fatiar em pedaços de ~25-30 min cortando em silêncio (técnica do CVM)
  3. Transcrever cada pedaço (API: xAI, Deepgram, OpenAI ou AssemblyAI) com timestamps por palavra e diarização (professor A / B)
  4. Silêncios: FFmpeg silencedetect ou auto-editor gera a lista de trechos mortos (> 1,5 s, configurável)
  5. LLM sobre a transcrição (Claude, Grok ou Gemini) gera um "EDL" em JSON:
       - repetições e falsos começos (frases quase iguais em sequência: mantém a última)
       - capítulos com título e minuto
       - resumo da aula e de cada capítulo
       - proposta de cortes temáticos de 30-40 min com título e descrição
  6. (opcional) Gemini olha o vídeo em baixa resolução para achar troca de slide e ajustar capítulos
  7. Tela de revisão: lista de cortes com prévia; admin aprova, ajusta ou descarta
  8. Renderizar: FFmpeg aplica o EDL (re-encode), gera VTT/SRT, entrega ao pipeline de vídeo do Agente A (HLS)
  9. Thumbnails: frame escolhido + template HTML da marca renderizado por HyperFrames (ou Playwright) em PNG
```

Princípio herdado do ADR 0024 do Matt: tudo que é IA é job separado e idempotente; se o LLM falhar, a aula continua publicável na versão "só sem silêncios".

### 3.3 Ferramentas e APIs avaliadas

| Ferramenta | O que faz | Serve para | Limite / risco | Custo verificado |
|---|---|---|---|---|
| **FFmpeg `silencedetect`** | Detecta silêncio por limiar em dB | Corte de silêncio, fatiar arquivo | Precisa calibrar limiar por sala | Grátis (CPU) |
| **auto-editor** (WyattBlue, licença Unlicense, 5,5 mil estrelas, versão 31.7.2 de 03/10/2026) | CLI que corta silêncio por loudness, com margem configurável; exporta MP4 ou timeline (Premiere, Resolve, FCP, JSON) | Corte de silêncio pronto, inclusive exportar timeline para revisão humana | Só áudio, não entende conteúdo | Grátis. Já traz skills de Claude no próprio repositório |
| **Descript** | Editor por texto; remove muletas e retakes, capítulos, Underlord | Edição manual assistida | API em acesso antecipado; **não exporta arquivo de mídia pela API** (só link de compartilhamento); cobrança por assento | Creator US$ 24 (anual) ou US$ 35 (mensal) com 30 h de mídia; Business US$ 50/65 com 40 h. API sem custo extra, consome créditos do plano |
| **OpenAI** transcrição | `gpt-transcribe` US$ 0,0045/min; `gpt-4o-mini-transcribe` US$ 0,003/min; `gpt-4o-transcribe-diarize` US$ 0,006/min; Whisper US$ 0,006/min | Transcrição com diarização | Limite de upload por arquivo (fatiar) | Ver tabela 3.4 |
| **Deepgram Nova-3** | Pré-gravado, multilíngue (inclui pt), diarização incluída, keyterm prompting | Transcrição com termos jurídicos | Nenhum relevante | US$ 0,0052/min multilíngue (US$ 0,31/h); keyterm +US$ 0,0013/min; US$ 200 de crédito grátis |
| **AssemblyAI** | Universal-3.5 Pro US$ 0,21/h; Universal-2 US$ 0,15/h; diarização +US$ 0,02/h | Transcrição barata | Página de preços não lista português explicitamente (confirmar); auto chapters descontinuado | US$ 50 de crédito grátis |
| **xAI (Grok) Speech to Text** | Transcrição REST | Transcrição mais barata encontrada | Qualidade em pt-BR não testada | US$ 0,10/h (REST) |
| **Grok 4.7 (LLM)** | Texto e imagem de entrada, saída texto (guia oficial do modelo) | EDL, capítulos, resumo sobre a transcrição; frames como imagem | **Não aceita vídeo** segundo a documentação oficial; contexto acima de 200 mil tokens cobra o dobro | US$ 2 entrada / US$ 6 saída por milhão de tokens |
| **Grok Imagine Video** | Gera vídeo a partir de texto/imagem/vídeo | Não serve para editar aula | É geração, não edição | US$ 0,05/s (480p) |
| **Gemini (vídeo nativo)** | Entende vídeo com áudio; ~100 tokens/s em resolução baixa; até 3 h por chamada com contexto de 1 milhão; timestamps MM:SS; File API até 20 GB | Capítulos por troca de slide, escolher frame de thumbnail, checar conteúdo visual | Preço do 3.8 Flash dobra em 01/01/2027 | 3.8 Flash US$ 0,75 entrada / US$ 3,75 saída por milhão (batch: metade); 2.5 Flash-Lite US$ 0,10 / US$ 0,40 |
| **Claude sobre transcrição** | Não recebe áudio nem vídeo; lê transcrição e imagens | Melhor qualidade de raciocínio para EDL, capítulos e resumo em pt-BR | Precisa de transcrição antes | Opus 5.5 US$ 4 / US$ 20; Sonnet 5.5 US$ 2 / US$ 10; Haiku 5.5 US$ 0,10 / US$ 0,50 por milhão; batch com 50% de desconto |
| **Opus Clip** | Corta vídeo longo em clipes virais com legenda e reframe; tem API e conector MCP (Pro e Business) | Cortes curtos para rede social | Feito para clipes de até 10-15 min, não blocos de 30-40 min; 1 crédito = 1 min de vídeo de origem | Starter US$ 15 (150 créditos); Pro US$ 29 (300 créditos) |
| **Vizard** | Semelhante ao Opus Clip; upload até 600 min no plano pago; API a partir do Creator | Cortes para rede social | Preço oficial não legível na página; terceiros divergem | Estimativa: cerca de US$ 29/mês (Capterra), 1 crédito = 1 min |
| **Remotion** | Vídeo em React, renderização headless | Thumbnails animadas, cartelas, legendas queimadas | Licença de empresa obrigatória a partir de 4 pessoas | Grátis até 3 pessoas; Automators US$ 0,01 por render com mínimo de US$ 100/mês |
| **HyperFrames** (HeyGen, Apache 2.0, 62,7 mil estrelas) | Vídeo e imagem a partir de HTML, feito para agentes; já temos as skills instaladas | Thumbnails e cartelas com o brand kit do IAE | Projeto novo (abril/2026) | Grátis |

### 3.4 Custo por hora de aula processada

Premissas declaradas (estimativas minhas, não de fonte): 1 h de aula em pt-BR rende cerca de 30 mil tokens de transcrição com timestamps por segmento; a esteira faz 3 passadas de LLM (EDL de erros e repetições; capítulos e resumo; cortes temáticos e títulos), somando cerca de 90 mil tokens de entrada e 15 mil de saída por hora; o passe visual do Gemini usa vídeo em resolução baixa (~360 mil tokens por hora) com ~10 mil tokens de saída. FFmpeg e render rodam na VPS que já existe (custo marginal considerado zero; ver seção Confiança).

Componentes isolados:

| Componente | US$ por hora de aula | R$ por hora | R$ por aula de 3 h | R$ por mês com 24 h de aula |
|---|---|---|---|---|
| xAI Speech to Text | 0,10 | 0,50 | 1,51 | 12,07 |
| AssemblyAI Universal-2 + diarização | 0,17 | 0,86 | 2,57 | 20,52 |
| OpenAI gpt-4o-mini-transcribe | 0,18 | 0,91 | 2,72 | 21,73 |
| AssemblyAI Universal-3.5 Pro | 0,21 | 1,06 | 3,17 | 25,35 |
| OpenAI gpt-transcribe | 0,27 | 1,36 | 4,07 | 32,59 |
| Deepgram Nova-3 multilíngue (diarização incluída) | 0,31 | 1,56 | 4,68 | 37,42 |
| OpenAI Whisper / gpt-4o-transcribe-diarize | 0,36 | 1,81 | 5,43 | 43,46 |
| Whisper local (faster-whisper) na VPS | 0 (CPU lenta, horas por aula) | 0 | 0 | 0 |
| LLM Claude Haiku 5.5 (3 passadas) | 0,02 | 0,10 | 0,30 | 2,41 |
| LLM Grok 4.7 (3 passadas) | 0,27 | 1,36 | 4,07 | 32,59 |
| LLM Claude Sonnet 5.5 (3 passadas) | 0,33 | 1,66 | 4,98 | 39,84 |
| LLM Claude Opus 5.5 (3 passadas) | 0,66 | 3,32 | 9,96 | 79,68 |
| Gemini 3.8 Flash, passe visual (padrão) | 0,31 | 1,56 | 4,68 | 37,42 |
| Gemini 3.8 Flash, passe visual (batch) | 0,155 | 0,78 | 2,34 | 18,71 |

Caminhos completos:

| Caminho | Composição | US$/h | R$/h | R$ por aula de 3 h | Observação |
|---|---|---|---|---|---|
| **Econômico** | xAI STT + Haiku 5.5 + FFmpeg | 0,12 | 0,60 | 1,81 | Qualidade de EDL a validar |
| **Recomendado** | xAI ou Deepgram STT + Sonnet 5.5 + FFmpeg | 0,43 a 0,64 | 2,16 a 3,22 | 6,49 a 9,66 | Bom equilíbrio para pt-BR jurídico |
| **Com visão** | Deepgram + Sonnet 5.5 + Gemini 3.8 Flash | 0,95 | 4,78 | 14,34 | Capítulos alinhados com troca de slide |
| **Premium** | Deepgram + Opus 5.5 + Gemini 3.8 Flash | 1,28 | 6,44 | 19,32 | Melhor qualidade de raciocínio |
| Descript Creator (mensal, usando as 30 h) | Assinatura por assento | 1,17 | 5,89 | 17,66 | Manual; API não exporta mídia |
| Descript Business (mensal, 40 h) | Assinatura por assento | 1,63 | 8,20 | 24,60 | Idem |
| Opus Clip Pro | 300 min/mês | 5,80 | 29,17 | 87,52 | Só clipes curtos; 3 h consome 180 dos 300 créditos |

Conclusão de custo: a esteira própria é irrelevante no custo total da plataforma (no pior caso, cerca de R$ 155/mês para 24 h de aula novas por mês). O custo real é o **nosso tempo de construção e manutenção**, não a API.

### 3.5 Viabilidade em 1 a 2 semanas de trabalho nosso

| Bloco | Esforço estimado | Risco |
|---|---|---|
| Upload grande (3 h, vários GB) para bucket com URL assinada + job na fila | 1 dia | Baixo (o Agente A define o bucket) |
| FFmpeg: extrair áudio, fatiar, silencedetect / auto-editor, aplicar EDL | 1,5 dia | Baixo |
| Transcrição com diarização + VTT/SRT + busca | 1 dia | Baixo |
| LLM: capítulos, resumo, títulos (com glossário jurídico no prompt) | 1 dia | Baixo |
| LLM: detecção de repetições e falsos começos (EDL) | 2 dias | **Médio a alto**: aula com dois professores tem pausas e retomadas intencionais; cortar errado tira conteúdo |
| Cortes temáticos de 30 a 40 min | 1 dia | Médio: tema raramente fecha em 30-40 min exatos |
| Thumbnails com template da marca (HyperFrames/HTML) | 1 dia | Baixo |
| Tela de revisão (lista de cortes, prévia, aprovar) | 2 dias | Baixo |
| **Total** | **cerca de 10 dias úteis (2 semanas de um sócio)** | |

Uma semana entrega a parte de baixo risco: silêncio + transcrição + legendas + capítulos + resumo + thumbnail. A segunda semana entrega repetições, cortes temáticos e a tela de revisão. **Não recomendo prometer "100% automático"**: a primeira versão deve ser "a IA propõe, o admin aprova".

Riscos e mitigação:

- **Áudio da sala presencial** (eco, microfone longe, alunos falando): transcrição piora e o limiar de silêncio falha. Mitigação: microfone de lapela nos dois professores; teste com a aula de 5 h que já existe antes de prometer.
- **Apagar conteúdo por engano**: nunca destruir o original; EDL reversível; revisão humana.
- **Tempo de processamento**: re-encode de 3 h em 1080p na CPU da VPS pode levar horas e competir com a plataforma. Mitigação: worker separado ou máquina sob demanda, fora do horário de aula. Decisão de infraestrutura fica com o Agente A.
- **Preços que mudam**: o Gemini 3.8 Flash dobra em 01/01/2027; trocar de modelo é configuração.
- **Termos jurídicos**: keyterm prompting (Deepgram) e glossário do IAE no contexto do LLM.

---

## 4. Ideia do Pedro: MCP e "um Claude" para o cliente ter autonomia

Proposta de como ficaria:

1. **Servidor MCP remoto dentro do nosso FastAPI** (HTTPS, OAuth, um token por usuário do admin do IAE). Ferramentas expostas:
   - `listar_aulas`, `ver_status_processamento(aula)`
   - `ler_transcricao(aula, trecho)`, `buscar_na_aula(termo)`
   - `propor_edicao(aula, instrucoes)` (gera EDL, não aplica)
   - `aplicar_edicao(aula, edl_id)` (gera nova versão como **rascunho**)
   - `gerar_cortes_tematicos(aula, duracao_alvo)`
   - `gerar_thumbnail(aula ou corte, titulo)`
   - `atualizar_metadados(aula, titulo, descricao, capitulos)`
   - `publicar(rascunho)` só cria pedido de publicação; a confirmação é feita na tela do admin
2. **Um Claude do lado do cliente**: Helena, Vinicius ou Ana Luiza conectam esse MCP como conector personalizado no Claude que já usam (Claude Pro a partir de US$ 17 a 20/mês por pessoa; Team Standard US$ 20 a 25 por assento/mês). Junto vai uma **skill `edicao-de-aula`** (instruções, glossário do IAE, regras de tom institucional). Exemplos de pedido: "corta a aula 3 do curso de Orçamento Jurídico em blocos de 30 a 40 min por tema e me mostra os títulos", "gera 3 trechos de 60 s para LinkedIn sobre contratação de escritório".
3. **Guardrails**: tudo vira rascunho; nada apaga o original; log de auditoria de cada chamada; limite de custo por mês na esteira; papéis (só admin publica).
4. **Por que isso é bom para o IAE**: autonomia sem depender de nós para cada vídeo, e a Helena (ponte técnica) consegue estender. Por que é bom para nós: a mesma esteira serve à tela de admin e ao Claude; o MCP é uma camada fina sobre endpoints que existiriam de qualquer jeito.
5. **Sinal de mercado**: Descript ("API + MCP") e Opus Clip ("MCP connector" nos planos Pro e Business) já oferecem exatamente essa forma de uso, o que valida o desenho.

Esforço adicional estimado do MCP: 2 a 3 dias sobre a esteira pronta (estimativa).

Sobre o Grok, citado pelo Rib: pode entrar como **um dos modelos** da esteira (transcrição a US$ 0,10/h e LLM de texto), mas não como "o modelo que vê o vídeo", porque a API oficial não aceita vídeo. Recomendo deixar o modelo configurável e decidir por teste cego com a aula de 5 h que o IAE já tem (mesma transcrição passada para Claude Sonnet 5.5, Grok 4.7 e Gemini 3.8 Flash, comparando capítulos e cortes).

## 5. Recomendação

1. Manter a esteira **guardada na manga**, como decidido, mas fazer um **spike de 1 dia** com a aula de 5 h existente: auto-editor + transcrição (xAI e Deepgram) + Sonnet 5.5 gerando capítulos e cortes. Isso dá a demonstração "olha o que a gente fez com a sua aula" para a próxima reunião, a custo de centavos.
2. Se o cliente quiser, entregar em 2 semanas como fase 2, no modo "IA propõe, admin aprova", com o MCP logo em seguida.
3. Reaproveitar o desenho do CVM do Matt Pocock (silêncio calibrado, fatias de ~27 min, autofill como job separado, bundle imutável) e usar HyperFrames (gratuito) em vez de Remotion (licença paga a partir de 4 pessoas).
4. Reaproveitar a ideia de "aula vira post curto" (linha Jack Roberts) só na fase de captação.

## Confiança

**Fatos verificados (fonte primária, 13/10/2026):**
- Repositório, README, ADRs 0024, 0033 e 0039, glossário e constantes de silêncio do mattpocock/course-video-manager; estrelas do CVM (807), skills (cerca de 290 mil), sandcastle (8,4 mil), auto-editor (5,5 mil, versão 31.7.2), HyperFrames (62,7 mil, Apache 2.0), via API do GitHub.
- Preços oficiais: OpenAI (transcrição), Deepgram, AssemblyAI, Gemini (preços e tokens por segundo de vídeo), Claude (tabela oficial), xAI (LLM, Imagine, Speech to Text), Descript, Remotion (licença), Claude Pro/Team.
- Guia oficial do Grok 4.7: entrada de texto e imagem; nenhuma menção a vídeo.
- Transcrição da reunião 2 (Wispr Flow) para o contexto de Matt Pocock, Jack Roberts, Grok e MCP.

**Estimativas (minhas):**
- Tokens por hora de aula (30 mil), número de passadas de LLM (3) e tokens de saída; portanto, todos os custos de LLM por hora.
- Custo de CPU/render considerado zero na VPS existente; o tempo real de re-encode de 3 h depende da máquina (não medido).
- Esforço em dias da seção 3.5 e do MCP.
- Preço do Vizard (fonte de terceiros, divergente) e créditos do Opus Clip (agregadores concordam em 150 e 300 créditos, página oficial não mostra).

**Sem resposta:**
- Se existe um produto de edição de vídeo do próprio Jack Roberts: não encontrado; identidade "@Itssssss_Jack" é inferida pelo contexto, não confirmada com o Rib.
- Se algum modelo Grok aceita vídeo pela API (um site de terceiros afirma que o Grok 4.3/4.5 aceita; a documentação oficial atual não confirma).
- Suporte oficial a português no AssemblyAI Universal-3.5 Pro (não listado na página de preços).
- Qualidade real de transcrição e de detecção de repetições em aula jurídica presencial com dois professores: só um teste com a aula do IAE responde.
- Preços oficiais da API do Opus Clip e do Vizard (não publicados).
- Se o Matt Pocock tem vídeo específico explicando o CVM (o Rib cita lives testando skills; a busca achou só o workshop de 24/04/2026 e cortes no Instagram).

## Fontes

Todas acessadas em 13/10/2026.

- https://github.com/mattpocock/course-video-manager
- https://github.com/mattpocock/course-video-manager/blob/main/CONTEXT.md
- https://github.com/mattpocock/course-video-manager/tree/main/.claude/skills
- https://github.com/mattpocock/course-video-manager/tree/main/docs (ADRs 0024, 0033, 0039 e GLOSSARY.md, lidos via API do GitHub)
- https://github.com/mattpocock/skills
- https://github.com/mattpocock/sandcastle
- https://www.aihero.dev/
- https://www.aihero.dev/cohorts/claude-code-for-real-engineers-2026-04
- https://x.com/mattpocockuk/status/2056447804537741327
- https://github.com/shanraisshan/claude-code-best-practice/blob/main/videos/claude-matt-pocock-24-apr-26.md
- https://www.youtube.com/watch?v=Q3uuE2adUT8
- https://www.instagram.com/reel/Dd61VJkkb8D/
- ~/Documents/Last30Days/matt-pocock-raw-v3-2026-10-13.md (saída do last30days)
- https://www.youtube.com/@Itssssss_Jack/videos
- https://jackroberts.ai/
- https://www.skool.com/aiautomationsbyjack/about
- https://www.skool.com/@jack-roberts
- https://creatordb.app/creatorstats/itssssss_jack/
- https://creatordb.app/creatorstats/jackroberts___/
- https://chooseto.ai/creator/Itssssss_Jack
- https://maily.so/josh/posts/vpzl2jp2rk9
- https://github.com/datassthou64-source/JackRobertsMotionGraphicSkill
- https://jackaistudio.com/
- https://notes.wisprflow.ai/shared/HbHxBPoTdgpzyFYGWY7ZuAYBrw4X6pmr5jnm87V3XoM (reunião 2)
- https://docs.x.ai/developers/pricing
- https://docs.x.ai/developers/grok-4-7
- https://docs.x.ai/developers/model-capabilities/images/understanding
- https://suprmind.ai/hub/grok/ (terceiro, afirmação não confirmada sobre vídeo)
- https://developers.openai.com/api/docs/pricing
- https://deepgram.com/pricing
- https://www.assemblyai.com/pricing
- https://ai.google.dev/gemini-api/docs/pricing
- https://ai.google.dev/gemini-api/docs/video-understanding
- https://platform.claude.com/docs/en/about-claude/pricing
- https://claude.com/pricing
- https://www.descript.com/pricing
- https://www.descript.com/api
- https://www.opus.pro/pricing
- https://www.opus.pro/api
- https://quso.ai/blog/opus-clip-pricing (terceiro, créditos do Opus Clip)
- https://www.usagepricing.com/blueprint/opus-clip (terceiro)
- https://vizard.ai/pricing
- https://www.capterra.com/p/10009818/Vizard/pricing/ (terceiro)
- https://github.com/WyattBlue/auto-editor (e documentação via Context7, /wyattblue/auto-editor)
- https://www.remotion.pro/license
- https://github.com/heygen-com/hyperframes
- Cotação: AwesomeAPI, USD-BRL 5,03 em 13/10/2026 (fornecida pelo orquestrador)
