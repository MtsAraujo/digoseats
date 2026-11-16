/* ============================================================
   DIGO SEATS — dados da loja e catálogo
   Edite SÓ este arquivo para mudar contato, produtos e preços.
   ============================================================ */

const LOJA = {
  nome: 'Digo Seats',
  instagram: 'digoseats',

  // WhatsApp que recebe os pedidos: só números, com 55 + DDD.
  // Exemplo: '5511999998888'. Vazio = pedidos vão para o direct do Instagram.
  whatsapp: '',
};

const MODELOS = ['Sportster', 'Softail', 'Dyna', 'Touring', 'Outro modelo'];

// Costuras: os nomes abaixo são os que o desenho do banco reconhece.
const COSTURAS = ['Lisa', 'Diamante', 'Gomos transversais', 'Gomos longitudinais'];

// Cores: nome que o cliente vê -> cor usada no desenho do banco.
const CORES_COURO = { 'Preto': '#1c1a18', 'Marrom': '#4b2e1c', 'Caramelo': '#a9652b', 'Vinho': '#5c1722' };
const CORES_LINHA = { 'Preta': '#4a4744', 'Branca': '#f1ece0', 'Vermelha': '#d3281e', 'Caramelo': '#dba057' };

const ESPUMAS = ['Padrão', 'Com gel'];

// Opções comuns a todos os bancos
const ACABAMENTO = {
  'Costura': COSTURAS,
  'Cor do revestimento': Object.keys(CORES_COURO),
  'Cor da linha': Object.keys(CORES_LINHA),
};

/* Cada produto:
   preco   -> número em reais (ex: 1290) ou null para mostrar "Sob consulta"
   foto    -> caminho de uma foto (ex: 'fotos/solo-slim.jpg'); sem foto, usa o desenho do banco
   costura -> costura que aparece no desenho do catálogo
   opcoes  -> o que o cliente escolhe antes de pôr no carrinho                              */
const PRODUTOS = [
  {
    id: 'solo-slim', cat: 'solo', arte: 'solo', costura: 'Lisa',
    nome: 'Solo Slim',
    resumo: 'Baixo e enxuto, acompanha a linha do quadro. Para quem roda sozinho.',
    preco: null, foto: '',
    opcoes: { ...ACABAMENTO, 'Espuma': ESPUMAS },
  },
  {
    id: 'solo-bobber', cat: 'solo', arte: 'bobber', costura: 'Diamante',
    nome: 'Solo Bobber',
    resumo: 'Selim sobre molas, no estilo bobber. Curto, largo atrás e sem garupa.',
    preco: null, foto: '',
    opcoes: { ...ACABAMENTO, 'Molas': ['Pretas', 'Cromadas'] },
  },
  {
    id: 'solo-encosto', cat: 'solo', arte: 'soloapoio', costura: 'Gomos transversais',
    nome: 'Solo com Apoio Lombar',
    resumo: 'Traseira elevada que segura o piloto na aceleração e descansa a lombar.',
    preco: null, foto: '',
    opcoes: { ...ACABAMENTO, 'Espuma': ESPUMAS },
  },
  {
    id: 'duplo-classico', cat: 'duplo', arte: 'duplo', costura: 'Gomos transversais',
    nome: 'Duplo Clássico',
    resumo: 'Peça única para piloto e garupa, com linha contínua do tanque ao para-lama.',
    preco: null, foto: '',
    opcoes: { ...ACABAMENTO, 'Espuma': ESPUMAS },
  },
  {
    id: 'step-up', cat: 'duplo', arte: 'stepup', costura: 'Diamante',
    nome: 'Step-Up',
    resumo: 'Degrau marcado entre piloto e garupa. Apoio lombar e visual agressivo.',
    preco: null, foto: '',
    opcoes: { ...ACABAMENTO, 'Espuma': ESPUMAS },
  },
  {
    id: 'cobra', cat: 'duplo', arte: 'cobra', costura: 'Gomos longitudinais',
    nome: 'Cobra',
    resumo: 'Fino e comprido, afinando sobre o para-lama. Chopper de linha limpa.',
    preco: null, foto: '',
    opcoes: { ...ACABAMENTO },
  },
  {
    id: 'king-queen', cat: 'duplo', arte: 'kingqueen', costura: 'Gomos transversais',
    nome: 'King & Queen',
    resumo: 'O banco de chopper clássico: garupa bem acima do piloto e encosto alto atrás.',
    preco: null, foto: '',
    opcoes: { ...ACABAMENTO },
  },
  {
    id: 'touring-conforto', cat: 'duplo', arte: 'touring', costura: 'Lisa',
    nome: 'Touring Conforto',
    resumo: 'Assento largo com encosto para o piloto. Feito para dia inteiro de estrada.',
    preco: null, foto: '',
    opcoes: { ...ACABAMENTO, 'Espuma': ESPUMAS, 'Encosto do piloto': ['Com encosto', 'Sem encosto'] },
  },
  {
    id: 'pillion', cat: 'acessorio', arte: 'pillion', costura: 'Diamante',
    nome: 'Pillion de Garupa',
    resumo: 'Almofada de garupa para combinar com o banco solo. Põe e tira quando quiser.',
    preco: null, foto: '',
    opcoes: { ...ACABAMENTO },
  },
  {
    id: 'encosto-sissy', cat: 'acessorio', arte: 'encosto', costura: 'Diamante',
    nome: 'Encosto para Sissy Bar',
    resumo: 'Almofada de encosto da garupa, na mesma costura e cor do seu banco.',
    preco: null, foto: '',
    opcoes: { ...ACABAMENTO },
  },
];
