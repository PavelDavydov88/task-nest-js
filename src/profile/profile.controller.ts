import {Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards} from '@nestjs/common';
import {ProfileService} from "./profile.service";
import {CreateProfileDto} from "./dto/create-profile.dto";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {Roles} from "../auth/role-auth.decorator";
import {RoleGuard} from "../auth/role.guard";
import {AddRoleDto} from "./dto/add-role.dto";

@Controller('profile')
export class ProfileController {

    constructor(private profileService: ProfileService) {
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() profileDto: CreateProfileDto) {
        return this.profileService.creatProfile(profileDto)
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    getAll() {
        return this.profileService.getAllProfiles();
    }

    @Roles("ADMIN")
    @UseGuards(RoleGuard)
    @Post('/role')
    addRole(@Body() dto: AddRoleDto) {
        return this.profileService.addRole(dto);
    }

    @Roles("ADMIN", "USER")
    @UseGuards(RoleGuard)
    @Delete(':login')
    remove(@Request() req: Request, @Param('login') login: string) {
        return this.profileService.deleteByLogin(req, login);
    }

    @Roles("ADMIN", "USER")
    @UseGuards(RoleGuard)
    @Put()
    update(@Request() req: Request, @Body() dto: CreateProfileDto) {
        return this.profileService.updateProfile(req, dto);
    }
}
