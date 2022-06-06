import { Router } from "express";
const router = Router();

import * as booksCtrl from '../controllers/books.controller'
import {authJwt} from '../middlewares'

router.post('/', [authJwt.verifyToken, authJwt.isLibrarian], booksCtrl.createBook);

router.get('/', booksCtrl.getBooks);

router.get('/:bookId', booksCtrl.getBookById);

router.put('/:bookId', [authJwt.verifyToken, authJwt.isLibrarian], booksCtrl.updateBookById);

router.put('/borrowed/:bookId', [authJwt.verifyToken], booksCtrl.updateBookBorrowedById);

router.put('/return/:bookId', [authJwt.verifyToken], booksCtrl.updateBookReturnedById);

router.delete('/:bookId', [authJwt.verifyToken, authJwt.isLibrarian], booksCtrl.deleteBookById);

export default router;