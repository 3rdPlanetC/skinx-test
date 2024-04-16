import { getRepository } from 'typeorm'
import { Post } from '../entities/post.entity'
import { IPostRepository } from '../repository/PostRepository'

export class PostServices implements IPostRepository {
    async get(): Promise<Post[] | null> {
        try {
            const postRepository = getRepository(Post)
            const posts = await postRepository.find({})
            return posts
        } catch (error) {
            return null
        }
    }
}