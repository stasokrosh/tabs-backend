import { TAB_EDIT_COMMANDS } from './tab.edit.command';
import * as TabEditController from './tab.edit.controller'
import { handleError, getUserFromAuth, sendErrorResponse, ERROR_STATUSES } from '../util';
import { findTab, findTabWriters } from '../tab/tab.service';
import { Connection } from './tab.edit.socket';

export default async function tabEditDispatch(req, res) {
    try {
        let user = await getUserFromAuth(req.decoded);
        if (!user)
            sendErrorResponse(ERROR_STATUSES.FORBIDDEN, res);
        let tab = await findTab(req.params.id, user);
        if (!tab) {
            sendErrorResponse(ERROR_STATUSES.NOT_FOUND, res);
        } else {
            let writers = await findTabWriters(req.params.id);
            if (writers.indexOf(user.name) === -1) {
                sendErrorResponse(ERROR_STATUSES.FORBIDDEN, res);
            } else {
                let message = req.body;
                let body = await tabEditDispatchMessage(message, tab.composition._id, user);
                if (!body)
                    body = {};
                message.result = body;
                Connection.broadcast(tab.id, message, user.name);
                res.send(body);
            }
        }
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
