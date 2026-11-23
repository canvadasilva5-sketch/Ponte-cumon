(() => {
  "use strict";

  const DATA = window.PONTE_DATA;
  const app = document.querySelector("#conteudo");
  const nav = document.querySelector("#main-nav");
  const menuButton = document.querySelector("#menu-toggle");
  const helpPanel = document.querySelector("#help-panel");
  const helpButton = document.querySelector("#help-toggle");
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const esc = (value) => String(value ?? "").replace(/[&<>"']/g, (ch) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[ch]);
  const normalise = (value) => String(value ?? "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  const placeById = (id) => DATA.places.find((place) => place.id === id);
  const storyById = (id) => DATA.stories.find((story) => story.id === id);

  const state = {
    query: "",
    categories: new Set(Object.keys(DATA.categories)),
    map: null,
    mapLayer: null,
    markers: new Map(),
    selected: null,
    view: "map",
    user: null,
    pendingFocus: null,
    storyCategory: null
  };

  const icon = (name) => {
    const paths = {
      map: '<path d="M3 6.5 9 3l6 3.5 6-3.5v14L15 20l-6-3.5-6 3.5z"/><path d="M9 3v13.5M15 6.5V20"/>',
      route: '<path d="M4 18c2.7 0 2.7-4 5.5-4h5c2.8 0 2.8-4 5.5-4"/><circle cx="4" cy="18" r="2"/><circle cx="20" cy="10" r="2"/>',
      search: '<circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 5 5"/>',
      pin: '<path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
      arrow: '<path d="M5 12h14M13 5l7 7-7 7"/>',
      health: '<path d="M12 5v14M5 12h14"/>',
      clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>',
      phone: '<path d="M6.6 3.5 9 3l2 4-2.1 1.7a15 15 0 0 0 6.4 6.4L17 13l4 2-.5 2.4a3 3 0 0 1-3.1 2.4A16.4 16.4 0 0 1 4.2 6.6a3 3 0 0 1 2.4-3.1Z"/>',
      book: '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21z"/><path d="M4 5.5v15M8 7h8M8 11h8"/>',
      close: '<path d="m6 6 12 12M18 6 6 18"/>',
      help: '<circle cx="12" cy="12" r="9"/><path d="M9.8 9a2.3 2.3 0 1 1 4.1 1.4c-.9 1.1-1.9 1.2-1.9 3M12 17h.01"/>'
    };
    return `<svg class="icon" viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.pin}</svg>`;
  };

  function isLocationApproximate(place) {
    return /aproximad|referência do mapa|ponto de referência/i.test(place.locationStatus || "");
  }

  function directionsLabel(place) {
    return place.directionUrl || (place.coords && !isLocationApproximate(place)) ? "Como chegar" : "Pesquisar endereço";
  }

  function externalDirections(place) {
    if (place.directionUrl) return place.directionUrl;
    if (!place.coords || isLocationApproximate(place)) return externalSearch(place);
    const query = `${place.coords[0]},${place.coords[1]}`;
    return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(query)}`;
  }

  function externalSearch(place) {
    const query = `${place.name}, ${place.address}, São Francisco, São Luís, MA`;
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
  }

  function badge(place) {
    const className = place.category === "saude" ? "pill pill-health" : place.locationStatus?.includes("aproximada") || place.locationStatus?.includes("Sem pin") ? "pill pill-warn" : "pill";
    return `<span class="${className}">${esc(place.locationStatus || DATA.categories[place.category].label)}</span>`;
  }

  function placeCard(place, compact = false) {
    const category = DATA.categories[place.category];
    const serviceInfo = place.category === "saude" && place.services?.length
      ? `<p class="place-description"><strong>Informações:</strong> ${esc(place.services[0])}</p>` : "";
    const detailLink = place.category === "saude" ? `#/unidade/${place.id}` : `#/ponto/${place.id}`;
    const routeLabel = directionsLabel(place);
    const selected = state.selected === place.id ? " is-selected" : "";
    return `<article class="place-card${selected}" data-place-card="${esc(place.id)}" data-category="${esc(place.category)}">
      <div class="place-meta"><span class="pill"><span class="dot dot-${esc(category.color)}"></span>${esc(category.label)}</span><span class="pill">${esc(place.type)}</span></div>
      <h3>${esc(place.name)}</h3>
      <p class="place-address">${icon("pin")} ${esc(place.address)}</p>
      ${!compact ? `<p class="place-description">${esc(place.description)}</p>${serviceInfo}` : ""}
      <div class="place-meta">${badge(place)}</div>
      <div class="place-actions">
        <a class="button button-small button-blue" href="${detailLink}">Ver detalhes ${icon("arrow")}</a>
        <button class="button button-small" type="button" data-focus-place="${esc(place.id)}">${icon("map")} ${place.coords ? "Localizar no mapa" : "Ver no mapa"}</button>
        <a class="button button-small button-quiet" href="${externalDirections(place)}" target="_blank" rel="noopener">${icon("route")} ${routeLabel}</a>
      </div>
    </article>`;
  }

  function storyCard(story) {
    const local = esc(story.localImage);
    return `<article class="story-card">
      <img class="story-image" src="${esc(story.image)}" data-fallback="${local}" alt="${esc(story.imageAlt)}" loading="lazy">
      <div class="story-body"><span class="pill">${esc(story.category)}</span><h3>${esc(story.title)}</h3><p>${esc(story.summary)}</p><a class="button button-small button-blue" href="#/historia/${esc(story.id)}">Conhecer a história ${icon("arrow")}</a></div>
    </article>`;
  }

  function mapSection(title = "O bairro no mapa", intro = "Encontre unidades de saúde e reconheça referências culturais e comunitárias no mesmo mapa.") {
    const categories = Object.entries(DATA.categories).map(([key, category]) => `
      <button class="filter-chip" type="button" data-filter="${key}" aria-pressed="${state.categories.has(key)}"><span class="dot dot-${category.color}"></span>${esc(category.label)}</button>`).join("");
    return `<section class="map-section" aria-labelledby="map-heading" id="map-section">
      <div class="map-top"><div><span class="kicker">São Francisco e entorno</span><h2 id="map-heading">${esc(title)}</h2><p>${esc(intro)} As referências culturais ajudam a reconhecer o território; elas não substituem uma orientação oficial de rota.</p></div><a class="button button-small" href="#/historia">${icon("book")} Ver histórias do bairro</a></div>
      <form class="map-search" id="place-search" role="search">
        <label class="sr-only" for="search-input">Buscar unidade, serviço de saúde ou referência cultural</label>
        <input class="search-field" id="search-input" type="search" list="place-suggestions" autocomplete="off" placeholder="Ex.: UPA, vacinação, feira, capoeira…" value="${esc(state.query)}">
        <datalist id="place-suggestions">${DATA.places.map((place) => `<option value="${esc(place.name)}"></option>`).join("")}</datalist>
        <button class="button button-primary" type="submit">${icon("search")} Buscar</button>
        <button class="button button-blue" id="near-me" type="button">${icon("pin")} Perto de mim</button>
      </form>
      <div class="filters" role="group" aria-label="Filtrar pontos no mapa">${categories}<button class="filter-chip" type="button" data-filter="__all" aria-pressed="true">Mostrar todos</button></div>
      <div id="location-status" aria-live="polite"></div>
      <div class="map-view-toggle" role="group" aria-label="Alternar mapa ou lista">
        <button class="button button-small ${state.view === "map" ? "button-blue" : ""}" type="button" data-view="map" aria-pressed="${state.view === "map"}">${icon("map")} Mapa</button>
        <button class="button button-small ${state.view === "list" ? "button-blue" : ""}" type="button" data-view="list" aria-pressed="${state.view === "list"}">Lista</button>
      </div>
      <div class="map-grid" id="map-grid" data-view="${state.view}">
        <div class="map-wrap"><div class="map-canvas" id="community-map" role="application" aria-label="Mapa interativo do São Francisco e entorno"></div>
          <div class="map-legend"><span><i class="dot dot-health"></i> Saúde</span><span><i class="dot dot-history"></i> História</span><span><i class="dot dot-culture"></i> Cultura e comunidade</span></div>
          <p class="map-note">Localizações sem endereço geográfico confirmado aparecem como aproximação ou sem pin. O mapa não representa limites oficiais dos bairros.</p>
        </div>
        <div class="place-list-wrap"><div class="result-head"><h3>Pontos de referência</h3><span class="result-count" id="result-count" aria-live="polite"></span></div><div class="place-list" id="place-list" aria-live="polite"></div></div>
      </div>
    </section>`;
  }

  function homeView() {
    const firstStories = DATA.stories.slice(0, 3);
    const featuredStory = DATA.stories.find((story) => story.id === "mangue") || DATA.stories[0];
    return `<section class="home-story-feature" aria-labelledby="home-story-title">
        <div class="home-story-image"><img src="${esc(featuredStory.image)}" data-fallback="${esc(featuredStory.localImage)}" alt="${esc(featuredStory.imageAlt)}"></div>
        <div class="home-story-copy"><span class="kicker">Memória local · histórias e cultura</span><h2 id="home-story-title">Histórias do São Francisco e da Ilhinha</h2><p>Conheça a memória local, os lugares e as expressões culturais do bairro, a partir da pesquisa e do acervo do projeto.</p><a class="button button-primary home-story-link" href="#/historia">${icon("book")} Ler histórias do bairro ${icon("arrow")}</a></div>
      </section>
      <section class="hero"><div><span class="kicker">${esc(DATA.brand.area)}</span><h1>Saúde, memória e encontros que <em>fazem bairro.</em></h1><p>Um mapa comunitário para encontrar serviços de saúde e reconhecer as referências que ajudam a contar o São Francisco e a Ilhinha.</p>
      <div class="hero-actions"><a class="button button-quiet" href="#/historia">${icon("book")} Histórias e cultura do bairro</a><a class="button button-primary" href="#/saude">${icon("health")} Encontrar atendimento</a><a class="button button-quiet" href="#/mapa">${icon("map")} Explorar o mapa</a></div></div>
      <div class="hero-art"><img src="${esc(DATA.brand.logo)}" data-fallback="${esc(DATA.brand.localLogo)}" alt="Marca Ponte Comum: ponte e ondas"></div></section>
      ${mapSection("O bairro no mapa", "Veja as unidades de saúde e os pontos comunitários que podem ajudar você a se orientar.")}
      <section aria-labelledby="quick-heading"><div class="section-heading"><div><span class="kicker">Por onde começar</span><h2 id="quick-heading">Informação para o caminho</h2></div></div>
        <div class="quick-grid">
          <article class="quick-card"><span class="quick-symbol">${icon("health")}</span><h3>Serviços de saúde</h3><p>Veja o que está cadastrado para as unidades, o que ainda precisa ser confirmado e como abrir uma rota.</p><a class="text-link" href="#/saude">Explorar saúde →</a></article>
          <article class="quick-card"><span class="quick-symbol">${icon("map")}</span><h3>Referências no território</h3><p>Igreja, Mercado e iniciativas comunitárias no mesmo mapa das unidades de saúde.</p><a class="text-link" href="#/mapa">Abrir mapa →</a></article>
          <article class="quick-card"><span class="quick-symbol">${icon("book")}</span><h3>Histórias e cultura</h3><p>Conteúdos da pesquisa local com fotos do acervo e indicação da fonte de cada relato.</p><a class="text-link" href="#/historia">Ler histórias →</a></article>
        </div>
      </section>
      <section aria-labelledby="stories-home"><div class="section-heading"><div><span class="kicker">Memória local</span><h2 id="stories-home">Conheça lugares e histórias</h2></div><a class="text-link" href="#/historia">Ver todas →</a></div><div class="story-grid">${firstStories.map(storyCard).join("")}</div></section>`;
  }

  function mapView() {
    return `<section class="page-intro"><span class="kicker">Território em foco</span><h1>Mapa do São Francisco</h1><p class="lead">Saúde, história e cultura no mesmo lugar. Use os filtros, abra um ponto e siga para os detalhes ou para a navegação externa.</p></section>
      ${mapSection("Encontre o que procura", "Unidades e marcos comunitários do São Francisco e do entorno.")}
      <section class="notice"><strong>Como ler os pontos:</strong> endereços e coordenadas vêm de fontes públicas e do relatório do projeto. Referências aproximadas e endereços pendentes estão sinalizados. O traçado de rota é calculado pelo aplicativo de mapas que você escolher.</section>`;
  }

  function healthView() {
    const facilities = DATA.places.filter((place) => place.category === "saude");
    return `<section class="page-intro"><span class="kicker">Informação de saúde</span><h1>Encontre uma unidade no bairro</h1><p class="lead">Veja o tipo de estabelecimento, o endereço e as informações que foram localizadas. Dados que ainda não estão confirmados ficam marcados.</p></section>
      <div class="notice notice-health"><strong>Importante:</strong> a relação de serviços, horários e documentos pode mudar. Confira os dados diretamente com a unidade antes de sair. Este site reúne informação comunitária; não agenda consultas nem substitui os canais da saúde pública.</div>
      <div class="health-grid">${facilities.map((place) => `<article class="health-card" data-category="saude"><div class="place-meta"><span class="pill pill-health"><span class="dot dot-health"></span>Saúde</span><span class="pill">${esc(place.type)}</span></div><h3>${esc(place.name)}</h3><p class="place-address">${icon("pin")} ${esc(place.address)}</p><p>${esc(place.description)}</p><div class="place-meta">${badge(place)}</div><div class="actions"><a class="button button-small button-blue" href="#/unidade/${esc(place.id)}">Ver unidade ${icon("arrow")}</a><button class="button button-small" data-focus-place="${esc(place.id)}" type="button">${icon("map")} Localizar no mapa</button></div></article>`).join("")}</div>
      <section class="content-card"><h2>Saúde e referências caminham juntas</h2><p>No mapa, as unidades aparecem ao lado de lugares conhecidos do bairro. Use esses marcos para reconhecer as ruas e abra “Como chegar” para planejar seu deslocamento em um app de navegação.</p><a class="button button-primary" href="#/mapa">${icon("map")} Abrir mapa do bairro</a></section>`;
  }

  function unitView(id) {
    const place = placeById(id);
    if (!place || place.category !== "saude") return notFoundView();
    const references = place.landmarkIds.map(placeById).filter(Boolean);
    const contact = place.phone
      ? `<a href="tel:${esc(place.phone.replace(/[^+0-9]/g, ""))}">${icon("phone")} ${esc(place.phone)}</a>`
      : place.contactNote || "Não informado nas fontes consultadas";
    const hours = place.hours ? esc(place.hours) : "Não informado nas fontes consultadas";
    return `<p class="breadcrumb"><a href="#/saude">← Voltar para unidades de saúde</a></p>
      <section class="unit-head"><span class="kicker">${esc(place.type)}</span><h1>${esc(place.name)}</h1><p>${esc(place.description)}</p></section>
      ${place.locationNote ? `<div class="notice"><strong>Sobre a localização:</strong> ${esc(place.locationNote)}</div>` : ""}
      <div class="unit-layout"><div>
        <section class="unit-section"><h2>Informações da unidade</h2><div class="detail-grid"><div class="detail-box"><strong>Endereço</strong>${esc(place.address)}</div><div class="detail-box"><strong>${place.phone ? "Telefone" : "Telefone público e canais"}</strong>${contact}</div><div class="detail-box"><strong>Horário informado</strong>${hours}</div><div class="detail-box"><strong>Localização no mapa</strong>${esc(place.locationStatus)}</div></div></section>
        <section class="unit-section"><h2>O que oferece</h2><ul>${place.services.map((service) => `<li>${esc(service)}</li>`).join("")}</ul><p class="source-line">Lista limitada ao que foi possível confirmar nas fontes consultadas. Outros serviços podem existir.</p></section>
        <section class="unit-section"><h2>Como conseguir atendimento?</h2><ul>${place.how.map((step) => `<li>${esc(step)}</li>`).join("")}</ul></section>
        ${place.bring?.length ? `<section class="unit-section"><h2>O que levar?</h2><ul>${place.bring.map((item) => `<li>${esc(item)}</li>`).join("")}</ul></section>` : ""}
        ${(place.sections || []).map((section) => `<section class="unit-section"><h2>${esc(section.title)}</h2><ul>${section.items.map((item) => `<li>${esc(item)}</li>`).join("")}</ul></section>`).join("")}
      </div><aside>
        <section class="unit-section"><h2>Como chegar?</h2><p>Veja a unidade no mapa comunitário ou abra um aplicativo de navegação para planejar o trajeto a partir do local escolhido.</p><div class="actions"><a class="button button-primary" href="${externalDirections(place)}" target="_blank" rel="noopener">${icon("route")} ${directionsLabel(place)}</a><button class="button button-blue" data-focus-place="${esc(place.id)}" type="button">${icon("map")} Ver no mapa</button></div><p class="source-line">Endereços aproximados devem ser confirmados antes de seguir a rota.</p></section>
        <section class="unit-section"><h2>Marcos de referência</h2><p>Esses lugares ajudam a reconhecer o território no mesmo mapa das unidades. São pontos de orientação comunitária, não instruções de rota oficial.</p><div class="reference-list">${references.map((ref) => `<a class="reference-chip" href="#/mapa/${esc(ref.id)}">${icon("pin")} ${esc(ref.name)}</a>`).join("")}</div></section>
        <section class="unit-section"><h2>Fonte e atualização</h2><p>${esc(place.sourceLabel)}</p>${place.sourceUrl ? `<a class="text-link" href="${esc(place.sourceUrl)}" target="_blank" rel="noopener">Abrir fonte consultada ↗</a>` : ""}</section>
      </aside></div>`;
  }

  function historyView() {
    const categories = [...new Set(DATA.stories.map((story) => story.category))];
    const visible = DATA.stories.filter((story) => !state.storyCategory || story.category === state.storyCategory);
    return `<section class="page-intro"><span class="kicker">História, cultura e comunidade</span><h1>O bairro também é feito de histórias</h1><p class="lead">Conheça referências do São Francisco e da Ilhinha reunidas na pesquisa do projeto. As fontes e as lacunas de cada conteúdo aparecem junto da história.</p></section>
      <div class="filters story-filters" role="group" aria-label="Filtrar histórias"><button class="filter-chip" type="button" data-story-filter="" aria-pressed="${!state.storyCategory}">Todas</button>${categories.map((category) => `<button class="filter-chip" type="button" data-story-filter="${esc(category)}" aria-pressed="${state.storyCategory === category}">${esc(category)}</button>`).join("")}</div>
      <div class="story-grid">${visible.map(storyCard).join("")}</div>
      <div class="notice"><strong>Memória com responsabilidade:</strong> os textos são sínteses do relatório enviado pela equipe. Novos depoimentos, nomes e imagens devem ser validados e publicados com autorização de quem contribui.</div>`;
  }

  function storyView(id) {
    const story = storyById(id);
    if (!story) return notFoundView();
    const place = story.placeId ? placeById(story.placeId) : null;
    return `<p class="breadcrumb"><a href="#/historia">← Voltar para história e cultura</a></p>
      <section class="story-hero"><img src="${esc(story.image)}" data-fallback="${esc(story.localImage)}" alt="${esc(story.imageAlt)}"><div class="story-hero-copy"><span class="kicker">${esc(story.category)}</span><h1>${esc(story.title)}</h1><p>${esc(story.summary)}</p></div></section>
      <article class="article-copy">${story.paragraphs.map((paragraph) => `<p>${esc(paragraph)}</p>`).join("")}
        <p class="source-line"><strong>Fonte:</strong> ${esc(story.source)}</p>
        <div class="actions">${place ? `<a class="button button-primary" href="#/mapa/${esc(place.id)}">${icon("map")} Localizar referência no mapa</a>` : ""}<a class="button" href="#/historia">Ver outras histórias</a></div>
      </article>`;
  }

  function pointView(id) {
    const place = placeById(id);
    if (!place || place.category === "saude") return notFoundView();
    const story = place.storyId ? storyById(place.storyId) : null;
    const references = DATA.places.filter((candidate) => candidate.category === "saude");
    return `<p class="breadcrumb"><a href="#/mapa">← Voltar para o mapa</a></p>
      <section class="story-hero"><img src="${esc(place.image || place.localImage || "")}" data-fallback="${esc(place.localImage || "")}" alt="${esc(place.imageAlt || place.name)}"><div class="story-hero-copy"><span class="kicker">${esc(place.type)}</span><h1>${esc(place.name)}</h1><p>${esc(place.description)}</p></div></section>
      <div class="unit-layout"><div><section class="unit-section"><h2>Referência no território</h2><p><strong>Endereço:</strong> ${esc(place.address)}</p><p><strong>Posição no mapa:</strong> ${esc(place.locationStatus)}</p>${place.locationNote ? `<p>${esc(place.locationNote)}</p>` : ""}
        <div class="actions"><a class="button button-primary" href="${externalDirections(place)}" target="_blank" rel="noopener">${icon("route")} ${directionsLabel(place)}</a><button class="button button-blue" type="button" data-focus-place="${esc(place.id)}">${icon("map")} Localizar no mapa</button></div></section>
        ${story ? `<section class="unit-section"><h2>História e contexto</h2><p>${esc(story.summary)}</p><a class="text-link" href="#/historia/${esc(story.id)}">Ler a história completa →</a></section>` : ""}
        <section class="unit-section"><h2>Fonte</h2><p>${esc(place.sourceLabel)}</p>${place.sourceUrl ? `<a class="text-link" href="${esc(place.sourceUrl)}" target="_blank" rel="noopener">Abrir fonte consultada ↗</a>` : ""}</section></div>
        <aside><section class="unit-section"><h2>Um marco que orienta</h2><p>Referências culturais ajudam a reconhecer as ruas e o bairro. Elas aparecem junto das unidades de saúde para apoiar a orientação no território.</p><div class="reference-list">${references.map((ref) => `<a class="reference-chip" href="#/mapa/${esc(ref.id)}">${icon("health")} ${esc(ref.name)}</a>`).join("")}</div></section></aside>
      </div>`;
  }

  function aboutView() {
    return `<section class="page-intro"><span class="kicker">Sobre o projeto</span><h1>Ponte Comum aproxima informação e território</h1><p class="lead">Uma solução acadêmica de Design para reunir informações de saúde e valorizar referências históricas e culturais do São Francisco e da Ilhinha.</p></section>
      <section class="content-card"><h2>Por que este site existe</h2><p>O relatório do projeto descreve dificuldades para localizar informações sobre serviços de saúde e interesse por história e cultura locais. A proposta articula a solução digital com referências do território e com uma futura sinalização física.</p><p>Na pesquisa reportada, participaram 22 pessoas. Os resultados descrevem somente esse grupo e não representam automaticamente todos os moradores.</p></section>
      <section class="content-card"><h2>Como os dados são tratados</h2><p>O site distingue dados cadastrais, posições de mapa, relatos do projeto e informações ainda não confirmadas. Um marcador aproximado não equivale a um endereço verificado. Não é desenhado limite oficial de bairro. Nenhum dado de localização pessoal é solicitado sem uma ação explícita da pessoa usuária; se autorizada, a posição atual é usada somente no aparelho para ordenar unidades por distância.</p><p>O mapa e os textos não substituem confirmação junto aos serviços públicos, às organizações ou aos moradores.</p></section>
      <section class="content-card"><h2>Fontes principais</h2><div class="source-list">
        <div class="source-entry"><strong>Cadastro Nacional de Estabelecimentos de Saúde (CNES)</strong><p><a href="http://cnes2.datasus.gov.br/Mod_Conjunto.asp?VCo_Unidade=2111306165397" target="_blank" rel="noopener">UPA São Francisco — CNES 6165397 ↗</a> · <a href="http://cnes2.datasus.gov.br/Mod_Conjunto.asp?VCo_Unidade=2111303173852" target="_blank" rel="noopener">Centro de Saúde do São Francisco — CNES 3173852 ↗</a></p></div>
        <div class="source-entry"><strong>Rede de Saúde Pública de São Luís</strong><p><a href="${esc(DATA.sources.healthMap)}" target="_blank" rel="noopener">Mapa público da rede de saúde no uMap ↗</a></p></div>
        <div class="source-entry"><strong>Entrevistas com representantes das UBS</strong><p>Documentos fornecidos pela equipe sobre a Unidade de Saúde da Família do São Francisco e a UBS Bezerra Menezes. Os documentos não informam a data; horários, escalas e fluxos podem mudar. A entrevista da Bezerra não confirma endereço ou coordenadas.</p></div>
        <div class="source-entry"><strong>Relatório de Projeto IV — Ponte Comum</strong><p>Relatório e fotografias enviados pela equipe. Fonte de narrativas, observações de campo e entrevista com os grupos locais.</p></div>
        <div class="source-entry"><strong>Mapa OSC / Ipea e Waze</strong><p><a href="https://mapaosc.ipea.gov.br/detalhar/414583" target="_blank" rel="noopener">Paróquia São Francisco de Assis ↗</a> · <a href="https://mapaosc.ipea.gov.br/detalhar/414103" target="_blank" rel="noopener">Associação Obras Sociais Frei Antônio Sinibaldi ↗</a> · <a href="https://www.waze.com/live-map/directions/br/centro-de-obras-sociais-frei-antonio-sinibaldi?to=place.ChIJ305yW6CO9gcRslAnuSq6PCs" target="_blank" rel="noopener">Referência de navegação para as Obras Sociais ↗</a></p></div>
        <div class="source-entry"><strong>OpenStreetMap</strong><p><a href="https://www.openstreetmap.org/way/905163500" target="_blank" rel="noopener">Ponto do Mercado do São Francisco ↗</a> · <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">Créditos e licença cartográfica ↗</a></p></div>
      </div></section>
      <div class="notice"><strong>Atualização necessária:</strong> endereço/localização da UBS Bezerra Menezes, escalas e horários das duas UBS, endereço do Grupo de Capoeira Angola Criação e posição exata da Igreja devem ser confirmados com a comunidade e com as instituições responsáveis.</div>`;
  }

  function notFoundView() {
    return `<section class="content-card"><span class="kicker">Ponte Comum</span><h1>Este conteúdo não foi encontrado</h1><p>O endereço pode ter mudado ou o ponto ainda não foi cadastrado.</p><a class="button button-primary" href="#/inicio">Voltar ao início ${icon("arrow")}</a></section>`;
  }

  function routeDetails() {
    const hash = location.hash.replace(/^#/, "") || "/inicio";
    const parts = hash.split("?")[0].split("/").filter(Boolean);
    const [page = "inicio", id = ""] = parts;
    return { page, id };
  }

  function setTitle(title) {
    document.title = title ? `${title} · Ponte Comum` : "Ponte Comum — São Francisco e Ilhinha";
  }

  function render() {
    if (state.map) {
      state.map.remove();
      state.map = null;
      state.mapLayer = null;
      state.markers.clear();
    }
    const { page, id } = routeDetails();
    const views = {
      inicio: homeView,
      mapa: mapView,
      saude: healthView,
      unidade: () => unitView(id),
      historia: () => id ? storyView(id) : historyView(),
      ponto: () => pointView(id),
      sobre: aboutView
    };
    const pageTitles = {
      inicio: "Início", mapa: "Mapa do bairro", saude: "Saúde", unidade: placeById(id)?.name || "Unidade",
      historia: id ? storyById(id)?.title || "História" : "História e cultura", ponto: placeById(id)?.name || "Referência", sobre: "O projeto"
    };
    app.innerHTML = (views[page] || notFoundView)();
    setTitle(pageTitles[page] || "Conteúdo não encontrado");
    $$(".main-nav a").forEach((link) => {
      link.removeAttribute("aria-current");
      const target = link.getAttribute("href");
      const active = page === "unidade" ? target === "#/saude" : page === "ponto" ? target === "#/mapa" : page === "historia" ? target === "#/historia" : target === `#/${page}`;
      if (active) link.setAttribute("aria-current", "page");
    });
    nav.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
    bindCommon();
    if (["inicio", "mapa"].includes(page)) {
      if (id && placeById(id)) state.pendingFocus = id;
      bindMapSection();
    }
    if (page === "historia" && !id) bindStoryFilters();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function bindCommon() {
    $$('[data-focus-place]').forEach((button) => button.addEventListener("click", () => focusPlace(button.dataset.focusPlace)));
    $$('img[data-fallback]').forEach((image) => {
      image.addEventListener("error", () => {
        if (image.dataset.fallback && image.src !== new URL(image.dataset.fallback, location.href).href) {
          image.src = image.dataset.fallback;
        }
      }, { once: true });
    });
  }

  function markerIcon(place) {
    const markerClass = place.category === "saude" ? "health" : place.category === "historia" ? "history" : "culture";
    const symbol = place.category === "saude" ? "+" : place.category === "historia" ? "H" : "C";
    return L.divIcon({ className: "", html: `<span class="map-pin ${markerClass}"><span class="map-pin-inner">${symbol}</span></span>`, iconSize: [30, 36], iconAnchor: [15, 32], popupAnchor: [0, -28] });
  }

  function filteredPlaces() {
    const query = normalise(state.query).trim().split(/\s+/).filter(Boolean);
    return DATA.places.filter((place) => {
      if (!state.categories.has(place.category)) return false;
      const haystack = normalise([place.name, place.address, place.type, place.description, place.searchText, ...(place.services || [])].join(" "));
      return query.every((term) => haystack.includes(term));
    }).sort((a, b) => {
      if (!state.user) return DATA.places.indexOf(a) - DATA.places.indexOf(b);
      if (a.category !== "saude") return b.category === "saude" ? 1 : 0;
      if (b.category !== "saude") return -1;
      const aDistance = a.coords ? distanceKm(state.user, a.coords) : Infinity;
      const bDistance = b.coords ? distanceKm(state.user, b.coords) : Infinity;
      return aDistance - bDistance;
    });
  }

  function bindMapSection() {
    const form = $("#place-search");
    if (!form) return;
    const input = $("#search-input");
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      state.query = input.value;
      updateMapResults();
      input.blur();
    });
    input.addEventListener("input", () => {
      state.query = input.value;
      updateMapResults();
    });
    $$("[data-filter]").forEach((button) => button.addEventListener("click", () => {
      const category = button.dataset.filter;
      if (category === "__all") state.categories = new Set(Object.keys(DATA.categories));
      else if (state.categories.has(category)) state.categories.delete(category);
      else state.categories.add(category);
      refreshFilterButtons();
      updateMapResults();
    }));
    $$("[data-view]").forEach((button) => button.addEventListener("click", () => {
      state.view = button.dataset.view;
      const grid = $("#map-grid");
      grid.dataset.view = state.view;
      $$("[data-view]").forEach((tab) => {
        tab.classList.toggle("button-blue", tab === button);
        tab.setAttribute("aria-pressed", String(tab === button));
      });
      if (state.view === "map" && state.map) setTimeout(() => state.map.invalidateSize(), 100);
    }));
    $("#near-me").addEventListener("click", locateUser);
    initMap();
    updateMapResults();
  }

  function refreshFilterButtons() {
    $$("[data-filter]").forEach((button) => {
      const key = button.dataset.filter;
      const all = key === "__all";
      button.setAttribute("aria-pressed", all ? String(state.categories.size === Object.keys(DATA.categories).length) : String(state.categories.has(key)));
    });
  }

  function initMap() {
    const element = $("#community-map");
    if (!element) return;
    if (!window.L) {
      element.innerHTML = `<div class="map-fallback"><div class="map-fallback-inner"><h3>O mapa não carregou</h3><p>Verifique sua conexão. A lista continua disponível e cada ponto tem uma opção para abrir em um app de navegação.</p><a class="button button-primary" href="https://www.openstreetmap.org/#map=15/-2.511/-44.303" target="_blank" rel="noopener">Abrir OpenStreetMap ${icon("arrow")}</a></div></div>`;
      return;
    }
    state.map = L.map(element, { scrollWheelZoom: false, zoomControl: true }).setView([-2.5108, -44.3038], 14.4);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors'
    }).addTo(state.map);
    state.mapLayer = L.layerGroup().addTo(state.map);
    state.map.on("click", () => state.map.scrollWheelZoom.enable());
    state.map.on("baselayerchange", () => state.map.invalidateSize());
  }

  function updateMapResults() {
    const list = $("#place-list");
    if (!list) return;
    const visible = filteredPlaces();
    list.innerHTML = visible.length
      ? visible.map((place) => placeCard(place)).join("")
      : `<div class="notice"><strong>Nenhum ponto encontrado.</strong><br>Tente outra palavra ou marque “Mostrar todos”.</div>`;
    const count = $("#result-count");
    if (count) count.textContent = `${visible.length} ${visible.length === 1 ? "ponto" : "pontos"}`;
    if (state.map && state.mapLayer) {
      state.mapLayer.clearLayers();
      state.markers.clear();
      visible.filter((place) => place.coords).forEach((place) => {
        const marker = L.marker(place.coords, { title: `${place.name} — ${place.locationStatus}`, alt: `${DATA.categories[place.category].label}: ${place.name}`, icon: markerIcon(place) }).addTo(state.mapLayer);
        marker.bindPopup(`<div class="map-popover"><strong>${esc(place.name)}</strong><br>${esc(place.type)}<br>${esc(place.address)}<br><a href="${place.category === "saude" ? `#/unidade/${esc(place.id)}` : `#/ponto/${esc(place.id)}`}">Ver detalhes</a></div>`);
        marker.on("click", () => {
          state.selected = place.id;
          $$(".place-card").forEach((card) => card.classList.toggle("is-selected", card.dataset.placeCard === place.id));
        });
        state.markers.set(place.id, marker);
      });
      if (state.user) {
        L.circleMarker(state.user, { radius: 8, color: "#fff", weight: 3, fillColor: "#243641", fillOpacity: .95 }).addTo(state.mapLayer).bindTooltip("Sua localização neste aparelho");
      }
    }
    if (state.pendingFocus) {
      const id = state.pendingFocus;
      state.pendingFocus = null;
      setTimeout(() => focusPlace(id), 120);
    }
  }

  function focusPlace(id) {
    const place = placeById(id);
    if (!place) return;
    state.selected = id;
    if (!$("#place-list")) {
      location.hash = `#/mapa/${encodeURIComponent(id)}`;
      return;
    }
    if (!state.categories.has(place.category)) {
      state.categories.add(place.category);
      refreshFilterButtons();
      updateMapResults();
    }
    const card = $(`[data-place-card="${CSS.escape(id)}"]`);
    $$(".place-card").forEach((item) => item.classList.toggle("is-selected", item.dataset.placeCard === id));
    if (card) card.scrollIntoView({ behavior: "smooth", block: "nearest" });
    if (place.coords && state.map && state.markers.has(id)) {
      state.map.setView(place.coords, Math.max(state.map.getZoom(), 16), { animate: true });
      state.markers.get(id).openPopup();
    } else {
      const status = $("#location-status");
      if (status) status.innerHTML = `<p class="map-note" role="status"><strong>${esc(place.name)}:</strong> ainda não tem endereço confirmado para receber um pin exato. Abra os detalhes para ver fontes e opções disponíveis.</p>`;
    }
    if (window.matchMedia("(max-width: 760px)").matches) {
      const mapGrid = $("#map-grid");
      if (mapGrid?.dataset.view === "list" && place.coords) {
        state.view = "map";
        mapGrid.dataset.view = "map";
        $$("[data-view]").forEach((button) => button.classList.toggle("button-blue", button.dataset.view === "map"));
        setTimeout(() => state.map?.invalidateSize(), 100);
      }
    }
  }

  function distanceKm(pointA, pointB) {
    const radians = (degrees) => degrees * Math.PI / 180;
    const dLat = radians(pointB[0] - pointA[0]);
    const dLng = radians(pointB[1] - pointA[1]);
    const latA = radians(pointA[0]);
    const latB = radians(pointB[0]);
    const h = Math.sin(dLat / 2) ** 2 + Math.cos(latA) * Math.cos(latB) * Math.sin(dLng / 2) ** 2;
    return 6371 * 2 * Math.asin(Math.sqrt(h));
  }

  function locateUser() {
    const status = $("#location-status");
    if (!status) return;
    if (!navigator.geolocation) {
      status.innerHTML = `<p class="map-note" role="status">Este navegador não disponibiliza localização. Use a busca ou escolha uma referência no mapa.</p>`;
      return;
    }
    status.innerHTML = `<p class="map-note" role="status">Seu navegador perguntará se você autoriza. A localização é usada apenas neste aparelho para ordenar as unidades e não é armazenada.</p><button class="button button-small button-blue" id="confirm-location" type="button">Permitir localização neste aparelho</button>`;
    $("#confirm-location").addEventListener("click", () => {
      status.innerHTML = `<p class="map-note" role="status">Buscando sua localização…</p>`;
      navigator.geolocation.getCurrentPosition((position) => {
        state.user = [position.coords.latitude, position.coords.longitude];
        state.categories = new Set(["saude"]);
        refreshFilterButtons();
        status.innerHTML = `<p class="map-note" role="status"><strong>Unidades em ordem de distância aproximada.</strong> A distância é em linha reta; uma rota real pode ser maior.</p>`;
        updateMapResults();
        if (state.map) state.map.setView(state.user, 14);
      }, (error) => {
        const message = error.code === 1 ? "Tudo bem: sem autorização, não usamos sua localização." : "Não foi possível obter a localização. Use a busca manual ou navegue pelo mapa.";
        status.innerHTML = `<p class="map-note" role="status">${message}</p>`;
      }, { timeout: 12000, maximumAge: 60000, enableHighAccuracy: false });
    }, { once: true });
  }

  function bindStoryFilters() {
    $$("[data-story-filter]").forEach((button) => button.addEventListener("click", () => {
      state.storyCategory = button.dataset.storyFilter || null;
      render();
    }));
  }

  menuButton.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(open));
  });
  nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      nav.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
    }
  });
  helpButton.addEventListener("click", () => {
    const open = helpPanel.hidden;
    helpPanel.hidden = !open;
    helpButton.setAttribute("aria-expanded", String(open));
    helpButton.textContent = open ? "Fechar" : "Ajuda";
    if (open) $("summary", helpPanel)?.focus();
  });
  $("#help-close").addEventListener("click", () => {
    helpPanel.hidden = true;
    helpButton.setAttribute("aria-expanded", "false");
    helpButton.textContent = "Ajuda";
    helpButton.focus();
  });
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !helpPanel.hidden) {
      helpPanel.hidden = true;
      helpButton.setAttribute("aria-expanded", "false");
      helpButton.textContent = "Ajuda";
      helpButton.focus();
    }
    if (event.key === "Escape" && nav.classList.contains("is-open")) {
      nav.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.focus();
    }
  });
  window.addEventListener("hashchange", render);
  render();
})();
