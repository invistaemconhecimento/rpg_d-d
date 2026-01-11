// =================== CONFIGURAÇÃO DO JSONBIN.IO ===================
const JSONBIN_BIN_ID = '69620ca9ae596e708fd204c5';
const JSONBIN_API_KEY = '$2a$10$gHdA8KAK/9HnnagDiMTlHeBUzNo9cWC0lR8EL0IaUpJg5ChpGiz/i';
const JSONBIN_URL = `https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}`;

// Referências aos elementos HTML
const textInput = document.getElementById('textInput');
const userNameInput = document.getElementById('userName');
const characterClassInput = document.getElementById('characterClass');
const characterSubclassInput = document.getElementById('characterSubclass');
const initiativeModInput = document.getElementById('initiativeMod');
const actionTypeInput = document.getElementById('actionType');
const addButton = document.getElementById('addButton');
const clearInputButton = document.getElementById('clearInputButton');
const clearAllButton = document.getElementById('clearAllButton');
const refreshButton = document.getElementById('refreshButton');
const rollDiceButton = document.getElementById('rollDiceButton');
const quickD20Button = document.getElementById('quickD20Button');
const textList = document.getElementById('textList');
const itemCount = document.getElementById('itemCount');
const diceDisplay = document.getElementById('diceDisplay');
const diceResultText = document.getElementById('diceResultText');
const diceHistory = document.getElementById('diceHistory');
const diceQuantity = document.getElementById('diceQuantity');
const modifier = document.getElementById('modifier');
const rollType = document.getElementById('rollType');
const colorOptions = document.querySelectorAll('.color-option');
const diceTypes = document.querySelectorAll('.dice-type');

// Elementos do sistema de iniciativa
const startCombatButton = document.getElementById('startCombatButton');
const rollInitiativeButton = document.getElementById('rollInitiativeButton');
const nextTurnButton = document.getElementById('nextTurnButton');
const endCombatButton = document.getElementById('endCombatButton');
const refreshInitiativeButton = document.getElementById('refreshInitiativeButton');
const addRoundButton = document.getElementById('addRoundButton');
const roundNumber = document.getElementById('roundNumber');
const turnNumber = document.getElementById('turnNumber');
const initiativeList = document.getElementById('initiativeList');
const combatStatus = document.getElementById('combatStatus');
const combatLog = document.getElementById('combatLog');

// Elementos para inimigos
const enemyNameInput = document.getElementById('enemyName');
const enemyHPInput = document.getElementById('enemyHP');
const enemyInitiativeModInput = document.getElementById('enemyInitiativeMod');
const addEnemyButton = document.getElementById('addEnemyButton');

// Dashboard e Notificações
const refreshStatsButton = document.getElementById('refreshStatsButton');
const clearNotificationsButton = document.getElementById('clearNotificationsButton');
const notificationCount = document.getElementById('notificationCount');
const notificationsList = document.getElementById('notificationsList');
const activePlayers = document.getElementById('activePlayers');
const rollsToday = document.getElementById('rollsToday');
const activeCombats = document.getElementById('activeCombats');
const totalTurns = document.getElementById('totalTurns');
const criticalHits = document.getElementById('criticalHits');
const criticalFails = document.getElementById('criticalFails');
const totalEnemies = document.getElementById('totalEnemies');
const classDistribution = document.getElementById('classDistribution');
const activityChartCanvas = document.getElementById('activityChartCanvas');

// Banco de NPCs e Gerador de Encontros
const refreshNPCsButton = document.getElementById('refreshNPCsButton');
const npcCount = document.getElementById('npcCount');
const npcTypeFilter = document.getElementById('npcTypeFilter');
const npcLocationFilter = document.getElementById('npcLocationFilter');
const addNewNPCButton = document.getElementById('addNewNPCButton');
const npcsGrid = document.getElementById('npcsGrid');
const npcModal = document.getElementById('npcModal');
const npcModalBody = document.getElementById('npcModalBody');

// Gerador de Encontros
const encounterDifficulty = document.getElementById('encounterDifficulty');
const encounterLocation = document.getElementById('encounterLocation');
const encounterPartyLevel = document.getElementById('encounterPartyLevel');
const encounterType = document.getElementById('encounterType');
const partySize = document.getElementById('partySize');
const generateEncounterButton = document.getElementById('generateEncounterButton');
const encounterResult = document.getElementById('encounterResult');
const addToInitiativeButton = document.getElementById('addToInitiativeButton');
const saveEncounterButton = document.getElementById('saveEncounterButton');
const clearEncounterButton = document.getElementById('clearEncounterButton');

// NPC Rápido
const quickNPCName = document.getElementById('quickNPCName');
const quickNPCType = document.getElementById('quickNPCType');
const quickNPCRace = document.getElementById('quickNPCRace');
const quickNPCClass = document.getElementById('quickNPCClass');
const quickNPCLocation = document.getElementById('quickNPCLocation');
const quickNPCLevel = document.getElementById('quickNPCLevel');
const quickNPCDescription = document.getElementById('quickNPCDescription');
const quickNPCHP = document.getElementById('quickNPCHP');
const quickNPCAC = document.getElementById('quickNPCAC');
const quickNPCInit = document.getElementById('quickNPCInit');
const quickNPCPercep = document.getElementById('quickNPCPercep');
const generateQuickNPCButton = document.getElementById('generateQuickNPCButton');
const saveQuickNPCButton = document.getElementById('saveQuickNPCButton');
const clearQuickNPCButton = document.getElementById('clearQuickNPCButton');

// Mapa de Combate
const toggleGridButton = document.getElementById('toggleGridButton');
const gridSize = document.getElementById('gridSize');
const gridScale = document.getElementById('gridScale');
const cellSize = document.getElementById('cellSize');
const clearMapButton = document.getElementById('clearMapButton');
const combatMap = document.getElementById('combatMap');
const mapElements = document.getElementById('mapElements');
const measuredDistance = document.getElementById('measuredDistance');
const startMeasurementButton = document.getElementById('startMeasurementButton');
const clearMeasurementButton = document.getElementById('clearMeasurementButton');
const saveMapButton = document.getElementById('saveMapButton');
const loadMapButton = document.getElementById('loadMapButton');
const exportMapButton = document.getElementById('exportMapButton');
const characterDetails = document.getElementById('characterDetails');
const elementName = document.getElementById('elementName');
const elementType = document.getElementById('elementType');
const elementHP = document.getElementById('elementHP');
const elementNotes = document.getElementById('elementNotes');
const saveElementButton = document.getElementById('saveElementButton');
const deleteElementButton = document.getElementById('deleteElementButton');

// Sistema do Mapa
let mapData = {
    gridSize: 30,
    cellSize: 25,
    showGrid: true,
    elements: [],
    terrains: {},
    selectedTool: 'select',
    selectedElement: null,
    isMeasuring: false,
    measurementPoints: []
};

let selectedColor = '#4d96ff';
let selectedTerrain = 'grass';

// =================== SISTEMA DO MAPA DE COMBATE ===================

// Inicializar mapa
function initializeMap() {
    createGrid();
    loadMapData();
    setupEventListeners();
    updateMapElementsList();
    
    // Notificação
    addNotification('Mapa carregado', 'Sistema de mapa de combate ativado!', 'success');
}

// Criar grade do mapa
function createGrid() {
    combatMap.innerHTML = '';
    
    const gridContainer = document.createElement('div');
    gridContainer.className = 'grid-container';
    gridContainer.style.gridTemplateColumns = `repeat(${mapData.gridSize}, ${mapData.cellSize}px)`;
    gridContainer.style.width = `${mapData.gridSize * mapData.cellSize}px`;
    gridContainer.style.height = `${mapData.gridSize * mapData.cellSize}px`;
    
    // Criar células
    for (let y = 0; y < mapData.gridSize; y++) {
        const row = document.createElement('div');
        row.className = 'grid-row';
        
        for (let x = 0; x < mapData.gridSize; x++) {
            const cell = document.createElement('div');
            cell.className = 'grid-cell';
            cell.dataset.x = x;
            cell.dataset.y = y;
            cell.style.width = `${mapData.cellSize}px`;
            cell.style.height = `${mapData.cellSize}px`;
            
            // Aplicar terreno se existir
            const terrainKey = `${x},${y}`;
            if (mapData.terrains[terrainKey]) {
                const terrainTile = document.createElement('div');
                terrainTile.className = `terrain-tile ${mapData.terrains[terrainKey]}`;
                cell.appendChild(terrainTile);
            }
            
            // Event listeners da célula
            cell.addEventListener('click', (e) => handleCellClick(e, x, y));
            cell.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                handleCellRightClick(x, y);
            });
            
            row.appendChild(cell);
        }
        
        gridContainer.appendChild(row);
    }
    
    combatMap.appendChild(gridContainer);
    updateGridElements();
}

// Atualizar elementos no mapa
function updateGridElements() {
    // Remover elementos antigos
    document.querySelectorAll('.map-element').forEach(el => el.remove());
    
    // Adicionar elementos
    mapData.elements.forEach(element => {
        const cell = document.querySelector(`.grid-cell[data-x="${element.x}"][data-y="${element.y}"]`);
        if (!cell) return;
        
        const elementDiv = document.createElement('div');
        elementDiv.className = `map-element ${element.type}`;
        elementDiv.dataset.elementId = element.id;
        elementDiv.style.width = `${mapData.cellSize - 4}px`;
        elementDiv.style.height = `${mapData.cellSize - 4}px`;
        elementDiv.style.left = `${element.x * mapData.cellSize + 2}px`;
        elementDiv.style.top = `${element.y * mapData.cellSize + 2}px`;
        elementDiv.style.backgroundColor = element.color || selectedColor;
        elementDiv.style.borderColor = element.color || selectedColor;
        
        // Ícone baseado no tipo
        let icon = 'user';
        if (element.type === 'enemy') icon = 'skull';
        if (element.type === 'obstacle') icon = 'mountain';
        if (element.type === 'terrain') icon = 'tree';
        
        elementDiv.innerHTML = `
            <i class="fas fa-${icon}"></i>
            <div class="element-label">${element.name}</div>
        `;
        
        // Event listeners do elemento
        elementDiv.addEventListener('click', (e) => {
            e.stopPropagation();
            selectElement(element.id);
        });
        
        elementDiv.addEventListener('dblclick', (e) => {
            e.stopPropagation();
            showElementDetails(element.id);
        });
        
        // Arrastar elemento
        makeDraggable(elementDiv, element);
        
        combatMap.querySelector('.grid-container').appendChild(elementDiv);
    });
    
    // Atualizar lista lateral
    updateMapElementsList();
}

// Manipular clique na célula
function handleCellClick(e, x, y) {
    const cell = e.target.closest('.grid-cell');
    
    switch (mapData.selectedTool) {
        case 'select':
            // Selecionar elemento se existir
            const element = mapData.elements.find(el => el.x === x && el.y === y);
            if (element) {
                selectElement(element.id);
            } else {
                clearSelection();
            }
            break;
            
        case 'character':
        case 'enemy':
        case 'obstacle':
            addElement(x, y, mapData.selectedTool);
            break;
            
        case 'terrain':
            addTerrain(x, y, selectedTerrain);
            break;
            
        case 'erase':
            removeElementAt(x, y);
            removeTerrainAt(x, y);
            break;
    }
    
    // Medição de distância
    if (mapData.isMeasuring) {
        handleMeasurementClick(x, y);
    }
}

// Manipular clique direito na célula
function handleCellRightClick(x, y) {
    // Remover elemento ou terreno
    removeElementAt(x, y);
    removeTerrainAt(x, y);
}

// Adicionar elemento
function addElement(x, y, type) {
    // Verificar se já existe elemento na célula
    if (mapData.elements.some(el => el.x === x && el.y === y)) {
        addNotification('Célula ocupada', 'Já existe um elemento nesta célula.', 'warning', true);
        return;
    }
    
    const element = {
        id: `element_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        name: type === 'character' ? 'Personagem' : 
               type === 'enemy' ? 'Inimigo' : 
               type === 'obstacle' ? 'Obstáculo' : 'Elemento',
        type: type,
        x: x,
        y: y,
        color: selectedColor,
        hp: 10,
        notes: '',
        created_at: new Date().toISOString()
    };
    
    mapData.elements.push(element);
    updateGridElements();
    saveMapData();
    
    addNotification('Elemento adicionado', `${element.name} adicionado ao mapa.`, 'success', true);
}

// Adicionar terreno
function addTerrain(x, y, terrainType) {
    const terrainKey = `${x},${y}`;
    mapData.terrains[terrainKey] = terrainType;
    
    // Atualizar visualização
    const cell = document.querySelector(`.grid-cell[data-x="${x}"][data-y="${y}"]`);
    if (cell) {
        // Remover terreno antigo
        cell.querySelector('.terrain-tile')?.remove();
        
        // Adicionar novo terreno
        const terrainTile = document.createElement('div');
        terrainTile.className = `terrain-tile ${terrainType}`;
        cell.appendChild(terrainTile);
    }
    
    saveMapData();
}

// Remover elemento
function removeElementAt(x, y) {
    const index = mapData.elements.findIndex(el => el.x === x && el.y === y);
    if (index !== -1) {
        const element = mapData.elements[index];
        mapData.elements.splice(index, 1);
        
        // Se era o elemento selecionado, limpar seleção
        if (mapData.selectedElement === element.id) {
            clearSelection();
        }
        
        updateGridElements();
        saveMapData();
        
        addNotification('Elemento removido', `${element.name} removido do mapa.`, 'info', true);
    }
}

// Remover terreno
function removeTerrainAt(x, y) {
    const terrainKey = `${x},${y}`;
    if (mapData.terrains[terrainKey]) {
        delete mapData.terrains[terrainKey];
        
        // Atualizar visualização
        const cell = document.querySelector(`.grid-cell[data-x="${x}"][data-y="${y}"]`);
        cell?.querySelector('.terrain-tile')?.remove();
        
        saveMapData();
    }
}

// Selecionar elemento
function selectElement(elementId) {
    // Desselecionar elemento anterior
    document.querySelectorAll('.map-element.selected').forEach(el => {
        el.classList.remove('selected');
    });
    
    // Selecionar novo elemento
    const element = mapData.elements.find(el => el.id === elementId);
    if (!element) return;
    
    mapData.selectedElement = elementId;
    
    const elementDiv = document.querySelector(`.map-element[data-element-id="${elementId}"]`);
    if (elementDiv) {
        elementDiv.classList.add('selected');
    }
    
    // Mostrar detalhes
    showElementDetails(elementId);
}

// Limpar seleção
function clearSelection() {
    mapData.selectedElement = null;
    document.querySelectorAll('.map-element.selected').forEach(el => {
        el.classList.remove('selected');
    });
    hideElementDetails();
}

// Mostrar detalhes do elemento
function showElementDetails(elementId) {
    const element = mapData.elements.find(el => el.id === elementId);
    if (!element) return;
    
    // Preencher formulário
    elementName.value = element.name;
    elementType.value = element.type;
    elementHP.value = element.hp || 10;
    elementNotes.value = element.notes || '';
    
    // Selecionar cor
    document.querySelectorAll('.color-option-small').forEach(option => {
        option.classList.remove('selected');
        if (option.style.backgroundColor === element.color) {
            option.classList.add('selected');
        }
    });
    
    // Mostrar painel
    characterDetails.classList.add('active');
}

// Ocultar detalhes do elemento
function hideElementDetails() {
    characterDetails.classList.remove('active');
}

// Atualizar lista de elementos
function updateMapElementsList() {
    mapElements.innerHTML = '';
    
    if (mapData.elements.length === 0) {
        mapElements.innerHTML = `
            <div class="no-elements">
                <i class="fas fa-plus-circle"></i><br>
                Nenhum elemento no mapa<br>
                <small>Use as ferramentas para adicionar</small>
            </div>
        `;
        return;
    }
    
    mapData.elements.forEach(element => {
        const elementItem = document.createElement('div');
        elementItem.className = 'map-element-item';
        elementItem.style.borderLeftColor = element.color;
        elementItem.dataset.elementId = element.id;
        
        // Ícone baseado no tipo
        let icon = 'user';
        let iconColor = '#4d96ff';
        if (element.type === 'enemy') {
            icon = 'skull';
            iconColor = '#ff6b6b';
        } else if (element.type === 'obstacle') {
            icon = 'mountain';
            iconColor = '#8a8ac4';
        } else if (element.type === 'terrain') {
            icon = 'tree';
            iconColor = '#6bcf7f';
        }
        
        elementItem.innerHTML = `
            <div class="element-icon" style="background-color: ${element.color}">
                <i class="fas fa-${icon}"></i>
            </div>
            <div class="element-info">
                <div class="element-name">${element.name}</div>
                <div class="element-type">${element.type} - (${element.x}, ${element.y})</div>
            </div>
            <div class="element-actions">
                <button class="element-action-btn" onclick="selectElement('${element.id}')" title="Selecionar">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="element-action-btn" onclick="removeElement('${element.id}')" title="Remover">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        
        // Clique no item da lista
        elementItem.addEventListener('click', (e) => {
            if (!e.target.closest('.element-actions')) {
                selectElement(element.id);
                
                // Centralizar no mapa
                const cell = document.querySelector(`.grid-cell[data-x="${element.x}"][data-y="${element.y}"]`);
                if (cell) {
                    cell.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
                }
            }
        });
        
        mapElements.appendChild(elementItem);
    });
}

// Remover elemento por ID
function removeElement(elementId) {
    if (!confirm('Tem certeza que deseja remover este elemento?')) return;
    
    const element = mapData.elements.find(el => el.id === elementId);
    if (!element) return;
    
    mapData.elements = mapData.elements.filter(el => el.id !== elementId);
    
    if (mapData.selectedElement === elementId) {
        clearSelection();
    }
    
    updateGridElements();
    saveMapData();
    
    addNotification('Elemento removido', `${element.name} foi removido.`, 'info', true);
}

// Salvar elemento
function saveElement() {
    const element = mapData.elements.find(el => el.id === mapData.selectedElement);
    if (!element) return;
    
    element.name = elementName.value || element.type;
    element.type = elementType.value;
    element.hp = parseInt(elementHP.value) || 10;
    element.notes = elementNotes.value;
    
    // Cor selecionada
    const selectedColorOption = document.querySelector('.color-option-small.selected');
    if (selectedColorOption) {
        element.color = selectedColorOption.style.backgroundColor;
    }
    
    updateGridElements();
    saveMapData();
    hideElementDetails();
    
    addNotification('Elemento atualizado', `${element.name} foi atualizado.`, 'success', true);
}

// =================== SISTEMA DE MEDIÇÃO ===================

// Iniciar medição
function startMeasurement() {
    mapData.isMeasuring = !mapData.isMeasuring;
    mapData.measurementPoints = [];
    
    // Limpar medição anterior
    clearMeasurement();
    
    if (mapData.isMeasuring) {
        startMeasurementButton.innerHTML = '<i class="fas fa-stop"></i> Parar';
        startMeasurementButton.classList.add('btn-danger');
        startMeasurementButton.classList.remove('btn-secondary');
        
        addNotification('Medição ativada', 'Clique em duas células para medir a distância.', 'info', true);
    } else {
        startMeasurementButton.innerHTML = '<i class="fas fa-play"></i> Medir';
        startMeasurementButton.classList.remove('btn-danger');
        startMeasurementButton.classList.add('btn-secondary');
    }
}

// Manipular clique de medição
function handleMeasurementClick(x, y) {
    mapData.measurementPoints.push({ x, y });
    
    // Marcar célula
    const cell = document.querySelector(`.grid-cell[data-x="${x}"][data-y="${y}"]`);
    if (cell) {
        cell.classList.add(mapData.measurementPoints.length === 1 ? 'measure-start' : 'measure-end');
    }
    
    // Se temos dois pontos, calcular distância
    if (mapData.measurementPoints.length === 2) {
        calculateDistance();
        mapData.isMeasuring = false;
        startMeasurementButton.innerHTML = '<i class="fas fa-play"></i> Medir';
        startMeasurementButton.classList.remove('btn-danger');
        startMeasurementButton.classList.add('btn-secondary');
    }
}

// Calcular distância
function calculateDistance() {
    if (mapData.measurementPoints.length !== 2) return;
    
    const [point1, point2] = mapData.measurementPoints;
    
    // Distância de Manhattan (movimento em grade)
    const dx = Math.abs(point2.x - point1.x);
    const dy = Math.abs(point2.y - point1.y);
    
    // Distância euclidiana (em linha reta)
    const distanceStraight = Math.sqrt(dx * dx + dy * dy);
    
    // Distância em quadrados (movimento D&D)
    const distanceSquares = Math.max(dx, dy);
    
    // Atualizar display
    measuredDistance.textContent = `${distanceSquares} quadrados`;
    
    // Desenhar linha de medição
    drawMeasurementLine(point1, point2, distanceSquares);
    
    addNotification('Distância medida', `${distanceSquares} quadrados entre os pontos.`, 'success', true);
}

// Desenhar linha de medição
function drawMeasurementLine(point1, point2, distance) {
    const container = combatMap.querySelector('.grid-container');
    
    // Calcular posições em pixels
    const x1 = point1.x * mapData.cellSize + mapData.cellSize / 2;
    const y1 = point1.y * mapData.cellSize + mapData.cellSize / 2;
    const x2 = point2.x * mapData.cellSize + mapData.cellSize / 2;
    const y2 = point2.y * mapData.cellSize + mapData.cellSize / 2;
    
    // Calcular comprimento e ângulo
    const dx = x2 - x1;
    const dy = y2 - y1;
    const length = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx) * 180 / Math.PI;
    
    // Criar linha
    const line = document.createElement('div');
    line.className = 'measurement-line';
    line.style.width = `${length}px`;
    line.style.left = `${x1}px`;
    line.style.top = `${y1}px`;
    line.style.transform = `rotate(${angle}deg)`;
    
    // Criar label
    const label = document.createElement('div');
    label.className = 'measurement-label';
    label.textContent = `${distance} quadrados`;
    label.style.left = `${(x1 + x2) / 2}px`;
    label.style.top = `${(y1 + y2) / 2 - 20}px`;
    
    container.appendChild(line);
    container.appendChild(label);
}

// Limpar medição
function clearMeasurement() {
    mapData.measurementPoints = [];
    
    // Remover marcações das células
    document.querySelectorAll('.measure-start, .measure-end, .measure-path').forEach(cell => {
        cell.classList.remove('measure-start', 'measure-end', 'measure-path');
    });
    
    // Remover linhas e labels
    document.querySelectorAll('.measurement-line, .measurement-label').forEach(el => {
        el.remove();
    });
    
    measuredDistance.textContent = '0 quadrados';
    
    if (mapData.isMeasuring) {
        mapData.isMeasuring = false;
        startMeasurementButton.innerHTML = '<i class="fas fa-play"></i> Medir';
        startMeasurementButton.classList.remove('btn-danger');
        startMeasurementButton.classList.add('btn-secondary');
    }
}

// =================== SISTEMA DE ARRASTAR E SOLTAR ===================

// Tornar elemento arrastável
function makeDraggable(elementDiv, elementData) {
    let isDragging = false;
    let startX, startY, initialX, initialY;
    
    elementDiv.addEventListener('mousedown', startDrag);
    elementDiv.addEventListener('touchstart', startDragTouch);
    
    function startDrag(e) {
        e.preventDefault();
        isDragging = true;
        
        startX = e.clientX;
        startY = e.clientY;
        initialX = elementData.x;
        initialY = elementData.y;
        
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', stopDrag);
    }
    
    function startDragTouch(e) {
        e.preventDefault();
        if (e.touches.length !== 1) return;
        
        isDragging = true;
        
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        initialX = elementData.x;
        initialY = elementData.y;
        
        document.addEventListener('touchmove', dragTouch);
        document.addEventListener('touchend', stopDrag);
    }
    
    function drag(e) {
        if (!isDragging) return;
        
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        
        // Calcular nova posição em células
        const cellSize = mapData.cellSize;
        const newX = Math.round(initialX + dx / cellSize);
        const newY = Math.round(initialY + dy / cellSize);
        
        // Verificar limites
        if (newX >= 0 && newX < mapData.gridSize && 
            newY >= 0 && newY < mapData.gridSize) {
            
            // Verificar se a célula está ocupada
            const cellOccupied = mapData.elements.some(el => 
                el.id !== elementData.id && el.x === newX && el.y === newY);
            
            if (!cellOccupied) {
                elementDiv.style.left = `${newX * cellSize + 2}px`;
                elementDiv.style.top = `${newY * cellSize + 2}px`;
                
                // Atualizar posição no elemento
                elementData.x = newX;
                elementData.y = newY;
            }
        }
    }
    
    function dragTouch(e) {
        if (!isDragging || e.touches.length !== 1) return;
        
        const dx = e.touches[0].clientX - startX;
        const dy = e.touches[0].clientY - startY;
        
        const cellSize = mapData.cellSize;
        const newX = Math.round(initialX + dx / cellSize);
        const newY = Math.round(initialY + dy / cellSize);
        
        if (newX >= 0 && newX < mapData.gridSize && 
            newY >= 0 && newY < mapData.gridSize) {
            
            const cellOccupied = mapData.elements.some(el => 
                el.id !== elementData.id && el.x === newX && el.y === newY);
            
            if (!cellOccupied) {
                elementDiv.style.left = `${newX * cellSize + 2}px`;
                elementDiv.style.top = `${newY * cellSize + 2}px`;
                
                elementData.x = newX;
                elementData.y = newY;
            }
        }
    }
    
    function stopDrag() {
        if (!isDragging) return;
        
        isDragging = false;
        
        // Salvar posição final
        saveMapData();
        updateMapElementsList();
        
        document.removeEventListener('mousemove', drag);
        document.removeEventListener('touchmove', dragTouch);
        document.removeEventListener('mouseup', stopDrag);
        document.removeEventListener('touchend', stopDrag);
    }
}

// =================== SALVAR E CARREGAR MAPA ===================

// Salvar dados do mapa
function saveMapData() {
    try {
        const mapDataToSave = {
            gridSize: mapData.gridSize,
            elements: mapData.elements,
            terrains: mapData.terrains,
            lastModified: new Date().toISOString()
        };
        
        localStorage.setItem('rpg_combat_map', JSON.stringify(mapDataToSave));
        return true;
    } catch (error) {
        console.error('Erro ao salvar mapa:', error);
        return false;
    }
}

// Carregar dados do mapa
function loadMapData() {
    try {
        const savedData = localStorage.getItem('rpg_combat_map');
        if (savedData) {
            const data = JSON.parse(savedData);
            
            mapData.gridSize = data.gridSize || 30;
            mapData.elements = data.elements || [];
            mapData.terrains = data.terrains || {};
            
            updateGridSize();
            createGrid();
            
            addNotification('Mapa carregado', 'Mapa de combate restaurado.', 'success', true);
        }
    } catch (error) {
        console.error('Erro ao carregar mapa:', error);
    }
}

// Atualizar tamanho da grade
function updateGridSize() {
    gridSize.textContent = `Grade ${mapData.gridSize}x${mapData.gridSize}`;
    gridScale.value = mapData.gridSize;
    cellSize.value = mapData.cellSize;
}

// Limpar mapa
function clearMap() {
    if (!confirm('Tem certeza que deseja limpar todo o mapa? Esta ação não pode ser desfeita.')) return;
    
    mapData.elements = [];
    mapData.terrains = {};
    mapData.selectedElement = null;
    
    updateGridElements();
    clearMeasurement();
    hideElementDetails();
    saveMapData();
    
    addNotification('Mapa limpo', 'Todos os elementos foram removidos.', 'info');
}

// Exportar mapa
function exportMap() {
    const exportData = {
        map: mapData,
        exportDate: new Date().toISOString(),
        version: '1.0'
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `mapa_combate_${new Date().toISOString().slice(0,10)}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    addNotification('Mapa exportado', 'Mapa salvo como arquivo JSON.', 'success', true);
}

// Importar mapa
function importMap() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = e => {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = event => {
            try {
                const importedData = JSON.parse(event.target.result);
                
                if (importedData.map) {
                    mapData = importedData.map;
                    updateGridSize();
                    createGrid();
                    saveMapData();
                    
                    addNotification('Mapa importado', 'Mapa carregado com sucesso!', 'success');
                } else {
                    addNotification('Erro na importação', 'Arquivo inválido.', 'danger', true);
                }
            } catch (error) {
                console.error('Erro ao importar mapa:', error);
                addNotification('Erro na importação', 'Não foi possível ler o arquivo.', 'danger', true);
            }
        };
        
        reader.readAsText(file);
    };
    
    input.click();
}

// =================== CONFIGURAR EVENT LISTENERS ===================

function setupEventListeners() {
    // Ferramentas do mapa
    document.querySelectorAll('.map-tool-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.map-tool-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            mapData.selectedTool = btn.dataset.tool;
            
            // Notificar mudança de ferramenta
            const toolNames = {
                select: 'Seleção',
                character: 'Personagem',
                enemy: 'Inimigo',
                obstacle: 'Obstáculo',
                terrain: 'Terreno',
                erase: 'Apagar'
            };
            
            addNotification(`Ferramenta: ${toolNames[mapData.selectedTool]}`, 'Clique no mapa para usar.', 'info', true);
        });
    });
    
    // Configurações da grade
    gridScale.addEventListener('change', () => {
        mapData.gridSize = parseInt(gridScale.value);
        createGrid();
        saveMapData();
    });
    
    cellSize.addEventListener('change', () => {
        mapData.cellSize = parseInt(cellSize.value);
        createGrid();
        saveMapData();
    });
    
    // Alternar grade
    toggleGridButton.addEventListener('click', () => {
        mapData.showGrid = !mapData.showGrid;
        document.querySelectorAll('.grid-cell').forEach(cell => {
            cell.style.border = mapData.showGrid ? '1px solid rgba(83, 52, 131, 0.1)' : 'none';
        });
        
        toggleGridButton.innerHTML = mapData.showGrid 
            ? '<i class="fas fa-th"></i>' 
            : '<i class="fas fa-th-large"></i>';
    });
    
    // Botões principais
    clearMapButton.addEventListener('click', clearMap);
    saveMapButton.addEventListener('click', () => {
        saveMapData();
        addNotification('Mapa salvo', 'Progresso do mapa foi salvo.', 'success', true);
    });
    
    loadMapButton.addEventListener('click', () => {
        if (confirm('Carregar mapa salvo? Isso substituirá o mapa atual.')) {
            loadMapData();
        }
    });
    
    exportMapButton.addEventListener('click', exportMap);
    
    // Botão de importação (oculto)
    const importButton = document.createElement('button');
    importButton.style.display = 'none';
    importButton.addEventListener('click', importMap);
    document.body.appendChild(importButton);
    
    // Simular clique no botão de importação quando necessário
    loadMapButton.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        importButton.click();
    });
    
    // Medição
    startMeasurementButton.addEventListener('click', startMeasurement);
    clearMeasurementButton.addEventListener('click', clearMeasurement);
    
    // Paleta de terrenos
    document.querySelectorAll('.terrain-option').forEach(option => {
        option.addEventListener('click', () => {
            document.querySelectorAll('.terrain-option').forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
            selectedTerrain = option.dataset.terrain;
        });
    });
    
    // Seleção de cor
    document.querySelectorAll('.color-option-small').forEach(option => {
        option.addEventListener('click', () => {
            document.querySelectorAll('.color-option-small').forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
            selectedColor = option.style.backgroundColor;
        });
    });
    
    // Detalhes do elemento
    document.querySelector('.close-details').addEventListener('click', hideElementDetails);
    saveElementButton.addEventListener('click', saveElement);
    deleteElementButton.addEventListener('click', () => {
        if (mapData.selectedElement) {
            removeElement(mapData.selectedElement);
            hideElementDetails();
        }
    });
    
    // Teclas de atalho
    document.addEventListener('keydown', (e) => {
        // Tecla ESC para limpar seleção
        if (e.key === 'Escape') {
            clearSelection();
            clearMeasurement();
        }
        
        // Tecla Delete para remover elemento selecionado
        if (e.key === 'Delete' && mapData.selectedElement) {
            removeElement(mapData.selectedElement);
            hideElementDetails();
        }
        
        // Teclas 1-6 para ferramentas
        if (e.key >= '1' && e.key <= '6') {
            const toolIndex = parseInt(e.key) - 1;
            const tools = document.querySelectorAll('.map-tool-btn');
            if (tools[toolIndex]) {
                tools[toolIndex].click();
            }
        }
    });
}

// =================== INICIALIZAÇÃO ATUALIZADA ===================

// Atualize a função initializeApp para incluir o mapa:

async function initializeApp() {
    await loadMessages();
    loadCombatState();
    loadDashboardData();
    loadNPCs();
    initializeMap(); // ← ADICIONE ESTA LINHA
    
    if (messages.length === 0) {
        const welcomeMessage = {
            id: 'welcome',
            content: 'Bem-vindos à mesa de RPG! Use os dados abaixo para suas ações e veja os resultados em tempo real.',
            user_name: 'Mestre do Jogo',
            character_class: 'Mestre',
            character_subclass: 'Mestre das Aventuras',
            user_color: '#ffd93d',
            action_type: 'narrative',
            created_at: new Date().toISOString(),
            is_dice_roll: false
        };
        messages.push(welcomeMessage);
        await saveMessages();
        updateListDisplay();
    }
    
    // Configurar notificações automáticas
    setupAutomaticNotifications();
    
    // Inicializar dashboard
    updateDashboardStats();
    
    // Adicionar notificação de boas-vindas
    addNotification(
        'Mapa de combate ativo!',
        'Sistema de mapa interativo carregado. Posicione personagens e inimigos para batalhas épicas!',
        'success'
    );
    
    setInterval(loadMessages, 10000);
    setInterval(updateDashboardStats, 30000);
    setInterval(saveDashboardData, 60000);
}

// Tab System
const npcTabs = document.querySelectorAll('.npc-tab');
const npcTabContents = document.querySelectorAll('.npc-tab-content');

// Sistema de NPCs
let npcs = [];
let currentEncounter = null;
let selectedNPC = null;

// NPCs pré-definidos (exemplos)
const defaultNPCs = [
    {
        id: 'npc_1',
        name: 'Garald, o Ferreiro',
        type: 'merchant',
        race: 'human',
        class: 'merchant',
        location: 'town',
        level: 2,
        description: 'Ferreiro experiente da cidade, conhecido por sua honestidade e qualidade.',
        hp: 45,
        ac: 13,
        initiative: 0,
        perception: 12,
        tags: ['ferreiro', 'honesto', 'qualidade'],
        notes: 'Fornece armas e armaduras de qualidade. Pode melhorar equipamentos.',
        created_at: new Date().toISOString()
    },
    {
        id: 'npc_2',
        name: 'Elara, a Curandeira',
        type: 'ally',
        race: 'elf',
        class: 'cleric',
        location: 'temple',
        level: 3,
        description: 'Sacerdotisa dedicada à cura e proteção dos necessitados.',
        hp: 32,
        ac: 14,
        initiative: 2,
        perception: 15,
        tags: ['curandeira', 'sacerdotisa', 'piedosa'],
        notes: 'Oferece serviços de cura em troca de doações ao templo.',
        created_at: new Date().toISOString()
    },
    {
        id: 'npc_3',
        name: 'Grunk, o Orc Saqueador',
        type: 'enemy',
        race: 'orc',
        class: 'warrior',
        location: 'wilderness',
        level: 1,
        description: 'Orc brutal que lidera uma pequena gangue de saqueadores.',
        hp: 30,
        ac: 13,
        initiative: 1,
        perception: 10,
        tags: ['brutal', 'saqueador', 'líder'],
        notes: 'Ataca viajantes na estrada do norte.',
        created_at: new Date().toISOString()
    },
    {
        id: 'npc_4',
        name: 'Thorin Barba de Pedra',
        type: 'ally',
        race: 'dwarf',
        class: 'warrior',
        location: 'tavern',
        level: 4,
        description: 'Anão veterano de muitas batalhas, agora aposentado mas sempre pronto para ajudar.',
        hp: 52,
        ac: 16,
        initiative: 1,
        perception: 13,
        tags: ['veterano', 'confiável', 'bebedor'],
        notes: 'Conhece os segredos das montanhas ao norte.',
        created_at: new Date().toISOString()
    },
    {
        id: 'npc_5',
        name: 'Lysandra, a Ilusionista',
        type: 'neutral',
        race: 'human',
        class: 'mage',
        location: 'town',
        level: 5,
        description: 'Maga especializada em ilusões, misteriosa e imprevisível.',
        hp: 28,
        ac: 12,
        initiative: 3,
        perception: 14,
        tags: ['ilusionista', 'misteriosa', 'imprevisível'],
        notes: 'Pode fornecer informações por um preço.',
        created_at: new Date().toISOString()
    }
];

// Banco de Encontros pré-definidos
const encounterTemplates = {
    easy: [
        { name: 'Bando de Kobolds', description: 'Um grupo de kobolds armados com armadilhas e dardos venenosos.', enemies: ['kobold', 'kobold', 'kobold'] },
        { name: 'Lobos da Floresta', description: 'Uma alcateia de lobos famintos caçando na floresta.', enemies: ['wolf', 'wolf', 'wolf'] },
        { name: 'Bandidos da Estrada', description: 'Três bandidos mal equipados tentando assaltar viajantes.', enemies: ['bandit', 'bandit', 'bandit'] }
    ],
    medium: [
        { name: 'Cultistas das Sombras', description: 'Um grupo de cultistas realizando um ritual macabro.', enemies: ['cultist', 'cultist', 'cultist', 'acolyte'] },
        { name: 'Goblins e Bugbears', description: 'Uma força mista de goblins liderada por um bugbear.', enemies: ['goblin', 'goblin', 'goblin', 'bugbear'] },
        { name: 'Zumbis Renascidos', description: 'Mortos-vivos emergindo de um cemitério antigo.', enemies: ['zombie', 'zombie', 'zombie', 'ghoul'] }
    ],
    hard: [
        { name: 'Troll da Montanha', description: 'Um troll gigante acompanhado por seus servos goblins.', enemies: ['troll', 'goblin', 'goblin', 'goblin', 'goblin'] },
        { name: 'Dragão Jovem', description: 'Um dragão jovem estabelecendo seu território.', enemies: ['young dragon', 'kobold', 'kobold', 'kobold'] },
        { name: 'Necromante e seus Mortos', description: 'Um necromante poderoso com seu exército de mortos-vivos.', enemies: ['necromancer', 'zombie', 'zombie', 'skeleton', 'skeleton', 'ghost'] }
    ],
    deadly: [
        { name: 'Demônio Invocado', description: 'Um demônio poderoso invocado por um culto maligno.', enemies: ['demon', 'cultist', 'cultist', 'cultist', 'acolyte', 'acolyte'] },
        { name: 'Dragão Adulto', description: 'Um dragão adulto guardando seu tesouro.', enemies: ['adult dragon'] },
        { name: 'Lich e seus Guardiões', description: 'Um lich imortal protegido por guardiões mágicos.', enemies: ['lich', 'death knight', 'wraith', 'wraith', 'skeleton mage'] }
    ]
};

// Tabela de NPCs geráveis
const npcTemplates = {
    human: {
        commoner: { hp: 4, ac: 10, initiative: 0, perception: 10 },
        warrior: { hp: 16, ac: 13, initiative: 1, perception: 11 },
        archer: { hp: 12, ac: 13, initiative: 2, perception: 13 },
        mage: { hp: 8, ac: 11, initiative: 2, perception: 12 },
        cleric: { hp: 12, ac: 14, initiative: 0, perception: 13 },
        rogue: { hp: 10, ac: 12, initiative: 3, perception: 14 },
        merchant: { hp: 8, ac: 10, initiative: 0, perception: 10 },
        noble: { hp: 9, ac: 11, initiative: 0, perception: 11 },
        guard: { hp: 14, ac: 14, initiative: 1, perception: 12 },
        bandit: { hp: 11, ac: 12, initiative: 1, perception: 10 },
        cultist: { hp: 9, ac: 12, initiative: 0, perception: 11 },
        beast: { hp: 15, ac: 12, initiative: 2, perception: 13 }
    },
    elf: {
        commoner: { hp: 4, ac: 11, initiative: 2, perception: 13 },
        warrior: { hp: 15, ac: 14, initiative: 3, perception: 14 },
        archer: { hp: 13, ac: 14, initiative: 4, perception: 15 },
        mage: { hp: 9, ac: 12, initiative: 3, perception: 14 },
        cleric: { hp: 13, ac: 15, initiative: 2, perception: 15 },
        rogue: { hp: 11, ac: 13, initiative: 4, perception: 16 },
        merchant: { hp: 8, ac: 11, initiative: 2, perception: 13 },
        noble: { hp: 10, ac: 12, initiative: 2, perception: 14 }
    },
    dwarf: {
        commoner: { hp: 6, ac: 12, initiative: 0, perception: 12 },
        warrior: { hp: 18, ac: 15, initiative: 0, perception: 13 },
        archer: { hp: 14, ac: 14, initiative: 1, perception: 14 },
        mage: { hp: 10, ac: 13, initiative: 1, perception: 13 },
        cleric: { hp: 16, ac: 16, initiative: 0, perception: 14 },
        rogue: { hp: 12, ac: 14, initiative: 2, perception: 15 },
        merchant: { hp: 10, ac: 12, initiative: 0, perception: 12 }
    },
    orc: {
        commoner: { hp: 8, ac: 11, initiative: 0, perception: 10 },
        warrior: { hp: 20, ac: 13, initiative: 1, perception: 11 },
        archer: { hp: 14, ac: 13, initiative: 1, perception: 12 },
        mage: { hp: 10, ac: 11, initiative: 1, perception: 11 },
        cleric: { hp: 16, ac: 14, initiative: 0, perception: 12 },
        rogue: { hp: 12, ac: 12, initiative: 2, perception: 13 },
        beast: { hp: 18, ac: 13, initiative: 1, perception: 12 }
    }
};

// =================== SISTEMA DE NPCS ===================

// Carregar NPCs
function loadNPCs() {
    try {
        const savedNPCs = localStorage.getItem('rpg_npcs');
        if (savedNPCs) {
            npcs = JSON.parse(savedNPCs);
        } else {
            npcs = [...defaultNPCs];
            saveNPCs();
        }
        updateNPCsDisplay();
        return true;
    } catch (error) {
        console.error('Erro ao carregar NPCs:', error);
        npcs = [...defaultNPCs];
        updateNPCsDisplay();
        return false;
    }
}

// Salvar NPCs
function saveNPCs() {
    try {
        localStorage.setItem('rpg_npcs', JSON.stringify(npcs));
        return true;
    } catch (error) {
        console.error('Erro ao salvar NPCs:', error);
        return false;
    }
}

// Atualizar exibição de NPCs
function updateNPCsDisplay() {
    const typeFilter = npcTypeFilter.value;
    const locationFilter = npcLocationFilter.value;
    
    let filteredNPCs = npcs;
    
    if (typeFilter !== 'all') {
        filteredNPCs = filteredNPCs.filter(npc => npc.type === typeFilter);
    }
    
    if (locationFilter !== 'all') {
        filteredNPCs = filteredNPCs.filter(npc => npc.location === locationFilter);
    }
    
    // Atualizar contador
    npcCount.textContent = `${filteredNPCs.length} NPC${filteredNPCs.length !== 1 ? 's' : ''}`;
    
    // Atualizar grid
    npcsGrid.innerHTML = '';
    
    if (filteredNPCs.length === 0) {
        npcsGrid.innerHTML = `
            <div class="loading-npcs">
                <i class="fas fa-users-slash"></i><br>
                Nenhum NPC encontrado<br>
                <small>Mude os filtros ou crie novos NPCs</small>
            </div>
        `;
        return;
    }
    
    filteredNPCs.forEach(npc => {
        const npcCard = document.createElement('div');
        npcCard.className = 'npc-card';
        npcCard.setAttribute('data-npc-id', npc.id);
        
        // Tipo para cor
        const typeColors = {
            ally: '#4d96ff',
            enemy: '#ff6b6b',
            neutral: '#6bcf7f',
            merchant: '#ffd93d',
            quest: '#9d4edd'
        };
        
        // Descrição resumida
        const shortDescription = npc.description.length > 100 
            ? npc.description.substring(0, 100) + '...' 
            : npc.description;
        
        npcCard.innerHTML = `
            <div class="npc-card-header">
                <div class="npc-name">${npc.name}</div>
                <div class="npc-type ${npc.type}">${getTypeText(npc.type)}</div>
            </div>
            <div class="npc-info">
                <div class="npc-info-item">
                    <i class="fas fa-user-tag"></i>
                    <span>${getRaceText(npc.race)} ${getClassText(npc.class)}</span>
                </div>
                <div class="npc-info-item">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${getLocationText(npc.location)}</span>
                </div>
                <div class="npc-info-item">
                    <i class="fas fa-star"></i>
                    <span>Nível ${npc.level}</span>
                </div>
            </div>
            <div class="npc-description">${shortDescription}</div>
            <div class="npc-stats">
                <div class="npc-stat">
                    <div class="npc-stat-label">PV</div>
                    <div class="npc-stat-value">${npc.hp}</div>
                </div>
                <div class="npc-stat">
                    <div class="npc-stat-label">CA</div>
                    <div class="npc-stat-value">${npc.ac}</div>
                </div>
                <div class="npc-stat">
                    <div class="npc-stat-label">Iniciativa</div>
                    <div class="npc-stat-value">${npc.initiative >= 0 ? '+' : ''}${npc.initiative}</div>
                </div>
            </div>
        `;
        
        npcCard.addEventListener('click', () => showNPCDetails(npc.id));
        npcsGrid.appendChild(npcCard);
    });
}

// Mostrar detalhes do NPC
function showNPCDetails(npcId) {
    const npc = npcs.find(n => n.id === npcId);
    if (!npc) return;
    
    selectedNPC = npc;
    
    npcModalBody.innerHTML = `
        <div class="npc-detail-view">
            <div class="npc-detail-header">
                <div class="npc-detail-avatar" style="background-color: ${getTypeColor(npc.type)}">
                    ${npc.name.charAt(0)}
                </div>
                <div class="npc-detail-info">
                    <div class="npc-detail-name">${npc.name}</div>
                    <div class="npc-detail-type ${npc.type}" style="background-color: ${getTypeColor(npc.type)}20; color: ${getTypeColor(npc.type)}">
                        ${getTypeText(npc.type)}
                    </div>
                    <div class="npc-detail-row">
                        <span class="npc-detail-label">Raça:</span>
                        <span class="npc-detail-value">${getRaceText(npc.race)}</span>
                    </div>
                    <div class="npc-detail-row">
                        <span class="npc-detail-label">Classe:</span>
                        <span class="npc-detail-value">${getClassText(npc.class)}</span>
                    </div>
                    <div class="npc-detail-row">
                        <span class="npc-detail-label">Localização:</span>
                        <span class="npc-detail-value">${getLocationText(npc.location)}</span>
                    </div>
                </div>
            </div>
            
            <div class="npc-detail-stats">
                <div class="stat-detail">
                    <div class="stat-detail-label">Nível</div>
                    <div class="stat-detail-value">${npc.level}</div>
                </div>
                <div class="stat-detail">
                    <div class="stat-detail-label">PV</div>
                    <div class="stat-detail-value">${npc.hp}</div>
                </div>
                <div class="stat-detail">
                    <div class="stat-detail-label">CA</div>
                    <div class="stat-detail-value">${npc.ac}</div>
                </div>
                <div class="stat-detail">
                    <div class="stat-detail-label">Iniciativa</div>
                    <div class="stat-detail-value">${npc.initiative >= 0 ? '+' : ''}${npc.initiative}</div>
                </div>
                <div class="stat-detail">
                    <div class="stat-detail-label">Percepção</div>
                    <div class="stat-detail-value">${npc.perception}</div>
                </div>
            </div>
            
            <div class="npc-detail-description">
                <h4>Descrição</h4>
                <p>${npc.description}</p>
                
                ${npc.notes ? `
                    <h4 style="margin-top: 15px;">Notas</h4>
                    <p>${npc.notes}</p>
                ` : ''}
                
                ${npc.tags && npc.tags.length > 0 ? `
                    <h4 style="margin-top: 15px;">Tags</h4>
                    <div class="npc-tags">
                        ${npc.tags.map(tag => `<span class="npc-tag">${tag}</span>`).join('')}
                    </div>
                ` : ''}
            </div>
        </div>
    `;
    
    npcModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Funções auxiliares de texto
function getTypeText(type) {
    const types = {
        ally: 'Aliado',
        enemy: 'Inimigo',
        neutral: 'Neutro',
        merchant: 'Comerciante',
        quest: 'Missão'
    };
    return types[type] || type;
}

function getRaceText(race) {
    const races = {
        human: 'Humano',
        elf: 'Elfo',
        dwarf: 'Anão',
        halfling: 'Halfling',
        orc: 'Orc',
        goblin: 'Goblin',
        dragonborn: 'Dragonborn',
        tiefling: 'Tiefling',
        gnome: 'Gnomo',
        'half-elf': 'Meio-Elfo',
        'half-orc': 'Meio-Orc'
    };
    return races[race] || race;
}

function getClassText(className) {
    const classes = {
        commoner: 'Comum',
        warrior: 'Guerreiro',
        archer: 'Arqueiro',
        mage: 'Mago',
        cleric: 'Clérigo',
        rogue: 'Ladino',
        merchant: 'Mercador',
        noble: 'Nobre',
        guard: 'Guarda',
        bandit: 'Bandido',
        cultist: 'Cultista',
        beast: 'Fera'
    };
    return classes[className] || className;
}

function getLocationText(location) {
    const locations = {
        town: 'Cidade/Vila',
        wilderness: 'Selva/Floresta',
        dungeon: 'Masmorra',
        tavern: 'Taverna',
        temple: 'Templo',
        castle: 'Castelo',
        road: 'Estrada',
        mountains: 'Montanhas',
        swamp: 'Pântano',
        coast: 'Costa/Mar'
    };
    return locations[location] || location;
}

function getTypeColor(type) {
    const colors = {
        ally: '#4d96ff',
        enemy: '#ff6b6b',
        neutral: '#6bcf7f',
        merchant: '#ffd93d',
        quest: '#9d4edd'
    };
    return colors[type] || '#9d4edd';
}

// Adicionar novo NPC
function addNewNPC() {
    // Ir para a aba de NPC rápido
    document.querySelector('.npc-tab[data-tab="quick-npc"]').click();
    
    // Limpar o formulário
    clearQuickNPCForm();
    
    // Gerar um NPC aleatório como base
    generateRandomNPC();
    
    // Notificação
    addNotification('Novo NPC', 'Formulário pronto para criar um novo NPC.', 'info', true);
}

// =================== GERADOR DE ENCONTROS ===================

// Gerar encontro
function generateEncounter() {
    const difficulty = encounterDifficulty.value;
    const location = encounterLocation.value;
    const partyLevel = parseInt(encounterPartyLevel.value);
    const type = encounterType.value;
    const size = parseInt(partySize.value);
    
    // Calcular XP total baseado no nível do grupo
    const xpPerPlayer = getXPForLevel(partyLevel);
    const totalXP = xpPerPlayer * size;
    
    // Ajustar pela dificuldade
    let multiplier = 1;
    switch (difficulty) {
        case 'easy': multiplier = 0.5; break;
        case 'medium': multiplier = 1; break;
        case 'hard': multiplier = 1.5; break;
        case 'deadly': multiplier = 2; break;
    }
    
    const adjustedXP = Math.floor(totalXP * multiplier);
    
    // Selecionar template baseado na dificuldade
    let templatePool = encounterTemplates[difficulty] || encounterTemplates.medium;
    
    // Se for aleatório, escolher dificuldade aleatória
    if (difficulty === 'random') {
        const difficulties = ['easy', 'medium', 'hard', 'deadly'];
        const randomDiff = difficulties[Math.floor(Math.random() * difficulties.length)];
        templatePool = encounterTemplates[randomDiff];
    }
    
    const template = templatePool[Math.floor(Math.random() * templatePool.length)];
    
    // Gerar inimigos
    const enemies = [];
    const enemyCount = Math.max(2, Math.floor(Math.random() * 4) + 2);
    
    for (let i = 0; i < enemyCount; i++) {
        const enemyType = template.enemies[Math.floor(Math.random() * template.enemies.length)];
        enemies.push(generateNPCFromTemplate(enemyType, location));
    }
    
    // Criar objeto do encontro
    currentEncounter = {
        id: generateId(),
        name: template.name,
        description: template.description,
        difficulty: difficulty,
        location: location,
        partyLevel: partyLevel,
        partySize: size,
        enemies: enemies,
        xp: adjustedXP,
        treasure: generateTreasure(difficulty, partyLevel),
        created_at: new Date().toISOString()
    };
    
    // Atualizar exibição
    updateEncounterDisplay();
    
    // Habilitar botões
    addToInitiativeButton.disabled = false;
    saveEncounterButton.disabled = false;
    
    // Notificação
    addNotification(
        'Encontro gerado!',
        `${currentEncounter.name} criado com ${currentEncounter.enemies.length} inimigos.`,
        'combat'
    );
}

// Atualizar exibição do encontro
function updateEncounterDisplay() {
    if (!currentEncounter) {
        encounterResult.innerHTML = `
            <div class="no-encounter">
                <i class="fas fa-dragon"></i><br>
                Configure as opções e clique em "Gerar Encontro"<br>
                <small>Um encontro será criado automaticamente</small>
            </div>
        `;
        return;
    }
    
    const difficultyText = {
        easy: 'Fácil',
        medium: 'Médio',
        hard: 'Difícil',
        deadly: 'Mortal'
    };
    
    // Contar inimigos por tipo
    const enemyCounts = {};
    currentEncounter.enemies.forEach(enemy => {
        enemyCounts[enemy.class] = (enemyCounts[enemy.class] || 0) + 1;
    });
    
    encounterResult.innerHTML = `
        <div class="encounter-details">
            <div class="encounter-header">
                <div class="encounter-title">${currentEncounter.name}</div>
                <div class="encounter-difficulty ${currentEncounter.difficulty}">
                    ${difficultyText[currentEncounter.difficulty]}
                </div>
            </div>
            
            <div class="encounter-description">
                <p>${currentEncounter.description}</p>
                <p><strong>Local:</strong> ${getLocationText(currentEncounter.location)}</p>
            </div>
            
            <div class="encounter-npcs">
                <h4>Participantes do Encontro:</h4>
                ${Object.entries(enemyCounts).map(([type, count]) => {
                    const enemy = currentEncounter.enemies.find(e => e.class === type);
                    return `
                        <div class="encounter-npc ${enemy.type}">
                            <div class="npc-avatar">${enemy.name.charAt(0)}</div>
                            <div class="npc-details">
                                <div class="npc-name-small">${enemy.name}</div>
                                <div class="npc-info-small">
                                    <span>PV: ${enemy.hp}</span>
                                    <span>CA: ${enemy.ac}</span>
                                    <span>Iniciativa: ${enemy.initiative >= 0 ? '+' : ''}${enemy.initiative}</span>
                                </div>
                            </div>
                            <div class="npc-count">${count}x</div>
                        </div>
                    `;
                }).join('')}
            </div>
            
            <div class="encounter-stats">
                <div class="encounter-stat">
                    <div class="stat-label">XP Total</div>
                    <div class="stat-value">${currentEncounter.xp}</div>
                </div>
                <div class="encounter-stat">
                    <div class="stat-label">Nível do Grupo</div>
                    <div class="stat-value">${currentEncounter.partyLevel}</div>
                </div>
                <div class="encounter-stat">
                    <div class="stat-label">Inimigos</div>
                    <div class="stat-value">${currentEncounter.enemies.length}</div>
                </div>
                <div class="encounter-stat">
                    <div class="stat-label">Tesouro</div>
                    <div class="stat-value">${currentEncounter.treasure.value} PO</div>
                </div>
            </div>
            
            <div class="encounter-description">
                <h4>💎 Tesouro:</h4>
                <ul>
                    ${currentEncounter.treasure.items.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;
}

// Adicionar encontro à iniciativa
function addEncounterToInitiative() {
    if (!currentEncounter || !isCombatActive) {
        alert('Inicie o combate primeiro!');
        return;
    }
    
    currentEncounter.enemies.forEach((enemy, index) => {
        // Adicionar número para nomes duplicados
        const enemyName = currentEncounter.enemies.filter(e => e.name === enemy.name).length > 1
            ? `${enemy.name} ${index + 1}`
            : enemy.name;
        
        const participant = {
            name: enemyName,
            color: '#ff6b6b',
            class: enemy.class,
            initiative: rollDice(20) + enemy.initiative,
            type: 'enemy',
            currentHP: enemy.hp,
            maxHP: enemy.hp,
            conditions: []
        };
        
        initiativeOrder.push(participant);
    });
    
    // Reordenar iniciativa
    initiativeOrder.sort((a, b) => b.initiative - a.initiative);
    updateInitiativeDisplay();
    
    // Notificação
    addNotification(
        'Encontro adicionado!',
        `${currentEncounter.enemies.length} inimigos adicionados à iniciativa.`,
        'combat'
    );
    
    // Atualizar dashboard
    updateDashboardStats();
}

// Salvar encontro
function saveEncounter() {
    if (!currentEncounter) return;
    
    // Adicionar ao array de encontros salvos
    const savedEncounters = JSON.parse(localStorage.getItem('rpg_saved_encounters') || '[]');
    savedEncounters.push(currentEncounter);
    localStorage.setItem('rpg_saved_encounters', JSON.stringify(savedEncounters));
    
    // Notificação
    addNotification(
        'Encontro salvo!',
        `${currentEncounter.name} foi salvo na biblioteca.`,
        'success',
        true
    );
}

// Limpar encontro
function clearEncounter() {
    currentEncounter = null;
    updateEncounterDisplay();
    addToInitiativeButton.disabled = true;
    saveEncounterButton.disabled = true;
}

// =================== NPC RÁPIDO ===================

// Gerar NPC aleatório
function generateRandomNPC() {
    const races = ['human', 'elf', 'dwarf', 'halfling', 'orc', 'dragonborn', 'tiefling'];
    const classes = ['commoner', 'warrior', 'archer', 'mage', 'cleric', 'rogue', 'merchant', 'guard', 'bandit'];
    const types = ['ally', 'enemy', 'neutral', 'merchant'];
    const locations = ['town', 'wilderness', 'dungeon', 'tavern', 'temple', 'castle'];
    
    const race = races[Math.floor(Math.random() * races.length)];
    const npcClass = classes[Math.floor(Math.random() * classes.length)];
    const type = types[Math.floor(Math.random() * types.length)];
    const location = locations[Math.floor(Math.random() * locations.length)];
    
    // Nome baseado na raça
    const name = generateNPCName(race, type);
    
    // Descrição baseada nas características
    const description = generateNPCDescription(race, npcClass, type);
    
    // Obter estatísticas do template
    const template = npcTemplates[race]?.[npcClass] || npcTemplates.human.commoner;
    
    // Atualizar formulário
    quickNPCName.value = name;
    quickNPCRace.value = race;
    quickNPCClass.value = npcClass;
    quickNPCType.value = type;
    quickNPCLocation.value = location;
    quickNPCLevel.value = Math.floor(Math.random() * 5) + 1;
    quickNPCDescription.value = description;
    quickNPCHP.value = template.hp * quickNPCLevel.value;
    quickNPCAC.value = template.ac;
    quickNPCInit.value = template.initiative;
    quickNPCPercep.value = template.perception;
}

// Gerar NPC a partir do formulário
function generateNPCFromForm() {
    const name = quickNPCName.value.trim() || `NPC ${Math.floor(Math.random() * 1000)}`;
    const race = quickNPCRace.value;
    const npcClass = quickNPCClass.value;
    const type = quickNPCType.value;
    const location = quickNPCLocation.value;
    const level = parseInt(quickNPCLevel.value);
    const description = quickNPCDescription.value.trim() || generateNPCDescription(race, npcClass, type);
    
    // Obter estatísticas do template
    const template = npcTemplates[race]?.[npcClass] || npcTemplates.human.commoner;
    
    // Atualizar campos de estatísticas
    quickNPCHP.value = template.hp * level;
    quickNPCAC.value = template.ac;
    quickNPCInit.value = template.initiative;
    quickNPCPercep.value = template.perception;
    
    // Notificação
    addNotification('NPC gerado!', `${name} foi criado com sucesso.`, 'success', true);
}

// Salvar NPC rápido
function saveQuickNPC() {
    const npc = {
        id: `npc_${Date.now()}`,
        name: quickNPCName.value.trim() || `NPC ${Math.floor(Math.random() * 1000)}`,
        type: quickNPCType.value,
        race: quickNPCRace.value,
        class: quickNPCClass.value,
        location: quickNPCLocation.value,
        level: parseInt(quickNPCLevel.value),
        description: quickNPCDescription.value.trim() || 'Sem descrição.',
        hp: parseInt(quickNPCHP.value),
        ac: parseInt(quickNPCAC.value),
        initiative: parseInt(quickNPCInit.value),
        perception: parseInt(quickNPCPercep.value),
        tags: generateTags(quickNPCClass.value, quickNPCType.value),
        notes: 'Criado pelo gerador rápido.',
        created_at: new Date().toISOString()
    };
    
    // Adicionar ao array de NPCs
    npcs.unshift(npc);
    saveNPCs();
    updateNPCsDisplay();
    
    // Notificação
    addNotification(
        'NPC salvo!',
        `${npc.name} foi adicionado ao banco de NPCs.`,
        'success',
        true
    );
    
    // Limpar formulário
    clearQuickNPCForm();
}

// Limpar formulário de NPC rápido
function clearQuickNPCForm() {
    quickNPCName.value = '';
    quickNPCDescription.value = '';
    quickNPCHP.value = '10';
    quickNPCAC.value = '12';
    quickNPCInit.value = '1';
    quickNPCPercep.value = '10';
}

// =================== FUNÇÕES AUXILIARES ===================

// Gerar NPC a partir de um template
function generateNPCFromTemplate(templateType, location) {
    const templates = {
        kobold: { race: 'goblin', class: 'commoner', type: 'enemy', hp: 5, ac: 12, initiative: 2, perception: 10 },
        goblin: { race: 'goblin', class: 'archer', type: 'enemy', hp: 7, ac: 13, initiative: 2, perception: 11 },
        wolf: { race: 'beast', class: 'beast', type: 'enemy', hp: 11, ac: 13, initiative: 3, perception: 13 },
        bandit: { race: 'human', class: 'bandit', type: 'enemy', hp: 11, ac: 12, initiative: 1, perception: 10 },
        cultist: { race: 'human', class: 'cultist', type: 'enemy', hp: 9, ac: 12, initiative: 0, perception: 11 },
        acolyte: { race: 'human', class: 'cleric', type: 'enemy', hp: 9, ac: 10, initiative: 0, perception: 13 },
        zombie: { race: 'undead', class: 'commoner', type: 'enemy', hp: 22, ac: 8, initiative: -2, perception: 8 },
        skeleton: { race: 'undead', class: 'archer', type: 'enemy', hp: 13, ac: 13, initiative: 2, perception: 10 },
        ghoul: { race: 'undead', class: 'beast', type: 'enemy', hp: 22, ac: 12, initiative: 2, perception: 12 },
        bugbear: { race: 'orc', class: 'warrior', type: 'enemy', hp: 27, ac: 16, initiative: 1, perception: 11 },
        troll: { race: 'giant', class: 'beast', type: 'enemy', hp: 84, ac: 15, initiative: 1, perception: 13 },
        'young dragon': { race: 'dragon', class: 'beast', type: 'enemy', hp: 136, ac: 17, initiative: 0, perception: 16 },
        necromancer: { race: 'human', class: 'mage', type: 'enemy', hp: 66, ac: 12, initiative: 2, perception: 13 },
        'adult dragon': { race: 'dragon', class: 'beast', type: 'enemy', hp: 256, ac: 19, initiative: 0, perception: 18 },
        demon: { race: 'fiend', class: 'beast', type: 'enemy', hp: 200, ac: 18, initiative: 3, perception: 15 },
        lich: { race: 'undead', class: 'mage', type: 'enemy', hp: 135, ac: 17, initiative: 2, perception: 16 },
        'death knight': { race: 'undead', class: 'warrior', type: 'enemy', hp: 180, ac: 20, initiative: 0, perception: 12 },
        wraith: { race: 'undead', class: 'mage', type: 'enemy', hp: 67, ac: 13, initiative: 3, perception: 14 },
        'skeleton mage': { race: 'undead', class: 'mage', type: 'enemy', hp: 45, ac: 13, initiative: 2, perception: 12 }
    };
    
    const template = templates[templateType] || templates.kobold;
    
    return {
        id: generateId(),
        name: `${templateType.charAt(0).toUpperCase() + templateType.slice(1)}`,
        type: template.type,
        race: template.race,
        class: template.class,
        location: location,
        level: Math.ceil(template.hp / 10),
        description: `Um ${templateType} encontrado na região.`,
        hp: template.hp,
        ac: template.ac,
        initiative: template.initiative,
        perception: template.perception,
        created_at: new Date().toISOString()
    };
}

// Gerar nome de NPC
function generateNPCName(race, type) {
    const nameLists = {
        human: ['Garald', 'Elara', 'Marcus', 'Lysandra', 'Thorin', 'Isolde', 'Roland', 'Seraphina'],
        elf: ['Aelar', 'Lyra', 'Faelar', 'Sylas', 'Elowen', 'Thalion', 'Nimue', 'Calen'],
        dwarf: ['Thrain', 'Hilda', 'Borin', 'Frida', 'Durin', 'Helga', 'Gimli', 'Brunhilda'],
        orc: ['Grunk', 'Mog', 'Korg', 'Gash', 'Zug', 'Snag', 'Grak', 'Ruk'],
        dragonborn: ['Kaz', 'Sora', 'Vorik', 'Tiamat', 'Drako', 'Zephyr', 'Ignis', 'Nova'],
        tiefling: ['Mephisto', 'Lilith', 'Asmodeus', 'Nyx', 'Belial', 'Morgana', 'Zariel', 'Vesper']
    };
    
    const names = nameLists[race] || nameLists.human;
    const name = names[Math.floor(Math.random() * names.length)];
    
    // Adicionar título baseado no tipo
    const titles = {
        ally: ['o Protetor', 'o Guardião', 'o Leal', 'o Confiável'],
        enemy: ['o Cruel', 'o Traiçoeiro', 'o Sanguinário', 'o Implacável'],
        neutral: ['o Viajante', 'o Misterioso', 'o Solitário', 'o Observador'],
        merchant: ['o Mercador', 'o Comerciante', 'o Negociante', 'o Fornecedor']
    };
    
    const titleList = titles[type] || titles.neutral;
    const title = titleList[Math.floor(Math.random() * titleList.length)];
    
    return `${name} ${title}`;
}

// Gerar descrição de NPC
function generateNPCDescription(race, npcClass, type) {
    const raceDesc = {
        human: 'Uma figura humana',
        elf: 'Uma figura élfica',
        dwarf: 'Uma figura anã',
        orc: 'Uma figura orc',
        dragonborn: 'Uma figura dragonborn',
        tiefling: 'Uma figura tiefling'
    };
    
    const classDesc = {
        commoner: 'comum',
        warrior: 'guerreira',
        archer: 'atiradora',
        mage: 'arcana',
        cleric: 'devota',
        rogue: 'furtiva',
        merchant: 'comerciante',
        guard: 'de guarda',
        bandit: 'bandida'
    };
    
    const typeDesc = {
        ally: 'amigável e disposta a ajudar',
        enemy: 'hostil e perigosa',
        neutral: 'cautelosa e observadora',
        merchant: 'interessada em negócios'
    };
    
    return `${raceDesc[race] || 'Uma figura'} ${classDesc[npcClass] || ''}, ${typeDesc[type] || 'neutra'}.`;
}

// Gerar tags
function generateTags(npcClass, type) {
    const tags = [];
    
    // Tags baseadas na classe
    if (npcClass.includes('mage') || npcClass.includes('cleric')) tags.push('mágico');
    if (npcClass.includes('warrior') || npcClass.includes('guard')) tags.push('combatente');
    if (npcClass.includes('archer') || npcClass.includes('rogue')) tags.push('precisão');
    if (npcClass.includes('merchant')) tags.push('comércio');
    if (npcClass.includes('bandit')) tags.push('criminoso');
    
    // Tags baseadas no tipo
    if (type === 'ally') tags.push('confiável');
    if (type === 'enemy') tags.push('perigoso');
    if (type === 'merchant') tags.push('negociante');
    
    return tags;
}

// Gerar tesouro
function generateTreasure(difficulty, level) {
    const baseValue = {
        easy: 50,
        medium: 100,
        hard: 250,
        deadly: 500
    };
    
    const value = baseValue[difficulty] * level;
    
    // Itens de tesouro
    const items = [
        'Pequeno saco de moedas de ouro',
        'Pedaço de joia bruta',
        'Pergaminho com feitiço simples',
        'Poção de cura menor',
        'Arma comum em bom estado',
        'Mapa antigo',
        'Chave ornamentada',
        'Estatueta de valor artístico',
        'Livro raro',
        'Gema polida'
    ];
    
    // Selecionar alguns itens aleatórios
    const selectedItems = [];
    const numItems = Math.floor(Math.random() * 3) + 1;
    
    for (let i = 0; i < numItems; i++) {
        selectedItems.push(items[Math.floor(Math.random() * items.length)]);
    }
    
    return {
        value: value,
        items: selectedItems
    };
}

// Obter XP para nível
function getXPForLevel(level) {
    const xpTable = {
        1: 25, 2: 50, 3: 75, 4: 125, 5: 250,
        6: 300, 7: 350, 8: 450, 9: 550, 10: 600,
        11: 800, 12: 1000, 13: 1100, 14: 1250, 15: 1400,
        16: 1600, 17: 2000, 18: 2100, 19: 2400, 20: 2800
    };
    
    return xpTable[level] || 100;
}

// =================== EVENT LISTENERS ===================

// Sistema de Tabs
npcTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remover classe active de todas as tabs
        npcTabs.forEach(t => t.classList.remove('active'));
        npcTabContents.forEach(c => c.classList.remove('active'));
        
        // Adicionar classe active à tab clicada
        tab.classList.add('active');
        
        // Mostrar conteúdo correspondente
        const tabId = tab.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    });
});

// Filtros de NPCs
npcTypeFilter.addEventListener('change', updateNPCsDisplay);
npcLocationFilter.addEventListener('change', updateNPCsDisplay);

// Botões do Banco de NPCs
refreshNPCsButton.addEventListener('click', () => {
    refreshNPCsButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    loadNPCs();
    setTimeout(() => {
        refreshNPCsButton.innerHTML = '<i class="fas fa-sync-alt"></i>';
    }, 500);
});

addNewNPCButton.addEventListener('click', addNewNPC);

// Botões do Gerador de Encontros
generateEncounterButton.addEventListener('click', generateEncounter);
addToInitiativeButton.addEventListener('click', addEncounterToInitiative);
saveEncounterButton.addEventListener('click', saveEncounter);
clearEncounterButton.addEventListener('click', clearEncounter);

// Botões do NPC Rápido
generateQuickNPCButton.addEventListener('click', generateNPCFromForm);
saveQuickNPCButton.addEventListener('click', saveQuickNPC);
clearQuickNPCButton.addEventListener('click', clearQuickNPCForm);

// Modal de NPC
document.querySelectorAll('.close-modal').forEach(btn => {
    btn.addEventListener('click', () => {
        npcModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// Fechar modal clicando fora
npcModal.addEventListener('click', (e) => {
    if (e.target === npcModal) {
        npcModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Botões do modal
document.getElementById('editNPCButton')?.addEventListener('click', () => {
    if (!selectedNPC) return;
    
    // Implementar edição
    addNotification('Em desenvolvimento', 'Edição de NPCs em breve!', 'info', true);
});

document.getElementById('deleteNPCButton')?.addEventListener('click', () => {
    if (!selectedNPC || !confirm(`Tem certeza que deseja excluir "${selectedNPC.name}"?`)) return;
    
    npcs = npcs.filter(npc => npc.id !== selectedNPC.id);
    saveNPCs();
    updateNPCsDisplay();
    
    npcModal.classList.remove('active');
    document.body.style.overflow = 'auto';
    
    addNotification('NPC excluído', `${selectedNPC.name} foi removido do banco.`, 'danger', true);
});

document.getElementById('addToEncounterButton')?.addEventListener('click', () => {
    if (!selectedNPC) return;
    
    // Adicionar ao encontro atual
    if (currentEncounter) {
        currentEncounter.enemies.push(selectedNPC);
        updateEncounterDisplay();
        addNotification('NPC adicionado', `${selectedNPC.name} foi adicionado ao encontro.`, 'success', true);
    } else {
        addNotification('Sem encontro', 'Crie um encontro primeiro.', 'warning', true);
    }
});

// =================== INICIALIZAÇÃO ATUALIZADA ===================

// Atualize a função initializeApp para incluir NPCs:

async function initializeApp() {
    await loadMessages();
    loadCombatState();
    loadDashboardData();
    loadNPCs(); // ← ADICIONE ESTA LINHA
    
    if (messages.length === 0) {
        const welcomeMessage = {
            id: 'welcome',
            content: 'Bem-vindos à mesa de RPG! Use os dados abaixo para suas ações e veja os resultados em tempo real.',
            user_name: 'Mestre do Jogo',
            character_class: 'Mestre',
            character_subclass: 'Mestre das Aventuras',
            user_color: '#ffd93d',
            action_type: 'narrative',
            created_at: new Date().toISOString(),
            is_dice_roll: false
        };
        messages.push(welcomeMessage);
        await saveMessages();
        updateListDisplay();
    }
    
    // Configurar notificações automáticas
    setupAutomaticNotifications();
    
    // Inicializar dashboard
    updateDashboardStats();
    
    // Gerar um NPC aleatório no formulário rápido
    generateRandomNPC();
    
    // Adicionar notificação de boas-vindas
    addNotification(
        'Banco de NPCs ativo!',
        'Sistema de NPCs e gerador de encontros carregado. Crie personagens únicos para sua campanha!',
        'success'
    );
    
    setInterval(loadMessages, 10000);
    setInterval(updateDashboardStats, 30000);
    setInterval(saveDashboardData, 60000);
}

// Sistema de notificações
let notifications = [];
let activityData = {
    hourlyActivity: new Array(24).fill(0),
    classDistribution: {},
    rollStats: {
        today: 0,
        yesterday: 0,
        criticals: 0,
        fails: 0
    },
    playerStats: {
        active: 0,
        total: 0,
        trend: 0
    }
};

// Adicione estas funções após as outras funções existentes:

// =================== SISTEMA DE NOTIFICAÇÕES ===================

// Adicionar notificação
function addNotification(title, message, type = 'info', autoClear = false, timeout = 5000) {
    const notification = {
        id: generateId(),
        title: title,
        message: message,
        type: type,
        time: new Date().toISOString(),
        read: false
    };
    
    notifications.unshift(notification); // Adiciona no início
    updateNotificationDisplay();
    
    // Atualizar badge
    updateNotificationBadge();
    
    // Auto-clear se configurado
    if (autoClear) {
        setTimeout(() => {
            removeNotification(notification.id);
        }, timeout);
    }
    
    // Efeito visual
    const notificationElement = document.querySelector(`[data-notification-id="${notification.id}"]`);
    if (notificationElement) {
        notificationElement.classList.add('new-notification');
        setTimeout(() => {
            notificationElement.classList.remove('new-notification');
        }, 1500);
    }
    
    return notification;
}

// Remover notificação
function removeNotification(notificationId) {
    notifications = notifications.filter(n => n.id !== notificationId);
    updateNotificationDisplay();
    updateNotificationBadge();
}

// Limpar todas as notificações
function clearAllNotifications() {
    if (notifications.length === 0) return;
    
    if (confirm(`Tem certeza que deseja limpar todas as ${notifications.length} notificações?`)) {
        notifications = [];
        updateNotificationDisplay();
        updateNotificationBadge();
        addNotification('Notificações limpas', 'Todas as notificações foram removidas.', 'info', true);
    }
}

// Atualizar exibição de notificações
function updateNotificationDisplay() {
    notificationsList.innerHTML = '';
    
    if (notifications.length === 0) {
        notificationsList.innerHTML = `
            <div class="notification-item info">
                <div class="notification-icon">
                    <i class="fas fa-bell-slash"></i>
                </div>
                <div class="notification-content">
                    <div class="notification-title">Sem notificações</div>
                    <div class="notification-message">Nenhuma notificação no momento</div>
                </div>
            </div>
        `;
        return;
    }
    
    notifications.forEach(notification => {
        const notificationItem = document.createElement('div');
        notificationItem.className = `notification-item ${notification.type}`;
        notificationItem.setAttribute('data-notification-id', notification.id);
        
        // Ícone baseado no tipo
        let icon = 'info-circle';
        if (notification.type === 'success') icon = 'check-circle';
        if (notification.type === 'warning') icon = 'exclamation-triangle';
        if (notification.type === 'danger') icon = 'exclamation-circle';
        if (notification.type === 'combat') icon = 'swords';
        if (notification.type === 'dice') icon = 'dice-d20';
        
        // Tempo relativo
        const timeAgo = getTimeAgo(notification.time);
        
        notificationItem.innerHTML = `
            <div class="notification-icon">
                <i class="fas fa-${icon}"></i>
            </div>
            <div class="notification-content">
                <div class="notification-title">${notification.title}</div>
                <div class="notification-message">${notification.message}</div>
                <div class="notification-time">${timeAgo}</div>
            </div>
            <button class="delete-notification-btn" onclick="removeNotification('${notification.id}')">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        notificationsList.appendChild(notificationItem);
    });
}

// Atualizar badge de notificações
function updateNotificationBadge() {
    const unreadCount = notifications.filter(n => !n.read).length;
    notificationCount.textContent = unreadCount;
    notificationCount.style.display = unreadCount > 0 ? 'inline-block' : 'none';
}

// Função para calcular tempo relativo
function getTimeAgo(dateString) {
    const now = new Date();
    const date = new Date(dateString);
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 1) return 'Agora mesmo';
    if (diffMins < 60) return `${diffMins} min atrás`;
    if (diffHours < 24) return `${diffHours} h atrás`;
    if (diffDays === 1) return 'Ontem';
    if (diffDays < 7) return `${diffDays} dias atrás`;
    
    return date.toLocaleDateString('pt-BR');
}

// =================== DASHBOARD DE ESTATÍSTICAS ===================

// Atualizar estatísticas
function updateDashboardStats() {
    // Estatísticas de jogadores
    const uniquePlayers = new Set(messages.map(msg => msg.user_name));
    activityData.playerStats.active = uniquePlayers.size;
    activityData.playerStats.total = messages.filter(msg => msg.user_name).length;
    
    // Estatísticas de rolagens do dia
    const today = new Date().toDateString();
    activityData.rollStats.today = diceResults.filter(roll => {
        const rollDate = new Date(roll.timestamp).toDateString();
        return rollDate === today;
    }).length;
    
    // Estatísticas de críticos e falhas
    activityData.rollStats.criticals = diceResults.filter(roll => roll.isCritical).length;
    activityData.rollStats.fails = diceResults.filter(roll => roll.isCriticalFail).length;
    
    // Estatísticas de combate
    const combatCount = isCombatActive ? 1 : 0;
    const enemyCount = initiativeOrder.filter(p => p.type === 'enemy').length;
    
    // Atualizar elementos HTML
    activePlayers.textContent = activityData.playerStats.active;
    rollsToday.textContent = activityData.rollStats.today;
    activeCombats.textContent = combatCount;
    totalTurns.textContent = currentRound;
    criticalHits.textContent = activityData.rollStats.criticals;
    criticalFails.textContent = activityData.rollStats.fails;
    totalEnemies.textContent = enemyCount;
    
    // Atualizar distribuição de classes
    updateClassDistribution();
    
    // Atualizar gráfico de atividade
    updateActivityChart();
    
    // Notificação de atualização
    addNotification('Estatísticas atualizadas', 'O dashboard foi atualizado com os dados mais recentes.', 'success', true, 3000);
}

// Atualizar distribuição de classes
function updateClassDistribution() {
    const classCounts = {};
    
    messages.forEach(msg => {
        if (msg.character_class) {
            classCounts[msg.character_class] = (classCounts[msg.character_class] || 0) + 1;
        }
    });
    
    // Ordenar por quantidade
    const sortedClasses = Object.entries(classCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5); // Top 5 classes
    
    activityData.classDistribution = Object.fromEntries(sortedClasses);
    
    // Atualizar display
    classDistribution.innerHTML = '';
    
    if (sortedClasses.length === 0) {
        classDistribution.innerHTML = `
            <div class="loading" style="text-align: center; padding: 20px;">
                <i class="fas fa-users"></i><br>
                Nenhuma classe registrada ainda
            </div>
        `;
        return;
    }
    
    const maxCount = Math.max(...sortedClasses.map(c => c[1]));
    
    sortedClasses.forEach(([className, count]) => {
        const percentage = (count / maxCount) * 100;
        const classItem = document.createElement('div');
        classItem.className = 'class-item';
        classItem.innerHTML = `
            <div>
                <div class="class-name">
                    <span>${className}</span>
                </div>
                <div class="class-bar">
                    <div class="class-bar-fill" style="width: ${percentage}%"></div>
                </div>
            </div>
            <div class="class-count">${count}</div>
        `;
        classDistribution.appendChild(classItem);
    });
}

// Atualizar gráfico de atividade
function updateActivityChart() {
    // Coletar dados por hora
    const hourlyData = new Array(24).fill(0);
    
    messages.forEach(msg => {
        const hour = new Date(msg.created_at).getHours();
        hourlyData[hour]++;
    });
    
    activityData.hourlyActivity = hourlyData;
    
    // Criar/atualizar gráfico
    const ctx = activityChartCanvas.getContext('2d');
    
    // Destruir gráfico anterior se existir
    if (window.activityChart) {
        window.activityChart.destroy();
    }
    
    window.activityChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from({length: 24}, (_, i) => `${i}:00`),
            datasets: [{
                label: 'Atividade',
                data: hourlyData,
                borderColor: '#9d4edd',
                backgroundColor: 'rgba(157, 78, 221, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#ffd93d',
                pointBorderColor: '#ffd93d',
                pointRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(25, 25, 45, 0.9)',
                    titleColor: '#ffd93d',
                    bodyColor: '#b8c1ec',
                    borderColor: '#9d4edd',
                    borderWidth: 1
                }
            },
            scales: {
                x: {
                    grid: {
                        color: 'rgba(83, 52, 131, 0.2)'
                    },
                    ticks: {
                        color: '#8a8ac4',
                        maxTicksLimit: 6
                    }
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(83, 52, 131, 0.2)'
                    },
                    ticks: {
                        color: '#8a8ac4'
                    }
                }
            }
        }
    });
}

// Salvar estatísticas no localStorage
function saveDashboardData() {
    try {
        localStorage.setItem('rpg_dashboard_data', JSON.stringify({
            notifications: notifications,
            activityData: activityData,
            lastUpdate: new Date().toISOString()
        }));
    } catch (error) {
        console.error('Erro ao salvar dados do dashboard:', error);
    }
}

// Carregar estatísticas do localStorage
function loadDashboardData() {
    try {
        const savedData = localStorage.getItem('rpg_dashboard_data');
        if (savedData) {
            const data = JSON.parse(savedData);
            notifications = data.notifications || [];
            activityData = data.activityData || {
                hourlyActivity: new Array(24).fill(0),
                classDistribution: {},
                rollStats: { today: 0, yesterday: 0, criticals: 0, fails: 0 },
                playerStats: { active: 0, total: 0, trend: 0 }
            };
            
            updateNotificationDisplay();
            updateNotificationBadge();
            updateDashboardStats();
            
            addNotification('Dashboard restaurado', 'Estatísticas carregadas da sessão anterior.', 'info', true);
        }
    } catch (error) {
        console.error('Erro ao carregar dados do dashboard:', error);
    }
}

// =================== EVENT LISTENERS ADICIONAIS ===================

// Adicione estes listeners na seção de Event Listeners existente:

refreshStatsButton.addEventListener('click', () => {
    refreshStatsButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    updateDashboardStats();
    setTimeout(() => {
        refreshStatsButton.innerHTML = '<i class="fas fa-sync-alt"></i>';
    }, 500);
});

clearNotificationsButton.addEventListener('click', clearAllNotifications);

// =================== FUNÇÕES DE NOTIFICAÇÃO AUTOMÁTICA ===================

// Monitorar eventos para notificações automáticas
function setupAutomaticNotifications() {
    // Monitorar novas mensagens
    const originalAddMessage = addMessage;
    addMessage = async function() {
        const result = await originalAddMessage.apply(this, arguments);
        if (result) {
            addNotification(
                'Nova ação registrada',
                `${userNameInput.value || 'Aventureiro'} adicionou uma nova ação.`,
                'info',
                true
            );
            updateDashboardStats();
        }
        return result;
    };
    
    // Monitorar rolagens de dados
    const originalRollDiceWithOptions = rollDiceWithOptions;
    rollDiceWithOptions = async function() {
        const result = await originalRollDiceWithOptions.apply(this, arguments);
        if (result) {
            let message = `${userNameInput.value || 'Aventureiro'} rolou ${diceQuantity.value}d${selectedDice}`;
            if (result.isCritical) {
                message += ' - 🎯 CRÍTICO!';
                addNotification('Crítico!', message, 'dice', true);
            } else if (result.isCriticalFail) {
                message += ' - 💀 FALHA CRÍTICA!';
                addNotification('Falha crítica!', message, 'dice', true);
            } else {
                addNotification('Dados rolados', message, 'dice', true);
            }
            updateDashboardStats();
        }
        return result;
    };
    
    // Monitorar sistema de combate
    const originalStartCombat = startCombat;
    startCombat = function() {
        originalStartCombat.apply(this, arguments);
        addNotification('Combate iniciado', 'O sistema de combate foi ativado!', 'combat');
        updateDashboardStats();
    };
    
    const originalEndCombat = endCombat;
    endCombat = function() {
        originalEndCombat.apply(this, arguments);
        addNotification('Combate encerrado', 'O combate foi finalizado.', 'combat');
        updateDashboardStats();
    };
    
    const originalAddEnemy = addEnemy;
    addEnemy = function() {
        originalAddEnemy.apply(this, arguments);
        const name = enemyNameInput.value.trim() || 'Novo inimigo';
        addNotification('Inimigo adicionado', `${name} foi adicionado ao combate.`, 'combat', true);
        updateDashboardStats();
    };
    
    const originalNextTurn = nextTurn;
    nextTurn = function() {
        originalNextTurn.apply(this, arguments);
        if (initiativeOrder[currentTurn]) {
            addNotification(
                'Próximo turno',
                `Turno de ${initiativeOrder[currentTurn].name}`,
                'combat',
                true,
                3000
            );
            updateDashboardStats();
        }
    };
}

// =================== INICIALIZAÇÃO ATUALIZADA ===================

// Atualize a função initializeApp para incluir o dashboard:

async function initializeApp() {
    await loadMessages();
    loadCombatState();
    loadDashboardData();
    
    if (messages.length === 0) {
        const welcomeMessage = {
            id: 'welcome',
            content: 'Bem-vindos à mesa de RPG! Use os dados abaixo para suas ações e veja os resultados em tempo real.',
            user_name: 'Mestre do Jogo',
            character_class: 'Mestre',
            character_subclass: 'Mestre das Aventuras',
            user_color: '#ffd93d',
            action_type: 'narrative',
            created_at: new Date().toISOString(),
            is_dice_roll: false
        };
        messages.push(welcomeMessage);
        await saveMessages();
        updateListDisplay();
    }
    
    // Configurar notificações automáticas
    setupAutomaticNotifications();
    
    // Inicializar dashboard
    updateDashboardStats();
    
    // Adicionar notificação de boas-vindas
    addNotification(
        'Bem-vindo ao Dashboard',
        'Sistema de estatísticas e notificações ativado. Acompanhe sua campanha em tempo real!',
        'success'
    );
    
    setInterval(loadMessages, 10000);
    setInterval(updateDashboardStats, 30000); // Atualizar estatísticas a cada 30 segundos
    setInterval(saveDashboardData, 60000); // Salvar dados a cada minuto
}

// Configurações do usuário
let userColor = '#9d4edd';
let messages = [];
let diceResults = [];
let selectedDice = 20;

// Sistema de iniciativa
let initiativeOrder = [];
let isCombatActive = false;
let currentRound = 1;
let currentTurn = 0;
let combatParticipants = [];

// Definição das subclasses por classe
const subclasses = {
    'Bárbaro': ['Caminho do Berserker', 'Caminho do Guerreiro Totêmico', 'Caminho do Céu Tempestuoso', 'Caminho da Fera', 'Caminho do Guardião Ancestral', 'Caminho da Fúria Selvagem', 'Caminho do Zelo'],
    'Bardo': ['Colégio do Conhecimento', 'Colégio do Valor', 'Colégio da Espada', 'Colégio dos Sussurros', 'Colégio da Eloquência', 'Colégio da Criação'],
    'Clérigo': ['Domínio da Vida', 'Domínio da Luz', 'Domínio da Guerra', 'Domínio da Tempestade', 'Domínio do Conhecimento', 'Domínio do Engano', 'Domínio da Natureza', 'Domínio da Forja', 'Domínio da Ordem', 'Domínio da Tumba', 'Domínio da Morte', 'Domínio da Paz', 'Domínio da Unidade'],
    'Druida': ['Círculo da Terra', 'Círculo da Lua', 'Círculo dos Sonhos', 'Círculo dos Pastores', 'Círculo das Esporas', 'Círculo das Estrelas', 'Círculo das Marés (UA opcional)'],
    'Guerreiro': ['Arqueiro Arcano', 'Campeão', 'Cavaleiro Arcano', 'Cavaleiro das Runas', 'Bruto (UA)', 'Cavaleiro da Cavalaria', 'Cavaleiro dos Púlpitos', 'Samurai', 'Mestre de Batalha', 'Psi-Guerreiro', 'Éldritch Knight (Cavaleiro Arcano)'],
    'Monge': ['Caminho da Mão Aberta', 'Caminho da Sombra', 'Caminho dos Quatro Elementos', 'Caminho da Longa Morte', 'Caminho do Sol Nascente', 'Caminho do Kensei', 'Caminho da Alma Astral', 'Caminho da Misericórdia', 'Caminho do Dragão Ascendente'],
    'Paladino': ['Juramento da Devoção', 'Juramento da Vingança', 'Juramento dos Antigos', 'Juramento da Coroa', 'Juramento da Conquista', 'Juramento da Redenção', 'Juramento dos Observadores', 'Juramento da Glória', 'Juramento da Praga (UA)'],
    'Patrulheiro': ['Caçador', 'Mestre das Bestas', 'Matador de Monstros', 'Andarilho do Horizonte', 'Andarilho da Tempestade', 'Guerreiro Feral', 'Caçador das Sombras', 'Explorador Feérico', 'Viajante do Gelo (UA)'],
    'Ladino': ['Ladrão', 'Assassino', 'Trapaceiro Arcano', 'Inquisitivo', 'Cicatriz do Infortúnio', 'Fantasma', 'Espadachim', 'Arqueiro Mental'],
    'Feiticeiro': ['Linagem Dracônica', 'Feitiçaria Selvagem', 'Alma Divina', 'Magia das Sombras', 'Tempestade', 'Psíquico Aberto', 'Metamágico Escarlate (UA)'],
    'Bruxo': ['O Grande Antigo', 'O Arquidemônio', 'O Lâmina Amaldiçoada (Hexblade)', 'A Fera', 'A Luz Celestial', 'O Genie (Gênio)', 'O Segredo Profundo', 'O Iniciador da Minda', 'A Duquesa do Caos (UA)'],
    'Mago': ['Evocação', 'Abjuração', 'Advinhação', 'Conjuração', 'Encantamento', 'Ilusão', 'Necromancia', 'Transmutação', 'Ordem das Sagradas Chamas (UA)', 'Sublime Geomancia (UA)', 'Cronurgia', 'Graviturgia', 'Bladesinger (Cantor da Lâmina)'],
    'Artífice': ['Alquimista', 'Artilheiro', 'Ferreiro de Batalha']
};

// Função para atualizar as subclasses baseadas na classe selecionada
function updateSubclasses() {
    const selectedClass = characterClassInput.value;
    const subclassSelect = characterSubclassInput;
    
    subclassSelect.innerHTML = '<option value="">Selecione uma subclasse...</option>';
    
    if (selectedClass && subclasses[selectedClass]) {
        subclasses[selectedClass].forEach(subclass => {
            const option = document.createElement('option');
            option.value = subclass;
            option.textContent = subclass;
            subclassSelect.appendChild(option);
        });
    } else {
        subclassSelect.innerHTML = '<option value="">Selecione uma classe primeiro</option>';
    }
}

// Selecionar cor do usuário
colorOptions.forEach(option => {
    option.addEventListener('click', () => {
        colorOptions.forEach(opt => opt.classList.remove('selected'));
        option.classList.add('selected');
        userColor = option.getAttribute('data-color');
    });
});

// Selecionar tipo de dado
diceTypes.forEach(dice => {
    dice.addEventListener('click', () => {
        diceTypes.forEach(d => d.classList.remove('active'));
        dice.classList.add('active');
        selectedDice = parseInt(dice.getAttribute('data-dice'));
    });
});

// =================== SISTEMA DE INICIATIVA ===================

// Função para iniciar combate
function startCombat() {
    if (isCombatActive) {
        alert('O combate já está ativo!');
        return;
    }
    
    isCombatActive = true;
    currentRound = 1;
    currentTurn = 0;
    combatParticipants = [];
    
    // Coletar jogadores das mensagens
    const uniquePlayers = {};
    messages.forEach(msg => {
        if (msg.user_name && !uniquePlayers[msg.user_name]) {
            uniquePlayers[msg.user_name] = {
                name: msg.user_name,
                color: msg.user_color || '#9d4edd',
                class: msg.character_class || 'Aventureiro',
                subclass: msg.character_subclass || '',
                initiativeMod: 0,
                hp: 100,
                conditions: []
            };
        }
    });
    
    combatParticipants = Object.values(uniquePlayers);
    updateCombatStatus();
    addCombatLog('Combate iniciado!', 'system');
    
    alert('Combate iniciado! Agora adicione inimigos e role iniciativa.');
}

// Função para rolar iniciativa
async function rollInitiative() {
    if (!isCombatActive) {
        alert('Inicie o combate primeiro!');
        return;
    }
    
    initiativeOrder = [];
    
    // Adicionar jogadores
    combatParticipants.forEach(participant => {
        const initiativeRoll = rollDice(20) + parseInt(initiativeModInput.value);
        initiativeOrder.push({
            ...participant,
            initiative: initiativeRoll,
            type: 'player',
            currentHP: participant.hp || 100,
            maxHP: participant.hp || 100
        });
    });
    
    // Adicionar inimigos já criados
    const enemies = getCurrentEnemies();
    enemies.forEach(enemy => {
        const initiativeRoll = rollDice(20) + parseInt(enemy.initiativeMod || 0);
        initiativeOrder.push({
            name: enemy.name,
            color: '#ff6b6b',
            class: 'Inimigo',
            initiative: initiativeRoll,
            type: 'enemy',
            currentHP: enemy.hp,
            maxHP: enemy.hp,
            conditions: []
        });
    });
    
    // Ordenar por iniciativa (maior para menor)
    initiativeOrder.sort((a, b) => b.initiative - a.initiative);
    
    // Adicionar desempate por modificador
    initiativeOrder.sort((a, b) => {
        if (b.initiative === a.initiative) {
            return (b.initiativeMod || 0) - (a.initiativeMod || 0);
        }
        return b.initiative - a.initiative;
    });
    
    updateInitiativeDisplay();
    currentTurn = 0;
    updateTurnDisplay();
    
    addCombatLog('Iniciativa rolada! Ordem definida.', 'system');
    
    await saveCombatState();
}

// Função para obter inimigos atuais
function getCurrentEnemies() {
    const enemies = [];
    const enemyElements = document.querySelectorAll('.initiative-item.enemy');
    
    enemyElements.forEach(element => {
        const name = element.querySelector('.initiative-name').textContent;
        const hpInput = element.querySelector('.hp-input');
        const hp = hpInput ? parseInt(hpInput.value) : 10;
        
        enemies.push({
            name: name,
            hp: hp,
            initiativeMod: 0
        });
    });
    
    return enemies;
}

// Função para atualizar a exibição da iniciativa
function updateInitiativeDisplay() {
    initiativeList.innerHTML = '';
    
    if (initiativeOrder.length === 0) {
        initiativeList.innerHTML = `
            <div class="no-initiative">
                <i class="fas fa-users"></i><br>
                Nenhuma iniciativa rolada ainda.<br>
                <small>Clique em "Rolar Iniciativa" para começar</small>
            </div>
        `;
        return;
    }
    
    initiativeOrder.forEach((participant, index) => {
        const isActive = index === currentTurn;
        const initiativeItem = document.createElement('div');
        initiativeItem.className = `initiative-item ${participant.type} ${isActive ? 'active' : ''}`;
        initiativeItem.style.borderLeftColor = participant.color;
        
        // Avatar
        const avatar = document.createElement('div');
        avatar.className = 'initiative-avatar';
        avatar.style.backgroundColor = participant.color;
        avatar.textContent = participant.name.charAt(0).toUpperCase();
        
        // Nome e informações
        const nameSpan = document.createElement('div');
        nameSpan.className = 'initiative-name';
        nameSpan.textContent = participant.name;
        nameSpan.title = `${participant.class}${participant.subclass ? ` - ${participant.subclass}` : ''}`;
        
        // Iniciativa
        const initiativeSpan = document.createElement('div');
        initiativeSpan.className = 'initiative-roll';
        initiativeSpan.textContent = participant.initiative;
        
        // Controle de HP
        const hpDiv = document.createElement('div');
        hpDiv.className = 'initiative-hp';
        
        const hpInput = document.createElement('input');
        hpInput.type = 'number';
        hpInput.className = 'hp-input';
        hpInput.value = participant.currentHP;
        hpInput.min = 0;
        hpInput.max = participant.maxHP;
        
        hpInput.addEventListener('change', (e) => {
            participant.currentHP = parseInt(e.target.value);
            updateHPColor(hpInput, participant.currentHP, participant.maxHP);
            saveCombatState();
        });
        
        const hpSpan = document.createElement('span');
        hpSpan.textContent = `/${participant.maxHP}`;
        hpSpan.style.color = '#8a8ac4';
        hpSpan.style.fontSize = '0.9rem';
        
        hpDiv.appendChild(hpInput);
        hpDiv.appendChild(hpSpan);
        
        updateHPColor(hpInput, participant.currentHP, participant.maxHP);
        
        // Condições
        const conditionsDiv = document.createElement('div');
        conditionsDiv.className = 'conditions';
        
        const conditionsList = ['🤕', '🔥', '❄️', '⚡', '☠️', '😴', '🌀'];
        conditionsList.forEach(condition => {
            const conditionTag = document.createElement('span');
            conditionTag.className = 'condition-tag';
            conditionTag.textContent = condition;
            conditionTag.title = 'Clique para adicionar/remover condição';
            
            conditionTag.addEventListener('click', () => {
                const hasCondition = participant.conditions.includes(condition);
                if (hasCondition) {
                    participant.conditions = participant.conditions.filter(c => c !== condition);
                    conditionTag.style.opacity = '0.5';
                } else {
                    participant.conditions.push(condition);
                    conditionTag.style.opacity = '1';
                }
                saveCombatState();
            });
            
            if (participant.conditions.includes(condition)) {
                conditionTag.style.opacity = '1';
            } else {
                conditionTag.style.opacity = '0.5';
            }
            
            conditionsDiv.appendChild(conditionTag);
        });
        
        initiativeItem.appendChild(avatar);
        initiativeItem.appendChild(nameSpan);
        initiativeItem.appendChild(initiativeSpan);
        initiativeItem.appendChild(hpDiv);
        initiativeItem.appendChild(conditionsDiv);
        
        initiativeList.appendChild(initiativeItem);
    });
}

// Função para atualizar cor do HP baseado no valor
function updateHPColor(inputElement, currentHP, maxHP) {
    const percentage = (currentHP / maxHP) * 100;
    
    if (percentage <= 25) {
        inputElement.style.backgroundColor = 'rgba(255, 107, 107, 0.8)';
        inputElement.style.color = 'white';
        inputElement.style.borderColor = '#ff6b6b';
    } else if (percentage <= 50) {
        inputElement.style.backgroundColor = 'rgba(255, 217, 61, 0.8)';
        inputElement.style.color = '#000';
        inputElement.style.borderColor = '#ffd93d';
    } else {
        inputElement.style.backgroundColor = 'rgba(20, 20, 35, 0.8)';
        inputElement.style.color = '#e0e0ff';
        inputElement.style.borderColor = '#533483';
    }
}

// Função para próximo turno
function nextTurn() {
    if (!isCombatActive || initiativeOrder.length === 0) {
        alert('Inicie o combate e role iniciativa primeiro!');
        return;
    }
    
    currentTurn = (currentTurn + 1) % initiativeOrder.length;
    
    // Se voltou ao primeiro, incrementa rodada
    if (currentTurn === 0) {
        currentRound++;
        roundNumber.textContent = currentRound;
        addCombatLog(`Rodada ${currentRound} iniciada!`, 'system');
    }
    
    updateTurnDisplay();
    updateInitiativeDisplay();
    
    const currentParticipant = initiativeOrder[currentTurn];
    addCombatLog(`Turno de ${currentParticipant.name} (Iniciativa: ${currentParticipant.initiative})`, 'turn');
    
    saveCombatState();
}

// Função para atualizar display do turno
function updateTurnDisplay() {
    turnNumber.textContent = currentTurn + 1;
}

// Função para atualizar status do combate
function updateCombatStatus() {
    if (isCombatActive) {
        combatStatus.textContent = `Combate - Rodada ${currentRound}`;
        combatStatus.style.color = '#ff9a00';
    } else {
        combatStatus.textContent = 'Fora de Combate';
        combatStatus.style.color = '#8a8ac4';
    }
}

// Função para adicionar log de combate
function addCombatLog(message, type = 'info') {
    const now = new Date();
    const timeString = `[${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}]`;
    
    const logEntry = document.createElement('div');
    logEntry.className = 'log-entry';
    
    let icon = 'ℹ️';
    if (type === 'system') icon = '⚙️';
    if (type === 'turn') icon = '🔄';
    if (type === 'damage') icon = '💥';
    if (type === 'heal') icon = '💚';
    
    logEntry.innerHTML = `
        <span class="log-time">${timeString}</span>
        ${icon} ${message}
    `;
    
    combatLog.insertBefore(logEntry, combatLog.firstChild);
    
    // Limitar a 50 entradas
    while (combatLog.children.length > 50) {
        combatLog.removeChild(combatLog.lastChild);
    }
    
    // Auto-scroll para o topo
    combatLog.scrollTop = 0;
}

// Função para encerrar combate
function endCombat() {
    if (!isCombatActive) {
        alert('Não há combate ativo!');
        return;
    }
    
    if (confirm('Tem certeza que deseja encerrar o combate?')) {
        isCombatActive = false;
        initiativeOrder = [];
        currentRound = 1;
        currentTurn = 0;
        
        updateInitiativeDisplay();
        updateCombatStatus();
        addCombatLog('Combate encerrado!', 'system');
        
        saveCombatState();
    }
}

// Função para adicionar inimigo
function addEnemy() {
    if (!isCombatActive) {
        alert('Inicie o combate primeiro!');
        return;
    }
    
    const name = enemyNameInput.value.trim() || `Inimigo ${initiativeOrder.filter(p => p.type === 'enemy').length + 1}`;
    const hp = parseInt(enemyHPInput.value) || 10;
    const initiativeMod = parseInt(enemyInitiativeModInput.value) || 0;
    
    const enemy = {
        name: name,
        color: '#ff6b6b',
        class: 'Inimigo',
        initiative: 0,
        type: 'enemy',
        currentHP: hp,
        maxHP: hp,
        conditions: [],
        initiativeMod: initiativeMod
    };
    
    // Adicionar à lista de participantes
    combatParticipants.push(enemy);
    
    // Limpar campos
    enemyNameInput.value = '';
    enemyHPInput.value = '10';
    enemyInitiativeModInput.value = '0';
    
    addCombatLog(`Inimigo "${name}" adicionado (${hp} PV)`, 'system');
    
    // Atualizar imediatamente a exibição de iniciativa se já tiver sido rolada
    if (initiativeOrder.length > 0) {
        const initiativeRoll = rollDice(20) + initiativeMod;
        initiativeOrder.push({
            ...enemy,
            initiative: initiativeRoll
        });
        
        // Reordenar
        initiativeOrder.sort((a, b) => b.initiative - a.initiative);
        updateInitiativeDisplay();
        addCombatLog(`Iniciativa de ${name}: ${initiativeRoll}`, 'system');
    }
    
    saveCombatState();
}

// Função para salvar estado do combate
async function saveCombatState() {
    try {
        const combatState = {
            isCombatActive,
            currentRound,
            currentTurn,
            initiativeOrder,
            combatParticipants
        };
        
        localStorage.setItem('rpg_combat_state', JSON.stringify(combatState));
        
        // Também salvar no servidor
        const response = await fetch(JSONBIN_URL, {
            method: 'PUT',
            headers: {
                'X-Master-Key': JSONBIN_API_KEY,
                'Content-Type': 'application/json',
                'X-Bin-Versioning': 'false'
            },
            body: JSON.stringify({ 
                messages: messages,
                combatState: combatState
            })
        });
        
        return response.ok;
        
    } catch (error) {
        console.error('Erro ao salvar estado do combate:', error);
        return false;
    }
}

// Função para carregar estado do combate
function loadCombatState() {
    try {
        const savedState = localStorage.getItem('rpg_combat_state');
        if (savedState) {
            const combatState = JSON.parse(savedState);
            
            isCombatActive = combatState.isCombatActive || false;
            currentRound = combatState.currentRound || 1;
            currentTurn = combatState.currentTurn || 0;
            initiativeOrder = combatState.initiativeOrder || [];
            combatParticipants = combatState.combatParticipants || [];
            
            updateInitiativeDisplay();
            updateCombatStatus();
            updateTurnDisplay();
            roundNumber.textContent = currentRound;
            turnNumber.textContent = currentTurn + 1;
            
            if (isCombatActive) {
                addCombatLog('Estado do combate carregado', 'system');
            }
        }
    } catch (error) {
        console.error('Erro ao carregar estado do combate:', error);
    }
}

// =================== FUNÇÕES EXISTENTES ===================

// Funções auxiliares
function formatDateTime(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString('pt-BR');
}

function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function rollDice(sides) {
    return Math.floor(Math.random() * sides) + 1;
}

// Atualizar o histórico de dados
function updateDiceHistory() {
    diceHistory.innerHTML = '';
    
    const recentResults = diceResults.slice(-15);
    
    recentResults.forEach(result => {
        const historyItem = document.createElement('div');
        historyItem.className = 'dice-history-item';
        
        if (result.isCritical) historyItem.classList.add('critical');
        if (result.isCriticalFail) historyItem.classList.add('fail');
        
        let text = `${result.diceType === 100 ? 'd%' : 'd' + result.diceType}: ${result.total}`;
        if (result.isCritical) text = '🎯 ' + text;
        if (result.isCriticalFail) text = '💀 ' + text;
        
        historyItem.textContent = text;
        historyItem.title = `${result.results.join(', ')} ${result.modifier > 0 ? '+' + result.modifier : result.modifier < 0 ? result.modifier : ''}`;
        
        diceHistory.appendChild(historyItem);
    });
    
    diceHistory.scrollLeft = diceHistory.scrollWidth;
}

// Atualizar a exibição da lista
function updateListDisplay() {
    textList.innerHTML = '';
    
    const count = messages.length;
    itemCount.textContent = `${count} ${count === 1 ? 'registro' : 'registros'}`;
    
    if (messages.length === 0) {
        const emptyMessage = document.createElement('li');
        emptyMessage.className = 'empty-list-message';
        emptyMessage.innerHTML = '<i class="fas fa-dragon"></i><br>A aventura ainda não começou! Role o primeiro dado para começar sua jornada.';
        textList.appendChild(emptyMessage);
        return;
    }
    
    const sortedMessages = [...messages].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    
    sortedMessages.forEach((message) => {
        const listItem = document.createElement('li');
        listItem.className = 'list-item';
        listItem.style.borderLeftColor = message.user_color || '#9d4edd';
        
        // Cabeçalho
        const itemHeader = document.createElement('div');
        itemHeader.className = 'list-item-header';
        
        const userInfo = document.createElement('div');
        userInfo.className = 'user-info';
        
        const userAvatar = document.createElement('div');
        userAvatar.className = 'user-avatar';
        userAvatar.style.backgroundColor = message.user_color || '#9d4edd';
        userAvatar.textContent = message.user_name ? message.user_name.charAt(0).toUpperCase() : 'A';
        
        const userName = document.createElement('div');
        userName.className = 'user-name';
        userName.style.color = message.user_color || '#9d4edd';
        
        let nameText = message.user_name || 'Aventureiro';
        if (message.character_class) {
            nameText += ` (${message.character_class}`;
            if (message.character_subclass) {
                nameText += ` - ${message.character_subclass}`;
            }
            nameText += `)`;
        }
        userName.textContent = nameText;
        
        const messageTime = document.createElement('div');
        messageTime.className = 'message-time';
        messageTime.textContent = formatDateTime(message.created_at);
        
        userInfo.appendChild(userAvatar);
        userInfo.appendChild(userName);
        
        itemHeader.appendChild(userInfo);
        itemHeader.appendChild(messageTime);
        
        // Tags de ação
        let actionTag = '';
        if (message.action_type) {
            const tagMap = {
                'attack': '⚔️ Ataque',
                'magic': '✨ Magia',
                'skill': '🎯 Habilidade',
                'dialog': '💬 Diálogo',
                'narrative': '📖 Narrativa',
                'other': '🔧 Outro'
            };
            
            if (tagMap[message.action_type]) {
                actionTag = `<span class="rpg-tag ${message.action_type}">${tagMap[message.action_type]}</span>`;
            }
        }
        
        // Conteúdo da mensagem
        const itemContent = document.createElement('div');
        itemContent.className = 'list-item-content';
        
        if (message.is_dice_roll) {
            let diceHtml = `
                <div style="margin-bottom: 10px;">
                    ${actionTag}
                    <strong>🎲 Rolou ${message.dice_count || 1}${message.dice_type}:</strong> ${message.content}
                </div>
            `;
            
            if (message.dice_results) {
                const results = message.dice_results;
                const total = message.dice_total;
                const modifier = message.dice_modifier || 0;
                
                let resultClass = 'dice-result';
                if (message.is_critical) resultClass += ' critical-hit';
                if (message.is_critical_fail) resultClass += ' critical-fail';
                
                let resultText = `Resultado: <strong>${total}</strong>`;
                if (results.length > 1 || modifier !== 0) {
                    resultText = `[${results.join(', ')}]`;
                    if (modifier > 0) {
                        resultText += ` + ${modifier} = <strong>${total}</strong>`;
                    } else if (modifier < 0) {
                        resultText += ` ${modifier} = <strong>${total}</strong>`;
                    } else {
                        resultText += ` = <strong>${total}</strong>`;
                    }
                }
                
                if (message.roll_type === 'advantage') {
                    resultText += ' (Vantagem)';
                } else if (message.roll_type === 'disadvantage') {
                    resultText += ' (Desvantagem)';
                }
                
                if (message.is_critical) resultText += ' 🎉 CRÍTICO!';
                if (message.is_critical_fail) resultText += ' 💀 FALHA CRÍTICA!';
                
                diceHtml += `<div class="${resultClass}">${resultText}</div>`;
            }
            
            itemContent.innerHTML = diceHtml;
        } else {
            itemContent.innerHTML = `
                ${actionTag}
                ${message.content}
            `;
        }
        
        // Botões de ação
        const itemActions = document.createElement('div');
        itemActions.className = 'list-item-actions';
        
        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-btn';
        deleteButton.innerHTML = '<i class="fas fa-trash"></i> Excluir';
        deleteButton.addEventListener('click', () => {
            deleteMessage(message.id);
        });
        
        itemActions.appendChild(deleteButton);
        
        // Montar item
        listItem.appendChild(itemHeader);
        listItem.appendChild(itemContent);
        listItem.appendChild(itemActions);
        
        textList.appendChild(listItem);
    });
    
    const listContainer = document.querySelector('.list-container');
    listContainer.scrollTop = 0;
}

// Carregar mensagens do servidor
async function loadMessages() {
    try {
        const response = await fetch(JSONBIN_URL + '/latest', {
            headers: {
                'X-Master-Key': JSONBIN_API_KEY,
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
        
        const data = await response.json();
        
        if (data.record && Array.isArray(data.record.messages)) {
            messages = data.record.messages;
        } else if (Array.isArray(data.record)) {
            messages = data.record;
        } else {
            messages = [];
        }
        
        // Extrair resultados de dados
        diceResults = [];
        messages.forEach(msg => {
            if (msg.is_dice_roll && msg.dice_total) {
                diceResults.push({
                    total: msg.dice_total,
                    diceType: parseInt(msg.dice_type.replace('d', '')),
                    results: msg.dice_results || [msg.dice_total],
                    modifier: msg.dice_modifier || 0,
                    rollType: msg.roll_type || 'normal',
                    isCritical: msg.is_critical || false,
                    isCriticalFail: msg.is_critical_fail || false,
                    timestamp: msg.created_at
                });
            }
        });
        
        updateListDisplay();
        updateDiceHistory();
        
        return true;
        
    } catch (error) {
        console.error('Erro ao carregar mensagens:', error);
        
        const savedMessages = localStorage.getItem('rpg_messages');
        if (savedMessages) {
            try {
                messages = JSON.parse(savedMessages);
                updateListDisplay();
            } catch (parseError) {
                console.error('Erro ao analisar dados locais:', parseError);
            }
        }
        
        return false;
    }
}

// Salvar mensagens no servidor
async function saveMessages() {
    try {
        const response = await fetch(JSONBIN_URL, {
            method: 'PUT',
            headers: {
                'X-Master-Key': JSONBIN_API_KEY,
                'Content-Type': 'application/json',
                'X-Bin-Versioning': 'false'
            },
            body: JSON.stringify({ 
                messages: messages,
                combatState: {
                    isCombatActive,
                    currentRound,
                    currentTurn,
                    initiativeOrder,
                    combatParticipants
                }
            })
        });
        
        if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
        
        localStorage.setItem('rpg_messages', JSON.stringify(messages));
        
        return true;
        
    } catch (error) {
        console.error('Erro ao salvar mensagens:', error);
        localStorage.setItem('rpg_messages', JSON.stringify(messages));
        return false;
    }
}

// Adicionar uma nova mensagem
async function addMessage() {
    const text = textInput.value.trim();
    const userName = userNameInput.value.trim() || 'Aventureiro';
    const charClass = characterClassInput.value;
    const charSubclass = characterSubclassInput.value;
    const actionType = actionTypeInput.value;
    
    if (text === '') {
        alert('Por favor, descreva sua ação antes de enviar.');
        textInput.focus();
        return;
    }
    
    addButton.disabled = true;
    addButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Registrando...';
    
    const newMessage = {
        id: generateId(),
        content: text,
        user_name: userName,
        character_class: charClass,
        character_subclass: charSubclass,
        user_color: userColor,
        action_type: actionType,
        created_at: new Date().toISOString(),
        is_dice_roll: false
    };
    
    messages.push(newMessage);
    updateListDisplay();
    
    const success = await saveMessages();
    
    addButton.disabled = false;
    addButton.innerHTML = '<i class="fas fa-feather-alt"></i> Registrar Ação';
    
    if (success) {
        textInput.value = '';
        textInput.focus();
    }
}

// Função para rolar dados com todas as opções
async function rollDiceWithOptions() {
    const userName = userNameInput.value.trim() || 'Aventureiro';
    const charClass = characterClassInput.value;
    const charSubclass = characterSubclassInput.value;
    const actionType = actionTypeInput.value;
    const diceCount = parseInt(diceQuantity.value);
    const mod = parseInt(modifier.value);
    const rType = rollType.value;
    
    // Animação de rolagem
    diceDisplay.classList.add('dice-rolling');
    diceDisplay.textContent = '...';
    diceResultText.textContent = 'Rolando dados...';
    
    await new Promise(resolve => setTimeout(resolve, 800));
    
    let results = [];
    let total = 0;
    let isCritical = false;
    let isCriticalFail = false;
    
    if (selectedDice !== 20 || rType === 'normal') {
        for (let i = 0; i < diceCount; i++) {
            const result = rollDice(selectedDice);
            results.push(result);
            total += result;
        }
    } else if (selectedDice === 20 && (rType === 'advantage' || rType === 'disadvantage')) {
        const roll1 = rollDice(20);
        const roll2 = rollDice(20);
        
        if (rType === 'advantage') {
            total = Math.max(roll1, roll2);
            results = [roll1, roll2];
        } else {
            total = Math.min(roll1, roll2);
            results = [roll1, roll2];
        }
    }
    
    total += mod;
    
    if (selectedDice === 20) {
        const naturalRoll = results.length > 0 ? results[0] : 0;
        if (naturalRoll === 20) isCritical = true;
        if (naturalRoll === 1) isCriticalFail = true;
    }
    
    diceDisplay.classList.remove('dice-rolling');
    diceDisplay.textContent = total;
    
    if (isCritical) {
        diceDisplay.className = 'dice-display';
        void diceDisplay.offsetWidth;
        diceDisplay.classList.add('critical-hit');
        diceDisplay.textContent = '20!';
    } else if (isCriticalFail) {
        diceDisplay.className = 'dice-display';
        void diceDisplay.offsetWidth;
        diceDisplay.classList.add('critical-fail');
        diceDisplay.textContent = '1!';
    }
    
    let resultText = `Rolou ${diceCount}d${selectedDice}`;
    if (mod !== 0) resultText += mod > 0 ? ` +${mod}` : ` ${mod}`;
    
    if (selectedDice === 20 && rType !== 'normal') {
        resultText += ` (${rType === 'advantage' ? 'Vantagem' : 'Desvantagem'})`;
    }
    
    resultText += `: [${results.join(', ')}]`;
    if (mod !== 0) resultText += ` + ${mod} = ${total}`;
    else if (results.length > 1) resultText += ` = ${total}`;
    
    if (isCritical) resultText += ' 🎉 CRÍTICO!';
    if (isCriticalFail) resultText += ' 💀 FALHA CRÍTICA!';
    
    diceResultText.textContent = resultText;
    
    const historyItem = {
        total: total,
        diceType: selectedDice,
        results: results,
        modifier: mod,
        rollType: rType,
        isCritical: isCritical,
        isCriticalFail: isCriticalFail,
        timestamp: new Date().toISOString()
    };
    
    diceResults.push(historyItem);
    updateDiceHistory();
    
    const diceMessage = {
        id: generateId(),
        content: textInput.value.trim() || resultText,
        user_name: userName,
        character_class: charClass,
        character_subclass: charSubclass,
        user_color: userColor,
        action_type: actionType,
        created_at: new Date().toISOString(),
        is_dice_roll: true,
        dice_type: `d${selectedDice}`,
        dice_count: diceCount,
        dice_results: results,
        dice_total: total,
        dice_modifier: mod,
        roll_type: rType,
        is_critical: isCritical,
        is_critical_fail: isCriticalFail
    };
    
    if (!textInput.value.trim()) diceMessage.content = resultText;
    
    messages.push(diceMessage);
    updateListDisplay();
    await saveMessages();
    
    diceDisplay.style.transform = 'scale(1.2)';
    diceDisplay.style.boxShadow = '0 0 30px rgba(157, 78, 221, 0.8)';
    
    setTimeout(() => {
        diceDisplay.style.transform = 'scale(1)';
        diceDisplay.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.5)';
    }, 500);
    
    return { total, results, isCritical, isCriticalFail };
}

// Excluir uma mensagem
async function deleteMessage(messageId) {
    if (!confirm('Tem certeza que deseja excluir este registro?')) return;
    
    messages = messages.filter(msg => msg.id !== messageId);
    updateListDisplay();
    await saveMessages();
}

// Excluir todas as mensagens
async function deleteAllMessages() {
    if (messages.length === 0) {
        alert('Não há registros para excluir.');
        return;
    }
    
    if (!confirm(`Tem certeza que deseja excluir TODOS os ${messages.length} registros da campanha?`)) return;
    
    messages = [];
    diceResults = [];
    
    updateListDisplay();
    updateDiceHistory();
    await saveMessages();
    
    alert('Campanha reiniciada!');
}

// Rolar D20 rápido
async function rollQuickD20() {
    diceTypes.forEach(d => d.classList.remove('active'));
    document.querySelector('.dice-type[data-dice="20"]').classList.add('active');
    selectedDice = 20;
    
    diceQuantity.value = '1';
    modifier.value = '0';
    rollType.value = 'normal';
    
    await rollDiceWithOptions();
}

// =================== EVENT LISTENERS ===================

// Listeners existentes
characterClassInput.addEventListener('change', updateSubclasses);
addButton.addEventListener('click', addMessage);
clearInputButton.addEventListener('click', () => {
    textInput.value = '';
    textInput.focus();
});
clearAllButton.addEventListener('click', deleteAllMessages);
refreshButton.addEventListener('click', () => {
    refreshButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    loadMessages().then(() => {
        setTimeout(() => {
            refreshButton.innerHTML = '<i class="fas fa-sync-alt"></i>';
        }, 500);
    });
});
rollDiceButton.addEventListener('click', rollDiceWithOptions);
quickD20Button.addEventListener('click', rollQuickD20);

textInput.addEventListener('keydown', (event) => {
    if (event.ctrlKey && event.key === 'Enter') {
        addMessage();
    }
});

// Listeners do sistema de iniciativa
startCombatButton.addEventListener('click', startCombat);
rollInitiativeButton.addEventListener('click', rollInitiative);
nextTurnButton.addEventListener('click', nextTurn);
endCombatButton.addEventListener('click', endCombat);
refreshInitiativeButton.addEventListener('click', () => {
    refreshInitiativeButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    loadCombatState();
    setTimeout(() => {
        refreshInitiativeButton.innerHTML = '<i class="fas fa-sync-alt"></i>';
    }, 500);
});
addRoundButton.addEventListener('click', () => {
    currentRound++;
    roundNumber.textContent = currentRound;
    addCombatLog(`Rodada ${currentRound} iniciada manualmente`, 'system');
    saveCombatState();
});
addEnemyButton.addEventListener('click', addEnemy);

// =================== INICIALIZAÇÃO ===================

async function initializeApp() {
    await loadMessages();
    loadCombatState();
    
    if (messages.length === 0) {
        const welcomeMessage = {
            id: 'welcome',
            content: 'Bem-vindos à mesa de RPG! Use os dados abaixo para suas ações e veja os resultados em tempo real.',
            user_name: 'Mestre do Jogo',
            character_class: 'Mestre',
            character_subclass: 'Mestre das Aventuras',
            user_color: '#ffd93d',
            action_type: 'narrative',
            created_at: new Date().toISOString(),
            is_dice_roll: false
        };
        messages.push(welcomeMessage);
        await saveMessages();
        updateListDisplay();
    }
    
    setInterval(loadMessages, 10000);
}

document.addEventListener('DOMContentLoaded', initializeApp);
