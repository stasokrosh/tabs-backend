import jwt from 'jsonwebtoken'
import { getHash } from '../util'
import User from '../user/user.model'

const DEFAULT_EXPIRE_TIME = 1440;

export function signin(req, res) {
    User.findOne({ name: req.body.name }, (err, user) => {
        if (err) {
            res.status(500).send(err.message);
        } else if (!user) {
            res.status(404).end();
        } else if (getHash(req.body.password) !== user.passwordHash) {
            res.status(400).end();
        } else {
            let token = jwt.sign(user, process.env.JWT_SECRET, DEFAULT_EXPIRE_TIME);
            res.send({ token: token });
        }
    })
}