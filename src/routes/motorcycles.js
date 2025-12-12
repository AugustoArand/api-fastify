import db from '../db/database.js';
import { motorcycleSchema, updateMotorcycleSchema, motorcycleIdSchema } from '../schemas/motorcycle.js';

export default async function motorcycleRoutes(fastify, options) {
  // Criar uma nova moto
  fastify.post('/api/motorcycles', async (request, reply) => {
    try {
      const data = motorcycleSchema.parse(request.body);
      
      const stmt = db.prepare(`
        INSERT INTO motorcycles (model, year, color, engine, price, description)
        VALUES (?, ?, ?, ?, ?, ?)
      `);
      
      const result = stmt.run(
        data.model,
        data.year,
        data.color,
        data.engine,
        data.price,
        data.description || null
      );
      
      const motorcycle = db.prepare('SELECT * FROM motorcycles WHERE id = ?').get(result.lastInsertRowid);
      
      return reply.code(201).send(motorcycle);
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
      const motorcycles = db.prepare('SELECT * FROM motorcycles ORDER BY created_at DESC').all();
      return reply.send(motorcycles);
    } catch (error) {
      return reply.code(500).send({ error: 'Erro ao listar motos' });
    }
  });

  // Obter uma moto por ID
  fastify.get('/api/motorcycles/:id', async (request, reply) => {
    try {
      const { id } = motorcycleIdSchema.parse(request.params);
      
      const motorcycle = db.prepare('SELECT * FROM motorcycles WHERE id = ?').get(id);
      
      if (!motorcycle) {
        return reply.code(404).send({ error: 'Moto não encontrada' });
      }
      
      return reply.send(motorcycle);
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
      const existing = db.prepare('SELECT * FROM motorcycles WHERE id = ?').get(id);
      if (!existing) {
        return reply.code(404).send({ error: 'Moto não encontrada' });
      }
      
      // Construir query de atualização dinâmica com campos permitidos
      const allowedFields = ['model', 'year', 'color', 'engine', 'price', 'description'];
      const updates = [];
      const values = [];
      
      for (const field of allowedFields) {
        if (data[field] !== undefined) {
          updates.push(`${field} = ?`);
          values.push(data[field]);
        }
      }
      
      if (updates.length === 0) {
        return reply.code(400).send({ error: 'Nenhum campo para atualizar' });
      }
      
      values.push(id);
      
      const stmt = db.prepare(`UPDATE motorcycles SET ${updates.join(', ')} WHERE id = ?`);
      stmt.run(...values);
      
      const motorcycle = db.prepare('SELECT * FROM motorcycles WHERE id = ?').get(id);
      
      return reply.send(motorcycle);
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
      const existing = db.prepare('SELECT * FROM motorcycles WHERE id = ?').get(id);
      if (!existing) {
        return reply.code(404).send({ error: 'Moto não encontrada' });
      }
      
      db.prepare('DELETE FROM motorcycles WHERE id = ?').run(id);
      
      return reply.code(204).send();
    } catch (error) {
      if (error.name === 'ZodError') {
        return reply.code(400).send({ error: 'ID inválido' });
      }
      return reply.code(500).send({ error: 'Erro ao deletar moto' });
    }
  });
}
