# Configuração do PostgreSQL

## 1. Instalar PostgreSQL

### Ubuntu/Debian
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
```

### macOS
```bash
brew install postgresql@15
brew services start postgresql@15
```

### Windows
Baixe o instalador em: https://www.postgresql.org/download/windows/

## 2. Criar o banco de dados

```bash
# Acessar o PostgreSQL
sudo -u postgres psql

# Criar o banco de dados
CREATE DATABASE harley_acervo;

# Criar usuário (opcional, se quiser usar outro usuário)
CREATE USER harley_user WITH PASSWORD 'sua_senha_aqui';

# Conceder permissões
GRANT ALL PRIVILEGES ON DATABASE harley_acervo TO harley_user;

# Sair
\q
```

## 3. Configurar variáveis de ambiente

Edite o arquivo `.env` na raiz do projeto backend:

```env
PORT=3000
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/harley_acervo
JWT_SECRET=seu_secret_super_seguro_aqui_mude_em_producao
```

**⚠️ IMPORTANTE:** Troque o `JWT_SECRET` por uma string aleatória e segura em produção!

## 4. Instalar dependências

```bash
# No diretório raiz do backend
npm install
```

## 5. Iniciar o servidor

```bash
npm run dev
```

O servidor irá:
- Conectar ao PostgreSQL
- Criar as tabelas automaticamente (users e motorcycles)
- Iniciar na porta 3000

## 6. Estrutura das tabelas

### Tabela `users`
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Tabela `motorcycles`
```sql
CREATE TABLE motorcycles (
  id SERIAL PRIMARY KEY,
  model VARCHAR(255) NOT NULL,
  year INTEGER NOT NULL,
  color VARCHAR(100) NOT NULL,
  engine VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 7. Testar a API

### Registro de usuário
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@email.com",
    "password": "123456"
  }'
```

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joao@email.com",
    "password": "123456"
  }'
```

### Verificar token (copie o token do login)
```bash
curl http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

## Troubleshooting

### Erro de conexão
- Verifique se o PostgreSQL está rodando: `sudo systemctl status postgresql`
- Verifique a URL de conexão no arquivo `.env`
- Verifique se o banco de dados foi criado

### Erro de permissões
```bash
# Acessar PostgreSQL como superusuário
sudo -u postgres psql harley_acervo

# Conceder todas as permissões
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO postgres;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO postgres;
```

### Resetar o banco
```bash
sudo -u postgres psql
DROP DATABASE harley_acervo;
CREATE DATABASE harley_acervo;
\q
```
