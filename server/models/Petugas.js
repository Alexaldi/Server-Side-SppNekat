import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Petugas = db.define('petugas', {
    id_petugas: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    nama_petugas: {
        type: DataTypes.STRING
    },
    level: {
        type: DataTypes.ENUM({
            values: (['admin', 'tata_usaha'])
        })
    }, refresh_token: {
        type: DataTypes.TEXT
    }

}, {
    freezeTableName: true
});

export default Petugas;

(async () => {
    await Petugas.sync()
})()