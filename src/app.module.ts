import { Module } from '@nestjs/common';
import { DatabaseModule } from './config/database.module';
import { ENVConfigModule } from './config/env-config.module';
import { JWTConfigModule } from './config/jwt.config.module';
import { StaticModule } from './config/static.module';
import { AttendanceModule } from './modules/attendance/attendance.module';
import { EmployeeModule } from './modules/employee/employee.module';
import { HrUserModule } from './modules/hrUser/hrUser.module';
import { ReportModule } from './modules/report/report.module';

@Module({
  imports: [
    ENVConfigModule,
    DatabaseModule,
    JWTConfigModule,
    StaticModule,
    HrUserModule,
    EmployeeModule,
    AttendanceModule,
    ReportModule,
  ],
})
export class AppModule {}
