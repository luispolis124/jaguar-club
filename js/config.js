/* ==================== CONFIGURAÇÃO DO SUPABASE ==================== */

// Substitua pelas suas credenciais reais do projeto no Supabase
// (Você encontra esses dados no painel do seu projeto em Project Settings > API)
const SUPABASE_URL = 'SUA_SUPABASE_URL_AQUI';
const SUPABASE_ANON_KEY = 'SUA_SUPABASE_ANON_KEY_AQUI';

// Inicializa o cliente do Supabase globalmente
let supabaseClient = null;

try {
    if (window.supabase && SUPABASE_URL !== 'SUA_SUPABASE_URL_AQUI') {
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
