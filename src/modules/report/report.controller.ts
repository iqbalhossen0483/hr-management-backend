import { Controller, Get, Query } from '@nestjs/common';
import { ReportQueryDto } from './report.dto';
import { ReportService } from './report.service';

@Controller('reports')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get('attendance')
  async getReport(@Query() queries: ReportQueryDto) {
    return this.reportService.getReport(queries);
  }
}
