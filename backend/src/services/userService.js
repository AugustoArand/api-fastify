import { User } from '../db/models/User.js';

export class UserService {
  static async create(name, email, password) {
    try {
      const user = new User({ name, email, password });
      await user.save();
      return {
        id: user._id,
        name: user.name,
        email: user.email,
        created_at: user.createdAt,
      };
    } catch (error) {
      if (error.code === 11000) {
        throw new Error('Email já cadastrado');
      }
      throw error;
    }
  }

  static async findByEmail(email) {
    return await User.findOne({ email: email.toLowerCase() });
  }

  static async findById(id) {
    return await User.findById(id);
  }

  static async validatePassword(plainPassword, user) {
    return await user.comparePassword(plainPassword);
  }

  static async update(id, data) {
    const user = await User.findById(id);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    if (data.newPassword) {
      const isValidPassword = await user.comparePassword(data.currentPassword);
      if (!isValidPassword) {
        throw new Error('Senha atual incorreta');
      }
      user.password = data.newPassword;
    }

    if (data.name) user.name = data.name;
    if (data.email) user.email = data.email.toLowerCase();

    try {
      await user.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new Error('Email já cadastrado');
      }
      throw error;
    }

    return {
      id: user._id,
      name: user.name,
      email: user.email,
      created_at: user.createdAt
    };
  }
}
