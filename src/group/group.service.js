import Group from "./group.model";
import { isUndefined } from "util";
import { USER_ROLES } from "../user/user.model";
import { findUser } from "../user/user.service";

function filterGroupsWithUser(query, user) {
    if (user) {
        if (user.role === USER_ROLES.ADMIN) {
            return query;
        } else {
            return query.or([
                { public: true },
                { name: { '$in': user.groups } },
                { creator: user.name },
            ]);
        }
    } else {
        return query.where('public').equals(true);
    }
}

export async function createGroup(group) {
    group = new Group(group);
    return await group.save();
}

export async function findGroup(name, user) {
    let query = Group.findOne({ name : name });
    query = filterGroupsWithUser(query, user);
    return await query.exec();
}

export async function findAllGroups(user) {
    let query = Group.find();
    query = filterGroupsWithUser(query, user);
    return await query.exec();
}

export async function findGroupsByUser(name, user) {
    let query = Group.find({ creator: name });
    query = filterGroupsWithUser(query, user);
    return await query.exec();
}

export async function findGroupsByUserMember(name, user) {
    let groupUser = await findUser(name);
    if (!groupUser)
        return;
    let query = Group.find({ name: { '$in': groupUser.groups } });
    query = filterGroupsWithUser(query, user);
    return await query.exec();
}

export async function updateGroup(name, data) {
    let group = await findGroup(name);
    if (!group)
        return;
    if (!isUndefined(data.name))
        group.name = data.name;
    if (!isUndefined(data.public))
        group.public = data.public;
    if (!isUndefined(data.image))
        group.image = data.image;
    return await group.save();
}

export async function removeGroup(name) {
    return await Group.findOneAndDelete({name}).exec();
}

export async function findGroupCreator(name, user) {
    let group = await findGroup(name, user);
    if (!group)
        return;
    return group.creator;
}