import { TAB_EDIT_COMMANDS } from './tab.edit.command';
import * as TabEditController from './tab.edit.controller'
import { handleError, getUserFromuser, sendErrorResponse, getUserFromAuth } from '../util';

export default async function tabEditDispatch(res, req) {
    try {
        let user = getUserFromAuth(req.decoded);
        res.send(tabEditDispatchMessage(req.body, req.params.id, user));
    } catch (err) {
        handleError(err);
    }
}

function tabEditDispatchMessage(message, id, user) {
    switch (message.command) {
        case TAB_EDIT_COMMANDS.COMPOSITION.UPDATE:
            return TabEditController.updateCompositionCommand(message, id, user);
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
        case TAB_EDIT_COMMANDS.NOTE.UPDATE:
            return TabEditController.updateNoteCommand(message, id, user);
    }
}
