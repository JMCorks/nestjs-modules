import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AuthModule } from './modules/auth/auth.module';
import { CommonModule } from './modules/common/common.module';
import { SomeModelModule } from './modules/some-model/some-model.module';

@Module({
  imports: [TypeOrmModule.forRoot(), AuthModule, CommonModule, SomeModelModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }
