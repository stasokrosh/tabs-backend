import express from 'express'
import * as GroupController from './group.controller'

const GroupRouter = express.Router();

GroupRouter.post('/', GroupController.create);
GroupRouter.get('/:id', GroupController.findOne);
GroupRouter.get('/', GroupController.findAll);
GroupRouter.put('/:id', GroupController.update);
GroupRouter.delete('/:id', GroupController.remove);
GroupRouter.post('/:id/member', GroupController.addMember);
GroupRouter.delete('/:id/member/:userId', GroupController.removeMember);
GroupRouter.put('/:id/member/:userId', GroupController.updateMember);

export default GroupRouter;