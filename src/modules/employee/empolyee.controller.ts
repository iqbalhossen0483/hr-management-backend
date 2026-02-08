import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from 'src/config/multer.config';
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
  @UseInterceptors(FileInterceptor('photo', multerConfig))
  createEmployee(
    @Body() payload: CreateEmployeeDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.employeeService.createEmployee(payload, file);
  }

  @Put('/update/:id')
  @UseInterceptors(FileInterceptor('photo', multerConfig))
  updateEmployee(
    @Body() payload: Partial<CreateEmployeeDto>,
    @Param('id') id: number,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.employeeService.updateEmployee(id, payload, file);
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
