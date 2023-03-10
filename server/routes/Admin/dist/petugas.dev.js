"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _Petugas = require("../../controllers/Petugas.js");

var _RefreshToken = require("../../controllers/RefreshToken2.js");

var _RolesB = require("../../middleware/RolesB.js");

var _RolesA = require("../../middleware/RolesA.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var routerPetugasA = _express["default"].Router();

routerPetugasA.get('/admin', _RolesB.authRoleB, _Petugas.getPetugas);
routerPetugasA.post('/admin', _RolesA.authRoleA, _Petugas.Register);
routerPetugasA.patch('/admin/:id_petugas', _Petugas.EditPetugas);
routerPetugasA.get('/admin/:id_petugas', _RolesB.authRoleB, _Petugas.getUPetugasById);
routerPetugasA["delete"]('/admin/:id_petugas', _RolesB.authRoleB, _Petugas.deletePetugas);
routerPetugasA.get('/adminU/:username', _RolesB.authRoleB, _Petugas.getUPetugasByUsername);
routerPetugasA.post('/loginAdmin', _Petugas.Login);
routerPetugasA["delete"]('/logoutAdmin', _Petugas.Logout);
routerPetugasA.get('/tokenA', _RefreshToken.refreshToken2);
var _default = routerPetugasA;
exports["default"] = _default;