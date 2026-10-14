# Agente B, itens 1 e 2: referências do cliente e construir vs comprar vs compor

Data da pesquisa: 13/10/2026. Cotação usada: **USD 1 = R$ 5,03** (AwesomeAPI, 13/10/2026). Todos os preços em USD foram convertidos com essa cotação.

Observação de método: a cota de buscas na web da sessão acabou logo no início desta pesquisa. Por isso, quase tudo abaixo veio de leitura direta das páginas oficiais (WebFetch e navegador Playwright para sites que bloqueiam leitura simples, como FGV e Insper) e dos PDFs oficiais de edital/investimento. Isso aumenta a confiabilidade dos números (fonte primária), mas reduz a cobertura de opiniões de terceiros.

---

## Resumo em 10 linhas

1. **O mercado de "jurídico in-house" não está vazio**: o Insper vende "Gestão Estratégica de Departamento Jurídico" (40 h, R$ 10.885,74, presencial ou Live Learning noturno) e "Estratégias Avançadas para Líderes Jurídicos" (40 h, R$ 11.470,80); a FGV Direito SP vende a pós "Gestão Jurídica Executiva" (432 h-a, R$ 53.935). Todos miram **líderes com 2 a 5 anos de experiência**. O espaço livre do IAE é o público de entrada (estudante, recém-formado, quem migra de escritório), em formato curto, online e mais barato.
2. **Preço por hora**: IAE R$ 83/h; Future Law R$ 50/h cheio (R$ 15/h na promoção); FGVlaw curta duração R$ 150 a 165/h-a; Insper R$ 272/h. O IAE está no meio, mais perto de Future Law do que de FGV/Insper. Há espaço para subir preço quando a credibilidade estiver construída.
3. **O formato do IAE (8 encontros noturnos) é idêntico ao "curta duração" da FGVlaw** (8 encontros, 32 h-a, terças 19h às 22h40, R$ 5.275). Isso é bom para posicionamento: o IAE fala a língua das escolas de elite.
4. **Members Club** (mymembersclub.com.br) é uma área de membros "Netflix" para infoprodutor: R$ 597/mês (ou R$ 0 com o checkout Applyfy), alunos ilimitados, white-label, domínio próprio. Não informa hospedagem de vídeo, assinatura nem trilhas. É referência de **experiência do aluno**, não de tom.
5. **Future Law** é a referência mais próxima em conteúdo: gravação de encontros ao vivo, microlearning, nanodegree, B2B ("Future Law In"), evento anual. Mas usa promoções agressivas (70% OFF, lotes, contador) e uma colcha de plataformas (Thinkific, "Spaces", checkout terceirizado, WhatsApp). Copiar o formato, evitar o varejo.
6. **Plataformas brasileiras de infoproduto** (Hotmart 9,9% + R$ 2,49 por venda; Kiwify 8,99% + R$ 2,49; Eduzz 4,9% a 6,9% + R$ 2,49) carregam a "cara de infoproduto" que o cliente rejeita, ficam com a relação com o aluno e cobram cerca de **R$ 200 por venda de um curso de R$ 2.000**.
7. **Áreas de membros puras** (Memberkit R$ 197 a 697/mês; Cademí sem preço público) são baratas e white-label, mas **não hospedam vídeo** (exigem Panda, Vimeo, VdoCipher) e são desenhadas para o funil de infoproduto.
8. **LMS internacionais** (Teachable, Thinkific, Kajabi) têm visual mais sóbrio, mas cobram em dólar (R$ 350 a 2.500/mês), têm limites de banda de vídeo (Thinkific: 100 a 400 GB/mês) e trilhas com pré-requisito só nos planos Enterprise. **Comunidades** (Circle, Mighty) são peças de comunidade, não de curso. **Moodle/Open edX** resolvem pós e trilha, mas têm operação pesada e UX datada.
9. **Veredito: COMPOR.** Construir o app (Next.js + FastAPI + Postgres) com as regras de negócio do IAE (assinatura + vitalício + trilha de pós, B2B, admin, IA) e **alugar as três peças que não são nosso forte**: vídeo gerenciado (Mux, Cloudflare Stream ou Bunny Stream), gateway de pagamento e a ferramenta de live (Zoom/Meet no MVP). O risco que os sócios temem (vídeo) sai do nosso colo; o que o cliente valoriza (tom institucional, regras próprias, dados próprios) fica conosco.
10. **Plano B honesto**: se o MVP de dezembro ficar em risco, Thinkific (Start, US$ 82/mês anual) ou Memberkit (R$ 497/mês) com Panda Video colocam um clube no ar em dias, ao custo de tom e de lock-in. Recomendamos não começar por aí.

---

## Parte 1: referências citadas pelo cliente

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
| Preço (exemplos) | Legal Operations: 30 h-a, **R$ 1.497 cheio, R$ 449,10 na promoção**. Tech-Driven Law: 17 h-a, R$ 1.197 / R$ 359,10. Concorrência: R$ 1.297 / R$ 389,10. Poder Público 4.0: 25 h-a, R$ 1.397 / R$ 419,10. Eficiência com IA: R$ 997 / R$ 299,10. Promoções na home: 70% OFF em gravados, "compre 1 e ganhe outro", cupons de 30%. |
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
| Cursos gratuitos | Portal cursosgratuitos.fgv.br (FGV foi a primeira brasileira no consórcio Open Education Global, 2008). Cursos **autoinstrucionais de 1 a 9 h-a**, a maioria de **5 h-a**, sem tutor, com nota e contagem de avaliações (ex.: "Acesso à Informação", 5 h-a, 4,9 estrelas, 25.419 avaliações). Há série "FGV Direito SP". É o "curso curto de 5 horas" que o cliente citou. |
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
| Concorrente direto | **Gestão Estratégica de Departamento Jurídico**: 40 h; presencial (seg a sex, 9h às 18h, 26 a 30/10/2026) ou Live Learning (seg e qua, 19h30 às 22h, 04/11 a 14/12/2026). Pré-requisito: 2 anos em cargo de liderança. **R$ 10.885,74** integral, R$ 9.797,17 matrícula antecipada, R$ 8.164,31 Alumni, até 10x sem juros. Conteúdo: orçamento, indicadores, gestão de terceirizados e contencioso, carreira em Y, expatriação, carreira pós-corporativa. 17 professores, maioria executivos jurídicos. |
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
| Curso curto típico | n/a | 17 a 30 h-a | 32 h-a, 8 encontros | 40 h | 24 h, 8 encontros |
| Preço do curto | n/a | R$ 997 a 1.497 (promo 70% off) | R$ 4.790 a 5.275 | R$ 10.885 a 11.470 | cerca de R$ 2.000 |
| R$ por hora | n/a | R$ 50 (R$ 15 na promo) | R$ 150 a 165 por h-a | R$ 272 | R$ 83 |
| Assinatura | sim (o produto) | não identificado | não | não | desejada |
| Ao vivo online | via YouTube/Zoom | sim | não no curto (presencial) | sim (Live Learning) | desejado |
| Gravação do ao vivo | n/a | sim | n/a | não informado | desejado |
| Trilha com pré-requisito | não informado | nanodegree | pós de 432 h-a | sim (curso avançado) | desejado (pós) |
| B2B | n/a | Future Law In | in company | "Customizados para Organizações" | escritórios (público 4) |
| Tom | infoproduto | moderno, varejo | institucional | institucional | institucional desejado |

**Achado que precisa ir para a proposta:** o posicionamento "não existe isso no mercado" é verdadeiro para o público de entrada e para o formato curto/online/acessível, mas **não** para líderes jurídicos: Insper e FGVlaw já vendem gestão de departamento jurídico com professores executivos. A proposta deve posicionar o IAE como "a porta de entrada e a formação contínua do advogado in-house", e não como o único curso de gestão jurídica.

---

## Parte 2: plataformas prontas (comprar ou usar como peça)

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
| **Teachable** | Starter US$ 39 (R$ 196); **Builder US$ 89 (R$ 447,67)** ou US$ 69 anual; **Growth US$ 189 (R$ 950,67)** ou US$ 139 anual (R$ 699,17) | Starter 7,5%; Builder e Growth 0% com Teachable Payments; cartão internacional 3,9% + US$ 0,30 | Até 1 TB de vídeo | Memberships e bundles; recorrência não detalhada; trilha não | API no Builder+ (Growth: 10.000 req/mês); remove marca só no Growth; suporte ao Brasil não informado | Médio-alto (visual limpo) | Médio |
| **Thinkific** | Anual: **Basic US$ 40 (R$ 201,20)**, **Start US$ 82 (R$ 412,46)**, **Grow US$ 164 (R$ 824,92)**, Plus sob consulta; app com marca +US$ 199/mês | Não informado na página lida | **Banda de vídeo: 100 GB/mês (Basic), 200 GB (Start), 400 GB (Grow)**, Plus a partir de 7.500 GB | Assinaturas e memberships (Start+); **trilhas de aprendizagem e SCORM só no Plus**; vendas B2B por lote de assentos e fatura no Grow | API e webhooks no Grow; remove marca no Grow; domínio próprio desde o Basic | **Alto** (usado por academias corporativas e associações) | Médio |
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
| Gateway direto (estimativa 3% a 5%, ver Agente B item 5) | R$ 60 a 100 | R$ 6.000 a 10.000 | R$ 594 a 990 |

Conta: percentual sobre o valor + R$ 2,49 fixo por transação. Para o clube, 200 transações por mês. O gateway direto é estimativa até o Agente B fechar o item de pagamentos.

### 2.3 Observações que mudam a decisão

- **Banda de vídeo é o calcanhar das plataformas prontas.** Uma hora de aula em 1080p para aula com slides pesa algo entre 0,7 e 1,5 GB por espectador (estimativa; o Agente A deve fechar o número). Com 200 alunos assistindo 4 h por mês (800 horas-aluno), o consumo fica entre 560 e 1.200 GB/mês. Isso estoura os 400 GB do Thinkific Grow e chega perto do 1 TB do WAID Evolution. Plataformas "ilimitadas" de infoproduto absorvem esse custo, mas cobram em taxa por venda.
- **Nenhuma plataforma brasileira de área de membros resolve trilha de pós com pré-requisito e histórico acadêmico.** Elas fazem liberação por data ou por pontuação. As internacionais só fazem trilhas em planos Enterprise (Thinkific Plus). Quem faz bem (Moodle, Open edX) cobra em operação e em UX.
- **As áreas de membros mais baratas não hospedam vídeo.** Memberkit e Cademí exigem Panda/Vimeo/VdoCipher. Ou seja, mesmo "comprando", o IAE teria uma peça de vídeo separada. Comprar não elimina o problema de vídeo, só o terceiriza para outra conta.
- **O tom é parte do produto.** Hotmart, Kiwify e Eduzz vendem a linguagem de "dígitos", afiliados e lançamento. O checkout, os e-mails transacionais e a página de obrigado chegam ao aluno com a marca da plataforma. Para um aluno que compara com FGV e Insper, isso pesa.
- **Comunidade pronta (Circle, Mighty) é uma segunda plataforma.** Login separado, cobrança em dólar e a "sensação de um milhão de coisas" que os sócios querem evitar. Só vale como peça se a comunidade virar o centro do clube, o que o Gustavo disse que não é prioridade.

---

## Parte 3: veredito construir vs comprar vs compor

### 3.1 As três opções

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

### 3.2 Por que compor

1. **O risco declarado dos sócios é vídeo, não funcionalidade.** Compor tira exatamente esse risco do nosso colo: upload direto do navegador para o provedor, transcodificação adaptativa, CDN, URLs assinadas e gravação de live viram chamadas de API. A documentação do Mux, por exemplo, cobre upload direto (`POST /video/v1/uploads` com `max_resolution_tier` 1080p/1440p/2160p e `video_quality` basic/plus/premium), política de reprodução assinada por JWT gerado no servidor, e webhook `video.asset.live_stream_completed` quando uma live vira vídeo sob demanda. Isso encaixa direto em FastAPI (backend assina o token) e Next.js (player).
2. **O que o cliente mais valoriza é o que nós fazemos rápido.** Regras de acesso (assinatura convivendo com compra vitalícia e com trilha de pós), parcerias e bolsas (UERJ, OAB), B2B por assentos, admin sem depender de nós, agente de IA com base de conhecimento própria: tudo isso é software de regra de negócio, o terreno onde entregamos com IA em dias.
3. **Tom institucional exige controle do design inteiro**, inclusive checkout, e-mails, certificado e página do professor. Só se consegue isso com app próprio.
4. **Custo de vídeo gerenciado é baixo no volume do IAE.** Referência de preços oficiais (o Agente A deve fechar o benchmark completo): Mux cobra US$ 0,003 por minuto armazenado por mês, US$ 0,001 por minuto entregue após 100.000 minutos grátis por mês, e encoding 1080p "basic" grátis; Cloudflare Stream cobra US$ 5 por 1.000 minutos armazenados e US$ 1 por 1.000 minutos entregues, encoding e ingestão de live grátis; Bunny Stream cobra a partir de US$ 0,01/GB armazenado e US$ 0,005/GB entregue, sem taxa de encoding, mínimo de US$ 1/mês. Exemplo ilustrativo: biblioteca de 100 h (6.000 min) e 200 alunos assistindo 4 h/mês (48.000 min) custariam cerca de **US$ 18/mês no Mux (R$ 90,54)** e **US$ 78/mês na Cloudflare Stream (R$ 392,34)**. É uma fração da taxa por venda de qualquer plataforma de infoproduto.
5. **A Helena existe e o site existe.** Um app próprio conversa com o site atual (que fica como está) e com o CRM Nexoris por API. Uma plataforma fechada criaria mais uma ilha de dados.
6. **Lock-in mínimo.** Se o vídeo ficar atrás de um módulo `video_provider` nosso (upload, playback token, webhook, delete), trocar Mux por Cloudflare ou Bunny é questão de dias, e o IAE pode até migrar para infraestrutura própria quando o volume justificar.

### 3.3 O que compõe o "compor"

| Peça | Fazer ou alugar | Opção recomendada para MVP | Observação |
|---|---|---|---|
| App do aluno e admin | Fazer | Next.js + FastAPI + Postgres (Supabase), deploy Coolify | Nosso stack de produção |
| Vídeo sob demanda | Alugar | Provedor gerenciado (decisão final com o Agente A: Mux, Cloudflare Stream ou Bunny Stream) | Interface interna agnóstica de provedor |
| Player | Alugar/biblioteca | Player do provedor (Mux Player) ou hls.js/Video.js | Retomar de onde parou, velocidade, legendas |
| Live | Alugar | Zoom ou Google Meet no MVP, com gravação enviada ao provedor de vídeo; avaliar Mux Live/Cloudflare Live ou LiveKit na fase 2 | Live própria não é MVP |
| Pagamento | Alugar | Gateway brasileiro com Pix, boleto, cartão recorrente (decisão no Agente B item 5) | Evitar marketplace de infoproduto |
| Comunidade | Fazer pequeno | Comentários por aula e mural de avisos no MVP; fórum na fase 2 | Evitar Circle/Mighty como segunda plataforma |
| Agente de IA | Fazer | Transcrição das aulas + base de conhecimento do cliente + modelo de linguagem | Fase 2, depois que houver acervo |
| Trilha de pós | Fazer | Modelo de dados de programa, módulo, pré-requisito e histórico desde o MVP, interface na fase 2/3 | Desenhar cedo evita migração |

### 3.4 Prazo: MVP até fim de novembro / começo de dezembro de 2026

Estimativa (cerca de 7 semanas a partir de 13/10/2026), sujeita à validação dos sócios:

| Semana | Entrega |
|---|---|
| 1 (até 20/10) | Modelo de dados (curso, módulo, aula, produto, plano, matrícula, assinatura, trilha), login, conta no provedor de vídeo, prova de conceito de upload e reprodução assinada |
| 2 e 3 (até 03/11) | Admin de conteúdo (Helena testando), catálogo, página de curso e de professor, player com progresso e "continuar assistindo" |
| 4 e 5 (até 17/11) | Pagamento: compra vitalícia e assinatura convivendo, cupons, bolsas UERJ/OAB como cupom ou plano, e-mails transacionais com a marca do IAE |
| 6 (até 24/11) | Fluxo de live: aula no Zoom/Meet, gravação publicada no app; certificado com código de verificação |
| 7 (até 01/12) | Migração do curso de 5 h já gravado, clube de membros básico (área de benefícios e parcerias, mural), testes com alunos atuais, ajustes |

### 3.5 Plano B (se o prazo apertar)

Se em meados de novembro o app não estiver estável, há duas saídas rápidas e reversíveis: (a) Thinkific Start (US$ 82/mês anual, R$ 412,46) com domínio próprio, visual sóbrio e assinatura, aceitando o limite de 200 GB/mês de banda; ou (b) Memberkit Essencial (R$ 197/mês) com vídeos no provedor que já teríamos contratado. Nos dois casos o contrato de vídeo e o gateway continuam nossos, o que facilita voltar ao app próprio. Recomendação: não começar pelo plano B; usá-lo só como rede de segurança.

### 3.6 Opções descartadas e por quê

- **Hotmart, Kiwify, Eduzz como plataforma principal:** tom de infoproduto, taxa de 5% a 10% sobre um ticket de R$ 2.000, relação com o aluno fica com a plataforma, sem trilha de pós.
- **Kajabi:** caro (R$ 900 a 2.510/mês), tudo-em-um com alto lock-in, pensado para marketing de criador.
- **Circle e Mighty como base:** são comunidades com cursos acoplados; comunidade não é a prioridade do Gustavo e cria segunda plataforma.
- **Open edX:** resolve trilha e certificado, mas exige operação de infraestrutura maior que o próprio problema de vídeo.
- **Moodle:** bom para pós e histórico, mas UX datada contradiz o pedido de "simples sem tutorial". Pode servir de referência de modelo de dados para trilha e histórico.
- **Frappe Learning:** leve e aberto, mas em framework Python diferente do nosso; reaproveitar ideias (turmas, aulas ao vivo por turma), não o código.
- **Construir o vídeo do zero (FFmpeg + storage + CDN próprios):** é o que os sócios não dominam; só faz sentido avaliar depois de 12 a 24 meses de dados reais de uso, se a conta do provedor ficar relevante.

---

## Confiança

**Fato verificado (fonte primária, 13/10/2026):**
- Preços e recursos de Members Club, Memberkit (planos e FAQ: não processa pagamento, não hospeda vídeo, domínio próprio grátis, créditos de IA à parte), Hotmart (9,9% + R$ 2,49), Kiwify (8,99% + R$ 2,49), Eduzz (tabela completa de tarifas e armazenamento), WAID/Curseduca (planos e banda), Teachable, Thinkific (inclusive banda de vídeo por plano), Kajabi, Circle, Mighty Networks, Frappe Cloud (a partir de US$ 5), Mux, Cloudflare Stream e Bunny Stream.
- Future Law: formatos, preços cheio e promocional, acesso de 7 meses, link para escola na Thinkific, checkout terceirizado.
- FGVlaw: formato curta duração (8 encontros, 32 h-a), preço do curso de Compliance (PDF do programa 2027), preço da pós Gestão Jurídica Executiva (PDF de investimento), carga de 432 h-a; FGV cursos gratuitos de 1 a 9 h-a com avaliações; metodologia do online.
- Insper: preços de LL.M. (página oficial de preços 2026), cursos "Gestão Estratégica de Departamento Jurídico" e "Estratégias Avançadas para Líderes Jurídicos" com carga, datas, modalidade Live Learning, pré-requisitos e preços.
- Documentação do Mux (Context7): upload direto, níveis de resolução e qualidade, reprodução assinada por JWT, webhook de live concluída.

**Estimativa (declarada como tal no texto):**
- Peso por hora de vídeo (0,7 a 1,5 GB em 1080p) e consumo mensal de banda do exemplo de 200 alunos; o Agente A deve substituir pelos números dele.
- Custo de gateway direto (3% a 5%).
- Cronograma de 7 semanas do MVP compor e prazo de 8 a 12 semanas para construir tudo.
- Comportamento de vídeo no Moodle e no Open edX (conhecimento técnico prévio, não verificado em página oficial hoje).
- Convivência de assinatura e produto único na Hotmart (prática comum, não confirmada na página lida).

**Ficou sem resposta:**
- Confirmação de que o "Members Club" citado pelo Vinicius é o mymembersclub.com.br (a busca na web estava indisponível; recomenda-se pedir o link ao cliente).
- Taxa do checkout Applyfy usado pelo plano "R$ 0" do Members Club.
- Preço da Cademí (página de preços retornou erro Cloudflare 1014).
- Preço da MoodleCloud e de provedores de Open edX.
- Mensalidade da Thinkific no plano mensal (só o valor anual foi exibido) e taxa de transação da Thinkific.
- Preço de cursos curtos pagos da FGV Online em Direito (a listagem filtrada falhou ao carregar).
- Sentimento da comunidade nos últimos 30 dias sobre Members Club e Future Law: a skill last30days rodou, mas não encontrou discussão relevante (resultados dominados por homônimos em inglês; Reddit com limite de requisições, web e Instagram indisponíveis). Não significa ausência de discussão, só que não foi captada.

## Fontes

Todas acessadas em 13/10/2026.

- https://mymembersclub.com.br/
- https://www.futurelaw.com.br/
- https://www.futurelaw.com.br/cursos/legal-operations-nova-edicao (via futurelaw.com.br/cursos/legal-operations-nova-edicao)
- https://www.futurelaw.com.br/cursos/tech-driven-law
- https://www.futurelaw.com.br/cursos/direito-da-concorrencia
- https://www.futurelaw.com.br/cursos/poder-publico-4-0-inovacao-e-fomento-da-tecnologia
- https://www.futurelaw.com.br/cursos/eficiencia-na-pratica-com-ia
- https://educacao-executiva.fgv.br/cursos/online/curta-media-duracao-online
- https://cursosgratuitos.fgv.br/
- https://direitorio.fgv.br/
- https://direitosp.fgv.br/cursos/pos-lato-sensu-fgvlaw/curta-duracao
- https://direitosp.fgv.br/cursos/pos-lato-sensu-fgvlaw/pos-graduacao-lato-sensu
- https://direitosp.fgv.br/cursos/curta-duracao/fgvlaw-compliance-empresarial-gestao-riscos-corporativos
- https://direitosp.fgv.br/sites/default/files/cursos/arq-prog/2026-09/programa-2027-compliance-empresarial-e-gestao-de-riscos-corporativos-fgv-law_0.pdf
- https://direitosp.fgv.br/cursos/pos-graduacao-lato-sensu/fgvlaw-gestao-juridica-executiva
- https://direitosp.fgv.br/sites/default/files/link-arquivo/2026-09/Investimento%20-%20Pos-12.pdf
- https://www.insper.edu.br/pt/cursos/pos-graduacao/direito
- https://www.insper.edu.br/pt/cursos/pos-graduacao/precos-cursos-pos-graduacao-insper
- https://ee.insper.edu.br/cursos/direito/
- https://ee.insper.edu.br/cursos/direito/gestao-estrategica-de-departamento-juridico/
- https://ee.insper.edu.br/cursos/direito/estrategias-avancadas-para-lideres-juridicos/
- https://hotmart.com/pt-br/taxa-hotmart
- https://kiwify.com.br/
- https://www.eduzz.com/taxas
- https://www.eduzz.com/produtos/nutror
- https://memberkit.com.br/
- https://cademi.com.br/
- https://ajuda.cademi.com.br/llms.txt
- https://curseduca.com/ (redireciona para https://waid.io/)
- https://waid.io/
- https://teachable.com/pricing
- https://www.thinkific.com/pricing/
- https://kajabi.com/pricing
- https://circle.so/pricing
- https://www.mightynetworks.com/pricing
- https://frappe.io/learning
- https://frappe.io/cloud/pricing
- https://openedx.org/get-started/
- https://www.mux.com/pricing
- https://www.mux.com/docs/guides/secure-video-playback (via Context7, /websites/mux)
- https://www.mux.com/docs/webhook-reference (via Context7, /websites/mux)
- https://developers.cloudflare.com/stream/pricing/
- https://bunny.net/pricing/stream/
- Cotação: AwesomeAPI, USD-BRL 5,03 em 13/10/2026 (informada pelo orquestrador)
- Pesquisa social: skill last30days v3.21.1, arquivo bruto ~/Documents/Last30Days/future-law-e-members-club-area-de-membros-raw-v3.md
