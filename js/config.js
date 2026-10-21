/* ==================== CONFIGURAÇÃO DO SUPABASE ==================== */

// Sua URL real do projeto no Supabase
const SUPABASE_URL = 'https://vhccazqkultpnwouzclr.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_jnLWiD29IggXpZP3OqG00w_juq_HqKs';

// Inicializa o cliente do Supabase globalmente
let supabaseClient = null;

try {
    // Verifica se a biblioteca carregou e se a URL foi alterada do padrão vazio
    if (window.supabase && SUPABASE_URL !== '') {
        supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        console.log('🔌 Supabase conectado com sucesso!');
    } else {
        console.warn('⚠️ As credenciais do Supabase não foram configuradas em js/config.js ou a biblioteca CDN falhou.');
    }
} catch (error) {
    console.error('Erro ao inicializar o Supabase:', error);
}

// Exporta/Disponibiliza globalmente para os outros arquivos JS utilizarem
window.supabaseClient = supabaseClient;
