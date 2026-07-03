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

  static async validatePassword(plainPassword, user) {
    return await user.comparePassword(plainPassword);
  }
}
