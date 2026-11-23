window.PONTE_DATA = {
  brand: {
    name: "Ponte Comum",
    area: "São Francisco e Ilhinha · São Luís (MA)",
    logo: "/manus-storage/ponte-comum_c0f66e31.png",
    localLogo: "assets/ponte-comum.png"
  },
  categories: {
    saude: { label: "Saúde", color: "health" },
    historia: { label: "História", color: "history" },
    cultura: { label: "Cultura e comunidade", color: "culture" }
  },
  sources: {
    osm: "https://www.openstreetmap.org/copyright",
    healthMap: "https://umap.openstreetmap.fr/it/map/rede-de-saude-publica-de-sao-luis_1274380",
    report: "Relatório de Projeto IV — Ponte Comum (arquivo enviado pela equipe)."
  },
  places: [
    {
      id: "upa-sf",
      category: "saude",
      type: "Urgência · UPA municipal",
      name: "UPA São Francisco (Socorrinho II)",
      address: "Rua Emeterio Leitão, 01 · São Francisco / Ilhinha",
      coords: [-2.508035, -44.304568],
      locationStatus: "Localização confirmada em cadastro público",
      description: "Unidade de pronto atendimento municipal. O CNES identifica o estabelecimento como UPA e registra funcionamento contínuo.",
      services: ["Pronto atendimento municipal", "Urgência — classificação conforme cadastro CNES"],
      phone: "+55 98 3268-8826",
      hours: "O cadastro CNES consultado indica funcionamento contínuo (24 horas). Confirme antes de ir.",
      bring: ["Leve, se tiver, documento oficial com foto e Cartão Nacional de Saúde (Cartão SUS).", "A unidade pode solicitar outros documentos; confirme diretamente com o serviço."],
      how: ["A unidade está cadastrada como pronto atendimento municipal do tipo UPA.", "A triagem e os procedimentos são definidos pela equipe da unidade. Confirme a disponibilidade do atendimento antes de se deslocar."],
      landmarkIds: ["mercado-sf", "igreja-sf"],
      sourceLabel: "CNES · estabelecimento 6165397; coordenadas confrontadas com Waze e mapa da rede de saúde.",
      sourceUrl: "http://cnes2.datasus.gov.br/Mod_Conjunto.asp?VCo_Unidade=2111306165397",
      directionUrl: "https://www.waze.com/live-map/directions/unidade-de-pronto-atendimento-socorrinho-ii-r.-hemeterio-leitao-01-sao-luis?to=place.w.206898927.2068989269.19453896",
      searchText: "socorrinho socorrinho 2 pronto atendimento emergencia urgencia upa telefone saude"
    },
    {
      id: "centro-saude-sf",
      category: "saude",
      type: "Atenção básica · Unidade de Saúde da Família / UBS",
      name: "Unidade de Saúde da Família do São Francisco",
      address: "Rua Paparaubas, s/n · Lote 31, QD 13 · São Francisco",
      coords: [-2.514030, -44.299180],
      locationStatus: "Ponto de referência do mapa da rede pública",
      locationNote: "A coordenada vem do mapa público da rede de saúde. O cadastro CNES informa o endereço, mas não geolocaliza a entrada do prédio.",
      description: "Unidade de Atenção Primária vinculada à Secretaria Municipal de Saúde. Serviços e fluxos abaixo foram relatados em entrevista; escalas e disponibilidade podem mudar.",
      services: ["Consultas de clínica geral", "Atendimento odontológico", "Curativos", "Dispensação de medicamentos pela farmácia", "Vacinação", "Exame preventivo", "Acompanhamento pela equipe multiprofissional eMulti", "Visitas domiciliares"],
      phone: null,
      contactNote: "A unidade não disponibiliza telefone público para atendimento. O telefone institucional é usado pela equipe para avisar pacientes sobre alterações; WhatsApp e e-mail não foram informados. Informações institucionais também podem ser divulgadas pela SEMUS.",
      hours: "Segunda a sexta, 7h às 18h; sábado, 7h às 13h. Em dias especiais de vacinação, o funcionamento pode ir até 17h. Domingo: fechado. A entrevista alertou que horários especiais nem sempre são divulgados com antecedência.",
      bring: ["Dados mencionados para cadastro: CPF, telefone e endereço completo com CEP; leve também documento de identidade.", "A entrevista relatou que o CPF seria suficiente para cadastro no lugar do Cartão SUS, mas confirme esse fluxo com a recepção, pois as exigências podem mudar."],
      how: ["O agendamento é feito presencialmente na unidade. Retornos também podem ser marcados pelo médico ou enfermeiro durante a consulta.", "A unidade atende por agendamento e por ordem de chegada. Na recepção, faça ou confirme o cadastro; atendimentos médicos e outros procedimentos passam por triagem e avaliação profissional.", "A prioridade é identificada pela equipe profissional. Quem procura exclusivamente vacinação precisa fazer cadastro na recepção, mas não passa pela triagem.", "Exames podem depender de encaminhamento, registro no setor de agendamento e disponibilidade na rede; a pessoa recebe orientação na unidade e pode entrar em lista de espera. Nem todos os exames são realizados no local.", "A UBS não funciona como pronto atendimento nem serviço de urgência e emergência."],
      sections: [
        { title: "Equipe eMulti e atividades", items: ["O acesso à eMulti depende de avaliação e encaminhamento por médico ou enfermeiro; não é por procura espontânea.", "A entrevista mencionou educador físico, nutricionista, psicóloga, fonoaudióloga, terapeuta ocupacional e fisioterapeuta. A equipe é compartilhada com outras unidades e a escala pode variar.", "O grupo de atividade física Mexa-se para pessoas idosas foi informado às segundas, quartas e sextas, das 8h às 9h, em parceria com o CRAS do São Francisco. A participação depende de vagas; confirme se horários e local permanecem atuais."] },
        { title: "Visitas domiciliares", items: ["São voltadas principalmente a pessoas acamadas ou que necessitam acompanhamento em casa. Para solicitar uma avaliação, procure a unidade e informe a necessidade; a equipe verifica a área de abrangência e organiza o contato.", "Agentes Comunitários de Saúde participam da busca ativa e do acompanhamento no território. A vacinação também pode ocorrer em atividade externa, conforme avaliação da equipe."] },
        { title: "Acessibilidade", items: ["A entrevista relatou cadeiras de rodas e equipamento ginecológico adaptado. O tipo do equipamento e as condições de uso precisam ser confirmados com a unidade antes da visita."] },
        { title: "Exames e campanhas", items: ["Foi relatada coleta itinerante de sangue a cada 15 dias para pacientes selecionados pela equipe; não é um serviço de acesso geral sem avaliação.", "Indicações e critérios de campanhas de vacinação mudam. Confirme os critérios atuais com a equipe de vacinação ou a SEMUS; a entrevista não deve ser usada como regra vigente."] }
      ],
      landmarkIds: ["igreja-sf", "mercado-sf"],
      sourceLabel: "Entrevista com representante da Unidade de Saúde da Família do São Francisco, enviada pela equipe; CNES · estabelecimento 3173852; endereço e ponto de referência também constam no mapa público da rede de saúde.",
      sourceUrl: "http://cnes2.datasus.gov.br/Mod_Conjunto.asp?VCo_Unidade=2111303173852",
      searchText: "posto posto de saude centro saude usf unidade basica consulta vacinacao vacina atencao basica clinico dentista curativo farmacia eMulti exames visita domiciliar mexa-se"
    },
    {
      id: "ubs-bezerra",
      category: "saude",
      type: "Atenção básica · Unidade Básica de Saúde",
      name: "Unidade Básica de Saúde Bezerra Menezes",
      address: "Endereço não informado na entrevista",
      coords: null,
      locationStatus: "Sem pin: endereço precisa ser confirmado",
      locationNote: "A entrevista confirma a UBS Bezerra Menezes, mas não informa endereço ou coordenadas. Um mapa público mostra um ponto sobreposto à UPA São Francisco; ele não foi reutilizado como localização desta UBS. Confirme o endereço com a unidade ou a SEMUS antes de se deslocar.",
      description: "Unidade de Atenção Primária à Saúde. Os serviços e fluxos desta ficha foram relatados em entrevista; a programação de profissionais e a disponibilidade podem variar.",
      services: ["Consulta médica", "Consulta de enfermagem", "Atendimento odontológico", "Vacinação", "Curativos", "Atendimento multiprofissional (eMulti)"],
      phone: null,
      contactNote: "A entrevista relatou um celular institucional usado principalmente pela equipe para avisar pacientes sobre alterações; o número não é amplamente divulgado e não há profissional dedicado ao atendimento telefônico. Não foi informado um número público. Algumas mensagens por WhatsApp são recebidas, mas resposta e agendamento não são garantidos.",
      hours: "Segunda a sexta, 7h às 18h; sábado, 7h às 13h. A escala e a disponibilidade de cada profissional podem variar ao longo da semana.",
      bring: [],
      how: ["O agendamento regular é presencial e ocorre principalmente por consulta marcada. A entrevista informou atendimento por demanda espontânea aos sábados.", "A recepção (SAMI) faz ou atualiza o cadastro e registra o atendimento. A unidade pode usar os contatos cadastrados para avisar sobre mudanças de agenda.", "A entrevistada não detalhou a documentação exigida para cadastro; confirme essa informação na recepção.", "A unidade integra a Atenção Primária e pode encaminhar para outros serviços quando a necessidade exigir atendimento especializado.", "A UBS não atende urgências ou emergências e não substitui os serviços de pronto atendimento."],
      sections: [
        { title: "Equipe eMulti", items: ["A entrevista mencionou terapeuta ocupacional, fisioterapeuta, nutricionista, fonoaudiólogo, assistente social e farmacêutico.", "A disponibilidade dos profissionais depende da programação semanal; a entrevista não especificou o fluxo de acesso à eMulti nesta unidade. Consulte a recepção."] },
        { title: "Acessibilidade", items: ["A entrevista não identificou equipamentos, recursos físicos ou um fluxo específico de acessibilidade. Isso não permite afirmar que esses recursos existam ou não existam; consulte a unidade ou a SEMUS para orientação sobre uma necessidade específica."] },
        { title: "Orientações e comunicados", items: ["A unidade relatou divulgar campanhas e alterações por canais institucionais, Agentes Comunitários de Saúde e grupos comunitários. Consulte canais oficiais para confirmar comunicados atuais."] }
      ],
      landmarkIds: [],
      sourceLabel: "Entrevista com representante da UBS Bezerra Menezes, enviada pela equipe (data não indicada no documento). A entrevista não informa endereço, telefone público ou coordenadas.",
      sourceUrl: null,
      searchText: "bezerra menezes unidade basica saude ubs consulta medico enfermagem odontologico dentista vacina vacinação curativo emulti fisioterapia nutrição fonoaudiologia assistente social farmacêutico"
    },
    {
      id: "mercado-sf",
      category: "cultura",
      type: "Lugar de convivência · comércio local",
      name: "Mercado do São Francisco e Rua da Feira",
      address: "Rua da Feira · São Francisco",
      coords: [-2.5103795, -44.3062772],
      locationStatus: "Ponto identificado no OpenStreetMap",
      description: "Referência de comércio e circulação cotidiana. No relatório, a Rua 08 é descrita como Rua da Feira e o mercado como lugar de encontro no bairro.",
      image: "/manus-storage/rua-da-feira_029f7e33.jpg",
      localImage: "assets/rua-da-feira.jpg",
      imageAlt: "Rua comercial do São Francisco, fotografada durante a pesquisa de campo",
      storyId: "feira",
      sourceLabel: "Relatório de Projeto IV; ponto do mercado no OpenStreetMap.",
      sourceUrl: "https://www.openstreetmap.org/way/905163500",
      directionUrl: "https://www.google.com/maps/dir/?api=1&destination=-2.5103795%2C-44.3062772",
      searchText: "mercado feira rua 08 rua oito comerciantes comercio ponto de referencia"
    },
    {
      id: "igreja-sf",
      category: "historia",
      type: "Referência histórica e comunitária",
      name: "Igreja São Francisco de Assis",
      address: "Avenida Marechal Castelo Branco · São Francisco",
      coords: [-2.5107772, -44.3034878],
      locationStatus: "Referência aproximada na avenida",
      locationNote: "O marcador indica uma referência sobre a avenida, não a entrada exata da igreja. Confirme o portão/local antes de iniciar um trajeto.",
      description: "A igreja e a praça próxima foram registradas na pesquisa de campo. A avenida é uma referência visual para se localizar no bairro.",
      image: "/manus-storage/igreja-sao-francisco_789d449b.jpg",
      localImage: "assets/igreja-sao-francisco.jpg",
      imageAlt: "Fachada da Igreja São Francisco de Assis, fotografada no relatório do projeto",
      storyId: "igreja",
      sourceLabel: "Relatório de Projeto IV; endereço cadastral da Paróquia São Francisco de Assis no Mapa OSC/Ipea.",
      sourceUrl: "https://mapaosc.ipea.gov.br/detalhar/414583",
      searchText: "igreja paroquia praça praca avenida castelo branco referencia historia"
    },
    {
      id: "obras-sociais",
      category: "cultura",
      type: "Associação · referência comunitária",
      name: "Obras Sociais Frei Antônio Sinibaldi",
      address: "Rua Dez, 150 · São Francisco",
      coords: [-2.5097608, -44.3071806],
      locationStatus: "Ponto de navegação listado no Waze",
      locationNote: "Confirme o endereço e o funcionamento antes da visita; cadastros podem estar desatualizados.",
      description: "O relatório descreve a associação como um espaço comunitário de educação complementar e atividades para crianças. Essas informações refletem a pesquisa do projeto e devem ser atualizadas pela organização.",
      image: "/manus-storage/obras-sociais-sinibaldi_6d0b8b77.jpg",
      localImage: "assets/obras-sociais-sinibaldi.jpg",
      imageAlt: "Entrada das Obras Sociais Frei Antônio Sinibaldi, registrada no relatório do projeto",
      storyId: "sinibaldi",
      phone: "+55 98 3268-6672",
      sourceLabel: "Relatório de Projeto IV; endereço cadastral no Mapa OSC/Ipea e referência de navegação listada no Waze.",
      sourceUrl: "https://mapaosc.ipea.gov.br/detalhar/414103",
      directionUrl: "https://www.waze.com/live-map/directions/br/centro-de-obras-sociais-frei-antonio-sinibaldi?to=place.ChIJ305yW6CO9gcRslAnuSq6PCs",
      searchText: "obras sociais associação associacao frei antonio sinibaldi crianças criancas educação educacao projeto social"
    },
    {
      id: "capoeira-criacao",
      category: "cultura",
      type: "Grupo cultural · endereço a confirmar",
      name: "Grupo de Capoeira Angola Criação",
      address: "Endereço não confirmado",
      coords: null,
      locationStatus: "Sem pin: endereço precisa ser confirmado",
      description: "O relatório registra o grupo como iniciativa comunitária de capoeira angola e cultura popular. Não foi possível confirmar o endereço exato para posicionar um marcador com segurança.",
      image: "/manus-storage/capoeira-angola-criacao_85778bad.jpg",
      localImage: "assets/capoeira-angola-criacao.jpg",
      imageAlt: "Espaço interno do Grupo de Capoeira Angola Criação, fotografado no relatório do projeto",
      storyId: "capoeira",
      sourceLabel: "Relatório de Projeto IV — entrevista com o Contra-Mestre do grupo.",
      sourceUrl: null,
      searchText: "capoeira angola criação criacao grupo cultura dança danca música musica criança crianca jovem"
    }
  ],
  stories: [
    {
      id: "mangue",
      category: "Memória do território",
      title: "Mangue, maré e palafitas",
      summary: "Paisagens que aparecem nas observações de campo e ajudam a compreender a formação do território.",
      paragraphs: [
        "O relatório descreve a presença de moradias às margens da maré e registra o manguezal como parte importante da paisagem local. A imagem desta página vem do acervo fotográfico incluído no próprio relatório.",
        "Este texto é uma síntese de pesquisa acadêmica, não substitui os relatos de quem vive no lugar. Histórias pessoais, nomes e localizações específicas só devem ser acrescentados com validação e autorização dos moradores."
      ],
      image: "/manus-storage/mangue-palafitas_ec2e93d8.jpg",
      localImage: "assets/mangue-palafitas.jpg",
      imageAlt: "Paisagem de mangue e área de moradia observada na pesquisa de campo",
      source: "Relatório de Projeto IV — pesquisa de campo; imagem do acervo dos autores.",
      placeId: null
    },
    {
      id: "igreja",
      category: "Lugar de memória",
      title: "Igreja São Francisco de Assis",
      summary: "Uma referência do bairro citada durante o percurso de pesquisa.",
      paragraphs: [
        "A equipe registrou a Igreja São Francisco de Assis na Avenida Marechal Castelo Branco e observou a praça próxima durante a pesquisa de campo.",
        "O local serve como referência visual para reconhecer a avenida e o entorno. O pin do site é aproximado; confira a entrada e o endereço antes de seguir uma rota."
      ],
      image: "/manus-storage/igreja-sao-francisco_789d449b.jpg",
      localImage: "assets/igreja-sao-francisco.jpg",
      imageAlt: "Fachada da Igreja São Francisco de Assis, fotografada no relatório do projeto",
      source: "Relatório de Projeto IV — pesquisa de campo; fotografia do acervo dos autores.",
      placeId: "igreja-sf"
    },
    {
      id: "feira",
      category: "Lugar de convivência",
      title: "A Rua da Feira e o Mercado do São Francisco",
      summary: "Comércio cotidiano, circulação e encontro no bairro.",
      paragraphs: [
        "No relatório, a Rua 08 aparece identificada pelos moradores como Rua da Feira. O Mercado do São Francisco reúne comerciantes e diferentes produtos, e foi descrito como um lugar de intenso fluxo de pessoas.",
        "A equipe também observou que faltavam mapas e sinalização interna no mercado. Por isso, o Ponte Comum trata o mercado como uma referência de orientação e como parte da memória cotidiana do território."
      ],
      image: "/manus-storage/rua-da-feira_029f7e33.jpg",
      localImage: "assets/rua-da-feira.jpg",
      imageAlt: "Trecho comercial do São Francisco registrado durante a pesquisa",
      source: "Relatório de Projeto IV — seção Feira e Mercado; imagem do acervo dos autores.",
      placeId: "mercado-sf"
    },
    {
      id: "capoeira",
      category: "Grupo cultural",
      title: "Capoeira Angola Criação",
      summary: "Capoeira e cultura popular como práticas de encontro e formação.",
      paragraphs: [
        "Segundo a entrevista registrada no relatório, o grupo atua de forma comunitária desde 13 de maio de 1999 e promove treinos semanais com movimento e musicalidade, sobretudo para crianças e adolescentes.",
        "O relatório relaciona arte, cultura e esporte à educação e à qualidade de vida. O endereço do espaço não foi confirmado no material consultado, então esta referência ainda não tem pin no mapa."
      ],
      image: "/manus-storage/capoeira-angola-criacao_85778bad.jpg",
      localImage: "assets/capoeira-angola-criacao.jpg",
      imageAlt: "Espaço interno do Grupo de Capoeira Angola Criação, registrado no relatório",
      source: "Relatório de Projeto IV — entrevista com o Contra-Mestre; imagem do acervo dos autores.",
      placeId: "capoeira-criacao"
    },
    {
      id: "sinibaldi",
      category: "Iniciativa comunitária",
      title: "Obras Sociais Frei Antônio Sinibaldi",
      summary: "Uma organização comunitária registrada na pesquisa do projeto.",
      paragraphs: [
        "O relatório descreve a associação como um projeto voltado à educação complementar e a atividades de saúde e lazer para crianças. O texto e as datas refletem as informações coletadas na pesquisa, não uma confirmação da programação atual.",
        "A organização aparece no mapa como referência comunitária. O local listado pelo Waze é Rua Dez, 150; confirme endereço, telefone e horário antes da visita."
      ],
      image: "/manus-storage/obras-sociais-sinibaldi_6d0b8b77.jpg",
      localImage: "assets/obras-sociais-sinibaldi.jpg",
      imageAlt: "Entrada das Obras Sociais Frei Antônio Sinibaldi, registrada no relatório",
      source: "Relatório de Projeto IV; Mapa OSC/Ipea e Waze para referência de endereço; foto do acervo dos autores.",
      placeId: "obras-sociais"
    }
  ]
};
