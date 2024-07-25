import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Stock } from './stocks';
import { Tag } from 'app/types/types';

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
  tags: Tag[];

  @OneToOne(() => Stock, {cascade: true, nullable: true, onUpdate: 'CASCADE', onDelete: 'SET NULL'})
  @JoinColumn()
  stock: Stock;

}
