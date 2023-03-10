"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Logout = exports.deletePetugas = exports.Login = exports.EditPetugas = exports.Register = exports.getUPetugasByUsername = exports.getUPetugasById = exports.getPetugas = void 0;

var _Petugas = _interopRequireDefault(require("../models/Petugas.js"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getPetugas = function getPetugas(req, res) {
  var petugas;
  return regeneratorRuntime.async(function getPetugas$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(_Petugas["default"].findAll({
            where: {
              level: "petugas"
            },
            attributes: ['id_petugas', 'username', 'nama_petugas', 'level']
          }));

        case 3:
          petugas = _context.sent;
          res.json(petugas);
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.getPetugas = getPetugas;

var getUPetugasById = function getUPetugasById(req, res) {
  var siswa;
  return regeneratorRuntime.async(function getUPetugasById$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(_Petugas["default"].findOne({
            attributes: ['id_petugas', 'username', 'nama_petugas', 'level'],
            where: {
              id_petugas: req.params.id_petugas
            }
          }));

        case 3:
          siswa = _context2.sent;
          res.json(siswa);
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

exports.getUPetugasById = getUPetugasById;

var getUPetugasByUsername = function getUPetugasByUsername(req, res) {
  var siswa;
  return regeneratorRuntime.async(function getUPetugasByUsername$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(_Petugas["default"].findOne({
            attributes: ['id_petugas', 'username', 'nama_petugas', 'level'],
            where: {
              username: req.params.username
            }
          }));

        case 3:
          siswa = _context3.sent;
          res.json(siswa);
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

exports.getUPetugasByUsername = getUPetugasByUsername;

var Register = function Register(req, res) {
  var _req$body, username, password, confPassword, nama_petugas, level, petugas, salt, hashPassword;

  return regeneratorRuntime.async(function Register$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _req$body = req.body, username = _req$body.username, password = _req$body.password, confPassword = _req$body.confPassword, nama_petugas = _req$body.nama_petugas, level = _req$body.level;
          _context4.next = 3;
          return regeneratorRuntime.awrap(_Petugas["default"].findAll({
            where: {
              username: username
            }
          }));

        case 3:
          petugas = _context4.sent;

          if (!petugas[0]) {
            _context4.next = 6;
            break;
          }

          return _context4.abrupt("return", res.status(400).json({
            msg: "Anda Sudah Mempunyai Akun"
          }));

        case 6:
          console.log(req.body);

          if (!(password !== confPassword)) {
            _context4.next = 9;
            break;
          }

          return _context4.abrupt("return", res.status(400).json({
            msg: "Password dan Confirm Password tidak cocok"
          }));

        case 9:
          _context4.next = 11;
          return regeneratorRuntime.awrap(_bcrypt["default"].genSalt());

        case 11:
          salt = _context4.sent;
          _context4.next = 14;
          return regeneratorRuntime.awrap(_bcrypt["default"].hash(password, salt));

        case 14:
          hashPassword = _context4.sent;
          _context4.prev = 15;
          _context4.next = 18;
          return regeneratorRuntime.awrap(_Petugas["default"].create({
            username: username,
            password: hashPassword,
            nama_petugas: nama_petugas,
            level: level
          }));

        case 18:
          res.json({
            msg: "Register Berhasil"
          });
          _context4.next = 24;
          break;

        case 21:
          _context4.prev = 21;
          _context4.t0 = _context4["catch"](15);
          console.log(_context4.t0);

        case 24:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[15, 21]]);
};

exports.Register = Register;

var EditPetugas = function EditPetugas(req, res) {
  var _req$body2, username, password, nama_petugas, level, confPassword, id_petugas, petugas, existingPetugas, salt, hashPassword;

  return regeneratorRuntime.async(function EditPetugas$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _req$body2 = req.body, username = _req$body2.username, password = _req$body2.password, nama_petugas = _req$body2.nama_petugas, level = _req$body2.level, confPassword = _req$body2.confPassword;
          id_petugas = req.params.id_petugas;
          _context5.next = 4;
          return regeneratorRuntime.awrap(_Petugas["default"].findOne({
            where: {
              id_petugas: id_petugas
            }
          }));

        case 4:
          petugas = _context5.sent;

          if (!(username && username !== petugas.username)) {
            _context5.next = 11;
            break;
          }

          _context5.next = 8;
          return regeneratorRuntime.awrap(_Petugas["default"].findOne({
            where: {
              username: username
            }
          }));

        case 8:
          existingPetugas = _context5.sent;

          if (!existingPetugas) {
            _context5.next = 11;
            break;
          }

          return _context5.abrupt("return", res.status(400).json({
            msg: "Username Telah Digunakan"
          }));

        case 11:
          if (!(password && password !== confPassword)) {
            _context5.next = 13;
            break;
          }

          return _context5.abrupt("return", res.status(400).json({
            msg: "Password dan Confirm Password tidak cocok"
          }));

        case 13:
          _context5.next = 15;
          return regeneratorRuntime.awrap(_bcrypt["default"].genSalt());

        case 15:
          salt = _context5.sent;

          if (!password) {
            _context5.next = 22;
            break;
          }

          _context5.next = 19;
          return regeneratorRuntime.awrap(_bcrypt["default"].hash(password, salt));

        case 19:
          _context5.t0 = _context5.sent;
          _context5.next = 23;
          break;

        case 22:
          _context5.t0 = petugas.password;

        case 23:
          hashPassword = _context5.t0;
          _context5.prev = 24;
          _context5.next = 27;
          return regeneratorRuntime.awrap(_Petugas["default"].update({
            username: username,
            password: hashPassword,
            nama_petugas: nama_petugas,
            level: level
          }, {
            where: {
              id_petugas: id_petugas
            }
          }));

        case 27:
          res.json({
            msg: "Edit Petugas Berhasil"
          });
          _context5.next = 33;
          break;

        case 30:
          _context5.prev = 30;
          _context5.t1 = _context5["catch"](24);
          console.log(_context5.t1);

        case 33:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[24, 30]]);
};

exports.EditPetugas = EditPetugas;

var Login = function Login(req, res) {
  var petugas, match, id_petugas, username, nama_petugas, level, accessToken;
  return regeneratorRuntime.async(function Login$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return regeneratorRuntime.awrap(_Petugas["default"].findAll({
            where: {
              username: req.body.username
            }
          }));

        case 3:
          petugas = _context6.sent;
          _context6.next = 6;
          return regeneratorRuntime.awrap(_bcrypt["default"].compare(req.body.password, petugas[0].password));

        case 6:
          match = _context6.sent;

          if (match) {
            _context6.next = 9;
            break;
          }

          return _context6.abrupt("return", res.status(400).json({
            msg: "Wrong Password"
          }));

        case 9:
          id_petugas = petugas[0].id_petugas;
          username = petugas[0].username;
          nama_petugas = petugas[0].nama_petugas;
          level = petugas[0].level;
          accessToken = _jsonwebtoken["default"].sign({
            id_petugas: id_petugas,
            username: username,
            nama_petugas: nama_petugas,
            level: level
          }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '7d'
          });
          _context6.next = 16;
          return regeneratorRuntime.awrap(_Petugas["default"].update({
            refresh_token: accessToken
          }, {
            where: {
              id_petugas: id_petugas
            }
          }));

        case 16:
          res.cookie('accessToken', accessToken, {
            httpOnly: true,
            maxAge: 604800000
          });
          res.json({
            accessToken: accessToken
          });
          _context6.next = 23;
          break;

        case 20:
          _context6.prev = 20;
          _context6.t0 = _context6["catch"](0);
          res.status(404).json({
            msg: "username tidak ditemukan"
          });

        case 23:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 20]]);
};

exports.Login = Login;

var deletePetugas = function deletePetugas(req, res) {
  return regeneratorRuntime.async(function deletePetugas$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return regeneratorRuntime.awrap(_Petugas["default"].destroy({
            where: {
              id_petugas: req.params.id_petugas
            }
          }));

        case 3:
          res.json({
            "message": "Petugas Telah Di Deleted"
          });
          _context7.next = 9;
          break;

        case 6:
          _context7.prev = 6;
          _context7.t0 = _context7["catch"](0);
          res.json({
            message: _context7.t0.message
          });

        case 9:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 6]]);
};

exports.deletePetugas = deletePetugas;

var Logout = function Logout(req, res) {
  var accessToken, petugas;
  return regeneratorRuntime.async(function Logout$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          accessToken = req.query.accessToken;
          console.group("auth");
          console.log(accessToken);

          if (accessToken) {
            _context8.next = 5;
            break;
          }

          return _context8.abrupt("return", res.sendStatus(204));

        case 5:
          _context8.next = 7;
          return regeneratorRuntime.awrap(_Petugas["default"].findAll({
            where: {
              refresh_token: accessToken
            }
          }));

        case 7:
          petugas = _context8.sent;
          console.log(petugas);
          console.groupEnd(); // if (!petugas[0]) return res.sendStatus(204);
          // const id_petugas = petugas[0].id_petugas
          // await Petugas.update({ refresh_token: null }, {
          //     where: {
          //         id_petugas: id_petugas
          //     }
          // });

          return _context8.abrupt("return", res.sendStatus(200));

        case 11:
        case "end":
          return _context8.stop();
      }
    }
  });
};

exports.Logout = Logout;