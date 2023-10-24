import { title } from "process"
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Movement {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    payment: boolean

    @Column()
    user_id: number

    @Column()
    product_id: number

    @Column('decimal', { precision: 6, scale: 2 })
    price: number

    @Column()
    quantity: number

    @Column('decimal', { precision: 6, scale: 2 })
    amount: number

    @Column()
    is_delete: boolean
}
