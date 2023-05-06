import { Task, User } from "../models"

import sequelize from "../database/connection";

const init = () => {
    User.hasMany(Task, {
        onDelete:'CASCADE'
    })
    Task.belongsTo(User, {
        foreignKey: { allowNull: false } 
    })

    return sequelize.sync();
}
 
export default init; 