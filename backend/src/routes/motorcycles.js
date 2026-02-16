import { pool } from '../db/postgres.js';
import { motorcycleSchema, updateMotorcycleSchema, motorcycleIdSchema } from '../schemas/motorcycle.js';

export default async function motorcycleRoutes(fastify, options) {
  // Criar uma nova moto
  fastify.post('/api/motorcycles', async (request, reply) => {
    try {
      const data = motorcycleSchema.parse(request.body);

      const query = `
        INSERT INTO motorcycles (model, year, color, engine, price, description, engine_type_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *
      `;

      const result = await pool.query(query, [
        data.model,
        data.year,
        data.color,
        data.engine,
        data.price,
        data.description || null,
        data.engine_type_id || null
      ]);

      return reply.code(201).send(result.rows[0]);
    } catch (error) {
      if (error.name === 'ZodError') {
        return reply.code(400).send({ error: 'Dados inválidos', details: error.errors });
      }
      return reply.code(500).send({ error: 'Erro ao criar moto' });
    }
  });

  // Listar todas as motos
  fastify.get('/api/motorcycles', async (request, reply) => {
    try {
      const query = `
        SELECT m.*, et.name as engine_type_name 
        FROM motorcycles m 
        LEFT JOIN engine_types et ON m.engine_type_id = et.id 
        ORDER BY m.created_at DESC
      `;
      const result = await pool.query(query);
      return reply.send(result.rows);
    } catch (error) {
      return reply.code(500).send({ error: 'Erro ao listar motos' });
    }
  });

  // Obter uma moto por ID
  fastify.get('/api/motorcycles/:id', async (request, reply) => {
    try {
      const { id } = motorcycleIdSchema.parse(request.params);

      const result = await pool.query('SELECT * FROM motorcycles WHERE id = $1', [id]);

      if (result.rows.length === 0) {
        return reply.code(404).send({ error: 'Moto não encontrada' });
      }

      return reply.send(result.rows[0]);
    } catch (error) {
      if (error.name === 'ZodError') {
        return reply.code(400).send({ error: 'ID inválido' });
      }
      return reply.code(500).send({ error: 'Erro ao buscar moto' });
    }
  });

  // Atualizar uma moto
  fastify.put('/api/motorcycles/:id', async (request, reply) => {
    try {
      const { id } = motorcycleIdSchema.parse(request.params);
      const data = updateMotorcycleSchema.parse(request.body);

      // Verificar se a moto existe
      const existing = await pool.query('SELECT * FROM motorcycles WHERE id = $1', [id]);
      if (existing.rows.length === 0) {
        return reply.code(404).send({ error: 'Moto não encontrada' });
      }

      // Construir query de atualização dinâmica
      const allowedFields = ['model', 'year', 'color', 'engine', 'price', 'description', 'engine_type_id'];
      const updates = [];
      const values = [];
      let paramCount = 1;

      for (const field of allowedFields) {
        if (data[field] !== undefined) {
          updates.push(`${field} = $${paramCount}`);
          values.push(data[field]);
          paramCount++;
        }
      }

      if (updates.length === 0) {
        return reply.code(400).send({ error: 'Nenhum campo para atualizar' });
      }

      values.push(id);

      const query = `UPDATE motorcycles SET ${updates.join(', ')} WHERE id = $${paramCount} RETURNING *`;
      const result = await pool.query(query, values);

      return reply.send(result.rows[0]);
    } catch (error) {
      if (error.name === 'ZodError') {
        return reply.code(400).send({ error: 'Dados inválidos', details: error.errors });
      }
      return reply.code(500).send({ error: 'Erro ao atualizar moto' });
    }
  });

  // Deletar uma moto
  fastify.delete('/api/motorcycles/:id', async (request, reply) => {
    try {
      const { id } = motorcycleIdSchema.parse(request.params);

      // Verificar se a moto existe
      const existing = await pool.query('SELECT * FROM motorcycles WHERE id = $1', [id]);
      if (existing.rows.length === 0) {
        return reply.code(404).send({ error: 'Moto não encontrada' });
      }

      await pool.query('DELETE FROM motorcycles WHERE id = $1', [id]);

      return reply.code(204).send();
    } catch (error) {
      if (error.name === 'ZodError') {
        return reply.code(400).send({ error: 'ID inválido' });
      }
      return reply.code(500).send({ error: 'Erro ao deletar moto' });
    }
  });
}
