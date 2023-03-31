import {Body, Controller, Delete, Get, Param, Post, UseGuards} from '@nestjs/common';
import {ProfileService} from "./profile.service";
import {CreateProfileDto} from "./dto/create-profile.dto";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {Role} from "../roles/role.model";
import {Roles} from "../auth/role-auth.decorator";
import {RoleGuard} from "../auth/role.guard";
import {AddRoleDto} from "./dto/add-role.dto";

@Controller('profile')
export class ProfileController {

    constructor(private profileService: ProfileService) {
    }

    @Post()
    create(@Body() profileDto: CreateProfileDto) {
        return this.profileService.creatProfile(profileDto)
    }

    @Roles("ADMIN")
    // @UseGuards(JwtAuthGuard)
    @UseGuards(RoleGuard)
    @Get()
    getAll() {
        return this.profileService.getAllProfiles();
    }

    @Roles("ADMIN")
    // @UseGuards(JwtAuthGuard)
    @UseGuards(RoleGuard)
    @Post('/role')
    addRole(@Body() dto : AddRoleDto ) {
        return this.profileService.addRole(dto);
    }

    // @Roles("ADMIN")
    @Delete(':login')
    remove(@Param('login') login: string) {
        return this.profileService.deleteByLogin(login);
    }
}
