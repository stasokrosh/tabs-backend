import mongoose from 'mongoose'

const ObjectId = mongoose.Types.ObjectId;

export const TAB_RIGHTS = {
    READ : 'read',
    WRITE : 'write'
};

let TabSchema = new mongoose.Schema({
    creator: { type: String, required: true },
    groupId: String,
    createDate: { type: Date, default: Date.now },
    users: [{
        name: String,
        rights: {type: String, enum : [TAB_RIGHTS.READ, TAB_RIGHTS.WRITE]}
    }],
    public : Boolean,
    composition : { type: ObjectId, ref : 'Composition' }
});

const Tab = mongoose.model('Tab', TabSchema);

export default Tab;