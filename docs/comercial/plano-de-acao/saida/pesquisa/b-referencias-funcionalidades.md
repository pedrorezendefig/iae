# Agente B: plataformas de referência e funcionalidades (consolidado)

Data da pesquisa: 13/10/2026. Cotação usada nas três partes: **USD 1 = R$ 5,03** (AwesomeAPI, 13/10/2026). Todos os preços em USD foram convertidos com essa cotação; preços de lista, pagamento conforme uso, sem impostos (IOF de cartão internacional não incluído).

Este arquivo junta as três partes do Agente B, na ordem dos itens da seção 6 do PROMPT.md:

- itens 1 e 2 (referências do cliente; construir vs comprar vs compor): parte **b1** (`b1-referencias-construir-comprar.md`);
- item 3 (Matt Pocock, Jack Roberts e esteira de edição): parte **b3** (`b3-matt-pocock-jack-roberts-edicao.md`);
- itens 4, 5 e 6 (funcionalidades, pagamentos, UX sem tutorial): parte **b2** (`b2-funcionalidades-pagamentos-ux.md`).

O texto, as tabelas, os números e os blocos de código das partes foram preservados. O editor só renumerou seções, ajustou referências cruzadas, inseriu **"Nota do editor"** onde as partes se contradiziam e unificou "Confiança" e "Fontes" no final.

**Observações de método das partes:**

- b1: a cota de buscas na web da sessão acabou logo no início desta pesquisa. Por isso, quase tudo veio de leitura direta das páginas oficiais (WebFetch e navegador Playwright para sites que bloqueiam leitura simples, como FGV e Insper) e dos PDFs oficiais de edital/investimento. Isso aumenta a confiabilidade dos números (fonte primária), mas reduz a cobertura de opiniões de terceiros.
- b2: o orçamento de buscas na web acabou no meio da pesquisa (limite compartilhado entre os agentes). Daí em diante, só foram abertas páginas oficiais diretamente. Os portais do MEC e do Planalto não responderam (ENOTFOUND e ECONNRESET). Por isso, a parte regulatória (MEC e tributária) vem de conhecimento prévio e está marcada como **a verificar** na seção Confiança.

---

## Resumo do Agente B

1. **Mercado:** Insper (36 a 40 h, de R$ 7.321,27 no Live Learning a R$ 11.470,80) e FGVlaw (pós de 432 h-a, R$ 53.935) já vendem gestão jurídica, mas só para líderes com 2 a 5 anos de experiência. O espaço livre do IAE é a porta de entrada do advogado in-house, em formato curto, online e mais barato.
2. **Preço por hora:** IAE R$ 83/h; Future Law R$ 50 a 77/h (R$ 15 a 23/h na promoção); FGVlaw R$ 150 a 165/h-a; Insper R$ 203/h (Live Learning) a R$ 272/h (presencial). O formato do IAE (8 encontros noturnos) é o mesmo do "curta duração" da FGVlaw (8 encontros, 32 h-a, R$ 5.275).
3. **Copiar:** "Live Learning" do Insper (mesmo curso presencial e ao vivo online), gravação de toda aula ao vivo e professores com nome e cargo (Future Law), preço e programa transparentes e selos (FGV/Insper), "Continuar assistindo", PWA e certificado com código verificável (Members Club). **Evitar:** promoção permanente, contador regressivo, gamificação, vitrine Netflix escura, plataforma em pedaços.
4. **Plataformas prontas:** Hotmart (9,9% + R$ 2,49), Kiwify (8,99% + R$ 2,49) e Eduzz (4,9% + R$ 2,49) custam cerca de R$ 100 a R$ 200 por venda de R$ 2.000 e têm cara de infoproduto; Memberkit e Cademí não hospedam vídeo; Thinkific limita banda (100 a 400 GB/mês) e só faz trilhas no Plus; Moodle/Open edX fazem trilha, mas com UX datada ou operação pesada.
5. **Veredito: COMPOR.** App próprio (Next.js + FastAPI + Postgres) com as regras de negócio do IAE, alugando vídeo gerenciado (Mux, Cloudflare Stream ou Bunny, decisão do Agente A), gateway e live (Zoom/Meet no MVP). Plano B: Thinkific Start (US$ 82/mês no plano anual, R$ 412,46; US$ 109, R$ 548,27, no mensal) ou Memberkit Essencial (R$ 197/mês, até 1.000 membros; planos de R$ 197 a 697/mês).
6. **Matt Pocock** mantém o Course Video Manager (aberto, 807 estrelas): silêncio por FFmpeg a -38 dBFS, fatias de ~27 min, autofill de capítulos com LLM como job separado, bundle imutável MP4 + JSON. **Jack Roberts** não tem ferramenta própria de edição verificada; serve só para "aula vira post curto" na fase de captação.
7. **Esteira de edição automática:** US$ 0,12 a 1,28 por hora de aula (R$ 0,60 a 6,44); aula de 3 h sai entre R$ 1,81 e R$ 19,32; cerca de 10 dias de um sócio, modo "IA propõe, admin aprova", mais 2 a 3 dias para o MCP. A API do Grok não aceita vídeo; o Gemini aceita até 3 h por chamada.
8. **Funcionalidades:** 53 na lista técnica (43 na versão enxuta para o cliente). MVP cerca de 48 dias-pessoa (capacidade de 60 a 75 até 05/12/2026), fase 2 cerca de 60, fase 3 cerca de 60 mais a parceria acadêmica.
9. **Pós-graduação:** sem IES credenciada o IAE não pode usar o nome "pós-graduação" (Res. CNE/CES 1/2018: 360 h, 30% de mestres/doutores; a verificar). Trilha, histórico e certificação reconhecida ficam na fase 3; o modelo de dados de trilha nasce no MVP.
10. **Pagamentos: Asaas.** Pix e boleto a R$ 1,99 fixos, cartão 2,99% + R$ 0,49, até 12x (21x Visa/Master), Pix Automático, NFS-e a R$ 0,49, sem mensalidade. Plano B: Pagar.me (12x a 20,95% com D+1). Não usar Stripe (sem parcelamento no Brasil), Hotmart nem Vindi (R$ 299 a 1.119/mês).
11. **Parcelamento:** Pix como padrão, até 6x sem juros, 7x a 12x com juros do cliente, sem antecipação no início (evita 8% a 11%).
12. **Associação sem fins lucrativos:** emitir NFS-e com imunidade para toda venda; cadastrar MCC 8299 (educação); cuidado com "sócios" e remuneração de dirigentes (pode derrubar a imunidade). Tudo a validar com contador.
13. **UX sem tutorial:** sem tour (NN/g), uma ação principal por tela, menu de 3 itens e 2 níveis, estados vazios que ensinam, checkout de uma página com Pix pré-selecionado. Onboarding só para a equipe do IAE no admin.

---

## Contradições entre as partes e qual número prevalece

| # | Tema | O que uma parte diz | O que a outra diz | O que prevalece | Por quê |
|---|---|---|---|---|---|
| 1 | Taxa da Hotmart | b1: **9,9% + R$ 2,49** por venda (página oficial hotmart.com/pt-br/taxa-hotmart lida em 13/10/2026) | b2: "cerca de 9,9% + R$ 1,00" (conhecimento prévio; a página oficial não carregou) | **b1: 9,9% + R$ 2,49** | Fonte primária lida no dia; a própria b2 marcou o número como estimativa. Efeito: venda de R$ 2.000 custa **R$ 200,49** (não R$ 199,00) e assinatura de R$ 99 custa **R$ 12,29** (não R$ 10,80). As tabelas 5.1 e 5.2 foram corrigidas com nota. |
| 2 | Custo do gateway direto | b1: estimativa de **3% a 5%** (R$ 60 a 100 por venda de R$ 2.000; R$ 6.000 a 10.000 por 100 vendas; R$ 594 a 990/mês no clube de 200 x R$ 99) | b2: taxas oficiais do Asaas: Pix **R$ 1,99**, cartão à vista **R$ 60,29**, 12x absorvido **R$ 80,29** mais R$ 160 a 220 de antecipação, assinatura R$ 99 no cartão **R$ 3,45** | **b2** | Tabela oficial vigente, enquanto a b1 declarou o número como provisório "até o Agente B fechar o item de pagamentos". Recalculado pelo editor com Asaas: R$ 1,99 (Pix) a R$ 60,29 (cartão à vista) por venda; **R$ 199 a R$ 6.029** por 100 vendas; **R$ 690/mês** para 200 assinaturas de R$ 99 no cartão (200 x R$ 3,45). A diferença para Hotmart fica maior do que a b1 calculou, o que reforça o veredito "compor". |
| 3 | Edição automática de aula crua: esforço | b2 (item 52): **10 a 15 dias** | b3: **cerca de 10 dias úteis** (detalhado por bloco na seção 3.3.5), mais **2 a 3 dias** de MCP | **b3 no esforço: 10 dias para a esteira e 12 a 13 com MCP** | A b3 quebra o trabalho em 8 blocos com risco por bloco; o total cai dentro da faixa da b2, então não há conflito de ordem de grandeza, só de precisão. |
| 4 | Edição automática: fase | b2: **Fase 3** ("guardada na manga") | b3: spike de 1 dia já, entrega como **fase 2** "se o cliente quiser" | **b2 (Fase 3) como plano base; b3 como opção de antecipação** | A decisão da reunião 2 foi guardar a esteira na manga. O spike de 1 dia (custo de centavos) não muda a fase e serve de demonstração; antecipar para a fase 2 depende de o cliente pedir. |
| 5 | Transcrição das aulas (item 30) | b2: "Whisper", **3 dias**, fase 2 | b3: transcrição por **API** (xAI US$ 0,10/h a OpenAI US$ 0,36/h) em **1 dia** como bloco da esteira; Whisper local na VPS é "CPU lenta, horas por aula" | **Tecnologia: b3 (API). Esforço: b2 (3 dias)** | A b3 mediu custo e desempenho; Whisper local só faz sentido com GPU (o Matt usa RTX 4060). Os 3 dias da b2 incluem legendas no player e busca, além do bloco de 1 dia da b3. Se a esteira for feita, os dois itens se sobrepõem e o editor estima economia de cerca de 1 dia. |
| 6 | Prazo e esforço do MVP | b1: **6 a 7 semanas**, cronograma até 01/12/2026 | b2: **cerca de 48 dias-pessoa**, capacidade de 60 a 75 dias-pessoa até 05/12/2026 | **Compatíveis; vale o esforço da b2 e o calendário da b1** | A b2 dá a conta de esforço por item; a b1 dá a sequência semanal. A folga é de 12 a 27 dias-pessoa para QA e ajustes. |
| 7 | Trilha de pós no MVP | b1: modelo de dados de programa, módulo, pré-requisito e histórico **desde o MVP** | b2: itens 48 a 50 na **fase 3** | **As duas: tabelas no MVP, telas e regras na fase 3** | Não é contradição de fato: a b1 fala do esquema de banco, a b2 das funcionalidades. Desenhar cedo evita migração; o custo cabe na modelagem da semana 1 (estimativa do editor). |
| 8 | Mural de avisos do clube | b1: "comentários por aula e mural de avisos no MVP" e "clube de membros básico (área de benefícios e parcerias, mural)" na semana 7 | b2: o mural não aparece entre as 53 funcionalidades | **b2 (lista)**, com o mural como pendência | A lista da b2 é a que vai ao cliente. O mural pode ser um bloco da página de benefícios (item 27), mas ninguém estimou; fica nas pendências. |
| 9 | Peso do vídeo e custo dos provedores | b1: 0,7 a 1,5 GB por hora em 1080p (estimativa); exemplo Mux US$ 18/mês e Cloudflare Stream US$ 78/mês | b2 e b3 deixam a decisão de vídeo ao Agente A | **Agente A** | A própria b1 declarou que o Agente A deve substituir esses números. Ficam aqui como referência até a consolidação. |

---

## 1. Referências do cliente (Members Club, Future Law, FGV, Insper)

### Resumo dos itens 1 e 2 (parte b1, em 10 linhas)

1. **O mercado de "jurídico in-house" não está vazio**: o Insper vende "Gestão Estratégica de Departamento Jurídico" (40 h e R$ 10.885,74 no presencial; 36 h e R$ 7.321,27 no Live Learning noturno) e "Estratégias Avançadas para Líderes Jurídicos" (40 h, R$ 11.470,80); a FGV Direito SP vende a pós "Gestão Jurídica Executiva" (432 h-a, R$ 53.935). Todos miram **líderes com 2 a 5 anos de experiência**. O espaço livre do IAE é o público de entrada (estudante, recém-formado, quem migra de escritório), em formato curto, online e mais barato.
2. **Preço por hora**: IAE R$ 83/h; Future Law R$ 50 a 77/h cheio (R$ 15 a 23/h na promoção); FGVlaw curta duração R$ 150 a 165/h-a; Insper R$ 203/h (Live Learning) a R$ 272/h (presencial). O IAE está no meio, mais perto de Future Law do que de FGV/Insper. Há espaço para subir preço quando a credibilidade estiver construída.
3. **O formato do IAE (8 encontros noturnos) é idêntico ao "curta duração" da FGVlaw** (8 encontros, 32 h-a, terças 19h às 22h40, R$ 5.275). Isso é bom para posicionamento: o IAE fala a língua das escolas de elite.
4. **Members Club** (mymembersclub.com.br) é uma área de membros "Netflix" para infoprodutor: R$ 597/mês (ou R$ 0 com o checkout Applyfy), alunos ilimitados, white-label, domínio próprio. Não informa hospedagem de vídeo, assinatura nem trilhas. É referência de **experiência do aluno**, não de tom.
5. **Future Law** é a referência mais próxima em conteúdo: gravação de encontros ao vivo, microlearning, nanodegree, B2B ("Future Law In"), evento anual. Mas usa promoções agressivas (70% OFF, lotes, contador) e uma colcha de plataformas (Thinkific, "Spaces", checkout terceirizado, WhatsApp). Copiar o formato, evitar o varejo.
6. **Plataformas brasileiras de infoproduto** (Hotmart 9,9% + R$ 2,49 por venda; Kiwify 8,99% + R$ 2,49; Eduzz 4,9% a 6,9% + R$ 2,49) carregam a "cara de infoproduto" que o cliente rejeita, ficam com a relação com o aluno e cobram cerca de **R$ 200 por venda de um curso de R$ 2.000**.
7. **Áreas de membros puras** (Memberkit R$ 197 a 697/mês; Cademí sem preço público) são baratas e white-label, mas **não hospedam vídeo** (exigem Panda, Vimeo, VdoCipher) e são desenhadas para o funil de infoproduto.
8. **LMS internacionais** (Teachable, Thinkific, Kajabi) têm visual mais sóbrio, mas cobram em dólar (R$ 350 a 2.500/mês), têm limites de banda de vídeo (Thinkific: 100 a 400 GB/mês) e trilhas com pré-requisito só nos planos Enterprise. **Comunidades** (Circle, Mighty) são peças de comunidade, não de curso. **Moodle/Open edX** resolvem pós e trilha, mas têm operação pesada e UX datada.
9. **Veredito: COMPOR.** Construir o app (Next.js + FastAPI + Postgres) com as regras de negócio do IAE (assinatura + vitalício + trilha de pós, B2B, admin, IA) e **alugar as três peças que não são nosso forte**: vídeo gerenciado (Mux, Cloudflare Stream ou Bunny Stream), gateway de pagamento e a ferramenta de live (Zoom/Meet no MVP). O risco que os sócios temem (vídeo) sai do nosso colo; o que o cliente valoriza (tom institucional, regras próprias, dados próprios) fica conosco.
10. **Plano B honesto**: se o MVP de dezembro ficar em risco, Thinkific (Start, US$ 82/mês anual ou US$ 109/mês no mensal) ou Memberkit Essencial (R$ 197/mês) com Panda Video colocam um clube no ar em dias, ao custo de tom e de lock-in. Recomendamos não começar por aí.

### 1.1 Members Club

**Identificação.** Pela descrição do cliente ("faz uma Netflix do seu negócio", plataforma de assinatura), a correspondência mais provável é o **Members Club** em mymembersclub.com.br, que se apresenta como "a área de membros nº 1 do Brasil" com vitrine estilo Netflix. Não foi possível confirmar por busca se é exatamente a mesma que o Vinicius olhava (ver Pendências). Há vários clones com proposta parecida (TheMembers, Flow Members, Members Flix, Prime Membros).

| Item | O que encontramos |
|---|---|
| Modelo de negócio | SaaS de área de membros para infoprodutores. Dois planos: "Members Club + Applyfy" (R$ 0/mês, paga só a taxa do checkout Applyfy, valor não informado) e "Members Club Pro" (R$ 597/mês, qualquer gateway: Hotmart, Eduzz, Kiwify, Stripe). Sem taxa por aluno ou por venda no Pro. |
| Limites | Alunos ilimitados, 10 workspaces por conta. Sem contrato, cancela em 1 clique; cobrança começa ao publicar. |
| Área de membros | Vitrine Netflix (banner hero, cards de módulo, "Continuar assistindo"), barras de progresso por curso/módulo/aula, comunidade (posts, fixados, moderação, menções, push), gamificação (pontos, níveis, ranking), quizzes com correção automática, automações (gatilhos, tags, e-mails, liberação). |
| Lives | Integração com YouTube ou Zoom, chat ao vivo, alerta push. Não é live própria. |
| Certificado | PDF automático com código de verificação. |
| App | PWA (ícone na tela inicial, push, uso offline), sem loja de apps. |
| White-label | Cores, logo, favicon, banner, layout de login, tema claro/escuro/automático, domínio próprio via CNAME com SSL. |
| Segurança declarada | Cloudflare WAF, AES-256, RLS em 49 tabelas, 2FA opcional, trilha de auditoria, backup diário, pentest externo, "99,9% de uptime garantido". |
| O que a página **não** diz | Hospedagem de vídeo e limites, assinatura recorrente, compra vitalícia, trilhas/pré-requisitos, API, empresa responsável (só "100% brasileira"). |
| Prova social exibida | "Mentoria Beleza Digital", "Curso Trader Profissional", "Imersão Confeitaria". |

**O que é bom:** o padrão de experiência do aluno é o que o público jovem espera (continuar de onde parou, progresso visível, PWA, push). Certificado com código verificável é barato e gera confiança. Preço fixo sem taxa por venda é o modelo certo para ticket alto.

**O que falta para o IAE:** nada sobre vídeo (o maior custo e risco), nada sobre trilha de pós com pré-requisito, nada sobre B2B com assentos. Prova social e linguagem são de infoproduto (trader, confeitaria), exatamente o oposto do tom FGV/Insper.

**Copiar:** "Continuar assistindo", progresso por módulo, PWA com push, certificado com código de verificação público, domínio próprio do IAE, tema claro como padrão.
**Evitar:** gamificação com ranking e pontos (infantiliza o advogado sênior), vitrine escura "maratonável", depoimentos de faturamento, automações de upsell agressivas.

### 1.2 Future Law

| Item | O que encontramos |
|---|---|
| Modelo de negócio | Edtech de Direito e tecnologia, 6 anos de mercado. B2C (cursos) + B2B ("Future Law In", treinamentos corporativos) + evento anual presencial ("Future Law Experience", Expo Center Norte) + blog e conteúdos gratuitos. |
| Formatos | Ao vivo (dúvidas direto com os professores, chamados de "hitmakers"); gravados (encontros ao vivo que viram gravação); microlearning gravado em estúdio com podcasts, missões, quizzes, e-books; "Nanodegree" (certificado ao concluir). |
| Preço (exemplos) | Legal Operations: 30 h-a, **R$ 1.497 cheio, R$ 449,10 na promoção**. Tech-Driven Law: 17 h-a, R$ 1.197 / R$ 359,10. Concorrência: 20 h-a, R$ 1.297 / R$ 389,10. Poder Público 4.0: 25 h-a, R$ 1.397 / R$ 419,10. Eficiência com IA: 13 h-a, R$ 997 / R$ 299,10. Promoções na home: 70% OFF em gravados, "compre 1 e ganhe outro", cupons de 30%. |
| Acesso | Gravados disponíveis por **7 meses** a partir da compra. |
| Área do aluno | Fragmentada: "portal do aluno", "Future Law Spaces", link "Sou Future Lawyer" para uma escola na **Thinkific** (future-s-school-5d1d.thinkific.com), checkout em futurelaw.site.engaged.com.br, suporte por WhatsApp, e-mail e chat. |
| Comunidade | Grupo de WhatsApp de alunos, "Future Lovers", "Future Lawyers". |
| Credibilidade | Imprensa (Folha: "o maior centro de inovação e tecnologia para o mercado de direito na América Latina"; Exame, JOTA, Você S/A), depoimentos nominais com empresa (Burger King, Pottencial, Topaz), professores com nome e cargo (até 4 por módulo, de empresas e escritórios), DPO indicado. |
| Página de venda | Barra de lote com prazo, contador regressivo de "oferta limitada", formulário antes do conteúdo, resíduo de template ("100% Gratuito" ao lado do preço), texto de acesso contraditório ("7 meses" e "até 1 mês"). |

**O que é bom:** é exatamente o modelo que o cliente descreveu: encontro síncrono gravado e reaproveitado "ad eternum", módulos com muitos professores de mercado, B2B separado, evento presencial como âncora de marca, conteúdo gratuito como funil.

**O que falta / o que dá errado:** desconto de 70% permanente destrói a âncora de preço (o "cheio" vira ficção); acesso limitado a 7 meses irrita quem paga caro; quatro ambientes diferentes para o aluno; erros de template na página de venda. Para um curso de R$ 2.000, isso mina confiança.

**Copiar:** gravar toda aula ao vivo e publicar automaticamente; "hitmakers" (professores com nome, foto, empresa e cargo, que no IAE é o principal ativo: 30 anos de White Martins); trilha "nanodegree" que agrupa cursos; linha B2B separada; evento anual; curso gratuito curto como porta de entrada.
**Evitar:** promoção permanente, contador regressivo, lotes; acesso com prazo curto (preferir vitalício para compra avulsa e acesso enquanto assinante para o clube); plataforma em pedaços.

### 1.3 FGV (FGV Online, FGV Direito Rio e FGV Direito SP / FGVlaw)

| Item | O que encontramos |
|---|---|
| Cursos gratuitos | Portal cursosgratuitos.fgv.br (FGV foi a primeira brasileira no consórcio Open Education Global, 2008). Cursos **autoinstrucionais de 1 a 9 h-a**, a maioria de **5 h-a**, sem tutor, com nota e contagem de avaliações (ex.: "Acesso à Informação", 5 h-a, 4,9 estrelas, 25.419 avaliações) (estimativa, não verificada: o portal não carregou na verificação). Há série "FGV Direito SP". É o "curso curto de 5 horas" que o cliente citou. |
| Online pago | MBA Online, Pós Online, Curta e Média Online, Trilha Executiva Online (modular e progressiva até o MBA). Metodologia em 5 passos: login no Portal do Aluno, primeira semana de ambientação na plataforma (ECLASS FGV), conteúdo disponível desde o 1º dia com **professor-tutor**, avaliação (trabalho individual nos curtos; PBL/PjBL no MBA e pós), central de relacionamento e suporte acadêmico. Selo "Prêmio RH Top of Mind, 16 vezes vencedora em EAD". |
| FGVlaw curta duração (SP) | Programas de **8 encontros**. Ex.: Compliance Empresarial e Gestão de Riscos Corporativos: **32 h-a, 8 encontros, presencial, terças 19h às 22h40**, início 06/04/2027, público "graduados em Direito atuantes em departamentos jurídicos". Investimento: **R$ 4.790 com desconto / R$ 5.275 sem desconto** à vista; 1+5 de R$ 828,34 a R$ 912,21. |
| FGVlaw pós lato sensu (SP) | 15 pós, 2 a 3 semestres, presencial ou blended. **Gestão Jurídica Executiva**: 432 h-a, segunda a quarta 19h às 22h40, público com 5+ anos em escritório ou departamento jurídico, 10 disciplinas obrigatórias + 4 optativas. Investimento: **R$ 48.910 com desconto / R$ 53.935 sem desconto** à vista, até 1+29 parcelas (R$ 2.006,48 a R$ 2.212,62). |
| FGV Direito Rio | Graduação, LL.M. em Direito, educação continuada (curta duração), mestrado profissional em Direito Empresarial e Arbitragem, eventos (inclusive "IA na Advocacia"). Sem preço na home. |
| Credibilidade | Selo e-MEC, ISO 9001 há mais de 10 anos (BSI/INMETRO/ANAB/UKAS), Centro de Excelência Jean Monnet, centros de pesquisa, ouvidoria, comitê de ética, página de "Fatos e Números", edital e programa em PDF com tabela de investimento. |

**O que é bom:** transparência documental (edital, programa, tabela de investimento), metodologia explicada antes da compra, selos regulatórios, cursos gratuitos de 5 h com milhares de avaliações como funil gigantesco. O formato curta duração (8 encontros noturnos) é o mesmo do IAE.

**O que falta:** o site de educação executiva é pesado (JavaScript que não carrega sem navegador completo, filtro de área que falha), o preço fica escondido em PDF, o ambiente do aluno (ECLASS) é separado do portal. A FGVlaw não tem curso de entrada para in-house; a pós de gestão jurídica exige 5 anos de experiência.

**Copiar:** página "Como funciona" com os passos da jornada do aluno; programa em PDF bonito por curso; selo e números institucionais (no IAE: parcerias UERJ e OAB, trajetória dos professores); curso gratuito curto com avaliação pública; ambientação na primeira semana.
**Evitar:** preço escondido em PDF, site lento, portal e ambiente de aula separados.

### 1.4 Insper (Direito, educação executiva, Live Learning)

| Item | O que encontramos |
|---|---|
| Pós em Direito | 7 LL.M. noturnos (Trabalho, Tributário, Mercados Financeiro e de Capitais, Contratos, Societário, Regulação do Mercado de Capitais, Empresarial). Preço 2026: **R$ 53.420 à vista** (Direito do Trabalho: R$ 42.800), até 30x. Desconto de 25% para ex-alunos (Alumni). Parceria com Notre Dame Law School. |
| Educação executiva em Direito | 26 cursos em ee.insper.edu.br/cursos/direito. Modalidades "Presencial" e **"Live Learning"** (online ao vivo). |
| Concorrente direto | **Gestão Estratégica de Departamento Jurídico**: presencial com 40 h (seg a sex, 9h às 18h, 26 a 30/10/2026) ou Live Learning com 36 h (seg e qua, 19h30 às 22h, 04/11 a 14/12/2026). Pré-requisito: 2 anos em cargo de liderança. Presencial: **R$ 10.885,74** integral, R$ 9.797,17 matrícula antecipada, R$ 8.164,31 Alumni. Live Learning: **R$ 7.321,27** integral (R$ 203/h), R$ 6.589,14 antecipada, R$ 5.490,95 Alumni. Até 10x sem juros. Conteúdo: orçamento, indicadores, gestão de terceirizados e contencioso, carreira em Y, expatriação, carreira pós-corporativa. 17 professores, maioria executivos jurídicos. |
| Sequência (trilha) | **Estratégias Avançadas para Líderes Jurídicos**: 40 h, R$ 11.470,80. Pré-requisito: ter feito o curso anterior (presencial ou online) ou MBA com 5 anos de gestão. É uma trilha com pré-requisito explícito. |
| Processo seletivo | Inscrição, análise de perfil, aprovação, matrícula digital; **programas de Direito têm entrevista**. |
| Credibilidade | e-MEC, consulta pública de registro de diplomas, corpo docente com foto e nome por modalidade, núcleo de carreiras, comunidade Alumni ("uma vez Insper, sempre Insper"), biblioteca, intercâmbio, página pública "Quanto custam os cursos" com tabela por programa. |

**O que é bom:** é a referência mais próxima do que o IAE quer ser, e confirma o formato híbrido: **o mesmo curso em presencial e em online ao vivo (Live Learning)**, com o mesmo corpo docente. Preço transparente na própria página do curso, com desconto Alumni e antecipado. Trilha com pré-requisito. Entrevista como sinal de exclusividade.

**O que falta:** não há oferta para quem está entrando na carreira in-house; os cursos exigem liderança. O Insper não vende assinatura nem conteúdo curto avulso. O site bloqueia acesso automatizado (não afeta o aluno).

**Copiar:** "Live Learning" como nome de modalidade (o IAE pode ter "Presencial", "Ao vivo online" e "Gravado"); preço na página com condições claras; desconto para ex-aluno (vira benefício do clube); trilha com pré-requisito declarado; página de professores com foto e cargo; entrevista ou "aplicação" para turmas premium.
**Evitar:** catálogos com filtros demais, linguagem genérica de escola de negócios.

### 1.5 Comparativo das referências

| | Members Club | Future Law | FGV (FGVlaw SP) | Insper | IAE hoje |
|---|---|---|---|---|---|
| Natureza | SaaS de área de membros | Edtech jurídica | IES (e-MEC) | IES (e-MEC) | Escola livre sem fins lucrativos |
| Curso curto típico | n/a | 13 a 30 h-a | 32 h-a, 8 encontros | 36 h (Live Learning) a 40 h (presencial) | 24 h, 8 encontros |
| Preço do curto | n/a | R$ 997 a 1.497 (promo 70% off) | R$ 4.790 a 5.275 | R$ 7.321 a 11.470 | cerca de R$ 2.000 |
| R$ por hora | n/a | R$ 50 a 77 (R$ 15 a 23 na promo) | R$ 150 a 165 por h-a | R$ 203 (Live Learning) a 272 (presencial) | R$ 83 |
| Assinatura | sim (o produto) | não identificado | não | não | desejada |
| Ao vivo online | via YouTube/Zoom | sim | não no curto (presencial) | sim (Live Learning) | desejado |
| Gravação do ao vivo | n/a | sim | n/a | não informado | desejado |
| Trilha com pré-requisito | não informado | nanodegree | pós de 432 h-a | sim (curso avançado) | desejado (pós) |
| B2B | n/a | Future Law In | in company | "Customizados para Organizações" | escritórios (público 4) |
| Tom | infoproduto | moderno, varejo | institucional | institucional | institucional desejado |

**Achado que precisa ir para a proposta:** o posicionamento "não existe isso no mercado" é verdadeiro para o público de entrada e para o formato curto/online/acessível, mas **não** para líderes jurídicos: Insper e FGVlaw já vendem gestão de departamento jurídico com professores executivos. A proposta deve posicionar o IAE como "a porta de entrada e a formação contínua do advogado in-house", e não como o único curso de gestão jurídica.

---

## 2. Plataformas prontas e construir vs comprar vs compor

Valores mensais em USD convertidos a R$ 5,03. "Taxa por venda" é da plataforma; o processamento do cartão pode ser cobrado à parte.

### 2.1 Tabela comparativa

| Plataforma | Mensalidade | Taxa por venda | Vídeo e hospedagem | Assinatura + vitalício + trilha | API / white-label / domínio | Tom institucional | Lock-in |
|---|---|---|---|---|---|---|---|
| **Hotmart (Club)** | R$ 0 | **9,9% + R$ 2,49** (até 8,9% acima de R$ 500 mil/ano); recebimento em 30 dias ou antecipação 2,19% a 4,79% | Hotmart Player incluso, antipirataria com criptografia, marca d'água | Assinatura e produto único sim (estimativa: convivem como produtos separados na mesma área); trilha com pré-requisito não identificada | API de vendas; área de membros com marca, domínio próprio não verificado | Baixo: marketplace de afiliados, "Comunidade 7 dígitos" | **Alto**: checkout, base de compradores e vídeos na Hotmart |
| **Kiwify** | R$ 0 | **8,99% + R$ 2,49**; Pix em 2 dias, cartão em 15 ou 2 dias | Hospedagem "sem custos extras", app para alunos | Assinatura sim (FAQ), trilha não | Não verificado | **Muito baixo**: a própria página promete viagem a Dubai com Lamborghini a quem faturar R$ 10 milhões | **Alto** |
| **Eduzz (Eduzz Membros / ex-Nutror)** | R$ 0 | **4,9% + R$ 2,49** (Básico) a 6,9% (Intermediário); 4,59% acima de R$ 1 MM/ano; saque R$ 1,99; parcelamento 3,49% | SafeVideo integrado; armazenamento de mídia 2 GB (Básico), 250 GB (Intermediário), 1 TB (Unity) | Eduzz Assinaturas existe; "trilhas de conteúdo" citadas; integração com "secretaria digital" | Documentação de API pública | Baixo | **Alto** |
| **Memberkit** | **R$ 197** (1.000 membros), **R$ 497** (5.000), **R$ 697** (15.000); até 500 mil membros | 0% (não processa pagamento: integra Hotmart, Eduzz, Monetizze e outros) | **Não hospeda vídeo**: exige YouTube, Vimeo, Panda Video ou Smart Player | Perpétuo, recorrência ("clube de assinaturas") e lançamento; liberação programada por dias ou data; desbloqueio por pontuação; pré-requisito formal não | 100% white-label, domínio próprio sem custo, webhooks; créditos de IA do tutor vendidos à parte | Médio-baixo: vitrine Netflix escura, gamificação | Médio: base exportável em CSV, mas vídeo e pagamento em terceiros |
| **Cademí** | Não publicado (página de preços fora do ar em 13/10/2026; "investimento fixo e previsível", usuários e cursos ilimitados) | 0% (qualquer gateway) | **Não hospeda**: integra Vimeo, Panda Video (DRM social), VdoCipher, Videofront, Hotmart Player | Funis de acesso gratuito, ofertas "PopSell"; trilha não verificada | Domínio customizado, API documentada, webhooks | Baixo: "Squeeze Method" para "vender mais para a base" | Médio |
| **Curseduca (agora WAID)** | **Evolution App: 12 x R$ 997 no plano anual** (cerca de R$ 11.964/ano); **PRO: 12 x R$ 1.997** (cerca de R$ 23.964/ano); Enterprise sob medida | Não informado | Evolution: 500 GB de armazenamento e 1 TB de banda de vídeo; PRO: 2 TB e 3 TB; player nativo; transcrição por IA | Trilhas, calendário, certificado (PRO), app com marca nas lojas | App próprio na Apple Store e Play Store; integrações sob medida no Enterprise | Médio: tem cases corporativos (CIMED, Reserva/Azzas) e de creators | Médio-alto |
| **Teachable** | Starter US$ 39 (R$ 196); **Builder US$ 89 (R$ 447,67)** ou US$ 69 anual; **Growth US$ 189 (R$ 950,67)** ou US$ 139 anual (R$ 699,17) | Starter 7,5%; Builder e Growth 0% com Teachable Payments; cartão internacional 3,9% + US$ 0,30 (estimativa, não verificada: a página oficial mostra só 2,9% + US$ 0,30 para cartão dos EUA) | Até 1 TB de vídeo | Memberships e bundles; recorrência não detalhada; trilha não | API pública só no Growth (10.000 req/mês e 100/min; US$ 139 a 189, R$ 699 a 951/mês); remove marca só no Growth; suporte ao Brasil não informado | Médio-alto (visual limpo) | Médio |
| **Thinkific** | Anual: **Basic US$ 40 (R$ 201,20)**, **Start US$ 82 (R$ 412,46)**, **Grow US$ 164 (R$ 824,92)**; mensal: Basic US$ 54 (R$ 271,62), Start US$ 109 (R$ 548,27), Grow US$ 219 (R$ 1.101,57); Plus sob consulta; app com marca +US$ 199/mês; preços cerca de 10% maiores nas renovações desde 13/08/2026 | 0% com Thinkific Payments; com processador próprio, 5% (Basic), 2% (Start) e 1% (Grow), segundo terceiros | **Banda de vídeo: 100 GB/mês (Basic), 200 GB (Start), 400 GB (Grow)**, Plus a partir de 7.500 GB | Assinaturas e memberships (Start+); **trilhas de aprendizagem e SCORM só no Plus**; vendas B2B por lote de assentos e fatura no Grow | API e webhooks no Grow; remove marca no Grow; domínio próprio desde o Basic | **Alto** (usado por academias corporativas e associações) | Médio |
| **Kajabi** | Basic **US$ 179 (R$ 900,37)**, Growth **US$ 249 (R$ 1.252,47)**, Pro **US$ 499 (R$ 2.509,97)**; anual US$ 143/199/399 | Kajabi Payments 2,7% a 2,9% + US$ 0,30 (EUA); gateway terceiro 0,5% a 2% | Limite de vídeo não informado | Produtos e comunidades; recorrência não detalhada | API incluída (vale US$ 25/mês), app com marca incluído no plano | Médio (forte em marketing de criador) | Alto (tudo-em-um) |
| **Circle** | Professional **US$ 89 (R$ 447,67)**, Business **US$ 199 (R$ 1.000,97)**, Scale **US$ 419 (R$ 2.107,57)** (cobrança anual) | 2% / 1% / 1% / 0,5% | Armazenamento 200 GB / 500 GB / 1 TB; live: 10 a 20 h/mês, 100 a 500 espectadores | Cursos sim, pagamentos sim; trilha não | White-label a partir do Business; Admin API 5.000 req/mês (Business); app com marca só no Circle Plus | Médio-alto | Médio |
| **Mighty Networks** | Launch **US$ 79 (R$ 397,37)**, Scale **US$ 179 (R$ 900,37)**, Growth **US$ 354 (R$ 1.780,62)** | 2% / 1% / 0,5% | 200 GB a 1 TB; live 20 a 40 h/mês | Assinatura e pagamento único, tiers, trial, cupons | API e MCP a partir do Scale; app com marca só no Mighty Pro | Médio | Médio-alto |
| **Moodle** | Software livre; MoodleCloud (preço não verificado nesta pesquisa) | 0% | Sem streaming adaptativo nativo; vídeo normalmente em serviço externo (conhecimento técnico, não verificado hoje) | **Sim**: conclusão com pré-requisitos, trilhas, notas, histórico acadêmico | API completa, tema próprio, domínio próprio | Alto como "ambiente acadêmico", mas UX datada | Baixo (código aberto, dados nossos) |
| **Open edX** | Livre de licença; custo é hospedagem, manutenção e suporte (próprio ou provedor) | 0% | Vídeo por YouTube ou URL externa/HLS (conhecimento técnico, não verificado hoje) | Sim (cursos, certificados, programas), e-commerce e assinatura exigem módulos extras | API, tema próprio | Alto (MIT/Harvard) | Baixo, mas **operação pesada** (exige time de DevOps) |
| **Frappe Learning (ex-Frappe LMS)** | Livre (código aberto); Frappe Cloud a partir de **US$ 5/mês (R$ 25,15)** | 0% | Vídeo por upload ou embed; sem pipeline adaptativo próprio (não verificado) | Cursos, turmas (batches), aulas ao vivo por turma, avaliações, certificados, monetização | Código aberto, sem lock-in; framework Frappe (Python), diferente do nosso stack | Médio | Baixo |

### 2.2 Custo de taxa por venda num ticket de R$ 2.000

| Plataforma | Taxa por venda de R$ 2.000 | 100 vendas por ano | Clube de R$ 99/mês com 200 assinantes (por mês) |
|---|---|---|---|
| Hotmart | R$ 200,49 | R$ 20.049 | R$ 2.458 |
| Kiwify | R$ 182,29 | R$ 18.229 | R$ 2.278 |
| Eduzz Básico | R$ 100,49 | R$ 10.049 | R$ 1.468 |
| Gateway direto (estimativa 3% a 5%, ver seção 5) | R$ 60 a 100 | R$ 6.000 a 10.000 | R$ 594 a 990 |

Conta: percentual sobre o valor + R$ 2,49 fixo por transação. Para o clube, 200 transações por mês. O gateway direto é estimativa até o Agente B fechar o item de pagamentos.

**Nota do editor (contradição 2):** a seção 5 fechou as taxas reais. Com o Asaas, gateway recomendado, a linha "Gateway direto" fica: **R$ 1,99 (Pix) a R$ 60,29 (cartão à vista)** por venda de R$ 2.000; **R$ 199 a R$ 6.029** por 100 vendas por ano; **R$ 690/mês** para 200 assinaturas de R$ 99 no cartão (200 x R$ 3,45). Parcelado em 12x com o IAE absorvendo: R$ 80,29 mais R$ 160 a R$ 220 de antecipação, se antecipar. Esses números prevalecem sobre a estimativa de 3% a 5%.

### 2.3 Observações que mudam a decisão

- **Banda de vídeo é o calcanhar das plataformas prontas.** Uma hora de aula em 1080p para aula com slides pesa algo entre 0,7 e 1,5 GB por espectador (estimativa; o Agente A deve fechar o número. **Nota do editor:** prevalece o número do Agente A, ver contradição 9). Com 200 alunos assistindo 4 h por mês (800 horas-aluno), o consumo fica entre 560 e 1.200 GB/mês. Isso estoura os 400 GB do Thinkific Grow e chega perto do 1 TB do WAID Evolution. Plataformas "ilimitadas" de infoproduto absorvem esse custo, mas cobram em taxa por venda.
- **Nenhuma plataforma brasileira de área de membros resolve trilha de pós com pré-requisito e histórico acadêmico.** Elas fazem liberação por data ou por pontuação. As internacionais só fazem trilhas em planos Enterprise (Thinkific Plus). Quem faz bem (Moodle, Open edX) cobra em operação e em UX.
- **As áreas de membros mais baratas não hospedam vídeo.** Memberkit e Cademí exigem Panda/Vimeo/VdoCipher. Ou seja, mesmo "comprando", o IAE teria uma peça de vídeo separada. Comprar não elimina o problema de vídeo, só o terceiriza para outra conta.
- **O tom é parte do produto.** Hotmart, Kiwify e Eduzz vendem a linguagem de "dígitos", afiliados e lançamento. O checkout, os e-mails transacionais e a página de obrigado chegam ao aluno com a marca da plataforma. Para um aluno que compara com FGV e Insper, isso pesa.
- **Comunidade pronta (Circle, Mighty) é uma segunda plataforma.** Login separado, cobrança em dólar e a "sensação de um milhão de coisas" que os sócios querem evitar. Só vale como peça se a comunidade virar o centro do clube, o que o Gustavo disse que não é prioridade.

### 2.4 Veredito construir vs comprar vs compor

#### 2.4.1 As três opções

| Critério | Comprar (Hotmart/Memberkit/Thinkific) | Construir tudo (inclusive vídeo) | **Compor (recomendado)** |
|---|---|---|---|
| Tempo até MVP | Dias | 8 a 12 semanas (estimativa), com risco alto no vídeo | **6 a 7 semanas** (estimativa) |
| Risco técnico de vídeo | Da plataforma | **Nosso**, e é o que não dominamos | Do provedor gerenciado (Mux, Cloudflare Stream, Bunny) |
| Tom institucional | Limitado ao tema da plataforma | Total | Total |
| Assinatura + vitalício + trilha de pós | Parcial ou inexistente | Total | Total (é regra de negócio, nosso forte) |
| B2B com assentos | Só Thinkific Grow | Total | Total |
| Agente de IA com base própria | Créditos extras ou inexistente | Total | Total |
| Custo variável | Taxa por venda 5% a 10% ou mensalidade em dólar | Infra nossa, barata mas trabalhosa | Mensalidade do provedor de vídeo por uso + taxa do gateway (3% a 5%) |
| Lock-in | Alto (base, vídeo, checkout) | Nenhum | Baixo: vídeo atrás de uma interface nossa, troca de provedor sem reescrever o app |
| Papel da Helena | Operadora de painel | Codesenvolvedora | Codesenvolvedora e dona do admin, integra site atual e CRM Nexoris |
| Margem para nossa empresa | Pouca (serviço vira configuração) | Alta, com risco alto | Alta, com risco controlado |

#### 2.4.2 Por que compor

1. **O risco declarado dos sócios é vídeo, não funcionalidade.** Compor tira exatamente esse risco do nosso colo: upload direto do navegador para o provedor, transcodificação adaptativa, CDN, URLs assinadas e gravação de live viram chamadas de API. A documentação do Mux, por exemplo, cobre upload direto (`POST /video/v1/uploads` com `max_resolution_tier` 1080p/1440p/2160p e `video_quality` basic/plus/premium), política de reprodução assinada por JWT gerado no servidor, e webhook `video.asset.live_stream_completed` quando uma live vira vídeo sob demanda. Isso encaixa direto em FastAPI (backend assina o token) e Next.js (player).
2. **O que o cliente mais valoriza é o que nós fazemos rápido.** Regras de acesso (assinatura convivendo com compra vitalícia e com trilha de pós), parcerias e bolsas (UERJ, OAB), B2B por assentos, admin sem depender de nós, agente de IA com base de conhecimento própria: tudo isso é software de regra de negócio, o terreno onde entregamos com IA em dias.
3. **Tom institucional exige controle do design inteiro**, inclusive checkout, e-mails, certificado e página do professor. Só se consegue isso com app próprio.
4. **Custo de vídeo gerenciado é baixo no volume do IAE.** Referência de preços oficiais (o Agente A deve fechar o benchmark completo): Mux cobra US$ 0,003 por minuto armazenado por mês, US$ 0,001 por minuto entregue após 100.000 minutos grátis por mês, e encoding 1080p "basic" grátis; Cloudflare Stream cobra US$ 5 por 1.000 minutos armazenados e US$ 1 por 1.000 minutos entregues, encoding e ingestão de live grátis; Bunny Stream cobra a partir de US$ 0,01/GB armazenado e US$ 0,005/GB entregue, sem taxa de encoding, mínimo de US$ 1/mês. Exemplo ilustrativo: biblioteca de 100 h (6.000 min) e 200 alunos assistindo 4 h/mês (48.000 min) custariam cerca de **US$ 18/mês no Mux (R$ 90,54)** e **US$ 78/mês na Cloudflare Stream (R$ 392,34)**. É uma fração da taxa por venda de qualquer plataforma de infoproduto.
5. **A Helena existe e o site existe.** Um app próprio conversa com o site atual (que fica como está) e com o CRM Nexoris por API. Uma plataforma fechada criaria mais uma ilha de dados.
6. **Lock-in mínimo.** Se o vídeo ficar atrás de um módulo `video_provider` nosso (upload, playback token, webhook, delete), trocar Mux por Cloudflare ou Bunny é questão de dias, e o IAE pode até migrar para infraestrutura própria quando o volume justificar.

#### 2.4.3 O que compõe o "compor"

| Peça | Fazer ou alugar | Opção recomendada para MVP | Observação |
|---|---|---|---|
| App do aluno e admin | Fazer | Next.js + FastAPI + Postgres (Supabase), deploy Coolify | Nosso stack de produção |
| Vídeo sob demanda | Alugar | Provedor gerenciado (decisão final com o Agente A: Mux, Cloudflare Stream ou Bunny Stream) | Interface interna agnóstica de provedor |
| Player | Alugar/biblioteca | Player do provedor (Mux Player) ou hls.js/Video.js | Retomar de onde parou, velocidade, legendas |
| Live | Alugar | Zoom ou Google Meet no MVP, com gravação enviada ao provedor de vídeo; avaliar Mux Live/Cloudflare Live ou LiveKit na fase 2 | Live própria não é MVP |
| Pagamento | Alugar | Gateway brasileiro com Pix, boleto, cartão recorrente (decisão na seção 5: Asaas) | Evitar marketplace de infoproduto |
| Comunidade | Fazer pequeno | Comentários por aula e mural de avisos no MVP; fórum na fase 2 | Evitar Circle/Mighty como segunda plataforma |
| Agente de IA | Fazer | Transcrição das aulas + base de conhecimento do cliente + modelo de linguagem | Fase 2, depois que houver acervo |
| Trilha de pós | Fazer | Modelo de dados de programa, módulo, pré-requisito e histórico desde o MVP, interface na fase 2/3 | Desenhar cedo evita migração. Nota do editor: na lista da seção 4, as telas e regras (itens 48 a 50) ficam na fase 3; as tabelas nascem no MVP (contradição 7) |

#### 2.4.4 Prazo: MVP até fim de novembro / começo de dezembro de 2026

Estimativa (cerca de 7 semanas a partir de 13/10/2026), sujeita à validação dos sócios:

| Semana | Entrega |
|---|---|
| 1 (até 20/10) | Modelo de dados (curso, módulo, aula, produto, plano, matrícula, assinatura, trilha), login, conta no provedor de vídeo, prova de conceito de upload e reprodução assinada |
| 2 e 3 (até 03/11) | Admin de conteúdo (Helena testando), catálogo, página de curso e de professor, player com progresso e "continuar assistindo" |
| 4 e 5 (até 17/11) | Pagamento: compra vitalícia e assinatura convivendo, cupons, bolsas UERJ/OAB como cupom ou plano, e-mails transacionais com a marca do IAE |
| 6 (até 24/11) | Fluxo de live: aula no Zoom/Meet, gravação publicada no app; certificado com código de verificação |
| 7 (até 01/12) | Migração do curso de 5 h já gravado, clube de membros básico (área de benefícios e parcerias, mural), testes com alunos atuais, ajustes |

#### 2.4.5 Plano B (se o prazo apertar)

Se em meados de novembro o app não estiver estável, há duas saídas rápidas e reversíveis: (a) Thinkific Start (US$ 82/mês anual, R$ 412,46; sem contrato anual, US$ 109/mês, R$ 548,27) com domínio próprio, visual sóbrio e assinatura, aceitando o limite de 200 GB/mês de banda; ou (b) Memberkit Essencial (R$ 197/mês) com vídeos no provedor que já teríamos contratado. Nos dois casos o contrato de vídeo e o gateway continuam nossos, o que facilita voltar ao app próprio. Recomendação: não começar pelo plano B; usá-lo só como rede de segurança.

#### 2.4.6 Opções descartadas e por quê

- **Hotmart, Kiwify, Eduzz como plataforma principal:** tom de infoproduto, taxa de 5% a 10% sobre um ticket de R$ 2.000, relação com o aluno fica com a plataforma, sem trilha de pós.
- **Kajabi:** caro (R$ 900 a 2.510/mês), tudo-em-um com alto lock-in, pensado para marketing de criador.
- **Circle e Mighty como base:** são comunidades com cursos acoplados; comunidade não é a prioridade do Gustavo e cria segunda plataforma.
- **Open edX:** resolve trilha e certificado, mas exige operação de infraestrutura maior que o próprio problema de vídeo.
- **Moodle:** bom para pós e histórico, mas UX datada contradiz o pedido de "simples sem tutorial". Pode servir de referência de modelo de dados para trilha e histórico.
- **Frappe Learning:** leve e aberto, mas em framework Python diferente do nosso; reaproveitar ideias (turmas, aulas ao vivo por turma), não o código.
- **Construir o vídeo do zero (FFmpeg + storage + CDN próprios):** é o que os sócios não dominam; só faz sentido avaliar depois de 12 a 24 meses de dados reais de uso, se a conta do provedor ficar relevante.

---

## 3. Matt Pocock, Jack Roberts e esteira de edição automática de aula crua

### Resumo do item 3 (parte b3)

- **Matt Pocock** não está construindo uma "plataforma de cursos" para terceiros: ele mantém um app próprio, aberto no GitHub, o **Course Video Manager (CVM)**, que grava, corta, transcreve, gera capítulos, descrições, legendas, thumbnails e publica as aulas no site dele (AI Hero). O app é desenvolvido por agentes (Claude Code, skills no repositório, agentes "AFK" com o Sandcastle). É a referência mais útil que existe para a nossa esteira, porque resolve exatamente corte por silêncio, transcrição, capítulos e publicação, e documenta cada decisão em ADRs.
- **Jack Roberts** (o mais provável é o youtuber britânico @Itssssss_Jack, de automação com IA e Claude Code) **não tem uma ferramenta própria de edição de vídeo** que eu tenha conseguido verificar. O que ele vende é comunidade paga (Skool) com sistemas e skills de automação, inclusive de marketing e de transformar vídeo do YouTube em posts. O "estilo Jack Roberts" de Shorts com motion graphics virou uma skill de Remotion feita pela comunidade. Serve como referência para a fase de **reaproveitar aula em conteúdo de rede social**, não para a edição da aula em si.
- **Esteira de edição automática é viável e barata.** Montada por nós (FFmpeg/auto-editor + transcrição por API + LLM sobre a transcrição + renderização de thumbnails em HTML), custa entre **US$ 0,12 e US$ 1,28 por hora de aula processada (R$ 0,60 a R$ 6,44)**. Uma aula crua de 3 h sai entre **R$ 1,81 e R$ 19,32**. Ferramentas prontas (Opus Clip, Descript, Vizard) custam de 3 a 50 vezes mais por hora e não fazem o que o IAE precisa (cortes temáticos de 30 a 40 min em português, com dois professores).
- **Grok:** a API pública do xAI **não aceita vídeo como entrada** na documentação oficial do modelo atual (Grok 4.7: texto e imagem). O xAI tem a transcrição mais barata que achei (US$ 0,10/h) e LLM de texto competitivo (US$ 2/US$ 6 por milhão de tokens). O "Grok Imagine" é geração de vídeo, não edição. Para entender o vídeo nativamente, o **Gemini** é o caminho verificado (até 3 h de vídeo por chamada).
- **Viabilidade: 2 semanas de um sócio** para um MVP com revisão humana (não 100% automático). Semana 1: silêncio, transcrição, legendas, capítulos, resumo. Semana 2: detecção de repetições/erros, cortes temáticos, thumbnails e tela de aprovação.
- **MCP + "um Claude"**: proposta concreta na seção 3.4. Expor a esteira como servidor MCP remoto (dentro do nosso FastAPI), conectado ao Claude do cliente. A Helena ou o Vinicius pedem em português ("corta a aula 3 por tema e deixa como rascunho no curso X") e o Claude chama as ferramentas. Publicar continua exigindo confirmação na plataforma.

### 3.1 Matt Pocock: o que ele está construindo e como usa skills de IA

#### 3.1.1 O projeto de vídeo: Course Video Manager (CVM)

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

#### 3.1.2 Como ele usa skills e agentes

- O repositório tem `.claude/skills` próprias do projeto: `do-work`, `to-prd-project`, `to-issues-project`, `improve-codebase-architecture-project`, `verify-cvm`, `deploy-migration`, `document-ai-hero-api`, entre outras. Ou seja, o app de vídeo é mantido por agentes seguindo skills, com `CLAUDE.md`, `GLOSSARY.md` (linguagem de domínio rigorosa) e ADRs.
- Usa o **Sandcastle** (mattpocock/sandcastle, 8,4 mil estrelas), que orquestra agentes de código em sandbox, para trabalho "AFK" (o agente implementa enquanto ele não está no teclado). Há commits "Update sandcastle to latest" no CVM.
- O repositório **mattpocock/skills** ("Skills for Real Engineers") tem cerca de **290 mil estrelas** (API do GitHub, 13/10/2026), com a versão 1.3 lançada em 04/10/2026. A peça central é o `/grill-me` (entrevista o desenvolvedor até entender o pedido antes de codar); as outras são `/write-a-prd`, `/prd-to-issues`, `/tdd`, `/improve-my-codebase`. O Pedro já usa esse fluxo (grill, PRD, issues).
- Comunidade nos últimos 30 dias (last30days, 13/10/2026): o vídeo "Ship like the best engineers: Matt Pocock's AI workflow" (The Hype Kevin, 178 mil views, 09/10/2026; estimativa, não verificada) cita que, **"no app que o Matt usa para fazer os cursos, uma spec subiu com 41 user stories"** em 25/09/2026 (estimativa, não verificada), e que no trabalho normal ele recebe "cerca de 20 perguntas" do grill antes de codar. Ele também critica quem escreve spec gigante sem prototipar ("people just aren't prototyping anymore"). Fora isso, o assunto dominante é o repositório de skills, não o app de vídeo.
- Produto comercial: **AI Hero** (aihero.dev), com coorte "Claude Code for Real Engineers" (2 semanas, mais de 2.500 alunos na primeira edição, segundo ele no X; estimativa, não verificada) e curso autoguiado. O site de cursos consome o bundle do CVM pela "AI Hero API".

#### 3.1.3 O que aproveitar na nossa esteira

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

### 3.2 Jack Roberts: quem é e o que oferece

#### 3.2.1 Candidatos

| Candidato | Quem é | Bate com o contexto? |
|---|---|---|
| **Jack Roberts, @Itssssss_Jack** (YouTube) | Britânico, educador de automação com IA. Bio: vendeu uma startup de automação com mais de 60 mil clientes, fundou o **Glaido** (digitação por voz, lançamento oficial em 01/05/2026) e toca um negócio de automação "7 dígitos". Canal com cerca de 245 a 278 mil inscritos (estimativa, não verificada). Foco atual: Claude Code, skills, agentes, n8n | **Sim, o mais provável.** Pedro passou o nome ao Rib ("foi até você que me passou esse cara", reunião 2) e o Pedro acompanha criadores de IA e Claude Code |
| "jackroberts___" / "AI Automations with Jack" | Perfil de estatística que parece ser o mesmo criador sob outra identidade | Provavelmente o mesmo |
| Jack AI Studio (jackaistudio.com) | Empresa de produção de vídeo com IA para anúncios UGC e canais "faceless" | Não há ligação com Jack Roberts |
| Jack Roberts (ator) | Ator | Não |

#### 3.2.2 O que ele oferece de fato

- **Comunidade paga no Skool** ("AI Automations by Jack"): mais de 200 blueprints ("200+ battle-tested blueprints"; a página não diz que são de n8n), cerca de 3,3 mil membros e chamadas ao vivo diárias. Preço na página oficial do Skool: US$ 87/mês, subindo para US$ 97 ao chegar a 3.400 membros (R$ 438 a R$ 488); uma matéria coreana cita US$ 50/mês.
- **Newsletter jackroberts.ai** com posts recentes: "Insane Claude Marketing Skills (steal them)" (06/04/2026, gratuitas), "Claude Code + NotebookLM = Infinite Memory", "Claude + ChatGPT 5.5 + Gemini = Ultimate System", "I built an Alex Hormozi chatbot in 15 minutes".
- Tutoriais de **transformar vídeo do YouTube em posts de rede social** e de "sistema automatizado de social media com IA" (citados em agregadores).
- Vídeos recentes sobre animação com Claude ("Claude Design Now Makes Animated Film", "Claude Motion Design Just Destroyed Website Builders").
- O formato de Shorts de notícias de IA dele (9:16, cortes secos, rampas de velocidade, mascote) foi replicado por uma **skill de Claude Code feita pela comunidade**: `JackRobertsMotionGraphicSkill` (narração para motion graphics em Remotion, 26 templates). Não é dele.

**Não encontrei** um produto de edição de vídeo assinado por Jack Roberts. A fala do Rib ("ele também tem um negócio dele que é pra gerar conteúdo pra rede social, de edição") provavelmente se refere a esses sistemas de conteúdo ensinados no canal e na comunidade.

#### 3.2.3 O que serve para nós

- Para a **aula em si**: pouco. Ele não trata de edição de aula longa.
- Para a **fase de captação** (o gargalo do IAE): o padrão "aula longa vira posts curtos" é exatamente o que dá para plugar no fim da nossa esteira. Depois que a transcrição e os capítulos existem, gerar 3 a 5 trechos de 30 a 90 s para Instagram e LinkedIn com legenda queimada e cartela institucional é barato (seção 3.3). Fica como fase posterior, alinhado ao tom institucional (sem "cara de infoproduto").
- Para a **nossa própria empresa**: as skills de marketing dele somam-se ao Photocraft citado na reunião 2 (fora do escopo deste item).

### 3.3 Esteira de edição automática de aula crua

#### 3.3.1 O que a esteira precisa fazer (pedido do cliente e dos sócios)

Entrada: aula crua de cerca de 3 h (presencial, dois professores, slides). Saídas: corte de silêncios, remoção de erros e repetições, capítulos, transcrição, legendas, resumo, cortes de 30 a 40 min por tema, thumbnails.

#### 3.3.2 Arquitetura proposta

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

#### 3.3.3 Ferramentas e APIs avaliadas

| Ferramenta | O que faz | Serve para | Limite / risco | Custo verificado |
|---|---|---|---|---|
| **FFmpeg `silencedetect`** | Detecta silêncio por limiar em dB | Corte de silêncio, fatiar arquivo | Precisa calibrar limiar por sala | Grátis (CPU) |
| **auto-editor** (WyattBlue, licença Unlicense, 5,5 mil estrelas, versão 31.7.2 de 03/10/2026) | CLI que corta silêncio por loudness, com margem configurável; exporta MP4 ou timeline (Premiere, Resolve, FCP, JSON) | Corte de silêncio pronto, inclusive exportar timeline para revisão humana | Só áudio, não entende conteúdo | Grátis. Já traz skills de Claude no próprio repositório |
| **Descript** | Editor por texto; remove muletas e retakes, capítulos, Underlord | Edição manual assistida | API em acesso antecipado; **não exporta arquivo de mídia pela API** (só link de compartilhamento); cobrança por assento | Creator US$ 24 (anual) ou US$ 35 (mensal) com 30 h de mídia; Business US$ 50/65 com 40 h. API sem custo extra, consome créditos do plano |
| **OpenAI** transcrição | `gpt-transcribe` US$ 0,0045/min; `gpt-4o-mini-transcribe` US$ 0,003/min; `gpt-4o-transcribe-diarize` US$ 0,006/min; Whisper US$ 0,006/min | Transcrição com diarização | Limite de upload por arquivo (fatiar) | Ver tabela 3.3.4 |
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

#### 3.3.4 Custo por hora de aula processada

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

#### 3.3.5 Viabilidade em 1 a 2 semanas de trabalho nosso

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

**Nota do editor (contradições 3 e 4):** este é o item 52 da lista da seção 4, que a parte b2 estimou em 10 a 15 dias na fase 3. Prevalece o esforço desta seção (cerca de 10 dias, mais 2 a 3 de MCP, total de 12 a 13), por ser detalhado por bloco e caber na faixa da b2. A fase base continua sendo a 3 ("guardada na manga", decisão da reunião 2); o spike de 1 dia e a antecipação para a fase 2 são opção, se o cliente pedir.

Riscos e mitigação:

- **Áudio da sala presencial** (eco, microfone longe, alunos falando): transcrição piora e o limiar de silêncio falha. Mitigação: microfone de lapela nos dois professores; teste com a aula de 5 h que já existe antes de prometer.
- **Apagar conteúdo por engano**: nunca destruir o original; EDL reversível; revisão humana.
- **Tempo de processamento**: re-encode de 3 h em 1080p na CPU da VPS pode levar horas e competir com a plataforma. Mitigação: worker separado ou máquina sob demanda, fora do horário de aula. Decisão de infraestrutura fica com o Agente A.
- **Preços que mudam**: o Gemini 3.8 Flash dobra em 01/01/2027; trocar de modelo é configuração.
- **Termos jurídicos**: keyterm prompting (Deepgram) e glossário do IAE no contexto do LLM.

### 3.4 Ideia do Pedro: MCP e "um Claude" para o cliente ter autonomia

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

### 3.5 Recomendação

1. Manter a esteira **guardada na manga**, como decidido, mas fazer um **spike de 1 dia** com a aula de 5 h existente: auto-editor + transcrição (xAI e Deepgram) + Sonnet 5.5 gerando capítulos e cortes. Isso dá a demonstração "olha o que a gente fez com a sua aula" para a próxima reunião, a custo de centavos.
2. Se o cliente quiser, entregar em 2 semanas como fase 2, no modo "IA propõe, admin aprova", com o MCP logo em seguida.
3. Reaproveitar o desenho do CVM do Matt Pocock (silêncio calibrado, fatias de ~27 min, autofill como job separado, bundle imutável) e usar HyperFrames (gratuito) em vez de Remotion (licença paga a partir de 4 pessoas).
4. Reaproveitar a ideia de "aula vira post curto" (linha Jack Roberts) só na fase de captação.

---

## 4. Lista de funcionalidades

### 4.1 Premissas do esforço

- **Unidade:** "dia" é um dia útil de uma pessoa focada (cerca de 6 a 8 h), com uso pesado de IA (Claude Code, pipeline de issues), no stack Next.js + FastAPI + Postgres (Supabase) + Coolify.
- **Reaproveitamento:** o app hospitalar já tem login, papéis, admin, e-mail transacional e deploy. Isso reduz bastante o fácil.
- **Fora da conta:** vídeo. O esforço do player e do pipeline supõe um **serviço gerenciado de vídeo** (Bunny Stream, Mux ou Cloudflare Stream, a definir pelo Agente A). Com FFmpeg próprio, o item 41 sobe de 3 para cerca de 10 dias.
- **Fases:**
  - **MVP:** até o fim de novembro ou começo de dezembro de 2026.
  - **Fase 2:** 1º semestre de 2027.
  - **Fase 3:** 2º semestre de 2027 em diante.
- **Teto de calendário:** os três sócios são CLT. Somando os três em paralelo, a premissa realista é de 8 a 10 dias-pessoa por semana. De 13/10 a 05/12 são 7,5 semanas, ou seja, **60 a 75 dias-pessoa**. O MVP abaixo soma cerca de 48 dias e cabe com folga para QA e ajustes.

### 4.2 Tabela completa (53 funcionalidades)

Legenda de valor para o cliente: A = alto, M = médio, B = baixo.

| # | Funcionalidade | Categoria | Valor | Esforço (dias) | Dependências | Fase |
|---|---|---|---|---|---|---|
| 1 | Cadastro e login (e-mail e senha, Google, link mágico) | Fácil | A | 1 | Reuso do app hospitalar | MVP |
| 2 | Papéis e permissões (aluno, professor, admin IAE, gestor de empresa) | Fácil | A | 1 | 1 | MVP |
| 3 | Catálogo de cursos (lista, filtros por público e tema) | Fácil | A | 2 | 11 | MVP |
| 4 | Página do curso (ementa, professores em dupla, carga horária, preço, depoimentos) | Fácil | A | 1,5 | 3, 15 | MVP |
| 5 | Página do professor (trajetória, cursos que dá) | Fácil | M | 0,5 | 4 | MVP |
| 6 | Estrutura curso > módulo > aula, com ordem e duração | Fácil | A | 1 | 11 | MVP |
| 7 | Player com progresso salvo e "continuar de onde parou" (qualquer dispositivo) | Fácil | A | 2 | 41 | MVP |
| 8 | Velocidade de reprodução, legenda, troca manual de qualidade, tela cheia | Fácil | A | 0,5 | 7, 41 | MVP |
| 9 | Início do aluno com "Continuar assistindo" e "Meus cursos" | Fácil | A | 1 | 7 | MVP |
| 10 | Materiais complementares por aula (PDF, slides, modelos de documento) | Fácil | A | 1 | 6 | MVP |
| 11 | Admin de conteúdo (cursos, módulos, aulas, títulos, upload de vídeo e material, publicar e despublicar) | Fácil | A | 3 | 41 | MVP |
| 12 | Comentários e dúvidas por aula, com moderação no admin | Fácil | M | 2 | 6 | MVP |
| 13 | Busca no catálogo (título, professor, tema) | Fácil | M | 1 | 3 | MVP |
| 14 | Certificado de conclusão de curso livre (PDF com QR Code) | Fácil | A | 1,5 | 7, regra de conclusão | MVP |
| 15 | Página pública de validação do certificado (código ou QR) | Fácil | M | 0,5 | 14 | MVP |
| 16 | Avaliação da aula e do curso (estrelas e comentário) com captura de depoimento autorizado | Fácil | A | 1 | 6 | MVP |
| 17 | E-mails transacionais (boas-vindas, compra, acesso liberado, certificado, aula ao vivo amanhã) | Fácil | A | 1 | Reuso, 22 | MVP |
| 18 | Perfil do aluno e direitos LGPD (consentimento, exportar e excluir dados) | Fácil | A | 1,5 | 1 | MVP |
| 19 | Agenda de aulas ao vivo (lista, botão "adicionar ao calendário" .ics) | Fácil | A | 1 | 28 | MVP |
| 20 | Layout responsivo e instalável como PWA (celular primeiro) | Fácil | A | 1 | Nenhuma | MVP |
| 21 | Anotações pessoais com marcação do minuto do vídeo | Fácil | M | 1,5 | 7 | Fase 2 |
| 22 | Checkout de compra única vitalícia (Pix, cartão parcelado, boleto) | Médio | A | 4 | Gateway (seção 5) | MVP |
| 23 | Assinatura mensal e anual (clube) convivendo com compra vitalícia (modelo de direitos de acesso por produto) | Médio | A | 5 | 22 | MVP |
| 24 | Cupons de desconto (percentual, valor, validade, limite de uso) | Médio | A | 1,5 | 22 | MVP |
| 25 | Cancelamento e reembolso self-service (arrependimento em 7 dias, CDC art. 49), inadimplência e bloqueio de acesso | Médio | A | 2 | 22, 23 | MVP |
| 26 | Nota fiscal (NFS-e) ou recibo automático após o pagamento | Médio | A | 2 | Gateway, contador | MVP |
| 27 | Página de benefícios do clube (parceiros, ofertas, códigos) | Médio | M | 1,5 | 23 | MVP (versão simples) |
| 28 | Aula ao vivo por link externo (Zoom ou Meet) com gravação publicada manualmente no curso | Médio | A | 1,5 | 11, 19 | MVP |
| 29 | Ao vivo integrado: sala dentro da plataforma, gravação automática publicada como aula | Médio | A | 8 | Agente A (lives), 41 | Fase 2 |
| 30 | Transcrição automática das aulas (Whisper) e legendas geradas (nota do editor: via API de transcrição, ver contradição 5) | Médio | A | 3 | 41 | Fase 2 |
| 31 | Agente de IA (tutor) com base de conhecimento do IAE e das transcrições, citando aula e minuto | Médio | A | 8 | 30, conteúdo do IAE | Fase 2 |
| 32 | Parcerias e bolsas (UERJ, OAB): elegibilidade por e-mail institucional, lista ou código, com desconto automático | Médio | A | 3 | 24 | Fase 2 (no MVP vira cupom) |
| 33 | Comunidade enxuta: fórum por curso e por turma, sem feed social | Médio | M | 5 | 2, 12 | Fase 2 |
| 34 | Notificações na plataforma e por e-mail (nova aula, resposta à dúvida, ao vivo começando) | Médio | M | 3 | 17 | Fase 2 |
| 35 | Turmas (coortes) com data de início, cronograma e aulas liberadas por data | Médio | A | 3 | 6, 28 | Fase 2 |
| 36 | Conteúdos curtos avulsos (pílulas de 30 a 40 min) com compra em 1 clique para quem já é cliente | Médio | A | 1,5 | 22 | Fase 2 |
| 37 | Quiz e exercícios por módulo (corrigidos automaticamente) | Médio | M | 2 | 6 | Fase 2 |
| 38 | Painel de indicadores para o IAE (alunos ativos, receita, conclusão, abandono por aula) | Médio | A | 3 | 7, 22 | Fase 2 (MVP com números básicos) |
| 39 | Integração com CRM Nexoris e eventos no Google Analytics | Médio | M | 2 | 22, API do Nexoris | Fase 2 |
| 40 | Funil de aula gratuita (página, formulário, aula aberta, envio do lead ao CRM) | Médio | M | 3 | 39 | Fase 2 |
| 41 | Pipeline de vídeo adaptativo (upload, transcodificação HLS, ladder de qualidades, CDN) | Difícil | A | 3 (gerenciado) a 10 (próprio) | Decisão do Agente A | MVP (via serviço gerenciado) |
| 42 | Proteção básica: URLs assinadas com expiração, bloqueio de download, limite de sessões simultâneas | Difícil | A | 2 | 41 | MVP |
| 43 | Marca d'água dinâmica (nome e CPF do aluno sobre o vídeo) | Difícil | M | 2 | 41 | Fase 2 |
| 44 | DRM (Widevine e FairPlay) | Difícil | B | 10 ou mais, e custo de licença | 41, provedor com DRM | Fase 3 (provavelmente nunca) |
| 45 | Controle de presença nas aulas ao vivo (para certificado e histórico) | Difícil | M | 3 | 29 | Fase 2 |
| 46 | Analytics de engajamento por vídeo (onde o aluno abandona) | Difícil | M | 3 | 7, 41 | Fase 2 |
| 47 | B2B para escritórios: compra por empresa, assentos, convite por e-mail, painel do gestor, fatura | Difícil | A | 8 | 2, 22, 26 | Fase 2 (o público 4 já existe) |
| 48 | Trilha de pós-graduação: módulos = cursos de 24 h, oferta cíclica, matrícula por período | Difícil | A | 10 | 35, 49, 50 | Fase 3 |
| 49 | Pré-requisitos e regras de progressão entre cursos e módulos | Difícil | M | 3 | 6 | Fase 3 |
| 50 | Histórico acadêmico (frequência, notas, carga horária, situação) | Difícil | A | 5 | 37, 45 | Fase 3 |
| 51 | Certificação reconhecida (especialização lato sensu) em parceria com IES credenciada | Difícil | A | 5 técnicos, mais parceria | 48, 50, IES parceira | Fase 3 |
| 52 | Edição automática de aula crua (corte de silêncios e erros, capítulos, resumo, cortes curtos) | Difícil | M | 10 a 15 (nota do editor: 10, mais 2 a 3 de MCP, pela seção 3.3.5) | 30, 41 | Fase 3 (guardada na manga) |
| 53 | App nativo iOS e Android com download offline | Difícil | B | 15 ou mais | 41, 44 (offline pede DRM) | Fase 3 (PWA cobre o começo) |

### 4.3 Somatório por fase

| Fase | Itens | Esforço (dias-pessoa) | Observação |
|---|---|---|---|
| MVP (até dez/2026) | 1 a 20 (menos o 21), 22 a 28, 41, 42 | cerca de 48 | Cabe em 7,5 semanas com os três em paralelo, se o vídeo for serviço gerenciado |
| Fase 2 (1º sem. 2027) | 21, 29 a 40, 43, 45 a 47 | cerca de 60 | O tutor de IA (31) e o ao vivo integrado (29) concentram o risco |
| Fase 3 (2º sem. 2027 em diante) | 44, 48 a 53 | cerca de 60, mais a parceria acadêmica | Depende de decisão de negócio e regulatória, não só de código |

**Notas do editor sobre esta tabela:**

- **Item 30 (transcrição):** a seção 3.3 mostra que transcrever por API custa de US$ 0,10/h (xAI) a US$ 0,36/h (OpenAI Whisper), enquanto o Whisper local na CPU da VPS leva horas por aula. Prevalece a transcrição por API; o esforço de 3 dias desta tabela se mantém, porque inclui legendas no player e busca (contradição 5).
- **Item 52 (edição automática):** prevalece o esforço detalhado da seção 3.3.5 (cerca de 10 dias, mais 2 a 3 de MCP). Se os itens 30 e 52 forem feitos juntos, a transcrição é a mesma e economiza cerca de 1 dia (estimativa do editor).
- **Itens 48 a 50 (trilha):** as telas ficam na fase 3, mas o esquema de banco de programa, módulo, pré-requisito e histórico entra no MVP, como recomenda a seção 2.4.3 (contradição 7).
- **Prazo:** os cerca de 48 dias-pessoa do MVP batem com o cronograma de 7 semanas da seção 2.4.4 (até 01/12/2026), com folga de 12 a 27 dias-pessoa até 05/12/2026 (contradição 6).

### 4.4 Observações sobre os itens difíceis

- **Pipeline de vídeo (41):** é o único item "difícil" no MVP, e é o centro do negócio (decisão da reunião 2). Comprar como serviço reduz o risco de prazo; a migração para infra própria fica para quando o custo justificar.
- **DRM (44):** para curso jurídico de R$ 2.000, URL assinada mais marca d'água dinâmica é o nível razoável. DRM custa licença, quebra players simples e não impede gravação de tela. O Agente A detalha os custos.
- **Pós-graduação e certificação reconhecida (48 a 51), regra regulatória (a verificar com o Agente D e com advogado educacional):**
  - Pela Resolução CNE/CES nº 1/2018, curso de especialização (pós lato sensu) só pode ser ofertado por:
    - instituição de ensino superior credenciada pelo MEC;
    - escola de governo credenciada;
    - instituição credenciada especificamente para lato sensu.
  - Requisitos da mesma resolução:
    - carga horária mínima de **360 horas**;
    - corpo docente com no mínimo **30% de mestres ou doutores**;
    - certificado com histórico, carga horária, corpo docente e ato de credenciamento.
  - Na modalidade EaD, a instituição precisa de credenciamento para EaD. O marco de EaD foi revisto em 2025 (Decreto nº 12.456/2025), e o enquadramento atual precisa ser conferido.
  - O IAE, como associação sem credenciamento, **não pode chamar seu programa de "pós-graduação"**.
  - **Caminhos possíveis:**
    - parceria com IES credenciada (a IES certifica e o IAE dá conteúdo e professores);
    - manter o produto como "programa de formação" ou "certificação IAE" de curso livre.
  - **Implicação para o software:** o código (trilha, histórico, frequência) é o mais fácil. O gargalo é a parceria acadêmica, por isso é fase 3.
- **B2B para escritórios (47):** esforço médio-alto, mas com valor alto e público definido (público 4: duas sessões de 4 h, contratadas pelo escritório). Recomendo puxar para o começo da fase 2.

### 4.5 Versão enxuta para o cliente validar

Formato para mandar ao IAE ("pensamos em 30, mandamos, eles tiram e põem"). Linguagem sem jargão. Peça para marcarem cada item com **Manter / Tirar / Mais tarde** e acrescentarem o que faltar.

**Até dezembro de 2026 (primeira versão)**

1. **Entrar na plataforma:** cadastro e login com e-mail ou conta Google.
2. **Catálogo de cursos:** todos os cursos do IAE com busca e filtro por tema.
3. **Página de cada curso:** ementa, professores, carga horária, preço e depoimentos de alunos.
4. **Página dos professores:** trajetória de cada professor e cursos que ministra.
5. **Assistir às aulas:** vídeo que se adapta à internet do aluno, com velocidade, legenda e qualidade.
6. **Continuar de onde parou:** o aluno volta ao minuto exato, no computador ou no celular.
7. **Meus cursos:** tela inicial com o que o aluno está fazendo e quanto falta.
8. **Materiais de apoio:** PDFs, slides e modelos de documentos em cada aula.
9. **Dúvidas por aula:** o aluno pergunta embaixo da aula e o IAE responde e modera.
10. **Avaliação e depoimentos:** o aluno avalia a aula e autoriza o uso do depoimento.
11. **Certificado de conclusão:** emitido automaticamente, com QR Code de validação pública.
12. **Aulas ao vivo:** agenda das aulas ao vivo, entrada por link e gravação disponível depois no curso.
13. **Compra de curso:** pagamento por Pix, cartão parcelado ou boleto, com acesso vitalício.
14. **Clube de membros (assinatura):** mensalidade ou anuidade que dá acesso ao acervo e aos benefícios.
15. **Benefícios do clube:** página com parceiros e vantagens para membros.
16. **Cupons de desconto:** códigos promocionais com validade e limite de uso.
17. **Nota fiscal ou recibo automático:** emitido assim que o pagamento cai.
18. **Cancelamento e reembolso:** o aluno resolve sozinho, dentro das regras.
19. **Painel do IAE:** a equipe edita cursos, aulas, títulos, vídeos e comentários sem depender de nós.
20. **Privacidade (LGPD):** consentimento, exportação e exclusão de dados do aluno.
21. **Proteção do conteúdo:** links de vídeo que expiram, sem botão de download.

**1º semestre de 2027**

22. **Ao vivo dentro da plataforma:** a aula acontece na própria plataforma e a gravação entra no curso sozinha.
23. **Transcrição e legendas automáticas:** toda aula vira texto pesquisável.
24. **Assistente de IA do IAE:** tira dúvidas com base no conteúdo do IAE e indica a aula e o minuto.
25. **Convênios UERJ e OAB:** desconto ou bolsa automática para quem comprova o vínculo.
26. **Comunidade por curso e por turma:** fórum organizado, sem a bagunça de rede social.
27. **Avisos:** e-mail e notificação de nova aula, resposta à dúvida e aula ao vivo começando.
28. **Turmas com calendário:** cursos com data de início e aulas liberadas por semana.
29. **Conteúdos curtos avulsos:** aulas de 30 a 40 minutos compradas em um clique.
30. **Exercícios e quizzes:** fixação ao fim de cada módulo.
31. **Anotações do aluno:** notas presas ao minuto do vídeo.
32. **Indicadores:** alunos ativos, receita, conclusão e em que ponto as pessoas abandonam a aula.
33. **Integração com o CRM e o Analytics:** vendas e leads chegam sozinhos ao Nexoris.
34. **Aula gratuita para captação:** página, formulário e aula aberta que alimentam o funil.
35. **Marca d'água com nome do aluno:** desestimula o compartilhamento de gravações.
36. **Presença nas aulas ao vivo:** registro automático para certificado e histórico.
37. **Planos para escritórios:** o escritório compra vagas, convida os advogados e acompanha o progresso.

**Segundo semestre de 2027 em diante**

38. **Trilha de formação longa:** programa de 1 a 2 anos montado com os cursos de 24 h, com oferta cíclica.
39. **Pré-requisitos:** cursos que só abrem depois de concluir outros.
40. **Histórico do aluno:** frequência, notas e carga horária de toda a jornada.
41. **Certificação reconhecida pelo MEC:** só em parceria com instituição credenciada, porque é exigência legal para usar o nome "pós-graduação".
42. **Edição automática de aula:** a equipe sobe a gravação crua e a plataforma corta, organiza em capítulos e gera resumo.
43. **Aplicativo de celular com download:** só se o uso no celular justificar (a versão web já funciona no celular).

## 5. Pagamentos no Brasil

### 5.1 Tabela de taxas vigentes

Valores das páginas oficiais acessadas em 13/10/2026, exceto onde marcado. Taxas são padrão de balcão: volume maior negocia.

| Gateway | Pix | Boleto | Cartão à vista | Parcelado (até 12x) | Recorrência / assinatura | Antecipação | Mensalidade | Nota fiscal | Split |
|---|---|---|---|---|---|---|---|---|---|
| **Asaas** (oficial) | R$ 1,99 por Pix (R$ 0,99 nos 3 primeiros meses) | R$ 1,99 (R$ 0,99 promo) | 2,99% + R$ 0,49 | 2-6x: 3,49% + R$ 0,49; 7-12x: 3,99% + R$ 0,49 (sobre o total); até 21x Visa/Master: 4,29% | Assinatura nativa (cartão, Pix, boleto) e **Pix Automático**; mesmas taxas (a FAQ cita 1,99%, conflito na própria página) | Cartão 1,25% a.m. (a FAQ cita 1,70% a.m. para parcelado); boleto a partir de 5,79% a.m. | Zero | **NFS-e integrada, R$ 0,49 por nota** | Sim (via API, sem taxa informada) |
| **Pagar.me / Stone** (oficial, oferta Essencial) | 0,99% | Não informado na página | 4,19% | 6x: 13,63%; 12x: 20,95% (recebimento D+1, ou seja, já com antecipação embutida) | Sim (API de assinaturas) | Configurável, embutida no D+1 | Zero (Essencial) | Não nativa | Sim (cartão, boleto e Pix) |
| **Stripe** (oficial) | 1,19% (**só por convite**); limite de R$ 3.000 por Pix | R$ 3,45 | 3,99% + R$ 0,39 | **Não documentado para o Brasil** (a doc de parcelamento lista só México, Japão e Mastercard Installments) | Billing: +0,7% do volume; Smart Retries (padrão 8 tentativas em 2 semanas); **Pix Automático não disponível no Brasil** | Não informada | Zero | Não (Stripe Tax não consta para BR) | Sim (Connect, +0,25%) |
| **Mercado Pago** (terceiros; página oficial bloqueou o acesso; estimativa, não verificada) | 0,99% | R$ 3,49 | 4,98% a 4,99% na hora; 3,79% a 4,49% em 14 dias; 3,03% a 3,99% em 30 dias | Custo extra do vendedor; exemplo de terceiro: cerca de 17,8% em 12x | Assinaturas: recursos básicos, taxa não encontrada | Embutida na escolha de prazo | Zero | Não | Limitado |
| **Vindi** (oficial) | 0,95%, mínimo R$ 1,60 | R$ 2,99 | A partir de 2,75% (30 dias) ou 3,25% (14 dias), mais R$ 0,39 de processamento | Tabela de jun/2025: até +2,99% por parcela | Especialista em recorrência; retentativa simples e com troca de adquirente nos três planos (a "retentativa inteligente" é serviço adicional) | Até 7% a.m. (tabela jun/2025) | **R$ 299 (Essential), R$ 499 (Pro, com API e split), R$ 1.119 (Premium)** | Integra com emissores (custo à parte) | Plano Pro em diante |
| **Iugu** (sem tabela oficial pública) | Revendedor: R$ 1,50 | Revendedor: R$ 2,50 | Revendedor: 2,19% + R$ 0,75 (D+31) | Não encontrado | Recorrência nativa, inclusive Pix Automático | Cobrada à parte | Plano mensal (valor no painel) | NFS-e disponível na plataforma (custo não encontrado) | Sim |
| **Hotmart como gateway** (estimativa, página oficial fora do ar; taxa corrigida pelo editor com a página lida na parte b1) | Taxa única por venda: **9,9% + R$ 2,49** (b2 estimou cerca de 9,9% + R$ 1,00) | idem | idem | Juros do parcelamento pagos pelo comprador (padrão da plataforma) | Assinaturas nativas | Saque e antecipação com regras próprias | Zero | A Hotmart emite nota da parte dela; o produtor emite a sua | Coprodução e afiliados |

### 5.2 Simulação: quanto o IAE paga por venda

Tickets usados: curso de **R$ 2.000** (citado na reunião) e assinatura do clube de **R$ 99/mês** (premissa nossa, ainda não definida pelo IAE). Valores em reais. A linha da Hotmart é estimativa. **Nota do editor (contradição 1):** a linha da Hotmart foi recalculada com a taxa verificada na parte b1 (9,9% + R$ 2,49); os valores originais da b2 ficam entre parênteses.

| Gateway | Curso R$ 2.000 por Pix | Curso à vista no cartão | Curso 12x (IAE absorve, recebendo antecipado) | Assinatura R$ 99 no cartão | Custo fixo mensal |
|---|---|---|---|---|---|
| Asaas | 1,99 | 60,29 | 80,29 + antecipação (cerca de 6,5 meses × 1,25% a 1,70% = 8% a 11%, ou R$ 160 a R$ 220) | 3,45 | 0 |
| Pagar.me | 19,80 | 83,80 | 419,00 (já recebendo em D+1) | 4,15 | 0 |
| Stripe | 23,80 (se convidado) | 80,19 | Não disponível | 5,03 (3,99% + 0,39 + 0,7% Billing) | 0 |
| Mercado Pago | 19,80 | 99,60 (na hora) ou 60,60 (30 dias) | Cerca de 357 (estimativa de terceiro) | 3,00 a 4,93 | 0 |
| Vindi | 19,00 | 55,39 (30 dias) | Não calculável sem tabela vigente | 3,11 | 299 a 1.119 |
| Hotmart (taxa verificada na b1) | 200,49 (b2: 199,00) | 200,49 (b2: 199,00) | 200,49 (b2: 199,00; o comprador paga os juros) | 12,29 (b2: 10,80) | 0 |

**Leitura:**
- **Pix e boleto:** a tarifa fixa do Asaas (R$ 1,99) ganha de longe no ticket alto. Nos gateways percentuais, o mesmo Pix custa 10 vezes mais.
- **Cartão à vista:** Asaas, Vindi e Mercado Pago (prazo de 30 dias) ficam entre 2,8% e 3%.
- **Parcelamento:** é onde o dinheiro vai embora. A decisão comercial **"juros do cliente ou da loja"** pesa mais que a escolha do gateway.
- **Hotmart:** custa de 3 a 100 vezes mais por venda e impõe a cara de infoproduto que o cliente rejeitou.
- **Vindi:** a mensalidade de R$ 299 a R$ 1.119 só se paga com centenas de assinantes.

### 5.3 Parcelamento: recomendação comercial

- **Pix como padrão** no checkout. Se o IAE quiser, ofereça um desconto pequeno no Pix: o custo de cartão poupado paga o desconto.
- **Até 6x sem juros** (o IAE absorve cerca de 3,5%, mais a antecipação, se quiser receber à vista). Para um curso de R$ 2.000, parcela de R$ 333 é o argumento de venda.
- **De 7x a 12x com juros do cliente:** a plataforma calcula a parcela com acréscimo e cria a cobrança parcelada pelo valor total. No Asaas isso é uma cobrança parcelada com valor total maior. Mostre o CET (custo efetivo total) na tela.
- **Sem antecipação no início:** com 5 alunos pagos, receber parcela a parcela evita 8% a 11% de custo. Antecipe só quando faltar caixa.

### 5.4 Assinatura com retentativa (clube)

- **Cartão:**
  - Asaas e Vindi têm retentativa nativa (na Vindi, nos três planos; só a "retentativa inteligente" é serviço adicional).
  - A Stripe tem a mais sofisticada (Smart Retries: 8 tentativas em 2 semanas por padrão, com escolha por IA), mas não resolve parcelamento nem Pix Automático no Brasil.
- **Pix Automático:**
  - Em vigor no Brasil desde junho de 2025 (data a confirmar).
  - Asaas e Iugu já integram; na Stripe, não está disponível para contas brasileiras.
  - Para quem não quer deixar cartão salvo, é o substituto do débito automático, e combina com público jovem.
- **Regra de produto:**
  - Inadimplente perde o acesso ao acervo do clube depois de N dias (sugestão: 7).
  - Nunca perde o acesso a cursos comprados de forma vitalícia.
  - Por isso o modelo de dados precisa de **direitos de acesso por produto** (item 23), não de um booleano "é assinante".

### 5.5 Nota fiscal (NFS-e)

- **Asaas:** emite NFS-e integrada por R$ 0,49 por nota e pode emitir automaticamente quando a cobrança é paga (documentado como "emissão automática de notas fiscais" nas assinaturas).
- **Demais gateways:** precisam de um emissor separado (NFE.io, Focus NFe, eNotas, Plugnotas). A integração é por webhook: pagamento confirmado gera a emissão da nota (estimativa: 1 a 2 dias de integração).
- **Padrão nacional da NFS-e:** com a reforma tributária (LC 214/2025), passou a ser referência a partir de 2026, e os municípios estão migrando. O Rio de Janeiro usa a Nota Carioca. **A verificar com o contador do IAE** se o município exige o emissor nacional ou o municipal para o código de serviço de ensino (item 8.02 da lista da LC 116/2003: instrução, treinamento, cursos livres).

### 5.6 Peculiaridades de associação sem fins lucrativos

Tudo nesta subseção é **de conhecimento prévio, sem verificação na web hoje**. Deve ser validado pelo contador e por um advogado tributarista do IAE antes de entrar na proposta.

1. **Cadastro no gateway (KYC):** a associação abre conta PJ normalmente, com o CNPJ na natureza jurídica de associação privada (código 399-9).
   - Documentos exigidos com frequência: estatuto, ata de eleição da diretoria vigente, documento do presidente e comprovante de endereço.
   - **Risco prático:** ata vencida trava a abertura da conta. Peça ao IAE para conferir agora.
2. **Imunidade de impostos (Constituição, art. 150, VI, "c"):**
   - Alcança instituição de educação sem fins lucrativos (renda, patrimônio e serviços, o que inclui ISS e IRPJ) se cumprir o CTN art. 14:
     - não distribuir patrimônio nem renda;
     - aplicar tudo no país;
     - manter escrituração regular.
   - Um "instituto de prática jurídica" pode se enquadrar como instituição de educação, mas isso depende do estatuto e da prática.
   - **Ponto sensível:** a reunião fala em "sócios". Em associação, há associados e dirigentes. Remunerar dirigentes ou distribuir sobra pode derrubar a imunidade.
   - A Lei 9.532/1997 (arts. 12 e 15) e a Lei 13.151/2015 tratam das condições em que dirigentes podem ser remunerados.
3. **Contribuições sociais:**
   - **COFINS:** isenção sobre receitas de atividades próprias (MP 2.158-35/2001, art. 14, X). O STJ, em recurso repetitivo (REsp 1.353.111), entendeu que mensalidades de instituição de ensino sem fins lucrativos são receita de atividade própria.
   - **PIS:** 1% sobre a folha de salários (art. 13 da mesma MP), não sobre o faturamento.
   - **Reforma tributária (IBS e CBS):** muda esse quadro a partir de 2027. A imunidade constitucional se mantém, mas o contador precisa enquadrar.
4. **Nota fiscal ou recibo:**
   - Venda de curso ou assinatura é prestação de serviço, mesmo para entidade imune. A regra geral municipal é emitir **NFS-e marcando a imunidade ou isenção**, sem destaque de ISS, e não um simples recibo.
   - **Recibo** cabe para doação e, em tese, para contribuição associativa (anuidade de associado prevista no estatuto).
   - Estruturar o clube como "anuidade de associado" é uma tese, não um atalho: só vale se o estatuto prever e se o assinante for de fato associado (com direito a voto etc.).
   - **Recomendação:** emitir NFS-e para tudo que é venda.
5. **Cartão:** não há regra de bandeira que impeça associação de vender curso. Na abertura da conta, cadastre a atividade como **educação** (MCC 8299, escolas e serviços educacionais), não como caridade (MCC 8398). Assim a análise de risco e as regras de estorno ficam as de venda de curso. Estimativa, a confirmar com o gateway.
6. **Doações:** se o IAE quiser receber doações (bolsas, por exemplo), use um link de Pix separado, com recibo de doação e contabilização separada da receita de cursos.
7. **Consumidor (CDC art. 49):** compra online tem direito de arrependimento em 7 dias. A plataforma precisa de reembolso fácil (item 25) e de regra clara para "assistiu 80% e pediu reembolso" nos termos de uso.

### 5.7 Recomendação para o IAE

**Gateway principal: Asaas.** Motivos:
- Pix e boleto com tarifa fixa de R$ 1,99 (decisivo no ticket de R$ 2.000);
- cartão à vista a 2,99% + R$ 0,49 e parcelamento até 12x (21x em Visa e Master);
- assinatura nativa com Pix Automático;
- **NFS-e integrada por R$ 0,49**, o que tira um fornecedor da conta;
- split pela API (útil se um dia houver repasse a professores ou parceiros);
- sem mensalidade, API documentada e conta PJ que aceita associação.

**Plano B: Pagar.me.** Se o IAE quiser receber parcelado em D+1 sem gerenciar antecipação e aceitar pagar mais por isso (20,95% em 12x), ou se já tiver relação com a Stone.

**Não recomendados:**
- **Stripe:** sem parcelamento documentado no Brasil, Pix só por convite e sem Pix Automático. O parcelamento é cultural no ticket de R$ 2.000.
- **Hotmart como gateway:** taxa cerca de 3 vezes maior, cara de infoproduto e lock-in do aluno.
- **Vindi:** mensalidade sem justificativa com poucos assinantes.

**Como implementar (independente do gateway):**
- Interface `PaymentProvider` no FastAPI (criar cliente, cobrança, assinatura, reembolso).
- Webhooks idempotentes.
- Direitos de acesso guardados no nosso Postgres, nunca no gateway.
- Com isso, trocar de gateway é um adaptador novo, não uma reescrita.
- Esforço já contado nos itens 22 a 26.

## 6. UX sem tutorial

### 6.1 O que a evidência diz

- **NN/g, tutoriais de onboarding** (https://www.nngroup.com/articles/onboarding-tutorials/):
  - "Users frequently skip them".
  - São "push revelations", "devoid of context, and intrusive".
  - Não são memoráveis e não melhoram o desempenho.
  - O que funciona são "pull revelations": ajuda contextual disparada quando o usuário precisa.
- **NN/g, onboarding em apps** (https://www.nngroup.com/articles/mobile-app-onboarding/):
  - "avoid creating app onboarding whenever possible".
  - "users should be able to learn the interface by using it".
  - Dica em contexto quando é acionável ("highlight it when it's actionable for them").
- **NN/g, estados vazios** (https://www.nngroup.com/articles/empty-state-interface-design/): três funções do estado vazio:
  - comunicar o status;
  - ensinar em contexto (exemplo do DataDog: "Star your favorites to list them here");
  - oferecer o caminho direto para a ação.
- **NN/g, divulgação progressiva** (https://www.nngroup.com/articles/progressive-disclosure/):
  - mostrar primeiro o essencial;
  - "designs that go beyond 2 disclosure levels typically have low usability";
  - evitar múltiplos caminhos para a mesma coisa.

Conclusão para o IAE: **não fazer tour nem tutorial**. Fazer a interface óbvia, com uma ação principal por tela, e ajuda que aparece no momento certo.

### 6.2 O que copiar das plataformas de curso bem avaliadas

Esta tabela vem de observação prévia das plataformas, **não de navegação feita hoje** (sem acesso a capturas de tela nesta sessão; o Mobbin exigiu plano pago). O consolidador deve tratá-la como referência de padrão, não como auditoria.

| Plataforma | Padrão que funciona | Como vira tela no IAE |
|---|---|---|
| Coursera | Início dominado pelo "Retomar" do curso em andamento, com módulo e semana atuais | Card "Continuar" no topo da home do aluno |
| MasterClass | Trailer curto antes de comprar; aulas de 10 a 20 min; foco no professor como autoridade; visual sóbrio | Página do curso abre com vídeo de 60 a 90 s dos dois professores; aulas de 24 h fatiadas em capítulos |
| Domestika | Curso em unidades com duração visível; projeto final; avaliações reais na página | Duração de cada aula visível; depoimentos de alunos da turma presencial na página do curso |
| Alura | Trilhas ("formações") com progresso agregado e próxima aula sempre indicada | Barra "Módulo 2 de 8, faltam 2h10" e botão único "Próxima aula" |
| FGV Online e Insper | Tom institucional: ementa, carga horária, corpo docente e certificado em destaque; pouca gamificação | Na página do curso, carga horária, professores e modelo do certificado acima da dobra |

### 6.3 O que evitar das plataformas de comunidade "cheias de coisa"

- **Circle:**
  - Espaços, feed, chat, eventos, mensagens diretas e cursos num menu lateral longo.
  - O aluno não sabe onde está a aula.
  - Com várias formas de chegar ao mesmo conteúdo, a NN/g aponta queda de usabilidade.
- **Skool:**
  - Gamificação (pontos, níveis, ranking) e feed como tela principal.
  - A estética de "comunidade de criador" passa infoproduto, o oposto do tom FGV/Insper.
  - Preço público de US$ 9/mês (R$ 45,27) com 10% de taxa de transação, ou US$ 99/mês (R$ 497,97) com 2,9% (https://www.skool.com/pricing).
- **Hotmart Club:**
  - Vitrine estilo Netflix com banners, selos e ofertas cruzadas.
  - Bom para infoproduto, ruim para credibilidade institucional.
- **Comunidade dos últimos 30 dias:** a amostra foi pequena. A coleta via last30days trouxe 7 itens, com Reddit limitado por erro 429 e web indisponível. O único argumento recorrente útil foi o de dono da audiência: "If your community lives on Skool, Circle or a Facebook Group, you don't own it. You rent it" (@wbcomdesigns, fornecedor de comunidade própria, logo com interesse, em 12/10/2026). Vale como reforço para construir a comunidade dentro da plataforma do IAE, não como evidência forte.

### 6.4 Dez princípios para o IAE, com exemplo de tela

| # | Princípio | Exemplo concreto de tela |
|---|---|---|
| 1 | **Uma ação principal por tela** | Home do aluno logado: no topo, um card grande "Continuar: Orçamento do departamento jurídico, aula 3, minuto 23" com botão "Continuar". Todo o resto (catálogo, agenda) fica abaixo, menor. |
| 2 | **Primeira ação em 1 clique** | Depois do pagamento, a tela de confirmação já tem o player da aula 1 carregado, e o e-mail "Seu acesso está liberado" leva direto à aula, com login por link mágico. Sem tela de "complete seu perfil". |
| 3 | **Estados vazios que ensinam e levam à ação** | "Meus cursos" vazio: "Você ainda não começou nenhum curso. Comece pela aula aberta 'O que faz um jurídico interno' (12 min)", com botão "Assistir agora" e 3 cursos sugeridos. "Anotações" vazio: "Durante o vídeo, clique em Anotar e sua nota fica presa ao minuto." |
| 4 | **Ajuda puxada pelo contexto, nunca um tour** | Na primeira vez que o aluno pausa um vídeo, aparece uma única dica discreta: "Você pode voltar deste ponto em qualquer dispositivo". Ela some sozinha e não volta. No admin, a primeira vez em "Nova aula" mostra uma linha de ajuda ao lado do campo de upload. |
| 5 | **Navegação com no máximo 3 itens e 2 níveis** | Menu do aluno: "Início", "Cursos", "Ao vivo", mais o avatar (perfil, certificados, pagamentos). "Comunidade" e "Benefícios" só aparecem para quem é membro do clube. Ninguém vê menu de coisa que não pode usar. |
| 6 | **Progresso e tempo sempre visíveis** | Card do curso: "Módulo 2 de 8, faltam 2h10". Cada aula na lista mostra a duração e um check quando concluída. O certificado aparece como "faltam 2 aulas para o seu certificado". |
| 7 | **Tom institucional, sem gamificação** | Rótulos sóbrios: "Aula", "Material", "Certificado", "Professores". Sem pontos, medalhas, ranking ou contagem regressiva de oferta. A página do curso mostra carga horária, professores e um modelo do certificado acima da dobra, como FGV e Insper. |
| 8 | **Ao vivo e gravado no mesmo lugar** | 15 minutos antes da aula, um banner na home: "Ao vivo agora: Contratos com fornecedores, com Gustavo Costa e convidada", botão "Entrar". Depois da aula, o mesmo item vira "Gravada em 12/11/2026" dentro do curso, sem o aluno procurar em outro menu (pedido da Ana Luiza e da Helena). |
| 9 | **Checkout curto, com Pix como padrão** | Uma página: resumo do curso à esquerda e, à direita, Pix pré-selecionado (com QR Code), a aba "Cartão em até 12x" mostrando a parcela, e "Boleto". Sem cadastro prévio: e-mail e CPF bastam, e a conta é criada junto. Ao confirmar, cai na aula 1 (princípio 2). |
| 10 | **Lembrar as escolhas e medir antes de acrescentar** | O player lembra velocidade, legenda e qualidade por aluno. Nenhuma funcionalidade nova entra no menu principal sem métrica de uso e um teste com 5 alunos da turma presencial (eles já existem e são o laboratório). |

### 6.5 Onde o onboarding faz sentido: a equipe do IAE

Quem mais precisa de orientação não é o aluno, é a equipe do IAE no painel administrativo (Vinicius, Helena, os professores). Para eles:

- uma lista de primeiros passos de 3 itens no admin vazio ("Crie seu primeiro curso", "Suba a primeira aula", "Publique e veja como o aluno enxerga");
- botão "ver como aluno" em toda tela de edição;
- estado vazio com exemplo preenchido (curso de demonstração que pode ser apagado).

Isso cumpre o pedido de autonomia ("editar títulos, vídeos, comentários sem depender de nós") sem manual.

---

## Confiança (unificada)

### Fato verificado (fonte primária, 13/10/2026)

**Itens 1 e 2 (b1):**
- Preços e recursos de Members Club, Memberkit (planos e FAQ: não processa pagamento, não hospeda vídeo, domínio próprio grátis, créditos de IA à parte), Hotmart (9,9% + R$ 2,49), Kiwify (8,99% + R$ 2,49), Eduzz (tabela completa de tarifas e armazenamento), WAID/Curseduca (planos e banda), Teachable, Thinkific (inclusive banda de vídeo por plano), Kajabi, Circle, Mighty Networks, Frappe Cloud (a partir de US$ 5), Mux, Cloudflare Stream e Bunny Stream.
- Future Law: formatos, preços cheio e promocional, acesso de 7 meses, link para escola na Thinkific, checkout terceirizado.
- FGVlaw: formato curta duração (8 encontros, 32 h-a), preço do curso de Compliance (PDF do programa 2027), preço da pós Gestão Jurídica Executiva (PDF de investimento), carga de 432 h-a; FGV cursos gratuitos de 1 a 9 h-a com avaliações; metodologia do online.
- Insper: preços de LL.M. (página oficial de preços 2026), cursos "Gestão Estratégica de Departamento Jurídico" e "Estratégias Avançadas para Líderes Jurídicos" com carga, datas, modalidade Live Learning, pré-requisitos e preços.
- Documentação do Mux (Context7): upload direto, níveis de resolução e qualidade, reprodução assinada por JWT, webhook de live concluída.

**Item 3 (b3):**
- Repositório, README, ADRs 0024, 0033 e 0039, glossário e constantes de silêncio do mattpocock/course-video-manager; estrelas do CVM (807), skills (cerca de 290 mil), sandcastle (8,4 mil), auto-editor (5,5 mil, versão 31.7.2), HyperFrames (62,7 mil, Apache 2.0), via API do GitHub.
- Preços oficiais: OpenAI (transcrição), Deepgram, AssemblyAI, Gemini (preços e tokens por segundo de vídeo), Claude (tabela oficial), xAI (LLM, Imagine, Speech to Text), Descript, Remotion (licença), Claude Pro/Team.
- Guia oficial do Grok 4.7: entrada de texto e imagem; nenhuma menção a vídeo.
- Transcrição da reunião 2 (Wispr Flow) para o contexto de Matt Pocock, Jack Roberts, Grok e MCP.

**Itens 4, 5 e 6 (b2, página oficial aberta em 13/10/2026):**
- Taxas da Asaas (Pix, boleto, cartão à vista e parcelado, antecipação, NFS-e a R$ 0,49, mensalidade zero) e o conflito interno da página sobre a taxa de assinatura.
- Pagar.me, oferta Essencial: Pix 0,99%, crédito 4,19%, 6x 13,63%, 12x 20,95%, D+1.
- Stripe Brasil: cartão 3,99% + R$ 0,39, Pix 1,19% só por convite, boleto R$ 3,45, Billing 0,7%, contestação R$ 55.
- Pix na Stripe: limite de R$ 3.000 por transação e Pix Automático indisponível no Brasil (docs.stripe.com).
- Parcelamento da Stripe: a doc não lista o Brasil.
- Smart Retries da Stripe: 8 tentativas em 2 semanas por padrão.
- Vindi: planos de R$ 299, R$ 499 e R$ 1.119, mais as taxas por transação.
- Assinaturas e Pix Automático na Asaas (docs.asaas.com).
- Preço do Skool.
- Diretrizes da NN/g citadas.

### Estimativa (declarada como tal no texto)

**Itens 1 e 2 (b1):**
- Peso por hora de vídeo (0,7 a 1,5 GB em 1080p) e consumo mensal de banda do exemplo de 200 alunos; o Agente A deve substituir pelos números dele.
- Custo de gateway direto (3% a 5%). **Nota do editor:** superado pelas taxas oficiais da seção 5 (ver contradição 2).
- Cronograma de 7 semanas do MVP compor e prazo de 8 a 12 semanas para construir tudo.
- Comportamento de vídeo no Moodle e no Open edX (conhecimento técnico prévio, não verificado em página oficial hoje).
- Convivência de assinatura e produto único na Hotmart (prática comum, não confirmada na página lida).

**Item 3 (b3):**
- Tokens por hora de aula (30 mil), número de passadas de LLM (3) e tokens de saída; portanto, todos os custos de LLM por hora.
- Custo de CPU/render considerado zero na VPS existente; o tempo real de re-encode de 3 h depende da máquina (não medido).
- Esforço em dias da seção 3.3.5 e do MCP.
- Preço do Vizard (fonte de terceiros, divergente) e créditos do Opus Clip (agregadores concordam em 150 e 300 créditos, página oficial não mostra).

**Itens 4, 5 e 6 (b2, estimativa ou fonte secundária):**
- Taxas do Mercado Pago (blogs e calculadoras; a página oficial devolveu 403).
- Taxas da Iugu (revendedor).
- Taxa da Hotmart (9,9% + R$ 1, de conhecimento prévio; a página oficial não carregou). **Nota do editor:** substituída pela taxa verificada na parte b1 (9,9% + R$ 2,49), ver contradição 1.
- Tabela de parcelamento e antecipação da Vindi (PDF de jun/2025).
- Custo de antecipação na simulação.
- Todos os esforços em dias.
- O ticket de assinatura de R$ 99.
- O MCC recomendado.
- A tabela de padrões das plataformas de curso (observação prévia, sem navegação hoje).

**Do editor:**
- Recalculos da seção "Contradições" (R$ 199 a R$ 6.029 por 100 vendas e R$ 690/mês no clube com Asaas; R$ 12,29 por assinatura na Hotmart) são contas sobre taxas verificadas, não fonte nova.
- Economia de cerca de 1 dia se itens 30 e 52 forem feitos juntos, e custo da modelagem de trilha caber na semana 1.

### A verificar (sem acesso hoje, conhecimento prévio)

- Requisitos da Resolução CNE/CES 1/2018 (360 h, 30% de mestres e doutores, quem pode ofertar).
- Efeito do Decreto 12.456/2025 sobre lato sensu EaD.
- Toda a subseção 5.6 (imunidade, isenções, COFINS/PIS, NFS-e da entidade imune no Rio, padrão nacional da NFS-e, efeitos da reforma tributária).
- Data de início do Pix Automático.

### Ficou sem resposta

**Itens 1 e 2 (b1):**
- Confirmação de que o "Members Club" citado pelo Vinicius é o mymembersclub.com.br (a busca na web estava indisponível; recomenda-se pedir o link ao cliente).
- Taxa do checkout Applyfy usado pelo plano "R$ 0" do Members Club.
- Preço da Cademí (página de preços retornou erro Cloudflare 1014).
- Preço da MoodleCloud e de provedores de Open edX.
- Mensalidade da Thinkific no plano mensal e taxa de transação: respondidas na verificação (mensal US$ 54, 109 e 219; taxa de 5%, 2% e 1% com processador próprio). A taxa vem de terceiro (FreshLearn), não da página oficial.
- Preço de cursos curtos pagos da FGV Online em Direito (a listagem filtrada falhou ao carregar).
- Sentimento da comunidade nos últimos 30 dias sobre Members Club e Future Law: a skill last30days rodou, mas não encontrou discussão relevante (resultados dominados por homônimos em inglês; Reddit com limite de requisições, web e Instagram indisponíveis). Não significa ausência de discussão, só que não foi captada.

**Item 3 (b3):**
- Se existe um produto de edição de vídeo do próprio Jack Roberts: não encontrado; identidade "@Itssssss_Jack" é inferida pelo contexto, não confirmada com o Rib.
- Se algum modelo Grok aceita vídeo pela API (um site de terceiros afirma que o Grok 4.3/4.5 aceita; a documentação oficial atual não confirma).
- Suporte oficial a português no AssemblyAI Universal-3.5 Pro (não listado na página de preços).
- Qualidade real de transcrição e de detecção de repetições em aula jurídica presencial com dois professores: só um teste com a aula do IAE responde.
- Preços oficiais da API do Opus Clip e do Vizard (não publicados).
- Se o Matt Pocock tem vídeo específico explicando o CVM (o Rib cita lives testando skills; a busca achou só o workshop de 24/04/2026 e cortes no Instagram).

**Itens 4, 5 e 6 (b2):**
- Taxa de boleto e de recorrência do Pagar.me.
- Tabela oficial da Iugu.
- Taxas de assinatura do Mercado Pago.
- Se a Asaas permite repassar juros do parcelamento ao comprador de forma nativa (assumi cálculo pela plataforma).
- Exigência exata da prefeitura do Rio para NFS-e de entidade imune.
- Sinal forte da comunidade nos últimos 30 dias sobre Circle, Skool e Hotmart Club (amostra pequena e fontes parciais).
- Taxa oficial vigente da Hotmart: **respondida pela parte b1** (9,9% + R$ 2,49, hotmart.com/pt-br/taxa-hotmart, 13/10/2026).

**Do editor:**
- Mural de avisos do clube citado na b1 sem item nem esforço na lista de 53 funcionalidades.
- Números de vídeo (peso por hora, custo Mux/Cloudflare/Bunny) aguardam o Agente A.

---

## Fontes (unificadas, sem duplicatas)

Todas acessadas em 13/10/2026.

### Referências do cliente: Members Club, Future Law, FGV, Insper (b1)

- https://mymembersclub.com.br/ (acesso em 13/10/2026)
- https://www.futurelaw.com.br/ (acesso em 13/10/2026)
- https://www.futurelaw.com.br/cursos/legal-operations-nova-edicao (via futurelaw.com.br/cursos/legal-operations-nova-edicao) (acesso em 13/10/2026)
- https://www.futurelaw.com.br/cursos/tech-driven-law (acesso em 13/10/2026)
- https://www.futurelaw.com.br/cursos/direito-da-concorrencia (acesso em 13/10/2026)
- https://www.futurelaw.com.br/cursos/poder-publico-4-0-inovacao-e-fomento-da-tecnologia (acesso em 13/10/2026)
- https://www.futurelaw.com.br/cursos/eficiencia-na-pratica-com-ia (acesso em 13/10/2026)
- https://educacao-executiva.fgv.br/cursos/online/curta-media-duracao-online (acesso em 13/10/2026)
- https://cursosgratuitos.fgv.br/ (acesso em 13/10/2026)
- https://direitorio.fgv.br/ (acesso em 13/10/2026)
- https://direitosp.fgv.br/cursos/pos-lato-sensu-fgvlaw/curta-duracao (acesso em 13/10/2026)
- https://direitosp.fgv.br/cursos/pos-lato-sensu-fgvlaw/pos-graduacao-lato-sensu (acesso em 13/10/2026)
- https://direitosp.fgv.br/cursos/curta-duracao/fgvlaw-compliance-empresarial-gestao-riscos-corporativos (acesso em 13/10/2026)
- https://direitosp.fgv.br/sites/default/files/cursos/arq-prog/2026-09/programa-2027-compliance-empresarial-e-gestao-de-riscos-corporativos-fgv-law_0.pdf (acesso em 13/10/2026)
- https://direitosp.fgv.br/cursos/pos-graduacao-lato-sensu/fgvlaw-gestao-juridica-executiva (acesso em 13/10/2026)
- https://direitosp.fgv.br/sites/default/files/link-arquivo/2026-09/Investimento%20-%20Pos-12.pdf (acesso em 13/10/2026)
- https://www.insper.edu.br/pt/cursos/pos-graduacao/direito (acesso em 13/10/2026)
- https://www.insper.edu.br/pt/cursos/pos-graduacao/precos-cursos-pos-graduacao-insper (acesso em 13/10/2026)
- https://ee.insper.edu.br/cursos/direito/ (acesso em 13/10/2026)
- https://ee.insper.edu.br/cursos/direito/gestao-estrategica-de-departamento-juridico/ (acesso em 13/10/2026)
- https://ee.insper.edu.br/cursos/direito/estrategias-avancadas-para-lideres-juridicos/ (acesso em 13/10/2026)

### Plataformas prontas de LMS, área de membros e comunidade (b1)

- https://hotmart.com/pt-br/taxa-hotmart (acesso em 13/10/2026)
- https://kiwify.com.br/ (acesso em 13/10/2026)
- https://www.eduzz.com/taxas (acesso em 13/10/2026)
- https://www.eduzz.com/produtos/nutror (acesso em 13/10/2026)
- https://memberkit.com.br/ (acesso em 13/10/2026)
- https://cademi.com.br/ (acesso em 13/10/2026)
- https://ajuda.cademi.com.br/llms.txt (acesso em 13/10/2026)
- https://curseduca.com/ (redireciona para https://waid.io/) (acesso em 13/10/2026)
- https://waid.io/ (acesso em 13/10/2026)
- https://teachable.com/pricing (acesso em 13/10/2026)
- https://www.thinkific.com/pricing/ (acesso em 13/10/2026)
- https://blog.freshlearn.com/blog/thinkific-pricing (terceiro, taxa de transação da Thinkific com processador próprio) (acesso em 13/10/2026)
- https://kajabi.com/pricing (acesso em 13/10/2026)
- https://circle.so/pricing (acesso em 13/10/2026)
- https://www.mightynetworks.com/pricing (acesso em 13/10/2026)
- https://frappe.io/learning (acesso em 13/10/2026)
- https://frappe.io/cloud/pricing (acesso em 13/10/2026)
- https://openedx.org/get-started/ (acesso em 13/10/2026)

### Provedores de vídeo citados (b1)

- https://www.mux.com/pricing (acesso em 13/10/2026)
- https://www.mux.com/docs/guides/secure-video-playback (via Context7, /websites/mux) (acesso em 13/10/2026)
- https://www.mux.com/docs/webhook-reference (via Context7, /websites/mux) (acesso em 13/10/2026)
- https://developers.cloudflare.com/stream/pricing/ (acesso em 13/10/2026)
- https://bunny.net/pricing/stream/ (acesso em 13/10/2026)

### Matt Pocock (b3)

- https://github.com/mattpocock/course-video-manager (acesso em 13/10/2026)
- https://github.com/mattpocock/course-video-manager/blob/main/CONTEXT.md (acesso em 13/10/2026)
- https://github.com/mattpocock/course-video-manager/tree/main/.claude/skills (acesso em 13/10/2026)
- https://github.com/mattpocock/course-video-manager/tree/main/docs (ADRs 0024, 0033, 0039 e GLOSSARY.md, lidos via API do GitHub) (acesso em 13/10/2026)
- https://github.com/mattpocock/skills (acesso em 13/10/2026)
- https://github.com/mattpocock/sandcastle (acesso em 13/10/2026)
- https://www.aihero.dev/ (acesso em 13/10/2026)
- https://www.aihero.dev/cohorts/claude-code-for-real-engineers-2026-04 (acesso em 13/10/2026)
- https://x.com/mattpocockuk/status/2056447804537741327 (acesso em 13/10/2026)
- https://github.com/shanraisshan/claude-code-best-practice/blob/main/videos/claude-matt-pocock-24-apr-26.md (acesso em 13/10/2026)
- https://www.youtube.com/watch?v=Q3uuE2adUT8 (acesso em 13/10/2026)
- https://www.instagram.com/reel/Dd61VJkkb8D/ (acesso em 13/10/2026)

### Jack Roberts (b3)

- https://www.youtube.com/@Itssssss_Jack/videos (acesso em 13/10/2026)
- https://jackroberts.ai/ (acesso em 13/10/2026)
- https://www.skool.com/aiautomationsbyjack/about (acesso em 13/10/2026)
- https://www.skool.com/@jack-roberts (acesso em 13/10/2026)
- https://creatordb.app/creatorstats/itssssss_jack/ (acesso em 13/10/2026)
- https://creatordb.app/creatorstats/jackroberts___/ (acesso em 13/10/2026)
- https://chooseto.ai/creator/Itssssss_Jack (acesso em 13/10/2026)
- https://maily.so/josh/posts/vpzl2jp2rk9 (acesso em 13/10/2026)
- https://github.com/datassthou64-source/JackRobertsMotionGraphicSkill (acesso em 13/10/2026)
- https://jackaistudio.com/ (acesso em 13/10/2026)

### APIs de IA, transcrição e ferramentas de edição (b3)

- https://docs.x.ai/developers/pricing (acesso em 13/10/2026)
- https://docs.x.ai/developers/grok-4-7 (acesso em 13/10/2026)
- https://docs.x.ai/developers/model-capabilities/images/understanding (acesso em 13/10/2026)
- https://suprmind.ai/hub/grok/ (terceiro, afirmação não confirmada sobre vídeo) (acesso em 13/10/2026)
- https://developers.openai.com/api/docs/pricing (acesso em 13/10/2026)
- https://deepgram.com/pricing (acesso em 13/10/2026)
- https://www.assemblyai.com/pricing (acesso em 13/10/2026)
- https://ai.google.dev/gemini-api/docs/pricing (acesso em 13/10/2026)
- https://ai.google.dev/gemini-api/docs/video-understanding (acesso em 13/10/2026)
- https://platform.claude.com/docs/en/about-claude/pricing (acesso em 13/10/2026)
- https://claude.com/pricing (acesso em 13/10/2026)
- https://www.descript.com/pricing (acesso em 13/10/2026)
- https://www.descript.com/api (acesso em 13/10/2026)
- https://www.opus.pro/pricing (acesso em 13/10/2026)
- https://www.opus.pro/api (acesso em 13/10/2026)
- https://quso.ai/blog/opus-clip-pricing (terceiro, créditos do Opus Clip) (acesso em 13/10/2026)
- https://www.usagepricing.com/blueprint/opus-clip (terceiro) (acesso em 13/10/2026)
- https://vizard.ai/pricing (acesso em 13/10/2026)
- https://www.capterra.com/p/10009818/Vizard/pricing/ (terceiro) (acesso em 13/10/2026)
- https://github.com/WyattBlue/auto-editor (e documentação via Context7, /wyattblue/auto-editor) (acesso em 13/10/2026)
- https://www.remotion.pro/license (acesso em 13/10/2026)
- https://github.com/heygen-com/hyperframes (acesso em 13/10/2026)

### Pagamentos no Brasil (b2)

- https://stripe.com/br/pricing (acesso em 13/10/2026)
- https://docs.stripe.com/payments/pix (acesso em 13/10/2026)
- https://docs.stripe.com/payments/installments (acesso em 13/10/2026)
- https://docs.stripe.com/billing/revenue-recovery/smart-retries (acesso em 13/10/2026)
- https://www.asaas.com/precos-e-taxas (acesso em 13/10/2026)
- https://docs.asaas.com/docs/assinaturas (acesso em 13/10/2026)
- https://docs.asaas.com/docs/pix-automatico (acesso em 13/10/2026)
- https://pagar.me/precos/ (acesso em 13/10/2026)
- https://www.pagar.me/ofertas (acesso em 13/10/2026)
- https://pagarme.helpjuice.com/pt_BR/p1-saques-recebimentos-e-antecipa%C3%A7%C3%A3o/antecipa%C3%A7%C3%A3o-o-que-%C3%A9-antecipa%C3%A7%C3%A3o (acesso em 13/10/2026)
- https://vindi.com.br/precos/ (acesso em 13/10/2026)
- https://www.pagamentos.vindi.com.br/assets/contratos/tabela-de-tarifas.pdf (tabela de 27/06/2025) (acesso em 13/10/2026)
- https://atendimento.vindi.com.br/hc/pt-br/articles/12114248534171 (acesso em 13/10/2026)
- https://www.iugu.com/iugu-recorrencia (acesso em 13/10/2026)
- https://support.iugu.com/hc/pt-br/articles/360056021752-Onde-localizo-as-taxas-cobradas-por-transa%C3%A7%C3%A3o (acesso em 13/10/2026)
- https://edvan.com.br/iuguboleto (taxas de revendedor, não oficiais) (acesso em 13/10/2026)
- https://sellsync.ai/pt/blog/taxa-mercado-pago-2026-guia-completo/ (secundária) (acesso em 13/10/2026)
- https://www.calculadoradetaxas.com.br/mercado-pago/taxas (secundária, maquininhas) (acesso em 13/10/2026)
- https://mindconsulting.com.br/2026/07/gateways-pagamento-online-brasil-comparativo-2026/ (secundária, jul/2026) (acesso em 13/10/2026)

### UX e plataformas de comunidade (b2)

- https://www.skool.com/pricing (acesso em 13/10/2026)
- https://www.nngroup.com/articles/onboarding-tutorials/ (acesso em 13/10/2026)
- https://www.nngroup.com/articles/mobile-app-onboarding/ (acesso em 13/10/2026)
- https://www.nngroup.com/articles/empty-state-interface-design/ (acesso em 13/10/2026)
- https://www.nngroup.com/articles/progressive-disclosure/ (acesso em 13/10/2026)

### Contexto e pesquisa social (b1, b2, b3)

- https://notes.wisprflow.ai/shared/HbHxBPoTdgpzyFYGWY7ZuAYBrw4X6pmr5jnm87V3XoM (reunião 2) (acesso em 13/10/2026)
- Pesquisa social: skill last30days v3.21.1, arquivo bruto ~/Documents/Last30Days/future-law-e-members-club-area-de-membros-raw-v3.md (acesso em 13/10/2026)
- ~/Documents/Last30Days/matt-pocock-raw-v3-2026-10-13.md (saída do last30days) (acesso em 13/10/2026)
- https://x.com/wbcomdesigns/status/2109505089228439940 (via last30days, coleta parcial) (acesso em 13/10/2026)
- Arquivo bruto do last30days: ~/Documents/Last30Days/skool-circle-hotmart-club-course-community-platform-ux-raw-v3.md (acesso em 13/10/2026)

### Câmbio (comum às três partes)

- Cotação: AwesomeAPI, USD 1 = R$ 5,03 em 13/10/2026 (fornecida pelo orquestrador) (acesso em 13/10/2026)
