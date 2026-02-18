import Fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import fastifyJwt from '@fastify/jwt';
import dotenv from 'dotenv';
import { initDatabase } from './db/postgres.js';
import motorcycleRoutes from './routes/motorcycles.js';
import catalogRoutes from './routes/catalog.js';
import engineTypeRoutes from './routes/engineTypes.js';
import { authRoutes } from './routes/auth.js';

dotenv.config();

const fastify = Fastify({
  logger: true
});

// Configurar CORS para permitir requisições do frontend
const allowedOrigins = [
  'http://localhost:5173',  // Desenvolvimento local
  'https://harley-davidson-frontend.onrender.com',  // Desenvolvimento local alternativo
  'https://harley-davidson-frontend.onrender.com'  // Produção - AJUSTE COM SUA URL
];

fastify.register(fastifyCors, {
  origin: (origin, cb) => {
    if (!origin || allowedOrigins.includes(origin)) {
      cb(null, true);
    } else {
      cb(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
});

// Configurar JWT
fastify.register(fastifyJwt, {
  secret: process.env.JWT_SECRET || 'seu_secret_aqui_mude_em_producao'
});

// Decorador para autenticação
fastify.decorate('authenticate', async function (request, reply) {
  try {
    await request.jwtVerify();
  } catch (err) {
    reply.code(401).send({ error: 'Token inválido ou expirado' });
  }
});

// Registrar rotas
fastify.register(authRoutes, { prefix: '/api/auth' });
fastify.register(motorcycleRoutes);
fastify.register(catalogRoutes);
fastify.register(engineTypeRoutes);

// Rota raiz da API
fastify.get('/', async (request, reply) => {
  return {
    name: 'Harley Davidson API',
    version: '1.0.0',
    description: 'API RESTful para gerenciamento de motos Harley Davidson',
    endpoints: {
      motorcycles: '/api/motorcycles',
      catalog: '/api/catalog'
    }
  };
});

// Iniciar servidor
const start = async () => {
  try {
    // Inicializar banco de dados
    await initDatabase();

    const port = process.env.PORT || 3000;
    const host = process.env.HOST || '0.0.0.0';

    await fastify.listen({ port, host });
    console.log(`\n🏍️  Servidor Harley Davidson rodando em http://localhost:${port}`);
    console.log(`📝 Acesse o gerenciador de motos no navegador\n`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
