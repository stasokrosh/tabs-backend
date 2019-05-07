"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signin = signin;
exports.signup = signup;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _util = require("../util");

var _user2 = _interopRequireWildcard(require("../user/user.model"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var DEFAULT_EXPIRE_TIME = 1440;

function getJwtToken(user) {
  _jsonwebtoken["default"].sign({
    name: user.name,
    role: user.role
  }, process.env.JWT_SECRET, {
    expiresIn: DEFAULT_EXPIRE_TIME
  });
}

function signin(req, res) {
  _user2["default"].findOne({
    name: req.body.name
  }, function (err, user) {
    if (err) {
      res.status(500).send(err.message);
    } else if (!user) {
      res.status(404).end();
    } else if ((0, _util.getHash)(req.body.password) !== user.passwordHash) {
      res.status(400).end();
    } else {
      var token = getJwtToken(user);
      res.send({
        token: token
      });
    }
  });
}

function signup(req, res) {
  _user2["default"].findOne({
    name: req.body.name
  }, function (err, user) {
    if (err) {
      res.status(500).send(err.message);
    } else if (user) {
      res.status(422).end();
    } else {
      var _user = new _user2["default"]({
        name: req.body.name,
        passwordHash: (0, _util.getHash)(req.body.password),
        role: _user2.USER_ROLES.USER
      });

      _user.save(function (err, user) {
        if (err) res.status(500).send(err.message);
        var token = getJwtToken(user);
        res.send({
          token: token
        });
      });
    }
  });
}