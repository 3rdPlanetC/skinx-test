import { Router, Response, Request } from 'express'
import PostController from '../controller/PostController'

const router = Router()

router.get("/", PostController.getAll)

router.get("/:id", (_: Request, res: Response) => {
    res.send("get a post")
})

export default router