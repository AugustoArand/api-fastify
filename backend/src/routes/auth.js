import { UserService } from '../services/userService.js';
import { registerSchema, loginSchema, updateProfileSchema } from '../schemas/user.js';

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
        user
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

  // Rota para obter dados do usuário autenticado
  fastify.get('/me', {
    onRequest: [fastify.authenticate]
  }, async (request, reply) => {
    const user = await UserService.findById(request.user.id);

    if (!user) {
      return reply.code(404).send({ error: 'Usuário não encontrado' });
    }

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        created_at: user.createdAt
      }
    };
  });

  // Rota para atualizar dados do usuário autenticado
  fastify.put('/me', {
    onRequest: [fastify.authenticate]
  }, async (request, reply) => {
    try {
      const validatedData = updateProfileSchema.parse(request.body);

      const updatedUser = await UserService.update(request.user.id, validatedData);

      const token = fastify.jwt.sign({
        id: updatedUser.id,
        email: updatedUser.email,
        name: updatedUser.name
      });

      return {
        message: 'Perfil atualizado com sucesso',
        user: updatedUser,
        token
      };
    } catch (error) {
      if (error.name === 'ZodError') {
        return reply.code(400).send({
          error: 'Dados inválidos',
          details: error.errors
        });
      }

      if (error.message === 'Email já cadastrado' || error.message === 'Senha atual incorreta') {
        return reply.code(409).send({ error: error.message });
      }

      if (error.message === 'Usuário não encontrado') {
        return reply.code(404).send({ error: error.message });
      }

      console.error('Erro ao atualizar perfil:', error);
      return reply.code(500).send({ error: 'Erro ao atualizar perfil' });
    }
  });
}
