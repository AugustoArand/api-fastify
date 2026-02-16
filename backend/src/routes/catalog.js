import { pool } from '../db/postgres.js';

export default async function catalogRoutes(fastify, options) {

  // Obter todos os tipos de motores do banco
  fastify.get('/api/catalog/engines', async (request, reply) => {
    try {
      const result = await pool.query(`
        SELECT 
          et.id,
          et.name,
          et.description,
          COUNT(m.id) as count
        FROM engine_types et
        LEFT JOIN motorcycles m ON m.engine_type_id = et.id
        GROUP BY et.id, et.name, et.description
        ORDER BY et.name
      `);

      return {
        success: true,
        count: result.rows.length,
        data: result.rows
      };
    } catch (error) {
      console.error('Erro ao buscar tipos de motores:', error);
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

      const result = await pool.query(`
        SELECT m.*, et.name as engine_type_name
        FROM motorcycles m
        INNER JOIN engine_types et ON m.engine_type_id = et.id
        WHERE et.name = $1
        ORDER BY m.year DESC
      `, [type]);

      return {
        success: true,
        engineType: type,
        count: result.rows.length,
        motorcycles: result.rows
      };
    } catch (error) {
      console.error('Erro ao buscar motos por motor:', error);
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
      const result = await pool.query(`
        SELECT m.*, et.name as engine_type_name
        FROM motorcycles m
        LEFT JOIN engine_types et ON m.engine_type_id = et.id
        ORDER BY m.created_at DESC
      `);

      return {
        success: true,
        count: result.rows.length,
        data: result.rows
      };
    } catch (error) {
      console.error('Erro ao buscar catálogo:', error);
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

      const searchTerm = `%${q}%`;
      const result = await pool.query(`
        SELECT m.*, et.name as engine_type_name
        FROM motorcycles m
        LEFT JOIN engine_types et ON m.engine_type_id = et.id
        WHERE 
          m.model ILIKE $1 OR
          m.color ILIKE $1 OR
          m.engine ILIKE $1 OR
          et.name ILIKE $1
        ORDER BY m.year DESC
      `, [searchTerm]);

      return {
        success: true,
        query: q,
        count: result.rows.length,
        data: result.rows
      };
    } catch (error) {
      console.error('Erro ao buscar motos:', error);
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
      const engineTypesResult = await pool.query('SELECT COUNT(*) as total FROM engine_types');
      const motorcyclesResult = await pool.query('SELECT COUNT(*) as total FROM motorcycles');
      const yearsResult = await pool.query('SELECT MIN(year) as min_year, MAX(year) as max_year FROM motorcycles');

      return {
        success: true,
        data: {
          totalEngineTypes: parseInt(engineTypesResult.rows[0].total),
          totalMotorcycles: parseInt(motorcyclesResult.rows[0].total),
          yearRange: {
            min: yearsResult.rows[0].min_year,
            max: yearsResult.rows[0].max_year
          }
        }
      };
    } catch (error) {
      console.error('Erro ao buscar estatísticas:', error);
      reply.code(500);
      return {
        success: false,
        error: 'Erro ao buscar estatísticas',
        message: error.message
      };
    }
  });
}
