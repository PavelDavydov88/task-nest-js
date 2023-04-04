import {Module} from '@nestjs/common';
import {FileServiceService} from './file_service.service';
import {FileServiceController} from './file_service.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {FileStorage} from "./file_storage.model";
import {AuthModule} from "../auth/auth.module";

@Module({
    providers: [FileServiceService],
    controllers: [FileServiceController],
    imports: [
        SequelizeModule.forFeature([FileStorage]),
        AuthModule,
    ],
    exports: [FileServiceService],
})
export class FileServiceModule {
}
