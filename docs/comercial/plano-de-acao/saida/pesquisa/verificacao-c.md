# Verificação cética do Agente C (precificação e modelo de serviço)

Arquivo verificado: `saida/pesquisa/c-precificacao-modelo-de-servico.md`. Data: 13/10/2026. Cotação mantida: USD 1 = R$ 5,03.

Método: reabri as páginas citadas (WebFetch), refiz todas as contas em Python e li o pseudocódigo linha a linha. O orçamento de WebSearch da sessão esgotou no meio desta verificação, e o site do Planalto recusou conexão (ECONNRESET) e a Câmara devolveu 429; os itens jurídicos que dependiam disso estão marcados como **não verificado na fonte**.

Vereditos: **CONFIRMADO**, **CORRIGIR** (número ou afirmação errada), **IMPRECISO** (certo em parte, falta ressalva), **NÃO VERIFICADO**.

---

## 1. Números de mercado

| Afirmação | O que o arquivo diz | O que a fonte diz | Veredito | URL |
|---|---|---|---|---|
| Frontend BR por hora | Sênior R$ 180 a 380 (mediana R$ 250) | Júnior R$ 50 a 120 (mediana 80); pleno R$ 100 a 220 (mediana 150); sênior R$ 180 a 380 (mediana 250). Página sem data, só "Brasil 2026" | CONFIRMADO | https://www.lancei.pro/benchmark/desenvolvedor-frontend |
| Backend BR por hora | Sênior R$ 200 a 420 (mediana R$ 280); pleno R$ 100 a 240 | Pleno R$ 110 a 240 (mediana 160); sênior R$ 200 a 420 (mediana 280); especialista R$ 350 a 650 (mediana 450) | CONFIRMADO ("pleno R$ 100 a 240" é a união das duas tabelas, ok) | https://www.lancei.pro/benchmark/desenvolvedor-backend |
| Pleno BR mediana (seção 3.4) | R$ 150 a 160/h | 150 (front) e 160 (back) | CONFIRMADO | idem |
| Freelancer Online (hora, MVP, retainer) | Sênior R$ 180 a 400/h, pleno R$ 100 a 180/h; MVP sênior R$ 30 a 80 mil, pleno R$ 15 a 30 mil; retainer sênior R$ 8 a 20 mil, pleno R$ 4 a 8 mil | Exatamente esses valores; o artigo diz que são "pontos de partida", não tetos | CONFIRMADO | https://www.freelanceronline.com.br/blog/quanto-cobrar-como-freelancer-tabela-de-precos-e-como-calcular-em-2026/ |
| Clutch (agências web) | US$ 25 a 49/h; EUA/Canadá US$ 100 a 149/h; projeto médio US$ 66.499; "tipicamente abaixo de US$ 10.000"; mensal US$ 7.139; 9 meses; atualizado 21/09/2026 | Idêntico (US$ 66.499,09; US$ 7.138,93; "Updated September 21, 2026") | CONFIRMADO | https://clutch.co/web-developers/pricing |
| Groovy Web, hora de consultoria de IA | US$ 75 a 350/h "freelancer a boutique"; offshore US$ 25 a 75/h | Freelancer US$ 75 a 150 (Layer3) e até 150 a 350 (Alice Labs); boutique US$ 125 a 250 (Layer3), 150 a 350 (AY Automate), **250 a 500 (Alice Labs)**; offshore 25 a 75 | CORRIGIR: o teto é **US$ 500/h** (R$ 2.515), não 350 | https://www.groovyweb.co/blog/ai-consulting-rates-2026 |
| Groovy Web, MVP e manutenção | MVP US$ 5 a 25 mil; manutenção US$ 2.500 a 15.000/mês; desconto de retainer 10 a 20% | Idêntico; atualizado 07/10/2026 | CONFIRMADO | idem |
| Taskip, setup e retainer | Pequena: setup US$ 1.500 a 5.000, mensal 500 a 1.500; mid-market: 5.000 a 20.000 e 1.500 a 4.000; assinatura base 1.500 a 4.000; US$ 1.200 + US$ 45/lead | Idêntico; atualizado 18/08/2026. O exemplo de assinatura é US$ 1.800 com até 10 entregas + US$ 140 por excedente | CONFIRMADO | https://taskip.net/ai-automation-agency-pricing/ |
| Taskip, "bônus de 5% sobre meta" (seção 3.5 item 4) | Usado para justificar "5% da receita digital acima de R$ 10.000/mês" | O exemplo é **modelo híbrido**: US$ 2.000/mês + bônus de 5% quando o cliente passa uma meta de receita. Não é participação percentual contínua na receita | IMPRECISO: a proposta do arquivo é revenue share, mais agressiva que o exemplo citado | idem |
| ManyRequests, faixas produtizadas | Projetos US$ 500 a 5.000; retainers 1.500 a 10.000; ilimitado 3.000 a 15.000; agência tradicional 20 a 25% de entrada | Idêntico | CONFIRMADO | https://www.manyrequests.com/blog/productized-service-guide |
| Designjoy | US$ 4.995/mês; 1 pedido por vez; 48 h; pausa; ciclos de 31 dias; Trello; transfere o site | Idêntico, mas US$ 4.995 é **desconto vitalício por tempo limitado**; preço cheio US$ 5.995 | IMPRECISO: citar os dois valores (R$ 25.125 e R$ 30.155) | https://www.designjoy.co/ |
| Tabela de dev subscriptions (Figue) | Unlimited Dev £ 995 (2 pedidos £ 3.195); AsyncForge € 2.000; Flowlyn € 2.800 (€ 4.500); Awesomic US$ 2.995; XHTMLTEAM US$ 1.499 (US$ 2.499); PoketDev US$ 5.995; Figue € 1.990/slot | Todos conferem (AsyncForge e Figue são sem VAT; PoketDev tem US$ 4.995 no plano anual) | CONFIRMADO | https://www.figue.ai/en/blog/best-unlimited-development-subscriptions |
| AppzJoy US$ 3.997/mês | Listado na tabela 1.2 junto com os da Figue | **Não aparece** no artigo da Figue | NÃO VERIFICADO: retirar ou achar a fonte própria | idem |
| Conversões USD para BRL | R$ 126 a 246; 377 a 1.761; 334.490; 35.909; 25.125; 15.065; 7.540; 30.155; 20.105 | Refeitas a 5,03: todas batem (arredondamento de centavos) | CONFIRMADO | conta própria |
| IOF cartão internacional | 3,5% "de memória, verificar" | 3,5% pelo Decreto 12.466, de 22/05/2025; o Congresso derrubou e o STF restabeleceu (antes era 3,38%) | CONFIRMADO (retirar o "verificar"; citar o decreto) | https://www2.camara.leg.br/legin/fed/decret/2025/decreto-12466-22-maio-2025-797486-normaatualizada-pe.pdf |
| Spread bancário 4 a 6%; taxa de MSP 10 a 20% | Estimativa | Sem fonte nesta rodada | NÃO VERIFICADO | |

## 2. Preços dos provedores (base da calculadora)

| Afirmação | O que o arquivo diz | O que a fonte diz | Veredito | URL |
|---|---|---|---|---|
| Cloudflare Stream | US$ 5 por 1.000 min armazenados (pré-pago), US$ 1 por 1.000 min entregues, encoding e ingest grátis | Idêntico. Além disso: **assistir live conta como minuto entregue**; cobrança de entrega WebRTC começa em 15/10/2026; sem storage não dá para subir vídeo nem iniciar live | CONFIRMADO, mas a calculadora ignora o minuto entregue das lives (ver seção 4) | https://developers.cloudflare.com/stream/pricing/ |
| Bunny Stream | Storage a partir de US$ 0,01/GB/região; entrega a partir de US$ 0,005/GB (Volume); Standard cerca de US$ 0,03/GB; mínimo US$ 1 | Página confirma "a partir de" 0,01 e 0,005, até 8 regiões, mínimo US$ 1; exemplo da calculadora: 300 GB + 50 GB de tráfego = US$ 4,50 (Standard) e US$ 3,25 (Volume), o que dá 0,03 e 0,005/GB | CONFIRMADO para a página de Stream | https://bunny.net/pricing/stream/ |
| Bunny para aluno no Brasil | Exemplos usam só Volume (US$ 0,005/GB); "trocar de tier muda o egress em cerca de 6 vezes" | Página de CDN: Standard (119 PoPs) Europa/América do Norte US$ 0,01; Ásia 0,03; **América do Sul US$ 0,045/GB**; Volume tem só **10 PoPs** e preço global 0,005 (sem lista de PoPs; não dá para afirmar que há PoP no Brasil) | CORRIGIR: para público brasileiro na rede Standard a diferença é de **9 vezes** (0,045/0,005), não 6. Exemplo 1 em Standard América do Sul: **US$ 42,93 (R$ 216)**, não US$ 6,80; exemplo 2: **US$ 1.038,65 (R$ 5.224)**, não US$ 136. A página de CDN não diz se o Stream usa a mesma tabela por região: confirmar com o Bunny | https://bunny.net/pricing/cdn/ |
| Mux | Storage US$ 0,003/min/mês (1080p); entrega US$ 0,001/min após 100.000 grátis; Plus US$ 0,03125/min; crédito de US$ 20; plano Launch US$ 20 com US$ 100 de crédito | Storage, entrega, 100.000 min e crédito de US$ 20 confirmados. **Live usa Plus por padrão, input US$ 0,03125/min** (confirmado). 720p mais barato, 2K/4K mais caro (sem valor publicado). Plano Launch **não aparece** na página atual | CONFIRMADO, exceto plano Launch (NÃO VERIFICADO) | https://www.mux.com/pricing e https://www.mux.com/pricing.md |
| Mux, entrega de live | Não considerado | Página: "minutos entregues de live = minutos de live x espectadores simultâneos médios" | CORRIGIR: falta no modelo | idem |
| Cloudflare R2 | US$ 0,015/GB/mês, 10 GB grátis, Classe A US$ 4,50/milhão, Classe B US$ 0,36/milhão, egress grátis | Idêntico, e ainda **1 milhão de Classe A e 10 milhões de Classe B grátis por mês** | IMPRECISO: faltam as franquias de operações (na escala do IAE, Classe B tende a ficar dentro dos 10 milhões grátis) | https://developers.cloudflare.com/r2/pricing/ |

## 3. Contas de capacidade, preço por dia e faturamento

| Afirmação | O que o arquivo diz | Conta refeita | Veredito | URL |
|---|---|---|---|---|
| Capacidade até o MVP | 36 h/semana x 6 semanas = cerca de 215 h = 27 pessoa-dias | 36 x 6 = 216 h = 27 pd. 20/10 a 30/11 tem 41 dias (5,9 semanas): 211 h | CONFIRMADO | conta própria |
| Cenário Recomendado "cabe no limite" | 25 a 30 pd, "usa quase toda a capacidade" | Capacidade máxima é 27 pd sem folga. 30 pd **excede em 3 pd (24 h)**; só o piso de 25 pd cabe, com 2 pd de folga | CORRIGIR: dizer "cabe só no piso da estimativa; no teto estoura cerca de 1 semana" | conta própria |
| R$/h do Enxuto | R$ 14.000 / 12 a 15 pd, "cerca de R$ 130/h" | 96 a 120 h: R$ 117 a 146/h (R$ 933 a 1.167 por dia de 8 h) | CONFIRMADO | conta própria |
| R$/h do Recomendado | R$ 28.000 / 25 a 30 pd, "R$ 120 a 140/h" | 200 a 240 h: R$ 117 a 140/h (R$ 933 a 1.120 por dia) | CONFIRMADO | conta própria |
| R$/h do Premium | R$ 55 a 70 mil / 50 a 65 pd, "cerca de R$ 130/h" | 400 a 520 h: R$ 106 a 175/h (faixa larga); ponto médio 62.500/460 h = R$ 136/h | IMPRECISO: dar a faixa R$ 106 a 175/h | conta própria |
| Comparação com o mercado | "R$ 28.000 é preço de entrada, abaixo do valor-hora sênior" | R$ 117 a 140/h fica **abaixo também da mediana de pleno** (R$ 150 front, R$ 160 back) e perto do piso de pleno. Por dia de 8 h: nosso R$ 933 a 1.120 contra pleno mediano R$ 1.200 a 1.280 e sênior mediano R$ 2.000 a 2.240 | CORRIGIR: o setup está em preço de **pleno baixo**, não "logo abaixo do sênior". Pelo mediano sênior, 200 a 240 h custariam R$ 50.000 a 67.200 (conta do arquivo confirmada) | Lancei |
| Ciclo R$ 1.000 e R$ 2.000 | 12 a 15 h: R$ 67 a 83/h e R$ 133 a 167/h | Confirmado. R$ 2.000 = R$ 1.067 a 1.333 por dia de 8 h | CONFIRMADO | conta própria |
| Mensalização | R$ 2.000/semana = R$ 8.667/mês (US$ 1.723); R$ 1.500 = R$ 6.500 (US$ 1.292) | 2.000 x 52 / 12 = 8.667; /5,03 = 1.723. 1.500 x 52 / 12 = 6.500; /5,03 = 1.292 | CONFIRMADO | conta própria |
| "No piso das dev subscriptions internacionais" | R$ 8.667 (US$ 1.723) | Fica acima de £ 995 e de US$ 1.499 (XHTMLTEAM), abaixo de € 1.990 em diante. Mas essas assinaturas vendem dedicação de tempo integral a 1 pedido; nosso ciclo é 12 a 15 h | IMPRECISO: comparação de preço sem normalizar horas | Figue |
| Planos Ritmo e Intenso | R$ 3.800 (5% off) e R$ 7.200 (10% off) | 4.000 x 0,95 = 3.800; 8.000 x 0,90 = 7.200 | CONFIRMADO | conta própria |
| Faturamento IAE | Conservador R$ 80.000; Base R$ 175.640; Otimista R$ 378.800 | 4 x 10 x 2.000 = 80.000; + 60.000 + 35.640 = 175.640; + 180.000 + 118.800 = 378.800 | CONFIRMADO (as contas; as premissas são inventadas, como o próprio arquivo diz) | conta própria |
| Custo 12 meses por pacote e % | 56.100 / 89.900 / 70.100 / 81.600 e percentuais | Todos os totais e percentuais conferem (ex.: 70.100 / 378.800 = 18,5% arredonda para 19%) | CONFIRMADO | conta própria |
| "Ideia do Pedro é cara para o cliente e barata para nós" | 52 x R$ 1.500 = R$ 78.000 | A conta bate, mas a comparação não é de mesma entrega: 52 ciclos = 624 a 780 h de trabalho, contra 464 a 570 h no pacote Recomendado (200 a 240 h de setup + 22 ciclos de 12 a 15 h). Em R$/h: Pedro R$ 100 a 125/h; ciclos do Recomendado R$ 127 a 158/h. Além disso a linha do Pedro usa 52 semanas, as outras usam 11 meses de recorrência | IMPRECISO: o argumento certo é "o modelo semanal puro paga menos por hora e não separa investimento de continuidade", não que ele é mais caro para o cliente pelo que entrega | conta própria |
| "Infra entre R$ 40 e 400/mês contra R$ 1.500 a 9.000 do serviço" | Seção 7.4 | Exemplo 1: Bunny Volume R$ 34, Mux R$ 0 (sem lives) ou cerca de R$ 103 (com as lives padrão); Bunny Standard Brasil R$ 216; Cloudflare R$ 392 (R$ 501 com as lives). Serviço: R$ 1.500 + até R$ 7.200 = R$ 8.700 | IMPRECISO: faixa de infra fica R$ 0 a cerca de 500/mês | conta própria |

## 4. Calculadora: fórmulas e dimensões

| Afirmação | O que o arquivo diz | O que a conta mostra | Veredito | URL |
|---|---|---|---|---|
| Conversão Mbps para GB/h | GB/h = Mbps x 0,45 | 1 Mbps x 3.600 s = 3.600 Mb = 450 MB = 0,45 GB (GB decimal, que é como Bunny e R2 cobram) | CONFIRMADO | conta própria |
| Tabela GB/h por degrau | 0,27 / 0,68 / 1,35 / 2,70 / 5,40 | Coerente com os bitrates (0,675 arredondado para 0,68). Bitrates são estimativa | CONFIRMADO (como conta) | conta própria |
| GB armazenado por hora (ladder 1080p) | 230 GB para 100 h | 0,27 + 0,68 + 1,35 = 2,30 GB/h | CONFIRMADO. Ressalva: o Bunny pode guardar também o arquivo original, o que soma mais um "degrau" ao storage (não verificado) | conta própria |
| GB entregue por hora (mix 1080p) | 903 GB para 800 h | 0,05 x 0,27 + 0,25 x 0,68 + 0,70 x 1,35 = 1,1285 GB/h; 800 h = 902,8 GB | CONFIRMADO | conta própria |
| Exemplos 7.4 (Cloudflare, Bunny Volume, Mux) | US$ 78; 6,80; 0; e US$ 1.500; 136; 1.260 | Refeitos: 78,00; 6,81; 0 (18 menos crédito de 20); 1.500; 135,85; 1.260 | CONFIRMADO, mas só sem lives | conta própria |
| Exemplo 1 com as entradas padrão | Mux "cerca de US$ 0" | Com os padrões da própria calculadora (4 lives x 3 h), o código soma live = 720 min x 0,03125 = US$ 22,50; total 18 + 22,50 menos 20 = **US$ 20,50 (R$ 103)** | CORRIGIR: o exemplo não usa os padrões declarados em 7.1 | conta própria |
| Degraus de qualidade | 1080p para 1440p: storage cerca de 2,2x, egress cerca de 1,4x; 1440p para 2160p: storage cerca de 2x | 5,00/2,30 = 2,17; 1,567/1,1285 = 1,39; 10,40/5,00 = 2,08 | CONFIRMADO | conta própria |
| Degrau Mux | 100.000 min = 1.667 h = cerca de 417 alunos a 4 h | 1.666,7 / 4 = 416,7 | CONFIRMADO | conta própria |
| Recursão | `calcular` chama `infraAcumulada`, que chama `calcular` com `_semAcumulado: true` | Nenhuma linha lê `_semAcumulado`: **recursão infinita** (estouro de pilha) na primeira chamada. O arquivo admite isso só num comentário | CORRIGIR: separar `custoInfra(e)` pura e usar só ela no acumulado | pseudocódigo |
| Entrada `participantesLive` | Declarada em 7.1 | **Nunca usada** no código. Falta a entrega das lives: minutos entregues = horasLive x 60 x participantes. Com os padrões: 12 h x 60 x 30 = 21.600 min/mês = +US$ 21,60 no Cloudflare; no Mux entra na franquia de 100.000 min junto com o VOD; no Bunny e R2, + 360 h x GB/h | CORRIGIR | Cloudflare e Mux pricing |
| Gravação de live no storage | Comentário "gravação entra no storage do mês seguinte" | Não somado: `infraAcumulada` só soma `horasNovasMes`, não `horasLive`. Com os padrões são +12 h/mês de catálogo | CORRIGIR | Cloudflare pricing |
| Mux, storage por resolução | Fixo em US$ 0,003 (1080p) | Mux cobra diferente por resolução (720p menor, 2K/4K maior, sem valor publicado); a seleção `qualidadeMax` não afeta o Mux | IMPRECISO: marcar o Mux como "só 1080p" na tela | mux.com/pricing |
| Mux, transcoding Plus de VOD | `transcoding: 0` (Basic) | `horasNovasMes` não entra no custo mensal de nenhum provedor; se usar Plus, faltam horasNovasMes x 60 x 0,03125 | IMPRECISO | mux.com/pricing |
| `maiorComponente` | Compara storage, egress, live | Ignora `transcoding` e `opsExtra`; no Mux com Plus o transcoding pode ser o maior | IMPRECISO | pseudocódigo |
| Bunny regiões e tier | `egress: gbEntreg * 0.005` fixo | Falta a entrada de tier/região de entrega; para aluno no Brasil o Standard custa 0,045/GB | CORRIGIR: adicionar `tierBunny` (Volume 0,005 / Standard América do Sul 0,045) | bunny.net/pricing/cdn |
| R2 operações | `opsExtra: 0` | Faltam as franquias (1 milhão A, 10 milhões B grátis). Ordem de grandeza: 800 h com segmentos HLS de 6 s = 480.000 GETs/mês, dentro da franquia | IMPRECISO (inofensivo na escala do IAE) | r2/pricing |
| SETUP premium | 62.000 | Ponto médio de 55.000 a 70.000 é 62.500 | IMPRECISO (diferença pequena) | conta própria |
| Setup no acumulado | `SETUP + m x (sust + ciclos) + infraAcumulada` | Dimensões batem (R$); mas a infra acumulada é BRL e o mês 0 começa em `horasArmazenadas`, ok. Não modela crescimento de alunos, só de catálogo | CONFIRMADO, com essa limitação | pseudocódigo |

## 5. Afirmações jurídicas

| Afirmação | O que o arquivo diz | O que a fonte diz | Veredito | URL |
|---|---|---|---|---|
| LGPD, controlador e operador | Art. 5º VI e VII; art. 39 (operador segue instruções) | Texto confere: controlador "a quem competem as decisões"; operador "realiza o tratamento em nome do controlador"; art. 39 idem | CONFIRMADO | https://www2.camara.leg.br/legin/fed/lei/2018/lei-13709-14-agosto-2018-787077-normaatualizada-pl.html |
| LGPD art. 42 | Operador responde solidariamente quando descumpre a lei ou as instruções | Art. 42, §1º, I: idem, equiparando-se ao controlador, ressalvado o art. 43 | CONFIRMADO | idem |
| LGPD art. 46 e 48 | Medidas de segurança; controlador comunica ANPD e titular | Confere. Art. 48 §1º fala em "prazo razoável, conforme definido pela autoridade nacional". O prazo do operador para avisar o controlador (24 a 48 h) é escolha contratual, não lei | CONFIRMADO. Faltou citar o regulamento da ANPD de comunicação de incidentes (Res. CD/ANPD 15/2024, prazo de 3 dias úteis para o controlador, **de memória, não verificado na fonte**), que justifica avisar o IAE em 24 h | idem |
| "Conta no nome do IAE; Bunny e Cloudflare são suboperadores; nós operador" | Seção 4.2 e tabela do contrato | Se o IAE contrata o provedor direto no CNPJ dele, o provedor é **operador do IAE**, contratado pelo controlador, e não suboperador nosso. Suboperador é quem o operador contrata | CORRIGIR: chamar de "operadores contratados diretamente pelo IAE"; a lista de suboperadores no DPA vale só para o que **nós** contratarmos (ex.: chave de IA na nossa conta, ferramentas de monitoramento) | conceito do art. 5º |
| Res. CD/ANPD 19/2024 | Transferência internacional e cláusulas-padrão | Confirmada: 23/08/2024, regulamento de transferência internacional com cláusulas-padrão; prazo de 12 meses para incorporar, **vencido em 23/08/2025**; as cláusulas devem ser adotadas sem alteração | CONFIRMADO. Acrescentar que o prazo de adaptação já acabou, então é preciso checar se cada provedor já incorporou as cláusulas da ANPD | https://www.migalhas.com.br/depeso/415220/anpd-aprova-o-regulamento-de-transferencia-internacional-de-dados |
| Lei 9.609, art. 4º | Salvo estipulação em contrário, o software feito sob contrato de serviços pertence ao contratante | Confere com a redação conhecida ("pertencerão exclusivamente ao empregador, contratante de serviços ou órgão público"), verificada só em fonte secundária. O §3º reforça a cláusula proposta: o que for criado sem relação com o contrato e sem recursos do contratante fica com o autor | CONFIRMADO (fonte secundária; Planalto fora do ar) | https://www.qconcursos.com/questoes-de-concursos/questoes/4bc27efb-66 |
| Código Civil arts. 593 a 609 | Prestação de serviços | De memória: o capítulo vai do 593 ao 609. Faltou o **art. 598**: contrato de prestação de serviço não pode passar de 4 anos. Afeta a sustentação se alguém propuser prazo longo | NÃO VERIFICADO na fonte (Câmara respondeu 429); acrescentar o art. 598 | |
| Multa de 2% + juros de 1% ao mês | Cláusula de atraso | O teto de 2% é do CDC (relação de consumo) e não se aplica entre empresas; usar 2% é convenção, não obrigação. Juros de 1% ao mês são livres entre pessoas jurídicas desde a Lei 14.905/2024, que afastou a Lei de Usura nesses contratos. **Pressupõe que nós temos CNPJ**: com os sócios como pessoas físicas, a Lei de Usura volta a valer | IMPRECISO: registrar que é preciso abrir a empresa antes de assinar | https://www.migalhas.com.br/depeso/412021/juros-e-atualizacao-monetaria-no-cc-brasileiro-lei-14-905-24-no-cc |
| Retenções pela associação | "Em geral não muda nossa tributação" | Optante do Simples fica dispensado das retenções federais de IR, PIS, Cofins e CSLL, mas o **ISS pode ser retido** pelo tomador conforme a lei do município (Rio de Janeiro). De memória | NÃO VERIFICADO (busca esgotada); confirmar com o contador | |
| Simples Nacional 6% a 15,5% | Estimativa, depende de anexo e Fator R | Coerente com a faixa inicial dos Anexos III (6%) e V (15,5%). Desenvolvimento sob encomenda depende do Fator R (folha, incluindo pró-labore, de pelo menos 28% da receita). Sócios CLT sem pró-labore puxam para o **Anexo V, 15,5%** | IMPRECISO: o cenário provável é 15,5%, não a faixa toda. De memória | |
| Associação sem fins lucrativos | Pedir estatuto e ata para conferir poderes | Correto como prática. "Sem fins lucrativos" não impede o IAE de vender cursos nem de contratar serviços; o desconto de fundador não depende disso | CONFIRMADO (prática; sem fonte específica) | |

---

## 10 correções mais importantes

1. **Calculadora com recursão infinita**: `_semAcumulado` nunca é lido; separar uma função pura `custoInfra(e)`.
2. **Bunny para público brasileiro**: Standard América do Sul é US$ 0,045/GB (9 vezes o Volume). Exemplo 1 vira US$ 42,93 (R$ 216) e exemplo 2 US$ 1.038,65 (R$ 5.224), contra US$ 6,80 e US$ 136 no arquivo. O Volume tem só 10 PoPs sem garantia de PoP no Brasil.
3. **Lives sem entrega**: `participantesLive` não é usado; com os padrões faltam 21.600 min/mês (US$ 21,60 no Cloudflare; 360 h x GB/h no Bunny).
4. **Exemplo do Mux com as entradas padrão** dá US$ 20,50 (R$ 103), não US$ 0, por causa das lives em Plus (US$ 22,50).
5. **Setup Recomendado não "cabe no limite"**: 30 pd passa da capacidade máxima de 27 pd; só o piso de 25 pd cabe.
6. **Setup a R$ 117 a 140/h está abaixo da mediana de pleno** (R$ 150 a 160/h), não só abaixo do sênior (R$ 250 a 280/h). Por dia: R$ 933 a 1.120 contra R$ 1.200 a 1.280 (pleno) e R$ 2.000 a 2.240 (sênior).
7. **LGPD**: com as contas no CNPJ do IAE, Bunny, Cloudflare e Supabase são operadores do IAE, não suboperadores nossos.
8. **Groovy Web**: teto de consultoria de IA é US$ 500/h (Alice Labs, boutique), não US$ 350/h.
9. **IOF confirmado em 3,5%** (Decreto 12.466/2025, restabelecido pelo STF); e a Res. ANPD 19/2024 tem prazo de adaptação já vencido em 23/08/2025.
10. **Comparação com a ideia do Pedro** mistura entregas diferentes: 52 ciclos são 624 a 780 h de trabalho a R$ 100 a 125/h; o pacote Recomendado entrega 464 a 570 h. Juros de 1% ao mês e multa de 2% só ficam livres se tivermos CNPJ (Lei 14.905/2024).

## Pendências

- Lei 9.609 e Código Civil no Planalto (fora do ar) e na Câmara (429): art. 4º conferido só em fonte secundária; art. 598 (limite de 4 anos) de memória.
- Res. CD/ANPD 15/2024 (prazo de 3 dias úteis para comunicar incidente): busca esgotada, de memória.
- AppzJoy (US$ 3.997): não está no artigo da Figue; fonte não encontrada.
- Mux plano Launch (US$ 20 com US$ 100 de crédito): não aparece na página atual.
- Se o Bunny Stream cobra a entrega pela tabela regional da CDN (América do Sul 0,045) ou pelo valor único da página de Stream; se a rede Volume tem PoP no Brasil.
- Se o Bunny Stream cobra armazenamento do arquivo original além das renditions.
- Spread bancário (4 a 6%), taxa de MSP (10 a 20%), Simples Nacional e retenção de ISS no Rio: sem fonte nesta rodada (busca esgotada).
- Lancei não mostra data de atualização da tabela.
