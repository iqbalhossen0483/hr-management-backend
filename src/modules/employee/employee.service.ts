import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import fs from 'fs';
import path from 'path';
import { Employee } from 'src/entities/employee.entity';
import { PaginatedResponseType, ResponseType } from 'src/type/common';
import { Equal, FindOptionsWhere, ILike, Not, Repository } from 'typeorm';
import { CreateEmployeeDto, EmployeeQueryDto } from './employee.dto';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  private uploadPath = path.join(process.cwd(), 'uploads');

  removeFile(file: string) {
    try {
      fs.unlinkSync(path.join(this.uploadPath, file));
    } catch (error) {
      console.error(error);
    }
  }

  async createEmployee(
    payload: CreateEmployeeDto,
    file: Express.Multer.File,
  ): Promise<ResponseType<Employee>> {
    const isExistEmployee = await this.employeeRepository.findOne({
      where: {
        name: payload.name,
        date_of_birth: Equal(payload.date_of_birth),
        hiring_date: Equal(payload.hiring_date),
      },
    });

    if (isExistEmployee) {
      if (file) this.removeFile(file.filename);
      throw new ConflictException(
        'Employee with the same name, date of birth, and hiring date already exists',
      );
    }

    if (file) payload.photo_path = `/${file.path}`;

    const employee = this.employeeRepository.create(payload);
    const savedEmployee = await this.employeeRepository.save(employee);

    return {
      success: true,
      message: 'Employee created successfully',
      data: savedEmployee,
    };
  }

  async getEmployeeById(id: number): Promise<Employee> {
    const employee = await this.employeeRepository.findOne({
      where: { id },
    });

    if (!employee) {
      throw new NotFoundException('Employee not found');
    }

    return employee;
  }

  async updateEmployee(
    id: number,
    payload: Partial<Employee>,
    file?: Express.Multer.File,
  ): Promise<ResponseType<Employee>> {
    const employee = await this.getEmployeeById(id);

    if (file) {
      payload.photo_path = `/${file.path}`;
      if (employee.photo_path)
        this.removeFile(employee.photo_path.replace('/uploads/', ''));
    }

    Object.assign(employee, payload);
    const updatedEmployee = await this.employeeRepository.save(employee);

    return {
      success: true,
      message: 'Employee updated successfully',
      data: updatedEmployee,
    };
  }

  async findAllEmployees(
    currentUserId: number,
    queries: EmployeeQueryDto,
  ): Promise<PaginatedResponseType<Employee[]>> {
    const { page = 1, limit = 10, name, designation } = queries;

    const skip = (page - 1) * limit;

    const query: FindOptionsWhere<Employee> = {};

    // remove current user from the list
    query.id = Not(currentUserId);

    if (name) query.name = ILike(`%${name}%`);
    if (designation) query.designation = designation;

    const employees = await this.employeeRepository.find({
      where: query,
      skip,
      take: limit,
    });

    const total_count = await this.employeeRepository.count({ where: query });
    const total_pages = Math.ceil(total_count / limit);

    const meta = {
      total_count,
      current_page: page,
      per_page: limit,
      total_pages,
    };

    return {
      success: true,
      message: 'Employees retrieved successfully',
      data: employees,
      meta,
    };
  }

  async getSingleEmployee(id: number): Promise<ResponseType<Employee>> {
    const employee = await this.getEmployeeById(id);

    return {
      success: true,
      message: 'Employee retrieved successfully',
      data: employee,
    };
  }

  async softDeleteEmployee(
    id: number,
    currentUserId: number,
  ): Promise<ResponseType<null>> {
    const employee = await this.getEmployeeById(id);

    if (employee.id === currentUserId) {
      throw new ConflictException('You cannot delete yourself');
    }

    await this.employeeRepository.softRemove(employee);

    return {
      success: true,
      message: 'Employee deleted successfully',
      data: null,
    };
  }
}
