import { Module } from '@nestjs/common';
import { UserController } from './controllers/user/user.controller';
import { UserService } from './services/user/user.service';
import { CommonModule } from '../common/common.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User]), CommonModule],
  controllers: [UserController],
  providers: [UserService],
})
export class AuthModule { }
