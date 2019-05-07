import Tab, { TAB_USER_RIGHTS } from './tab.model'
import { handleError, ERROR_STATUSES } from '../util/index'
import User, { USER_ROLES } from '../user/user.model';
import Group from '../group/group.model';
import { isUndefined } from 'util';

function convertTab(tab, auth) {
    let res = {
        id : tab._id,
        name : tab.name,
        creator : tab.creator,
        public : tab.public,
        group : tab.group
    }
    if (auth.name === tab.creator)
        res.users = tab.users;
    return res;
}

function convertTabs(tabs, auth) {
    return tabs.map(tab => convertTab(tab, auth));
}

export function create(req, res) {
    let auth = req.decoded;
    if (!auth || auth.role === USER_ROLES.ADMIN)
        let tab = new Tab({
            name: req.body.name,
            creator: req.body.creator,
            users: req.body.users,
            public: req.body.public,
            group: req.body.group
        });
    tab.save((err) => {
        if (err) {
            handleError(err, res);
        } else {
            res.send(convertTab(tab, auth));
        }
    });
};


export function findOne(req, res) {
    let auth = req.decoded;
    Tab.findById(req.params.id, (err, tab) => {
        if (err) {
            handleError(err, res);
        } else {
            if (auth) {
                if (auth.role === USER_ROLES.ADMIN) {
                        res.send(convertTab(tab));
                } else {
                    if (tab.creator === auth.name && tab.users.find(user => user.name === auth.name))
                        res.send(convertTab(tab));
                    else
                        User.findOne({ name: auth.name }, (err, user) => {
                            if (err) {
                                handleError(err, res);
                            } else {
                                if (user.favourites.indexOf(tab._id) !== -1)
                                    res.send(convertTab(tab));
                                else if (tab.group)
                                    Group.findOne({ 'users.name': user.name, name: tab.group }, (err, group) => {
                                        if (err) {
                                            handleError(err, res);
                                        } else {
                                            if (group)
                                                res.send(convertTab(tab));
                                            else
                                                res.status(ERROR_STATUSES.FORBIDDEN).end();
                                        }
                                    });
                                else
                                    res.status(ERROR_STATUSES.FORBIDDEN).end();
                            }
                        });
                }
            } else {
                if (!tab.public) {
                    res.status(ERROR_STATUSES.FORBIDDEN).end();
                } else {
                    res.send(convertTab(tab));
                }
            }
        }
    })
};

export function findAll(req, res) {
    let auth = req.decoded;
    if (auth) {
        if (auth.role === USER_ROLES.ADMIN) {
            Tab.find((err, tabs) => {
                if (err)
                    handleError(err, res);
                res.send(convertTabs(tabs));
            });
        } else {
            User.findOne({ name: auth.name }, (err, user) => {
                if (err) {
                    handleError(err, res);
                } else {
                    Group.find({ 'users.name': user.name }, (err, groups) => {
                        if (err) {
                            handleError(err, res);
                        } else {
                            console.log(user);
                            Tab.find().or([{ public: true },
                            { group: { '$in': groups.map(group => group.name) } },
                            { creator: user.name },
                            { _id: { '$in': user.favourites } },
                            { 'users.name': user.name }
                            ]).exec((err, tabs) => {
                                if (err) {
                                    handleError(err, res);
                                } else {
                                    res.send(convertTabs(tabs));
                                }
                            })
                        }
                    })
                }
            })
        }
    } else {
        Tab.find({ public: true }, (err, tabs) => {
            if (err)
                handleError(err, res);
            res.send(convertTabs(tabs));
        })
    }
};

export function findByUser(req, res) {
    let auth = req.decoded;
    User.findOne({name : req.params}, (err, user) => {
        if (err) {
            handleError(err);
        } else if (!user) {
            res.status(ERROR_STATUSES.NOT_FOUND).end();
        } else {
            if (!auth) {
                Tab.find({creator : user.name, public : true}, (err, tabs) => {
                    if (err)
                        handleError(err);
                    else
                        res.send(convertTabs(tabs, auth));
                });
            } else if (auth.role === USER_ROLES.ADMIN || auth.name === user.name) {
                Tab.find({creator : user.name}, (err, tabs) => {
                    if (err)
                        handleError(err);
                    else
                        res.send(convertTabs(tabs, auth));
                });
            } else {
                User.findOne({ name: auth.name }, (err, user) => {
                    if (err) {
                        handleError(err, res);
                    } else {
                        Group.find({ 'users.name': user.name }, (err, groups) => {
                            if (err) {
                                handleError(err, res);
                            } else {
                                console.log(user);
                                Tab.find().or([{ public: true },
                                { group: { '$in': groups.map(group => group.name) } },
                                { _id: { '$in': user.favourites } },
                                { 'users.name': user.name }
                                ]).exec((err, tabs) => {
                                    if (err) {
                                        handleError(err, res);
                                    } else {
                                        res.send(convertTabs(tabs));
                                    }
                                })
                            }
                        })
                    }
                })
            }
        }
    })
};

export function update(req, res) {
    let auth = req.decoded;
    let updateTab = (tab) => {
        if (!isUndefined(req.body.name))
            tab.name = req.body.name;
        if (!isUndefined(req.body.users) && auth && auth.name === tab.creator)
            tab.users = req.body.users;
        if (!isUndefined(req.body.public) && auth && auth.name === tab.creator)
            tab.public = req.body.public;
        tab.save((err) => {
            if (err)
                handleError(err);
            else
                res.end();
        });
    }
    Tab.findById(req.params.id, (err, tab) => {
        if (err) {
            handleError(err);
        } else {
            if (!tab) {
                res.status(ERROR_STATUSES.NOT_FOUND).end();
            } else if (!auth || auth.role === USER_ROLES.ADMIN) {
                res.status(ERROR_STATUSES.FORBIDDEN).end();
            } else {
                if (tab.creator === auth.name) {
                    updateTab(tab);
                } else {
                    let tabUser = tab.users.find(user => user.name === auth.name);
                    if (tabUser && tabUser.rights.indexOf(TAB_USER_RIGHTS.WRITE) !== -1)
                        updateTab(tab);
                    else if (tab.group) {
                        Group.findOne({ 'users.name': auth.name, 'users.rights': { '$in': [TAB_USER_RIGHTS.WRITE] }, name: tab.group }, (err, group) => {
                            if (err) {
                                handleError(err, res);
                            } else {
                                if (group)
                                    updateTab(tab);
                                else
                                    res.status(ERROR_STATUSES.FORBIDDEN).end();
                            }
                        });
                    } else {
                        res.status(ERROR_STATUSES.FORBIDDEN).end();
                    }
                }
            }
        }
    });
}

export function remove(req, res) {
    let auth = req.decoded;
    let removeTab = (tab) => {
        tab.remove();
        res.end();
    }
    Tab.findById(req.params.id, (err, tab) => {
        if (err) {
            handleError(err);
        } else if (!tab) {
            res.status(ERROR_STATUSES.NOT_FOUND).end();
        } else {
            if (!auth) {
                res.status(ERROR_STATUSES.FORBIDDEN).end();
            } else if (auth.role === USER_ROLES.ADMIN || tab.creator === auth.name) {
                removeTab(tab);
            } else {
                res.status(ERROR_STATUSES.FORBIDDEN).end();
            }
        }
    });
}

