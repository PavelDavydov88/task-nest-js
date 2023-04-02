import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {FileStorage} from "./file_storage.model";
import * as path from "path";
import * as fs from "fs";
import * as uuid from 'uuid';

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
            return path.resolve(filePath, fileName);
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
