import { Users } from "../entities/users.entity";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CadastroNovoUsuarioDTO } from "../model/cadastronovousuariodto";
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(Users)
        private readonly usersRepository: Repository<Users>,
    ) {}

    async updateLastLogin(username: string): Promise<void> {
        const user = await this.usersRepository.findOne({ where: { username } });
        if (user) {
        user.lastLogin = new Date();
        await this.usersRepository.save(user);
        }
    }

    async create(user : CadastroNovoUsuarioDTO): Promise<Users> {
        const regex = /[A-Z]|[1-9]/g
        const foundRequisitos = user.senha.match(regex);

        if(foundRequisitos.length >= 2 && user.senha.length >= 8){
            const regexNumeros = /[1-9]/g
            const foundRequisitosNumericos = user.senha.match(regexNumeros);

            if(foundRequisitosNumericos.length == foundRequisitos.length || foundRequisitosNumericos.length == 0){
                throw new HttpException('A senha precisa possuir pelo menos 1 Número e 1 letra Maiúscula', HttpStatus.UNPROCESSABLE_ENTITY)
            } else{
                
                const hashPasswordSize = user.senha.length
                const hash = await bcrypt.hash(user.senha,hashPasswordSize)

                let novoUsuario = new Users()
                novoUsuario.username = user.username
                novoUsuario.senha = hash
                novoUsuario.email = user.email
                novoUsuario.telefone = user.telefone

                return this.usersRepository.save(novoUsuario)
            }
        }

        throw new HttpException('A senha precisa possuir pelo menos 1 Número e 1 letra Maiúscula', HttpStatus.BAD_REQUEST)
    }

    async getUser(user : CadastroNovoUsuarioDTO): Promise<Users> {
        let userBuscado = await this.usersRepository.findOne({
            where : {
                username : user.username
            }
        })

        if(!userBuscado){
            throw new HttpException('Usuario não encontrado!', HttpStatus.NOT_FOUND)
        }

        if(bcrypt.compareSync(user.senha, userBuscado.senha)){
            return userBuscado
        } 
        throw new HttpException('Senha Inválida!', HttpStatus.NOT_FOUND)
        
    }

    async getUserByUsername(username: string): Promise<Users> {
        return this.usersRepository.findOne({
            where : {
                username : username
            }
        })
    }
}