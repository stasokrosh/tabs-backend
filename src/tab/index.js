import express from 'express'
import * as TabController from './tab.controller'

const TabRouter = express.Router();

TabRouter.post('/', TabController.create);
TabRouter.get('/:id', TabController.findOne);
TabRouter.get('/', TabController.findAll);
TabRouter.get('/user/:name', TabController.findByUser);
TabRouter.put('/:id', TabController.update);
TabRouter.delete('/:id', TabController.remove);

export default TabRouter;