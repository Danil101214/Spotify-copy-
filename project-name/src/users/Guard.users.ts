import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private reflector: Reflector,
    private jwtService: JwtService) {}
    canActivate(
      context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        try {
        //const token = (request.headers.authorization || '').replace(/Bearer\s?/, '')
        const authHeader = request.headers.authorization
        const bearer = authHeader.split(' ')[0]
        const token = authHeader.split(' ')[1]
        console.log(token)
        /*if(bearer !== 'Bearer' || !token) {
            throw new HttpException('Вы не авторизованы, авторизуйтесь', HttpStatus.BAD_REQUEST)
        }*/
        const decodeData = this.jwtService.verify(token)
        request.user = decodeData
        return true; 
      } catch (error) {
        console.log(error)
      }
    }
  }