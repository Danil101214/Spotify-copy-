import { Injectable, HttpException, HttpStatus, Scope, Inject } from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose'
import mongoose, { Model, ObjectId } from 'mongoose';
import { CreateUsers } from './dto/users.dto';
import { User, UserDocument } from './users.model';
import {JwtService} from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { RolesDto } from 'src/roles/dto/roles.dto';
import { Roles, RolesDocument } from 'src/roles/roles.model';
import { RolesService } from 'src/roles/roles.service';
import { BanDto } from './dto/ban.dto';
import { request, response } from 'express';
import { Track, TrackDocument } from 'src/track/track.model';
import { REQUEST } from '@nestjs/core';
@Injectable({ scope: Scope.REQUEST })
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
    private roleService: RolesService,
    @InjectModel(Roles.name) private rolesRepository: Model<RolesDocument>,
    @InjectModel(Track.name) private trackRepository: Model<TrackDocument>,
    @Inject(REQUEST) private readonly request: Request
    ) {}

    async registration(dto: CreateUsers) {
        mongoose.Types.ObjectId.isValid('your id here');
        const candidate = await this.userModel.findOne({email: dto.email});
        if(candidate) {
            throw new HttpException(`Пользователь с таким email уже существует.`, HttpStatus.BAD_REQUEST);
        }
        const hashPassword = bcrypt.hashSync(dto.password, 7)
        const user = await this.userModel.create({email: dto.email, password: hashPassword, name: dto.name});
        const findRoles = await Promise.all( 
            user.roles.map(roles => 
                this.rolesRepository.findById(roles)
            )
        )
        //user.roles.push(findRoles)
        //user.save()
        return this.jwtpayload(user, findRoles)
    }

    async login(dto: CreateUsers) {
        mongoose.Types.ObjectId.isValid('your id here');
        const user = await this.userModel.findOne({email: dto.email})
        if(!user) {
            throw new HttpException('Пользователя с таким email не существует.', HttpStatus.BAD_REQUEST)
        }
        const password = bcrypt.compareSync(dto.password, user.password) 
        if(!password) {
            throw new HttpException('Неправильный пароль', HttpStatus.BAD_REQUEST)
        }
        const findRoles = await Promise.all( 
            user.roles.map(roles => {
                return this.rolesRepository.findById(roles)
            })
        )
        await user.roles.map(rol => {
            return this.userModel.findByIdAndUpdate(user._id, {$push: {roles: this.rolesRepository.findById(rol)}})
        })
        if(user && password) {
            return this.jwtpayload(user, findRoles)
        }
    }
    async getAll(): Promise<User[]> {
        mongoose.Types.ObjectId.isValid('your id here');
        const user = await this.userModel.find()
        return user;
    }
    async getOne(id: mongoose.Schema.Types.ObjectId) {
        mongoose.Types.ObjectId.isValid('your id here');
        const user = await this.userModel.findById(id)
        const rolesUsers = await Promise.all(
            user.roles.map(role => {
                return this.rolesRepository.findById(role)
            })
        )
        return rolesUsers 
    }
    async addBan(dto: BanDto) {
        mongoose.Types.ObjectId.isValid('your id here');
        const user = await this.userModel.findById(dto.id_user)
        user.$set('ban', dto.ban)
        user.$set('ban_description', dto.ban_description)
        user.save()
        const rolesUsers = await Promise.all(
            user.roles.map(role => {
                return this.rolesRepository.findById(role)
            })
        )
        return {
            rolesUsers,
            user
        };
    }
    async addMusic(id: mongoose.Schema.Types.ObjectId, user: any) {
        mongoose.Types.ObjectId.isValid('your id here');
        const music = await this.trackRepository.findById(id)
        const addmusic = await this.userModel.findByIdAndUpdate({_id: user._id}, {$push: {track: music._id}})
        return addmusic;
    }
    async getOneUser(user: any) {
        try {
            console.log(user)
            mongoose.Types.ObjectId.isValid('your id here');
            const user_find = await this.userModel.findOne({_id: user._id})
            const userFindTrack = await Promise.all(
            user_find.track.map(mus => {
                return this.trackRepository.findById(mus)
            })
        )
            return userFindTrack
        } catch (error) {
            console.log(error)
        }
    }
    private jwtpayload(user: any, findRoles: any) {
        const payload = {email: user.email, password: user.password, name: user.name, _id: user._id, roles: findRoles}
        return {
            token: this.jwtService.sign(payload),
            user: user,
            roles: findRoles,
            message: 'Вітаємо, ви авторизовані'
        }
    }
}