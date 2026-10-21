/* ==================== AUTENTICAÇÃO E TELA ==================== */

document.addEventListener('DOMContentLoaded', () => {
    const authScreen = document.getElementById('auth-screen');
    const gameScreen = document.getElementById('game-screen');
    
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    
    const showRegisterBtn = document.getElementById('show-register');
    const showLoginBtn = document.getElementById('show-login');
    const authError = document.getElementById('auth-error');
    const btnLogout = document.getElementById('btn-logout');

    // Alternar entre formulários de Login e Cadastro
    showRegisterBtn.addEventListener('click', (e) => {
        e.preventDefault();
        loginForm.classList.add('hidden');
        registerForm.classList.remove('hidden');
        authError.classList.add('hidden');
    });

    showLoginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        registerForm.classList.add('hidden');
        loginForm.classList.remove('hidden');
        authError.classList.add('hidden');
    });

    function showError(message) {
        authError.textContent = message;
        authError.classList.remove('hidden');
    }

    // Processo de Cadastro
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!window.supabaseClient) return showError('Supabase não configurado!');

        const username = document.getElementById('reg-username').value.trim();
        const email = document.getElementById('reg-email').value.trim();
        const password = document.getElementById('reg-password').value.trim();
        const color = document.getElementById('reg-color').value;

        try {
            const { data, error } = await window.supabaseClient.auth.signUp({
                email,
                password,
                options: {
                    data: { username, color, coins: 100 }
                }
            });

            if (error) throw error;

            alert('Conta criada com sucesso! Faça login para entrar.');
            registerForm.reset();
            registerForm.classList.add('hidden');
            loginForm.classList.remove('hidden');
        } catch (err) {
            showError(err.message);
        }
    });

    // Processo de Login
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!window.supabaseClient) return showError('Supabase não configurado!');

        const email = document.getElementById('login-email').value.trim();
        const password = document.getElementById('login-password').value.trim();

        try {
            const { data, error } = await window.supabaseClient.auth.signInWithPassword({
                email,
                password
            });

            if (error) throw error;

            initGameSession(data.user);
        } catch (err) {
            showError(err.message);
        }
    });

    // Logout
    btnLogout.addEventListener('click', async () => {
        if (window.supabaseClient) {
            await window.supabaseClient.auth.signOut();
        }
        gameScreen.classList.add('hidden');
        authScreen.classList.remove('hidden');
        if (window.stopGameLoop) window.stopGameLoop();
    });

    // Verificar se já existe sessão ativa
    async function checkActiveSession() {
        if (!window.supabaseClient) return;
        const { data: { session } } = await window.supabaseClient.auth.getSession();
        if (session) {
            initGameSession(session.user);
        }
    }

    function initGameSession(user) {
        authScreen.classList.add('hidden');
        gameScreen.classList.remove('hidden');

        // Pega dados do metadado do usuário
        const metadata = user.user_metadata || {};
        const username = metadata.username || 'Jaguar';
        const color = metadata.color || '#00a8ff';
        const coins = metadata.coins || 100;

        // Atualiza HUD
        document.getElementById('hud-username').textContent = username;
        document.getElementById('hud-coins').textContent = coins;

        // Inicia o jogador e o jogo
        if (window.startGame) {
            window.startGame({
                id: user.id,
                username: username,
                color: color,
                x: 480,
                y: 270
            });
        }
    }

    checkActiveSession();
});
