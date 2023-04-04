import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {FileStorage} from "./file_storage.model";
import * as path from "path";
import * as fs from "fs";
import * as uuid from 'uuid';
import sequelize from "sequelize";

// const {Op} = require('sequelize')

export enum FileType {
    IMAGE = 'image',
}

@Injectable()
export class FileServiceService {

    constructor(@InjectModel(FileStorage) private fileStorage: typeof FileStorage) {
    }

    creatFile(type: FileType, file): string {

        try {
            const fileExtension = file["picture"][0]["originalname"].split('.').pop();
            const fileName = uuid.v4() + '.' + fileExtension;
            const filePath = path.resolve(__dirname, '..', 'static', type);
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, {recursive: true});
            }
            fs.writeFileSync(path.resolve(filePath, fileName), file["picture"][0]["buffer"]);
            this.fileStorage.create({
                nameFile: path.resolve(filePath, fileName),
                createdTime: new Date().getTime(),
            }).then();
            return path.resolve(filePath, fileName);

        } catch (e) {
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async updateFile(nameFile, essenceId, essenceTable) {
        this.fileStorage.update({essenceId, essenceTable}, {where: {nameFile: nameFile}}).then();
    }

    async deleteFile() {
        this.fileStorage.findAll({where: {essenceTable: null, essenceId: null}}).then();
        const curTime = new Date().getTime() - 1000 * 60 * 30;
        console.log(curTime);
        await this.fileStorage.destroy({
            where: {
                essenceTable: null,
                essenceId: null,
                where:
                    sequelize.where(
                        sequelize.cast(sequelize.col('createdTime'), 'bigint'),
                        { [sequelize.Op.lt]: curTime },
                    ),
            }
        });
        return HttpStatus.OK;
    }
}
