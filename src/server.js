import Fastify from 'fastify';
import fastifyStatic from '@fastify/static';
import fastifyView from '@fastify/view';
import ejs from 'ejs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import motorcycleRoutes from './routes/motorcycles.js';
import catalogRoutes from './routes/catalog.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const fastify = Fastify({
  logger: true
});

// Configurar arquivos estáticos
fastify.register(fastifyStatic, {
  root: join(__dirname, '../public'),
  prefix: '/'
});

// Configurar template engine
fastify.register(fastifyView, {
  engine: {
    ejs: ejs
  },
  root: join(__dirname, '../views')
});

// Registrar rotas da API
fastify.register(motorcycleRoutes);
fastify.register(catalogRoutes);

// Rota raiz
fastify.get('/', async (request, reply) => {
  return reply.view('index.ejs');
});

// Iniciar servidor
const start = async () => {
  try {
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
