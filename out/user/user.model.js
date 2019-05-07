"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.USER_ROLES = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ObjectId = _mongoose["default"].Schema.ObjectId;
var USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin'
};
exports.USER_ROLES = USER_ROLES;
var UserSchema = new _mongoose["default"].Schema({
  name: {
    type: String,
    required: true,
    max: 20,
    unique: true
  },
  passwordHash: {
    type: Number,
    required: true
  },
  role: {
    type: String,
    "enum": [USER_ROLES.USER, USER_ROLES.ADMIN],
    required: true
  },
  favourites: [ObjectId]
});

var User = _mongoose["default"].model('User', UserSchema);

var _default = User;
exports["default"] = _default;