import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {FileStorage} from "./file_storage.model";

@Injectable()
export class FileServiceService {

    constructor(@InjectModel(FileStorage) private fileStorage : typeof FileStorage) {}
    // creat(){
    //
    // }
}
