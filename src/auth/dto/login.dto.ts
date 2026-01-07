import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

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
    @IsStrongPassword(
        {
            minLength: 12,
            minNumbers: 1,
            minSymbols: 1
        },
        {
            message: 'Le mot de passe doit contenir au moins 12 caractères, un chiffre et un symbole.'
        }
    )
    readonly password: string;
}