
export function convertComposition(composition) {
    let res = {
        name: composition.name,
        tacts : composition.tacts.map(tact => convertTact(tact)),
        tracks : composition.tracks.map(track => convertTrack(track))
    }
    return res;
}

function convertTact(tact) {
    let res = {
        id : tact._id,
        tactDuration : tact.duration,
        reprise : tact.reprise
    }
    return res;
}

function convertTrack(track) {
    let res = {
        id : track._id,
        name : track.name,
        tacts : track.tacts.map(tact => convertTrackTact(tact)),
        instrument : {
            code : track.instrument
        }
    }
    return res;
}

function convertTrackTact(tact) {
    let res = {
        id : tact._id,
        tact : tact.tact,
        chords : tact.chords.map(chord => convertChord(chord))
    }
    return res;
}

function convertChord(chord) {
    let res = {
        duration : chord.duration,
        isPause : chord.isPause,
        notes : chord.notes.map(note => convertNote(note))
    }
    return res;
}

function convertNote(note) {
    let res = {
        item : note.item,
        index : note.index
    }
    return res;
}