import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;


    @Column({ nullable: false })
    username: string;


    @Column({ unique: true, nullable: false })
    email: string;

    @Column({ nullable: false })
    password: string;

    // Assuming the profile is an array of strings representing roles
    @Column('simple-array')
    profiles: string[];
}
