import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Roles, RolesSchema } from './roles.model';
import { RolesService } from './roles.service';
import {forwardRef} from '@nestjs/common'
import { UsersModule } from 'src/users/users.module';
//import { RolesController } from './roles.controller';
@Module({
  providers: [RolesService],
  imports: [
    MongooseModule.forFeature([{name: Roles.name, schema: RolesSchema}]),
    forwardRef(() => UsersModule)],
  exports: [
    MongooseModule,
    RolesService
  ],
  controllers: [/*RolesController*/]
})
export class RolesModule {}