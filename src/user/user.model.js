import mongoose from 'mongoose'

const ObjectId = mongoose.Schema.ObjectId;

export const USER_ROLES = {
    USER: 'user',
    ADMIN: 'admin'
}

let UserSchema = new mongoose.Schema({
    name: { type: String, required: true, max: 20, unique: true },
    passwordHash: { type: Number, required: true },
    role: { type: String, enum: [USER_ROLES.USER, USER_ROLES.ADMIN], required: true },
    favouriteTabs: [ObjectId],
    groups: [String],
    image: String
});

const User = mongoose.model('User', UserSchema);

export default User;