import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {Role} from "../roles/role.model";
import {UserRoles} from "../roles/user-roles.model";

interface UserCraetionAttrs {
    login: string,
    password: string,
}

@Table({tableName: 'user', createdAt: false, updatedAt: false})
export class User extends Model<User, UserCraetionAttrs> {
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    id: number;

    @Column({type: DataType.STRING, unique: true})
    login: string;

    @Column({type: DataType.STRING})
    password: string;

    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[];

}