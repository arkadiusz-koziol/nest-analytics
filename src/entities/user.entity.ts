import { Exclude } from 'class-transformer';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Roles } from '../enum/roles.enum';
import { IsEmail, Length } from 'class-validator';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  first_name: string;
  @Column()
  last_name: string;
  @Column()
  @Length(9, 12)
  phone_number: string;
  @Column()
  @IsEmail()
  email: string;
  @Column({ type: 'enum', enum: Roles, default: Roles.USER })
  role: Roles;

@Exclude()
@Column()
  password: string;
}
