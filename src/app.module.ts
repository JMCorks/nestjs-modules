import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AuthModule } from './modules/auth/auth.module';
import { CommonModule } from './modules/common/common.module';

@Module({
  imports: [TypeOrmModule.forRoot(), AuthModule, CommonModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }
