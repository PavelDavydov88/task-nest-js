import {forwardRef, Module} from '@nestjs/common';
import {ProfileService} from "./profile.service";
import {ProfileController} from "./profile.controller";
import {SequelizeModule} from "@nestjs/sequelize";
import {Profile} from "./profile.model";
import {UserModule} from "../user/user.module";
import {User} from "../user/user.model";
import {RolesModule} from "../roles/roles.module";
import {AuthModule} from "../auth/auth.module";
import {UserRoles} from "../roles/user-roles.model";

@Module({
    providers: [ProfileService],
    controllers: [ProfileController],
    imports: [
        SequelizeModule.forFeature([Profile]),
        SequelizeModule.forFeature([User, UserRoles]),
        forwardRef(() => UserModule),
        RolesModule,
        forwardRef(() => AuthModule),
    ],
    exports: [ProfileService]

})
export class ProfileModule {
}
