import {BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasOne, Model, Table} from "sequelize-typescript";
import {Role} from "../roles/role.model";
import {UserRoles} from "../roles/user-roles.model";
import {Profile} from "../profile/profile.model";

interface UserCraetionAttrs {
    login: string,
    password: string,
}

@Table({tableName: 'user'} )
export class User extends Model<User, UserCraetionAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true, onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    id: number;

    @Column({type: DataType.STRING, unique: true})
    login: string;

    @Column({type: DataType.STRING})
    password: string;

    @ForeignKey( () => Profile )
    @Column({type: DataType.INTEGER, unique: true, onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    profileId: number;

    @BelongsTo(() => Profile)
    profile: Profile;

    @BelongsToMany(() => Role, () => UserRoles)
    roles : Role[];

    }