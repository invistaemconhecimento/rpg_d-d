// =================== VARIÁVEIS GLOBAIS ===================
// Sistema de fichas
let characterSheets = [];
let currentStep = 1;
let attributePoints = 27;
let selectedSheetColor = '#9d4edd';
let currentSheetBeingEdited = null;

// Sistema de mensagens e dados
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

// Status de sincronização
let syncStatus = 'connected'; // 'connected', 'syncing', 'error'
let lastSyncTime = new Date();
let isSyncing = false;

// Configurações do JSONBin
const JSONBIN_BIN_ID = '69620ca9ae596e708fd204c5';
const JSONBIN_API_KEY = '$2a$10$gHdA8KAK/9HnnagDiMTlHeBUzNo9cWC0lR8EL0IaUpJg5ChpGiz/i';
const JSONBIN_URL = `https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}`;

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

// Templates pré-definidos
const characterTemplates = {
    warrior: {
        name: 'Guerreiro do Reino',
        race: 'Humano',
        class: 'Guerreiro',
        subclass: 'Campeão',
        level: 1,
        hp: 12,
        ac: 16,
        speed: '9m',
        background: 'Soldado',
        str: 16,
        dex: 10,
        con: 14,
        int: 8,
        wis: 10,
        cha: 12,
        color: '#4d96ff'
    },
    wizard: {
        name: 'Mago Arcano',
        race: 'Elfo',
        class: 'Mago',
        subclass: 'Evocação',
        level: 1,
        hp: 8,
        ac: 12,
        speed: '9m',
        background: 'Sábio',
        str: 8,
        dex: 14,
        con: 10,
        int: 16,
        wis: 12,
        cha: 10,
        color: '#9d4edd'
    },
    rogue: {
        name: 'Ladino das Sombras',
        race: 'Halfling',
        class: 'Ladino',
        subclass: 'Ladrão',
        level: 1,
        hp: 10,
        ac: 14,
        speed: '7.5m',
        background: 'Criminoso',
        str: 8,
        dex: 16,
        con: 12,
        int: 10,
        wis: 10,
        cha: 14,
        color: '#6bcf7f'
    },
    cleric: {
        name: 'Clérigo Devoto',
        race: 'Anão',
        class: 'Clérigo',
        subclass: 'Domínio da Vida',
        level: 1,
        hp: 10,
        ac: 18,
        speed: '7.5m',
        background: 'Acólito',
        str: 12,
        dex: 8,
        con: 14,
        int: 10,
        wis: 16,
        cha: 10,
        color: '#ffd93d'
    }
};

// =================== INICIALIZAÇÃO DOS ELEMENTOS ===================
// Elementos do sistema de fichas
const refreshSheetsButton = document.getElementById('refreshSheetsButton');
const characterCount = document.getElementById('characterCount');
const sheetClassFilter = document.getElementById('sheetClassFilter');
const sheetLevelFilter = document.getElementById('sheetLevelFilter');
const createNewSheetButton = document.getElementById('createNewSheetButton');
const sheetsGrid = document.getElementById('sheetsGrid');
const sheetModal = document.getElementById('sheetModal');
const sheetModalBody = document.getElementById('sheetModalBody');
const closeSheetModal = document.querySelector('.close-sheet-modal');
const sheetModalAvatar = document.getElementById('sheetModalAvatar');
const sheetModalName = document.getElementById('sheetModalName');
const sheetModalDetails = document.getElementById('sheetModalDetails');
const useSheetButton = document.querySelector('.btn-use-sheet');
const closeModalButton = document.querySelector('.btn-close-modal');

// Elementos do wizard
const wizardSteps = document.querySelectorAll('.wizard-step');
const stepContents = document.querySelectorAll('.wizard-step-content');
const prevStepButton = document.getElementById('prevStepButton');
const nextStepButton = document.getElementById('nextStepButton');
const finishSheetButton = document.getElementById('finishSheetButton');
const cancelSheetButton = document.getElementById('cancelSheetButton');

// Elementos dos atributos
const attrPoints = document.getElementById('attrPoints');
const strScore = document.getElementById('strScore');
const dexScore = document.getElementById('dexScore');
const conScore = document.getElementById('conScore');
const intScore = document.getElementById('intScore');
const wisScore = document.getElementById('wisScore');
const chaScore = document.getElementById('chaScore');

// Elementos do formulário da ficha
const sheetNameInput = document.getElementById('sheetName');
const sheetRaceInput = document.getElementById('sheetRace');
const sheetClassInput = document.getElementById('sheetClass');
const sheetSubclassInput = document.getElementById('sheetSubclass');
const sheetLevelInput = document.getElementById('sheetLevel');
const sheetHpInput = document.getElementById('sheetHp');
const sheetAcInput = document.getElementById('sheetAc');
const sheetSpeedInput = document.getElementById('sheetSpeed');
const sheetBackgroundInput = document.getElementById('sheetBackground');
const sheetDescriptionInput = document.getElementById('sheetDescription');
const sheetColorPicker = document.querySelectorAll('#new-character .sheet-color-picker .color-option');

// Elementos do preview
const previewName = document.getElementById('previewName');
const previewRace = document.getElementById('previewRace');
const previewClass = document.getElementById('previewClass');
const previewLevel = document.getElementById('previewLevel');
const previewHp = document.getElementById('previewHp');
const previewAc = document.getElementById('previewAc');
const previewSpeed = document.getElementById('previewSpeed');
const previewBackground = document.getElementById('previewBackground');
const previewStr = document.getElementById('previewStr');
const previewDex = document.getElementById('previewDex');
const previewCon = document.getElementById('previewCon');
const previewInt = document.getElementById('previewInt');
const previewWis = document.getElementById('previewWis');
const previewCha = document.getElementById('previewCha');
const previewAvatar = document.getElementById('previewAvatar');

// Elementos do sistema principal
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
const userColorOptions = document.querySelectorAll('.user-color-picker .color-option');
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

// Elementos de sincronização
const syncStatusElement = document.getElementById('syncStatus');
const forceSyncButton = document.getElementById('forceSyncButton');
const lastSyncTimeElement = document.getElementById('lastSyncTime');

// Templates
const useTemplateButtons = document.querySelectorAll('.use-template-btn');
const sheetTabs = document.querySelectorAll('.sheet-tab');

// =================== FUNÇÕES AUXILIARES ===================
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Função: Criar ação rápida
function createQuickAction(sheetId, actionType) {
    const sheet = characterSheets.find(s => s.id === sheetId);
    if (!sheet) return;
    
    // Primeiro carrega a ficha na mesa
    useSheetInGame(sheetId);
    
    // Depois preenche ação baseada no tipo
    setTimeout(() => {
        createActionFromSheet(sheetId, actionType);
        closeModal();
    }, 300);
}

function formatDateTime(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString('pt-BR');
}

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

function rollDice(sides) {
    return Math.floor(Math.random() * sides) + 1;
}

function calculateAttributeModifier(score) {
    return Math.floor((score - 10) / 2);
}

function formatModifier(mod) {
    return mod >= 0 ? `+${mod}` : `${mod}`;
}

function getAttributeCost(score) {
    const costTable = {
        8: 0, 9: 1, 10: 2, 11: 3, 12: 4,
        13: 5, 14: 7, 15: 9, 16: 11, 17: 13, 18: 15
    };
    return costTable[score] !== undefined ? costTable[score] : 0;
}

// =================== SISTEMA DE SALVAMENTO E COMPARTILHAMENTO ===================

// Timer para debouncing
let saveTimeout;

// Função com debouncing para salvar dados
async function saveAllDataDebounced() {
    clearTimeout(saveTimeout);
    saveTimeout = setTimeout(async () => {
        await saveAllData();
    }, 2000); // Salva após 2 segundos de inatividade
}

// Atualizar status de sincronização
function updateSyncStatus(status, message = '') {
    if (!syncStatusElement) return;
    
    syncStatus = status;
    
    syncStatusElement.className = 'sync-status-indicator';
    
    switch(status) {
        case 'connected':
            syncStatusElement.innerHTML = '<i class="fas fa-wifi"></i> Conectado';
            syncStatusElement.classList.add('connected');
            break;
        case 'syncing':
            syncStatusElement.innerHTML = '<i class="fas fa-sync-alt fa-spin"></i> Sincronizando...';
            syncStatusElement.classList.add('syncing');
            break;
        case 'error':
            syncStatusElement.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Erro de conexão';
            syncStatusElement.classList.add('error');
            break;
    }
    
    if (lastSyncTimeElement) {
        const now = new Date();
        const diff = Math.floor((now - lastSyncTime) / 1000);
        
        if (diff < 10) {
            lastSyncTimeElement.textContent = 'Última sincronização: agora';
        } else if (diff < 60) {
            lastSyncTimeElement.textContent = `Última sincronização: ${diff} segundos atrás`;
        } else {
            const mins = Math.floor(diff / 60);
            lastSyncTimeElement.textContent = `Última sincronização: ${mins} minuto${mins > 1 ? 's' : ''} atrás`;
        }
    }
}

// Função para forçar sincronização manual
async function forceSync() {
    if (isSyncing) return;
    
    isSyncing = true;
    updateSyncStatus('syncing');
    
    try {
        console.log('Forçando sincronização...');
        // Primeiro carrega dados do servidor
        await loadAllData();
        
        // Depois salva os dados locais no servidor
        await saveAllData();
        
        lastSyncTime = new Date();
        updateSyncStatus('connected');
        
        addNotification('Sincronizado', 'Dados sincronizados com sucesso!', 'success', true);

        addNotification('Fichas sincronizadas', 
               `Carregadas ${characterSheets.length} fichas de todos os jogadores`, 
               'success', true);
        
    } catch (error) {
        console.error('Erro na sincronização:', error);
        updateSyncStatus('error');
        addNotification('Erro de sincronização', 'Não foi possível sincronizar os dados', 'danger', true);
    } finally {
        isSyncing = false;
    }
}

// Carregar TODOS os dados do servidor
async function loadAllData() {
    updateSyncStatus('syncing');
    
    try {
        console.log('Carregando dados do servidor...');
        const response = await fetch(JSONBIN_URL + '/latest', {
            headers: {
                'X-Master-Key': JSONBIN_API_KEY,
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
        
        const data = await response.json();
        const record = data.record || {};
        
        console.log('Dados carregados do servidor:', record);
        
        // Carregar mensagens
        if (record.messages && Array.isArray(record.messages)) {
            messages = record.messages;
        } else {
            messages = [];
        }
        
        // CARREGAR FICHAS DO SERVIDOR - AGORA CARREGA TODAS
        if (record.characterSheets && Array.isArray(record.characterSheets)) {
            characterSheets = record.characterSheets;
            console.log(`Carregadas ${characterSheets.length} fichas do servidor (TODAS as fichas)`);
        } else {
            characterSheets = [];
        }
        
        // Carregar estado de combate
        if (record.combatState) {
            const combat = record.combatState;
            isCombatActive = combat.isCombatActive || false;
            currentRound = combat.currentRound || 1;
            currentTurn = combat.currentTurn || 0;
            initiativeOrder = combat.initiativeOrder || [];
            combatParticipants = combat.combatParticipants || [];
        }
        
        // Extrair resultados de dados
        diceResults = [];
        messages.forEach(msg => {
            if (msg.is_dice_roll && msg.dice_total) {
                diceResults.push({
                    total: msg.dice_total,
                    diceType: parseInt(msg.dice_type.replace('d', '')) || 20,
                    results: msg.dice_results || [msg.dice_total],
                    modifier: msg.dice_modifier || 0,
                    rollType: msg.roll_type || 'normal',
                    isCritical: msg.is_critical || false,
                    isCriticalFail: msg.is_critical_fail || false,
                    timestamp: msg.created_at
                });
            }
        });
        
        // Atualizar todas as exibições
        updateListDisplay();
        updateDiceHistory();
        updateInitiativeDisplay();
        updateCombatStatus();
        updateTurnDisplay();
        updateSheetsDisplay();
        updateDashboardStats();
        
        // Salvar localmente como backup
        localStorage.setItem('rpg_messages', JSON.stringify(messages));
        localStorage.setItem('rpg_character_sheets', JSON.stringify(characterSheets));
        
        lastSyncTime = new Date();
        updateSyncStatus('connected');
        
        return true;
        
    } catch (error) {
        console.error('Erro ao carregar dados do servidor:', error);
        updateSyncStatus('error');
        
        // Fallback para localStorage
        const savedMessages = localStorage.getItem('rpg_messages');
        const savedSheets = localStorage.getItem('rpg_character_sheets');
        
        if (savedMessages) {
            try {
                messages = JSON.parse(savedMessages);
            } catch (parseError) {
                console.error('Erro ao analisar mensagens locais:', parseError);
            }
        }
        
        if (savedSheets) {
            try {
                characterSheets = JSON.parse(savedSheets);
            } catch (parseError) {
                console.error('Erro ao analisar fichas locais:', parseError);
            }
        }
        
        updateListDisplay();
        updateSheetsDisplay();
        
        addNotification('Usando dados locais', 'Não foi possível conectar ao servidor', 'warning', true);
        return false;
    }
}

// Salvar TODOS os dados no servidor (para compartilhamento)
async function saveAllData() {
    updateSyncStatus('syncing');
    
    try {
        const dataToSave = {
            messages: messages,
            combatState: {
                isCombatActive,
                currentRound,
                currentTurn,
                initiativeOrder,
                combatParticipants
            },
            characterSheets: characterSheets, // FICHAS INCLUÍDAS AQUI
            lastUpdate: new Date().toISOString()
        };
        
        console.log('Enviando dados para servidor:', dataToSave);
        
        const response = await fetch(JSONBIN_URL, {
            method: 'PUT',
            headers: {
                'X-Master-Key': JSONBIN_API_KEY,
                'Content-Type': 'application/json',
                'X-Bin-Versioning': 'false'
            },
            body: JSON.stringify(dataToSave)
        });
        
        if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
        
        // Salvar localmente também
        localStorage.setItem('rpg_messages', JSON.stringify(messages));
        localStorage.setItem('rpg_character_sheets', JSON.stringify(characterSheets));
        
        console.log('Dados salvos com sucesso no servidor!');
        
        lastSyncTime = new Date();
        updateSyncStatus('connected');
        return true;
        
    } catch (error) {
        console.error('Erro ao salvar dados no servidor:', error);
        updateSyncStatus('error');
        
        // Fallback para localStorage
        localStorage.setItem('rpg_messages', JSON.stringify(messages));
        localStorage.setItem('rpg_character_sheets', JSON.stringify(characterSheets));
        
        addNotification('Erro de conexão', 'Dados salvos apenas localmente', 'danger', true);
        return false;
    }
}

// =================== SISTEMA DE FICHAS ===================

// Carregar fichas do localStorage (fallback)
function loadCharacterSheets() {
    try {
        const savedSheets = localStorage.getItem('rpg_character_sheets');
        if (savedSheets) {
            characterSheets = JSON.parse(savedSheets);
            console.log(`Carregadas ${characterSheets.length} fichas do localStorage`);
        } else {
            characterSheets = [];
        }
    } catch (error) {
        console.error('Erro ao carregar fichas:', error);
        characterSheets = [];
    }
}

// Salvar fichas (localmente e no servidor)
async function saveCharacterSheets() {
    try {
        // Primeiro salva localmente (rápido)
        localStorage.setItem('rpg_character_sheets', JSON.stringify(characterSheets));
        
        // Atualiza a exibição imediatamente
        updateSheetsDisplay();
        
        // Depois tenta salvar no servidor para compartilhar
        await saveAllData();
        
        console.log(`Fichas salvas e compartilhadas: ${characterSheets.length} fichas`);
        return true;
        
    } catch (error) {
        console.error('Erro ao salvar fichas:', error);
        return false;
    }
}

// Atualizar subclasses
function updateSheetSubclasses() {
    const selectedClass = sheetClassInput.value;
    const subclassSelect = sheetSubclassInput;
    
    subclassSelect.innerHTML = '<option value="">Selecione uma subclasse...</option>';
    
    if (selectedClass && subclasses[selectedClass]) {
        subclasses[selectedClass].forEach(subclass => {
            const option = document.createElement('option');
            option.value = subclass;
            option.textContent = subclass;
            subclassSelect.appendChild(option);
        });
    }
}

// Atualizar modificadores de atributos
function updateAttributeModifiers() {
    const attributes = {
        str: strScore,
        dex: dexScore,
        con: conScore,
        int: intScore,
        wis: wisScore,
        cha: chaScore
    };
    
    for (const [attr, input] of Object.entries(attributes)) {
        const score = parseInt(input.value) || 10;
        const mod = calculateAttributeModifier(score);
        document.getElementById(`${attr}Mod`).textContent = formatModifier(mod);
    }
}

// Atualizar pontos de atributo
function updateAttributePoints() {
    const baseCost = 27;
    const attributes = ['str', 'dex', 'con', 'int', 'wis', 'cha'];
    let totalCost = 0;
    
    attributes.forEach(attr => {
        const score = parseInt(document.getElementById(`${attr}Score`).value) || 10;
        totalCost += getAttributeCost(score);
    });
    
    attributePoints = baseCost - totalCost;
    attrPoints.textContent = attributePoints;
    
    // Atualizar estado dos botões
    document.querySelectorAll('.attr-increase').forEach(btn => {
        const attribute = btn.closest('.attribute-card').dataset.attribute;
        const currentValue = parseInt(document.getElementById(`${attribute}Score`).value) || 10;
        btn.disabled = attributePoints <= 0 || currentValue >= 18;
    });
    
    document.querySelectorAll('.attr-decrease').forEach(btn => {
        const attribute = btn.closest('.attribute-card').dataset.attribute;
        const currentValue = parseInt(document.getElementById(`${attribute}Score`).value) || 10;
        btn.disabled = currentValue <= 8;
    });
}

// Funções para aumentar/diminuir atributos
function increaseAttribute(attribute) {
    if (attributePoints <= 0) return;
    
    const input = document.getElementById(`${attribute}Score`);
    let value = parseInt(input.value) || 10;
    
    if (value < 18) {
        value++;
        input.value = value;
        updateAttributeModifiers();
        updateAttributePoints();
        if (currentStep === 4) updateCharacterPreview();
    }
}

function decreaseAttribute(attribute) {
    const input = document.getElementById(`${attribute}Score`);
    let value = parseInt(input.value) || 10;
    
    if (value > 8) {
        value--;
        input.value = value;
        updateAttributeModifiers();
        updateAttributePoints();
        if (currentStep === 4) updateCharacterPreview();
    }
}

// Sistema de navegação do wizard
function goToStep(step) {
    if (step < 1 || step > 4) return;
    
    // Validar passo atual antes de avançar
    if (step > currentStep) {
        if (!validateCurrentStep()) {
            return;
        }
    }
    
    // Oculta todos os steps
    wizardSteps.forEach(s => s.classList.remove('active'));
    stepContents.forEach(c => c.classList.remove('active'));
    
    // Mostra o step atual
    document.querySelector(`.wizard-step[data-step="${step}"]`).classList.add('active');
    document.querySelector(`.wizard-step-content[data-step="${step}"]`).classList.add('active');
    
    // Atualiza botões
    prevStepButton.disabled = step === 1;
    nextStepButton.style.display = step < 4 ? 'block' : 'none';
    finishSheetButton.style.display = step === 4 ? 'block' : 'none';
    
    currentStep = step;
    
    // Atualiza preview no passo 4
    if (step === 4) {
        updateCharacterPreview();
    }
}

// Validar passo atual
function validateCurrentStep() {
    switch(currentStep) {
        case 1: // Informações básicas
            if (!sheetNameInput.value.trim()) {
                alert('Por favor, digite um nome para o personagem.');
                sheetNameInput.focus();
                return false;
            }
            if (!sheetClassInput.value) {
                alert('Por favor, selecione uma classe.');
                sheetClassInput.focus();
                return false;
            }
            break;
            
        case 2: // Atributos
            if (attributePoints < 0 || attributePoints > 27) {
                alert('Você deve usar exatamente 27 pontos de atributo! Ajuste os valores.');
                return false;
            }
            break;
            
        case 3: // Detalhes
            if (!sheetHpInput.value || parseInt(sheetHpInput.value) < 1) {
                alert('PV deve ser um número positivo.');
                sheetHpInput.focus();
                return false;
            }
            if (!sheetAcInput.value || parseInt(sheetAcInput.value) < 1) {
                alert('CA deve ser um número positivo.');
                sheetAcInput.focus();
                return false;
            }
            break;
    }
    return true;
}

// Atualizar preview do personagem
function updateCharacterPreview() {
    const name = sheetNameInput.value.trim() || 'Sem nome';
    previewName.textContent = name;
    previewAvatar.textContent = name.charAt(0).toUpperCase();
    
    previewRace.textContent = sheetRaceInput.value || 'Raça não definida';
    previewClass.textContent = sheetClassInput.value || 'Classe';
    previewLevel.textContent = sheetLevelInput.value || '1';
    previewHp.textContent = sheetHpInput.value || '10';
    previewAc.textContent = sheetAcInput.value || '10';
    previewSpeed.textContent = sheetSpeedInput.value || '9m';
    previewBackground.textContent = sheetBackgroundInput.value || 'Não definido';
    
    // Atualizar atributos no preview
    const attributes = ['str', 'dex', 'con', 'int', 'wis', 'cha'];
    attributes.forEach(attr => {
        const score = parseInt(document.getElementById(`${attr}Score`).value) || 10;
        const mod = calculateAttributeModifier(score);
        document.getElementById(`preview${attr.charAt(0).toUpperCase() + attr.slice(1)}`).textContent = `${score} (${formatModifier(mod)})`;
    });
}

// Atualizar a exibição da lista de fichas
function updateSheetsDisplay() {
    if (!sheetsGrid) return;
    
    sheetsGrid.innerHTML = '';
    if (characterCount) characterCount.textContent = characterSheets.length;
    
    if (characterSheets.length === 0) {
        sheetsGrid.innerHTML = `
            <div class="empty-sheets">
                <i class="fas fa-user-plus"></i>
                <h3>Nenhuma ficha criada ainda</h3>
                <p>Clique em "Nova Ficha" para começar</p>
            </div>
        `;
        return;
    }
    
    // Aplicar filtros - REMOVA O FILTRO POR CRIADOR
    const classFilter = sheetClassFilter ? sheetClassFilter.value : 'all';
    const levelFilter = sheetLevelFilter ? sheetLevelFilter.value : 'all';
    
    const filteredSheets = characterSheets.filter(sheet => {
        if (classFilter && classFilter !== 'all' && sheet.class !== classFilter) return false;
        if (levelFilter && levelFilter !== 'all') {
            const level = parseInt(sheet.level) || 1;
            if (levelFilter.includes('-')) {
                const [min, max] = levelFilter.split('-').map(Number);
                if (level < min || level > max) return false;
            } else if (parseInt(levelFilter) !== level) {
                return false;
            }
        }
        return true; // REMOVA QUALQUER FILTRO POR createdBy
    });
    
    // Ordenar por data de criação (mais recentes primeiro)
    filteredSheets.sort((a, b) => {
        const dateA = new Date(a.created || a.updated);
        const dateB = new Date(b.created || b.updated);
        return dateB - dateA;
    });
    
    filteredSheets.forEach((sheet) => {
        const sheetCard = document.createElement('div');
        sheetCard.className = 'character-sheet-card';
        sheetCard.dataset.id = sheet.id;
        
        const initiative = calculateAttributeModifier(sheet.dex || 10);
        const color = sheet.color || selectedSheetColor;
        
        // Adicionar badge indicando quem criou a ficha
        const creatorBadge = sheet.createdBy ? 
            `<div class="creator-badge" title="Criado por: ${sheet.createdBy}">
                <i class="fas fa-user"></i> ${sheet.createdBy}
            </div>` : '';
        
        sheetCard.innerHTML = `
            <div class="sheet-color-bar" style="background-color: ${color}"></div>
            ${creatorBadge}
            <div class="sheet-header">
                <div class="sheet-avatar" style="background-color: ${color}">
                    ${sheet.name ? sheet.name.charAt(0).toUpperCase() : '?'}
                </div>
                <div class="sheet-info">
                    <h3>${sheet.name || 'Sem nome'}</h3>
                    <p>${sheet.race || 'Raça'} • ${sheet.class || 'Classe'} Nv. ${sheet.level || 1}</p>
                </div>
            </div>
            <div class="sheet-stats">
                <div class="stat">
                    <span class="stat-label">PV</span>
                    <span class="stat-value">${sheet.hp || 10}/${sheet.maxHP || sheet.hp || 10}</span>
                </div>
                <div class="stat">
                    <span class="stat-label">CA</span>
                    <span class="stat-value">${sheet.ac || 10}</span>
                </div>
                <div class="stat">
                    <span class="stat-label">Iniciativa</span>
                    <span class="stat-value">${initiative >= 0 ? '+' : ''}${initiative}</span>
                </div>
            </div>
            <div class="sheet-attributes">
                <span class="attr" title="Força">F: ${sheet.str || 10} (${formatModifier(calculateAttributeModifier(sheet.str || 10))})</span>
                <span class="attr" title="Destreza">D: ${sheet.dex || 10} (${formatModifier(calculateAttributeModifier(sheet.dex || 10))})</span>
                <span class="attr" title="Constituição">C: ${sheet.con || 10} (${formatModifier(calculateAttributeModifier(sheet.con || 10))})</span>
            </div>
            <div class="sheet-actions">
                <button class="btn-view" onclick="showSheetDetails('${sheet.id}')">
                    <i class="fas fa-eye"></i> Ver
                </button>
                <button class="btn-edit" onclick="editSheet('${sheet.id}')" ${!canEditSheet(sheet) ? 'disabled title="Você só pode editar fichas que criou"' : ''}>
                    <i class="fas fa-edit"></i> Editar
                </button>
                <button class="btn-delete" onclick="deleteSheet('${sheet.id}')" ${!canEditSheet(sheet) ? 'disabled title="Você só pode excluir fichas que criou"' : ''}>
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        
        sheetsGrid.appendChild(sheetCard);
    });
}

// Função para verificar se o usuário pode editar/excluir a ficha
function canEditSheet(sheet) {
    const currentUser = userNameInput.value.trim() || 'Desconhecido';
    return !sheet.createdBy || sheet.createdBy === currentUser || sheet.createdBy === 'Desconhecido';
}

// Função: Criar ação rápida baseada na ficha
function createActionFromSheet(sheetId, actionType = 'narrative', customText = '') {
    const sheet = characterSheets.find(s => s.id === sheetId);
    if (!sheet) return;
    
    const userName = userNameInput.value.trim() || sheet.name || 'Aventureiro';
    const charClass = characterClassInput.value || sheet.class || '';
    const charSubclass = characterSubclassInput.value || sheet.subclass || '';
    
    // Se não houver texto personalizado, criar um padrão
    let actionText = customText;
    if (!actionText) {
        const actionTypes = {
            'attack': `prepara-se para o combate`,
            'magic': `prepara seus feitiços`,
            'skill': `se prepara para usar suas habilidades`,
            'dialog': `se apresenta ao grupo`,
            'narrative': `entra em cena`,
            'other': `se junta à aventura`
        };
        
        actionText = `${sheet.name} ${actionTypes[actionType] || 'entra na aventura'}`;
    }
    
    // Preencher campos
    if (textInput) textInput.value = actionText;
    if (actionTypeInput) actionTypeInput.value = actionType;
    
    // Focar no campo de descrição
    if (textInput) textInput.focus();
    
    addNotification(
        'Ação preparada',
        `Pronto para registrar ação de ${sheet.name}`,
        'success',
        true
    );
}

// Mostrar detalhes da ficha no modal
function showSheetDetails(sheetId) {
    const sheet = characterSheets.find(s => s.id === sheetId);
    if (!sheet) {
        alert('Ficha não encontrada!');
        return;
    }
    
    if (!sheetModal || !sheetModalBody) return;
    
    const color = sheet.color || selectedSheetColor;
    
    // Atualizar cabeçalho do modal
    sheetModalAvatar.textContent = sheet.name ? sheet.name.charAt(0).toUpperCase() : '?';
    sheetModalAvatar.style.backgroundColor = color;
    sheetModalName.textContent = sheet.name || 'Sem nome';
    sheetModalDetails.textContent = `${sheet.race || 'Raça'} • ${sheet.class || 'Classe'} ${sheet.subclass ? `(${sheet.subclass})` : ''} • Nível ${sheet.level || 1}`;
    
    // Atualizar corpo do modal
    sheetModalBody.innerHTML = `
        <div class="modal-section">
            <h3><i class="fas fa-heart"></i> Pontos de Vida</h3>
            <p>${sheet.hp || 10}/${sheet.maxHP || sheet.hp || 10}</p>
        </div>
        
        <div class="modal-section">
            <h3><i class="fas fa-shield-alt"></i> Defesa</h3>
            <p>Classe de Armadura: ${sheet.ac || 10}</p>
        </div>
        
        <div class="modal-section">
            <h3><i class="fas fa-running"></i> Movimento</h3>
            <p>${sheet.speed || '9m'}</p>
        </div>
        
        <div class="modal-section">
            <h3><i class="fas fa-book"></i> Informações</h3>
            <p><strong>Antecedente:</strong> ${sheet.background || 'Não definido'}</p>
            ${sheet.description ? `<p><strong>Descrição:</strong> ${sheet.description}</p>` : ''}
        </div>
        
        <div class="modal-section">
            <h3><i class="fas fa-chart-line"></i> Atributos</h3>
            <div class="modal-attributes">
                <div class="modal-attr">
                    <span class="attr-name">Força</span>
                    <span class="attr-value">${sheet.str || 10} (${formatModifier(calculateAttributeModifier(sheet.str || 10))})</span>
                </div>
                <div class="modal-attr">
                    <span class="attr-name">Destreza</span>
                    <span class="attr-value">${sheet.dex || 10} (${formatModifier(calculateAttributeModifier(sheet.dex || 10))})</span>
                </div>
                <div class="modal-attr">
                    <span class="attr-name">Constituição</span>
                    <span class="attr-value">${sheet.con || 10} (${formatModifier(calculateAttributeModifier(sheet.con || 10))})</span>
                </div>
                <div class="modal-attr">
                    <span class="attr-name">Inteligência</span>
                    <span class="attr-value">${sheet.int || 10} (${formatModifier(calculateAttributeModifier(sheet.int || 10))})</span>
                </div>
                <div class="modal-attr">
                    <span class="attr-name">Sabedoria</span>
                    <span class="attr-value">${sheet.wis || 10} (${formatModifier(calculateAttributeModifier(sheet.wis || 10))})</span>
                </div>
                <div class="modal-attr">
                    <span class="attr-name">Carisma</span>
                    <span class="attr-value">${sheet.cha || 10} (${formatModifier(calculateAttributeModifier(sheet.cha || 10))})</span>
                </div>
            </div>
        </div>
        
        <div class="modal-section">
            <h3><i class="fas fa-swords"></i> Iniciativa</h3>
            <p>${formatModifier(calculateAttributeModifier(sheet.dex || 10))}</p>
        </div>

        <div class="modal-section">
            <h3><i class="fas fa-bolt"></i> Ações Rápidas</h3>
            <div class="quick-actions">
                <button class="btn-action-quick" data-action="dialog" onclick="createQuickAction('${sheet.id}', 'dialog')">
                    <i class="fas fa-comments"></i> Diálogo
                </button>
                <button class="btn-action-quick" data-action="attack" onclick="createQuickAction('${sheet.id}', 'attack')">
                    <i class="fas fa-fist-raised"></i> Ataque
                </button>
                <button class="btn-action-quick" data-action="magic" onclick="createQuickAction('${sheet.id}', 'magic')">
                    <i class="fas fa-hat-wizard"></i> Magia
                </button>
                <button class="btn-action-quick" data-action="skill" onclick="createQuickAction('${sheet.id}', 'skill')">
                    <i class="fas fa-running"></i> Habilidade
                </button>
            </div>
        </div>
    `;
    
    // Configurar botões do modal
    const btnUseSheet = document.querySelector('.btn-use-sheet');
    const btnCloseModal = document.querySelector('.btn-close-modal');
    
    if (btnUseSheet) {
        btnUseSheet.onclick = () => useSheetInGame(sheetId);
    }
    
    if (btnCloseModal) {
        btnCloseModal.onclick = closeModal;
    }
    
    // Mostrar modal
    sheetModal.style.display = 'flex';
}

// Fechar modal
function closeModal() {
    if (sheetModal) {
        sheetModal.style.display = 'none';
    }
}

// Função: Usar ficha na mesa (ATUALIZADA)
function useSheetInGame(sheetId) {
    const sheet = characterSheets.find(s => s.id === sheetId);
    if (!sheet) return;
    
    // Preencher TODOS os campos do formulário principal
    if (userNameInput) userNameInput.value = sheet.name || '';
    
    // Classe e Subclasse
    if (characterClassInput) {
        characterClassInput.value = sheet.class || '';
        // Atualizar subclasses disponíveis
        updateSubclasses();
        
        // Definir subclasse após um pequeno delay para garantir que as opções foram carregadas
        setTimeout(() => {
            if (characterSubclassInput && sheet.subclass) {
                characterSubclassInput.value = sheet.subclass || '';
            }
        }, 100);
    }
    
    // Modificador de iniciativa baseado na Destreza
    if (initiativeModInput) {
        const dexMod = calculateAttributeModifier(sheet.dex || 10);
        initiativeModInput.value = dexMod;
    }
    
    // Definir a cor do usuário
    userColor = sheet.color || selectedSheetColor;
    userColorOptions.forEach(opt => {
        if (opt.getAttribute('data-color') === userColor) {
            opt.classList.add('selected');
        } else {
            opt.classList.remove('selected');
        }
    });
    
    // Fechar modal
    closeModal();
    
    // Adicionar ação ao histórico automaticamente?
    const actionText = `Personagem "${sheet.name}" entrou na mesa!`;
    if (textInput && !textInput.value.trim()) {
        textInput.value = actionText;
    }
    
    // Adicionar notificação
    addNotification(
        'Ficha carregada na mesa', 
        `${sheet.name} (${sheet.class} Nv.${sheet.level}) está pronto para ação!`, 
        'success', 
        true
    );
    
    // Opcional: Adicionar registro automático ao diário
    const autoMessage = {
        id: generateId(),
        content: `${sheet.name} (${sheet.class} Nv.${sheet.level}) entrou na aventura!`,
        user_name: sheet.name,
        character_class: sheet.class,
        character_subclass: sheet.subclass,
        user_color: userColor,
        action_type: 'narrative',
        created_at: new Date().toISOString(),
        is_dice_roll: false
    };
    
    messages.push(autoMessage);
    updateListDisplay();
    saveAllData();
}

// Editar ficha
function editSheet(sheetId) {
    const sheet = characterSheets.find(s => s.id === sheetId);
    if (!sheet) return;
    
    currentSheetBeingEdited = sheetId;
    
    // Preencher o formulário
    sheetNameInput.value = sheet.name || '';
    sheetRaceInput.value = sheet.race || '';
    sheetClassInput.value = sheet.class || '';
    sheetLevelInput.value = sheet.level || 1;
    sheetHpInput.value = sheet.hp || 10;
    sheetAcInput.value = sheet.ac || 10;
    sheetSpeedInput.value = sheet.speed || '9m';
    sheetBackgroundInput.value = sheet.background || '';
    sheetDescriptionInput.value = sheet.description || '';
    
    // Atributos
    strScore.value = sheet.str || 10;
    dexScore.value = sheet.dex || 10;
    conScore.value = sheet.con || 10;
    intScore.value = sheet.int || 10;
    wisScore.value = sheet.wis || 10;
    chaScore.value = sheet.cha || 10;
    
    // Cor da ficha
    selectedSheetColor = sheet.color || selectedSheetColor;
    sheetColorPicker.forEach(opt => {
        if (opt.getAttribute('data-color') === selectedSheetColor) {
            opt.classList.add('selected');
        } else {
            opt.classList.remove('selected');
        }
    });
    
    // Atualizar subclasses
    updateSheetSubclasses();
    if (sheet.subclass) {
        setTimeout(() => {
            sheetSubclassInput.value = sheet.subclass;
        }, 100);
    }
    
    // Atualizar pontos e modificadores
    updateAttributeModifiers();
    updateAttributePoints();
    
    // Ir para o primeiro passo
    goToStep(1);
    
    // Trocar para aba de criação
    switchToTab('new-character');
    
    addNotification('Editando ficha', `Editando ${sheet.name}`, 'info', true);
}

// Deletar ficha
async function deleteSheet(sheetId) {
    if (!confirm('Tem certeza que deseja excluir esta ficha?')) return;
    
    const sheet = characterSheets.find(s => s.id === sheetId);
    if (!sheet) return;
    
    characterSheets = characterSheets.filter(s => s.id !== sheetId);
    
    // Salvar localmente e no servidor
    await saveCharacterSheets();
    
    addNotification('Ficha excluída', `${sheet.name} foi removido`, 'warning', true);
}

// Criar nova ficha
function createNewCharacter() {
    // Resetar formulário
    currentSheetBeingEdited = null;
    
    sheetNameInput.value = '';
    sheetRaceInput.value = '';
    sheetClassInput.value = '';
    sheetSubclassInput.innerHTML = '<option value="">Selecione uma classe primeiro</option>';
    sheetLevelInput.value = '1';
    sheetHpInput.value = '10';
    sheetAcInput.value = '10';
    sheetSpeedInput.value = '9m';
    sheetBackgroundInput.value = '';
    sheetDescriptionInput.value = '';
    
    // Resetar atributos para valores padrão
    strScore.value = '10';
    dexScore.value = '10';
    conScore.value = '10';
    intScore.value = '10';
    wisScore.value = '10';
    chaScore.value = '10';
    
    // Resetar cor
    selectedSheetColor = '#9d4edd';
    sheetColorPicker.forEach((opt, index) => {
        if (index === 0) {
            opt.classList.add('selected');
        } else {
            opt.classList.remove('selected');
        }
    });
    
    // Resetar pontos
    attributePoints = 27;
    updateAttributeModifiers();
    updateAttributePoints();
    
    // Ir para o primeiro passo
    goToStep(1);
    
    addNotification('Nova ficha', 'Começando a criar um novo personagem', 'info', true);
}

// Finalizar criação da ficha
async function finishCharacterSheet() {
    if (!validateCurrentStep()) return;
    
    // Coletar dados
    const currentUser = userNameInput.value.trim() || 'Desconhecido';
    
    const characterSheet = {
        id: currentSheetBeingEdited || generateId(),
        name: sheetNameInput.value.trim(),
        race: sheetRaceInput.value,
        class: sheetClassInput.value,
        subclass: sheetSubclassInput.value,
        level: parseInt(sheetLevelInput.value) || 1,
        hp: parseInt(sheetHpInput.value) || 10,
        maxHP: parseInt(sheetHpInput.value) || 10,
        ac: parseInt(sheetAcInput.value) || 10,
        speed: sheetSpeedInput.value || '9m',
        background: sheetBackgroundInput.value,
        description: sheetDescriptionInput.value.trim(),
        color: selectedSheetColor,
        // Atributos
        str: parseInt(strScore.value) || 10,
        dex: parseInt(dexScore.value) || 10,
        con: parseInt(conScore.value) || 10,
        int: parseInt(intScore.value) || 10,
        wis: parseInt(wisScore.value) || 10,
        cha: parseInt(chaScore.value) || 10,
        // Data
        created: currentSheetBeingEdited ? undefined : new Date().toISOString(),
        updated: new Date().toISOString(),
        // Identificação do criador (sempre salva)
        createdBy: currentUser
    };
    
    if (!characterSheet.name) {
        alert('Por favor, digite um nome para o personagem.');
        sheetNameInput.focus();
        return;
    }
    
    if (!characterSheet.class) {
        alert('Por favor, selecione uma classe.');
        sheetClassInput.focus();
        return;
    }
    
    // Salvar ou atualizar
    if (currentSheetBeingEdited) {
        // Atualizar ficha existente
        const index = characterSheets.findIndex(s => s.id === currentSheetBeingEdited);
        if (index !== -1) {
            // Manter data de criação e criador
            characterSheet.created = characterSheets[index].created;
            characterSheet.createdBy = characterSheets[index].createdBy || characterSheet.createdBy;
            characterSheets[index] = characterSheet;
            addNotification('Ficha atualizada', `${characterSheet.name} foi atualizado`, 'success');
        }
    } else {
        // Adicionar nova ficha
        characterSheets.push(characterSheet);
        addNotification('Ficha criada', `${characterSheet.name} foi criado com sucesso!`, 'success');
    }
    
    // Salvar e compartilhar
    await saveCharacterSheets();
    
    // Trocar para aba de listagem
    switchToTab('sheets-list');
    
    // Resetar
    currentSheetBeingEdited = null;
}

// Cancelar criação
function cancelCharacterSheet() {
    if (confirm('Tem certeza que deseja cancelar a criação da ficha? Os dados não salvos serão perdidos.')) {
        // Trocar para aba de listagem
        switchToTab('sheets-list');
        currentSheetBeingEdited = null;
    }
}

// Trocar entre abas
function switchToTab(tabId) {
    // Remover classe active de todas as abas
    sheetTabs.forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.sheet-tab-content').forEach(content => content.classList.remove('active'));
    
    // Adicionar classe active na aba selecionada
    document.querySelector(`.sheet-tab[data-tab="${tabId}"]`).classList.add('active');
    document.getElementById(tabId).classList.add('active');
    
    // Se for a aba de listagem, atualizar a exibição
    if (tabId === 'sheets-list') {
        updateSheetsDisplay();
    }
}

// Aplicar template
function applyTemplate(templateName) {
    const template = characterTemplates[templateName];
    if (!template) return;
    
    createNewCharacter();
    
    // Preencher com dados do template
    sheetNameInput.value = template.name;
    sheetRaceInput.value = template.race;
    sheetClassInput.value = template.class;
    sheetLevelInput.value = template.level;
    sheetHpInput.value = template.hp;
    sheetAcInput.value = template.ac;
    sheetSpeedInput.value = template.speed;
    sheetBackgroundInput.value = template.background;
    
    // Atributos
    strScore.value = template.str;
    dexScore.value = template.dex;
    conScore.value = template.con;
    intScore.value = template.int;
    wisScore.value = template.wis;
    chaScore.value = template.cha;
    
    // Cor
    selectedSheetColor = template.color;
    sheetColorPicker.forEach(opt => {
        if (opt.getAttribute('data-color') === selectedSheetColor) {
            opt.classList.add('selected');
        } else {
            opt.classList.remove('selected');
        }
    });
    
    // Atualizar subclasses
    updateSheetSubclasses();
    setTimeout(() => {
        sheetSubclassInput.value = template.subclass;
        updateAttributeModifiers();
        updateAttributePoints();
        updateCharacterPreview();
    }, 100);
    
    addNotification('Template aplicado', `Template "${template.name}" carregado`, 'success', true);
}

// =================== SISTEMA DE MENSAGENS ===================

// Atualizar o histórico de dados
function updateDiceHistory() {
    if (!diceHistory) return;
    
    diceHistory.innerHTML = '';
    
    const recentResults = diceResults.slice(-10);
    
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
}

// Atualizar a exibição da lista
function updateListDisplay() {
    if (!textList) return;
    
    textList.innerHTML = '';
    
    const count = messages.length;
    if (itemCount) itemCount.textContent = `${count} ${count === 1 ? 'registro' : 'registros'}`;
    
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
    
    // ATUALIZAÇÃO IMPORTANTE: Salva IMEDIATAMENTE no servidor
    await saveAllData(); // Usar saveAllData() em vez de saveAllDataDebounced()
    
    updateListDisplay();
    
    addButton.disabled = false;
    addButton.innerHTML = '<i class="fas fa-feather-alt"></i> Registrar Ação';
    
    textInput.value = '';
    textInput.focus();
    addNotification('Ação registrada', `${userName} registrou uma nova ação`, 'info', true);
    
    return true;
}

// Função para rolar dados com todas as opções
async function rollDiceWithOptions() {
    const userName = userNameInput.value.trim() || 'Aventureiro';
    const charClass = characterClassInput.value;
    const charSubclass = characterSubclassInput.value;
    const actionType = actionTypeInput.value;
    const diceCount = parseInt(diceQuantity.value) || 1;
    const mod = parseInt(modifier.value) || 0;
    const rType = rollType.value || 'normal';
    
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
    
    if (isCritical) {
        diceDisplay.className = 'dice-display critical-hit';
        diceDisplay.textContent = '20!';
    } else if (isCriticalFail) {
        diceDisplay.className = 'dice-display critical-fail';
        diceDisplay.textContent = '1!';
    } else {
        diceDisplay.className = 'dice-display';
        diceDisplay.textContent = total;
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
    await saveAllData(); // Salva IMEDIATAMENTE no servidor para compartilhar
    
    diceDisplay.style.transform = 'scale(1.2)';
    diceDisplay.style.boxShadow = '0 0 30px rgba(157, 78, 221, 0.8)';
    
    setTimeout(() => {
        diceDisplay.style.transform = 'scale(1)';
        diceDisplay.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.5)';
    }, 500);
    
    let notifType = 'dice';
    let notifTitle = 'Dados rolados';
    if (isCritical) {
        notifType = 'success';
        notifTitle = '🎯 Crítico!';
    } else if (isCriticalFail) {
        notifType = 'danger';
        notifTitle = '💀 Falha crítica!';
    }
    
    addNotification(notifTitle, resultText, notifType, true);
    
    return { total, results, isCritical, isCriticalFail };
}

// Excluir uma mensagem
async function deleteMessage(messageId) {
    if (!confirm('Tem certeza que deseja excluir este registro?')) return;
    
    messages = messages.filter(msg => msg.id !== messageId);
    updateListDisplay();
    await saveAllData();
    addNotification('Registro excluído', 'Ação foi removida do histórico', 'warning', true);
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
    await saveAllData();
    
    alert('Campanha reiniciada!');
    addNotification('Campanha reiniciada', 'Todos os registros foram excluídos', 'warning');
}

// Rolar D20 rápido
async function rollQuickD20() {
    diceTypes.forEach(d => d.classList.remove('active'));
    const d20Element = document.querySelector('.dice-type[data-dice="20"]');
    if (d20Element) d20Element.classList.add('active');
    selectedDice = 20;
    
    diceQuantity.value = '1';
    modifier.value = '0';
    rollType.value = 'normal';
    
    await rollDiceWithOptions();
}

// Atualizar subclasses (sistema principal)
function updateSubclasses() {
    const selectedClass = characterClassInput.value;
    const subclassSelect = characterSubclassInput;
    
    if (!subclassSelect) return;
    
    subclassSelect.innerHTML = '<option value="">Selecione uma subclasse...</option>';
    
    if (selectedClass && subclasses[selectedClass]) {
        subclasses[selectedClass].forEach(subclass => {
            const option = document.createElement('option');
            option.value = subclass;
            option.textContent = subclass;
            subclassSelect.appendChild(option);
        });
    }
}

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
    
    notifications.unshift(notification);
    updateNotificationDisplay();
    updateNotificationBadge();
    
    // Auto-clear se configurado
    if (autoClear) {
        setTimeout(() => {
            removeNotification(notification.id);
        }, timeout);
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
    if (!notificationsList) return;
    
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
        
        notificationItem.innerHTML = `
            <div class="notification-icon">
                <i class="fas fa-${icon}"></i>
            </div>
            <div class="notification-content">
                <div class="notification-title">${notification.title}</div>
                <div class="notification-message">${notification.message}</div>
                <div class="notification-time">${getTimeAgo(notification.time)}</div>
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
    if (!notificationCount) return;
    
    const unreadCount = notifications.filter(n => !n.read).length;
    notificationCount.textContent = unreadCount;
    notificationCount.style.display = unreadCount > 0 ? 'inline-block' : 'none';
}

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
                initiativeMod: parseInt(initiativeModInput.value) || 0,
                hp: 100,
                conditions: []
            };
        }
    });
    
    combatParticipants = Object.values(uniquePlayers);
    updateCombatStatus();
    addCombatLog('Combate iniciado!', 'system');
    
    addNotification('Combate iniciado', 'O sistema de combate foi ativado!', 'combat');
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
        const initiativeRoll = rollDice(20) + (participant.initiativeMod || 0);
        initiativeOrder.push({
            ...participant,
            initiative: initiativeRoll,
            type: 'player',
            currentHP: participant.hp || 100,
            maxHP: participant.hp || 100
        });
    });
    
    // Adicionar inimigos já criados
    const enemies = combatParticipants.filter(p => p.type === 'enemy');
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
    addNotification('Iniciativa rolada', 'Ordem de combate definida', 'combat');
    
    await saveAllData();
}

// Função para atualizar a exibição da iniciativa
function updateInitiativeDisplay() {
    if (!initiativeList) return;
    
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
            saveAllData();
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
                saveAllData();
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
        if (roundNumber) roundNumber.textContent = currentRound;
        addCombatLog(`Rodada ${currentRound} iniciada!`, 'system');
    }
    
    updateTurnDisplay();
    updateInitiativeDisplay();
    
    const currentParticipant = initiativeOrder[currentTurn];
    addCombatLog(`Turno de ${currentParticipant.name} (Iniciativa: ${currentParticipant.initiative})`, 'turn');
    
    saveAllData();
}

// Função para atualizar display do turno
function updateTurnDisplay() {
    if (!turnNumber) return;
    turnNumber.textContent = currentTurn + 1;
}

// Função para atualizar status do combate
function updateCombatStatus() {
    if (!combatStatus) return;
    
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
    if (!combatLog) return;
    
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
async function endCombat() {
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
        addNotification('Combate encerrado', 'O combate foi finalizado', 'combat');
        
        await saveAllData();
    }
}

// Função para adicionar inimigo
async function addEnemy() {
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
        initiativeMod: initiativeMod,
        hp: hp
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
    
    addNotification('Inimigo adicionado', `${name} foi adicionado ao combate`, 'combat', true);
    await saveAllData();
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
    const enemyCount = combatParticipants.filter(p => p.type === 'enemy').length;
    
    // Atualizar elementos HTML
    if (activePlayers) activePlayers.textContent = activityData.playerStats.active;
    if (rollsToday) rollsToday.textContent = activityData.rollStats.today;
    if (activeCombats) activeCombats.textContent = combatCount;
    if (totalTurns) totalTurns.textContent = currentRound;
    if (criticalHits) criticalHits.textContent = activityData.rollStats.criticals;
    if (criticalFails) criticalFails.textContent = activityData.rollStats.fails;
    if (totalEnemies) totalEnemies.textContent = enemyCount;
    
    // Atualizar distribuição de classes
    updateClassDistribution();
    
    // Atualizar gráfico de atividade
    updateActivityChart();
}

// Atualizar distribuição de classes
function updateClassDistribution() {
    if (!classDistribution) return;
    
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
    if (!activityChartCanvas || !activityChartCanvas.getContext) {
        console.warn('Canvas não suportado ou não encontrado');
        return;
    }
    
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
        }
    } catch (error) {
        console.error('Erro ao carregar dados do dashboard:', error);
    }
}

// =================== INICIALIZAÇÃO DA APLICAÇÃO ===================

async function initializeApp() {
    console.log('Inicializando aplicação RPG...');
    
    // Carregar dados DO SERVIDOR (incluindo fichas de outros jogadores)
    await loadAllData();
    loadDashboardData();

    addNotification('Fichas sincronizadas', 
               `Carregadas ${characterSheets.length} fichas de todos os jogadores`, 
               'success', true);
    
    // Inicializar displays
    updateSheetsDisplay();
    updateDashboardStats();
    
    // Configurações iniciais
    updateAttributeModifiers();
    updateAttributePoints();
    updateSubclasses();
    updateSheetSubclasses();
    
    // Mensagem de boas-vindas se não houver mensagens
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
        await saveAllData();
        updateListDisplay();
    }
    
    // Notificação de boas-vindas
    addNotification(
        'Sistema RPG Iniciado',
        'Sistema de fichas COMPARTILHADO, combate e estatísticas ativado!',
        'success'
    );
    
    // Configurar atualizações periódicas - Sincroniza a cada 5 segundos (REDUZIDO)
    setInterval(async () => {
        await loadAllData(); // Atualiza dados do servidor
        updateDashboardStats();
    }, 5000); // 5 segundos - sincronização mais rápida
    
    // Salvar dashboard periodicamente
    setInterval(saveDashboardData, 60000);
    
    console.log('Aplicação RPG inicializada com sucesso!');
}

// =================== EVENT LISTENERS ===================

// Configurar eventos quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    
    // Sistema de fichas - Abas
    sheetTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.getAttribute('data-tab');
            switchToTab(tabId);
        });
    });
    
    // Botão para criar nova ficha na aba de listagem
    if (createNewSheetButton) {
        createNewSheetButton.addEventListener('click', () => {
            createNewCharacter();
            switchToTab('new-character');
        });
    }
    
    // Botão para atualizar lista de fichas (sincroniza com servidor)
    if (refreshSheetsButton) {
        refreshSheetsButton.addEventListener('click', async () => {
            refreshSheetsButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            await loadAllData(); // Carrega dados do servidor
            setTimeout(() => {
                refreshSheetsButton.innerHTML = '<i class="fas fa-sync-alt"></i>';
                addNotification('Fichas sincronizadas', 
                              'Dados atualizados do servidor', 
                              'success', true);
            }, 500);
        });
    }
    
    // Filtros de fichas
    if (sheetClassFilter) {
        sheetClassFilter.addEventListener('change', updateSheetsDisplay);
    }
    
    if (sheetLevelFilter) {
        sheetLevelFilter.addEventListener('change', updateSheetsDisplay);
    }
    
    // Wizard de criação de ficha
    if (prevStepButton) {
        prevStepButton.addEventListener('click', () => goToStep(currentStep - 1));
    }
    
    if (nextStepButton) {
        nextStepButton.addEventListener('click', () => goToStep(currentStep + 1));
    }
    
    if (finishSheetButton) {
        finishSheetButton.addEventListener('click', finishCharacterSheet);
    }
    
    if (cancelSheetButton) {
        cancelSheetButton.addEventListener('click', cancelCharacterSheet);
    }
    
    // Botões de atributos
    document.querySelectorAll('.attr-decrease').forEach(btn => {
        btn.addEventListener('click', function() {
            const attribute = this.closest('.attribute-card').dataset.attribute;
            decreaseAttribute(attribute);
        });
    });
    
    document.querySelectorAll('.attr-increase').forEach(btn => {
        btn.addEventListener('click', function() {
            const attribute = this.closest('.attribute-card').dataset.attribute;
            increaseAttribute(attribute);
        });
    });
    
    // Botão para resetar atributos
    if (document.getElementById('resetAttributesButton')) {
        document.getElementById('resetAttributesButton').addEventListener('click', () => {
            strScore.value = '10';
            dexScore.value = '10';
            conScore.value = '10';
            intScore.value = '10';
            wisScore.value = '10';
            chaScore.value = '10';
            updateAttributeModifiers();
            updateAttributePoints();
            if (currentStep === 4) updateCharacterPreview();
        });
    }
    
    // Wizard steps
    wizardSteps.forEach(step => {
        step.addEventListener('click', () => {
            const stepNumber = parseInt(step.dataset.step);
            if (stepNumber < currentStep) {
                goToStep(stepNumber);
            }
        });
    });
    
    // Atualizar subclasses quando a classe for alterada
    if (sheetClassInput) {
        sheetClassInput.addEventListener('change', updateSheetSubclasses);
    }
    
    // Atualizar atributos quando os valores mudarem
    [strScore, dexScore, conScore, intScore, wisScore, chaScore].forEach(input => {
        if (input) {
            input.addEventListener('change', () => {
                updateAttributeModifiers();
                updateAttributePoints();
                if (currentStep === 4) updateCharacterPreview();
            });
        }
    });
    
    // Atualizar preview quando os campos básicos mudarem
    [sheetNameInput, sheetRaceInput, sheetClassInput, sheetSubclassInput, 
     sheetLevelInput, sheetHpInput, sheetAcInput, sheetSpeedInput, sheetBackgroundInput].forEach(input => {
        if (input) {
            input.addEventListener('input', () => {
                if (currentStep === 4) updateCharacterPreview();
            });
        }
    });
    
    // Selecionar cor da ficha
    sheetColorPicker.forEach(option => {
        option.addEventListener('click', () => {
            sheetColorPicker.forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
            selectedSheetColor = option.getAttribute('data-color');
            if (currentStep === 4) updateCharacterPreview();
        });
    });
    
    // Templates rápidos
    useTemplateButtons.forEach(button => {
        button.addEventListener('click', function() {
            const templateName = this.getAttribute('data-template');
            applyTemplate(templateName);
        });
    });
    
    // Modal da ficha
    if (closeSheetModal) {
        closeSheetModal.addEventListener('click', closeModal);
    }
    
    if (closeModalButton) {
        closeModalButton.addEventListener('click', closeModal);
    }
    
    // Fechar modal ao clicar fora
    window.addEventListener('click', (event) => {
        if (sheetModal && event.target === sheetModal) {
            closeModal();
        }
    });
    
    // Sistema principal
    if (characterClassInput) {
        characterClassInput.addEventListener('change', updateSubclasses);
    }
    
    if (addButton) {
        addButton.addEventListener('click', addMessage);
    }
    
    if (clearInputButton) {
        clearInputButton.addEventListener('click', () => {
            textInput.value = '';
            textInput.focus();
        });
    }
    
    if (clearAllButton) {
        clearAllButton.addEventListener('click', deleteAllMessages);
    }
    
    if (refreshButton) {
        refreshButton.addEventListener('click', async () => {
            refreshButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            await loadAllData();
            setTimeout(() => {
                refreshButton.innerHTML = '<i class="fas fa-sync-alt"></i>';
            }, 500);
        });
    }
    
    if (rollDiceButton) {
        rollDiceButton.addEventListener('click', rollDiceWithOptions);
    }
    
    if (quickD20Button) {
        quickD20Button.addEventListener('click', rollQuickD20);
    }
    
    if (textInput) {
        textInput.addEventListener('keydown', (event) => {
            if (event.ctrlKey && event.key === 'Enter') {
                addMessage();
            }
        });
    }
    
    // Sistema de iniciativa
    if (startCombatButton) {
        startCombatButton.addEventListener('click', startCombat);
    }
    
    if (rollInitiativeButton) {
        rollInitiativeButton.addEventListener('click', rollInitiative);
    }
    
    if (nextTurnButton) {
        nextTurnButton.addEventListener('click', nextTurn);
    }
    
    if (endCombatButton) {
        endCombatButton.addEventListener('click', endCombat);
    }
    
    if (refreshInitiativeButton) {
        refreshInitiativeButton.addEventListener('click', async () => {
            refreshInitiativeButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            await loadAllData();
            setTimeout(() => {
                refreshInitiativeButton.innerHTML = '<i class="fas fa-sync-alt"></i>';
            }, 500);
        });
    }
    
    if (addRoundButton) {
        addRoundButton.addEventListener('click', () => {
            currentRound++;
            if (roundNumber) roundNumber.textContent = currentRound;
            addCombatLog(`Rodada ${currentRound} iniciada manualmente`, 'system');
            saveAllData();
        });
    }
    
    if (addEnemyButton) {
        addEnemyButton.addEventListener('click', addEnemy);
    }
    
    // Dashboard
    if (refreshStatsButton) {
        refreshStatsButton.addEventListener('click', () => {
            refreshStatsButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            updateDashboardStats();
            setTimeout(() => {
                refreshStatsButton.innerHTML = '<i class="fas fa-sync-alt"></i>';
            }, 500);
        });
    }
    
    if (clearNotificationsButton) {
        clearNotificationsButton.addEventListener('click', clearAllNotifications);
    }
    
    // Botão de sincronização manual
    if (forceSyncButton) {
        forceSyncButton.addEventListener('click', forceSync);
    }
    
    // Selecionar cor do usuário
    userColorOptions.forEach(option => {
        option.addEventListener('click', () => {
            userColorOptions.forEach(opt => opt.classList.remove('selected'));
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

    // Botão para carregar todas as fichas
if (document.getElementById('loadAllSheetsButton')) {
    document.getElementById('loadAllSheetsButton').addEventListener('click', async () => {
        await loadAllData();
        addNotification('Fichas carregadas', 
                       `Todas as ${characterSheets.length} fichas foram carregadas`, 
                       'success', true);
    });
    
    // Inicializar a aplicação
    initializeApp();
});
