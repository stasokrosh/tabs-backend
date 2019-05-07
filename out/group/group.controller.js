"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = create;
exports.findOne = findOne;
exports.findAll = findAll;
exports.update = update;
exports.remove = remove;
exports.addMember = addMember;
exports.removeMember = removeMember;
exports.updateMember = updateMember;

var _group = _interopRequireDefault(require("./group.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function create(req, res) {
  var group = new _group["default"]({
    name: req.body.name,
    creatorId: req.body.creatorId,
    members: req.body.members,
    "public": req.body["public"]
  });
  group.save(function (err, group) {
    if (err) res.status(500).send(err.message);
    res.send(group);
  });
}

;

function findOne(req, res) {
  _group["default"].findById(req.params.id, function (err, group) {
    if (err) res.status(500).send(err.message);
    res.send(group);
  });
}

;

function findAll(req, res) {
  _group["default"].find(function (err, groups) {
    if (err) res.status(500).send(err.message);
    res.send(groups);
  });
}

;

function update(req, res) {
  var group = new _group["default"]({
    name: req.body.name,
    members: req.body.members,
    "public": req.body["public"]
  });

  _group["default"].findByIdAndUpdate(req.params.id, group, function (err) {
    if (err) res.status(500).send(err.message);
    res.end();
  });
}

function remove(req, res) {
  _group["default"].findByIdAndRemove(req.params.id, function (err, group) {
    if (err) res.status(500).send(err.message);
    res.send(group);
  });
}

function addMember(req, res) {
  var member = {
    userId: req.body.userId,
    rights: req.body.rights
  };

  _group["default"].findById(req.params.id, function (err, group) {
    if (err) {
      res.status(500).send(err.message);
    } else {
      group.members.push(member);
      group.save(function (err) {
        if (err) res.status(500).send(err.message);
        res.end();
      });
    }
  });
}

function removeMember(req, res) {
  _group["default"].findById(req.params.id, function (err, group) {
    if (err) {
      res.status(500).send(err.message);
    } else {
      var index = group.members.findIndex(function (element) {
        return element.userId = req.params.userId;
      });

      if (index === -1) {
        res.status(404).end();
      } else {
        group.members[index].remove();
        group.save(function (err) {
          if (err) res.status(500).send(err.message);
          res.end();
        });
      }
    }
  });
}

function updateMember(req, res) {
  _group["default"].findById(req.params.id, function (err, group) {
    if (err) res.status(500).send(err.message);
    var index = group.members.findIndex(function (element) {
      return element.userId = req.params.userId;
    });

    if (index === -1) {
      res.status(404).end();
    } else {
      if (req.body.rights) group.members[index].rights = req.body.rights;
      group.save(function (err) {
        if (err) res.status(500).send(err.message);
        res.end();
      });
    }
  });
}