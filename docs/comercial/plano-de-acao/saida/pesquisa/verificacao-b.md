# Verificação cética do Agente B (referências, plataformas, pagamentos, Matt Pocock, Jack Roberts, esteira e esforço)

Arquivo verificado: `saida/pesquisa/b-referencias-funcionalidades.md`. Data: 13/10/2026. Cotação mantida: USD 1 = R$ 5,03.

Método: reabri as páginas citadas com WebFetch (e com o leitor r.jina.ai quando o site devolveu 403), usei WebSearch quando a página oficial bloqueou, li os PDFs da FGV (um deles renderizado como imagem, porque a tabela de preço é figura), consultei a API do GitHub com `gh` para estrelas, datas e o conteúdo dos ADRs do Matt Pocock, e refiz todas as contas de taxa por venda. Não editei o arquivo original.

Vereditos: **CONFIRMADO**, **CORRIGIR** (número ou afirmação errada), **IMPRECISO** (certo em parte, falta ressalva), **NÃO VERIFICADO** (fonte bloqueada ou inexistente).

---

## 1. Plataformas prontas (preços e taxas)

| Afirmação | O que o arquivo diz | O que a fonte diz | Veredito | URL |
|---|---|---|---|---|
| Taxa da Hotmart | 9,9% + R$ 2,49 por venda; até 8,9% acima de R$ 500 mil/ano; recebimento em 30 dias; antecipação 2,19% a 4,79% | FAQ e tabela: "9,9% + R$ 2,49 por cada venda"; até 8,9% "a partir de R$ 500 mil faturados no ano"; 30 dias sem taxa; antecipação 2 dias 3,59%, 14 dias 2,19%, flexível 4,79%. **Outro bloco da mesma página diz "+ 1 real por venda aprovada"** | CONFIRMADO, com ressalva: o "R$ 1,00" da parte b2 não foi invenção, está na própria página da Hotmart, que se contradiz. A contradição 1 deve citar isso | https://hotmart.com/pt-br/taxa-hotmart |
| Taxa da Kiwify | 8,99% + R$ 2,49; Pix em 2 dias; cartão em 15 ou 2 dias; viagem a Dubai com Lamborghini a quem faturar R$ 10 milhões | Idêntico ("8,99% + R$2,49"; Pix 2 dias; cartão 15 ou 2 dias; viagem de 7 dias a Dubai com Lamborghini ao atingir R$ 10 milhões) | CONFIRMADO | https://kiwify.com.br/ |
| Taxa da Eduzz | 4,9% + R$ 2,49 (Básico) a 6,9% (Intermediário); 4,59% acima de R$ 1 MM; saque R$ 1,99; parcelamento 3,49%; 2 GB, 250 GB, 1 TB | Idêntico; a página também traz antecipação do parcelado de 2,99% e encargo de 2% acima de R$ 10 mil | CONFIRMADO | https://www.eduzz.com/taxas |
| Memberkit: planos | R$ 197 (1.000), R$ 497 (5.000), R$ 697 (15.000); não hospeda vídeo; não processa pagamento; domínio sem custo | Essencial R$ 197 (1.000), Pro R$ 497 (5.000), Escala R$ 697 (15.000); vídeos em "YouTube, Vimeo, Panda Video ou Smart Player"; "precisa de uma plataforma externa para receber pagamentos"; domínio "sem qualquer custo adicional" | CONFIRMADO | https://memberkit.com.br/ |
| Memberkit no Resumo e no Plano B | Resumo item 4 e linha 26: "R$ 197 a 497/mês"; item 10 do resumo b1: "Memberkit (R$ 497/mês)"; seção 2.4.5: "Memberkit Essencial (R$ 197/mês)" | Faixa real R$ 197 a 697 | CORRIGIR: o arquivo se contradiz. Usar "R$ 197 a 697/mês" no resumo e escolher um plano só para o Plano B (o Essencial de R$ 197 cabe até 1.000 membros) | https://memberkit.com.br/ |
| Cademí | Preço não publicado; "Não hospeda": integra Vimeo, Panda, VdoCipher, Videofront, Hotmart Player | Home: sem preço ("Investimento fixo e previsível", "Consulte nossos pacotes") e a frase "Sem custos de hospedagem". A central de ajuda tem guias para Vimeo, Hotmart Player, Panda, Videofront e VdoCipher, mas **não diz que a Cademí não hospeda vídeo** | IMPRECISO: "integra players externos" está confirmado; "não hospeda" é inferência. Trocar por "não encontramos hospedagem própria documentada" | https://cademi.com.br/ e https://ajuda.cademi.com.br/llms.txt |
| Curseduca (WAID) | Evolution 12 x R$ 997 anual; PRO 12 x R$ 1.997; Evolution 500 GB e 1 TB de banda; PRO 2 TB e 3 TB; app nas lojas | Idêntico. A página chama o armazenamento e a banda de "bônus" e inclui o app nas lojas em todos os planos, inclusive Enterprise | CONFIRMADO | https://waid.io/ |
| Teachable: preços | Starter US$ 39; Builder US$ 89 ou 69 anual; Growth US$ 189 ou 139 anual; Starter 7,5%; até 1 TB | Idêntico (Starter anual US$ 29) | CONFIRMADO | https://teachable.com/pricing |
| Teachable: API | "API no Builder+ (Growth: 10.000 req/mês)" | API pública só aparece no **Growth** (10.000/mês e 100/minuto); Builder: "não listado" | CORRIGIR: API só a partir do Growth (US$ 139 a 189, R$ 699 a 951/mês) | https://teachable.com/pricing |
| Teachable: cartão | "cartão internacional 3,9% + US$ 0,30" | A página mostra só "2.9% + 30¢ for U.S. credit and debit card sales"; taxa internacional não aparece | NÃO VERIFICADO: retirar ou citar a fonte | https://teachable.com/pricing |
| Thinkific: preços anuais | Basic US$ 40, Start US$ 82, Grow US$ 164; Plus sob consulta; app com marca +US$ 199/mês | Idêntico (página oficial via leitor, porque o site devolve 403) | CONFIRMADO | https://www.thinkific.com/pricing/ |
| Thinkific: mensal e taxa | "Ficou sem resposta": mensalidade no plano mensal e taxa de transação | Mensal: **Basic US$ 54, Start US$ 109, Grow US$ 219** (R$ 272, 548 e 1.102). Taxa: 0% com Thinkific Payments; com processador próprio, 5% (Basic), 2% (Start), 1% (Grow), segundo terceiros. Preços subiram cerca de 10% para renovações desde 13/08/2026 | CORRIGIR (pendência respondida). O Plano B "Thinkific Start US$ 82/mês" só vale com contrato anual; no mensal é US$ 109 (R$ 548) | https://www.thinkific.com/pricing/ e https://blog.freshlearn.com/blog/thinkific-pricing |
| Thinkific: banda, trilhas, B2B, API | 100/200/400 GB; Plus a partir de 7.500 GB; trilhas e SCORM só no Plus; B2B por assentos no Grow; API e webhooks no Grow; remove marca no Grow; domínio desde o Basic | Idêntico | CONFIRMADO | https://www.thinkific.com/pricing/ |
| Kajabi | Basic US$ 179, Growth US$ 249, Pro US$ 499; anual 143/199/399; Kajabi Payments 2,7% a 2,9% + US$ 0,30; gateway terceiro 0,5% a 2%; API incluída (US$ 25/mês); app com marca incluído | Preços e taxas idênticos. A página lista "API: Included ($25/mo value)" e "Branded Mobile App: Included ($199/mo value)" **sem dizer em quais planos**; a FAQ sugere que app próprio é do Pro | IMPRECISO: dizer "app com marca provavelmente só no Pro" | https://kajabi.com/pricing |
| Circle | Professional US$ 89, Business US$ 199, Scale US$ 419 (anual); 2%/1%/1%/0,5%; 200 GB a 1 TB; live 10 a 20 h, 100 a 500 espectadores; white-label do Business; Admin API 5.000 no Business; app com marca só no Plus | Idêntico (Scale: Admin API 30.000/mês) | CONFIRMADO | https://circle.so/pricing |
| Mighty Networks | Launch US$ 79, Scale US$ 179, Growth US$ 354; 2%/1%/0,5%; 200 GB a 1 TB; live 20 a 40 h; API e MCP a partir do Scale; app com marca só no Mighty Pro | Idêntico (Launch anual US$ 950/ano) | CONFIRMADO | https://www.mightynetworks.com/pricing |
| Conversões em reais | R$ 196 a 2.509,97 nas tabelas | Refeitas a 5,03: todas batem | CONFIRMADO | conta própria |
| Taxa por venda de R$ 2.000 (seção 2.2) | Hotmart R$ 200,49; Kiwify R$ 182,29; Eduzz R$ 100,49; clube 200 x R$ 99: R$ 2.458, 2.278 e 1.468 | Refeitas: 200,49; 182,29; 100,49; 2.458; 2.278; 1.468 | CONFIRMADO | conta própria |

## 2. Gateways de pagamento

| Afirmação | O que o arquivo diz | O que a fonte diz | Veredito | URL |
|---|---|---|---|---|
| Asaas: Pix e boleto | R$ 1,99 (R$ 0,99 nos 3 primeiros meses) | Idêntico | CONFIRMADO | https://www.asaas.com/precos-e-taxas |
| Asaas: cartão | 2,99% + R$ 0,49; 2 a 6x 3,49%; 7 a 12x 3,99%; até 21x 4,29% (Visa/Master); sobre o total | Idêntico; há também preço promocional (1,99%, 2,49%, 2,99%, 3,29%) | CONFIRMADO | idem |
| Asaas: conflito interno | FAQ cita 1,99% para assinatura | A FAQ diz "1,99% sobre o valor total da venda para cobranças parceladas ou para assinaturas", contra 3,49% a 3,99% na tabela | CONFIRMADO (o conflito existe e atinge também o parcelado, não só a assinatura) | idem |
| Asaas: antecipação, NFS-e, mensalidade | Cartão 1,25% a.m. (FAQ 1,70% no parcelado); boleto a partir de 5,79% a.m.; NFS-e R$ 0,49; mensalidade zero | Idêntico | CONFIRMADO | idem |
| Asaas: Pix Automático em assinatura | Assinatura nativa com Pix Automático | Docs: autorização com `paymentCreationMode = SUBSCRIPTION` gera as cobranças; sem taxa informada | CONFIRMADO | https://docs.asaas.com/docs/pix-automatico |
| Simulação Asaas | Pix 1,99; cartão 60,29; 12x 80,29; assinatura R$ 99 a R$ 3,45; antecipação 8% a 11% (R$ 160 a 220) | Refeitas: 60,29; 80,29; 3,45; 6,5 x 1,25% a 1,70% = 8,1% a 11,1% (R$ 162 a 221) | CONFIRMADO | conta própria |
| Pagar.me (Essencial) | Pix 0,99%; crédito 4,19%; 6x 13,63%; 12x 20,95%; D+1; mensalidade zero; boleto não informado | Idêntico. Ressalva da página: novos vendedores podem ter o dinheiro retido por até 30 dias | CONFIRMADO (acrescentar a ressalva da retenção) | https://www.pagar.me/ofertas |
| Simulação Pagar.me | 19,80; 83,80; 419,00; 4,15 | Refeitas: idênticas | CONFIRMADO | conta própria |
| Stripe Brasil | Cartão 3,99% + R$ 0,39; Pix 1,19% só por convite; boleto R$ 3,45; Billing 0,7%; Connect +0,25%; contestação R$ 55 | Idêntico; cartão internacional +2% | CONFIRMADO | https://stripe.com/br/pricing |
| Stripe: Pix e parcelamento | Limite de R$ 3.000 por Pix; Pix Automático indisponível no Brasil; parcelamento só México, Japão e Mastercard Installments | Idêntico ("O Pix Automático não está disponível no Brasil"; mínimo R$ 0,50 e máximo R$ 3.000) | CONFIRMADO | https://docs.stripe.com/payments/pix e https://docs.stripe.com/payments/installments |
| Stripe: Smart Retries | 8 tentativas em 2 semanas por padrão | "A configuração padrão recomendada é de 8 tentativas em 2 semanas" | CONFIRMADO | https://docs.stripe.com/billing/revenue-recovery/smart-retries |
| Simulação Stripe: assinatura R$ 99 | R$ 4,98 (3,99% + 0,39 + 0,7% Billing) | 99 x 3,99% = 3,95; + 0,39 = 4,34; + 0,7% (0,69) = **R$ 5,03** | CORRIGIR: R$ 5,03, não R$ 4,98 | conta própria |
| Vindi: planos e taxas | R$ 299, R$ 499, R$ 1.119; Pix 0,95% mín. R$ 1,60; boleto R$ 2,99; cartão a partir de 2,75% (30 d) ou 3,25% (14 d) + R$ 0,39 | Idêntico (todos "a partir de"); antifraude R$ 0,40 por transação no Essential e no Pro | CONFIRMADO (acrescentar o antifraude) | https://vindi.com.br/precos/ |
| Vindi: retentativa | "retentativa automática no plano Premium" (tabela 5.1 e seção 5.4) | "Retentativas simples" e "com troca de perfil de pagamento e de adquirente" **incluídas nos três planos**; só a "retentativa inteligente" é serviço adicional | CORRIGIR: a retentativa existe desde o Essential | idem |
| Vindi: parcelamento e antecipação | Tabela de jun/2025: até +2,99% por parcela; antecipação até 7% a.m. | PDF "Atualizado em 27/06/2025": "Até 2,99% de adicional por parcela" (outra tabela do mesmo PDF: até 1,69%); "Até 7,0% a.m." | CONFIRMADO | https://www.pagamentos.vindi.com.br/assets/contratos/tabela-de-tarifas.pdf |
| Simulação Vindi | Pix 19,00; cartão 30 d 55,39; assinatura 3,11 | Refeitas: idênticas (sem o antifraude de R$ 0,40) | CONFIRMADO | conta própria |
| Mercado Pago | Pix 0,99%; boleto R$ 3,49; cartão 4,98% a 4,99% na hora, 3,79% a 4,49% em 14 dias, 3,03% a 3,99% em 30 dias (terceiros) | Página oficial devolveu 403 de novo; fontes secundárias citam 4,99% na hora e dizem que a taxa é definida por perfil de vendedor | NÃO VERIFICADO (segue como estimativa de terceiros, como o arquivo já diz) | https://www.mercadopago.com.br/custos-receber-pagamentos |
| Iugu | Sem tabela pública; revendedor: Pix R$ 1,50, boleto R$ 2,50, cartão 2,19% + R$ 0,75; Pix Automático; NFS-e disponível | Página oficial: sem taxas e sem mensalidade publicadas; "compatível com o Pix Automático"; **não menciona NFS-e** | IMPRECISO: Pix Automático confirmado; NFS-e e taxas seguem sem fonte oficial | https://www.iugu.com/iugu-recorrencia |
| Data do Pix Automático | "desde junho de 2025 (data a confirmar)" | Resolução BCB nº 402: início em 16/06/2025 | CONFIRMADO (trocar "a confirmar" por 16/06/2025) | https://www.infomoney.com.br/minhas-financas/bc-faz-ajustes-em-seguranca-e-estabelece-junho-de-2025-para-lancar-pix-automatico/ |
| "Hotmart custa de 3 a 100 vezes mais" | Seção 5.2 | 200,49 / 60,29 = 3,3 vezes; 200,49 / 1,99 = 101 vezes | CONFIRMADO | conta própria |

## 3. Referências do cliente

| Afirmação | O que o arquivo diz | O que a fonte diz | Veredito | URL |
|---|---|---|---|---|
| Members Club: planos | "Members Club + Applyfy" R$ 0 (taxa do checkout não informada); Pro R$ 597/mês sem comissão; alunos ilimitados; 10 workspaces | Idêntico | CONFIRMADO | https://mymembersclub.com.br/ |
| Members Club: recursos e segurança | Vitrine Netflix, "Continuar assistindo", gamificação, certificado com código, lives via YouTube/Zoom, PWA; RLS em 49 tabelas; 99,9% de uptime | Idêntico | CONFIRMADO | idem |
| Members Club: prova social | "Mentoria Beleza Digital", "Curso Trader Profissional", "Imersão Confeitaria" | Idêntico (1,2 mil, 3,8 mil e 2,1 mil alunos, segundo os depoimentos) | CONFIRMADO | idem |
| Members Club: vídeo | "Não informa hospedagem de vídeo" | Não descreve hospedagem, mas fala em "upload em massa de aulas" | IMPRECISO: o upload em massa sugere hospedagem; perguntar ao fornecedor antes de afirmar que não hospeda | idem |
| Members Club é o que o cliente viu | Correspondência "mais provável" | Não há como confirmar pela web | NÃO VERIFICADO (pedir o link ao Vinicius, como o arquivo já recomenda) | |
| Future Law: institucional | 6 anos; 70% OFF; "compre 1 e ganhe outro"; cupons de 30%; Future Law In; Experience no Expo Center Norte; Thinkific; Spaces; "hitmakers"; frase da Folha | Tudo confirmado na home. Ressalva: o banner do Experience indica a edição de 2024 ("03/09 no Expo Center Norte") | CONFIRMADO, com ressalva: "evento anual" não tem edição recente visível na home | https://www.futurelaw.com.br/ |
| Future Law: Legal Operations | 30 h-a; R$ 1.497 cheio; R$ 449,10 promo; acesso de 7 meses; contradição "até 1 mês" | Idêntico; 31 professores nomeados em 9 módulos (contagem própria) | CONFIRMADO | https://www.futurelaw.com.br/cursos/legal-operations-nova-edicao |
| Future Law: outros cursos | Tech-Driven Law 17 h-a, R$ 1.197 / 359,10; Concorrência R$ 1.297 / 389,10; Poder Público 4.0 25 h-a, R$ 1.397 / 419,10; Eficiência com IA R$ 997 / 299,10 | Tech-Driven 17 h-a, 1.197 / 359,10; Concorrência **20 h-a**, 1.297 / 389,10; Poder Público 25 h-a, 1.397 / 419,10; Eficiência com IA **13 h-a**, 997 / 299,10 (e a página ainda diz "100% Gratuito") | CONFIRMADO nos preços. Faltava a carga de dois cursos | páginas de cada curso |
| Future Law: faixa de horas e R$/h | "17 a 30 h-a" e "R$ 50/h cheio (R$ 15/h na promo)" | Faixa real **13 a 30 h-a**; R$/h cheio vai de R$ 50 (Legal Ops) a **R$ 77** (Eficiência com IA, 997/13); promo R$ 15 a 23/h | CORRIGIR: "R$ 50 a 77/h cheio; R$ 15 a 23/h na promoção" | idem |
| FGVlaw curta duração | Compliance: 32 h-a, 8 encontros, terças 19h às 22h40, início 06/04/2027; R$ 4.790 com desconto, R$ 5.275 sem; 1+5 de R$ 828,34 a R$ 912,21 | PDF do programa 2027: idêntico. Desconto para matrícula de 01/10/2026 a 28/01/2027 | CONFIRMADO | https://direitosp.fgv.br/sites/default/files/cursos/arq-prog/2026-09/programa-2027-compliance-empresarial-e-gestao-de-riscos-corporativos-fgv-law_0.pdf |
| FGVlaw pós Gestão Jurídica Executiva | 432 h-a; seg a qua 19h às 22h40; 5+ anos de experiência; 10 obrigatórias + 4 optativas; 2 a 3 semestres; R$ 48.910 / R$ 53.935; até 1+29 (R$ 2.006,48 a 2.212,62) | Página: idêntica (e ela mesma se contradiz: "3 semestres" no topo, "2 semestres" em Realização). PDF de investimento (tabela em imagem): R$ 48.910 e R$ 53.935; 1+29 de R$ 2.006,48 e R$ 2.212,62 | CONFIRMADO | https://direitosp.fgv.br/cursos/pos-graduacao-lato-sensu/fgvlaw-gestao-juridica-executiva e https://direitosp.fgv.br/sites/default/files/link-arquivo/2026-09/Investimento%20-%20Pos-12.pdf |
| R$/h-a da FGVlaw curta | R$ 150 a 165/h-a | 4.790 / 32 = 149,69; 5.275 / 32 = 164,84 | CONFIRMADO | conta própria |
| "Todos miram líderes com 2 a 5 anos de experiência" | Resumo item 1 e item 1 do resumo b1 | Vale para o Insper (2 anos em liderança) e para a pós da FGV (5 anos). O curta duração da FGVlaw pede só "graduados em Direito atuantes em departamentos jurídicos", sem tempo mínimo | IMPRECISO: o curta duração da FGV (R$ 4.790 a 5.275, 8 encontros) **já atende o advogado in-house sem exigir liderança**, e é o concorrente mais direto do formato do IAE. Isso enfraquece o "espaço livre" do resumo | PDF do programa 2027 |
| FGV cursos gratuitos | 1 a 9 h-a, maioria 5 h-a; "Acesso à Informação" 5 h-a, 4,9 estrelas, 25.419 avaliações; Open Education Global em 2008 | O portal é todo em JavaScript; WebFetch, leitor r.jina.ai e Playwright devolveram página vazia | NÃO VERIFICADO | https://cursosgratuitos.fgv.br/ |
| Insper: Gestão Estratégica de Departamento Jurídico | "40 h; presencial (26 a 30/10) ou Live Learning (seg e qua, 19h30 às 22h, 04/11 a 14/12); R$ 10.885,74 integral, R$ 9.797,17 antecipada, R$ 8.164,31 Alumni; 10x; 17 professores" | Presencial: **40 h**, R$ 10.885,74 / 9.797,17 / 8.164,31. **Live Learning: 36 h, R$ 7.321,27 integral, R$ 6.589,14 antecipada, R$ 5.490,95 Alumni.** Até 10x sem juros; 17 professores | CORRIGIR: o arquivo aplicou o preço e a carga do presencial ao Live Learning. O online ao vivo custa R$ 7.321,27 por 36 h (R$ 203/h), e é ele que concorre com o IAE | https://ee.insper.edu.br/cursos/direito/gestao-estrategica-de-departamento-juridico/ |
| Insper: R$/h | R$ 272/h | Presencial 10.885,74 / 40 = R$ 272; Live Learning 7.321,27 / 36 = **R$ 203** | CORRIGIR: "R$ 203 (Live Learning) a R$ 272 (presencial)" no resumo e no comparativo 1.5 | idem |
| Insper: Estratégias Avançadas | 40 h; R$ 11.470,80; pré-requisito: o curso anterior ou MBA com 5 anos de gestão | 40 h; R$ 11.470,80 (antecipada R$ 10.323,72; Alumni R$ 8.603,10). Há um terceiro pré-requisito: "curso similar em outras instituições" | CONFIRMADO (acrescentar a terceira via) | https://ee.insper.edu.br/cursos/direito/estrategias-avancadas-para-lideres-juridicos/ |
| Insper LL.M. | R$ 53.420 à vista; até 30x | R$ 53.420 à vista após as datas de desconto (R$ 50.751 a 52.086 antes); 30 parcelas de R$ 2.021,65, total R$ 60.649 (com acréscimo). A página de preços devolveu 403; valores lidos nas páginas dos LL.M. | CONFIRMADO, com ressalva: "até 30x" tem acréscimo de cerca de 13,5%. Preço do LL.M. em Direito do Trabalho (R$ 42.800) não verificado | https://www.insper.edu.br/pos-graduacao/direito/direito-societario/ |

## 4. Matt Pocock

| Afirmação | O que o arquivo diz | O que a fonte diz | Veredito | URL |
|---|---|---|---|---|
| Quem é | Educador de TypeScript, mantém o Course Video Manager e vende o AI Hero | Repositórios públicos em github.com/mattpocock; CVM usado para publicar no AI Hero | CONFIRMADO | https://github.com/mattpocock |
| CVM: dados do repositório | TypeScript, criado em 24/07/2025, 807 estrelas, commits em 13/10/2026 | API do GitHub: TypeScript, criado em 2025-07-24, 807 estrelas, último push em 2026-10-13 | CONFIRMADO | https://github.com/mattpocock/course-video-manager |
| Silêncio | -38 dBFS, trecho mínimo de 1 s, folga de 0,08 s, limiar vem da calibração | `DEFAULT_SILENCE_THRESHOLD_DB = -38`; `MINIMUM_CLIP_LENGTH_SECONDS = 1`; `AUTO_EDITED_END_PADDING_SECONDS = 0.08`; sessão de gravação usa o limiar da AV Calibration | CONFIRMADO | apps/local/app/silence-detection-constants.ts |
| ADR 0033 (Whisper local) | faster-whisper large-v3-turbo em RTX 4060; mediana de 2,32 s para 0,95 s; fatias de ~27 min em silêncios | Idêntico; o ADR acrescenta que **não há fallback hospedado** e que o CVM agora exige GPU NVIDIA | CONFIRMADO | docs/adr/0033-transcription-runs-on-local-whisper.md |
| ADR 0024 (Autofill) | Job separado; capítulos com Sonnet 4.5 e descrições com Haiku 4.5; risco de regressão sem revisão | Idêntico; o ADR foi depois superado pelo 0032 (o Autofill virou Job do Sidecar) | CONFIRMADO | docs/adr/0024-autofill-is-a-job-of-its-own.md |
| ADR 0039 e skills | DaVinci Resolve apagado; skills `do-work`, `to-prd-project`, `to-issues-project`, `improve-codebase-architecture-project`, `verify-cvm`, `deploy-migration`, `document-ai-hero-api` | Arquivos existem com esses nomes (há também `install-effect-package` e `optimize-loader`) | CONFIRMADO | árvore do repositório |
| mattpocock/skills | Cerca de 290 mil estrelas; versão 1.3 em 04/10/2026 | 289.616 estrelas; v1.3.0 e v1.3.1 publicadas em 2026-10-04 | CONFIRMADO | https://github.com/mattpocock/skills |
| Sandcastle | 8,4 mil estrelas | 8.419 | CONFIRMADO | https://github.com/mattpocock/sandcastle |
| auto-editor e HyperFrames | auto-editor 5,5 mil, Unlicense, 31.7.2 de 03/10/2026; HyperFrames 62,7 mil, Apache 2.0, abril/2026 | auto-editor 5.497, Unlicense, 31.7.2 em 2026-10-03; HyperFrames 62.749, Apache-2.0, **criado em 10/03/2026** | CONFIRMADO, com ajuste: o repositório do HyperFrames é de março de 2026, não de abril | https://github.com/heygen-com/hyperframes |
| "2.500 alunos", "41 user stories", "178 mil views" | Coorte e vídeo da comunidade | Fontes de terceiros (X e YouTube); não reabertas nesta rodada | NÃO VERIFICADO | |

## 5. Jack Roberts

| Afirmação | O que o arquivo diz | O que a fonte diz | Veredito | URL |
|---|---|---|---|---|
| Existência e identidade | Youtuber britânico @Itssssss_Jack, automação com IA e Claude Code; vendeu startup com 60 mil clientes; fundou o Glaido; negócio "7 dígitos" | O canal se chama "Jack Roberts". A bio do YouTube (citada por perfis de terceiros): "built and sold a tech start-up with 60,000+ customers (Top-100 UK Start-ups) I founded Glaido (type with your voice) and run a 7 figure AI automation business". jackroberts.ai tem post "Official Launch of Glaido" em 01/05/2026 | CONFIRMADO que a pessoa existe e é quem o arquivo descreve (os números da bio são autodeclarados) | https://www.youtube.com/@Itssssss_Jack e https://jackroberts.ai/ |
| É o Jack Roberts que o Rib citou? | "o mais provável" | Nada na web liga esse criador ao que o Rib disse; o nome é comum (há ator, há a Jack AI Studio sem relação) | **AMBÍGUO**: a identificação é inferência do contexto. Confirmar com o Rib ou o Pedro (basta o link do vídeo que ele viu) | |
| Skool | "AI Automations by Jack"; mais de 110 blueprints de n8n; US$ 87 subindo para US$ 97; "valores de terceiros, não verificados na página oficial" | Página oficial do Skool: US$ 87/mês, sobe para US$ 97 ao chegar a 3.400 membros; 3,3 mil membros; "200+ battle-tested blueprints"; chamadas ao vivo diárias. Não diz que os blueprints são de n8n | CORRIGIR: o preço **está** na página oficial; blueprints são "mais de 200", não 110 | https://www.skool.com/aiautomationsbyjack/about |
| Newsletter | Posts "Insane Claude Marketing Skills" (06/04/2026), "Claude Code + NotebookLM", "Claude + ChatGPT 5.5 + Gemini", "Alex Hormozi chatbot" | Todos listados (02/04, 30/04, 28/03/2026). Último post visível: 01/05/2026 | CONFIRMADO | https://jackroberts.ai/ |
| Produto de edição de vídeo | Não encontrado | jackroberts.ai e Skool não citam produto de edição | CONFIRMADO (ausência) | idem |
| Skill da comunidade | `JackRobertsMotionGraphicSkill`, Remotion, 26 templates, não é dele | Repositório de terceiro (datassthou64-source), criado em 25/09/2026, **2 estrelas**, descrição "26 templates" | CONFIRMADO, com ressalva: é um repositório de 2 estrelas, sem peso como referência | https://github.com/datassthou64-source/JackRobertsMotionGraphicSkill |
| Inscritos | 245 a 278 mil (estimativas) | A página do YouTube não expôs a contagem | NÃO VERIFICADO | |

## 6. API do Grok, Gemini e vídeo

| Afirmação | O que o arquivo diz | O que a fonte diz | Veredito | URL |
|---|---|---|---|---|
| Grok 4.7 não aceita vídeo | "texto e imagem de entrada; não aceita vídeo segundo a documentação oficial" | Guia do modelo: "Text and image input; text output". Sem menção a vídeo ou áudio | CONFIRMADO | https://docs.x.ai/developers/grok-4-7 |
| Preço do Grok 4.7 | US$ 2 / US$ 6 por milhão; contexto acima de 200 mil cobra o dobro | Abaixo de 200 mil: US$ 2 / 6 (cache US$ 0,50); a partir de 200 mil: US$ 4 / 12. Janela de 500 mil tokens | CONFIRMADO | https://docs.x.ai/developers/pricing |
| Vídeo na xAI por outra via | Não citado | A tabela de preços lista uma ferramenta "Analyze videos found during X Search", cobrada por token: analisa vídeo de posts do X, não arquivo enviado | IMPRECISO: acrescentar que essa ferramenta existe e não serve para aula enviada | idem |
| Speech to Text da xAI | US$ 0,10/h (REST) | REST US$ 0,10/h; streaming US$ 0,20/h | CONFIRMADO | idem |
| Grok Imagine Video | "Gera vídeo a partir de texto/imagem/vídeo; é geração, não edição; US$ 0,05/s (480p)" | Preços: `grok-imagine-video-1.5-lite` US$ 0,02/s, `grok-imagine-video` US$ 0,05/s, `grok-imagine-video-1.5` US$ 0,08/s, **sem divisão por 480p**. Tutoriais de terceiros mostram edição por prompt de um vídeo enviado (ex.: "põe fogo nas bolas") | IMPRECISO: o Imagine faz edição generativa por prompt (troca de estilo, objetos), não corte, montagem nem remoção de trechos. Corrigir a faixa de preço para US$ 0,02 a 0,08/s e tirar o "480p" | idem e https://www.datacamp.com/tutorial/grok-imagine-api |
| Gemini: vídeo nativo | Até 3 h por chamada com 1 milhão de contexto; cerca de 100 tokens/s em baixa resolução; File API até 20 GB; MM:SS | Idêntico ("up to 3 hours long by default (at low media resolution)", 1 h em alta; 300 tokens/s em alta; 20 GB pago, 2 GB grátis) | CONFIRMADO | https://ai.google.dev/gemini-api/docs/video-understanding |
| Preço do Gemini 3.8 Flash | US$ 0,75 / 3,75; batch metade; dobra em 01/01/2027; 2.5 Flash-Lite US$ 0,10 / 0,40 | Idêntico (US$ 1,50 / 7,50 a partir de 01/01/2027) | CONFIRMADO | https://ai.google.dev/gemini-api/docs/pricing |
| Custo do passe visual | US$ 0,31/h (360 mil tokens de entrada + 10 mil de saída) | 0,36 x 0,75 + 0,01 x 3,75 = US$ 0,31. A partir de 2027: US$ 0,62/h | CONFIRMADO para 2026; o caminho "Com visão" e o "Premium" sobem cerca de US$ 0,31/h em janeiro | conta própria |

## 7. Estimativas de esforço (uso pesado de IA, Next.js + FastAPI)

Critério: um dev pleno ou sênior com Claude Code e o app hospitalar como base. "Irreal para menos" quer dizer prazo curto demais; "para mais", prazo folgado demais.

| Afirmação | O que o arquivo diz | Avaliação | Veredito | Fonte |
|---|---|---|---|---|
| Capacidade até 05/12 | Três sócios CLT, 8 a 10 dias-pessoa por semana em paralelo, 60 a 75 dias-pessoa | 8 a 10 dias de 6 a 8 h somam 48 a 80 h por semana fora do emprego, ou 16 a 27 h por sócio, durante 7,5 semanas seguidas. Para quem trabalha 40 h CLT, 3 a 5 dias-pessoa por semana (cerca de 10 a 13 h por sócio) é o realista: **23 a 38 dias-pessoa**. O MVP de 48 dias **não cabe** nessa conta | **IRREAL PARA MENOS** (a premissa de capacidade é a correção mais importante da seção). Confirmar com os sócios quantas horas reais cada um tem | conta própria |
| Semana 1 do cronograma (até 20/10) | Modelo de dados, login, conta no provedor de vídeo, prova de conceito de upload e reprodução assinada | 7 dias corridos a partir de hoje, com sócios CLT e sem contrato fechado com o cliente | IRREAL PARA MENOS: tratar como semana 1 do projeto, não do calendário | seção 2.4.4 |
| Soma do MVP | Cerca de 48 dias | Refeita: 47,5 dias (itens 1 a 20 sem o 21, 22 a 28, 41 e 42) | CONFIRMADO na conta. Faltam itens que ninguém estimou: design visual e telas (sem designer), QA e testes com alunos, termos de uso e política de privacidade, domínio e entregabilidade de e-mail, observabilidade e backup, migração do curso de 5 h. Cerca de 6 a 10 dias a mais | conta própria |
| Soma da fase 2 | Cerca de 60 | Refeita: 62 | CONFIRMADO (arredondamento) | conta própria |
| Item 19 (agenda ao vivo, MVP) depende do 29 (fase 2) | Dependência "29" | O MVP usa link externo (item 28); depender do 29 é impossível na ordem das fases | CORRIGIR: dependência é o item 28 | tabela 4.2 |
| Item 11 (admin de conteúdo com upload) | 3 dias | CRUD de curso, módulo e aula com upload direto ao provedor, estados de processamento, reordenação e publicação: 4 a 5 dias com IA | IRREAL PARA MENOS (leve) | |
| Item 25 (cancelamento, reembolso, inadimplência e bloqueio) | 2 dias | Webhooks de estorno, chargeback e falha de cobrança, regra de 7 dias do CDC, perda de acesso só ao clube: 3 a 4 dias | IRREAL PARA MENOS | |
| Itens 1, 7, 14, 20, 22, 23, 41 | 1; 2; 1,5; 1; 4; 5; 3 | Compatíveis com reuso do app hospitalar e provedor gerenciado | CONFIRMADO (plausível) | |
| Item 44 (DRM) | 10 dias ou mais, fase 3 | Mux, Bunny (MediaCage) e outros provedores entregam DRM Widevine/FairPlay como recurso pago; integrar no player é 2 a 4 dias mais a licença | IRREAL PARA MAIS (se o provedor do Agente A tiver DRM) | conhecimento técnico, não reverificado hoje |
| Item 53 (app nativo com download offline) | 15 dias ou mais | Download offline protegido exige DRM offline, armazenamento cifrado e revisão nas lojas; 20 a 30 dias é mais honesto | IRREAL PARA MENOS | |
| Itens 48 a 50 (trilha, pré-requisito, histórico) | 10 + 3 + 5 = 18 dias | Com as tabelas desenhadas no MVP (contradição 7), as telas e regras ficam em 8 a 12 dias | IRREAL PARA MAIS | |
| Item 33 (fórum por curso e turma) | 5 dias | Com o item 12 (comentários com moderação) pronto, 3 dias | IRREAL PARA MAIS (leve) | |
| Item 31 (tutor de IA com citação de aula e minuto) | 8 dias | RAG sobre transcrições com timestamps, avaliação de respostas e limites de custo: 6 a 8 | CONFIRMADO (plausível) | |
| Esteira de edição (seção 3.3.5) | 10 dias úteis | Dois blocos otimistas: detecção de repetições (2 dias, risco médio a alto declarado) e tela de revisão com prévia de cortes no navegador (2 dias). Prévia de EDL sobre vídeo de 3 h pede proxies de baixa resolução e player com cortes virtuais: 3 a 4 dias. Total realista 12 a 15, que é a faixa original da b2 | IRREAL PARA MENOS: a nota do editor deveria manter 10 a 15 (b2) em vez de 10 | |
| MCP remoto | 2 a 3 dias | Servidor MCP com OAuth por usuário, auditoria e limites: o OAuth sozinho toma 1 a 2 dias. 3 a 5 | IRREAL PARA MENOS (leve) | |
| Spike de 1 dia da esteira | 1 dia | auto-editor + transcrição + um prompt de capítulos sobre a aula de 5 h cabe em 1 dia | CONFIRMADO | |
| "Construir tudo" em 8 a 12 semanas | Estimativa | Com vídeo próprio (FFmpeg, HLS, CDN) e a capacidade real dos sócios, é o piso | CONFIRMADO como piso | |

---

## 8. As 10 correções mais importantes

1. **Capacidade do time:** 8 a 10 dias-pessoa por semana para três sócios CLT é irreal. A conta realista dá 23 a 38 dias-pessoa até 05/12, menos que os cerca de 48 do MVP. Ou o MVP encolhe, ou o prazo vai para o fim de janeiro de 2027.
2. **Insper Live Learning:** custa **R$ 7.321,27 por 36 h (R$ 203/h)**, não R$ 10.885,74 por 40 h. O valor maior é só do presencial.
3. **FGVlaw curta duração** não exige liderança (público: "graduados em Direito atuantes em departamentos jurídicos"). O "espaço livre" do IAE é menor do que o resumo diz.
4. **Future Law:** a faixa é 13 a 30 h-a e o preço cheio vai de **R$ 50 a 77/h** (Eficiência com IA: R$ 997 por 13 h-a), não "R$ 50/h".
5. **Teachable:** a API só existe no **Growth**, não "no Builder+". A taxa internacional de 3,9% + US$ 0,30 não está na página.
6. **Thinkific:** o plano mensal existe (Basic US$ 54, Start US$ 109, Grow US$ 219). O Plano B "Start US$ 82" só vale com contrato anual. Sem contrato, custa R$ 548/mês.
7. **Vindi:** a retentativa vem **nos três planos**, não só no Premium.
8. **Stripe:** a assinatura de R$ 99 custa **R$ 5,03**, não R$ 4,98.
9. **Jack Roberts:** o preço do Skool (US$ 87 subindo para US$ 97) **está** na página oficial, e são "mais de 200" blueprints, não 110. A identidade dele como "o cara que o Rib citou" continua sendo inferência: confirmar com o Rib.
10. **Esteira de edição:** 10 dias é otimista. Vale a faixa da b2 (**10 a 15 dias**), mais 3 a 5 dias de MCP com OAuth, não 2 a 3. E o Grok Imagine faz edição generativa por prompt (US$ 0,02 a 0,08/s, sem o "480p"): não serve para cortar aula, mas também não é "só geração".

Correções menores: Memberkit aparece com três faixas diferentes no arquivo (usar R$ 197 a 697); a dependência do item 19 é o 28, não o 29; a página da Hotmart traz tanto "R$ 2,49" quanto "+ 1 real", então a b2 não errou do nada; a data do Pix Automático é 16/06/2025 (Resolução BCB 402); o repositório do HyperFrames é de março de 2026; o DRM (item 44) e a trilha (itens 48 a 50) estão superestimados, e o app nativo (item 53) está subestimado.

## 9. Pendências (não verificado nesta rodada)

- Mercado Pago: a página oficial devolveu 403 de novo. As taxas seguem vindo de terceiros, e o próprio Mercado Pago define a taxa por perfil de vendedor.
- Iugu: não há tabela oficial pública, e a página de recorrência não menciona NFS-e.
- FGV cursos gratuitos (1 a 9 h-a, 25.419 avaliações, Open Education Global 2008): o portal não carregou no WebFetch, no leitor nem no Playwright.
- Preço do LL.M. do Insper em Direito do Trabalho (R$ 42.800): a página de preços devolveu 403.
- Taxa internacional do Teachable, e em quais planos da Kajabi entram a API e o app com marca.
- Se a Cademí e o Members Club hospedam vídeo: as páginas não dizem nem que sim nem que não.
- Inscritos do canal do Jack Roberts, e se é ele o Jack Roberts que o Rib citou.
- Afirmações sobre o Matt Pocock vindas de terceiros: 2.500 alunos na coorte, vídeo de 178 mil views, spec com 41 user stories.
- DRM nos provedores de vídeo: suporte e preço dependem da escolha do Agente A.
