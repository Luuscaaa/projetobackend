
import { Router } from 'express';
import { getBook, addBook, deleteBook, updateBook, getBooks } from '../controllers/bookController';

const router = Router();

router.get('/books/:id', getBook);

router.post('/books', addBook);

router.get('/books', getBooks);

router.delete('/books/:id', deleteBook);

router.put('atualizar/books/:id', updateBook);

export default router;




