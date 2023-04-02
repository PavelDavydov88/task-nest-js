import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Profile} from "./profile.model";
import {CreateProfileDto} from "./dto/create-profile.dto";
import {UserService} from "../user/user.service";
import {RolesService} from "../roles/roles.service";
import {CreateUserDto} from "../user/dto/create-user.dto";
import {AddRoleDto} from "./dto/add-role.dto";
import {UserRoles} from "../roles/user-roles.model";
import {Reflector} from "@nestjs/core";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class ProfileService {

    constructor(@InjectModel(Profile) private profileRepository: typeof Profile,
                @InjectModel(UserRoles) private userRoleRepository: typeof UserRoles,
                private userService: UserService,
                private roleService: RolesService,
                private reflector: Reflector,
                private jwtService: JwtService,
    ) {}

    async creatProfile(dto: CreateProfileDto) {

        const user = await this.userService.creatUser(dto);
        const profile = await this.profileRepository.create({...dto, userId: user.id});
        const role = await this.roleService.getRoleByValue("USER");
        await user.$set('roles', [role.id])
        return profile;
    }

    async getAllProfiles() {
        const profiles = await this.profileRepository.findAll();
        return profiles;
    }

    async addRole(dto: AddRoleDto) {
        const user = await this.userService.getUserByLogin(dto.login);
        const role = await this.roleService.getRoleByValue(dto.value);
        if (user && role) {
            await user.$add('roles', role.id);
            return dto;
        }
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    async deleteByLogin(req: Request, login: string) {
        const authHeader = req.headers["authorization"];
        const token = authHeader.split(' ')[1];
        const userAuth = this.jwtService.verify<CreateUserDto>(token);
        const profileRepository = await this.profileRepository.findOne({where: {login: userAuth.login}})
        const roleIdUserAuth = await this.userRoleRepository.findOne({where: {userId: profileRepository.userId}})
        if (roleIdUserAuth.roleId != 1 && userAuth.login !== login) {
            throw new UnauthorizedException({message: 'User hasn\'t authorities'})
        }
        await this.userService.deleteByLogin(login);

        return
    }

    async updateProfile(req: Request, dto: CreateProfileDto) {
        const authHeader = req.headers["authorization"];
        const token = authHeader.split(' ')[1];
        const userAuth = this.jwtService.verify<CreateUserDto>(token);
        const profileRepository = await this.profileRepository.findOne({where: {login: userAuth.login}})
        const roleIdUserAuth = await this.userRoleRepository.findOne({where: {userId: profileRepository.userId}})
        if (roleIdUserAuth.roleId != 1 && userAuth.login !== dto.login) {
            throw new UnauthorizedException({message: 'User hasn\'t authorities'})
        }

        const user = await this.userService.updateUser(dto);
        await this.profileRepository.update({...dto, userId: user.id}, {where: {login: dto.login}});
        const profile = await this.profileRepository.findOne({where: {login: dto.login}})
        return profile;
    }
}
