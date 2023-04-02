import {Module} from "@nestjs/common";
import {SequelizeModule} from "@nestjs/sequelize";
import {UserModule} from './user/user.module';
import {ConfigModule} from "@nestjs/config";
import * as process from "process";
import {User} from "./user/user.model";
import {ProfileModule} from './profile/profile.module';
import {Profile} from "./profile/profile.model";
import {RolesModule} from './roles/roles.module';
import {Role} from "./roles/role.model";
import {UserRoles} from "./roles/user-roles.model";
import {AuthService} from './auth/auth.service';
import {AuthController} from './auth/auth.controller';
import {AuthModule} from './auth/auth.module';
import {JwtService} from "@nestjs/jwt";
import {TextBlockModule} from './text_block/text_block.module';
import {FileServiceModule} from './file_service/file_service.module';
import {TextBlockModel} from "./text_block/text_block.model";
import {FileStorage} from "./file_service/file_storage.model";

@Module({
    controllers: [AuthController],
    providers: [AuthService,
        JwtService,
    ],
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env'
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [User, Profile, Role, UserRoles, TextBlockModel, FileStorage],
            autoLoadModels: true,
        }), ProfileModule, UserModule, RolesModule, AuthModule, TextBlockModule, FileServiceModule ]
})
export class AppModule {
}