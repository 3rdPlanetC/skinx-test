import { Request, Response, NextFunction } from 'express'
import { PostService } from '../services/PostService'

export class PostController {
    private static postService: PostService = new PostService()

    public static getAll = async (_: Request, res: Response, next: NextFunction) => {
        try {
            const posts = await PostController.postService.getAll()
            if (posts && posts.length > 0) {
                res.json(posts)
            } else {
                res.json([])
            }
        } catch (error) {
            res.status(500).json({
                message: 'error from post controller : ' + error
            })
        }
    }
    public static getById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const post = await PostController.postService.getById(parseInt(req.params.id))
            if (post) {
                res.json(post)
            } else {
                res.json({})
            }
        } catch (error) {
            res.status(500).json({
                message: 'error from post controller : ' + error
            })
        }
    }
    public static getBySearch = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const posts = await PostController.postService.getBySearch(req.query)
            if (posts && posts.length > 0) {
                res.json(posts)
            } else {
                res.json({})
            }
        } catch (error) {
            res.status(500).json({
                message: 'error from post controller : ' + error
            })
        }
    }
    public static getAllTag = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const tag = await PostController.postService.getAllTag()
            if (tag && tag.length > 0) {
                res.json(tag)
            } else {
                res.json({})
            }
        } catch (error) {
            res.status(500).json({
                message: 'error from post controller : ' + error
            })
        }
    }
}