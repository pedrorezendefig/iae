---
name: IAE OS
description: O painel local dos Sócios para ver o fluxo de trabalho do IAE num lugar só.
colors:
  navy: "#081a3a"
  brand: "#173a75"
  brand-light: "#578ce6"
  teal: "#0b6e97"
  bg: "#ffffff"
  surface: "#f4f4f4"
  ink: "#0a0a0a"
  ink-soft: "#717784"
  ghost: "#d7dae1"
  hairline: "#e6e8ec"
  on-navy: "#ffffff"
  brand-wash: "#e4edfb"
  green: "#1a7a4f"
  green-wash: "#e1efe8"
  red: "#c03028"
  red-wash: "#f7e3e1"
  amber: "#9c6d0c"
  amber-wash: "#f5ecd8"
  purple: "#6d5bd0"
  purple-wash: "#eae7f8"
  blue-wash: "#e0eef4"
  coral: "#b4552d"
  coral-wash: "#f6e8df"
typography:
  display:
    fontFamily: "Onest, system-ui, sans-serif"
    fontSize: "clamp(28px, 4vw, 46px)"
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Onest, system-ui, sans-serif"
    fontSize: "52px"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Onest, system-ui, sans-serif"
    fontSize: "clamp(30px, 3.4vw, 42px)"
    fontWeight: 500
    lineHeight: 1.04
    letterSpacing: "-0.018em"
  body:
    fontFamily: "Onest, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "0.005em"
  label:
    fontFamily: "IBM Plex Mono, ui-monospace, SFMono-Regular, monospace"
    fontSize: "11px"
    fontWeight: 500
    letterSpacing: "0.14em"
  mono:
    fontFamily: "IBM Plex Mono, ui-monospace, SFMono-Regular, monospace"
    fontSize: "12.5px"
    fontWeight: 400
    fontFeature: "\"ss01\""
rounded:
  tag: "6px"
  chip: "8px"
  inner: "0.75rem"
  card: "1.5rem"
  card-lg: "2rem"
  pill: "999px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "22px"
  lg: "28px"
  container: "1180px"
components:
  tab-on:
    backgroundColor: "{colors.on-navy}"
    textColor: "{colors.navy}"
    rounded: "{rounded.pill}"
    padding: "9px 16px"
  tab-off:
    textColor: "{colors.on-navy}"
    rounded: "{rounded.pill}"
    padding: "9px 16px"
  button-solid:
    backgroundColor: "{colors.brand}"
    textColor: "{colors.on-navy}"
    rounded: "{rounded.pill}"
    padding: "7px 15px"
  button-solid-hover:
    backgroundColor: "{colors.brand-light}"
  button-outline:
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "7px 15px"
  filter-chip:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.ink-soft}"
    rounded: "{rounded.pill}"
    padding: "6px 13px"
  filter-chip-on:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.bg}"
  dropdown-button:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "7px 14px"
  search:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "8px 15px"
  card:
    backgroundColor: "{colors.bg}"
    rounded: "{rounded.card}"
    padding: "20px 22px"
  funnel-total:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.ink}"
    rounded: "{rounded.inner}"
    padding: "18px 18px 16px"
  funnel-total-on:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.bg}"
  badge-green:
    backgroundColor: "{colors.green-wash}"
    textColor: "{colors.green}"
    rounded: "{rounded.pill}"
    padding: "2.5px 9px"
  chip:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink-soft}"
    rounded: "{rounded.chip}"
    padding: "3px 9px"
---

# Design System: IAE OS

## Overview

**Creative North Star: "A Torre de Controle"**

O IAE OS olha o trabalho de cima. Uma faixa navy no topo é a torre: nome, estado e as abas num trilho de pílulas que gruda no scroll. Embaixo fica a pista, um plano cinza-claro onde moram os cards brancos com issues, PRs, deploys e docs. O olho vai do topo escuro para o conteúdo claro, e cada sinal de estado (verde, âmbar, vermelho) aparece pequeno e exato, como luz de painel.

A interface é densa e calma. Dados técnicos (números de issue, labels, filtros, rótulos) falam em IBM Plex Mono; títulos e leitura falam em Onest. Cor forte só aparece para dizer estado ou dono. O resto é navy, branco, cinza e tinta. Os componentes são precisos e contidos: pílulas finas, bordas de 1px, sombra longa e muito suave só para descolar o card do plano.

O visual veio do Hospital OS (ADR 0001, cópia solta) e agora é o visual oficial do IAE OS. Cada OS evolui sozinho daqui em diante.

**Key Characteristics:**
- Dois planos fixos: torre navy em cima, pista clara embaixo, ambos com cantos de 2rem.
- Duas vozes de tipo: Onest para títulos e texto, IBM Plex Mono para dado e controle.
- Cor saturada só para estado e para a cor de cada pessoa.
- Pílula em tudo que é clicável; card arredondado em tudo que agrupa.
- Um bloco `:root` em `static/style.css` é a única fonte de cor, raio, sombra e fonte.

## Colors

Paleta institucional fria (navy e azul royal sobre branco), com seis cores semânticas de estado, cada uma com o seu wash claro.

### Primary
- **Navy Torre** (`navy`): fundo da faixa do topo, do trilho de abas e do rodapé. É o plano escuro do painel.
- **Azul Royal** (`brand`): botão sólido, links, tag de PRD, número de issue, e a cor do Pedro.
- **Azul Sinal** (`brand-light`): o "OS" do título, o ponto do eyebrow e o hover do botão sólido. Só aparece sobre o navy ou como hover.

### Secondary
- **Azul Petróleo** (`teal`): status informativo (`blue` aponta para ele) e cor extra de pessoa.

### Tertiary
As cores de estado, todas com um wash claro para fundo de badge:
- **Verde Liberado** (`green`, `green-wash`): ok, saudável, mergeado. Também a cor do Lucas.
- **Vermelho Alerta** (`red`, `red-wash`): erro, CI vermelho, serviço fora.
- **Âmbar Espera** (`amber`, `amber-wash`): aviso, sem verificação, paradas humanas no fluxo.
- **Violeta** (`purple`, `purple-wash`): categoria extra e primeira cor de pessoa nova.
- **Coral Terra** (`coral`, `coral-wash`): categoria extra e a cor do Rib.

### Neutral
- **Branco Papel** (`bg`): fundo da página e de todo card.
- **Cinza Pista** (`surface`): o plano do `main`, atrás dos cards; fundo de chip.
- **Tinta** (`ink`): texto principal e estado "ligado" de filtro e funil.
- **Tinta Suave** (`ink-soft`): texto secundário, rótulos, contagens, "ninguém assumiu".
- **Borda Fantasma** (`ghost`): borda de card, filtro, dropdown e busca.
- **Fio** (`hairline`): divisórias e borda de menu.
- **Branco sobre Navy** (`on-navy`) e os véus `--w10` a `--w80`: texto e vidro sobre a torre.

### Named Rules
**A Regra do Bloco Único.** Toda cor vive no `:root` de `static/style.css`. Componente usa `var(--...)` ou `color-mix()` sobre essas variáveis; hex solto fora do `:root` é proibido.

**A Regra da Cor com Dono.** Cada Sócio tem cor fixa (`pessoas.js`): Pedro `brand`, Lucas `green`, Rib `coral`. Pessoa nova pega a próxima de `purple`, `amber`, `teal`, `navy`. Sem dono é `ink-soft`. Não use essas cores para outra coisa no mesmo contexto da pessoa.

**A Regra do Estado Ligado.** Filtro, dropdown e card de funil selecionados ficam em `ink` com texto `bg`. Seleção nunca usa a cor de marca.

## Typography

**Display Font:** Onest (com system-ui, sans-serif), pesos 400 e 500
**Body Font:** Onest
**Label/Mono Font:** IBM Plex Mono (com ui-monospace, SFMono-Regular), pesos 400 e 500, `ss01` ligado

**Character:** Onest é geométrica e amigável, só em 400 e 500, sem negrito pesado. Plex Mono dá cara de instrumento a tudo que é dado ou controle.

### Hierarchy
- **Display** (500, clamp(28px, 4vw, 46px), 1.1): o título "IAE OS" na torre.
- **Headline** (500, 52px, 1): o número grande do card total do funil.
- **Title** (500, clamp(30px, 3.4vw, 42px), 1.04): números de stat e títulos h1 a h3.
- **Body** (400, 16px, 1.6): texto corrido, corpo de issue, glossário, stack.
- **Label** (500, 11px, 0.14em, maiúsculas): rótulo de stat, rótulo de dropdown, tag de PRD. O eyebrow da torre usa 12px e 0.22em.
- **Mono** (400 ou 500, 10.5px a 13px): abas, botões, filtros, chips, badges, números de issue, datas relativas.

### Named Rules
**A Regra das Duas Vozes.** Se é dado, filtro, número ou controle, é mono. Se é título ou frase para ler, é Onest. Não existe uma terceira fonte.

**A Regra do Peso Leve.** Só 400 e 500. Hierarquia vem de tamanho, caixa e cor, nunca de 700.

## Layout

A página tem margem externa curta (0.5rem; 0.75rem a partir de 640px) e dois blocos empilhados: a torre navy de largura total e o `main` cinza-claro centrado em até 1180px, com 28px de respiro lateral. A torre é uma faixa baixa (132px no desktop): nome "IAE OS" em 28px, o lema mono ao lado e o estado empurrado para a direita, numa linha só. A torre é bloco, não flex, para o `.wrap` dela ocupar a largura toda: o nome alinha com a borda do conteúdo e não anda quando o "coletado há" muda. Abaixo de 640px o lema some. O trilho de abas sobe -58px para dentro da torre e fica `sticky` no topo durante o scroll.

O conteúdo usa grid de 12 colunas com gap de 16px; a 1024px tudo vira coluna única. O funil da aba Issues é um grid próprio: card total ocupando duas linhas à esquerda e quatro colunas de fases, com gap de 8px. A árvore PRD para fatias recua 24px e desenha uma linha de 2px à esquerda.

Ritmo de espaço observado: 8px entre itens colados, 16px entre cards, 22px de padding de card, 28px de margem do container.

**A Regra do Endereço.** Todo estado visível (aba, card aberto, filtro) vai para o hash da URL. Layout novo não pode esconder estado que não volte por link.

## Elevation & Depth

O painel é quase plano. A profundidade vem do contraste de planos (navy sobre branco, branco sobre cinza) e de uma sombra longa e difusa em tom navy, que só descola o card do fundo. Sobre a torre, a profundidade vem de vidro: véu branco de 10% com `backdrop-filter: blur(8px)`.

### Shadow Vocabulary
- **Repouso** (`box-shadow: 0 1px 0 rgba(8,26,58,.04), 0 18px 40px -28px rgba(8,26,58,.35)`): todo card em repouso.
- **Elevado** (`box-shadow: 0 1px 0 rgba(8,26,58,.05), 0 24px 48px -26px rgba(8,26,58,.4)`): hover de card `.lift`, menu de dropdown e tooltip.
- **Modal** (`box-shadow: 0 30px 80px -20px rgba(8,26,58,.55)`): camada sobre a página.

### Named Rules
**A Regra da Sombra Navy.** Sombra sempre em tom navy (`rgba(8,26,58,...)`), nunca preta pura, e sempre com offset negativo de spread para ficar longa e baixa.

## Shapes

Tudo é arredondado, em três famílias. Controle clicável é pílula (999px): abas, botões, filtros, busca, dropdown, badge. Agrupador é card (1.5rem), e os dois planos grandes usam 2rem. Peças internas usam 0.75rem: funil, menu, tooltip, banner. Chip de dado usa 8px e a tag de PRD usa 6px.

Bordas são de 1px em `ghost` ou `hairline`. A única borda de 2px é o card total do funil, em `ink`, para marcar o número que soma todos os outros. Borda tracejada marca o que é opcional ou incompleto: o botão de mostrar fatias, a linha do `techbox` e o merge sem deploy na Produção.

## Components

### Buttons
Precisos e contidos.
- **Shape:** pílula (999px), mono 12px, 500, tracking 0.06em.
- **Solid:** fundo `brand`, texto `on-navy`; hover vai para `brand-light`.
- **Light:** fundo `on-navy`, texto `navy`, para uso sobre a torre.
- **Outline:** transparente com borda véu sobre a torre; no `main`, borda `ghost` e hover `brand`.
- **Seta:** a `.btn-arrow` anda 4px para a direita no hover.
- **Toque:** `scale(.96)` no `:active`.

### Chips
- **Filtro (`fchip`):** pílula branca, borda `ghost`, texto `ink-soft`; hover pinta borda e texto em `brand`; ligado vira `ink` com texto `bg`.
- **Chip de dado (`chip`):** fundo `surface`, borda `hairline`, canto 8px, mono 11.5px.
- **Badge:** pílula mono 10.5px com fundo wash, texto na cor plena e borda da cor a 22%-30% com `color-mix`.
- **Ponto (`dot`):** 8px; `ok` verde, `warn` âmbar, `bad` vermelho; `pulse` para o que está ao vivo.

### Cards / Containers
- **Corner Style:** 1.5rem (card), 2rem (torre e `main`).
- **Background:** `bg` sobre o plano `surface`.
- **Shadow Strategy:** Repouso; `.lift` sobe 4px e vai para Elevado no hover, só acima de 768px.
- **Border:** 1px `ghost`.
- **Internal Padding:** 20px 22px.

### Inputs / Fields
- **Busca:** pílula branca, mono 12.5px, borda `ghost`, padding 8px 15px; foco troca a borda para `brand`, sem anel extra. Placeholder em `ink-soft` a 60%.
- **Dropdown (`dd`):** botão pílula com rótulo mono 10px maiúsculo e valor ao lado; aberto ou com hover, borda `ink`; com valor fora do padrão, fica `ink`. O menu é um painel branco de canto 0.75rem, sombra Elevado, entrada de 140ms; opção ligada em `brand-wash` com texto `brand`. Cada opção mostra a contagem da faceta; opção de zero fica esmaecida e continua clicável. Nunca usar `<select>` nativo.

### Navigation
- **Trilho de abas:** pílula navy a 92% com vidro, borda véu de 15%, padding 5px, centrada e `sticky`.
- **Aba:** mono 12.5px, 500, texto véu de 70%; ligada vira pílula `on-navy` com texto `navy`; hover (desktop) véu de 10%.
- **Sub-pills da Documentação:** mesma gramática de pílula, no plano claro.

### Funil (signature)
O card total à esquerda, em duas linhas, com borda de 2px `ink`, número de 52px e nome em Onest 15px. À direita, um card por fase com número de 22px e nome mono 10.5px. Clicar filtra a lista; ligado vira `ink` com texto `bg`. Fase com zero fica em `ink-soft`.

### Foco de teclado
Todo controle clicável recebe foco pelo Tab: botão de verdade quando não tem link dentro (cabeçalho do card de issue), `role="button"` com `tabindex="0"` e Enter/Espaço quando tem (card de PR, deploy, nó da onda). O anel é `outline` de 2px a 2px de distância, em `ink` no plano claro e em `brand-light` sobre o navy. No SVG da onda, o foco pinta o contorno do nó em `ink` com 3px. Redesenhar a aba devolve o foco ao controle de mesmo endereço.

### Corpo longo
O card de issue aberto mostra o corpo inteiro só quando ele é curto (menos de 1200 caracteres). Corpo longo, como o PRD, abre no resumo (o trecho até o primeiro `---`) e o resto fica atrás de um filtro em pílula "ler o corpo inteiro (N seções)", que vira "recolher o corpo". Comentários longos seguem a mesma regra. Dentro do card, os títulos do markdown ficam em 15px a 17px.

### Tooltip didático
Um "?" mono de 16px em círculo; ao passar o mouse ou focar, abre um balão `ink` com texto `bg` em Onest 12.5px, canto 0.75rem, seta para baixo, até 262px de largura.

## Do's and Don'ts

### Do:
- **Do** tirar cor, raio, sombra e fonte só das variáveis do `:root` de `static/style.css`.
- **Do** usar mono para todo número, rótulo, filtro e controle, e Onest para título e texto.
- **Do** usar pílula (999px) para tudo que é clicável e card de 1.5rem para tudo que agrupa.
- **Do** marcar seleção com `ink` e texto `bg`.
- **Do** pintar a pessoa sempre com a cor dela de `pessoas.js`.
- **Do** limitar o hover de efeito (lift, giro, seta) a telas acima de 768px e respeitar `prefers-reduced-motion`.

### Don't:
- **Don't** escrever hex fora do bloco `:root`.
- **Don't** usar peso 600 ou 700, nem uma terceira família de fonte.
- **Don't** usar sombra preta pura ou sombra curta e dura.
- **Don't** usar `<select>` nativo para filtro; use o dropdown `dd`.
- **Don't** usar cor de marca para indicar estado ou seleção.
- **Don't** escrever travessão ou meia-risca em nenhum texto de tela.
