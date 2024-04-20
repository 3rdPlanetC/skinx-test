import {
    BaseEntity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
    JoinTable,
    // CreateDateColumn,
    Entity,
    // UpdateDateColumn,

} from 'typeorm'
// import { Tag } from './tag.entity'
// import { PostTag } from './post_tag.entity'

@Entity()
export class Post extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id!: number
    @Column({
        name: 'title',
    })
    title!: string

    @Column({
        name: 'content',
        type: 'text'
    })
    content!: string

    @Column({
        name: 'postedAt',
    })
    postedAt!: string

    @Column({
        name: 'postedBy',
    })
    postedBy!: string

    @Column({
        name: 'tag',
        type: 'json'
    })
    tag!: string

    @Column({
        name: 'createdAt',
        type: 'timestamp',
        nullable: false,
        default: () => "CURRENT_TIMESTAMP(6)"
    })
    createdAt!: Date

    @Column({
        name: 'updatedAt',
        type: 'timestamp',
        nullable: false,
        default: () => "CURRENT_TIMESTAMP(6)"
    })
    updatedAt!: Date

    // @OneToMany(() => PostTag, postTag => postTag.post)
    // @JoinTable()
    // postTags!: PostTag[]
}