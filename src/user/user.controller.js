import User, { USER_ROLES } from './user.model'
import { getHash, handleError, ERROR_STATUSES } from '../util'
import { isUndefined } from 'util';
import Group from '../group/group.model';

function convertUser(user, auth) {
    let res = {};
    return res;
}

function convertUsers(users, auth) {
    return users.map(user => convertUsers(user, auth));
}

export async function create(req, res) {
    let auth = req.decoded;
    try {
        let user = new User({
            name: req.body.name,
            passwordHash: getHash(req.body.password),
            role: req.body.role
        });
        user = await user.save()
        res.send(convertUser(user, auth));
    } catch (err) {
        handleError(err, res);
    }
};

export async function findOne(req, res) {
    let auth = req.decoded;
    try {
        let user = await User.findOne({ name: req.params.name }).exec();
        if (!user)
            res.status(ERROR_STATUSES.NOT_FOUND).end();
        else
            res.send(convertUser(user, auth));
    } catch (err) {
        handleError(err, res);
    }
};

export async function findAll(req, res) {
    let auth = req.decoded;
    try {
        let users = await User.find().exec();
        res.send(convertUsers(users, auth));
    } catch (err) {
        handleError(err, res);
    }
};

export async function findByGroup(req, res) {
    let auth = req.decoded;
    try {
        let group = await Group.findOne({name : req.params.name});
        if (!group) {
            res.status(ERROR_STATUSES.NOT_FOUND);
        } else {
            let users = await User.find({groups : group.name}).exec();
            res.send(convertUsers(users, auth));
        }
    } catch (err) {
        handleError(err, res);
    }
};

export async function update(req, res) {
    let auth = req.decoded;
    try {
        let user = await User.findOne({ name: req.params.name });
        if (!user) {
            res.status(ERROR_STATUSES.NOT_FOUND).end();
        } else {
            if (auth && auth.name !== req.params.name) {
                if (!isUndefined(req.body.name))
                    user.name = req.body.name;
                if (!isUndefined(req.body.favouriteTabs))
                    user.favouriteTabs = req.body.favouriteTabs;
                user = await user.save();
                res.send(convertUser(user,auth));
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
        let user = await User.findOne({ name: req.params.name });
        if (!user) {
            res.status(ERROR_STATUSES.NOT_FOUND).end();
        } else {
            if (auth && auth.name !== req.params.name || auth && auth.role === USER_ROLES.ADMIN) {
                await user.remove();
                res.end();
            } else {
                res.status(ERROR_STATUSES.FORBIDDEN).end();
            }
        }
    } catch (err) {
        handleError(err, res);
    }
}