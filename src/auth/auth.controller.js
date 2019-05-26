import jwt from 'jsonwebtoken'
import { getHash, handleError, ERROR_STATUSES, sendErrorResponse } from '../util'
import User, { USER_ROLES } from '../user/user.model'
import { createUser, findUser } from '../user/user.service';

const DEFAULT_EXPIRE_TIME = 14400;

function convertUser(user) {
    return {
        name : user.name,
        role : user.role,
        favouriteTabs : user.favouriteTabs,
        groups : user.groups,
        image: user.image
    }
}

function getJwtToken(user) {
    return jwt.sign({ name: user.name, role: user.role, image: user.image }, process.env.JWT_SECRET, { expiresIn: DEFAULT_EXPIRE_TIME });
}

export async function signin(req, res) {
    try {
        let user = await findUser(req.body.name);
        if (!user) {
            sendErrorResponse(ERROR_STATUSES.NOT_FOUND, res);
        } else if (getHash(req.body.password) !== user.passwordHash) {
            sendErrorResponse(ERROR_STATUSES.AUTH_FAILED, res);
        } else {
            let token = getJwtToken(user);
            res.send({ token: token });
        }
    } catch (err) {
        handleError(err, res);
    }
}

export async function signup(req, res) {
    try {
        let user = await createUser({
            name: req.body.name,
            passwordHash: getHash(req.body.password),
            role: USER_ROLES.USER
        });
        let token = getJwtToken(user);
        res.send({ token: token });
    } catch (err) {
        handleError(err, res);
    }
}

export async function getAuthInfo(req, res) {
    let auth = req.decoded;
    if (!auth) {
        sendErrorResponse(ERROR_STATUSES.BAD_REQUEST, res);
    } else {
        try {
            let user = await findUser(auth.name);
            res.send(convertUser(user));
        } catch(err) {
            handleError(err);
        }
    }
}