# Revisão visual e de orientação do site Ponte Comum

## Texto para incorporação ao relatório acadêmico

### Contexto e objetivo

O Ponte Comum é um protótipo de informação comunitária sobre saúde, memória e referências culturais no São Francisco e na Ilhinha, em São Luís (MA). Após ciclos anteriores de desenvolvimento e avaliação, esta etapa documenta as mudanças visuais implementadas e suas justificativas. O objetivo foi tornar a hierarquia da interface mais clara, dar maior visibilidade à memória local, organizar melhor a consulta a informações práticas e corrigir a sobreposição do mapa com o cabeçalho durante a rolagem. A identidade visual, os conteúdos, as rotas e as interações existentes foram preservados.

A revisão foi realizada em três momentos relacionados, mas distintos: o refinamento visual inicial; uma segunda revisão, com mudanças de composição mais perceptíveis e correção do empilhamento do mapa; e, por fim, a inclusão de uma imagem de fundo discreta somente no hero da página inicial. O registro a seguir descreve o estado implementado na versão local/prévia. **Essas alterações mais recentes não foram publicadas; portanto, este texto não afirma que a versão atualmente disponível ao público já as contenha.**

### 1. Refinamento visual inicial

Na primeira revisão, a intervenção concentrou-se na legibilidade, na hierarquia e na consistência dos componentes. O cabeçalho foi visualmente aliviado com a redução do peso do separador e maior espaçamento entre os itens, mantendo o destaque da página ativa. Também foram ampliadas as áreas de interação do menu, dos controles de busca e dos filtros, com alvos entre 44 e 52 px nos componentes especificados. A intenção foi facilitar a identificação e o acionamento, sobretudo em telas pequenas e por pessoas que utilizam toque, sem declarar que esses tamanhos, isoladamente, comprovem conformidade de acessibilidade.

Na abertura da página inicial, a chamada “Memória local” permaneceu antes do hero, mas teve sua composição reorganizada para reduzir a competição visual entre a superfície terracota, a fotografia e os títulos. Os títulos gerais passaram a usar uma família tipográfica de leitura mais regular, enquanto a fonte manuscrita foi reservada ao slogan. No hero, “Encontrar atendimento” foi hierarquizado como ação principal; os atalhos para histórias e mapa permaneceram disponíveis como ações secundárias. A escolha buscou distinguir uma tarefa prática da navegação editorial sem remover conteúdo.

No mapa e nos cartões, bordas e sombras foram suavizadas, espaços internos foram ampliados e controles receberam dimensões mais consistentes. Permaneceram a composição em mapa e lista, as categorias por cor, os filtros, a busca, a localização e as ações de foco. A lógica da revisão foi reduzir ruído visual e apoiar a varredura do conteúdo, preservando informações e funcionalidades. Os breakpoints existentes foram mantidos e os componentes continuaram a se adaptar a telas estreitas; o suporte a `prefers-reduced-motion` foi preservado.

Também foram atualizados os identificadores de versão dos arquivos CSS e JavaScript referenciados no HTML para favorecer a obtenção dos arquivos atualizados por navegadores que mantêm recursos em cache. O arquivo de dados não foi alterado nessa etapa. Essa mudança é de entrega de recursos, não de conteúdo ou de funcionamento do serviço.

### 2. Segunda revisão: composição editorial e orientação

Após a avaliação de que a primeira rodada não produzia uma diferença suficientemente perceptível, a segunda revisão adotou mudanças de composição mais marcadas. A chamada “Memória local” tornou-se uma abertura editorial dividida: painel terracota com texto claro e botão laranja ao lado de uma fotografia documental do acervo em área ampliada. Em telas estreitas, o painel e sua ação aparecem antes da fotografia. A posição de abertura e o destino do botão foram mantidos.

Essa decisão responde à dificuldade de descoberta de histórias e cultura relatada em avaliações anteriores: a seção foi mantida no primeiro bloco e ganhou uma forma visual própria, sem depender apenas de um link no menu. O uso da fotografia amplia o reconhecimento do caráter territorial e editorial do conteúdo; a hierarquia entre texto, imagem e ação oferece pistas diferentes para localizar a seção. A justificativa é de organização e saliência da interface, e não uma afirmação de eficácia já comprovada por novos testes com participantes.

As páginas internas de mapa, saúde e história passaram a utilizar blocos de introdução com fundo azul escuro, texto claro e acento laranja, estabelecendo uma entrada visual consistente para cada área. Nos cartões, as mudanças de espaçamento, altura das imagens e organização em colunas apoiam a leitura por blocos e a comparação entre itens. Em particular, as informações de saúde foram organizadas em cartões e fichas que exibem endereço, serviços, horário ou sua ausência nas fontes, estado da localização e ações para abrir detalhes ou consultar navegação externa. Tais informações continuam sujeitas às ressalvas de atualização e confirmação presentes no próprio site.

Foi também corrigido o defeito de empilhamento relatado no mapa. A seção que contém o Leaflet passou a formar um contexto de empilhamento local e isolado, mantendo suas camadas abaixo do cabeçalho fixo ao rolar a página. A alteração foi localizada no contêiner da seção: não substituiu o provedor cartográfico, não alterou os dados e não modificou as rotas. A prévia foi rolada para verificar a relação entre cabeçalho e mapa. Nas capturas automatizadas, os blocos do OpenStreetMap retornaram HTTP 403; esse comportamento do provedor foi registrado como limitação da captura, não como uma falha atribuída ao visitante nem como um problema resolvido pela correção de empilhamento.

### 3. Fundo fotográfico suave apenas na página inicial

Em resposta ao pedido de reduzir a sensação de fundo excessivamente branco sem aplicar uma imagem em todo o site, foi adicionada ao hero inicial uma fotografia de mangue e palafitas pertencente ao acervo do projeto, sob um degradê azul semitransparente. A regra visual está limitada ao componente `.hero`: não altera o fundo global, a chamada “Memória local”, as páginas internas ou os cartões. O degradê preserva a linguagem cromática institucional e reduz a competição entre a fotografia e o texto.

A imagem é usada como referência visual ampla ao território retratado no material de pesquisa; sua aplicação não implica atribuição de coordenadas, delimitação oficial do bairro ou identificação de um local específico. O fundo foi conferido em prévia desktop e em tela estreita. A referência ao CSS recebeu novo identificador de versão; JavaScript e dados não foram alterados por essa mudança.

### Princípios de projeto e fundamentação

As decisões articulam quatro princípios. **Hierarquia visual:** contraste de superfícies, escala tipográfica e ênfase diferenciada nas ações ajudam a indicar assunto, prioridade e estado da navegação. **Legibilidade e redução de ruído:** suavizar contornos e sombras, organizar informação em cartões e reservar a tipografia expressiva a momentos específicos reduz competição entre elementos. **Orientação e continuidade:** manter a memória local na abertura, marcar o contexto das páginas internas e conter as camadas do mapa abaixo do cabeçalho preserva referências de localização e evita que a interface cartográfica obscureça a navegação. **Interação confortável:** alvos maiores e espaçamento entre controles são escolhas de projeto que buscam facilitar a operação por toque.

A WCAG 2.2 fornece referências úteis para avaliar tamanho mínimo de alvos e contraste de texto [1][2]. Os tamanhos adotados foram escolhas de conforto para os controles descritos; não equivalem a auditoria. A paleta institucional foi preservada, e não foi realizada medição sistemática de contraste em todas as combinações, estados e telas. Logo, não se declara conformidade integral com WCAG. Do mesmo modo, as alterações de hierarquia e descoberta constituem hipóteses fundamentadas em problemas anteriormente relatados; sua eficácia deve ser reavaliada com participantes, inclusive pessoas idosas, usando o roteiro de usabilidade do projeto.

As referências visuais aprovadas pela equipe — Umane, Instituto Moreira Salles, Instituto Socioambiental e exemplos editoriais da Tubik — orientaram composição, uso de fotografia, espaçamento e hierarquia [3–6]. Foram referências de linguagem visual, não modelos reproduzidos: não se copiaram marcas, textos ou layouts proprietários. Permaneceram a logo, o wordmark, os tokens cromáticos institucionais — azul `#355d78`, laranja `#f88700`, creme `#efd098` e terracota `#93190a` — e as fotografias e conteúdos fornecidos no acervo do projeto.

### Verificação e limites

As verificações registradas para a versão local/prévia incluíram inspeção de páginas em desktop e em largura móvel de 390 px, verificação da rolagem do mapa, conferência de rotas e controles existentes, `node --check`, `git diff --check` e build estático configurado. Essas verificações técnicas e visuais não equivalem a um novo teste moderado de usabilidade, a uma auditoria de acessibilidade ou à confirmação de disponibilidade contínua dos blocos cartográficos. O mapa não representa limites oficiais dos bairros; algumas localizações são aproximadas ou não têm pin por falta de endereço confirmado. Os dados de serviços, horários e fluxos podem mudar e devem ser confirmados junto às fontes responsáveis.

Em síntese, as mudanças reforçam a leitura editorial e a presença da memória local, organizam visualmente o acesso às informações práticas e corrigem a sobreposição entre mapa e cabeçalho. A avaliação de resultados deve permanecer proporcional às evidências disponíveis: há verificações de implementação e prévia, mas a validação da experiência com novos participantes e a publicação da revisão são etapas distintas e não são afirmadas neste documento.

Para a próxima etapa, recomenda-se observar tarefas concretas com participantes, incluindo pessoas idosas: localizar a chamada “Memória local” na página inicial; encontrar uma unidade pelo mapa e pela lista sem autorizar geolocalização; interpretar se o endereço exibido está confirmado, aproximado ou pendente; e decidir como prosseguir para uma navegação externa ou voltar para comparar outra unidade. Além de registrar conclusão e hesitações, convém perguntar à pessoa o que compreendeu sobre distância em linha reta, precisão do pin e atualização dos dados. Esses critérios podem verificar se as pistas visuais e as ressalvas são compreendidas, sem pressupor antecipadamente que a reorganização tenha solucionado as dificuldades observadas.

### Referências

[1] WORLD WIDE WEB CONSORTIUM (W3C). *Understanding Success Criterion 2.5.8: Target Size (Minimum).* WCAG 2.2. Disponível em: <https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html>.

[2] WORLD WIDE WEB CONSORTIUM (W3C). *Understanding Success Criterion 1.4.3: Contrast (Minimum).* WCAG 2.2. Disponível em: <https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html>.

[3] RAINCAKE. *Case Umane.* Disponível em: <https://raincake.com.br/en/cases/umane/>.

[4] INSTITUTO MOREIRA SALLES. *IMS.* Disponível em: <https://ims.com.br/>.

[5] INSTITUTO SOCIOAMBIENTAL. *ISA.* Disponível em: <https://www.socioambiental.org/>.

[6] TUBIK STUDIO. *Media editorial website design.* Disponível em: <https://tubikstudio.com/blog/media-editorial-website-design/>.
