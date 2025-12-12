# 🏍️ Harley Davidson - API RESTful + Catálogo por Motor

API RESTful completa para gerenciamento de cadastros de motos Harley Davidson, com **Catálogo Organizado por Tipo de Motor**. Construída com Fastify, Zod e Better-SQLite3.

## 🚀 Tecnologias Utilizadas

- **Fastify** - Framework web rápido e eficiente
- **Zod** - Validação de schemas e tipagem
- **Better-SQLite3** - Banco de dados SQLite simples e rápido
- **EJS** - Template engine para o frontend
- **CSS3** - Estilização moderna com gradientes e animações

## 📋 Funcionalidades

### 🔧 CRUD de Motos
- ✅ CRUD completo de motos Harley Davidson
- ✅ Validação de dados com Zod
- ✅ Interface web moderna e responsiva
- ✅ Banco de dados SQLite persistente
- ✅ API RESTful bem estruturada

### 📚 Catálogo por Tipo de Motor
- ✅ Catálogo completo organizado por tipo de motor (2000-2024)
- ✅ **Twin Cam 88** - Motores icônicos dos anos 2000 (1450cc)
- ✅ **Twin Cam 96** - Era de maior cilindrada 2006-2011 (1584cc)
- ✅ **Twin Cam 103** - Potência aumentada 2012-2016 (1690cc)
- ✅ **Sportster Evolution** - Linha Sportster clássica 883/1200
- ✅ **V-Rod Revolution** - Motor revolucionário refrigerado a líquido
- ✅ **Milwaukee-Eight 107** - Touring e Cruiser modernos (1746cc)
- ✅ **Milwaukee-Eight 114** - Touring e Cruiser potentes (1868cc)
- ✅ **Milwaukee-Eight 117** - Linha CVO personalizada (1923cc)
- ✅ **Revolution Max 1250** - Adventure e Sport (1252cc)
- ✅ **Revolution Max 1250T** - Sportster moderna (975cc)
- ✅ **Street 500/750** - Linha urbana (494cc e 749cc)
- ✅ **Screamin' Eagle** - Performance aprimorada
- ✅ Mais de 50 modelos de 2000 a 2024
- ✅ Busca por modelo, motor, categoria ou descrição
- ✅ Estatísticas do catálogo
- ✅ Interface modal interativa
- ✅ Informações técnicas completas (potência, torque, cilindrada)

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

### CRUD de Motos

#### Criar uma moto
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

#### Listar todas as motos
```http
GET /api/motorcycles
```

#### Obter uma moto específica
```http
GET /api/motorcycles/:id
```

#### Atualizar uma moto
```http
PUT /api/motorcycles/:id
Content-Type: application/json

{
  "price": 47000.00
}
```

#### Deletar uma moto
```http
DELETE /api/motorcycles/:id
```

### Catálogo por Motor
### Catálogo por Motor

#### Obter todos os tipos de motores
```http
GET /api/catalog/engines
```

**Resposta:**
```json
{
  "success": true,
  "count": 7,
  "data": [
    { "name": "Milwaukee-Eight 107", "count": 4 },
    { "name": "Milwaukee-Eight 114", "count": 4 },
    { "name": "Milwaukee-Eight 117", "count": 3 },
    { "name": "Revolution Max 1250", "count": 3 },
    { "name": "Revolution Max 1250T", "count": 1 },
    { "name": "Street 500/750", "count": 2 },
    { "name": "Screamin' Eagle", "count": 2 }
  ]
}
```

#### Obter motos por tipo de motor
```http
GET /api/catalog/engine/Milwaukee-Eight%20107
```

**Resposta:**
```json
{
  "success": true,
  "engine": "Milwaukee-Eight 107",
  "count": 4,
  "motorcycles": [
    {
      "model": "Street Glide",
      "year": 2024,
      "engine": "Milwaukee-Eight 107",
      "displacement": "1746cc",
      "power": "92 cv",
      "torque": "145 Nm",
      "price": 135000,
      "category": "Touring",
      "image": "...",
      "description": "Touring clássico..."
    }
  ]
}
```

#### Obter todas as motos do catálogo
```http
GET /api/catalog/all
```

#### Buscar motos no catálogo
```http
GET /api/catalog/search?q=sportster
```

**Query Parameters:**
- `q` - Termo de busca (obrigatório)

#### Obter estatísticas do catálogo
```http
GET /api/catalog/stats
```

**Resposta:**
```json
{
  "success": true,
  "data": {
    "totalEngineTypes": 7,
    "totalMotorcycles": 19,
    "categories": {
      "Touring": 6,
      "Cruiser": 6,
      "CVO": 3,
      "Adventure": 2,
      "Sport": 2
    },
    "priceRange": {
      "min": 38000,
      "max": 240000
    }
  }
}
```

## 🎨 Frontend

O frontend foi desenvolvido com HTML, CSS e JavaScript vanilla, oferecendo:

### CRUD de Motos
- Interface limpa e moderna com tema escuro
- Formulário de cadastro com validação
- Listagem de motos com cards estilizados
- Funcionalidades de edição e exclusão
- Design responsivo para mobile

### Modal de Catálogo por Motor
- Botão "📚 Catálogo por Motor" no cabeçalho (tema laranja Harley)
- Modal interativo com seleção de motores
- Estatísticas do catálogo (tipos de motor, total de motos, categorias)
- 7 tipos de motores organizados em grid
- Filtro por tipo de motor específico
- Campo de busca por palavra-chave
- Cards de resultados com:
  - Imagem da moto
  - Modelo e ano
  - Especificações técnicas (motor, cilindrada, potência, torque)
  - Preço formatado
  - Categoria
  - Descrição
- Design responsivo e otimizado

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
│   │   ├── motorcycles.js    # Rotas CRUD da API
│   │   └── catalog.js        # Rotas do catálogo por motor
│   ├── services/
│   │   └── catalogService.js # Serviço de catálogo por motor
│   ├── schemas/
│   │   └── motorcycle.js     # Schemas Zod para validação
│   └── server.js             # Arquivo principal do servidor
├── public/
│   ├── css/
│   │   └── style.css         # Estilos (CRUD + Modal Catálogo)
│   └── js/
│       └── app.js            # Lógica (CRUD + Catálogo)
├── views/
│   └── index.ejs             # Template HTML (CRUD + Modal)
├── package.json
└── README.md
```

## 🏍️ Catálogo de Motores

O sistema inclui um catálogo completo com mais de 50 motos organizadas por 12 tipos de motores, abrangendo 25 anos de história Harley-Davidson (2000-2024):

### Twin Cam 88 (1450cc) - 4 modelos (2000-2003)
- Fat Boy, Road King Classic, Heritage Softail Classic, Dyna Super Glide

### Twin Cam 96 (1584cc) - 4 modelos (2006-2010)
- Street Glide, Fat Bob, Road King, Softail Deluxe

### Twin Cam 103 (1690cc) - 4 modelos (2012-2016)
- Ultra Limited, Heritage Softail Classic, Street Glide Special, Road Glide Ultra

### Sportster Evolution (883/1200cc) - 5 modelos (2000-2016)
- Sportster 883, Sportster 1200 Custom, Iron 883, Forty-Eight, Roadster 1200

### V-Rod Revolution (1130/1250cc) - 3 modelos (2002-2009)
- V-Rod, Night Rod Special, V-Rod Muscle

### Milwaukee-Eight 107 (1746cc) - 4 modelos (2024)
- Street Glide, Road King, Softail Standard, Heritage Classic

### Milwaukee-Eight 114 (1868cc) - 4 modelos (2024)
- Road Glide Limited, Ultra Limited, Fat Boy 114, Low Rider S

### Milwaukee-Eight 117 (1923cc) - 3 modelos CVO (2024)
- CVO Road Glide, CVO Street Glide, CVO Road King

### Revolution Max 1250 (1252cc) - 3 modelos (2024)
- Pan America 1250, Pan America 1250 Special, Sportster S

### Revolution Max 1250T (975cc) - 1 modelo (2024)
- Nightster

### Street 500/750 (494/749cc) - 5 modelos (2015-2023)
- Street 500, Street 750, Street Rod 750

### Screamin' Eagle (Performance) - 2 modelos (2024)
- Road Glide ST, Street Bob 114

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

## ⚠️ Considerações de Segurança

Esta é uma aplicação de demonstração. Para uso em produção, considere adicionar:

- **Rate Limiting**: Implementar limitação de taxa de requisições usando `@fastify/rate-limit`
- **Autenticação**: Adicionar autenticação JWT ou OAuth
- **CORS**: Configurar CORS adequadamente com `@fastify/cors`
- **HTTPS**: Utilizar certificados SSL/TLS em produção
- **Validação de entrada**: A validação com Zod já está implementada
- **Sanitização de SQL**: Queries parametrizadas já estão implementadas

## 👨‍💻 Desenvolvimento

O projeto utiliza módulos ES6 e está configurado com `type: "module"` no package.json.

Para desenvolvimento, use `npm run dev` que utiliza a flag `--watch` do Node.js para reiniciar automaticamente o servidor quando houver alterações.

## 📝 Notas

- Catálogo histórico abrangendo 25 anos de Harley-Davidson (2000-2024)
- Inclui motores icônicos: Twin Cam 88/96/103, Evolution, V-Rod Revolution
- Todas as imagens do catálogo usam placeholders do Unsplash
- O catálogo inclui informações técnicas reais dos modelos
- Os preços são estimativas em reais (R$) ajustadas por inflação e ano
- Mais de 50 modelos organizados por 12 tipos de motores diferentes
- Sistema facilmente expansível com novos modelos e períodos
