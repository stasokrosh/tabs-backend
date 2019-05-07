"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//MongoDB connection
var dev_db_url = 'mongodb://localhost:27017/tabs';
var mongoDB = process.env.MONGODB_URI || dev_db_url;

_mongoose["default"].connect(mongoDB, {
  useNewUrlParser: true
});

_mongoose["default"].Promise = global.Promise;
var db = _mongoose["default"].connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));