# 🏍️ INÍCIO RÁPIDO - Harley Davidson Vue.js

## ⚡ Setup Rápido (Recomendado)

```bash
# 1. Executar script de setup automático
./setup.sh

# 2. Abrir dois terminais

# Terminal 1 - Backend
npm run dev

# Terminal 2 - Frontend  
cd frontend
npm run dev
```

## 🌐 Acessar

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000

---

## 📝 Setup Manual (Alternativo)

### Backend
```bash
npm install
npm install @fastify/cors
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

---

## ✅ Checklist

- [ ] Backend rodando na porta 3000
- [ ] Frontend rodando na porta 5173
- [ ] Navegador aberto em http://localhost:5173
- [ ] Console sem erros

---

## 📚 Documentação

- **GUIA-MIGRACAO.md** - Guia completo da migração
- **ANTES-E-DEPOIS.md** - Comparação detalhada
- **README-COMPLETO.md** - Documentação completa
- **frontend/README.md** - Documentação do frontend

---

## 🆘 Problemas?

### Backend não inicia
```bash
# Reinstalar dependências
rm -rf node_modules package-lock.json
npm install
npm install @fastify/cors
```

### Frontend não inicia
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

### Porta em uso
```bash
# Matar processos nas portas
lsof -ti:3000 | xargs kill -9  # Backend
lsof -ti:5173 | xargs kill -9  # Frontend
```

---

## 🎯 O Que Foi Migrado

✅ Tela de boas-vindas animada  
✅ Formulário de cadastro de motos  
✅ Lista de motos com edição/exclusão  
✅ Catálogo por tipo de motor  
✅ Busca no catálogo  
✅ Estatísticas  
✅ Design moderno com Vuetify  
✅ Totalmente responsivo  

---

## 🚀 Próximos Passos

1. Testar todas as funcionalidades
2. Personalizar tema/cores (src/plugins/vuetify.js)
3. Adicionar mais funcionalidades
4. Deploy em produção

---

**Desenvolvido com Vue.js 3 + Vuetify 3** 🎨
