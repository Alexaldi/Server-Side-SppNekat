import { Sequelize } from "sequelize";
import db from "../config/Database.js";


const { DataTypes } = Sequelize;

const Spp = db.define('spp', {
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

export default Spp;

(async () => {
    await Spp.sync()
})()