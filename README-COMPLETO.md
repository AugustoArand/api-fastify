# Harley Davidson - Sistema Completo

Sistema de gerenciamento de motos Harley Davidson com arquitetura separada entre frontend e backend.

## 📁 Estrutura do Projeto

```
api-fastify/
├── backend/              # Não criado ainda - mova os arquivos src/ para aqui
├── frontend/             # Aplicação Vue.js + Vuetify
│   ├── src/
│   │   ├── components/  # Componentes Vue
│   │   ├── store/       # Pinia stores
│   │   ├── services/    # API services
│   │   └── ...
│   └── package.json
├── src/                  # Backend atual (mover para backend/)
│   ├── server.js
│   ├── routes/
│   ├── services/
│   └── ...
└── package.json          # Backend package.json
```

## 🚀 Guia de Início Rápido

### Backend (API Fastify)

1. Instalar dependências do backend:
```bash
npm install
```

2. Instalar o novo pacote CORS:
```bash
npm install @fastify/cors
```

3. Iniciar o servidor backend:
```bash
npm run dev
```

O backend estará em `http://localhost:3000`

### Frontend (Vue.js + Vuetify)

1. Navegar para a pasta frontend:
```bash
cd frontend
```

2. Instalar dependências:
```bash
npm install
```

3. Criar arquivo de configuração:
```bash
cp .env.example .env
```

4. Iniciar o servidor de desenvolvimento:
```bash
npm run dev
```

O frontend estará em `http://localhost:5173`

## 🔧 Tecnologias

### Backend
- **Fastify** - Framework web rápido
- **SQLite** (better-sqlite3) - Banco de dados
- **Zod** - Validação de schemas
- **@fastify/cors** - Suporte a CORS

### Frontend
- **Vue.js 3** - Framework progressivo
- **Vuetify 3** - Framework UI Material Design
- **Pinia** - Gerenciamento de estado
- **Axios** - Cliente HTTP
- **Vite** - Build tool

## 📝 Mudanças Realizadas

### Backend
- ✅ Removido suporte a views (EJS)
- ✅ Removido servidor de arquivos estáticos
- ✅ Adicionado suporte a CORS
- ✅ Convertido para API pura REST

### Frontend
- ✅ Criado projeto Vue.js 3 completo
- ✅ Integrado Vuetify 3 com tema customizado
- ✅ Implementado todos os componentes:
  - WelcomeScreen (tela de boas-vindas)
  - MotorcycleForm (formulário de cadastro)
  - MotorcycleList (lista de motos)
  - CatalogModal (catálogo por motor)
- ✅ Implementado gerenciamento de estado com Pinia
- ✅ Criado serviços de API com Axios
- ✅ Design responsivo e moderno

## 🎨 Funcionalidades

- ✨ Tela de boas-vindas animada
- 📝 Cadastro e edição de motos
- 📋 Listagem de motos cadastradas
- 🗑️ Exclusão com confirmação
- 📊 Catálogo de motos por tipo de motor
- 🔍 Busca no catálogo
- 📈 Estatísticas do catálogo
- 🎨 Interface Material Design com tema Harley Davidson
- 📱 Design totalmente responsivo

## 🔗 Endpoints da API

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/` | Informações da API |
| GET | `/api/motorcycles` | Listar todas as motos |
| POST | `/api/motorcycles` | Criar nova moto |
| GET | `/api/motorcycles/:id` | Obter moto por ID |
| PUT | `/api/motorcycles/:id` | Atualizar moto |
| DELETE | `/api/motorcycles/:id` | Excluir moto |
| GET | `/api/catalog/stats` | Estatísticas do catálogo |
| GET | `/api/catalog/engines` | Tipos de motores |
| GET | `/api/catalog/engine/:type` | Motos por tipo de motor |
| GET | `/api/catalog/search?q=` | Buscar no catálogo |

## 🚀 Próximos Passos (Opcional)

Para uma organização ainda melhor, você pode:

1. **Mover o backend para pasta dedicada:**
```bash
mkdir backend
mv src backend/
mv package.json backend/
mv render.yaml backend/
# Atualizar caminhos no código conforme necessário
```

2. **Criar docker-compose para desenvolvimento:**
```yaml
version: '3.8'
services:
  backend:
    build: ./backend
    ports:
      - "3000:3000"
  frontend:
    build: ./frontend
    ports:
      - "5173:5173"
```

3. **Configurar CI/CD separado** para frontend e backend

4. **Deploy separado:**
   - Backend: Railway, Render, Fly.io
   - Frontend: Vercel, Netlify, Cloudflare Pages

## 📄 Licença

ISC
