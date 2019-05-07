"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var UserController = _interopRequireWildcard(require("./user.controller"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var UserRouter = _express["default"].Router();

UserRouter.post('/', UserController.create);
UserRouter.get('/:name', UserController.findOne);
UserRouter.get('/', UserController.findAll);
UserRouter.put('/:name', UserController.update);
UserRouter["delete"]('/:name', UserController.remove);
UserRouter.post('/:name/favourite', UserController.addFavourite);
UserRouter["delete"]('/:name/favourite/:tabId', UserController.removeFavourite);
var _default = UserRouter;
exports["default"] = _default;