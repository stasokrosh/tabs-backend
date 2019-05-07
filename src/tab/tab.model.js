import mongoose from 'mongoose'

export const TAB_USER_RIGHTS = {
    READ : 'read',
    WRITE : 'write'
};

let TabSchema = new mongoose.Schema({
    name: { type: String, required: true, max: 20, unique: true },
    creator: { type: String, required: true },
    group: String,
    createDate: { type: Date, default: Date.now },
    users: [{
        name: String,
        rights: [{type: String, enum : [TAB_USER_RIGHTS.READ, TAB_USER_RIGHTS.WRITE]}]
    }],
    public : Boolean
});

const Tab = mongoose.model('Tab', TabSchema);

export default Tab;