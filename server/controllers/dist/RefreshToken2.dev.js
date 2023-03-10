"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.refreshToken2 = void 0;

var _Petugas = _interopRequireDefault(require("../models/Petugas.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var refreshToken2 = function refreshToken2(req, res) {
  var accessToken, petugas;
  return regeneratorRuntime.async(function refreshToken2$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          accessToken = req.cookies.accessToken;

          if (accessToken) {
            _context.next = 4;
            break;
          }

          return _context.abrupt("return", res.sendStatus(401));

        case 4:
          _context.next = 6;
          return regeneratorRuntime.awrap(_Petugas["default"].findAll({
            where: {
              refresh_token: accessToken
            }
          }));

        case 6:
          petugas = _context.sent;

          if (petugas[0]) {
            _context.next = 9;
            break;
          }

          return _context.abrupt("return", res.sendStatus(403));

        case 9:
          res.json({
            accessToken: accessToken
          });
          _context.next = 15;
          break;

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);

        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 12]]);
};

exports.refreshToken2 = refreshToken2;