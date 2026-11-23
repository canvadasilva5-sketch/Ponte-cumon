# Relatório do refinamento visual e de usabilidade — Ponte Comum

A revisão aplicou uma linguagem editorial mais limpa ao Ponte Comum, usando como referências de composição e uso de imagem a Umane, o Instituto Moreira Salles, o Instituto Socioambiental e a seleção de projetos editoriais da Tubik, aprovadas pela equipe [3] [4] [5] [6]. As referências orientaram hierarquia, espaçamento e tratamento de fotografias; não foram copiados layouts, marcas nem conteúdos. A logo original, os quatro tokens de cor institucionais, as seções e os destinos existentes foram mantidos.

## Elementos modificados

### Cabeçalho e navegação

**Problema observado.** A navegação tinha um contorno azul inferior espesso que competia com o conteúdo, e os destinos ficavam visualmente agrupados com o mesmo peso.

**Solução.** Reduzi o separador para uma linha fina, dei mais respiro entre os itens, mantive o estado da página atual destacado em azul e garanti altura mínima de 44 px nos links do menu. No celular, o menu continua recolhível, com alvos confortáveis e os mesmos destinos.

**Justificativa.** O cabeçalho fica mais leve sem perder a assinatura azul, e o estado ativo ajuda a pessoa a perceber em qual área está. A recomendação WCAG 2.2 para alvos de ponteiro define 24 × 24 px como mínimo, com exceções; para controles importantes, considera também o critério mais exigente de 44 × 44 px [1]. A dimensão aplicada busca conforto de uso, sem declarar conformidade geral.

### Chamada inicial “Memória local”

**Problema observado.** O destaque estava presente antes do hero, mas sua superfície terracota ocupava quase toda a área e o peso visual da cor competia com a fotografia e o título. O hero logo abaixo repetia uma chamada de igual destaque para histórias.

**Solução.** Mantive o bloco no primeiro ponto da página e preservei integralmente o texto, a imagem do acervo e o botão. A fotografia agora divide o espaço com um painel claro de leitura; o terracota permanece como acento lateral e no kicker. O botão continua fácil de localizar.

**Justificativa.** A memória local segue visível desde o primeiro contato — importante dado o problema de descoberta relatado nos testes anteriores — enquanto a imagem tem mais protagonismo e a composição compete menos com o próprio conteúdo.

### Hero e hierarquia tipográfica

**Problema observado.** A letra manuscrita aparecia em todos os títulos de página, inclusive em telas de serviço e de unidade. Isso dava personalidade, mas reduzia a distinção entre títulos expressivos e informação prática. O hero também destacava “Histórias e cultura” como ação primária, embora a chamada editorial já estivesse imediatamente acima.

**Solução.** Os títulos gerais passaram a usar Google Sans Flex/DM Sans; a Gloria Hallelujah foi preservada no slogan do hero como elemento expressivo da marca. O conteúdo do hero e todos os seus links foram mantidos, mas “Encontrar atendimento” se tornou a ação laranja principal e os atalhos para histórias e mapa ficaram secundários.

**Justificativa.** Uma escala tipográfica mais consistente melhora a leitura em páginas diferentes; reservar a letra manuscrita a um momento reduz competição tipográfica sem apagar a personalidade. A cor laranja e o destino de atendimento sinalizam a prioridade prática, enquanto “Memória local” continua destacada no bloco anterior.

### Mapa, busca e filtros

**Problema observado.** O painel do mapa, a busca e a lista combinavam contornos espessos, fundos e sombras fortes, tornando os controles difíceis de distinguir do próprio conteúdo. Os chips e botões pequenos também podiam ser mais confortáveis em toque.

**Solução.** Reduzi bordas de 2 px para 1 px nos painéis, suavizei sombras e padronizei o campo de busca em 52 px de altura, os botões compactos em pelo menos 44 px e os filtros em 44 px. Mantive a composição em mapa e lista, as cores por categoria, o aviso sobre localizações aproximadas e todos os eventos de busca, filtro, geolocalização e foco.

**Justificativa.** Controles com área maior e agrupamento visual mais claro ajudam a identificar e acionar filtros e busca, inclusive em telas pequenas. A WCAG 2.2 registra 24 × 24 px como mínimo para alvos de ponteiro, ressalvadas as exceções previstas [1]; os tamanhos de 44–52 px adotados são uma decisão de conforto, não uma auditoria formal.

### Cartões de saúde, histórias e fichas

**Problema observado.** Cartões e seções tinham bordas duplas ou espessas, barras laterais largas e sombras pronunciadas. Isso criava uma moldura visual repetitiva em telas com muitos dados.

**Solução.** Reduzi os contornos para 1 px, usei sombras mais discretas e reservei a faixa lateral de categoria nos cartões do mapa. Dei mais espaço interno e entre cartões. Os cartões de história mantêm fotos, textos, categorias e botões; as fichas continuam exibindo serviços, relatos, fontes, ressalvas e referências culturais.

**Justificativa.** A apresentação fica mais leve e escaneável sem retirar informação nem alterar categorias, pins ou rotas. A imagem mantém um papel editorial importante, apoiada pelo próprio acervo do projeto.

### Responsividade e áreas de toque

**Problema observado.** No celular, os blocos de abertura, ações e filtros podiam ficar comprimidos, com elementos próximos uns dos outros.

**Solução.** Mantive os breakpoints existentes, mas refinei empilhamento, espaçamentos internos, altura de controles e largura dos botões no mapa. Busca, mapa/lista, cartões, fichas, menu e ajuda continuam se adaptando a telas estreitas. A consulta `prefers-reduced-motion` continua respeitada.

**Justificativa.** A leitura e os alvos de interação devem permanecer utilizáveis sem depender de precisão fina. A regra de contraste da WCAG 2.2 recomenda 4,5:1 para texto comum e 3:1 para texto grande, com exceções previstas [2]. Como a paleta da marca foi preservada, este trabalho não substitui uma medição completa de contraste nem certifica conformidade.

### Atualização dos arquivos em celulares

**Problema observado.** O HTML usava um identificador de CSS antigo e o CSS/JavaScript poderiam ficar servidos por cache com URLs fixas.

**Solução.** Atualizei os parâmetros de versão do CSS e do JavaScript no HTML. O arquivo de dados permaneceu com sua versão anterior porque não foi modificado.

**Justificativa.** URLs versionadas ajudam navegadores que já visitaram o site a buscar os arquivos visuais novos, mantendo o procedimento de cache busting já usado no projeto.

## O que foi preservado

A logo e o wordmark originais; os valores `#355d78` (azul), `#f88700` (laranja), `#efd098` (creme) e `#93190a` (terracota); a voz da marca; as fontes institucionais; as fotos e conteúdos do acervo; e as páginas de início, mapa, saúde, unidade, história, ponto e projeto. Os links, handlers de filtros e busca, menu móvel, mapa Leaflet, ajuda e localizador não foram removidos ou substituídos.

## Verificação e observações

O JavaScript passou em `node --check`; `git diff --check` não apontou problemas; o build estático configurado para o projeto foi concluído; e foram verificadas a rota do manifesto, a entrega das versões novas de CSS/JS e a permanência dos valores originais de cor. As capturas cobriram as páginas Início, Mapa, Saúde, História, uma ficha de unidade e uma história individual, em desktop; Início, Saúde e História foram conferidas também a 390 px. A prévia oficial confirmou que um cartão de história conduz à rota de detalhe.

**Limite da captura de mapa.** O servidor de blocos do OpenStreetMap respondeu HTTP 403 nas capturas automatizadas, com mensagem de bloqueio por política de uso. Como isso ocorreu também antes do refinamento e não foi possível demonstrar que se trata de falha para visitantes comuns, não troquei o provedor, os dados nem os marcadores. A aparência dos blocos cartográficos deve ser confirmada em navegador normal antes de publicar.

A revisão visual não substituiu um teste moderado com participantes nem uma auditoria de acessibilidade. Recomendo usar o roteiro de usabilidade já criado para verificar se a descoberta de “Memória local” se mantém e testar, em seguida, combinações de contraste sem alterar a paleta institucional.

## Referências

[1]: https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html "W3C WCAG 2.2 Understanding Target Size Minimum"
[2]: https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html "W3C WCAG 2.2 Understanding Contrast Minimum"
[3]: https://raincake.com.br/en/cases/umane/ "Case Umane pela Raincake"
[4]: https://ims.com.br/ "Instituto Moreira Salles"
[5]: https://www.socioambiental.org/ "Instituto Socioambiental"
[6]: https://tubikstudio.com/blog/media-editorial-website-design/ "Tubik Studio Media Editorial Website Design"


## Segunda revisão: mudança de composição e mapa sobre o cabeçalho

Após a usuária avaliar a primeira rodada como sutil demais, esta segunda revisão alterou a composição de forma mais evidente, mantendo a logo, as cores institucionais, o conteúdo, as rotas e os controles existentes.

### Abertura “Memória local”

**Problema observado.** A versão anterior apresentava a chamada em um cartão claro com acento lateral, e a usuária não percebeu diferença suficiente em relação ao site anterior.

**Solução implementada.** A chamada agora abre a página em uma composição editorial dividida: painel terracota com texto claro e botão laranja à esquerda; fotografia documental existente em área maior à direita. O bloco tem mais altura e contraste, sem alterar o texto, o destino do botão ou o lugar da chamada no início. Em telas estreitas, o painel e o botão aparecem primeiro, seguidos pela foto.

**Justificativa.** O contraste de superfícies institucionais cria uma mudança visível de hierarquia, e a foto do acervo recebe mais área, apoiando a leitura da seção como conteúdo editorial. A escolha responde à dificuldade anterior de encontrar histórias e cultura sem substituir a marca ou introduzir cores novas.

### Aberturas das páginas internas

**Problema observado.** As páginas de mapa, saúde e história começavam com títulos e parágrafos sobre o fundo geral, sem uma superfície consistente que marcasse a entrada da seção.

**Solução implementada.** Os blocos `.page-intro` agora usam fundo azul escuro, texto creme e acento laranja, com escala tipográfica responsiva. Os textos e destinos permanecem os mesmos. A área de cartões de saúde foi ajustada para duas colunas no desktop e uma no móvel; as fotos dos cartões de história ficaram mais altas e os cartões de atalhos ganharam uma linha superior laranja.

**Justificativa.** A superfície de alto contraste sinaliza o contexto da página; a escala e o uso mais amplo das fotografias melhoram a varredura visual. A composição reutiliza os tokens existentes e mantém os cartões e informações existentes.

### Sobreposição do mapa ao cabeçalho fixo

**Problema observado.** Na captura enviada, conteúdo e camadas do Leaflet apareciam sobre o cabeçalho durante a rolagem. O cabeçalho tem `z-index: 100`, enquanto o Leaflet usa panes com níveis próprios de empilhamento.

**Solução implementada.** A seção `.map-section` agora cria um contexto de empilhamento local (`position: relative; z-index: 0; isolation: isolate`). Assim, os níveis internos do Leaflet ficam contidos abaixo do cabeçalho fixo; os controles fixos de ajuda permanecem em camada superior. A navegação, o mapa e o provedor de tiles não foram modificados.

**Verificação disponível.** A prévia foi aberta na rota `#/mapa` e rolada aproximadamente uma altura de tela. Na captura após a rolagem, o cabeçalho continuou acima da área cartográfica; a aplicação manteve os sete pontos e os cartões da lista. A prévia recebeu HTTP 403 do servidor de blocos OpenStreetMap, exibindo a mensagem do provedor; esse bloqueio é independente do defeito de empilhamento e não foi corrigido nem contornado pela alteração.

### Verificação técnica e limites

Capturas da prévia cobriram Início, Mapa, Saúde e História em desktop e telas de 390 px. A página inicial móvel mostra “Memória local”, título e ação sem precisar rolar. `node --check app.js`, `git diff --check` e o build estático configurado passaram. O HTML referencia `styles.css?v=20261123-editorial2`; JS e dados não foram alterados. A versão local não foi publicada. As capturas são uma verificação visual de prévia, não substituem testes moderados com pessoas usuárias nem certificam conformidade de acessibilidade.

### Fundo fotográfico localizado na abertura inicial

**Pedido.** A usuária pediu que o fundo do site não parecesse tão branco/creme e sugeriu uma imagem com degradê que remetesse ao São Francisco, mas apenas em parte da página inicial e de maneira discreta.

**Solução implementada.** O hero inicial passou a usar, sob um degradê azul semitransparente, a fotografia `assets/mangue-palafitas.jpg` do acervo fornecido no Relatório de Projeto IV. A regra está limitada ao componente `.hero`; não modifica o fundo global do site, a faixa “Memória local”, as páginas internas ou os cartões. O degradê mantém as cores azuis institucionais e amortece a imagem atrás do texto. A referência do CSS foi versionada como `20261123-fundo-inicio`; JavaScript e dados não foram alterados.

**Verificação/limite.** A alteração visual foi conferida na prévia desktop e em 390 px. A imagem é uma fotografia do acervo sobre território/mangue, não uma nova afirmação de que o local retratado corresponde a um ponto específico ou limite geográfico. A revisão não foi publicada.
