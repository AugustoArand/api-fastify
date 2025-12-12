# 🏍️ Harley Davidson - API RESTful

API RESTful para gerenciamento de cadastros de motos Harley Davidson, construída com Fastify e Zod.

## 🚀 Tecnologias Utilizadas

- **Fastify** - Framework web rápido e eficiente
- **Zod** - Validação de schemas e tipagem
- **Better-SQLite3** - Banco de dados SQLite simples e rápido
- **EJS** - Template engine para o frontend
- **CSS3** - Estilização moderna com gradientes e animações

## 📋 Funcionalidades

- ✅ CRUD completo de motos Harley Davidson
- ✅ Validação de dados com Zod
- ✅ Interface web moderna e responsiva
- ✅ Banco de dados SQLite persistente
- ✅ API RESTful bem estruturada

## 🔧 Instalação

```bash
# Instalar dependências
npm install
```

## ▶️ Executar

```bash
# Modo desenvolvimento (com auto-reload)
npm run dev

# Modo produção
npm start
```

O servidor estará disponível em `http://localhost:3000`

## 📡 Endpoints da API

### Criar uma moto
```http
POST /api/motorcycles
Content-Type: application/json

{
  "model": "Street 750",
  "year": 2024,
  "color": "Preta",
  "engine": "Revolution X V-Twin",
  "price": 45000.00,
  "description": "Moto urbana ágil e potente"
}
```

### Listar todas as motos
```http
GET /api/motorcycles
```

### Obter uma moto específica
```http
GET /api/motorcycles/:id
```

### Atualizar uma moto
```http
PUT /api/motorcycles/:id
Content-Type: application/json

{
  "price": 47000.00
}
```

### Deletar uma moto
```http
DELETE /api/motorcycles/:id
```

## 🎨 Frontend

O frontend foi desenvolvido com HTML, CSS e JavaScript vanilla, oferecendo:

- Interface limpa e moderna com tema escuro
- Formulário de cadastro com validação
- Listagem de motos com cards estilizados
- Funcionalidades de edição e exclusão
- Design responsivo para mobile

## 🗄️ Estrutura do Banco de Dados

```sql
CREATE TABLE motorcycles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  model TEXT NOT NULL,
  year INTEGER NOT NULL,
  color TEXT NOT NULL,
  engine TEXT NOT NULL,
  price REAL NOT NULL,
  description TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

## 📁 Estrutura do Projeto

```
api-fastify/
├── src/
│   ├── db/
│   │   └── database.js       # Configuração do banco de dados
│   ├── routes/
│   │   └── motorcycles.js    # Rotas da API
│   ├── schemas/
│   │   └── motorcycle.js     # Schemas Zod para validação
│   └── server.js             # Arquivo principal do servidor
├── public/
│   ├── css/
│   │   └── style.css         # Estilos do frontend
│   └── js/
│       └── app.js            # Lógica do frontend
├── views/
│   └── index.ejs             # Template HTML principal
├── package.json
└── README.md
```

## 🎯 Validações

A API utiliza Zod para validar:

- **Modelo**: String não vazia
- **Ano**: Número inteiro entre 1903 e ano atual + 1
- **Cor**: String não vazia
- **Motor**: String não vazia
- **Preço**: Número positivo
- **Descrição**: String opcional

## 🔒 Tratamento de Erros

A API retorna erros apropriados:

- `400` - Dados inválidos ou malformados
- `404` - Recurso não encontrado
- `500` - Erro interno do servidor

## 👨‍💻 Desenvolvimento

O projeto utiliza módulos ES6 e está configurado com `type: "module"` no package.json.

Para desenvolvimento, use `npm run dev` que utiliza a flag `--watch` do Node.js para reiniciar automaticamente o servidor quando houver alterações.
