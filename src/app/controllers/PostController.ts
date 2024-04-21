import { Request, Response, NextFunction } from 'express'
import { PostService } from '../services/PostService'
const service = new PostService()

export class PostController extends PostService {
    public static getAll = async (_: Request, res: Response, next: NextFunction) => {
        service.getAll().then((posts) => {
            if (posts && posts.length > 0) {
                res.json(posts)
            } else {
                res.json([])
            }
        }).catch(err => {
            next(`error from post controller : ${err}`)
        })
    }
    public static getById = async (req: Request, res: Response, next: NextFunction) => {
        service.getById(parseInt(req.params.id)).then((posts) => {
            if (posts) {
                res.json(posts)
            } else {
                res.json({})
            }
        }).catch(err => {
            next(`error from post controller : ${err}`)
        })
    }
    public static getBySearch = async (req: Request, res: Response, next: NextFunction) => {
        service.getBySearch(req.query).then((posts) => {
            if (posts && posts.length > 0) {
                res.json(posts)
            } else {
                res.json({})
            }
        }).catch(err => {
            next(`error from post controller : ${err}`)
        })
    }
}