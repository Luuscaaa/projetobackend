import { Pool } from 'pg';
import pool from '../config/database';
import { Book } from '../models/bookModel';

export class BookRepository {
  private pool: Pool = pool;

  // Método para listar todos os livros
  async getAllBooks(): Promise<Book[]> {
    // Incluindo a coluna 'image' na consulta
    const { rows } = await this.pool.query('SELECT id, title, author, price, image FROM books');
    return rows;
  }

  // Método para adicionar um livro
  async addBook(title: string, author: string, price: number, image: string): Promise<Book> {
    // Adicionando 'image' ao comando de inserção
    const query = 'INSERT INTO books (title, author, price, image) VALUES ($1, $2, $3, $4) RETURNING id, title, author, price, image';
    const { rows } = await this.pool.query(query, [title, author, price, image]);
    return rows[0];
  }

  // Método para buscar um livro pelo ID
  async getBookById(id: string): Promise<Book | null> {
    const query = 'SELECT id, title, author, price, image FROM books WHERE id = $1'; // Incluindo 'image'
    const { rows } = await this.pool.query(query, [id]);
    return rows.length > 0 ? rows[0] : null; // Retorna o livro ou null se não encontrar
  }

  // Função para excluir um livro
  async deleteBook(id: string): Promise<boolean> {
    const query = 'DELETE FROM books WHERE id = $1 RETURNING *';
    const { rowCount } = await this.pool.query(query, [id]);

    if (rowCount === 0) {
      return false;  // Se o livro não foi encontrado, retorna falso
    }
    return true;  // Se o livro foi excluído, retorna verdadeiro
  }

  // Método para atualizar um livro
  async updateBook(id: string, title: string, author: string, price: number, image: string | null): Promise<Book> {
    const query = `
      UPDATE books
      SET title = $1, author = $2, price = $3, image = $4
      WHERE id = $5
      RETURNING id, title, author, price, image
    `;
    const { rows } = await this.pool.query(query, [title, author, price, image, id]);

    if (rows.length === 0) {
      throw new Error('Livro não encontrado');  // Se não encontrar o livro, lança erro
    }

    return rows[0];  // Retorna o livro atualizado
  }
}