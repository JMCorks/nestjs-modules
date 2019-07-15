import { Module } from '@nestjs/common';
import { SomeModelService } from './services/some-model/some-model.service';
import { SomeModelController } from './controllers/some-model/some-model.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SomeModel } from './models/some-model.entity';
import { CommonModule } from '../common/common.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([SomeModel]), CommonModule, AuthModule],
  providers: [SomeModelService],
  controllers: [SomeModelController]
})
export class SomeModelModule { }
