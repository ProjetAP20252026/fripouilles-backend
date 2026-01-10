import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
    @ApiProperty({
        example: 'john.doe@example.com',
        description: "L'adresse email de l'utilisateur"
    })
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @ApiProperty({
        example: 'StrongP@ssw0rd!',
        description: "Le mot de passe de l'utilisateur (min. 12 caractères, 1 chiffre, 1 symbole)"
    })
    @IsNotEmpty()
    @IsString()
    readonly password: string;
}