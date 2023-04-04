import {Column, DataType, Model, Table} from "sequelize-typescript";

interface TableBlockCreationAttr {
    essenceTable: string;
    essenceId: string;
    createdTime: string;
    nameFile: string;
}

@Table({tableName: 'file_storage', updatedAt: false, createdAt: true})
export class FileStorage extends Model {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING})
    essenceTable: string;

    @Column({type: DataType.STRING})
    essenceId: string;

    @Column({type: DataType.STRING})
    nameFile: string;
    @Column({type: DataType.STRING})
    createdTime: string;
}