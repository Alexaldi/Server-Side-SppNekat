"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _Spp = require("../../controllers/Spp.js");

var _RolesA = require("../../middleware/RolesA.js");

var _RolesB = require("../../middleware/RolesB.js");

var _RefreshToken = require("../../controllers/RefreshToken2.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var sppRouteA = _express["default"].Router();

sppRouteA.get('/spp', _RolesB.authRoleB, _Spp.getSpp);
sppRouteA.get('/spp/:id_spp', _RolesB.authRoleB, _Spp.getSppById);
sppRouteA.post('/spp', _RolesA.authRoleA, _Spp.createSpp);
sppRouteA["delete"]('/spp/:id_spp', _RolesA.authRoleA, _Spp.deleteSpp);
sppRouteA.patch('/spp/:id_spp', _RolesA.authRoleA, _Spp.updateSpp);
var _default = sppRouteA;
exports["default"] = _default;