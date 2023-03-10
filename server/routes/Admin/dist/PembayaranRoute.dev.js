"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _Pembayaran = require("../../controllers/Pembayaran.js");

var _RolesB = require("../../middleware/RolesB.js");

var _RefreshToken = require("../../controllers/RefreshToken2.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var pembayaranRoutesA = _express["default"].Router();

pembayaranRoutesA.get('/pembayaran', _RolesB.authRoleB, _Pembayaran.getPembayaran);
pembayaranRoutesA.post('/pembayaranA', _RolesB.authRoleB, _Pembayaran.createPembayaran);
pembayaranRoutesA.get('/pembayaranS', _Pembayaran.getPembayaranByStatus);
pembayaranRoutesA.get('/pembayaranI/:id_siswa', _RolesB.authRoleB, _Pembayaran.getPembayaranById);
pembayaranRoutesA.get('/pembayaranM/:id_pembayaran', _RolesB.authRoleB, _Pembayaran.getPembayaranByM);
pembayaranRoutesA.get('/pembayaranA/:id_petugas', _RolesB.authRoleB, _Pembayaran.getPembayaranByAdmin);
pembayaranRoutesA.get('/pembayaranJoin', _RolesB.authRoleB, _Pembayaran.getPembayaranWithJoin);
pembayaranRoutesA.get('/pembayaranSpp/:id_spp', _RolesB.authRoleB, _Pembayaran.getPembayaranBySpp);
pembayaranRoutesA["delete"]('/pembayaran/:id_pembayaran', _RolesB.authRoleB, _Pembayaran.deletePembayaran);
pembayaranRoutesA.get('/tokenA', _RefreshToken.refreshToken2);
var _default = pembayaranRoutesA;
exports["default"] = _default;