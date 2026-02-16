# 🏍️ Início Rápido - Acervo Harley-Davidson

## Setup Automático (Recomendado)

```bash
./setup-acervo.sh
```

Este script irá:
- ✅ Verificar PostgreSQL
- ✅ Criar banco de dados `harley_acervo`
- ✅ Configurar senha do PostgreSQL
- ✅ Instalar todas as dependências
- ✅ Criar arquivo .env

## Iniciar o Sistema

### Terminal 1 - Backend (porta 3000)
```bash
npm run dev
```

### Terminal 2 - Frontend (porta 5173)
```bash
cd frontend
npm run dev
```

### Acessar
Abra o navegador em: **http://localhost:5173**

## Fluxo de Uso

1. **Tela de Boas-vindas** 
   - Clique em "Iniciar"

2. **Página Home - Acervo Histórico**
   - Leia sobre o acervo
   - Clique em "Criar Conta"

3. **Registro**
   - Nome completo
   - Email
   - Senha (mín. 6 caracteres)

4. **Login automático após registro**
   - Acesso liberado ao catálogo

5. **Explorar o Catálogo**
   - Clique em "Catálogo por Motor"
   - Escolha um tipo de motor
   - Veja as fichas técnicas completas

## Tecnologias

**Backend:**
- Fastify + PostgreSQL + JWT + bcrypt

**Frontend:**
- Vue 3 + Vuetify 3 + Pinia + Axios

## Estrutura do Sistema

```
Tela de Boas-vindas
         ↓ [Iniciar]
    Página Home
         ↓ [Criar Conta / Login]
   Sistema Principal
         ↓ [Catálogo por Motor]
  Fichas Técnicas das Motos
```

## Documentação Completa

- **README-ACERVO.md** - Documentação completa
- **SETUP-POSTGRESQL.md** - Configuração detalhada do PostgreSQL

## Primeiro Acesso Recomendado

1. Criar conta com email: `admin@harley.com`
2. Senha: `admin123`
3. Explorar o catálogo completo
4. Ver todas as categorias de motores
5. Consultar fichas técnicas detalhadas

---

**Observação:** Este é um sistema de acervo/catálogo. Não é uma loja - não há preços ou compras, apenas informações técnicas históricas das motos Harley-Davidson de 2000 a 2024.
