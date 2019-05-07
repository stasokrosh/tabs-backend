import express from 'express'
import * as UserController from './user.controller'

const UserRouter = express.Router();

UserRouter.post('/', UserController.create);
UserRouter.get('/:name', UserController.findOne);
UserRouter.get('/', UserController.findAll);
UserRouter.put('/:name', UserController.update);
UserRouter.delete('/:name', UserController.remove);
UserRouter.post('/:name/favourite', UserController.addFavourite);
UserRouter.delete('/:name/favourite/:tabId', UserController.removeFavourite);

export default UserRouter;