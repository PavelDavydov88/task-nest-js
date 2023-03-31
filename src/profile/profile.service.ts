import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Profile} from "./profile.model";
import {CreateProfileDto} from "./dto/create-profile.dto";
import {User} from "../user/user.model";
import {UserService} from "../user/user.service";
import {RolesService} from "../roles/roles.service";
import {CreateUserDto} from "../user/dto/create-user.dto";
import {AddRoleDto} from "./dto/add-role.dto";

@Injectable()
export class ProfileService {

    constructor(@InjectModel(Profile) private profileRepository: typeof Profile, private userService: UserService,
                private roleService: RolesService) {
    }

    async creatProfile(dto: CreateProfileDto) {

        const profile = await this.profileRepository.create(dto);
        const user = await this.userService.creatUser(dto);
        await this.userService.update(user.id, {"profileId": `${profile.id}`},)
        const role = await this.roleService.getRoleByValue("ADMIN");
        await user.$set('roles', [role.id])
        user.roles = [role];
        return profile;
    }

    async getAllProfiles() {
        const profiles = await this.profileRepository.findAll();
        return profiles;
    }

    async findOne(name: string): Promise<Profile> {
        const profile = await this.profileRepository.findOne({
            where: {
                firstName: name
                ,
            },
        })
        return profile;
    }

    async addRole(dto : AddRoleDto){
        const user = await this.userService.getUserByLogin(dto.login);
        const role = await this.roleService.getRoleByValue(dto.value);
        if (user && role) {
            await user.$add('roles', role.id);
            return dto;
        }
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    async deleteByLogin(login: string) {

        await this.userService.deleteByLogin(login);

        return
    }
}
