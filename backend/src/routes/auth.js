import { UserService } from '../services/userService.js';
import { registerSchema, loginSchema } from '../schemas/user.js';

export async function authRoutes(fastify, options) {
  // Rota de registro
  fastify.post('/register', async (request, reply) => {
    try {
      const validatedData = registerSchema.parse(request.body);

      const user = await UserService.create(
        validatedData.name,
        validatedData.email,
        validatedData.password
      );

      const token = fastify.jwt.sign({
        id: user.id,
        email: user.email,
        name: user.name
      });

      return {
        message: 'Usuário registrado com sucesso',
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        },
        token
      };
    } catch (error) {
      if (error.name === 'ZodError') {
        return reply.code(400).send({
          error: 'Dados inválidos',
          details: error.errors
        });
      }

      if (error.message === 'Email já cadastrado') {
        return reply.code(409).send({ error: error.message });
      }

      console.error('Erro ao registrar usuário:', error);
      return reply.code(500).send({ error: 'Erro ao registrar usuário' });
    }
  });

  // Rota de login
  fastify.post('/login', async (request, reply) => {
    try {
      const validatedData = loginSchema.parse(request.body);

      console.log('🔍 Tentativa de login:', validatedData.email);

      const user = await UserService.findByEmail(validatedData.email);

      if (!user) {
        console.log('❌ Usuário não encontrado:', validatedData.email);
        return reply.code(401).send({ error: 'Email ou senha inválidos' });
      }

      console.log('✅ Usuário encontrado:', user.email);

      const isValidPassword = await UserService.validatePassword(
        validatedData.password,
        user.password
      );

      console.log('🔐 Senha válida:', isValidPassword);

      if (!isValidPassword) {
        console.log('❌ Senha incorreta para:', validatedData.email);
        return reply.code(401).send({ error: 'Email ou senha inválidos' });
      }

      const token = fastify.jwt.sign({
        id: user.id,
        email: user.email,
        name: user.name
      });

      return {
        message: 'Login realizado com sucesso',
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        },
        token
      };
    } catch (error) {
      if (error.name === 'ZodError') {
        return reply.code(400).send({
          error: 'Dados inválidos',
          details: error.errors
        });
      }

      console.error('Erro ao fazer login:', error);
      return reply.code(500).send({ error: 'Erro ao fazer login' });
    }
  });

  // Rota protegida de teste
  fastify.get('/me', {
    onRequest: [fastify.authenticate]
  }, async (request, reply) => {
    return {
      user: request.user
    };
  });
}
