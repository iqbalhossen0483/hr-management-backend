import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Employee } from './employee.entity';

@Entity('attendances')
@Unique(['employee', 'date'])
export class Attendance {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Employee, (employee) => employee.attendances)
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;

  @Column({ type: 'date', nullable: false })
  date: Date;

  @Column({ type: 'timestamp', nullable: false })
  check_in_time: Date;

  @Column({ type: 'timestamp', nullable: true })
  check_out_time: Date | null;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date | null;
}
