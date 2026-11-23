# Refinamento visual e de usabilidade — Ponte Comum

## Direção aprovada

Usar a linguagem editorial da Umane como referência principal, complementada pelo Instituto Moreira Salles, Instituto Socioambiental e exemplos editoriais da Tubik que a usuária aprovou. A inspiração trata de composição, hierarquia tipográfica, equilíbrio de cores e protagonismo fotográfico, não de reprodução de marcas, layouts proprietários ou paletas alheias.

### Decisões de design
- **Movimento:** design editorial digital contemporâneo, com narrativa visual e leitura em camadas.
- **Princípios:** conteúdo primeiro; hierarquia clara entre ações e contexto; identidade existente preservada; interface leve e acessível.
- **Cores:** manter literalmente as cores institucionais e os tokens atuais (azul, laranja, creme e terracota); usar contraste de superfícies institucionais em áreas maiores, sem introduzir uma nova paleta.
- **Layout:** segunda revisão com mudança de composição claramente perceptível: a chamada “Memória local” funciona como capa editorial de abertura, com fotografia do acervo em área ampla e painel de texto institucional contrastante; slogan e ações do hero mantêm seu próprio ritmo, mapa e busca têm seção territorial delimitada; páginas internas usam intros e cartões consistentes que deixam assunto e ação fáceis de localizar. A chamada de memória permanece no primeiro bloco da inicial.
- **Elementos distintivos:** fotografia documental ampliada; campos sólidos azul/terracota para separar editorialmente memória, orientação e informação prática; marcadores, linhas e pequenos rótulos com cores originais.
- **Interação:** ações primárias destacadas e consistentes; affordances visíveis; mapa/lista e filtros continuam operantes; conteúdo de serviço continua em linguagem simples. Criar contexto de empilhamento isolado para os painéis Leaflet, mantendo cabeçalho fixo acima do mapa durante a rolagem, inclusive em telas estreitas.
- **Animação:** transições discretas para hover/foco; respeitar `prefers-reduced-motion`; nada essencial depende de movimento.
- **Tipografia:** manter famílias institucionais carregadas, preservando a Gloria Hallelujah para momentos selecionados de caráter/voz e usando Google Sans Flex/DM Sans para títulos de leitura, corpo, navegação e instruções práticas. Escala responsiva com comprimentos de linha confortáveis.
- **Essência:** mapa comunitário que aproxima saúde, memória e cultura; acolhedor, claro e confiável.
- **Voz:** clara e local, sem promessas de serviço; exemplos: “Encontre serviços e pontos de referência” e “Histórias do São Francisco e da Ilhinha”.
- **Marca:** preservar logo e wordmark originais sem redesenho.
- **Cor de marca:** preservar azul institucional como assinatura.

## Estrutura e implementação

É um site estático com `index.html`, `app.js`, `data.js` e `styles.css`; não há serviços de backend. Reutilizar dados, conteúdo, logo e fotografias existentes. Concentrar a segunda revisão no CSS compartilhado e nos elementos de composição da página inicial, com pequenos ajustes de marcação apenas quando necessários; corrigir o stacking context da seção do mapa sem alterar Leaflet, provedor de tiles ou dados. Não retirar rotas, textos, cartões, filtros, ajuda, mapa ou chamadas existentes. Atualizar o identificador de cache do CSS no HTML; manter inalteradas versões de JS/dados se não forem modificados.

## Critérios da solicitação

- Refinar aparência e usabilidade para uma apresentação clean, moderna, sofisticada e visualmente refinada, preservando integralmente logo, cores, personalidade e reconhecibilidade.
- Tornar a revisão visual claramente perceptível na composição, protagonismo fotográfico, hierarquia, espaçamento, navegação, cartões e responsividade, em vez de apenas polir bordas e sombras.
- Corrigir o defeito mostrado na captura: ao rolar, as camadas Leaflet não devem sobrepor o cabeçalho fixo; menus e controles fixos devem continuar visíveis e utilizáveis.
- Melhorar distribuição, espaçamentos, alinhamentos, hierarquia tipográfica, navegação, aparência de controles/cards, consistência entre páginas, leitura, responsividade e compreensão das funcionalidades.
- Cada alteração deve contribuir à experiência, sem excesso decorativo; não excluir seções/conteúdos nem remover funcionalidades.
- Verificar que os elementos permanecem funcionais e que o layout é responsivo.
- Documentar cada mudança principal com elemento, problema, solução, justificativa e fundamentação real; não inventar referências ou dados.

## Pastas e módulos existentes

- `index.html`: shell da página, navegação, rodapé, fontes e referências de estilos/scripts.
- `styles.css`: tokens visuais, componentes e breakpoints compartilhados.
- `app.js`: rotas em hash, renderização, eventos, busca, mapa e componentes de interface.
- `data.js`: dados das unidades, lugares e histórias.
- `assets/`: logo e fotografias entregues pela equipe; manter os ativos existentes.
- `SOURCES.md` e `TODO.md`: procedência, limites de dados e andamento.
