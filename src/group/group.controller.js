
import { handleError, getUserFromAuth, sendErrorResponse } from '../util'
import { USER_ROLES } from '../user/user.model'
import { convertGroup, convertGroups } from './group.converter'
import { createGroup, findAllGroups, findGroupsByUser, findGroupsByUserMember, updateGroup, findGroupCreator, removeGroup, findGroup } from './group.service';

export async function create(req, res) {
    let auth = req.decoded;
    if (!auth || auth.role === USER_ROLES.ADMIN) {
        res.status(ERROR_STATUSES.FORBIDDEN);
    } else {
        try {
            group = await createGroup({
                name: req.body.name,
                creator: auth.name,
                public: req.body.public
            })
            res.send(convertGroup(group));
        } catch (err) {
            handleError(err, res);
        }
    }
};

export async function findOne(req, res) {
    let auth = req.decoded;
    try {
        let user = await getUserFromAuth(auth);
        let group = await findGroup(req.params.name, user);
        if (!group)
            sendErrorResponse(ERROR_STATUSES.NOT_FOUND, res);
        else
            res.send(convertGroup(group, auth));
    } catch (err) {
        handleError(err, res);
    }
};

export async function findAll(req, res) {
    let auth = req.decoded;
    try {
        let user = await getUserFromAuth(auth);
        let groups = await findAllGroups(user);
        res.send(convertGroups(groups, auth));
    } catch (err) {
        console.log(err);
        handleError(err, res);
    }
};

export async function findByUser(req, res) {
    let auth = req.decoded;
    try {
        let user = await getUserFromAuth(auth);
        let groups = await findGroupsByUser(req.params.name, user);
        res.send(convertGroups(groups, auth));
    } catch (err) {
        handleError(err, res);
        console.log(err);
    }
};

export async function findUserMemberIn(req, res) {
    let auth = req.decoded;
    try {
        let user = await getUserFromAuth(auth);
        let groups = await findGroupsByUserMember(req.params.name, user);
        res.send(convertGroups(groups, auth));
    } catch (err) {
        handleError(err, res);
    }
}

export async function update(req, res) {
    let auth = req.decoded;
    try {
        let creator = await findGroupCreator(req.params.name);
        if (!creator) {
            sendErrorResponse(ERROR_STATUSES.NOT_FOUND, res);
        } else if (group.creator === auth.name) {
            let group = await updateGroup(req.params.name, req.params.body);
            res.send(group);
        } else {
            sendErrorResponse(ERROR_STATUSES.FORBIDDEN, res);
        }
    } catch (err) {
        handleError(err, res);
    }
}

export async function remove(req, res) {
    let auth = req.decoded;
    try {
        let creator = await findGroupCreator(req.params.name);
        if (!creator) {
            sendErrorResponse(ERROR_STATUSES.NOT_FOUND, res);
        } else if (!auth || auth.role === USER_ROLES.USER && auth.name !== creator) {
            sendErrorResponse(ERROR_STATUSES.FORBIDDEN, res);
        } else {
            await removeGroup(req.params.name);
            res.end();
        }
    } catch (err) {
        console.log(err);
        handleError(err, res);
    }
}