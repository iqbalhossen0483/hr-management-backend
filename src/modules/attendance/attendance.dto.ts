import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateAttendanceDto {
  @IsNotEmpty({ message: 'Employee ID is required' })
  @Type(() => Number)
  @IsNumber({}, { message: 'Employee ID must be a number' })
  employee_id: number;

  @Type(() => Date)
  @IsNotEmpty({ message: 'Date is required' })
  @IsDate({ message: 'Date must be a valid date' })
  date: Date;

  @IsNotEmpty({ message: 'Check-in time is required' })
  check_in_time: string;

  @IsOptional()
  check_out_time: string | null;
}
