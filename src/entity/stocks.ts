import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Stock {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    quantity: number;
}
