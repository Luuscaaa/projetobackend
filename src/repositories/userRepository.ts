import { Pool } from 'pg';
import pool from '../config/database';
import { User } from '../models/userModel';

export class UserRepository {
  getAllUsers() {
    throw new Error('Method not implemented.');
  }
  private pool: Pool = pool;

  async getUserByEmail(email: string): Promise<User | null> {
    const { rows } = await this.pool.query('SELECT id, name, email FROM users WHERE email = $1', [email]);
    return rows[0] || null;
  }

  async addUser(name: string, email: string, passwordHash: string): Promise<User> {
    const query = 'INSERT INTO users (name, email, passwordHash) VALUES ($1, $2, $3) RETURNING id, name, email';
    const { rows } = await this.pool.query(query, [name, email, passwordHash]);
    return rows[0];
  }
}