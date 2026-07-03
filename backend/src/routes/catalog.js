import { Motorcycle } from '../db/models/Motorcycle.js';
import { EngineType } from '../db/models/EngineType.js';

export default async function catalogRoutes(fastify, options) {
  // Obter todos os tipos de motores com contagem de motos
  fastify.get('/api/catalog/engines', async (request, reply) => {
    try {
      const engineTypes = await EngineType.find().sort({ name: 1 }).lean();

      const result = await Promise.all(
        engineTypes.map(async (et) => {
          const count = await Motorcycle.countDocuments({ engineType: et._id });
          return { ...et, count };
        })
      );

      return {
        success: true,
        count: result.length,
        data: result,
      };
    } catch (error) {
      console.error('Erro ao buscar tipos de motores:', error);
      reply.code(500);
      return { success: false, error: 'Erro ao buscar tipos de motores', message: error.message };
    }
  });

  // Obter motos por nome do tipo de motor
  fastify.get('/api/catalog/engine/:type', async (request, reply) => {
    try {
      const { type } = request.params;

      const engineType = await EngineType.findOne({ name: type });

      if (!engineType) {
        return { success: true, engineType: type, count: 0, motorcycles: [] };
      }

      const motorcycles = await Motorcycle.find({ engineType: engineType._id })
        .populate('engineType', 'name')
        .sort({ year: -1 });

      return {
        success: true,
        engineType: type,
        count: motorcycles.length,
        motorcycles,
      };
    } catch (error) {
      console.error('Erro ao buscar motos por motor:', error);
      reply.code(500);
      return { success: false, error: 'Erro ao buscar motos', message: error.message };
    }
  });

  // Obter todas as motos do catálogo
  fastify.get('/api/catalog/all', async (request, reply) => {
    try {
      const motorcycles = await Motorcycle.find()
        .populate('engineType', 'name')
        .sort({ createdAt: -1 });

      return {
        success: true,
        count: motorcycles.length,
        data: motorcycles,
      };
    } catch (error) {
      console.error('Erro ao buscar catálogo:', error);
      reply.code(500);
      return { success: false, error: 'Erro ao buscar catálogo', message: error.message };
    }
  });

  // Buscar motos por termo
  fastify.get('/api/catalog/search', async (request, reply) => {
    try {
      const { q } = request.query;

      if (!q) {
        reply.code(400);
        return { success: false, error: 'Parâmetro de busca (q) é obrigatório' };
      }

      const regex = new RegExp(q, 'i');

      // Buscar engine types que batem com a busca
      const matchingEngineTypes = await EngineType.find({ name: regex }).select('_id');
      const engineTypeIds = matchingEngineTypes.map((et) => et._id);

      const motorcycles = await Motorcycle.find({
        $or: [
          { model: regex },
          { color: regex },
          { engine: regex },
          { engineType: { $in: engineTypeIds } },
        ],
      })
        .populate('engineType', 'name')
        .sort({ year: -1 });

      return {
        success: true,
        query: q,
        count: motorcycles.length,
        data: motorcycles,
      };
    } catch (error) {
      console.error('Erro ao buscar motos:', error);
      reply.code(500);
      return { success: false, error: 'Erro ao buscar motos', message: error.message };
    }
  });

  // Obter estatísticas do catálogo
  fastify.get('/api/catalog/stats', async (request, reply) => {
    try {
      const [totalEngineTypes, totalMotorcycles, yearRange] = await Promise.all([
        EngineType.countDocuments(),
        Motorcycle.countDocuments(),
        Motorcycle.aggregate([
          {
            $group: {
              _id: null,
              min_year: { $min: '$year' },
              max_year: { $max: '$year' },
            },
          },
        ]),
      ]);

      return {
        success: true,
        data: {
          totalEngineTypes,
          totalMotorcycles,
          yearRange: yearRange.length > 0
            ? { min: yearRange[0].min_year, max: yearRange[0].max_year }
            : { min: null, max: null },
        },
      };
    } catch (error) {
      console.error('Erro ao buscar estatísticas:', error);
      reply.code(500);
      return { success: false, error: 'Erro ao buscar estatísticas', message: error.message };
    }
  });
}
