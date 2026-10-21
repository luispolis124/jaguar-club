/* ==================== GAME LOOP E CANVAS ==================== */

let canvas, ctx;
let localPlayer = null;
let otherPlayers = new Map();
let animationFrameId = null;

window.startGame = function(userData) {
    canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');

    // Cria o jogador local
    localPlayer = new Player(userData.id, userData.username, userData.color, userData.x, userData.y);

    // Conecta ao Supabase Realtime
    window.NetworkManager.connect(
        userData,
        // Callback de atualização de outro jogador
        (data) => {
            let p = otherPlayers.get(data.id);
            if (!p) {
                p = new Player(data.id, data.username, data.color, data.x, data.y);
                otherPlayers.set(data.id, p);
            }
            p.targetX = data.x;
            p.targetY = data.y;
            p.color = data.color;
            p.username = data.username;
        },
        // Callback de saída
        (id) => {
            otherPlayers.delete(id);
        },
        // Callback de chat
        (id, message) => {
            if (id === localPlayer.id) {
                localPlayer.say(message);
            } else {
                const p = otherPlayers.get(id);
                if (p) p.say(message);
            }
        }
    );

    // Evento de clique para mover o personagem
    canvas.addEventListener('click', (e) => {
        const rect = canvas.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;

        localPlayer.targetX = clickX;
        localPlayer.targetY = clickY;

        // Envia posição via rede
        window.NetworkManager.sendMove(clickX, clickY, localPlayer.username, localPlayer.color);
    });

    // Evento de envio de mensagem no chat
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    
    // Substitui o evento anterior para evitar múltiplos binds
    chatForm.onsubmit = (e) => {
        e.preventDefault();
        const msg = chatInput.value.trim();
        if (msg) {
            localPlayer.say(msg);
            window.NetworkManager.sendChat(msg);
            chatInput.value = '';
        }
    };

    // Inicia o loop gráfico do jogo
    if (!animationFrameId) {
        gameLoop();
    }
};

function gameLoop() {
    // Limpa a tela (Fundo do Mapa / Ilha)
    ctx.fillStyle = '#227093'; // Azul estilo oceano/ilha
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Desenha detalhes simples do mapa de fundo
    ctx.fillStyle = '#34ace0';
    ctx.beginPath();
    ctx.arc(480, 270, 220, 0, Math.PI * 2);
    ctx.fill();

    // Atualiza e desenha o jogador local
    if (localPlayer) {
        localPlayer.update();
        localPlayer.draw(ctx);
    }

    // Atualiza e desenha outros jogadores
    otherPlayers.forEach((player) => {
        player.update();
        player.draw(ctx);
    });

    animationFrameId = requestAnimationFrame(gameLoop);
}

window.stopGameLoop = function() {
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
    }
    window.NetworkManager.disconnect();
    otherPlayers.clear();
};
