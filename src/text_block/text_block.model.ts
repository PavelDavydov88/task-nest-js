import {Column, DataType, HasOne, Model, Table} from "sequelize-typescript";
import {User} from "../user/user.model";

interface TableBlockCreationAttr {
    slogan: string;
    name: string;
    picture: string;
    text: string;
    group: string;
}

@Table({tableName: 'text_block', updatedAt: false, createdAt: false})
export class TextBlockModel extends Model<TextBlockModel, TableBlockCreationAttr> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, unique: true})
    slogan: string;

    @Column({type: DataType.STRING})
    name: string;

    @Column({type: DataType.TEXT})
    picture: string;

    @Column({type: DataType.STRING})
    text: string;

    @Column({type: DataType.STRING})
    group: string;

}