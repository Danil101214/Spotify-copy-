import { Controller, Post, Body, Get, UseGuards, Param, Req } from '@nestjs/common';
import mongoose, { ObjectId } from 'mongoose';
import { RolesService } from 'src/roles/roles.service';
import { RolesDto } from '../roles/dto/roles.dto';
import { BanDto } from './dto/ban.dto';
import { CreateUsers } from './dto/users.dto';
import { AuthGuard } from './Guard.users';
import { Roles } from './Roles.decorator';
import { RolesGuard } from './Roles.Guard';
import { User } from './User.Decorator';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
    constructor(private usersService: UsersService,
        private rolesService: RolesService,        
    ) {}

    @Post('/registration')
    registration(@Body() dto: CreateUsers) {
        return this.usersService.registration(dto)
    }
    @Post('/login')
    login(@Body() dto: CreateUsers) {
        return this.usersService.login(dto)
    }
    @Get('/:id')
    findById(@Param('id') id: mongoose.Schema.Types.ObjectId) {
        return this.usersService.getOne(id)
    }
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Get('/')
    getUsers() {
        return this.usersService.getAll()
    }
    @Post('/roles')
    createRole(@Body() dto: RolesDto) {
        return this.rolesService.create(dto)
    }
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Post('/ban')
    addBan(@Body() dto: BanDto) {
        return this.usersService.addBan(dto)
    }
    @UseGuards(AuthGuard)
    @Get('/my/profile')
    getOneUser(@Req() request: any) {
        return this.usersService.getOneUser(request.user)
    }

    @UseGuards(AuthGuard)
    @Post('/addMusic/:id')
    addMusic(@Param('id') id: mongoose.Schema.Types.ObjectId, @Req() request: any) {
        return this.usersService.addMusic(id, request.user)
    }
}