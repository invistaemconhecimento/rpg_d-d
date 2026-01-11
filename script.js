/***********************
 * CONFIGURAÇÕES
 ***********************/
const GRID_SIZE = 50;

/***********************
 * ESTADO DO JOGO
 ***********************/
let players = [];
let currentTurn = 0;
let gridVisible = true;

/***********************
 * KONVA STAGE
 ***********************/
const stage = new Konva.Stage({
  container: 'mapCanvasContainer',
  width: window.innerWidth,
  height: document.querySelector('.map-section').offsetHeight,
  draggable: true
});

const mapLayer = new Konva.Layer();
const gridLayer = new Konva.Layer();
const tokenLayer = new Konva.Layer();

stage.add(mapLayer);
stage.add(gridLayer);
stage.add(tokenLayer);

/***********************
 * GRID
 ***********************/
function drawGrid() {
  gridLayer.destroyChildren();
  if (!gridVisible) return;

  const w = stage.width();
  const h = stage.height();

  for (let i = 0; i < w / GRID_SIZE; i++) {
    gridLayer.add(new Konva.Line({
      points: [i * GRID_SIZE, 0, i * GRID_SIZE, h],
      stroke: 'rgba(255,255,255,0.1)'
    }));
  }

  for (let j = 0; j < h / GRID_SIZE; j++) {
    gridLayer.add(new Konva.Line({
      points: [0, j * GRID_SIZE, w, j * GRID_SIZE],
      stroke: 'rgba(255,255,255,0.1)'
    }));
  }

  gridLayer.draw();
}
drawGrid();

/***********************
 * MAPA
 ***********************/
const mapUpload = document.getElementById('mapUpload');

mapUpload.addEventListener('change', e => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => loadMap(reader.result);
  reader.readAsDataURL(file);
});

function loadMap(src) {
  Konva.Image.fromURL(src, img => {
    img.setAttrs({
      x: 0,
      y: 0,
      width: stage.width(),
      height: stage.height()
    });

    mapLayer.destroyChildren();
    mapLayer.add(img);
    mapLayer.draw();

    localStorage.setItem('rpg_map', src);
  });
}

const savedMap = localStorage.getItem('rpg_map');
if (savedMap) loadMap(savedMap);

/***********************
 * TOKENS
 ***********************/
function createToken(name, color, x, y) {
  const token = new Konva.Circle({
    x: x * GRID_SIZE + GRID_SIZE / 2,
    y: y * GRID_SIZE + GRID_SIZE / 2,
    radius: GRID_SIZE / 2,
    fill: color,
    stroke: '#fff',
    strokeWidth: 2,
    draggable: true,
    id: name,
    hitStrokeWidth: 20
  });

  token.on('dragend', () => {
    token.position({
      x: Math.round(token.x() / GRID_SIZE) * GRID_SIZE + GRID_SIZE / 2,
      y: Math.round(token.y() / GRID_SIZE) * GRID_SIZE + GRID_SIZE / 2
    });
    tokenLayer.draw();
  });

  tokenLayer.add(token);
  tokenLayer.draw();
}

/***********************
 * CONTROLE DE JOGO
 ***********************/
document.getElementById('addPlayerBtn').addEventListener('click', () => {
  const name = prompt('Nome do personagem');
  if (!name) return;

  const color = '#'+Math.floor(Math.random()*16777215).toString(16);

  players.push({ name, color });
  createToken(name, color, players.length, 1);

  saveGame();
});

document.getElementById('nextTurnBtn').addEventListener('click', () => {
  if (players.length === 0) return;

  currentTurn = (currentTurn + 1) % players.length;
  updateTurn();
});

function updateTurn() {
  const active = players[currentTurn];
  document.getElementById('turnInfo').textContent =
    `Turno: ${active.name}`;

  tokenLayer.children.forEach(t => {
    t.shadowBlur(0);
    if (t.id() === active.name) {
      t.shadowColor('#ffd93d');
      t.shadowBlur(20);
    }
  });

  tokenLayer.draw();
}

/***********************
 * BOTÕES DO MAPA
 ***********************/
document.getElementById('centerMapBtn').addEventListener('click', () => {
  stage.position({ x: 0, y: 0 });
  stage.scale({ x: 1, y: 1 });
  stage.draw();
});

document.getElementById('toggleGridBtn').addEventListener('click', () => {
  gridVisible = !gridVisible;
  drawGrid();
});

/***********************
 * ZOOM POR PINÇA (MOBILE)
 ***********************/
let lastDist = 0;

stage.on('touchmove', e => {
  e.evt.preventDefault();
  if (e.evt.touches.length !== 2) return;

  const t1 = e.evt.touches[0];
  const t2 = e.evt.touches[1];

  const dist = Math.hypot(
    t1.clientX - t2.clientX,
    t1.clientY - t2.clientY
  );

  if (!lastDist) {
    lastDist = dist;
    return;
  }

  const scale = stage.scaleX() * (dist / lastDist);
  stage.scale({ x: scale, y: scale });
  stage.batchDraw();

  lastDist = dist;
});

stage.on('touchend', () => lastDist = 0);

/***********************
 * SALVAR / CARREGAR
 ***********************/
function saveGame() {
  localStorage.setItem('rpg_players', JSON.stringify(players));
}

const savedPlayers = JSON.parse(localStorage.getItem('rpg_players') || '[]');
savedPlayers.forEach((p, i) => {
  players.push(p);
  createToken(p.name, p.color, i + 1, 1);
});
