import { Body, Controller, Get, HttpCode, HttpException, HttpStatus,Post, Res, UseGuards } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Response } from "express";
import { CadastroNovoUsuarioDTO } from "../model/cadastronovousuariodto";
import { ApiTags } from "@nestjs/swagger";
import { Users } from "../entities/users.entity";
import { UserService } from "../service/users.service";
import { JwtAuthGuard } from "src/auth/shared/jwt-auth.guard";

@ApiTags('Users')
@Controller('/users')
export class UsersController{
    
    constructor(
        private readonly service: UserService,
        //private authService: AuthService
        private jwtService: JwtService
    ){}
    
    /*
    @UseGuards(JwtAuthGuard)
    @Get()
    @HttpCode(HttpStatus.OK)
    getAll(): Promise<Users[]> {
        return this.service.getAll()
    }*/

    //@UseGuards(JwtAuthGuard)
    @Post('/signin')
    @HttpCode(HttpStatus.CREATED)
    createUser(@Body() user : CadastroNovoUsuarioDTO): Promise<Users>{
        return this.service.create(user)
    }

    @UseGuards(JwtAuthGuard)
    @Get('/login')
    @HttpCode(HttpStatus.OK)
    getUser(
        @Body() user : CadastroNovoUsuarioDTO,
        @Res({passthrough: true}) response : Response
    ): Promise<Users>{
        let userBuscado = this.service.getUser(user)

        if(!userBuscado){
            throw new HttpException('Usuario Nao encontrado', HttpStatus.NOT_FOUND)
        }

        const jwt = this.jwtService.signAsync({id: user.id})
        response.cookie('jwt', jwt, {httpOnly: true})
        return userBuscado
    }
}