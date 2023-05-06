import db from "./config";
import { Sequelize } from "sequelize";

// Come da documentazione
const ConnectionInstance = new Sequelize(db.database, db.username, db.password, {
    host: db.host,
    dialect: db.dialect,
    storage: db.storage
});

export default ConnectionInstance;

