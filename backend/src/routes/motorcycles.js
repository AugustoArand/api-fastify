import { Motorcycle } from '../db/models/Motorcycle.js';
import { EngineType } from '../db/models/EngineType.js';
import { motorcycleSchema, updateMotorcycleSchema } from '../schemas/motorcycle.js';
import mongoose from 'mongoose';

export default async function motorcycleRoutes(fastify, options) {
  // Criar uma nova moto
  fastify.post('/api/motorcycles', {
    onRequest: [fastify.authenticate]
  }, async (request, reply) => {
    try {
      const data = motorcycleSchema.parse(request.body);

      // Resolver engine_type_id (número legacy) → ObjectId do MongoDB
      let engineTypeRef = null;
      if (data.engine_type_id) {
        engineTypeRef = data.engine_type_id; // aceita ObjectId diretamente
      }

      const motorcycle = new Motorcycle({
        model: data.model,
        year: data.year,
        color: data.color,
        engine: data.engine,
        price: data.price,
        description: data.description,
        image: data.image || undefined,
        engineType: engineTypeRef,
      });

      await motorcycle.save();
      await motorcycle.populate('engineType', 'name');

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
      const motorcycles = await Motorcycle.find()
        .populate('engineType', 'name')
        .sort({ createdAt: -1 });

      return reply.send(motorcycles);
    } catch (error) {
      return reply.code(500).send({ error: 'Erro ao listar motos' });
    }
  });

  // Obter uma moto por ID
  fastify.get('/api/motorcycles/:id', async (request, reply) => {
    try {
      const { id } = request.params;

      if (!mongoose.isValidObjectId(id)) {
        return reply.code(400).send({ error: 'ID inválido' });
      }

      const motorcycle = await Motorcycle.findById(id).populate('engineType', 'name');

      if (!motorcycle) {
        return reply.code(404).send({ error: 'Moto não encontrada' });
      }

      return reply.send(motorcycle);
    } catch (error) {
      return reply.code(500).send({ error: 'Erro ao buscar moto' });
    }
  });

  // Atualizar uma moto
  fastify.put('/api/motorcycles/:id', {
    onRequest: [fastify.authenticate]
  }, async (request, reply) => {
    try {
      const { id } = request.params;

      if (!mongoose.isValidObjectId(id)) {
        return reply.code(400).send({ error: 'ID inválido' });
      }

      const data = updateMotorcycleSchema.parse(request.body);

      const allowedFields = ['model', 'year', 'color', 'engine', 'price', 'description', 'image'];
      const updateData = {};

      for (const field of allowedFields) {
        if (data[field] !== undefined) {
          updateData[field] = data[field];
        }
      }

      if (data.engine_type_id !== undefined) {
        updateData.engineType = data.engine_type_id || null;
      }

      if (Object.keys(updateData).length === 0) {
        return reply.code(400).send({ error: 'Nenhum campo para atualizar' });
      }

      const motorcycle = await Motorcycle.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
      ).populate('engineType', 'name');

      if (!motorcycle) {
        return reply.code(404).send({ error: 'Moto não encontrada' });
      }

      return reply.send(motorcycle);
    } catch (error) {
      if (error.name === 'ZodError') {
        return reply.code(400).send({ error: 'Dados inválidos', details: error.errors });
      }
      return reply.code(500).send({ error: 'Erro ao atualizar moto' });
    }
  });

  // Deletar uma moto
  fastify.delete('/api/motorcycles/:id', {
    onRequest: [fastify.authenticate]
  }, async (request, reply) => {
    try {
      const { id } = request.params;

      if (!mongoose.isValidObjectId(id)) {
        return reply.code(400).send({ error: 'ID inválido' });
      }

      const motorcycle = await Motorcycle.findByIdAndDelete(id);

      if (!motorcycle) {
        return reply.code(404).send({ error: 'Moto não encontrada' });
      }

      return reply.code(204).send();
    } catch (error) {
      return reply.code(500).send({ error: 'Erro ao deletar moto' });
    }
  });
}
