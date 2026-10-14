# Agente B (parte 2): funcionalidades, pagamentos no Brasil e UX sem tutorial

Data da pesquisa: 13/10/2026. Cotação usada: **USD 1 = R$ 5,03** (AwesomeAPI, 13/10/2026).
Escopo: itens 4, 5 e 6 do Agente B do PROMPT.md. Os itens 1 a 3 (referências, LMS prontos, Matt Pocock e Jack Roberts) são de outro arquivo.

Nota de método: o orçamento de buscas na web desta sessão acabou no meio da pesquisa (limite compartilhado entre os agentes). Daí em diante, só abri páginas oficiais diretamente. Os portais do MEC e do Planalto não responderam (ENOTFOUND e ECONNRESET). Por isso, a parte regulatória (MEC e tributária) vem de conhecimento prévio e está marcada como **a verificar** na seção Confiança.

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
| 19 | Agenda de aulas ao vivo (lista, botão "adicionar ao calendário" .ics) | Fácil | A | 1 | 29 | MVP |
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
| 30 | Transcrição automática das aulas (Whisper) e legendas geradas | Médio | A | 3 | 41 | Fase 2 |
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
| 52 | Edição automática de aula crua (corte de silêncios e erros, capítulos, resumo, cortes curtos) | Difícil | M | 10 a 15 | 30, 41 | Fase 3 (guardada na manga) |
| 53 | App nativo iOS e Android com download offline | Difícil | B | 15 ou mais | 41, 44 (offline pede DRM) | Fase 3 (PWA cobre o começo) |

### 4.3 Somatório por fase

| Fase | Itens | Esforço (dias-pessoa) | Observação |
|---|---|---|---|
| MVP (até dez/2026) | 1 a 20 (menos o 21), 22 a 28, 41, 42 | cerca de 48 | Cabe em 7,5 semanas com os três em paralelo, se o vídeo for serviço gerenciado |
| Fase 2 (1º sem. 2027) | 21, 29 a 40, 43, 45 a 47 | cerca de 60 | O tutor de IA (31) e o ao vivo integrado (29) concentram o risco |
| Fase 3 (2º sem. 2027 em diante) | 44, 48 a 53 | cerca de 60, mais a parceria acadêmica | Depende de decisão de negócio e regulatória, não só de código |

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

---

## 5. Pagamentos no Brasil

### 5.1 Tabela de taxas vigentes

Valores das páginas oficiais acessadas em 13/10/2026, exceto onde marcado. Taxas são padrão de balcão: volume maior negocia.

| Gateway | Pix | Boleto | Cartão à vista | Parcelado (até 12x) | Recorrência / assinatura | Antecipação | Mensalidade | Nota fiscal | Split |
|---|---|---|---|---|---|---|---|---|---|
| **Asaas** (oficial) | R$ 1,99 por Pix (R$ 0,99 nos 3 primeiros meses) | R$ 1,99 (R$ 0,99 promo) | 2,99% + R$ 0,49 | 2-6x: 3,49% + R$ 0,49; 7-12x: 3,99% + R$ 0,49 (sobre o total); até 21x Visa/Master: 4,29% | Assinatura nativa (cartão, Pix, boleto) e **Pix Automático**; mesmas taxas (a FAQ cita 1,99%, conflito na própria página) | Cartão 1,25% a.m. (a FAQ cita 1,70% a.m. para parcelado); boleto a partir de 5,79% a.m. | Zero | **NFS-e integrada, R$ 0,49 por nota** | Sim (via API, sem taxa informada) |
| **Pagar.me / Stone** (oficial, oferta Essencial) | 0,99% | Não informado na página | 4,19% | 6x: 13,63%; 12x: 20,95% (recebimento D+1, ou seja, já com antecipação embutida) | Sim (API de assinaturas) | Configurável, embutida no D+1 | Zero (Essencial) | Não nativa | Sim (cartão, boleto e Pix) |
| **Stripe** (oficial) | 1,19% (**só por convite**); limite de R$ 3.000 por Pix | R$ 3,45 | 3,99% + R$ 0,39 | **Não documentado para o Brasil** (a doc de parcelamento lista só México, Japão e Mastercard Installments) | Billing: +0,7% do volume; Smart Retries (padrão 8 tentativas em 2 semanas); **Pix Automático não disponível no Brasil** | Não informada | Zero | Não (Stripe Tax não consta para BR) | Sim (Connect, +0,25%) |
| **Mercado Pago** (terceiros; página oficial bloqueou o acesso) | 0,99% | R$ 3,49 | 4,98% a 4,99% na hora; 3,79% a 4,49% em 14 dias; 3,03% a 3,99% em 30 dias | Custo extra do vendedor; exemplo de terceiro: cerca de 17,8% em 12x | Assinaturas: recursos básicos, taxa não encontrada | Embutida na escolha de prazo | Zero | Não | Limitado |
| **Vindi** (oficial) | 0,95%, mínimo R$ 1,60 | R$ 2,99 | A partir de 2,75% (30 dias) ou 3,25% (14 dias), mais R$ 0,39 de processamento | Tabela de jun/2025: até +2,99% por parcela | Especialista em recorrência; retentativa automática no plano Premium | Até 7% a.m. (tabela jun/2025) | **R$ 299 (Essential), R$ 499 (Pro, com API e split), R$ 1.119 (Premium)** | Integra com emissores (custo à parte) | Plano Pro em diante |
| **Iugu** (sem tabela oficial pública) | Revendedor: R$ 1,50 | Revendedor: R$ 2,50 | Revendedor: 2,19% + R$ 0,75 (D+31) | Não encontrado | Recorrência nativa, inclusive Pix Automático | Cobrada à parte | Plano mensal (valor no painel) | NFS-e disponível na plataforma (custo não encontrado) | Sim |
| **Hotmart como gateway** (estimativa, página oficial fora do ar) | Taxa única por venda: cerca de 9,9% + R$ 1,00 | idem | idem | Juros do parcelamento pagos pelo comprador (padrão da plataforma) | Assinaturas nativas | Saque e antecipação com regras próprias | Zero | A Hotmart emite nota da parte dela; o produtor emite a sua | Coprodução e afiliados |

### 5.2 Simulação: quanto o IAE paga por venda

Tickets usados: curso de **R$ 2.000** (citado na reunião) e assinatura do clube de **R$ 99/mês** (premissa nossa, ainda não definida pelo IAE). Valores em reais. A linha da Hotmart é estimativa.

| Gateway | Curso R$ 2.000 por Pix | Curso à vista no cartão | Curso 12x (IAE absorve, recebendo antecipado) | Assinatura R$ 99 no cartão | Custo fixo mensal |
|---|---|---|---|---|---|
| Asaas | 1,99 | 60,29 | 80,29 + antecipação (cerca de 6,5 meses × 1,25% a 1,70% = 8% a 11%, ou R$ 160 a R$ 220) | 3,45 | 0 |
| Pagar.me | 19,80 | 83,80 | 419,00 (já recebendo em D+1) | 4,15 | 0 |
| Stripe | 23,80 (se convidado) | 80,19 | Não disponível | 4,98 (3,99% + 0,39 + 0,7% Billing) | 0 |
| Mercado Pago | 19,80 | 99,60 (na hora) ou 60,60 (30 dias) | Cerca de 357 (estimativa de terceiro) | 3,00 a 4,93 | 0 |
| Vindi | 19,00 | 55,39 (30 dias) | Não calculável sem tabela vigente | 3,11 | 299 a 1.119 |
| Hotmart (estimativa) | 199,00 | 199,00 | 199,00 (o comprador paga os juros) | 10,80 | 0 |

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
  - Asaas e Vindi têm retentativa nativa (na Vindi, no plano Premium).
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

---

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

## Confiança

**Fato verificado (página oficial aberta em 13/10/2026):**
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

**Estimativa ou fonte secundária:**
- Taxas do Mercado Pago (blogs e calculadoras; a página oficial devolveu 403).
- Taxas da Iugu (revendedor).
- Taxa da Hotmart (9,9% + R$ 1, de conhecimento prévio; a página oficial não carregou).
- Tabela de parcelamento e antecipação da Vindi (PDF de jun/2025).
- Custo de antecipação na simulação.
- Todos os esforços em dias.
- O ticket de assinatura de R$ 99.
- O MCC recomendado.
- A tabela de padrões das plataformas de curso (observação prévia, sem navegação hoje).

**A verificar (sem acesso hoje, conhecimento prévio):**
- Requisitos da Resolução CNE/CES 1/2018 (360 h, 30% de mestres e doutores, quem pode ofertar).
- Efeito do Decreto 12.456/2025 sobre lato sensu EaD.
- Toda a subseção 5.6 (imunidade, isenções, COFINS/PIS, NFS-e da entidade imune no Rio, padrão nacional da NFS-e, efeitos da reforma tributária).
- Data de início do Pix Automático.

**Sem resposta:**
- Taxa de boleto e de recorrência do Pagar.me.
- Tabela oficial da Iugu.
- Taxas de assinatura do Mercado Pago.
- Taxa oficial vigente da Hotmart.
- Se a Asaas permite repassar juros do parcelamento ao comprador de forma nativa (assumi cálculo pela plataforma).
- Exigência exata da prefeitura do Rio para NFS-e de entidade imune.
- Sinal forte da comunidade nos últimos 30 dias sobre Circle, Skool e Hotmart Club (amostra pequena e fontes parciais).

## Fontes

Todas acessadas em 13/10/2026.

- https://stripe.com/br/pricing
- https://docs.stripe.com/payments/pix
- https://docs.stripe.com/payments/installments
- https://docs.stripe.com/billing/revenue-recovery/smart-retries
- https://www.asaas.com/precos-e-taxas
- https://docs.asaas.com/docs/assinaturas
- https://docs.asaas.com/docs/pix-automatico
- https://pagar.me/precos/
- https://www.pagar.me/ofertas
- https://pagarme.helpjuice.com/pt_BR/p1-saques-recebimentos-e-antecipa%C3%A7%C3%A3o/antecipa%C3%A7%C3%A3o-o-que-%C3%A9-antecipa%C3%A7%C3%A3o
- https://vindi.com.br/precos/
- https://www.pagamentos.vindi.com.br/assets/contratos/tabela-de-tarifas.pdf (tabela de 27/06/2025)
- https://atendimento.vindi.com.br/hc/pt-br/articles/12114248534171
- https://www.iugu.com/iugu-recorrencia
- https://support.iugu.com/hc/pt-br/articles/360056021752-Onde-localizo-as-taxas-cobradas-por-transa%C3%A7%C3%A3o
- https://edvan.com.br/iuguboleto (taxas de revendedor, não oficiais)
- https://sellsync.ai/pt/blog/taxa-mercado-pago-2026-guia-completo/ (secundária)
- https://www.calculadoradetaxas.com.br/mercado-pago/taxas (secundária, maquininhas)
- https://mindconsulting.com.br/2026/07/gateways-pagamento-online-brasil-comparativo-2026/ (secundária, jul/2026)
- https://www.skool.com/pricing
- https://www.nngroup.com/articles/onboarding-tutorials/
- https://www.nngroup.com/articles/mobile-app-onboarding/
- https://www.nngroup.com/articles/empty-state-interface-design/
- https://www.nngroup.com/articles/progressive-disclosure/
- https://x.com/wbcomdesigns/status/2109505089228439940 (via last30days, coleta parcial)
- Arquivo bruto do last30days: ~/Documents/Last30Days/skool-circle-hotmart-club-course-community-platform-ux-raw-v3.md
- Cotação: AwesomeAPI, USD 1 = R$ 5,03 (13/10/2026, valor fornecido pelo orquestrador)
