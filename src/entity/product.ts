import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class product {
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

  @Column()
  status: string[];
}
