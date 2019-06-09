import { Composition, Track, TrackTact, Tact } from "./tab.edit.model";
import { DEFAULT_TRACK_NAME, DEFAULT_TACT_DURATION, DEFAULT_TRACK_INSTRUMENT } from "./util";
import { isUndefined } from "util";

export async function createComposition(composition) {
    composition = new Composition(composition);
    await composition.save();
    let tact = await addTact(composition._id, { duration: DEFAULT_TACT_DURATION });
    composition.tacts = [tact];
    let track = await addTrack(composition._id, {
        name: DEFAULT_TRACK_NAME,
        instrument: DEFAULT_TRACK_INSTRUMENT
    });
    composition.tracks = [track];
    return composition;
}

export async function findComposition(id) {
    return await Composition.findById(id).exec();
}

export async function getCompositionWithContent(compositionId) {
    let resComposition = await Composition.findById(compositionId).populate('tacts').exec();
    resComposition.tracks = await getCompositionTracks(compositionId);
    for (let track of resComposition.tracks) {
        track.tacts = await getTrackTacts(track._id);
    }
    return resComposition;
}

export async function updateComposition(id, data) {
    let composition = await Composition.findById(id).exec();
    if (!composition)
        return;
    if (!isUndefined(data.name))
        composition.name = data.name;
    return await composition.save();
}

export async function deleteComposition(id) {
    let composition = await Composition.findById(id).exec();
    let tracks = await getCompositionTracks(id);
    for (let tact of composition.tacts)
        await Tact.findByIdAndDelete(tact).exec();
    for (let track of tracks) {
        await deleteTrack(track._id);
    }
    await Composition.findByIdAndDelete(id).exec();
}

export async function addTrack(compositionId, track) {
    track.composition = compositionId;
    track = new Track(track);
    await track.save();
    let composition = await findComposition(compositionId);
    for (let tact of composition.tacts) {
        let trackTact = new TrackTact({ track: track._id, tact: tact });
        await trackTact.save();
    }
    track.tacts = await getTrackTacts(track._id);
    return track;
}

export async function deleteTrack(compositionId, trackId) {
    let tacts = await getTrackTacts(trackId);
    for (let tact of tacts)
        await TrackTact.findByIdAndDelete(tact._id).exec();
    await Track.findByIdAndDelete(trackId).exec();
}

export async function updateTrack(compositionId, trackData) {
    let track = await Track.findById(trackData.id);
    if (!track)
        return;
    if (!isUndefined(trackData.name))
        track.name = trackData.name;
    if (!isUndefined(trackData.instrument))
        track.instrument = trackData.instrument;
    return await track.save();
}

export async function addTact(compositionId, tact, composition) {
    tact = new Tact(tact);
    await tact.save();
    if (!composition)
        composition = await findComposition(compositionId);
    composition.tacts.push(tact._id);
    await composition.save();
    tact = composition.tacts[composition.tacts.length - 1];
    let tracks = await getCompositionTracks(compositionId);
    for (let track of tracks) {
        let trackTact = new TrackTact({ track: track._id, tact: tact._id });
        await trackTact.save();
    }
    return tact;
}

export async function updateTact(compositionId, tactData) {
    let tact = await Tact.findById(tactData.id);
    if (!tact)
        return;
    if (!isUndefined(tactData.reprise))
        tact.reprise = tactData.reprise;
    return await tact.save();
}

export async function deleteTact(compositionId, tactId) {
    let composition = await findComposition(compositionId);
    let index = composition.tacts.indexOf(tactId);
    composition.tacts.splice(index, 1);
    await composition.save();
    await TrackTact.deleteMany({tact : tactId}).exec();
}

export async function updateTrackTact(compositionId, trackTactData) {
    let trackTact = await TrackTact.findById(trackTactData.id).exec();
    trackTact.chords = trackTactData.chords;
    return await trackTact.save();
}

export async function getCompositionTracks(id) {
    return await Track.find({ composition: id }).exec();
}

export async function getTrackTacts(id) {
    return await TrackTact.find({ track: id }).exec();
}

export async function getTactTrackTacts(id) {
    return await TrackTact.find({ tact: id}).exec();
}