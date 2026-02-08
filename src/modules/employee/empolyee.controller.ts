import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from 'src/decorators/CurrentUser';
import { AuthGuard } from 'src/guards/Auth.guard';
import type { JWTPayload } from 'src/type/common';
import { CreateEmployeeDto, EmployeeQueryDto } from './employee.dto';
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

  @Get('/all')
  getAllEmployees(
    @Query() queries: EmployeeQueryDto,
    @CurrentUser() user: JWTPayload,
  ) {
    return this.employeeService.findAllEmployees(user.sub, queries);
  }

  @Get('/:id')
  getSingleEmployee(@Param('id') id: number) {
    return this.employeeService.getSingleEmployee(id);
  }

  @Delete('/delete/:id')
  deleteEmployee(@Param('id') id: number, @CurrentUser() user: JWTPayload) {
    return this.employeeService.softDeleteEmployee(id, user.sub);
  }
}
