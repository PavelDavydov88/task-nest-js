import {Column, DataType, HasOne, Model, Table} from "sequelize-typescript";
import {User} from "../user/user.model";

interface TableBlockCreationAttr {
    essenceTable: string;
    essenceId: string;
    createdTime: string;
    dataFile: string;

}

@Table({tableName: 'file_storage', updatedAt: false, createdAt: false})
export class FileStorage extends Model {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING})
    essenceTable: string;

    @Column({type: DataType.STRING})
    essenceId: string;

    @Column({type: DataType.INTEGER})
    createdTime: Number;

    @Column({type: DataType.TEXT})
    dataFile: string;

}