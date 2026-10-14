# Agente C: precificação e modelo de serviço

Data da pesquisa: 13/10/2026. Cotação usada em todas as conversões: **USD 1 = R$ 5,03** (AwesomeAPI, 13/10/2026). Valores em EUR e GBP foram mantidos na moeda original (sem cotação oficial anotada para essas moedas nesta rodada).

Limitação desta rodada: o orçamento de buscas na web da sessão (compartilhado por todos os agentes) esgotou no início deste agente. Os números abaixo vêm das páginas que consegui abrir diretamente (WebFetch) e de uma rodada da skill last30days. O que não teve fonte está marcado como **estimativa**.

---

## 1. Como o mercado cobra hoje (2025 e 2026)

### 1.1 Modelos em uso

| Modelo | Como funciona | Faixa encontrada | Fonte |
|---|---|---|---|
| Por hora (freelancer BR) | Valor-hora por senioridade | Frontend sênior R$ 180 a 380/h (mediana R$ 250); backend sênior R$ 200 a 420/h (mediana R$ 280); pleno R$ 100 a 240/h | Lancei Benchmark 2026 |
| Por hora (freelancer BR, outra tabela) | Dev web/mobile | Sênior R$ 180 a 400/h; pleno R$ 100 a 180/h | Freelancer Online 2026 |
| Por hora (agências, mundo) | Média de agências de web dev | Maioria cobra US$ 25 a 49/h (R$ 126 a 246); EUA/Canadá US$ 100 a 149/h | Clutch, atualizado 21/09/2026 |
| Por hora (consultoria de IA) | Freelancer a boutique | US$ 75 a 500/h (R$ 377 a 2.515); o teto de US$ 500/h é a faixa boutique da Alice Labs; offshore US$ 25 a 75/h | Groovy Web, atualizado 07/10/2026 |
| Projeto fechado (agência web, mundo) | Escopo definido | Média US$ 66.499 (R$ 334.490), mas "tipicamente abaixo de US$ 10.000"; média mensal US$ 7.139 (R$ 35.909), duração típica 9 meses | Clutch |
| Projeto fechado (MVP de IA) | Primeira entrega de um fluxo | US$ 5.000 a 25.000 (R$ 25.150 a 125.750) | Groovy Web citando Layer3 Labs |
| Projeto fechado (BR, freelancer) | App mobile MVP | Sênior R$ 30.000 a 80.000; pleno R$ 15.000 a 30.000 | Freelancer Online 2026 |
| Retainer mensal (BR, freelancer) | Dedicação recorrente | Sênior R$ 8.000 a 20.000/mês; pleno R$ 4.000 a 8.000/mês | Freelancer Online 2026 |
| Setup + retainer (agência de IA, pequena empresa) | Setup inicial e mensalidade | Setup US$ 1.500 a 5.000 (R$ 7.545 a 25.150); mensal US$ 500 a 1.500 (R$ 2.515 a 7.545) | Taskip, atualizado 18/08/2026 |
| Setup + retainer (mid-market) | Idem | Setup US$ 5.000 a 20.000; mensal US$ 1.500 a 4.000 | Taskip |
| Assinatura + uso | Base mensal mais excedente por entrega | Base US$ 1.500 a 4.000/mês | Taskip |
| Por resultado | Base mais valor por resultado | Ex.: US$ 1.200/mês + US$ 45 por lead qualificado | Taskip |
| Serviço produtizado (dev subscription) | Mensalidade fixa, fila de pedidos, 1 pedido ativo por vez | Ver tabela 1.2 | Figue, 22/09/2026 |
| Manutenção/evolução de fluxos de IA | Retainer | US$ 2.500 a 15.000/mês | Groovy Web citando Layer3 Labs |

### 1.2 Assinaturas de desenvolvimento ("Designjoy para dev")

| Serviço | Preço de entrada | Pedidos ativos | Observação | Em BRL |
|---|---|---|---|---|
| Designjoy (design + Webflow, referência do modelo) | US$ 4.995/mês | 1 por vez, média de 48 h por pedido, pausa com dias guardados | Ciclos de 31 dias | R$ 25.125 |
| Unlimited Dev (Web) | £ 995/mês | 1; 2 no plano de £ 3.195 | Web apps, dashboards, APIs | não convertido |
| AsyncForge (Light) | € 2.000/mês | 1 | React, Next.js, Python, bancos, cloud (stack igual ao nosso) | não convertido |
| Flowlyn (Starter) | € 2.800/mês | 1; 2 por € 4.500 | Next.js, Tailwind; Supabase e IA nos planos maiores | não convertido |
| Awesomic (All-in-One) | US$ 2.995/mês | 1 | Design, front e back, QA | R$ 15.065 |
| XHTMLTEAM (Lite) | US$ 1.499/mês | 1; 2 a partir de US$ 2.499 | WordPress, HTML | R$ 7.540 |
| PoketDev | US$ 5.995/mês | 1 | Python, IA, back-end | R$ 30.155 |
| AppzJoy | US$ 3.997/mês (estimativa, não verificada: não aparece no artigo da Figue) | 1 projeto ativo | Startups | R$ 20.105 |
| Figue | € 1.990/mês por slot | 1 por slot; pedido esperando o cliente libera o slot | Sem SLA de prazo, só indicativo | não convertido |

Padrões que se repetem (Figue, ManyRequests, Designjoy):

1. **Ilimitado é a fila, não o paralelo.** Todos limitam a 1 pedido ativo; mais paralelismo custa quase outra assinatura.
2. **Pedido grande é fatiado** em partes entregues a cada 24 a 48 h (Designjoy).
3. **Nenhum serviço de dev publica prazo garantido**; só média indicativa (Figue).
4. **Pausa** com dias guardados (Designjoy) e cancelamento a qualquer momento.
5. **Escopo protegido por FAQ**: o que está dentro, o que está fora, o que vira add-on (ManyRequests).
6. Faixas de mercado para produtizado: projetos avulsos US$ 500 a 5.000, retainers US$ 1.500 a 10.000/mês, assinaturas ilimitadas US$ 3.000 a 15.000/mês (ManyRequests).
7. Pagamento adiantado é comum no produtizado; agências tradicionais pegam 20 a 25% de entrada (ManyRequests).
8. Retainers de longo prazo costumam ter 10 a 20% de desconto sobre a hora avulsa (Groovy Web citando Alice Labs).

### 1.3 O que a comunidade diz nos últimos 30 dias (last30days)

A rodada da skill last30days (13/10/2026; 29 threads no Reddit, 31 posts no X, 8 no HN, 1 vídeo no YouTube) trouxe **pouco sinal útil** sobre preço: a maioria das menções era ruído (posts removidos em r/agency, cripto). Os sinais aproveitáveis:

- Um vídeo do canal Callum Healey sobre agências produtizadas defende **fatiar projetos em tiers com base em histórico** (tier 1, 2, 3 com preço e prazo fixos) porque estimar cada pedido do zero é "tempo não faturável que corrói margem", e diz que IA força o prestador a produtizar, já que cobrar por hora pune quem entrega mais rápido.
- Em r/ExperiencedDevs, um dev de fintech relata que o CEO não técnico já mantém apps pequenos em produção com agentes de IA. Isso reforça o risco de o cliente achar que "funcionalidade simples" vale pouco. **Nosso valor precisa estar ancorado na infraestrutura, na continuidade e na responsabilidade, não na linha de código.**
- Em r/agency há um tópico chamado "Brutal Anxiety after Small Pricing Pushbacks": subprecificar para fechar e depois não conseguir reajustar é dor recorrente.

Conclusão do item 1: o mercado migrou de hora para **pacote/assinatura com fila e escopo fatiado**, quase sempre com **setup separado da recorrência**. Por funcionalidade aparece como "tiers de projeto" ou "add-ons", não como aluguel mensal por funcionalidade.

---

## 2. Comparação das duas ideias dos sócios

### 2.1 Ideia do Rib: por funcionalidade (com possível mensalidade por funcionalidade)

| Aspecto | Avaliação |
|---|---|
| Alinhamento com valor | Bom: o cliente paga pelo que vê. Combina com IA (não pune velocidade). |
| Risco de scope creep | **Alto**: "funcionalidade" não tem tamanho padrão. "Área de membros" pode ser 1 dia ou 1 mês. Cada pedido exige estimativa e negociação. |
| Subprecificação | Alta se o preço for fixado antes do refinamento. Funcionalidades difíceis (vídeo, pós com trilha) são justamente as que mais estouram. |
| Mensalidade por funcionalidade | Risco de **desalinhamento de valor**: o cliente sente que paga aluguel eterno por algo já construído. Funciona em SaaS próprio, não em software sob medida cujo código é do cliente. |
| Previsibilidade de caixa para nós | Baixa: receita depende de o cliente pedir. |
| Dependência de WhatsApp | Média: pedido por funcionalidade tende a chegar solto no chat. |

### 2.2 Ideia do Pedro: ciclo semanal de R$ 1.000 a 2.000

| Aspecto | Avaliação |
|---|---|
| Alinhamento com valor | Médio: o cliente compra tempo/cadência, não resultado. Precisa mostrar entregas toda sexta para não virar "quanto custa a hora". |
| Scope creep | **Baixo**, se a regra "fora do ciclo vai para a próxima semana" for cumprida. O ciclo é a caixa que limita o escopo. |
| Subprecificação | **Alta no piso**: ver 3.4. R$ 1.000/semana é preço de júnior. |
| Previsibilidade | Alta para os dois lados, se houver compromisso mínimo de ciclos por mês. |
| Dependência de WhatsApp | Baixa por desenho, mas só se o canal de pedido for outro (quadro/formulário). |
| Risco para nós (CLT) | Semana com imprevisto do emprego quebra a cadência. Precisa de regra de estouro e de substituto. |
| Risco para o cliente | Pagar toda semana mesmo quando não há o que pedir. Precisa de pausa. |

### 2.3 Como outras empresas protegem a cadência

1. **Fila única e visível** (Designjoy usa Trello; ManyRequests e similares usam portal). Pedido só existe se estiver no quadro. WhatsApp é aviso, não pedido.
2. **Corte de entrada**: o pedido que chega depois do corte entra na próxima triagem. É exatamente a regra do Pedro; o mercado faz isso de forma explícita no FAQ do contrato.
3. **Um pedido ativo por vez** (todas as dev subscriptions da tabela 1.2).
4. **Fatiamento**: pedido grande vira fatias entregáveis por ciclo (Designjoy).
5. **Urgência separada**: incidente (sistema fora do ar) não entra na fila de evolução; é atendido pelo SLA de sustentação.
6. **Pausa** com crédito guardado (Designjoy), para o cliente não sentir que paga sem usar.
7. **Add-ons com preço de tabela** para o que é adjacente (ManyRequests).

### 2.4 Recomendação: modelo híbrido "Setup + Sustentação + Ciclos + Infra + Pacotes"

As duas ideias se encaixam: **o ciclo semanal do Pedro é a unidade de trabalho; a funcionalidade do Rib é medida em ciclos.**

| Componente | O que é | Como cobra |
|---|---|---|
| **1. Setup do MVP** | Construção da plataforma de aulas até o go-live (fim de novembro/começo de dezembro de 2026) | Projeto fechado com escopo de entregáveis (3 cenários na seção 3). Parcelado. |
| **2. Sustentação mensal** (obrigatória após go-live) | Monitoramento, backups, atualizações de segurança, correção de bugs, incidentes P1/P2 na janela de atendimento, relatório mensal de custos de infra, 1 reunião mensal de 30 min | Mensalidade fixa por faixa de alunos ativos |
| **3. Ciclos de evolução** | A esteira semanal: segunda refinamento, terça e quarta construção, quinta link de teste, sexta produção | Por ciclo, com planos de 1, 2 ou 4 ciclos/mês e pausa |
| **4. Catálogo de funcionalidades em ciclos** | Cada funcionalidade da lista de 30+ recebe um tamanho: P = 1 ciclo, M = 2, G = 3 a 4, GG = projeto à parte | O cliente "compra" funcionalidades consumindo ciclos. É a ideia do Rib, sem aluguel por funcionalidade. |
| **5. Infraestrutura** | Vídeo, banco, hospedagem, e-mail, IA | Repasse a custo, na conta do cliente (seção 4) |
| **6. Pacotes opcionais** | Agente de IA, esteira de edição de aula, funil de aula gratuita, agente de WhatsApp | Preço fechado em ciclos + custo de uso repassado |

Por que híbrido: o setup remunera o risco do MVP (o maior esforço concentrado); a sustentação remunera a responsabilidade contínua sobre "o centro do negócio do cliente" (mesmo em mês sem evolução); os ciclos dão cadência e protegem escopo; o catálogo em ciclos dá ao cliente a sensação de comprar resultado.

---

## 3. Preço do setup e da recorrência

### 3.1 Premissas de capacidade (estimativa)

- Três sócios CLT. Disponibilidade sustentável por sócio: cerca de 12 h/semana (3 noites de 2,5 h + 4 a 5 h no fim de semana). Equipe: cerca de 36 h/semana.
- Janela até o MVP: 20/10 a 30/11/2026, cerca de 6 semanas, ou seja, **cerca de 215 h de equipe (27 pessoa-dias de 8 h)** no máximo, sem folga.
- Uso pesado de IA (Claude Code, pipeline de issues em ondas) reduz o tempo de funcionalidade comum em algo como 2 a 4 vezes frente a um time tradicional (estimativa de experiência própria com o app hospitalar, não medida nesta pesquisa). Não reduz na mesma proporção o tempo de infraestrutura de vídeo, testes com usuário e conversas com o cliente.

### 3.2 Três cenários de escopo do setup

| Cenário | Escopo | Esforço (pessoa-dias de 8 h) | Cabe até dez/2026? | Preço sugerido | R$/h equivalente |
|---|---|---|---|---|---|
| **Enxuto** | Login; catálogo; player VOD por serviço gerenciado (ex.: Bunny Stream ou Cloudflare Stream) com retomar de onde parou; progresso; matrícula liberada manualmente pelo admin (sem checkout); admin de cursos/aulas/textos; certificado PDF simples; identidade visual do brand kit; LGPD básica (termos, consentimento, exclusão) | 12 a 15 | Sim, com folga | **R$ 14.000** | cerca de R$ 130/h |
| **Recomendado** | Enxuto + checkout com assinatura mensal (clube) e compra vitalícia convivendo; cupons e bolsas (UERJ, OAB); página de benefícios/parcerias do clube; lives por ferramenta externa (Zoom/Meet) com link na agenda e gravação publicada pelo admin; legendas/transcrição automática (Whisper) para busca; onboarding sem tutorial (estados vazios que ensinam); monitoramento, backups e runbook | 25 a 30 | Só no piso: 25 pd cabe com 2 pd de folga; 30 pd passa da capacidade máxima de 27 pd em 3 pd (24 h, quase 1 semana de equipe) | **R$ 28.000** | cerca de R$ 120 a 140/h |
| **Premium** | Recomendado + agente de IA com base de conhecimento; comunidade; live integrada própria (LiveKit/Daily) com gravação automática; trilhas com pré-requisitos e histórico (base da pós); marca d'água dinâmica/DRM; compra B2B com assentos | 50 a 65 | **Não**. Vira fase 2 e 3 | **R$ 55.000 a 70.000** (ou o excedente em ciclos) | cerca de R$ 130/h |

Referências de mercado para o setup recomendado: pelo valor-hora sênior mediano BR (R$ 250 a 280/h, Lancei) as mesmas 200 a 240 h custariam **R$ 50.000 a 67.000**; app MVP sênior BR fica em R$ 30.000 a 80.000 (Freelancer Online); setup de agência de IA para pequena empresa fica em US$ 1.500 a 5.000 (R$ 7.545 a 25.150) e para mid-market US$ 5.000 a 20.000 (Taskip). **R$ 28.000 é preço de pleno baixo**: dá R$ 117 a 140/h (R$ 933 a 1.120 por dia de 8 h), abaixo até da mediana de pleno (R$ 150 a 160/h, ou R$ 1.200 a 1.280 por dia, Lancei) e perto do piso de pleno, bem longe da mediana sênior (R$ 250 a 280/h, ou R$ 2.000 a 2.240 por dia). Esse desconto é justificado por: IA reduz horas, cliente sem fins lucrativos, e caso fundador (portfólio, depoimento, logo do IAE). Isso deve estar escrito na proposta como **condição de parceiro fundador**, para não virar âncora de preço para o próximo cliente.

Pagamento sugerido do setup: 30% na assinatura, 30% na entrega do protótipo assistindo vídeo, 40% no go-live (ou 4 parcelas mensais iguais, se o caixa do IAE exigir).

### 3.3 Recorrência sugerida

| Item | Faixa | Preço | Inclui |
|---|---|---|---|
| Sustentação | Até 500 alunos ativos | **R$ 1.500/mês** | Monitoramento, backups, segurança, bugs, P1/P2 na janela, relatório de infra, 1 reunião/mês |
| Sustentação | 501 a 2.000 alunos ativos | R$ 2.500/mês | Idem, com mais suporte e revisão de custo/performance trimestral |
| Sustentação | 2.001 a 10.000 alunos ativos | R$ 4.000/mês | Idem + plantão em live de grande audiência (estimativa) |
| Ciclo avulso | 1 ciclo (1 sócio, cerca de 12 a 15 h, 2 reuniões curtas) | **R$ 2.000** | Escopo fechado na segunda, produção na sexta |
| Plano Ritmo | 2 ciclos/mês | R$ 3.800/mês (5% de desconto) | Pausa de até 1 mês por semestre |
| Plano Intenso | 4 ciclos/mês | R$ 7.200/mês (10% de desconto) | Prioridade na agenda |

Equivalência mensal: R$ 2.000/semana contínuo dá R$ 8.667/mês (US$ 1.723); R$ 1.500/semana dá R$ 6.500/mês (US$ 1.292).

### 3.4 R$ 1.000 a 2.000 por semana está abaixo do mercado? Resposta franca

- **R$ 1.000/semana está abaixo do mercado.** Com 12 a 15 h de trabalho por ciclo, dá R$ 67 a 83/h, abaixo do pleno BR (mediana R$ 150 a 160/h, Lancei) e na faixa de júnior.
- **R$ 2.000/semana é justo para o Brasil, na faixa de pleno** (R$ 133 a 167/h), ainda abaixo do sênior (R$ 250 a 280/h). Mensalizado (R$ 8.667) fica no começo da faixa de retainer sênior BR (R$ 8.000 a 20.000, Freelancer Online) e no piso das dev subscriptions internacionais (£ 995 a US$ 5.995).
- **O problema maior não é o preço do ciclo, é cobrar toda semana sem setup.** Com 52 ciclos de R$ 1.500 o cliente paga R$ 78.000/ano. Isso é quase todo o faturamento conservador previsto do IAE (3.5) e ainda assim nos remunera abaixo do sênior. O modelo semanal puro é caro para o cliente e barato para nós ao mesmo tempo, porque não separa o investimento (setup) da continuidade (sustentação) nem permite variar o ritmo.
- Por isso a recomendação: **ciclo a R$ 2.000** (não R$ 1.000), **setup separado** e **ritmo de ciclos escolhido pelo cliente conforme a receita**, com pausa.

### 3.5 Peso do nosso preço no faturamento previsto do IAE (12 meses)

Premissas do faturamento do IAE (estimativa; precisa ser confirmada com o Vinicius): hoje são 5 alunos pagos x R$ 2.000 = R$ 10.000.

| Cenário IAE (12 meses) | Composição (estimativa) | Faturamento |
|---|---|---|
| Conservador | 4 turmas presenciais/ano x 10 alunos x R$ 2.000 | R$ 80.000 |
| Base | Conservador + 40 vendas de curso online x R$ 1.500 + clube com 30 membros médios x R$ 99 x 12 | R$ 175.640 |
| Otimista | Conservador + 120 vendas online x R$ 1.500 + clube com 100 membros médios x R$ 99 x 12 | R$ 378.800 |

Custo total para o IAE em 12 meses, por pacote (go-live em dezembro, 11 meses de recorrência; infra estimada em R$ 300/mês na escala inicial, ver seção 7):

| Pacote | Setup | Sustentação 11 meses | Ciclos 11 meses | Infra 12 meses | **Total 12 meses** | % do Conservador | % do Base | % do Otimista |
|---|---|---|---|---|---|---|---|---|
| Mínimo (enxuto + 1 ciclo/mês) | 14.000 | 16.500 | 22.000 | 3.600 | **R$ 56.100** | 70% | 32% | 15% |
| Recomendado (recomendado + Ritmo 2 ciclos/mês) | 28.000 | 16.500 | 41.800 | 3.600 | **R$ 89.900** | 112% | 51% | 24% |
| Recomendado com ritmo leve (1 ciclo/mês) | 28.000 | 16.500 | 22.000 | 3.600 | **R$ 70.100** | 88% | 40% | 19% |
| Ideia original do Pedro (R$ 1.500 x 52, sem setup) | 0 | 0 | 78.000 | 3.600 | **R$ 81.600** | 102% | 46% | 22% |

Leitura franca: **no cenário conservador, qualquer pacote consome a maior parte da receita do IAE.** A plataforma só se paga se o online destravar São Paulo e o clube (cenário base ou melhor). A proposta deve:

1. Mostrar esta tabela ao cliente (transparência), tratando o setup como **investimento** da instituição.
2. Deixar o ritmo de ciclos **atrelado à receita**: começar com 1 ciclo/mês e subir quando entrarem assinantes.
3. Oferecer, como opção, **desconto de parceiro fundador** (já embutido nos R$ 28.000) em troca de depoimento, case e logo.
4. Opcional a discutir entre os sócios: **componente por resultado** (ex.: sustentação menor, R$ 1.000/mês, + 5% da receita digital acima de R$ 10.000/mês). O mercado usa (Taskip cita base + bônus de 5% sobre meta), mas exige acesso aos números do cliente e aumenta o risco para nós. Não recomendo no primeiro contrato.

---

## 4. Infraestrutura na proposta

### 4.1 Repassar a custo, cobrar margem ou cobrar fixo por faixa?

| Opção | Prós | Contras | Quando usar |
|---|---|---|---|
| **Repasse a custo, conta no nome do cliente** | Transparência total, sem discussão de margem, cliente vê a fatura do provedor | Cliente precisa de cartão internacional; nós não ganhamos nada com infra | **Recomendado para o IAE** |
| Custo + margem (10 a 20%) na nossa conta | Remunera gestão e risco cambial | Cliente pode achar escondido; somos nós que pagamos antes; nossa conta vira gargalo de LGPD e continuidade | Só se o cliente não tiver cartão internacional |
| Fixo por faixa de uso | Previsível para o cliente | Se o uso dispara (egress), nós absorvemos o prejuízo | Não recomendado em vídeo, onde o egress é variável |

O que o mercado faz: provedores de serviço gerenciado em nuvem costumam cobrar uma taxa de gestão de 10 a 20% sobre o gasto de nuvem, ou uma taxa fixa (**estimativa**, sem fonte aberta nesta rodada). Serviços produtizados de dev, como o Designjoy, transferem o ativo para a conta do cliente ao final ("o site é transferido para a sua conta").

Nossa remuneração pela gestão da infra fica **dentro da sustentação mensal** (valor fixo), e não como porcentagem do gasto. Assim não temos incentivo para aumentar o custo do cliente, o que é um bom argumento de venda institucional.

Se precisarmos pagar na nossa conta (exceção): custo em BRL = custo em USD x cotação do dia x (1 + IOF de cartão internacional + spread do banco), mais 10% de taxa de gestão. O IOF sobre compras internacionais no cartão foi alterado em 2025 (3,5% é o valor que tenho de memória, **verificar**), e o spread bancário costuma ficar entre 4 e 6% (**estimativa**). Ou seja, só o câmbio já come de 7 a 10% do valor em dólar.

### 4.2 Conta da cloud: no nome do cliente

Recomendação: **todas as contas (provedor de vídeo, banco, VPS, domínio, gateway de pagamento, e-mail transacional, chave de IA) no CNPJ e no cartão do IAE**, com acesso de nossa equipe via usuários nominais (IAM/membros), nunca senha compartilhada.

Motivos:

1. **LGPD**: o IAE é o controlador dos dados de alunos. Com a conta no CNPJ dele, Bunny, Cloudflare, Supabase etc. são **operadores contratados diretamente pelo IAE**, não suboperadores nossos (suboperador é quem o operador contrata); nós somos outro operador, com acesso delegado. A lista de suboperadores do nosso DPA fica só com o que **nós** contratarmos (ex.: chave de IA na nossa conta, ferramentas de monitoramento). Fica mais limpo para a transferência internacional (seção 6).
2. **Continuidade**: se o contrato acabar, se um sócio sair ou se nossa empresa tiver problema, a plataforma do cliente continua no ar. Transição vira troca de acessos, não migração.
3. **Cartão e fluxo de caixa**: não financiamos o custo de infra do cliente nem corremos risco cambial.
4. **Confiança institucional**: o cliente compara-se a FGV e Insper; ter os ativos em nome próprio é argumento de segurança.

### 4.3 Transparência sem prejuízo

- Relatório mensal de infra (parte da sustentação): custo por provedor, horas armazenadas, horas assistidas, custo por aluno ativo e projeção para o próximo degrau.
- Alertas de orçamento configurados no provedor (ex.: 80% e 100% do teto acordado).
- Cláusula: mudanças de arquitetura que reduzam custo são propostas por nós; mudanças que aumentem custo (ex.: subir para 1440p, DRM) só com aprovação do cliente, mostrando o degrau na calculadora.
- Nosso preço (cabeças) e o custo de infra aparecem em **linhas separadas** em toda proposta e fatura.

---

## 5. Divisão interna por semanas assumidas

### 5.1 Planilha (colunas)

| Coluna | Exemplo | Observação |
|---|---|---|
| Semana ISO | 2026-W47 | Uma linha por ciclo vendido |
| Datas | 16/11 a 20/11 | |
| Cliente | IAE | Permite outros clientes na mesma planilha |
| Tipo | Ciclo / Setup (marco) / Sustentação / Exceção | |
| Dono | Pedro | Responsável pela entrega e pelas reuniões |
| Apoio | Lucas | Opcional |
| Escopo fechado | link do card/issue | Fechado na segunda |
| Status | Planejado / Em andamento / Entregue / Estourou / Pausado | |
| Horas estimadas | 12 | |
| Horas reais | 14 | Só para aprendizado, não para pagamento |
| Valor bruto | 2.000 | |
| Impostos | 6% a 15,5% | Simples Nacional, depende do anexo e do Fator R (**estimativa**, confirmar com contador) |
| Caixa da empresa | 15% | Reserva para ferramentas, contador, imprevistos |
| Horas de apoio | 3 | |
| Repasse apoio | 3 h x R$ 100 | Valor-hora interno fixo |
| Repasse dono | saldo | Valor bruto menos impostos, caixa e apoio |
| Observação | "estouro: item X foi para W48" | |

Sustentação mensal: dividida em partes iguais entre os três, ou rodízio mensal de plantão (quem está de plantão recebe 50%, os outros 25% cada). Setup: dividido por marcos assumidos (cada marco tem dono e peso em ciclos).

### 5.2 Regras de exceção

1. Quem assume a semana responde por ela. Se precisar de ajuda acima de 2 h, registra horas de apoio (pagas a valor-hora interno fixo, ex.: R$ 100/h, saindo do valor do dono).
2. Trabalho que foge da esteira (migração de vídeo, incidente grande, live crítica) vira linha "Exceção", com valor combinado antes, ou entra como horas de apoio.
3. Troca de semana entre sócios é livre, desde que registrada até a sexta anterior.
4. Incidente P1 fora do ciclo é atendido por quem está de plantão da sustentação, não pelo dono do ciclo.

### 5.3 Semana que estoura

- **Corte de escopo, não de prazo**: o que não ficou pronto até quinta sai da entrega (atrás de feature flag), e a sexta sobe o que está pronto.
- Se o estouro foi **erro nosso de estimativa**, o restante vira o primeiro item do próximo ciclo sem custo extra para o cliente, no máximo 1 vez por mês por cliente; o dono original termina, mas não recebe de novo.
- Se o estouro foi **mudança do cliente** no meio da semana, o restante consome um novo ciclo.
- Dois estouros seguidos do mesmo tipo de funcionalidade fazem o tamanho dela no catálogo subir (P vira M).

---

## 6. Contrato: itens mínimos

Referências legais: Lei 9.609/1998 (Lei do Software), Lei 9.610/1998 (Direitos Autorais), Lei 13.709/2018 (LGPD), Código Civil (prestação de serviços, arts. 593 a 609, incluindo o art. 598, que limita o contrato de prestação de serviço a 4 anos (estimativa, não verificada); direito de imagem, art. 20), Resolução CD/ANPD nº 19/2024 (transferência internacional e cláusulas-padrão). Textos legais citados de memória porque o site do Planalto recusou conexão nesta rodada; **revisar com advogado** (o próprio cliente é escola de prática jurídica, o que ajuda e também exige rigor).

| Item | O que colocar | Cuidado específico |
|---|---|---|
| Partes e poderes | Associação sem fins lucrativos, CNPJ, quem assina conforme o estatuto (presidente/diretoria) | Pedir estatuto e ata de eleição da diretoria para conferir poderes de assinatura |
| Objeto e anexos | Setup com lista de entregáveis; sustentação; ciclos; catálogo em ciclos | Escopo do setup como anexo assinado; mudança só por aditivo ou consumo de ciclos |
| Preço, pagamento, reajuste | Setup parcelado por marco; mensalidades; reajuste anual por IPCA; atraso com multa de 2% + juros de 1% ao mês | Emitir NFS-e; checar com contador retenções exigidas por associação (em geral não muda nossa tributação; optante do Simples fica dispensado das retenções federais, mas o ISS pode ser retido pelo tomador conforme a lei do Rio de Janeiro) (estimativa, não verificada) |
| Esteira e canal de pedido | Regras do ciclo (corte de entrada, 1 pedido ativo, fora do ciclo vai para a próxima semana); canal oficial = quadro/formulário; WhatsApp só para avisos | Escrever literalmente; é o que protege a cadência |
| SLA realista (somos CLT) | Janela de atendimento (ex.: dias úteis 19h às 23h e sábado 9h às 13h); P1 (plataforma fora/aluno sem acesso em massa/pagamento quebrado) com resposta em até 2 h dentro da janela; P2 em 1 dia útil; P3 vira ciclo | Disponibilidade alvo de 99,5% mensal como meta, dependente dos provedores, sem multa ou com crédito pequeno (ex.: 10% da sustentação do mês) |
| Lives | Plantão em lives combinadas com 48 h de antecedência | Live fora da janela é serviço extra |
| Propriedade do código | Pela Lei 9.609, art. 4º, salvo estipulação em contrário, o programa desenvolvido sob contrato de serviços pertence ao contratante. Recomendado: código específico do IAE é do IAE após quitação do setup; componentes pré-existentes e genéricos nossos (bibliotecas, templates, skills, pipelines) ficam conosco, com licença perpétua, gratuita e não exclusiva ao IAE | Sem essa cláusula, tudo que fizermos pode ser do IAE por padrão, inclusive o que pretendemos reaproveitar |
| Propriedade dos vídeos e materiais | Conteúdo (aulas, slides, marca) é do IAE e dos professores; licença limitada a nós só para hospedar, transcodificar, transcrever e exibir | O IAE garante autorização de imagem e direitos dos professores convidados e alunos que aparecem em lives gravadas (CC art. 20; Lei 9.610) |
| IA sobre o conteúdo | Uso de transcrição, agente de IA e edição automática só sobre o conteúdo do IAE e para o IAE; proibição de treinar modelos próprios com o conteúdo | Fornecedor de IA contratado por nós entra na lista de suboperadores; se a chave estiver no CNPJ do IAE, é operador do IAE |
| LGPD: papéis | IAE = controlador; nós = operador (art. 5º, VI e VII; art. 39: operador segue instruções do controlador); provedores contratados no CNPJ do IAE (Bunny, Cloudflare, Supabase) = operadores do IAE; suboperadores são só os que nós contratarmos, com lista anexa e aviso prévio de troca | Contrato de tratamento de dados (DPA) como anexo |
| LGPD: segurança e incidentes | Medidas de segurança (art. 46); comunicação de incidente ao controlador em até 24 a 48 h para que ele avalie a comunicação à ANPD e aos titulares (art. 48) | Responsabilidade solidária do operador quando descumpre a lei ou as instruções (art. 42) |
| LGPD: transferência internacional | Provedores nos EUA/UE: usar cláusulas-padrão da ANPD (Res. 19/2024) ou confirmar as dos provedores | Conta no nome do IAE simplifica |
| Confidencialidade | Mútua, sobrevive 2 a 5 anos após o fim | Inclui dados de alunos, financeiro e estratégia |
| Não exclusividade | Podemos atender outras instituições de ensino; o IAE pode contratar outros fornecedores | Opcional: não usar o conteúdo/marca do IAE para concorrente direto |
| Uso como case | Autorização para citar o IAE como cliente e usar depoimento (contrapartida do desconto de fundador) | |
| Limitação de responsabilidade | Teto = valores pagos nos últimos 6 a 12 meses; exclusão de lucros cessantes | Mais aceitável para associação que valores em aberto |
| Prazo e rescisão | Sustentação com prazo mínimo de 6 meses após go-live; depois, aviso prévio de 30 dias; ciclos podem ser pausados | Rescisão por inadimplência acima de 30 dias com suspensão de ciclos (nunca derrubar a plataforma: o aluno não tem culpa) |
| Transição (fim do contrato) | Entrega do repositório, variáveis de ambiente, runbook, exportação do banco e dos vídeos, revogação de nossos acessos; 30 dias de transição assistida a valor-hora acordado | Como as contas já são do IAE, a infra continua funcionando no dia seguinte |
| Foro e solução de conflitos | Mediação antes de ação; foro do Rio de Janeiro | |

Modelos de referência: não consegui abrir modelos públicos de contrato de desenvolvimento de software nesta rodada (busca esgotada). **Pendência**: usar como base um modelo de contrato de prestação de serviços de software (ex.: modelos publicados por associações do setor ou escritórios) e o DPA padrão de algum provedor, revisados por advogado.

---

## 7. Modelo da calculadora interativa

### 7.1 Entradas

| Variável | Tipo | Padrão | Faixa |
|---|---|---|---|
| `qualidadeMax` | seleção | 1080p | 720p, 1080p, 1440p, 2160p |
| `horasArmazenadas` | número | 100 | 5 a 3.000 |
| `horasNovasMes` | número | 10 | 0 a 200 |
| `alunosAtivos` | número | 200 | 5 a 10.000 |
| `horasAssistidasAlunoMes` | número | 4 | 0,5 a 20 |
| `livesMes` | número | 4 | 0 a 30 |
| `duracaoLiveH` | número | 3 | 1 a 4 |
| `participantesLive` | número | 30 | 2 a 1.000 |
| `regioesStorage` | número | 1 | 1 a 3 (Bunny) |
| `tierBunny` | seleção | Standard América do Sul | Volume (US$ 0,005/GB), Standard América do Sul (US$ 0,045/GB) |
| `planoCiclos` | seleção | Ritmo (2/mês) | 0, 1, 2, 4 |
| `cenarioSetup` | seleção | Recomendado | Enxuto, Recomendado, Premium |
| `mesesDiluicaoSetup` | número | 12 | 6, 12, 24, 36 |
| `cotacaoUSD` | número | 5,03 | |

### 7.2 Constantes (a conferir com o Agente A)

Peso por hora em cada degrau: GB/h = Mbps x 0,45. Os bitrates abaixo são **estimativa** para aula com professor e slides (conteúdo de pouco movimento); o Agente A deve substituir pelos valores finais.

| Degrau | Bitrate (Mbps) | GB por hora |
|---|---|---|
| 360p | 0,6 | 0,27 |
| 720p | 1,5 | 0,68 |
| 1080p | 3,0 | 1,35 |
| 1440p | 6,0 | 2,70 |
| 2160p | 12,0 | 5,40 |

Preços dos provedores verificados em 13/10/2026:

| Provedor | Armazenamento | Entrega | Transcoding | Outros | Fonte |
|---|---|---|---|---|---|
| Cloudflare Stream | US$ 5 por 1.000 min armazenados/mês (pré-pago) | US$ 1 por 1.000 min entregues | Grátis | Ingest de live grátis; assistir live conta como minuto entregue; gravação conta como armazenamento | developers.cloudflare.com/stream/pricing |
| Bunny Stream | a partir de US$ 0,01/GB/mês por região | a partir de US$ 0,005/GB (Volume, só 10 PoPs, sem garantia de PoP no Brasil); cerca de US$ 0,03/GB no Standard pelo exemplo da página de Stream (50 GB = US$ 1,50); na tabela de CDN, Standard para América do Sul é US$ 0,045/GB | Grátis | Mínimo de US$ 1/mês; segurança sem custo extra; confirmar com o Bunny se o Stream cobra pela tabela regional da CDN | bunny.net/pricing/stream e bunny.net/pricing/cdn |
| Mux | US$ 0,003/min/mês (1080p) | US$ 0,001/min após 100.000 min grátis/mês | Basic grátis; Plus US$ 0,03125/min (1080p) | US$ 20 de crédito mensal no pay-as-you-go; entrega de live = minutos de live x espectadores simultâneos médios; plano Launch US$ 20/mês com US$ 100 de crédito (estimativa, não verificada: não aparece na página atual) | mux.com/pricing |
| Cloudflare R2 (+ transcoding próprio) | US$ 0,015/GB/mês (10 GB grátis) | Egress grátis | Custo de CPU da VPS (estimativa) | Classe A US$ 4,50/milhão; Classe B US$ 0,36/milhão | developers.cloudflare.com/r2/pricing |

### 7.3 Pseudocódigo

```javascript
// ===== Constantes =====
const GBH = { "360p": 0.27, "720p": 0.68, "1080p": 1.35, "1440p": 2.70, "2160p": 5.40 }; // a confirmar (Agente A)
const LADDER = {                       // degraus gerados para cada qualidade máxima
  "720p":  ["360p", "720p"],
  "1080p": ["360p", "720p", "1080p"],
  "1440p": ["360p", "720p", "1080p", "1440p"],
  "2160p": ["360p", "720p", "1080p", "1440p", "2160p"],
};
const MIX = {                          // fração do tempo assistido em cada degrau (estimativa)
  "720p":  { "360p": 0.10, "720p": 0.90 },
  "1080p": { "360p": 0.05, "720p": 0.25, "1080p": 0.70 },
  "1440p": { "360p": 0.05, "720p": 0.20, "1080p": 0.45, "1440p": 0.30 },
  "2160p": { "360p": 0.05, "720p": 0.15, "1080p": 0.40, "1440p": 0.20, "2160p": 0.20 },
};
const SETUP = { enxuto: 14000, recomendado: 28000, premium: 62000 };          // R$
const SUSTENTACAO = [ { ate: 500, preco: 1500 }, { ate: 2000, preco: 2500 }, { ate: 10000, preco: 4000 } ];
const CICLOS = { 0: 0, 1: 2000, 2: 3800, 4: 7200 };                            // R$/mês
const LIVE_USD_HORA = { externa: 0, gerenciada: null };                         // preencher com Agente A (Zoom, LiveKit etc.)
const BUNNY_EGRESS = { volume: 0.005, standardAmericaDoSul: 0.045 };             // US$/GB; confirmar se o Stream usa a tabela regional da CDN

// ===== Derivadas =====
function gbArmazenadoPorHora(q) {        // soma de todos os degraus do ladder
  return LADDER[q].reduce((s, d) => s + GBH[d], 0);
}
function gbEntreguePorHora(q) {          // média ponderada pelo mix assistido
  return Object.entries(MIX[q]).reduce((s, [d, f]) => s + f * GBH[d], 0);
}

function custoInfra(e) {                  // pura: só infra do mês, sem acumulado (evita recursão)
  const horasAssistidas = e.alunosAtivos * e.horasAssistidasAlunoMes;            // h/mês
  const horasLive = e.livesMes * e.duracaoLiveH;
  const minArmaz = e.horasArmazenadas * 60;
  const minEntreg = horasAssistidas * 60;
  const minLiveEntreg = horasLive * 60 * e.participantesLive;                    // assistir live conta como minuto entregue
  const gbArmaz = e.horasArmazenadas * gbArmazenadoPorHora(e.qualidadeMax);
  const gbEntreg = horasAssistidas * gbEntreguePorHora(e.qualidadeMax);
  const gbLiveEntreg = horasLive * e.participantesLive * gbEntreguePorHora(e.qualidadeMax);

  // ===== Custo de infra por provedor (USD/mês) =====
  const prov = {};

  prov.cloudflareStream = {
    storage: Math.ceil(minArmaz / 1000) * 5,           // DEGRAU: blocos de 1.000 min (16,7 h)
    egress: ((minEntreg + minLiveEntreg) / 1000) * 1,  // inclui quem assiste a live
    transcoding: 0,
    live: 0,                                           // ingest grátis; gravação entra no storage do mês seguinte (infraAcumulada)
  };

  prov.bunnyStream = {
    storage: gbArmaz * 0.01 * e.regioesStorage,
    egress: (gbEntreg + gbLiveEntreg) * BUNNY_EGRESS[e.tierBunny], // Volume 0.005 ou Standard América do Sul 0.045
    transcoding: 0,
    live: horasLive * (LIVE_USD_HORA.gerenciada ?? 0),
  };
  prov.bunnyStream.total = Math.max(1, soma(prov.bunnyStream)); // DEGRAU: mínimo de US$ 1

  prov.mux = {
    storage: minArmaz * 0.003,                         // 1080p; ajustar para outras resoluções
    egress: Math.max(0, minEntreg + minLiveEntreg - 100000) * 0.001, // DEGRAU: 100.000 min grátis (VOD + live)
    transcoding: 0,                                    // Basic; Plus = horasNovasMes*60*0.03125
    live: horasLive * 60 * 0.03125,                    // live usa encoding Plus
  };
  prov.mux.total = Math.max(0, soma(prov.mux) - 20);   // crédito mensal de US$ 20

  prov.r2Proprio = {
    storage: Math.max(0, gbArmaz - 10) * 0.015,        // DEGRAU: 10 GB grátis
    egress: 0,
    transcoding: 0,                                    // CPU da VPS já paga; se usar GPU/serviço, somar aqui
    live: horasLive * (LIVE_USD_HORA.gerenciada ?? 0),
    opsExtra: 0,                                       // estimar operações Classe B (segmentos HLS)
  };

  for (const p in prov) {
    if (prov[p].total === undefined) prov[p].total = soma(prov[p]);
    prov[p].totalBRL = prov[p].total * e.cotacaoUSD;
    prov[p].dominante = maiorComponente(prov[p]);     // "storage" | "egress" | "live"
  }
  return prov;
}

function calcular(e) {
  const prov = custoInfra(e);

  // ===== Nosso preço =====
  const sust = SUSTENTACAO.find(f => e.alunosAtivos <= f.ate)?.preco ?? 4000; // DEGRAUS: 500 e 2.000 alunos
  const ciclos = CICLOS[e.planoCiclos];
  const setupMensal = SETUP[e.cenarioSetup] / e.mesesDiluicaoSetup;            // só para visualização

  // ===== Saídas =====
  const saida = {};
  for (const p in prov) {
    const infra = prov[p].totalBRL;
    saida[p] = {
      infraMes: infra,
      servicoMes: sust + ciclos,
      setupDiluidoMes: setupMensal,
      totalMes: infra + sust + ciclos + setupMensal,
      acumulado: [12, 24, 36].map(m => ({
        meses: m,
        // setup cobrado uma vez; recorrência e infra crescem; horas armazenadas crescem com horasNovasMes
        total: SETUP[e.cenarioSetup] + m * (sust + ciclos) + infraAcumulada(e, p, m),
      })),
      custoPorAlunoMes: (infra + sust + ciclos) / e.alunosAtivos,
      dominante: prov[p].dominante,
    };
  }
  return saida;
}

function infraAcumulada(e, provedor, meses) {
  // simula mês a mês: horasArmazenadas += horasNovasMes + horas de live gravadas; recalcula só a infra
  let total = 0, horas = e.horasArmazenadas;
  for (let m = 0; m < meses; m++) {
    total += custoInfra({ ...e, horasArmazenadas: horas })[provedor].totalBRL;
    horas += e.horasNovasMes + e.livesMes * e.duracaoLiveH;   // gravação das lives entra no catálogo
  }
  return total;
}
// soma(obj): soma os campos numéricos storage+egress+transcoding+live+opsExtra
// maiorComponente(obj): devolve o nome do maior campo entre storage, egress, live
```

### 7.4 Exemplos já calculados (com as constantes acima)

| Cenário | Cloudflare Stream | Bunny Stream (Volume) | Bunny Stream (Standard América do Sul) | Mux | Componente dominante |
|---|---|---|---|---|---|
| 100 h armazenadas, 200 alunos x 4 h/mês (800 h = 48.000 min entregues), 1080p, sem lives | US$ 30 + 48 = US$ 78 (R$ 392) | 230 GB x 0,01 + 903 GB x 0,005 = cerca de US$ 6,80 (R$ 34) | 230 GB x 0,01 + 903 GB x 0,045 = cerca de US$ 42,93 (R$ 216) | US$ 18 de storage; entrega dentro dos 100.000 min grátis; abatido o crédito de US$ 20, cerca de US$ 0 sem lives. Com as lives padrão de 7.1 (4 x 3 h = 720 min em Plus = US$ 22,50): US$ 18 + 22,50 menos 20 = **US$ 20,50 (R$ 103)** | Egress no Cloudflare e no Bunny Standard; storage no Mux |
| 1.000 h armazenadas, 5.000 alunos x 4 h/mês (20.000 h = 1,2 milhão de min), 1080p, sem lives | US$ 300 + 1.200 = US$ 1.500 (R$ 7.545) | 2.300 GB x 0,01 + 22.570 GB x 0,005 = cerca de US$ 136 (R$ 683) | 2.300 GB x 0,01 + 22.570 GB x 0,045 = cerca de US$ 1.038,65 (R$ 5.224) | US$ 180 + 1.100 = US$ 1.280 menos US$ 20 = US$ 1.260 (R$ 6.338) | **Egress em todos** |

Lives no exemplo 1 com as entradas padrão de 7.1 (4 lives x 3 h x 30 participantes): 12 h x 60 x 30 = 21.600 min entregues por mês. No Cloudflare são +US$ 21,60, total US$ 99,60 (R$ 501). No Mux entram na franquia de 100.000 min junto com o VOD (48.000 + 21.600 = 69.600 min). No Bunny são +360 h x 1,13 GB/h = cerca de 406 GB entregues. A gravação das lives soma +12 h por mês ao catálogo armazenado.

Conclusões:

- **A hipótese "armazenamento domina" vale só na escala inicial** (poucos alunos, catálogo crescendo). Com centenas de alunos ativos, **o egress (entrega) domina**, como já suspeitava o PROMPT.md. O Agente A deve confirmar com o benchmark completo.
- Na escala do IAE em 2027 (dezenas a poucas centenas de alunos), **infra fica entre R$ 0 e cerca de R$ 500/mês** dependendo do provedor, do tier do Bunny e das lives, contra R$ 1.500 a 9.000/mês do nosso serviço. A maior linha da proposta é o serviço, e é nela que a transparência importa.

### 7.5 Onde o custo dá degrau

| Degrau | Gatilho | Efeito |
|---|---|---|
| Cloudflare Stream storage | A cada 1.000 min (16,7 h) armazenados | +US$ 5/mês, pré-pago |
| Mux entrega | Acima de 100.000 min/mês (1.667 h assistidas, cerca de 417 alunos a 4 h/mês) | Passa a cobrar US$ 0,001/min |
| Mux crédito | Uso abaixo de US$ 20/mês | Custo zero |
| R2 | Acima de 10 GB | Começa a cobrar US$ 0,015/GB |
| Bunny | Mínimo de US$ 1/mês; tier Standard vs Volume | Para aluno no Brasil, Standard América do Sul (US$ 0,045/GB) custa 9 vezes o Volume (US$ 0,005/GB) |
| Qualidade máxima | 1080p para 1440p | Storage do ladder cerca de 2,2 vezes; egress cerca de 1,4 vez (pelo mix estimado) |
| Qualidade máxima | 1440p para 2160p | Storage do ladder cerca de 2 vezes de novo |
| Nossa sustentação | 500 e 2.000 alunos ativos | R$ 1.500 para R$ 2.500 para R$ 4.000 |
| Lives | Plano da ferramenta de live (limite de participantes e de gravação) | Depende da escolha do Agente A |

Saídas que a calculadora deve mostrar: custo de infra mensal por provedor (USD e BRL), componente dominante, nosso preço mensal (sustentação + ciclos), setup diluído (só visual), total mensal, acumulado 12/24/36 meses, custo por aluno ativo, e um aviso visual quando uma entrada cruza um degrau ("subir para 1440p aumenta sua infra em R$ X/mês"), com link para o vídeo de exemplo de cada qualidade.

---

## Confiança

**Fato verificado (página aberta em 13/10/2026):**

- Valores-hora freelancer BR por senioridade (Lancei frontend e backend; Freelancer Online, inclusive retainer e app MVP).
- Médias da Clutch para agências de web dev (hora, projeto, mensal).
- Faixas de setup, retainer e modelos de agências de IA (Taskip; Groovy Web, que agrega Layer3 Labs, AY Automate e Alice Labs).
- Preços e mecânica das dev subscriptions (Figue, 22/09/2026), do Designjoy (site oficial) e dos exemplos produtizados (ManyRequests).
- Preços de Cloudflare Stream, Cloudflare R2, Bunny Stream e Mux (páginas oficiais).

**Estimativa (sem fonte direta ou com cálculo próprio):**

- Capacidade dos sócios (12 h/semana cada), esforço em pessoa-dias dos três cenários e ganho de produtividade com IA.
- Preços sugeridos de setup, sustentação e ciclos (derivados das referências, não observados no mercado BR para este nicho).
- Faturamento previsto do IAE em 12 meses (cenários inventados a partir de 5 alunos x R$ 2.000; confirmar com o cliente).
- Bitrates e GB por hora por degrau, e o mix assistido por degrau (o Agente A deve substituir).
- Tier Standard do Bunny no Stream (cerca de US$ 0,03/GB pelo exemplo da página de Stream; a tabela de CDN dá US$ 0,045/GB para América do Sul; não confirmado se o Stream usa a tabela regional).
- Taxa de gestão de MSPs (10 a 20%), IOF de cartão internacional (3,5%, de memória) e spread bancário (4 a 6%).
- Alíquotas do Simples Nacional (6% a 15,5%).
- Artigos de lei citados de memória (Planalto recusou conexão).

**Sem resposta nesta rodada:**

- Valores reais de Workana e 99freelas para plataforma de cursos/área de membros (busca esgotada).
- Preços de agências brasileiras para LMS sob medida.
- Sinal forte da comunidade nos últimos 30 dias: a rodada do last30days trouxe pouco conteúdo relevante sobre preço.
- Modelos públicos de contrato de desenvolvimento de software no Brasil e o guia da ANPD sobre agentes de tratamento (o PDF não carregou).
- Custo de live por hora/participante (depende do Agente A).
- Conversão de EUR e GBP para BRL.

## Fontes

Todas acessadas em 13/10/2026.

- https://www.lancei.pro/benchmark/desenvolvedor-frontend
- https://www.lancei.pro/benchmark/desenvolvedor-backend
- https://www.lancei.pro/benchmark
- https://www.freelanceronline.com.br/blog/quanto-cobrar-como-freelancer-tabela-de-precos-e-como-calcular-em-2026/
- https://clutch.co/web-developers/pricing
- https://taskip.net/ai-automation-agency-pricing/
- https://www.groovyweb.co/blog/ai-consulting-rates-2026
- https://www.figue.ai/en/blog/best-unlimited-development-subscriptions
- https://www.manyrequests.com/blog/productized-agency-examples
- https://www.manyrequests.com/blog/productized-service-guide
- https://www.designjoy.co/
- https://developers.cloudflare.com/stream/pricing/
- https://developers.cloudflare.com/r2/pricing/
- https://bunny.net/pricing/stream/
- https://bunny.net/pricing/cdn/
- https://www.mux.com/pricing
- https://www.mux.com/pricing.md
- https://www2.camara.leg.br/legin/fed/lei/2018/lei-13709-14-agosto-2018-787077-normaatualizada-pl.html (LGPD, art. 5º, VI e VII: controlador e operador)
- https://www.planalto.gov.br/ccivil_03/leis/l9609.htm (Lei 9.609/1998; conexão recusada, texto citado de memória)
- https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm (LGPD; citada de memória)
- Rodada last30days "AI dev agency pricing productized dev subscription", arquivo bruto em ~/Documents/Last30Days/ai-dev-agency-pricing-productized-dev-subscription-raw-v3-2026-10-13.md (Reddit r/ExperiencedDevs, r/agency, r/SaaS; YouTube Callum Healey)
- Cotação: AwesomeAPI, USD 1 = R$ 5,03 (13/10/2026), conforme informado no briefing.
