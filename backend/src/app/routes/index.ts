import { Router } from 'express'
import postRouter from './PostRoute'
import authRouter from './AuthRoute'
import userRouter from './UserRoute'
import { AuthMiddleware } from '../middlewares/AuthMiddleware'

const router = Router()

router.use('/private/api/v1/post', AuthMiddleware.accessTokenMiddleware, postRouter)
router.use('/private/api/v1/user', userRouter)
router.use('/private/api/v1/auth', authRouter)

export default router