import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Stock } from './stocks';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  sale_price: number;

  @Column()
  image: string;

  @Column("text", { array: true })
  status: string[];

  @OneToOne(() => Stock, {cascade: true, nullable: true, onUpdate: 'CASCADE', onDelete: 'SET NULL'})
  @JoinColumn()
  stock: Stock;

}
