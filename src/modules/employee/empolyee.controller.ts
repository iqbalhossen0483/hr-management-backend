import { Body, Controller, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/Auth.guard';
import { CreateEmployeeDto } from './employee.dto';
import { EmployeeService } from './employee.service';

@UseGuards(AuthGuard)
@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post('/create')
  createEmployee(@Body() payload: CreateEmployeeDto) {
    return this.employeeService.createEmployee(payload);
  }

  @Put('/update/:id')
  updateEmployee(
    @Body() payload: Partial<CreateEmployeeDto>,
    @Param('id') id: number,
  ) {
    return this.employeeService.updateEmployee(id, payload);
  }
}
