import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Attendance } from 'src/entities/attendance.entity';
import { PaginatedResponseType, ResponseType } from 'src/type/common';
import { Between, Equal, FindOptionsWhere, Repository } from 'typeorm';
import { EmployeeService } from '../employee/employee.service';
import {
  AttendanceQueryDto,
  CreateAttendanceDto,
  UpdateAttendanceDto,
} from './attendance.dto';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(Attendance)
    private readonly attendanceRepository: Repository<Attendance>,
    private readonly employeeService: EmployeeService,
  ) {}

  async createAttendance(
    payload: CreateAttendanceDto,
  ): Promise<ResponseType<Attendance>> {
    const employee = await this.employeeService.getEmployeeById(
      payload.employee_id,
    );
    const isExistToday = await this.attendanceRepository
      .createQueryBuilder('attendance')
      .where(
        'attendance.date = :date AND attendance.employee_id = :employee_id',
      )
      .setParameters({ date: payload.date, employee_id: employee.id })
      .getOne();

    if (isExistToday) {
      throw new ConflictException('Attendance for the employee already exists');
    }

    const attendance = this.attendanceRepository.create({
      employee: employee,
      check_in_time: payload.check_in_time,
      check_out_time: payload.check_out_time,
      date: payload.date,
    });
    const savedAttendance = await this.attendanceRepository.save(attendance);

    return {
      success: true,
      message: 'Attendance created successfully',
      data: savedAttendance,
    };
  }

  async getAttendanceById(id: number): Promise<Attendance> {
    const attendance = await this.attendanceRepository.findOne({
      where: { id },
      relations: ['employee'],
    });

    if (!attendance) {
      throw new NotFoundException('Attendance not found');
    }

    return attendance;
  }

  async updateAttendance(
    id: number,
    payload: UpdateAttendanceDto,
  ): Promise<ResponseType<Attendance>> {
    const attendance = await this.getAttendanceById(id);
    if (payload.employee_id) {
      const employee = await this.employeeService.getEmployeeById(
        payload.employee_id,
      );
      attendance.employee = employee;
    }

    const { employee_id, ...rest } = payload;

    Object.assign(attendance, rest);

    const updatedAttendance = await this.attendanceRepository.save(attendance);
    return {
      success: true,
      message: 'Attendance updated successfully',
      data: updatedAttendance,
    };
  }

  async softDeleteAttendance(id: number): Promise<ResponseType<null>> {
    const attendance = await this.getAttendanceById(id);
    await this.attendanceRepository.softRemove(attendance);
    return {
      success: true,
      message: 'Attendance deleted successfully',
      data: null,
    };
  }

  async getAttendances(
    queries: AttendanceQueryDto,
  ): Promise<PaginatedResponseType<Attendance[]>> {
    const { employee_id, start_date, end_date, page = 1, limit = 10 } = queries;
    const query: FindOptionsWhere<Attendance> = {};
    if (employee_id) {
      const employee = await this.employeeService.getEmployeeById(employee_id);
      query.employee = employee;
    }
    if (start_date && end_date) {
      query.date = Between(start_date, end_date);
    }

    const skip = (page - 1) * limit;

    const attendances = await this.attendanceRepository.find({
      where: query,
      skip,
      take: limit,
      relations: ['employee'],
    });

    const total_count = await this.attendanceRepository.count({ where: query });
    const total_pages = Math.ceil(total_count / limit);

    const meta = {
      total_count,
      current_page: page,
      per_page: limit,
      total_pages,
    };

    return {
      success: true,
      message: 'Attendances retrieved successfully',
      data: attendances,
      meta,
    };
  }

  async getSingleAttendance(id: number): Promise<ResponseType<Attendance>> {
    const attendance = await this.getAttendanceById(id);

    return {
      success: true,
      message: 'Attendance retrieved successfully',
      data: attendance,
    };
  }
}
