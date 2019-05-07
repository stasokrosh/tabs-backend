import express from 'express'
import * as UserController from './user.controller'

const UserRouter = express.Router();

UserRouter.post('/', UserController.create);
UserRouter.get('/:name', UserController.findOne);
UserRouter.get('/', UserController.findAll);
UserRouter.get('/group/:name', UserController.findByGroup);
UserRouter.put('/:name', UserController.update);
UserRouter.delete('/:name', UserController.remove);

export default UserRouter;