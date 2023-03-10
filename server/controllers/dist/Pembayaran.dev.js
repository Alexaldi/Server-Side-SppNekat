"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deletePembayaran = exports.createPembayaran = exports.getPembayaranWithJoin = exports.getPembayaranByStatus = exports.getPembayaranBySpp = exports.getPembayaranByAdmin = exports.getPembayaranByM = exports.getPembayaranById = exports.getPembayaran = void 0;

var _Pembayaran = _interopRequireDefault(require("../models/Pembayaran.js"));

var _Petugas = _interopRequireDefault(require("../models/Petugas.js"));

var _SiswaModel = _interopRequireDefault(require("../models/SiswaModel.js"));

var _ClassRoom = _interopRequireDefault(require("../models/ClassRoom.js"));

var _SppModel = _interopRequireDefault(require("../models/SppModel.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var getPembayaran = function getPembayaran(req, res) {
  var pembayaran;
  return regeneratorRuntime.async(function getPembayaran$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(_Pembayaran["default"].findAll());

        case 3:
          pembayaran = _context.sent;
          res.json(pembayaran);
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

exports.getPembayaran = getPembayaran;

var getPembayaranById = function getPembayaranById(req, res) {
  var _req$query, limit, orderBy, order, response;

  return regeneratorRuntime.async(function getPembayaranById$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _req$query = req.query, limit = _req$query.limit, orderBy = _req$query.orderBy;
          order = orderBy.toUpperCase();
          _context2.next = 5;
          return regeneratorRuntime.awrap(_Pembayaran["default"].findAll({
            where: {
              id_siswa: req.params.id_siswa
            },
            attributes: ['id_pembayaran', 'id_petugas', 'tgl_bayar', 'id_spp', 'jumlah_bayar', 'status'],
            include: [{
              model: _SiswaModel["default"],
              attributes: ['name', 'nisn'],
              include: {
                model: _ClassRoom["default"],
                as: 'kelas',
                attributes: ['angkatan', 'kelas']
              }
            }, {
              model: _Petugas["default"],
              as: 'petugas',
              attributes: ['nama_petugas']
            }, {
              model: _SppModel["default"],
              as: 'spp',
              attributes: ['nominal', 'tahun']
            }],
            limit: parseInt(limit),
            order: [['id_pembayaran', order]]
          }));

        case 5:
          response = _context2.sent;
          res.json(response);
          _context2.next = 12;
          break;

        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](0);
          res.json({
            message: _context2.t0.message
          });

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

exports.getPembayaranById = getPembayaranById;

var getPembayaranByM = function getPembayaranByM(req, res) {
  var response;
  return regeneratorRuntime.async(function getPembayaranByM$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(_Pembayaran["default"].findOne({
            where: {
              id_pembayaran: req.params.id_pembayaran
            },
            attributes: ['id_pembayaran', 'id_petugas', 'tgl_bayar', 'id_spp', 'jumlah_bayar', 'status'],
            include: [{
              model: _SiswaModel["default"],
              attributes: ['name', 'nisn'],
              include: {
                model: _ClassRoom["default"],
                as: 'kelas',
                attributes: ['angkatan', 'kelas']
              }
            }, {
              model: _Petugas["default"],
              as: 'petugas',
              attributes: ['nama_petugas']
            }, {
              model: _SppModel["default"],
              as: 'spp',
              attributes: ['nominal', 'tahun']
            }]
          }));

        case 3:
          response = _context3.sent;
          res.json(response);
          _context3.next = 10;
          break;

        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          res.json({
            message: _context3.t0.message
          });

        case 10:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.getPembayaranByM = getPembayaranByM;

var getPembayaranByAdmin = function getPembayaranByAdmin(req, res) {
  var _req$query2, limit, orderBy, order, response;

  return regeneratorRuntime.async(function getPembayaranByAdmin$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _req$query2 = req.query, limit = _req$query2.limit, orderBy = _req$query2.orderBy;
          order = orderBy.toUpperCase();
          _context4.next = 5;
          return regeneratorRuntime.awrap(_Pembayaran["default"].findAll({
            where: {
              id_petugas: req.params.id_petugas
            },
            attributes: ['id_pembayaran', 'id_petugas', 'tgl_bayar', 'id_spp', 'jumlah_bayar', 'status'],
            include: [{
              model: _SiswaModel["default"],
              attributes: ['name', 'nisn'],
              include: {
                model: _ClassRoom["default"],
                as: 'kelas',
                attributes: ['angkatan', 'kelas']
              }
            }, {
              model: _Petugas["default"],
              as: 'petugas',
              attributes: ['nama_petugas']
            }, {
              model: _SppModel["default"],
              as: 'spp',
              attributes: ['nominal', 'tahun']
            }],
            limit: parseInt(limit),
            order: [['id_pembayaran', order]]
          }));

        case 5:
          response = _context4.sent;
          res.json(response);
          _context4.next = 12;
          break;

        case 9:
          _context4.prev = 9;
          _context4.t0 = _context4["catch"](0);
          res.json({
            message: _context4.t0.message
          });

        case 12:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

exports.getPembayaranByAdmin = getPembayaranByAdmin;

var getPembayaranBySpp = function getPembayaranBySpp(req, res) {
  var _req$query3, limit, orderBy, order, response;

  return regeneratorRuntime.async(function getPembayaranBySpp$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _req$query3 = req.query, limit = _req$query3.limit, orderBy = _req$query3.orderBy;
          order = orderBy.toUpperCase();
          _context5.next = 5;
          return regeneratorRuntime.awrap(_Pembayaran["default"].findAll({
            where: {
              id_spp: req.params.id_spp
            },
            attributes: ['id_pembayaran', 'id_petugas', 'tgl_bayar', 'id_spp', 'jumlah_bayar', 'status'],
            include: [{
              model: _SiswaModel["default"],
              attributes: ['name', 'nisn'],
              include: {
                model: _ClassRoom["default"],
                as: 'kelas',
                attributes: ['angkatan', 'kelas']
              }
            }, {
              model: _Petugas["default"],
              as: 'petugas',
              attributes: ['nama_petugas']
            }, {
              model: _SppModel["default"],
              as: 'spp',
              attributes: ['nominal', 'tahun']
            }],
            limit: parseInt(limit),
            order: [['id_pembayaran', order]]
          }));

        case 5:
          response = _context5.sent;
          res.json(response);
          _context5.next = 12;
          break;

        case 9:
          _context5.prev = 9;
          _context5.t0 = _context5["catch"](0);
          res.json({
            message: _context5.t0.message
          });

        case 12:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

exports.getPembayaranBySpp = getPembayaranBySpp;

var getPembayaranByStatus = function getPembayaranByStatus(req, res) {
  var _req$query4, id_spp, id_siswa, total_bayar;

  return regeneratorRuntime.async(function getPembayaranByStatus$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _req$query4 = req.query, id_spp = _req$query4.id_spp, id_siswa = _req$query4.id_siswa;
          _context6.next = 4;
          return regeneratorRuntime.awrap(_Pembayaran["default"].sum('jumlah_bayar', _defineProperty({
            where: {
              id_spp: id_spp
            }
          }, "where", {
            id_siswa: id_siswa
          })));

        case 4:
          total_bayar = _context6.sent;
          res.json(total_bayar);
          _context6.next = 11;
          break;

        case 8:
          _context6.prev = 8;
          _context6.t0 = _context6["catch"](0);
          res.json({
            message: _context6.t0.message
          });

        case 11:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

exports.getPembayaranByStatus = getPembayaranByStatus;

var getPembayaranWithJoin = function getPembayaranWithJoin(req, res) {
  var response;
  return regeneratorRuntime.async(function getPembayaranWithJoin$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return regeneratorRuntime.awrap(_Pembayaran["default"].findAll({
            attributes: ['id_pembayaran', 'id_petugas', 'tgl_bayar', 'id_spp', 'jumlah_bayar', 'status'],
            include: [{
              model: _SiswaModel["default"],
              attributes: ['name', 'nisn'],
              include: {
                model: _ClassRoom["default"],
                as: 'kelas',
                attributes: ['angkatan', 'kelas']
              }
            }, {
              model: _Petugas["default"],
              as: 'petugas',
              attributes: ['nama_petugas']
            }, {
              model: _SppModel["default"],
              as: 'spp',
              attributes: ['nominal', 'tahun']
            }],
            limit: 6,
            order: [['id_pembayaran', 'DESC']]
          }));

        case 3:
          response = _context7.sent;
          res.json(response);
          _context7.next = 10;
          break;

        case 7:
          _context7.prev = 7;
          _context7.t0 = _context7["catch"](0);
          res.json({
            message: _context7.t0.message
          });

        case 10:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.getPembayaranWithJoin = getPembayaranWithJoin;

var createPembayaran = function createPembayaran(req, res) {
  var id_petugas, id_siswa, tgl_bayar, id_spp, jumlah_bayar, id_kelas, status;
  return regeneratorRuntime.async(function createPembayaran$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          id_petugas = req.body.id_petugas;
          id_siswa = req.body.id_siswa;
          tgl_bayar = req.body.tgl_bayar;
          id_spp = req.body.id_spp;
          jumlah_bayar = req.body.bayar;
          id_kelas = req.body.id_kelas;
          status = req.body.status;
          _context8.prev = 7;
          _context8.next = 10;
          return regeneratorRuntime.awrap(_Pembayaran["default"].create({
            id_petugas: id_petugas,
            id_siswa: id_siswa,
            tgl_bayar: tgl_bayar,
            id_spp: id_spp,
            id_kelas: id_kelas,
            jumlah_bayar: jumlah_bayar,
            status: status
          }));

        case 10:
          res.status(201).json({
            msg: "Pembayaran Berhasil"
          });
          _context8.next = 16;
          break;

        case 13:
          _context8.prev = 13;
          _context8.t0 = _context8["catch"](7);
          res.json({
            message: _context8.t0.message
          });

        case 16:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[7, 13]]);
};

exports.createPembayaran = createPembayaran;

var deletePembayaran = function deletePembayaran(req, res) {
  var pembayaran;
  return regeneratorRuntime.async(function deletePembayaran$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.next = 2;
          return regeneratorRuntime.awrap(_Pembayaran["default"].findOne({
            where: {
              id_pembayaran: req.params.id_pembayaran
            }
          }));

        case 2:
          pembayaran = _context9.sent;

          if (pembayaran) {
            _context9.next = 5;
            break;
          }

          return _context9.abrupt("return", res.status(404).json({
            msg: "No Data Found"
          }));

        case 5:
          _context9.prev = 5;
          _context9.next = 8;
          return regeneratorRuntime.awrap(_Pembayaran["default"].destroy({
            where: {
              id_pembayaran: req.params.id_pembayaran
            }
          }));

        case 8:
          res.json({
            "message": "Pembayaran Deleted"
          });
          _context9.next = 14;
          break;

        case 11:
          _context9.prev = 11;
          _context9.t0 = _context9["catch"](5);
          res.json({
            message: _context9.t0.message
          });

        case 14:
        case "end":
          return _context9.stop();
      }
    }
  }, null, null, [[5, 11]]);
};

exports.deletePembayaran = deletePembayaran;