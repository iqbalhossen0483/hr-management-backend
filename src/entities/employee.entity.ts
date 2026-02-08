import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Attendance } from './attendance.entity';

export enum Designation {
  FULL_STACK_DEVELOPER = 'Full Stack Developer',
  FRONTEND_DEVELOPER = 'Frontend Developer',
  BACKEND_DEVELOPER = 'Backend Developer',
  DEVOPS_ENGINEER = 'DevOps Engineer',
  QA_ENGINEER = 'QA Engineer',
  PROJECT_MANAGER = 'Project Manager',
}

@Entity('employees')
@Unique(['name', 'date_of_birth', 'hiring_date'])
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ type: 'int', nullable: false })
  age: number;

  @Column({ type: 'enum', enum: Designation, nullable: false })
  designation: Designation;

  @Column({ type: 'date', nullable: false })
  hiring_date: Date;

  @Column({ type: 'date', nullable: false })
  date_of_birth: Date;

  @Column({ type: 'decimal', nullable: false })
  salary: number;

  @Column({ type: 'text', default: null, nullable: true })
  photo_path: string | null;

  @ManyToMany(() => Attendance, (attendance) => attendance.employee_id)
  attendances: Attendance[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date | null;
}
