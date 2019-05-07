"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.GROUP_USER_RIGHTS = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ObjectId = _mongoose["default"].Schema.ObjectId;
var GROUP_USER_RIGHTS = {
  READ: 'read',
  WRITE: 'write'
};
exports.GROUP_USER_RIGHTS = GROUP_USER_RIGHTS;
var GroupSchema = new _mongoose["default"].Schema({
  name: {
    type: String,
    required: true,
    max: 20,
    unique: true
  },
  creatorId: {
    type: ObjectId,
    required: true
  },
  createDate: {
    type: Date,
    "default": Date.now
  },
  members: [{
    userId: ObjectId,
    rights: [{
      type: String,
      "enum": [GROUP_USER_RIGHTS.READ, GROUP_USER_RIGHTS.WRITE]
    }],
    isAdmin: Boolean
  }],
  "public": Boolean
});

var Group = _mongoose["default"].model('Group', GroupSchema);

var _default = Group;
exports["default"] = _default;