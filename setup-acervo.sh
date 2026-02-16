#!/bin/bash

echo "🏍️  Setup do Acervo Histórico Harley-Davidson"
echo "=============================================="
echo ""

# Cores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Verificar se PostgreSQL está instalado
echo "📊 Verificando PostgreSQL..."
if ! command -v psql &> /dev/null; then
    echo -e "${RED}❌ PostgreSQL não encontrado!${NC}"
    echo "Por favor, instale o PostgreSQL primeiro:"
    echo "  Ubuntu/Debian: sudo apt install postgresql postgresql-contrib"
    echo "  macOS: brew install postgresql@15"
    exit 1
fi
echo -e "${GREEN}✅ PostgreSQL instalado${NC}"
echo ""

# Criar banco de dados
echo "🗄️  Configurando banco de dados..."
sudo -u postgres psql -c "CREATE DATABASE harley_acervo;" 2>/dev/null || echo "  Banco de dados já existe"
sudo -u postgres psql -c "ALTER USER postgres PASSWORD 'postgres';" > /dev/null
echo -e "${GREEN}✅ Banco de dados configurado${NC}"
echo ""

# Verificar arquivo .env
if [ ! -f ".env" ]; then
    echo "📝 Criando arquivo .env..."
    cp .env.example .env
    echo -e "${GREEN}✅ Arquivo .env criado${NC}"
    echo -e "${YELLOW}⚠️  ATENÇÃO: Edite o arquivo .env e troque o JWT_SECRET antes de usar em produção!${NC}"
else
    echo -e "${GREEN}✅ Arquivo .env já existe${NC}"
fi
echo ""

# Instalar dependências do backend
echo "📦 Instalando dependências do backend..."
npm install
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Dependências do backend instaladas${NC}"
else
    echo -e "${RED}❌ Erro ao instalar dependências do backend${NC}"
    exit 1
fi
echo ""

# Instalar dependências do frontend
echo "📦 Instalando dependências do frontend..."
cd frontend
npm install
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Dependências do frontend instaladas${NC}"
else
    echo -e "${RED}❌ Erro ao instalar dependências do frontend${NC}"
    exit 1
fi
cd ..
echo ""

echo -e "${GREEN}✅ Setup concluído com sucesso!${NC}"
echo ""
echo "🚀 Para iniciar o sistema:"
echo ""
echo "Terminal 1 - Backend:"
echo "  npm run dev"
echo ""
echo "Terminal 2 - Frontend:"
echo "  cd frontend && npm run dev"
echo ""
echo "Depois acesse: http://localhost:5173"
echo ""
echo "📚 Documentação:"
echo "  - README-ACERVO.md - Guia completo do sistema"
echo "  - SETUP-POSTGRESQL.md - Configuração detalhada do PostgreSQL"
echo ""
