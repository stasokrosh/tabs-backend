import express from 'express'
import * as TabController from './tab.controller'

const TabRouter = express.Router();

TabRouter.post('/', TabController.create);
TabRouter.get('/:id', TabController.findOne);
TabRouter.get('/', TabController.findAll);
TabRouter.put('/:id', TabController.update);
TabRouter.delete('/:id', TabController.remove);
GroupRouter.post('/:id/user', TabController.addUser);
GroupRouter.delete('/:id/user/:userId', TabController.removeUser);
GroupRouter.put('/:id/user/:userId', TabController.updateUser);

export default TabRouter;