import {BelongsTo, Column, DataType, ForeignKey, HasOne, Model, Table} from "sequelize-typescript";
import {User} from "../user/user.model";

interface ProfileCraetionAttrs {
    firstName: string;
    secondName: string;
    telephone: string;
    login: string;
    userId: number;
}

@Table({tableName: 'profile', createdAt: false, updatedAt: false})
export class Profile extends Model<Profile, ProfileCraetionAttrs> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING})
    firstName: string;

    @Column({type: DataType.STRING})
    secondName: string;

    @Column({type: DataType.STRING})
    telephone: string;

    @Column({type: DataType.STRING})
    login: string;


    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER, unique: true, onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    userId: number;


    @BelongsTo(() => User)
    user: User;

}