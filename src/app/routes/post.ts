import { Router } from 'express'
import { PostController } from '../controllers/PostController'

const router = Router()

router.get("/", PostController.getAll)
router.get("/:id", PostController.getById)
router.get('/search/query', PostController.getBySearch)

export default router