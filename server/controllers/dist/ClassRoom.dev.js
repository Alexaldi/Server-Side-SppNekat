"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteClassRoom = exports.updateClassRoom = exports.saveClassRoom = exports.getClassRoomById = exports.getClassRooms = void 0;

var _ClassRoom = _interopRequireDefault(require("../models/ClassRoom.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getClassRooms = function getClassRooms(req, res) {
  var kelas;
  return regeneratorRuntime.async(function getClassRooms$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.t0 = regeneratorRuntime;
          _context.next = 4;
          return regeneratorRuntime.awrap(_ClassRoom["default"].findAll({
            order: [['angkatan', 'ASC'], ['kelas', 'ASC']]
          }));

        case 4:
          _context.t1 = _context.sent;
          _context.next = 7;
          return _context.t0.awrap.call(_context.t0, _context.t1);

        case 7:
          kelas = _context.sent;
          ;
          res.json(kelas);
          _context.next = 15;
          break;

        case 12:
          _context.prev = 12;
          _context.t2 = _context["catch"](0);
          res.json({
            message: _context.t2.message
          });

        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 12]]);
};

exports.getClassRooms = getClassRooms;

var getClassRoomById = function getClassRoomById(req, res) {
  var response;
  return regeneratorRuntime.async(function getClassRoomById$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(_ClassRoom["default"].findAll({
            where: {
              id_kelas: req.params.id_kelas
            }
          }));

        case 3:
          response = _context2.sent;
          res.json(response[0]);
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

exports.getClassRoomById = getClassRoomById;

var saveClassRoom = function saveClassRoom(req, res) {
  return regeneratorRuntime.async(function saveClassRoom$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(_ClassRoom["default"].create(req.body));

        case 3:
          res.json({
            "message": "Kelas Berhasil Ditambahkan"
          });
          _context3.next = 9;
          break;

        case 6:
          _context3.prev = 6;
          _context3.t0 = _context3["catch"](0);
          res.json({
            message: _context3.t0.message
          });

        case 9:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 6]]);
};

exports.saveClassRoom = saveClassRoom;

var updateClassRoom = function updateClassRoom(req, res) {
  return regeneratorRuntime.async(function updateClassRoom$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(_ClassRoom["default"].update(req.body, {
            where: {
              id_kelas: req.params.id_kelas
            }
          }));

        case 3:
          res.json({
            "message": "Kelas Telah Di Edit"
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

exports.updateClassRoom = updateClassRoom;

var deleteClassRoom = function deleteClassRoom(req, res) {
  var Kelas;
  return regeneratorRuntime.async(function deleteClassRoom$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(_ClassRoom["default"].findOne({
            where: {
              id_kelas: req.params.id_kelas
            }
          }));

        case 2:
          Kelas = _context5.sent;

          if (Kelas) {
            _context5.next = 5;
            break;
          }

          return _context5.abrupt("return", res.status(404).json({
            msg: "No Data Found"
          }));

        case 5:
          _context5.prev = 5;
          _context5.next = 8;
          return regeneratorRuntime.awrap(_ClassRoom["default"].destroy({
            where: {
              id_kelas: req.params.id_kelas
            }
          }));

        case 8:
          res.json({
            "message": "Kelas Deleted"
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

exports.deleteClassRoom = deleteClassRoom;