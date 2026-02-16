# 🏍️ Guia de Migração para Vue.js + Vuetify

## ✅ O que foi feito

### 1. Estrutura do Projeto
- ✅ Criada pasta `frontend/` com projeto Vue.js completo
- ✅ Separação clara entre backend (API) e frontend (interface)
- ✅ Backend convertido para API REST pura

### 2. Frontend (Vue.js + Vuetify)

#### Componentes Criados:
- **WelcomeScreen.vue** - Tela de boas-vindas animada
- **MotorcycleForm.vue** - Formulário de cadastro/edição
- **MotorcycleList.vue** - Lista de motos com ações
- **CatalogModal.vue** - Modal do catálogo por motor

#### Gerenciamento de Estado (Pinia):
- **motorcycles.js** - Store para gerenciar motos
- **catalog.js** - Store para o catálogo

#### Serviços:
- **api.js** - Configuração Axios e endpoints da API

#### Configuração:
- **vuetify.js** - Tema customizado Harley Davidson
- **vite.config.js** - Build e proxy para API
- **main.js** - Entry point da aplicação

### 3. Backend (Fastify)

#### Mudanças:
- ✅ Removido `@fastify/static` e `@fastify/view`
- ✅ Removido suporte a EJS
- ✅ Adicionado `@fastify/cors`
- ✅ Rota raiz agora retorna info da API
- ✅ Backend agora é 100% API REST

---

## 🚀 Como Executar

### Opção 1: Setup Automático

```bash
./setup.sh
```

### Opção 2: Setup Manual

#### 1. Backend
```bash
# Instalar dependências
npm install

# Instalar CORS
npm install @fastify/cors

# Iniciar servidor
npm run dev
```

#### 2. Frontend
```bash
# Entrar na pasta frontend
cd frontend

# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

#### 3. Acessar
- Backend API: http://localhost:3000
- Frontend: http://localhost:5173

---

## 📋 Checklist Pós-Migração

### Imediato:
- [ ] Executar `./setup.sh` ou instalar dependências manualmente
- [ ] Iniciar backend (`npm run dev`)
- [ ] Iniciar frontend (`cd frontend && npm run dev`)
- [ ] Testar todas as funcionalidades

### Funcionalidades a Testar:
- [ ] Tela de boas-vindas
- [ ] Cadastro de motos
- [ ] Edição de motos
- [ ] Exclusão de motos
- [ ] Listagem de motos
- [ ] Catálogo por motor
- [ ] Busca no catálogo
- [ ] Estatísticas

### Opcional (Organização):
- [ ] Mover `src/` para `backend/src/`
- [ ] Mover `package.json` do backend para `backend/`
- [ ] Atualizar caminhos nos imports
- [ ] Criar docker-compose para desenvolvimento
- [ ] Configurar CI/CD separado

---

## 🎨 Melhorias Implementadas

### Design
- ✅ Interface moderna com Material Design
- ✅ Tema dark customizado Harley Davidson
- ✅ Animações suaves e transições
- ✅ Ícones Material Design Icons
- ✅ Responsivo para mobile, tablet e desktop

### UX
- ✅ Validação de formulários em tempo real
- ✅ Feedback visual com snackbars
- ✅ Confirmação antes de excluir
- ✅ Loading states em todas as operações
- ✅ Empty states informativos
- ✅ Scroll suave entre seções

### Código
- ✅ Componentização adequada
- ✅ Gerenciamento de estado centralizado
- ✅ Serviços de API organizados
- ✅ Código TypeScript-ready (pode adicionar .ts facilmente)
- ✅ Hot reload em desenvolvimento

---

## 🔧 Estrutura de Arquivos

```
api-fastify/
├── frontend/                    # 🆕 Frontend Vue.js
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   │   └── styles.css      # Estilos globais
│   │   ├── components/
│   │   │   ├── CatalogModal.vue
│   │   │   ├── MotorcycleForm.vue
│   │   │   ├── MotorcycleList.vue
│   │   │   └── WelcomeScreen.vue
│   │   ├── plugins/
│   │   │   └── vuetify.js      # Configuração Vuetify
│   │   ├── services/
│   │   │   └── api.js          # Cliente API
│   │   ├── store/
│   │   │   ├── catalog.js      # Store do catálogo
│   │   │   └── motorcycles.js  # Store de motos
│   │   ├── App.vue             # Componente raiz
│   │   └── main.js             # Entry point
│   ├── .env                     # Variáveis de ambiente
│   ├── .env.example
│   ├── .gitignore
│   ├── index.html
│   ├── package.json
│   ├── README.md
│   └── vite.config.js
│
├── src/                         # Backend (manter ou mover para backend/)
│   ├── db/
│   ├── routes/
│   ├── schemas/
│   ├── services/
│   └── server.js                # ✏️ Modificado (CORS adicionado)
│
├── package.json                 # ✏️ Modificado (removidas deps de view)
├── README-COMPLETO.md           # 🆕 Documentação completa
├── setup.sh                     # 🆕 Script de instalação
└── README.md                    # Original (backend)
```

---

## 🌐 Endpoints da API

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/` | Info da API |
| GET | `/api/motorcycles` | Listar motos |
| POST | `/api/motorcycles` | Criar moto |
| GET | `/api/motorcycles/:id` | Obter moto |
| PUT | `/api/motorcycles/:id` | Atualizar moto |
| DELETE | `/api/motorcycles/:id` | Excluir moto |
| GET | `/api/catalog/stats` | Estatísticas |
| GET | `/api/catalog/engines` | Tipos de motores |
| GET | `/api/catalog/engine/:type` | Motos por motor |
| GET | `/api/catalog/search` | Buscar no catálogo |

---

## 🐛 Solução de Problemas

### Erro de CORS
Se encontrar erros de CORS, verifique:
1. Backend está rodando na porta 3000
2. `@fastify/cors` está instalado
3. Frontend está configurado para `http://localhost:3000`

### Porta já em uso
```bash
# Backend (3000)
lsof -ti:3000 | xargs kill -9

# Frontend (5173)
lsof -ti:5173 | xargs kill -9
```

### Dependências não encontradas
```bash
# Backend
npm install

# Frontend
cd frontend && npm install
```

### Build do frontend falha
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

---

## 📦 Deploy em Produção

### Frontend (Vercel/Netlify)
```bash
cd frontend
npm run build
# Upload da pasta dist/
```

### Backend (Railway/Render)
```bash
# Manter estrutura atual ou mover para backend/
# Configurar variável PORT
# Deploy automático via Git
```

---

## 🎓 Próximos Passos

1. **Adicionar TypeScript** (opcional)
2. **Implementar autenticação** (JWT)
3. **Adicionar testes** (Vitest + Testing Library)
4. **PWA** (Service Workers)
5. **i18n** (Internacionalização)
6. **Dark/Light mode toggle**
7. **Upload de imagens** para as motos

---

## 📝 Notas

- O banco de dados SQLite continua funcionando normalmente
- Todas as funcionalidades do sistema original foram mantidas
- A interface foi completamente redesenhada
- O código está mais organizado e manutenível
- Fácil adicionar novas funcionalidades

---

## 🆘 Suporte

Se encontrar problemas:
1. Verifique se ambos os servidores estão rodando
2. Limpe o cache do navegador
3. Verifique o console do navegador e terminal
4. Confirme que as dependências estão instaladas

---

**Desenvolvido com ❤️ usando Vue.js 3 + Vuetify 3**
