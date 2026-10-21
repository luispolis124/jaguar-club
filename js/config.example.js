/* ==================== EXEMPLO DE CONFIGURAÇÃO DO SUPABASE ==================== */
// Renomeie ou copie este arquivo para 'js/config.js' e coloque suas chaves reais.

const SUPABASE_URL = 'SUA_SUPABASE_URL_AQUI';
const SUPABASE_ANON_KEY = 'SUA_SUPABASE_ANON_KEY_AQUI';

let supabaseClient = null;

try {
    if (window.supabase && SUPABASE_URL !== 'SUA_SUPABASE_URL_AQUI') {
        supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        console.log('🔌 Supabase conectado com sucesso!');
    }
} catch (error) {
    console.error('Erro ao inicializar o Supabase:', error);
}

window.supabaseClient = supabaseClient;
