import { title } from "process"
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Address {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    user_id: number

    @Column()
    line: string

    @Column()
    post_code: string

    @Column()
    district: string

    @Column()
    city: string

    @Column()
    country: string
}
