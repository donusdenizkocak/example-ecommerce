import { title } from "process"
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    email: string

    @Column()
    phone: string

    @Column()
    firstName: string

    @Column()
    lastName: string
}
