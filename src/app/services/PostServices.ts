import { Post } from '../repository/entities/post.entity'
import { IPostRepository } from '../repository/PostRepository'
import DatabaseService from './DatabaseService'
import MockData from '../../migrations/posts.json'

export class PostServices implements IPostRepository {
    async getAll() {
        try {
            const dataSource = await DatabaseService.createConnection()
            const posts = dataSource.manager.find(Post)
            console.log("MockData : ", MockData)
            return posts
        } catch (error) {
            return null
        }
    }
    async getById() {
        try {

        } catch (error) {

        }
    }
}