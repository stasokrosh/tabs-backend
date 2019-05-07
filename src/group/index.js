import express from 'express'
import * as GroupController from './group.controller'

const GroupRouter = express.Router();

GroupRouter.post('/', GroupController.create);
GroupRouter.get('/:name', GroupController.findOne);
GroupRouter.get('/', GroupController.findAll);
GroupRouter.get('/user/:name', GroupController.findByUser);
GroupRouter.get('/member/:name', GroupController.findUserMemberIn);
GroupRouter.put('/:name', GroupController.update);
GroupRouter.delete('/:name', GroupController.remove);

export default GroupRouter;