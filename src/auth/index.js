import express from 'express'
import * as AuthController from './auth.controller'

const AuthRouter = express.Router();

AuthRouter.post('/signin', AuthController.signin);
AuthRouter.post('/signup', AuthController.signup);

export default AuthRouter;