import { USER_ROLES } from './user.model'
import { getHash, handleError, ERROR_STATUSES, sendErrorResponse } from '../util'
import { createUser, findUser, findAllUsers, findUsersByGroup, updateUser, removeUser } from './user.service';
import { convertUser, convertUsers } from './user.converter'

export async function create(req, res) {
    let auth = req.decoded;
    if (auth.role === USER_ROLES.ADMIN) {
        try {
            user = await createUser({
                name: req.body.name,
                passwordHash: getHash(req.body.password),
                role: req.body.role
            })
            res.send(convertUser(user, auth));
        } catch (err) {
            handleError(err, res);
        }
    } else {
        sendErrorResponse(ERROR_STATUSES.FORBIDDEN, res);
    }
};

export async function findOne(req, res) {
    let auth = req.decoded;
    try {
        let user = await findUser(req.params.name);
        if (!user)
            sendErrorResponse(ERROR_STATUSES.NOT_FOUND, res);
        else
            res.send(convertUser(user, auth));
    } catch (err) {
        handleError(err, res);
    }
};

export async function findAll(req, res) {
    let auth = req.decoded;
    try {
        let users = await findAllUsers();
        console.log(users);
        res.send(convertUsers(users, auth));
    } catch (err) {
        handleError(err, res);
    }
};

export async function findByGroup(req, res) {
    let auth = req.decoded;
    try {
        let users = await findUsersByGroup(req.params.name);
        res.send(convertUsers(users, auth));
    } catch (err) {
        handleError(err, res);
    }
};

export async function update(req, res) {
    let auth = req.decoded;
    try {
        if (auth && auth.name === req.params.name) {
            let user = await updateUser(req.params.name, req.body);
            if (user)
                res.send(convertUser(user, auth));
            else
                sendErrorResponse(ERROR_STATUSES.NOT_FOUND, res);
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
        if (auth && (auth.name === req.params.name || auth.role === USER_ROLES.ADMIN)) {
            let user = await removeUser();
            if (user)
                res.end();
            else
                sendErrorResponse(ERROR_STATUSES.NOT_FOUND, res);
        } else {
            sendErrorResponse(ERROR_STATUSES.FORBIDDEN, res);
        }
    } catch (err) {
        handleError(err, res);
    }
}