import {forwardRef, Module} from '@nestjs/common';
import {ProfileService} from "./profile.service";
import {ProfileController} from "./profile.controller";
import {SequelizeModule} from "@nestjs/sequelize";
import {Profile} from "./profile.model";
import {UserModule} from "../user/user.module";
import {User} from "../user/user.model";
import {UserService} from "../user/user.service";
import {RolesModule} from "../roles/roles.module";
import {AuthModule} from "../auth/auth.module";

@Module({
    providers: [ProfileService, /*UserService*/],
    controllers: [ProfileController],
    imports: [SequelizeModule.forFeature([Profile]),
        SequelizeModule.forFeature([User]),
        forwardRef(() => UserModule),
        RolesModule,
        forwardRef(() => AuthModule),
    ],
    exports: [ProfileService]

})
export class ProfileModule {
}
