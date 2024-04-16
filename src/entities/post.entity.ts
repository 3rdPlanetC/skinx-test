import { IsNotEmpty } from 'class-validator'
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    UpdateDateColumn,

} from 'typeorm'

@Entity()
export class Post extends BaseEntity {
    @Column()
    @IsNotEmpty()
    public title!: string

    @Column()
    @IsNotEmpty()
    public content!: string

    @Column()
    @IsNotEmpty()
    public postedAt!: string

    @Column()
    @IsNotEmpty()
    public postedBy!: string

    @Column()
    @UpdateDateColumn()
    public tags!: string[]

    @Column()
    @CreateDateColumn()
    public createdAt!: Date

    @Column()
    @UpdateDateColumn()
    public updatedAt!: Date
}