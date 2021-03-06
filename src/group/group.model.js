import mongoose from 'mongoose'

let GroupSchema = new mongoose.Schema({
    name: { type: String, required: true, max: 20, unique: true },
    creator: { type: String, required: true },
    createDate: { type: Date, default: Date.now },
    public : Boolean,
    image : String
});

const Group = mongoose.model('Group', GroupSchema);

export default Group;