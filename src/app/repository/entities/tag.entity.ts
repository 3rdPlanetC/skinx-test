// import {
//     BaseEntity,
//     Column,
//     PrimaryGeneratedColumn,
//     Entity,
//     OneToMany,
//     Index
// } from 'typeorm'
// import { PostTag } from './post_tag.entity'

// @Entity()
// export class Tag extends BaseEntity {
//     @PrimaryGeneratedColumn('increment')
//     id!: number

//     @Column({
//         charset: 'utf8mb4'
//     })
//     @Index({ unique: true })
//     name!: string

//     @OneToMany(type => PostTag, postTag => postTag.tag)
//     postTags!: PostTag[];
// }