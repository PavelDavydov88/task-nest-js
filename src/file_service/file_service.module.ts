import {Module} from '@nestjs/common';
import {FileServiceService} from './file_service.service';
import {FileServiceController} from './file_service.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {FileStorage} from "./file_storage.model";

@Module({
    providers: [FileServiceService],
    controllers: [FileServiceController],
    imports: [SequelizeModule.forFeature([FileStorage])],
    exports: [FileServiceService],
})
export class FileServiceModule {
}
