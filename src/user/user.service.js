import User, { USER_ROLES } from './user.model'
import { isUndefined } from "util";

export async function createUser(user) {
    user = new User(user);
    return await user.save()
}

export async function findUser(name) {
    return await User.findOne({ name }).exec();
}

export async function findAllUsers() {
    return await User.find({ role : USER_ROLES.USER }).exec();
}

export async function findUsersByGroup(group) {
    return await User.find({ groups: group, role : USER_ROLES.USER }).exec();
}

export async function updateUser(name, data) {
    let user = await findUser(name);
    if (!user) {
        return;
    } else {
        if (!isUndefined(data.name))
            user.name = data.name;
        if (!isUndefined(data.favouriteTabs))
            user.favouriteTabs = data.favouriteTabs;
        if (!isUndefined(data.groups))
            user.groups = data.groups;
        if (!isUndefined(data.image))
            user.image = data.image;
        return await user.save();
    }
}

export async function removeUser(name) {
    return await User.findOneAndDelete({name}).exec();
}