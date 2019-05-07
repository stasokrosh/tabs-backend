"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = create;
exports.findOne = findOne;
exports.findAll = findAll;
exports.update = update;
exports.remove = remove;
exports.addFavourite = addFavourite;
exports.removeFavourite = removeFavourite;

var _user = _interopRequireDefault(require("./user.model"));

var _util = require("../util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function create(req, res) {
  var user = new _user["default"]({
    name: req.body.name,
    passwordHash: (0, _util.getHash)(req.body.password),
    role: req.body.role
  });
  user.save(function (err, user) {
    if (err) res.status(500).send(err.message);
    res.send(user);
  });
}

;

function findOne(req, res) {
  _user["default"].findOne({
    name: req.params.name
  }, function (err, user) {
    if (err) res.status(500).send(err.message);
    res.send(user);
  });
}

;

function findAll(req, res) {
  _user["default"].find(function (err, users) {
    if (err) res.status(500).send(err.message);
    res.send(users);
  });
}

;

function update(req, res) {
  var user = {
    name: req.body.name,
    favourites: req.body.favourites
  };

  _user["default"].findOneAndUpdate({
    name: req.body.name
  }, user, function (err) {
    if (err) res.status(500).send(err.message);
    res.end();
  });
}

function remove(req, res) {
  _user["default"].findByOneAndRemove(req.params.name, function (err, user) {
    if (err) res.status(500).send(err.message);
    res.send(user);
  });
}

function addFavourite(req, res) {
  _user["default"].findOne({
    name: req.params.name
  }, function (err, user) {
    if (err) {
      res.status(500).send(err.message);
    } else {
      user.favourites.push(req.body.tabId);
      tab.save(function (err) {
        if (err) res.status(500).send(err.message);
        res.end();
      });
    }
  });
}

function removeFavourite(req, res) {
  _user["default"].findOne({
    name: req.params.name
  }, function (err, user) {
    if (err) {
      res.status(500).send(err.message);
    } else {
      var index = user.favourites.indexOf(req.params.tabId);

      if (index === -1) {
        res.status(404).end();
      } else {
        user.favourites[index].remove();
        tab.save(function (err) {
          if (err) res.status(500).send(err.message);
          res.end();
        });
      }
    }
  });
}