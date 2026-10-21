# 🐆 Jaguar Club

Um mundo virtual multijogador em tempo real inspirado em clássicos como Club Penguin, desenvolvido com **HTML5 Canvas**, **JavaScript Modular**, **CSS3** e **Supabase**.

---

## 🚀 Funcionalidades
* **Autenticação de Usuários**: Cadastro e login seguros utilizando o **Supabase Auth**.
* **Multijogador em Tempo Real**: Movimentação sincronizada e chat em balões utilizando o **Supabase Realtime (Broadcast)**.
* **Canvas 2D**: Renderização leve e fluida executada diretamente no navegador.
* **Deploy Rápido**: Pronto para ser hospedado gratuitamente na **Vercel**.

---

## 📂 Estrutura do Projeto

```text
jaguar-club/
│
├── 📄 index.html          # Interface principal (Login/Cadastro e Canvas do Jogo)
├── 📄 .gitignore          # Arquivos ignorados pelo Git
├── 📄 README.md           # Documentação do projeto
│
├── 📁 css/                # Folhas de Estilo
│   ├── 📄 style.css       # Estilos globais e tela de login
│   └── 📄 game.css        # HUD, chat e layout do canvas
│
├── 📁 js/                 # Lógica da Aplicação
│   ├── 📄 config.js       # Conexão com o Supabase
│   ├── 📄 auth.js         # Gerenciamento de sessão e formulários
│   ├── 📄 player.js       # Classe do personagem (Avatar, cores, chat)
│   ├── 📄 network.js      # Sincronização em tempo real (Supabase Realtime)
│   └── 📄 game.js         # Game loop e eventos do mouse no Canvas
│
└── 📁 assets/             # Recursos de mídia (Imagens, Sprites e Sons)

⚙️ Como Configurar e Rodar Localmente
 * Clone o repositório:
   git clone [https://github.com/luispolis 124/jaguar-club.git](https://github.com/SEU_USUARIO/jaguar-club.git)
cd jaguar-club

 * Configure o Supabase:
   * Crie um projeto gratuito em supabase.com.
   * Vá em Project Settings > API e copie sua URL e a chave anon public.
   * Abra o arquivo js/config.js e cole suas credenciais:
     const SUPABASE_URL = 'SUA_SUPABASE_URL_AQUI';
const SUPABASE_ANON_KEY = 'SUA_SUPABASE_ANON_KEY_AQUI';

 * Inicie um servidor local:
   * Você pode usar a extensão Live Server no VS Code ou rodar via Node.js/Python:
     npx http-server

☁️ Como Publicar no GitHub e Vercel
 * Suba para o GitHub:
   git init
git add .
git commit -m "feat: estrutura inicial do Jaguar Club"
git branch -M main
git remote add origin [https://github.com/SEU_USUARIO/jaguar-club.git](https://github.com/SEU_USUARIO/jaguar-club.git)
git push -u origin main

 * Publique na Vercel:
   * Acesse vercel.com e faça login com sua conta do GitHub.
   * Clique em Add New... > Project e selecione o repositório jaguar-club.
   * Clique em Deploy (nenhuma configuração de build é necessária, pois é um site estático puro).
📜 Licença
Distribuído sob a licença MIT. Sinta-se à vontade para modificar e criar novas salas e mini-games para o seu mundo virtual!

