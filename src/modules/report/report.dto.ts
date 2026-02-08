import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class ReportQueryDto {
  @IsOptional()
  @Type(() => Date)
  @IsDate({ message: 'Month must be a valid date' })
  month: Date;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'Employee ID must be a number' })
  employee_id: number;

  @IsOptional()
  search: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate({ message: 'From date must be a valid date' })
  from: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate({ message: 'To date must be a valid date' })
  to: Date;
}
