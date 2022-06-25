import { Exclude } from 'class-transformer';
import {
  BaseEntity,
  BeforeUpdate,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class ExtendedEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int8' })
  id: number;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  @Exclude()
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  @Exclude()
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamptz', nullable: true, select: false })
  @Exclude()
  deletedAt: Date;

  @BeforeUpdate()
  updateDate() {
    this.updatedAt = new Date();
  }
}
