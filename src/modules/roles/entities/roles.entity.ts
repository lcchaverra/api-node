import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity('roles')
export class Rol {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 30 })
    name: string;

    @Column({ length: 100 })
    description: string;

    @Column({ default: true })
    active: boolean;
    
    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}