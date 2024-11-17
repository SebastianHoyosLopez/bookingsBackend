import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('booking')
export class BookingEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column('varchar', { length: 30, nullable: false, comment: 'Unique code for the booking' })
    code: string;

    @Column('timestamp', { nullable: false, comment: 'Date and time of the booking' })
    date: Date;

    @Column('varchar', { length: 50, default: 'Active', comment: 'Status of the booking' })
    status: string;

    @Column('boolean', { name: 'is_active', default: true, comment: 'Indicates if the booking is active' })
    isActive: boolean;

    @Column('text', { nullable: true, comment: 'Description of the booking' })
    description: string;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp', comment: 'Creation date of the booking' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true, comment: 'Last update date of the booking' })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true, comment: 'Deletion date of the booking' })
    deletedAt: Date;
}