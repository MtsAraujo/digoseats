/* ============================================================
   DIGO SEATS — dados da loja e catálogo
   Edite SÓ este arquivo para mudar contato, produtos e preços.
   ============================================================ */

const LOJA = {
  nome: 'Digo Seats',
  instagram: 'digoseats',

  // WhatsApp que recebe os pedidos: só números, com 55 + DDD.
  // Vazio = pedidos vão para o direct do Instagram.
  whatsapp: '5511992979178',
};

const MODELOS = ['Sportster', 'Softail', 'Dyna', 'Touring', 'Outra moto'];

// Cores: nome que o cliente vê -> cor usada no desenho ilustrativo do banco.
const CORES_COURO = { 'Preto': '#1c1a18', 'Marrom': '#5a3a22', 'Bordô': '#6b1f1c', 'Caramelo': '#a9652b', 'Off-white': '#e6dfcc' };
const CORES_LINHA = { 'Preta': '#4a4744', 'Branca': '#f1ece0', 'Vermelha': '#d3281e', 'Caramelo': '#dba057' };
const BOTOES = { 'Cromados': '#dcdcdc', 'Latão envelhecido': '#b8944d', 'Pretos': '#3a3a3a' };

// Opções comuns a todos os bancos
const CORES = {
  'Cor do couro': Object.keys(CORES_COURO),
  'Cor da linha': Object.keys(CORES_LINHA),
};

/* Cada produto:
   preco   -> número em reais (ex: 1290) ou null para mostrar "Sob consulta"
   fotos   -> lista de fotos; a primeira aparece no catálogo
   arte    -> formato usado no desenho ilustrativo (solo, bobber, duplo, stepup, cobra, kingqueen)
   costura -> costura do desenho: Lisa, Capitonê, Diamante, Gomos transversais,
              Gomos longitudinais, Ondas ou Chevron
   opcoes  -> o que o cliente escolhe antes de pôr no carrinho                              */
const PRODUTOS = [
  {
    id: 'capitone', cat: 'duplo', arte: 'stepup', costura: 'Capitonê',
    nome: 'Capitonê',
    resumo: 'Gomos quadrados presos por botões, com degrau entre piloto e garupa.',
    preco: null,
    fotos: ['fotos/capitone-duplo.jpg', 'fotos/capitone-duplo-lado.jpg', 'fotos/capitone-costura-dupla.jpg', 'fotos/capitone-botoes-latao.jpg'],
    opcoes: { ...CORES, 'Botões': Object.keys(BOTOES) },
  },
  {
    id: 'diamante-tachas', cat: 'duplo', arte: 'duplo', costura: 'Diamante',
    nome: 'Diamante com Tachas',
    resumo: 'Costura em losangos com uma tacha em cada cruzamento.',
    preco: null,
    fotos: ['fotos/diamante-tachas.jpg'],
    opcoes: { ...CORES, 'Botões': Object.keys(BOTOES) },
  },
  {
    id: 'gomos-longitudinais', cat: 'duplo', arte: 'cobra', costura: 'Gomos longitudinais',
    nome: 'Gomos Longitudinais',
    resumo: 'Gomos que correm do tanque ao para-lama, acompanhando a curva do banco.',
    preco: null,
    fotos: ['fotos/gomos-longitudinais.jpg', 'fotos/gomos-couro-liso.jpg'],
    opcoes: { ...CORES },
  },
  {
    id: 'gomos-transversais', cat: 'duplo', arte: 'duplo', costura: 'Gomos transversais',
    nome: 'Gomos Transversais',
    resumo: 'O tuck & roll clássico: gomos atravessados de um lado ao outro do banco.',
    preco: null,
    fotos: ['fotos/gomos-na-sportster.jpg', 'fotos/gomos-transversais.jpg', 'fotos/gomos-grama.jpg', 'fotos/gomos-offwhite.jpg'],
    opcoes: { ...CORES },
  },
  {
    id: 'ondas', cat: 'duplo', arte: 'stepup', costura: 'Ondas',
    nome: 'Ondas',
    resumo: 'Gomos em curva, costurados em ondas ao longo do banco inteiro.',
    preco: null,
    fotos: ['fotos/ondas.jpg'],
    opcoes: { ...CORES },
  },
  {
    id: 'chevron', cat: 'duplo', arte: 'duplo', costura: 'Chevron',
    nome: 'Chevron',
    resumo: 'Gomos que se fecham em V no centro do assento.',
    preco: null,
    fotos: ['fotos/chevron.jpg'],
    opcoes: { ...CORES },
  },
  {
    id: 'king-queen', cat: 'duplo', arte: 'kingqueen', costura: 'Gomos transversais',
    nome: 'King & Queen',
    resumo: 'O banco de chopper: garupa acima do piloto e encosto alto atrás.',
    preco: null,
    fotos: ['fotos/king-queen.jpg'],
    opcoes: { 'Costura': ['Gomos transversais', 'Capitonê'], ...CORES },
  },
  {
    id: 'solo-capitone', cat: 'solo', arte: 'bobber', costura: 'Capitonê',
    nome: 'Solo Capitonê',
    resumo: 'Selim solo com botões aparentes. Na foto, em couro bordô com botões de latão.',
    preco: null,
    fotos: ['fotos/solo-bordo.jpg'],
    opcoes: { ...CORES, 'Botões': Object.keys(BOTOES) },
  },
  {
    id: 'solo-diamante', cat: 'solo', arte: 'solo', costura: 'Diamante',
    nome: 'Solo Diamante',
    resumo: 'Solo de assento fundo, com o centro costurado em losangos.',
    preco: null,
    fotos: ['fotos/solo-diamante.jpg'],
    opcoes: { ...CORES },
  },
  {
    id: 'solo-garupa', cat: 'solo', arte: 'solo', costura: 'Capitonê',
    nome: 'Solo + Garupa',
    resumo: 'Banco solo e almofada de garupa separada, feitos como um par.',
    preco: null,
    fotos: ['fotos/solo-pillion-capitone.jpg', 'fotos/solo-pillion-diamante.jpg'],
    opcoes: { 'Costura': ['Capitonê', 'Diamante'], ...CORES },
  },
];
