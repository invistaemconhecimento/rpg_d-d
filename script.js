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
