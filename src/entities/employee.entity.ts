import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Attendance } from './attendance.entity';

@Entity('employees')
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ type: 'int', nullable: false })
  age: number;

  @Column({ nullable: false })
  designation: string;

  @Column({ type: 'date', nullable: false })
  hiring_date: Date;

  @Column({ type: 'date', nullable: false })
  date_of_birth: Date;

  @Column({ type: 'decimal', nullable: false })
  salary: number;

  @Column({ type: 'varchar', nullable: true })
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
