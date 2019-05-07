"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.TAB_USER_RIGHTS = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ObjectId = _mongoose["default"].Schema.ObjectId;
var TAB_USER_RIGHTS = {
  READ: 'read',
  WRITE: 'write'
};
exports.TAB_USER_RIGHTS = TAB_USER_RIGHTS;
var TabSchema = new _mongoose["default"].Schema({
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
  groupId: ObjectId,
  createDate: {
    type: Date,
    "default": Date.now
  },
  users: [{
    userId: ObjectId,
    rights: [{
      type: String,
      "enum": [TAB_USER_RIGHTS.READ, TAB_USER_RIGHTS.WRITE]
    }]
  }],
  "public": Boolean
});

var Tab = _mongoose["default"].model('Tab', TabSchema);

var _default = Tab;
exports["default"] = _default;