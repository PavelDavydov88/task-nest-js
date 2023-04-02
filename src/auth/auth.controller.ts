import {Body, Controller, Post} from '@nestjs/common';
import {CreateProfileDto} from "../profile/dto/create-profile.dto";
import {AuthService} from "./auth.service";

@Controller('auth')
export class AuthController {

    constructor(private authService : AuthService) {}
    @Post('/login')
    login(@Body() profileDto : CreateProfileDto){
        return this.authService.login(profileDto);
    }

    @Post('/registration')
    registration(@Body() profileDto : CreateProfileDto){
        return this.authService.registration(profileDto);
    }
}
