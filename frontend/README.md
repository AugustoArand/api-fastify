# Harley Davidson - Frontend Vue.js

Frontend moderno desenvolvido com Vue.js 3 e Vuetify 3 para o sistema de gerenciamento de motos Harley Davidson.

## 🚀 Tecnologias

- **Vue.js 3** - Framework JavaScript progressivo
- **Vuetify 3** - Framework de componentes Material Design
- **Pinia** - Gerenciamento de estado
- **Vite** - Build tool e dev server
- **Axios** - Cliente HTTP

## 📦 Instalação

```bash
# Instalar dependências
npm install
```

## 🏃 Executar em Desenvolvimento

```bash
# Iniciar servidor de desenvolvimento
npm run dev
```

O frontend estará disponível em `http://localhost:5173`

## 🏗️ Build para Produção

```bash
# Criar build de produção
npm run build

# Visualizar build localmente
npm run preview
```

## ⚙️ Configuração

Copie o arquivo `.env.example` para `.env` e configure:

```bash
cp .env.example .env
```

Variáveis disponíveis:
- `VITE_API_URL` - URL da API backend (padrão: http://localhost:3000)

## 📁 Estrutura do Projeto

```
frontend/
├── public/           # Arquivos estáticos
├── src/
│   ├── assets/      # Recursos (CSS, imagens)
│   ├── components/  # Componentes Vue
│   │   ├── WelcomeScreen.vue
│   │   ├── MotorcycleForm.vue
│   │   ├── MotorcycleList.vue
│   │   └── CatalogModal.vue
│   ├── plugins/     # Plugins (Vuetify)
│   ├── services/    # Serviços de API
│   ├── store/       # Pinia stores
│   ├── App.vue      # Componente raiz
│   └── main.js      # Entry point
├── index.html       # HTML template
├── vite.config.js   # Configuração Vite
└── package.json     # Dependências
```

## 🎨 Características

- **Design Responsivo** - Adaptado para desktop, tablet e mobile
- **Material Design** - Interface moderna usando Vuetify
- **Gerenciamento de Estado** - Pinia para estado global
- **Validação de Formulários** - Validação integrada com Vuetify
- **Feedback Visual** - Snackbars e diálogos de confirmação
- **Animações** - Transições suaves e efeitos visuais

## 🔗 Endpoints da API

O frontend se comunica com a API backend através dos seguintes endpoints:

- `GET /api/motorcycles` - Listar motos
- `POST /api/motorcycles` - Criar moto
- `GET /api/motorcycles/:id` - Obter moto
- `PUT /api/motorcycles/:id` - Atualizar moto
- `DELETE /api/motorcycles/:id` - Excluir moto
- `GET /api/catalog/stats` - Estatísticas do catálogo
- `GET /api/catalog/engines` - Tipos de motores
- `GET /api/catalog/engine/:type` - Motos por motor
- `GET /api/catalog/search?q=` - Buscar no catálogo
