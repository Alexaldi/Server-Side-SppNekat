"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _Siswa = require("../../controllers/Siswa.js");

var _RolesA = require("../../middleware/RolesA.js");

var _RolesB = require("../../middleware/RolesB.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var routerSiswaA = _express["default"].Router();

routerSiswaA.get('/usersa', _RolesB.authRoleB, _Siswa.getUsers);
routerSiswaA.post('/usersa', _RolesA.authRoleA, _Siswa.Register);
routerSiswaA.patch('/usersa/:id_siswa', _RolesA.authRoleA, _Siswa.EditSiswa);
routerSiswaA.get('/usersClass/:id_kelas', _RolesB.authRoleB, _Siswa.getUsersByKelas);
routerSiswaA.get('/usersa/:id_siswa', _RolesB.authRoleB, _Siswa.getUsersById);
routerSiswaA["delete"]('/usersa/:id_siswa', _RolesB.authRoleB, _Siswa.deleteSiswa);
var _default = routerSiswaA;
exports["default"] = _default;