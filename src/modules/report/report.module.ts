import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attendance } from 'src/entities/attendance.entity';
import { Employee } from 'src/entities/employee.entity';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';

@Module({
  imports: [TypeOrmModule.forFeature([Attendance])],
  controllers: [ReportController],
  providers: [ReportService],
})
export class ReportModule {}
