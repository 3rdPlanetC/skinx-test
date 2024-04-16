import { Request, Response, NextFunction } from 'express'
import { PostServices } from '../services/PostServices'
const service = new PostServices()

export default class PostController {
    public static getAll = async (_: Request, res: Response, next: NextFunction) => {
        service.get().then((posts) => {
            console.log("posts : ", posts)
            if (posts && posts.length > 0) {
                res.json(posts)
            } else {
                res.json([])
            }
        }).catch(err => {
            next("error from post controller")
        })
    }
}