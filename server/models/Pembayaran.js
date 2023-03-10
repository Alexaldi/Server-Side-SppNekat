import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Petugas from "./Petugas.js";
import Spp from "./SppModel.js"
import Siswa from "./SiswaModel.js";

const { DataTypes } = Sequelize;

const Pembayaran = db.define('pembayaran', {
    id_pembayaran: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_petugas: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Petugas,
            key: 'id_petugas'
        }
    },
    id_siswa: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Siswa,
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
            model: Spp,
            key: 'id_spp'
        }
    },
    jumlah_bayar: {
        type: DataTypes.INTEGER
    },
    status: {
        type: DataTypes.BOOLEAN
    },
}, {
    freezeTableName: true
});

Pembayaran.belongsTo(Siswa, { foreignKey: 'id_siswa' });
Pembayaran.belongsTo(Petugas, { foreignKey: 'id_petugas', as: 'petugas' });
Pembayaran.belongsTo(Spp, { foreignKey: 'id_spp' });
export default Pembayaran;

(async () => {
    await Pembayaran.sync()
})()