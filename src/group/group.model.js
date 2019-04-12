import mongoose from 'mongoose'

const ObjectId = mongoose.Schema.ObjectId;

let GroupSchema = new mongoose.Schema({
    name: { type: String, required: true, max: 20, unique: true },
    creatorId: { type: ObjectId, required: true },
    createDate: { type: Date, default: Date.now },
    members: [{
        userId: ObjectId,
        rights: [{type: String, enum : ["read", "write"]}],
        isAdmin: Boolean
    }],
    public : Boolean
});

const Group = mongoose.model('Group', GroupSchema);

export default Group;