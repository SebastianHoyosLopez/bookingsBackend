import { StatusBookings } from "src/constants/status-booking.enum";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, Index, OneToMany, JoinColumn } from "typeorm";
import { PaymentEntity } from "src/payments/entities/payment.entity";

@Entity('booking')
export class BookingEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 30, nullable: false })
  @Index('IDX_BOOKING_CODE', { unique: false })
  code: string;

  @Column('timestamp', { nullable: false, comment: 'Date of the booking' })
  date: Date;

  @Column('time', { nullable: false, comment: 'Time of the booking' })
  time: string;

  @Column('enum', {
    enum: StatusBookings,
    default: StatusBookings.Pendiente
  })
  status: StatusBookings;

  @Column('boolean', { name: 'is_active', default: true, comment: 'Indicates if the booking is active' })
  isActive: boolean;

  @Column('text', { nullable: true, comment: 'Description of the booking' })
  description: string;

  @Column('varchar', { length: 255, nullable: false, comment: 'Ubicación de la presentación' })
  location: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', comment: 'Creation date of the booking' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true, comment: 'Last update date of the booking' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true, comment: 'Deletion date of the booking' })
  deletedAt: Date;

  @OneToMany(() => PaymentEntity, payment => payment.booking, { cascade: true })
  payments?: PaymentEntity[];
}