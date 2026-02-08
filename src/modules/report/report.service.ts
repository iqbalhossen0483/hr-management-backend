import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Attendance } from 'src/entities/attendance.entity';
import { Repository } from 'typeorm';
import { ReportQueryDto } from './report.dto';

type Report = {
  employee_id: number;
  name: string;
  days_present: number;
  times_late: number;
};

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Attendance)
    private readonly attendanceRepository: Repository<Attendance>,
  ) {}

  async getReport(queries: ReportQueryDto) {
    const { employee_id, from, to, month, search } = queries;

    const queryBuilder = this.attendanceRepository
      .createQueryBuilder('attendance')
      .leftJoinAndSelect('attendance.employee', 'employee');

    if (employee_id) {
      queryBuilder.andWhere('attendance.employee_id = :employee_id', {
        employee_id,
      });
    }

    if (from && to) {
      queryBuilder.andWhere('attendance.date BETWEEN :from AND :to', {
        from,
        to,
      });
    } else if (month) {
      const firstDayOfMonth = new Date(
        month.getFullYear(),
        month.getMonth(),
        1,
      );
      const lastDayOfMonth = new Date(
        month.getFullYear(),
        month.getMonth() + 1,
        0,
      );

      queryBuilder.andWhere('attendance.date BETWEEN :from AND :to', {
        from: firstDayOfMonth,
        to: lastDayOfMonth,
      });
    }

    if (search) {
      queryBuilder.andWhere('employee.name ILIKE :search', {
        search: `%${search}%`,
      });
    }

    const attendance = await queryBuilder
      .select([
        'attendance.id',
        'attendance.date',
        'attendance.check_in_time',
        'employee.id',
        'employee.name',
      ])
      .getMany();

    const reports = await queryBuilder
      .select('employee.id', 'employee_id')
      .addSelect('employee.name', 'name')
      .addSelect('COUNT(employee_id)', 'days_present')
      .addSelect(
        "SUM(CASE WHEN (attendance.check_in_time AT TIME ZONE 'Asia/Dhaka')::time > '09:45:00'::time THEN 1 ELSE 0 END)",
        'times_late',
      )
      .groupBy('employee.id')
      .addGroupBy('employee.name')
      .getRawMany();

    return {
      success: true,
      message: 'Report fetched successfully',
      data: reports,
      attendance,
    };
  }
}
