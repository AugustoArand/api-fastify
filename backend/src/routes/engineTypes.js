import { EngineType } from '../db/models/EngineType.js';
import { Motorcycle } from '../db/models/Motorcycle.js';
import mongoose from 'mongoose';

export default async function engineTypeRoutes(fastify, options) {
  // Listar todos os tipos de motor
  fastify.get('/api/engine-types', async (request, reply) => {
    try {
      const engineTypes = await EngineType.find().sort({ name: 1 });
      return reply.send(engineTypes);
    } catch (error) {
      console.error('Erro ao listar tipos de motor:', error);
      return reply.code(500).send({ error: 'Erro ao listar tipos de motor' });
    }
  });

  // Obter um tipo de motor por ID
  fastify.get('/api/engine-types/:id', async (request, reply) => {
    try {
      const { id } = request.params;

      if (!mongoose.isValidObjectId(id)) {
        return reply.code(400).send({ error: 'ID inválido' });
      }

      const engineType = await EngineType.findById(id);

      if (!engineType) {
        return reply.code(404).send({ error: 'Tipo de motor não encontrado' });
      }

      return reply.send(engineType);
    } catch (error) {
      console.error('Erro ao buscar tipo de motor:', error);
      return reply.code(500).send({ error: 'Erro ao buscar tipo de motor' });
    }
  });

  // Listar motos por tipo de motor
  fastify.get('/api/engine-types/:id/motorcycles', async (request, reply) => {
    try {
      const { id } = request.params;

      if (!mongoose.isValidObjectId(id)) {
        return reply.code(400).send({ error: 'ID inválido' });
      }

      const motorcycles = await Motorcycle.find({ engineType: id })
        .populate('engineType', 'name')
        .sort({ year: -1 });

      return reply.send(motorcycles);
    } catch (error) {
      console.error('Erro ao listar motos por tipo de motor:', error);
      return reply.code(500).send({ error: 'Erro ao listar motos' });
    }
  });
}
