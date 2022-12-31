import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { User, UserDocument } from 'src/users/users.model';
import { RolesDto } from './dto/roles.dto';
import { Roles, RolesDocument } from './roles.model';

@Injectable()
export class RolesService {
    constructor(@InjectModel(Roles.name) private rolesRepository: Model<RolesDocument>, 
    @InjectModel(User.name) private userModel: Model<UserDocument>) {}
    async create(dto: RolesDto) {
            mongoose.Types.ObjectId.isValid('your id here');
            const user = await this.userModel.findById(dto.id_user)
            const roles = await this.rolesRepository.create(dto)
            user.$set('roles', roles._id)
            await user.roles[roles._id];
            await user.save();
            return roles;
    }
}