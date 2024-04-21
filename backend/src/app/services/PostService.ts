import { PrismaClient } from '@prisma/client'
import Logger from '../../lib/logger'

export class PostService {
    private logger: Logger = new Logger()
    private prisma: PrismaClient = new PrismaClient()

    public async getAll() {
        try {
            const posts = await this.prisma.post.findMany({
                include: {
                    tags: true
                }
            })
            this.logger.log('info', ['posts from PostService:getAll() -> ', posts])
            return posts
        } catch (error) {
            throw error
        }
    }
    public async getById(id: number) {
        try {
            const posts = await this.prisma.post.findFirst({
                where: { id }, include: { tags: true }
            })
            this.logger.log('info', ['posts from PostService:getById() -> ', posts])
            return posts
        } catch (error) {
            throw error
        }
    }
    public async getBySearch(query: { tag?: string, title?: string, content?: string }) {
        try {
            console.log("query : ", query)
            // let queryClause = {}
            // const tag = query.tag?.trim()
            const content = query.content?.trim()
            // if (tag && tag.length > 0) {
            //     queryClause = { ...queryClause, tags: { some: { tag: { name: { contains: tag } } } } }
            // }
            // if (tag && tag.length > 0) {
            //     queryClause = { ...queryClause, title: { some: { tag: { name: { contains: tag } } } } }
            // }
            const posts = await this.prisma.post.findMany({
                where: {
                    content: {
                        search: content
                    }
                },
                include: {
                    tags: true
                },
            })
            console.log("posts.length : ", posts.length)
            this.logger.log('info', ['posts from PostService:getByTagSearch() -> ', posts])
            return posts
        } catch (error) {
            throw error
        }
    }
    public async getAllTag() {
        try {
            const tags = await this.prisma.tag.findMany()
            this.logger.log('info', ['post tags from PostService:getByTagSearch() -> ', tags])
            return tags
        } catch (error) {
            throw error
        }
    }
}