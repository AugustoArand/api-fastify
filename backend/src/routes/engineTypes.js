import { pool } from '../db/postgres.js';

export default async function engineTypeRoutes(fastify, options) {
    // Listar todos os tipos de motor
    fastify.get('/api/engine-types', async (request, reply) => {
        try {
            const result = await pool.query(
                'SELECT * FROM engine_types ORDER BY name'
            );
            return reply.send(result.rows);
        } catch (error) {
            console.error('Erro ao listar tipos de motor:', error);
            return reply.code(500).send({ error: 'Erro ao listar tipos de motor' });
        }
    });

    // Obter um tipo de motor por ID
    fastify.get('/api/engine-types/:id', async (request, reply) => {
        try {
            const { id } = request.params;
            const result = await pool.query(
                'SELECT * FROM engine_types WHERE id = $1',
                [id]
            );

            if (result.rows.length === 0) {
                return reply.code(404).send({ error: 'Tipo de motor não encontrado' });
            }

            return reply.send(result.rows[0]);
        } catch (error) {
            console.error('Erro ao buscar tipo de motor:', error);
            return reply.code(500).send({ error: 'Erro ao buscar tipo de motor' });
        }
    });

    // Listar motos por tipo de motor
    fastify.get('/api/engine-types/:id/motorcycles', async (request, reply) => {
        try {
            const { id } = request.params;
            const result = await pool.query(
                `SELECT m.*, et.name as engine_type_name 
         FROM motorcycles m 
         LEFT JOIN engine_types et ON m.engine_type_id = et.id 
         WHERE m.engine_type_id = $1 
         ORDER BY m.year DESC`,
                [id]
            );

            return reply.send(result.rows);
        } catch (error) {
            console.error('Erro ao listar motos por tipo de motor:', error);
            return reply.code(500).send({ error: 'Erro ao listar motos' });
        }
    });
}
