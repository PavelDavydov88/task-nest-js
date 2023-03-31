import {forwardRef, Module} from '@nestjs/common';
import {AuthController} from "./auth.controller";
import {AuthService} from "./auth.service";
import {ProfileModule} from "../profile/profile.module";
import {JwtModule} from "@nestjs/jwt";
import * as process from "process";
import {UserModule} from "../user/user.module";
import {ConfigModule} from "@nestjs/config";

@Module({
    controllers : [AuthController],
    providers : [AuthService,],
    imports : [
        ConfigModule.forRoot({
            envFilePath: '.env'
        }),
        forwardRef(() => UserModule),
        ProfileModule,
        JwtModule.register({
            secret : process.env.PRIVATE_KEY || 'SECRET',
            // signOptions : {
            //     expiresIn : '24h'
            // },
        }),
    ],
    exports : [
        AuthService,
        JwtModule,
    ]
})
export class AuthModule {


}
