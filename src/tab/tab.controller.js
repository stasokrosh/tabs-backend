import Tab, { TAB_RIGHTS } from './tab.model'
import { handleError, ERROR_STATUSES } from '../util/index'
import User, { USER_ROLES } from '../user/user.model';
import { isUndefined } from 'util';

function convertTab(tab, auth) {
    let res = {
        id: tab._id,
        name: tab.name,
        creator: tab.creator,
        public: tab.public,
        group: tab.group
    }
    if (auth.name === tab.creator)
        res.users = tab.users;
    return res;
}

function convertTabs(tabs, auth) {
    return tabs.map(tab => convertTab(tab, auth));
}

function filterTabsWithUser(query, auth, user) {
    if (auth) {
        if (auth.role === USER_ROLES.ADMIN) {
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

export async function create(req, res) {
    let auth = req.decoded;
    if (!auth || auth.role === USER_ROLES.ADMIN) {
        res.status(ERROR_STATUSES.FORBIDDEN);
    } else {
        try {
            let tab = new Tab({
                name: req.body.name,
                creator: auth.name,
                users: req.body.users,
                public: req.body.public,
                group: req.body.group
            });
            tab = await tab.save()
            res.send(convertTab(tab, auth));
        } catch (err) {
            handleError(err, res);
        }
    }
};


export async function findOne(req, res) {
    let auth = req.decoded;
    try {
        let user = auth || auth.role === USER_ROLES.USER ? await User.findOne({ name: auth.name }).exec() : null;
        let query = Tab.findById(req.params.id);
        query = filterTabsWithUser(query, auth, user);
        let tab = await query.exec();
        if (!tab)
            res.status(ERROR_STATUSES.NOT_FOUND).end();
        else
            res.send(convertTab(tab, auth));
    } catch (err) {
        handleError(err, res);
    }
};

export async function findAll(req, res) {
    let auth = req.decoded;
    try {
        let user = auth || auth.role === USER_ROLES.USER ? await User.findOne({ name: auth.name }).exec() : null;
        let query = Tab.find();
        query = filterTabsWithUser(query, auth, user);
        let tabs = await query.exec();
        res.send(convertTabs(tabs, auth));
    } catch (err) {
        handleError(err, res);
    }
};

export async function findByUser(req, res) {
    let auth = req.decoded;
    try {
        let tabUser = await User.findOne({ name: req.params.name }).exec();
        if (!tabUser) {
            res.status(ERROR_STATUSES.NOT_FOUND).end();
        } else {
            let user = auth || auth.role === USER_ROLES.USER ? await User.findOne({ name: auth.name }).exec() : null;
            let query = Tab.find({ creator: tabUser.name });
            query = filterTabsWithUser(query, auth, user);
            let tabs = await query.exec();
            res.send(convertTabs(tabs, auth));
        }
    } catch (err) {
        handleError(err, res);
    }
};

export async function findUserFavourite(req, res) {
    let auth = req.decoded;
    try {
        let tabUser = await User.findOne({ name: req.params.name }).exec();
        if (!tabUser) {
            res.status(ERROR_STATUSES.NOT_FOUND).end();
        } else {
            let user = auth || auth.role === USER_ROLES.USER ? await User.findOne({ name: auth.name }).exec() : null;
            let query = Tab.find({ _id : {'$in' : tabUser.favouriteTabs } });
            query = filterTabsWithUser(query, auth, user);
            let tabs = await query.exec();
            res.send(convertTabs(tabs, auth));
        }
    } catch (err) {
        handleError(err, res);
    }
}

export async function update(req, res) {
    let auth = req.decoded;
    try {
        let tab = await Tab.findById(req.params.id).exec();
        if (!tab) {
            res.status(ERROR_STATUSES.NOT_FOUND).end();
        } else {
            if (tab.creator === auth.name || tab.users.find(user => user.name === auth.name && user.rights === TAB_RIGHTS.WRITE)) {
                if (!isUndefined(req.body.name))
                    tab.name = req.body.name;
                if (!isUndefined(req.body.public) && auth && auth.name === tab.creator)
                    tab.public = req.body.public;
                tab = await tab.save();
                res.send(tab);
            } else {
                res.status(ERROR_STATUSES.FORBIDDEN).end();
            }
        }
    } catch (err) {
        handleError(err, res);
    }
}

export async function remove(req, res) {
    let auth = req.decoded;
    try {
        let tab = await Tab.findById(req.params.id).exec();
        if (!tab) {
            res.status(ERROR_STATUSES.NOT_FOUND).end();
        } else {
            if (!auth || auth.role === USER_ROLES.USER && auth.name !== tab.creator) {
                res.status(ERROR_STATUSES.FORBIDDEN).end();
            } else {
                await tab.remove();
                res.end();
            }
        }
    } catch (err) {
        handleError(err, res);
    }
}

