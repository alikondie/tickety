import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { Password } from '../services/password';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column('varchar', { length: 255 }) email: string;

  @Column('text') password: string;

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
