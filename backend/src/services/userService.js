import bcrypt from 'bcrypt';
import { pool } from '../db/postgres.js';

export class UserService {
    static async create(name, email, password) {
        // Hash da senha
        const hashedPassword = await bcrypt.hash(password, 10);

        const query = `
      INSERT INTO users (name, email, password)
      VALUES ($1, $2, $3)
      RETURNING id, name, email, created_at
    `;

        try {
            const result = await pool.query(query, [name, email, hashedPassword]);
            return result.rows[0];
        } catch (error) {
            if (error.code === '23505') { // Unique violation
                throw new Error('Email já cadastrado');
            }
            throw error;
        }
    }

    static async findByEmail(email) {
        const query = 'SELECT * FROM users WHERE email = $1';
        const result = await pool.query(query, [email]);
        return result.rows[0];
    }

    static async validatePassword(plainPassword, hashedPassword) {
        return await bcrypt.compare(plainPassword, hashedPassword);
    }
}
