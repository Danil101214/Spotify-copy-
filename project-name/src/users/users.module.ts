import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './users.model';
import { JwtModule } from '@nestjs/jwt';
import { Roles, RolesSchema } from 'src/roles/roles.model';
import { RolesModule } from 'src/roles/roles.module';
import {forwardRef} from '@nestjs/common'
import { TrackModule } from 'src/track/track.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
    JwtModule.register({
      secret: 'SECRET_KET',
      signOptions: {
        expiresIn: '30d'
      }
    }),
    MongooseModule.forFeature([{name: Roles.name, schema: RolesSchema}]),
    forwardRef(() => RolesModule),
    forwardRef(() => TrackModule)
  ],
  exports: [
    //UsersModule,
    MongooseModule
  ]
})
export class UsersModule {}