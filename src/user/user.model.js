import mongoose from 'mongoose'

const ObjectId = mongoose.Schema.ObjectId;

let UserSchema = new mongoose.Schema({
    name: {type: String, required: true, max: 20, unique : true},
    passwordHash: {type: Number, required: true},
    role : {type: String, enum : ['user','admin'], required: true},
    favourites : [ObjectId]
});

const User = mongoose.model('User', UserSchema);

export default User;