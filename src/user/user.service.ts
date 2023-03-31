import {Injectable} from '@nestjs/common';
import {User} from "./user.model";
import {InjectModel} from '@nestjs/sequelize';
import {CreateUserDto} from "./dto/create-user.dto";
import {RolesService} from "../roles/roles.service";

@Injectable()
export class UserService {

    constructor(@InjectModel(User) private userRepository: typeof User,
                private roleService : RolesService) {
    }

    async creatUser(dto: CreateUserDto) {
        const user = await this.userRepository.create(dto);
        return user;
    }

    async getAllUsers(){
        const users = await this.userRepository.findAll({include: {all: true}});
        return users;
    }

    async getUserByLogin(login : string){
        const user = await this.userRepository.findOne({where: {login}, include: {all: true}});
        if (user) return user;
        return  undefined;
    }

    async update(id, data){
        const user = await this.userRepository.update({ ...data }, { where: { id }, returning: true });
        return user;
    }
    async deleteByLogin(login: string){


         await this.userRepository.destroy({ where: { 'login' : login }, cascade: true , truncate : true});
        return
        // return await this.userRepository.destroy();
    }

}
