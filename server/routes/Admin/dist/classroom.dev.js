"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _ClassRoom = require("../../controllers/ClassRoom.js");

var _RolesB = require("../../middleware/RolesB.js");

var _RolesA = require("../../middleware/RolesA.js");

var _RefreshToken = require("../../controllers/RefreshToken2.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var routerClassA = _express["default"].Router();

routerClassA.get('/kelas', _RolesB.authRoleB, _ClassRoom.getClassRooms);
routerClassA.get('/kelas/:id_kelas', _RolesB.authRoleB, _ClassRoom.getClassRoomById);
routerClassA.post('/kelas', _RolesA.authRoleA, _ClassRoom.saveClassRoom);
routerClassA.patch('/kelas/:id_kelas', _RolesA.authRoleA, _ClassRoom.updateClassRoom);
routerClassA["delete"]('/kelas/:id_kelas', _RolesA.authRoleA, _ClassRoom.deleteClassRoom);
var _default = routerClassA;
exports["default"] = _default;