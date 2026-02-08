import { Type } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

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
  @IsString()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, {
    message: 'check_in_time must be in HH:MM:SS format (e.g., 09:30:00)',
  })
  check_in_time: string;

  @IsOptional()
  @IsString()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, {
    message: 'check_in_time must be in HH:MM:SS format (e.g., 09:30:00)',
  })
  check_out_time: string | null;
}

export class UpdateAttendanceDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'Employee ID must be a number' })
  employee_id: number;

  @IsOptional()
  @IsString()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, {
    message: 'check_in_time must be in HH:MM:SS format (e.g., 09:30:00)',
  })
  check_out_time: string;

  @IsOptional()
  @IsString()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, {
    message: 'check_in_time must be in HH:MM:SS format (e.g., 09:30:00)',
  })
  check_in_time: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate({ message: 'Date must be a valid date' })
  date: Date;
}

export class AttendanceQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'Page must be a number' })
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'Limit must be a number' })
  limit?: number;

  @IsOptional()
  @Type(() => Date)
  @IsDate({ message: 'Start date must be a valid date' })
  start_date?: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate({ message: 'End date must be a valid date' })
  end_date?: Date;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'Employee ID must be a number' })
  employee_id?: number;
}
