import {Router} from 'express'
const router = Router()

import * as genresCtrl from '../controllers/genres.controller'
import {authJwt} from '../middlewares'

router.post('/', [authJwt.verifyToken, authJwt.isLibrarian], genresCtrl.createGenre);

router.get('/', [authJwt.verifyToken], genresCtrl.getGenres);

router.get('/:genreId', [authJwt.verifyToken], genresCtrl.getGenreById);

router.put('/:genreId', [authJwt.verifyToken, authJwt.isLibrarian], genresCtrl.updateGenreById);

router.delete('/:genreId', [authJwt.verifyToken, authJwt.isLibrarian], genresCtrl.deleteGenreById);

export default router;