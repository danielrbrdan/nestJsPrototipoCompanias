import { Address } from 'src/address/entity/adress.entity';
import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne } from 'typeorm';

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  cnpj: string;

  @OneToOne(() => Address, { cascade: true })
  @JoinColumn()
  endereco: Address;

  @Column()
  telefone: string;

  @Column()
  email: string;
}
