import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import ClassRoom from "./ClassRoom.js";

const { DataTypes } = Sequelize;

const Siswa = db.define('siswa', {
    id_siswa: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nisn: {
        type: DataTypes.CHAR,
    }
    ,
    name: {
        type: DataTypes.STRING
    },
    id_kelas: {
        type: DataTypes.INTEGER,
        references: {
            model: ClassRoom,
            key: 'id_kelas'
        }
    },
    alamat: {
        type: DataTypes.TEXT
    },
    no_telp: {
        type: DataTypes.CHAR
    },
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    refresh_token: {
        type: DataTypes.TEXT
    }
}, {
    freezeTableName: true
});

Siswa.belongsTo(ClassRoom, { foreignKey: 'id_kelas', as: 'kelas' });

ClassRoom.hasMany(Siswa, {
    foreignKey: 'id_kelas',
    as: 'siswa',
});

export default Siswa;

(async () => {
    await Siswa.sync()
})()