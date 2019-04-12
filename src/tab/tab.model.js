import mongoose from 'mongoose'

const ObjectId = mongoose.Schema.ObjectId;

let GroupSchema = new mongoose.Schema({
    name: { type: String, required: true, max: 20, unique: true },
    creatorId: { type: ObjectId, required: true },
    groupId: ObjectId,
    createDate: { type: Date, default: Date.now },
    users: [{
        userId: ObjectId,
        rights: [{type: String, enum : ["read", "write"]}]
    }],
    public : Boolean
});

const Group = mongoose.model('Group', GroupSchema);

export default Group;