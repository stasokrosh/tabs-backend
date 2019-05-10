import Tab, { TAB_RIGHTS } from "./tab.model";
import { findUser } from "../user/user.service";
import { isUndefined } from "util";
import { USER_ROLES } from "../user/user.model";

function filterTabsWithUser(query, user) {
    if (user) {
        if (user.role === USER_ROLES.ADMIN) {
            return query;
        } else {
            return query.or([
                { public: true },
                { group: { '$in': user.groups } },
                { creator: user.name },
                { _id: { '$in': user.favouriteTabs } },
                { 'users.name': user.name }
            ]);
        }
    } else {
        return query.where('public').equals(true);
    }
}

export async function createTab(tab) {
    tab = new Tab(tab);
    return await tab.save();
}

export async function findTab(id, user) {
    let query = Tab.findById(id);
    query = filterTabsWithUser(query, user);
    return await query.exec();
}

export async function findAllTabs(user) {
    let query = Tab.find();
    query = filterTabsWithUser(query, user);
    return await query.exec();
}

export async function findTabsByUser(name, user) {
    let query = Tab.find({ creator: name });
    query = filterTabsWithUser(query, user);
    return await query.exec();
}

export async function findFavouriteTabs(name, user) {
    let tabUser = await findUser(name);
    if (!tabUser)
        return;
    let query = Tab.find({ _id: { '$in': tabUser.favouriteTabs } });
    query = filterTabsWithUser(query, user);
    return await query.exec();
}

export async function findTabsByGroup(name, user) {
    let query = Tab.find({ group: name });
    query = filterTabsWithUser(query, user);
    return await query.exec();
}

export async function updateTab(id, data, user) {
    let tab = findTab(id);
    if (!tab)
        return;
    if (!isUndefined(data.name))
        tab.name = data.name;
    if (!isUndefined(data.public) && user.name === tab.creator)
        tab.public = data.public;
    if (!isUndefined(data.users) && user.name === tab.creator)
        tab.users = data.users;
    return await tab.save();
}

export async function removeTab(id) {
    return await Tab.findByIdAndDelete(id).exec();
}

export async function findTabWriters(id) {
    let tab = await findTab(id);
    if (!tab)
        return;
    let writers = tab.users.filter(user => user.rights === TAB_RIGHTS.WRITE).map(user => user.name);
    writers.push(tab.creator);
    return writers;
}

export async function findTabCreator(id) {
    let tab = await findTab(id);
    if (!tab)
        return;
    return tab.creator;
}
