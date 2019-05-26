import { Composition, Track, TrackTact, Tact } from "./tab.edit.model";
import { DEFAULT_TRACK_NAME, DEFAULT_TACT_DURATION, DEFAULT_TRACK_INSTRUMENT } from "./util";
import { isUndefined } from "util";
import { findTab } from "../tab/tab.service";

export async function createComposition(composition) {
    composition = new Composition(composition);
    await composition.save();
    let track = new Track({
        name : DEFAULT_TRACK_NAME, 
        composition : composition._id,
        instrument : DEFAULT_TRACK_INSTRUMENT
    });
    await track.save();
    await addTact(composition, {duration : DEFAULT_TACT_DURATION});
    return composition;
}

export async function findComposition(tabId, user) {
    let tab = await findTab(tabId, user);
    if (!tab)
        return;
    let resComposition = await Composition.findById(tab.composition).populate('tacts').exec();
    resComposition.tracks = await getCompositionTracks(resComposition._id);
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
        let tacts = await getTrackTacts(track._id);
        for (let tact of tacts)
            await TrackTact.findByIdAndDelete(tact._id).exec();
        await Track.findByIdAndDelete(track._id).exec();
    }
    await Composition.findByIdAndDelete(id).exec();
}

export async function addTact(composition, tact, tracks) {
    tact = new Tact(tact);
    await tact.save();
    composition.tacts.push(tact._id);
    await composition.save();
    tact = composition.tacts[composition.tacts.length - 1];
    if (!tracks)
        tracks = await getCompositionTracks(composition._id);
    for (let track of tracks) {
        let trackTact = new TrackTact({track : track._id, tact : tact._id});
        await trackTact.save();
    }
}

export async function getCompositionTracks(id) {
    return await Track.find({composition : id}).exec();
}

export async function getTrackTacts(id) {
    return await TrackTact.find({track : id}).exec();
}