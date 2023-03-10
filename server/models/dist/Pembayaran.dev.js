"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = require("sequelize");

var _Database = _interopRequireDefault(require("../config/Database.js"));

var _Petugas = _interopRequireDefault(require("./Petugas.js"));

var _SppModel = _interopRequireDefault(require("./SppModel.js"));

var _SiswaModel = _interopRequireDefault(require("./SiswaModel.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var DataTypes = _sequelize.Sequelize.DataTypes;

var Pembayaran = _Database["default"].define('pembayaran', {
  id_pembayaran: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  id_petugas: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: _Petugas["default"],
      key: 'id_petugas'
    }
  },
  id_siswa: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: _SiswaModel["default"],
      key: 'id_siswa'
    }
  },
  tgl_bayar: {
    type: DataTypes.DATE
  },
  id_spp: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: _SppModel["default"],
      key: 'id_spp'
    }
  },
  jumlah_bayar: {
    type: DataTypes.INTEGER
  },
  status: {
    type: DataTypes.BOOLEAN
  }
}, {
  freezeTableName: true
});

Pembayaran.belongsTo(_SiswaModel["default"], {
  foreignKey: 'id_siswa'
});
Pembayaran.belongsTo(_Petugas["default"], {
  foreignKey: 'id_petugas',
  as: 'petugas'
});
Pembayaran.belongsTo(_SppModel["default"], {
  foreignKey: 'id_spp'
});
var _default = Pembayaran;
exports["default"] = _default;

(function _callee() {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(Pembayaran.sync());

        case 2:
        case "end":
          return _context.stop();
      }
    }
  });
})();