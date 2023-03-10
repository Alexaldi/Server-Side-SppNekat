"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Logout = exports.deleteSiswa = exports.Login = exports.EditSiswa = exports.Register = exports.getUsersByKelas = exports.getUsersById = exports.getUsers = void 0;

var _SiswaModel = _interopRequireDefault(require("../models/SiswaModel.js"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _ClassRoom = _interopRequireDefault(require("../models/ClassRoom.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getUsers = function getUsers(req, res) {
  var siswa;
  return regeneratorRuntime.async(function getUsers$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(_SiswaModel["default"].findAll({
            attributes: ['id_siswa', 'nisn', 'name', 'alamat', 'no_telp', 'email'],
            include: {
              model: _ClassRoom["default"],
              as: 'kelas',
              attributes: ['angkatan', 'kelas']
            }
          }));

        case 3:
          siswa = _context.sent;
          res.json(siswa);
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

exports.getUsers = getUsers;

var getUsersById = function getUsersById(req, res) {
  var siswa;
  return regeneratorRuntime.async(function getUsersById$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(_SiswaModel["default"].findOne({
            attributes: ['id_siswa', 'nisn', 'name', 'id_kelas', 'alamat', 'no_telp', 'email'],
            where: {
              id_siswa: req.params.id_siswa
            },
            include: {
              model: _ClassRoom["default"],
              as: 'kelas',
              attributes: ['angkatan', 'kelas']
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

exports.getUsersById = getUsersById;

var getUsersByKelas = function getUsersByKelas(req, res) {
  var siswa;
  return regeneratorRuntime.async(function getUsersByKelas$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(_SiswaModel["default"].findOne({
            attributes: ['id_siswa', 'nisn', 'name', 'id_kelas', 'alamat', 'no_telp', 'email'],
            where: {
              id_kelas: req.params.id_kelas
            },
            include: {
              model: _ClassRoom["default"],
              as: 'kelas',
              attributes: ['angkatan', 'kelas']
            },
            order: [['name', 'ASC']]
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

exports.getUsersByKelas = getUsersByKelas;

var Register = function Register(req, res) {
  var _req$body, nisn, nama, id_kelas, alamat, no_telp, email, password, confPassword, siswa, salt, hashPassword;

  return regeneratorRuntime.async(function Register$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _req$body = req.body, nisn = _req$body.nisn, nama = _req$body.nama, id_kelas = _req$body.id_kelas, alamat = _req$body.alamat, no_telp = _req$body.no_telp, email = _req$body.email, password = _req$body.password, confPassword = _req$body.confPassword;
          console.log(nisn);
          _context4.next = 4;
          return regeneratorRuntime.awrap(_SiswaModel["default"].findAll({
            where: {
              nisn: nisn
            }
          }));

        case 4:
          siswa = _context4.sent;

          if (!siswa[0]) {
            _context4.next = 7;
            break;
          }

          return _context4.abrupt("return", res.status(400).json({
            msg: "Anda Sudah Mempunyai Akun"
          }));

        case 7:
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
          return regeneratorRuntime.awrap(_SiswaModel["default"].create({
            nisn: nisn,
            name: nama,
            id_kelas: id_kelas,
            alamat: alamat,
            no_telp: no_telp,
            email: email,
            password: hashPassword
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

var EditSiswa = function EditSiswa(req, res) {
  var _req$body2, nisn, nama, id_kelas, alamat, no_telp, email, password, confPassword, id_siswa, siswa, existingSiswa, salt, hashPassword;

  return regeneratorRuntime.async(function EditSiswa$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _req$body2 = req.body, nisn = _req$body2.nisn, nama = _req$body2.nama, id_kelas = _req$body2.id_kelas, alamat = _req$body2.alamat, no_telp = _req$body2.no_telp, email = _req$body2.email, password = _req$body2.password, confPassword = _req$body2.confPassword;
          id_siswa = req.params.id_siswa;
          _context5.next = 4;
          return regeneratorRuntime.awrap(_SiswaModel["default"].findOne({
            where: {
              id_siswa: id_siswa
            }
          }));

        case 4:
          siswa = _context5.sent;

          if (!(nisn && nisn !== siswa.nisn)) {
            _context5.next = 11;
            break;
          }

          _context5.next = 8;
          return regeneratorRuntime.awrap(_SiswaModel["default"].findOne({
            where: {
              nisn: nisn
            }
          }));

        case 8:
          existingSiswa = _context5.sent;

          if (!existingSiswa) {
            _context5.next = 11;
            break;
          }

          return _context5.abrupt("return", res.status(400).json({
            msg: "Nisn Telah Digunakan"
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
          _context5.t0 = siswa.password;

        case 23:
          hashPassword = _context5.t0;
          console.log(req.body);
          _context5.prev = 25;
          _context5.next = 28;
          return regeneratorRuntime.awrap(_SiswaModel["default"].update({
            nisn: nisn,
            name: nama,
            id_kelas: id_kelas,
            alamat: alamat,
            no_telp: no_telp,
            email: email,
            password: hashPassword
          }, {
            where: {
              id_siswa: id_siswa
            }
          }));

        case 28:
          res.json({
            msg: "Edit Siswa Berhasil"
          });
          _context5.next = 34;
          break;

        case 31:
          _context5.prev = 31;
          _context5.t1 = _context5["catch"](25);
          console.log(_context5.t1);

        case 34:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[25, 31]]);
};

exports.EditSiswa = EditSiswa;

var Login = function Login(req, res) {
  var siswa, match, id_siswa, nisn, nama, id_kelas, alamat, no_telp, email, accessToken, refreshToken;
  return regeneratorRuntime.async(function Login$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          console.log(req.body.nisn);
          console.log(req.body.password);
          _context6.prev = 2;
          _context6.next = 5;
          return regeneratorRuntime.awrap(_SiswaModel["default"].findAll({
            where: {
              nisn: req.body.nisn
            }
          }));

        case 5:
          siswa = _context6.sent;
          _context6.next = 8;
          return regeneratorRuntime.awrap(_bcrypt["default"].compare(req.body.password, siswa[0].password));

        case 8:
          match = _context6.sent;

          if (match) {
            _context6.next = 11;
            break;
          }

          return _context6.abrupt("return", res.status(400).json({
            msg: "Wrong Password"
          }));

        case 11:
          id_siswa = siswa[0].id_siswa;
          nisn = siswa[0].nisn;
          nama = siswa[0].nama;
          id_kelas = siswa[0].id_kelas;
          alamat = siswa[0].alamat;
          no_telp = siswa[0].no_telp;
          email = siswa[0].email;
          accessToken = _jsonwebtoken["default"].sign({
            id_siswa: id_siswa,
            nisn: nisn,
            nama: nama,
            id_kelas: id_kelas,
            alamat: alamat,
            no_telp: no_telp,
            email: email
          }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '20s'
          });
          refreshToken = _jsonwebtoken["default"].sign({
            id_siswa: id_siswa,
            nisn: nisn,
            nama: nama,
            id_kelas: id_kelas,
            alamat: alamat,
            no_telp: no_telp,
            email: email
          }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d'
          });
          _context6.next = 22;
          return regeneratorRuntime.awrap(_SiswaModel["default"].update({
            refresh_token: refreshToken
          }, {
            where: {
              id_siswa: id_siswa
            }
          }));

        case 22:
          res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
          });
          res.json({
            accessToken: accessToken
          });
          _context6.next = 30;
          break;

        case 26:
          _context6.prev = 26;
          _context6.t0 = _context6["catch"](2);
          console.log(_context6.t0);
          res.status(404).json({
            msg: "nisn tidak ditemukan"
          });

        case 30:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[2, 26]]);
};

exports.Login = Login;

var deleteSiswa = function deleteSiswa(req, res) {
  return regeneratorRuntime.async(function deleteSiswa$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          console.log(req.params.id_siswa);
          _context7.prev = 1;
          _context7.next = 4;
          return regeneratorRuntime.awrap(_SiswaModel["default"].destroy({
            where: {
              id_siswa: req.params.id_siswa
            }
          }));

        case 4:
          res.json({
            "message": "Siwa Telah Di Deleted"
          });
          _context7.next = 10;
          break;

        case 7:
          _context7.prev = 7;
          _context7.t0 = _context7["catch"](1);
          res.json({
            message: _context7.t0.message
          });

        case 10:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[1, 7]]);
};

exports.deleteSiswa = deleteSiswa;

var Logout = function Logout(req, res) {
  var refreshToken, siswa, id_siswa;
  return regeneratorRuntime.async(function Logout$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          refreshToken = req.cookies.refreshToken;

          if (refreshToken) {
            _context8.next = 3;
            break;
          }

          return _context8.abrupt("return", res.sendStatus(204));

        case 3:
          _context8.next = 5;
          return regeneratorRuntime.awrap(_SiswaModel["default"].findAll({
            where: {
              refresh_token: refreshToken
            }
          }));

        case 5:
          siswa = _context8.sent;

          if (siswa[0]) {
            _context8.next = 8;
            break;
          }

          return _context8.abrupt("return", res.sendStatus(204));

        case 8:
          id_siswa = siswa[0].id_siswa;
          _context8.next = 11;
          return regeneratorRuntime.awrap(_SiswaModel["default"].update({
            refresh_token: null
          }, {
            where: {
              id_siswa: id_siswa
            }
          }));

        case 11:
          res.clearCookie('refreshToken');
          return _context8.abrupt("return", res.sendStatus(200));

        case 13:
        case "end":
          return _context8.stop();
      }
    }
  });
};

exports.Logout = Logout;