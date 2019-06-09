import { getCompositionWithContent, addTrack, updateTrack, deleteTrack, addTact, updateTact, deleteTact, getTactTrackTacts, updateTrackTact } from "./tab.edit.service";
import { getUserFromAuth, handleError, ERROR_STATUSES, sendErrorResponse } from "../util";
import { convertComposition, convertTrack, convertTact, convertTrackTact } from "./tab.edit.conveter";
import { findTab } from "../tab/tab.service";

export async function load(req, res) {
    let auth = req.decoded;
    try {
        let user = getUserFromAuth(auth);
        let tab = await findTab(req.params.id, user);
        if (!tab)
            sendErrorResponse(ERROR_STATUSES.NOT_FOUND, res);
        let composition = await getCompositionWithContent(tab.composition._id);
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
    let tact = await addTact(id, message.data);
    let trackTacts = await getTactTrackTacts(tact._id);
    return {
        tact: convertTact(tact),
        trackTacts : trackTacts.map(trackTact => convertTrackTact(trackTact))
    }
}

export async function updateTactCommand(message, id, user) {
    let tact = await updateTact(id, message.data);
    return convertTact(tact);
}

export async function deleteTactCommand(message, id, user) {
    await deleteTact(id, message.tactId);
}

export async function updateTrackTactCommand(message, id, user) {
    let trackTact = await updateTrackTact(id, message.data);
    return convertTrackTact(trackTact);
}