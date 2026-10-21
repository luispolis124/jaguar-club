/* ==================== SINCRONIZAÇÃO EM TEMPO REAL ==================== */

class Network {
    constructor() {
        this.channel = null;
        this.myId = null;
    }

    connect(playerData, onPlayerUpdate, onPlayerLeave, onChatMessage) {
        if (!window.supabaseClient) return;

        this.myId = playerData.id;
        
        // Entra no canal global da ilha
        this.channel = window.supabaseClient.channel('room_main', {
            config: {
                presence: {
                    key: this.myId,
                },
            },
        });

        // Ouve atualizações de outros jogadores (posição e chat)
        this.channel
            .on('broadcast', { event: 'move' }, (payload) => {
                if (payload.payload.id !== this.myId) {
                    onPlayerUpdate(payload.payload);
                }
            })
            .on('broadcast', { event: 'chat' }, (payload) => {
                onChatMessage(payload.payload.id, payload.payload.message);
            })
            .subscribe(async (status) => {
                if (status === 'SUBSCRIBED') {
                    // Envia presença inicial
                    await this.channel.track(playerData);
                }
            });
    }

    sendMove(x, y, username, color) {
        if (!this.channel) return;
        this.channel.send({
            type: 'broadcast',
            event: 'move',
            payload: { id: this.myId, x, y, username, color }
        });
    }

    sendChat(message) {
        if (!this.channel) return;
        this.channel.send({
            type: 'broadcast',
            event: 'chat',
            payload: { id: this.myId, message }
        });
    }

    disconnect() {
        if (this.channel && window.supabaseClient) {
            window.supabaseClient.removeChannel(this.channel);
            this.channel = null;
        }
    }
}

window.NetworkManager = new Network();
