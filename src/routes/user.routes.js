import { Router } from "express";
const router = Router();

import * as usersCtrl from "../controllers/user.controller";
import { authJwt, validationSignup } from "../middlewares";

router.post(
    "/",
    [
      authJwt.verifyToken,
      authJwt.isAdmin,
      authJwt.isLibrarian,
      validationSignup.checkDuplicateEmail,
    ],
    usersCtrl.createUser
);
    
router.get('/', [authJwt.verifyToken, authJwt.isLibrarian], usersCtrl.getUsers);
 
router.get('/:userId', [authJwt.verifyToken], usersCtrl.getUserById);
 
router.get('/getUserByEmail', [authJwt.verifyToken], usersCtrl.getUserByEmail);

export default router;