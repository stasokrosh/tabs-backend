import express from 'express'
import * as UserController from './user.controller'

const UserRouter = express.Router();

UserRouter.post('/', UserController.create);
UserRouter.get('/:id', UserController.findOne);
UserRouter.get('/', UserController.findAll);
UserRouter.put('/:id', UserController.update);
UserRouter.delete('/:id', UserController.remove);
UserRouter.post('/:id/favourite', UserController.addFavourite);
UserRouter.delete('/:id/favourite/:tabId', UserController.removeFavourite);

export default UserRouter;