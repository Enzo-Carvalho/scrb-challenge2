import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, MaxLength, MinLength } from "class-validator";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'users_tb'})
export class Users{

    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number

    @ApiProperty()
    @IsNotEmpty()
    @MaxLength(255)
    @MinLength(3)
    @Column({nullable: false, length: 255, unique: true})
    username: string

    @ApiProperty()
    @IsNotEmpty()
    @MaxLength(255)
    @MinLength(8)
    @Column({nullable: false, length: 255})
    senha: string

    @IsNotEmpty()
    @MaxLength(500)
    @MinLength(8)
    @Column({nullable: false, length: 500})
    email: string

    @CreateDateColumn({ name: 'data_criacao' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'data_atualizacao' })
    updatedAt: Date;

    @Column({ name: 'ultimo_login', nullable: true })
    lastLogin: Date;
}