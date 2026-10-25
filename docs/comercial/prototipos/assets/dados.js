/* Dados fictícios para a demonstração. Nenhum aluno, venda, escritório ou
   parceiro aqui é real; os nomes do IAE (Gustavo Costa, Ana Luiza Lima,
   Vinicius Almeida, Helena Lannes) aparecem nos papéis que já têm. */
(function(){
'use strict';

/* ---------- as quatro fases, na ordem do plano de ação enviado ao IAE ---------- */
var FASES = [
  { n:1, curto:'Primeira versão', nome:'Primeira versão',
    quando:'Ao fim da implementação, com o curso de 5 h já no ar',
    resumo:'O aluno compra, entra e assiste. O IAE edita tudo sozinho pelo painel.' },
  { n:2, curto:'Turmas e aulas curtas', nome:'Turmas, aulas curtas e certificado',
    quando:'Antes da venda da turma online de março',
    resumo:'Turmas com data de início e aula liberada no dia, gravação do Zoom entrando sozinha na turma certa, aulas curtas avulsas e certificado com código.' },
  { n:3, curto:'Melhorias da lista', nome:'Demais melhorias',
    quando:'Uma por sexta, na ordem de prioridade que o IAE deu',
    resumo:'Clube de membros com os benefícios dos parceiros, venda para escritórios, comunidade, assistente de IA, números e a aula ao vivo dentro da plataforma.' },
  { n:4, curto:'Por gatilho', nome:'Fase 3, por gatilho',
    quando:'Quando o gatilho de cada item acontecer',
    resumo:'Trilha com pré-requisito e histórico, edição automática da aula crua, proteção reforçada do vídeo.' }
];

/* o que cada fase acrescenta; papel: aluno, admin ou escritorio; rota leva à tela */
var FEATS = [
  // fase 1
  {f:1, p:'aluno', i:'mail', t:'Entrar com link por e-mail', d:'Sem senha para esquecer. Também pelo Google.', r:'#/aluno/entrar'},
  {f:1, p:'aluno', i:'book', t:'Catálogo e página do curso', d:'Marca do IAE, ementa, professores em dupla, carga horária e depoimentos.', r:'#/aluno/curso/in-house'},
  {f:1, p:'aluno', i:'card', t:'Compra vitalícia por Pix e cartão', d:'Acesso liberado na hora. Cartão em até 12x.', r:'#/aluno/checkout/in-house'},
  {f:1, p:'aluno', i:'tag', t:'Bolsa da UERJ aplicada no pagamento', d:'Pelo e-mail institucional, além de cupons.', r:'#/aluno/checkout/in-house'},
  {f:1, p:'aluno', i:'play', t:'Player protegido até 1080p', d:'360p, 720p ou 1080p conforme a internet, velocidade e nome do aluno na tela.', r:'#/aluno/aula/orcamento/3'},
  {f:1, p:'aluno', i:'home', t:'Continuar de onde parou', d:'Em qualquer tela, com o progresso do curso sempre visível.', r:'#/aluno/inicio'},
  {f:1, p:'aluno', i:'live', t:'Aula ao vivo por link do Zoom', d:'Um link por aluno, dentro da plataforma, para quem está no Rio ou em São Paulo. A gravação vira aula.', r:'#/aluno/ao-vivo'},
  {f:1, p:'aluno', i:'shield', t:'Perfil e dados pessoais', d:'Pagamentos, consentimento, exportar e excluir dados.', r:'#/aluno/perfil'},
  {f:1, p:'admin', i:'layers', t:'Painel de conteúdo', d:'Cursos, módulos, aulas, textos e vídeos, sem depender da equipe.', r:'#/admin/curso/orcamento'},
  {f:1, p:'admin', i:'upload', t:'Vídeo escolhido e publicado pelo painel', d:'O Operador converte no computador e sobe para o R2; o admin escolhe e publica.', r:'#/admin/curso/orcamento'},
  {f:1, p:'admin', i:'live', t:'Agenda ao vivo e gravação publicada pelo painel', d:'Link do Zoom por aluno; a gravação entra no curso com um clique.', r:'#/admin/ao-vivo'},
  {f:1, p:'admin', i:'users', t:'Alunos e acessos', d:'Quem comprou, o que assiste e liberação manual.', r:'#/admin/alunos'},
  {f:1, p:'admin', i:'card', t:'Vendas', d:'Pix, cartão e boleto pelo Asaas.', r:'#/admin/vendas'},
  {f:1, p:'admin', i:'tag', t:'Cupons e bolsas', d:'UERJ pelo e-mail institucional; cupons com validade e limite.', r:'#/admin/cupons'},
  {f:1, p:'admin', i:'mail', t:'E-mails automáticos', d:'Boas-vindas, compra, acesso liberado e lembrete de aula.', r:'#/admin/emails'},
  // fase 2
  {f:2, p:'aluno', i:'calendar', t:'Turmas com data de início', d:'Cada encontro libera no dia, e cada turma tem seus alunos e seu calendário.', r:'#/aluno/turma'},
  {f:2, p:'aluno', i:'clock', t:'Aulas curtas de 30 a 40 min', d:'Compra avulsa em 1 clique para quem já é aluno.', r:'#/aluno/aulas-curtas'},
  {f:2, p:'admin', i:'clock', t:'Aulas curtas', d:'Preço avulso por aula.', r:'#/admin/aulas-curtas'},
  {f:2, p:'admin', i:'refresh', t:'Gravação do Zoom publicada sozinha', d:'O Zoom avisa, o script do Operador converte e a aula entra no curso.', r:'#/admin/ao-vivo'},
  {f:2, p:'aluno', i:'award', t:'Certificado com código de verificação', d:'PDF com QR Code e página pública de validação.', r:'#/aluno/certificados'},
  // fase 3
  {f:3, p:'aluno', i:'star', t:'Clube de membros com assinatura', d:'Mensal ou anual, convivendo com os cursos comprados.', r:'#/aluno/clube'},
  {f:3, p:'aluno', i:'gift', t:'Benefícios e parcerias', d:'UERJ, OAB Rio e parceiros, com código para o membro.', r:'#/aluno/beneficios'},
  {f:3, p:'admin', i:'star', t:'Clube: planos e assinantes', d:'Quem assina, o que está incluído e quem está em atraso.', r:'#/admin/clube'},
  {f:3, p:'admin', i:'gift', t:'Benefícios do clube', d:'Parceiros, ofertas e códigos.', r:'#/admin/beneficios'},
  {f:3, p:'escritorio', i:'building', t:'Venda para escritórios', d:'Assentos, convite por e-mail, progresso da equipe e fatura.', r:'#/escritorio/painel'},
  {f:3, p:'aluno', i:'message', t:'Comunidade dos membros', d:'Fórum por curso e por turma, sem feed social.', r:'#/aluno/comunidade'},
  {f:3, p:'admin', i:'file', t:'Nota fiscal automática', d:'Emitida pelo Asaas a cada venda.', r:'#/admin/vendas'},
  {f:3, p:'aluno', i:'play', t:'Funil da aula gratuita', d:'Página, formulário e aula aberta; o lead vai para o CRM.', r:'#/publico/aula-aberta'},
  {f:3, p:'admin', i:'plug', t:'CRM Nexoris e Google Analytics', d:'Lead e compra chegam sozinhos aos dois.', r:'#/admin/integracoes'},
  {f:3, p:'aluno', i:'spark', t:'Assistente com a base do IAE', d:'Responde citando a aula e o minuto.', r:'#/aluno/aula/orcamento/3?aba=assistente'},
  {f:3, p:'aluno', i:'message', t:'Dúvidas em cada aula', d:'O professor responde; o admin modera.', r:'#/aluno/aula/orcamento/3?aba=duvidas'},
  {f:3, p:'admin', i:'chart', t:'Painel de números', d:'Vendas, alunos ativos, conclusão e onde o aluno para.', r:'#/admin/numeros'},
  {f:3, p:'aluno', i:'search', t:'Legenda, transcrição e busca na aula', d:'Geradas no computador do Operador. Clique na frase e o vídeo vai para o minuto.', r:'#/aluno/aula/orcamento/3?aba=transcricao'},
  {f:3, p:'aluno', i:'search', t:'Busca no catálogo', d:'Por título, professor e tema.', r:'#/aluno/cursos'},
  {f:3, p:'aluno', i:'live', t:'Aula ao vivo dentro da plataforma', d:'Sem abrir o Zoom; presença registrada.', r:'#/aluno/sala'},
  // fase 4
  {f:4, p:'aluno', i:'route', t:'Trilha com pré-requisito e histórico', d:'Base para a pós com instituição parceira. Gatilho: convênio assinado.', r:'#/aluno/trilha'},
  {f:4, p:'admin', i:'route', t:'Montagem da trilha', d:'Ordem, pré-requisitos e oferta por período.', r:'#/admin/trilhas'},
  {f:4, p:'admin', i:'scissors', t:'Edição automática da aula crua', d:'A IA propõe cortes, capítulos e resumo; o admin aprova.', r:'#/admin/edicao'},
  {f:4, p:'admin', i:'server', t:'Proteção reforçada do vídeo', d:'Link assinado em cada pedaço do vídeo. DRM só com vazamento.', r:'#/admin/video'}
];

/* ---------- pessoas ---------- */
var PROFS = {
  gustavo:{nome:'Gustavo Costa', ini:'GC', cor:'', bio:'Presidente do IAE. Quase 30 anos no jurídico da White Martins.'},
  ana:{nome:'Ana Luiza Lima', ini:'AL', cor:'sand', bio:'Sócia do IAE.'},
  rafael:{nome:'Rafael Monteiro', ini:'RM', cor:'cocoa', bio:'Diretor jurídico de uma varejista nacional. Professor convidado (fictício).'},
  beatriz:{nome:'Beatriz Carvalho', ini:'BC', cor:'sand', bio:'Gerente jurídica de contratos na indústria. Professora convidada (fictícia).'}
};

var ALUNA = { nome:'Mariana Teixeira', ini:'MT', email:'mariana.teixeira@gmail.com', marca:'Mariana Teixeira · mar***@gmail.com',
  cargo:'Advogada no jurídico de uma indústria de embalagens' };

/* ---------- cursos ---------- */
var CURSOS = [
  { id:'orcamento', titulo:'Orçamento e gestão do jurídico interno', cv:'cv-navy', horas:'5 h', aulasN:5, publico:'Já está em empresa', tema:'Gestão',
    profs:['gustavo','ana'], preco:'R$ 690', parcelas:'em até 6x', comprado:true, progresso:46,
    lede:'Como o jurídico de uma empresa monta o orçamento do ano, conversa com o financeiro e mostra o próprio valor para a diretoria.',
    modulos:[
      {t:'O jurídico dentro da empresa', aulas:[
        {n:1, t:'Onde o jurídico aparece no organograma', d:'52:10', st:'done'},
        {n:2, t:'Quem decide o quê: jurídico, financeiro e suprimentos', d:'61:40', st:'done'} ]},
      {t:'O orçamento do ano', aulas:[
        {n:3, t:'Provisões e contingências no orçamento', d:'58:12', st:'cur', pos:'23:14'},
        {n:4, t:'Escritório externo: quanto contratar e como medir', d:'64:05', st:'todo'} ]},
      {t:'Mostrando valor', aulas:[
        {n:5, t:'Indicadores que a diretoria lê', d:'49:30', st:'todo', gravada:'Gravada em 12/11/2026'} ]}
    ]},
  { id:'in-house', titulo:'Advocacia in-house na prática', cv:'cv-cocoa', horas:'24 h', aulasN:8, publico:'Recém-formados', tema:'Carreira',
    profs:['gustavo','rafael'], preco:'R$ 2.000', parcelas:'em até 12x de R$ 166,67', comprado:false,
    lede:'O curso que o IAE dá no Centro do Rio, agora online: 8 encontros de 3 horas sobre como pensa, decide e trabalha o jurídico de uma empresa.',
    modulos:[
      {t:'Encontro 1: o que faz um jurídico interno', aulas:[{n:1,t:'A empresa como cliente único',d:'1:32:00'},{n:2,t:'O dia a dia de um gerente jurídico',d:'1:28:00'}]},
      {t:'Encontro 2: contratos que a empresa assina', aulas:[{n:3,t:'Da minuta à assinatura',d:'1:35:00'},{n:4,t:'Negociar com o comercial do outro lado',d:'1:25:00'}]},
      {t:'Encontro 3: contencioso de massa', aulas:[{n:5,t:'Gestão de carteira e acordos',d:'1:30:00'},{n:6,t:'Provisão e risco',d:'1:30:00'}]},
      {t:'Encontro 4: compliance e governança', aulas:[{n:7,t:'Canal de denúncias e investigações',d:'1:30:00'},{n:8,t:'O jurídico no conselho',d:'1:30:00'}]},
      {t:'Encontros 5 a 8', aulas:[{n:9,t:'Trabalhista, tributário, societário e carreira',d:'12:00:00'}]}
    ]},
  { id:'fornecedores', titulo:'Contratos com fornecedores', cv:'cv-blue', horas:'24 h', aulasN:8, publico:'Já está em empresa', tema:'Contratos',
    profs:['gustavo','beatriz'], preco:'R$ 2.000', parcelas:'em até 12x de R$ 166,67', comprado:true,
    lede:'Contrato de fornecimento do pedido de compra ao encerramento: cláusulas que importam, negociação com suprimentos e gestão do contrato vivo.',
    modulos:[{t:'Encontros 1 a 8', aulas:[{n:1,t:'Do pedido de compra ao contrato',d:'3:00:00'}]}]},
  { id:'transicao', titulo:'Do escritório para a empresa', cv:'cv-sand', horas:'12 h', aulasN:4, publico:'Vindo de escritório', tema:'Carreira',
    profs:['ana','rafael'], preco:'R$ 1.200', parcelas:'em até 12x de R$ 100', comprado:true,
    lede:'Para quem sai do escritório e chega à empresa: hierarquia, orçamento, prazo do negócio e a linguagem que os outros departamentos falam.',
    modulos:[{t:'Encontros 1 a 4', aulas:[{n:1,t:'O choque dos primeiros 90 dias',d:'3:00:00'}]}]},
  { id:'cabeca', titulo:'A cabeça do cliente corporativo', cv:'cv-ink', horas:'8 h', aulasN:2, publico:'Escritórios', tema:'Relacionamento',
    profs:['gustavo','ana'], preco:'R$ 900', parcelas:'por pessoa, ou por assentos para o escritório', comprado:false, b2b:true,
    lede:'Duas sessões de 4 horas para o escritório entender quem decide a contratação, como o orçamento do cliente funciona e onde suprimentos entra.',
    modulos:[{t:'Sessões 1 e 2', aulas:[{n:1,t:'Quem decide a contratação',d:'4:00:00'},{n:2,t:'Orçamento, RFP e suprimentos',d:'4:00:00'}]}]}
];

var CURTAS = [
  { id:'c1', titulo:'Como montar o orçamento anual do jurídico', d:'38 min', prof:'gustavo', cv:'cv-navy', preco:'R$ 97', comprada:false },
  { id:'c2', titulo:'Contratar escritório externo em 5 passos', d:'32 min', prof:'rafael', cv:'cv-rose', preco:'R$ 97', comprada:true },
  { id:'c3', titulo:'Jurídico e suprimentos: quem decide o quê', d:'35 min', prof:'beatriz', cv:'cv-blue', preco:'R$ 97', comprada:false },
  { id:'c4', titulo:'Os primeiros 90 dias como advogado in-house', d:'34 min', prof:'ana', cv:'cv-sand', preco:'R$ 97', comprada:false },
  { id:'c5', titulo:'Indicadores do jurídico que a diretoria lê', d:'40 min', prof:'gustavo', cv:'cv-cocoa', preco:'R$ 97', comprada:false }
];

var AO_VIVO = [
  { dia:'18', mes:'NOV', sem:'qua', hora:'19h às 22h', t:'Contratos com fornecedores, encontro 3', profs:['gustavo','beatriz'], curso:'fornecedores', hoje:true },
  { dia:'25', mes:'NOV', sem:'qua', hora:'19h às 22h', t:'Contratos com fornecedores, encontro 4', profs:['gustavo','beatriz'], curso:'fornecedores' },
  { dia:'02', mes:'DEZ', sem:'qua', hora:'19h às 20h30', t:'Aula aberta: o que faz um jurídico interno', profs:['gustavo','ana'], aberta:true },
  { dia:'09', mes:'DEZ', sem:'qua', hora:'19h às 22h', t:'Orçamento do jurídico: plantão de dúvidas', profs:['gustavo','ana'], curso:'orcamento' }
];

/* ---------- a aula 3, com slides e legenda sincronizados ---------- */
function s(m, sec){ return m * 60 + (sec || 0); }
var AULA = {
  curso:'orcamento', n:3, titulo:'Provisões e contingências no orçamento', dur:s(58,12), inicio:s(23,14),
  slides:[
    {at:0, k:'MÓDULO 2 · AULA 3', t:'Provisões e contingências no orçamento', b:[]},
    {at:s(4,20), k:'PONTO DE PARTIDA', t:'O que a diretoria quer ouvir', b:['Quanto o jurídico vai custar no ano','Quanto pode sair do caixa por causa de processos','Com que grau de confiança você afirma isso']},
    {at:s(12,40), k:'CONCEITOS', t:'Provável, possível e remoto', b:['Provável: entra na provisão contábil','Possível: aparece em nota explicativa','Remoto: acompanha, não reserva']},
    {at:s(19,30), k:'NA PRÁTICA', t:'Montando a planilha de contingências', b:['Uma linha por processo relevante, com valor e chance','Revisão trimestral com o escritório externo','O número final é seu, não do escritório']},
    {at:s(27,10), k:'CONVERSA COM O FINANCEIRO', t:'Provisão não é orçamento', b:['Provisão reserva o risco; orçamento paga a operação','Honorários de êxito entram onde?','Combine o calendário de fechamento']},
    {at:s(36,0), k:'ERROS COMUNS', t:'Onde o jurídico perde credibilidade', b:['Mudar a classificação sem fato novo','Repetir o número do escritório sem crítica','Surpreender o financeiro no fim do trimestre']},
    {at:s(45,30), k:'EXERCÍCIO', t:'Sua carteira em cinco linhas', b:['Escolha os cinco maiores processos','Classifique e justifique em uma frase','Traga para o plantão de dúvidas']},
    {at:s(54,0), k:'PRÓXIMA AULA', t:'Escritório externo: quanto contratar e como medir', b:[]}
  ],
  legendas:[
    [s(19,32), s(19,39), 'Agora vamos para a parte que mais dá trabalho, que é montar a planilha.'],
    [s(19,40), s(19,48), 'E eu digo planilha de propósito, porque no começo não precisa de sistema nenhum.'],
    [s(20,5), s(20,13), 'Uma linha por processo relevante. Relevante é o que mexe no resultado do ano.'],
    [s(20,14), s(20,22), 'Em cada linha: valor envolvido, a chance de perda e quem é o escritório responsável.'],
    [s(21,0), s(21,9), 'A revisão é trimestral, junto com o escritório externo, antes do fechamento contábil.'],
    [s(21,10), s(21,18), 'E aqui vai o ponto que eu mais repito em sala de aula.'],
    [s(21,19), s(21,27), 'O número final é seu. Não é do escritório, não é do financeiro. É do jurídico.'],
    [s(22,40), s(22,48), 'O escritório conhece o processo. Você conhece a empresa e o apetite de risco dela.'],
    [s(22,49), s(22,58), 'Quando o escritório diz possível e você sabe que o cliente quer fechar acordo, muda tudo.'],
    [s(23,10), s(23,18), 'Na White Martins a gente fazia essa reunião sempre na segunda semana do trimestre.'],
    [s(23,19), s(23,27), 'Assim dava tempo de corrigir antes de o financeiro fechar os números.'],
    [s(23,30), s(23,38), 'Ana Luiza, você quer contar aquele caso da provisão que mudou na véspera?'],
    [s(23,40), s(23,48), 'Conto. Era uma ação trabalhista coletiva que todo mundo tratava como remota.'],
    [s(23,49), s(23,57), 'Saiu uma decisão em outro tribunal na sexta, e na segunda a chance já era outra.'],
    [s(23,58), s(24,6), 'Se o jurídico espera o escritório mandar o relatório, perde a janela do fechamento.'],
    [s(24,7), s(24,14), 'Então a regra é simples: fato novo, você avisa o financeiro no mesmo dia.'],
    [s(24,20), s(24,28), 'E sem fato novo, você não muda a classificação. Isso é o que dá credibilidade.'],
    [s(25,0), s(25,9), 'Vamos ver como fica isso numa planilha de verdade, com cinco processos de exemplo.'],
    [s(25,10), s(25,18), 'Primeiro processo: indenização de um fornecedor, dois milhões, chance possível.'],
    [s(25,19), s(25,27), 'Possível não entra na provisão, mas entra na nota explicativa do balanço.'],
    [s(26,0), s(26,8), 'Segundo: carteira de consumidor. Aqui o que importa é a média histórica de acordo.'],
    [s(26,9), s(26,17), 'Você não provisiona processo por processo, provisiona a carteira.'],
    [s(27,12), s(27,20), 'Agora, um erro que eu vejo toda hora: achar que provisão é orçamento.'],
    [s(27,21), s(27,29), 'Provisão reserva o risco. Orçamento paga a operação do jurídico.'],
    [s(27,30), s(27,39), 'Honorário de escritório, custas, perito. Isso é orçamento, e precisa estar no plano do ano.'],
    [s(28,0), s(28,8), 'E honorário de êxito? Esse é o que mais gera discussão com o financeiro.'],
    [s(28,9), s(28,18), 'A gente combinava assim: se a chance de êxito é provável, entra no orçamento do ano.'],
    [s(29,0), s(29,8), 'Por último, combine o calendário de fechamento com o financeiro logo em janeiro.']
  ]
};
/* aulas: "orcamento" é o curso de 5 h que já existe; as demais são ilustrativas */

/* ---------- assistente de IA (fase 3): respostas prontas, sempre citando aula e minuto ---------- */
var IA = [
  { chaves:['provável','possivel','possível','remoto','classific'],
    p:'Qual a diferença entre provável, possível e remoto?',
    r:'Na aula 3, o Gustavo explica que só o risco provável entra na provisão contábil. O possível aparece em nota explicativa do balanço, e o remoto você acompanha sem reservar valor. A classificação só muda com fato novo.',
    c:[[s(12,40),'Aula 3 · 12:40'],[s(25,19),'Aula 3 · 25:19'],[s(24,20),'Aula 3 · 24:20']] },
  { chaves:['êxito','exito','honor'],
    p:'Honorário de êxito entra no orçamento?',
    r:'Segundo a aula 3, o combinado com o financeiro era: se a chance de êxito é provável, o honorário entra no orçamento do ano. Honorário fixo, custas e perito são sempre orçamento, não provisão.',
    c:[[s(28,0),'Aula 3 · 28:00'],[s(27,30),'Aula 3 · 27:30']] },
  { chaves:['escritório','escritorio','externo','contratar'],
    p:'Quem dá o número final, o escritório ou o jurídico?',
    r:'O número final é do jurídico. O escritório conhece o processo, e o jurídico conhece a empresa e o apetite de risco dela. A revisão é trimestral, junto com o escritório, antes do fechamento.',
    c:[[s(21,19),'Aula 3 · 21:19'],[s(22,40),'Aula 3 · 22:40']] },
  { chaves:['quando','calendário','calendario','fechamento','trimestre'],
    p:'Quando fazer a revisão das contingências?',
    r:'Na segunda semana do trimestre, como fazia o Gustavo na White Martins, para dar tempo de corrigir antes de o financeiro fechar. E o calendário de fechamento se combina em janeiro.',
    c:[[s(23,10),'Aula 3 · 23:10'],[s(29,0),'Aula 3 · 29:00']] }
];

var DUVIDAS = [
  { quem:'Pedro Albuquerque', ini:'PA', quando:'há 2 dias', at:s(21,19),
    p:'Na minha empresa o financeiro exige o número do escritório. Como convencer de que o número é do jurídico?',
    r:{quem:'Gustavo Costa', ini:'GC', t:'Mostre a revisão trimestral documentada. Quando o financeiro vê que o jurídico critica o número do escritório com método, ele passa a confiar no seu. Comece pelos cinco maiores processos.'} },
  { quem:'Luíza Fontes', ini:'LF', quando:'há 5 dias', at:s(26,9),
    p:'Carteira de consumidor com 3 mil processos: a média histórica de acordo é do último ano ou dos últimos três?',
    r:{quem:'Ana Luiza Lima', ini:'AL', t:'Dos últimos três anos, ajustada se houve mudança de política de acordo. Vamos tratar disso no plantão de 09/12.'} },
  { quem:'Caio Ramos', ini:'CR', quando:'há 1 semana', at:s(28,9),
    p:'Existe modelo da planilha de contingências para baixar?', r:null }
];

/* ---------- admin ---------- */
var ALUNOS = [
  { nome:'Mariana Teixeira', email:'mariana.teixeira@gmail.com', cursos:'Orçamento do jurídico', ult:'hoje, 08:12', prog:46, clube:'Anual', turma:'', empresa:'' },
  { nome:'Pedro Albuquerque', email:'pedro.alb@outlook.com', cursos:'Orçamento do jurídico', ult:'ontem', prog:80, clube:'Mensal', turma:'', empresa:'' },
  { nome:'Luíza Fontes', email:'luiza.fontes@uerj.br', cursos:'Orçamento do jurídico', ult:'há 3 dias', prog:62, clube:'', turma:'', empresa:'', bolsa:'UERJ' },
  { nome:'Caio Ramos', email:'caio.ramos@gmail.com', cursos:'Orçamento do jurídico', ult:'há 1 semana', prog:20, clube:'Mensal', turma:'', empresa:'' },
  { nome:'Renata Siqueira', email:'renata.s@gmail.com', cursos:'Advocacia in-house na prática', ult:'hoje, 07:40', prog:12, clube:'', turma:'Online SP 2027.1', empresa:'' },
  { nome:'Thiago Moura', email:'thiago@bmlaw.com.br', cursos:'A cabeça do cliente corporativo', ult:'ontem', prog:50, clube:'', turma:'', empresa:'Barros Moura Advogados' },
  { nome:'Júlia Andrade', email:'julia.andrade@gmail.com', cursos:'Advocacia in-house na prática', ult:'há 2 dias', prog:35, clube:'Anual', turma:'Online SP 2027.1', empresa:'' }
];
var VENDAS = [
  { quando:'15/11 · 10:42', quem:'Júlia Andrade', o:'Advocacia in-house na prática', meio:'Cartão 12x', v:'R$ 2.000,00', st:'Pago', nf:'NFS-e 000412' },
  { quando:'15/11 · 09:05', quem:'Caio Ramos', o:'Clube IAE mensal', meio:'Cartão recorrente', v:'R$ 99,00', st:'Pago', nf:'NFS-e 000411', f:3 },
  { quando:'14/11 · 21:18', quem:'Luíza Fontes', o:'Orçamento do jurídico · bolsa UERJ 50%', meio:'Pix', v:'R$ 345,00', st:'Pago', nf:'NFS-e 000410' },
  { quando:'14/11 · 18:30', quem:'Pedro Albuquerque', o:'Aula curta: escritório externo', meio:'Pix', v:'R$ 97,00', st:'Pago', nf:'NFS-e 000409', f:2 },
  { quando:'14/11 · 11:02', quem:'Renata Siqueira', o:'Advocacia in-house na prática', meio:'Pix', v:'R$ 2.000,00', st:'Aguardando', nf:'' },
  { quando:'13/11 · 16:47', quem:'Barros Moura Advogados', o:'A cabeça do cliente corporativo · 10 assentos', meio:'Boleto', v:'R$ 7.200,00', st:'Pago', nf:'NFS-e 000408', f:3 },
  { quando:'12/11 · 08:15', quem:'Mariana Teixeira', o:'Clube IAE anual', meio:'Cartão 12x', v:'R$ 990,00', st:'Pago', nf:'NFS-e 000407', f:3 }
];

window.IAE = { FASES:FASES, FEATS:FEATS, PROFS:PROFS, ALUNA:ALUNA, CURSOS:CURSOS, CURTAS:CURTAS, AO_VIVO:AO_VIVO, AULA:AULA, IA:IA, DUVIDAS:DUVIDAS, ALUNOS:ALUNOS, VENDAS:VENDAS };
})();
