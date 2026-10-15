/* Protótipo navegável da Plataforma de cursos do IAE.
   Uma base só para as quatro fases: cada fase-N.html define window.FASE e
   tudo o que entra a partir de uma fase aparece daquela fase em diante. */
(function(){
'use strict';
var D = window.IAE, F = Math.max(1, Math.min(4, window.FASE || 1));
var app = document.getElementById('app');
var $ = function(s, el){ return (el || document).querySelector(s); };
var $$ = function(s, el){ return Array.prototype.slice.call((el || document).querySelectorAll(s)); };
var has = function(f){ return F >= f; };
var esc = function(s){ return String(s).replace(/[&<>"']/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); };
var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- marca ---------- */
document.body.insertAdjacentHTML('afterbegin', window.IAE_SPRITE || '');
(function(){
  var p = document.getElementById('p-mark');
  if (!p) return;
  var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 484 240"><path fill-rule="evenodd" d="' + p.getAttribute('d') + '"/></svg>';
  document.documentElement.style.setProperty('--mark', 'url("data:image/svg+xml,' + encodeURIComponent(svg) + '")');
})();
var logo = function(id, cls){ return '<svg class="' + (cls || '') + '" viewBox="' + (id === 'assinatura' ? '0 0 776 290' : '0 0 484 240') + '" aria-hidden="true"><use href="#' + (id || 'marca') + '"/></svg>'; };

/* ---------- ícones (traço único, 24 px) ---------- */
var IC = {
  home:'<path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
  book:'<path d="M5 4.5A1.5 1.5 0 0 1 6.5 3H19v15H6.5A1.5 1.5 0 0 0 5 19.5zM5 19.5A1.5 1.5 0 0 0 6.5 21H19v-3"/><path d="M9 7h6"/>',
  live:'<circle cx="12" cy="12" r="2.2"/><path d="M8.2 8.2a5.4 5.4 0 0 0 0 7.6M15.8 8.2a5.4 5.4 0 0 1 0 7.6M5.4 5.4a9.3 9.3 0 0 0 0 13.2M18.6 5.4a9.3 9.3 0 0 1 0 13.2"/>',
  users:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 4.7a3.5 3.5 0 0 1 0 6.6M18 14.2a6.5 6.5 0 0 1 3.5 5.8"/>',
  user:'<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  play:'<path d="M8 5.5v13l10.5-6.5z" fill="currentColor" stroke="none"/>',
  pause:'<path d="M8 5v14M16 5v14" stroke-width="2.6"/>',
  cc:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M10.5 10.2a2.2 2.2 0 1 0 0 3.6M17 10.2a2.2 2.2 0 1 0 0 3.6"/>',
  gear:'<circle cx="12" cy="12" r="3"/><path d="M12 2.8v2.4M12 18.8v2.4M2.8 12h2.4M18.8 12h2.4M5.5 5.5l1.7 1.7M16.8 16.8l1.7 1.7M5.5 18.5l1.7-1.7M16.8 7.2l1.7-1.7"/>',
  max:'<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>',
  vol:'<path d="M4 9h4l5-4v14l-5-4H4z"/><path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12"/>',
  back:'<path d="M4.5 12a7.5 7.5 0 1 0 2.2-5.3L4.5 9M4.5 4.5V9H9"/>',
  fwd:'<path d="M19.5 12a7.5 7.5 0 1 1-2.2-5.3L19.5 9M19.5 4.5V9H15"/>',
  check:'<path d="m5 12.5 4.2 4.2L19 7"/>',
  lock:'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
  chev:'<path d="m9 6 6 6-6 6"/>',
  chevl:'<path d="m15 6-6 6 6 6"/>',
  chevd:'<path d="m6 9 6 6 6-6"/>',
  upload:'<path d="M12 16V4M7 9l5-5 5 5"/><path d="M4 15v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4"/>',
  calendar:'<rect x="3.5" y="5" width="17" height="15.5" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
  mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 6.5 8.5 7 8.5-7"/>',
  card:'<rect x="2.5" y="5" width="19" height="14" rx="2"/><path d="M2.5 10h19M6 15h4"/>',
  tag:'<path d="M3 12V4a1 1 0 0 1 1-1h8l9 9-9 9z"/><circle cx="7.5" cy="7.5" r="1.4"/>',
  gift:'<rect x="3" y="8" width="18" height="5" rx="1"/><path d="M5 13v7h14v-7M12 8v12M12 8S10.5 3.5 8 4.5 9 8 12 8zM12 8s1.5-4.5 4-3.5S15 8 12 8z"/>',
  star:'<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="11" r="2.2"/><path d="M5.8 16.2a3.4 3.4 0 0 1 6.4 0M14.5 10h4M14.5 13.5h3"/>',
  clock:'<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
  shield:'<path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.4 7.5 9.5 4.3-1.1 7.5-4.9 7.5-9.5V6z"/>',
  layers:'<path d="m12 3 9 5-9 5-9-5z"/><path d="m3 13 9 5 9-5"/>',
  refresh:'<path d="M20 11a8 8 0 0 0-14.3-4.9L4 8M4 4v4h4M4 13a8 8 0 0 0 14.3 4.9L20 16M20 20v-4h-4"/>',
  building:'<path d="M4 21V5a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v16M15 9h4a1 1 0 0 1 1 1v11M3 21h18M8 8h3M8 12h3M8 16h3"/>',
  message:'<path d="M4 5h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H9l-5 4V6a1 1 0 0 1 1-1z"/>',
  file:'<path d="M6 3h8l5 5v12a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"/><path d="M14 3v5h5M8.5 13h7M8.5 17h5"/>',
  plug:'<path d="M9 3v5M15 3v5M6 8h12v3a6 6 0 0 1-12 0zM12 17v4"/>',
  spark:'<path d="M4 5h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H9l-5 4V6a1 1 0 0 1 1-1z"/><path d="M9.8 9.3a2.3 2.3 0 1 1 3.1 2.1c-.5.2-.9.6-.9 1.2v.2M12 15.3v.1"/>',
  award:'<circle cx="12" cy="9" r="6"/><path d="m8.6 13.8-1.6 7.2 5-2.6 5 2.6-1.6-7.2"/>',
  chart:'<path d="M4 20V4M4 20h16M8.5 16v-5M13 16V8M17.5 16v-3"/>',
  route:'<circle cx="6" cy="19" r="2"/><circle cx="18" cy="5" r="2"/><path d="M8 19h8.5a3.5 3.5 0 0 0 0-7h-9a3.5 3.5 0 0 1 0-7H16"/>',
  scissors:'<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M8.1 8.1 20 20M8.1 15.9 20 4"/>',
  server:'<rect x="3" y="4" width="18" height="7" rx="1.5"/><rect x="3" y="13" width="18" height="7" rx="1.5"/><path d="M7 7.5h.01M7 16.5h.01" stroke-width="2.6"/>',
  x:'<path d="M6 6l12 12M18 6 6 18"/>',
  plus:'<path d="M12 5v14M5 12h14"/>',
  grip:'<path d="M9 6h.01M15 6h.01M9 12h.01M15 12h.01M9 18h.01M15 18h.01" stroke-width="2.8"/>',
  eye:'<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  logout:'<path d="M15 4h4a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-4M10 17l5-5-5-5M15 12H3"/>',
  bell:'<path d="M6 16v-5a6 6 0 0 1 12 0v5l2 2H4z"/><path d="M10 20a2 2 0 0 0 4 0"/>',
  link:'<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
  ext:'<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
  info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
  hand:'<path d="M8 13V5.5a1.5 1.5 0 0 1 3 0V11M11 10V4.5a1.5 1.5 0 0 1 3 0V11M14 10.5V6a1.5 1.5 0 0 1 3 0v8a7 7 0 0 1-7 7h-.5a6 6 0 0 1-4.6-2.2L3 16.5a1.6 1.6 0 0 1 2.3-2.2L8 16"/>',
  mic:'<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>',
  cam:'<rect x="3" y="6" width="13" height="12" rx="2"/><path d="m16 10 5-3v10l-5-3"/>',
  send:'<path d="M4 12 20 4l-4 16-4-7z"/><path d="m12 13 8-9"/>',
  pix:'<path d="M12 3 21 12 12 21 3 12z"/><path d="m8.5 12 3.5-3.5 3.5 3.5-3.5 3.5z"/>',
  barcode:'<path d="M4 5v14M7 5v14M10 5v14M14 5v14M17 5v14M20 5v14"/>',
  copy:'<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3"/>',
  more:'<path d="M5 12h.01M12 12h.01M19 12h.01" stroke-width="2.8"/>',
  trash:'<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>',
  edit:'<path d="M4 20h4L19 9l-4-4L4 16z"/>',
  google:'<path d="M20.5 12.2c0-.6-.1-1.2-.2-1.8H12v3.4h4.8a4.1 4.1 0 0 1-1.8 2.7v2.2h2.9c1.7-1.6 2.6-3.9 2.6-6.5z"/><path d="M12 21c2.4 0 4.5-.8 5.9-2.2L15 16.6c-.8.5-1.8.9-3 .9-2.3 0-4.3-1.6-5-3.7H4v2.3A9 9 0 0 0 12 21z"/><path d="M7 13.8a5.4 5.4 0 0 1 0-3.6V7.9H4a9 9 0 0 0 0 8.2z"/><path d="M12 6.5c1.3 0 2.5.5 3.4 1.3l2.5-2.5A9 9 0 0 0 4 7.9l3 2.3c.7-2.1 2.7-3.7 5-3.7z"/>'
};
var ic = function(n, cls){ return '<svg class="ico ' + (cls || '') + '" viewBox="0 0 24 24" aria-hidden="true">' + (IC[n] || '') + '</svg>'; };
var novo = function(f){ return f === F && F > 1 ? ' <span class="novo">Novo</span>' : ''; };

/* ---------- estado ---------- */
var S = { pay:'pix', cupom:'', bolsa:false, upload:0, menu:false, aba:null, pubOk:{}, oneClick:{}, codes:{}, ai:[], aiBusy:false, sel:{}, sugOk:{}, mods:{0:true,1:true} };
try { S.mostrarNovo = localStorage.getItem('iae-proto-novo') !== '0'; } catch(e){ S.mostrarNovo = true; }
document.body.classList.toggle('mostrar-novo', S.mostrarNovo);

var curso = function(id){ return D.CURSOS.filter(function(c){ return c.id === id; })[0] || D.CURSOS[0]; };
var prof = function(id){ return D.PROFS[id]; };
var av = function(p, cls){ return '<span class="avatar ' + (p.cor || '') + ' ' + (cls || '') + '" aria-hidden="true">' + p.ini + '</span>'; };
var fmt = function(t){ t = Math.max(0, Math.floor(t)); var h = Math.floor(t / 3600), m = Math.floor(t % 3600 / 60), s = t % 60; return (h ? h + ':' + String(m).padStart(2, '0') : m) + ':' + String(s).padStart(2, '0'); };
var profsLine = function(c){ return c.profs.map(function(p){ return prof(p).nome; }).join(' e '); };

function cover(c, opt){
  opt = opt || {};
  return '<div class="cover ' + c.cv + (opt.short ? ' short' : '') + (opt.mini ? ' mini' : '') + (opt.sm ? ' sm' : '') + '"><div class="c-top"><span>IAE</span><span>' + (c.horas || c.d) + '</span></div><div><div class="c-rule"></div><div class="c-t">' + c.titulo + '</div></div></div>';
}

var toastT;
function toast(msg){
  var t = $('#toast'); t.innerHTML = ic('check') + '<span>' + msg + '</span>'; t.classList.add('on');
  clearTimeout(toastT); toastT = setTimeout(function(){ t.classList.remove('on'); }, 2600);
}

/* ---------- rotas ---------- */
function parse(){
  var h = location.hash.replace(/^#\/?/, '') || 'aluno/inicio';
  var q = {}, qi = h.indexOf('?');
  if (qi > -1){ h.slice(qi + 1).split('&').forEach(function(kv){ var p = kv.split('='); q[p[0]] = decodeURIComponent(p[1] || ''); }); h = h.slice(0, qi); }
  var parts = h.split('/').filter(Boolean);
  return { papel:parts[0] || 'aluno', tela:parts[1] || 'inicio', a:parts[2], b:parts[3], q:q };
}

var ROTAS = {
  aluno:{ inicio:[1,vInicio], cursos:[1,vCursos], curso:[1,vCurso], checkout:[1,vCheckout], confirmado:[1,vConfirmado], aula:[1,vAula], 'ao-vivo':[1,vAoVivo], perfil:[1,vPerfil], entrar:[1,vEntrar],
    clube:[2,vClube], assinar:[2,vAssinar], 'aulas-curtas':[2,vCurtas], beneficios:[2,vBeneficios],
    turma:[3,vTurma], comunidade:[3,vComunidade], certificados:[3,vCertificados], sala:[3,vSala], trilha:[4,vTrilha] },
  publico:{ 'aula-aberta':[3,vAulaAberta], validar:[3,vValidar] },
  admin:{ inicio:[1,aInicio], cursos:[1,aCursos], curso:[1,aCurso], 'ao-vivo':[1,aAoVivo], alunos:[1,aAlunos], vendas:[1,aVendas], cupons:[1,aCupons], emails:[1,aEmails],
    clube:[2,aClube], 'aulas-curtas':[2,aCurtas], beneficios:[2,aBeneficios],
    numeros:[3,aNumeros], turmas:[3,aTurmas], escritorios:[3,aEscritorios], comunidade:[3,aComunidade], assistente:[3,aAssistente], certificados:[3,aCertificados], funil:[3,aFunil], integracoes:[3,aIntegracoes],
    trilhas:[4,aTrilhas], edicao:[4,aEdicao], video:[4,aVideo] },
  escritorio:{ painel:[3,eEscritorio] }
};

function render(){
  stopPlayer();
  var r = parse(), grp = ROTAS[r.papel], rt = grp && grp[r.tela];
  if (!rt || rt[0] > F){
    var home = r.papel === 'admin' ? '#/admin/inicio' : (r.papel === 'escritorio' && has(3) ? '#/escritorio/painel' : '#/aluno/inicio');
    if (rt && rt[0] > F) setTimeout(function(){ toast('Esta tela entra na fase ' + rt[0] + '.'); }, 50);
    history.replaceState(null, '', home); r = parse(); grp = ROTAS[r.papel]; rt = grp[r.tela];
  }
  S.r = r; S.menu = false;
  document.title = 'IAE · Fase ' + F + ' · ' + (r.papel === 'admin' ? 'Admin' : r.papel === 'escritorio' ? 'Escritório' : 'Aluno');
  app.innerHTML = pbar(r) + rt[1](r);
  if (location.hash !== S.lastHash){ window.scrollTo(0, 0); S.lastHash = location.hash; }
  if (S.after){ var fn = S.after; S.after = null; fn(); }
}
window.addEventListener('hashchange', render);

/* ---------- barra de apresentação ---------- */
function pbar(r){
  var papel = r.papel === 'publico' ? 'aluno' : r.papel;
  var fases = D.FASES.map(function(f){
    return '<a href="fase-' + f.n + '.html' + location.hash + '" aria-current="' + (f.n === F) + '" title="' + f.nome + '"><span class="n">' + f.n + '</span><span class="lbl-long">' + f.curto + '</span></a>';
  }).join('');
  var vis = [['aluno','Aluno','#/aluno/inicio',1],['admin','Admin','#/admin/inicio',1],['escritorio','Escritório','#/escritorio/painel',3]].filter(function(v){ return has(v[3]); })
    .map(function(v){ return '<a href="' + v[2] + '" aria-current="' + (papel === v[0]) + '">' + v[1] + '</a>'; }).join('');
  return '<header class="pbar"><a class="pbar-home" href="index.html" title="Voltar à capa">' + logo('marca') + '<span>Protótipo</span></a><span class="pbar-sep"></span>' +
    '<nav class="seg" aria-label="Fase">' + fases + '</nav><nav class="seg" aria-label="Visão">' + vis + '</nav><span class="pbar-sp"></span>' +
    '<span class="pbar-fict">Dados e vídeos fictícios</span>' +
    (F > 1 ? '<button class="pbar-btn" data-act="tgNovo" aria-pressed="' + S.mostrarNovo + '">' + ic('eye','sm') + '<span class="lbl-long">Novidades</span></button>' : '') +
    '<button class="pbar-btn" data-act="drawer">' + ic('layers','sm') + '<span>O que entra na fase ' + F + '</span></button></header>';
}

function drawerHTML(){
  var f = D.FASES[F - 1], grupos = [['aluno','Para o aluno'],['admin','Para o IAE, no painel'],['escritorio','Para o escritório']];
  var cur = grupos.map(function(g){
    var it = D.FEATS.filter(function(x){ return x.f === F && x.p === g[0]; });
    if (!it.length) return '';
    return '<h3>' + g[1] + '</h3>' + it.map(function(x){ return '<a class="feat" href="' + x.r + '" data-act="closeDrawer">' + ic(x.i) + '<span><b>' + x.t + '</b><small>' + x.d + '</small></span></a>'; }).join('');
  }).join('');
  var antes = D.FEATS.filter(function(x){ return x.f < F; });
  var old = antes.length ? '<h3>Já vem das fases anteriores (' + antes.length + ')</h3>' + antes.map(function(x){ return '<a class="feat velho" href="' + x.r + '" data-act="closeDrawer">' + ic(x.i) + '<span><b>' + x.t + '</b><small>Fase ' + x.f + '</small></span></a>'; }).join('') : '';
  return '<div class="drawer-head"><h2>Fase ' + F + ': ' + f.nome + '</h2><p>' + f.quando + '.</p><p>' + f.resumo + '</p><p class="tiny">Dados, nomes de alunos e vídeos são fictícios. Clique num item para abrir a tela.</p></div><button class="x-btn" data-act="closeDrawer" aria-label="Fechar">' + ic('x') + '</button><div class="drawer-body">' + cur + old + '</div>';
}

/* ---------- casca do aluno ---------- */
function shellAluno(ativo, inner, opt){
  opt = opt || {};
  var items = [['inicio','Início','home',1,'#/aluno/inicio'],['cursos','Cursos','book',1,'#/aluno/cursos'],['ao-vivo','Ao vivo','live',1,'#/aluno/ao-vivo'],['clube','Clube','star',2,'#/aluno/clube'],['trilha','Trilha','route',4,'#/aluno/trilha']].filter(function(i){ return has(i[3]); });
  var nav = items.map(function(i){ return '<a href="' + i[4] + '"' + (ativo === i[0] ? ' aria-current="page"' : '') + '>' + i[1] + novo(i[3]) + '</a>'; }).join('');
  var tab = items.filter(function(i){ return i[0] !== 'trilha'; }).concat([['perfil','Perfil','user',1,'#/aluno/perfil']]).map(function(i){ return '<a href="' + i[4] + '"' + (ativo === i[0] ? ' aria-current="page"' : '') + '>' + ic(i[2]) + '<span>' + i[1] + '</span></a>'; }).join('');
  var a = D.ALUNA;
  var menu = '<div class="menu" id="meMenu"><div class="who"><b>' + a.nome + '</b><small>' + a.email + '</small></div>' +
    '<a href="#/aluno/perfil">' + ic('user') + 'Perfil e dados</a><a href="#/aluno/perfil?aba=pagamentos">' + ic('card') + 'Pagamentos</a>' +
    (has(3) ? '<a href="#/aluno/certificados">' + ic('award') + 'Certificados' + novo(3) + '</a>' : '') +
    (has(4) ? '<a href="#/aluno/trilha">' + ic('route') + 'Histórico' + novo(4) + '</a>' : '') +
    '<a href="#/aluno/entrar">' + ic('logout') + 'Sair</a></div>';
  var search = has(3) ? '<label class="search">' + ic('search','sm') + '<input placeholder="Buscar curso, professor ou tema" data-act="buscaTop" aria-label="Buscar no catálogo"></label>' : '';
  return '<div class="top"><div class="top-in"><a class="brand" href="#/aluno/inicio" aria-label="IAE, início">' + logo('marca') + '</a><nav class="nav" aria-label="Principal">' + nav + '</nav><span class="top-sp"></span>' + search +
    '<div class="me"><button data-act="me" aria-label="Sua conta">' + av({ini:a.ini, cor:''}) + '</button>' + menu + '</div></div></div>' +
    (opt.full ? inner : '<main class="page fade-in' + (opt.narrow ? ' narrow' : '') + '">' + inner + '</main>') + '<nav class="tabbar" aria-label="Atalhos">' + tab + '</nav>';
}

/* ---------- aluno: início ---------- */
function vInicio(){
  var c = curso('orcamento'), a = D.AULA, hoje = D.AO_VIVO[0];
  var live = '<div class="live-banner"><span class="chip">' + ic('calendar','sm') + 'Hoje, 19h</span><div class="grow"><b>' + hoje.t + '</b><span>Com ' + hoje.profs.map(function(p){ return prof(p).nome; }).join(' e ') + '. Depois da aula, a gravação fica no curso.</span></div>' +
    (has(3) ? '<a class="btn btn-p" href="#/aluno/sala">' + ic('live') + 'Entrar na sala</a>' : '<a class="btn btn-p" href="#/aluno/ao-vivo">' + ic('ext') + 'Entrar pelo Zoom</a>') + '</div>';
  var pct = Math.round(a.inicio / a.dur * 100);
  var hero = '<section class="hero-c"><div class="hc-copy"><span class="hc-k">Continuar de onde você parou</span><h2>' + a.titulo + '</h2><span class="hc-sub">' + c.titulo + ', aula 3 de 5 · minuto ' + fmt(a.inicio) + '</span>' +
    '<div class="hc-prog"><div class="row between"><span>Curso ' + c.progresso + '% concluído</span><span>faltam 2h41</span></div><div class="meter on-navy"><i style="--w:' + c.progresso + '%"></i></div></div>' +
    '<div class="hc-act"><a class="btn btn-w btn-lg" href="#/aluno/aula/orcamento/3">' + ic('play') + 'Continuar</a><a class="btn btn-wo btn-lg" href="#/aluno/curso/orcamento">Ver o curso</a></div></div>' +
    '<a class="hc-frame" href="#/aluno/aula/orcamento/3" aria-label="Continuar a aula"><div class="mini-slide"><span class="ms-k">NA PRÁTICA</span><span class="ms-t">Montando a planilha de contingências</span><span class="ms-l"></span></div><span class="hc-play"><span>' + ic('play','lg') + '</span></span><span class="hc-time"><i style="--w:' + pct + '%"></i></span></a></section>';
  var meus = D.CURSOS.filter(function(x){ return x.comprado || x.id === 'fornecedores' || x.id === 'transicao'; });
  var mine = '<div class="card">' + meus.map(function(x){
    var p = x.id === 'orcamento' ? 46 : x.id === 'fornecedores' ? 25 : 100;
    var sub = x.id === 'orcamento' ? 'Módulo 2 de 3 · faltam 2h41' : x.id === 'fornecedores' ? 'Encontro 3 de 8 hoje às 19h' : 'Concluído em 30/10/2026' + (has(3) ? ' · certificado disponível' : '');
    return '<a class="my" href="#/aluno/curso/' + x.id + '">' + cover(x) + '<div><h3>' + x.titulo + '</h3><div class="sub">' + sub + '</div><div class="meter"><i style="--w:' + p + '%"></i></div></div></a>';
  }).join('<div class="hr" style="margin:0"></div>') + '</div>';
  var ag = '<div class="card agenda">' + D.AO_VIVO.slice(0, 3).map(agRow).join('') + '</div>';
  var curtas = has(2) ? '<section class="sec"><div class="sec-h"><h2>Aulas curtas' + novo(2) + '</h2><a href="#/aluno/aulas-curtas">Ver todas</a></div><div class="grid-c">' + D.CURTAS.slice(0, 4).map(curtaCard).join('') + '</div></section>' : '';
  var turma = has(3) ? '<section class="sec"><div class="sec-h"><h2>Sua turma online' + novo(3) + '</h2><a href="#/aluno/turma">Ver o calendário</a></div><div class="card pad row wrap" style="gap:20px"><span class="chip navy">' + ic('calendar','sm') + 'Turma online 2027.1</span><div class="grow"><b>Contratos com fornecedores</b><div class="muted small">Encontro 3 libera hoje às 19h. O encontro 4 libera em 25/11.</div></div><div style="min-width:200px"><div class="row between small muted"><span>3 de 8 encontros</span><span>37%</span></div><div class="meter" style="margin-top:6px"><i style="--w:37%"></i></div></div></div></section>' : '';
  return shellAluno('inicio', live + hero + turma +
    '<div class="cols-2 sec"><section><div class="sec-h"><h2>Meus cursos</h2><a href="#/aluno/cursos">Catálogo</a></div>' + mine + '</section>' +
    '<section><div class="sec-h"><h2>Agenda ao vivo</h2><a href="#/aluno/ao-vivo">Ver tudo</a></div>' + ag + '</section></div>' + curtas);
}
function agRow(x){
  var btn = x.hoje ? (has(3) ? '<a class="btn btn-p btn-sm" href="#/aluno/sala">Entrar</a>' : '<a class="btn btn-p btn-sm" href="#/aluno/ao-vivo">Zoom</a>') :
    x.aberta ? (has(3) ? '<a class="btn btn-s btn-sm" href="#/publico/aula-aberta">Aula aberta</a>' : '<span class="chip">Aberta</span>') : '<span class="chip">' + x.sem + ', ' + x.hora.split(' ')[0] + '</span>';
  return '<div class="ag"><div class="d"><b>' + x.dia + '</b><small>' + x.mes + '</small></div><div><h3>' + x.t + '</h3><p>' + x.hora + ' · ' + x.profs.map(function(p){ return prof(p).nome; }).join(' e ') + '</p></div>' + btn + '</div>';
}
function curtaCard(c){
  var p = prof(c.prof), inclu = c.id !== 'c1' && c.id !== 'c3', dono = c.comprada || S.oneClick[c.id];
  var act = dono || inclu ? '<span class="chip good">' + ic('check','sm') + (dono ? 'Sua' : 'No seu clube') + '</span>' : '<span class="price">' + c.preco + '</span>';
  return '<a class="ccard" href="#/aluno/aulas-curtas">' + cover({cv:c.cv, titulo:c.titulo, d:c.d}, {short:true}) + '<div><h3>' + c.titulo + '</h3><div class="meta" style="margin-top:6px"><span>' + c.d + '</span><span>·</span><span>' + p.nome + '</span></div></div><div class="row between">' + act + '</div></a>';
}

/* ---------- aluno: catálogo ---------- */
function vCursos(r){
  var q = (r.q.q || '').toLowerCase(), filtro = S.filtro || 'Todos';
  var pubs = ['Todos','Recém-formados','Já está em empresa','Vindo de escritório','Escritórios'];
  var lista = D.CURSOS.filter(function(c){ return (filtro === 'Todos' || c.publico === filtro) && (!q || (c.titulo + ' ' + profsLine(c) + ' ' + c.tema).toLowerCase().indexOf(q) > -1) && (!c.b2b || has(3)); });
  var cards = lista.map(function(c){
    return '<a class="ccard" href="#/aluno/curso/' + c.id + '">' + cover(c) + '<div><h3>' + c.titulo + '</h3><div class="meta" style="margin-top:6px"><span>' + c.horas + '</span><span>·</span><span>' + profsLine(c) + '</span></div></div><div class="row between">' +
      (c.comprado || c.id === 'transicao' ? '<span class="chip good">' + ic('check','sm') + 'Seu curso</span>' : '<span class="price">' + c.preco + '</span>') + '<span class="chip">' + c.tema + '</span></div></a>';
  }).join('') || '<div class="empty card" style="grid-column:1/-1">' + ic('search','lg') + '<b>Nada com "' + esc(q) + '"</b><span>Tente o nome de um professor ou um tema, como contratos.</span></div>';
  var busca = has(3) ? '<label class="search" style="min-width:280px">' + ic('search','sm') + '<input value="' + esc(r.q.q || '') + '" placeholder="Título, professor ou tema" data-act="busca" aria-label="Buscar">' + '</label>' + novo(3) : '';
  var aberta = has(3) ? '<a class="live-banner" href="#/publico/aula-aberta" style="text-decoration:none; color:inherit; margin-top:28px"><span class="chip sand">Gratuita</span><div class="grow"><b>Aula aberta: o que faz um jurídico interno</b><span>02/12, 19h, com Gustavo Costa e Ana Luiza Lima. Para quem ainda não conhece a advocacia in-house.</span></div>' + ic('chev') + '</a>' : '';
  var clube = has(2) ? '<a class="live-banner" href="#/aluno/assinar" style="text-decoration:none; color:inherit; background:var(--sand-3); border-color:var(--sand-2)">' + ic('star','lg') + '<div class="grow"><b>Clube IAE' + novo(2) + '</b><span>Aulas curtas, benefícios dos parceiros e o acervo do clube por R$ 99 por mês. Seus cursos comprados continuam seus.</span></div><span class="btn btn-s btn-sm">Conhecer</span></a>' : '';
  return shellAluno('cursos', '<div class="ph"><div><h1>Cursos</h1><p>Prática de quem viveu o jurídico por dentro da empresa. Sempre com dois professores.</p></div>' + busca + '</div>' + clube +
    '<div class="toolbar"><div class="filter" role="group" aria-label="Para quem">' + pubs.filter(function(p){ return p !== 'Escritórios' || has(3); }).map(function(p){ return '<button data-act="filtro" data-v="' + p + '" aria-pressed="' + (filtro === p) + '">' + p + '</button>'; }).join('') + '</div></div>' +
    '<div class="grid-c">' + cards + '</div>' + aberta +
    (has(2) ? '<section class="sec"><div class="sec-h"><h2>Aulas curtas' + novo(2) + '</h2><p>30 a 40 minutos, direto ao ponto.</p></div><div class="grid-c">' + D.CURTAS.map(curtaCard).join('') + '</div></section>' : ''));
}

/* ---------- aluno: página do curso ---------- */
function vCurso(r){
  var c = curso(r.a), dono = c.comprado || c.id === 'transicao';
  var ps = c.profs.map(function(id){ var p = prof(id); return '<div class="prof">' + av(p) + '<div><b>' + p.nome + '</b><small>' + p.bio + '</small></div></div>'; }).join('');
  var buy = dono ? '<aside class="buy"><div><div class="p-big" style="font-size:22px">Você já tem este curso</div><div class="p-sub">' + (c.id === 'orcamento' ? 'Aula 3 de 5, minuto 23:14' : c.id === 'transicao' ? 'Concluído em 30/10/2026' : 'Encontro 3 hoje às 19h') + '</div></div>' +
      '<a class="btn btn-p btn-lg" href="' + (c.id === 'fornecedores' ? (has(3) ? '#/aluno/turma' : '#/aluno/ao-vivo') : c.id === 'transicao' ? '#/aluno/aula/orcamento/1' : '#/aluno/aula/orcamento/3') + '">' + ic(c.id === 'fornecedores' ? 'live' : 'play') + (c.id === 'transicao' ? 'Rever as aulas' : c.id === 'fornecedores' ? 'Ver a agenda da turma' : 'Continuar') + '</a>' +
      (c.id === 'transicao' && has(3) ? '<a class="btn btn-s" href="#/aluno/certificados">' + ic('award') + 'Ver certificado</a>' : '') + '</aside>' :
    '<aside class="buy"><div><div class="p-big num">' + c.preco + '</div><div class="p-sub">' + c.parcelas + ' no cartão, ou Pix à vista</div></div>' +
      '<a class="btn btn-p btn-lg" href="#/aluno/checkout/' + c.id + '">Comprar o curso</a>' +
      (has(2) ? '<a class="btn btn-s" href="#/aluno/assinar">' + ic('star') + 'Ou assine o clube' + novo(2) + '</a>' : '') +
      (c.b2b && has(3) ? '<a class="btn btn-s" href="#/escritorio/painel">' + ic('building') + 'Comprar para o escritório' + novo(3) + '</a>' : '') +
      '<ul><li>' + ic('check') + 'Acesso vitalício, em qualquer tela</li><li>' + ic('check') + 'Aulas ao vivo com gravação no curso</li><li>' + ic('check') + 'Legenda em português em todas as aulas</li>' +
      (has(3) ? '<li>' + ic('check') + 'Certificado de conclusão de curso livre' + novo(3) + '</li>' : '') + '<li>' + ic('check') + 'Bolsa de 50% para alunos e ex-alunos da UERJ</li></ul></aside>';
  var mods = '<div class="card syll">' + c.modulos.map(function(m, i){
    return '<div class="mod' + (S.mods[i] ? ' open' : '') + '"><button data-act="mod" data-i="' + i + '" aria-expanded="' + !!S.mods[i] + '"><span class="mn">' + (i + 1) + '</span><span class="grow"><h3>' + m.t + '</h3><span class="mm">' + m.aulas.length + (m.aulas.length > 1 ? ' aulas' : ' aula') + '</span></span>' + ic('chev','chev') + '</button><ol>' +
      m.aulas.map(function(a){ return '<li>' + (dono && a.st === 'done' ? ic('check','sm') : ic(dono ? 'play' : 'lock','sm')) + '<span>' + a.t + (a.gravada ? ' <span class="chip sand" style="margin-left:6px">' + a.gravada + '</span>' : '') + '</span><span class="t num">' + a.d + '</span></li>'; }).join('') + '</ol></div>';
  }).join('') + '</div>';
  var deps = '<div class="cols-3">' + [['Saí do escritório há seis meses e era exatamente o que eu não sabia: como o financeiro pensa e o que a diretoria espera do jurídico.','Aluna da turma presencial','LF'],['Os dois professores discordando em sala, com casos reais, valeu mais que um semestre de teoria.','Aluno da turma presencial','PA'],['Saio de cada encontro com uma coisa para fazer na segunda-feira.','Aluna da turma presencial','RS']].map(function(d){
    return '<figure class="card quote" style="margin:0"><p>"' + d[0] + '"</p><div class="row">' + av({ini:d[2], cor:'sand'}, 'sm') + '<div><b>' + d[1] + '</b><small>Depoimento de exemplo</small></div></div></figure>';
  }).join('') + '</div>';
  var tutorCta = has(3) && dono ? '' : '';
  return shellAluno('cursos', '<section class="course-hero"><div class="ch-in"><div><div class="crumbs"><a href="#/aluno/cursos">Cursos</a> / ' + c.tema + '</div><h1>' + c.titulo + '</h1><p class="lede">' + c.lede + '</p>' +
    '<dl class="facts"><div><dt>Carga horária</dt><dd>' + c.horas + '</dd></div><div><dt>Formato</dt><dd>' + c.aulasN + ' encontros, ao vivo e gravados</dd></div><div><dt>Para quem</dt><dd>' + c.publico + '</dd></div><div><dt>Certificado</dt><dd>Curso livre</dd></div></dl><div class="profs">' + ps + '</div></div>' + buy + '</div></section>' +
    '<main class="page fade-in"><div class="cols-2"><section><div class="sec-h"><h2>Ementa</h2><p>' + c.modulos.length + ' módulos</p></div>' + mods + '</section><section><div class="sec-h"><h2>O que você leva</h2></div><div class="card pad stack small" style="color:var(--fg-2)">' +
    '<div class="row" style="align-items:flex-start">' + ic('check') + '<span>Um jeito de pensar o jurídico como área de negócio, com orçamento, metas e clientes internos.</span></div>' +
    '<div class="row" style="align-items:flex-start">' + ic('check') + '<span>Modelos de planilha e roteiros usados por quem dirige jurídicos de grandes empresas.</span></div>' +
    '<div class="row" style="align-items:flex-start">' + ic('check') + '<span>Casos reais discutidos por dois professores, cada um com uma visão.</span></div>' +
    (has(3) ? '<div class="cert-mini">' + ic('award','lg') + '<span>Certificado de conclusão com código de verificação e QR Code.' + novo(3) + '</span></div>' : '') + '</div></section></div>' +
    '<section class="sec"><div class="sec-h"><h2>Quem já fez</h2><p>O IAE envia os depoimentos reais dos alunos atuais.</p></div>' + deps + '</section></main>', {full:true});
}

/* ---------- aluno: compra ---------- */
function preco(c){ return parseFloat(c.preco.replace(/[^\d,]/g, '').replace('.', '').replace(',', '.')) || 0; }
var brl = function(v){ return 'R$ ' + v.toLocaleString('pt-BR', {minimumFractionDigits:2, maximumFractionDigits:2}); };
function vCheckout(r){
  var c = curso(r.a), v = preco(c), desc = S.bolsa ? v * .5 : (S.cupom === 'BOASVINDAS10' ? v * .1 : 0), tot = v - desc;
  var pay = S.pay;
  var met = '<div class="pay-tabs" role="group" aria-label="Forma de pagamento">' + [['pix','Pix','Aprovação na hora','pix'],['cartao','Cartão','Em até 12x','card'],['boleto','Boleto','Libera em até 2 dias','barcode']].map(function(m){
    return '<button data-act="pay" data-v="' + m[0] + '" aria-pressed="' + (pay === m[0]) + '">' + ic(m[3]) + '<b>' + m[1] + '</b><small>' + m[2] + '</small></button>'; }).join('') + '</div>';
  var body = pay === 'pix' ? '<div class="pix"><div class="qr">' + qr('pix' + tot) + '</div><div class="stack"><b>Pague ' + brl(tot) + ' pelo app do seu banco</b><span class="muted small">Aponte a câmera para o código ou copie o Pix. Assim que o pagamento cair, o acesso é liberado nesta tela e por e-mail.</span><div class="row wrap"><button class="btn btn-s btn-sm" data-act="copiar">' + ic('copy','sm') + 'Copiar código Pix</button><a class="btn btn-p btn-sm" href="#/aluno/confirmado/' + c.id + '">Simular pagamento</a></div></div></div>' :
    pay === 'cartao' ? '<div class="stack"><div class="field"><label>Número do cartão</label><input class="inp num" value="5162 3021 9944 4821"></div><div class="cols-2e"><div class="field"><label>Validade</label><input class="inp num" value="08/29"></div><div class="field"><label>Código</label><input class="inp num" value="•••"></div></div><div class="field"><label>Parcelas</label><select class="inp"><option>12x de ' + brl(tot / 12) + '</option><option>6x de ' + brl(tot / 6) + '</option><option>À vista, ' + brl(tot) + '</option></select></div><a class="btn btn-p btn-lg" href="#/aluno/confirmado/' + c.id + '">Pagar ' + brl(tot) + '</a></div>' :
    '<div class="stack"><span class="muted small">O boleto vence em 3 dias. O acesso libera quando o banco confirmar, em até 2 dias úteis.</span><a class="btn btn-p" href="#/aluno/confirmado/' + c.id + '">Gerar boleto</a></div>';
  var bolsa = '<div class="card pad stack"><b>Bolsa ou cupom</b><div class="row wrap" style="align-items:flex-end"><div class="field grow"><label for="cup">Cupom</label><input id="cup" class="inp' + (S.cupom === 'BOASVINDAS10' ? ' ok' : '') + '" value="' + esc(S.cupom) + '" placeholder="Ex.: BOASVINDAS10" data-act="cupomIn"></div><button class="btn btn-s" data-act="cupom">Aplicar</button></div>' +
    '<label class="row small" style="cursor:pointer"><button class="switch" role="switch" aria-checked="' + S.bolsa + '" data-act="bolsa" aria-label="Bolsa UERJ"></button><span><b>Sou aluno ou ex-aluno da UERJ</b><br><span class="muted">Confirmamos pelo e-mail @uerj.br. Bolsa de 50%.</span></span></label>' +
    (S.bolsa ? '<div class="field"><label>E-mail institucional</label><input class="inp ok" value="mariana.teixeira@graduacao.uerj.br"><span class="hint" style="color:var(--good)">Vínculo confirmado. Bolsa aplicada.</span></div>' : '') + '</div>';
  return shellAluno('cursos', '<div class="steps"><span>Curso</span>' + ic('chev','sm') + '<b>Pagamento</b>' + ic('chev','sm') + '<span>Acesso</span></div><div class="ph"><div><h1>Finalizar a compra</h1><p>Pagamento pelo Asaas. Nenhum dado do cartão fica na plataforma do IAE.</p></div></div>' +
    '<div class="co"><div class="stack-l"><div class="card pad stack-l"><b>Como você quer pagar?</b>' + met + body + '</div>' + bolsa + '</div>' +
    '<aside class="card pad stack-l" style="position:sticky; top:calc(var(--bar) + 84px)"><div class="row" style="align-items:flex-start">' + '<div style="width:120px; flex:0 0 auto">' + cover(c, {sm:true}) + '</div><div><b>' + c.titulo + '</b><div class="muted small" style="margin-top:4px">' + c.horas + ' · ' + profsLine(c) + '</div></div></div>' +
    '<div class="sum"><div class="row"><span>Curso, acesso vitalício</span><span class="num">' + brl(v) + '</span></div>' + (desc ? '<div class="row" style="color:var(--good)"><span>' + (S.bolsa ? 'Bolsa UERJ 50%' : 'Cupom BOASVINDAS10') + '</span><span class="num">- ' + brl(desc) + '</span></div>' : '') +
    '<div class="row tot"><span>Total</span><span class="num">' + brl(tot) + '</span></div></div><span class="muted tiny">Arrependeu? Até 7 dias depois da compra, o valor volta inteiro.</span></aside></div>', {narrow:false});
}
function vConfirmado(r){
  var c = curso(r.a);
  return shellAluno('cursos', '<div class="stack-l" style="max-width:900px; margin:0 auto"><div class="ok-band">' + ic('check','lg') + '<span>Pagamento confirmado. O acesso a ' + c.titulo + ' está liberado, e enviamos o recibo para ' + D.ALUNA.email + '.</span></div>' +
    '<div class="stage" style="aspect-ratio:16/9"><div class="slide"><span class="s-k">ENCONTRO 1 · AULA 1</span><span class="s-t">' + c.modulos[0].aulas[0].t + '</span><span class="s-l"></span><div class="s-foot"><span>' + c.titulo + '</span>' + logo('marca') + '</div></div><a class="big-play" href="#/aluno/aula/orcamento/3" aria-label="Começar a primeira aula"><span>' + ic('play','lg') + '</span></a></div>' +
    '<div class="row between wrap"><div><h1 style="font-size:24px">Comece pela aula 1</h1><p class="muted">' + c.modulos[0].aulas[0].d + ' · com ' + profsLine(c) + '</p></div><a class="btn btn-p btn-lg" href="#/aluno/aula/orcamento/3">' + ic('play') + 'Assistir agora</a></div></div>', {narrow:true});
}

/* ---------- aluno: player ---------- */
var P = null;
function stopPlayer(){ if (P){ clearInterval(P.timer); clearInterval(P.wmTimer); clearTimeout(P.idleT); P = null; } if (document.fullscreenElement) document.exitFullscreen().catch(function(){}); }

function vAula(r){
  var c = curso('orcamento'), n = parseInt(r.b || '3', 10), A = D.AULA, aula = null;
  c.modulos.forEach(function(m){ m.aulas.forEach(function(a){ if (a.n === n) aula = a; }); });
  aula = aula || c.modulos[1].aulas[0];
  var abas = [['aulas','Aulas',1]].concat(has(3) ? [['transcricao','Transcrição',3],['duvidas','Dúvidas',3],['assistente','Assistente',3]] : []);
  var aba = r.q.aba && abas.some(function(x){ return x[0] === r.q.aba; }) ? r.q.aba : 'aulas';
  S.aba = aba;
  S.after = function(){ mountPlayer(n === 3 ? A.inicio : 0, n, aula); };
  var tabs = abas.length > 1 ? '<div class="tabs" role="tablist">' + abas.map(function(x){ return '<button role="tab" data-act="aba" data-v="' + x[0] + '" aria-selected="' + (aba === x[0]) + '">' + x[1] + (x[2] > 1 ? novo(x[2]) : '') + '</button>'; }).join('') + '</div>' : '';
  var side = '<aside class="card side"><div class="side-h"><b>' + c.titulo + '</b><div class="row between"><span>' + c.progresso + '% concluído · faltam 2h41</span><span>3 de 5</span></div><div class="meter" style="margin-top:8px"><i style="--w:' + c.progresso + '%"></i></div></div>' + tabs + '<div class="side-b" id="sideB">' + sidePane(aba, c, n) + '</div></aside>';
  return shellAluno('cursos', '<div class="watch fade-in"><div><div class="stage" id="stage" tabindex="0" aria-label="Player da aula. Espaço para tocar ou pausar, setas para avançar ou voltar 10 segundos."></div>' +
    '<div class="lesson-h"><div><h1>' + aula.t + '</h1><p>Aula ' + n + ' · ' + profsLine(c) + ' · <span id="saved">progresso salvo</span></p></div><div class="row wrap">' +
    (n > 1 ? '<a class="btn btn-s" href="#/aluno/aula/orcamento/' + (n - 1) + '">' + ic('chevl','sm') + 'Anterior</a>' : '') + (n < 5 ? '<a class="btn btn-s" href="#/aluno/aula/orcamento/' + (n + 1) + '">Próxima' + ic('chev','sm') + '</a>' : '') + '</div></div>' +
    (has(3) ? '' : '') + '</div>' + side + '</div>', {full:true});
}

function sidePane(aba, c, n){
  if (aba === 'transcricao'){
    return '<div class="side-search"><label class="search" style="min-width:0">' + ic('search','sm') + '<input placeholder="Buscar nesta aula" data-act="trBusca" aria-label="Buscar na transcrição"></label></div><div id="trList">' + trList('') + '</div>';
  }
  if (aba === 'duvidas'){
    return '<div class="q"><textarea class="inp" placeholder="Escreva sua dúvida. Ela fica presa ao minuto em que você está." id="dvTxt"></textarea><div class="row between"><span class="muted tiny">O professor responde em até 3 dias úteis.</span><button class="btn btn-p btn-sm" data-act="duvida">Enviar dúvida</button></div></div><div id="dvList">' +
      D.DUVIDAS.map(dvItem).join('') + '</div>';
  }
  if (aba === 'assistente'){
    var log = S.ai.length ? S.ai.map(bubble).join('') : '<div class="bub bot">Olá, Mariana. Eu respondo com base nas aulas e nos materiais do IAE, e sempre mostro de onde tirei a resposta. Clique no minuto para ir até o trecho.</div>';
    return '<div class="ai"><div class="ai-log" id="aiLog">' + log + '</div><div class="ai-sug">' + D.IA.map(function(x, i){ return '<button data-act="aiSug" data-i="' + i + '">' + x.p + '</button>'; }).join('') + '</div>' +
      '<form class="ai-in" data-act="aiForm"><input class="inp" id="aiQ" placeholder="Pergunte sobre o curso" autocomplete="off"><button class="btn btn-p" aria-label="Enviar">' + ic('send') + '</button></form></div>';
  }
  return c.modulos.map(function(m, i){
    return '<div class="ls-mod"><span>Módulo ' + (i + 1) + ': ' + m.t + '</span></div>' + m.aulas.map(function(a){
      var st = a.st === 'done' ? '<span class="st done">' + ic('check') + '</span>' : a.n === n ? '<span class="st cur">' + ic('play') + '</span>' : '<span class="st"></span>';
      return '<a class="ls" href="#/aluno/aula/orcamento/' + a.n + '"' + (a.n === n ? ' aria-current="true"' : '') + '>' + st + '<span class="lt">' + a.t + (a.gravada ? '<small>' + a.gravada + ', da aula ao vivo</small>' : '') + (a.n === 3 && n !== 3 ? '<small>Parou em 23:14</small>' : '') + '</span><span class="ld num">' + a.d + '</span></a>';
    }).join('');
  }).join('') + '<div class="ls-mod" style="padding-bottom:16px"><span class="muted" style="font-weight:500; letter-spacing:0">Faltam 2 aulas para concluir o curso' + (has(3) ? ' e liberar o certificado' : '') + '.</span></div>';
}
function trList(q){
  q = (q || '').toLowerCase();
  var ls = D.AULA.legendas.filter(function(l){ return !q || l[2].toLowerCase().indexOf(q) > -1; });
  if (!ls.length) return '<div class="empty">Nenhum trecho com "' + esc(q) + '".</div>';
  return ls.map(function(l){
    var txt = esc(l[2]); if (q){ var i = l[2].toLowerCase().indexOf(q); txt = esc(l[2].slice(0, i)) + '<mark>' + esc(l[2].slice(i, i + q.length)) + '</mark>' + esc(l[2].slice(i + q.length)); }
    return '<button class="tr-line" data-act="seek" data-t="' + l[0] + '" data-a="' + l[0] + '"><span class="tt">' + fmt(l[0]) + '</span><span>' + txt + '</span></button>';
  }).join('');
}
function dvItem(d){
  return '<div class="q"><div class="row">' + av({ini:d.ini, cor:'sand'}, 'sm') + '<div class="grow"><b>' + esc(d.quem) + '</b> <span class="muted tiny">' + d.quando + '</span></div><button class="tlink" data-act="seek" data-t="' + d.at + '">' + fmt(d.at) + '</button></div><p>' + esc(d.p) + '</p>' +
    (d.r ? '<div class="ans"><div class="row" style="margin-bottom:6px">' + av({ini:d.r.ini, cor:d.r.ini === 'AL' ? 'sand' : ''}, 'sm') + '<b>' + d.r.quem + '</b><span class="chip navy" style="height:20px">Professor</span></div><p>' + d.r.t + '</p></div>' : '<span class="muted tiny" style="margin-left:38px">Aguardando o professor</span>') + '</div>';
}
function bubble(m){
  if (m.me) return '<div class="bub me">' + esc(m.t) + '</div>';
  if (m.typing) return '<div class="bub bot"><span class="typing"><i></i><i></i><i></i></span></div>';
  return '<div class="bub bot">' + m.t + '<div class="cites">' + m.c.map(function(c){ return '<button class="tlink" data-act="seek" data-t="' + c[0] + '">' + ic('play','sm') + c[1] + '</button>'; }).join('') + '</div></div>';
}

function mountPlayer(t0, n, aula){
  var st = $('#stage'); if (!st) return;
  var A = D.AULA, dur = n === 3 ? A.dur : 3132;
  P = { t:t0, dur:dur, playing:false, speed:1, cc:true, q:'Automática', menu:false, si:-1, n:n, aula:aula, tipShown:false, lastSave:0 };
  var chaps = has(3) ? A.slides.slice(1).map(function(s){ return '<span class="chap" style="left:' + (s.at / dur * 100) + '%"></span>'; }).join('') : '';
  st.innerHTML = '<div class="slide" id="slide"></div><div class="lower3"><span class="avatar" aria-hidden="true">GC</span><span><b>Gustavo Costa</b><small>com Ana Luiza Lima</small></span></div>' +
    '<div class="wm" id="wm">' + D.ALUNA.marca + '</div><div class="caption" id="cap"></div>' +
    '<button class="big-play" data-act="pp" aria-label="Tocar"><span>' + ic('play','lg') + '</span></button>' +
    '<div class="ctrl"><div class="seek" id="seek"><span class="track"></span><span class="buf" id="buf"></span><span class="fill" id="fill"></span>' + chaps + '<span class="knob" id="knob"></span><span class="hov" id="hov"></span></div>' +
    '<div class="cbar"><button class="cb" data-act="pp" id="ppBtn" aria-label="Tocar">' + ic('play') + '</button><button class="cb hide-m" data-act="skip" data-v="-10" aria-label="Voltar 10 segundos">' + ic('back') + '</button><button class="cb hide-m" data-act="skip" data-v="10" aria-label="Avançar 10 segundos">' + ic('fwd') + '</button>' +
    '<button class="cb hide-m" aria-label="Volume">' + ic('vol') + '</button><span class="ctime" id="ctime"></span><span style="flex:1"></span>' +
    '<button class="cb" data-act="speedQuick" id="spBtn" aria-label="Velocidade">1x</button><button class="cb" data-act="cc" aria-pressed="true" aria-label="Legenda em português">' + ic('cc') + '</button>' +
    '<button class="cb" data-act="menu" aria-label="Qualidade e velocidade">' + ic('gear') + '<span class="hide-m" id="qLbl" style="font-weight:500">1080p</span></button><button class="cb" data-act="fs" aria-label="Tela cheia">' + ic('max') + '</button></div></div>' +
    '<div class="cmenu" id="cmenu"></div>';
  var seek = $('#seek');
  seek.addEventListener('click', function(e){ var b = seek.getBoundingClientRect(); setT((e.clientX - b.left) / b.width * P.dur); });
  seek.addEventListener('mousemove', function(e){ var b = seek.getBoundingClientRect(), x = Math.max(0, Math.min(1, (e.clientX - b.left) / b.width)), t = x * P.dur, h = $('#hov');
    var ch = ''; if (has(3)){ var sl = A.slides.filter(function(s){ return s.at <= t; }).pop(); ch = sl ? ' · ' + sl.t : ''; }
    h.textContent = fmt(t) + ch; h.style.left = (x * 100) + '%'; });
  st.addEventListener('mousemove', wake); st.addEventListener('touchstart', wake, {passive:true});
  st.addEventListener('keydown', function(e){ if (e.key === ' ' || e.key === 'k'){ e.preventDefault(); toggle(); } if (e.key === 'ArrowRight') setT(P.t + 10); if (e.key === 'ArrowLeft') setT(P.t - 10); if (e.key === 'c') togCC(); });
  P.timer = setInterval(function(){ if (!P.playing) return; P.t = Math.min(P.dur, P.t + .25 * P.speed); upd(); }, 250);
  P.wmTimer = setInterval(moveWm, 14000); moveWm();
  upd();
}
function moveWm(){ var w = $('#wm'); if (!w) return; w.style.left = (8 + Math.random() * 52) + '%'; w.style.top = (8 + Math.random() * 62) + '%'; }
function wake(){ if (!P) return; var st = $('#stage'); st.classList.remove('idle'); clearTimeout(P.idleT); P.idleT = setTimeout(function(){ if (P && P.playing && !P.menu) st.classList.add('idle'); }, 2600); }
function setT(t){ if (!P) return; P.t = Math.max(0, Math.min(P.dur, t)); P.si = -1; upd(); wake(); }
function toggle(){
  if (!P) return; P.playing = !P.playing; var st = $('#stage'); st.classList.toggle('playing', P.playing);
  $('#ppBtn').innerHTML = ic(P.playing ? 'pause' : 'play'); $('#ppBtn').setAttribute('aria-label', P.playing ? 'Pausar' : 'Tocar');
  if (!P.playing && !P.tipShown){ P.tipShown = true; var tip = document.createElement('div'); tip.className = 'tip-once'; tip.textContent = 'Você pode voltar deste ponto em qualquer dispositivo.'; st.appendChild(tip); setTimeout(function(){ tip.remove(); }, 3600); }
  wake();
}
function togCC(){ if (!P) return; P.cc = !P.cc; var b = $('[data-act="cc"]'); if (b) b.setAttribute('aria-pressed', P.cc); upd(); }
function upd(){
  if (!P || !$('#stage')) return;
  var A = D.AULA, t = P.t, pct = t / P.dur * 100;
  $('#fill').style.width = pct + '%'; $('#knob').style.left = pct + '%'; $('#buf').style.width = Math.min(100, pct + 6) + '%';
  $('#ctime').textContent = fmt(t) + ' / ' + fmt(P.dur);
  var si = 0; A.slides.forEach(function(s, i){ if (s.at <= t) si = i; });
  if (P.n !== 3) si = 0;
  if (si !== P.si){
    P.si = si; var s = A.slides[si], tt = P.n === 3 ? s.t : P.aula.t, kk = P.n === 3 ? s.k : 'AULA ' + P.n;
    $('#slide').innerHTML = '<span class="s-k">' + kk + '</span><span class="s-t">' + tt + '</span><span class="s-l"></span>' + (P.n === 3 ? '<ul>' + s.b.map(function(b){ return '<li>' + b + '</li>'; }).join('') + '</ul>' : '') + '<div class="s-foot"><span>Orçamento e gestão do jurídico interno</span>' + logo('marca') + '</div>';
  }
  var cap = '';
  if (P.cc && P.n === 3) A.legendas.forEach(function(l){ if (t >= l[0] && t <= l[1] + .6) cap = l[2]; });
  $('#cap').textContent = cap;
  if (S.aba === 'transcricao'){
    var cur = null; A.legendas.forEach(function(l){ if (l[0] <= t) cur = l[0]; });
    $$('.tr-line').forEach(function(b){ b.classList.toggle('on', +b.getAttribute('data-a') === cur); });
  }
  if (Math.floor(t) - P.lastSave >= 5){ P.lastSave = Math.floor(t); var sv = $('#saved'); if (sv) sv.textContent = 'progresso salvo em ' + fmt(t); }
}
function menuHTML(){
  var qs = ['Automática','1080p','720p','540p','360p'], sp = [.75, 1, 1.25, 1.5, 1.75, 2];
  return '<h4>Qualidade</h4>' + qs.map(function(q){ return '<button data-act="q" data-v="' + q + '" aria-pressed="' + (P.q === q) + '"><span>' + q + (q === 'Automática' ? ' (1080p)' : '') + '</span>' + (P.q === q ? ic('check','sm') : '') + '</button>'; }).join('') +
    '<h4>Velocidade</h4><div class="two">' + sp.map(function(s){ return '<button data-act="sp" data-v="' + s + '" aria-pressed="' + (P.speed === s) + '">' + String(s).replace('.', ',') + 'x</button>'; }).join('') + '</div>' +
    '<h4>Legenda</h4><button data-act="cc" aria-pressed="' + P.cc + '"><span>Português (automática)</span>' + (P.cc ? ic('check','sm') : '') + '</button>';
}

/* ---------- aluno: ao vivo ---------- */
function vAoVivo(){
  var h = D.AO_VIVO[0];
  var now = '<div class="live-banner now"><span class="chip live">Hoje, 19h</span><div class="grow"><b>' + h.t + '</b><span>' + h.hora + ' · ' + h.profs.map(function(p){ return prof(p).nome; }).join(' e ') + '. ' + (has(3) ? 'A aula acontece aqui na plataforma, e sua presença fica registrada.' : 'Seu link do Zoom é pessoal: não compartilhe.') + '</span></div>' +
    (has(3) ? '<a class="btn btn-p" href="#/aluno/sala">' + ic('live') + 'Entrar na sala' + novo(3) + '</a>' : '<button class="btn btn-p" data-act="zoom">' + ic('ext') + 'Entrar pelo Zoom</button>') + '</div>';
  var grav = [['Indicadores que a diretoria lê','Orçamento e gestão do jurídico interno · aula 5','Gravada em 12/11/2026','49:30'],['Encontro 2: negociação com suprimentos','Contratos com fornecedores','Gravada em 11/11/2026','2:58:10'],['Encontro 1: do pedido de compra ao contrato','Contratos com fornecedores','Gravada em 04/11/2026','3:02:40']];
  return shellAluno('ao-vivo', '<div class="ph"><div><h1>Ao vivo</h1><p>Toda aula ao vivo fica gravada e entra no curso, para quem não pôde estar.</p></div></div>' + now +
    '<div class="cols-2"><section><div class="sec-h"><h2>Próximas aulas</h2><p>Lembrete por e-mail na véspera</p></div><div class="card agenda">' + D.AO_VIVO.map(agRow).join('') + '</div></section>' +
    '<section><div class="sec-h"><h2>Gravadas</h2></div><div class="card">' + grav.map(function(g){ return '<a class="ls" href="#/aluno/aula/orcamento/5" style="padding:14px 18px"><span class="st cur">' + ic('play') + '</span><span class="lt"><b style="font-weight:600; color:var(--ink)">' + g[0] + '</b><small>' + g[1] + '</small><small>' + g[2] + '</small></span><span class="ld num">' + g[3] + '</span></a>'; }).join('') + '</div></section></div>');
}
function vSala(){
  var msgs = [['Gustavo Costa','Boa noite a todos. Vamos começar pelo caso que ficou da semana passada.',1],['Júlia Andrade','Boa noite! Trouxe a minuta do contrato de logística.',0],['Beatriz Carvalho','Ótimo, Júlia. Vamos usar como exemplo na segunda parte.',1],['Pedro Albuquerque','A cláusula de reajuste por IPCA ainda é o padrão?',0],['Gustavo Costa','Boa pergunta, Pedro. Respondo daqui a pouco, quando chegarmos em preço.',1]];
  return shellAluno('ao-vivo', '<div class="room fade-in"><div><div class="room-stage"><div class="slide"><span class="s-k">ENCONTRO 3 · AO VIVO</span><span class="s-t">Cláusulas de preço e reajuste</span><span class="s-l"></span><ul><li>Índice, periodicidade e gatilho</li><li>Repasse de custo: quando aceitar</li><li>O que suprimentos negocia e o que é do jurídico</li></ul><div class="s-foot"><span>Contratos com fornecedores</span>' + logo('marca') + '</div></div>' +
    '<div class="wm" style="left:62%; top:10%">' + D.ALUNA.marca + '</div><span class="chip live" style="position:absolute; left:16px; top:14px">Ao vivo · 42 pessoas</span></div>' +
    '<div class="room-cams"><div class="cam speak">' + av(prof('gustavo')) + '<span class="nm">' + ic('mic','sm') + 'Gustavo Costa</span></div><div class="cam">' + av(prof('beatriz')) + '<span class="nm">Beatriz Carvalho</span></div><div class="cam">' + av({ini:'JA', cor:'sand'}) + '<span class="nm">Júlia Andrade, promovida a falar</span></div><div class="cam off">+ 39 na plateia</div></div>' +
    '<div class="room-bar"><button class="btn btn-s" data-act="mao">' + ic('hand') + 'Levantar a mão</button><button class="btn btn-s">' + ic('mic') + 'Microfone desligado</button><a class="btn btn-d" href="#/aluno/ao-vivo">Sair da aula</a></div>' +
    '<p class="muted small" style="text-align:center; margin-top:12px">' + ic('check','sm') + ' Presença registrada às 19:02. A gravação entra no curso ao fim da aula.' + novo(3) + '</p></div>' +
    '<aside class="card chat"><div class="side-h"><b>Conversa da turma</b><div class="row"><span>Professores e alunos da turma 2027.1</span></div></div><div class="chat-log" id="chatLog">' + msgs.map(function(m){ return '<div class="msg' + (m[2] ? ' pf' : '') + '"><b>' + m[0] + (m[2] ? ' · professor' : '') + '</b>' + m[1] + '</div>'; }).join('') + '</div>' +
    '<form class="ai-in" data-act="chatForm"><input class="inp" id="chatQ" placeholder="Escreva para a turma" autocomplete="off"><button class="btn btn-p" aria-label="Enviar">' + ic('send') + '</button></form></aside></div>', {full:true});
}

/* ---------- aluno: perfil ---------- */
function vPerfil(r){
  var a = D.ALUNA, pag = r.q.aba === 'pagamentos';
  var vendas = D.VENDAS.filter(function(v){ return v.quem === a.nome || (v.quem === 'Luíza Fontes' && false); });
  var linhas = [['12/11/2026','Clube IAE anual','Cartão 12x','R$ 990,00',2],['20/10/2026','Do escritório para a empresa','Pix','R$ 1.200,00',1],['02/10/2026','Contratos com fornecedores','Cartão 12x','R$ 2.000,00',1],['28/09/2026','Orçamento e gestão do jurídico interno','Pix','R$ 690,00',1]].filter(function(l){ return has(l[4]); });
  var assin = has(2) ? '<div class="card pad stack"><div class="row between"><b>Clube IAE' + novo(2) + '</b><span class="chip good">Ativo</span></div><span class="muted small">Plano anual, R$ 990 em 12x no cartão final 4821. Renova em 12/11/2027.</span><div class="row wrap"><button class="btn btn-s btn-sm">Trocar para mensal</button><button class="btn btn-g btn-sm" data-act="cancelar">Cancelar assinatura</button></div><span class="muted tiny">Se cancelar, o clube fica ativo até o fim do período pago. Seus cursos comprados continuam seus.</span></div>' : '';
  return shellAluno('perfil', '<div class="ph"><div><h1>Perfil</h1><p>Seus dados, pagamentos e privacidade.</p></div></div><div class="cols-2"><div class="stack-l">' +
    (pag ? '' : '<div class="card pad stack-l"><div class="row">' + av({ini:a.ini}, 'lg') + '<div><b style="font-size:17px">' + a.nome + '</b><div class="muted small">' + a.cargo + '</div></div></div><div class="cols-2e"><div class="field"><label>Nome</label><input class="inp" value="' + a.nome + '"></div><div class="field"><label>E-mail</label><input class="inp" value="' + a.email + '"></div></div><div class="cols-2e"><div class="field"><label>Cargo</label><input class="inp" value="Advogada"></div><div class="field"><label>Empresa</label><input class="inp" value="Indústria de embalagens"></div></div><div><button class="btn btn-p" data-act="salvar">Salvar</button></div></div>') +
    '<div class="card"><div class="pad" style="padding-bottom:6px"><b>Pagamentos</b></div><div class="tbl"><table class="t"><thead><tr><th>Data</th><th>O quê</th><th>Meio</th><th class="r">Valor</th>' + (has(3) ? '<th>Nota fiscal</th>' : '<th>Recibo</th>') + '</tr></thead><tbody>' +
    linhas.map(function(l, i){ return '<tr><td class="num">' + l[0] + '</td><td>' + l[1] + '</td><td>' + l[2] + '</td><td class="r num">' + l[3] + '</td><td>' + (has(3) ? '<a href="#/aluno/perfil?aba=pagamentos">NFS-e 00040' + (7 - i) + '</a>' : '<a href="#/aluno/perfil?aba=pagamentos">Recibo</a>') + '</td></tr>'; }).join('') + '</tbody></table></div></div></div>' +
    '<div class="stack-l">' + assin + '<div class="card pad stack"><b>Privacidade</b><label class="row small"><button class="switch" role="switch" aria-checked="true" data-act="sw" aria-label="E-mails de aulas"></button><span>Receber lembretes de aula ao vivo</span></label><label class="row small"><button class="switch" role="switch" aria-checked="false" data-act="sw" aria-label="Novidades"></button><span>Receber novidades de cursos do IAE</span></label><div class="hr" style="margin:6px 0"></div><button class="btn btn-s" data-act="exportar">' + ic('file','sm') + 'Baixar meus dados</button><button class="btn btn-d">Excluir minha conta</button><span class="muted tiny">Pela LGPD, você pode pedir a cópia ou a exclusão dos seus dados a qualquer momento.</span></div></div></div>');
}

/* ---------- aluno: entrar ---------- */
function vEntrar(r){
  var sent = r.q.ok === '1';
  var form = sent ? '<form onsubmit="return false"><span class="avatar lg" style="background:var(--good-wash); color:var(--good)">' + ic('mail','lg') + '</span><h1>Confira seu e-mail</h1><p class="muted">Enviamos um link de acesso para <b>mar***@gmail.com</b>. Ele vale por 15 minutos e abre no celular ou no computador.</p><a class="btn btn-p btn-lg" href="#/aluno/inicio">Abrir o link (demonstração)</a><a class="btn btn-g" href="#/aluno/entrar">Usar outro e-mail</a></form>' :
    '<form data-act="login"><div>' + logo('assinatura', '') + '</div><h1>Entrar</h1><p class="muted" style="margin-top:-8px">Sem senha: mandamos um link para o seu e-mail.</p><div class="field"><label for="em">E-mail</label><input id="em" class="inp" type="email" value="' + D.ALUNA.email + '"></div><button class="btn btn-p btn-lg">Receber link de acesso</button><div class="or">ou</div><a class="btn btn-s btn-lg" href="#/aluno/inicio">' + ic('google') + 'Entrar com Google</a><span class="muted tiny">Ainda não é aluno? <a href="#/aluno/cursos">Veja os cursos</a>.</span></form>';
  return '<div class="login"><div class="login-art">' + logo('assinatura') + '<blockquote>Advocacia in-house na prática, de quem viveu 30 anos dentro de empresa.<cite>Instituto de Advocacia Empresarial</cite></blockquote><span class="muted small" style="color:var(--on-navy-2)">Rio de Janeiro e online</span></div><div class="login-f">' + form + '</div></div>';
}

/* ---------- aluno: clube (fase 2) ---------- */
function vClube(){
  var parc = benef();
  return shellAluno('clube', '<div class="hero-c" style="min-height:0"><div class="hc-copy"><span class="hc-k">Clube IAE · membro desde 12/11/2026</span><h2>Bem-vinda ao clube, Mariana</h2><span class="hc-sub">Seu plano anual inclui as aulas curtas do acervo, os benefícios dos parceiros' + (has(3) ? ', a comunidade dos membros' : '') + ' e desconto em cursos novos.</span><div class="hc-act"><a class="btn btn-w" href="#/aluno/aulas-curtas">Ver as aulas curtas</a><a class="btn btn-wo" href="#/aluno/beneficios">Benefícios</a></div></div><div class="hc-frame" style="place-items:center"><div class="card pad" style="width:100%; max-width:340px; background:var(--sand); border:0; color:var(--cocoa); aspect-ratio:1.6/1; display:flex; flex-direction:column; justify-content:space-between"><div class="row between">' + logo('marca', '') .replace('class=""', 'style="width:62px;height:30px;fill:var(--cocoa)"') + '<b style="font-size:12px; letter-spacing:.12em">MEMBRO</b></div><div><b style="font-size:18px">Mariana Teixeira</b><div class="small">Plano anual · válido até 11/2027</div></div></div></div></div>' +
    '<section class="sec"><div class="sec-h"><h2>Incluídas no seu plano</h2><a href="#/aluno/aulas-curtas">Ver todas</a></div><div class="grid-c">' + D.CURTAS.filter(function(c){ return c.id !== 'c1' && c.id !== 'c3'; }).map(curtaCard).join('') + '</div></section>' +
    '<div class="cols-2 sec"><section><div class="sec-h"><h2>Benefícios dos parceiros</h2><a href="#/aluno/beneficios">Ver todos</a></div><div class="card">' + parc.slice(0, 3).map(function(p){ return '<div class="ag" style="grid-template-columns:44px minmax(0,1fr) auto"><span class="avatar ' + p.cor + '" style="border-radius:8px">' + ic(p.i) + '</span><div><h3>' + p.n + '</h3><p>' + p.d + '</p></div><span class="chip ' + (p.st === 'Ativo' ? 'good' : 'warn') + '">' + p.st + '</span></div>'; }).join('') + '</div></section>' +
    '<section><div class="sec-h"><h2>' + (has(3) ? 'Comunidade' + novo(3) : 'Em breve no clube') + '</h2>' + (has(3) ? '<a href="#/aluno/comunidade">Abrir</a>' : '') + '</div><div class="card pad stack small" style="color:var(--fg-2)">' +
    (has(3) ? '<b>3 conversas novas desde ontem</b><span>"Modelo de planilha de contingências" em Orçamento do jurídico, com resposta da Ana Luiza Lima.</span><a class="btn btn-s btn-sm" href="#/aluno/comunidade" style="justify-self:start">Ver conversas</a>' : '<span>A comunidade dos membros, por curso e por turma, entra numa próxima etapa da lista de melhorias.</span>') + '</div></section></div>');
}
function benef(){ return [
  {n:'UERJ', d:'Bolsa de 50% em cursos para alunos e ex-alunos da graduação.', st:'Ativo', i:'award', cor:'', code:'Pelo e-mail @uerj.br'},
  {n:'OAB Rio', d:'Desconto para inscritos na seccional. Convênio em desenvolvimento.', st:'Em breve', i:'shield', cor:'cocoa', code:''},
  {n:'Livraria jurídica parceira', d:'15% em livros de direito empresarial.', st:'Ativo', i:'book', cor:'sand', code:'IAECLUBE15'},
  {n:'Software de gestão de contratos', d:'Três meses sem custo no plano para jurídicos internos.', st:'Ativo', i:'file', cor:'', code:'IAE-3MESES'},
  {n:'Coworking no Centro do Rio', d:'Diária com 30% de desconto perto da sede do IAE.', st:'Ativo', i:'building', cor:'sand', code:'IAE30'}
]; }
function vBeneficios(){
  return shellAluno('clube', '<div class="ph"><div><h1>Benefícios' + novo(2) + '</h1><p>Parcerias do IAE para membros do clube. Os parceiros abaixo, fora UERJ e OAB Rio, são exemplos.</p></div></div><div class="cols-2e">' + benef().map(function(p, i){
    return '<div class="card pad stack"><div class="row"><span class="avatar ' + p.cor + '" style="border-radius:8px; width:44px; height:44px">' + ic(p.i) + '</span><div class="grow"><b>' + p.n + '</b><div class="muted small">' + p.d + '</div></div><span class="chip ' + (p.st === 'Ativo' ? 'good' : 'warn') + '">' + p.st + '</span></div>' +
      (p.code ? (S.codes[i] ? '<div class="row between" style="padding:10px 12px; background:var(--surface-2); border:1px dashed var(--line-strong); border-radius:6px"><b class="num" style="letter-spacing:.06em">' + p.code + '</b><button class="btn btn-g btn-sm" data-act="copiar">' + ic('copy','sm') + 'Copiar</button></div>' : '<button class="btn btn-s" data-act="code" data-i="' + i + '" style="justify-self:start">Mostrar código</button>') : '<span class="muted small">Avisamos por e-mail quando o convênio for assinado.</span>') + '</div>';
  }).join('') + '</div>');
}
function vCurtas(){
  var list = D.CURTAS.map(function(c){
    var p = prof(c.prof), inclu = c.id !== 'c1' && c.id !== 'c3', dono = c.comprada || S.oneClick[c.id], conf = S.oneClick['?' + c.id];
    var act = dono || inclu ? '<a class="btn btn-p btn-sm" href="#/aluno/aula/orcamento/3">' + ic('play','sm') + 'Assistir</a>' :
      conf ? '<div class="row wrap"><span class="small">Comprar por <b>' + c.preco + '</b> no cartão final 4821?</span><button class="btn btn-p btn-sm" data-act="oneOk" data-id="' + c.id + '">Confirmar</button><button class="btn btn-g btn-sm" data-act="oneNo" data-id="' + c.id + '">Agora não</button></div>' :
      '<button class="btn btn-s btn-sm" data-act="one" data-id="' + c.id + '">Comprar em 1 clique · ' + c.preco + '</button>';
    return '<div class="card my" style="grid-template-columns:160px minmax(0,1fr) auto">' + cover({cv:c.cv, titulo:c.titulo, d:c.d}, {sm:true}) + '<div><h3>' + c.titulo + '</h3><div class="sub">' + c.d + ' · ' + p.nome + '</div><span class="chip ' + (dono ? 'good' : inclu ? 'navy' : 'sand') + '">' + (dono ? 'Sua' : inclu ? 'Incluída no seu clube' : 'Lançamento avulso') + '</span></div><div>' + act + '</div></div>';
  }).join('');
  return shellAluno('cursos', '<div class="ph"><div><h1>Aulas curtas' + novo(2) + '</h1><p>De 30 a 40 minutos, para resolver uma dúvida de trabalho de uma vez. Quem já é aluno compra em 1 clique.</p></div></div><div class="stack">' + list + '</div>');
}
function vAssinar(){
  return shellAluno('clube', '<div class="ph" style="justify-content:center; text-align:center"><div style="max-width:640px; margin:0 auto"><h1>Clube IAE' + novo(2) + '</h1><p style="margin-inline:auto">Assinatura para quem quer continuar aprendendo com o IAE o ano inteiro. Convive com os cursos que você compra: o que é comprado continua seu, com ou sem o clube.</p></div></div>' +
    '<div class="cols-2e" style="max-width:860px; margin:0 auto">' + [['Mensal','R$ 99','por mês, no cartão ou Pix Automático',false],['Anual','R$ 990','em até 12x no cartão, dois meses de economia',true]].map(function(p){
      return '<div class="card pad-l stack-l" style="' + (p[3] ? 'border-color:var(--navy); box-shadow:0 0 0 1px var(--navy)' : '') + '"><div class="row between"><b style="font-size:18px">' + p[0] + '</b>' + (p[3] ? '<span class="chip navy">Mais escolhido</span>' : '') + '</div><div><div class="p-big num" style="font-size:34px; font-weight:700; color:var(--navy)">' + p[1] + '</div><div class="muted small">' + p[2] + '</div></div><ul class="stack small" style="list-style:none; padding:0; margin:0; color:var(--fg-2)">' +
        ['Aulas curtas do acervo do clube','Benefícios dos parceiros, como a bolsa da UERJ','15% de desconto em cursos de 24 h','Cancele quando quiser, pela própria plataforma'].map(function(x){ return '<li class="row" style="align-items:flex-start">' + ic('check') + '<span>' + x + '</span></li>'; }).join('') + '</ul><a class="btn ' + (p[3] ? 'btn-p' : 'btn-s') + ' btn-lg" href="#/aluno/clube" data-act="assinou">Assinar o plano ' + p[0].toLowerCase() + '</a></div>';
    }).join('') + '</div><p class="muted small" style="text-align:center; margin-top:18px">Valores de exemplo. Preço final definido pelo IAE.</p>');
}

/* ---------- aluno: fase 3 ---------- */
function vTurma(){
  var enc = [['04/11','Do pedido de compra ao contrato','done'],['11/11','Negociação com suprimentos','done'],['18/11','Cláusulas de preço e reajuste','live'],['25/11','Garantias e penalidades','lock'],['02/12','Gestão do contrato vivo','lock'],['09/12','Rescisão e transição','lock'],['16/12','Fornecedor único e estratégico','lock'],['13/01','Encerramento e caso final','lock']];
  return shellAluno('inicio', '<div class="ph"><div><h1>Contratos com fornecedores' + novo(3) + '</h1><p>Turma online 2027.1 · quartas, 19h às 22h · Gustavo Costa e Beatriz Carvalho. Cada encontro libera no dia da aula, e a gravação fica no curso.</p></div><a class="btn btn-s" href="#/aluno/comunidade">' + ic('message') + 'Conversa da turma</a></div>' +
    '<div class="card">' + enc.map(function(e, i){
      var st = e[2] === 'done' ? '<span class="chip good">' + ic('check','sm') + 'Assistido</span>' : e[2] === 'live' ? '<a class="btn btn-p btn-sm" href="#/aluno/sala">Hoje, 19h · Entrar</a>' : '<span class="chip">' + ic('lock','sm') + 'Libera em ' + e[0] + '</span>';
      return '<div class="ag"><div class="d"><b>' + e[0].split('/')[0] + '</b><small>' + ['','JAN','','','','','','','','','','NOV','DEZ'][+e[0].split('/')[1]] + '</small></div><div><h3>Encontro ' + (i + 1) + ': ' + e[1] + '</h3><p>' + (e[2] === 'done' ? 'Gravação no curso · presença registrada' : e[2] === 'live' ? 'Ao vivo hoje, depois gravado' : '3 h ao vivo, depois gravado') + '</p></div>' + st + '</div>';
    }).join('') + '</div>');
}
function vComunidade(){
  var esp = S.esp || 'Orçamento do jurídico';
  var tops = {'Orçamento do jurídico':[['Modelo de planilha de contingências','Caio Ramos',6,'Ana Luiza Lima respondeu há 2 h',true],['Como apresentar o orçamento para o CFO pela primeira vez?','Mariana Teixeira',4,'há 1 dia',false],['Honorário de êxito: provisão ou orçamento?','Pedro Albuquerque',9,'há 3 dias',true]],
    'Turma Fornecedores 2027.1':[['Minuta de logística para o encontro 3','Júlia Andrade',3,'há 5 h',false],['Leitura recomendada sobre reajuste','Beatriz Carvalho',2,'há 2 dias',true]],
    'Clube IAE':[['Vagas in-house abertas no Rio','Vinicius Almeida',12,'há 1 dia',true],['Quem vai ao encontro presencial de dezembro?','Luíza Fontes',7,'há 4 dias',false]]};
  return shellAluno('clube', '<div class="ph"><div><h1>Comunidade' + novo(3) + '</h1><p>Conversas por curso e por turma, com os professores por perto. Sem feed e sem curtidas: só perguntas e respostas.</p></div><button class="btn btn-p" data-act="novoTopico">' + ic('plus') + 'Nova conversa</button></div>' +
    '<div class="toolbar"><div class="filter">' + Object.keys(tops).map(function(k){ return '<button data-act="esp" data-v="' + k + '" aria-pressed="' + (esp === k) + '">' + k + '</button>'; }).join('') + '</div></div>' +
    '<div class="card">' + tops[esp].map(function(t){ return '<div class="ag" style="grid-template-columns:40px minmax(0,1fr) auto">' + av({ini:t[1].split(' ').map(function(x){ return x[0]; }).join('').slice(0, 2), cor:'sand'}, 'sm') + '<div><h3>' + t[0] + '</h3><p>' + t[1] + ' · ' + t[3] + '</p></div><span class="row small muted">' + (t[4] ? '<span class="chip navy">Professor respondeu</span>' : '') + ic('message','sm') + t[2] + '</span></div>'; }).join('') + '</div>');
}
function vCertificados(){
  return shellAluno('perfil', '<div class="ph"><div><h1>Certificados' + novo(3) + '</h1><p>Certificado de conclusão de curso livre, com carga horária e código de verificação.</p></div></div><div class="cols-2"><div>' + certHTML() + '</div><div class="stack-l"><div class="card pad stack"><b>Do escritório para a empresa</b><span class="muted small">12 h · concluído em 30/10/2026 · código IAE-2026-7K4P-0193</span><div class="row wrap"><button class="btn btn-p btn-sm" data-act="pdf">' + ic('file','sm') + 'Baixar PDF</button><a class="btn btn-s btn-sm" href="#/publico/validar">' + ic('link','sm') + 'Página de validação</a><button class="btn btn-g btn-sm" data-act="copiar">Compartilhar no LinkedIn</button></div></div>' +
    '<div class="card pad stack"><b>Orçamento e gestão do jurídico interno</b><span class="muted small">Faltam 2 aulas para o seu certificado.</span><div class="meter"><i style="--w:46%"></i></div><a class="btn btn-s btn-sm" href="#/aluno/aula/orcamento/3" style="justify-self:start">Continuar</a></div></div></div>');
}
function certHTML(){
  return '<div class="cert"><div class="ct-top">' + logo('assinatura') + '<div class="qrbox">' + qr('IAE-2026-7K4P-0193') + '</div></div><span class="ct-k">CERTIFICADO DE CONCLUSÃO</span><span class="ct-n">Mariana Teixeira</span><span class="ct-t">concluiu o curso livre <b>Do escritório para a empresa</b>, com carga horária de 12 horas, ministrado por Ana Luiza Lima e Rafael Monteiro, em outubro de 2026.</span>' +
    '<div class="ct-f"><div class="sig"><i></i><b>Gustavo Costa</b>Presidente do IAE</div><div><div class="code">Valide em iae.org.br/validar</div><div class="code">IAE-2026-7K4P-0193</div></div></div></div>';
}
function vValidar(r){
  var ok = r.q.c !== '0';
  return '<div class="top"><div class="top-in"><a class="brand" href="#/aluno/inicio">' + logo('marca') + '</a><span class="muted small">Validação de certificado</span></div></div><main class="page narrow fade-in"><div class="ph"><div><h1>Validar certificado' + novo(3) + '</h1><p>Digite o código impresso no certificado ou leia o QR Code.</p></div></div>' +
    '<div class="card pad stack-l"><div class="row" style="align-items:flex-end"><div class="field grow"><label>Código</label><input class="inp num" value="IAE-2026-7K4P-0193"></div><a class="btn btn-p" href="#/publico/validar">Validar</a></div>' +
    (ok ? '<div class="ok-band">' + ic('check','lg') + '<span>Certificado válido.</span></div><dl class="facts" style="border-top-color:var(--line); color:var(--ink); margin-top:0"><div><dt class="muted">Aluno</dt><dd>Mariana Teixeira</dd></div><div><dt class="muted">Curso livre</dt><dd>Do escritório para a empresa</dd></div><div><dt class="muted">Carga horária</dt><dd>12 h</dd></div><div><dt class="muted">Conclusão</dt><dd>30/10/2026</dd></div></dl>' : '') + '</div></main>';
}
function vAulaAberta(r){
  var ok = r.q.ok === '1';
  var form = ok ? '<div class="buy"><div class="ok-band">' + ic('check','lg') + '<span>Inscrição feita.</span></div><p class="small" style="color:var(--fg-2)">Mandamos o link da aula para o seu e-mail e um lembrete no dia. Até lá, você pode assistir à apresentação do IAE.</p><a class="btn btn-p" href="#/aluno/cursos">Conhecer os cursos</a></div>' :
    '<form class="buy" data-act="lead"><b style="font-size:18px">Garanta sua vaga, sem custo</b><div class="field"><label>Nome</label><input class="inp" value="Ana Carolina Prado"></div><div class="field"><label>E-mail</label><input class="inp" value="ana.prado@gmail.com"></div><div class="field"><label>WhatsApp</label><input class="inp num" value="(21) 99876-5432"></div><div class="field"><label>Você hoje</label><select class="inp"><option>Estou terminando a faculdade</option><option>Já trabalho em empresa</option><option>Trabalho em escritório</option></select></div><button class="btn btn-p btn-lg">Quero assistir</button><span class="muted tiny">Usamos seus dados só para falar desta aula e dos cursos do IAE.</span></form>';
  return '<div class="lp-hero course-hero"><div class="lp-in"><div><div>' + logo('assinatura').replace('class=""', 'style="width:150px; fill:#fff"') + '</div><h1 style="margin-top:34px">O que faz um jurídico interno' + novo(3) + '</h1><p>Aula aberta e gratuita com Gustavo Costa e Ana Luiza Lima, para quem nunca ouviu falar da advocacia in-house. A faculdade fala de concurso e escritório; esta aula fala da empresa.</p><dl class="facts"><div><dt>Quando</dt><dd>02/12, quarta, 19h</dd></div><div><dt>Duração</dt><dd>1h30, ao vivo</dd></div><div><dt>Onde</dt><dd>Online, com gravação</dd></div></dl></div>' + form + '</div></div>' +
    '<main class="page"><p class="muted small" style="text-align:center">Página pública do funil da aula gratuita. Cada inscrição vai para o CRM Nexoris e vira evento no Google Analytics.</p></main>';
}

/* ---------- aluno: trilha (fase 4) ---------- */
function vTrilha(){
  var ns = [['done','Do escritório para a empresa','12 h · concluído em 10/2026 · nota 9,0'],['cur','Orçamento e gestão do jurídico interno','5 h · em andamento, 46%'],['cur','Contratos com fornecedores','24 h · turma 2027.1, encontro 3 de 8'],['lock','Advocacia in-house na prática','24 h · pré-requisito: os dois primeiros · oferta 2027.2'],['lock','Compliance e governança no jurídico','24 h · pré-requisito: Advocacia in-house · oferta 2027.2'],['lock','Contencioso estratégico de empresa','24 h · oferta 2028.1']];
  return shellAluno('trilha', '<div class="ph"><div><h1>Trilha de formação em advocacia corporativa' + novo(4) + '</h1><p>Os cursos de 24 h do IAE em ordem, com pré-requisitos e histórico. É a base para uma pós em parceria com instituição credenciada, quando o convênio for assinado. Até lá, cada curso emite certificado de conclusão de curso livre.</p></div></div>' +
    '<div class="cols-2"><div class="card pad"><div class="track">' + ns.map(function(n, i){ return '<div class="tnode ' + n[0] + '"><span class="tb">' + (n[0] === 'done' ? ic('check') : n[0] === 'lock' ? ic('lock','sm') : i + 1) + '</span><div><h3>' + n[1] + '</h3><p>' + n[2] + '</p></div>' + (n[0] === 'lock' ? '<span class="chip">Bloqueado</span>' : n[0] === 'cur' ? '<a class="btn btn-s btn-sm" href="#/aluno/aula/orcamento/3">Continuar</a>' : '<span class="chip good">Concluído</span>') + '</div>'; }).join('') + '</div></div>' +
    '<div class="stack-l"><div class="card pad stack"><b>Seu avanço</b><div class="row between small"><span class="muted">Carga horária cumprida</span><b class="num">14 h de 113 h</b></div><div class="meter"><i style="--w:12%"></i></div><div class="row between small"><span class="muted">Frequência nas aulas ao vivo</span><b class="num">100%</b></div><div class="row between small"><span class="muted">Média das avaliações</span><b class="num">9,0</b></div></div>' +
    '<div class="card"><div class="pad" style="padding-bottom:6px"><b>Histórico</b></div><table class="t"><thead><tr><th>Curso</th><th>Período</th><th class="r">Carga</th><th class="r">Freq.</th><th class="r">Nota</th><th>Situação</th></tr></thead><tbody>' +
    [['Do escritório para a empresa','2026.2','12 h','100%','9,0','Aprovada'],['Orçamento do jurídico','2026.2','2,3 h','','','Cursando'],['Contratos com fornecedores','2027.1','9 h','100%','','Cursando']].map(function(h){ return '<tr><td>' + h[0] + '</td><td class="num">' + h[1] + '</td><td class="r num">' + h[2] + '</td><td class="r num">' + (h[3] || '') + '</td><td class="r num">' + (h[4] || '') + '</td><td><span class="chip ' + (h[5] === 'Aprovada' ? 'good' : 'navy') + '">' + h[5] + '</span></td></tr>'; }).join('') + '</tbody></table></div></div></div>');
}

/* ---------- casca do admin ---------- */
var RAIL = [
  [null, [['inicio','Hoje','home',1],['numeros','Números','chart',3]]],
  ['CONTEÚDO', [['cursos','Cursos','book',1],['aulas-curtas','Aulas curtas','clock',2],['ao-vivo','Ao vivo','live',1],['turmas','Turmas','calendar',3],['trilhas','Trilhas','route',4],['edicao','Edição automática','scissors',4]]],
  ['ALUNOS E VENDAS', [['alunos','Alunos','users',1],['vendas','Vendas','card',1],['cupons','Cupons e bolsas','tag',1],['clube','Clube','star',2],['beneficios','Benefícios','gift',2],['escritorios','Escritórios','building',3]]],
  ['RELACIONAMENTO', [['emails','E-mails automáticos','mail',1],['comunidade','Comunidade e dúvidas','message',3],['assistente','Assistente de IA','spark',3],['certificados','Certificados','award',3],['funil','Aula aberta','play',3]]],
  ['SISTEMA', [['integracoes','Integrações','plug',3],['video','Vídeo e proteção','server',4]]]
];
function shellAdmin(ativo, titulo, inner, acoes){
  var nav = RAIL.map(function(g){
    var it = g[1].filter(function(x){ return has(x[3]); });
    if (!it.length) return '';
    return (g[0] ? '<div class="grp">' + g[0] + '</div>' : '') + it.map(function(x){ return '<a href="#/admin/' + x[0] + '"' + (ativo === x[0] ? ' aria-current="page"' : '') + '>' + ic(x[2]) + '<span>' + x[1] + '</span>' + novo(x[3]) + '</a>'; }).join('');
  }).join('');
  return '<div class="adm"><aside class="rail"><div class="rail-h">' + logo('marca') + '<span>Painel do IAE</span></div><nav aria-label="Painel">' + nav + '</nav><div class="rail-f">' + av({ini:'HL', cor:'sand'}, 'sm') + '<div>Helena Lannes<small>Admin do IAE</small></div></div></aside>' +
    '<div class="adm-main"><div class="adm-top"><span class="crumb">Painel / <b>' + titulo + '</b></span><span style="flex:1"></span>' + (acoes || '') + '<a class="btn btn-g btn-sm" href="#/aluno/inicio">' + ic('eye','sm') + 'Ver como aluno</a></div><main class="adm-page fade-in">' + inner + '</main></div></div>';
}
function head(t, p, extra){ return '<div class="ph"><div><h1>' + t + '</h1>' + (p ? '<p>' + p + '</p>' : '') + '</div>' + (extra || '') + '</div>'; }
function tbl(cols, rows){ return '<div class="card tbl"><table class="t"><thead><tr>' + cols.map(function(c){ return '<th' + (c.r ? ' class="r"' : '') + '>' + c.t + '</th>'; }).join('') + '</tr></thead><tbody>' + rows.join('') + '</tbody></table></div>'; }

/* ---------- admin: hoje ---------- */
function aInicio(){
  var strip = has(3) ? '<a href="#/admin/numeros" style="text-decoration:none; color:inherit; display:block; margin-bottom:28px">' + stats() + '</a>' : '';
  var pend = [
    ['live','Aula ao vivo hoje, 19h','Contratos com fornecedores, encontro 3 · 42 alunos com link','#/admin/ao-vivo','Ver',1],
    has(3) ? ['refresh','Gravação publicada sozinha','Encontro 2 entrou no curso às 23:41 de ontem','#/admin/ao-vivo','Conferir',3] : ['upload','1 gravação esperando publicação','Encontro 2 de Contratos com fornecedores, 2h58','#/admin/ao-vivo','Publicar',1],
    ['layers','1 aula convertendo','Aula 4 de Orçamento do jurídico, legenda sendo gerada','#/admin/curso/orcamento','Abrir',1],
    has(3) ? ['message','1 dúvida sem resposta','Caio Ramos, aula 3 de Orçamento do jurídico','#/admin/comunidade','Responder',3] : null,
    has(3) ? ['play','12 inscritos na aula aberta','Todos já enviados ao CRM Nexoris','#/admin/funil','Ver',3] : null,
    has(2) ? ['star','2 assinaturas com pagamento em atraso','Avisadas por e-mail; o acesso pausa em 5 dias','#/admin/clube','Ver',2] : null
  ].filter(Boolean);
  var vendas = D.VENDAS.filter(function(v){ return !v.f || has(v.f); }).slice(0, 5);
  return shellAdmin('inicio', 'Hoje', head('Bom dia, Helena', 'Quarta, 18 de novembro. O que pede atenção no IAE hoje.') + strip +
    '<div class="cols-2"><section><div class="sec-h"><h2>Pede atenção</h2></div><div class="card">' + pend.map(function(p){ return '<div class="ag" style="grid-template-columns:40px minmax(0,1fr) auto"><span class="avatar" style="border-radius:8px; background:var(--navy-wash); color:var(--navy)">' + ic(p[0]) + '</span><div><h3>' + p[1] + novo(p[5]) + '</h3><p>' + p[2] + '</p></div><a class="btn btn-s btn-sm" href="' + p[3] + '">' + p[4] + '</a></div>'; }).join('') + '</div></section>' +
    '<section><div class="sec-h"><h2>Últimas vendas</h2><a href="#/admin/vendas">Ver todas</a></div><div class="card">' + vendas.map(function(v){ return '<div class="ag" style="grid-template-columns:minmax(0,1fr) auto"><div><h3>' + v.quem + '</h3><p>' + v.o + ' · ' + v.meio + '</p></div><div style="text-align:right"><b class="num">' + v.v + '</b><div>' + stChip(v.st) + '</div></div></div>'; }).join('') + '</div></section></div>');
}
function stChip(s){ return '<span class="chip ' + (s === 'Pago' || s === 'Ativa' || s === 'Ativo' || s === 'Publicada' || s === 'Conectado' ? 'good' : s === 'Aguardando' || s === 'Em atraso' || s === 'Rascunho' || s === 'Em breve' ? 'warn' : s === 'Reembolsado' || s === 'Cancelada' ? 'bad' : '') + '">' + s + '</span>'; }
function stats(){
  return '<dl class="stat-strip"><div><dt>Receita de novembro</dt><dd>R$ 38.420</dd><span class="d up">+22% sobre outubro</span></div><div><dt>Alunos ativos na semana</dt><dd>186</dd><span class="d up">+31 na semana</span></div><div><dt>Conclusão dos cursos</dt><dd>58%</dd><span class="d up">+4 pontos</span></div><div><dt>Assinantes do clube</dt><dd>64</dd><span class="d dn">2 em atraso</span></div></dl>';
}

/* ---------- admin: cursos ---------- */
function aCursos(){
  var rows = D.CURSOS.filter(function(c){ return !c.b2b || has(3); }).map(function(c, i){
    return '<tr><td><a class="who" href="#/admin/curso/' + c.id + '" style="text-decoration:none; color:inherit"><span style="width:72px; flex:0 0 auto">' + cover(c).replace('class="cover', 'class="cover" style="padding:6px; aspect-ratio:16/10" data-x="') + '</span><span><b>' + c.titulo + '</b><small>' + profsLine(c) + '</small></span></a></td><td>' + c.horas + '</td><td class="r num">' + [23, 41, 38, 19, 10][i] + '</td>' +
      (has(2) ? '<td>' + (i === 0 || i === 3 ? '<span class="chip navy">No clube</span>' : '<span class="muted">Só compra</span>') + '</td>' : '') + '<td>' + stChip(i === 4 && !has(3) ? 'Rascunho' : 'Publicada') + '</td><td class="r"><a class="btn btn-s btn-sm" href="#/admin/curso/' + c.id + '">Editar</a></td></tr>';
  });
  return shellAdmin('cursos', 'Cursos', head('Cursos', 'Tudo o que o aluno vê: textos, módulos, aulas, vídeos e preço.', '<button class="btn btn-p" data-act="toastNovo">' + ic('plus') + 'Novo curso</button>') +
    tbl([{t:'Curso'},{t:'Carga'},{t:'Alunos',r:1}].concat(has(2) ? [{t:'Clube'}] : []).concat([{t:'Situação'},{t:'',r:1}]), rows));
}
function aCurso(r){
  var c = curso(r.a), tab = S.edTab || 'conteudo';
  var tabs = '<div class="tabs" style="padding:0; margin-bottom:22px">' + [['conteudo','Conteúdo'],['pagina','Página de venda'],['preco','Preço e acesso']].map(function(t){ return '<button data-act="edTab" data-v="' + t[0] + '" aria-selected="' + (tab === t[0]) + '">' + t[1] + '</button>'; }).join('') + '</div>';
  var body;
  if (tab === 'pagina'){
    body = '<div class="card pad stack-l"><div class="field"><label>Título</label><input class="inp" value="' + c.titulo + '"></div><div class="field"><label>Descrição curta</label><textarea class="inp">' + c.lede + '</textarea></div><div class="cols-2e"><div class="field"><label>Professores</label><input class="inp" value="' + profsLine(c) + '"></div><div class="field"><label>Para quem</label><select class="inp"><option>' + c.publico + '</option></select></div></div><div class="field"><label>Vídeo de apresentação</label><div class="drop">' + ic('upload','lg') + '<b>Arraste o vídeo ou clique para escolher</b><span class="small">Vai direto para o Mux, sem passar pelo servidor</span></div></div><div><button class="btn btn-p" data-act="salvar">Salvar</button></div></div>';
  } else if (tab === 'preco'){
    body = '<div class="card pad stack-l"><div class="cols-2e"><div class="field"><label>Preço à vista</label><input class="inp num" value="' + c.preco + '"></div><div class="field"><label>Parcelas no cartão</label><select class="inp"><option>Até 12x</option><option>Até 6x</option></select></div></div><label class="row small"><button class="switch" role="switch" aria-checked="true" data-act="sw" aria-label="Acesso vitalício"></button><span><b>Acesso vitalício</b><br><span class="muted">Quem compra não perde o acesso.</span></span></label>' +
      (has(2) ? '<label class="row small"><button class="switch" role="switch" aria-checked="' + (c.id === 'orcamento') + '" data-act="sw" aria-label="Incluir no clube"></button><span><b>Incluir no clube' + novo(2) + '</b><br><span class="muted">Assinantes assistem sem comprar.</span></span></label>' : '') +
      (has(3) ? '<label class="row small"><button class="switch" role="switch" aria-checked="true" data-act="sw" aria-label="Venda para escritórios"></button><span><b>Vender por assentos para escritórios' + novo(3) + '</b><br><span class="muted">R$ 720 por assento, com fatura por boleto.</span></span></label>' : '') + '<div><button class="btn btn-p" data-act="salvar">Salvar</button></div></div>';
  } else {
    var upPanel = S.novaAula ? '<div class="card pad stack-l" style="margin-bottom:14px; border-color:var(--navy-3)"><div class="row between"><b>Nova aula no módulo 3</b><button class="btn btn-g btn-sm" data-act="fecharNova">Cancelar</button></div><div class="field"><label>Título da aula</label><input class="inp" value="Indicadores que a diretoria lê, parte 2"></div>' +
      (!S.uploading ? '<div class="drop" data-act="upload">' + ic('upload','lg') + '<b>Arraste o arquivo da aula ou clique para escolher</b><span class="small">MP4 ou MOV, até 1080p. O vídeo vai do seu navegador direto para o Mux.</span></div><div class="help">' + ic('info','sm') + '<span>A primeira vez aqui: depois do envio, a plataforma converte o vídeo e gera a legenda em português sozinha. Você pode fechar a página.</span></div>' :
      '<div class="up-steps" id="upSteps">' + upSteps() + '</div>') + '</div>' : '';
    body = upPanel + c.modulos.map(function(m, i){
      return '<div class="mod-ed"><div class="mod-ed-h">' + ic('grip','sm') + '<b class="grow">Módulo ' + (i + 1) + ': ' + m.t + '</b><span class="muted small">' + m.aulas.length + (m.aulas.length > 1 ? ' aulas' : ' aula') + '</span><button class="btn btn-g btn-sm" aria-label="Mais opções">' + ic('more') + '</button></div>' +
        m.aulas.map(function(a){ var conv = c.id === 'orcamento' && a.n === 4 && !S.convOk; return '<div class="lrow"><span class="grip">' + ic('grip','sm') + '</span><span>' + a.t + '<small>' + (a.gravada ? a.gravada + ', da aula ao vivo' : 'Legenda em português') + '</small></span><span class="num muted hide-m">' + a.d + '</span><span class="hide-m">' + (conv ? '<span class="chip warn">Convertendo</span>' : stChip('Publicada')) + '</span><button class="btn btn-g btn-sm" aria-label="Editar">' + ic('edit','sm') + '</button></div>'; }).join('') +
        (i === c.modulos.length - 1 ? '<div class="lrow" style="grid-template-columns:1fr"><button class="btn btn-s btn-sm" style="justify-self:start" data-act="novaAula">' + ic('plus','sm') + 'Nova aula</button></div>' : '') + '</div>';
    }).join('');
  }
  return shellAdmin('cursos', c.titulo, '<div class="ph"><div><div class="muted small"><a href="#/admin/cursos">Cursos</a> / editar</div><h1 style="margin-top:6px">' + c.titulo + '</h1></div><div class="row"><span class="small muted">Publicado</span><button class="switch" role="switch" aria-checked="true" data-act="sw" aria-label="Publicado"></button><a class="btn btn-s" href="#/aluno/curso/' + c.id + '">' + ic('eye','sm') + 'Ver a página</a></div></div>' + tabs + body);
}
function upList(){ var st = ['Enviando para o Mux','Convertendo em 360p, 540p, 720p e 1080p','Gerando a legenda em português']; if (has(4)) st.push('Edição automática: 14 sugestões de corte para revisar'); st.push('Pronta para publicar'); return st; }
function upSteps(){
  var st = upList(), k = S.upStage, last = st.length - 1;
  return st.map(function(s, i){
    var done = i < k || (i === last && k >= last), run = i === k && i !== last;
    var lab = s + (i === 0 && k === 0 ? ' · ' + Math.round(S.upPct) + '%' : '');
    var extra = has(4) && i === 3 ? (done ? ' <a href="#/admin/edicao">Revisar</a>' : '') + novo(4) : '';
    return '<div class="up-step ' + (done ? 'done' : run ? 'run' : '') + '"><span class="st">' + (done ? ic('check') : '') + '</span><span>' + lab + extra + '</span></div>' +
      (i === 0 && k === 0 ? '<div class="meter" style="margin:-2px 0 4px 34px"><i style="--w:' + S.upPct + '%"></i></div>' : '');
  }).join('') + (k >= last ? '<div class="row"><button class="btn btn-p" data-act="publicarAula">Publicar a aula</button><span class="muted small">Os alunos do curso recebem um aviso.</span></div>' : '');
}
function runUpload(){
  S.upStage = 0; S.upPct = 0;
  var paint = function(){ var h = $('#upSteps'); if (h) h.innerHTML = upSteps(); return !!h; };
  var t = setInterval(function(){
    if (!$('#upSteps')){ clearInterval(t); return; }
    S.upPct = Math.min(100, S.upPct + 6);
    if (S.upPct >= 100){ clearInterval(t); S.upStage = 1; paint(); next(); return; }
    paint();
  }, 120);
  function next(){
    var last = upList().length - 1;
    var k = setInterval(function(){ if (!$('#upSteps')){ clearInterval(k); return; } S.upStage++; paint(); if (S.upStage >= last) clearInterval(k); }, 1100);
  }
}

/* ---------- admin: ao vivo ---------- */
function aAoVivo(){
  var auto = has(3);
  var rows = D.AO_VIVO.map(function(x, i){ return '<tr><td><b>' + x.t + '</b><div class="muted tiny">' + x.profs.map(function(p){ return prof(p).nome; }).join(' e ') + '</div></td><td class="num">' + x.dia + '/' + (x.mes === 'NOV' ? '11' : '12') + ' · ' + x.hora + '</td><td>' + (has(3) && S.sala !== 'zoom' ? '<span class="chip navy">' + ic('live','sm') + 'Sala do IAE</span>' : '<span class="chip">' + ic('link','sm') + 'Zoom, link por aluno</span>') + '</td><td class="r num">' + [42, 40, 118, 23][i] + '</td></tr>'; });
  var pub = S.pubOk.e2;
  var grav = auto ? '<div class="card"><div class="pad row between wrap" style="gap:14px"><div class="row" style="align-items:flex-start">' + ic('refresh','lg') + '<div><b>Publicação automática' + novo(3) + '</b><div class="muted small">O Zoom avisa a plataforma quando a gravação fica pronta. Ela entra no curso certo, com legenda, em até 1 hora.</div></div></div><button class="switch" role="switch" aria-checked="true" data-act="sw" aria-label="Publicação automática"></button></div>' +
      [['Encontro 2: negociação com suprimentos','Contratos com fornecedores · módulo 2','Publicada sozinha ontem às 23:41'],['Indicadores que a diretoria lê','Orçamento do jurídico · módulo 3','Publicada sozinha em 12/11 às 22:58']].map(function(g){ return '<div class="ag" style="grid-template-columns:minmax(0,1fr) auto"><div><h3>' + g[0] + '</h3><p>' + g[1] + ' · ' + g[2] + '</p></div>' + stChip('Publicada') + '</div>'; }).join('') + '</div>' :
    '<div class="card">' + '<div class="ag" style="grid-template-columns:minmax(0,1fr) auto"><div><h3>Encontro 2: negociação com suprimentos</h3><p>Gravada no Zoom em 11/11 · 2h58 · baixada para o Mux</p></div>' +
      (pub ? stChip('Publicada') : '<div class="row"><select class="inp" style="height:32px; width:auto; font-size:13px"><option>Contratos com fornecedores, módulo 2</option></select><button class="btn btn-p btn-sm" data-act="pubGrav" data-id="e2">Publicar no curso</button></div>') + '</div>' +
      '<div class="ag" style="grid-template-columns:minmax(0,1fr) auto"><div><h3>Indicadores que a diretoria lê</h3><p>Orçamento do jurídico · módulo 3 · publicada em 12/11</p></div>' + stChip('Publicada') + '</div></div>';
  var onde = has(3) ? '<div class="toolbar"><span class="small strong">Onde acontece a aula</span><div class="filter">' + [['sala','Sala do IAE'],['zoom','Zoom']].map(function(o){ return '<button data-act="sala" data-v="' + o[0] + '" aria-pressed="' + ((S.sala || 'sala') === o[0]) + '">' + o[1] + '</button>'; }).join('') + '</div>' + novo(3) + '</div>' : '';
  return shellAdmin('ao-vivo', 'Ao vivo', head('Ao vivo', 'Agenda das aulas ao vivo e as gravações que viram aula.', '<button class="btn btn-p" data-act="toastNovo">' + ic('plus') + 'Agendar aula</button>') + onde +
    tbl([{t:'Aula'},{t:'Quando'},{t:'Onde'},{t:'Inscritos',r:1}], rows) + '<section class="sec"><div class="sec-h"><h2>Gravações</h2><p>' + (auto ? 'Entram sozinhas no curso' : 'Escolha o curso e publique com um clique') + '</p></div>' + grav + '</section>');
}

/* ---------- admin: alunos, vendas, cupons, e-mails ---------- */
function aAlunos(){
  var cols = [{t:'Aluno'},{t:'Cursos'},{t:'Último acesso'},{t:'Progresso'}].concat(has(2) ? [{t:'Clube'}] : []).concat(has(3) ? [{t:'Turma ou escritório'}] : []);
  var rows = D.ALUNOS.filter(function(a){ return (!a.empresa && !a.turma) || has(3); }).map(function(a){
    return '<tr><td><div class="who">' + av({ini:a.nome.split(' ').map(function(x){ return x[0]; }).join('').slice(0, 2), cor:'sand'}, 'sm') + '<span><b>' + a.nome + '</b><small>' + a.email + (a.bolsa ? ' · bolsa ' + a.bolsa : '') + '</small></span></div></td><td>' + a.cursos + '</td><td>' + a.ult + '</td><td style="min-width:140px"><div class="row"><div class="meter grow"><i style="--w:' + a.prog + '%"></i></div><span class="num small">' + a.prog + '%</span></div></td>' +
      (has(2) ? '<td>' + (a.clube ? '<span class="chip navy">' + a.clube + '</span>' : '<span class="muted">-</span>') + '</td>' : '') + (has(3) ? '<td class="small">' + (a.empresa || a.turma || '<span class="muted">-</span>') + '</td>' : '') + '</tr>';
  });
  return shellAdmin('alunos', 'Alunos', head('Alunos', D.ALUNOS.length + ' alunos nesta demonstração. Libere acesso, veja o progresso e fale com cada um.', '<button class="btn btn-s" data-act="toastNovo">' + ic('plus') + 'Liberar acesso manual</button>') +
    '<div class="toolbar"><label class="search">' + ic('search','sm') + '<input placeholder="Nome ou e-mail" aria-label="Buscar aluno"></label></div>' + tbl(cols, rows));
}
function aVendas(){
  var rows = D.VENDAS.filter(function(v){ return !v.f || has(v.f); }).map(function(v){ return '<tr><td class="num small">' + v.quando + '</td><td><b>' + v.quem + '</b></td><td>' + v.o + '</td><td>' + v.meio + '</td><td class="r num">' + v.v + '</td><td>' + stChip(v.st) + '</td>' + (has(3) ? '<td>' + (v.nf ? '<a href="#/admin/vendas">' + v.nf + '</a>' : '<span class="muted small">quando pagar</span>') + '</td>' : '') + '</tr>'; });
  var nota = has(3) ? '<div class="help" style="margin-bottom:14px">' + ic('file','sm') + '<span><b>Nota fiscal automática' + novo(3) + '.</b> A cada pagamento confirmado, o Asaas emite a NFS-e e o aluno recebe por e-mail.</span></div>' : '<div class="help" style="margin-bottom:14px">' + ic('info','sm') + '<span>Até a nota fiscal automática chegar, a nota sai pelo painel do Asaas.</span></div>';
  return shellAdmin('vendas', 'Vendas', head('Vendas', 'Pagamentos pelo Asaas: Pix e boleto a R$ 1,99, cartão a 2,99% + R$ 0,49.', '<div class="filter"><button aria-pressed="true">Novembro</button><button>Outubro</button></div>') + nota +
    tbl([{t:'Quando'},{t:'Quem'},{t:'O quê'},{t:'Meio'},{t:'Valor',r:1},{t:'Situação'}].concat(has(3) ? [{t:'Nota fiscal'}] : []), rows));
}
function aCupons(){
  var rows = [['UERJ','Bolsa por e-mail @uerj.br','50%','Sem validade','Sem limite','6','Ativo',1],['BOASVINDAS10','Cupom','10%','até 31/12/2026','40 usos','3','Ativo',1],['OABRIO','Bolsa por lista da OAB Rio','30%','Sem validade','Sem limite','0','Rascunho',1],['CLUBE15','Desconto de membro do clube','15%','Sem validade','Sem limite','9','Ativo',2]].filter(function(r){ return has(r[7]); })
    .map(function(r){ return '<tr><td><b class="num">' + r[0] + '</b></td><td>' + r[1] + '</td><td class="num">' + r[2] + '</td><td>' + r[3] + '</td><td>' + r[4] + '</td><td class="r num">' + r[5] + '</td><td>' + stChip(r[6]) + (r[7] > 1 ? novo(r[7]) : '') + '</td></tr>'; });
  var form = S.novoCupom ? '<div class="card pad stack-l" style="margin-bottom:16px"><b>Novo cupom</b><div class="cols-3"><div class="field"><label>Código</label><input class="inp" value="BLACKIAE"></div><div class="field"><label>Desconto</label><input class="inp" value="20%"></div><div class="field"><label>Validade</label><input class="inp" value="30/11/2026"></div></div><div class="cols-3"><div class="field"><label>Limite de usos</label><input class="inp" value="50"></div><div class="field"><label>Vale para</label><select class="inp"><option>Todos os cursos</option></select></div></div><div class="row"><button class="btn btn-p" data-act="salvarCupom">Criar cupom</button><button class="btn btn-g" data-act="cupomForm">Cancelar</button></div></div>' : '';
  return shellAdmin('cupons', 'Cupons e bolsas', head('Cupons e bolsas', 'A bolsa da UERJ confere o e-mail institucional na hora da compra.', '<button class="btn btn-p" data-act="cupomForm">' + ic('plus') + 'Novo cupom</button>') + form +
    tbl([{t:'Código'},{t:'Tipo'},{t:'Desconto'},{t:'Validade'},{t:'Limite'},{t:'Usos',r:1},{t:'Situação'}], rows));
}
function aEmails(){
  var T = [['Boas-vindas','Quando a conta é criada',1,'Boas-vindas ao IAE','Que bom ter você aqui, Mariana. Sua conta está pronta. Para entrar, você não precisa de senha: é só pedir um link com o seu e-mail.','Entrar na plataforma'],
    ['Compra confirmada','Quando o pagamento cai',1,'Pagamento confirmado: Contratos com fornecedores','Recebemos o seu pagamento de R$ 2.000,00 por Pix. O recibo está anexo.','Ver meus pagamentos'],
    ['Acesso liberado','Junto com a compra',1,'Seu acesso está liberado','O curso Contratos com fornecedores já está na sua conta. O botão abaixo leva direto à primeira aula, sem pedir senha.','Assistir à aula 1'],
    ['Lembrete de aula ao vivo','Na véspera, às 18h',1,'Amanhã, 19h: encontro 3 de Contratos com fornecedores','Com Gustavo Costa e Beatriz Carvalho. O seu link é pessoal. Se não puder ir, a gravação entra no curso.','Ver na agenda'],
    ['Assinatura do clube confirmada','Quando a assinatura começa',2,'Você agora é membro do Clube IAE','Seu plano anual começou hoje. As aulas curtas do clube e os benefícios dos parceiros já estão liberados.','Abrir o clube'],
    ['Pagamento da assinatura recusado','Quando a cobrança falha',2,'Não conseguimos cobrar sua assinatura','O cartão final 4821 recusou a cobrança de hoje. Atualize o cartão em até 5 dias para não pausar o clube.','Atualizar cartão'],
    ['Resposta à sua dúvida','Quando o professor responde',3,'Gustavo Costa respondeu sua dúvida','Na aula 3 de Orçamento do jurídico, no minuto 21:19. Clique para ver a resposta no ponto exato da aula.','Ver resposta'],
    ['Certificado disponível','Quando o curso é concluído',3,'Seu certificado está pronto','Parabéns por concluir Do escritório para a empresa. O certificado tem código de verificação e pode ir para o LinkedIn.','Baixar certificado']].filter(function(t){ return has(t[2]); });
  var i = Math.min(S.mail || 0, T.length - 1), m = T[i];
  return shellAdmin('emails', 'E-mails automáticos', head('E-mails automáticos', 'Saem sozinhos, na marca do IAE, pelo Resend.') + '<div class="cols-2" style="grid-template-columns:minmax(0,.9fr) minmax(0,1.2fr)"><div class="card list-sel">' + T.map(function(t, k){ return '<button data-act="mail" data-i="' + k + '" aria-pressed="' + (k === i) + '"><span class="grow"><b>' + t[0] + novo(t[2]) + '</b><small>' + t[1] + '</small></span><span class="switch" role="switch" aria-checked="true" aria-label="Ligado"></span></button>'; }).join('') + '</div>' +
    '<div class="mail"><div class="mail-h">' + logo('assinatura') + '</div><div class="mail-b"><span class="muted tiny">Assunto: ' + m[3] + '</span><h3>' + m[3] + '</h3><p>' + m[4] + '</p><a class="btn btn-p" style="justify-self:start" href="#/admin/emails">' + m[5] + '</a><p class="small">Equipe do IAE</p></div><div class="mail-f">Instituto de Advocacia Empresarial · Rio de Janeiro. Você recebe este e-mail porque tem conta na plataforma.</div></div></div>');
}

/* ---------- admin: fase 2 ---------- */
function aClube(){
  var rows = [['Mariana Teixeira','Anual','12/11/2026','Cartão 12x','Ativa'],['Pedro Albuquerque','Mensal','03/11/2026','Pix Automático','Ativa'],['Caio Ramos','Mensal','15/10/2026','Cartão','Ativa'],['Júlia Andrade','Anual','28/09/2026','Cartão 12x','Ativa'],['Felipe Nogueira','Mensal','10/09/2026','Cartão','Em atraso'],['Sofia Barreto','Mensal','02/09/2026','Pix Automático','Cancelada']].map(function(r){ return '<tr><td><b>' + r[0] + '</b></td><td>' + r[1] + '</td><td class="num">' + r[2] + '</td><td>' + r[3] + '</td><td>' + stChip(r[4]) + '</td></tr>'; });
  return shellAdmin('clube', 'Clube', head('Clube' + novo(2), 'Assinatura mensal e anual, convivendo com a compra vitalícia dos cursos.', '<button class="btn btn-s" data-act="salvar">Editar planos</button>') +
    '<dl class="stat-strip" style="margin-bottom:28px"><div><dt>Assinantes ativos</dt><dd>64</dd><span class="d up">+9 no mês</span></div><div><dt>Receita recorrente</dt><dd>R$ 5.094</dd><span class="small muted">por mês</span></div><div><dt>Mensal e anual</dt><dd>41 · 23</dd><span class="small muted">planos</span></div><div><dt>Em atraso</dt><dd>2</dd><span class="d dn">avisados por e-mail</span></div></dl>' +
    '<div class="cols-2"><section><div class="sec-h"><h2>Assinantes</h2></div>' + tbl([{t:'Membro'},{t:'Plano'},{t:'Desde'},{t:'Pagamento'},{t:'Situação'}], rows) + '</section>' +
    '<section><div class="sec-h"><h2>O que o clube inclui</h2></div><div class="card">' + [['Aulas curtas do acervo do clube',true],['Orçamento e gestão do jurídico interno',true],['Do escritório para a empresa',true],['Advocacia in-house na prática',false],['Contratos com fornecedores',false]].map(function(x){ return '<div class="ag" style="grid-template-columns:minmax(0,1fr) auto"><div><h3>' + x[0] + '</h3><p>' + (x[1] ? 'Incluído na assinatura' : 'Só compra, com 15% para membros') + '</p></div><button class="switch" role="switch" aria-checked="' + x[1] + '" data-act="sw" aria-label="Incluir"></button></div>'; }).join('') + '</div></section></div>');
}
function aCurtas(){
  var rows = D.CURTAS.map(function(c, i){ return '<tr><td><b>' + c.titulo + '</b></td><td>' + prof(c.prof).nome + '</td><td class="num">' + c.d + '</td><td class="num">' + c.preco + '</td><td><button class="switch" role="switch" aria-checked="' + (c.id !== 'c1' && c.id !== 'c3') + '" data-act="sw" aria-label="No clube"></button></td><td class="r num">' + [14, 22, 9, 17, 11][i] + '</td></tr>'; });
  return shellAdmin('aulas-curtas', 'Aulas curtas', head('Aulas curtas' + novo(2), 'Conteúdos de 30 a 40 minutos com compra avulsa em 1 clique.', '<button class="btn btn-p" data-act="toastNovo">' + ic('plus') + 'Nova aula curta</button>') + tbl([{t:'Aula'},{t:'Professor'},{t:'Duração'},{t:'Preço avulso'},{t:'No clube'},{t:'Vendas',r:1}], rows));
}
function aBeneficios(){
  var rows = benef().map(function(p){ return '<tr><td><div class="who"><span class="avatar ' + p.cor + ' sm" style="border-radius:6px">' + ic(p.i, 'sm') + '</span><b>' + p.n + '</b></div></td><td>' + p.d + '</td><td class="num">' + (p.code || '-') + '</td><td>' + stChip(p.st === 'Em breve' ? 'Rascunho' : 'Ativo') + '</td></tr>'; });
  return shellAdmin('beneficios', 'Benefícios', head('Benefícios do clube' + novo(2), 'Parceiros, ofertas e códigos que aparecem para os membros.', '<button class="btn btn-p" data-act="toastNovo">' + ic('plus') + 'Novo parceiro</button>') + tbl([{t:'Parceiro'},{t:'Oferta'},{t:'Código'},{t:'Situação'}], rows));
}

/* ---------- admin: fase 3 ---------- */
function aNumeros(){
  var sem = [102,108,111,118,121,129,134,140,149,155,171,186];
  var ret = [100, 94, 81, 62, 55];
  return shellAdmin('numeros', 'Números', head('Números' + novo(3), 'Vendas, alunos ativos, conclusão e onde o aluno para.', '<div class="filter"><button aria-pressed="true">90 dias</button><button>12 meses</button></div>') + stats() +
    '<div class="cols-2e sec"><section class="card pad"><div class="sec-h"><h2>Alunos ativos por semana</h2><span class="legend"><span><i style="background:var(--navy)"></i>assistiram pelo menos uma aula</span></span></div>' + lineChart(sem) + '</section>' +
    '<section class="card pad"><div class="sec-h"><h2>Onde os alunos param</h2><p>Orçamento do jurídico</p></div>' + barChart(ret) + '<p class="muted small" style="margin-top:12px">A maior queda é entre a aula 3 e a aula 4. Vale olhar o fim da aula 3.</p></section></div>' +
    '<section class="sec"><div class="sec-h"><h2>Por curso</h2></div>' + tbl([{t:'Curso'},{t:'Vendas no mês',r:1},{t:'Receita',r:1},{t:'Conclusão',r:1},{t:'Nota média',r:1}], [['Advocacia in-house na prática',9,'R$ 18.000','41%','9,3'],['Contratos com fornecedores',6,'R$ 12.000','38%','9,1'],['Orçamento e gestão do jurídico interno',5,'R$ 3.105','62%','9,4'],['A cabeça do cliente corporativo','1 escritório','R$ 7.200','50%','9,0']].map(function(r){ return '<tr><td><b>' + r[0] + '</b></td><td class="r num">' + r[1] + '</td><td class="r num">' + r[2] + '</td><td class="r num">' + r[3] + '</td><td class="r num">' + r[4] + '</td></tr>'; })) + '</section>');
}
function lineChart(v){
  var W = 560, H = 220, pl = 34, pr = 12, pt = 14, pb = 26, mx = 200, n = v.length;
  var x = function(i){ return pl + i * (W - pl - pr) / (n - 1); }, y = function(val){ return pt + (1 - val / mx) * (H - pt - pb); };
  var path = v.map(function(val, i){ return (i ? 'L' : 'M') + x(i).toFixed(1) + ' ' + y(val).toFixed(1); }).join(' ');
  var area = path + ' L' + x(n - 1) + ' ' + y(0) + ' L' + x(0) + ' ' + y(0) + 'Z';
  var grid = [0, 50, 100, 150, 200].map(function(g){ return '<line class="gl" x1="' + pl + '" x2="' + (W - pr) + '" y1="' + y(g) + '" y2="' + y(g) + '"/><text x="' + (pl - 8) + '" y="' + (y(g) + 4) + '" text-anchor="end">' + g + '</text>'; }).join('');
  var lab = v.map(function(_, i){ return i % 3 === 0 || i === n - 1 ? '<text x="' + x(i) + '" y="' + (H - 6) + '" text-anchor="middle">S' + (i + 1) + '</text>' : ''; }).join('');
  var pts = v.map(function(val, i){ return '<circle cx="' + x(i) + '" cy="' + y(val) + '" r="' + (i === n - 1 ? 4.5 : 3) + '" fill="' + (i === n - 1 ? 'var(--navy)' : '#fff') + '" stroke="var(--navy)" stroke-width="2" data-tip="Semana ' + (i + 1) + ': ' + val + ' alunos ativos"/>'; }).join('');
  return '<svg class="chart" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Alunos ativos por semana, de 102 a 186">' + grid + '<path d="' + area + '" fill="var(--navy)" opacity=".07"/><path d="' + path + '" fill="none" stroke="var(--navy)" stroke-width="2.4" stroke-linejoin="round"/>' + pts + lab + '<text x="' + x(n - 1) + '" y="' + (y(v[n - 1]) - 12) + '" text-anchor="end" style="font-weight:700; fill:var(--navy)">186</text></svg>';
}
function barChart(v){
  var W = 560, H = 220, pl = 34, pr = 12, pt = 18, pb = 26, n = v.length, bw = (W - pl - pr) / n;
  var y = function(val){ return pt + (1 - val / 100) * (H - pt - pb); };
  var grid = [0, 25, 50, 75, 100].map(function(g){ return '<line class="gl" x1="' + pl + '" x2="' + (W - pr) + '" y1="' + y(g) + '" y2="' + y(g) + '"/><text x="' + (pl - 8) + '" y="' + (y(g) + 4) + '" text-anchor="end">' + g + '%</text>'; }).join('');
  var bars = v.map(function(val, i){ var bx = pl + i * bw + bw * .22, w = bw * .56, worst = i === 3; return '<rect x="' + bx + '" y="' + y(val) + '" width="' + w + '" height="' + (y(0) - y(val)) + '" rx="3" fill="' + (worst ? 'var(--focus)' : 'var(--navy-3)') + '" data-tip="Aula ' + (i + 1) + ': ' + val + '% dos alunos chegam aqui"/><text x="' + (bx + w / 2) + '" y="' + (y(val) - 6) + '" text-anchor="middle" style="font-weight:600; fill:var(--ink)">' + val + '%</text><text x="' + (bx + w / 2) + '" y="' + (H - 6) + '" text-anchor="middle">Aula ' + (i + 1) + '</text>'; }).join('');
  return '<svg class="chart" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Porcentagem de alunos que chegam a cada aula">' + grid + bars + '</svg>';
}
function aTurmas(){
  return shellAdmin('turmas', 'Turmas', head('Turmas' + novo(3), 'Turmas com data de início, cronograma e aulas liberadas por data.', '<button class="btn btn-p" data-act="toastNovo">' + ic('plus') + 'Nova turma</button>') +
    tbl([{t:'Turma'},{t:'Curso'},{t:'Início'},{t:'Encontros'},{t:'Alunos',r:1},{t:'Situação'}], [['Online 2027.1','Contratos com fornecedores','04/11/2026','3 de 8','42','Ativa'],['Online SP 2027.1','Advocacia in-house na prática','09/03/2027','0 de 8','27','Ativa'],['Presencial Centro 2027.1','Advocacia in-house na prática','10/03/2027','0 de 8','18','Ativa']].map(function(r){ return '<tr><td><b>' + r[0] + '</b></td><td>' + r[1] + '</td><td class="num">' + r[2] + '</td><td>' + r[3] + '</td><td class="r num">' + r[4] + '</td><td>' + stChip(r[5]) + '</td></tr>'; })) +
    '<section class="sec"><div class="sec-h"><h2>Cronograma da turma online 2027.1</h2><p>Cada encontro libera para a turma no dia e na hora da aula</p></div><div class="card">' + ['04/11','11/11','18/11','25/11','02/12','09/12','16/12','13/01'].map(function(d, i){ return '<div class="lrow" style="grid-template-columns:90px minmax(0,1fr) 150px"><b class="num">' + d + ' · 19h</b><span>Encontro ' + (i + 1) + '</span><span>' + (i < 2 ? stChip('Publicada') : i === 2 ? '<span class="chip live">Hoje</span>' : '<span class="chip">Libera no dia</span>') + '</span></div>'; }).join('') + '</div></section>');
}
function aEscritorios(){
  return shellAdmin('escritorios', 'Escritórios', head('Escritórios' + novo(3), 'Venda por assentos: o escritório compra, convida a equipe e recebe a fatura.', '<button class="btn btn-p" data-act="toastNovo">' + ic('plus') + 'Novo contrato</button>') +
    tbl([{t:'Escritório'},{t:'Curso'},{t:'Assentos'},{t:'Gestor'},{t:'Fatura'}], [['Barros Moura Advogados','A cabeça do cliente corporativo','8 de 10 em uso','Thiago Moura','Paga'],['Lacerda e Pinto Sociedade','A cabeça do cliente corporativo','4 de 6 em uso','Carla Pinto','Aguardando'],['Vasconcelos Advocacia','Contratos com fornecedores','0 de 5 em uso','Marcos Vasconcelos','Rascunho']].map(function(r){ return '<tr><td><div class="who"><span class="avatar cocoa sm" style="border-radius:6px">' + ic('building','sm') + '</span><b>' + r[0] + '</b></div></td><td>' + r[1] + '</td><td>' + r[2] + '</td><td>' + r[3] + '</td><td>' + stChip(r[4] === 'Paga' ? 'Pago' : r[4]) + '</td></tr>'; })) +
    '<p class="muted small" style="margin-top:12px">Escritórios fictícios. <a href="#/escritorio/painel">Ver o painel do gestor</a>.</p>');
}
function aComunidade(){
  var pend = [['Caio Ramos','Existe modelo da planilha de contingências para baixar?','Dúvida · aula 3 de Orçamento do jurídico · 28:09'],['Usuário novo','Vendo curso de concurso com desconto, chama no direct!','Comentário · Comunidade do clube']];
  return shellAdmin('comunidade', 'Comunidade e dúvidas', head('Comunidade e dúvidas' + novo(3), 'O que os alunos perguntam nas aulas e na comunidade. Responda ou modere daqui.') +
    '<div class="card">' + pend.map(function(p, i){ var done = S.sel['m' + i]; return '<div class="ag" style="grid-template-columns:40px minmax(0,1fr) auto">' + av({ini:p[0].split(' ').map(function(x){ return x[0]; }).join('').slice(0, 2), cor:'sand'}, 'sm') + '<div><h3>' + p[1] + '</h3><p>' + p[0] + ' · ' + p[2] + '</p></div>' +
      (done ? stChip(done) : i === 0 ? '<div class="row"><button class="btn btn-p btn-sm" data-act="mod" data-k="m0" data-v="Respondida">Responder</button></div>' : '<div class="row"><button class="btn btn-s btn-sm" data-act="mod" data-k="m1" data-v="Aprovado">Aprovar</button><button class="btn btn-d btn-sm" data-act="mod" data-k="m1" data-v="Ocultado">Ocultar</button></div>') + '</div>'; }).join('') + '</div>');
}
function aAssistente(){
  var qs = [['Qual a diferença entre provável, possível e remoto?','Respondida · citou aula 3, 12:40','good'],['Honorário de êxito entra no orçamento?','Respondida · citou aula 3, 28:00','good'],['O IAE tem curso de direito tributário?','Sem resposta na base · encaminhada ao Vinicius','warn'],['Como contratar escritório externo?','Respondida · citou a aula curta de escritório externo, 04:10','good']];
  return shellAdmin('assistente', 'Assistente de IA', head('Assistente de IA' + novo(3), 'Responde aos alunos só com o conteúdo do IAE e sempre mostra a aula e o minuto de onde tirou a resposta.') +
    '<div class="cols-2"><section><div class="sec-h"><h2>Perguntas recentes</h2></div><div class="card">' + qs.map(function(q){ return '<div class="ag" style="grid-template-columns:minmax(0,1fr) auto"><div><h3>' + q[0] + '</h3><p>' + q[1] + '</p></div><span class="dot ' + q[2] + '"></span></div>'; }).join('') + '</div></section>' +
    '<section><div class="sec-h"><h2>Base de conhecimento</h2></div><div class="card pad stack"><div class="row between small"><span>Aulas transcritas</span><b class="num">14</b></div><div class="row between small"><span>Documentos do IAE</span><b class="num">3</b></div><div class="row between small"><span>Última atualização</span><b>hoje, 06:00</b></div><div class="hr" style="margin:4px 0"></div><div class="drop">' + ic('upload','lg') + '<b>Adicionar documento</b><span class="small">PDF ou texto: regulamento, FAQ, ementas</span></div><label class="row small"><button class="switch" role="switch" aria-checked="true" data-act="sw" aria-label="Encaminhar"></button><span>Quando não souber, encaminhar a pergunta para a equipe</span></label></div></section></div>');
}
function aCertificados(){
  return shellAdmin('certificados', 'Certificados', head('Certificados' + novo(3), 'Emitidos sozinhos quando o aluno cumpre a regra de conclusão do curso.') +
    '<div class="cols-2"><section>' + tbl([{t:'Aluno'},{t:'Curso'},{t:'Emitido'},{t:'Código'}], [['Mariana Teixeira','Do escritório para a empresa','30/10/2026','IAE-2026-7K4P-0193'],['Luíza Fontes','Do escritório para a empresa','29/10/2026','IAE-2026-2HQ9-0192'],['Pedro Albuquerque','Do escritório para a empresa','27/10/2026','IAE-2026-9MX1-0188']].map(function(r){ return '<tr><td><b>' + r[0] + '</b></td><td>' + r[1] + '</td><td class="num">' + r[2] + '</td><td class="num small"><a href="#/publico/validar">' + r[3] + '</a></td></tr>'; })) + '</section>' +
    '<section class="card pad stack-l"><b>Regra de conclusão</b><label class="row small"><button class="switch" role="switch" aria-checked="true" data-act="sw" aria-label="Aulas"></button><span>Assistir a 100% das aulas</span></label><label class="row small"><button class="switch" role="switch" aria-checked="true" data-act="sw" aria-label="Presença"></button><span>Presença em 75% dos encontros ao vivo</span></label><label class="row small"><button class="switch" role="switch" aria-checked="false" data-act="sw" aria-label="Quiz"></button><span>Nota mínima no exercício final</span></label><span class="muted tiny">O texto sempre diz "curso livre", como pede a regra do MEC para cursos sem instituição credenciada.</span></section></div>');
}
function aFunil(){
  var leads = [['Ana Carolina Prado','Estou terminando a faculdade','hoje, 09:14'],['Bruno Tavares','Trabalho em escritório','hoje, 08:02'],['Fernanda Lopes','Já trabalho em empresa','ontem, 22:40'],['Gabriel Azevedo','Estou terminando a faculdade','ontem, 19:15']];
  return shellAdmin('funil', 'Aula aberta', head('Aula aberta' + novo(3), 'O funil da aula gratuita: página, formulário e aula. Cada inscrito vai para o CRM Nexoris.', '<a class="btn btn-s" href="#/publico/aula-aberta">' + ic('eye','sm') + 'Ver a página</a>') +
    '<dl class="stat-strip" style="margin-bottom:24px; grid-template-columns:repeat(3,1fr)"><div><dt>Visitas na página</dt><dd>214</dd></div><div><dt>Inscritos</dt><dd>12</dd></div><div><dt>Viraram alunos</dt><dd>2</dd></div></dl>' +
    tbl([{t:'Inscrito'},{t:'Perfil'},{t:'Quando'},{t:'CRM'}], leads.map(function(l){ return '<tr><td><b>' + l[0] + '</b></td><td>' + l[1] + '</td><td>' + l[2] + '</td><td><span class="chip good">' + ic('check','sm') + 'No Nexoris</span></td></tr>'; })));
}
function aIntegracoes(){
  var I = [['Asaas','Pagamentos, assinaturas e nota fiscal','Conectado',1],['Mux','Vídeo: envio, conversão, legenda e entrega','Conectado',1],['Zoom','Aulas ao vivo e gravações','Conectado',1],['Resend','E-mails automáticos','Conectado',1],['CRM Nexoris','Lead da aula aberta e compra viram contato','Conectado',3],['Google Analytics','Eventos de compra, início e fim de aula','Conectado',3]].filter(function(x){ return has(x[3]); });
  return shellAdmin('integracoes', 'Integrações', head('Integrações', 'As contas ficam no CNPJ do IAE. A plataforma só conversa com elas.') + '<div class="cols-3">' + I.map(function(x){ return '<div class="card pad stack"><div class="row between"><b>' + x[0] + novo(x[3]) + '</b>' + stChip(x[2]) + '</div><span class="muted small">' + x[1] + '</span><span class="tiny muted">Último evento há ' + ['2 min','14 min','1 h','5 min','9 min','1 min'][I.indexOf(x)] + '</span></div>'; }).join('') + '</div>');
}

/* ---------- admin: fase 4 ---------- */
function aTrilhas(){
  var C = [['Do escritório para a empresa','12 h','Nenhum','2026.2'],['Orçamento e gestão do jurídico interno','5 h','Nenhum','2026.2'],['Contratos com fornecedores','24 h','Nenhum','2027.1'],['Advocacia in-house na prática','24 h','1 e 2','2027.2'],['Compliance e governança no jurídico','24 h','4','2027.2'],['Contencioso estratégico de empresa','24 h','4','2028.1']];
  return shellAdmin('trilhas', 'Trilhas', head('Trilhas' + novo(4), 'Ordem dos cursos, pré-requisitos e oferta por período. Gatilho: convênio com instituição de ensino assinado.', '<button class="btn btn-p" data-act="toastNovo">' + ic('plus') + 'Adicionar curso</button>') +
    '<div class="card">' + C.map(function(c, i){ return '<div class="lrow" style="grid-template-columns:22px 34px minmax(0,1fr) 160px 90px"><span class="grip">' + ic('grip','sm') + '</span><span class="mn" style="width:28px; height:28px; border-radius:6px; background:var(--navy-wash); color:var(--navy); display:grid; place-items:center; font-weight:700; font-size:13px">' + (i + 1) + '</span><span><b style="font-weight:600">' + c[0] + '</b><small>' + c[1] + '</small></span><span class="small">' + (c[2] === 'Nenhum' ? '<span class="muted">Sem pré-requisito</span>' : '<span class="chip sand">Exige ' + c[2] + '</span>') + '</span><span class="chip">' + c[3] + '</span></div>'; }).join('') + '</div>' +
    '<div class="help" style="margin-top:16px">' + ic('info','sm') + '<span>Carga da trilha: 113 h hoje. Uma pós com instituição credenciada pede 360 h; os módulos novos entram aqui conforme o convênio.</span></div>');
}
function aEdicao(){
  var sg = [['scissors','Cortar 18 silêncios','11 min no total, todos acima de 4 segundos','s'],['scissors','Cortar 6 erros e repetições','Trechos em que o professor recomeçou a frase','e'],['layers','Criar 9 capítulos','Títulos tirados da fala, um por mudança de slide','c'],['file','Resumo da aula','Um parágrafo para a página da aula e para o assistente','r'],['clock','4 cortes curtos para redes','De 40 a 90 segundos, com legenda','k']];
  var cuts = [[6,1.4],[14,.8],[22,1.1],[31,.6],[38,2.2],[47,.9],[55,1.3],[63,.7],[71,1.6],[80,.8],[88,1.2]];
  var wave = ''; for (var i = 0; i < 120; i++){ wave += '<i style="height:' + (18 + Math.abs(Math.sin(i * .7) * 46 + Math.sin(i * 2.3) * 18)) + '%"></i>'; }
  var aprovados = sg.filter(function(s){ return S.sugOk[s[3]]; }).length;
  return shellAdmin('edicao', 'Edição automática', head('Edição automática' + novo(4), 'A IA propõe, o admin aprova. Nada vai ao ar sem o seu clique.') +
    '<div class="card pad stack-l"><div class="row between wrap"><div><b>Encontro 3: cláusulas de preço e reajuste</b><div class="muted small">Gravação crua de 3h12 · Contratos com fornecedores</div></div><span class="chip navy">5 sugestões prontas</span></div>' +
    '<div class="tl"><div class="wave">' + wave + '</div>' + cuts.map(function(c){ return '<span class="cut' + (S.sugOk.s ? ' ok' : '') + '" style="left:' + c[0] + '%; width:' + c[1] + '%"></span>'; }).join('') + (S.sugOk.c ? [10, 19, 30, 42, 50, 61, 70, 82, 91].map(function(x){ return '<span class="chapm" style="left:' + x + '%"></span>'; }).join('') : '') + '</div>' +
    '<div class="row between small muted"><span>0:00</span><span>Duração final prevista: ' + (S.sugOk.s ? (S.sugOk.e ? '2h57' : '3h01') : '3h12') + '</span><span>3:12:00</span></div></div>' +
    '<div class="card sec">' + sg.map(function(s){ var ok = S.sugOk[s[3]]; return '<div class="sug"><span class="avatar" style="border-radius:8px; background:var(--navy-wash); color:var(--navy)">' + ic(s[0]) + '</span><div><b>' + s[1] + '</b><small>' + s[2] + '</small></div>' + (ok ? '<span class="chip good">' + ic('check','sm') + 'Aprovado</span>' : '<div class="row"><button class="btn btn-g btn-sm">Ver trechos</button><button class="btn btn-p btn-sm" data-act="sug" data-k="' + s[3] + '">Aprovar</button></div>') + '</div>'; }).join('') + '</div>' +
    '<div class="row" style="margin-top:18px"><button class="btn btn-p" ' + (aprovados ? '' : 'disabled') + ' data-act="pubEdit">Publicar versão editada</button><span class="muted small">' + aprovados + ' de 5 aprovadas. Custo estimado desta aula: R$ 1,81 a R$ 19,32.</span></div>');
}
function aVideo(){
  return shellAdmin('video', 'Vídeo e proteção', head('Vídeo e proteção' + novo(4), 'Onde o acervo fica e como ele é protegido. As telas do aluno não mudam.') +
    '<div class="cols-2e"><section class="card pad stack-l"><div class="row between"><b>Acervo de vídeo</b><span class="chip navy">Migrando</span></div><div class="row between small"><span>Mux (entrega gerenciada)</span><span class="num">19 aulas</span></div><div class="row between small"><span>Cloudflare R2 com conversão própria</span><span class="num">31 aulas</span></div><div class="meter"><i style="--w:62%"></i></div>' +
    '<span class="muted small">Gatilho atingido: a conta do Mux passou de US$ 400 por mês. Com o acervo no R2, a entrega custa perto de zero. A troca acontece aula por aula, sem o aluno perceber.</span><dl class="stat-strip" style="grid-template-columns:1fr 1fr"><div><dt>Antes, por mês</dt><dd>R$ 2.108</dd></div><div><dt>Depois, por mês</dt><dd>R$ 306</dd><span class="d up">-85%</span></div></dl></section>' +
    '<section class="card pad stack-l"><b>Proteção</b>' + [['Link que expira em até 4 h, renovado sem o aluno perceber',true],['Sem botão de download',true],['2 sessões ao mesmo tempo por aluno',true],['Nome e parte do e-mail do aluno sobre o vídeo',true],['DRM (Widevine e FairPlay)',false]].map(function(p, i){ return '<label class="row small"><button class="switch" role="switch" aria-checked="' + p[1] + '" data-act="sw" aria-label="' + p[0] + '"></button><span>' + p[0] + (i === 4 ? '<br><span class="muted">R$ 503 por mês mais licença. Ligar só com vazamento comprovado ou contrato que exija.</span>' : '') + '</span></label>'; }).join('') + '</section></div>');
}

/* ---------- escritório (fase 3) ---------- */
function eEscritorio(){
  var eq = [['Thiago Moura','thiago@bmlaw.com.br',50,'Gestor'],['Larissa Barros','larissa@bmlaw.com.br',100,''],['Henrique Dias','henrique@bmlaw.com.br',50,''],['Paula Rezende','paula@bmlaw.com.br',75,''],['Otávio Lins','otavio@bmlaw.com.br',0,'Convite enviado'],['Marina Cardoso','marina@bmlaw.com.br',25,''],['Rodrigo Pires','rodrigo@bmlaw.com.br',50,''],['Bianca Souto','bianca@bmlaw.com.br',100,'']];
  var top = '<div class="top"><div class="top-in"><a class="brand" href="#/escritorio/painel">' + logo('marca') + '</a><span class="chip cocoa" style="background:var(--cocoa); color:#fff; border-color:var(--cocoa)">' + ic('building','sm') + 'Barros Moura Advogados</span><span class="top-sp"></span><span class="small muted">Thiago Moura · gestor</span>' + av({ini:'TM', cor:'cocoa'}) + '</div></div>';
  return top + '<main class="page fade-in"><div class="ph"><div><h1>Equipe no IAE' + novo(3) + '</h1><p>A cabeça do cliente corporativo · duas sessões de 4 h · contrato de 10 assentos</p></div><div class="row"><a class="btn btn-s" href="#/escritorio/painel">' + ic('file','sm') + 'Faturas</a></div></div>' +
    '<dl class="stat-strip" style="margin-bottom:28px"><div><dt>Assentos em uso</dt><dd>8 de 10</dd></div><div><dt>Concluíram</dt><dd>2</dd></div><div><dt>Progresso médio</dt><dd>56%</dd></div><div><dt>Próxima fatura</dt><dd>R$ 1.440</dd><span class="small muted">boleto em 05/12</span></div></dl>' +
    '<div class="cols-2"><section>' + tbl([{t:'Pessoa'},{t:'Progresso'},{t:''}], eq.map(function(p){ return '<tr><td><div class="who">' + av({ini:p[0].split(' ').map(function(x){ return x[0]; }).join(''), cor:'sand'}, 'sm') + '<span><b>' + p[0] + '</b><small>' + p[1] + '</small></span></div></td><td style="min-width:160px"><div class="row"><div class="meter grow"><i style="--w:' + p[2] + '%"></i></div><span class="num small">' + p[2] + '%</span></div></td><td>' + (p[3] ? '<span class="chip ' + (p[3] === 'Gestor' ? 'navy' : 'warn') + '">' + p[3] + '</span>' : '') + '</td></tr>'; })) + '</section>' +
    '<section class="stack-l"><form class="card pad stack" data-act="convite"><b>Convidar para um assento</b><div class="field"><label>E-mail</label><input class="inp" value="nova.advogada@bmlaw.com.br"></div><button class="btn btn-p">Enviar convite</button><span class="muted tiny">A pessoa recebe o link por e-mail e entra sem senha. 2 assentos livres.</span></form>' +
    '<div class="card"><div class="pad" style="padding-bottom:6px"><b>Faturas</b></div>' + [['Novembro','R$ 7.200,00','Paga','NFS-e 000408'],['Dezembro','R$ 1.440,00','Aguardando','vence 05/12']].map(function(f){ return '<div class="ag" style="grid-template-columns:minmax(0,1fr) auto"><div><h3>' + f[0] + ' · ' + f[1] + '</h3><p>' + f[3] + '</p></div>' + stChip(f[2] === 'Paga' ? 'Pago' : f[2]) + '</div>'; }).join('') + '</div></section></div></main>';
}

/* ---------- QR Code ilustrativo ---------- */
function qr(seed){
  var n = 25, h = 0; for (var i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  var rnd = function(){ h ^= h << 13; h >>>= 0; h ^= h >> 17; h ^= h << 5; h >>>= 0; return h / 4294967296; };
  var r = '', fin = function(x, y){ return (x < 8 && y < 8) || (x > n - 9 && y < 8) || (x < 8 && y > n - 9); };
  for (var y = 0; y < n; y++) for (var x = 0; x < n; x++){ if (!fin(x, y) && rnd() > .52) r += '<rect x="' + x + '" y="' + y + '" width="1" height="1"/>'; }
  var f = function(x, y){ return '<rect x="' + (x + .5) + '" y="' + (y + .5) + '" width="6" height="6" fill="none" stroke="currentColor" stroke-width="1"/><rect x="' + (x + 2) + '" y="' + (y + 2) + '" width="3" height="3"/>'; };
  return '<svg viewBox="0 0 25 25" fill="currentColor" style="color:var(--navy)" shape-rendering="crispEdges" aria-label="QR Code ilustrativo">' + r + f(0, 0) + f(n - 7, 0) + f(0, n - 7) + '</svg>';
}

/* ---------- ações ---------- */
function closeMenus(){ var m = $('#meMenu'); if (m) m.classList.remove('on'); var c = $('#cmenu'); if (c){ c.classList.remove('on'); if (P) P.menu = false; } }
var ACT = {
  tgNovo:function(el){ S.mostrarNovo = !S.mostrarNovo; document.body.classList.toggle('mostrar-novo', S.mostrarNovo); el.setAttribute('aria-pressed', S.mostrarNovo); try { localStorage.setItem('iae-proto-novo', S.mostrarNovo ? '1' : '0'); } catch(e){} },
  drawer:function(){ $('#drawer').innerHTML = drawerHTML(); document.body.classList.add('drawer-open'); setTimeout(function(){ var b = $('#drawer .x-btn'); if (b) b.focus(); }, 60); },
  closeDrawer:function(){ document.body.classList.remove('drawer-open'); },
  me:function(el, e){ e.stopPropagation(); $('#meMenu').classList.toggle('on'); },
  filtro:function(el){ S.filtro = el.getAttribute('data-v'); render(); },
  mod:function(el){ if (el.hasAttribute('data-k')){ S.sel[el.getAttribute('data-k')] = el.getAttribute('data-v'); render(); toast(el.getAttribute('data-v') === 'Respondida' ? 'Resposta enviada ao aluno, com aviso por e-mail.' : 'Feito.'); return; } var i = el.getAttribute('data-i'); S.mods[i] = !S.mods[i]; el.parentNode.classList.toggle('open'); el.setAttribute('aria-expanded', !!S.mods[i]); },
  pay:function(el){ S.pay = el.getAttribute('data-v'); render(); },
  bolsa:function(){ S.bolsa = !S.bolsa; if (S.bolsa) S.cupom = ''; render(); if (S.bolsa) toast('Bolsa UERJ de 50% aplicada.'); },
  cupom:function(){ var v = ($('#cup').value || '').trim().toUpperCase(); S.cupom = v; if (v === 'BOASVINDAS10'){ S.bolsa = false; render(); toast('Cupom aplicado: 10% de desconto.'); } else { render(); toast(v ? 'Esse cupom não existe. Tente BOASVINDAS10.' : 'Digite um cupom.'); } },
  copiar:function(){ toast('Copiado.'); },
  pp:function(){ toggle(); },
  skip:function(el){ setT(P.t + (+el.getAttribute('data-v'))); },
  cc:function(){ togCC(); var m = $('#cmenu'); if (m && m.classList.contains('on')) m.innerHTML = menuHTML(); },
  speedQuick:function(){ var sp = [1, 1.25, 1.5, 2], i = sp.indexOf(P.speed); P.speed = sp[(i + 1) % sp.length]; $('#spBtn').textContent = String(P.speed).replace('.', ',') + 'x'; },
  menu:function(el, e){ e.stopPropagation(); var m = $('#cmenu'); P.menu = !m.classList.contains('on'); m.innerHTML = menuHTML(); m.classList.toggle('on', P.menu); },
  q:function(el, e){ e.stopPropagation(); P.q = el.getAttribute('data-v'); $('#qLbl').textContent = P.q === 'Automática' ? '1080p' : P.q; $('#cmenu').innerHTML = menuHTML(); },
  sp:function(el, e){ e.stopPropagation(); P.speed = +el.getAttribute('data-v'); $('#spBtn').textContent = String(P.speed).replace('.', ',') + 'x'; $('#cmenu').innerHTML = menuHTML(); },
  fs:function(){ var st = $('#stage'); if (document.fullscreenElement) document.exitFullscreen(); else if (st.requestFullscreen) st.requestFullscreen().catch(function(){}); },
  aba:function(el){ S.aba = el.getAttribute('data-v'); $$('.tabs [role="tab"]').forEach(function(b){ b.setAttribute('aria-selected', b === el); }); $('#sideB').innerHTML = sidePane(S.aba, curso('orcamento'), P ? P.n : 3); if (S.aba === 'assistente'){ var l = $('#aiLog'); if (l) l.scrollTop = l.scrollHeight; } upd(); },
  seek:function(el){ var t = +el.getAttribute('data-t'); if (P){ setT(t); if (!P.playing) toggle(); var st = $('#stage'); if (st && innerWidth < 1100) st.scrollIntoView({behavior: reduce ? 'auto' : 'smooth', block:'start'}); } },
  duvida:function(){ var t = $('#dvTxt'); if (!t.value.trim()){ t.focus(); return; } var d = {quem:D.ALUNA.nome, ini:D.ALUNA.ini, quando:'agora', at:Math.floor(P ? P.t : 0), p:t.value.trim(), r:null}; $('#dvList').insertAdjacentHTML('afterbegin', dvItem(d)); t.value = ''; toast('Dúvida enviada. Ela fica presa ao minuto ' + fmt(d.at) + '.'); },
  aiSug:function(el){ ask(D.IA[+el.getAttribute('data-i')].p); },
  oneClick:null,
  one:function(el){ S.oneClick['?' + el.getAttribute('data-id')] = true; render(); },
  oneNo:function(el){ delete S.oneClick['?' + el.getAttribute('data-id')]; render(); },
  oneOk:function(el){ var id = el.getAttribute('data-id'); delete S.oneClick['?' + id]; S.oneClick[id] = true; render(); toast('Compra feita. A aula já está liberada.'); },
  code:function(el){ S.codes[el.getAttribute('data-i')] = true; render(); },
  esp:function(el){ S.esp = el.getAttribute('data-v'); render(); },
  novoTopico:function(){ toast('Nova conversa aberta para a comunidade.'); },
  zoom:function(){ toast('Abrindo o Zoom com o seu link pessoal.'); },
  mao:function(el){ el.classList.toggle('btn-p'); el.classList.toggle('btn-s'); toast('Mão levantada. Os professores veem na lista.'); },
  salvar:function(){ toast('Alterações salvas.'); },
  exportar:function(){ toast('Preparando seus dados. O arquivo chega por e-mail.'); },
  cancelar:function(){ toast('Assinatura cancelada. O clube fica ativo até 11/11/2027.'); },
  assinou:function(){ toast('Assinatura confirmada. Bem-vinda ao clube.'); },
  pdf:function(){ toast('Gerando o PDF do certificado.'); },
  sw:function(el, e){ e.preventDefault(); el.setAttribute('aria-checked', el.getAttribute('aria-checked') !== 'true'); },
  edTab:function(el){ S.edTab = el.getAttribute('data-v'); render(); },
  novaAula:function(){ S.novaAula = true; S.uploading = false; render(); },
  fecharNova:function(){ S.novaAula = false; S.uploading = false; render(); },
  upload:function(){ S.uploading = true; S.upStage = 0; S.upPct = 0; render(); runUpload(); },
  publicarAula:function(){ S.novaAula = false; S.uploading = false; render(); toast('Aula publicada. Os alunos do curso foram avisados.'); },
  pubGrav:function(el){ S.pubOk[el.getAttribute('data-id')] = true; render(); toast('Gravação publicada no curso, com legenda.'); },
  sala:function(el){ S.sala = el.getAttribute('data-v'); render(); },
  mail:function(el){ S.mail = +el.getAttribute('data-i'); render(); },
  cupomForm:function(){ S.novoCupom = !S.novoCupom; render(); },
  salvarCupom:function(){ S.novoCupom = false; render(); toast('Cupom BLACKIAE criado.'); },
  toastNovo:function(){ toast('No protótipo, este botão abre o formulário de criação.'); },
  sug:function(el){ S.sugOk[el.getAttribute('data-k')] = true; render(); },
  pubEdit:function(){ toast('Versão editada publicada. A gravação crua fica guardada no R2.'); }
};
function ask(q){
  if (S.aiBusy) return; S.aiBusy = true;
  var low = q.toLowerCase(), hit = D.IA.filter(function(x){ return x.chaves.some(function(k){ return low.indexOf(k) > -1; }); })[0];
  S.ai.push({me:true, t:q}); S.ai.push({typing:true});
  var paint = function(){ var l = $('#aiLog'); if (l){ l.innerHTML = S.ai.map(bubble).join(''); l.scrollTop = l.scrollHeight; } };
  paint();
  setTimeout(function(){
    S.ai.pop();
    S.ai.push(hit ? {t:hit.r, c:hit.c} : {t:'Não encontrei isso nas aulas deste curso. O mais perto é a aula 3, sobre provisões e contingências. Se quiser, encaminho sua pergunta para os professores.', c:[[D.AULA.slides[3].at,'Aula 3 · ' + fmt(D.AULA.slides[3].at)]]});
    S.aiBusy = false; paint();
  }, reduce ? 200 : 1300);
}

document.addEventListener('click', function(e){
  var el = e.target.closest('[data-act]');
  if (!el || el.tagName === 'FORM' || el.tagName === 'INPUT'){ if (!e.target.closest('.menu') && !e.target.closest('.cmenu')) closeMenus(); return; }
  var fn = ACT[el.getAttribute('data-act')];
  if (fn){ if (el.tagName === 'BUTTON' || el.getAttribute('data-act') !== 'closeDrawer') { if (el.tagName !== 'A') e.preventDefault(); } fn(el, e); }
  if (el.getAttribute('data-act') !== 'menu' && el.getAttribute('data-act') !== 'q' && el.getAttribute('data-act') !== 'sp' && el.getAttribute('data-act') !== 'me') closeMenus();
});
document.addEventListener('submit', function(e){
  var f = e.target, a = f.getAttribute('data-act'); e.preventDefault();
  if (a === 'login') location.hash = '#/aluno/entrar?ok=1';
  if (a === 'lead') location.hash = '#/publico/aula-aberta?ok=1';
  if (a === 'convite') toast('Convite enviado. Restam 1 assento livre.');
  if (a === 'aiForm'){ var q = $('#aiQ'); if (q.value.trim()){ ask(q.value.trim()); q.value = ''; } }
  if (a === 'chatForm'){ var c = $('#chatQ'); if (c.value.trim()){ $('#chatLog').insertAdjacentHTML('beforeend', '<div class="msg"><b>Mariana Teixeira</b>' + esc(c.value.trim()) + '</div>'); c.value = ''; $('#chatLog').scrollTop = 1e6; } }
});
document.addEventListener('input', function(e){
  var a = e.target.getAttribute('data-act');
  if (a === 'trBusca') $('#trList').innerHTML = trList(e.target.value);
});
document.addEventListener('keydown', function(e){
  var a = e.target.getAttribute && e.target.getAttribute('data-act');
  if (e.key === 'Enter' && (a === 'busca' || a === 'buscaTop')){ location.hash = '#/aluno/cursos?q=' + encodeURIComponent(e.target.value); }
  if (e.key === 'Escape'){ document.body.classList.remove('drawer-open'); closeMenus(); }
});
document.addEventListener('mouseover', function(e){
  var t = e.target.closest && e.target.closest('[data-tip]'), tip = $('#ctip');
  if (!tip) return;
  if (t){ tip.textContent = t.getAttribute('data-tip'); tip.style.display = 'block'; }
  else tip.style.display = 'none';
});
document.addEventListener('mousemove', function(e){ var tip = $('#ctip'); if (tip && tip.style.display === 'block'){ tip.style.left = Math.min(e.clientX + 14, innerWidth - tip.offsetWidth - 10) + 'px'; tip.style.top = (e.clientY + 14) + 'px'; } });

render();
})();
