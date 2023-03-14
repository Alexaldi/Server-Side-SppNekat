import { Sequelize } from "sequelize";

const db = new Sequelize('spp-project', 'root', '', {
    host: "localhost",
    dialect: "mysql"
});

export default db;