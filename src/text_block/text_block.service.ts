import {HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {TextBlockModel} from "./text_block.model";
import {CreateTextBlockDto} from "./dto/create-text_block.dto";
import {FileServiceService, FileType} from "../file_service/file_service.service";
import {FileStorage} from "../file_service/file_storage.model";

@Injectable()
export class TextBlockService {
    constructor(@InjectModel(TextBlockModel) private textBlockRepository: typeof TextBlockModel,
                @InjectModel(FileStorage) private fileStorageRepository: typeof FileStorage,
                private fileService: FileServiceService) {
    }

    async creatTextBlock(dto: CreateTextBlockDto, file) {
        const imagePath = this.fileService.creatFile(FileType.IMAGE, file);
        console.log(imagePath)
        const textBlock = await this.textBlockRepository.create({...dto, picture: imagePath});
        const nameTable = this.textBlockRepository.getTableName();
        console.log(nameTable)
        this.fileService.updateFile( imagePath, textBlock.id, nameTable).then();
        return textBlock;
    }

    async getAllTextBlock() {
        const textBlocks = await this.textBlockRepository.findAll();
        return textBlocks;
    }

    async updateTextBlock(dto: CreateTextBlockDto, id: number) {
        await this.textBlockRepository.update({...dto}, {where: {id: id}});
        const textBlock = await this.textBlockRepository.findOne({where: {id: id}});
        return textBlock;
    }

    async deleteTextBlockById(id: number) {
        const textBlock = await this.textBlockRepository.findOne({where: {id}}).then()
        this.fileService.updateFile( textBlock.picture, null, null).then();
        await this.textBlockRepository.destroy({where: {id: id}});
        return HttpStatus.OK;
    }
}
