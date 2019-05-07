"use strict";

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cors = _interopRequireDefault(require("cors"));

require("./util/db-config");

var Middleware = _interopRequireWildcard(require("./util/middleware"));

var _user = _interopRequireDefault(require("./user"));

var _group = _interopRequireDefault(require("./group"));

var _tab = _interopRequireDefault(require("./tab"));

var _auth = _interopRequireDefault(require("./auth"));

var _https = _interopRequireDefault(require("https"));

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
app.use((0, _cors["default"])()); //body-parser

app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: false
}));
process.env.JWT_SECRET = 'yarmolik';
app.use('*', Middleware.parseJWT); //routers registration

app.use('/user', _user["default"]);
app.use('/group', _group["default"]);
app.use('/tab', _tab["default"]);
app.use('/auth', _auth["default"]);
var port = 1234;

_https["default"].createServer({
  key: _fs["default"].readFileSync('server.key'),
  cert: _fs["default"].readFileSync('server.cert')
}, app).listen(port, function () {
  console.log('Server is up and running on port numner ' + port);
});