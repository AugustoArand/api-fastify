#!/bin/bash

echo "🏍️  Harley Davidson - Setup do Sistema"
echo "========================================"
echo ""

# Verificar se está na pasta correta
if [ ! -f "package.json" ]; then
    echo "❌ Execute este script na pasta raiz do projeto!"
    exit 1
fi

# Backend
echo "📦 Instalando dependências do backend..."
npm install

echo "📦 Instalando @fastify/cors..."
npm install @fastify/cors

# Frontend
echo ""
echo "📦 Instalando dependências do frontend..."
cd frontend
npm install

echo ""
echo "✅ Instalação concluída!"
echo ""
echo "🚀 Para iniciar o sistema:"
echo ""
echo "Terminal 1 - Backend:"
echo "  npm run dev"
echo ""
echo "Terminal 2 - Frontend:"
echo "  cd frontend"
echo "  npm run dev"
echo ""
echo "Acesse: http://localhost:5173"
echo ""
