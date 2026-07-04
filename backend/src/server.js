import Fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import fastifyJwt from '@fastify/jwt';
import dotenv from 'dotenv';
import { connectDatabase } from './db/mongoose.js';
import { seedEngineTypes } from './db/models/EngineType.js';
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
  'http://localhost:5173',                              // Desenvolvimento local
  'https://harley-davidson-frontend.onrender.com',      // Frontend Render (atual)
  'https://api-fastify-harley-front.onrender.com'       // Frontend Render (legado)
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
    database: 'MongoDB',
    description: 'API RESTful para gerenciamento de motos Harley Davidson',
    endpoints: {
      motorcycles: '/api/motorcycles',
      catalog: '/api/catalog',
      engineTypes: '/api/engine-types',
      auth: '/api/auth'
    }
  };
});

// Iniciar servidor
const start = async () => {
  try {
    // Conectar ao MongoDB
    await connectDatabase();

    // Popular dados iniciais de tipos de motor
    await seedEngineTypes();

    const port = parseInt(process.env.PORT || '3000');
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
