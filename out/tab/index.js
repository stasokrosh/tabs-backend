"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var TabController = _interopRequireWildcard(require("./tab.controller"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var TabRouter = _express["default"].Router();

TabRouter.post('/', TabController.create);
TabRouter.get('/:id', TabController.findOne);
TabRouter.get('/', TabController.findAll);
TabRouter.put('/:id', TabController.update);
TabRouter["delete"]('/:id', TabController.remove);
TabRouter.post('/:id/user', TabController.addUser);
TabRouter["delete"]('/:id/user/:userId', TabController.removeUser);
TabRouter.put('/:id/user/:userId', TabController.updateUser);
var _default = TabRouter;
exports["default"] = _default;