import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";

@Entity('payment')
export class PaymentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 30, nullable: false })
  code: string;

  @Column('decimal', { precision: 10, scale: 2, nullable: false })
  amount: number;

  @Column('varchar', { length: 3, default: 'COP' })
  currency: string;

  @Column('varchar', { length: 20 })
  paymentMethod: string;

  @Column('varchar', { length: 20 })
  paymentStatus: string;

  @Column('date')
  paymentDate: Date;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', comment: 'Creation date of the payment' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true, comment: 'Last update date of the payment' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true, comment: 'Deletion date of the payment' })
  deletedAt: Date;
}
