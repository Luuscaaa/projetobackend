import { Request, Response } from 'express';
import { BookRepository } from '../repositories/bookRepository';
import { isValidTitle, isValidAuthor, isValidPrice } from '../helpers/validationHelper';
import pool from '../config/database';

const bookRepository = new BookRepository();

export const addBook = async (req: Request, res: Response) => {
  const { title, author, price, image } = req.body; // Agora inclui 'image'

  // Validação do título

  if (!isValidTitle(title)) {
    return res.status(400).json({ error: 'O título deve ter pelo menos 3 caracteres.' });
  }

  // Validação do autor

  if (!isValidAuthor(author)) {
    return res.status(400).json({ error: 'O autor deve ter pelo menos 3 caracteres e não pode conter números ou caracteres especiais.' });
  }

  // Validação do preço

  if (!isValidPrice(price)) {
    return res.status(400).json({ error: 'O preço deve ser maior que zero.' });
  }

  // Se passar nas validações, cria o livro

  try {
    const book = await bookRepository.addBook(title, author, price, image); // Passando 'image'
    res.status(201).json(book);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// Recupera todos os livros e formata a resposta

export const getBooks = async (req: Request, res: Response) => {
  try {
    const books = await bookRepository.getAllBooks();
    
    const formattedBooks = books.map((book: any) => ({
      id: book.id,
      title: book.title,
      subtitle: book.author,  // Usando 'author' como 'subtitle'
      image: book.image || '', // Garantindo que a imagem exista
      price: book.price,
    }));

    const response = {
      description: "API para manipular livros",
      development: "Lucas Santana",
      date: new Date().toISOString(),
      version: "1.0",
      books: formattedBooks,
    };

    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar livros.' });
  }
};

// Função para buscar um livro pelo ID

export const getBook = async (req: Request, res: Response) => {
  const { id } = req.params;  // Obtém o ID do livro da URL

  try {
    const book = await bookRepository.getBookById(id);  // Busca o livro pelo ID

    if (!book) {
      return res.status(404).json({ message: 'Livro não encontrado' });  // Retorna 404 se o livro não for encontrado
    }

    res.status(200).json(book);  // Retorna o livro encontrado
  } catch (err: any) {
    res.status(500).json({ error: err.message });  // Erro do servidor
  }
};

// Função para excluir um livro

export const deleteBook = async (req: Request, res: Response) => {
  const { id } = req.params; // Obtém o id do livro da URL

  try {
    const result = await bookRepository.deleteBook(id);  // Chama o método no repositório para excluir o livro
    if (result) {
      res.status(200).json({ message: 'Livro excluído com sucesso.' });
    } else {
      res.status(404).json({ message: 'Livro não encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir livro.' });
  }
};

export const updateBook = async (req: Request, res: Response) => {
  const { id } = req.params; // Obtém o id do livro da URL
  const { title, author, price, image } = req.body; // Recebe os dados da requisição

  // Validação dos dados de entrada

  if (!isValidTitle(title)) {
    return res.status(400).json({ error: 'O título deve ter pelo menos 3 caracteres.' });
  }
  
  if (!isValidAuthor(author)) {
    return res.status(400).json({ error: 'O autor deve ter pelo menos 3 caracteres e não pode conter números ou caracteres especiais.' });
  }
  
  if (!isValidPrice(price)) {
    return res.status(400).json({ error: 'O preço deve ser maior que zero.' });
  }

  try {
    // Verifica se o livro existe no banco de dados

    const existingBook = await bookRepository.getBookById(id);  // Método que busca o livro pelo id
    if (!existingBook) {
      return res.status(404).json({ error: 'Livro não encontrado.' });
    }

    // Atualiza o livro
    
    const updatedBook = await bookRepository.updateBook(id, title, author, price, image);

    res.status(200).json(updatedBook);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
