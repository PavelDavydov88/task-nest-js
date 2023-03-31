import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {CreateProfileDto} from "../profile/dto/create-profile.dto";
import {User} from "../user/user.model";
import {UserService} from "../user/user.service";
import {ProfileService} from "../profile/profile.service";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from 'bcryptjs'

@Injectable()
export class AuthService {

    constructor(private userService: UserService,
                private jwtService: JwtService,
                private profileService: ProfileService) {
    }

    async login(profileDto: CreateProfileDto) {
        const user = await this.validateProfile(profileDto)
        return  await this.generateToken(user)
    }

    async registration(profileDto: CreateProfileDto) {
        const candidate = await this.userService.getUserByLogin(profileDto.login)
        if (candidate) {
            throw new HttpException('User with login alredy exist', HttpStatus.BAD_REQUEST)
        }
        const hashPassword = await bcrypt.hash(profileDto.password, 5);
        const profile = await this.profileService.creatProfile({...profileDto, password: hashPassword});
        return this.generateToken(/*profile,*/ await this.userService.getUserByLogin(profileDto.login));
    }

    private async generateToken(/*profile: Profile, */user: User) {
        const payLoad = {/*profile: profile.firstName, */login: user.login, userId: user.id, roles: user.roles};
        return {token: this.jwtService.sign(payLoad, {secret: `${process.env.PRIVATE_KEY}`, expiresIn : "10h"})};
    }

    private async validateProfile(profileDto: CreateProfileDto) {
        const user = await this.userService.getUserByLogin(profileDto.login)
        if (!user) throw new UnauthorizedException({message : 'Invalid login'})
        const passwordEquals = await bcrypt.compare(profileDto.password, user.password)
        if (user && passwordEquals) {
            return user;
        }
    throw new UnauthorizedException({message : 'Invalid password'})
    }
}
