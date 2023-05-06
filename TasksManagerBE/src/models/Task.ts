import { BelongsToSetAssociationMixin,BelongsToManySetAssociationsMixin, DataTypes, Model } from "sequelize";
import sequelize from "../database/connection";
import { TaskInterface, TaskInput } from "../utils/interfaces/TaskInterface";
import User from "./User";

class Task extends Model<TaskInterface, TaskInput> implements TaskInterface {
    public id!: number
    public title!: string
    public content!: string
    public done!: boolean

    public setUser!: BelongsToSetAssociationMixin<User, User['id']>;

} 

Task.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.STRING(800),
            allowNull: true,
        },
        done: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        }
    },
    {
        sequelize
    }
);

export default Task
 