import Group from './group.model'

export function create(req, res) {
    let group = new Group({
        name: req.body.name,
        creatorId: req.body.creatorId,
        members: req.body.members,
        public : req.body.public
    });
    group.save((err, group) => {
        if (err)
            res.status(500).send(err.message);
        res.send(group);
    });
};

export function findOne(req, res) {
    Group.findById(req.params.id, (err, group) => {
        if (err)
            res.status(500).send(err.message);
        res.send(group);
    })
};

export function findAll(req, res) {
    Group.find((err, groups) => {
        if (err)
            res.status(500).send(err.message);
        res.send(groups);
    })
};

export function update(req, res) {
    let group = new Group({
        name: req.body.name,
        members: req.body.members,
        public : req.body.public
    });
    Group.findByIdAndUpdate(req.params.id, group, (err) => {
        if (err)
            res.status(500).send(err.message);
        res.end();
    });
}

export function remove(req, res) {
    Group.findByIdAndRemove(req.params.id, (err, group) => {
        if (err)
            res.status(500).send(err.message);
        res.send(group);
    });
}

export function addMember(req, res) {
    let member = {
        userId: req.body.userId,
        rights: req.body.rights
    };
    Group.findById(req.params.id, (err, group) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            group.members.push(member);
            group.save((err) => {
                if (err)
                    res.status(500).send(err.message);
                res.end();
            });
        }
    });
}

export function removeMember(req, res) {
    Group.findById(req.params.id, (err, group) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            let index = group.members.findIndex((element) => {
                return element.userId = req.params.userId;
            });
            if (index === -1) {
                res.status(404).end();
            } else {
                group.members[index].remove();
                group.save((err) => {
                    if (err)
                        res.status(500).send(err.message);
                    res.end();
                });
            }
        }
    });
}

export function updateMember(req, res) {
    Group.findById(req.params.id, (err, group) => {
        if (err)
            res.status(500).send(err.message);
        let index = group.members.findIndex((element) => {
            return element.userId = req.params.userId;
        });
        if (index === -1) {
            res.status(404).end();
        } else {
            if (req.body.rights)
                group.members[index].rights = req.body.rights;
            group.save((err) => {
                if (err)
                    res.status(500).send(err.message);
                res.end();
            });
        }
    });
}