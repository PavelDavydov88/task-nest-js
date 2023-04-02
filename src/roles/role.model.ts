import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {User} from "../user/user.model";
import {UserRoles} from "./user-roles.model";

interface RoleCraetionAttrs {
    value: string,
    description: string,
}

@Table({tableName: 'role', createdAt: false, updatedAt: false})
export class Role extends Model<Role, RoleCraetionAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true, onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    id: number;

    @Column({type: DataType.STRING})
    value: string;

    @Column({type: DataType.STRING})
    description: string;

    @BelongsToMany(() => User, () => UserRoles)
    users : User[];
}

