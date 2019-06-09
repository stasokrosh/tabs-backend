import { TAB_EDIT_COMMANDS } from './tab.edit.command';
import * as TabEditController from './tab.edit.controller'
import { handleError, getUserFromAuth } from '../util';

export default async function tabEditDispatch(req, res) {
    try {
        let user = getUserFromAuth(req.decoded);
        let body = await tabEditDispatchMessage(req.body, req.params.id, user);
        if (!body)
            body = {};
        res.send(body);
    } catch (err) {
        handleError(err);
    }
}

async function tabEditDispatchMessage(message, id, user) {
    switch (message.id) {
        case TAB_EDIT_COMMANDS.TRACK.ADD:
            return TabEditController.addTrackCommand(message, id, user);
        case TAB_EDIT_COMMANDS.TRACK.UPDATE:
            return TabEditController.updateTrackCommand(message, id, user);
        case TAB_EDIT_COMMANDS.TRACK.DELETE:
            return TabEditController.deleteTrackCommand(message, id, user);
        case TAB_EDIT_COMMANDS.TACT.ADD:
            return TabEditController.addTactCommand(message, id, user);
        case TAB_EDIT_COMMANDS.TACT.UPDATE:
            return TabEditController.updateTactCommand(message, id, user);
        case TAB_EDIT_COMMANDS.TACT.DELETE:
            return TabEditController.deleteTactCommand(message, id, user);
        case TAB_EDIT_COMMANDS.TRACK_TACT.UPDATE:
            return TabEditController.updateTrackTactCommand(message, id, user);
    }
}
