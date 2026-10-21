/* ==================== GERENCIADOR DE CENÁRIOS / SALAS ==================== */

const ROOMS = {
    // 1. Centro da Cidade (Town Center)
    center: {
        id: 'center',
        name: 'Centro da Cidade',
        bgColor: '#227093', // Cor de fundo fallback
        bgImageSrc: 'assets/images/rooms/center.png', // Sua pixel art do centro
        spawnX: 480,
        spawnY: 300,
        // Portais de saída para outros cenários
        doors: [
            {
                name: 'Ir para o Lobby',
                x: 850, y: 200, width: 80, height: 100,
                targetRoom: 'lobby', targetX: 100, targetY: 270
            },
            {
                name: 'Ir para Sua Casa',
                x: 100, y: 150, width: 80, height: 90,
                targetRoom: 'house', targetX: 480, targetY: 400
            }
        ]
    },

    // 2. O Lobby / Praça Principal
    lobby: {
        id: 'lobby',
        name: 'Lobby Principal',
        bgColor: '#10ac84',
        bgImageSrc: 'assets/images/rooms/lobby.png',
        spawnX: 150,
        spawnY: 270,
        doors: [
            {
                name: 'Voltar ao Centro',
                x: 50, y: 200, width: 80, height: 100,
                targetRoom: 'center', targetX: 800, targetY: 270
            }
        ]
    },

    // 3. Casa / Toca do Jogador (Interior Customizável)
    house: {
        id: 'house',
        name: 'Casa do Jaguar',
        bgColor: '#c8d6e5',
        bgImageSrc: 'assets/images/rooms/house.png',
        spawnX: 480,
        spawnY: 420,
        doors: [
            {
                name: 'Sair da Casa',
                x: 440, y: 480, width: 80, height: 50,
                targetRoom: 'center', targetX: 150, targetY: 200
            }
        ]
    }
};

class RoomManager {
    constructor() {
        this.currentRoom = ROOMS.center;
        this.roomImages = {};
        this.loadRoomImages();
    }

    // Carrega as imagens de fundo que você criar
    loadRoomImages() {
        Object.keys(ROOMS).forEach(key => {
            const room = ROOMS[key];
            if (room.bgImageSrc) {
                const img = new Image();
                img.src = room.bgImageSrc;
                this.roomImages[room.id] = img;
            }
        });
    }

    // Altera a sala atual
    changeRoom(roomId) {
        if (ROOMS[roomId]) {
            this.currentRoom = ROOMS[roomId];
            console.log(`📍 Entrou na sala: ${this.currentRoom.name}`);
            return true;
        }
        return false;
    }

    // Verifica se o jogador clicou em uma porta/portal
    checkDoorCollision(x, y) {
        for (let door of this.currentRoom.doors) {
            if (
                x >= door.x && x <= door.x + door.width &&
                y >= door.y && y <= door.y + door.height
            ) {
                return door;
            }
        }
        return null;
    }

    // Desenha o cenário no Canvas
    draw(ctx, canvasWidth, canvasHeight) {
        const room = this.currentRoom;
        const roomImg = this.roomImages[room.id];

        // 1. Se a imagem do cenário já tiver carregado, desenha a Pixel Art
        if (roomImg && roomImg.complete && roomImg.naturalWidth !== 0) {
            ctx.drawImage(roomImg, 0, 0, canvasWidth, canvasHeight);
        } else {
            // Fundo básico enquanto você está criando as artes
            ctx.fillStyle = room.bgColor;
            ctx.fillRect(0, 0, canvasWidth, canvasHeight);

            // Nome da Sala na tela
            ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
            ctx.font = 'bold 24px Segoe UI';
            ctx.textAlign = 'center';
            ctx.fillText(room.name, canvasWidth / 2, 50);
        }

        // 2. Desenha visualmente os portais de saída/portas (para você testar fácil)
        room.doors.forEach(door => {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
            ctx.strokeStyle = '#fbc531';
            ctx.lineWidth = 2;
            ctx.fillRect(door.x, door.y, door.width, door.height);
            ctx.strokeRect(door.x, door.y, door.width, door.height);

            // Texto na porta
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 11px Segoe UI';
            ctx.textAlign = 'center';
            ctx.fillText(door.name, door.x + door.width / 2, door.y - 8);
        });
    }
}

window.RoomManager = new RoomManager();
window.ROOMS = ROOMS;
