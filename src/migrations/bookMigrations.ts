import pool from '../config/database';

const createUsersTable = async () => {
  const client = await pool.connect();
  try {
    // Criação da tabela "books"
    const queryText = `
      CREATE TABLE IF NOT EXISTS books (
        id SERIAL PRIMARY KEY,
        title VARCHAR(100) NOT NULL,
        author VARCHAR(100) UNIQUE NOT NULL,
        price FLOAT NOT NULL
      );
    `;
    await client.query(queryText);
    console.log('Tabela "books" criada com sucesso!');

    // Adicionando a coluna 'image' à tabela 'books'
    const alterTableQuery = `
      ALTER TABLE books
      ADD COLUMN IF NOT EXISTS image VARCHAR(255);
    `;
    await client.query(alterTableQuery);
    console.log('Coluna "image" adicionada com sucesso!');
  } catch (err) {
    console.error('Erro ao criar tabela ou adicionar coluna:', err);
  } finally {
    client.release();
  }
};

createUsersTable().then(() => process.exit(0));