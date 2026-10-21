/* ==================== CLASSE DO JOGADOR ==================== */

class Player {
    constructor(id, username, color, x, y) {
        this.id = id;
        this.username = username;
        this.color = color;
        this.x = x;
        this.y = y;
        this.targetX = x;
        this.targetY = y;
        this.speed = 3;
        this.currentMessage = '';
        this.messageTimer = null;
    }

    update() {
        // Movimento suave até o alvo (clique do mouse)
        const dx = this.targetX - this.x;
        const dy = this.targetY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 1) {
            this.x += (dx / distance) * this.speed;
            this.y += (dy / distance) * this.speed;
        }
    }

    draw(ctx) {
        // Desenha o corpo do Jaguar (estilo avatar carismático)
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 20, 0, Math.PI * 2);
        ctx.fill();
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#ffffff';
        ctx.stroke();

        // Orelhas simuladas
        ctx.beginPath();
        ctx.arc(this.x - 12, this.y - 14, 8, 0, Math.PI * 2);
        ctx.arc(this.x + 12, this.y - 14, 8, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.stroke();

        // Nome acima do personagem
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 12px Segoe UI';
        ctx.textAlign = 'center';
        ctx.fillText(this.username, this.x, this.y - 32);

        // Balão de fala (se houver mensagem ativa)
        if (this.currentMessage) {
            this.drawChatBubble(ctx);
        }
    }

    drawChatBubble(ctx) {
        ctx.font = '12px Segoe UI';
        const textWidth = ctx.measureText(this.currentMessage).width;
        const padding = 8;
        const bubbleWidth = textWidth + padding * 2;
        const bubbleHeight = 26;
        const bubbleX = this.x - bubbleWidth / 2;
        const bubbleY = this.y - 65;

        // Fundo do balão
        ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
        ctx.strokeStyle = '#2f3640';
        ctx.lineWidth = 2;
        
        ctx.beginPath();
        ctx.roundRect(bubbleX, bubbleY, bubbleWidth, bubbleHeight, 8);
        ctx.fill();
        ctx.stroke();

        // Texto da mensagem
        ctx.fillStyle = '#2f3640';
        ctx.textAlign = 'center';
        ctx.fillText(this.currentMessage, this.x, bubbleY + 17);
    }

    say(message) {
        this.currentMessage = message;
        if (this.messageTimer) clearTimeout(this.messageTimer);
        
        this.messageTimer = setTimeout(() => {
            this.currentMessage = '';
        }, 5000); // Apaga a mensagem após 5 segundos
    }
}

window.Player = Player;
