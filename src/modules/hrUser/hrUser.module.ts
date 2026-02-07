import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HrUser } from 'src/entities/hrUser.entity';
import { HrUserController } from './hrUser.controller';
import { HrUserService } from './hrUser.service';

@Module({
  imports: [TypeOrmModule.forFeature([HrUser])],
  controllers: [HrUserController],
  providers: [HrUserService],
})
export class HrUserModule {}
