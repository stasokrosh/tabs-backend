import Tab from './tab.model'

export function create(req, res) {
    let tab = new Tab({
        name: req.body.name,
        creatorId: req.body.creatorId,
        users: req.body.users,
        public : req.body.public
    });
    tab.save((err, tab) => {
        if (err)
            res.status(500).send(err.message);
        res.send(tab);
    });
};

export function findOne(req, res) {
    Tab.findById(req.params.id, (err, tab) => {
        if (err)
            res.status(500).send(err.message);
        res.send(tab);
    })
};

export function findAll(req, res) {
    Tab.find((err, tabs) => {
        if (err)
            res.status(500).send(err.message);
        res.send(tabs);
    })
};

export function update(req, res) {
    let tab = {
        name: req.body.name,
        users: req.body.users,
        public : req.body.public
    };
    Tab.findByIdAndUpdate(req.params.id, tab, (err) => {
        if (err)
            res.status(500).send(err.message);
        res.end();
    });
}

export function remove(req, res) {
    Tab.findByIdAndRemove(req.params.id, (err, tab) => {
        if (err)
            res.status(500).send(err.message);
        res.send(tab);
    });
}

export function addUser(req, res) {
    let user = {
        userId: req.body.userId,
        rights: req.body.rights
    };
    Tab.findById(req.params.id, (err, tab) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            tab.users.push(user);
            tab.save((err) => {
                if (err)
                    res.status(500).send(err.message);
                res.end();
            });
        }
    });
}

export function removeMember(req, res) {
    Tab.findById(req.params.id, (err, tab) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            let index = tab.users.findIndex((element) => {
                return element.userId = req.params.userId;
            });
            if (index === -1) {
                res.status(404).end();
            } else {
                tab.users[index].remove();
                tab.save((err) => {
                    if (err)
                        res.status(500).send(err.message);
                    res.end();
                });
            }
        }
    });
}

export function updateMember(req, res) {
    Group.findById(req.params.id, (err, tab) => {
        if (err)
            res.status(500).send(err.message);
        let index = tab.users.findIndex((element) => {
            return element.userId = req.params.userId;
        });
        if (index === -1) {
            res.status(404).end();
        } else {
            if (req.body.rights)
                tab.users[index].rights = req.body.rights;
            tab.save((err) => {
                if (err)
                    res.status(500).send(err.message);
                res.end();
            });
        }
    });
}
