import {Module} from '@nestjs/common';
import {TextBlockController} from './text_block.controller';
import {TextBlockService} from './text_block.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {TextBlockModel} from "./text_block.model";
import {AuthModule} from "../auth/auth.module";
import {FileServiceModule} from "../file_service/file_service.module";
import {FileStorage} from "../file_service/file_storage.model";

@Module({
    controllers: [TextBlockController],
    providers: [
        TextBlockService,
    ],
    imports: [
        SequelizeModule.forFeature([TextBlockModel, FileStorage]),
        AuthModule, FileServiceModule
    ],
    exports: [TextBlockService]

})
export class TextBlockModule {
}
