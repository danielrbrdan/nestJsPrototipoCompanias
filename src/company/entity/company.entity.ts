import { Address } from 'src/address/entity/adress.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToOne,
} from 'typeorm';

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  cnpj: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @OneToOne(() => Address, (address) => address.company, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  address: Address;
}
