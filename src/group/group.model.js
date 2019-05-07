import mongoose from 'mongoose'

const ObjectId = mongoose.Schema.ObjectId;

export const GROUP_USER_RIGHTS = {
    READ : 'read',
    WRITE : 'write'
};

let GroupSchema = new mongoose.Schema({
    name: { type: String, required: true, max: 20, unique: true },
    creatorId: { type: ObjectId, required: true },
    createDate: { type: Date, default: Date.now },
    members: [{
        userId: ObjectId,
        rights: [{type: String, enum : [ GROUP_USER_RIGHTS.READ, GROUP_USER_RIGHTS.WRITE ]}],
        isAdmin: Boolean
    }],
    public : Boolean
});

const Group = mongoose.model('Group', GroupSchema);

export default Group;