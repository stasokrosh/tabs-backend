import Group from './group.model'
import { handleError } from '../util';

function convertGroup(group, auth) {
    let res = {
    }
    return res;
}

function convertGroups(groups, auth) {
    return groups.map(group => convertGroup(group, auth));
}

function filterGroupsWithUser(query, auth, user) {
    if (auth) {
        if (auth.role === USER_ROLES.ADMIN) {
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
export async function create(req, res) {
    let auth = req.decoded;
    if (!auth || auth.role === USER_ROLES.ADMIN) {
        res.status(ERROR_STATUSES.FORBIDDEN);
    } else {
        try {
            let group = new Group({
                name: req.body.name,
                creator: auth.name,
                public: req.body.public
            });
            group = await group.save();
            res.send(convertGroup(group));
        } catch (err) {
            handleError(err, res);
        }
    }
};

export async function findOne(req, res) {
    let auth = req.decoded;
    try {
        let user = auth || auth.role === USER_ROLES.USER ? await User.findOne({ name: auth.name }).exec() : null;
        let query = Group.findOne({ name: req.params.name });
        query = filterGroupsWithUser(query, auth, user);
        let group = await query.exec();
        if (!group)
            res.status(ERROR_STATUSES.NOT_FOUND).end();
        else
            res.send(convertGroup(group, auth));
    } catch (err) {
        handleError(err, res);
    }
};

export async function findAll(req, res) {
    let auth = req.decoded;
    try {
        let user = auth || auth.role === USER_ROLES.USER ? await User.findOne({ name: auth.name }).exec() : null;
        let query = Group.find();
        query = filterGroupsWithUser(query, auth, user);
        let groups = await query.exec();
        res.send(convertGroups(groups, auth));
    } catch (err) {
        handleError(err, res);
    }
};

export async function findByUser(req, res) {
    let auth = req.decoded;
    try {
        let groupUser = await User.findOne({ name: req.params.name }).exec();
        if (!groupUser) {
            res.status(ERROR_STATUSES.NOT_FOUND).end();
        } else {
            let user = auth || auth.role === USER_ROLES.USER ? await User.findOne({ name: auth.name }).exec() : null;
            let query = Groups.find({ creator: groupUser.name });
            query = filterGroupsWithUser(query, auth, user);
            let groups = await query.exec();
            res.send(convertGroups(groups, auth));
        }
    } catch (err) {
        handleError(err, res);
    }
};

export async function findUserMemberIn(req, res) {
    let auth = req.decoded;
    try {
        let groupUser = await User.findOne({ name: req.params.name }).exec();
        if (!groupUser) {
            res.status(ERROR_STATUSES.NOT_FOUND).end();
        } else {
            let user = auth || auth.role === USER_ROLES.USER ? await User.findOne({ name: auth.name }).exec() : null;
            let query = Group.find({ name: { '$in': groupUser.groups } });
            query = filterGroupsWithUser(query, auth, user);
            let groups = await query.exec();
            res.send(convertGroups(groups, auth));
        }
    } catch (err) {
        handleError(err, res);
    }
}


export async function update(req, res) {
    let auth = req.decoded;
    try {
        let group = await Group.findOne({ name: req.params.name }).exec();
        if (!group) {
            res.status(ERROR_STATUSES.NOT_FOUND).end();
        } else {
            if (group.creator === auth.name) {
                if (!isUndefined(req.body.name))
                    group.name = req.body.name;
                if (!isUndefined(req.body.public))
                    group.public = req.body.public;
                group = await group.save();
                res.send(group);
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
        let group = await Group.findOne(req.params.name).exec();
        if (!group) {
            res.status(ERROR_STATUSES.NOT_FOUND).end();
        } else {
            if (!auth || auth.role === USER_ROLES.USER && auth.name !== group.creator) {
                res.status(ERROR_STATUSES.FORBIDDEN).end();
            } else {
                await group.remove();
                res.end();
            }
        }
    } catch (err) {
        handleError(err, res);
    }
}