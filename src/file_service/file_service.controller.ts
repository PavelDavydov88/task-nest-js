import {Controller, Delete, UseGuards} from '@nestjs/common';
import {Roles} from "../auth/role-auth.decorator";
import {RoleGuard} from "../auth/role.guard";
import {FileServiceService} from "./file_service.service";

@Controller('file-service')
export class FileServiceController {
    constructor(private fileServiceService: FileServiceService) {
    }

    @Roles("ADMIN")
    @UseGuards(RoleGuard)
    @Delete()
    remove() {
        return this.fileServiceService.deleteFile();
    }
}
