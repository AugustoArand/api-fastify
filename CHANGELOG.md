# 📝 Changelog - Migração para Sistema de Acervo com Autenticação

## 🎯 Objetivo
Transformar o sistema de uma API de cadastro de motos em um **Acervo Histórico Harley-Davidson** com autenticação obrigatória para acesso ao catálogo.

## 🔄 Mudanças Realizadas

### 1. Backend - Banco de Dados
**Antes:** SQLite (better-sqlite3)
**Depois:** PostgreSQL

#### Arquivos Criados:
- `src/db/postgres.js` - Conexão e configuração do PostgreSQL
- `.env` - Variáveis de ambiente (DATABASE_URL, JWT_SECRET)
- `.env.example` - Template de configuração

#### Arquivos Modificados:
- `src/routes/motorcycles.js` - Migrado de SQLite para PostgreSQL
- `package.json` - Removido better-sqlite3, adicionado pg

#### Tabelas:
```sql
users (
  id, name, email (unique), password (hash), created_at
)

motorcycles (
  id, model, year, color, engine, price, description, created_at
)
```

### 2. Backend - Sistema de Autenticação
**Novo:** Sistema completo de registro, login e autenticação JWT

#### Arquivos Criados:
- `src/routes/auth.js` - Rotas de autenticação
- `src/services/userService.js` - Lógica de usuários
- `src/schemas/user.js` - Validação Zod para usuários

#### Funcionalidades:
- ✅ Registro de usuários
- ✅ Hash de senhas com bcrypt (salt rounds: 10)
- ✅ Login com geração de token JWT
- ✅ Middleware de autenticação
- ✅ Rota protegida `/api/auth/me`
- ✅ Validação de dados com Zod

#### Endpoints Novos:
```
POST /api/auth/register - Criar conta
POST /api/auth/login    - Fazer login
GET  /api/auth/me       - Verificar autenticação (protegida)
```

#### Dependências Adicionadas:
```json
"@fastify/jwt": "^8.0.0",
"bcrypt": "^5.1.1",
"pg": "^8.11.3",
"dotenv": "^16.4.5"
```

### 3. Frontend - Página Home
**Antes:** Após "Iniciar", ia direto para o sistema
**Depois:** Página Home explicando o acervo e solicitando cadastro

#### Arquivo Criado:
- `src/components/HomePage.vue`

#### Conteúdo:
- Explicação do Acervo Histórico
- Informações sobre 12 tipos de motores e 60+ modelos
- Botões para Login e Registro
- Estatísticas visuais
- Design responsivo

### 4. Frontend - Sistema de Autenticação
**Novo:** Componentes de Login e Registro

#### Arquivos Criados:
- `src/components/LoginDialog.vue` - Modal de login
- `src/components/RegisterDialog.vue` - Modal de registro
- `src/store/auth.js` - Pinia store para autenticação

#### Funcionalidades:
- ✅ Formulário de registro com validação
- ✅ Formulário de login
- ✅ Armazenamento de token no localStorage
- ✅ Configuração automática do header Authorization
- ✅ Persistência de sessão
- ✅ Logout
- ✅ Verificação de autenticação

#### Validações:
- Nome: mínimo 3 caracteres
- Email: formato válido
- Senha: mínimo 6 caracteres
- Confirmação de senha
- Feedback visual de erros

### 5. Frontend - Proteção de Rotas
**Novo:** Catálogo acessível apenas com autenticação

#### Arquivo Modificado:
- `src/App.vue`

#### Fluxo:
```
WelcomeScreen → HomePage → [Login/Registro] → Sistema Principal
                                                      ↓
                                              Catálogo Protegido
```

#### Lógica:
- Se não autenticado: mostra HomePage
- Se autenticado: acesso completo ao sistema
- Catálogo só renderiza se `isAuthenticated === true`
- Botão de logout visível quando autenticado

### 6. Catálogo - Fichas Técnicas
**Mudança Conceitual:** De loja para acervo histórico

#### Arquivo Modificado:
- `src/services/catalogService.js`

#### Antes:
```javascript
{
  model: 'Fat Boy',
  price: 45000,
  power: '67 cv',
  // ...
}
```

#### Depois:
```javascript
{
  model: 'Fat Boy',
  power: '67 cv @ 5000 rpm',      // ← RPM específico
  torque: '115 Nm @ 3500 rpm',    // ← RPM específico
  weight: '320 kg',                // ← Novo
  fuelCapacity: '18.9 L',          // ← Novo
  transmission: '5 velocidades',   // ← Novo
  // price removido - não é loja!
}
```

### 7. Documentação
**Novos Arquivos:**
- `INICIO-RAPIDO.md` - Guia de início rápido
- `README-ACERVO.md` - Documentação completa do sistema
- `SETUP-POSTGRESQL.md` - Configuração detalhada do PostgreSQL
- `CHANGELOG.md` - Este arquivo
- `setup-acervo.sh` - Script de instalação automatizado

## 🗂️ Estrutura de Arquivos

```
api-fastify/
├── src/
│   ├── db/
│   │   ├── database.js (obsoleto - SQLite)
│   │   └── postgres.js (novo - PostgreSQL)
│   ├── routes/
│   │   ├── auth.js (novo)
│   │   ├── catalog.js
│   │   └── motorcycles.js (migrado)
│   ├── schemas/
│   │   ├── motorcycle.js
│   │   └── user.js (novo)
│   ├── services/
│   │   ├── catalogService.js (atualizado)
│   │   └── userService.js (novo)
│   └── server.js (atualizado)
├── frontend/
│   └── src/
│       ├── components/
│       │   ├── HomePage.vue (novo)
│       │   ├── LoginDialog.vue (novo)
│       │   ├── RegisterDialog.vue (novo)
│       │   ├── CatalogModal.vue
│       │   ├── MotorcycleForm.vue
│       │   ├── MotorcycleList.vue
│       │   └── WelcomeScreen.vue
│       ├── store/
│       │   ├── auth.js (novo)
│       │   ├── catalog.js
│       │   └── motorcycles.js
│       └── App.vue (atualizado)
├── .env (novo)
├── .env.example (novo)
├── INICIO-RAPIDO.md (novo)
├── README-ACERVO.md (novo)
├── SETUP-POSTGRESQL.md (novo)
├── CHANGELOG.md (novo)
└── setup-acervo.sh (novo)
```

## 🔐 Segurança

### Implementado:
- ✅ Hash de senhas com bcrypt (10 rounds)
- ✅ JWT com secret configurável
- ✅ Token no localStorage (não em cookies)
- ✅ Validação de dados com Zod
- ✅ Middleware de autenticação
- ✅ Email único no banco
- ✅ .env no .gitignore

### Recomendações para Produção:
- 🔒 Trocar JWT_SECRET por valor aleatório forte
- 🔒 Usar HTTPS
- 🔒 Implementar refresh tokens
- 🔒 Adicionar rate limiting
- 🔒 Implementar logout no servidor
- 🔒 Adicionar expiração nos tokens JWT

## 📊 Estatísticas

### Código Adicionado:
- 8 novos arquivos no backend
- 3 novos componentes no frontend
- 1 novo Pinia store
- 4 arquivos de documentação
- 1 script de setup

### Dependências:
- Backend: +4 pacotes (pg, @fastify/jwt, bcrypt, dotenv)
- Backend: -1 pacote (better-sqlite3)

## 🎨 Mudanças Visuais

### Página Home:
- Card principal explicativo
- Lista de features com ícones
- Imagem de exemplo
- Alert informativo sobre acesso
- Botões grandes e chamativos
- Estatísticas visuais (3 cards)

### Dialogs:
- Login: campos de email e senha
- Registro: nome, email, senha e confirmação
- Toggle de visibilidade de senha
- Validação em tempo real
- Mensagens de erro/sucesso
- Botão de trocar entre login/registro

## 🚀 Como Usar

### Setup Inicial:
```bash
./setup-acervo.sh
```

### Desenvolvimento:
```bash
# Terminal 1 - Backend
npm run dev

# Terminal 2 - Frontend
cd frontend && npm run dev
```

### Acesso:
1. http://localhost:5173
2. Clicar em "Iniciar"
3. Criar conta
4. Explorar catálogo

## ✅ Checklist de Implementação

- [x] Configurar PostgreSQL
- [x] Criar tabela de usuários
- [x] Implementar registro de usuários
- [x] Implementar login com JWT
- [x] Criar middleware de autenticação
- [x] Migrar rotas de motos para PostgreSQL
- [x] Criar HomePage no frontend
- [x] Criar LoginDialog
- [x] Criar RegisterDialog
- [x] Criar auth store no Pinia
- [x] Proteger rotas no frontend
- [x] Atualizar catalogService para acervo
- [x] Criar documentação completa
- [x] Criar script de setup
- [x] Testar fluxo completo

## 🎯 Resultado Final

Sistema transformado de uma **API simples de CRUD de motos** em um **Acervo Histórico Harley-Davidson** completo com:
- ✅ Autenticação obrigatória
- ✅ Banco de dados PostgreSQL
- ✅ Fichas técnicas detalhadas
- ✅ Interface moderna e responsiva
- ✅ Sistema de usuários robusto
- ✅ Documentação completa

---

**Data:** 15 de fevereiro de 2026
**Versão:** 2.0.0 - Acervo Histórico com Autenticação
