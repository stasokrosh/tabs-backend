"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var GroupController = _interopRequireWildcard(require("./group.controller"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var GroupRouter = _express["default"].Router();

GroupRouter.post('/', GroupController.create);
GroupRouter.get('/:id', GroupController.findOne);
GroupRouter.get('/', GroupController.findAll);
GroupRouter.put('/:id', GroupController.update);
GroupRouter["delete"]('/:id', GroupController.remove);
GroupRouter.post('/:id/member', GroupController.addMember);
GroupRouter["delete"]('/:id/member/:userId', GroupController.removeMember);
GroupRouter.put('/:id/member/:userId', GroupController.updateMember);
var _default = GroupRouter;
exports["default"] = _default;