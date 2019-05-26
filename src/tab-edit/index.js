import express from 'express'
import tabEditDispatch from './tab.edit.dispatcher';
import { load } from './tab.edit.controller';

const TabEditRouter = express.Router();

TabEditRouter.post('/:id', tabEditDispatch);
TabEditRouter.get('/:id', load);

export default TabEditRouter;

export function TabEditWebSocket(ws, req) {
    
}


