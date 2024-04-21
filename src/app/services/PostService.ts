import { PrismaClient } from '@prisma/client'
import Logger from '../../lib/logger'

export class PostService {
    private logger: Logger = new Logger()
    private prisma: PrismaClient = new PrismaClient()
    public async getAll() {
        try {
            const posts = await this.prisma.post.findMany()
            this.logger.log('info', ['posts from PostService:getAll() -> ', posts])
            return posts
        } catch (error) {
            this.logger.log('error', ['error from PostService:getAll() -> ', error])
            throw error
        }
    }
    public async getById(id: number) {
        try {
            const posts = await this.prisma.post.findFirst({ where: { id } })
            this.logger.log('info', ['posts from PostService:getById() -> ', posts])
            return posts
        } catch (error) {
            this.logger.log('error', ['error from PostService:getById() -> ', error])
            throw error
        }
    }
    public async getBySearch(query: { tag?: string }) {
        try {
            let queryClause = {}
            const tag = query.tag?.trim()
            if (tag && tag.length > 0) {
                queryClause = { ...queryClause, tags: { some: { tag: { name: { contains: tag } } } } }
            }
            const posts = await this.prisma.post.findMany({
                where: {
                    ...queryClause
                }
            })
            this.logger.log('info', ['posts from PostService:getByTagSearch() -> ', posts])
            return posts
        } catch (error) {
            this.logger.log('error', ['error from PostService:getById() -> ', error])
            throw error
        }
    }
}