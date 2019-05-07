"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseJWT = parseJWT;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function parseJWT(req, res, next) {
  var token = req.headers['authorization'];

  if (token) {
    _jsonwebtoken["default"].verify(token, process.env.JWT_SECRET, function (err, decoded) {
      if (err) {
        res.status(400).end();
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    next();
  }
}