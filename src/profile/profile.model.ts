import {Column, DataType, ForeignKey, HasOne, Model, Table} from "sequelize-typescript";
import {User} from "../user/user.model";
import {ConnectionRefusedError} from "sequelize";

interface ProfileCraetionAttrs {
     firstName : string;
     secondName : string;
     telephone : string;
     login : string;
}

@Table({tableName: 'profile'})
export class Profile extends Model<Profile, ProfileCraetionAttrs> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING})
    firstName: string;

    @Column({type: DataType.STRING})
    secondName: string;

    @Column({type: DataType.STRING})
    telephone: string;

    @HasOne(() => User)
    user: User;


}