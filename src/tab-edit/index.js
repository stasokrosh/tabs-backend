import express from 'express'
import tabEditDispatch from './tab.edit.dispatcher';
import { load } from './tab.edit.controller';
import { Connection } from './tab.edit.socket';

const TabEditRouter = express.Router();

TabEditRouter.post('/:id', tabEditDispatch);
TabEditRouter.get('/:id', load);

export default TabEditRouter;

export function TabEditWebSocket(ws, req) {
    Connection.connect(ws, req);
}


