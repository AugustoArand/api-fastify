import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres')
});

export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres')
});

export const updateProfileSchema = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres').optional(),
  email: z.string().email('Email inválido').optional(),
  currentPassword: z.string().optional(),
  newPassword: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres').optional()
}).refine(data => !data.newPassword || !!data.currentPassword, {
  message: 'Senha atual é obrigatória para alterar a senha',
  path: ['currentPassword']
});
