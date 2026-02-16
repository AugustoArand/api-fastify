# 🏍️ Acervo Histórico Harley-Davidson

Sistema completo com autenticação, catálogo de motos e fichas técnicas detalhadas.

## 📋 Pré-requisitos

- Node.js 20.x
- PostgreSQL 12+ instalado e rodando
- npm ou yarn

## 🚀 Configuração Rápida

### 1. Configurar PostgreSQL

```bash
# Criar o banco de dados
sudo -u postgres psql
CREATE DATABASE harley_acervo;
\q
```

### 2. Configurar Backend

```bash
# Já está configurado! As dependências foram instaladas.
# Verifique o arquivo .env na raiz do projeto:
PORT=3000
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/harley_acervo
JWT_SECRET=seu_secret_super_seguro_aqui_mude_em_producao

# ⚠️ IMPORTANTE: Troque o JWT_SECRET em produção!
```

### 3. Configurar Frontend

```bash
cd frontend
npm install
```

### 4. Iniciar o Sistema

**Terminal 1 - Backend:**
```bash
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

## 🎯 Como Usar

### 1. Tela de Boas-vindas
- Clique em **"Iniciar"**

### 2. Página Home - Acervo Histórico
- Informações sobre o acervo
- **Criar Conta**: Registre-se para ter acesso ao catálogo
- **Já tenho conta**: Faça login com suas credenciais

### 3. Após Login
- Acesso ao **Catálogo por Motor**
- Visualização de fichas técnicas completas
- 12 tipos de motores diferentes
- Mais de 60 modelos históricos

## 🔐 Sistema de Autenticação

### Registro
- Nome completo (mínimo 3 caracteres)
- Email válido
- Senha (mínimo 6 caracteres)

### Login
- Email e senha cadastrados
- Token JWT armazenado no navegador
- Sessão mantida após refresh

### Segurança
- Senhas criptografadas com bcrypt
- Token JWT para autenticação
- Rotas protegidas no backend
- Validação com Zod

## 📊 Banco de Dados

### Tabelas Criadas Automaticamente

**users**
- id (SERIAL)
- name (VARCHAR)
- email (VARCHAR - UNIQUE)
- password (VARCHAR - Hash bcrypt)
- created_at (TIMESTAMP)

**motorcycles**
- id (SERIAL)
- model (VARCHAR)
- year (INTEGER)
- color (VARCHAR)
- engine (VARCHAR)
- price (DECIMAL)
- description (TEXT)
- created_at (TIMESTAMP)

## 🛠️ Tecnologias

### Backend
- Fastify 4.25
- PostgreSQL (pg 8.11)
- @fastify/jwt 8.0
- bcrypt 5.1
- Zod 3.22
- dotenv 16.4

### Frontend
- Vue.js 3
- Vuetify 3
- Pinia (state management)
- Axios
- Vite

## 🎨 Features

### Catálogo
- 12 tipos de motores
- Fichas técnicas detalhadas:
  - Potência com RPM
  - Torque com RPM
  - Peso
  - Capacidade do tanque
  - Transmissão
  - Imagens de alta qualidade

### Autenticação
- Sistema completo de registro e login
- Proteção de rotas
- Token JWT
- Persistência de sessão

### Interface
- Design Harley-Davidson
- Tema dark com laranja (#FF6B00)
- Responsivo
- Animações suaves

## 📝 Endpoints da API

### Autenticação
- `POST /api/auth/register` - Criar conta
- `POST /api/auth/login` - Fazer login
- `GET /api/auth/me` - Verificar usuário (protegida)

### Catálogo
- `GET /api/catalog/engines` - Listar tipos de motores
- `GET /api/catalog/engines/:engineType` - Motos por motor
- `GET /api/catalog/search?q=termo` - Buscar motos
- `GET /api/catalog/stats` - Estatísticas do catálogo

### Motos (CRUD)
- `GET /api/motorcycles` - Listar todas
- `POST /api/motorcycles` - Criar nova
- `PUT /api/motorcycles/:id` - Atualizar
- `DELETE /api/motorcycles/:id` - Deletar

## 🐛 Troubleshooting

### Erro de conexão PostgreSQL
```bash
# Verificar se está rodando
sudo systemctl status postgresql

# Iniciar se necessário
sudo systemctl start postgresql
```

### Erro de autenticação no banco
```bash
# Verificar permissões
sudo -u postgres psql harley_acervo
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO postgres;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO postgres;
```

### Frontend não conecta ao backend
- Verifique se o backend está rodando na porta 3000
- Verifique o proxy no `vite.config.js`

### Token inválido
- Limpe o localStorage do navegador
- Faça logout e login novamente

## 📚 Documentação Adicional

- [SETUP-POSTGRESQL.md](./SETUP-POSTGRESQL.md) - Configuração detalhada do PostgreSQL
- [catalogService.js](./src/services/catalogService.js) - Catálogo completo de motos

## 👥 Contribuindo

Este é um projeto educacional. Sinta-se livre para:
- Adicionar novos modelos ao catálogo
- Melhorar a interface
- Adicionar novas features

## 📄 Licença

ISC
