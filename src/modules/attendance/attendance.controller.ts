import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/guards/Auth.guard';
import {
  AttendanceQueryDto,
  CreateAttendanceDto,
  UpdateAttendanceDto,
} from './attendance.dto';
import { AttendanceService } from './attendance.service';

@UseGuards(AuthGuard)
@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post('create')
  async createAttendance(@Body() payload: CreateAttendanceDto) {
    return await this.attendanceService.createAttendance(payload);
  }

  @Put('update/:id')
  async updateAttendance(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateAttendanceDto,
  ) {
    return await this.attendanceService.updateAttendance(id, payload);
  }

  @Delete('delete/:id')
  async deleteAttendance(@Param('id', ParseIntPipe) id: number) {
    return await this.attendanceService.softDeleteAttendance(id);
  }

  @Get('all')
  async getAttendances(@Query() queries: AttendanceQueryDto) {
    return await this.attendanceService.getAttendances(queries);
  }

  @Get('single/:id')
  async getSingleAttendance(@Param('id', ParseIntPipe) id: number) {
    return await this.attendanceService.getSingleAttendance(id);
  }
}
