"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = require("sequelize");

var _Database = _interopRequireDefault(require("../config/Database.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var DataTypes = _sequelize.Sequelize.DataTypes;

var Spp = _Database["default"].define('spp', {
  id_spp: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nominal: {
    type: DataTypes.INTEGER
  },
  tahun: {
    type: DataTypes.INTEGER
  }
}, {
  freezeTableName: true
});

var _default = Spp;
exports["default"] = _default;

(function _callee() {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(Spp.sync());

        case 2:
        case "end":
          return _context.stop();
      }
    }
  });
})();