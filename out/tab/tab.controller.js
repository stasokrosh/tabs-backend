"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = create;
exports.findOne = findOne;
exports.findAll = findAll;
exports.update = update;
exports.remove = remove;
exports.addUser = addUser;
exports.removeUser = removeUser;
exports.updateUser = updateUser;

var _tab = _interopRequireDefault(require("./tab.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function create(req, res) {
  var tab = new _tab["default"]({
    name: req.body.name,
    creatorId: req.body.creatorId,
    users: req.body.users,
    "public": req.body["public"]
  });
  tab.save(function (err, tab) {
    if (err) res.status(500).send(err.message);
    res.send(tab);
  });
}

;

function findOne(req, res) {
  _tab["default"].findById(req.params.id, function (err, tab) {
    if (err) res.status(500).send(err.message);
    res.send(tab);
  });
}

;

function findAll(req, res) {
  _tab["default"].find(function (err, tabs) {
    if (err) res.status(500).send(err.message);
    res.send(tabs);
  });
}

;

function update(req, res) {
  var tab = {
    name: req.body.name,
    users: req.body.users,
    "public": req.body["public"]
  };

  _tab["default"].findByIdAndUpdate(req.params.id, tab, function (err) {
    if (err) res.status(500).send(err.message);
    res.end();
  });
}

function remove(req, res) {
  _tab["default"].findByIdAndRemove(req.params.id, function (err, tab) {
    if (err) res.status(500).send(err.message);
    res.send(tab);
  });
}

function addUser(req, res) {
  var user = {
    userId: req.body.userId,
    rights: req.body.rights
  };

  _tab["default"].findById(req.params.id, function (err, tab) {
    if (err) {
      res.status(500).send(err.message);
    } else {
      tab.users.push(user);
      tab.save(function (err) {
        if (err) res.status(500).send(err.message);
        res.end();
      });
    }
  });
}

function removeUser(req, res) {
  _tab["default"].findById(req.params.id, function (err, tab) {
    if (err) {
      res.status(500).send(err.message);
    } else {
      var index = tab.users.findIndex(function (element) {
        return element.userId = req.params.userId;
      });

      if (index === -1) {
        res.status(404).end();
      } else {
        tab.users[index].remove();
        tab.save(function (err) {
          if (err) res.status(500).send(err.message);
          res.end();
        });
      }
    }
  });
}

function updateUser(req, res) {
  Group.findById(req.params.id, function (err, tab) {
    if (err) res.status(500).send(err.message);
    var index = tab.users.findIndex(function (element) {
      return element.userId = req.params.userId;
    });

    if (index === -1) {
      res.status(404).end();
    } else {
      if (req.body.rights) tab.users[index].rights = req.body.rights;
      tab.save(function (err) {
        if (err) res.status(500).send(err.message);
        res.end();
      });
    }
  });
}