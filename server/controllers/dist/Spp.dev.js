"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteSpp = exports.updateSpp = exports.createSpp = exports.getSppById = exports.getSpp = void 0;

var _SppModel = _interopRequireDefault(require("../models/SppModel.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getSpp = function getSpp(req, res) {
  var spp;
  return regeneratorRuntime.async(function getSpp$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(_SppModel["default"].findAll());

        case 3:
          spp = _context.sent;
          res.json(spp);
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          res.json({
            message: _context.t0.message
          });

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.getSpp = getSpp;

var getSppById = function getSppById(req, res) {
  var response;
  return regeneratorRuntime.async(function getSppById$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(_SppModel["default"].findOne({
            where: {
              id_spp: req.params.id_spp
            }
          }));

        case 3:
          response = _context2.sent;
          res.json(response);
          _context2.next = 10;
          break;

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          res.json({
            message: _context2.t0.message
          });

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.getSppById = getSppById;

var createSpp = function createSpp(req, res) {
  var nominal, tahun, existingSpp;
  return regeneratorRuntime.async(function createSpp$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          nominal = req.body.nominal;
          tahun = req.body.tahun;
          _context3.prev = 2;
          _context3.next = 5;
          return regeneratorRuntime.awrap(_SppModel["default"].findOne({
            where: {
              tahun: tahun
            }
          }));

        case 5:
          existingSpp = _context3.sent;
          console.log(existingSpp);

          if (!existingSpp) {
            _context3.next = 9;
            break;
          }

          return _context3.abrupt("return", res.status(400).json({
            msg: "Nominal tahun ".concat(tahun, " sudah ada")
          }));

        case 9:
          _context3.next = 11;
          return regeneratorRuntime.awrap(_SppModel["default"].create({
            nominal: nominal,
            tahun: tahun
          }));

        case 11:
          res.status(201).json({
            msg: "Spp Berhasil Dibuat"
          });
          _context3.next = 17;
          break;

        case 14:
          _context3.prev = 14;
          _context3.t0 = _context3["catch"](2);
          res.json({
            message: _context3.t0.message
          });

        case 17:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[2, 14]]);
};

exports.createSpp = createSpp;

var updateSpp = function updateSpp(req, res) {
  return regeneratorRuntime.async(function updateSpp$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(_SppModel["default"].update(req.body, {
            where: {
              id_spp: req.params.id_spp
            }
          }));

        case 3:
          res.json({
            "message": "Spp Telah Di Edit"
          });
          _context4.next = 9;
          break;

        case 6:
          _context4.prev = 6;
          _context4.t0 = _context4["catch"](0);
          res.json({
            message: _context4.t0.message
          });

        case 9:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 6]]);
};

exports.updateSpp = updateSpp;

var deleteSpp = function deleteSpp(req, res) {
  var spp;
  return regeneratorRuntime.async(function deleteSpp$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(_SppModel["default"].findOne({
            where: {
              id_spp: req.params.id_spp
            }
          }));

        case 2:
          spp = _context5.sent;

          if (spp) {
            _context5.next = 5;
            break;
          }

          return _context5.abrupt("return", res.status(404).json({
            msg: "No Data Found"
          }));

        case 5:
          _context5.prev = 5;
          _context5.next = 8;
          return regeneratorRuntime.awrap(_SppModel["default"].destroy({
            where: {
              id_spp: req.params.id_spp
            }
          }));

        case 8:
          res.json({
            "message": "Spp Deleted"
          });
          _context5.next = 14;
          break;

        case 11:
          _context5.prev = 11;
          _context5.t0 = _context5["catch"](5);
          res.json({
            message: _context5.t0.message
          });

        case 14:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[5, 11]]);
};

exports.deleteSpp = deleteSpp;