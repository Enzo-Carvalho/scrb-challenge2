import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import { CadastroNovoUsuarioDTO } from "src/usuario/model/cadastronovousuariodto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Users } from "src/usuario/entities/users.entity";
import { UserService } from "src/usuario/service/users.service";

@Injectable()
export class AuthService {

    constructor(
        private jwtService: JwtService,
        private userService: UserService,

        @InjectRepository(Users)
        private usersRepository: Repository<Users>,
    ){}

    async validaUser(username: string, password: string){

        const user = await this.userService.getUserByUsername(username)
        if(user && bcrypt.compareSync(password, user.senha)){
            const {id, username, senha} = user
            return {id: id, username, senha}
        }

        return null
    }

    /*
    async cadastraUser(user: any){

        let novoCadastro = new CadastroNovoUsuarioDTO()
        novoCadastro.senha = user.password
        novoCadastro.username = user.username
        await this.userService.create(novoCadastro)

        const userProcurado = await this.userService.getUserByUsername(user.username)
        if(userProcurado && bcrypt.compareSync(user.password, userProcurado.senha)){
            const {id, username, senha} = user
            return {id: id, username, senha}
        }

        return null
    }*/

    async login(user: any){

        const payload = {username: user.username, senha: user.senha}
        return {
            acess_token: this.jwtService.sign(payload)
        }
    }

    /*
    async signin(user: any){
        
        const payload = {username: user.username, senha: user.senha}
        //payload = await this.cadastraUser(payload.username, payload.senha)
        return {
            acess_token: this.jwtService.sign(payload)
        }
    }*/
}