import { findComposition } from "./tab.edit.service";
import { getUserFromAuth, handleError, ERROR_STATUSES, sendErrorResponse } from "../util";
import { convertComposition } from "./tab.edit.conveter";
import { updateTab } from "../tab/tab.service";

export async function load(req, res) {
    let auth = req.decoded;
    try {
        let user = await getUserFromAuth(auth);
        let composition = await findComposition(req.params.id, user);
        if (!composition)
            sendErrorResponse(ERROR_STATUSES.NOT_FOUND, res);
        else
            res.send(convertComposition(composition));
    } catch (err) {
        console.log(err);
        handleError(err, res);
    }
}

export async function updateCompositionCommand(message, id, user) {
    if (!user)
        sendErrorResponse(ERROR_STATUSES.FORBIDDEN, res);
    return await updateTab(id, message.data);
}

export function addTrackCommand(message) {

}

export function updateTrackCommand(message) {

}

export function deleteTrackCommand(message) {

}

export function addTactCommand(message) {

}

export function updateTactCommand(message) {

}

export function deleteTactCommand(message) {
    
}

export function updateNoteCommand(message) {

}
