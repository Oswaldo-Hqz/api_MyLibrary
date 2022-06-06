import { Router } from "express";
const router = Router();

import * as authCtrl from '../controllers/auth.controller'
import {validationSignup} from '../middlewares'

router.post(
  "/register",
  [validationSignup.checkDuplicateEmail, validationSignup.checkRolesExisted],
  authCtrl.register
);

router.post('/login', authCtrl.logIn)

export default router;