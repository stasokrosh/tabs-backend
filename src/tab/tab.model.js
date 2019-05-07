import mongoose from 'mongoose'

export const TAB_RIGHTS = {
    READ : 'read',
    WRITE : 'write'
};

let TabSchema = new mongoose.Schema({
    name: { type: String, required: true, max: 20 },
    creator: { type: String, required: true },
    groupId: String,
    createDate: { type: Date, default: Date.now },
    users: [{
        name: String,
        rights: {type: String, enum : [TAB_RIGHTS.READ, TAB_RIGHTS.WRITE]}
    }],
    public : Boolean
});

const Tab = mongoose.model('Tab', TabSchema);

export default Tab;