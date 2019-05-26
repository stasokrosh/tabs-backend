import mongoose from 'mongoose'

const ObjectId = mongoose.Schema.Types.ObjectId;

let TactSchema = new mongoose.Schema({
    reprise: Number,
    duration: {
        count: Number,
        fraction: Number
    }
});

export const Tact = mongoose.model('Tact', TactSchema);

let NoteSchema = new mongoose.Schema({
    fret: Number
})

let ChordSchema = new mongoose.Schema({
    notes: [{item : NoteSchema, index : Number}],
    duration: {
        fraction: Number,
        quaterIs: Number,
        dot: Boolean
    },
    isPause: Boolean
})

let TrackTactSchema = new mongoose.Schema({
    track: {
        type: ObjectId,
        ref: 'Track'
    },
    tact: {
        type: ObjectId,
        ref: 'Tact'
    },
    chords: [ChordSchema]
})

export const TrackTact = mongoose.model('TrackTact', TrackTactSchema);

let CompositionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    tacts: [{ type: ObjectId, ref: 'Tact' }]
});

export const Composition = mongoose.model('Composition', CompositionSchema);

let TrackSchema = new mongoose.Schema({
    composition: { type: ObjectId, ref: 'Composition' },
    name: { type: String, required: true, max: 20 },
    instrument: Number
});

export const Track = mongoose.model('Track', TrackSchema);