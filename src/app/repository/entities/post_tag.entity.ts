// import {
//     BaseEntity,
//     Column,
//     PrimaryGeneratedColumn,
//     ManyToOne,
//     JoinTable,
//     // CreateDateColumn,
//     Entity,
//     // UpdateDateColumn,

// } from 'typeorm'
// import { Tag } from './tag.entity'
// import { Post } from './post.entity'

// @Entity()
// export class PostTag extends BaseEntity {
//     @PrimaryGeneratedColumn('increment')
//     id!: number

//     @ManyToOne(() => Post, post => post.postTags)
//     post!: Post

//     @ManyToOne(() => Tag, tag => tag.postTags)
//     tag!: Tag
// }