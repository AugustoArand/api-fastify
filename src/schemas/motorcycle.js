import { z } from 'zod';

export const motorcycleSchema = z.object({
  model: z.string().min(1, 'Modelo é obrigatório'),
  year: z.number().int().min(1903, 'Ano deve ser 1903 ou posterior').max(new Date().getFullYear() + 1, 'Ano inválido'),
  color: z.string().min(1, 'Cor é obrigatória'),
  engine: z.string().min(1, 'Motor é obrigatório'),
  price: z.number().positive('Preço deve ser positivo'),
  description: z.string().optional()
});

export const updateMotorcycleSchema = z.object({
  model: z.string().min(1).optional(),
  year: z.number().int().min(1903).max(new Date().getFullYear() + 1).optional(),
  color: z.string().min(1).optional(),
  engine: z.string().min(1).optional(),
  price: z.number().positive().optional(),
  description: z.string().optional()
});

export const motorcycleIdSchema = z.object({
  id: z.string().regex(/^\d+$/).transform(Number)
});
