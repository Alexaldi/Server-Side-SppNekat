import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const ClassRoom = db.define('kelas', {
    id_kelas: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    }
    ,
    angkatan: {
        type: DataTypes.INTEGER
    },
    kelas: {
        type: DataTypes.STRING
    },
}, {
    freezeTableName: true
});


export default ClassRoom;

(async () => {
    await ClassRoom.sync()
})()