import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    UploadedFiles,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {TextBlockService} from "./text_block.service";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {CreateTextBlockDto} from "./dto/create-text_block.dto";
import {Roles} from "../auth/role-auth.decorator";
import {RoleGuard} from "../auth/role.guard";
import {FileFieldsInterceptor} from "@nestjs/platform-express";

@Controller('text-block')
export class TextBlockController {

    constructor(private textBlockService: TextBlockService) {
    }

    @Roles("ADMIN")
    @UseGuards(RoleGuard)
    @Post()
    @UseInterceptors(FileFieldsInterceptor([{ name: 'picture', maxCount : 1}]))
    create(@Body() textBlock: CreateTextBlockDto, @UploadedFiles() file) {
        return this.textBlockService.creatTextBlock(textBlock, file)
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    getAll() {
        return this.textBlockService.getAllTextBlock();
    }

    @Roles("ADMIN")
    @UseGuards(RoleGuard)
    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.textBlockService.deleteTextBlockById(id);
    }

    @Roles("ADMIN")
    @UseGuards(RoleGuard)
    @Put(':id')
    update(@Body() dto: CreateTextBlockDto, @Param('id') id: number) {
        return this.textBlockService.updateTextBlock(dto, id);
    }
}
