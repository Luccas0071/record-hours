import { User } from 'src/module/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('hours')
export class Hour {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: string;

  @Column({ type: 'numeric' })
  hours_worked: number;

  @Column({ length: 500 })
  description: string;

  @ManyToOne(() => User, (user) => user.hours, { onDelete: 'CASCADE' })
  user: User;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
