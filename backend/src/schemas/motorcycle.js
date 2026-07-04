import { z } from 'zod';

const currentYear = () => new Date().getFullYear();

// Regex para ObjectId do MongoDB (24 hex chars)
const objectIdRegex = /^[a-f\d]{24}$/i;

export const motorcycleSchema = z.object({
  model: z.string().min(1, 'Modelo é obrigatório'),
  year: z.number().int().min(1903, 'Ano deve ser 1903 ou posterior').max(currentYear() + 1, 'Ano inválido').refine(
    (val) => val >= 1903 && val <= currentYear() + 1,
    { message: 'Ano inválido' }
  ),
  color: z.string().min(1, 'Cor é obrigatória'),
  engine: z.string().optional(),
  engine_type_id: z.string().regex(objectIdRegex, 'ID de tipo de motor inválido').nullable().optional(),
  price: z.number().positive('Preço deve ser positivo'),
  description: z.string().optional()
});

export const updateMotorcycleSchema = z.object({
  model: z.string().min(1).optional(),
  year: z.number().int().min(1903).max(currentYear() + 1).refine(
    (val) => val >= 1903 && val <= currentYear() + 1,
    { message: 'Ano inválido' }
  ).optional(),
  color: z.string().min(1).optional(),
  engine: z.string().optional(),
  engine_type_id: z.string().regex(objectIdRegex, 'ID de tipo de motor inválido').nullable().optional(),
  price: z.number().positive().optional(),
  description: z.string().optional()
});

export const motorcycleIdSchema = z.object({
  id: z.string().regex(objectIdRegex, 'ID inválido')
});

