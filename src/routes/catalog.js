import { 
  getEngineTypes, 
  getMotorcyclesByEngine, 
  getAllMotorcycles,
  searchMotorcycles,
  getCatalogStats
} from '../services/catalogService.js';

export default async function catalogRoutes(fastify, options) {
  
  // Obter todos os tipos de motores
  fastify.get('/api/catalog/engines', async (request, reply) => {
    try {
      const engines = getEngineTypes();
      return {
        success: true,
        count: engines.length,
        data: engines
      };
    } catch (error) {
      reply.code(500);
      return { 
        success: false, 
        error: 'Erro ao buscar tipos de motores',
        message: error.message 
      };
    }
  });

  // Obter motos por tipo de motor
  fastify.get('/api/catalog/engine/:type', async (request, reply) => {
    try {
      const { type } = request.params;
      const result = getMotorcyclesByEngine(type);
      
      if (!result) {
        reply.code(404);
        return {
          success: false,
          error: 'Tipo de motor não encontrado'
        };
      }

      return {
        success: true,
        ...result
      };
    } catch (error) {
      reply.code(500);
      return { 
        success: false, 
        error: 'Erro ao buscar motos',
        message: error.message 
      };
    }
  });

  // Obter todas as motos do catálogo
  fastify.get('/api/catalog/all', async (request, reply) => {
    try {
      const motorcycles = getAllMotorcycles();
      return {
        success: true,
        count: motorcycles.length,
        data: motorcycles
      };
    } catch (error) {
      reply.code(500);
      return { 
        success: false, 
        error: 'Erro ao buscar catálogo',
        message: error.message 
      };
    }
  });

  // Buscar motos por termo
  fastify.get('/api/catalog/search', async (request, reply) => {
    try {
      const { q } = request.query;
      
      if (!q) {
        reply.code(400);
        return {
          success: false,
          error: 'Parâmetro de busca (q) é obrigatório'
        };
      }

      const results = searchMotorcycles(q);
      return {
        success: true,
        query: q,
        count: results.length,
        data: results
      };
    } catch (error) {
      reply.code(500);
      return { 
        success: false, 
        error: 'Erro ao buscar motos',
        message: error.message 
      };
    }
  });

  // Obter estatísticas do catálogo
  fastify.get('/api/catalog/stats', async (request, reply) => {
    try {
      const stats = getCatalogStats();
      return {
        success: true,
        data: stats
      };
    } catch (error) {
      reply.code(500);
      return { 
        success: false, 
        error: 'Erro ao buscar estatísticas',
        message: error.message 
      };
    }
  });
}
