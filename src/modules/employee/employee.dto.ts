import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Length,
} from 'class-validator';
import { Designation } from 'src/entities/employee.entity';

export class CreateEmployeeDto {
  @IsNotEmpty({ message: 'Name is required' })
  @Length(3, 50, { message: 'Name must be between 3 and 50 characters' })
  name: string;

  @IsNotEmpty({ message: 'Age is required' })
  @Type(() => Number)
  @IsNumber({}, { message: 'Age must be a number' })
  age: number;

  @IsNotEmpty({ message: 'Designation is required' })
  @IsEnum(Designation, { message: 'Designation must be a valid enum value' })
  designation: Designation;

  @IsNotEmpty({ message: 'Hiring date is required' })
  @Type(() => Date)
  hiring_date: Date;

  @IsNotEmpty({ message: 'Date of birth is required' })
  @Type(() => Date)
  date_of_birth: Date;

  @IsNotEmpty({ message: 'Salary is required' })
  @Type(() => Number)
  salary: number;

  @IsOptional()
  photo_path?: string | null;
}

export class UpdateEmployeeDto {
  @IsOptional()
  @Length(3, 50, { message: 'Name must be between 3 and 50 characters' })
  name?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'Age must be a number' })
  age?: number;

  @IsOptional()
  @IsEnum(Designation, { message: 'Designation must be a valid enum value' })
  designation?: Designation;

  @IsOptional()
  @Type(() => Date)
  hiring_date?: Date;

  @IsOptional()
  @Type(() => Date)
  date_of_birth?: Date;

  @IsOptional()
  @Type(() => Number)
  salary?: number;

  @IsOptional()
  photo_path?: string | null;
}
