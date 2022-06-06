import { Router } from "express";
const router = Router();

import * as borrowingsCtrl from '../controllers/borrowings.controller'
import {authJwt} from '../middlewares'

router.post('/', [authJwt.verifyToken], borrowingsCtrl.createBorrowing);

router.get('/', [authJwt.verifyToken], borrowingsCtrl.getBorrowings);

router.get('/:borrowingId', [authJwt.verifyToken], borrowingsCtrl.getBorrowingById);

router.put('/:borrowingId', [authJwt.verifyToken], borrowingsCtrl.updateBorrowingById);

router.delete('/:borrowingId', [authJwt.verifyToken, authJwt.isLibrarian], borrowingsCtrl.deleteBorrowingById);

export default router;