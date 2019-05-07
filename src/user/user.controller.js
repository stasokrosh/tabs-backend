import User from './user.model'
import { getHash } from '../util'

export function create(req, res) {
    let user = new User({
        name: req.body.name,
        passwordHash: getHash(req.body.password),
        role: req.body.role
    });
    user.save((err, user) => {
        if (err)
            res.status(500).send(err.message);
        res.send(user);
    });
};

export function findOne(req, res) {
    User.findOne({name : req.params.name}, (err, user) => {
        if (err)
            res.status(500).send(err.message);
        res.send(user);
    })
};

export function findAll(req, res) {
    User.find((err, users) => {
        if (err)
            res.status(500).send(err.message);
        res.send(users);
    })
};

export function update(req, res) {
    let user = {
        name: req.body.name,
        favourites: req.body.favourites
    };
    User.findOneAndUpdate({name : req.body.name}, user, (err) => {
        if (err)
            res.status(500).send(err.message);
        res.end();
    });
}

export function remove(req, res) {
    User.findByOneAndRemove(req.params.name, (err, user) => {
        if (err)
            res.status(500).send(err.message);
        res.send(user);
    });
}

export function addFavourite(req, res) {
    User.findOne({name : req.params.name}, (err, user) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            user.favourites.push(req.body.tabId)
            tab.save((err) => {
                if (err)
                    res.status(500).send(err.message);
                res.end();
            });
        }
    });
}

export function removeFavourite(req, res) {
    User.findOne({name : req.params.name}, (err, user) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            let index = user.favourites.indexOf(req.params.tabId);
            if (index === -1) {
                res.status(404).end();
            } else {
                user.favourites[index].remove();
                tab.save((err) => {
                    if (err)
                        res.status(500).send(err.message);
                    res.end();
                });
            }
        }
    });
}