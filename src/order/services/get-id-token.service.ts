import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User as UserEntity } from "src/user/entities/user.entity"; // Ajusta la ruta según tu estructura

@Injectable()
export class GetIdTokenService {
    constructor(
        private jwtService: JwtService,
        @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>
    ) {}

    // Método para obtener el usuario a partir del token
    public async getUserFromToken(token: string): Promise<UserEntity | null> {
        try {
            // Verifica y decodifica el token usando el JwtService
            const decodedToken = this.jwtService.verify(token);
            console.log(decodedToken + ' :Token decodificado'); // Asegúrate de que el token sea válido
            // Busca al usuario en la base de datos usando el ID decodificado del token
            return await this.userRepository.findOne({ where: { id: decodedToken.sub } });
        } catch (error) {
            // Maneja errores de verificación del token
            console.error('Error al verificar el token:', error); // Agrega más detalles en el error
            throw new UnauthorizedException('Invalid token');
        }
    }
}
