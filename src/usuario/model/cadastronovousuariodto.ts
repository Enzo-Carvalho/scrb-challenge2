import { IsNotEmpty, MaxLength, MinLength} from "class-validator";

export class CadastroNovoUsuarioDTO{

    id: number

    @IsNotEmpty()
    @MaxLength(255)
    @MinLength(3)
    username: string

    @IsNotEmpty()
    @MaxLength(255)
    @MinLength(8)
    senha: string

    @IsNotEmpty()
    @MaxLength(500)
    @MinLength(15)
    email: string
    
}