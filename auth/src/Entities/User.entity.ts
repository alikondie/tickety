import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Password } from '../services/password';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column('varchar', { length: 255, nullable: false }) email: string;

  @Column('text', { select: false, nullable: false })
  password: string;

  @CreateDateColumn() creation_date: Date;

  @UpdateDateColumn() update_date: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    this.password = await Password.toHash(this.password);
  }

  async comparePassword(providedPassword: string) {
    console.log('comparing');
    return await Password.compare(this.password, providedPassword);
  }
}
