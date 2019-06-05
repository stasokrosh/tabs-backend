import { getCompositionWithContent, addTrack, updateTrack, deleteTrack } from "./tab.edit.service";
import { getUserFromAuth, handleError, ERROR_STATUSES, sendErrorResponse } from "../util";
import { convertComposition, convertTrack } from "./tab.edit.conveter";

export async function load(req, res) {
    let auth = req.decoded;
    try {
        let user = await getUserFromAuth(auth);
        let composition = await getCompositionWithContent(req.params.id);
        if (!composition)
            sendErrorResponse(ERROR_STATUSES.NOT_FOUND, res);
        else
            res.send(convertComposition(composition));
    } catch (err) {
        handleError(err, res);
    }
}

export async function addTrackCommand(message, id, user) {
    let track = await addTrack(id, message.data);
    return convertTrack(track);
}

export async function updateTrackCommand(message, id, user) {
    let track = await updateTrack(id, message.data);
    return convertTrack(track);
}

export async function deleteTrackCommand(message, id, user) {
    await deleteTrack(id, message.trackId);
}

export async function addTactCommand(message, id, user) {

}

export async function updateTactCommand(message, id, user) {

}

export async function deleteTactCommand(message, id, user) {

}
