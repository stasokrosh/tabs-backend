import jwt from 'jsonwebtoken'
import { getHash, handleError, ERROR_STATUSES } from '../util'
import User, { USER_ROLES } from '../user/user.model'

const DEFAULT_EXPIRE_TIME = 1440;

function getJwtToken(user) {
    return jwt.sign({ name: user.name, role: user.role }, process.env.JWT_SECRET, { expiresIn: DEFAULT_EXPIRE_TIME });
}

export function signin(req, res) {
    User.findOne({ name: req.body.name }, (err, user) => {
        if (err) {
            handleError(err, res);
        } else if (!user) {
            res.status(ERROR_STATUSES.NOT_FOUND).end();
        } else if (getHash(req.body.password) !== user.passwordHash) {
            res.status(ERROR_STATUSES.NOT_FOUND).end();
        } else {
            let token = getJwtToken(user);
            res.send({ token: token });
        }
    })
}

export function signup(req, res) {
    let user = new User({
        name: req.body.name,
        passwordHash: getHash(req.body.password),
        role: USER_ROLES.USER
    });
    user.save((err, user) => {
        if (err) {
            handleError(err, res);
        } else {
            let token = getJwtToken(user);
            res.send({ token: token });
        }
    });
}