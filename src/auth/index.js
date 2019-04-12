import express from 'express'
import * as AuthController from './auth.controller'

const AuthRouter = express.Router();

AuthRouter.post('/', AuthController.signin);

export default AuthRouter;