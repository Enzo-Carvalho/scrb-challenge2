import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersController } from "../controllers/users.controller";
import { UserService } from "../service/users.service";
import { Users } from "../entities/users.entity";
import { jwtConstants } from "src/auth/shared/constants";

@Module({
    imports:[TypeOrmModule.forFeature([Users]), JwtModule.register({
        secret: jwtConstants.secret,
        signOptions: {expiresIn: '30min'}
      })],
    providers:[UserService],
    controllers:[UsersController],
    exports:[TypeOrmModule, UserService]
}) export class UsersModule{}