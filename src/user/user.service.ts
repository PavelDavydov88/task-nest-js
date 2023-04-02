import {Injectable} from '@nestjs/common';
import {User} from "./user.model";
import {InjectModel} from '@nestjs/sequelize';
import {CreateUserDto} from "./dto/create-user.dto";
import {RolesService} from "../roles/roles.service";
import {CreateProfileDto} from "../profile/dto/create-profile.dto";
import * as bcrypt from 'bcryptjs'

@Injectable()
export class UserService {

    constructor(@InjectModel(User) private userRepository: typeof User,
                private roleService: RolesService) {
    }

    async creatUser(dto: CreateUserDto) {
        const user = await this.userRepository.create(dto);
        return user;
    }

    async getAllUsers() {
        const users = await this.userRepository.findAll({include: {all: true}});
        return users;
    }

    async getUserByLogin(login: string) {
        const user = await this.userRepository.findOne({where: {login}, include: {all: true}});
        if (user) return user;
        return undefined;
    }

    async deleteByLogin(login: string) {
        await this.userRepository.destroy({where: {'login': login}, cascade: true});
        return
    }

    async updateUser(dto: CreateProfileDto) {
        const hashPassword = await bcrypt.hash(dto.password, 5);
        await this.userRepository.update({password: hashPassword}, {where: {login: dto.login}});
        const user = this.userRepository.findOne({where: {login: dto.login}, include: {all: true}});
        return user;
    }

}
