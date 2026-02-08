import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from 'src/entities/employee.entity';
import { ResponseType } from 'src/type/common';
import { Repository } from 'typeorm';
import { CreateEmployeeDto } from './employee.dto';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  async createEmployee(
    payload: CreateEmployeeDto,
  ): Promise<ResponseType<Employee>> {
    const isExistEmployee = await this.employeeRepository.findOne({
      where: {
        name: payload.name,
        date_of_birth: payload.date_of_birth,
        hiring_date: payload.hiring_date,
      },
    });

    if (isExistEmployee) {
      throw new ConflictException(
        'Employee with the same name, date of birth, and hiring date already exists',
      );
    }

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
  ): Promise<ResponseType<Employee>> {
    const employee = await this.getEmployeeById(id);

    Object.assign(employee, payload);
    const updatedEmployee = await this.employeeRepository.save(employee);

    return {
      success: true,
      message: 'Employee updated successfully',
      data: updatedEmployee,
    };
  }
}
