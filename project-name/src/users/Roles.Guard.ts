import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private jwtService: JwtService, private reflector: Reflector) {}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        try {
            const requireRoles = this.reflector.getAllAndOverride<string[]>('roles', [
                context.getHandler(),
                context.getClass()
            ])
            const request = context.switchToHttp().getRequest()
            if(!requireRoles) {
                return true
            }
            const authHeader = request.headers.authorization
            const bearer = authHeader.split(' ')[0]
            const token = authHeader.split(' ')[1]
            console.log(token)
            /*if(bearer !== 'Bearer' || !token) {
                throw new HttpException('Вы не авторизованы, авторизуйтесь', HttpStatus.BAD_REQUEST)
            }*/
            const decodeData = this.jwtService.verify(token)
            request.user = decodeData;
            return decodeData.roles.some(role => requireRoles.includes(role.value))
            } catch (error) {
            console.log(error)
            throw new HttpException('Вы не являетесь администратором.', HttpStatus.BAD_REQUEST);
        }
    }
}